import * as React from "react";
import { Header } from ".";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen bg-white sm:bg-[#F4F4F4]">
      <Header />
      <main className="pt-[28px] sm:py-[43px]">{<Outlet />}</main>
    </div>
  );
}

export default Layout;
