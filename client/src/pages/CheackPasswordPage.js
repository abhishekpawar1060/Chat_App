import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';
import Avatar from '../components/Avatar';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../redux/userSlice';

function CheckPasswordPage() {

  const [data, setData] = useState({
    password: "",
  });

  const navigate = useNavigate();

  const location = useLocation();

  const dispatch = useDispatch();

  console.log(location.state);

  useEffect(() => {
    if(!location?.state?.name){
      navigate('/email')
    }
  },[])
  

  const handleOnChange = (e) => {
    const {name, value} = e.target;

    setData((prev) => {
      return{
        ...prev,
        [name]: value
      }
    })
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password`;

    try {
      const response = await axios({
        method: 'post',
        url: URL,
        data: {
          userId: location?.state?._id,
          password: data.password
        },
        withCredentials: true 
      });

      toast.success(response.data.message);

      // set user details in redux store
      
      if(response.data.success){
        dispatch(setToken(response?.data?.token));
        localStorage.setItem('token', response?.data?.token)

        setData({
          password: "",
        })

        navigate('/')
      }
      
    } catch (error) {
      toast.error(error?.response?.data?.message)      
    }
  }

  

  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto'>
        <div className='w-fit mx-auto mb-2 flex justify-center items-center flex-col'>
          <Avatar 
            width={70}
            height={70}
            name={location?.state?.name}
            ImageUrl={location?.state?.profile_pic}
          />

          <h2 className='font-semibold text-lg mt-1'>{location?.state?.name}</h2>

        </div>
        <h3 className='text-center font-serif bg-slate-400 text-white'>Welcome to the Chat App !</h3>
        <form className='grid gap-4 mt-5' onSubmit={handleSubmit}>
          
          <div className='flex flex-col'>
            <label htmlFor='password'>Password : </label>
            <input 
              type='password'
              id="password"
              name="password"
              placeholder='Enter your password'
              className='bg-slate-100 px-2 py-1 focus:outline-primary'
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>
          <button
            className='bg-red-500 text-lg px-4 py-1 hover:bg-red-600 rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
          >
            Let's Go
          </button>
        </form>
        <p className='my-3 text-center'><Link to={"/forgot-password"} className='hover:text-primary font-semibold'>Forgot Password</Link></p>
      </div>
    </div>
  )
}

export default CheckPasswordPage
