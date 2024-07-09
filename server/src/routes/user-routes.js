import express from 'express';
import { createAccount, loginAccount, getUserInfo} from '../controllers/user-controller.js';
import {authenticationToken} from '../middlewares/account-auth.js';


const router = express.Router();

router.post("/create-account", createAccount);
router.post("/login", loginAccount);
router.get('/get-user',authenticationToken, getUserInfo)

export default router;