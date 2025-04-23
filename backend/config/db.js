import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

 const DBConnection = async () => {
  try {
    mongoose.set("strictQuery", false);
    await connect(process.env.MONGO_URI);
    console.log("db connected you can start storing data");
  } catch (err) {
    throw err;
  }
};
export default DBConnection;