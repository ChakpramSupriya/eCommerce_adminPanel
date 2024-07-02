import { useState } from "react";

import "./App.css";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Home from "./Components/Home/Home";

import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <>
      <MantineProvider>
        <div className="grid-container">
          <Header OpenSidebar={OpenSidebar} />
          <Sidebar
            openSidebarToggle={openSidebarToggle}
            OpenSidebar={OpenSidebar}
          />
          <Home />
        </div>
      </MantineProvider>
    </>
  );
}

export default App;
