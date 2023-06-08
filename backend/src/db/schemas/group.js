import { Schema, model } from 'mongoose';

const GroupSchema = new Schema(
  {
    groupOwner: {
      type: String,
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
    totalNumOfMembers: {
      type: Number,
      required: true,
    },
    thumbnail: { type: String },
    groupJoin: {
      type: Schema.Types.ObjectId,
      ref: 'groupJoin',
    },
  },
  {
    timestamps: true,
  },
);
const GroupModel = model('Group', GroupSchema);

export { GroupModel };
