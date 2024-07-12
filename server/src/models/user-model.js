import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  hashedPassword: { type: String, require: true },
}, {timestamps: true} );

export default mongoose.model("User", userSchema);
