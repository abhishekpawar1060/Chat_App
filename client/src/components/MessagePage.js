import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';  

function MessagePage() {

  const params = useParams();

  const socketConnection = useSelector(state => state?.user?.socketConnection)

  const [dataUser, setDataUser] = useState({
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
  },[socketConnection, params.userId])

  return (
    <div>
      <header className=''>

      </header>
    </div>
  )
}

export default MessagePage
