import express from "express";

import {
  createEmergency,
  getHistory
} from "../../config/controllers/emergencyController.js";

import {
  protect
} from "../../config/middleware/authMiddleware.js";

const router =
  express.Router();

router.post(
  "/",
  protect,
  createEmergency
);

router.get(
  "/history",
  protect,
  getHistory
);

export default router;