import asyncHandler from "express-async-handler";
import TopCategory from "../models/topCategories.js";

// @desc    Fetch all categories
// @route   POST /api/categorie/
// @access  Public
export const getTopCategories = asyncHandler(async (req, res) => {
  const topcategories = await TopCategory.find()
    .populate("category1")
    .populate("category2")
    .populate("category3")
    .populate("category4");

  if (!topcategories) {
    res.status(500).json({ success: false });
  }
  res.status(200).json({ topcategories });
});

// @desc    Fetch category by id
// @route   POST /api/categorie/:id
// @access  Public
export const getTopCategoryById = asyncHandler(async (req, res) => {
  const topcategories = await TopCategory.findById(req.params.id)
    .populate("category1")
    .populate("category2")
    .populate("category3")
    .populate("category4");

  if (topcategories) {
    res.json(topcategories);
  } else {
    res.status(404);
    throw new Error("topcategories Not Found");
  }
});

// @desc    create category
// @route   POST /api/categorie/:id
// @access  Private/Admin
export const createTopCategory = asyncHandler(async (req, res) => {
  let topcategories = new TopCategory({
    category1: req.body.category1,
    category2: req.body.category2,
    category3: req.body.category3,
    category4: req.body.category4,
  });
  topcategories = await topcategories.save();

  if (!topcategories)
    return res.status(400).send("the topcategories cannot be created!");

  res.send(topcategories);
});

// @desc    update category
// @route   POST /api/update/:id
// @access  Private/Admin
export const updateTopCategory = asyncHandler(async (req, res) => {
  const { category1, category2, category3, category4 } = req.body;

  const topcategories = await TopCategory.findById(req.params.id);

  if (topcategories) {
    topcategories.category1 = category1;
    topcategories.category2 = category2;
    topcategories.category3 = category3;
    topcategories.category4 = category4;

    const updatedTopCategory = await TopCategory.save();
    res.json(updatedTopCategory);
  } else {
    res.status(404);
    throw new Error("TopCategory Not Found");
  }
});

// @desc    delete category
// @route   POST /api/delete/:id
// @access  Private/Admin
export const deleteTopCategory = asyncHandler(async (req, res) => {
  TopCategory.findByIdAndRemove(req.params.id)
    .then((topcategory) => {
      if (topcategory) {
        return res
          .status(200)
          .json({ success: true, message: "the topcategory is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "topcategory not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});
