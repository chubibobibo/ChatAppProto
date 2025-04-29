type ButtonType = {
  name?: string | undefined;
  type?: "submit" | "reset" | "button" | undefined;
};

function BtnCustomBlue({ name: name, type: type }: ButtonType) {
  return (
    <>
      <button
        className='btn bg-linear-to-b from-sky-500 to-btn-blue hover:bg-red-100 ease-in-out hover:-translate-y-1 hover:scale-105 '
        type={type}
      >
        {name}
      </button>
    </>
  );
}
export default BtnCustomBlue;

//bg-linear-to-b from-sky-500 to-btn-blue transition hover:bg-indigo-500
