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

const page = () => {
    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('disabled');
    const [subCategory, setSubCategory] = useState('disabled');
    const [price, setPrice] = useState('');
    const [unit, setUnit] = useState('disabled');
    const [quantity, setQuantity] = useState('');
    const [sku, setSku] = useState('');
    const [brand, setBrand] = useState('disabled');
    const [productPhoto, setProductPhoto] = useState('');
    const [review, setReview] = useState('');
    const [loadding, setLoadding] = useState(false);
    const [user] = useActiveUser();
    const userId = user?._id;
    const router = useRouter();




    // load  Category api 
    const [categoryData, setCategoryData] = useState([]);
    useEffect(() => {
        fetch(`/api/category/getCategoryUserBase/${userId}`)
            .then(res => res.json())
            .then(result => setCategoryData(result))

    }, [userId, categoryData])

    // load Sub Category api 
    const [subCategoryData, setSubCategoryData] = useState([]);
    useEffect(() => {
        fetch(`/api/sub-category/getCategory/${userId}`)
            .then(res => res.json())
            .then(result => setSubCategoryData(result))

    }, [userId, subCategoryData])


    // load brand api 
    const [brandData, setBrandData] = useState([]);
    useEffect(() => {
        fetch(`/api/brand/getBrandUserBase/${userId}`)
            .then(res => res.json())
            .then(result => setBrandData(result))

    }, [userId, brandData])




    //handle review photo
    const handleReview = (event) => {
        setProductPhoto(event.target.files[0])
        setReview(URL.createObjectURL(event.target.files[0]));
    }


    //handle submit form 
    const handleSubmit = async (event) => {
        event.preventDefault();


        // if input not fullup
        if (category === 'disabled' || subCategory === 'disabled' || unit === 'disabled' || brand === 'disabled' || productPhoto === '') {
            return toast.error('All filled must be fillup ')
        }


        // image upload api 
        const formData = new FormData();
        formData.append('image', productPhoto)
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
                        productName,
                        price,
                        quantity,
                        brand,
                        unit,
                        sku,
                        category,
                        subCategory,
                        productPhoto: imageUrl,
                        userId
                    }
                    setLoadding(true);
                    fetch(`/api/product/postProduct`, {
                        method: 'POST',
                        headers: {
                            "Content-Type": 'application/json'
                        },
                        body: JSON.stringify(storeData)
                    })
                        .then(res => res.json())
                        .then(result => {
                            if (result.success) {
                                toast.success(result?.message)
                                router.push('/home/products')
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

    const unitData = [
        {
            title: 'Kg'
        },
        {
            title: 'Pices'
        },
        {
            title: 'Liters'
        },
        {
            title: 'Meters'
        },
        {
            title: 'Ton'
        },
        {
            title: 'Gram'
        }
    ]





    return (
        <>
            {
                user?.email ?
                    <div className='add-product'>
                        <div className="product-title mb-8">
                            <h2 className='text-slate-800 text-[19px] font-semibold'>Product Add</h2>
                            <p className='text-gray-500 text-[14px]'>Create new product</p>
                        </div>
                        {/* add prouct form  */}

                        <form onSubmit={handleSubmit}>

                            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-x-5 gap-y-2">

                                <div className="form-item">
                                    <label htmlFor="ee" className='text-slate-500 my-1 font-medium text-[14px]'>Product Name</label>
                                    <input input id='ee' className='bg-white p-2 my-2 text-[14px] outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md ' placeholder='Name of Product' onChange={(e) => setProductName(e.target.value)} required={true} />
                                </div>

                                <div className="form-item">
                                    <label htmlFor="eess" className='text-slate-500 my-1 font-medium text-[14px]'>Category</label>
                                    <select id='eess' className='bg-white p-2 my-2 text-[14px] outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md ' onChange={(e) => setCategory(e.target.value)}>

                                        <option selected disabled value={category} defaultValue={"disabled"} className='capitalize'>Select Category</option>
                                        {
                                            categoryData?.map((item, index) => {
                                                return (
                                                    <option value={item?.category} key={index} className='capitalize'>{item?.category}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="form-item">
                                    <label htmlFor="wwee" className='text-slate-500 my-1 font-medium text-[14px]'>Sub Category</label>
                                    <select id='wwee' className='bg-white p-2 my-2 text-[14px] outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md ' onChange={(e) => setSubCategory(e.target.value)}>
                                        <option selected disabled value={subCategory} defaultValue={"disabled"} className='capitalize'>Select Sub Category</option>
                                        {
                                            subCategoryData?.map((item, index) => {
                                                return (
                                                    <option value={item?.title} key={index} className='capitalize '>
                                                        {item?.title}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="form-item">
                                    <label htmlFor="eeee" className='text-slate-500 my-1 font-medium text-[14px]'>Brand Name</label>
                                    <select id='eeee' className='bg-white p-2 my-2 text-[14px] outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md ' onChange={(e) => setBrand(e.target.value)}>
                                        <option selected disabled value={brand} defaultValue={"disabled"} className='capitalize'>Select Brand</option>
                                        {
                                            brandData?.map((item, index) => {
                                                return (
                                                    <option value={item?.brand} key={index} className='capitalize '>
                                                        {item?.brand}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-x-5 gap-y-2">
                                <div className="form-item lg:my-5">
                                    <label htmlFor="dddd" className='text-slate-500 my-1 font-medium text-[14px]'>Unit</label>
                                    <select id='dddd' className='bg-white p-2 my-2 text-[14px] outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md ' onChange={(e) => setUnit(e.target.value)}>
                                        <option selected disabled value={unit} defaultValue={"disabled"} className='capitalize'>Select Unit</option>
                                        {
                                            unitData?.map((item, index) => {
                                                return (
                                                    <option value={item?.title} key={index} className='capitalize py-2'>
                                                        {item?.title}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-item lg:my-5">
                                    <label htmlFor="bbb" className='text-slate-500 my-1 font-medium text-[14px]'>SKU</label>
                                    <input input id='bbb' className='bg-white p-2 my-2 text-[14px] outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md ' placeholder='SKU' onChange={(e) => setSku(e.target.value)} required={true} />
                                </div>
                                <div className="form-item lg:my-5">
                                    <label htmlFor="ttt" className='text-slate-500 my-1 font-medium text-[14px]'>Price</label>
                                    <input input id='ttt' type='number' className='bg-white p-2 my-2 text-[14px] outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md ' placeholder='Price' onChange={(e) => setPrice(e.target.value)} required={true} />
                                </div>
                                <div className="form-item lg:my-5">
                                    <label htmlFor="www" className='text-slate-500 my-1 font-medium text-[14px]'>Quantity</label>
                                    <input input id='www' type='number' className='bg-white p-2 my-2 text-[14px] outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md ' placeholder='Quantity' onChange={(e) => setQuantity(e.target.value)} required={true} />
                                </div>
                            </div>
                            <div className="form-item my-5">
                                <label htmlFor="pppp" className='text-slate-500 my-1 font-medium text-[14px]'>Product Image</label>
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
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <button className='bg-orange-400 text-white rounded-md p-3 text-[14px] capitalize font-medium'>
                                                <div className="flex items-center gap-1">
                                                    Submit
                                                    <FaArrowRight />
                                                </div>
                                            </button>
                                            <Link href='/home/products' className={`bg-rose-400 text-white rounded-md p-3 text-[14px] capitalize font-medium ${loadding ? 'hidden' : 'block'}`}>
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
                    <div className="loadding grid place-items-center">
                        <h2 className='text-slate-600 mb-2 text-[19px] font-medium'>Loading please wait...</h2>
                        <PropagateLoader
                            color="#f1c40f"
                            size={25}
                        />
                    </div>
            }

        </>

    );
};

export default page;