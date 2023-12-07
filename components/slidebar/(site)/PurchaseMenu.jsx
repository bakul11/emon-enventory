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
        title: 'Purchases',
        path: 'purchases',
        icon: <RiUserAddLine />
    },
    {
        title: 'Damage ',
        path: 'damage',
        icon: <LuUsers2 />
    },
    {
        title: 'POS',
        path: 'pos',
        icon: <RiUserVoiceLine />
    },
    {
        title: 'Stores',
        path: 'store',
        icon: <FaAppStore />
    }
]

const ParchaseMenu = ({ openSlidebar }) => {
    const pathname = usePathname();
    return (
        <div className="product-menu my-5">
            <p className={`text-[#76839c] text-[15px] ${openSlidebar ? 'hidden' : 'block'}`}>Sales & Purchases</p>
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

export default ParchaseMenu;