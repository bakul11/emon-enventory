"use client"
import React, { useState } from 'react';

const page = () => {

    const [single, setSingle] = useState('');

    const generateProductId = () => {
        const pd = Math.random(1 * 2);
        const pdId = 'PROD';
        const productId = `${pd}-${pdId}`;
        return productId;
    }


    const handleAddProduct = () => {
        const id = generateProductId();
        const a = id.slice(15, 23)
        const c = a.slice(0, 5)
        setSingle(c);

    }

    return (
        <div>
            <h2>product id :{single}</h2>
            <button className='bg-blue-400 text-white rounded-md p-3 capitalize' onClick={handleAddProduct}>add product</button>
        </div>
    );
};

export default page;