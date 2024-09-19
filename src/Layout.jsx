import React from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="content-wrapper">
      <header>
        <h1>Unhinged Email Sign Offs</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
