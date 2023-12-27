"use server";

import { CreateEventParams } from "@/type";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Event from "../database/models/event.model";

export const createEvent = async ({
	event,
	userId,
	path,
}: CreateEventParams) => {
	try {
		await connectToDatabase();

		const orgaizer = await User.findById(userId);
		if (!orgaizer) {
			throw new Error("Organizer not found");
		}
		console.log({
			category: event.categoryId,
			orgaizer: userId,
		});

		const newEvent = await Event.create({
			...event,
			category: event.categoryId,
			orgaizer: userId,
		});
		return JSON.parse(JSON.stringify(newEvent));
	} catch (error) {
		console.log(error);

		handleError(error);
	}
};
