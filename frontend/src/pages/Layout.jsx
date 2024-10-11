import React from "react";
import { Outlet } from "react-router-dom";
// import Navbar from "../components/Navbar";
import HeadlessDemo from "../components/HeadlessDemo";

function Layout() {
  return (
    <>
      <div>
          <HeadlessDemo />
        {/* <Navbar /> */}
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
