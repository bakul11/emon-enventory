"use client"
import HomeProductChart from '@/components/dashhome/HomeProductChart';
import Overview from '@/components/dashhome/Overview';
import ProductHome from '@/components/dashhome/ProductHome';
import React from 'react';

const page = () => {
    return (
        <div>
            <Overview />
            <HomeProductChart/>
            <ProductHome />
        </div>
    );
};

export default page;