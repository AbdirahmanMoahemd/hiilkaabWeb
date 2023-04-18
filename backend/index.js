import path from "path";
import express from "express";
import dotenv from "dotenv";
import colors from 'colors'
import morgan from "morgan";
import connectDB from "./config/db2.js";
import { errorHandler, notFound } from "./middlewares/errorMidlleware.js";
import productRoutes from "./routes/productRoutes.js";
import discountRoutes from "./routes/discountRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import subCategoriesRoutes from "./routes/subCategoriesRoutes.js";
import uploadRoutes from './routes/uploadRoutes.js'
import slidesRoutes from './routes/slidesRoutes.js'
import settingsRoutes from './routes/settingsRoutes.js'
import filterRoutes from './routes/filter.js'
import topCategriesRoutes from './routes/topCategriesRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import brandRoutes from './routes/brandRoutes.js'
import mealRouter from "./routes/mealRoutes.js";
import mealCategoryRoutes from "./routes/mealCategoryRoutes.js";
import restaurantRouter from './routes/restuarantsRoutes.js';
import coffeeRouter from './routes/coffeeRoutes.js';
import sweetsRouter from './routes/sweetsRoutes.js';
import cartRoutes from './routes/cartRoutes.js';



dotenv.config();
connectDB();
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}




app.use(express.json());
app.use('/api/products', productRoutes)
app.use('/api/discount', discountRoutes)
app.use('/api/category', categoriesRoutes)
app.use('/api/users', userRoutes)
app.use('/api/subcategory', subCategoriesRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/slides', slidesRoutes)
app.use('/api/settings', settingsRoutes); 
app.use('/api/filter', filterRoutes); 
app.use('/api/topCategories', topCategriesRoutes);
app.use('/api/orders', orderRoutes) 
app.use("/api/meals", mealRouter);
app.use("/api/mealCategory", mealCategoryRoutes);
app.use("/api/restaurant", restaurantRouter)
app.use("/api/sweets",sweetsRouter)
app.use("/api/coffee", coffeeRouter)
app.use("/api/cart", cartRoutes)
app.use('/api/brands', brandRoutes) 






const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/testhiilkaab/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "testhiilkaab", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is runnin...");
  });
}




app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
