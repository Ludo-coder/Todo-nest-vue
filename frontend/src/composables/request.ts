import { toast } from "vue3-toastify";
export const request = async <T>(
  url: string,
  method: string,
  data?: unknown
): Promise<T> => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
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
      console.error("❌ API Error:", error.message);
      toast.error(error.message);
      throw error;
    }
    console.error("❌ Unknown API error:", error);
    toast.error("Erreur lors de la requête");
    throw new Error("Erreur réseau ou inattendue");
  }
};
