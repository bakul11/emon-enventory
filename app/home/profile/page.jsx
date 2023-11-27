"use client"
import useActiveUser from '@/hook/useActiveUser';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaArrowRight } from 'react-icons/fa';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { BeatLoader } from 'react-spinners';

const page = () => {
    const [user] = useActiveUser();
    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [address, setAddress] = useState('');
    const [profile, setProfile] = useState('');
    const [review, setReview] = useState('');
    const [loadding, setLoadding] = useState(false);


    //handle review photo
    const handleReview = (event) => {
        setProfile(event.target.files[0])
        setReview(URL.createObjectURL(event.target.files[0]));
    }


    //handle submit 
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!userName || !state || !city || !profile || !address || !country || !phone) {
            toast.error('all field must be required')
        }


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
                    const storeData = {
                        userName,
                        phone,
                        country,
                        state,
                        city,
                        address,
                        profile: imageUrl
                    }
                    setLoadding(true);
                    fetch(`/api/auth/updateUser/${user?._id}`, {
                        method: 'PUT',
                        headers: {
                            "Content-Type": 'application/json'
                        },
                        body: JSON.stringify(storeData)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log('result', result)
                            if (result.success) {
                                toast.success(result?.message)
                                setLoadding(false);
                                setAddress('')
                                setState('')
                                setPhone('')
                                setCity('')
                                setCountry('')
                                setUserName('')
                                setProfile('')
                                setReview('')
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
        <div>
            <div className="profile-title mb-5">
                <h2 className='text-slate-800 text-[19px] font-semibold'>Profile</h2>
                <p className='text-gray-500 text-[15px]'>Manage your profile</p>
            </div>
            <div className="relative w-full my-5">
                <div className="bg-gradient-to-r relative from-orange-500 to-[#EC5A54] w-full py-16 rounded-md"></div>
                <div className="absolute -bottom-24 left-5">
                    <div className="flex items-center flex-wrap gap-5">
                        <div className="user-photo">
                            <Image src={user?.profile} priority={true} alt='photo' className='object-cover rounded-full h-[150px] w-[150px] border-4 border-white' height={100} width={100} />
                        </div>
                        <div className="user-details mt-32 lg:mt-16">
                            <h2 className='text-slate-800 text-[19px] font-semibold capitalize'>{user?.userName}</h2>
                            <p className='text-gray-500 text-[15px]'>Updates Your Photo and Personal Details.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Login  */}
            <form onSubmit={handleSubmit} className='my-28'>
                <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-x-5 gap-y-2">
                    <div className="form-item my-2">
                        <label htmlFor="wwwww" className='text-slate-500 mb-2 font-medium text-[15px]'>Full Name</label>
                        <input type='text' id='wwwww' placeholder='Enter Full Name' value={userName} className='w-full text-[14px] outline-none rounded-md py-2 px-2 ring-1 mt-2 ring-blue-300 focus:ring-2 focus:ring-green-400 placeholder-gray-500' onChange={(e) => setUserName(e.target.value)} required={true} />
                    </div>
                    <div className="form-item my-2">
                        <label htmlFor="qq" className='text-slate-500 mb-2 font-medium text-[15px]'>Mobile No.</label>
                        <input type='text' id='qq' placeholder='Mobile Number' value={phone} className='w-full text-[14px] outline-none rounded-md py-2 px-2 ring-1 mt-2 ring-blue-300 focus:ring-2 focus:ring-green-400 placeholder-gray-500' onChange={(e) => setPhone(e.target.value)} required={true} />

                    </div>
                    <div className="form-item my-2">
                        <label htmlFor="gg" className='text-slate-500 mb-2 font-medium text-[15px]'>Country</label>
                        <input type='text' id='gg' placeholder='Country Name' value={country} className='w-full text-[14px] outline-none rounded-md py-2 px-2 ring-1 mt-2 ring-blue-300 focus:ring-2 focus:ring-green-400 placeholder-gray-500' onChange={(e) => setCountry(e.target.value)} required={true} />

                    </div>
                </div>
                <div className="lg:my-3 grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-x-5 gap-y-2" >
                    <div className="form-item my-2">
                        <label htmlFor="eee" className='text-slate-500 mb-2 font-medium text-[15px]'>City</label>
                        <input type='text' id='eee' placeholder='City' value={city} className='w-full text-[14px] outline-none rounded-md py-2 px-2 ring-1 mt-2 ring-blue-300 focus:ring-2 focus:ring-green-400 placeholder-gray-500' onChange={(e) => setCity(e.target.value)} required={true} />

                    </div>
                    <div className="form-item my-2">
                        <label htmlFor="qqw" className='text-slate-500 mb-2 font-medium text-[15px]'>State No.</label>
                        <input type='number' id='qqw' placeholder='State' value={state} className='w-full text-[14px] outline-none rounded-md py-2 px-2 ring-1 mt-2 ring-blue-300 focus:ring-2 focus:ring-green-400 placeholder-gray-500' onChange={(e) => setState(e.target.value)} required={true} />

                    </div>
                    <div className="form-item my-2">
                        <label htmlFor="gwwg" className='text-slate-500 mb-2 font-medium text-[15px]'>Address</label>
                        <input type='text' id='gwwg' placeholder='Address' value={address} className='w-full text-[14px] outline-none rounded-md py-2 px-2 ring-1 mt-2 ring-blue-300 focus:ring-2 focus:ring-green-400 placeholder-gray-500' onChange={(e) => setAddress(e.target.value)} required={true} />

                    </div>
                </div>

                {/* profile picture  */}
                <div className="form-item my-5">
                    <label htmlFor="pppp" className='text-slate-500 my-1 font-medium text-[14px]'>Image</label>
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





                <div className="show_loadding my-5">
                    {
                        loadding ?

                            <button className='flex items-center justify-center gap-1 w-full capitalize text-white my-3 font-semibold py-2 rounded-md bg-rose-500' disabled>
                                <div className="flex items-center gap-2">
                                    <span>Processing</span>
                                    <BeatLoader
                                        color="#FFFFFF"
                                        speedMultiplier={2}
                                    />
                                </div>
                            </button>
                            :
                            <button className='inline-flex items-center justify-center gap-2 w-full capitalize text-white my-3 font-semibold py-2 rounded-md bg-yellow-600'>
                                save chages
                                <FaArrowRight />
                            </button>
                    }
                </div>
            </form>
            {/* Form Login  */}

        </div>
    );
};

export default page;