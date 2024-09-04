import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import NonTechiesSupportPage from "./pages/NonTechiesSupportPage";
import DocumentationPage from "./pages/DocumentationPage";
import HomePage from "./pages/HomePage";
import Layout from "./layouts/Layout";
import store from "./util/store";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/DashboardPage";
import GetApiKey from "./pages/GetApiKey";
import ProtectedRoute from './components/ProtectedRoute';
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/docs",
        element: <DocumentationPage />,
      },
      {
        path: "/non-techies-support",
        element: <NonTechiesSupportPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute element={<Dashboard />} />,
  },
  {
    path: "/api-key",
    element: <ProtectedRoute element={<GetApiKey />} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
