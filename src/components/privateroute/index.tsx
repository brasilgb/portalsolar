'use client'
import React, { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { checkUserAuthenticated } from "@/functions/check-user-authenticated";
import { APP_ROUTES } from "@/app/constants/app-routes";
import { checkUserUrlAccess } from "@/functions/check-user-url-access";

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
    }, [isUserAutenticated, router]);

    return (
        <div>
            {!isUserAutenticated && null}
            {isUserAutenticated && children}
        </div>
    );
};

export default PrivateRoute;