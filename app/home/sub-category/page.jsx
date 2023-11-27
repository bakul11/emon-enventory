"use client"
import useActiveUser from '@/hook/useActiveUser';
import React from 'react';
import { useQuery } from 'react-query';

const page = () => {
    const [user] = useActiveUser();
    const userId = user?._id;

    const { isLoading, error, data } = useQuery('repoData', () =>
        fetch(`/api/product/getAllProductUserBase/${userId}`).then(res =>
            res.json()
        )
    )

    if (isLoading) return 'Loading...'
    console.log("data", data);

    return (
        <div>
            <h2>sub category</h2>
        </div>
    );
};

export default page;