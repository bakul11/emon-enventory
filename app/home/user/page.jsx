"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import UserCart from './(site)/UserCart';
import axios from 'axios';

const page = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');

    const fetchUserList = async () => {
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(data)
    }

    useEffect(() => {
        fetchUserList()
    }, [])

    console.log(users);
    return (
        <div>
            <div className="flex items-center justify-between flex-wrap gap-5">
                <div className="product-title">
                    <h2 className='text-slate-800 text-[19px] font-semibold'>User List</h2>
                    <p className='text-gray-500 text-[15px]'>Manage your User</p>
                </div>
                <div className="product-title">
                    <Link href='/user/add-user' className='inline-block bg-orange-400 p-2 text-[14px] rounded-md  capitalize text-white font-medium'>
                        <div className="flex items-center gap-1">
                            <FaPlus />
                            add user
                        </div>
                    </Link>
                </div>
            </div>
            {/* search  */}
            <div className="search-box my-5 relative">
                <FaSearch className='absolute left-2 top-3 text-gray-500 ' />
                <input type="text" value={search} placeholder='Search User' className='bg-white py-2 pl-8 outline-none ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md ' onChange={(e) => setSearch(e.target.value)} />
            </div>


            {/* show product in table  */}
            <table className='border-collapse border border-blue-100 table-auto'>
                <thead>
                    <tr className='text-[14px] text-gray-500 font-[300] capitalize'>
                        <th className='border border-blue-100 px-6'>#</th>
                        <th className='border border-blue-100 px-6'>User Name</th>
                        <th className='border border-blue-100 px-6'>phone</th>
                        <th className='border border-blue-100 px-6'>email</th>
                        <th className='border border-blue-100 px-6'>role</th>
                        <th className='border border-blue-100 px-6'>Created On</th>
                        <th className='border border-blue-100 px-6'>Status</th>
                        <th className='border border-blue-100 px-6'>action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map((user, index) => <UserCart user={user} index={index} />)

                    }

                </tbody>
            </table>

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
    );
};

export default page;