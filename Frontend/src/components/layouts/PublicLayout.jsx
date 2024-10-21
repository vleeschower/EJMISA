import { Outlet } from "react-router-dom";
import { Header } from "../view/header/header";
import Footer from "../view/footer/footer";

const PublicLayout = () => (
  <div className="d-flex flex-column min-vh-100">
    <Header />
    <div className="flex-grow-1">
      <Outlet />
    </div>
    <Footer />
  </div>
);

export default PublicLayout;
