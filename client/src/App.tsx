import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//pages and component imports
import {
  ErrorPage,
  HomeLayout,
  LoginPage,
  RegisterPage,
  HomePage,
  DashboardLayout,
  ProfilePage,
} from "./utils";

import { action as LoginAction } from "./pages/LoginPage";
import { action as RegisterAction } from "./pages/RegisterPage";

import LoggedUserContextProvider from "./context/LoggedUserContextProvider";
import ProtectComponent from "./utils/ProtectComponent";

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
            <ProtectComponent>
              <LoggedUserContextProvider>
                <HomePage />
              </LoggedUserContextProvider>
            </ProtectComponent>
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
        {
          path: "dashboard",
          element: (
            <ProtectComponent>
              <DashboardLayout />
            </ProtectComponent>
          ),
          children: [
            {
              path: "profile",
              element: (
                <ProtectComponent>
                  <ProfilePage />
                </ProtectComponent>
              ),
            },
          ],
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
