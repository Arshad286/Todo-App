import express from 'express';
import {addTodo, updateTodo, getTodos, deleteTodo, togglePinnedStatus , toggleCompleteStatus} from '../controllers/todo-controller.js'
import {ensureAccess} from '../middlewares/account-auth.js';

const router = express.Router();

router.post('/',ensureAccess,addTodo);
router.put('/:id', ensureAccess, updateTodo);
router.get('/', ensureAccess, getTodos);
router.delete('/:id', ensureAccess, deleteTodo);

router.patch('/:id', ensureAccess, togglePinnedStatus);
router.patch('/:id/status', ensureAccess, toggleCompleteStatus);

export default router;