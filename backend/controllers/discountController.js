import asyncHandler from "express-async-handler";
import Discount from "../models/discount.js";

// @desc    Fetch all categories
// @route   POST /api/categorie/
// @access  Public
export const getDiscounts = asyncHandler(async (req, res) => {
  const discounts = await Discount.find().populate("product");

  if (!discounts) {
    res.status(500).json({ success: false });
  }
  res.status(200).json({ discounts });
});

// @desc    Fetch category by id
// @route   POST /api/categorie/:id
// @access  Public
export const getDiscountsById = asyncHandler(async (req, res) => {
  const discount = await Discount.findById(req.params.id).populate("product");;

  if (discount) {
    res.json(discount);
  } else {
    res.status(404);
    throw new Error("discount Not Found");
  }
});

// @desc    create category
// @route   POST /api/categorie/:id
// @access  Private/Admin
export const createDiscounts = asyncHandler(async (req, res) => {
  let discount = new Discount({
    product: req.body.product,
    icon: req.body.icon,
  });
  discount = await discount.save();

  if (!discount) return res.status(400).send("the discount cannot be created!");

  res.send(discount);
});

// @desc    update category
// @route   POST /api/update/:id
// @access  Private/Admin
export const updateDiscounts = asyncHandler(async (req, res) => {
  const { product, icon } = req.body;

  const discount = await Discount.findById(req.params.id);

  if (discount) {
    discount.product = product;
    discount.icon = icon;
   

    const updatedDiscount = await discount.save();
    res.json(updatedDiscount);
  } else {
    res.status(404);
    throw new Error("discount Not Found");
  }
});

// @desc    delete category
// @route   POST /api/delete/:id
// @access  Private/Admin
export const deleteDiscounts = asyncHandler(async (req, res) => {
    Discount.findByIdAndRemove(req.params.id)
    .then((discount) => {
      if (discount) {
        return res
          .status(200)
          .json({ success: true, message: "the discount is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "discount not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});
