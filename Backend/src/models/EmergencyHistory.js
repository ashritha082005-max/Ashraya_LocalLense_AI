import mongoose from "mongoose";

const emergencyHistorySchema =
  new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },

      emergency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Emergency"
      },

      action: {
        type: String,
        required: true
      }
    },

    {
      timestamps: true
    }
  );

export default mongoose.model(
  "EmergencyHistory",
  emergencyHistorySchema
);
