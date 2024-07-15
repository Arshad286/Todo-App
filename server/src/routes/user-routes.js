import express from 'express';
import { createAccount} from '../controllers/user-controller.js';


const router = express.Router();

router.post("/accounts", createAccount);

export default router;