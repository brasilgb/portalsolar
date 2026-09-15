'use client'
import Header from "@/components/header";
import Footer from "@/components/footer";
import { AuthProvider } from "@/contexts/AuthContext";
import PrivateRoute from "@/components/privateroute";
import { usePathname } from "next/navigation";
import { checkIsPublicRoute } from "@/functions/check-is-public-route";

export default function PrivateLayoutClient({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isPublicPage = checkIsPublicRoute(pathname!);

    return (
        <AuthProvider>
            {isPublicPage && children}
            {!isPublicPage && (
                <PrivateRoute>
                    <div className="flex min-h-screen flex-col bg-gray-50">
                        <Header />
                        <div className="flex-grow w-full">
                            {children}
                        </div>
                        <Footer />
                    </div>
                </PrivateRoute>
            )}
        </AuthProvider>
    );
}
