import { Schema, model } from 'mongoose';

const ActCategorySchema = new Schema(
  {
    category: {
      type: String,
      require: true,
    },
  },
  {
    timestamp: true,
  },
);

const ActCategoryModel = model('ActCategory', ActCategorySchema);
export { ActCategoryModel };
