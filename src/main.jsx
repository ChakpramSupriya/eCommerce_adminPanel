import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Products from "./Components/Products/Products.jsx";
import Categories from "./Components/Categories/Categories.jsx";
import Customers from "./Components/Customers/Customers.jsx";
import Inventory from "./Components/Inventory/Inventory.jsx";
import Setting from "./Components/Setting/Setting.jsx";
import AddProduct from "./Components/Addproduct/AddProduct.jsx";
import { MantineProvider } from "@mantine/core";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<App />} />
      <Route path="/products" element={<Products />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/addproduct" element={<AddProduct />} />
      <Route path="/setting" element={<Setting />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
);
