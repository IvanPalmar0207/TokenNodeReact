import { useTasks } from "../context/taskContext"
//Link and navigation
import { Link } from "react-router-dom"
//Date js
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

/* eslint-disable react/prop-types */
function TaskCard({task}){

    const {deleteTasks} = useTasks()

    return(
        <div className="bg-zinc-800 w-full p-10 rounded-md">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{task.title}</h1>
                <div className="flex gap-2 items-center">
                    <button 
                    className="bg-red-500 p-3 rounded-md"
                    onClick={() => {
                        deleteTasks(task.id)
                    }}>Delete</button>
                    <button className="bg-indigo-500 p-3 rounded-md">
                        <Link to={`${task.id}`}>Edit</Link>
                    </button>
                </div>
            </header>
            <p className="text-slate-300">{task.description}</p>
            <p>{dayjs(task.dateSuccess).utc().format("DD/MM/YYYY")}</p>
        </div>
    )
}

export default TaskCard