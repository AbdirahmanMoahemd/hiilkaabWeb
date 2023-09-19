import mongoose from "mongoose";

const districtsSchema = mongoose.Schema({
  source: {
    type: String,
    required: true,
    unique: true,
  },
  destinations: [
    {
    name: { type: String },
    price: { type: Number },
    },
  ],
});

districtsSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  const { _id: id, ...result } = object;
  return { ...result, id };
});

const Districts = mongoose.model("districts", districtsSchema);

export default Districts;
