import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  name: string;
  lastname: string;
  phone: string;
  password: string;
  email: string;
  birthDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  phone: { type: String, unique: true },
  password: { type: String, select: false },
  email: { type: String, unique: true },
  birthDate: Date,
  createdAt: Date,
  updatedAt: Date
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
