import express from "express";

import {
  getHospitals
} from "../../config/controllers/hospitalController.js";

const router =
  express.Router();

router.get(
  "/",
  getHospitals
);

export default router;