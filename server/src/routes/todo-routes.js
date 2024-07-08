import express from 'express';
import {addTodo, updateTodo, getTodos} from '../controllers/todo-controller.js'
import {authenticationToken} from '../utils/account-auth.js';



const router = express.Router();

router.post('/todos',authenticationToken,addTodo);
router.put('/todos/:id', authenticationToken, updateTodo);
router.get('/todos', authenticationToken, getTodos)

export default router;