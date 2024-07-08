import mongoose, { Document, Schema } from "mongoose";

export interface IComment extends Document {
    _id: mongoose.Types.ObjectId;
    text: string;
    commentAuthor: mongoose.Types.ObjectId;
    postId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const commentSchema: Schema<IComment> = new Schema({
  text: {
    type: String,
    required: true,
  },

  commentAuthor: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  }

});

const Comment = mongoose.model<IComment>("Comment", commentSchema);
export default Comment;