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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SubCategories from "./Components/Categories/SubCategories.jsx";
import Signin from "./Components/Registration/Signin.jsx";
import Signup from "./Components/Registration/Signup.jsx";
import Message from "./Components/Others/Message.jsx";
import Notification from "./Components/Others/Notification.jsx";
import Carousel from "./Components/Carousel/Carousel.jsx";
import AdditionalData from "./Components/Header/Additional/AdditionalData.jsx";
import Footer from "./Components/Header/Additional/Footer.jsx";
import UpdateProduct from "./Components/Addproduct/UpdateProduct.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<App />} />
      <Route path="/products" element={<Products />} />
      <Route path="/carousel" element={<Carousel />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/inventory" element={<Inventory />} />

      <Route>
        <Route path="/addproduct" element={<AddProduct />} />
        {/* <Route path="/addproduct/:id" element={<AddProduct />} /> */}
        <Route path="/updateproduct/:id" element={<UpdateProduct />} />
      </Route>
      <Route path="/setting" element={<Setting />} />
      <Route path="/categories/:categoryname" element={<SubCategories />} />

      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />

      <Route path="/message" element={<Message />} />
      <Route path="/notification" element={<Notification />} />

      <Route path="/additionaldata" element={<AdditionalData />} />
      <Route path="/footer" element={<Footer />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          // hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
