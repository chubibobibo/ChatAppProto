import { useEffect } from "react";
import { useLoggedUser } from "../libs/useLoggedUser";
function ProfilePage() {
  const { getLoggedUser, loggedUser } = useLoggedUser();
  console.log(loggedUser);

  useEffect(() => {
    getLoggedUser();
  }, []);
  return <div>{loggedUser?.firstName}</div>;
}
export default ProfilePage;
