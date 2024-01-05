import stripe from "stripe";
import { NextResponse } from "next/server";
import { createOrder } from "@/lib/actions/order.actions";
import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "stream/consumers";

export async function POST(
	request: Request,
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const buf = await buffer(req);

	const body = await request.text();
	console.log("BODY:", body);

	const sig = request.headers.get(
		"stripe-signature",
	) as string;
	console.log("SIG", sig);

	const endpointSecret =
		process.env.STRIPE_WEBHOOK_SECRET!;
	console.log("ENDPOINTSECRET:", endpointSecret);

	let event;

	try {
		event = stripe.webhooks.constructEvent(
			buf.toString(),
			sig,
			endpointSecret,
		);
	} catch (err: any) {
		// On error, log and return the error message
		console.log(`❌ Error message: ${err.message}`);
		res.status(400).send(
			`Webhook Error: ${err.message}`,
		);
	}
	// } catch (err) {
	// 	return NextResponse.json({
	// 		message: "Webhook error look in body",
	// 		body: body,
	// 		error: err,
	// 	});
	// }

	// Get the ID and type
	const eventType = event?.type;

	// CREATE
	if (eventType === "checkout.session.completed") {
		const { id, amount_total, metadata } =
			event.data.object;

		const order = {
			stripeId: id,
			eventId: metadata?.eventId || "",
			buyerId: metadata?.buyerId || "",
			totalAmount: amount_total
				? (amount_total / 100).toString()
				: "0",
			createdAt: new Date(),
		};

		const newOrder = await createOrder(order);
		return NextResponse.json({
			message: "OK",
			order: newOrder,
		});
	}

	return new Response("", { status: 200 });
}
