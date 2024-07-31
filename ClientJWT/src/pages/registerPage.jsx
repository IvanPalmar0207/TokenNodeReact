import {useForm} from 'react-hook-form'
import { useAuth } from '../context/authContext'
import { useEffect } from 'react'
import { useNavigate, Link} from 'react-router-dom'

function RegisterPage(){

    const {register, handleSubmit, formState : {
        errors
    }} = useForm()
    const {signup, isAuthenticated, errorAuth} = useAuth()
    const navigation = useNavigate()

    useEffect(() => {
        if(isAuthenticated) navigation('/tasks');
    },[isAuthenticated])

    const onSubmit = handleSubmit( async (values) => {                
        signup(values)
    })

    return(
        <div className='flex h-screen items-center justify-center'>

        <div className='bg-zinc-800 max-v-md w-fit p-10 rounded-md'>

            <form onSubmit={onSubmit}>
                {
                    errorAuth.map((error, i) => (
                        <div className='bg-red-500 py-5 text-center' key={i}>
                            {error}
                        </div>
                    ))
                }
                <input type="text"
                    {...register('username', {required : true})}
                    className='w-full bg-zinc-500 text-white px-4 py-2 rounded-md my-2'
                    placeholder='Username'                
                />
                {
                    errors.username && <p className='text-red-600'>Username is required</p>
                }

                <input type="email"
                    {...register('email', {required : true})}
                    className='w-full bg-zinc-500 text-white px-4 py-2 rounded-md my-2'
                    placeholder='Email'
                />
                {
                    errors.email && <p className='text-red-600'>Email is required</p>
                }

                <input type="password"
                    {...register('password', {required : true})}
                    className='w-full bg-zinc-500 text-white px-4 py-2 rounded-md my-2'
                    placeholder='Password'
                />
                {
                    errors.password && <p className='text-red-600'>Password is required</p>
                }

                <button type="submit">
                    Enter
                </button>

                <p className='flex gap-x-2 justify-between my-3'>
                    Already have an account?
                    <Link className='text-sky-500' to='/login'>Sign In</Link>
                </p>

            </form>        

            </div>
        </div>
    )
}

export default RegisterPage