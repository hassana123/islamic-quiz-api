import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import NonTechiesSupportPage from "./pages/NonTechiesSupportPage";
import DocumentationPage from "./pages/DocumentationPage";
import HomePage from "./pages/HomePage";
import Layout from "./layouts/Layout";

const router = createBrowserRouter([
  {
    element:<Layout/>,
    children:[
      {
        path: "/",
        element:<HomePage/>,
      },
      {
        path: "/docs",
        element:<DocumentationPage/>,
      },
      {
        path: "/non-techies-support",
        element: <NonTechiesSupportPage />,
      },
    ],
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
// import * as React from "react";
// import * as ReactDOM from "react-dom/client";
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
// import "./index.css";
// import DocumentationPage from "./pages/DocumentationPage";
// // Import other pages/components when ready
// import FeedbackPage from "./pages/FeedbackPage";
// import AddQuestionPage from "./pages/AddQuestionPage";
// import HomePage from "./pages/HomePage";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <HomePage />,
//   },
//   {
//     path: "/documentation",
//     element: <DocumentationPage />,
//   },
//   {
//     path: "/feedback",
//     element: <FeedbackPage />,
//   },
//   {
//     path: "/add-question",
//     element: <AddQuestionPage />,
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );
