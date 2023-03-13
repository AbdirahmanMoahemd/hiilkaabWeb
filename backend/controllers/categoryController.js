import asyncHandler from "express-async-handler";
import Category from "../models/category.js";

// @desc    Fetch all categories
// @route   POST /api/categorie/
// @access  Public
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  if (!categories) {
    res.status(500).json({ success: false });
  }
  res.status(200).json({ categories });
});


// @desc    Fetch all categories
// @route   POST /api/categorie/
// @access  Public
export const getCategoriesFooter = asyncHandler(async (req, res) => {
  const categories = await Category.find().limit(5);

  if (!categories) {
    res.status(500).json({ success: false });
  }
  res.status(200).json({ categories });
});

// @desc    Fetch category by id
// @route   POST /api/categorie/:id
// @access  Public
export const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    res.json(category);
  } else {
    res.status(404);
    throw new Error("category Not Found");
  }
});

// @desc    Fetch all categories
// @route   POST /api/categorie/
// @access  Public
export const getCategories2 = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({});
    categories.sort((a, b) => (a._id > b._id) ? -1 : 1)
    res.json(categories);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// @desc    create category
// @route   POST /api/categorie/:id
// @access  Private/Admin
export const createCategory = asyncHandler(async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
  });
  category = await category.save();

  if (!category) return res.status(400).send("the category cannot be created!");

  res.send(category);
});

// @desc    update category
// @route   POST /api/update/:id
// @access  Private/Admin
export const updateCategory = asyncHandler(async (req, res) => {
  const { name, icon } = req.body;

  const category = await Category.findById(req.params.id);

  if (category) {
    category.name = name;
    category.icon = icon;
   

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } else {
    res.status(404);
    throw new Error("Category Not Found");
  }
});

// @desc    delete category
// @route   POST /api/delete/:id
// @access  Private/Admin
export const deleteCategory = asyncHandler(async (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (category) {
        return res
          .status(200)
          .json({ success: true, message: "the category is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "category not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});
