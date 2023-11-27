"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import ProductCart from './(site)/ProductCart';
import useActiveUser from '@/hook/useActiveUser';
import axios from 'axios';



const page = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [loadding, setLoadding] = useState(false);
    const [user] = useActiveUser();
    const userId = user?._id;

    const fetchProduct = async () => {
        const { data } = await axios.get(`/api/product/getAllProductUserBase/${userId}`)
        setProducts(data)
    }

    useEffect(() => {
        fetchProduct()
    }, [userId, products])




    return (
        <div className='show-product '>
            <div className="flex items-center justify-between flex-wrap gap-5">
                <div className="product-title">
                    <h2 className='text-slate-800 text-[19px] font-semibold'>Product List</h2>
                    <p className='text-gray-500 text-[15px]'>Manage your products</p>
                </div>
                <div>{loadding ? 'loadding..' : ''}</div>
                <div className="product-title">
                    <Link href='/home/create-product' className='inline-block bg-orange-400 p-2 text-[14px] rounded-md  capitalize text-white font-medium'>
                        <div className="flex items-center gap-1">
                            <FaPlus />
                            add new product
                        </div>
                    </Link>
                </div>
            </div>


            {/* search  */}
            <div className="search-box my-5 relative">
                <FaSearch className='absolute left-2 top-3 text-gray-500 ' />
                <input type="text" value={search} placeholder='Search Products' className='bg-white py-2 pl-8 outline-none ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md ' onChange={(e) => setSearch(e.target.value)} />
            </div>


            {/* show product in table  */}
            <div className="sm:overflow-auto overflow-hidden">
                <table className='border-collapse border border-blue-100 table-auto'>
                    <thead>
                        <tr className='text-[14px] text-gray-500 font-[300] capitalize'>
                            <th className='border border-blue-100 px-6'>#</th>
                            <th className='border border-blue-100 px-6'>product Name</th>
                            <th className='border border-blue-100 px-6'>SKU</th>
                            <th className='border border-blue-100 px-6'>category</th>
                            <th className='border border-blue-100 px-6'>sub category</th>
                            <th className='border border-blue-100 px-6'>brand</th>
                            <th className='border border-blue-100 px-6'>price</th>
                            <th className='border border-blue-100 px-6'>Quantity</th>
                            <th className='border border-blue-100 px-6'>unit</th>
                            <th className='border border-blue-100 px-6'>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products?.filter((item) => item.productName.toLowerCase().includes(search)).map((product, index) => <ProductCart product={product} index={index} />)

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
    );
};

export default page;