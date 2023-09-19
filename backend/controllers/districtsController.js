import asyncHandler from "express-async-handler";
import Districts from "../models/districts.js";

export const getDistricts = asyncHandler(async (req, res) => {
  const districts = await Districts.find();

  res.status(200).json({ districts });
});

export const getDestinationsBySourceId = asyncHandler(async (req, res) => {
  const district = await Districts.findById(req.params.id);

  const destinations = district.destinations;

  res.status(200).json({ destinations });
});

export const createDistrict = asyncHandler(async (req, res) => {
  const { source, name, price } = req.body;

  const districtExists = await Districts.findOne({ source: source });

  if (districtExists) {
    res.status(400);
    throw new Error("District already exists");
  } else {
    const destinations = {
      name: name,
      price: price,
    };

    let district = new Districts({
      source: source,
      destinations: destinations,
    });
    if (district) {
      district = await district.save();
      res.json(district);
    } else {
      res.status(400).json("the district cannot be created!");
    }
  }
});

export const addDestinations = asyncHandler(async (req, res) => {
  let district = await Districts.findById(req.params.id);

  const { name, price } = req.body;

  if (district) {
    district.destinations.push({
      name: name,
      price: price,
    });

    district = await district.save();
    res.json(district);
  } else {
    res.status(400).json("the destinations cannot be added!");
  }
});

// @desc    delete category
// @route   POST /api/delete/:id
// @access  Private/Admin
export const deleteDestinations = asyncHandler(async (req, res) => {
  const { index } = req.body;
  let district = await Districts.findById(req.params.id);

  district.destinations.splice(index, 1);

  district = await district.save();
  res.json(district);
});

// @desc    delete category
// @route   POST /api/delete/:id
// @access  Private/Admin
export const deleteDistrict = asyncHandler(async (req, res) => {
  Districts.findByIdAndRemove(req.params.id)
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

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateDistrict = asyncHandler(async (req, res) => {
  const { source } = req.body;

  const district = await Districts.findById(req.params.id);

  if (district) {
    district.source = source;

    const updatedDistrict = await district.save();
    res.json({
      updatedDistrict,
    });
  } else {
    res.status(404);
    throw new Error("District Not Found");
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateDestination = asyncHandler(async (req, res) => {
  const { index, destination, price } = req.body;
  let district = await Districts.findById(req.params.id);
  if (district) {

    const destinations = {
      name: destination,
      price: price,
    };
    district.destinations.splice(index, 1,destinations);

    district = await district.save();
    res.json(district);
  } else {
    res.status(404);
    throw new Error("District Not Found");
  }
});
