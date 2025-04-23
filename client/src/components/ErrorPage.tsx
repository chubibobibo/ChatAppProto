import { useRouteError, isRouteErrorResponse } from "react-router-dom";

function ErrorPage() {
  /** @errorStatus @errorMessage errors from useRouteError */

  const error = useRouteError();

  let errorStatus: number;
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorStatus = error?.status;
    errorMessage = error?.statusText;
  } else {
    console.log(error);
    errorMessage = "Something went wrong";
    errorStatus = 400;
  }

  return (
    <>
      {errorStatus === 404 ? (
        <h1 className='flex flex-col justify-center items-center p-5'>
          {errorMessage}
          {errorStatus}
          <img src='../src/assets/404.png' alt='' />
        </h1>
      ) : (
        <p>Something went wrong </p>
      )}
    </>
  );
}
export default ErrorPage;
