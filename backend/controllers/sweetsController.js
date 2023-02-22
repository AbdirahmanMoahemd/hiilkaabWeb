import Sweets from "../models/sweetsModel.js";
import asyncHandler from "express-async-handler";

export const getSweets = asyncHandler(async (req, res) => {
  try {
    const sweetss = await Sweets.find();
    res.json(sweetss);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export const getSweetsByname = asyncHandler(async (req, res) => {
  try {
    const sweets = await Sweets.find({
      name: { $regex: req.params.name, $options: "i" },
    });
    if (sweets) {
      res.json(sweets);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export const getSweetsById = asyncHandler(async (req, res) => {
  try {
    const sweet = await Sweets.findById(req.params.id);

    if (sweet) {
      res.json(sweet);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export const createSweets = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      logo,
      banner,
      location,
      time,
      status,
      mealcategories,
      message,
    } = req.body;

    let sweets = new Sweets({
      name,
      logo,
      banner,
      location,
      time,
      status,
      mealcategories,
      message,
    });
    sweets = await sweets.save();
    res.json(sweets);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export const updateSweets = asyncHandler(async (req, res) => {
  try {
    const {
      id,
      name,
      logo,
      banner,
      location,
      time,
      status,
      mealcategories,
      message,
    } = req.body;
    let sweets = await Sweets.findById(id);
    if (sweets) {
      sweets.name = name;
      sweets.logo = logo;
      sweets.banner = banner;
      sweets.location = location;
      sweets.time = time;
      sweets.status = status;
      sweets.mealcategories = mealcategories;
      sweets.message = message;
      sweets = await sweets.save();
      res.json(sweets);
    }
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
});

export const deleteSweets = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    let sweets = await Sweets.findByIdAndDelete(id);
    res.json(sweets);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export const rateSweets = asyncHandler(async (req, res) => {
  try {
    const { id, rating } = req.body;
    let sweets = await Sweets.findById(id);

    for (let i = 0; i < sweets.ratings.length; i++) {
      if (sweets.ratings[i].userId == req.user) {
        sweets.ratings.splice(i, 1);
        break;
      }
    }

    const ratingSchema = {
      userId: req.user._id,
      rating,
    };

    sweets.ratings.push(ratingSchema);
    sweets.rating = rating;
    sweets = await sweets.save();
    res.json(sweets);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
