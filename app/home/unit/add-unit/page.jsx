"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { ClipLoader } from 'react-spinners';
import useActiveUser from '@/hook/useActiveUser';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import LoaddingAnimation from '@/components/animation/LoaddingAnimation';


const page = () => {
    const [title, setTitle] = useState('');
    const [user] = useActiveUser();
    const userId = user?._id;
    const router = useRouter();

    //handle submit form 
    const [submitLoadding, setSubmitLoadding] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();



        const newTitle = title.toLocaleLowerCase()
        const storeData = {
            title: newTitle,
            userId,
        }

        setSubmitLoadding(true);
        fetch(`/api/unit/addUnit`, {
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
                    setTitle('')
                    router.push('/home/unit')
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
                            <h2 className='text-slate-800 text-[19px] font-semibold'>Add Product Unit</h2>
                            <p className='text-gray-500 text-[14px]'>add your product unit</p>
                        </div>
                        {/* add prouct form  */}

                        <form onSubmit={handleSubmit}>

                            <div className="grid grid-cols-1 gap-x-5 gap-y-2">
                                <div className="form-item">
                                    <label htmlFor="ee" className='text-slate-500 my-1 font-medium text-[14px]'>Title</label>
                                    <input input id='ee' type='text' value={title} className='bg-white p-2 my-2 text-[14px] block outline-none w-full lg:w-1/2 ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-400 rounded-md ' placeholder='Unit' onChange={(e) => setTitle(e.target.value)} required={true} />
                                </div>

                            </div>


                            <div className="form-submit mb-20 mt-5 bg-white">
                                {
                                    submitLoadding ?

                                        <button className='bg-rose-500 text-white rounded-md p-2 text-[14px] capitalize font-medium' disabled>
                                            <div className="flex items-center gap-2">
                                                Unit adding..
                                                <ClipLoader color="#FFFFFF" speedMultiplier={1} size={20} />
                                            </div>
                                        </button>
                                        :
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <button className='bg-orange-400 text-white rounded-md p-3 text-[14px] capitalize font-medium'>
                                                <div className="flex items-center gap-1">
                                                    Add Unit
                                                    <FaArrowRight />
                                                </div>
                                            </button>
                                            <Link href='/home/unit' className={`bg-rose-400 text-white rounded-md p-3 text-[14px] capitalize font-medium ${submitLoadding ? 'hidden' : 'block'}`}>
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