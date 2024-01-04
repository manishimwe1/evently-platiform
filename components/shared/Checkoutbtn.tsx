"use client";

import { IEvent } from "@/lib/database/models/event.model";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import Link from "next/link";
import CheckOut from "./CheckOut";

const Checkoutbtn = ({ event }: { event: IEvent }) => {
	const hasEventEnd =
		new Date(event.endDateTime) < new Date();
	const { user } = useUser();
	const userId = user?.publicMetadata.userId as string;

	return (
		<div className='flex items-center gap-3'>
			{/* can not buy past events */}
			{hasEventEnd ? (
				<p className='p-2 text-red-400'>
					Sorry, tickets are no longer available.
				</p>
			) : (
				<>
					<SignedOut>
						<Button
							asChild
							className='button rounded-full'
							size='lg'>
							<Link href={"/sign-in"}>
								Get Tickets
							</Link>
						</Button>
					</SignedOut>
					<SignedIn>
						<CheckOut
							event={event}
							userId={userId}
						/>
					</SignedIn>
				</>
			)}
		</div>
	);
};

export default Checkoutbtn;
