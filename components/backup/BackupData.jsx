"use client"
import Cookies from 'js-cookie';
import Link from 'next/link';
import React from 'react';
import toast from 'react-hot-toast';
import { LuDatabaseBackup, LuLogOut } from "react-icons/lu";
import { MdSettings } from 'react-icons/md';


const BackupData = ({ openSlidebar }) => {

    const handleLogout = () => {
        Cookies.remove('user');
        toast.success('Logout successfully done');
        router.push('/home')
    }


    return (
        <div>
            <div className="backup">
                <p className={`text-[#76839c] text-[15px] mt-5  ${openSlidebar ? 'hidden' : 'block'}`}>Settings</p>
            </div>
            <button className='text-[#aeb1b6] capitalize flex items-center gap-x-2 my-5 ml-2 px-2' onClick={() => toast.success('Personal data backup is processing..')}>
                <LuDatabaseBackup />
                <span className={`text-[15px] ${openSlidebar ? 'hidden' : 'block'}`}> Backup</span>
            </button>
            <Link href='/home/settings' className='text-[#aeb1b6] capitalize flex items-center gap-x-2 my-5 ml-2 px-2' onClick={handleLogout}>
                <MdSettings />
                <span className={`text-[15px] ${openSlidebar ? 'hidden' : 'block'}`}>  settings</span>
            </Link>
            <button className='text-[#aeb1b6] capitalize flex items-center gap-x-2 my-5 ml-2 px-2' onClick={handleLogout}>
                <LuLogOut />
                <span className={`text-[15px] ${openSlidebar ? 'hidden' : 'block'}`}> Logout</span>
            </button>

        </div>
    );
};

export default BackupData;