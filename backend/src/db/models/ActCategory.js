import { ActCategoryModel } from '../db/schemas/actCategory';

class ActCategory {
  static async create({ newActCategory }) {
    const createdNewActCategory = await ActCategoryModel.create(newActCategory);
    return createdNewActCategory;
  }

  static async findById({ actCategoryId }) {
    const actCategory = await ActCategoryModel.fineOne({ id: actCategoryId });
    return actCategory;
  }

  static async findByUserId({ userId }) {
    const actCategory = await ActCategoryModel.find({ userId });
    return actCategory;
  }

  static async update({ actCategoryId, fieldToUpdate, newValue }) {
    const filter = { id: actCategoryId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedActCategory = await ActCategoryModel.findOneAndUpdate(filter, update, option);
    return updatedActCategory;
  }

  static async deleteById({ actCategoryId }) {
    const deleteResult = await ActCategoryModel.deleteOne({
      id: actCategoryId,
    });
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}

export { ActCategory };
