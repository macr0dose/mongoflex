"use client";

import { getProviders, signIn } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

import Button from './Button';

const AuthProviders = () => {
    const [providers, setProviders] = useState(null);

    useEffect(() => {
        const fetchProviders = async () => {
            const res = await getProviders();
            setProviders(res);
        };

        fetchProviders();
    }, []);

    if (providers) {
        return (
            <div>
                {Object.values(providers).map((provider, i) => (
                    <Button key={i} title='Sign In' handleClick={() => signIn(provider.id)} />
                ))}
            </div>
        );
    }

    return null; // Return null if providers are not yet loaded
};

export default AuthProviders;
