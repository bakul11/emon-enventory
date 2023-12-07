"use client"
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaAngleDown, FaArrowRight, FaSearch } from 'react-icons/fa';
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



    // load product api 
    const [product, setProduct] = useState([]);

    const [item, setItem] = useState('');
    const [search, setSearch] = useState('');
    const [selectItem, setSelectItem] = useState('');
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open)


    useEffect(() => {
        fetch(`/api/product/getAllProductUserBase/${userId}`)
            .then(res => res.json())
            .then(result => {
                setProduct(result);
                setLoadding(false)
            })

    }, [userId, product])









    //handle submit form 
    const [submitLoadding, setSubmitLoadding] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();




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
                            <h2 className='text-slate-800 text-[19px] font-semibold'>Add Damages Product </h2>
                            <p className='text-gray-500 text-[14px]'>add your damages Product</p>
                        </div>
                        {/* add prouct form  */}

                        <form onSubmit={handleSubmit}>



                            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-x-5 gap-y-2">
                                <div className="form-item">
                                    <label htmlFor="ee" className='text-slate-500 my-1 font-medium text-[14px]'>product Name <span className='text-red-500'>*</span></label>
                                    <div className="bg-white p-2 my-2 text-[14px] outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md">
                                        <div className="bg-white flex items-center gap-2 justify-between rounded-md" onClick={handleOpen}>
                                            <span>
                                                {
                                                    selectItem ?
                                                        selectItem?.length > 10 ?
                                                            selectItem.substring(0, 25) + '...'
                                                            :
                                                            selectItem :
                                                        'Select Product'
                                                }
                                            </span>
                                            <FaAngleDown />
                                        </div>
                                        <ul className={`bg-white mt-2 max-h-60 overflow-y-auto ${open ? 'block' : 'hidden'}`}>
                                            <div className="search flex items-center px-2 sticky top-0 bg-white">
                                                <FaSearch />
                                                <input type="text" placeholder='search..' value={search} className='w-full p-2 rounded-md outline-none ' onChange={(e) => setSearch(e.target.value)} />
                                            </div>

                                            <div className="menu">
                                                {
                                                    product?.filter(pd => pd.productName.toLowerCase().includes(search)).map((pd, index) => {
                                                        return (
                                                            <li
                                                                key={index}
                                                                className='hover:bg-blue-400 hover:text-white p-1 text-sm cursor-pointer'
                                                                onClick={() => {
                                                                    setSelectItem(pd.productName)
                                                                    setOpen(false)
                                                                }}
                                                            >
                                                                {pd.productName}
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </div>



                                        </ul>
                                    </div>

                                </div>
                                <div className="form-item">
                                    <label htmlFor="ee" className='text-slate-500 my-1 font-medium text-[14px]'>Quantity <span className='text-red-500'>*</span></label>
                                    <input input id='ee' type='number' className='bg-white p-2 my-2 text-[14px] outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md ' placeholder='quantity' onChange={(e) => setQantity(e.target.value)} required={true} />
                                </div>

                            </div>
                            <div className="grid grid-cols-1 gap-x-5 gap-y-2">
                                <div className="form-item">
                                    <label htmlFor="ee" className='text-slate-500 my-1 font-medium text-[14px]'>Note <span className='text-red-500'>*</span></label>
                                    <textarea input id='ee' type='text' rows='5' className='bg-white p-2 my-2  text-[14px] outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md ' placeholder='What is problem of product' onChange={(e) => setMobile(e.target.value)} required={true} />
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