import { ref } from "vue";
import { useRouter } from "vue-router";
import { LoginPayload, LoginResponse } from "./types";
import { request } from "../request";

export function useAuth() {
  const router = useRouter();
  const loading = ref(false);

  const login = async (
    payload: LoginPayload
  ): Promise<LoginResponse | void> => {
    loading.value = true;

    try {
      const data = await request<LoginResponse>(
        "http://localhost:3000/auth/login",
        "POST",
        payload
      );

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push({ name: "Home" });
      return data;
    } catch (err) {
      console.log(err);
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    router.push({ name: "LoginPage" });
  };

  const isAuthenticated = () => Boolean(localStorage.getItem("access_token"));

  return {
    login,
    logout,
    loading,
    isAuthenticated,
  };
}
