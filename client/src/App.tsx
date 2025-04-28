import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//pages and component imports
import { ErrorPage, HomeLayout, LoginPage, RegisterPage } from "./utils";

import { action as LoginAction } from "./pages/LoginPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "login",
          element: <LoginPage />,
          action: LoginAction,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
