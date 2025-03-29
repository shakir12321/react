import React from "react";
import "./App.css";
import Table from "./Table";
import Detail from "./Detail";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createMemoryRouter([
    {
      path: "/",
      element: <Table />,
    },
    {
      path: "/:workItem",
      element: <Detail />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
