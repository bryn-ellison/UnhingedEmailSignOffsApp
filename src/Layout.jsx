import React from "react";
import { Outlet } from "react-router-dom";
import { SlEnvolope, SlPaperPlane } from "react-icons/sl";

const year = new Date().getFullYear();

function Layout() {
  return (
    <>
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
      <footer>
        <a href="https://github.com/bryn-ellison">©{year} Bryn Ellison</a>
        <p>|</p>
        <a href="https://www.linkedin.com/in/brynellison/">Hire me?</a>
      </footer>
    </>
  );
}

export default Layout;
