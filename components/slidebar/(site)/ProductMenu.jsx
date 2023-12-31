"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { BsPlusSquare } from "react-icons/bs";
import { MdOutlineCategory } from "react-icons/md";
import { MdProductionQuantityLimits } from "react-icons/md";
import { TbBrandUnity, TbBrandShopee } from "react-icons/tb";
import { FaMeteor } from "react-icons/fa";


//product list
const productList = [
    {
        title: 'products',
        path: 'products',
        icon: <MdProductionQuantityLimits />
    },
    {
        title: 'add-product',
        path: 'create-product',
        icon: <BsPlusSquare />
    },
    {
        title: 'category',
        path: 'category',
        icon: <MdOutlineCategory />
    },
    {
        title: 'sub category',
        path: 'sub-category',
        icon: <TbBrandShopee />
    },
    {
        title: 'brands',
        path: 'brands',
        icon: <TbBrandUnity />
    },
    {
        title: 'unit',
        path: 'unit',
        icon: <FaMeteor />
    },
]

const ProductMenu = ({ openSlidebar }) => {
    const pathname = usePathname();
    return (
        <div className="product-menu">
            <p className={`text-[#76839c] text-[15px] ${openSlidebar ? 'hidden' : 'block'}`}>Products</p>
            <div className="product-list ml-2">
                {
                    productList?.map((item, index) => {
                        const { title, path, icon } = item;
                        const newPath = `/home/${path}`;
                        return (
                            <div className="product">
                                <Link href={`/home/${path} `} key={index} className={`block my-2 px-2 capitalize rounded-md py-2  text-[15px] ${pathname === newPath ? "bg-blue-400 text-white" : 'text-[#aeb1b6]'} `}>
                                    <div className="flex items-center gap-2">
                                        <span className='text-xl'>  {icon}</span>
                                        <span className={`${openSlidebar ? 'hidden' : 'block'}`}> {title}</span>
                                    </div>

                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default ProductMenu;