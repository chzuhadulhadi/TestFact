import "./sidebar.css";
import Header from "../homepage/header";
import { Link, useNavigate } from "react-router-dom";
import MultiStepForm from "../questionaire/multistepForm/newQuestionaire";
import QuestionaireHistory from "../questionaire/questionaireHistory";
import MainQuestionaire from "../questionaire/main";
import AddUserInList from "../listings/addUserInListing";
import Paper from "../questionaire/questionpaper";
import MyQuestionaire from "../questionaire/myquestionaire";
import { useEffect, useState } from "react";
import SideBar from "../mainComponent/SideBar";
import LandingPageData from "../LandingPage/landingpagedata";
import PricingPlace from "../LandingPage/PricingPlace";
import { Grid, Typography } from "@mui/material";
import UpdateUser from "../user/updateUser";
import ChangePassword from "../user/changePassword";
import { myInfo, userPackage } from "../../apiCalls/apiRoutes";
import { apiCall } from "../../apiCalls/apiCalls";

function Dashboard(params) {
  const navigate = useNavigate();
  const location = window.location.pathname;
  const [newlocation, setNewLocation] = useState("");
  const [packageData, setPackageData] = useState({});
  const [user, setUser] = useState({});
  useEffect(() => {
    if (location) {
      let tmp = location.slice(location.lastIndexOf("/"), location.length);
      setNewLocation(tmp);
    }
  }, [location]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == null || token == "") {
      navigate("/");
    } else {
      apiCall("post", myInfo)
        .then((res) => {
          if (res.status == 200) {
            setUser(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    apiCall("post", userPackage, {})
      .then((res) => {
        setPackageData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="">
      <SideBar />
      <div id="content" className=" w-auto sm:w-auto">
        {/* add frame to container and smaller */}
        <Grid className="w-auto" container ml={{ xs: 10, sm: 10 }}>
          <Grid item xs={8} md={12}>
            <Typography
              variant="h4"
              style={{
                color: "#000",
                fontWeight: "bold",
              }}
            >
              Welcome, {user.firstName}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            display={"flex"}
            justifyContent={"flex-end"}
            border={1}
            borderRadius={5}
            style={{ padding: "10px" }}
          >
            {packageData?.payment ? (
              <Grid container display={"flex"} justifyContent={"flex-end"}>
                <Grid item xs={6} style={{ textAlign: "center" }}>
                  <h6 id="6">My package: {packageData.package.packageName} </h6>
                </Grid>
                <Grid item xs={6}>
                  <h6 id="6" style={{ textAlign: "center" }}>
                    Sent Tests:{" "}
                    {packageData.package.numberOfTests -
                      packageData.payment.RemainingNumberOfTests}{" "}
                  </h6>
                </Grid>
                <Grid item xs={6}>
                  <h6 id="6" style={{ textAlign: "center" }}>
                    Remaining tests:{" "}
                    {packageData.payment.RemainingNumberOfTests}{" "}
                  </h6>
                </Grid>
                <Grid item xs={6}>
                  <h6 id="6" style={{ textAlign: "center" }}>
                    Expiry date:{" "}
                    {new Date(packageData.payment.expireDate).toDateString()}{" "}
                  </h6>
                </Grid>
              </Grid>
            ) : (
              <Grid container display={"flex"} justifyContent={"flex-end"}>
                <Grid item xs={6}>
                  <h6 id="6" style={{ textAlign: "center" }}>
                    My package: {"None"}{" "}
                  </h6>
                </Grid>
                <Grid item xs={6}>
                  <h6 id="6" style={{ textAlign: "center" }}>
                    Sent Tests: 0{" "}
                  </h6>
                </Grid>
                <Grid item xs={6}>
                  <h6 id="6" style={{ textAlign: "center" }}>
                    Remaining tests: 0{" "}
                  </h6>
                </Grid>
                <Grid item xs={6}>
                  <h6 id="6" style={{ textAlign: "center" }}>
                    Expiry date: N/A{" "}
                  </h6>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
        <div className="container-fluid mt-4">
          <Link to="/dashboard" className="navbar-brand">
            <Typography
              className="sm:pl-4 pt-6 md:pl-20 "
              variant="span"
              style={{ color: "#000", fontWeight: "bold" }}
            >
              dashboard
            </Typography>
          </Link>
          {newlocation != "/dashboard" && (
            <Typography
              variant="span"
              style={{ color: "#000", fontWeight: "bold" }}
            >
              {" "}
              {"-->"}{" "}
            </Typography>
          )}

          {newlocation == "/mytest" ? (
            <Typography
              variant="span"
              style={{ color: "#000", fontWeight: "bold" }}
            >
              My Tests
            </Typography>
          ) : newlocation == "/my-mailing-list" ? (
            <Typography
              variant="span"
              style={{ color: "#000", fontWeight: "bold" }}
            >
              My Mailing Lists
            </Typography>
          ) : newlocation == "/questionaire-history" ? (
            <Typography
              variant="span"
              style={{ color: "#000", fontWeight: "bold" }}
            >
              Test History
            </Typography>
          ) : newlocation == "/landing-pages" ? (
            <Typography
              variant="span"
              style={{ color: "#000", fontWeight: "bold" }}
            >
              Landing Pages
            </Typography>
          ) : newlocation == "/my-landing-pages" ? (
            <Typography
              variant="span"
              style={{ color: "#000", fontWeight: "bold" }}
            >
              My Landing Pages
            </Typography>
          ) : newlocation == "/PricingPlace" ? (
            <Typography
              variant="span"
              style={{ color: "#000", fontWeight: "bold" }}
            >
              Pricing
            </Typography>
          ) : newlocation == "/my-landing-pages" ? (
            <Typography
              variant="span"
              style={{ color: "#000", fontWeight: "bold" }}
            >
              My Landing Pages
            </Typography>
          ) : newlocation == "/update" ? (
            <Typography
              variant="span"
              style={{ color: "#000", fontWeight: "bold" }}
            >
              My Account Details
            </Typography>
          ) : newlocation == "/change-password" ? (
            <Typography
              variant="span"
              style={{ color: "#000", fontWeight: "bold" }}
            >
              Change Password
            </Typography>
          ) : (
            <Typography
              variant="span"
              style={{ color: "#000", fontWeight: "bold" }}
            >
              Dashboard
            </Typography>
          )}
        </div>
        {newlocation == "/mytest" && <MyQuestionaire />}
        {newlocation == "/my-mailing-list" && <AddUserInList />}
        {newlocation == "/questionaire-history" && <QuestionaireHistory />}
        {newlocation == "/landing-pages" && <LandingPageData />}
        {newlocation == "/PricingPlace" && <PricingPlace />}
        {newlocation == "/my-landing-pages" && <Paper />}
        {newlocation == "/update" && <UpdateUser />}
        {newlocation == "/change-password" && <ChangePassword />}
      </div>
    </div>
  );
}
export default Dashboard;
