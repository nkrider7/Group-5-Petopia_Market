import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { IUser } from '../types/model/user.type.js';
import { DeleteAssets } from '../utils/Cloudinary.util.js';
import e from 'express';

const SALT_ROUND = 10;

const userSchema: mongoose.Schema<IUser> = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'FirstName is Required Field'],
      trim: true,
    },
    lastName: {
      type: String,
      default: '',
      trim: true,
    },
    avatar: {
      publicId: {
        type: String,
        default: '',
      },
      url: {
        type: String,
        default: '',
      },
    },
    email: {
      type: String,
      required: [true, 'Email is Required Field'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is Required Field'],
      select: false,
    },
    refreshToken: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, SALT_ROUND);
  next();
});

userSchema.methods.deleteAvatar = async function (): Promise<boolean | null> {
  if (this.avatar.publicId) return await DeleteAssets(this.avatar.publicId);
  return true;
};

userSchema.methods.ComparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  if (process.env.ACCESS_TOKEN_SECRET) {
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      },
    );
  }
};
userSchema.methods.generateRefreshToken = function () {
  if (process.env.REFRESH_TOKEN_SECRET)
    return jwt.sign(
      {
        _id: this._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      },
    );
};

const userModel: mongoose.Model<IUser> = mongoose.models.User || mongoose.model('User', userSchema);

export default userModel;
