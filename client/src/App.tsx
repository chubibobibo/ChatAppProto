import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//pages and component imports
import {
  ErrorPage,
  HomeLayout,
  LoginPage,
  RegisterPage,
  HomePage,
} from "./utils";

import { action as LoginAction } from "./pages/LoginPage";
import { action as RegisterAction } from "./pages/RegisterPage";

import LoggedUserContextProvider from "./context/LoggedUserContextProvider";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          index: true,
          element: (
            <LoggedUserContextProvider>
              <HomePage />
            </LoggedUserContextProvider>
          ),
        },
        {
          path: "login",
          element: <LoginPage />,
          action: LoginAction,
        },
        {
          path: "register",
          element: <RegisterPage />,
          action: RegisterAction,
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
