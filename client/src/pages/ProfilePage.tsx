import { useEffect, useState } from "react";
import { useLoggedUser } from "../libs/useLoggedUser";
import ProfileAvatar from "../components/ProfileAvatar";
import ProfileCard from "../components/cards/ProfileCard";

function ProfilePage() {
  const { getLoggedUser, loggedUser } = useLoggedUser();
  const [isLoading, setIsLoading] = useState(true);
  console.log(loggedUser);

  useEffect(() => {
    try {
      getLoggedUser();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return null;
  return (
    <>
      <section className='h-screen flex flex-col items-center justify-start gap-3'>
        <div className='pt-10'>
          <ProfileAvatar />
        </div>
        <h2 className='card-title capitalize'>{loggedUser?.username}</h2>
        <div>
          <ProfileCard username={loggedUser?.username} />
        </div>
      </section>
    </>
  );
}
export default ProfilePage;
