import asyncHandler from "express-async-handler";
import Brand from "../models/brandModel.js";

// @desc    Fetch all subcategories
// @route   Get /api/subcategories/
// @access  Public
export const getBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find();

  if (!brands) {
    res.status(500).json({ success: false });
  }
  res.status(200).json({ brands });
});

// @desc    Fetch subcategory by id
// @route   Get /api/subcategories/:id
// @access  Public
export const getBrandById = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (brand) {
    res.json(brand);
  } else {
    res.status(404);
    throw new Error("brand Not Found");
  }
});

// @desc    create subcategory
// @route   POST /api/subcategories/
// @access  Private/Admin
export const createBrand = asyncHandler(async (req, res) => {
  let brand = new Brand({
    name: req.body.name,
  });
  brand = await brand.save();

  if (!brand)
    return res.status(400).send("the brand cannot be created!");

  res.send(brand);
});

// @desc    update SubCategory
// @route   PUT /api/subcategories/
// @access  Private/Admin
export const updateBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const brand = await Brand.findById(req.params.id);

  if (brand) {
    brand.name = name;

    const updatedBrand = await brand.save();
    res.json(updatedBrand);
  } else {
    res.status(404);
    throw new Error("brand Not Found");
  }
});

// @desc    Delete SubCategory
// @route   DELETE /api/subcategories/
// @access  Private/Admin
export const deleteBrand = asyncHandler(async (req, res) => {
    Brand.findByIdAndRemove(req.params.id)
    .then((brand) => {
      if (brand) {
        return res
          .status(200)
          .json({ success: true, message: "the brand is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "brand not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});
