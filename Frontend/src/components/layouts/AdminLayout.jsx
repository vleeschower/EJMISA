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
            <Dashboard />
          </div>)}

          {toggle && (<div className="col-4 col-md-2"></div>)}

          <div className={toggle ? "col" : "col-12"}>
            <Nav Toggle={Toggle}/>
            <div className="container-fluid mt-3">
              <Outlet Toggle={Toggle}/>
            </div>
          </div>

        </div>
    </div>
  )
};

export default AdminLayout;
