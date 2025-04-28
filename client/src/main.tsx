import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ToastContainer, Zoom } from "react-toastify";

/** @contextClass object to apply colors to toast alerts */
const contextClass = {
  success: "bg-custom-green",
  error: "bg-red-600",
  info: "bg-gray-600",
  warning: "bg-orange-400",
  default: "bg-indigo-600",
  dark: "bg-white-600 font-gray-300",
};
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <>
      <ToastContainer
        position='top-center'
        closeOnClick
        transition={Zoom}
        toastClassName={(context) =>
          contextClass[context?.type || "default"] +
          " mt-2 relative flex p-2 min-h-18 w-[20rem] rounded-md justify-center overflow-hidden cursor-pointer items-center"
        }
      />
      <App />
    </>
  </StrictMode>
);
