import './App.css';
import Form from './Components/Form';
import { Routes, useNavigate,Route, Link } from 'react-router-dom';
import View from './Components/View';
import Update from './Components/Update';
import Login from './Components/Login';
import  { AuthContext } from './Context/AuthContextProvider';
import React ,{useEffect,useContext} from 'react'
import { logout } from './api/api';
import jwt_decode from 'jwt-decode'
import { Res } from './Context/ResponseMsg';


function App() {
  const navigate= useNavigate()
  const {Auth,setAuth} =  useContext(AuthContext)
  const {  ShowMessage,setResContext} = useContext(Res)
const token =JSON.parse(localStorage.getItem('logggedIn') )

// console.log('i am App');
  
useEffect(() => {
  if (!Auth){
   navigate('/login')
  }
  }, [])



async function signOut(){
 const res= await logout(setResContext)

localStorage.removeItem('logggedIn')
setAuth( {
                
  token:null,
  isLoggedIn:false,
  isLoggedOut:true,
  role:null
})
navigate('/login')

}
 
  return (

    
   

    <div className="container app">
     <div className='d-flex justify-content-md-end my-3 col-12 border-bottom pb-2'>
   {Auth.isLoggedIn?
    ( 
      <>
    
      
     <div className=' mx-1 col-md-2 col-sm-4' style={{textAlign:'right'}}> <Link className='a text-secondary' onClick={signOut} ><i className="fa-solid fa-right-from-bracket mx-2"></i>Log out</Link> </div>
      </>
      
    )
    :
    (     
      <div className=' mx-1 col-md-2 col-sm-4' style={{textAlign:'right'}}> <Link to={'/login'} className={'a  mx-2'} ><i className="fa-solid fa-arrow-right-to-bracket mx-2"></i>Login</Link></div>
    )
   }
  <div className=' mx-1 col-md-2 col-sm-4' style={{textAlign:'right'}}>  <Link to={'/signup' } className='a text-primary'  ><i className="fa-solid fa-user-plus mx-2"></i>Register</Link> </div>
  </div>
      <Routes>
     <Route path='login' element={<Login/>}/>
     <Route path='/signup' element={<Form/>}/>
      
     
     {
       Auth.isLoggedIn &&
      <>

      <Route path='view/:page' element={<View/>}/>
     <Route path='update/:role/:name/:id/:img' element={<Update/>}/>
 
      </>
     }

      </Routes>
   

    </div>
    
    
  );
}

export default App;
