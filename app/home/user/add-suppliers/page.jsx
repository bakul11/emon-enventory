"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { ClipLoader } from 'react-spinners';
import { IoCloudUploadOutline } from "react-icons/io5";
import Image from 'next/image';

const page = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [profile, setProfile] = useState('');
    const [review, setReview] = useState('');
    const [loadding, setLoadding] = useState(false);


    //handle review photo
    const handleReview = (event) => {
        setProfile(event.target.files[0])
        setReview(URL.createObjectURL(event.target.files[0]));
    }


    //handle submit form 
    const handleSubmitProduct = (event) => {
        event.preventDefault();

        if (!userName && !profile) {
            return alert('must be fill form')
        }


        setLoadding(true);

        if (loadding) {
            setLoadding(false);
        }

    }





    return (
        <div className='add-product'>
            <div className="product-title mb-8">
                <h2 className='text-slate-800 text-[19px] font-semibold'>Supplier List</h2>
                <p className='text-gray-500 text-[14px]'>Manage your Supplier</p>
            </div>
            {/* add prouct form  */}

            <form onSubmit={handleSubmitProduct}>

                <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-x-5 gap-y-2">

                    <div className="form-item">
                        <label htmlFor="ee" className='text-slate-500 my-1 font-medium text-[14px]'>User Name</label>
                        <input input id='ee' className='bg-white p-2 my-2 text-[14px] outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md ' placeholder='Name' onChange={(e) => setUserName(e.target.value)} required={true} />
                    </div>

                    <div className="form-item">
                        <label htmlFor="eebb" className='text-slate-500 my-1 font-medium text-[14px]'>Email</label>
                        <input input id='eebb' className='bg-white p-2 my-2 text-[14px] outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md ' placeholder='Email address' onChange={(e) => setEmail(e.target.value)} required={true} />
                    </div>
                    <div className="form-item">
                        <label htmlFor="eebb" className='text-slate-500 my-1 font-medium text-[14px]'>Mobile</label>
                        <input input id='eebb' type='number' className='bg-white p-2 my-2 text-[14px] outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md ' placeholder='Mobile No' onChange={(e) => setMobile(e.target.value)} required={true} />
                    </div>
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-x-5 gap-y-2">
                    <div className="form-item lg:my-5">
                        <label htmlFor="uuu" className='text-slate-500 my-1 font-medium text-[14px]'>Role</label>
                        <select id="uuu" onChange={(e) => setRole(e.target.value)} className='bg-white p-2 my-2 text-[14px] outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md '>
                            <option selected disabled className='text-gray-500'>Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                    <div className="form-item lg:my-5">
                        <label htmlFor="bbb" className='text-slate-500 my-1 font-medium text-[14px]'>Password</label>
                        <input input id='bbb' type='password' className='bg-white p-2 my-2 text-[14px] outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md ' placeholder='Create New Password' onChange={(e) => setPassword(e.target.value)} required={true} />
                    </div>
                    <div className="form-item lg:my-5">
                        <label htmlFor="bbb" className='text-slate-500 my-1 font-medium text-[14px]'>Confirm Password</label>
                        <input input id='bbb' type='password' className='bg-white p-2 my-2 text-[14px] outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md ' placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} required={true} />
                    </div>

                </div>
                <div className="form-item my-5">
                    <label htmlFor="pppp" className='text-slate-500 my-1 font-medium text-[14px]'>Profile Picture</label>
                    {
                        review?.length ?
                            <>
                                <Image src={review} alt='photo' height={200} width={200} className='object-cover rounded-md' />
                            </>
                            :

                            <div className="file-upload text-center my-8">
                                <label htmlFor="pppp">
                                    <IoCloudUploadOutline className='text-orange-500 text-3xl cursor-pointer flex items-center justify-center w-full' />
                                    <p className='text-gray-500 text-[14px] text-center'>Drag & drop a file to upload</p>
                                    <input id='pppp' type='file' className='bg-white p-2 my-2 text-[14px] hidden outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md ' placeholder='Name of Product' onChange={handleReview} required={true} />
                                </label>
                            </div>
                    }
                </div>

                <div className="form-submit my-20 bg-white">
                    {
                        loadding ?

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
                                <Link href='/user/supplier' className={`bg-rose-400 text-white rounded-md p-3 text-[14px] capitalize font-medium ${loadding ? 'hidden' : 'block'}`}>
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
    );
};

export default page;