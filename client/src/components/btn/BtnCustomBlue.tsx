type ButtonType = {
  name?: string | undefined;
  type?: "submit" | "reset" | "button" | undefined;
};

function BtnCustomBlue({ name: name, type: type }: ButtonType) {
  return (
    <>
      <button
        className='btn bg-linear-to-b from-sky-500 to-btn-blue'
        type={type}
      >
        {name}
      </button>
    </>
  );
}
export default BtnCustomBlue;
