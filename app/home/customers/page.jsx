"use client"
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import useActiveUser from '@/hook/useActiveUser';
import CustomerCart from './(site)/CustomerCart';
import LoaddingAnimation from '@/components/animation/LoaddingAnimation';




const page = () => {
    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [user] = useActiveUser();
    const userId = user?._id;




    useEffect(() => {
        fetch(`/api/customer/getCustomer/${userId}`)
            .then(res => res.json())
            .then(data => {
                setCustomers(data)
                setLoading(false)
            })
    }, [userId, customers])





    return (
        <div className="product">
            {
                loading ?
                    <LoaddingAnimation />
                    :
                    <div className="product">
                        {
                            customers?.length === 0 ?
                                <div className="product-empty grid place-items-center my-12">
                                    <h2 className='text-slate-800 text-[19px] font-semibold'>Customer List is Empty</h2>
                                    <p className='text-gray-500 text-[15px] mb-2'>Please add customer</p>
                                    <Link href='/home/customers/add-customer' className='inline-block ease-in-out transition-all duration-[0.5s] hover:bg-rose-500 bg-orange-400 p-3 text-[14px] rounded-md  capitalize text-white font-medium'>
                                        <div className="flex items-center gap-1">
                                            <FaPlus />
                                            add new customer
                                        </div>
                                    </Link>
                                </div>
                                :
                                <div className='show-product '>
                                    <div className="flex items-center justify-between flex-wrap gap-5">
                                        <div className="product-title">
                                            <h2 className='text-slate-800 text-[19px] font-semibold'>Customer List</h2>
                                            <p className='text-gray-500 text-[15px]'>Manage your Customer</p>
                                        </div>
                                        <div className="product-btn">
                                            <Link href='/home/customers/add-customer' className='inline-block ease-in-out transition-all duration-[0.5s] hover:bg-rose-500 bg-orange-400 p-3 text-[14px] rounded-md  capitalize text-white font-medium'>
                                                <div className="flex items-center gap-1">
                                                    <FaPlus />
                                                    add new customer
                                                </div>
                                            </Link>
                                        </div>
                                    </div>


                                    {/* search  */}
                                    <div className="search-box my-8 relative">
                                        <FaSearch className='absolute left-2 top-3 text-gray-500 ' />
                                        <input type="text" value={search} placeholder='Search Supplier' className='bg-white py-2 pl-8 outline-none ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md ' onChange={(e) => setSearch(e.target.value)} />
                                    </div>


                                    {/* show product in table  */}
                                    <div className="overflow-auto lg:overflow-hidden">
                                        <table className='w-full'>
                                            <thead>
                                                <tr className='text-[14px] text-left text-slate-700 font-[100] capitalize'>
                                                    <th className='border-blue-100 border-b-[1px] p-2'>#</th>
                                                    <th className='border-blue-100 border-b-[1px] p-2'>Name</th>
                                                    <th className='border-blue-100 border-b-[1px] p-2'>email</th>
                                                    <th className='border-blue-100 border-b-[1px] p-2'>mobile</th>
                                                    <th className='border-blue-100 border-b-[1px] p-2'>address</th>
                                                    <th className='border-blue-100 border-b-[1px] p-2'>Receivable</th>
                                                    <th className='border-blue-100 border-b-[1px] p-2'>Payable</th>
                                                    <th className='border-blue-100 border-b-[1px] p-2'>due</th>
                                                    <th className='border-blue-100 border-b-[1px] p-2'>date</th>
                                                    <th className='border-blue-100 border-b-[1px] p-2'>action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    customers?.filter((item) => item.userName.toLowerCase().includes(search)).map((customer, index) => <CustomerCart customer={customer} index={index} />)

                                                }

                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination UX  */}
                                    <div className="pagination my-6">
                                        <div className="flex items-center justify-end gap-3">
                                            <div className="pagination-title">
                                                <p className='text-gray-500'>1 to 10 items</p>
                                            </div>
                                            <div className="patination-button">
                                                <button className="bg-rose-400 py-1 px-3 text-white rounded-md text-center inline-block">1</button>
                                            </div>
                                            <div className="patination-button">
                                                <button className="bg-blue-400 py-1 px-3 text-white rounded-md text-center inline-block">2</button>
                                            </div>
                                            <div className="patination-button">
                                                <button className="bg-blue-400 py-1 px-3 text-white rounded-md text-center inline-block">3</button>
                                            </div>
                                            <div className="patination-button">
                                                <button className="bg-blue-400 py-1 px-3 text-white rounded-md text-center inline-block">4</button>
                                            </div>
                                            <div className="patination-button">
                                                <button className="bg-blue-400 py-1 px-3 text-white rounded-md text-center inline-block">5</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
            }
        </div>
    );
};

export default page;