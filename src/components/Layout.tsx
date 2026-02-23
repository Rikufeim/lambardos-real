import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { FloatingNav } from "./FloatingNav";

const Layout = () => (
  <div className="min-h-screen flex flex-col">
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
    <FloatingNav />
  </div>
);

export default Layout;
