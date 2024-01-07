import mongoose from "mongoose";
import { Schema } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2"

const { ObjectId } = mongoose.Schema;

const postSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["prifilePic", "cover", null],
      default: null,
    },
    text: {
      type: String,
    },
    images: {
      type: Array,
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
    background: { type: String },
    comments: [
      {
        comment: { type: String },
        commentBy: {
          type: ObjectId,
          ref: "User",
        },
        commentAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  { timestamps: true }
);

postSchema.plugin(aggregatePaginate)

const Post = mongoose.model("Post", postSchema);

export default Post;
