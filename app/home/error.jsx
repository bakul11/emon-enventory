"use client"
import React, { useEffect } from 'react';
import { BiError } from "react-icons/bi";


const Error = ({ reset, error }) => {

    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="error">
            <div className='my-8 grid place-items-center'>
                <BiError className='text-5xl text-rose-500' />
                <h2 className='text-gray-500 my-3 text-2xl font-semibold'>Something went wrong!</h2>
                <p className='text-gray-500 text-[18px]'>Sorry we are having some technical issues.</p>
                <p className='text-gray-500 text-[18px] mb-2'>Please try again later.</p>
                <button className='bg-blue-400 text-white font-semibold rounded-md p-3' onClick={() => reset()}>Refresh</button>
            </div>
        </div>
    );
};

export default Error;