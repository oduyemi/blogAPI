import mongoose, { Document, Schema } from "mongoose";

export interface IPostTag extends Document {
    _id: mongoose.Types.ObjectId;
    postId: mongoose.Types.ObjectId;
    tagId: mongoose.Types.ObjectId;
}

const postTagSchema: Schema<IPostTag> = new Schema({
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  tagId: {
    type: Schema.Types.ObjectId,
    ref: "Tag",
    required: true,
  }
});

const PostTag = mongoose.model<IPostTag>("PostTag", postTagSchema);
export default PostTag;
