import React, { useEffect } from 'react'
import axios from 'axios';
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout, setUser } from '../redux/userSlice';

const Home = () => {

  const user  = useSelector(state => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  console.log("redux user", user);
  

  const fetchUserDetails = async () => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`;
      const response = await axios({
        method: 'GET',
        url: URL,
        withCredentials: true
      })

      dispatch(setUser(response.data.data));

      if(response.data.logout){
        dispatch(logout());
        navigate('/email');
      }

      console.log("Current User Details", response);
      
    } catch (error) {
      console.log("error", error);
      
    }
  }

  useEffect(() => {
    fetchUserDetails();
  }, [])

  return (
    <div>
      Home PAge

      <section>
        <Outlet />
      </section>
    </div>
  )
}

export default Home
