/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import {useState } from "react";
//Create, get, delete and update task
import { createTaskRequest } from "../api/task";
import { getAllTask } from "../api/task";
import { deleteTask } from "../api/task";

const TaskContext = createContext()

export const useTasks = () => {
    const context = useContext(TaskContext)

    if(!context){
        throw new Error('Use Task must be within a TaskProvider')
    }

    return context
}

export function TaskProvider({children}){

    const [tasksSee, setTasks] = useState([])


    const getTasks = async () => {
      const res = await getAllTask();
      setTasks(res.data.tasks);
    };

    const createTask = async (task) => {
        const res = await createTaskRequest(task)
        console.log(res.data)
    }

    const deleteTasks = async (id) => {
        try{
            const res = await deleteTask(id)
            if(res.status == 204) setTasks(tasksSee.filter(task => task._id != id))
        }catch(err){
            console.log(err)
        }
    }

    return(
        <TaskContext.Provider value={{
            tasksSee,
            getTasks,        
            createTask,  
            deleteTasks          
        }}>
            {children}
        </TaskContext.Provider>
    )
}