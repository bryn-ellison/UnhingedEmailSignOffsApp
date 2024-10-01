import React from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  const year = new Date().getFullYear();

  return (
    <>
      <Outlet />
      <footer>
        <a href="https://github.com/bryn-ellison">©{year} Bryn Ellison</a>
        <p>|</p>
        <a href="https://www.linkedin.com/in/brynellison/">Hire me?</a>
      </footer>
    </>
  );
}

export default Layout;
