import NavBar from "./component/navBar/NavBar";
import { Outlet } from "react-router-dom";
import "./App.css"
function Layout() {
    return ( <div className="layout">
     <NavBar/>
     <Outlet/>
    </div>  );
}

export default Layout;