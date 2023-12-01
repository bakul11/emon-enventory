"use client"
import React, { useEffect } from 'react';

const Error = ({ reset, error }) => {

    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className='my-8 grid place-items-center'>
            <h2>Something went wrong!</h2>
            <button className='bg-blue-400 text-white font-semibold rounded-md px-1 py-2' onClick={() => reset()}>Try again</button>

        </div>
    );
};

export default Error;