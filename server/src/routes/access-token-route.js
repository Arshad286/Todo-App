import express from "express";
import { createAccessToken } from "../controllers/access-token-controller.js";

const router = express.Router();

router.post("/access-tokens", createAccessToken);

export default router;
