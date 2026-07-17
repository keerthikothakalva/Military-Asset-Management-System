import mongoose from "mongoose";

const expenditureSchema = new mongoose.Schema(
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

    reason: {
      type: String,
      required: true,
      trim: true,
    },

    expenditureDate: {
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

const Expenditure = mongoose.model("Expenditure", expenditureSchema);

export default Expenditure;