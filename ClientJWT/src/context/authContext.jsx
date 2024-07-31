import {createContext, useContext, useState, useEffect } from "react";
import { registerRequest } from "../api/auth";
import { loginRequest } from "../api/auth";

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context){
        throw new Error('Must be used within an AuthProvider')
    }
    return context
}

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errorAuth, setErrors] = useState([])

    const signup = async (user) => {
        try{
            const res = await registerRequest(user)
            console.log(res.data)
            setUser(res.data)
            setIsAuthenticated(true)
        }catch(err){
            if(Array.isArray(err.response.data)){
                setErrors(err.response.data)
            }
            setErrors([err.response.data.message])
        }
    }

    const signin = async (user) => {
        try{
            const res = await loginRequest(user)
            console.log(res.data)
            
        }catch(err){
            if(Array.isArray(err.response.data)){
                setErrors(err.response.data)
            }
            setErrors([err.response.data.message])            
        }
    }

    useEffect(() => {
        if(errorAuth.length > 0){
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => {
                clearTimeout(timer)
            }
        }
    }, [errorAuth])

    return (
        <AuthContext.Provider value = {{
            signup, 
            signin,
            user,
            isAuthenticated,
            errorAuth,            
        }}>
            {children}
        </AuthContext.Provider>
    )
}