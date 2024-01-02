"use clinet"
import React from 'react';
import { LuTrash2 } from "react-icons/lu";
import toast from 'react-hot-toast';


const UnitCart = ({ pd, index }) => {
    const { title, _id } = pd;

    const handleRemoveProduct = async (id) => {
        const confirmRemove = window.confirm('Do you want delete this unit ?');
        if (confirmRemove) {
            fetch(`/api/unit/removeUnit/${id}`, {
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
            <td className='border-blue-100 border-b-[1px] p-2 capitalize'> {title}</td>
            <td className='border-blue-100 border-b-[1px] p-2'>
                <LuTrash2 className='cursor-pointer text-rose-500' onClick={() => handleRemoveProduct(_id)} />
            </td>
        </tr>
    );
};

export default UnitCart;