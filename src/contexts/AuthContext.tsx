"use client";
import servicelogin from "@/libs/servicelogin";
import { useRouter } from "next/navigation";
import React, { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";

const AuthContext = createContext({} as any);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadStorage = async () => {
      const recoveredUser = localStorage.getItem('Auth_user');
      if (recoveredUser) {
        setUser(JSON.parse(recoveredUser));
      }
    };
    loadStorage();
  }, []);

  const signIn = useCallback(async (data: any) => {
    console.log(data);
    await servicelogin.post('(LOG_USU_VALIDATE_LOGIN)', data)
      .then((response) => {
        const { success, userKey, message } = response.data.login;
        if (!success) {
          return message;
        }
        let userData = {
          token: userKey,
        };
        localStorage.setItem(
          'Auth_user',
          JSON.stringify(userData),
        );
        setUser(userData);
        router.push('/');
      }).catch((err) => {
        console.log(err);
      })
  }, []);

  const signOut = () => {
    localStorage.removeItem('Auth_user');
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
      setLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => useContext(AuthContext);