import mongoose from "mongoose";
import { MONGO_URI } from "../config";

export async function connectToDatabase(){
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); //Exit process with failure
    }
}