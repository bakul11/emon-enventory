"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import useActiveUser from '@/hook/useActiveUser';
import axios from 'axios';
import { PropagateLoader } from 'react-spinners';
import ProductHomeCart from './ProductHomeCart';
import ProductHomeAnination from '../animation/ProductHomeAnination';



const ProductHome = () => {
    const [products, setProducts] = useState([]);
    const [loadding, setLoadding] = useState(true);
    const [user] = useActiveUser();
    const userId = user?._id;



    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/api/product/getAllProductUserBase/${userId}`)
                setProducts(data)
            } catch (error) {

            } finally {
                setLoadding(false)
            }
        }

        fetchProduct()
    }, [userId, products])




    return (
        <div className="product my-8">
            {
                loadding ?
                    <ProductHomeAnination />
                    :
                    <div className="product">
                        {
                            products?.length === 0 ?
                                <div className="product-empty grid place-items-center my-12">
                                    <h2 className='text-slate-700 text-[18px] font-semibold'>Your Product is Empty</h2>

                                </div>
                                :
                                <div className='show-product '>
                                    <h2 className='text-slate-600 text-[17px] font-semibold my-3'>Top List Products</h2>

                                    {/* show product in table  */}
                                    <div className="overflow-auto lg:overflow-hidden">
                                        <table className='w-full'>
                                            <thead>
                                                <tr className='text-[14px] text-left text-slate-700 font-[100] capitalize'>
                                                    <th className='border-blue-100 border-b-[1px] p-2'>#</th>
                                                    <th className='border-blue-100 border-b-[1px] p-2'>Photo</th>
                                                    <th className='border-blue-100 border-b-[1px] p-2'>Name</th>
                                                    <th className='border-blue-100 border-b-[1px] p-2'>SKU</th>
                                                    <th className='border-blue-100 border-b-[1px] p-2'>category</th>
                                                    <th className='border-blue-100 border-b-[1px] p-2'>sub category</th>
                                                    <th className='border-blue-100 border-b-[1px] p-2'>brand</th>
                                                    <th className='border-blue-100 border-b-[1px] p-2'>price</th>
                                                    <th className='border-blue-100 border-b-[1px] p-2'>Quantity</th>
                                                    <th className='border-blue-100 border-b-[1px] p-2'>unit</th>
                                                    <th className='border-blue-100 border-b-[1px] p-2'>action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    products?.slice(0, 4).map((product, index) => <ProductHomeCart product={product} index={index} />)

                                                }

                                            </tbody>
                                        </table>
                                    </div>


                                </div>
                        }
                    </div>


            }
        </div>

    );
};

export default ProductHome;