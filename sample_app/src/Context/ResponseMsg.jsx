import React ,{createContext,useState,useEffect}from 'react'
import { useLocation } from 'react-router-dom';
const Res = createContext() 
export default function ResponseMsg({children}) {
// console.log('i am response msg context');

  const [resContext, setResContext] = useState({succ:false, err:false,
    msg:null})
 const location = useLocation()
   
  useEffect(()=>{
    setResContext({succ:false,
      err:false,
      msg:null})
  },[location.pathname])



  function ShowMessage(){
  return(
    resContext.msg &&
    <div className={`alert ${resContext.succ?'alert-success':'alert-danger'}`}>
   <i class={`${resContext.err?'fa-regular fa-circle-xmark  text-danger mx-2 ':'fa-regular fa-circle-check text-success  mx-2 '}`}></i>  { resContext.msg}

 
    </div>
  )
  }
  return (
    <Res.Provider value={{ShowMessage,resContext,setResContext}}>
  {children}
  </Res.Provider>
  
  )
}
export {Res}