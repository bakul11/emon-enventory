"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { LuUsers2 } from "react-icons/lu";
import { RiUserAddLine, RiUserVoiceLine } from "react-icons/ri";


//product list
const productList = [
    {
        title: 'User lists',
        path: 'user',
        icon: <RiUserAddLine />
    },
    {
        title: 'customers',
        path: 'customers',
        icon: <LuUsers2 />
    },
    {
        title: 'Suppliers',
        path: 'supplier',
        icon: <RiUserVoiceLine />
    }
]

const UserMenu = ({ openSlidebar }) => {
    const pathname = usePathname();
    return (
        <div className="product-menu my-5">
            <p className={`text-[#76839c] text-[15px] ${openSlidebar ? 'hidden' : 'block'}`}>User Management</p>
            <div className="product-list ml-2">
                {
                    productList?.map((item, index) => {
                        const { title, path, icon } = item;
                        const newPath = `/home/${path}`;
                        return (
                            <div className="product">
                                <Link href={`/home/${path} `} key={index} className={`block my-2 px-2 capitalize rounded-md py-2  text-[15px] ${pathname === newPath ? "bg-blue-400 text-white" : 'text-[#aeb1b6]'} `}>
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