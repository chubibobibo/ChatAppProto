import { FaRegUser } from "react-icons/fa";
import BtnCustomBlue from "../btn/BtnCustomBlue";
import { Form } from "react-router-dom";

function AuthCards() {
  return (
    <>
      <div className='card w-96 bg-base-100 card-md shadow-md'>
        <div className='card-body '>
          <h2 className='card-title pb-2'>Login</h2>
          {/** input fields */}
          <Form method='POST' className='flex flex-col gap-4'>
            <label className='input'>
              <FaRegUser color='gray' />
              <input
                type='input'
                required
                placeholder='Username'
                name='username'
              />
            </label>
            <label className='input'>
              <FaRegUser color='gray' />
              <input
                type='password'
                required
                placeholder='Password'
                name='password'
              />
            </label>
            {/** input fields */}
            <div className='justify-end card-actions'>
              <BtnCustomBlue name={"Login"} type={"submit"} />
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
export default AuthCards;
