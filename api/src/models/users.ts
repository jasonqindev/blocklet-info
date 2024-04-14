const mongoose = require('mongoose');

const { model, Schema } = mongoose;

const userSchema = new Schema(
  {
    __v: { type: Number, select: false },
    avatar_url: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default model('User', userSchema);
