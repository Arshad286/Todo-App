import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const Connect = () => {
  mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB is not connected", err));
};


export default Connect ;