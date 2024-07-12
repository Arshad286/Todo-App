import express from 'express';
import {addTodo, updateTodo, getTodos, deleteTodo, togglePinnedStatus , toggleCompleteStatus} from '../controllers/todo-controller.js'
import {ensureAccess} from '../middlewares/account-auth.js';

const router = express.Router();

router.post('/todos',ensureAccess,addTodo);
router.put('/todos/:id', ensureAccess, updateTodo);
router.get('/todos', ensureAccess, getTodos);
router.delete('/todos/:id', ensureAccess, deleteTodo);

router.patch('/todos/:id', ensureAccess, togglePinnedStatus);
router.patch('/todos/:id/status', ensureAccess, toggleCompleteStatus);

export default router;