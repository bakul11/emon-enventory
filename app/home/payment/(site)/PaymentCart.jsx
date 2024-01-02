"use clinet"
import React from 'react';
import { LuTrash2 } from "react-icons/lu";
import { AiOutlineEdit } from "react-icons/ai";
import Link from 'next/link';
import toast from 'react-hot-toast';


const PaymentCart = ({ pd, index }) => {
    const { mobile, amount, userName, _id, time, tnxAmount, userType } = pd;


    const handleRemoveProduct = async (id) => {
        const confirmRemove = window.confirm('Do you want delete this payment?');
        if (confirmRemove) {
            fetch(`/api/payment/removePayment/${id}`, {
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
                <p>Type : {userType}</p>
                <p>Name : {userName}</p>
                <p>Mobile : 0{mobile}</p>
            </td>
            <td className='border-blue-100 border-b-[1px] p-2'>{amount}</td>
            <td className='border-blue-100 border-b-[1px] p-2'>{tnxAmount}</td>
            <td className='border-blue-100 border-b-[1px] p-2'>{time}</td>
            <td className='border-blue-100 border-b-[1px] p-2'>
                <div className="flex items-center gap-3 text-xl">
                    <div className="pd_update">
                        <Link href={`/home/damage/update-damage/${_id}`} >
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

export default PaymentCart;