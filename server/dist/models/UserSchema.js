"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const roles_1 = require("../utils/roles");
const passport_local_mongoose_1 = __importDefault(require("passport-local-mongoose"));
const { Schema } = mongoose_1.default;
const UserSchema = new Schema({
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
        enum: Object.values(roles_1.roles),
    },
}, { timestamps: true });
UserSchema.plugin(passport_local_mongoose_1.default);
const UserModel = mongoose_1.default.model("UserModel", UserSchema);
exports.default = UserModel;
