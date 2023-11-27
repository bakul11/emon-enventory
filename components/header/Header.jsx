"use client"
import useActiveUser from '@/hook/useActiveUser';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { BiSolidShoppingBags } from 'react-icons/bi';
import { FaAngleDown, FaBell, FaGlobe, FaUser } from 'react-icons/fa'
import { MdLogout, MdSettings } from 'react-icons/md';



const Header = () => {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    //Handle Toggle Profile 
    const handleOpenProfile = () => setOpen(!open)

    //Handle Logout 
    const handleLogOut = () => {
        Cookies.remove('user');
        toast.success('Logout successfully done');
        setTimeout(() => {
            return router.push('/home')
        }, 1000);

    }

    //User Details 
    const [user] = useActiveUser();


    return (
        <div className='shadow-lg py-4 px-5 lg:px-12 bg-white fixed w-full right-0 left-0 top-0 z-50 '>
            <div className="flex items-center justify-between ">

                <div className="logo">
                    <div className='font-bold text-slate-800 uppercase flex items-center gap-2'>
                        <BiSolidShoppingBags className='text-yellow-500 text-5xl' />
                        <span className='text-2xl font-bold'>tenda pos</span>
                    </div>
                </div>

                <div className="profile-details flex items-center gap-5">
                    <div className="global">
                        <FaGlobe className='text-gray-500 cursor-pointer text-2xl' />
                    </div>
                    <div className="notification relative">
                        <FaBell className='text-gray-500 cursor-pointer text-2xl' />
                        <div className="bg-rose-400 rounded-full p-1 text-white w-6 h-6 absolute -top-4 -right-2 flex items-center justify-center">2</div>
                    </div>
                    <div className="settings">
                        <MdSettings className='text-gray-500 cursor-pointer text-2xl' />
                    </div>


                    <div className="menu">

                        {
                            user?.email &&
                            <div className="relative">
                                <div className="profile flex items-center gap-2 ">
                                    <div className="user-logo">
                                        <Image src={user?.profile} className='object-cover rounded-full h-12 w-12' height={50} width={50} />
                                    </div>
                                    <div className="user-name">
                                        <h3 className='text-slate-800 capitalize font-medium text-[14px]'>{user?.userName}</h3>
                                        <p className='text-[#728289] capitalize text-[12px]'>Super admin</p>
                                    </div>
                                    <div className="arrow">
                                        <FaAngleDown className={`text-gray-500 cursor-pointer ${open ? 'rotate-180' : ''}`} onClick={handleOpenProfile} />
                                    </div>
                                </div>
                                <div className={`absolute top-16 bg-blue-400 rounded-sm w-[150px] p-2 ${open ? 'block' : 'hidden'}`}>
                                    <ul className='text-[13px] text-white space-y-3 capitalize divide-y-[1px]'>
                                        <li>
                                            <Link href='/home/profile' className='flex items-center gap-1' onClick={handleOpenProfile}>
                                                <FaUser />
                                                My Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href='/home/settings' className='flex items-center gap-1 mt-1' onClick={handleOpenProfile}>
                                                <MdSettings />
                                                settings
                                            </Link>
                                        </li>
                                        <li>
                                            <button className='flex items-center gap-1 mt-1' onClick={handleLogOut}>
                                                <MdLogout />
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;