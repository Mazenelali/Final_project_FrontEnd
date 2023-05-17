import "./NavBar.css"
import logo from "../../image/logo.png"
import { NavLink } from "react-router-dom";



function NavBar() {
    const links = [{
    location :"/homePage",
    name :"Home"
    },
    {
    location :"/tutors",
    name :"Tutors"
    },
    {
        location :"/course",
        name :"Courses"
        }, 
    ]

    let activeStyle={
        color: "#2C3424",
        margin:"10px 0px 10px 0px",
        borderBottom:"3px solid black"
    }


    return (
        <div className="NavBar">
            <div className="left-side">
                <div className="Logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="links">
                    {links.map((ele)=>{
                            return  <NavLink 
                            style={({ isActive }) => (isActive ? activeStyle : undefined)}
                            className={"each-link"} to={ele.location}> {ele.name}</NavLink>
                    })}
                </div>
            </div>
            <div className="button">
                <button>
                    Login
                </button>
            </div>
        </div>
    );
}

export default NavBar;