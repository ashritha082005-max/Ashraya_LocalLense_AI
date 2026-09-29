import express from "express";

import {
  createEmergency,
  getHistory
} from "../controllers/emergencyController.js";

const router = express.Router();

router.post("/", createEmergency);

router.get("/history", getHistory);

export default router;

