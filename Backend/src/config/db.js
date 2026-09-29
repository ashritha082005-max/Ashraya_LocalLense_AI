import mongoose from "mongoose";

export async function connectDB() {
  try {
    const mongoUri =
      process.env.MONGO_URI ||
      process.env.MONGODB_URI ||
      process.env.DATABASE_URL;

    if (!mongoUri) {
      throw new Error(
        "MongoDB connection string is missing from .env"
      );
    }

    const connection =
      await mongoose.connect(
        mongoUri,
        {
          family: 4,
          serverSelectionTimeoutMS: 10000,
          connectTimeoutMS: 10000,
          maxPoolSize: 10
        }
      );

    console.log(
      `MongoDB connected: ${connection.connection.host}`
    );

    return connection;

  } catch (error) {
    console.error(
      "MongoDB connection failed:",
      error.message
    );

    throw error;
  }
}