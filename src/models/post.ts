import mongoose, { Document, Schema } from "mongoose";

export interface IPost extends Document {
    _id: mongoose.Types.ObjectId;
    title: string;
    content: string;
    slug: string;
    img?: string;
    author: mongoose.Types.ObjectId;
    tag: mongoose.Types.ObjectId;
    category: mongoose.Types.ObjectId;
    likesCount?: number;
    createdAt: Date; 
    publishedAt: Date;
    updatedAt?: Date;
}

const postSchema: Schema<IPost> = new Schema({
    title: {
        type: String,
        required: true,
    },

    content: {
        type: String,
        required: true,
    },

    slug: {
        type: String,
        required: true,
    },

    img: {
        type: String,
    },

    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    tag: {
        type: Schema.Types.ObjectId,
        ref: "Tag",
        required: true,
    },

    category: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    likesCount: {
        type: Number,
        default: 0,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    publishedAt: {
        type: Date,
        default: Date.now,
    },

    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Post = mongoose.model<IPost>("Post", postSchema);
export default Post;
