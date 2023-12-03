"use clinet"
import Image from 'next/image';
import React from 'react';
import { FaEye } from 'react-icons/fa';
import { LuTrash2 } from "react-icons/lu";
import { AiOutlineEdit } from "react-icons/ai";
import Link from 'next/link';
import axios from 'axios';

const UserCart = ({ user, index }) => {
    const { username, address, email } = user;

    const handleRemoveProduct = async (id) => {
        const confirmRemove = window.confirm('Do you want delete this item?');

        if (confirmRemove) {
            const { data } = await axios.delete('/product/remove/id')
        }
    }



    return (
        <tr className='text-[14px] text-[#637381] font-[500] ' key={index}>
            <td className='border border-blue-100 px-6'>{index + 1}</td>
            <td className='border border-blue-100 px-6'> {username}</td>
            <td className='border border-blue-100 px-6'>{address?.zipcode}</td>
            <td className='border border-blue-100 px-6'>{email}</td>
            <td className='border border-blue-100 px-6'>Admin/Manager</td>
            <td className='border border-blue-100 px-6'>3/15/2022</td>
            <td className='border border-blue-100 px-6'>
                <div className="flex items-center gap-1">
                    <div className="active bg-blue-400 w-2 h-2 rounded-full"></div>
                    <p>active</p>
                </div>
            </td>
            <td className='border border-blue-100 px-6'>
                <div className="flex items-center gap-3 text-xl">
                    <div className="pd_update">
                        <Link href={`/user/update/${username}`} >
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

export default UserCart;