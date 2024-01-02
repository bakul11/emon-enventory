"use client"
import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import Image from 'next/image';
import { LuPrinter } from "react-icons/lu";
import { FaBullseye } from 'react-icons/fa6';
import LoaddingAnimation from '@/components/animation/LoaddingAnimation';


const page = ({ params }) => {
    const [products, setProducts] = useState({});
    const [loadding, setLoadding] = useState(FaBullseye);
    const id = params.id;

    useEffect(() => {
        setLoadding(true)
        fetch(`/api/product/productDetails/${id}`)
            .then(res => res.json())
            .then(result => {
              
                setProducts(result)
                setLoadding(false)
            }).catch(error => {
                setLoadding(false)
            })
    }, [id])



    // handle print product 
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


    return (
        <>
            {
                loadding ?
                    <LoaddingAnimation />
                    :
                    <div className='w-full mb-24' ref={componentRef}>
                        <div className="product-title mb-12">
                            <h2 className='text-slate-800 text-[19px] font-semibold'>Product Details </h2>
                            <p className='text-gray-500 text-[15px]'>Full details of a product</p>
                        </div>
                        <div className="flex flex-wrap lg:flex-nowrap gap-5 justify-between">
                            <div className="w-full lg:w-[60%] mx-auto  lg:border-r-2 lg:border-blue-200">
                                <div className="flex items-center justify-between gap-3 p-2 border mb-12 border-blue-200 rounded-lg">
                                    <Image src='https://i.ibb.co/hVd39cB/barcode.png' height={150} width={150} alt='photo' className='object-cover rounded-sm' />
                                    <LuPrinter className='cursor-pointer text-2xl' onClick={handlePrint} />
                                </div>
                                <div className="overflow-auto lg:overflow-hidden">
                                    <table className='table w-full'>

                                        <tbody className='capitalize text-[14px] text-slate-600'>
                                            <tr>
                                                <td className='border-blue-100 border-b-[1px] p-2'>Product</td>
                                                <td className='border-blue-100 border-b-[1px] p-2'>{products?.productName}</td>
                                            </tr>
                                            <tr>
                                                <td className='border-blue-100 border-b-[1px] p-2'>category</td>
                                                <td className='border-blue-100 border-b-[1px] p-2'>{products?.category}</td>
                                            </tr>
                                            <tr>
                                                <td className='border-blue-100 border-b-[1px] p-2'>Sub Category</td>
                                                <td className='border-blue-100 border-b-[1px] p-2'>{products?.subCategory}</td>
                                            </tr>
                                            <tr>
                                                <td className='border-blue-100 border-b-[1px] p-2'>Brand</td>
                                                <td className='border-blue-100 border-b-[1px] p-2'>{products?.brand}</td>
                                            </tr>
                                            <tr>
                                                <td className='border-blue-100 border-b-[1px] p-2'>Quantity</td>
                                                <td className='border-blue-100 border-b-[1px] p-2'>{products?.quantity}</td>
                                            </tr>
                                            <tr>
                                                <td className='border-blue-100 border-b-[1px] p-2'>Unit</td>
                                                <td className='border-blue-100 border-b-[1px] p-2'>{products?.unit}</td>
                                            </tr>
                                            <tr>
                                                <td className='border-blue-100 border-b-[1px] p-2'>SKU</td>
                                                <td className='border-blue-100 border-b-[1px] p-2'>{products?.sku}</td>
                                            </tr>
                                            <tr>
                                                <td className='border-blue-100 border-b-[1px] p-2'>Price</td>
                                                <td className='border-blue-100 border-b-[1px] p-2'>{products?.price}</td>
                                            </tr>
                                            <tr>
                                                <td className='border-blue-100 border-b-[1px] p-2'>Status</td>
                                                <td className='border-blue-100 border-b-[1px] p-2 text-blue-400'>active</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="w-full lg:w-[40%] lg:mx-auto mx-auto">
                                <Image src={products?.productPhoto} height={200} width={200} alt='photo' className='object-cover h-[300px] w-[300px] mx-auto' />
                            </div>
                        </div>
                    </div>
            }
        </>

    );
};

export default page;