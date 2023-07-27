import { Outlet } from "react-router-dom";

import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="my-container min-h-[calc(100vh-236px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
