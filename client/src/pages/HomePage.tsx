import Navbar from "../components/Navbar";
import UpdateProfileModal from "../components/UpdateProfileModal";
// import { useContext } from "react";
// import { GetLoggedUserContext } from "../context/ContextData";

function HomePage() {
  /** @getElementById allows closing of the modal. It returns a type error because getElementId does not have showModal method. To get around this error, we cast the result of getElementById to HTMLDialogELement */

  const handleCloseModal = () => {
    (document?.getElementById("my_modal_2") as HTMLDialogElement).showModal(); // casts the result of getElementById to HTMLDialogElement that contains the showModal method.
  };
  return (
    <>
      <Navbar />
      <UpdateProfileModal />
      <button
        className='btn'
        onClick={() => {
          handleCloseModal();
        }}
      >
        open modal
      </button>
    </>
  );
}
export default HomePage;
