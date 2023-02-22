import Restaurant from "../models/restaurantsModel.js";
import asyncHandler from "express-async-handler";

export const getRestaurants = asyncHandler(async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export const getRestaurantsByname = asyncHandler(async (req, res) => {
  try {
    const restaurants = await Restaurant.find({
      name: { $regex: req.params.name, $options: "i" },
    });
    if (restaurants) {
      res.json(restaurants);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


export const getCategoriesRestaurants = asyncHandler(async (req, res) => {
  try {
    const restaurants = await Restaurant.find({
      name: { $regex: req.params.name, $options: "i" },
    });
    if (restaurants) {
      
      res.json(restaurants);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export const getRestaurantsById = asyncHandler(async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (restaurant) {
      res.json(restaurant);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export const createRestaurants = asyncHandler(async (req, res) => {
  try {
    const { name, logo, banner, location, time, status, mealcategories, message } = req.body;

    let restaurant = new Restaurant({
      name,
      logo,
      banner,
      location,
      time,
      status,
      mealcategories,
      message,
    });
    restaurant = await restaurant.save();
    res.json(restaurant);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export const updateRestaurants = asyncHandler(async (req, res) => {
  try {
    const { id, name, logo, banner, location, time,mealcategories, status, message } =
      req.body;
    let restaurant = await Restaurant.findById(id);
    if (restaurant) {
      restaurant.name = name;
      restaurant.logo = logo;
      restaurant.banner = banner;
      restaurant.location = location;
      restaurant.time = time;
      restaurant.status = status;
      restaurant.mealcategories = mealcategories;
      restaurant.message = message;
      restaurant = await restaurant.save();
      res.json(restaurant);
    }
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
});

export const deleteRestaurants = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    let restaurant = await Restaurant.findByIdAndDelete(id);
    res.json(restaurant);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export const rateRestaurants = asyncHandler(async (req, res) => {
  try {
    const { id, rating } = req.body;
    let restaurant = await Restaurant.findById(id);

    for (let i = 0; i < restaurant.ratings.length; i++) {
      if (restaurant.ratings[i].userId == req.user) {
        restaurant.ratings.splice(i, 1);
        break;
      }
    }

    const ratingSchema = {
      userId: req.user._id,
      rating,
    };

    restaurant.ratings.push(ratingSchema);
    restaurant.rating = rating;
    restaurant = await restaurant.save();
    res.json(restaurant);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
