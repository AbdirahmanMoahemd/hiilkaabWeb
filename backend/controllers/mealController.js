import asyncHandler from "express-async-handler";
import Meal from "../models/mealModel.js";

export const getMeals = asyncHandler(async (req, res) => {
  try {
    const meals = await Meal.find();
    meals.sort((a, b) => (a._id > b._id ? -1 : 1));
    res.json(meals);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export const getDisMeals = asyncHandler(async (req, res) => {
  try {
    const meals = await Meal.find({isDiscounted: true});
    meals.sort((a, b) => (a._id > b._id ? -1 : 1));
    res.json(meals);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export const getMealById = asyncHandler(async (req, res) => {
  try {
    const meals = await Meal.findById(req.params.id);

    if (meals) {
      res.json(meals);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


export const getRestaurantMealByname = asyncHandler(async (req, res) => {
  try {
    const meals = await Meal.find({ name: { $regex: req.params.name, $options: "i" },storetype: "restaurant", });

    if (meals) {
      res.json(meals);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});



export const getCoffeeMealByname = asyncHandler(async (req, res) => {
  try {
    const meals = await Meal.find({ name: { $regex: req.params.name, $options: "i" },storetype: "coffee", });

    if (meals) {
      res.json(meals);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});



export const getSweetsMealByname = asyncHandler(async (req, res) => {
  try {
    const meals = await Meal.find({ name: { $regex: req.params.name, $options: "i" },storetype: "sweets", });

    if (meals) {
      res.json(meals);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


export const getMealByResturant = asyncHandler(async (req, res) => {
  try {
    const { restaurants, mealcategoryname } = req.body;
    const meals = await Meal.find({
      storetype: "restaurant",
      restaurants:restaurants,
      mealcategoryname: { $regex: mealcategoryname, $options: "i" },
    });
    if (meals) {
      res.json(meals);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


export const getMealByCoffee = asyncHandler(async (req, res) => {
  try {
    const { restaurants, mealcategoryname } = req.body;
    const meals = await Meal.find({
      storetype: "coffee",
      restaurants:restaurants,
      mealcategoryname: { $regex: mealcategoryname, $options: "i" },
    });
    if (meals) {
      res.json(meals);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export const getMealBySweets = asyncHandler(async (req, res) => {
  try {
    const { restaurants, mealcategoryname } = req.body;
    const meals = await Meal.find({
      storetype: "sweets",
      restaurants:restaurants,
      mealcategoryname: { $regex: mealcategoryname, $options: "i" },
    });
    if (meals) {
      res.json(meals);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export const getDiscountedMeals = asyncHandler(async (req, res) => {
  try {
    const meals = await Meal.find();
    meals.sort((a, b) => (a._id > b._id ? -1 : 1));
    res.json(meals);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export const getMealsByStore = asyncHandler(async (req, res) => {
  try {
    const { query } = req.body;
    const meals = await Meal.find({ storetype: query });

    if (meals) {
      meals.sort((a, b) => (a._id > b._id ? -1 : 1));
      res.json(meals);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export const getMealsByStoreAndDiscount = asyncHandler(async (req, res) => {
  try {
    const { query } = req.body;
    const meals = await Meal.find({ storetype: query, isDiscounted: true });

    if (meals) {
      meals.sort((a, b) => (a._id > b._id ? -1 : 1));
      res.json(meals);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export const getMealsByStoreAvaible = asyncHandler(async (req, res) => {
  try {
    const { query } = req.body;
    const meals = await Meal.find({ storetype: query, status: true });

    if (meals) {
      meals.sort((a, b) => (a._id > b._id ? -1 : 1));
      res.json(meals);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export const getMealsByStoreUnavaible = asyncHandler(async (req, res) => {
  try {
    const { query } = req.body;
    const meals = await Meal.find({ storetype: query, status: false });

    if (meals) {
      meals.sort((a, b) => (a._id > b._id ? -1 : 1));
      res.json(meals);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export const getMealsByCategory = asyncHandler(async (req, res) => {
  try {
    const { query, query2 } = req.body;
    const meals = await Meal.find({
      mealcategoryname: query,
      storetype: query2,
    });

    if (meals) {
      meals.sort((a, b) => (a._id > b._id ? -1 : 1));
      res.json(meals);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export const createNewMeal = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      description,
      images,
      ingredients,
      storetype,
      status,
      price,
      restaurants,
      mealcategoryname,
      isDiscounted,
      newPrice,
      isFeatured,
    } = req.body;

    let meal = new Meal({
      name,
      description,
      images,
      status,
      price,
      storetype,
      ingredients,
      restaurants,
      mealcategoryname,
      isDiscounted,
      newPrice,
      isFeatured,
    });
    meal = await meal.save();
    res.json(meal);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export const updateMeal = asyncHandler(async (req, res) => {
  try {
    const {
      id,
      name,
      description,
      images,
      ingredients,
      status,
      storetype,
      price,
      restaurants,
      mealcategoryname,
      isDiscounted,
      newPrice,
      isFeatured,
    } = req.body;
    let meal = await Meal.findById(id);
    if (meal) {
      meal.name = name;
      meal.description = description;
      meal.images = images;
      meal.status = status;
      meal.price = price;
      meal.storetype = storetype;
      meal.ingredients = ingredients;
      meal.restaurants = restaurants;
      meal.mealcategoryname = mealcategoryname;
      meal.isDiscounted = isDiscounted;
      meal.newPrice = newPrice;
      meal.isFeatured = isFeatured;
      meal = await meal.save();
      res.json(meal);
    } else {
      res.status(404);
      throw new Error("meal Not Found");
    }
  } catch (e) {
    res.status(404).json({ error: "meal Not Found" + e.message });
  }
});

export const deleteMeal = asyncHandler(async (req, res) => {
    try {
        const { id } = req.body;
        let meal = await Meal.findByIdAndDelete(id);
        res.json(meal);
      } catch (e) {
        res.status(500).json({ error: e.message });
      }
});
