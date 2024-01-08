'use client'
import Header from "@/components/header";
import Footer from "@/components/footer";
import PrivateRoute from "@/components/privateroute";
import { usePathname } from "next/navigation";
import { checkIsPublicRoute } from "@/functions/check-is-public-route";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isPublicPage = checkIsPublicRoute(pathname!);
    return (
            <div>
                {isPublicPage && children}
                {!isPublicPage && (
                    <PrivateRoute>
                        <div className="flex min-h-screen flex-col items-center justify-center bg-blue-light">
                            <Header />
                            <div className="flex-grow py-8 w-full px-4">
                                {children}
                            </div>
                            <Footer />
                        </div>
                    </PrivateRoute>
                )}
            </div>
    )
}

export default Layout