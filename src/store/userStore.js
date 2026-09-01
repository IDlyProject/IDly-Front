import { create } from "zustand";
import { fetchCurrentUser } from "@/services/authService";

export const useUserStore = create((set, get) => ({
  user: null,
  status: "idle",
  fetchPromise: null,

  fetchUser: (force = false) => {
    const { fetchPromise } = get();
    if (fetchPromise && !force) return fetchPromise;

    set({ status: "loading", fetchPromise: null });
    const promise = fetchCurrentUser()
      .then((user) => {
        set({ user, status: user ? "ready" : "error", fetchPromise: null });
        return user;
      })
      .catch(() => {
        set({ user: null, status: "error", fetchPromise: null });
        return null;
      });
    set({ fetchPromise: promise });
    return promise;
  },

  setUser: (user) => set({ user, status: "ready" }),

  clearUser: () => set({ user: null, status: "idle", fetchPromise: null }),
}));
