"use clinet"
import Image from 'next/image';
import React from 'react';
import { LuTrash2 } from "react-icons/lu";
import Link from 'next/link';
import toast from 'react-hot-toast';


const DamageCart = ({ pd, index }) => {
    const { title, photo, quantity, _id, time, note } = pd;

    const handleRemoveProduct = async (id) => {
        const confirmRemove = window.confirm('Do you want delete this damage product?');
        if (confirmRemove) {
            fetch(`/api/damage/removeDamage/${id}`, {
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
                <Image src={photo} alt='photo' height={100} width={100} className='object-cover rounded-sm h-[40px] w-[40px]' />
            </td>
            <td className='border-blue-100 border-b-[1px] p-2'> {title}</td>
            <td className='border-blue-100 border-b-[1px] p-2'>{quantity}</td>
            <td className='border-blue-100 border-b-[1px] p-2'>{note}</td>
            <td className='border-blue-100 border-b-[1px] p-2'>{time}</td>
            <td className='border-blue-100 border-b-[1px] p-2'>
                <LuTrash2 className='cursor-pointer text-rose-500' onClick={() => handleRemoveProduct(_id)} />
            </td>
        </tr>
    );
};

export default DamageCart;