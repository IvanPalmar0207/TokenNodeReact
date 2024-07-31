import express from "express";
import morgan from "morgan";
//Router
import userRouter from "./routes/auth.routes.js";
//Cookie-parser
import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.routes.js";
//Cors
import cors from 'cors'


const app = express();
//Cors
app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}))
//Morgan
app.use(morgan('dev'));
//App Json
app.use(express.json())
//Cookie Parser
app.use(cookieParser())
//Auth Routers
app.use('/api', userRouter)
//Task Routers
app.use('/api', taskRouter)

export default app