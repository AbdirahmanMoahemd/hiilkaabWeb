import asyncHandler from "express-async-handler";
import MealCategory from "../models/mealcategoryModel.js";

export const getMealCategories = asyncHandler(async (req, res) => {
  try {
    const mealcategory = await MealCategory.find();

    res.json(mealcategory);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export const getMealCategoriesByRestaurant = asyncHandler(async (req, res) => {
  try {

    const mealcategory = await MealCategory.find({ restaurant: { $regex: req.params.name, $options: "i" } });
    if (mealcategory) {
      res.json(mealcategory);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export const getMealCategoriesById = asyncHandler(async (req, res) => {
  try {
    const mealcategory = await MealCategory.findById(req.params.id);

    if (mealcategory) {
      res.json(mealcategory);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export const createMealCategory = asyncHandler(async (req, res) => {
  try {
    const { names, restaurant } = req.body;

    const restaurantExists = await MealCategory.findOne({ restaurant });
    if (restaurantExists) {
      return res
        .status(400)
        .json({ msg: "This restaurant already has a category" });
    } else {
      let mealcategory = new MealCategory({
        names,
        restaurant,
      });
      mealcategory = await mealcategory.save();
      res.json(mealcategory);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export const updateMealCategory = asyncHandler(async (req, res) => {
  try {
    const { id, names, restaurant } = req.body;
    let mealcategory = await MealCategory.findById(id);
    if (mealcategory) {
      mealcategory.names = names;
      mealcategory.restaurant = restaurant;
      mealcategory = await mealcategory.save();
      res.json(mealcategory);
    }
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
});

export const deleteMealCategor = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    let mealcategory = await MealCategory.findByIdAndDelete(id);
    res.json(mealcategory);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
