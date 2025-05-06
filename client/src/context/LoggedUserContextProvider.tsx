import { GetLoggedUserContext } from "./ContextData";
import { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { ReactNode } from "react";
import { LoggedUserContextType } from "./ContextData";

function LoggedUserContextProvider({ children }: { children: ReactNode }) {
  /** @foundUserData needs to access .data.loggedUser from foundUserData to match the type @foundUserData */
  /** @LoggedUserContextType from ContextData used to type check userData state*/

  const [userData, setUserData] = useState<LoggedUserContextType | null>(null);
  useEffect(() => {
    const getLoggedUserData = async () => {
      try {
        const foundUserData = await axios.get("/api/auth/getLoggedUser");
        // console.log(foundUserData);
        if (!foundUserData) {
          toast.error("No user data found");
        } else {
          setUserData(foundUserData.data.loggedUser); //access loggedUser to obtain same types indicated in UserDataType
        }
      } catch (err) {
        if (isAxiosError(err)) {
          toast.error(err?.response?.data?.message);
        }
      }
    };
    getLoggedUserData();
  }, []);

  return (
    <>
      <GetLoggedUserContext value={userData}>{children}</GetLoggedUserContext>
    </>
  );
}
export default LoggedUserContextProvider;
