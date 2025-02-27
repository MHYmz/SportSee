// eslint-disable-next-line no-unused-vars
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Template from "./components/Template/Template";
import Dashboard from "./pages/Dashboard/Dashboard";
import Welcome from "./pages/Welcome/Welcome";
import NotFound from "./pages/NotFound";
import loadUser from "./Loader/loadUser"


export default function AppRouter() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Template />,
      children: [
        {
          index: true,
          element: <Welcome />,
        },
        {
          path: "/user/:id",
          element: <Dashboard />,
          loader: loadUser,
          errorElement: <NotFound/>
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
