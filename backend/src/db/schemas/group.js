import { Schema, model } from 'mongoose';

const GroupSchema = new Schema(
  {
    groupOwner: {
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
    members: {
      type: String,
      required: false,
    },
    thumbnail: {
      path: { type: String },
    },
  },
  {
    timestamps: true,
  },
);
const GroupModel = model('Group', GroupSchema);

export { GroupModel };
