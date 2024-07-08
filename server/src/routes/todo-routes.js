import express from 'express';
import {addTodo} from '../controllers/todo-controller.js'
import {authenticationToken} from '../utils/account-auth.js';


const router = express.Router();

router.post('/add-todo',authenticationToken,addTodo);

export default router;