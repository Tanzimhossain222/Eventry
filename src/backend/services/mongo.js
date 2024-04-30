import mongoose from "mongoose";

export async function dbConnect() {
    try {

        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected`);
        return conn;

    } catch (err) {
        console.error(err);
    }
}