"use client"
import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import { FaArrowRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { FaRegEye } from "react-icons/fa6";
import { BeatLoader } from 'react-spinners';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { BsEnvelope } from 'react-icons/bs';
import useActiveUser from '@/hook/useActiveUser';


const page = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [loadding, setLoadding] = useState(false);
    const [error, setError] = useState('');
    const [type, setType] = useState('password');
    const [user] = useActiveUser()


    // Password hide show 
    const handleHideShowPassword = () => {
        if (type === 'password') {
            setType('text')
        } else {
            setType('password')
        }
    }

    //handle submit 
    const onSubmit = (data) => {
        const sendData = {
            password: data?.oldPassword,
            newPassword: data?.newPassword,
            confirmPassword: data?.confirmPassword,
        }


        if (sendData?.newPassword === sendData?.confirmPassword) {
            setLoadding(true);
            fetch(`/api/auth/forgetSettingPassword/${user?._id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(sendData)
            })
                .then(res => res.json())
                .then(result => {
                    console.log("result", result);
                    if (result?.success) {
                        toast.success(result?.message);
                        setLoadding(false);
                    } else if (result?.wrongPassword === false) {
                        toast.error(result?.message);
                        setLoadding(false);
                    } else {
                        if (result?.error) {
                            toast.error(result?.message)
                            setLoadding(false);
                        }
                    }
                })
        } else {
            toast.error('New password & confirm password not match');
            setLoadding(false);
        }



    }

    return (
        <div className='login_section'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-item my-3">
                    <label htmlFor="ppp" className='text-slate-500 mb-2 font-medium text-[15px]'>Current Password</label>
                    <div className="relative">
                        <input {...register("oldPassword", { required: true })} id='ppp' placeholder='Password' type={type} className='relative text-[14px]  w-full outline-none rounded-md py-2 px-2 ring-1 mt-2 ring-blue-300 focus:ring-2 focus:ring-green-400 placeholder-gray-500' />
                        <FaRegEye className='absolute right-4 top-5 text-gray-500 cursor-pointer' onClick={handleHideShowPassword} />
                    </div>
                    {errors.oldPassword && <span className='text-red-500'>This field is required</span>}
                </div>

                <div className="form-item my-3">
                    <label htmlFor="ppp" className='text-slate-500 mb-2 font-medium text-[15px]'>New Password</label>
                    <div className="relative">
                        <input {...register("newPassword", { required: true })} id='ppp' placeholder='Password' type={type} className='relative text-[14px]  w-full outline-none rounded-md py-2 px-2 ring-1 mt-2 ring-blue-300 focus:ring-2 focus:ring-green-400 placeholder-gray-500' />
                        <FaRegEye className='absolute right-4 top-5 text-gray-500 cursor-pointer' onClick={handleHideShowPassword} />
                    </div>
                    {errors.newPassword && <span className='text-red-500'>This field is required</span>}
                </div>
                <div className="form-item my-3">
                    <label htmlFor="ppp" className='text-slate-500 mb-2 font-medium text-[15px]'>Confirm Password</label>
                    <div className="relative">
                        <input {...register("confirmPassword", { required: true })} id='ppp' placeholder='Password' type={type} className='relative text-[14px]  w-full outline-none rounded-md py-2 px-2 ring-1 mt-2 ring-blue-300 focus:ring-2 focus:ring-green-400 placeholder-gray-500' />
                        <FaRegEye className='absolute right-4 top-5 text-gray-500 cursor-pointer' onClick={handleHideShowPassword} />
                    </div>
                    {errors.confirmPassword && <span className='text-red-500'>This field is required</span>}
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
                            <button className='inline-block px-5  capitalize text-white my-3 font-semibold py-2 rounded-md bg-yellow-600'>
                                <div className="flex items-center gap-2">
                                    Change Save
                                    <FaArrowRight />
                                </div>
                            </button>
                    }
                </div>
            </form>
        </div>
    );
};

export default page;