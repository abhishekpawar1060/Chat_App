import React, { useState } from 'react'
import { IoChatboxEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { RiLogoutCircleRLine } from "react-icons/ri";

import Avatar from "./Avatar"
import { useSelector } from 'react-redux';
import EditUserDetails from './EditUserDetails';

function Sidebar() {

    const user = useSelector(state => state?.user);

    const [editUserOpen, setEditUserOpen] = useState(false);

    return (
        <div className='w-full h-full'>
            <div className='bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex flex-col justify-between'>
                <div>
                    <NavLink className={({isActive}) => `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${isActive && "bg-slate-200" }`} title='chat'>
                        <IoChatboxEllipses 
                            size={20}
                        />
                    </NavLink>
                    <div className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded' title='add user'>
                        <FaUserPlus
                            size={20}
                        />
                    </div>
                </div>

                <div className='flex flex-col items-center'>
                    <button className='mr-auto' title={user?.name} onClick={() => setEditUserOpen(true)}>
                        <Avatar 
                            width={40}
                            height={40}
                            name={user?.name}
                            ImageUrl={user?.profile_pic}
                        />
                    </button>
                    <button title='logout' className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded'>
                        <span className='-ml-2'>
                            <RiLogoutCircleRLine size={20} />
                        </span>  
                    </button>
                </div>
            </div>

            {/* Edit user details */}

            {
                editUserOpen && (
                    <EditUserDetails onClose={() => setEditUserOpen(false)} user={user}/>
                )
            }
        </div>
    )
}

export default Sidebar
