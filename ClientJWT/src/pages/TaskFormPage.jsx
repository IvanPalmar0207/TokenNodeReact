/* eslint-disable no-unused-vars */
import {useForm} from 'react-hook-form'
import { useTasks } from '../context/taskContext'
//Navigate
import {useNavigate, useParams} from 'react-router-dom'
//React Hooks
import { useEffect } from 'react'
//Date js
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

function TaskFormPage(){

    const {register, handleSubmit, setValue} = useForm()
    const {getOneTask, createTask, updateTask} = useTasks() 
    
    const navigate = useNavigate()
    const params = useParams()

    useEffect(()=>{
        async function loadTask(){
            if(params.id){
                const task = await getOneTask(params.id)
                setValue('title', task.title)
                setValue('description', task.description)
                setValue('dateSuccess', dayjs.utc(task.dateSuccess).format('YYYY-MM-DD'))
            }
        }
        loadTask()
    })

    const onSubmit = handleSubmit ((data) => {

        const dataValid = {
            ...data,
            dateSuccess : data.dateSuccess ? dayjs.utc(data.dateSuccess).format() : dayjs.utc().format()
        }

        if(params.id){
            updateTask(params.id, dataValid)
            navigate('/tasks')
        }else{
            createTask(dataValid)
            navigate('/tasks')
        }
    })

    return(
        <div className='flex items-center justify-center w-full h-screen'>
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                <form onSubmit={onSubmit}>
                    <label htmlFor="title">Title</label>
                    <input className='w-full bg-zinc-700 text-white py-2 rounded-md my-2' type="text"
                    {...register('title', { required : true })} 
                    placeholder="Title"
                    autoFocus
                    />

                    <label htmlFor="title">Description</label>
                    <textarea rows={3} 
                    className='w-full bg-zinc-700 text-white py-2 rounded-md my-2'
                    {...register('description', { required : true })} 
                    placeholder="Description"></textarea>

                    <label htmlFor="dateSuccess">Date Success</label>
                    <input type="date"
                    className='w-full bg-zinc-700 text-white py-2 rounded-md my-2'
                    {...register('dateSuccess')}
                    />

                    <button type="submit" className='bg-indigo-500 px-3 rounded-md my-2'>
                        Save New Task
                    </button>
                </form>
            </div>
        </div>
    )
}

export default TaskFormPage