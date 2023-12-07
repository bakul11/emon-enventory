"use client"
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { ClipLoader, PropagateLoader } from 'react-spinners';
import { IoCloudUploadOutline } from "react-icons/io5";
import Image from 'next/image';
import useActiveUser from '@/hook/useActiveUser';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import LoaddingAnimation from '@/components/animation/LoaddingAnimation';

const page = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [receivedTk, setReceivedTk] = useState('');
    const [payableTk, setPayableTk] = useState('');
    const [dueTk, setDueTk] = useState('');
    const [loadding, setLoadding] = useState(false);
    const [user] = useActiveUser();
    const userId = user?._id;
    const router = useRouter();



    // load Sub Category api 
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetch(`/api/customer/getCustomer/${userId}`)
            .then(res => res.json())
            .then(result => {
                setCustomers(result);
                setLoadding(false)
            })

    }, [userId, customers])









    //handle submit form 
    const [submitLoadding, setSubmitLoadding] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();


        if (mobile.length < '11') {
            toast.error('Mobile number must be 11 digit')
            return
        }

        const storeData = {
            userName,
            email,
            mobile,
            address,
            receivedTk,
            payableTk,
            dueTk,
            userId
        }

        setSubmitLoadding(true);
        fetch(`/api/customer/addCustomer`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(storeData)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                if (result.success) {
                    toast.success(result?.message)
                    router.push('/home/customers')
                    setSubmitLoadding(false);

                } else {
                    if (result?.error) {
                        toast.error(result?.message)
                        setSubmitLoadding(false);
                    }
                }
            })

    }









    return (
        <>
            {
                user?.email ?
                    <div className='add-product'>
                        <div className="product-title mb-8">
                            <h2 className='text-slate-800 text-[19px] font-semibold'>Add Customers </h2>
                            <p className='text-gray-500 text-[14px]'>add new customers</p>
                        </div>
                        {/* add prouct form  */}

                        <form onSubmit={handleSubmit}>

                            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-x-5 gap-y-2">
                                <div className="form-item">
                                    <label htmlFor="ee" className='text-slate-500 my-1 font-medium text-[14px]'>Customers Name <span className='text-red-500'>*</span></label>
                                    <input input id='ee' className='bg-white p-2 my-2 text-[14px] outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md ' placeholder='Name of Customers' onChange={(e) => setUserName(e.target.value)} required={true} />
                                </div>
                                <div className="form-item">
                                    <label htmlFor="ee" className='text-slate-500 my-1 font-medium text-[14px]'>Email</label>
                                    <input input id='ee' type='email' className='bg-white p-2 my-2 text-[14px] outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md ' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="form-item">
                                    <label htmlFor="ee" className='text-slate-500 my-1 font-medium text-[14px]'>Mobile <span className='text-red-500'>*</span></label>
                                    <input input id='ee' type='number' className='bg-white p-2 my-2  text-[14px] outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md ' placeholder='Number' onChange={(e) => setMobile(e.target.value)} required={true} />
                                </div>

                            </div>

                            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-x-5 gap-y-2">
                                <div className="form-item lg:my-5">
                                    <label htmlFor="www" className='text-slate-500 my-1 font-medium text-[14px]'>Address</label>
                                    <input input id='www' className='bg-white p-2 my-2 text-[14px] outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md ' placeholder='Address' onChange={(e) => setAddress(e.target.value)} />
                                </div>
                                <div className="form-item lg:my-5">
                                    <label htmlFor="bbb" className='text-slate-500 my-1 font-medium text-[14px]'>Opening Receivable</label>
                                    <input input id='bbb' className='bg-white p-2 my-2 text-[14px] outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md ' placeholder='Receivable' onChange={(e) => setReceivedTk(e.target.value)} />
                                </div>
                                <div className="form-item lg:my-5">
                                    <label htmlFor="ttt" className='text-slate-500 my-1 font-medium text-[14px]'>Opening Payable</label>
                                    <input input id='ttt' type='number' className='bg-white p-2 my-2 text-[14px] outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md ' placeholder='Payable' onChange={(e) => setPayableTk(e.target.value)} />
                                </div>

                            </div>

                            <div className="form-submit my-20 bg-white">
                                {
                                    submitLoadding ?

                                        <button className='bg-rose-500 text-white rounded-md p-2 text-[14px] capitalize font-medium' disabled>
                                            <div className="flex items-center gap-2">
                                                Processing..
                                                <ClipLoader color="#FFFFFF" speedMultiplier={1} size={20} />
                                            </div>
                                        </button>
                                        :
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <button className='bg-orange-400 text-white rounded-md p-3 text-[14px] capitalize font-medium'>
                                                <div className="flex items-center gap-1">
                                                    Submit
                                                    <FaArrowRight />
                                                </div>
                                            </button>
                                            <Link href='/home/customers' className={`bg-rose-400 text-white rounded-md p-3 text-[14px] capitalize font-medium ${loadding ? 'hidden' : 'block'}`}>
                                                <div className="flex items-center gap-1">
                                                    <MdClose />
                                                    cancle
                                                </div>
                                            </Link>
                                        </div>

                                }
                            </div>
                        </form>

                    </div>
                    :
                    <LoaddingAnimation />
            }

        </>

    );
};

export default page;