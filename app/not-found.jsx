"use client"
import Link from 'next/link';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const notFound = () => {
    return (
        <div className='my-12 px-5 lg:px-12 w-full grid place-items-center place-self-center'>
            <div className="notfount">
                <h2 className='text-rose-500 text-[100px] font-extrabold '>4<span>0</span>4</h2>
                <h3 className='text-[30px] text-gray-500 font-bold m-0 text-center mb-3'>Opps! Page not found</h3>
                <Link href='/' className='bg-blue-400 inline-block text-white rounded-md p-2'>
                    <div className="flex items-center gap-1">
                        Go to Homapage
                        <FaArrowRight />
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default notFound;