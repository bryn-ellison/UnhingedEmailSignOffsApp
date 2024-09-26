import React from "react";
import { Outlet } from "react-router-dom";
import { SlEnvolope, SlPaperPlane } from "react-icons/sl";

function Layout() {
  return (
    <div className="content-wrapper">
      <header>
        <div className="top-icon-container">
          <SlEnvolope />
          <SlPaperPlane />
        </div>
        <div className="title-container">
          <div className="to-button">To:</div>
          <h1>Unhinged Email Sign Offs</h1>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
