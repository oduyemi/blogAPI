import mongoose, { Document, Schema } from "mongoose";

export interface IMedia extends Document {
  _id: mongoose.Types.ObjectId;
  postId: mongoose.Types.ObjectId;
  urls?: string[];
  mediaType: string;
  fileSize?: number; 
  createdAt: Date;
}

const mediaSchema: Schema<IMedia> = new Schema({
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  urls: {
    type: [String],
    validate: {
      validator: function (urls: string[]) {
        return urls.length <= 5;
      },
      message: "A post can have up to 5 media items.",
    },
  },
  mediaType: {
    type: String,
    required: true,
    enum: ["image", "video", "audio"], 
  },
  fileSize: {
    type: Number,
    validate: {
      validator: function (fileSize: number) {
        if (this.mediaType === "video") {
          return fileSize <= 10 * 1024 * 1024; // 10MB in bytes
        }
        return true;
      },
      message: "Video file size should not exceed 10MB.",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Media = mongoose.model<IMedia>("Media", mediaSchema);
export default Media;
