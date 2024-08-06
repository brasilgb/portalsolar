import { Roboto } from 'next/font/google';
import '@/styles/globals.css';
import Head from "next/head";
import 'animate.css';

const roboto = Roboto({
    subsets: ['latin'],
    display: 'swap',
    weight: ['400', '500', '700', '900'],
    variable: '--font-roboto',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    
    return (
        <html lang="pt-BR">
            <Head>
                <link rel="shortcut icon" href="/favicon.ico" />
            </Head>
            <body className={`${roboto.variable}`}>
                {children}
            </body>
        </html>
    );
}
