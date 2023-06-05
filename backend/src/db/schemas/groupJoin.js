import { Schema, model } from 'mongoose';

const GroupJoinSchema = new Schema(
  {
    groupId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    members: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);
const GroupJoinModel = model('GroupJoin', GroupJoinSchema);

export { GroupJoinModel };
