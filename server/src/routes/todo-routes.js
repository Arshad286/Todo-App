import express from 'express';
import {addTodo, updateTodo, getTodos, deleteTodo, isPinned , isCompleted} from '../controllers/todo-controller.js'
import {authenticationToken} from '../middlewares/account-auth.js';

const router = express.Router();

router.post('/todos',authenticationToken,addTodo);
router.put('/todos/:id', authenticationToken, updateTodo);
router.get('/todos', authenticationToken, getTodos);
router.delete('/todos/:id', authenticationToken, deleteTodo);

router.patch('/todos/:id', authenticationToken, isPinned);
router.patch('/todos/:id/status', authenticationToken, isCompleted);

export default router;