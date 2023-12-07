"use client"
import React from 'react';
import { PropagateLoader } from 'react-spinners';

const LoaddingAnimation = () => {
    return (
        <div className="loadding grid place-items-center">
            <h2 className='text-slate-600 mb-2 text-[19px] font-medium'>Loading please wait...</h2>
            <PropagateLoader
                color="#f1c40f"
                size={25}
            />
        </div>
    );
};

export default LoaddingAnimation;