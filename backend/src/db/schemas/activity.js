import { Schema, model } from 'mongoose';

const ActivitySchema = new Schema(
  {
    groupId: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    usedDate: {
      type: Date,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['tumbler', 'multipleContainers'],
    },
    proofImg: {
      type: String,
    },
  },
  {
    timestamp: true,
  },
);

const ActivityModel = model('Activity', ActivitySchema);
export { ActivityModel };
