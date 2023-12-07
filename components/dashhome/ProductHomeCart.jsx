"use clinet"
import Image from 'next/image';
import React from 'react';
import { FaEye } from 'react-icons/fa';
import Link from 'next/link';


const ProductHomeCart = ({ product, index }) => {
    const { productName, productPhoto, category, subCategory, price, quantity, unit, brand, sku, _id } = product;


    return (
        <tr className='text-[14px] text-[#637381] font-[500] capitalize' key={index}>
            <td className='border-blue-100 border-b-[1px] p-2'>{index + 1}</td>
            <td className='border-blue-100 border-b-[1px] p-2'>
                <Image src={productPhoto} alt='photo' height={100} width={100} className='object-cover rounded-sm h-[40px] w-[40px]' />
            </td>
            <td className='border-blue-100 border-b-[1px] p-2'> {productName}</td>
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
                </div>
            </td>
        </tr>
    );
};

export default ProductHomeCart;