import mongoose, { Document, Schema } from "mongoose";
import { IPost } from './post';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bio?: string;
  img?: string;
  createdAt: Date;
  lastLogin: Date;
  resetToken?: string | null;
  resetExpires?: Date | null;
  updatedAt: Date;
  posts: IPost['_id'][];
  followers: mongoose.Types.ObjectId[];
  following: mongoose.Types.ObjectId[];
}

const userSchema: Schema<IUser> = new Schema({
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
    unique: true,
    required: true,
    validate: {
      validator: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      message: "Invalid email format",
    },
  },

  password: {
    type: String,
    required: true,
    validate: {
      validator: (password: string) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[^\s]).{8,}$/.test(password),
      message: "Password must be at least 8 characters long and contain at least one capital letter, one small letter, one digit, and one special character.",
    },
  },

  bio: {
    type: String,
  },

  img: {
    type: String,
  },

  resetToken: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },

  resetExpires: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },

  lastLogin: {
    type: Date,
  },

  posts: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Post' 
  }],

  followers: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  }],

  following: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  }]

}, {
  timestamps: true 

});

// Hash password before saving the user
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const bcrypt = await import('bcrypt'); 
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
