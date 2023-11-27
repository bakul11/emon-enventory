"use client"
import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";

const useActiveUser = () => {
    const [user, setUser] = useState({});
    const token = Cookies.get('user');

    useEffect(() => {
        fetch('/api/auth/activeUser', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ token: token })
        })
            .then(res => res.json())
            .then(data => setUser(data))
    }, [user, token])

    return [user]


}

export default useActiveUser;