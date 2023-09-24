import mongoose from "mongoose";

const deliverySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    senderName: {
      type: String,
      required: true,
    },
    senderPhone: {
      type: String,
      required: true,
    },
    recipientName: {
      type: String,
      required: true,
    },
    recipientPhone: {
      type: String,
      required: true,
    },
    itemType: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    orderedAt: {
      type: Number,
    },
    status: {
      type: String,
      enum: [
        "New",
        "Confirmed",
        "Cancelled",
        "In Transit",
        "Returning",
        "Returned",
        "Delivered",
      ],
      default: "New",
    },
    comment: {
      type: String,
      default: "No Comment Yet",
    },
  },
  {
    timestamps: true,
  }
);

deliverySchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  const { _id: id, ...result } = object;
  return { ...result, id };
});

const DeliveryOrders = mongoose.model("deliveryOrders", deliverySchema);

export default DeliveryOrders;
