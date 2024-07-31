import { Router } from "express";
//Task Methods
import { allTasks, getTasks, createTask, deleteTask, updateTask } from "../controllers/task.controller.js";
//Middleware
import { authRequired } from "../middlewares/validateToken.js";
//Validators
import validateSchema from "../middlewares/validator.middleware.js";
//Create taks schema
import { createTaskValidate } from "../schemas/task.schema.js";
//Update taks schema
import { updateTaskValidate } from "../schemas/task.schema.js";

const taskRouter = new Router();

//All tasks function
taskRouter.get('/task', authRequired, allTasks)
//One task function
taskRouter.get('/task/:id', authRequired, getTasks)
//Create task
taskRouter.post(
    '/task', 
    authRequired,
    validateSchema(createTaskValidate),
    createTask
)
//Delete task
taskRouter.delete('/task/:id', authRequired, deleteTask)
//Put task
taskRouter.put(
    '/task/:id',
    authRequired,
    validateSchema(updateTaskValidate),
    updateTask
)

export default taskRouter