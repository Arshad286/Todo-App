import express from 'express';
import { createAccount} from '../controllers/user-controller.js';


const router = express.Router();

router.post("/", createAccount);

export default router;