import mongoose, { Document, Schema } from "mongoose";

export interface ISetting extends Document {
    _id: mongoose.Types.ObjectId;
    key: string;
    value: string;
    createdAt: Date;
    updatedAt?: Date;
}

const settingSchema: Schema<ISetting> = new Schema({
  key: {
    type: String,
    required: true,
  },
  value: {
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

const Setting = mongoose.model<ISetting>("Setting", settingSchema);
export default Setting;
