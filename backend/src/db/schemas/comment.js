import { Schema, model } from 'mongoose';

const CommentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    boardId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },

    createdAt: {
      type: String,
      default: getDateToday(),
    },
  },
  {
    timestamps: true,
  },
);
const CommentModel = model('Comment', CommentSchema);

export { CommentModel };

function getDateToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const dateString = `${year}-${month}-${day}`;
  return dateString;
}
