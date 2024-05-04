import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import routes from "./routes";
import "./index.scss";

const router = createBrowserRouter(routes);
const queryClient = new QueryClient();

const rootContainer = document.getElementById("root")!;

const rootElement = ReactDOM.createRoot(rootContainer);

rootElement.render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}></RouterProvider>
  </QueryClientProvider>
);
