// app/routes/dashboard/_index.tsx
import { Outlet } from "@remix-run/react";
import Navbar from "~/components/navbar";
import Sidebar from "~/components/sidebar";

export default function DashboardLayout() {
  return (
    <div className="h-full">
      <Navbar />
      <Sidebar />
      <div className="md:pl-64 pt-16 h-svh bg-slate-100 ">
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}