import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Error from "./pages/Error/error.page.jsx";
import About from "./pages/About/about.page.jsx";
import Home from "./pages/Home/home.page.jsx";
import AllForums from "./pages/Forums/AllForums/all-forums.page.jsx";
import Forum from "./pages/Forums/Forum/forum.page.jsx";
import EventRegister from "./pages/Events/EventRegister/event-register.page.jsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error message="ERROR!" />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "who-we-are",
        element: <About />,
      },
      {
        path: "forums",
        element: <AllForums />,
      },
      {
        path: "events",
        element: <AllForums type="event" />,
      },
      { path: "forums/:id", element: <Forum /> },
      { path: "events/:id", element: <Forum /> },
      { path: "events/:id/register", element: <EventRegister /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
