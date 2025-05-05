import mongoose from "mongoose";
import { roles } from "../utils/roles";

import passportLocalMongoose from "passport-local-mongoose";

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

    photoUrl: {
      type: String,
    },

    photoId: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.plugin(passportLocalMongoose); // creates a unique username and password

const UserModel = mongoose.model("UserModel", UserSchema);
export default UserModel;
