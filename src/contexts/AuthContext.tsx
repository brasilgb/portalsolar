"use client";
import servicelogin from "@/libs/servicelogin";
import { log } from "console";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

const AuthContext = createContext({} as any);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userNotExist, setUserNotExist] = useState<string>('');

  useEffect(() => {
    const loadStorage = async () => {
      const recoveredUser = localStorage.getItem('portal_user');
      if (recoveredUser) {
        setUser(JSON.parse(recoveredUser));
      }
    };
    loadStorage();
  }, []);

  const signIn = useCallback(async (data: any) => {
    setLoading(true);
    await servicelogin.post('(LOG_USU_VALIDATE_USER)', data)
      .then((response) => {
        const { success, userKey, userName, message, programs, folders } = response.data.user;
        setLoading(false);
        if (!success) {
          setUserNotExist(message);
          return;
        }
       
        let userData = {
          userName: userName,
          token: userKey,
          programs: programs,
          folders: folders,
        };
        localStorage.setItem(
          'portal_user',
          JSON.stringify(userData),
        );
        setUser(userData);
        return router.push('/');
      }).catch((err) => {
        console.log(err);
      })
  }, [router]);

  const signOut = () => {
    localStorage.removeItem('portal_user');
    setUser(null);
    router.push('http://localhost:3000/login');
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