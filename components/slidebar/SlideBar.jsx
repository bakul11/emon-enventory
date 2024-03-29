"use client"
import React, { useState } from 'react';
import { FaAngleDoubleLeft } from 'react-icons/fa'
import { MdDashboard } from 'react-icons/md'
import ProductMenu from './(site)/ProductMenu';
import UserMenu from './(site)/UserMenu';
import ParchaseMenu from './(site)/PurchaseMenu';
import BackupData from '../backup/BackupData';
import Link from 'next/link';



const SlideBar = () => {
    const [openSlidebar, setOpenOpenSlidebar] = useState(false);

    //handle open Slidebar 
    const handleOpenSlidebar = () => setOpenOpenSlidebar(!openSlidebar);

    return (
        <div className={`min-h-screen border px-4 bg-slate-800  border-r-slate-200 relative ${openSlidebar ? 'w-[80px]' : 'w-[210px]'}`}>
            <p className={`text-[#76839c] text-[15px] mt-5  ${openSlidebar ? 'hidden' : 'block'}`}>Main</p>
            <Link href='/home' className='text-[#aeb1b6] capitalize flex items-center gap-x-2 my-5 ml-2 px-2'>
                <MdDashboard />
                <span className={`text-[15px] ${openSlidebar ? 'hidden' : 'block'}`}> dashboard</span>
            </Link>
            {/* angle  */}
            <FaAngleDoubleLeft className={`bg-yellow-500 rounded-full text-white text-xl w-7 h-7 p-1 cursor-pointer absolute -right-2 top-12 ${openSlidebar ? 'rotate-180' : ''}`} onClick={handleOpenSlidebar} />

            {/* product Menu  */}
            <ProductMenu openSlidebar={openSlidebar} />

            {/* product Menu  */}
            <ParchaseMenu openSlidebar={openSlidebar} />

            {/* product Menu  */}
            <UserMenu openSlidebar={openSlidebar} />

            {/* Backup data  */}
            <BackupData openSlidebar={openSlidebar} />
        </div>

    );
};

export default SlideBar;