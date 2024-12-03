import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'; 
import momonet from 'moment';

import Avatar from './Avatar';

import { BsThreeDotsVertical } from "react-icons/bs";
import { FaAngleLeft } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoImageSharp } from "react-icons/io5";
import { FaRegFileVideo } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IoSend } from "react-icons/io5";

import Loading from './Loading';
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
  });

  const [loading, setLoading] = useState(false);
  const [allMessage, setAllMessage] = useState([]);
  const currentMessage = useRef(null);

  useEffect(() => {
    if(currentMessage.current){
      currentMessage.current.scrollIntoView({behavior: 'smooth', block: 'end'})
    }
  },[allMessage])

  const handleUploadImageVideo = () => {
    setOpenImageVideoUpload((prev) => !prev);
  }

  const handleUploadImage = async(e) => {
    const file = e.target.files[0];
    setLoading(true);

    const uploadPhoto = await uploadFile(file);

    setLoading(false);
    setOpenImageVideoUpload(false);

    setMessage(prev => {
      return{
        ...prev,
        imageUrl: uploadPhoto.url
      }
    })
  }

  const handleUploadVideo = async(e) => {
    const file = e.target.files[0];
    setLoading(true);

    const uploadPhoto = await uploadFile(file);

    setLoading(false);
    setOpenImageVideoUpload(false);

    setMessage(prev => {
      return{
        ...prev,
        videoUrl: uploadPhoto.url
      }
    })
  }

  const handleClearUploadImage = () => {
    setMessage(prev => {
      return{
        ...prev,
        imageUrl: ""
      }
    })
  }  
  const handleClearUploadVideo = () => {
    setMessage(prev => {
      return{
        ...prev,
        videoUrl: ""
      }
    })
  }  

  

  useEffect(() => {
    if(socketConnection){
      socketConnection.emit('message-page', params.userId)

      socketConnection.emit('seen', params.userId);

      socketConnection.on('message-user', (data) => {
        // console.log("user details", data);
        setDataUser(data);
        
      })

      socketConnection.on('message', (data) => {
        // console.log("Message Data", data);
        setAllMessage(data);
      })


    }
  },[socketConnection, params?.userId, user]);


  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setMessage( prev => {
      return{
        ...prev,
        text: value
      }
    })
  }

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log("Message" ,message);
    
    if(message.text || message.imageUrl || message.videoUrl){
      if(socketConnection){
        socketConnection.emit('new message', {
          sender: user?._id,
          receiver: params.userId,
          text: message.text,
          image: message.imageUrl,
          video: message.videoUrl,
          msgByUserId: user?._id
        })

        setMessage({
          text: "",
          imageUrl: "",
          videoUrl: ""
        })
      }
    }
  }

  return (
    <div style={{ backgroundImage: `url(${null})`}} className='bg-repeat bg-cover'>
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
      
      {/* Show Messages */}
      <section className='h-[calc(98vh-120px)] overflow-x overflow-y-scroll scrollbar relative bg-slate-400 bg-opacity-50'>
        
        {/* All Message show here */}

        <div className='flex flex-col py-2 gap-2 mx-2' ref={currentMessage}>
          {
            allMessage.map((msg, index) => {
              return (
                <div key={index} className={`p-1 py-1 rounded w-fit max-w-[280px] md:max-w-sm lg:max-w-md ${user._id === msg.msgByUserId ? "ml-auto bg-green-200" : "bg-slate-200"}`}>
                  <div className='w-full relative'>
                    {
                      msg?.imageUrl && (
                        <img 
                          src={msg?.imageUrl}
                          className='w-full h-full object-scale-down'
                        />
                      )
                    }
                    
                    {
                      msg?.videoUrl && (
                        <video
                          src={msg.videoUrl}
                          className='w-full h-full object-scale-down'
                          controls
                        />
                      )
                    }
                  </div>
                  <p className='px-2'>{msg.text}</p>
                  <p className='text-xs ml-auto w-fit'>{momonet(msg.createdAt).format('hh-mm')}</p>

                </div>
              )
            })
          }
        </div>

        {/* Upload image Display */}
        {
          message.imageUrl && (
            <div className='w-full h-full sticky bottom-0 bg-slate-600 bg-opacity-30 flex justify-center items-center rounded overflow-hidden'>
              <div onClick={handleClearUploadImage} className='w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600'>
                <IoMdClose size={30}/>
              </div>
              <div className='bg-white p-3'>
                <img 
                  src={message.imageUrl}
                  alt='uploadImage'
                  className='aspect-square w-full h-full max-w-sm m-2 object-scale-down'
                />
              </div>
            </div>
          )
        }

        {/* Upload Video Display */}
        {
          message.videoUrl && (
            <div className='w-full h-full sticky bottom-0 bg-slate-600 bg-opacity-30 flex justify-center items-center rounded overflow-hidden'>
              <div onClick={handleClearUploadVideo} className='w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600'>
                <IoMdClose size={30}/>
              </div>
              <div className='bg-white p-3'>
                <video 
                  src={message.videoUrl} 
                  className='aspect-square w-full h-full max-w-sm m-2 object-scale-down'
                  controls
                  muted
                  autoPlay
                />
              </div>
            </div>
          )
        }
        {
          loading && (
            <div className='w-full h-full flex sticky bottom-0 justify-center items-center'>
              <Loading />
            </div>
          )
        }
        
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
                    className='hidden'
                  />
                  <input 
                    type='file'
                    id='uploadVideo'
                    onChange={handleUploadVideo}
                    className='hidden'
                  />
                </form>
              </div>
            )
          }
        </div>

        {/* Input Field */}
        <form className='h-full w-full flex' onSubmit={handleSendMessage}>
          <input 
            type='text'
            placeholder='Enter the Message...'
            className='py-1 px-4 outline-none w-full h-full'
            value={message.text}
            onChange={handleOnChange}
          />

          <button
            className='text-slate-700 hover:text-red-600'
          >
            <IoSend size={30}/>
          </button>
        </form>
        
      </section>


    </div>
  )
}

export default MessagePage
