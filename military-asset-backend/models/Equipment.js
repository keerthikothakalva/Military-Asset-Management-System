import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        type:{
            type: String,
            required: true,
            enum: [
                "Weapon",
                "Vehicle",
                "Ammunition",
                "Communication",
                "Medical",
                "Others",
            ],
        },

        unit: {
            type: String,
            required:true,
            default: "Pieces",
        },
        description: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Equipment = mongoose.model("Equipment", equipmentSchema);

export default Equipment;