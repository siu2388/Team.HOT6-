import { Schema, model } from 'mongoose';

const ActivitySchema = new Schema(
  {
    groupId: {
      type: String,
      require: true,
    },
    loginedId: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    usedDate: {
      type: Date,
      require: true,
    },
    state: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
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
