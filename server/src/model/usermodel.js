import mongoose, { Schema } from "mongoose";
import randomString from "randomstring";
import bcrypt from "bcrypt";

import UserModel from "../model/usermodel.js";

const { ObjectId } = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "first name is required"],
      trim: true,
      Text: true,
    },
    lastName: {
      type: String,
      required: [true, "last name is required"],
      trim: true,
      Text: true,
    },
    userName: {
      type: String,
      required: [true],
      trim: true,
      Text: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      trim: true,
      Text: true,
    },
    gender: {
      type: String,
    },
    profilPic: {
      type: String,
      trim: true,
      default: "assets/images/defaultprofilepic.png",
    },
    cover: {
      type: String,
      trim: true,
    },
    bYear: {
      type: Number,
      required: true,
      trim: true,
    },
    bMonth: {
      type: Number,
      required: true,
      trim: true,
    },
    bDay: {
      type: Number,
      required: true,
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    friends: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    requests: {
      type: Array,
      default: [],
    },
    search: [
      {
        user: {
          type: ObjectId,
          ref: "User",
        },
      },
    ],
    details: {
      bio: { type: String },
      otherNmae: { type: String },
      job: { type: String },
      workPlace: { type: String },
      highSchool: { type: String },
      college: { type: String },
      currentCity: { type: String },
      homeTwon: { type: String },
      rel: {
        type: String,
        enum: ["Single", "In a relationship", "Married", "Divorced"],
      },
      instageram: {
        type: String,
      },
    },
    savedPosts: [
      {
        post: {
          type: ObjectId,
          ref: "post",
        },
        savedAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
    refreshToken: [String],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  let user = this;
  if (!user.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(user.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.generateUserName = async function () {
  let user = null;
  let userName = this.userName;
  do {
    user = await UserModel.findOne({ userName });
    if (user) userName += randomString.generate(4);
  } while (user);
  return userName;
};

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
