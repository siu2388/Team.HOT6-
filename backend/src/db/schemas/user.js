import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    inputId: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
    },
    detailedAddress: {  
      type: String,
    },
    profileImage: {
      path: { type: String },
    },
  },
  {
    timestamps: true,
  },
);

const UserModel = model('User', userSchema);

export { UserModel };
