import { Link } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { getToken, submit } from '../api/api';
import { Res } from '../Context/ResponseMsg';

export default function Form() {
  // console.log('I am registration');

  const { ShowMessage, setResContext } = useContext(Res);

  const [data, setData] = useState({ name: '', token: '' });
  let fileData;

  // Function to handle input field changes
  function handleChange(e) {
    if (e.target.files) {
      fileData = e.target.files[0];
    }
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.name === 'uplFile' ? e.target.files[0] : e.target.value,
    }));
  }

  // Function to get a token and set it in the state
  async function getTokenApi() {
    const res = await getToken();
    await setData({ ...data, token: res.data.token });
  }

  // Fetch a token when the component mounts
  useEffect(() => {
    getTokenApi();
  }, []);

  // Function to handle form submission
  async function submitForm(e) {
    e.preventDefault();
    if (data.uplFile === undefined) {
      // Handle the case where the upload field is empty
      setResContext({ succ: false, err: true, msg: "Upload field couldn't be empty" });
    } else {
      const form = new FormData();
      form.append('name', data.name);
      form.append('token', data.token);
      form.append('uplFile', data.uplFile);

      // Submit the form data and handle the response
      const res = await submit(form, setResContext);

      // Check if the registration is successful (status code 200)
      if (res && res.status === 200) {
        // Set a success message
        setResContext({ succ: true, err: false, msg: "Registration successful" });
      }
    }
  }

  return (
    <>
      <ShowMessage />
      <div className='container d-flex border justify-content-center align-items-center my-5 flex-column position-relative' style={{ height: '50vh' }}>
        <div title='Go back to main' className='position-absolute' style={{ top: '20%', left: '10%' }}>
          <Link className={'a '} to={'/view/1'}><i className="fa-solid fa-arrow-left mx-2"></i></Link>
        </div>
        <h1 className='text-center w-100 border-primary p-2'>Register</h1>

        <form method='post' className='form col-sm-12 col-md-6' encType='multipart/form-data'>
          <input type="text" name='name' className='form-control my-3' onChange={handleChange} value={data.name} />

          <input type="file" name='uplFile' className='form-control my-3' onChange={(e) => handleChange(e)} />

          <input type="text" name='token' value={data.token} hidden />
          <div className='text-center'>
            <button onClick={submitForm} className='btn btn-primary px-3 my-3'>Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}
