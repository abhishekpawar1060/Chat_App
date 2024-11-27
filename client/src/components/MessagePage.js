import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';  
import Avatar from './Avatar';

import { BsThreeDotsVertical } from "react-icons/bs";
import { FaAngleLeft } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoImageSharp } from "react-icons/io5";
import { FaRegFileVideo } from "react-icons/fa";

import uploadFile from "../helper/uploadFile";

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

  const [openImageVideoUpload, setOpenImageVideoUpload] = useState(false);

  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: ""
  })

  const handleUploadImageVideo = () => {
    setOpenImageVideoUpload((prev) => !prev);
  }

  const handleUploadImage = async(e) => {
    const file = e.target.files[0];
    const uploadPhoto = await uploadFile(file);
    setMessage(prev => {
      return{
        ...prev,
        imageUrl: uploadPhoto.url
      }
    })
  }

  const handleUploadVideo = async(e) => {
    const file = e.target.files[0];
    const uploadPhoto = await uploadFile(file);
    setMessage(prev => {
      return{
        ...prev,
        videoUrl: uploadPhoto.url
      }
    })
  }

  useEffect(() => {
    if(socketConnection){
      socketConnection.emit('message-page', params.userId)

      socketConnection.on('message-user', (data) => {
        // console.log("user details", data);
        setDataUser(data);
        
      })
    }
  },[socketConnection, params.userId, user]);




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
      
      <section className='h-[calc(98vh-120px)] bg-red-300 overflow-x overflow-y-scroll scrollbar'>
        Show All Measage
      </section>
      
      {/* Send Mssages */}
      <section className='h-16 bg-white flex items-center p-4'>
        <div className='relative'>
          <button onClick={handleUploadImageVideo} className='flex justify-center items-center w-11 h-11 rounded-full hover:bg-slate-400 hover:text-white'>
            <FaPlus size={20}/>
          </button>
          
          {/* Video and image upload */}

          {
            openImageVideoUpload && (
              <div className='bg-white shadow rounded absolute bottom-14 w-36 p-2'>
                <form>
                  <label htmlFor='uploadImage' className='flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer'>
                    <div className='text-primary'>
                      <IoImageSharp size={18}/>
                    </div>
                    <p>Image</p>
                  </label>
                  <label htmlFor='uploadVideo' className='flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer'>
                    <div className='text-rose-500'>
                      <FaRegFileVideo size={18}/>
                    </div>
                    <p>Video</p>
                  </label>

                  <input 
                    type='file'
                    id='uploadImage'
                    onChange={handleUploadImage}
                  />
                  <input 
                    type='file'
                    id='uploadVideo'
                    onChange={handleUploadVideo}
                  />
                </form>
              </div>
            )
          }
          
        </div>
      </section>


    </div>
  )
}

export default MessagePage
