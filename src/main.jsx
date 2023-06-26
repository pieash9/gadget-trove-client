import ReactDOM from "react-dom/client";

import "./index.css";

import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes.jsx";
import { StyledEngineProvider } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StyledEngineProvider injectFirst>
    <div className="max-w-7xl mx-auto">
      <RouterProvider router={router} />
    </div>
  </StyledEngineProvider>
);
