import React from "react";
import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import TokenContextProvider from "./Context/TokenContext";
import { QueryClient, QueryClientProvider } from "react-query";
import CartContextProvider from "./Context/CartContext";
import { ToastContainer } from "react-toastify";
import WashlistProvider from "./Context/Washlist";

const root = ReactDOM.createRoot(document.getElementById("root"));

let query = new QueryClient();
root.render(
  <QueryClientProvider client={query}>
    <WashlistProvider>
    <CartContextProvider>
      <TokenContextProvider>
        <ToastContainer theme="dark" autoClose={1000} />
        <App />
      </TokenContextProvider>
    </CartContextProvider>
    </WashlistProvider>
  </QueryClientProvider>
);

