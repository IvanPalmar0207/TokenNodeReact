import { useTasks } from "../context/taskContext"


/* eslint-disable react/prop-types */
function TaskCard({task}){

    const {deleteTasks} = useTasks()

    return(
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{task.title}</h1>
                <div className="flex gap-2 items-center">
                    <button onClick={() => {
                        deleteTasks(task.id)
                    }}>Delete</button>
                    <button>Edit</button>
                </div>
            </header>
            <p className="text-slate-300">{task.description}</p>
            <p>{new Date(task.dateSuccess).toLocaleDateString()}</p>
        </div>
    )
}

export default TaskCard