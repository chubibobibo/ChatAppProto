type ButtonType = {
  name?: string | undefined;
  type?: "submit" | "reset" | "button" | undefined;
  state?: boolean;
  onClick?: () => void;
};

function BtnCustomBlue({
  name: name,
  type: type,
  state: state,
  onClick,
}: ButtonType) {
  /** @className bg-liner-to-b from...to.. for gradient color of btn bottom to top */
  return (
    <section className='md:flex justify-center'>
      <button
        className='btn bg-linear-to-b from-sky-500 to-btn-blue hover:bg-red-100 ease-in-out hover:-translate-y-1 hover:scale-105 md:w-42'
        type={type}
        disabled={state}
        onClick={onClick}
      >
        {name}
      </button>
    </section>
  );
}
export default BtnCustomBlue;

//bg-linear-to-b from-sky-500 to-btn-blue transition hover:bg-indigo-500
