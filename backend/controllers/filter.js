import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

export const searchByQueryType = asyncHandler(async (req, res) => {
  const { type, query, query2, query3 } = req.body;

  try {
    let products;

    switch (type) {
      case "category":
        products = await Product.find({ category: query });
        break;
      case "subcategory":
        products = await Product.find({ subcategory: query2 });
        break;
      case "brand":
        products = await Product.find({ brand: query3 });
        break;
    }

    if (!products.length > 0) {
      products =[];
    }

    res.json({ products });
  } catch (err) {
    console.log(err, "filter Controller.searchByQueryType error");
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
});
