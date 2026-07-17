import mongoose from "mongoose";

const transferSchema = new mongoose.Schema(
  {
    fromBase: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Base",
      required: true,
    },

    toBase: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Base",
      required: true,
    },

    equipment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Equipment",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    transferDate: {
      type: Date,
      default: Date.now,
    },

    remarks: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transfer = mongoose.model("Transfer", transferSchema);

export default Transfer;