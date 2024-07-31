/* eslint-disable no-unused-vars */
import {useForm} from 'react-hook-form'
import { useTasks } from '../context/taskContext'
//Navigate
import {useNavigate} from 'react-router-dom'

function TaskFormPage(){

    const {register, handleSubmit} = useForm()

    const {tasks, createTask} = useTasks() 
    
    const navigate = useNavigate()

    const onSubmit = handleSubmit ((data) => {
        createTask(data)
        navigate('/tasks')
    })

    return(
        <div className='flex items-center justify-center w-full h-screen'>
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                <form onSubmit={onSubmit}>
                    <input className='w-full bg-zinc-700 text-white py-2 rounded-md my-2' type="text"
                    {...register('title', {required : true})} 
                    placeholder="Title"
                    autoFocus
                    />

                    <textarea rows={3} 
                    className='w-full bg-zinc-700 text-white py-2 rounded-md my-2'
                    {...register('description', {required : true})} 
                    placeholder="Description"></textarea>

                    <button type="submit">
                        Save New Task
                    </button>
                </form>
            </div>
        </div>
    )
}

export default TaskFormPage