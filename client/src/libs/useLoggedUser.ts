import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

export const useLoggedUser = create((set) => ({
  loggedUser: null,

  getLoggedUser: async () => {
    try {
      const userData = await axios.get("/api/auth/getLoggedUser");
      set({ loggedUser: userData.data });
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        toast.error(
          Array.isArray(err?.response?.data?.message)
            ? err?.response?.data?.message[0]
            : err?.response?.data?.message
        );
      }
    }
  },
}));
