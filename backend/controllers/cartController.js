import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import Meal from "../models/mealModel.js";
import User from "../models/userModel.js";

// @desc    Fetch all categories
// @route   POST /api/categorie/
// @access  Public
export const addToCart = asyncHandler(async (req, res) => {
  try {
    const { id, name, images,price,colors, sizes } = req.body;
    const product = await Product.findById(id);
    let user = await User.findById(req.user).populate("cart.product")
    .populate("wishlist.product")
    .populate("cartMeal.meal");;

    if (user.cart.length == 0) {
      user.cart.push({ product, quantity: 1,name, images, price:product.price, sizes, colors });
    } else {
      let isProductFound = false;
      for (let i = 0; i < user.cart.length; i++) {
        if (user.cart[i].product._id.equals(product._id)) {
          isProductFound = true;
        }
      }

      if (isProductFound) {
        let producttt = user.cart.find((productt) =>
          productt.product._id.equals(product._id)
        );
        producttt.quantity += 1;
      } else {
        user.cart.push({ product, quantity: 1, name, images, price, sizes, colors });
      }
    }
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// @desc    Fetch all categories
// @route   POST /api/categorie/
// @access  Public
export const addToWishlist = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    let user = await User.findById(req.user).populate("cart.product")
    .populate("wishlist.product")
    .populate("cartMeal.meal");;

    if (user.wishlist.length == 0) {
      user.wishlist.push({ product });
    } else {
      let isProductFound = false;
      for (let i = 0; i < user.wishlist.length; i++) {
        if (user.wishlist[i].product._id.equals(product._id)) {
          isProductFound = true;
        }
      }

      if (isProductFound) {
        return res.status(400).json({ msg: "already added" });
      } else {
        user.wishlist.push({ product });
      }
    }
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// @desc    Fetch all categories
// @route   POST /api/categorie/
// @access  Public
export const removeCartItem = asyncHandler(async (req, res) => {
  try {
    const { index } = req.body;
    let user = await User.findById(req.user).populate("cart.product")
    .populate("wishlist.product")
    .populate("cartMeal.meal");;

    user.cart.splice(index, 1);

    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// @desc    Fetch all categories
// @route   POST /api/categorie/
// @access  Public
export const removeCartMealItem = asyncHandler(async (req, res) => {
  try {
    const { index } = req.body;
    let user = await User.findById(req.user).populate("cart.product")
    .populate("wishlist.product")
    .populate("cartMeal.meal");;

    user.cartMeal.splice(index, 1);

    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// @desc    Fetch all categories
// @route   POST /api/categorie/
// @access  Public
export const removeWishlistItem = asyncHandler(async (req, res) => {
  try {
    const { index } = req.body;
    let user = await User.findById(req.user).populate("cart.product")
    .populate("wishlist.product")
    .populate("cartMeal.meal");;

    user.wishlist.splice(index, 1);

    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// @desc    Fetch all categories
// @route   POST /api/categorie/
// @access  Public
export const addToCartMeal = asyncHandler(async (req, res) => {
  try {
    const { id, quantity,name, images, price, note } = req.body;
    const meal = await Meal.findById(id);
    let user = await User.findById(req.user).populate("cart.product")
    .populate("wishlist.product")
    .populate("cartMeal.meal");;

    if (user.cartMeal.length == 0) {
      user.cartMeal.push({ meal, quantity,name, images, price , note});
    } else {
      let isMealFound = false;
      for (let i = 0; i < user.cartMeal.length; i++) {
        if (user.cartMeal[i].meal._id.equals(meal._id)) {
          isMealFound = true;
        }
      }

      if (isMealFound) {
        let producttt = user.cartMeal.find((productt) =>
          productt.meal._id.equals(meal._id)
        );
        producttt.quantity += 1;
      } else {
        user.cartMeal.push({ meal, quantity: quantity,name:name, images:images, price:price, note:note });
      }
    }
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// @desc    Fetch all categories
// @route   POST /api/categorie/
// @access  Public
export const increasCartMeal = asyncHandler(async (req, res) => {
  try {
    const { id,name, images, price } = req.body;
    const meal = await Meal.findById(id)
    let user = await User.findById(req.user).populate("cart.product")
    .populate("wishlist.product")
    .populate("cartMeal.meal");

    if (user.cartMeal.length == 0) {
      user.cartMeal.push({ meal, quantity: 1,name:name, images:images, price:price });
    } else {
      let isMealFound = false;
      for (let i = 0; i < user.cartMeal.length; i++) {
        if (user.cartMeal[i].meal._id.equals(meal._id)) {
          isMealFound = true;
        }
      }

      if (isMealFound) {
        let producttt = user.cartMeal.find((productt) =>
          productt.meal._id.equals(meal._id)
        );
        producttt.quantity += 1;
      } else {
        user.cartMeal.push({ meal, quantity: 1,name:name, images:images, price:price, });
      }
    }
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// @desc    Fetch all categories
// @route   POST /api/categorie/
// @access  Public
export const deleteCart = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
    let user = await User.findById(req.user).populate("cart.product")
    .populate("wishlist.product")
    .populate("cartMeal.meal");;;

    for (let i = 0; i < user.cart.length; i++) {
      if (user.cart[i].product._id.equals(product._id)) {
        if (user.cart[i].quantity == 1) {
          user.cart.splice(i, 1);
        } else {
          user.cart[i].quantity -= 1;
        }
      }
    }
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// @desc    Fetch all categories
// @route   POST /api/categorie/
// @access  Public
export const deleteCartMeal = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const meal = await Meal.findById(id)
    let user = await User.findById(req.user).populate("cart.product")
    .populate("wishlist.product")
    .populate("cartMeal.meal");;;

    for (let i = 0; i < user.cartMeal.length; i++) {
      if (user.cartMeal[i].meal._id.equals(meal._id)) {
        if (user.cartMeal[i].quantity == 1) {
          user.cartMeal.splice(i, 1);
        } else {
          user.cartMeal[i].quantity -= 1;
        }
      }
    }
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
