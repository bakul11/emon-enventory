"use clinet"
import Image from 'next/image';
import React from 'react';
import { LuTrash2 } from "react-icons/lu";
import { AiOutlineEdit } from "react-icons/ai";
import Link from 'next/link';
import toast from 'react-hot-toast';


const CustomerCart = ({ customer, index }) => {
    const { userName, address, email, _id, mobile } = customer;

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
                <Image src={profile} alt='photo' height={80} width={80} className='object-cover rounded-md h-[40px] w-[40px]' />
            </td>
            <td className='border-blue-100 border-b-[1px] p-2'>  {userName}</td>
            <td className='border-blue-100 border-b-[1px] p-2'>{email}</td>
            <td className='border-blue-100 border-b-[1px] p-2'>{mobile}</td>
            <td className='border-blue-100 border-b-[1px] p-2'>{city}</td>
            <td className='border-blue-100 border-b-[1px] p-2'>{state}</td>
            <td className='border-blue-100 border-b-[1px] p-2'>{createDate}</td>
            <td className='border-blue-100 border-b-[1px] p-2'>{address}</td>

            <td className='border-blue-100 border-b-[1px] p-2'>
                <div className="flex items-center gap-3 text-xl">
                    <div className="pd_update">
                        <Link href={`/home/user/update-supplier/${_id}`} >
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

export default CustomerCart;