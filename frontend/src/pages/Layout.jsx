import React from "react";
import { Outlet } from "react-router-dom";
// import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeadlessDemo from "../components/HeadlessDemo";

function Layout() {
  return (
    <>
      <div style={{ display: "flex", height: "100vh" }}>
        <div>
          <HeadlessDemo />
        </div>
        {/* <Navbar /> */}
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
