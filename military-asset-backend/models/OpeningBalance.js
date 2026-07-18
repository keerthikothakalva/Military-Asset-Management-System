import mongoose from "mongoose";

const openingBalanceSchema = new mongoose.Schema(
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
      min: 0,
    },

    balanceDate: {
      type: Date,
      required: true,
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

const OpeningBalance = mongoose.model(
  "OpeningBalance",
  openingBalanceSchema
);

export default OpeningBalance;