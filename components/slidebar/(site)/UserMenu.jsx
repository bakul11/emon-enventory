"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { LuUsers2 } from "react-icons/lu";
import { RiUserAddLine, RiUserVoiceLine } from "react-icons/ri";
import { FaAppStore } from "react-icons/fa";

//product list
const productList = [
    {
        title: 'User lists',
        path: 'user',
        icon: <RiUserAddLine />
    },
    {
        title: 'customers',
        path: 'user/customers',
        icon: <LuUsers2 />
    },
    {
        title: 'Suppliers',
        path: 'user/supplier',
        icon: <RiUserVoiceLine />
    },
    {
        title: 'Stores',
        path: 'user/store',
        icon: <FaAppStore />
    }
]

const UserMenu = ({ openSlidebar }) => {
    const pathname = usePathname();
    return (
        <div className="product-menu my-5">
            <p className={`text-slate-600 text-[15px] ${openSlidebar ? 'hidden' : 'block'}`}>User Management</p>
            <div className="product-list ml-2">
                {
                    productList?.map((item, index) => {
                        const { title, path, icon } = item;
                        const newPath = `/home/${path}`;
                        return (
                            <div className="product">
                                <Link href={`/home/${path} `} key={index} className={`block my-2 px-2 capitalize rounded-sm py-1 text-[16px] ${pathname === newPath ? "bg-blue-400 text-white" : 'text-[#67748E]'} `}>
                                    <div className="flex items-center gap-2">
                                        <span className='text-xl'>  {icon}</span>
                                        <span className={`${openSlidebar ? 'hidden' : 'block'}`}> {title}</span>
                                    </div>

                                </Link>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    );
};

export default UserMenu;