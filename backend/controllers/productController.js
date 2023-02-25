import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const products = await Product.find({ ...keyword })
  .populate("brand")
    .populate("category")
    .populate("subcategory");
  products.sort((a, b) => (a._id > b._id ? -1 : 1));

  res.json({ products });
});



// // @desc    Fetch all products
// // @route   GET /api/products
// // @access  Public
// export const getProductsPage = asyncHandler(async (req, res) => {
//   const pageSize = 20
//   const page = Number(req.query.pageNumber) || 1

//   const keyword = req.query.keyword
//     ? {
//         name: {
//           $regex: req.query.keyword,
//           $options: 'i',
//         },
//       }
//     : {}

//   const count = await Product.countDocuments({ ...keyword })
//   const products = await Product.find({ ...keyword })
//     .limit(pageSize)
//     .skip(pageSize * (page - 1))

//   res.json({ products, page, pages: Math.ceil(count / pageSize) })
// })






// @desc    Get top rated products
// @route   POST /api/products/top
// @access  Public
export const getTopProducts = asyncHandler (async (req, res) => {
  
  const products = await Product.find({}).populate("brand").populate("category")
  .populate("subcategory").sort({ rating: -1 }).limit(16)
  products.sort((a, b) => (a._id > b._id) ? -1 : 1)
  res.json({ products })
})




// @desc    Get top rated products
// @route   POST /api/products/top
// @access  Public
export const getProductsLowPriceToHight = asyncHandler (async (req, res) => {
  
  const products = await Product.find({}).sort({ price: -1 }).populate("brand").populate("category")
  .populate("subcategory"); 

  res.json({ products })
})



// @desc    Fetch products by category
// @route   GET /api/products
// @access  Public
export const getDiscountedProducts = asyncHandler(async (req, res) => {
  try {
    let products = await Product.find({ isDiscounted:true})
    .populate("category")
    .populate("subcategory");

    if (products) {
      products.sort((a, b) => (a._id > b._id ? -1 : 1));
      res.json(products);
    } 
  } catch (e) {
    res.status(500).json({ error: e.message });
  }

});


// @desc    Fetch  products by subcategory
// @route   GET /api/products
// @access  Public
export const getProductsByHightToLowProducts = asyncHandler(async (req, res) => {
  try {
    const { query } = req.body;
    const products = await Product.find({category: query,isFeatured:true}).sort({ price: -1 });
    
    if (products) {
      
      res.json(products);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


export const getDiscountedProductsByCat = asyncHandler(async (req, res) => {
  try {
    const { query } = req.body;
    let products = await Product.find({ isDiscounted:true, category: query })
    .populate("category")
    .populate("subcategory");

    if (products) {
      products.sort((a, b) => (a._id > b._id ? -1 : 1));
      res.json(products);
    } 
  } catch (e) {
    res.status(500).json({ error: e.message });
  }

});


// @desc    Fetch products by category
// @route   GET /api/products
// @access  Public
export const getProductsByCategory2 = asyncHandler(async (req, res) => {
  try {
    const { query } = req.body;
    let products = await Product.find({ category: query })
    .populate("category")
    .populate("subcategory");

    if (products) {
      products.sort((a, b) => (a._id > b._id ? -1 : 1));
      res.json(products);
    } 
  } catch (e) {
    res.status(500).json({ error: e.message });
  }

});


// @desc    Fetch products by category
// @route   GET /api/products
// @access  Public
export const getProductsBySubCategory2 = asyncHandler(async (req, res) => {
  try {
    const { query } = req.body;
    let products = await Product.find({ subcategory: query })
    .populate("category")
    .populate("subcategory");

    if (products) {
      products.sort((a, b) => (a._id > b._id ? -1 : 1));
      res.json(products);
    } 
  } catch (e) {
    res.status(500).json({ error: e.message });
  }

});


// @desc    Fetch  products by subcategory
// @route   GET /api/products
// @access  Public
export const getProductsByLowToHightProducts = asyncHandler(async (req, res) => {
  try {
    const { query } = req.body;
    const products = await Product.find({category: query,isFeatured:true}).sort({ price: 1 });
    
    if (products) {
      
      res.json(products);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});



// @desc    Fetch products by category
// @route   GET /api/products
// @access  Public
export const getProductsByCategory = asyncHandler(async (req, res) => {
  const { query } = req.body;

  let products = await Product.find({ category: query }).populate("brand")
    .populate("category")
    .populate("subcategory");

  products.sort((a, b) => (a._id > b._id ? -1 : 1));
  res.json({ products });
});


// @desc    Fetch products by category
// @route   GET /api/products
// @access  Public
export const getProductsByTopCategory1 = asyncHandler(async (req, res) => {
  const { query } = req.body;

  let products = await Product.find({ category: query }).sort({ rating: -1 }).limit(5).populate("brand")
    .populate("category")
    .populate("subcategory");

  products.sort((a, b) => (a._id > b._id ? -1 : 1));
  res.json({ products });
});


// @desc    Fetch products by category
// @route   GET /api/products
// @access  Public
export const getProductsByTopCategory2 = asyncHandler(async (req, res) => {
  const { query } = req.body;

  let products = await Product.find({ category: query }).sort({ rating: -1 }).limit(5).populate("brand")
    .populate("category")
    .populate("subcategory");

  products.sort((a, b) => (a._id > b._id ? -1 : 1));
  res.json({ products });
});

// @desc    Fetch products by category
// @route   GET /api/products
// @access  Public
export const getProductsByTopCategory3 = asyncHandler(async (req, res) => {
  const { query } = req.body;

  let products = await Product.find({ category: query }).sort({ rating: -1 }).limit(5).populate("brand")
    .populate("category")
    .populate("subcategory");

  products.sort((a, b) => (a._id > b._id ? -1 : 1));
  res.json({ products });
});

// @desc    Fetch products by category
// @route   GET /api/products
// @access  Public
export const getProductsByname = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({
      name: { $regex: req.params.name, $options: "i" },isFeatured:true
    });
    if (products) {
      
      res.json(products);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


// @desc    Fetch products by category
// @route   GET /api/products
// @access  Public
export const getProductsByTopCategory4 = asyncHandler(async (req, res) => {
  const { query } = req.body;

  let products = await Product.find({ category: query }).sort({ rating: -1 }).limit(5).populate("brand")
    .populate("category")
    .populate("subcategory");

  products.sort((a, b) => (a._id > b._id ? -1 : 1));
  res.json({ products });
});


// @desc    Fetch  products by subcategory
// @route   GET /api/products
// @access  Public
export const getProductsBySubcategory = asyncHandler(async (req, res) => {
  const { query } = req.body;

  let products = await Product.find({ subcategory: query }).populate("brand")
    .populate("category")
    .populate("subcategory");

  products.sort((a, b) => (a._id > b._id ? -1 : 1));
  if (products.length === 0) {
    products = await Product.find({})
      .populate("category")
      .populate("subcategory");
  }
  res.json({ products });
});

// @desc    Fetch dicounted product
// @route   GET /api/products
// @access  Public
export const getDiscProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isDiscounted: true }).populate("brand")
    .populate("category")
    .populate("subcategory");

  res.json({ products });
});

// @desc    Fetch single product
// @route   GET /api/product/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate("brand")
    .populate("category")
    .populate("subcategory");

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

// @desc    Delete a product
// @route   GET /api/product/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({
      message: "Product removed",
    });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: req.body.name,
    images: req.body.images,
    colors: req.body.colors,
    sizes: req.body.sizes,
    brand: req.body.brand,
    category: req.body.category,
    subcategory: req.body.subcategory,
    description: req.body.description,
    mainDescription:req.body.mainDescription,
    price: req.body.price,
    isDiscounted: req.body.isDiscounted,
    newPrice: req.body.newPrice,
    countInStock: req.body.countInStock,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    images,
    colors,
    sizes,
    description,
    mainDescription,
    brand,
    category,
    subcategory,
    price,
    isDiscounted,
    newPrice,
    countInStock,
    isFeatured,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.images = images;
    product.colors = colors;
    product.sizes = sizes;
    product.description = description;
    product.mainDescription=mainDescription;
    product.brand = brand;
    product.category = category;
    product.subcategory = subcategory;
    product.isFeatured = isFeatured;
    product.price = price;
    product.isDiscounted = isDiscounted;
    product.newPrice = newPrice;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json({
      updatedProduct,
    });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({
      message: "Review added",
    });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

export const createProductReviewApp = asyncHandler(async (req, res) => {
  const { rating } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({
      message: "Review added",
    });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});



// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProductsCount = asyncHandler(async (req, res) => {
  const products = await Product.find({ })
 
   let counter = 0;
   for (let i = 0; i < products.length; i++) {
      counter++;
 }
 
  
   res.json({counter })    
 
})
