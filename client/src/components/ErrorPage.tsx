import { useRouteError, isRouteErrorResponse } from "react-router-dom";

function ErrorPage() {
  /** @errorStatus @errorMessage errors from useRouteError */
  /** @isRouteErrorResponse checks the error from useRouteError */

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
        <h1 className='header-title'>
          {errorMessage}
          {errorStatus}
          <img src='../src/assets/404.png' alt='' />
        </h1>
      ) : (
        <h1 className='header-title'>
          {errorMessage}
          {errorStatus}
          <img src='../src/assets/wrong.png' alt='' />
        </h1>
      )}
    </>
  );
}
export default ErrorPage;
