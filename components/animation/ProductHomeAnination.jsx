"use client"
import React from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ProductHomeAnination = () => {
    return (
        <div>
            <Skeleton count={1} baseColor="#d7d3d3bd" borderRadius={10} height={200} highlightColor="#6c6969" />
        </div>
    );
};

export default ProductHomeAnination;