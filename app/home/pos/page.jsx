"use client"
import React, { useState, useEffect } from 'react';
import { FaAngleDown, FaSearch } from 'react-icons/fa';
import useActiveUser from '@/hook/useActiveUser';
import { useRouter } from 'next/navigation';
import LoaddingAnimation from '@/components/animation/LoaddingAnimation';
import { FaRegUser } from "react-icons/fa";
import AddCustomerModal from './(site)/AddCustomerModal';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, incrementQtyInput, removeFromCart } from '@/redux/slice/productSlice';
import { LuTrash2 } from 'react-icons/lu';
import CustomersPayBtn from './(site)/CustomersPayBtn';
import Cookies from 'js-cookie';


const page = () => {
    const [loadding, setLoadding] = useState(true);
    const [user] = useActiveUser();
    const userId = user?._id;
    const [nbr, setNbr] = useState('');
    const [search, setSearch] = useState('');
    const [selectCustomersName, setSelectCustomersName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [customerId, setCustomerId] = useState('');

    //handle Open
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open)


    // redux action and useSelector
    const { cart } = useSelector(state => state.cart)
    const dispatch = useDispatch();





    //load supplier api 
    const [customers, setCustomers] = useState([]);
    useEffect(() => {
        fetch(`/api/customer/getCustomer/${userId}`)
            .then(res => res.json())
            .then(data => {
                setCustomers(data)
                setLoadding(false)
            })
    }, [userId, customers])



    //load product api 
    const [product, setProduct] = useState([]);
    const [qty, setQty] = useState('');
    const [searchData, setSearchData] = useState('');
    const [selectProduct, setSelectProduct] = useState('');

    //handle open
    const [openPd, setOpenPd] = useState(false);
    const handleOpenPd = () => setOpenPd(!openPd)




    useEffect(() => {
        fetch(`/api/product/getAllProductUserBase/${userId}`)
            .then(res => res.json())
            .then(result => {
                setProduct(result);
                setLoadding(false)
            })

    }, [userId, product])







    // total quantity
    const getTotal = () => {
        let totalPrice = 0
        cart.forEach(item => {
            totalPrice += item.price * item.newQty
        })
        return { totalPrice }
    }






    const CustomerData = {
        userName: selectCustomersName,
        mobile: nbr,
        userId: userId,
        id: customerId,
        email,
        address
    }





    return (
        <>

            {
                user?.email ?
                    <div className='add-product'>
                        <div className="flex items-center justify-between flex-wrap gap-5 my-12">
                            <div className="product-title">
                                <h2 className='text-slate-800 text-[19px] font-semibold'>Start Sell Product </h2>
                                <p className='text-gray-500 text-[14px]'>Sell all latest Product</p>
                            </div>
                            <div className="product-btn">
                                <AddCustomerModal />
                            </div>
                        </div>

                        {/* add prouct form  */}

                        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-x-5 gap-y-2">
                            {/* customer api load  */}
                            <div className="form-item">
                                <label htmlFor="ee" className='text-slate-500 my-1 font-medium text-[14px]'>Customer Name <span className='text-red-500'>*</span></label>
                                <div className="bg-white p-2 my-2 text-[14px] outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md">
                                    <div className="bg-white flex items-center gap-2 justify-between rounded-md cursor-pointer" onClick={handleOpen}>
                                        <span className='capitalize '>
                                            {
                                                selectCustomersName ?
                                                    selectCustomersName?.length > 80 ?
                                                        selectCustomersName.substring(0, 100) + '...'
                                                        :
                                                        `${selectCustomersName} - 0${nbr}` :
                                                    'Select Customer'
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
                                                                const { userName, mobile, _id, email } = pd;

                                                                return (
                                                                    <li
                                                                        key={index}
                                                                        className='hover:bg-blue-400 capitalize hover:text-white p-2 text-sm cursor-pointer'
                                                                        onClick={() => {
                                                                            setSelectCustomersName(userName)
                                                                            setNbr(mobile)
                                                                            setCustomerId(_id)
                                                                            setEmail(email)
                                                                            setAddress(address)
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

                            {/* product api load  */}
                            <div className="form-item">
                                <label htmlFor="ee" className='text-slate-500 my-1 font-medium text-[14px]'>Product Name <span className='text-red-500'>*</span></label>
                                <div className="bg-white p-2 my-2 text-[14px] outline-none w-full ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md">
                                    <div className="bg-white flex cursor-pointer items-center gap-2 justify-between rounded-md" onClick={handleOpenPd}>
                                        <span className='capitalize'>
                                            {
                                                selectProduct ?
                                                    selectProduct?.length > 100 ?
                                                        selectProduct.substring(0, 150) + '...'
                                                        :
                                                        `${selectProduct} - ${qty} quantity` :
                                                    'Select Product'
                                            }
                                        </span>
                                        <FaAngleDown />
                                    </div>
                                    <ul className={`bg-white mt-2 max-h-60 overflow-y-auto ${openPd ? 'block' : 'hidden'}`}>
                                        <div className="search flex items-center px-2 sticky top-0 bg-white border border-blue-100 rounded">
                                            <FaSearch />
                                            <input type="text" placeholder='search..' value={searchData} className='w-full p-2 rounded-md outline-none ' onChange={(e) => setSearchData(e.target.value)} />
                                        </div>

                                        <div className="menu">
                                            {
                                                loadding ? <h3 className='text-slate-700 py-2'>Loading please wait...</h3>
                                                    :
                                                    <>
                                                        {
                                                            product?.filter(pd => pd.productName.toLowerCase().includes(searchData)).map((pd, index) => {
                                                                const { productName, productPhoto, _id, quantity: qty } = pd;

                                                                return (
                                                                    <li
                                                                        key={index}
                                                                        className='hover:bg-blue-400 hover:text-white p-1 text-sm cursor-pointer'
                                                                        onClick={() => {
                                                                            setSelectProduct(productName)

                                                                            setOpenPd(false)
                                                                            setQty(qty)
                                                                            dispatch(addToCart(pd))
                                                                        }}
                                                                    >

                                                                        <div className="flex items-center gap-2">
                                                                            <Image src={productPhoto} alt='photo' height={100} width={100} className='object-cover rounded-sm h-[30px] w-[30px]' />
                                                                            {productName} -  <span> {qty} quantity</span>
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

                        </div>

                        {/* load select product  */}
                        {
                            cart?.length === 0 ? ''
                                :

                                <div className="overflow-auto lg:overflow-hidden my-8">
                                    <table className='w-full'>
                                        <thead>
                                            <tr className='text-[14px] text-left text-white rounded-md bg-blue-400 font-[100] capitalize'>
                                                <th className='border-blue-100 border-b-[1px] p-2'>#</th>
                                                <th className='border-blue-100 border-b-[1px] p-2'>Photo</th>
                                                <th className='border-blue-100 border-b-[1px] p-2'>Name</th>
                                                <th className='border-blue-100 border-b-[1px] p-2'>price</th>
                                                <th className='border-blue-100 border-b-[1px] p-2'>quantity</th>
                                                <th className='border-blue-100 border-b-[1px] p-2'>sub total</th>
                                                <th className='border-blue-100 border-b-[1px] p-2'>action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cart?.map((item, index) => {
                                                    const { productPhoto, productName, price, unit, _id, newQty } = item;
                                                    return (
                                                        <tr className='text-[14px] text-[#637381] font-[500] capitalize' key={index}>
                                                            <td className='border-blue-100 border-b-[1px] p-2'>{index + 1}</td>
                                                            <td className='border-blue-100 border-b-[1px] p-2'>
                                                                <Image src={productPhoto} alt='photo' height={100} width={100} className='object-cover rounded-sm h-[40px] w-[40px]' />
                                                            </td>
                                                            <td className='border-blue-100 border-b-[1px] p-2'> {productName}</td>
                                                            <td className='border-blue-100 border-b-[1px] p-2'>{price} tk </td>

                                                            <td className='border-blue-100 border-b-[1px] p-2'>
                                                                <div className="flex items-center gap-2">
                                                                    <input type="number" placeholder='quantity' className='ring-blue-300 outline-none focus:ring-blue-400 focus:ring-2 rounded-md p-1 ring-1' onChange={({ target }) => dispatch(incrementQtyInput({ _id, quantity: target.value }))} />
                                                                    {newQty}
                                                                    {unit}
                                                                </div>
                                                            </td>
                                                            <td className='border-blue-100 border-b-[1px] p-2'>

                                                                {price * newQty} tk
                                                            </td>

                                                            <td className='border-blue-100 border-b-[1px] p-2'>
                                                                <LuTrash2 className='cursor-pointer text-red-500' onClick={() => dispatch(removeFromCart(_id))} />

                                                            </td>
                                                        </tr>
                                                    )
                                                })

                                            }
                                        </tbody>
                                    </table>
                                    <p className="total text-right text-slate-700 font-semibold text-[14px]">
                                        Grand Total  = <strong>{getTotal().totalPrice} tk</strong>
                                    </p>
                                </div>
                        }

                        <CustomersPayBtn totalPay={getTotal().totalPrice} CustomerData={CustomerData} />
                    </div>
                    :
                    <LoaddingAnimation />
            }

        </>

    );
};

export default page;