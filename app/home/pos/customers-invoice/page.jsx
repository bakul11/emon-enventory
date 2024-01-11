"use client"
import Image from 'next/image';
import React, { useRef, useState, useEffect } from 'react';
import { BiSolidShoppingBags } from 'react-icons/bi';
import { LuPrinter } from "react-icons/lu";
import { IoReturnUpBackOutline } from "react-icons/io5";
import Link from 'next/link';
import { useReactToPrint } from 'react-to-print';
import useActiveUser from '@/hook/useActiveUser';


const page = () => {

    const cartInfo = localStorage.getItem('customers-cart');
    const cart = JSON.parse(cartInfo);
    const userInfo = localStorage.getItem('customers-invice');
    const info = JSON.parse(userInfo);
    const { userName, email, mobile, id, userId, receivedTk, dueTk, address } = info;

    //User Details 
    const [user] = useActiveUser();
    const activeUserId = user?._id;


    // Get Logo api 
    const [logo, setLogo] = useState({});
    useEffect(() => {
        fetch(`/api/logo/getLogoUserBase/${activeUserId}`)
            .then(res => res.json())
            .then(data => setLogo(data))
    }, [logo, activeUserId])



    // Get Logo api 
    const [invoice, setInvoice] = useState({});

    useEffect(() => {
        fetch(`/api/invoice/getUserBaseInvoice/${activeUserId}`)
            .then(res => res.json())
            .then(data => setInvoice(data))
    }, [invoice, activeUserId])


    // total quantity
    const getTotal = () => {
        let totalPrice = 0
        cart.forEach(item => {
            totalPrice += item.price * item.newQty
        })
        return { totalPrice }
    }


    // handle print product 
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div className='w-[80%] mx-auto'>
            <div className="print" ref={componentRef}>
                <div className='flex justify-between gap-2'>
                    <div className="logo">
                        {
                            logo?.logo ?

                                <Link href='/home' className='cursor-pointer'>
                                    <Image src={logo?.logo} alt='Company Logo' className='object-fill h-[50px] w-auto' height={30} width={200} />
                                </Link> :
                                <Link href='/home' className='font-bold text-slate-800 uppercase flex items-center gap-2'>
                                    <BiSolidShoppingBags className='text-yellow-500 text-4xl' />
                                    <span className='text-xl font-bold'>Company Logo</span>
                                </Link>
                        }
                    </div>
                    <div className="address">
                        {
                            invoice?.email ?
                                <div className="address space-y-2 text-slate-800 text-[15px]">
                                    <p><span className='text-gray-600 capitalize'>address</span> : {invoice?.address}</p>
                                    <p><span className='text-gray-600 capitalize'>mobile</span> : {invoice?.mobile}</p>
                                    <p><span className='text-gray-600 capitalize'>email</span> : {invoice?.email}</p>
                                </div>
                                :
                                <div className="address space-y-2 text-slate-800 text-[15px]">
                                    <p><span className='text-gray-600 capitalize'>address</span> : dhaka mirpur 10,rk road</p>
                                    <p><span className='text-gray-600 capitalize'>mobile</span> : +8801791860562</p>
                                    <p><span className='text-gray-600 capitalize'>email</span> : tendapos@gmail.com</p>
                                </div>
                        }

                    </div>
                </div>
                <div className="invoice">
                    <div className="invoice-title bg-slate-300 text-slate-800 font-semibold uppercase text-center p-2 rounded-md my-5">
                        <h2>Customer Sales invoice</h2>
                    </div>
                    <div className='flex justify-between gap-2'>
                        <div className="order">
                            <h2 className='text-gray-600 capitalize my-2 font-semibold'>Billing details</h2>
                            <div className="address space-y-2 text-slate-800 text-[14px]">
                                <p><span className='text-gray-600 capitalize'>Customer Name</span> : <span className='capitalize'>{userName}</span></p>
                                <p><span className='text-gray-600 capitalize'>mobile</span> : +880{mobile}</p>
                                <p><span className='text-gray-600 capitalize'>email</span> : {email}</p>
                                <p><span className='text-gray-600 capitalize'>address</span> : {address}</p>
                            </div>
                        </div>
                        <div className="address space-y-2 text-slate-800 text-[14px]">
                            <p><span className='font-medium'>Invoice No.</span> : <span className='text-blue-500 capitalize'> #{userId}</span></p>
                            <p>Order Id : <span className='text-blue-500 capitalize'>#{id}</span></p>
                            <p>Date : <span className='text-gray-600 capitalize'>{new Date().toDateString()}</span></p>
                        </div>
                    </div>
                </div>

                {/* show product in table  */}
                <div className="overflow-auto lg:overflow-hidden my-8">
                    <table className='w-full'>
                        <thead>
                            <tr className='bg-slate-300 text-slate-800 font-semibold capitalize p-2 text-[14px] rounded-md my-5'>
                                <th className='border-blue-100 border-b-[1px] p-2'>#</th>
                                <th className='border-blue-100 border-b-[1px] p-2'>Photo</th>
                                <th className='border-blue-100 border-b-[1px] p-2'>Name</th>
                                <th className='border-blue-100 border-b-[1px] p-2'>price</th>
                                <th className='border-blue-100 border-b-[1px] p-2'>quantity</th>
                                <th className='border-blue-100 border-b-[1px] p-2'>sub total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart?.map((item, index) => {
                                    const { productPhoto, productName, price, newQty, unit } = item;
                                    return (
                                        <tr className='text-[14px] text-[#637381] font-[500] capitalize' key={index}>
                                            <td className='border-blue-100 border-b-[1px] p-2'>{index + 1}</td>
                                            <td className='border-blue-100 border-b-[1px] p-2'>
                                                <Image src={productPhoto} alt='photo' height={100} width={100} className='object-cover rounded-sm h-[40px] w-[40px]' />
                                            </td>
                                            <td className='border-blue-100 border-b-[1px] p-2'> {productName}</td>
                                            <td className='border-blue-100 border-b-[1px] p-2'>{price} tk </td>
                                            <td className='border-blue-100 border-b-[1px] p-2'>{newQty} {unit} </td>
                                            <td className='border-blue-100 border-b-[1px] p-2'> {price * newQty} tk </td>
                                        </tr>
                                    )
                                })

                            }
                        </tbody>
                    </table>
                    <div className="culculation-amount text-slate-700 font-semibold text-[14px]  my-5 space-y-3 float-right">
                        <p className="total">
                            Grand Total : {getTotal().totalPrice} Tk
                        </p>
                        <p>Paid : {receivedTk} Tk</p>
                        <p>Due : {dueTk} Tk</p>
                    </div>
                </div>
            </div>
            <div className="print my-5">
                <div className="flex items-center justify-between gap-2">
                    <button className='bg-orange-400 text-white w-full rounded-md p-3 text-[14px] capitalize font-medium' onClick={handlePrint}>
                        <div className="flex items-center justify-center gap-2">
                            <LuPrinter className='text-lg' />
                            print invoice
                        </div>
                    </button>
                    <Link href='/home/purchases/add-purchases' className='bg-blue-400 text-white w-full rounded-md p-3 text-[14px] capitalize font-medium'>
                        <div className="flex items-center justify-center gap-2">
                            <IoReturnUpBackOutline className='text-lg' />
                            back to purchases
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default page;