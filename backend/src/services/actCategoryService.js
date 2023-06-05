import { ActCategory } from '../db/models/ActCategory.js';

class actCategoryService {
  // create/ post
  static async getactCategory({ category }) {
    const activityUser = {
      category,
    };
    return activityUser;
  }
}

export { actCategoryService };
