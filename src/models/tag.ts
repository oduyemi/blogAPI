import mongoose, { Document, Schema } from "mongoose";

export interface ITag extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}

const tagSchema: Schema<ITag> = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Tag = mongoose.model<ITag>("Tag", tagSchema);
export default Tag;
