import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
let cached = (global as any).mongoose || {
	conn: null,
	promise: null,
};

export const connectToDatabase = async () => {
	if (cached.conn) {
		console.log(
			"mongo db is already connected!!!!....",
		);

		return cached.conn;
	}

	if (!MONGODB_URI)
		throw new Error("MONGODB_URI is missing");

	cached.promise =
		cached.promise ||
		mongoose.connect(MONGODB_URI, {
			dbName: "evently",
			bufferCommands: false,
		});
	cached.conn == (await cached.promise);
	console.log("Mongo db connected successfuly..... ");

	return cached.conn;
};
