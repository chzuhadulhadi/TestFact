import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Typography,
  Menu,
  MenuItem,
  Popper,
  Paper,
  Grow,
  MenuList,
} from "@mui/material";

import "./css/media.css";
import "./css/theme.css";
import "./header.css";
import { Dropdown } from "react-bootstrap";
import { frontEndPath } from "../../apiCalls/apiRoutes";
const menuStyle = {
  backgroundColor: "#696969", // Set the background color to gray
  fontSize: "1.2em",
  // margin:'10px',     // Increase font size slightly
  padding: "10px 20px", // Add padding
};

function Header(props) {
  const [token, setToken] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const handleClickAway = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      // Clicked outside the menu, close it
      setAnchorEl(null);
    }
  };

  useEffect(() => {
    // Add a click event listener when the component mounts
    document.addEventListener("click", handleClickAway);

    // Remove the click event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickAway);
    };
  }, []);
  useEffect(() => {
    setToken(localStorage.getItem("token") || null);
  }, []);

  const handleClose = (event) => {
    setAnchorEl(null);
  };
  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      // setOpen(false)
      setAnchorEl(null);
    }
  }

  return (
    <header className="header_nav">
      <div className="site-logo text-sm">
        <a className="no-underline" href="/#home">
          <span className="text-white text-3xl font-bold">TEST</span>
          <span className="text-[#ff9000] text-3xl font-bold">FACTORY</span>
        </a>
      </div>
      <nav>
        <ul className={isMobileMenuOpen ? "nav_items show_menu" : "nav_items"}>
          <div
            className="close_menu"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <i className="fas fa-times"></i>
          </div>
          <li className="active">
            <Typography sx={{ minWidth: 100 }}>
              <a href="/#home">Home</a>
            </Typography>
          </li>
          <li>
            <Typography sx={{ minWidth: 100 }}>
              {" "}
              <a href="/#about">About</a>
            </Typography>
          </li>

          <li>
            <Typography sx={{ minWidth: 100 }}>
              <a href="/#services">Services</a>
            </Typography>
          </li>
          <li>
            <Typography sx={{ minWidth: 100 }}>
              <a href="#contact">Contact</a>
            </Typography>
          </li>
          {token ? (
            <>
              {" "}
              <li>
                <Typography sx={{ minWidth: 100 }}>
                  <a href="/dashboard/mytest">Dashboard</a>
                </Typography>
              </li>
              <li>
                <Typography sx={{ minWidth: 100 }}>
                  <a href="/" onClick={logoutHandler}>
                    Logout
                  </a>
                </Typography>
              </li>
            </>
          ) : (
            <>
              {" "}
              <li>
                <Link style={{ color: "black" }} to={frontEndPath + "login"}>
                  Login
                </Link>
                <span className="menu-item-bg"></span>
              </li>
              <li>
                <Link className="text-black" to={frontEndPath + "signup"}>
                  Signup
                </Link>
                <span className="menu-item-bg"></span>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className="menu-toggle" onClick={() => setIsMobileMenuOpen(true)}>
        <i className="fas fa-bars"></i>
      </div>
    </header>
  );
}

export default Header;
