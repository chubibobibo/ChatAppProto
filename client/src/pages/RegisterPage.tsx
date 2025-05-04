import RegisterCards from "../components/cards/RegisterCards";
import { isAxiosError } from "axios";
import axios from "axios";
import { toast } from "react-toastify";
import { ActionFunction, redirect } from "react-router-dom";

/** @password1 @password2 obtained using formData.get to compare both password fields  */

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData(); // obtains data from the form
  const password1 = formData.get("password1");
  const password2 = formData.get("password2");
  console.log(password1, password2);
  if (password1 !== password2) {
    return toast.error("Passwords do not match");
  } else {
    if (password1) {
      formData.append("password", password1);
    }
  }

  const data = Object.fromEntries(formData); // converts formData into objects
  try {
    await axios.post("/api/auth/register", data);
    toast.success("User successfully registered");
    return redirect("/login");
  } catch (err) {
    if (isAxiosError(err)) {
      console.log(err);
      toast.error(
        Array.isArray(err?.response?.data?.message)
          ? err?.response?.data?.message[0]
          : err?.response?.data?.message
      );
    }
  }
};

function RegisterPage() {
  return (
    <section className='flex justify-center items-center h-screen bg-gray-100'>
      <RegisterCards />
    </section>
  );
}
export default RegisterPage;
