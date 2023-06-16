import { Schema, model } from 'mongoose';

const BoardSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    like: {
      type: Number,
      default: 0,
    },
    unLike: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: String,
      default: getDateToday(),
    },
    boardImage: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  },
);
const BoardModel = model('Board', BoardSchema);

export { BoardModel };

function getDateToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const dateString = `${year}-${month}-${day}`;
  return dateString;
}
