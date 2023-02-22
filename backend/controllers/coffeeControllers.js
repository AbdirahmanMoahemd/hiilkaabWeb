import Coffee from "../models/coffeeModel.js";
import asyncHandler from "express-async-handler";

export const getCoffee = asyncHandler(async (req, res) => {
  try {
    const coffees = await Coffee.find();
    res.json(coffees);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export const getCoffeeByname = asyncHandler(async (req, res) => {
  try {
    const coffees = await Coffee.find({
      name: { $regex: req.params.name, $options: "i" },
    });
    if (coffees) {
      res.json(coffees);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export const getCoffeeById = asyncHandler(async (req, res) => {
  try {
    const coffee = await Coffee.findById(req.params.id);

    if (coffee) {
      res.json(coffee);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export const createCoffee = asyncHandler(async (req, res) => {
  try {
    const { name, logo, banner, location, time, status,mealcategories, message } = req.body;

    let coffee = new Coffee({
      name,
      logo,
      banner,
      location,
      time,
      status,
      mealcategories,
      message,
    });
    coffee = await coffee.save();
    res.json(coffee);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export const updateCoffee = asyncHandler(async (req, res) => {
  try {
    const { id, name, logo, banner, location, time, status, mealcategories, message } =
      req.body;
    let coffee = await Coffee.findById(id);
    if (coffee) {
      coffee.name = name;
      coffee.logo = logo;
      coffee.banner = banner;
      coffee.location = location;
      coffee.time = time;
      coffee.status = status;
      coffee.mealcategories =  mealcategories;
      coffee.message = message;
      coffee = await coffee.save();
      res.json(coffee);
    }
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
});

export const deleteCoffee = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    let coffee = await Coffee.findByIdAndDelete(id);
    res.json(coffee);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export const ratingCoffee = asyncHandler(async (req, res) => {
  try {
    const { id, rating } = req.body;
    let coffee = await Coffee.findById(id);

    for (let i = 0; i < coffee.ratings.length; i++) {
      if (coffee.ratings[i].userId == req.user) {
        coffee.ratings.splice(i, 1);
        break;
      }
    }

    const ratingSchema = {
      userId: req.user._id,
      rating,
    };

    coffee.ratings.push(ratingSchema);
    coffee.rating = rating;
    coffee = await coffee.save();
    res.json(coffee);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
