import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./../Navbar/Navbar";
import { Offline } from "react-detect-offline";


export default function Layout() {

  return (
    <>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
      <Offline>
        <div className="network">
          <i class="fa-solid fa-wifi"></i> You Are offline (surprise!)
        </div>
      </Offline>
    </>
  );
}
