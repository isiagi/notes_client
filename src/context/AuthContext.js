import { create } from "zustand";
import { authApi } from "../api/auth";

export const useStore = create((set) => ({
  user: "",
  logInUser: async (values) => {
    try {
      const res = await authApi("/auth/login", values);
      if (res.status !== 200) {
        throw new Error("Failed to login");
      }
      localStorage.setItem("notesToken", res.data?.Token);
      localStorage.setItem("noteUser", res.data?.User.username);

      return res;
    } catch (error) {
      return error;
    }
  },
  getLoginedUser: () => {
    let user = localStorage.getItem("noteUser");

    set({ user });
  },
}));
