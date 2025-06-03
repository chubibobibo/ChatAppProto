import BtnCustomBlue from "../btn/BtnCustomBlue";
import dateFormat from "dateformat";
import UpdateProfileModal from "../UpdateProfileModal";
import { toast } from "react-toastify";
import { ActionFunction, redirect } from "react-router-dom";
import axios from "axios";

interface ProfilePropsType {
  username: string;
  dateJoined: string;
  userId: string;
}

export const action: ActionFunction = async ({ request, params }) => {
  // console.log(params);
  const formData = await request.formData();
  const password1 = formData.get("password1");
  const password2 = formData.get("password2");
  if (password1 !== password2) {
    toast.error("Passwords does not match");
  } else {
    if (password1) {
      formData.append("password", password1);
    }
  }
  try {
    await axios.patch(`/api/auth/updateUser/${params.id}`, formData);
    toast.success("User profile updated successfully");
    return redirect("/");
  } catch (err) {
    if (axios.isAxiosError(err)) {
      toast.error(
        Array.isArray(err)
          ? err?.response?.data?.message[0]
          : err?.response?.data?.message
      );
    }
  }
};

function ProfileCard({ dateJoined }: ProfilePropsType) {
  const formattedDate = dateFormat(
    dateJoined,
    "dddd, mmmm dS, yyyy, h:MM:ss TT"
  );
  /** @getElementById allows closing of the modal. It returns a type error because getElementId does not have showModal method. To get around this error, we cast the result of getElementById to HTMLDialogELement */

  const handleCloseModal = () => {
    (document?.getElementById("my_modal_2") as HTMLDialogElement).showModal(); // casts the result of getElementById to HTMLDialogElement that contains the showModal method.
  };

  return (
    <section className='px-2 md:w-220 md:pt-20'>
      <UpdateProfileModal />
      <div className='card bg-base-100 w-auto shadow-sm'>
        <div className='card-body'>
          <p className='card-title'>Date Joined:</p>
          <p>{formattedDate}</p>
          <div className='card-actions justify-end pt-8'>
            <BtnCustomBlue
              name='Edit Profile'
              type='button'
              state={false}
              onClick={handleCloseModal}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
export default ProfileCard;
