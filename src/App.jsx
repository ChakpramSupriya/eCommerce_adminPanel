import { useState } from "react";

import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Sidebar from "./Components/Sidebar/Sidebar";

import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { Bounce, ToastContainer } from "react-toastify";

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <>
      <div className="grid-container">
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
        <Home />
      </div>
    </>
  );
}

export default App;
