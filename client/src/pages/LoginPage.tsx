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
  return (
    <section className='flex justify-center items-center pt-28 px-2 md:pt-80'>
      <AuthCards />
    </section>
  );
}
export default LoginPage;
