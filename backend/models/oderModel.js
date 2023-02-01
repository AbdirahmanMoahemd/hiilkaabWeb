import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    products: [
      {
        name: { type: String },
        images: { type: String },
        price: { type: Number },
        qty: { type: Number },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
    meals: [
      {
        name: { type: String },
        images: { type: String },
        price: { type: Number },
        qty: { type: Number },
        meal: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Meal",
          required: true,
        },
      },
    ],
    status: {
      type: Boolean,
      default: false,
    },
    shippingAddress: {
      address: { type: String },
      city: { type: String },
      phoneNumber: { type: String },
      country: { type: String },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_adress: { type: String },
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    orderedAt: {
      type: Number,
    },
    paidAt: {
      type: Date,
    },
    date: {
      type: String,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Oder = mongoose.model("Oder", orderSchema);

export default Oder;
