"use client"
import React, { useEffect, useState } from 'react';
import useActiveUser from '@/hook/useActiveUser';
import axios from 'axios';
import ProductHomeAnination from '../animation/ProductHomeAnination';
import RecentProductCart from './RecentProductCart';



const RecentProduct = () => {
    const [products, setProducts] = useState([]);
    const [loadding, setLoadding] = useState(true);
    const [user] = useActiveUser();
    const userId = user?._id;



    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/api/product/recentProduct/${userId}`)
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
                                    <h2 className='text-slate-800 text-[19px] font-semibold'>Your Product is Empty</h2>
                                </div>
                                :
                                <div className='show-product '>
                                    <h2 className='text-slate-600 text-[17px] font-semibold my-3'>Recently Added Products</h2>

                                    {/* show product in table  */}
                                    <div className="overflow-auto lg:overflow-hidden">
                                        <table className='w-full'>
                                            <thead>
                                                <tr className='text-[14px] text-left text-slate-700 font-[100] capitalize'>
                                                    <th className='border-blue-100 border-b-[1px] p-2'>#</th>
                                                    <th className='border-blue-100 border-b-[1px] p-2'>Photo</th>
                                                    <th className='border-blue-100 border-b-[1px] p-2'>name</th>
                                                    <th className='border-blue-100 border-b-[1px] p-2'>price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    products?.slice(0, 4).map((product, index) => <RecentProductCart product={product} index={index} />)

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

export default RecentProduct;