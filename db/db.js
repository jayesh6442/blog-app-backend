import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected");
  } catch (error) {
    console.log(error);
  }
};

export { connectDB };
