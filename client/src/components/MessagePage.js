import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';  
import Avatar from './Avatar';

import { BsThreeDotsVertical } from "react-icons/bs";
import { FaAngleLeft } from "react-icons/fa";


function MessagePage() {

  const params = useParams();

  const socketConnection = useSelector(state => state?.user?.socketConnection)

  const user = useSelector(state => state?.user)

  const [dataUser, setDataUser] = useState({
    _id: "",
    name: "",
    email: "",
    profile_pic: "",
    online: false
  });

  useEffect(() => {
    if(socketConnection){
      socketConnection.emit('message-page', params.userId)

      socketConnection.on('message-user', (data) => {
        // console.log("user details", data);
        setDataUser(data);
        
      })
    }
  },[socketConnection, params.userId, user])

  return (
    <div>
      <header className='sticky top-0 h-16 bg-white flex justify-between items-center px-4'>
        <div className='flex items-center gap-4'>
          <Link to={"/"} className='lg:hidden'>
            <FaAngleLeft size={25}/>
          </Link>

          <div>
            <Avatar 
              width={50}
              height={50}
              ImageUrl={dataUser?.profile_pic}
              name={dataUser?.name}
              userId={dataUser?._id}
            />
          </div>
          <div>
            <h3 className='font-semibold text-lg my-0 text-ellipsis line-clamp-1'>{dataUser?.name}</h3>
            <p className='-my-1 text-sm'>
              {
                dataUser.online ? <span className='text-green-700'>online</span> : <span className='text-slate-400'>offline</span>
              }
            </p>
          </div>
        </div>

        <div>
          <button className="hover:text-primary">
            <BsThreeDotsVertical />
          </button>
        </div>
      </header>
      
    </div>
  )
}

export default MessagePage
