import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Article from "../routes/Article";
import Home from "../routes/Home";
import Root from "../routes/Root";
import { articleLoader } from "./ArticleSection";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: articleLoader,
      },
      {
        path: "/article",
        element: <Article />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;