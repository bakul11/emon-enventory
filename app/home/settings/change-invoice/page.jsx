"use client"
import useActiveUser from '@/hook/useActiveUser';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaArrowRight } from 'react-icons/fa';
import { BeatLoader } from 'react-spinners';

const page = () => {
    const [loadding, setLoadding] = useState(false);
    const [customerData, setCustomerData] = useState({
        email: '',
        mobile: '',
        address: ''
    })


    //User Details 
    const [user] = useActiveUser();
    const userId = user?._id;


    // Get Logo api 
    const [invoice, setInvoice] = useState({});

    useEffect(() => {
        fetch(`/api/invoice/getUserBaseInvoice/${userId}`)
            .then(res => res.json())
            .then(data => setInvoice(data))
    }, [invoice, userId])



    //handle change data 
    const handleChangeData = (event) => {
        setCustomerData({ ...customerData, [event.target.name]: event.target.value })
    }



    //submit data 
    const handleSubmit = (e) => {
        e.preventDefault();

        const storeData = {
            userId,
            invoiceId: invoice?._id,
            email: customerData?.email,
            mobile: customerData?.mobile,
            address: customerData?.address,
        }

        setLoadding(true);
        fetch(`/api/invoice/postAndUpdateInvoice`, {
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
                    setLoadding(false);
                } else {
                    if (result?.error) {
                        toast.error(result?.message)
                        setLoadding(false);
                    }
                }
            })

    }

    return (
        <div>
            <div className="profile-title mb-5">
                <h2 className='text-slate-800 text-[19px] font-semibold'>Invoice</h2>
                <p className='text-gray-500 text-[15px]'>update your company invoice details</p>
            </div>

            {/* form here  */}
            <form onSubmit={handleSubmit} className='mb-12 lg:w-1/2 w-full'>
                <div className="form-data space-y-3">
                    <div className="form-item ">
                        <label htmlFor="email" className='text-slate-500 mb-2 font-medium text-[15px]'>Email</label>
                        <input type='email' id='email' placeholder='Email' name='email' className='w-full text-[14px] outline-none rounded-md py-2 px-2 ring-1 mt-2 ring-blue-300 focus:ring-2 focus:ring-green-400 placeholder-gray-500' onChange={handleChangeData} required={true} />
                    </div>
                    <div className="form-item ">
                        <label htmlFor="number" className='text-slate-500 mb-2 font-medium text-[15px]'>Mobile No.</label>
                        <input type='number' id='number' placeholder='Mobile/Phone No.' name='mobile' className='w-full text-[14px] outline-none rounded-md py-2 px-2 ring-1 mt-2 ring-blue-300 focus:ring-2 focus:ring-green-400 placeholder-gray-500' onChange={handleChangeData} required={true} />
                    </div>
                    <div className="form-item ">
                        <label htmlFor="address" className='text-slate-500 mb-2 font-medium text-[15px]'>Address</label>
                        <input type='text' id='address' placeholder='Address' name='address' className='w-full text-[14px] outline-none rounded-md py-2 px-2 ring-1 mt-2 ring-blue-300 focus:ring-2 focus:ring-green-400 placeholder-gray-500' onChange={handleChangeData} required={true} />
                    </div>

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
                                save invoice
                                <FaArrowRight />
                            </button>
                    }
                </div>
            </form>
        </div>
    );
};

export default page;