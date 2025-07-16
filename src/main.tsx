import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

//toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OverrideMuiTheme from "./theme/override.tsx";
import { AuthProvider } from "./contexts/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <OverrideMuiTheme>
        <AuthProvider>
          <App />
        </AuthProvider>
      </OverrideMuiTheme>
    </BrowserRouter>
  </StrictMode>
);
