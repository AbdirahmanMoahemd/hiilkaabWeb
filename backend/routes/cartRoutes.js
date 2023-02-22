import express from "express";
import { addToCart, addToCartMeal, addToWishlist, deleteCart, deleteCartMeal, increasCartMeal, removeCartItem, removeCartMealItem, removeWishlistItem } from "../controllers/cartController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.route('/add-to-cart').post(protect, addToCart)
router.route('/add-to-wishlist').post(protect, addToWishlist)
router.route('/remove-cartitem').delete(protect, removeCartItem)
router.route('/remove-cartMealitem').delete(protect, removeCartMealItem)
router.route('/remove-wishlistItem').delete(protect, removeWishlistItem)
router.route('/add-to-cartMeal').post(protect, addToCartMeal)
router.route('/increas-from-cartMeal').post(protect, increasCartMeal)
router.route('/remove-from-cart/:id').delete(protect, deleteCart)
router.route('/remove-from-cartMeal/:id').delete(protect, deleteCartMeal)


export default router






// // save user address
// userRouter.post("/api/save-user-address", auth, async (req, res) => {
//   try {
//     const { address } = req.body;
//     let user = await User.findById(req.user);
//     user.address = address;
//     user = await user.save();
//     res.json(user);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });




// order product
// userRouter.post("/api/order", auth, async (req, res) => {
//   try {
//     const { userName,userPhone, cart,cartMeal,paymentMethod, shippingPrice,totalPrice, address } = req.body;
//     let products = [];

//     for (let i = 0; i < cart.length; i++) {
//       let product = await Product.findById(cart[i].product._id);
//       if (product.countInStock >= cart[i].quantity) {
//         product.countInStock -= cart[i].quantity;
//         products.push({ product, quantity: cart[i].quantity,sizes:cart[i].sizes, colors: cart[i].colors  });
//         await product.save();
//       } else {
//         return res
//           .status(400)
//           .json({ msg: `${product.name} is out of stock!` });
//       }
//     }

//     let meals = [];

//     for (let i = 0; i < cartMeal.length; i++) {
//       let meal = await Meal.findById(cartMeal[i].meal._id);
      
//       meals.push({ meal, quantity: cartMeal[i].quantity, });
//         await meal.save();
     
//     }

//     let user = await User.findById(req.user);
//     user.cart = [];
//     user.cartMeal = [];
//     user = await user.save();

//     let order = new Order({
//       products,
//       meals,
//       shippingPrice,
//       paymentMethod,
//       totalPrice,
//       address,
//       status: 1,
//       userId: req.user,
//       userName: userName,
//       userPhone: userPhone,
//       orderedAt: new Date().getTime(),
//     });
//     order = await order.save();
//     res.json(order);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });







// userRouter.post("/api/order/cod", auth, async (req, res) => {
//   try {
//     const { userName,userPhone, cart,cartMeal,paymentMethod, shippingPrice, totalPrice, address } = req.body;
//     let products = [];

//     for (let i = 0; i < cart.length; i++) {
//       let product = await Product.findById(cart[i].product._id);
//       if (product.countInStock >= cart[i].quantity) {
//         product.countInStock -= cart[i].quantity;
//         products.push({ product, quantity: cart[i].quantity,sizes:cart[i].sizes, colors: cart[i].colors });
//         await product.save();
//       } else {
//         return res
//           .status(400)
//           .json({ msg: `${product.name} is out of stock!` });
//       }
//     }

//     let meals = [];

//     for (let i = 0; i < cartMeal.length; i++) {
//       let meal = await Meal.findById(cartMeal[i].meal._id);
//       // if (meal.quantity >= cartMeal[i].quantity) {
//       //   meal.quantity -= cartMeal[i].quantity;
//         meals.push({ meal, quantity: cartMeal[i].quantity });
//         await meal.save();
//       // } else {
//       //   return res
//       //     .status(400)
//       //     .json({ msg: `${meal.name} is out of stock!` });
//       // }
//     }

//     let user = await User.findById(req.user);
//     user.cart = [];
//     user.cartMeal = [];
   
//     user = await user.save();

   
    


//     let order = new Order({
//       products,
//       meals,
//       shippingPrice,
//       paymentMethod,
//       totalPrice,
//       address,
//       userId: req.user,
//       userName: userName,
//       userPhone: userPhone,
//       orderedAt: new Date().getTime(),
//     });
//     order = await order.save();
//     res.json(order);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });

// userRouter.get("/api/orders/me", auth, async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.user });
//     orders.sort((a, b) => (a._id > b._id) ? -1 : 1)
//     res.json(orders);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });


// userRouter.put("/api/user/orders/count", async (req, res) => {
//   try {
   
//     let user = await User.findOne({ type: 'admin'});

//     if (user) {
//       user.ordersCount  += 1;

//       user = await user.save();
//       res.json(user);
//     }

   
   
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });

// module.exports = userRouter;
