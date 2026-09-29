import mongoose from "mongoose";

const emergencySchema =
  new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
      },

      type: {
        type: String,
        required: true
      },

      latitude: {
        type: Number,
        default: null
      },

      longitude: {
        type: Number,
        default: null
      },

      status: {
        type: String,
        enum: [
          "active",
          "resolved",
          "cancelled"
        ],
        default: "active"
      }
    },

    {
      timestamps: true
    }
  );

export default mongoose.model(
  "Emergency",
  emergencySchema
);