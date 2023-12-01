"use clinet"
import Image from 'next/image';
import React from 'react';
import { FaEye } from 'react-icons/fa';
import { LuTrash2 } from "react-icons/lu";
import { AiOutlineEdit } from "react-icons/ai";
import Link from 'next/link';
import toast from 'react-hot-toast';

const ProductCart = ({ product, index }) => {
    const { productName, productPhoto, category, subCategory, price, quantity, unit, brand, sku, _id } = product;

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
                <div className="flex items-center gap-1">
                    <div className="pd-title">
                        <Image src={productPhoto} alt='photo' height={100} width={100} className='object-cover rounded-sm h-[40px] w-[40px]' />
                    </div>
                    <div className="pd-title">
                        {productName}
                    </div>
                </div>
            </td>
            <td className='border-blue-100 border-b-[1px] p-2'>{sku}</td>
            <td className='border-blue-100 border-b-[1px] p-2'>{category}</td>
            <td className='border-blue-100 border-b-[1px] p-2'>{subCategory}</td>
            <td className='border-blue-100 border-b-[1px] p-2'>{brand}</td>
            <td className='border-blue-100 border-b-[1px] p-2'>{price}</td>
            <td className='border-blue-100 border-b-[1px] p-2'>{quantity}</td>
            <td className='border-blue-100 border-b-[1px] p-2'>{unit}</td>
            <td className='border-blue-100 border-b-[1px] p-2'>
                <div className="flex items-center gap-4 text-xl">
                    <div className="pd_view">
                        <Link href={`/home/products/details/${_id}`} >
                            <FaEye className='cursor-pointer text-slate-700' />
                        </Link>
                    </div>
                    <div className="pd_update">
                        <Link href={`/home/products/update/${_id}`} >
                            <AiOutlineEdit className='cursor-pointer text-xl text-slate-600' />
                        </Link>
                    </div>
                    <div className="pd_remove">
                        <LuTrash2 className='cursor-pointer text-red-500' onClick={() => handleRemoveProduct(_id)} />
                    </div>
                </div>
            </td>
        </tr>
    );
};

export default ProductCart;