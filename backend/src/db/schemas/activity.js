import { Schema, model } from 'mongoose';

const ActivitySchema = new Schema(
  {
    groupId: {
      type: String,
      require: true,
    },
    userId: {
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
    actCategoryId: {
      type: String,
      require: true,
    },
<<<<<<< HEAD
    profileImg: {
      type: Image,
      require: true,
    },
=======
>>>>>>> e46d3dcf0db3d9ceb70b80257fce54f1bba52ffb
  },
  {
    timestamp: true,
  },
);

const ActivityModel = model('Activity', ActivitySchema);
export { ActivityModel };
