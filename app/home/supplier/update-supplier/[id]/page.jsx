"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { ClipLoader } from 'react-spinners';
import { IoCloudUploadOutline } from "react-icons/io5";
import Image from 'next/image';
import toast from 'react-hot-toast';
import useActiveUser from '@/hook/useActiveUser';
import { useRouter } from 'next/navigation';

const page = ({ params }) => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [mobile, setMobile] = useState('');
    const [profile, setProfile] = useState('');
    const [review, setReview] = useState('');
    const [loadding, setLoadding] = useState(false);
    const [user] = useActiveUser();
    const router = useRouter();

    const id = params.id;


    //handle review photo
    const handleReview = (event) => {
        setProfile(event.target.files[0])
        setReview(URL.createObjectURL(event.target.files[0]));
    }


    //handle submit form 
    const handleSubmit = async (event) => {
        event.preventDefault();

        // image upload api 
        const formData = new FormData();
        formData.append('image', profile)
        setLoadding(true);
        await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_SCRECT_KEY}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data?.success) {
                    setLoadding(false);
                    const imageUrl = data.data.url;
                    const userId = user?._id;
                    const storeData = {
                        userName,
                        email,
                        state,
                        city,
                        address,
                        mobile,
                        profile: imageUrl,
                        userId
                    }
                    setLoadding(true);
                    fetch(`/api/supplier/updateSupplier/${id}`, {
                        method: 'PUT',
                        headers: {
                            "Content-Type": 'application/json'
                        },
                        body: JSON.stringify(storeData)
                    })
                        .then(res => res.json())
                        .then(result => {
                            if (result.success) {
                                toast.success(result?.message)
                                setLoadding(false);
                                router.push('/home/supplier')
                                setUserName('')
                                setEmail('');
                                setCity('')
                                setState('')
                                setReview('')
                                setAddress('')
                                setMobile('')

                            } else {
                                if (result?.error) {
                                    toast.error(result?.message)
                                    setLoadding(false);
                                }
                            }
                        })

                }

            })




    }





    return (
        <div className='add-product'>
            <div className="product-title mb-8">
                <h2 className='text-slate-800 text-[19px] font-semibold'>Supplier Management</h2>
                <p className='text-gray-500 text-[14px]'>Edit/Update Supplier </p>
            </div>
            {/* add prouct form  */}

            <form onSubmit={handleSubmit}>

                <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-x-5 gap-y-2">

                    <div className="form-item">
                        <label htmlFor="ee" className='text-slate-500 my-1 font-medium text-[14px]'>Supplier Name</label>
                        <input input id='ee' value={userName} className='bg-white p-2 my-2 text-[14px] outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md ' placeholder='Name' onChange={(e) => setUserName(e.target.value)} required={true} />
                    </div>

                    <div className="form-item">
                        <label htmlFor="eebb" className='text-slate-500 my-1 font-medium text-[14px]'>Email</label>
                        <input input id='eebb' value={email} type='email' className='bg-white p-2 my-2 text-[14px] outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md ' placeholder='Email address' onChange={(e) => setEmail(e.target.value)} required={true} />
                    </div>
                    <div className="form-item">
                        <label htmlFor="eebb" className='text-slate-500 my-1 font-medium text-[14px]'>Mobile</label>
                        <input input id='eebb' type='number' value={mobile} className='bg-white p-2 my-2 text-[14px] outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md ' placeholder='Mobile No' onChange={(e) => setMobile(e.target.value)} required={true} />
                    </div>
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-x-5 gap-y-2">
                    <div className="form-item lg:my-5">
                        <label htmlFor="gg" className='text-slate-500 mb-2 font-medium text-[15px]'>State</label>
                        <input type='number' id='gg' placeholder='state' value={state} className='w-full text-[14px] outline-none rounded-md py-2 px-2 ring-1 mt-2 ring-blue-300 focus:ring-2 focus:ring-green-400 placeholder-gray-500' onChange={(e) => setState(e.target.value)} required={true} />
                    </div>
                    <div className="form-item lg:my-5">
                        <label htmlFor="eee" className='text-slate-500 mb-2 font-medium text-[15px]'>City</label>
                        <input type='text' id='eee' placeholder='City' value={city} className='w-full text-[14px] outline-none rounded-md py-2 px-2 ring-1 mt-2 ring-blue-300 focus:ring-2 focus:ring-green-400 placeholder-gray-500' onChange={(e) => setCity(e.target.value)} required={true} />
                    </div>
                    <div className="form-item lg:my-5">
                        <label htmlFor="gwwg" className='text-slate-500 mb-2 font-medium text-[15px]'>Address</label>
                        <input type='text' id='gwwg' placeholder='Address' value={address} className='w-full text-[14px] outline-none rounded-md py-2 px-2 ring-1 mt-2 ring-blue-300 focus:ring-2 focus:ring-green-400 placeholder-gray-500' onChange={(e) => setAddress(e.target.value)} required={true} />
                    </div>

                </div>
                <div className="form-item my-5">
                    <label htmlFor="pppp" className='text-slate-500 my-1 font-medium text-[14px]'>Picture</label>
                    {
                        review?.length ?
                            <div className="profile my-3">
                                <Image src={review} alt='photo' height={150} width={150} className='object-cover rounded-md' />
                            </div>
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

                <div className="form-submit my-16 bg-white">
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
                                        update
                                        <FaArrowRight />
                                    </div>
                                </button>
                                <Link href='/home/supplier' className={`bg-rose-400 text-white rounded-md p-3 text-[14px] capitalize font-medium ${loadding ? 'hidden' : 'block'}`}>
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