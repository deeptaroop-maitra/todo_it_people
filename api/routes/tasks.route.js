import express from 'express';
import isAuthorized from "../utilities/is-authorized";
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/task-controller';
const router = express.Router();

router.post('/create-task', isAuthorized, createTask);
router.post('/get-tasks', isAuthorized, getTasks);
router.post('/update-task', isAuthorized, updateTask);
router.post('/delete-task', isAuthorized, deleteTask);

export default router;