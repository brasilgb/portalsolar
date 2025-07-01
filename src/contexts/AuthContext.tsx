"use client";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import servicelogin from "@/libs/servicelogin";
import { useRouter } from "next/navigation";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

const AuthContext = createContext({} as any);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userNotExist, setUserNotExist] = useState<string>('');
  const [userChanged, setUserChanged] = useState<string>('');

  useEffect(() => {
    const cookiePortalAccess = async () => {
      const cookieAccess = getCookie('portal_access');
      if (cookieAccess) {
        setUser(JSON.parse(cookieAccess));
      }
    };
    cookiePortalAccess();
  }, []);

  const signIn = useCallback(async (data: any) => {
    setLoading(true);
    await servicelogin.post('(LOG_USU_VALIDATE_USER)', data)
      .then((response) => {
        const { user } = response.data;
        if (user.firstAccess) {
          return router.push(`/changepassword?firstAccess=${user.firstAccess}&code=${user.userCode}`);
        }
        if (!user.success) {
          setUserNotExist(user.message);
          return;
        }
        let userData = {
          firstAccess: user.firstAccess,
          authenticated: user.success,
          permaneceConectado: user.permaneceConectado,
          userCode: user.userCode,
          userName: user.userName,
          token: user.userKey,
          programs: user.programs,
          folders: user.folders,
          granja: user.granja,
          admGranja: user.admGranja,
          userSIN: user.userSIN,
          filial: user.filial,
          gerente: user.gerente,
          supervisor: user.supervisor,
          representative: user.representative
        };
        setCookie("portal_access", userData);
        setUser(userData);
        return router.push('/');
      }).catch((err) => {
        console.log(err);
      }).finally(async () => {
        await servicelogin.get('(LOG_USU_CLOSE_CONNECTION)');
        setLoading(false);
      });
  }, [router]);

  const changePassword = useCallback(async (data: any) => {
    setLoading(true);
    await servicelogin.post('(LOG_USU_CHANGE_PASSWORD)', data)
      .then((response) => {
        const { success, message } = response.data.change;
        console.log(success, message)
        if (!success) {
          setUserChanged(message);
        }
        if (success) {
          return router.push(`/login?passwordChanged=true`);
        }
      }).catch((err) => {
        console.log(err);
      }).finally(() => setLoading(false))
  }, [router]);

  const recoveryPassword = useCallback(async (data: any) => {
    console.log(data);
  }, []);

  const signOut = async () => {
    deleteCookie('portal_access');
    setUser(null);
    await servicelogin.get('(LOG_USU_CLOSE_CONNECTION)');
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
      userNotExist,
      userChanged,
      changePassword,
      recoveryPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => useContext(AuthContext);