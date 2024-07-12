import express from 'express';
import { createAccount, getUserInfo} from '../controllers/user-controller.js';
import {ensureAccess} from '../middlewares/account-auth.js';


const router = express.Router();

router.post("/accounts", createAccount);
router.get('/accounts/:accountsId',ensureAccess, getUserInfo)

export default router;