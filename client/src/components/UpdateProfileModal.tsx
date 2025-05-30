import RegisterCards from "./cards/RegisterCards";

function UpdateProfileModal() {
  return (
    <>
      <dialog id='my_modal_2' className='modal'>
        <div className='modal-box'>
          {/* <h3 className='font-bold text-lg'>Hello!</h3> */}
          {/* <p className='py-4'>Press ESC key or click outside to close</p> */}
          <RegisterCards cardTitle='Update Profile' />
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
export default UpdateProfileModal;
