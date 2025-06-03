import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

interface useLoggedUserType {
  getLoggedUser: () => void;
  loggedUser: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    _id: string;
    createdAt: string;
  } | null;
}

export const useLoggedUser = create<useLoggedUserType>((set) => ({
  loggedUser: null,

  getLoggedUser: async () => {
    try {
      const userData = await axios.get("/api/auth/getLoggedUser");
      set({ loggedUser: userData?.data?.loggedUser });
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
