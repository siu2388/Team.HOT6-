import { Schema, model } from 'mongoose';

const GroupSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    groupOwnerId: {
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
    groupOwnerInfo: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
      },
    ],
    thumbnail: { type: String },
  },
  { strictPopulate: false },
  {
    timestamps: true,
  },
);
const GroupModel = model('Group', GroupSchema);

export { GroupModel };
