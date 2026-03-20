import express from 'express';
import * as controller from '../controller/tasks.js';

const router = express.Router();

router.get('/', controller.getAllTasks);
router.post('/', controller.postTask);
router.post('/:id/done', controller.postTaskDone);
router.get('/:id', controller.getTasksById);
router.put('/:id', controller.putTaskById);
router.delete('/:id', controller.deleteTaskById);

export default router;
