import { FaRegUser } from "react-icons/fa";
import { IoKeyOutline } from "react-icons/io5";
import BtnCustomBlue from "../btn/BtnCustomBlue";
import { Form, Link } from "react-router-dom";

function AuthCards() {
  return (
    <>
      <div className='flex justify-center card mt-4 mb-2 w-74 h-[32rem] bg-base-100 card-md shadow-md md:h-[30rem] md:w-[40rem]'>
        <div className='card-body mt-0'>
          <img
            src='./src/assets/logo.png'
            alt=''
            className='object-screen md:hidden'
          />
          <h2 className='card-title pb-2'>Login</h2>
          {/** input fields */}
          <Form method='POST'>
            <section className='flex flex-col gap-4 md:mt-22'>
              <label className='input w-full'>
                <FaRegUser color='gray' />
                <input
                  type='input'
                  required
                  placeholder='Username'
                  name='username'
                />
              </label>
              <label className='input w-full'>
                <IoKeyOutline color='gray' size={18} />
                <input
                  type='password'
                  required
                  placeholder='Password'
                  name='password'
                />
              </label>
              <BtnCustomBlue name={"Login"} type={"submit"} />
            </section>
            {/** input fields */}
          </Form>
          <p className='text-xs text--c'>
            Don't have an account yet?{" "}
            <Link to='/register' className='text-blue-500'>
              Register here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
export default AuthCards;
