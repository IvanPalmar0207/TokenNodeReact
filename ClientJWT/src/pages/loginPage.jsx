//Hook-Forms
import {useForm} from 'react-hook-form'
//Context App
import { useAuth } from '../context/authContext'
//Navigation
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
//Alerts
import Swal from 'sweetalert2'

function LoginPage(){
    
    const {register, handleSubmit, formState : {errors}} = useForm()

    const {signin, isAuthenticated, errorAuth} = useAuth()

    const navigate = useNavigate()

    const onSubmit = handleSubmit(data => {
        signin(data)        
    })    

    useEffect(() => {
        if(isAuthenticated) navigate('/tasks')
    },[isAuthenticated])

    return(
        <div className='flex h-screen items-center justify-center'>

            <div className='bg-zinc-800 max-v-md w-fit p-10 rounded-md'>
            <form onSubmit={onSubmit}>
                {                    
                    errorAuth.map((error, i) => (                    
                        <div className='bg-red-500 py-5 text-center my-2' key={i}>
                            {error}
                        </div>
                    ))
                }

                <h1 className='text-bold text-2xl text-center font-bold my-2'>Login and create task</h1>

                <input type="email"
                    {...register('email', {required : true})}
                    className='w-full bg-zinc-500 text-white px-4 py-2 rounded-md my-2'
                    placeholder='Email'
                />
                {
                    errors.email && <p className='text-red-600 w-full'>Email is required</p>
                }

                <input type="password"
                    {...register('password', {required : true})}
                    className='w-full bg-zinc-500 text-white px-4 py-2 rounded-md my-2'
                    placeholder='Password'
                />
                {
                    errors.password && <p className='text-red-600 w-full'>Password is required</p>
                }

                <button 
                    type="submit"
                    className='bg-sky-500 text-white px-4 py-2 rounded-md my-2'
                >
                    login
                </button>

            </form>        

            <p className='flex gap-x-2 justify-between my-3'>
                Don´t have an account 
                <Link className='text-sky-500' to='/register'>Sign Up</Link>
            </p>

            </div>

        </div>
    )
}

export default LoginPage