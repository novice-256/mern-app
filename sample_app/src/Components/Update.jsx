import React, { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { update } from '../api/api';
import { AuthContext } from '../Context/AuthContextProvider';
import { Res } from '../Context/ResponseMsg'

function Update() {
  console.log('I am Update');
  const { ShowMessage, resContext, setResContext } = useContext(Res)
  const { Auth, setAuth, authUser } = useContext(AuthContext);
  const { id, role, img, name } = useParams();
  const fileRef = useRef();
  const imgRef = useRef();
  const [updateData, setUpdateData] = useState({ name: name, prevFile: img, uplFile: null, role: role });

  // Function to edit user data
  async function editUser(e) {
    e.preventDefault();

    const form = new FormData();
    form.append('name', updateData.name);

    if (updateData.uplFile) {
      form.append('uplFile', updateData.uplFile);
    }
    form.append('role', updateData.role);

    const res = await update(id, form, updateData, Auth.role,setResContext);
    if (res && res.status == 200) {
      // Set a success message
      setResContext({ succ: true, err: false, msg: "User Updated successfully" });
    }
  }

  // Function to handle input changes
  function handleChange(e) {
    if (e.target.name === 'uplFile') {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        imgRef.current.src = e.target.result;
      };
      fileReader.readAsDataURL(e.target.files[0]);
    }
    setUpdateData((prev) => {
      return { ...prev, [e.target.name]: e.target.name === 'uplFile' ? e.target.files[0] : e.target.value };
    });
  }

  return (
    <>
      <ShowMessage/>
    <div className='container d-flex border justify-content-center align-items-center my-5 flex-column position-relative' style={{ height: '50vh' }}>
      <h1 className='text-center w-100 border-primary p-2'>Update</h1>
      <div title='Go back to main' className='position-absolute' style={{ top: '20%', left: '10%' }}>
        <Link className={'a'} to={'/view/1'}>
          <i className='fa-solid fa-arrow-left mx-2'></i>
        </Link>
      </div>
      <img src={`https://emp-app-ca789b749d5f.herokuapp.com/Images/${img && img}`} ref={imgRef} className='img' width={80} alt='' />

      <form method='post' className='form col-sm-12 col-md-6' encType='multipart/form-data'>
        <input type='text' ref={fileRef} className='form-control my-3' name='name' onChange={handleChange} value={updateData.name} />
        <input type='file' name='uplFile' className='form-control my-3' onChange={handleChange} />

        <select name='role' className='form-select my-3' onChange={handleChange} value={updateData.role}>
          <option value='user'>user</option>
          <option value='admin'>admin</option>
          <option value='employee'>employee</option>
        </select>

        <div className='text-center my-3'>
          <button className='btn btn-primary' onClick={editUser}>
            Update
          </button>
        </div>
      </form>
    </div>
    </>
  );
}

export default Update;
