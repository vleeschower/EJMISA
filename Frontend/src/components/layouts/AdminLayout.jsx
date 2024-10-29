import { Outlet } from "react-router-dom";
import Dashboard from "../view/admin/dashboard/dashboard";
import Nav from "../view/admin/dashboard/nav";
import { useState } from "react";

const AdminLayout = () => {
  const [toggle, setToggle] = useState(true);
  const Toggle = () =>{
    setToggle(!toggle)
  }

  return(
    <div className="container-fluid bg-dark min-vh-100">
        <div className="row">
          {toggle && (<div className="col-4 col-md-2 bg-white vh-100 position-fixed">
            <Dashboard handleLinkClick={Toggle} />
          </div>)}


          <div className={toggle ? "col-12 col-md-10 offset-md-2" : "col-12"}>
            <Nav Toggle={Toggle}/>
            <div className="container-fluid mt-3">
              <Outlet />
            </div>
          </div>

        </div>
    </div>
  )
};

export default AdminLayout;
