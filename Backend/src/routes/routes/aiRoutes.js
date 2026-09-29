import express from "express";

import {
  chat
} from "../../config/controllers/aiController.js";

const router =
  express.Router();

router.post(
  "/chat",
  chat
);

export default router;
