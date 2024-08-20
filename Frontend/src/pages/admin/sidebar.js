import React, { Component, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import '../dashboard/sidebar.css'
// function AdminSideBar(props) {
//     const navigate = useNavigate()

//     return (
//         <nav id="sidebar">
//             <div className="sidebar-header">
//             <h3 style={{marginTop:'0',marginBottom:'0',paddingTop:'0',paddingBottom:'0',color:'orange'}} onClick={() => { navigate('/') }}><span style={{ color: 'black' }}>{"Test "}</span>Factory</h3>
//             </div>

//             <ul className="list-unstyled components">
//                 {/* <li id="1" onClick={myfunc}>
//             <a id="0">Questionnaire </a>
//           </li> */}

//                 <li id="2" onClick={() => { navigate("/admin/dashboard/users") }}>
//                     <a id="1">Users </a>
//                 </li>
//                 <li id="3" onClick={() => { navigate("/admin/dashboard/tests") }}>
//                     <a id="2">Tests</a>
//                 </li>
//                 <li id="3" onClick={() => { navigate("/admin/dashboard/results") }}>
//                     <a id="2">Results</a>
//                 </li>
//                 <li id="3" onClick={() => { navigate("/admin/dashboard/packages") }}>
//                     <a id="2">Packages</a>
//                 </li>
//                 {/* <li id="4" onClick={() => { navigate("/dashboard/questionaire-history") }}>
//                     <a id="3">Questionnaire History </a>
//                 </li>
//                 <li id="5" onClick={() => { navigate("/dashboard/landing-pages") }}>
//                     <a id="4">Landing pages </a>
//                 </li>
//                 <li id="6" onClick={() => { navigate("/dashboard/my-landing-pages") }}>
//                     <a id="5">My landing pages </a>
//                 </li> */}
//             </ul>
//             <ul className="list-unstyled components">
//                 <li id="7" onClick={() => {
//                     localStorage.removeItem('token')
//                     navigate('/login')
//                 }}>
//                     <a id="6">Logout </a>
//                 </li>
//             </ul>
//         </nav>
//     )
// }

// export default AdminSideBar;





function AdminSideBar(props) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {!isOpen && (
        <button
          className="absolute top-[5px] left-[5px] z-70 w-[40px] h-[40px] flex items-center justify-center p-0"
          onClick={toggleSidebar}
        >
          <i className="fa fa-bars text-white text-[16px]"></i>
        </button>
      )}
      <nav
        id="sidebar"
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed top-0 left-0 h-full w-64 bg-gray-800 transition-transform duration-300 ease-in-out z-40`}
      >
        <button
          className="md:hidden m-2 z-70 w-[38px] h-[38px] flex items-center justify-center"
          onClick={toggleSidebar}
        >
          <i className="fa fa-bars text-white text-[16px]"></i>
        </button>
        <header
          style={{
            position: "relative",
            background: "none",
            overflow: "hidden",
          }}
        >
          <div className="site-logo">
            <Grid container>
              <Grid item xs={2}>
                <a href="/" style={{ fontSize: "25px" }}>
                  <div
                    style={{
                      textAlign: "center",
                      background: "none",
                      marginLeft: "20px",
                    }}
                  >
                    <i
                      className="fa fa-home pt-3"
                      style={{ fontSize: "25px", color: "white" }}
                    ></i>
                  </div>
                </a>
              </Grid>
              <Grid item xs={10}>
                <h1
                  style={{
                    textAlign: "center",
                    margin: "6px 0px 0px 0px",
                    paddingTop: "0",
                    paddingBottom: "0",
                  }}
                >
                   <a className="no-underline" href="/#home">
          <span className="text-white text-3xl font-bold">TEST</span>
          <span className="text-[#ff9000] text-3xl font-bold">FACTORY</span>
        </a>
                </h1>
              </Grid>
            </Grid>
          </div>
        </header>
        <ul
          className="list-unstyled components"
          style={{ overflow: "auto", width: "100%" }}
        >
          <li id="2" onClick={() => { navigate("/admin/dashboard/users") }}>
                    <a id="1">Users </a>
                </li>
                <li id="3" onClick={() => { navigate("/admin/dashboard/tests") }}>
                    <a id="2">Tests</a>
                </li>
                <li id="3" onClick={() => { navigate("/admin/dashboard/results") }}>
                    <a id="2">Results</a>
                </li>
                <li id="3" onClick={() => { navigate("/admin/dashboard/packages") }}>
                    <a id="2">Packages</a>
                </li>
        </ul>
        <ul className="list-unstyled components">
               <li id="7" onClick={() => {
                    localStorage.removeItem('token')
                    navigate('/login')
                }}>
                     <a id="6">Logout </a>
                 </li>
             </ul>
      </nav>
    </>
  );
}

export default AdminSideBar;
