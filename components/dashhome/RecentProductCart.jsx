"use clinet"
import Image from 'next/image';
import React from 'react';



const RecentProductCart = ({ product, index }) => {
    const { productName, productPhoto, price } = product;


    return (
        <tr className='text-[14px] text-[#637381] font-[500] capitalize' key={index}>
            <td className='border-blue-100 border-b-[1px] p-2'>{index + 1}</td>
            <td className='border-blue-100 border-b-[1px] p-2'>
                <Image src={productPhoto} alt='photo' height={100} width={100} className='object-cover rounded-sm h-[40px] w-[40px]' />
            </td>

            <td className='border-blue-100 border-b-[1px] p-2'>{productName}</td>
            <td className='border-blue-100 border-b-[1px] p-2'>{price}</td>
        </tr>
    );
};

export default RecentProductCart;