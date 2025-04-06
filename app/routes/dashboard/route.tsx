import { Outlet} from "@remix-run/react";
import Navbar from "~/components/navbar";
import Sidebar from "~/components/sidebar";

export default function DashboardLayout() {
  return (
    <div className="h-screen flex flex-col bg-white">
      <Navbar />
      <Sidebar />
      <div className="flex flex-1">
        <main className="flex-1 p-6 pl-64 pt-24">
          <div className="container-fluid mx-auto bg-white rounded-lg p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
