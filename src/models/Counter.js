import mongoose from "mongoose";
const conn =  mongoose.connection

const CounterSchema = new mongoose.Schema(
  {
    name : { type: String, required: true },
    seq: { type: Number, required: true }
  },
  { timestamps: true }
);

const Counter = mongoose.model("Counter", CounterSchema);
export default Counter;

