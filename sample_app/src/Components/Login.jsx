import React, { useState, useContext, useEffect } from 'react';
import { signIn } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContextProvider';
import jwt_decode from 'jwt-decode';
import { Res } from '../Context/ResponseMsg';

export default function Login() {
  // console.log('I am Login');

  const [Data, setData] = useState({ name: '' });
  const { Auth, setAuth } = useContext(AuthContext);
  const { ShowMessage, setResContext } = useContext(Res);
  const navigate = useNavigate();

  // Function to handle user login
  async function login(e) {
    e.preventDefault();
    const res = await signIn(Data, setResContext);

    // Check if the login request is successful (status code 200)
    if (res && res.status === 200) {
      const { _id, role } = res.data.data;
      const { token } = res.data;

      // Store the token and user data in local storage
      localStorage.setItem('logggedIn', JSON.stringify({ jwt: token, _id: _id, role: role }));

      // Set authentication data in the context
      await setAuth({
        token: token.jwt,
        isLoggedIn: token ? jwt_decode(token)._id === _id : false,
        isLoggedOut: !token,
        role: role,
      });

      // Redirect to the view page after successful login
      navigate(`/view/1`);
    }
  }

  return (
    <>
      <ShowMessage />
      <div className='container d-flex border justify-content-center align-items-center my-5 flex-column' style={{ height: '50vh' }}>
        <h1 className='text-center w-100 border-primary p-2'>Login</h1>
        <form method='post' className='form col-sm-12 col-md-6'>
          <input
            type='text'
            name='name'
            className='form-control my-3'
            onChange={(e) => setData({ ...Data, [e.target.name]: e.target.value })}
            value={Data.name}
          />
          <div className='text-center'>
            <button onClick={login} className='btn btn-primary px-3 my-3'>
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
