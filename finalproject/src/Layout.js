import NavBar from "./component/navBar/NavBar";
import { Outlet } from "react-router-dom";
import "./App.css"
import { useContext , createContext } from 'react';

export const UrlContext = createContext()

function Layout() {
    const url = "https://educate-mazenelali.onrender.com"
    return ( <div className="layout" >
     <NavBar/>
     <UrlContext.Provider value={url}>
     <Outlet/>
     </UrlContext.Provider>
    </div>  );
}

export default Layout;