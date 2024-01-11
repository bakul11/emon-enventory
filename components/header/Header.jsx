"use client"
import useActiveUser from '@/hook/useActiveUser';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BiSolidShoppingBags } from 'react-icons/bi';
import { FaAngleDown, FaUser } from 'react-icons/fa'
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
        router.push('/home')
    }

    //User Details 
    const [user] = useActiveUser();
    const userId = user?._id;


    // Get Logo api 
    const [logo, setLogo] = useState({});

    useEffect(() => {
        fetch(`/api/logo/getLogoUserBase/${userId}`)
            .then(res => res.json())
            .then(data => setLogo(data))
    }, [logo, userId])




    return (
        <div className='shadow-lg py-4 px-5 lg:px-12 bg-white fixed w-full h-[85px] right-0 left-0 top-0 z-50 '>
            <div className="flex items-center justify-between ">

                <div className="logo">
                    {
                        logo?.logo ?

                            <Link href='/home' className='cursor-pointer'>
                                <Image src={logo?.logo} alt='Company Logo' className='object-fill h-[50px] w-auto' height={30} width={200} />
                            </Link> :
                            <Link href='/home' className='font-bold text-slate-800 uppercase flex items-center gap-2'>
                                <BiSolidShoppingBags className='text-yellow-500 text-4xl' />
                                <span className='text-xl font-bold'>Company Logo</span>
                            </Link>
                    }
                </div>

                <div className="menu">

                    {
                        user?.email &&
                        <div className="relative">
                            <div className="profile flex items-center gap-2 ">
                                <div className="user-logo">
                                    <Image src={user?.profile} alt='photo' className='object-cover rounded-full h-12 w-12' height={50} width={50} />
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
    );
};

export default Header;