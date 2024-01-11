"use client"
import useActiveUser from '@/hook/useActiveUser';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaArrowRight } from 'react-icons/fa';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { ClipLoader } from 'react-spinners';

const page = () => {
    const [logo, setLogo] = useState('');
    const [review, setReview] = useState('');
    const [loadding, setLoadding] = useState(false);

    //User Details 
    const [user] = useActiveUser();
    const userId = user?._id;


    // Get Logo api 
    const [pic, setPic] = useState({});

    useEffect(() => {
        fetch(`/api/logo/getLogoUserBase/${userId}`)
            .then(res => res.json())
            .then(data => setPic(data))
    }, [pic, userId])


    //review photo
    const handleReview = (event) => {
        setLogo(event.target.files[0])
        setReview(URL.createObjectURL(event.target.files[0]));
    }

    //submit data
    const handleSubmitData = async (event) => {
        event.preventDefault();

        // image upload api 
        const formData = new FormData();
        formData.append('image', logo)
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
                    const picId = pic?._id;

                    setLoadding(true);
                    fetch(`/api/logo/postAndUpdateLogo`, {
                        method: 'POST',
                        headers: {
                            "Content-Type": 'application/json'
                        },
                        body: JSON.stringify({ logo: imageUrl, userId, picId: picId })
                    })
                        .then(res => res.json())
                        .then(result => {
                            if (result.success) {
                                toast.success(result?.message)
                                setLoadding(false);
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
            <h3 className='text-slate-700 font-semibold mb-5'>Change Your Company Logo</h3>
            <form onSubmit={handleSubmitData}>
                <div className="form-item my-5">
                    <label htmlFor="pppp" className='text-slate-500 my-1 font-medium text-[14px]'>Upload Logo</label>
                    {
                        review?.length ?
                            <>
                                <Image src={review} alt='photo' height={200} width={200} className='object-cover rounded-md h-[150px] w-[150px]' />
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
                            <button className='bg-orange-400 text-white rounded-md p-3 text-[14px] capitalize font-medium'>
                                <div className="flex items-center gap-1">
                                    save changes
                                    <FaArrowRight />
                                </div>
                            </button>
                    }
                </div>
            </form>
        </div>
    );
};

export default page;