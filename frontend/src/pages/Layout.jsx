import React from "react";
import { Outlet } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import HeadlessDemo from "../components/HeadlessDemo";
import Navbar from "../components/Navbar";

function Layout() {
  return (
    <>
      <div>
      <Navbar/>
          {/* <HeadlessDemo /> */}
        {/* <Navbar /> */}
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
