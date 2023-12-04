"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import logo from '../../public/assets/others/login.jpg'
import { useForm } from "react-hook-form"
import { FaArrowRight, FaUser } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BiSolidShoppingBags } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa6";
import { BeatLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { BsEnvelope } from 'react-icons/bs';


const Register = () => {
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

    //handle submit 
    const onSubmit = (data) => {
        const user = {
            email: data?.email,
            password: data?.password,
            userName: data?.userName
        }
        setLoadding(true);
        fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(result => {

                if (result?.error?.code === 11000) {
                    setError('already use this email')
                }

                if (result?.success) {
                    toast.success(result?.message);
                    setLoadding(false);
                    reset()
                    setError('')
                    router.push('/home')
                } else {
                    if (result?.error) {
                        toast.error(result?.message);
                        setLoadding(false);
                        // setError('')
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
                            <h1 className='text-2xl font-medium text-slate-800'>Create an Account</h1>
                            <p className='text-[15px] font-medium text-gray-500'>First Create account</p>
                        </div>
                        <h2 className='text-orange-500 text-[17px] font-semibold text-center'>{error}</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-item my-2">
                                <label htmlFor="wwwww" className='text-slate-500 mb-2 font-medium text-[15px]'>Full Name</label>
                                <div className="relative">
                                    <div className="relative">
                                        <input {...register("userName", { required: true })} id='wwwww' placeholder='Enter Full Name' type='text' className='w-full text-[14px] outline-none rounded-md py-2 px-2 ring-1 mt-2 ring-blue-300 focus:ring-2 focus:ring-green-400 placeholder-gray-500' />
                                        <FaUser className='absolute right-4 top-5 text-gray-500 cursor-pointer' />
                                    </div>
                                </div>
                                {errors.userName && <span className='text-red-500'>This field is required</span>}
                            </div>
                            <div className="form-item my-2">
                                <label htmlFor="nn" className='text-slate-500 mb-2 font-medium text-[15px]'>Email</label>
                                <div className="relative">
                                    <div className="relative">
                                        <input {...register("email", { required: true })} id='nn' placeholder='Email address' type='email' className='w-full text-[14px] outline-none rounded-md py-2 px-2 ring-1 mt-2 ring-blue-300 focus:ring-2 focus:ring-green-400 placeholder-gray-500' />
                                        <BsEnvelope className='absolute right-4 top-5 text-gray-500 cursor-pointer' />
                                    </div>
                                </div>
                                {errors.email && <span className='text-red-500'>This field is required</span>}
                            </div>

                            <div className="form-item my-3">
                                <label htmlFor="ppp" className='text-slate-500 mb-2 font-medium text-[15px]'>Password</label>
                                <div className="relative">
                                    <input {...register("password", { required: true })} id='ppp' placeholder='Password' type={type} className='relative text-[14px]  w-full outline-none rounded-md py-2 px-2 ring-1 mt-2 ring-blue-300 focus:ring-2 focus:ring-green-400 placeholder-gray-500' />
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
                                            Sign UP
                                            <FaArrowRight />
                                        </button>
                                }
                            </div>
                        </form>
                        <div className="account">
                            <div className="flex items-center justify-center gap-1 text-[15px]">
                                <p className='text-slate-600 text-[14px]'>Already have an account?</p>
                                <Link href='/home' className='text-blue-500 capitalize font-medium'>Login</Link>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="login_photo w-[60%] hidden md:block lg:block">
                    <Image src={logo} alt='register-photo' priority={true} className='object-cover h-screen w-full' />
                </div>
            </div>
        </div>
    );
};

export default Register;