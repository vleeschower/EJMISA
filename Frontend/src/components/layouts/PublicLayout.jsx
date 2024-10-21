import { Outlet } from "react-router-dom";
import { Header } from "../header";

const PublicLayout = () => (
  <div>
    <Header />
    <Outlet />
  </div>
);

export default PublicLayout;
