import { Router } from "express";
//Methods
import { register, login, logout, profile } from "../controllers/auth.controller.js";
//Middlewares
import { authRequired } from "../middlewares/validateToken.js";
//Validators
import { validateSchema } from "../middlewares/validator.middleware.js";
//Register and login schemas
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const userRouter = new Router();

//Register Function
userRouter.post('/register', validateSchema(registerSchema), register)
//Login Function
userRouter.post('/login', validateSchema(loginSchema), login)
//Logout Function
userRouter.post('/logout', logout)
//Profile Function
userRouter.get('/profile', authRequired ,profile)

export default userRouter;