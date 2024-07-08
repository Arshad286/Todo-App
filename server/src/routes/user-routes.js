import express from 'express';
import { createAccount,loginAccount } from '../controllers/user-controller.js';

const router = express.Router();

router.post("/create-account", createAccount);
router.post("/login", loginAccount);

export default router;