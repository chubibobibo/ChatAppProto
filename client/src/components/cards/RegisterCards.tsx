import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import BtnCustomBlue from "../btn/BtnCustomBlue";
import { Form, Link } from "react-router-dom";

function RegisterCards() {
  return (
    <>
      <div className='flex justify-center card mt-9 mb-9 w-74 h-[36rem] bg-base-100 card-md shadow-md md:h-[38rem] md:w-[40rem]'>
        <div className='card-body mt-0'>
          <h2 className='card-title pb-1 md:-pb-10'>Register</h2>
          {/** input fields */}
          <Form method='POST'>
            <section className='flex flex-col gap-4 md:mt-2'>
              <fieldset className='fieldset'>
                <legend className='fieldset-legend'>Pick a file</legend>
                <input type='file' className='file-input' />
                <label className='label'>Max size 2MB</label>
              </fieldset>
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
                <FaRegUser color='gray' />
                <input
                  type='input'
                  required
                  placeholder='First name'
                  name='firstName'
                />
              </label>
              <label className='input w-full'>
                <FaRegUser color='gray' />
                <input
                  type='input'
                  required
                  placeholder='Last name'
                  name='lastName'
                />
              </label>
              <label className='input w-full'>
                <MdOutlineEmail color='gray' size={18} />
                <input type='email' required placeholder='Email' name='email' />
              </label>
              <label className='input w-full'>
                <IoKeyOutline color='gray' size={18} />
                <input
                  type='password'
                  required
                  placeholder='Password'
                  name='password1'
                />
              </label>
              <label className='input w-full'>
                <IoKeyOutline color='gray' size={18} />
                <input
                  type='password'
                  required
                  placeholder='Re-enter your password'
                  name='password2'
                />
              </label>
              <BtnCustomBlue name={"Register"} type={"submit"} />
            </section>
            {/** input fields */}
          </Form>
          <p className='text-xs text-center '>
            Already a member?{" "}
            <Link to='/login' className='text-blue-500'>
              Login here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
export default RegisterCards;
