'use client'
import React from 'react';
import { FaShoppingBag } from 'react-icons/fa';
import { SiFampay } from "react-icons/si";
import { RiWechatPayFill } from "react-icons/ri";
import { TbZoomReset } from "react-icons/tb";





// Sample data 
const overviewData = [
    {
        title: 'Total Purchase Due',
        amount: '$307144',
        icon: <FaShoppingBag />
    },
    {
        title: 'Total invoice report',
        amount: '$257842',
        icon: <SiFampay />
    },
    {
        title: 'Total users count',
        amount: '$98653',
        icon: <RiWechatPayFill />
    },
    {
        title: 'Total returned Product',
        amount: '$87523',
        icon: <TbZoomReset />
    }
]

const Overview = () => {
    return (
        <div className='overview'>
            <h1 className='text-slate-800 font-semibold text-xl mb-5'>Dashboard Overview</h1>
            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-5">
                {
                    overviewData?.map((item, index) => {
                        const { title, amount, icon } = item;
                        return (
                            <div className="shadow-lg bg-white rounded-md px-2 py-4 overview-data hover:translate-y-2 ease-linear transition-all duration-[0.5s]" key={index}>
                                <div className="flex items-center gap-2 ">
                                    <div className="overview-logo">
                                        <h3 className='bg-blue-100 text-orange-400 w-[50px] h-[50px] text-2xl rounded-full grid place-items-center'>{icon}</h3>
                                    </div>
                                    <div className="overview-title">
                                        <h3 className='text-white font-semibold text-[17px]'>{amount}</h3>
                                        <p className='text-white text-[14px]'>{title}</p>
                                    </div>
                                </div>
                            </div>
                        )

                    })
                }
            </div>
        </div>
    );
};

export default Overview;