import React, { useState } from 'react'
import { IoChatboxEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { GoArrowUpLeft } from "react-icons/go";

import Avatar from "./Avatar"
import { useSelector } from 'react-redux';
import EditUserDetails from './EditUserDetails';
import SearchUser from './SearchUser';

function Sidebar() {

    const user = useSelector(state => state?.user);

    const [editUserOpen, setEditUserOpen] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);

    const [allUser, setAllUser] = useState([]);

    return (
        <div className='w-full h-full grid grid-cols-[48px,1fr] bg-white'>
            <div className='bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex flex-col justify-between'>
                <div>
                    <NavLink className={({isActive}) => `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${isActive && "bg-slate-200" }`} title='chat'>
                        <IoChatboxEllipses 
                            size={20}
                        />
                    </NavLink>

                    <div title='add friend' onClick={() => setOpenSearch(true)} className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded'>
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

            <div className='w-ful'>
                <div className='h-16 flex items-center'>
                    <h2 className='text-xl font-bold p-4 text-slate-700'>Message</h2>
                </div>
                <div className='bg-slate-200 p-[0.5px]'></div>

                <div className='h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar'>
                    {
                        allUser.length === 0 && (
                            <div className='mt-12'>
                                <div className='flex justify-center items-center my-4 text-slate-600'>
                                    <GoArrowUpLeft size={50}/>
                                </div>
                                <p className='text-lg text-center text-slate-400'>Explore users to start a conversation with.</p>
                            </div>
                        )
                    }
                </div>

            </div>

            {/* Edit user details */}
            {
                editUserOpen && (
                    <EditUserDetails onClose={() => setEditUserOpen(false)} user={user}/>
                )
            }

            {/* Search User */}
            {
                openSearch && (
                    <SearchUser onClose={() => setOpenSearch(false)}/>
                )
            }

        </div>
    )
}

export default Sidebar
