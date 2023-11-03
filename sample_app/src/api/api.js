import axios from "axios";
const PATH = 'http://localhost:8000'
export async function submit(data,setResContext){
   try {
      const fileExt =data.get('uplFile').type.split('/')[1]
      const fileSize =data.get('uplFile').size
      const fileType =data.get('uplFile').type.split('/')[0]
      //  console.log(`name:${fileExt}, type:${fileType}, size:${fileSize} `);

    return await axios.post(`${PATH}/file=${fileSize}%${fileType}%${fileExt}`,data)
   } catch (error) {
      console.log('this is running');
      setResContext({succ:false,err:true,msg:error.response.data.msg})


   }   
}
export async function getToken(){
   try {
  
      return await axios.get(`${PATH}`)
   } catch (error) {
      setResContext({succ:false,err:true,msg:error.response.data.msg})


   }   
   
  }
export async function fetch(role,currPage,setResContext){
   try {

      return await axios.get(`${PATH}/auth=${role}/view/${currPage}`,{withCredentials: true})
   } catch (error) {
      setResContext({succ:false,err:true,msg:error.response.data.msg})

      
   }   
}
export async function destroy(id,role,setResContext){
   try {
      
      console.log('this is executing');
      return await axios.post(`${PATH}/auth=${role}/delete`,id,
      {    withCredentials: true})
   } catch (error) {
      setResContext({succ:false,err:true,msg:error.response.data.msg})


   }   
  }

  export async function update(id,updateData,userData,role,setResContext){
   try {
 const  {prevFile}= userData
   return await axios.post(`${PATH}/auth=${role}/update/${id}/${prevFile}`,updateData,
     { withCredentials: true})
   } catch (error) {
      setResContext({succ:false,err:true,msg:error.response.data.msg})


   }   
  }

   // var headers = new Headers();
   //  headers.append('Content-Type', 'application/json');
   //  headers.append('Accept', 'application/json');
  
   //  headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
   //  headers.append('Access-Control-Allow-Credentials', 'true');
  

  export async function signIn(credentials,setResContext){
   try {
      const tempTest= await axios.post(`${PATH}/login/`,credentials,
      {withCredentials: true})
      return tempTest
   } catch (error) {
      setResContext({succ:false,err:true,msg:error.response.data.msg})
   }   
  }
  
  export async function logout(setResContext){
   try {
  
      return await axios.get(`${PATH}/logout/`,{withCredentials: true,})
      
   } catch (error) {
      setResContext({succ:false,err:true,msg:error.response.data.msg})


      
   }   
  }