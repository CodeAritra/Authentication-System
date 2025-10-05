import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

axios.defaults.withCredentials = true;

interface User {
  id: string;
  email: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  message: string | null;

  signup: (name: string, email: string, password: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  fetchUser: () => Promise<void>;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      message: null,

      signup: async (name, email, password) => {
        try {
          set({ loading: true });
          const res = await axios.post(
            "http://localhost:4000/api/auth/signup",
            {
              name,
              email,
              password,
            }
          );
          set({
            user: res.data.user,
            message: res.data.message,
            loading: false,
          });
          return res.data.success;
        } catch (err: unknown) {
          const axiosError = err as AxiosError<{
            message?: string;
            success?: boolean;
          }>;

          console.error("Logout error:", axiosError);

          const message = axiosError.response?.data?.message || "Logout failed";

          const success = axiosError.response?.data?.success ?? false;

          set({ message, loading: false });
          return success;
        }
      },

      login: async (email, password) => {
        try {
          set({ loading: true, message: null });
          const res = await axios.post("http://localhost:4000/api/auth/login", {
            email,
            password,
          });
          set({
            user: res.data.user,
            loading: false,
            message: res.data.message,
          });
          return res.data.success;
        } catch (err: unknown) {
          const axiosError = err as AxiosError<{
            message?: string;
            success?: boolean;
          }>;

          console.error("Logout error:", axiosError);

          const message = axiosError.response?.data?.message || "Logout failed";

          const success = axiosError.response?.data?.success ?? false;

          set({ message, loading: false });
          return success;
        }
      },

      logout: async () => {
        try {
          set({ message: null });
          const res = await axios.post("http://localhost:4000/api/auth/logout");
          set({ user: null, message: res.data.message });
          return res.data.success;
        } catch (err: unknown) {
          const axiosError = err as AxiosError<{
            message?: string;
            success?: boolean;
          }>;

          console.error("Logout error:", axiosError);

          const message = axiosError.response?.data?.message || "Logout failed";

          const success = axiosError.response?.data?.success ?? false;

          set({ message });
          return success;
        }
      },

      fetchUser: async () => {
        try {
          await axios.get("http://localhost:4000/");
        } catch (err) {
          console.error("Fetch user failed:", err);
        }
      },
    }),
    { name: "user" }
  )
);
