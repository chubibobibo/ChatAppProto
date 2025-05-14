import { Types } from "mongoose";
import { Request } from "express";

export interface UserType extends Request {
  user: {
    _id: Types.ObjectId;
  };
  params: {
    id: string;
  };
}

export interface BodyPassword
  extends ReadableStream<Uint8Array<ArrayBufferLike>> {
  password: string;
}
