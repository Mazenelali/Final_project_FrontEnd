import "./NavBar.css";
import logo from "../../image/logo.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { UrlContext } from "../../Layout";

function NavBar() {
    const navigate = useNavigate();

    const links = [
        {
            location: "/",
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

    // for side bar
    function toggelSideBar() {
        const sideBar = document.querySelector(".nav-container");
        sideBar.classList.toggle("open");

        const sideBarContent = document.querySelector(".none");
        sideBarContent.classList.toggle("showSide");
    }

    if (window.innerWidth < 450) {
        return (
            <div class="nav">
                <input id="menu" type="checkbox" />
                <label
                    for="menu"
                    className="label"
                    onClick={() => {
                        toggelSideBar();
                    }}
                ></label>
                <div className="nav-container">
                    <div className="none">
                        <div className="Logo-SideBar">
                            <img src={logo} alt="logo" />
                        </div>
                        <div className="links-SideBar">
                            {links.map((ele) => {
                                return (
                                    <NavLink
                                        key={links.indexOf(ele)}
                                        style={({ isActive }) =>
                                            isActive ? activeStyle : undefined
                                        }
                                        className={"each-link-SideBar"}
                                        to={ele.location}
                                    >
                                        {" "}
                                        {ele.name}
                                    </NavLink>
                                );
                            })}
                        </div>
                        <div className="button-side-bar">
                            {token ? (
                                <button
                                    className="profile-button"
                                    onClick={() => {
                                        navigate("/profile     ");
                                    }}
                                >
                                    <div className="profile-icon">
                                        <div className="image-home">
                                            <img src={`${image}`} alt="" />
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
                </div>
            </div>
        );
    }

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
                                style={({ isActive }) =>
                                    isActive ? activeStyle : undefined
                                }
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
                                <img src={`${image}`} alt="" />
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
