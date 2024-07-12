import express from "express";
import { createAccessToken } from "../controllers/auth-controller.js"; 

const router = express.Router();

router.post("/access-tokens", createAccessToken);

export default router;
