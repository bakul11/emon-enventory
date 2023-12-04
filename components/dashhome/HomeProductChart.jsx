"use client"
import React from 'react';
import RecentProduct from './RecentProduct';
import ProductChart from './ProductChart';

const HomeProductChart = () => {

    return (
        <div className='overview'>
            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-5">
                <div className="overview-chart">
                    <ProductChart />
                </div>
                <div className="product-table">
                    <RecentProduct />
                </div>
            </div>
        </div>
    );
};

export default HomeProductChart;