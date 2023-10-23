import { create } from "zustand";
import { authApi } from "../api/auth";

export const useStore = create((set) => ({
  user: "",
  logInUser: async (values) => {
    const res = await authApi("/auth/login", values);
    localStorage.setItem("notesToken", res.data.Token);
    localStorage.setItem("noteUser", res.data.User.username);
  },
  getLoginedUser: () => {
    let user = localStorage.getItem("noteUser");

    set({ user });
  },
}));
