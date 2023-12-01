"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { ClipLoader } from 'react-spinners';
import { IoCloudUploadOutline } from "react-icons/io5";
import Image from 'next/image';
import useActiveUser from '@/hook/useActiveUser';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const page = ({params}) => {
    const [category, setCategory] = useState('');
    const [photo, setPhoto] = useState('');
    const [review, setReview] = useState('');
    const [loadding, setLoadding] = useState(false);
    const [user] = useActiveUser();
    const router = useRouter();
    const categoryData = category.toLocaleLowerCase();


    //handle review photo
    const handleReview = (event) => {
        setPhoto(event.target.files[0])
        setReview(URL.createObjectURL(event.target.files[0]));
    }


    //handle submit form 
    const handleSubmit = async (event) => {
        event.preventDefault();

        // image upload api 
        const formData = new FormData();
        formData.append('image', photo)
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
                        category:categoryData,
                        photo: imageUrl,
                        userId
                    }
                    setLoadding(true);
                    fetch(`/api/category/updateCategory/${params.id}`, {
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
                                setReview('');
                                setCategory('')
                                router.push('/home/category')
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
                <h2 className='text-slate-800 text-[19px] font-semibold'>Product Edit Category</h2>
                <p className='text-gray-500 text-[14px]'>Edit a product Category</p>
            </div>
            {/* add prouct form  */}

            <form onSubmit={handleSubmit}>

                <div className="form-item">
                    <label htmlFor="ee" className='text-slate-500 my-1 font-medium text-[14px]'>Category Name</label>
                    <input input id='ee' value={category} className='bg-white p-2 my-2 text-[14px] outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md ' placeholder='Name of Category' onChange={(e) => setCategory(e.target.value)} required={true} />
                </div>
                <div className="form-item my-5">
                    <label htmlFor="pppp" className='text-slate-500 my-1 font-medium text-[14px]'>Category Image</label>
                    {
                        review?.length ?
                            <>
                                <Image src={review} alt='photo' height={150} width={150} className='object-cover rounded-md' />
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

                <div className="form-submit my-12 bg-white">
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
                                <Link href='/home/category' className={`bg-rose-400 text-white rounded-md p-3 text-[14px] capitalize font-medium ${loadding ? 'hidden' : 'block'}`}>
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