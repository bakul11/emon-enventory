"use client"
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaAngleDown, FaArrowRight, FaSearch, FaRegUser } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { ClipLoader } from 'react-spinners';
import useActiveUser from '@/hook/useActiveUser';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import LoaddingAnimation from '@/components/animation/LoaddingAnimation';

const page = () => {
    const [paymentType, setPaymentType] = useState('');
    const [transxType, setTransxType] = useState('');
    const [customers, setCustomers] = useState([]);
    const [tnxAmount, setTnxAmount] = useState('');
    const [amount, setAmount] = useState('');
    const [nbr, setNbr] = useState('');
    const [search, setSearch] = useState('');
    const [selectItem, setSelectItem] = useState('');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open)


    const [loadding, setLoadding] = useState(false);
    const [user] = useActiveUser();
    const userId = user?._id;
    const router = useRouter();
    const [customerId, setCustomerId] = useState('');





    useEffect(() => {
        fetch(`/api/customer/getCustomer/${userId}`)
            .then(res => res.json())
            .then(data => {
                setCustomers(data)
                setLoadding(false)
            })
    }, [userId, customers])









    //handle submit form 
    const [submitLoadding, setSubmitLoadding] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();



        const storeData = {
            userId,
            customerId,
            amount,
            paymentType,
            tnxAmount,
            transxType,
            userType: 'customer',
            userName: selectItem,
            mobile: nbr
        }
        console.log(storeData)

        setSubmitLoadding(true);
        fetch(`/api/payment/addPayment`, {
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
                    router.push('/home/payment')
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
                            <h2 className='text-slate-800 text-[19px] font-semibold'>Add Customers Payment </h2>
                            <p className='text-gray-500 text-[14px]'>add new payment</p>
                        </div>
                        {/* add prouct form  */}

                        <form onSubmit={handleSubmit}>

                            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-x-5 gap-y-3">
                                <div className="form-item">
                                    <label htmlFor="ee" className='text-slate-500 my-1 font-medium text-[14px]'>Direct Transection <span className='text-red-500'>*</span></label>
                                    <select onChange={(e) => setTransxType(e.target.value)} className='bg-white p-2 my-2 text-[14px] outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md'>
                                        <option selected value="no">No</option>
                                        <option value="yes">Yes</option>
                                    </select>
                                </div>
                                <div className="form-item">
                                    <label htmlFor="ee" className='text-slate-500 my-1 font-medium text-[14px]'>Payment Type <span className='text-red-500'>*</span></label>
                                    <select onChange={(e) => setPaymentType(e.target.value)} className='bg-white p-2 my-2 text-[14px] outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md'>
                                        <option selected disabled>Select Type</option>
                                        <option value="receivedPay">Receive Pay</option>
                                        <option value="caypay">Cash Pay</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-x-5 gap-y-3 my-3">
                                <div className="form-item">
                                    <label htmlFor="ee" className='text-slate-500 my-1 font-medium text-[14px]'>Amount ID <span className='text-red-500'>*</span></label>
                                    <div className="bg-white p-2 my-2 text-[14px] outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md">
                                        <div className="bg-white flex items-center gap-2 justify-between rounded-md cursor-pointer" onClick={handleOpen}>
                                            <span className='capitalize '>
                                                {
                                                    selectItem ?
                                                        selectItem?.length > 80 ?
                                                            selectItem.substring(0, 100) + '...'
                                                            :
                                                            `${selectItem} - 0${nbr}` :
                                                        'Select Customers'
                                                }
                                            </span>
                                            <FaAngleDown />
                                        </div>
                                        <ul className={`bg-white mt-2 max-h-60 overflow-y-auto ${open ? 'block' : 'hidden'}`}>
                                            <div className="search flex items-center px-2 sticky top-0 bg-white border border-blue-100 rounded">
                                                <FaSearch />
                                                <input type="text" placeholder='search..' value={search} className='w-full p-2 rounded-md outline-none ' onChange={(e) => setSearch(e.target.value)} />
                                            </div>

                                            <div className="menu">
                                                {
                                                    loadding ? <h3 className='text-slate-700 py-2'>Loading please wait...</h3>
                                                        :
                                                        <>
                                                            {
                                                                customers?.filter(pd => pd.userName.toLowerCase().includes(search)).map((pd, index) => {
                                                                    const { userName, mobile, _id } = pd;

                                                                    return (
                                                                        <li
                                                                            key={index}
                                                                            className='hover:bg-blue-400 capitalize hover:text-white p-2 text-sm cursor-pointer'
                                                                            onClick={() => {
                                                                                setSelectItem(userName)
                                                                                setNbr(mobile)
                                                                                setCustomerId(_id)
                                                                                setOpen(false)

                                                                            }}
                                                                        >
                                                                            <div className="flex items-center gap-1">
                                                                                <FaRegUser className='text-gray-500' />
                                                                                {userName} -  <span> 0{mobile}</span>

                                                                            </div>
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                        </>
                                                }

                                            </div>
                                        </ul>
                                    </div>
                                </div>
                                <div className="form-item">
                                    <label htmlFor="ttt" className='text-slate-500 my-1 font-medium text-[14px]'>Amount <span className='text-red-500'>*</span></label>
                                    <input input id='ttt' type='number' className='bg-white p-2 my-2 text-[14px] outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md ' placeholder='amount' onChange={(e) => setAmount(e.target.value)} required={true} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-x-5 gap-y-3">
                                <div className="form-item">
                                    <label htmlFor="ee" className='text-slate-500 my-1 font-medium text-[14px]'>Transection Amount <span className='text-red-500'>*</span></label>
                                    <select onChange={(e) => setTnxAmount(e.target.value)} className='bg-white p-2 my-2 text-[14px] outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md'>
                                        <option selected disabled>Select Type</option>
                                        <option value="cash">Cash</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-submit my-20 bg-white">
                                {
                                    submitLoadding ?

                                        <button className='bg-rose-500 text-white rounded-md p-2 text-[14px] capitalize font-medium' disabled>
                                            <div className="flex items-center gap-2">
                                                Payment Processing..
                                                <ClipLoader color="#FFFFFF" speedMultiplier={1} size={20} />
                                            </div>
                                        </button>
                                        :
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <button className='bg-orange-400 text-white rounded-md p-3 text-[14px] capitalize font-medium'>
                                                <div className="flex items-center gap-1">
                                                    Payment
                                                    <FaArrowRight />
                                                </div>
                                            </button>
                                            <Link href='/home/payment' className={`bg-rose-400 text-white rounded-md p-3 text-[14px] capitalize font-medium ${loadding ? 'hidden' : 'block'}`}>
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