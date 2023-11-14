'use client'

import { Roboto } from 'next/font/google';
import '@/styles/globals.css';
import Header from "@/components/header";
import Footer from "@/components/footer";
import { AuthProvider } from "@/contexts/AuthContext";
import PrivateRoute from "@/components/privateroute";
import { usePathname } from "next/navigation";
import { checkIsPublicRoute } from "@/functions/check-is-public-route";

const roboto = Roboto({
    subsets: ['latin'],
    display: 'swap',
    weight: ['400', '500', '700', '900'],
    variable: '--font-roboto',
});

// export const metadata: Metadata = {
//     title: 'Create Next App',
//     description: 'Generated by create next app',
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isPublicPage = checkIsPublicRoute(pathname!);
    return (
        <html lang="en">
            <body className={`${roboto.variable}`}>
                <main className="flex min-h-screen flex-col items-center justify-center bg-blue-light">
                    <AuthProvider>
                        {isPublicPage && children}
                        {!isPublicPage && (
                            <PrivateRoute>
                                <Header />
                                <div className="flex-grow py-8 w-full px-4">
                                    {children}
                                </div>
                                <Footer />
                            </PrivateRoute>
                        )}
                        
                    </AuthProvider>
                </main>
            </body>
        </html>
    );
}