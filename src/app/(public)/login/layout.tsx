import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import '@/styles/globals.css';
import { AuthProvider } from "@/contexts/AuthContext";

const roboto = Roboto({
    subsets: ['latin'],
    display: 'swap',
    weight: ['400', '500', '700', '900'],
    variable: '--font-roboto',
});

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${roboto.variable}`}>
                <AuthProvider>
                        {children}
                </AuthProvider>
            </body>
        </html>
    );
}
