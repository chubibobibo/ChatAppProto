import mongoose from "mongoose";
import { roles } from "../utils/roles";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: Object.values(roles),
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("UserModel", UserSchema);
export default UserModel;
