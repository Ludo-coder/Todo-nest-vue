import { toast } from "vue3-toastify";
import { useAuth } from "./auth/useAuth";
export const request = async <T>(
  url: string,
  method: string,
  data?: unknown
): Promise<T> => {
  const { logout } = useAuth();
  try {
    const token = localStorage.getItem("access_token");
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${process.env.VUE_APP_API_URL}${url}`, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      let errMessage = "Erreur lors de la requête";
      const errData = await response.json();
      errMessage = errData.message || errMessage;
      throw new Error(errMessage);
    }

    return (await response.json()) as T;
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message === "Unauthorized") {
        logout();
      }
      console.error("❌ Erreur API :", error.message);
      toast.error(error.message);
      throw error;
    }
    console.error("❌ Erreur API :", error);
    toast.error("Erreur lors de la requête");
    throw new Error("Erreur réseau ou inattendue");
  }
};
