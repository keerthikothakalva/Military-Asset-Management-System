import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    base: {
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

    purchaseDate: {
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

const Purchase = mongoose.model("Purchase", purchaseSchema);

export default Purchase;