import mongoose from "mongoose";

const ratingSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

const sweetsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  logo: {
    type: String,
    required: true,
  },
  banner: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  mealcategories: [
    {
      type: String,
    },
  ],
  message: {
    type: String,
    required: true,
  },
  ratings: [ratingSchema],
});

sweetsSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  const { _id: id, ...result } = object;
  return { ...result, id };
});

const Sweets = mongoose.model("Sweets", sweetsSchema);

export default Sweets;
