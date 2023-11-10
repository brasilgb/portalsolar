import { useUser } from "@/hooks/useUser";
import { AuthResponse, TLogin } from "@/utils/types/auth";
import useCookie from "@/hooks/useCookies";
import servicelogin from "@/libs/servicelogin";

export const useAuth = () => {
  const { user, addUser, removeUser } = useUser();

  const { getCookie } = useCookie();

  const refresh = () => {
    let existingUser = null;
    const getFromCookie = async () => (existingUser = getCookie("user"));
    getFromCookie();

    if (existingUser) {
      try {
        addUser(JSON.parse(existingUser));
      } catch (e) {
        console.log(e);
      }
    }
  };

  const login = async (creds: TLogin) => {
    return await servicelogin
      .post(`(LOG_USU_VALIDATE_LOGIN)`, creds)
      .then((res) => {
        const { userKey } = res.data.login;
   
        if (res.data.login && userKey) addUser(res.data.login);
        return res.data.login as AuthResponse;
      })
      .catch((err) => {
        if (err && err?.response && err.response?.data)
          return { ...err.response.data, success: false } as AuthResponse;
        else return err as AuthResponse;
      });
  };

  const logout = () => {
    removeUser();
  };

  return { user, login, logout, refresh };
};