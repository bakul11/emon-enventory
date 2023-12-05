"use client"
import React from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const OverviewAnimation = () => {
    return (
        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-5">
            <div className="overview">
                <Skeleton count={1} baseColor="#d7d3d3bd" borderRadius={10} height={200} highlightColor="#6c6969" />
            </div>
            <div className="overview">
                <Skeleton count={1} baseColor="#d7d3d3bd" borderRadius={10} height={200} highlightColor="#6c6969" />
            </div>
            <div className="overview">
                <Skeleton count={1} baseColor="#d7d3d3bd" borderRadius={10} height={200} highlightColor="#6c6969" />
            </div>
            <div className="overview">
                <Skeleton count={1} baseColor="#d7d3d3bd" borderRadius={10} height={200} highlightColor="#6c6969" />
            </div>
        </div>
    );
};

export default OverviewAnimation;