import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import emergencyRoutes from "./routes/emergencyRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";
import hospitalRoutes from "./routes/hospitalRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

import {
  notFound,
  errorHandler
} from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

/* CORS */

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:3000",
  "https://ashritha082005-max.github.io"
];

if (process.env.CLIENT_URL) {
  allowedOrigins.push(
    process.env.CLIENT_URL
  );
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header
      // such as server-side tools/Postman.
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error(
          `CORS blocked origin: ${origin}`
        )
      );
    },
    credentials: true
  })
);

/* BODY PARSERS */

app.use(
  express.json({
    limit: "10mb"
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb"
  })
);

/* HEALTH CHECK */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message:
      "Ashraya AI Emergency Backend is running.",
    version: "1.0.0"
  });
});

/* ROUTES */

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/emergency",
  emergencyRoutes
);

app.use(
  "/api/ai",
  aiRoutes
);

app.use(
  "/api/location",
  locationRoutes
);

app.use(
  "/api/hospitals",
  hospitalRoutes
);

app.use(
  "/api/contacts",
  contactRoutes
);

/* ERROR HANDLERS */

app.use(notFound);

app.use(errorHandler);

/* DATABASE + SERVER */

async function startServer() {
  try {
    await connectDB();

    app.listen(
      PORT,
      "0.0.0.0",
      () => {
        console.log(
          `Ashraya server running on port ${PORT}`
        );
      }
    );
  } catch (error) {
    console.error(
      "Server startup failed:",
      error
    );

    process.exit(1);
  }
}

startServer();
