import "./NavBar.css";
import logo from "../../image/logo.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function NavBar() {
    const navigate = useNavigate();

    const links = [
        {
            location: "/homePage",
            name: "Home",
        },
        {
            location: "/tutors",
            name: "Tutors",
        },
        {
            location: "/course",
            name: "Courses",
        },
    ];

    let activeStyle = {
        color: "#2C3424",
        margin: "10px 0px 10px 0px",
        borderBottom: "3px solid black",
    };
    const token = localStorage.getItem("token");
    const image = localStorage.getItem("image");
    const Name = localStorage.getItem("full name");

    return (
        <div className="NavBar">
            <div className="left-side">
                <div className="Logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="links">
                    {links.map((ele) => {
                        return (
                            <NavLink
                                key={links.indexOf(ele)}
                                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                                className={"each-link"}
                                to={ele.location}
                            >
                                {" "}
                                {ele.name}
                            </NavLink>
                        );
                    })}
                </div>
            </div>
            <div className="button">
                {token ? (
                    <button
                        className="profile-button"
                        onClick={() => {
                            navigate("/profile     ");
                        }}
                    >
                        <div className="profile-icon">
                            <div className="image-home">
                                <img src={`http://localhost:4000/${image}`} alt="" />
                            </div>
                            <span>{Name}</span>
                        </div>
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            navigate("/login");
                        }}
                    >
                        Login
                    </button>
                )}
            </div>
        </div>
    );
}

export default NavBar;
