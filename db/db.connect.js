import dotenv from 'dotenv'
import mongoose from "mongoose";
dotenv.config()
export async function connectDb() {
  try {
    await mongoose.connect(
      `${process.env.MONGO}`
    );
    console.log("Mongodb connected");
  } catch (error) {
    console.log("MongoDb ga  ulanishda  muammo bor :", error);
  }
}

