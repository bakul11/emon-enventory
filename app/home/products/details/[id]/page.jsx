"use client"
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useQuery } from 'react-query';
import Image from 'next/image';
import { ClipLoader } from 'react-spinners';
import { LuPrinter } from "react-icons/lu";


const page = ({ params }) => {
    const { isLoading, error, data } = useQuery('repoData', () =>
        fetch(`/api/product/productDetails/${params.id}`).then(res =>
            res.json()
        )
    )


    // handle print product 
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


    return (
        <>
            {
                isLoading ?
                    <>
                        <h3 className='text-slate-800 text-xl mb-3'>Loading...</h3>
                        <ClipLoader
                            color="#36d7b7"
                            size={50}
                            speedMultiplier={2}
                        />
                    </>
                    :
                    <div className='w-full mb-24' ref={componentRef}>
                        <div className="product-title mb-12">
                            <h2 className='text-slate-800 text-[19px] font-semibold'>Product Details</h2>
                            <p className='text-gray-500 text-[15px]'>Full details of a product</p>
                        </div>
                        <div className="flex gap-5 justify-between">
                            <div className="">
                                <div className="flex items-center justify-between gap-3 p-2 border border-blue-200 rounded-lg">
                                    <Image src='https://i.ibb.co/hVd39cB/barcode.png' height={150} width={150} alt='photo' className='object-cover rounded-sm' />
                                    <LuPrinter className='cursor-pointer text-2xl' onClick={handlePrint} />
                                </div>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody className='capitalize text-[14px] text-slate-600'>
                                        <tr>
                                            <td className='border border-blue-100 px-5 py-3'>Product</td>
                                            <td className='border border-blue-100 px-5 py-3'>{data?.productName}</td>
                                        </tr>
                                        <tr>
                                            <td className='border border-blue-100 px-5 py-3'>category</td>
                                            <td className='border border-blue-100 px-5 py-3'>{data?.category}</td>
                                        </tr>
                                        <tr>
                                            <td className='border border-blue-100 px-5 py-3'>Sub Category</td>
                                            <td className='border border-blue-100 px-5 py-3'>{data?.subCategory}</td>
                                        </tr>
                                        <tr>
                                            <td className='border border-blue-100 px-5 py-3'>Brand</td>
                                            <td className='border border-blue-100 px-5 py-3'>{data?.brand}</td>
                                        </tr>
                                        <tr>
                                            <td className='border border-blue-100 px-5 py-3'>Quantity</td>
                                            <td className='border border-blue-100 px-5 py-3'>{data?.quantity}</td>
                                        </tr>
                                        <tr>
                                            <td className='border border-blue-100 px-5 py-3'>Unit</td>
                                            <td className='border border-blue-100 px-5 py-3'>{data?.unit}</td>
                                        </tr>
                                        <tr>
                                            <td className='border border-blue-100 px-5 py-3'>SKU</td>
                                            <td className='border border-blue-100 px-5 py-3'>{data?.sku}</td>
                                        </tr>
                                        <tr>
                                            <td className='border border-blue-100 px-5 py-3'>Price</td>
                                            <td className='border border-blue-100 px-5 py-3'>{data?.price}</td>
                                        </tr>
                                        <tr>
                                            <td className='border border-blue-100 px-5 py-3'>Status</td>
                                            <td className='border border-blue-100 px-5 py-3 text-blue-400'>active</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="o">
                                <Image src={data?.productPhoto} height={200} width={200} alt='photo' className='object-cover rounded-sm' />
                            </div>
                        </div>
                    </div>
            }
        </>

    );
};

export default page;