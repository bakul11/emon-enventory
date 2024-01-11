"use clinet"
import Image from 'next/image';
import React from 'react';
import { LuTrash2 } from "react-icons/lu";
import { AiOutlineEdit } from "react-icons/ai";
import Link from 'next/link';
import toast from 'react-hot-toast';


const SuplierCart = ({ supplier, index }) => {
    const { userName, address, email, _id, mobile, dueTk, receivedTk, payableTk, time, oldDue, productPrice } = supplier;

    const handleRemoveProduct = async (id) => {
        const confirmRemove = window.confirm('Do you want delete this supplier?');
        if (confirmRemove) {
            fetch(`/api/supplier/removeSupplier/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(result => {
                    if (result?.success) {
                        toast.success(result?.message)
                    } else {
                        if (result?.error) {
                            toast.error(result?.message)
                        }
                    }
                })
        }
    }



    return (
        <tr className='text-[14px] text-[#637381] font-medium ' key={index}>
            <td className='border-blue-100 border-b-[1px] p-2'>{index + 1}</td>
            <td className='border-blue-100 border-b-[1px] p-2'>
                <p className='text-blue-400 text-[16px] font-medium capitalize'>Name: <span>{userName}</span></p>
                <p>Email: <span>{email}</span></p>
                <p>Mobile: <span>0{mobile}</span></p>
                <p>Address: <span>{address}</span></p>
            </td>
            <td className='border-blue-100 border-b-[1px] p-2'>{productPrice} tk</td>
            <td className='border-blue-100 border-b-[1px] p-2'>{receivedTk} tk</td>
            <td className='border-blue-100 border-b-[1px] p-2'>{payableTk} tk</td>
            <td className='border-blue-100 border-b-[1px] p-2'>{dueTk} tk</td>
            <td className='border-blue-100 border-b-[1px] p-2'>{oldDue} tk</td>
            <td className='border-blue-100 border-b-[1px] p-2'>{time} tk</td>
            <td className='border-blue-100 border-b-[1px] p-2'>
                <div className="flex items-center gap-3 text-xl">
                    <div className="pd_update">
                        <Link href={`/home/customers/update-customers/${_id}`} >
                            <AiOutlineEdit className='cursor-pointer text-xl text-slate-700' />
                        </Link>
                    </div>

                    <div className="pd_remove">
                        <LuTrash2 className='cursor-pointer text-rose-500' onClick={() => handleRemoveProduct(_id)} />
                    </div>
                </div>
            </td>
        </tr>
    );
};

export default SuplierCart;