import {createContext, useContext, useState, useEffect } from "react";
import { registerRequest } from "../api/auth";
import { loginRequest } from "../api/auth";
import { verifyToken } from "../api/auth";

import Cookie from 'js-cookie'
import Cookies from "js-cookie";

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context){
        throw new Error('Must be used within an AuthProvider')
    }
    return context
}

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errorAuth, setErrors] = useState([])
    const [loading, setLoading] = useState(true)

    const signup = async (user) => {
        try{
            const res = await registerRequest(user)
            console.log(res.data)
            setUser(res.data)
            setIsAuthenticated(true)
        }catch(err){
            setErrors(err.response.data)
        }
    }

    const signin = async (user) => {
        try{
            const res = await loginRequest(user)
            console.log(res.data)
            setUser(res.data)
            setIsAuthenticated(true)
        }catch(err){    
            setErrors([err.response.data])            
        }
    }

    const logout = () => {
        Cookies.remove('token')
        setIsAuthenticated(false)
        setUser(null)
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

    useEffect(() => {
        async function checkLogin(){
            const cookie = Cookie.get()
                
        if(!cookie.token){
            setIsAuthenticated(false)
            setLoading(false)
            return setUser(null)    
        }        
        
        try{
            const res = await verifyToken(cookie.token)
            console.log(res)

            if(!res.data){
                setIsAuthenticated(false)
                setLoading(false)
                return;
            }            
            
            setIsAuthenticated(true)
            setUser(res.data)        
            setLoading(false)
                
            }catch(err){
                setIsAuthenticated(false)
                setLoading(false)
                setUser(null)
            }          
        }
        checkLogin()
    }, [])

    return (
        <AuthContext.Provider value = {{
            signup, 
            signin,
            user,
            isAuthenticated,
            loading,
            errorAuth, 
            logout           
        }}>
            {children}
        </AuthContext.Provider>
    )
}
