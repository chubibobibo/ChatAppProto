import { useContext } from "react";
import { GetLoggedUserContext } from "../context/ContextData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Navbar() {
  const userData = useContext(GetLoggedUserContext);
  const navigate = useNavigate();
  console.log(userData);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      navigate("/login");
      toast.success(`${userData?.username} successfully logged out`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className='navbar bg-base-100 shadow-sm'>
        <div className='navbar-start'>
          <div className='dropdown'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-ghost btn-circle'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                {" "}
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h7'
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow'
            >
              <li>
                <a>Homepage</a>
              </li>
              <li>
                <a>Portfolio</a>
              </li>
              <li>
                <a>About</a>
              </li>
            </ul>
          </div>
        </div>
        <div className='navbar-center hidden sm:flex sm:absolute sm:left-15 '>
          <a className='text-xl font-bold'>ChatApp</a>
        </div>
        <div className='navbar-end'>
          <button className='btn btn-ghost btn-circle'></button>
          <div className='flex gap-2'>
            <div className='flex items-center'>
              <p className='capitalize text-sm sm:text-base'>
                {userData?.username}
              </p>
            </div>
            <div className='dropdown dropdown-end'>
              <div
                tabIndex={0}
                role='button'
                className='btn btn-ghost btn-circle avatar'
              >
                <div className='w-10 rounded-full'>
                  <img
                    alt='Tailwind CSS Navbar component'
                    src={
                      userData?.photoUrl
                        ? userData?.photoUrl
                        : "../src/assets/defaultImg.jpg"
                    }
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow'
              >
                <li>
                  <a className='justify-between'>
                    Profile
                    <span className='badge'>New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Navbar;
