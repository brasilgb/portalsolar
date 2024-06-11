'use client'
import '@/styles/globals.css';
import Header from "@/components/header";
import Footer from "@/components/footer";
import { AuthProvider } from "@/contexts/AuthContext";
import PrivateRoute from "@/components/privateroute";
import { notFound, redirect, usePathname, useRouter } from "next/navigation";
import { checkIsPublicRoute } from "@/functions/check-is-public-route";
import { useLayoutEffect } from "react";
import { checkUserUrlAccess } from "@/functions/check-user-url-access";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isPublicPage = checkIsPublicRoute(pathname!);
    const router = useRouter();
    useLayoutEffect(() => {
        const isAuth = checkUserUrlAccess();
        if (!isAuth) {
            notFound();
        }
    }, []);

    return (
        <>
            <head>
                <title>Portal Grupo Solar</title>
            </head>
            <AuthProvider>
                {isPublicPage && children}
                {!isPublicPage && (
                    <PrivateRoute>
                        <div className={`flex min-h-screen flex-col bg-[#0071BC] bg-no-repeat bg-center bg-cover bg-[url('/images/lojas/login.png')]`}>
                            <div className="flex w-full min-h-screen flex-col items-center justify-center bg-gray-900/30">
                                <Header />
                                <div className="flex-grow py-8 w-full px-4">
                                    {children}
                                </div>
                                <Footer />
                            </div>
                        </div>
                    </PrivateRoute>
                )}
            </AuthProvider>
        </>
    );
}