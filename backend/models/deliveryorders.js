import mongoose from "mongoose";

const deliverySchema = mongoose.Schema({
  senderName: {
    type: String,
    required: true,
  },
  senderPhone:  {
    type: String,
    required: true,
  },
  recipientName: {
    type: String,
    required: true,
  },
  recipientPhone:  {
    type: String,
    required: true,
  },
  itemType:  {
    type: String,
    required: true,
  },
  price:  {
    type: Number,
    required: true,
  },
  orderedAt: {
    type: Number,
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false,
  },
},{
  timestamps: true
});

deliverySchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  const { _id: id, ...result } = object;
  return { ...result, id };
});

const DeliveryOrders = mongoose.model("deliveryOrders", deliverySchema);

export default DeliveryOrders;
