import { ReactNode } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function ProtectComponent({ children }: { children: ReactNode }) {
  /** @err returns an error message and navigates to the login page */
  /** @children being rendered only when loggedUserData is updated with users data. */
  /** @isLoading state that  */

  const [loggedUserData, setLoggedUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loggedUser = async () => {
      try {
        const foundUser = await axios.get("/api/auth/getLoggedUser");
        setLoggedUserData(foundUser.data.loggedUser);
      } catch (err) {
        console.log(err);
      } finally {
        //runs whether there is an exception in try catch block
        setIsLoading(false);
      }
    };
    loggedUser();
  }, []);
  //   console.log(loggedUserData); //undefined, useEffect did not yet run.
  //   console.log(isLoading); //true, components mount first before useEffect
  if (isLoading) return null; //stops first render. Then executes useEffect that changes state causing another re-render
  //   console.log(loggedUserData); // changes to loggedUserData state now takes effect
  return <>{loggedUserData ? children : <Navigate to='/login' />}</>; //renders children
}
export default ProtectComponent;
