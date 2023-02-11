import mongoose from "mongoose";

const discountSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  icon: {
    type: String,
  },
});

discountSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  const { _id: id, ...result } = object;
  return { ...result, id };
});

const Discount = mongoose.model("Discount", discountSchema);

export default Discount;
