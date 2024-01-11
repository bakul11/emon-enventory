"use client"
import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { MdOutlinePayments } from "react-icons/md";
import { FaArrowRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import toast from 'react-hot-toast';

const CustomersPayBtn = ({ totalPay, CustomerData }) => {
    const { userName, userId, mobile, id, address, email } = CustomerData;

    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const router = useRouter();
    const [payAmount, setPayAmount] = useState(0)
    let dueTk = totalPay - payAmount;

    const { cart } = useSelector(state => state.cart)


    const CustomerStoreData = {
        userName,
        userId,
        mobile,
        productPrice: totalPay,
        receivedTk: payAmount,
        dueTk,
        id,
        address,
        email
    }

    const storeData = {
        cart,
        CustomerStoreData
    }


    //handle submit purchages
    const [loadding, setLoadding] = useState(false);

    // handle submit data 
    const handleSubmitPurchages = () => {
        setLoadding(true)
        fetch('/api/common/purchasesFromCustomers', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(storeData)
        })
            .then(res => res.json())
            .then(result => {
                console.log("customer result", result);
                if (result.success) {
                    onCloseModal()
                    localStorage.setItem('customers-invice', JSON.stringify(CustomerStoreData))
                    localStorage.setItem('customers-cart', JSON.stringify([...cart]))
                    router.push('/home/pos/customers-invoice')
                    toast.success(result?.message)
                    setLoadding(false)
                } else if (result.stockOut === 500) {
                    toast.error(result?.message)
                    setLoadding(false)
                } else {
                    if (result?.error) {
                        toast.error(result?.message)
                        setLoadding(false)
                    }
                }
            })
    }


    return (
        <div className='my-8'>
            <button onClick={onOpenModal}
                className='bg-orange-400 text-white rounded-md p-3 text-[14px] capitalize font-medium'>
                <div className="flex items-center gap-1">
                    <MdOutlinePayments size={20} />
                    Payment Now
                </div>
            </button>
            <Modal open={open} onClose={onCloseModal} center
                classNames={{
                    modal: 'paymentModal1',
                }}>
                <div className="payment-details space-y-5">
                    <div className="payment-content">
                        <h3 className='mb-8 text-slate-800 text-xl font-semibold'>Payment Supplier </h3>
                        <p className='text-slate-500 font-medium my-2'>Total Product Cost : <span className='float-right'>{totalPay} Tk</span></p>
                        <p className='text-slate-500 font-medium'>Payment Due : <span className='float-right my-2'> {dueTk} Tk</span></p>
                    </div>
                    <div className="note my-2">
                        <label htmlFor="ppps" className='text-slate-500 mb-2 font-medium text-[15px]'>Amount <span className='text-red-500'>*</span></label>
                        <input type='number' id='ppps' placeholder='amount' className='relative text-[14px]  w-full outline-none rounded-md py-2 px-2 ring-1 mt-2 ring-blue-300 focus:ring-2 focus:ring-green-400 placeholder-gray-500' onChange={(e) => setPayAmount(e.target.value)} />
                    </div>

                    {
                        loadding ?

                            <button className='bg-rose-500 text-white rounded-md p-2 text-[14px] capitalize font-medium' disabled>
                                <div className="flex items-center gap-2">
                                    Processing..
                                    <ClipLoader color="#FFFFFF" speedMultiplier={1} size={20} />
                                </div>
                            </button>
                            :
                            <button className='bg-blue-400 text-white rounded-md p-3 text-[14px] capitalize font-medium' onClick={handleSubmitPurchages}>
                                <div className="flex items-center gap-1">
                                    Purchaces Now
                                    <FaArrowRight />
                                </div>
                            </button>
                    }
                </div>
            </Modal>
        </div>
    );
};

export default CustomersPayBtn;