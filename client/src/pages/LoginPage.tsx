import AuthCards from "../components/cards/AuthCards";
import { ActionFunction, redirect } from "react-router-dom";
import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData(); //obtains form data
  const data = Object.fromEntries(formData); //converts to formData to object
  try {
    await axios.post("api/auth/login", data);
    toast.success("User successfully logged in");
    return redirect("/");
  } catch (err) {
    console.log(err);
    if (isAxiosError(err)) {
      if (err?.response?.data?.message) {
        toast.error(
          Array.isArray(err?.response?.data?.message)
            ? err?.response?.data?.message[0]
            : err?.response?.data?.message
        );
      } else {
        toast.error(err?.response?.data);
      }
    }
  }
};
function LoginPage() {
  /** @picture and @source tags used to provide different sources of imgs depending on screen sizes */

  return (
    <section className='flex flex-col justify-center items-center bg-gray-200 h-screen md:grid md:grid-cols-2 md:gap-2'>
      <img
        src='./src/assets/chat_logo.jpg'
        alt=''
        className='h-full hidden object-fill md:h-screen md:flex md:object-cover md:w-screen'
      />
      {/* </picture> */}
      <aside className='md:flex md:justify-center'>
        <AuthCards />
      </aside>
    </section>
  );
}
export default LoginPage;
