'use client'
import React, { ReactNode, useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { checkUserAuthenticated } from "@/functions/check-user-authenticated";
import { APP_ROUTES } from "@/app/constants/app-routes";

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const router = useRouter();
    const isUserAutenticated = checkUserAuthenticated();

    useEffect(() => {
        if (!isUserAutenticated) {
            router.push(APP_ROUTES.public.login);
        }
    }, [isUserAutenticated]);

    return (
        <>
            {!isUserAutenticated && null}
            {isUserAutenticated && children}
        </>
    );
};

export default PrivateRoute;