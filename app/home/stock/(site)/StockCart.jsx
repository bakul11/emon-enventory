"use clinet"
import Image from 'next/image';
import React from 'react';
import { LuTrash2 } from "react-icons/lu";
import toast from 'react-hot-toast';

const StockCart = ({ product, index }) => {
    const { productName, productPhoto, category, subCategory, price, quantity, unit, brand, productCode, _id } = product;

    const handleRemoveProduct = async (id) => {
        const confirmRemove = window.confirm('Do you want delete this item?');

        if (confirmRemove) {
            fetch(`/api/product/removeProduct/${id}`, {
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
        <tr className='text-[14px] text-[#637381] font-[500] capitalize' key={index}>
            <td className='border-blue-100 border-b-[1px] p-2'>{index + 1}</td>
            <td className='border-blue-100 border-b-[1px] p-2'>
                <div className="flex items-center gap-2">
                    <div className="logo">
                        <Image src={productPhoto} alt='photo' height={100} width={100} className='object-cover rounded-sm h-[40px] w-[40px]' />
                    </div>
                    <div className="details">
                        <p>{productName}</p>
                        <p className='text-blue-400 text-[12px]'>Code : #{productCode}</p>
                    </div>
                </div>
            </td>
            <td className='border-blue-100 border-b-[1px] p-2'>{category}</td>
            <td className='border-blue-100 border-b-[1px] p-2'>{subCategory}</td>
            <td className='border-blue-100 border-b-[1px] p-2'>{brand}</td>
            <td className='border-blue-100 border-b-[1px] p-2'>{price} tk</td>
            <td className='border-blue-100 border-b-[1px] p-2'>{quantity} {unit}</td>
            <td className='border-blue-100 border-b-[1px] p-2'>0</td>
            <td className='border-blue-100 border-b-[1px] p-2'>{price * quantity} tk</td>
            <td className='border-blue-100 border-b-[1px] p-2'>
                <LuTrash2 className='cursor-pointer text-red-500' onClick={() => handleRemoveProduct(_id)} />

            </td>
        </tr>
    );
};

export default StockCart;