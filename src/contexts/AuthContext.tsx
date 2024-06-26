"use client";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import servicelogin from "@/libs/servicelogin";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

const AuthContext = createContext({} as any);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userNotExist, setUserNotExist] = useState<string>('');

  useEffect(() => {
    const cookiePortalAccess = async () => {
      const cookieAccess = getCookie('portal_access');
      if (cookieAccess) {
        setUser(cookieAccess);
      }
    };
    cookiePortalAccess();
  }, []);



  const signIn = useCallback(async (data: any) => {
    setLoading(true);
    await servicelogin.post('(LOG_USU_VALIDATE_USER)', data)
      .then((response) => {
        const { success, userKey, userName, message, programs, folders, granja, admGranja, userSIN } = response.data.user;
        setLoading(false);
        if (!success) {
          setUserNotExist(message);
          return;
        }
       
        let userData = {
          authenticated: success,
          userName: userName,
          token: userKey,
          programs: programs,
          folders: folders,
          granja: granja,
          admGranja: admGranja,
          userSIN: userSIN,
        };
        setCookie("portal_access", userData);
        setUser(userData);
        return router.push('/');
      }).catch((err) => {
        console.log(err);
      })
  }, [router]);

  const signOut = () => {
    deleteCookie('portal_access');
    setUser(null);
    router.push('/login');
  }

  return (
    <AuthContext.Provider value={{
      authenticated: !!user,
      user,
      signIn,
      signOut,
      loading,
      setLoading,
      userNotExist
    }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => useContext(AuthContext);