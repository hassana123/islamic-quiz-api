import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import NonTechiesPage from "./pages/NonTechiesPage";
import DocumentationPage from "./pages/DocumentationPage";
import HomePage from "./pages/HomePage";
import Layout from "./layouts/Layout";
import store from "./util/store";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/DashboardPage";
import GetApiKey from "./pages/GetApiKey";
import AddQuestionsPage from "./pages/AddQuestionsPage";
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
        path: "/non-techies",
        element: <NonTechiesPage />,
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
  {
    path:"/submit-question",
    element:<ProtectedRoute element={<AddQuestionsPage/>}/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
