"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import logo from '../../../public/assets/others/login.jpg'
import { useForm } from "react-hook-form"
import { FaArrowRight, FaRegEye } from 'react-icons/fa';
import { BiSolidShoppingBags } from "react-icons/bi";
import { BeatLoader } from 'react-spinners';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


const page = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [loadding, setLoadding] = useState(false);
    const [error, setError] = useState('');

    const [type, setType] = useState('password');
    const router = useRouter();


    // Password hide show 
    const handleHideShowPassword = () => {
        if (type === 'password') {
            setType('text')
        } else {
            setType('password')
        }
    }

    const userId = Cookies.get('userId');

    //handle submit form 
    const onSubmit = (data) => {
        const user = {
            password: data?.password
        }

        setLoadding(true);

        fetch(`/api/auth/forgetPassword/${userId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(result => {
                if (result?.message) {
                    setError(result?.message);
                    setLoadding(false)
                }
                if (result?.success) {
                    setTimeout(() => {
                        return router.push('/home')
                    }, 1000);
                    toast.success(result?.message);
                    setLoadding(false);
                    reset()
                    setError('')

                } else {
                    if (result?.error) {
                        toast.error(result?.message);
                        setLoadding(false);
                        setError('')
                    }
                }
            })

    }

    return (
        <div className='login_section'>
            <div className="flex justify-between">
                <div className="login_form w-full md:w-[40%] lg:w-[40%]">
                    <div className="px-5 lg:px-12 py-12">
                        <div className="login-box mb-5">
                            <Link href='/home' className='font-bold text-slate-800 uppercase flex items-center gap-2'>
                                <BiSolidShoppingBags className='text-yellow-500 text-7xl' />
                                <span className='text-2xl font-bold'>tenda pos</span>
                            </Link>
                        </div>
                        <div className="sign-title my-5">
                            <h1 className='text-2xl font-semibold text-slate-800'>Set New password?</h1>
                            <p className='text-[15px] font-[400] text-gray-500 my-2'>Don’t warry! it happens. Please enter the password
                                associated with your account.</p>
                        </div>
                        <h2 className='text-orange-500 text-[17px] font-semibold text-center'>{error}</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-item my-3">
                                <label htmlFor="ppp" className='text-slate-500 mb-2 font-medium text-[15px]'>Password</label>
                                <div className="relative">
                                    <input {...register("password", { required: true })} id='ppp' placeholder='Set New Password' type={type} className='relative text-[14px]  w-full outline-none rounded-md py-2 px-2 ring-1 mt-2 ring-blue-300 focus:ring-2 focus:ring-green-400 placeholder-gray-500' />
                                    <FaRegEye className='absolute right-4 top-5 text-gray-500 cursor-pointer' onClick={handleHideShowPassword} />
                                </div>
                                {errors.password && <span className='text-red-500'>This field is required</span>}
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
                                        <button className='flex items-center justify-center gap-2 w-full capitalize text-white my-3 font-semibold py-2 rounded-md bg-yellow-600'>
                                            submit
                                            <FaArrowRight />
                                        </button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
                {/* logo here  */}
                <div className="login_photo w-[60%] hidden md:block lg:block">
                    <Image src={logo} alt='register-photo' priority={true} className='object-cover h-screen w-full' />
                </div>
            </div>
        </div>
    );
};

export default page;