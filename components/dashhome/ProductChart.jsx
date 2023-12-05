"use client"
import useActiveUser from '@/hook/useActiveUser';
import React from 'react';
import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Scatter
} from 'recharts';
import ProductHomeAnination from '../animation/ProductHomeAnination';

const data = [
    {
        name: 'Page A',
        uv: 590,
        pv: 800,
        amt: 1400,
    },
    {
        name: 'Page B',
        uv: 868,
        pv: 967,
        amt: 1506,
    },
    {
        name: 'Page C',
        uv: 1397,
        pv: 1098,
        amt: 989,
    },
    {
        name: 'Page D',
        uv: 1480,
        pv: 1200,
        amt: 1228,
    },
    {
        name: 'Page E',
        uv: 1520,
        pv: 1108,
        amt: 1100,
    },
    {
        name: 'Page F',
        uv: 1400,
        pv: 680,
        amt: 1700,
    },
];

const ProductChart = () => {

    const [user] = useActiveUser();

    return (
        <div className="product-chart my-8">
            {
                user?.email ?
                    <div>
                        <h2 className='text-slate-600 text-[17px] font-semibold my-3'>Purchase & Sales</h2>
                        <div className="w-full overflow-auto">

                            <ComposedChart
                                width={500}
                                height={300}
                                data={data}
                                margin={{
                                    top: 20,
                                    right: 20,
                                    bottom: 20,
                                    left: 20,
                                }}
                            >
                                <CartesianGrid stroke="#f5f5f5" />
                                <XAxis dataKey="name" scale="band" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
                                <Bar dataKey="pv" barSize={20} fill="#413ea0" />
                                <Line type="monotone" dataKey="uv" stroke="#ff7300" />
                                <Scatter dataKey="cnt" fill="red" />
                            </ComposedChart>

                        </div>
                    </div>
                    :
                    <ProductHomeAnination />
            }
        </div>
    );
};

export default ProductChart;