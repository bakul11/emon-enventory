"use client"
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const page = () => {
    const data = [
        {
            _id: "6569713852e8a368a62074d8",
            productName: 'laptop 11',
            quantity: 5,
            price: 200
        },
        {
            _id: "656d6ca119317c8a8416f08f",
            productName: 'laptop 22',
            quantity: 2,
            price: 1200
        }
    ]

    const pdItem = {
        title: 'kala',
        phone: '0178'
    }
    const totalData = {
        data,
        pdItem
    }

    const [loadding, setLoadding] = useState(false);

    // handle submit data 
    const handleStockPd = () => {
        setLoadding(true)
        fetch('/api/common', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(totalData)
        })
            .then(res => res.json())
            .then(result => {
                console.log("sock data...", result);
                if (result.success) {
                    toast.success(result?.message)
                    setLoadding(false)

                } else {
                    if (result?.error) {
                        toast.error(result?.message)
                        setLoadding(false)
                    }
                }
            })
    }


    return (
        <div>
            <button className={` text-white p-2 rounded-lg ${loadding ? 'bg-rose-500' : 'bg-blue-400'}`} onClick={handleStockPd}>{loadding ? 'processing' : 'stock product'}</button>
        </div>
    );
};

export default page;