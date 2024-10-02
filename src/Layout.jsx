import React from "react";
import { Outlet } from "react-router-dom";
import { SlEnvolope, SlPaperPlane } from "react-icons/sl";

function Layout() {
  const year = new Date().getFullYear();

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
      <Outlet />
      <footer>
        <a href="https://github.com/bryn-ellison">©{year} Bryn Ellison</a>
        <p>|</p>
        <a href="https://www.linkedin.com/in/brynellison/">Hire me?</a>
      </footer>
    </div>
  );
}

export default Layout;
