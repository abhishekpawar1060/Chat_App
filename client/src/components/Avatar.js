import React from 'react';
import { PiUserCircle } from 'react-icons/pi';
import { useSelector } from 'react-redux';


function Avatar({userId, name, ImageUrl, width, height}) {
    
    const onlineUser = useSelector(state => state?.user?.onlineUser);


    let avatarName = "";

    if(name){
        const splitName = name.split(" ");
        if(splitName.length > 1){
            avatarName = splitName[0][0] + splitName[1][0];
        }else{
            avatarName = splitName[0][0];
        }
    }
    
    const bgColor = [
        'bg-slate-200',
        'bg-teal-200',
        'bg-red-200',
        'bg-rose-200',
        'bg-green-200',
        'bg-yellow-200',
        'bg-cyan-200',

    ]

    const randIdx = Math.floor(Math.random() * bgColor.length); 

    const isOnline = onlineUser.includes(userId);

    return (
        <div className={`text-slate-800 rounded-full shadow border font-bold relative`} style={{ width: width+"px", height: height+"px" }}>
        {
            ImageUrl ? (
                <img 
                    src={ImageUrl}
                    width={width}
                    height={height}
                    alt={name}
                    className='overflow-hidden rounded-full'
                />
            ) : (
                name ? (
                    <div style={{ width: width+"px", height: height+"px" }} className={`overflow-hidden rounded-full flex justify-center items-center text-lg ${bgColor[randIdx]}`}>
                       {avatarName} 
                    </div>
                ) : (
                    <PiUserCircle 
                        size={width}
                    />
                )
            )
        }

        {
            isOnline && (
                <div className='bg-green-800 p-1 rounded-full absolute bottom-3 -right-1 z-10'></div>
            )
        }

        </div>
    )
}

export default Avatar
