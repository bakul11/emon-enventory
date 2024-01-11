"use client"
import Link from 'next/link';
import React from 'react';
import { BsPersonFillLock } from "react-icons/bs";
import { BiLogoRedux } from "react-icons/bi";
import { FaFileInvoice } from "react-icons/fa6";
import { usePathname } from 'next/navigation';

const settingsData = [
    {
        title: 'Change Logo',
        path: 'settings/change-logo',
        logo: <BiLogoRedux />
    },
    {
        title: 'Invoice changes',
        path: 'settings/change-invoice',
        logo: <FaFileInvoice />
    },
    {
        title: 'Change Password',
        path: 'settings/change-password',
        logo: <BsPersonFillLock />
    },
]


const layout = ({ children }) => {
    const pathName = usePathname();
    return (
        <div>
            <div className="lg:flex flex-row flex-wrap min-h-screen w-full justify-between gap-x-5 gap-y-3">
                <div className="slidebar pt-[80px] space-y-3">
                    {
                        settingsData?.map((item, index) => {
                            const { title, path, logo } = item;
                            const newPath = `/home/${path}`;
                            return (
                                <Link href={`/home/${path} `} key={index} className={`inline-block my-2 px-2 capitalize rounded-md py-2  text-[15px] ${pathName === newPath ? "bg-blue-400 text-white" : 'text-slate-700'} `}>
                                    <div className="flex items-center gap-2">
                                        <span>{logo}</span>
                                        {title}
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
                <div className="children px-12 overflow-hidden w-full">
                    {children}
                </div>
            </div>

        </div>
    );
};

export default layout;