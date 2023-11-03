import  React, {createContext,useEffect,useState}from 'react'
import {  useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'
const AuthContext = createContext()
export default function AuthContextProvider({children}) {
// console.log('i am auth context');

    const navigate= useNavigate()
    const authToken =JSON.parse(localStorage.getItem('logggedIn') )
    
 const {jwt ,role,_id } = authToken?authToken:false

 const [Auth, setAuth] = useState( {})

const authUser= (role)=>  Auth.role == role  
 useEffect(()=>{
        
        if(authToken){

            setAuth( {
                
                token:jwt,
                isLoggedIn:authToken ?jwt_decode(jwt)._id===_id:false,
                isLoggedOut:!authToken,
                role:role
            })
        
    }
        
    },[])

 return (
     <AuthContext.Provider value={{Auth,setAuth,authUser}}>
            {children}
        </AuthContext.Provider>

  )
}
export {AuthContext}


