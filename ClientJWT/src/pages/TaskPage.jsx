/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useTasks } from "../context/taskContext"
//Component
import TaskCard from "../components/TaskCard"

function TaskPage(){
    
    const { tasksSee ,getTasks } = useTasks()

    console.log(tasksSee)

    useEffect(() => {
        getTasks()
    },[])

    if(tasksSee == undefined) return(<h1>There is no tasks</h1>)
    
    if(tasksSee.length == 0) return(<h1>There is no tasks</h1>)

    return <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {
            tasksSee.map((task) => (
                <TaskCard task={task} key={task.id}/>
            ))
        }
    </div>
}

export default TaskPage