import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Inscription from "./pages/Inscription";
import PageDino, { loadDino } from "./pages/PageDino";
import PageDinoDetails, { loadDinoDetails } from "./pages/PageDinoDetails";
import ProfilUser from "./pages/ProfilUser";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "Inscription",
        element: <Inscription />,
      },
      {
        path: "PageDino",
        element: (
          <ProtectedRoute>
            <PageDino />
          </ProtectedRoute>
        ),
        loader: loadDino,
      },
      {
        path: "PageDinoDetails/:id",
        element: (
          <ProtectedRoute>
            <PageDinoDetails />
          </ProtectedRoute>
        ),
        loader: loadDinoDetails,
      },
      {
        path: "ProfilUser",
        element: (
          <ProtectedRoute>
            <ProfilUser />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
