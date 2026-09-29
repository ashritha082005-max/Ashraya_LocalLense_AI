import express from "express";

import {
  getNearby
} from "../../config/controllers/locationController.js";

const router =
  express.Router();

router.get(
  "/nearby",
  getNearby
);

export default router;