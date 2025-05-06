import { createContext } from "react";

export interface LoggedUserContextType {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  photoUrl?: string;
  photoId?: string;
  role: "admin" | "user";
}

export const GetLoggedUserContext = createContext<LoggedUserContextType | null>(
  null
);
