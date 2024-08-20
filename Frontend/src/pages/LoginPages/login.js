import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../../apiCalls/apiRoutes";
import { apiCall } from "../../apiCalls/apiCalls";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Header from "../homepage/header";

function Login() {
  const showToastMessage = (text, color, notify) => {
    if (notify == 1) {
      toast.success(text, {
        position: toast.POSITION.TOP_RIGHT,
        style: { color: color },
      });
    } else {
      toast.warning(text, {
        position: toast.POSITION.TOP_RIGHT,
        style: { color: color },
      });
    }
  };
  var queryParameters = new URLSearchParams(window.location.search);
  var emailToDeal = queryParameters.get("email");

  setTimeout(() => {
    if (emailToDeal != null && emailToDeal != "undefined") {
      document.querySelector("#email").setAttribute("value", emailToDeal);
    }
  }, 500);

  const [fetchedData, setFetchedData] = useState({
    email: emailToDeal || "",
    password: "",
    role: 2,
  });

  const [confirmationText, setConfirmationText] = useState("");
  const valueAdder = (e) => {
    setFetchedData((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const successHandler = (res) => {
    localStorage.setItem("token", res);
    setTimeout(() => {
      navigate("/dashboard/mytest");
    }, 500);
  };
  const navigate = useNavigate();
  const loginHandler = (e) => {
    e.preventDefault();
    setConfirmationText("");
    apiCall("post", login, fetchedData)
      .then((res) => {
        if (res.status == 200) {
          showToastMessage("User Logged in Succesfully ", "green", 1);
          successHandler(res?.data?.data?.token);
        }
      })
      .catch((err) => {
        showToastMessage(err?.response?.data?.message, "red", 2);
      });
  };
  return (
    <>
      <Header />
      <div className="flex flex-col-1">
        <div className="Get_sec mt-5 ">
          <div className="Mid">
            <div className="">
              {" "}
              <div className="Leftside  ">
                <form onSubmit={loginHandler}>
                  <p>
                    <input
                      type="email"
                      onChange={valueAdder}
                      placeholder="EMAIL..."
                      className="field"
                      id="email"
                      required
                    />
                  </p>
                  <p>
                    <input
                      type="password"
                      onChange={valueAdder}
                      placeholder="PASSWORD..."
                      id="password"
                      className="field"
                      required
                    />
                  </p>
                  <a
                    href="/ForgotPassword"
                    className="forgot-password-link mr-0 sm:mr-[110px] float-end "
                    style={{
                      textDecoration: "none",

                      marginBottom: "15px",
                    }}
                  >
                    Forgot Password?
                  </a>
                  <p>
                    <input type="submit" value="Login" className="button" />
                  </p>
                </form>
                <p style={{ color: "red" }}>{confirmationText}</p>
              </div>
            </div>
            <div className="Rightside mt-5">
              <div className="loginPage mt-3">
                <h3
                  style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    margin: "0px !important",
                  }}
                >
                  Login now !
                </h3>
                <h4> Welcome back</h4>
                <p> Please sign in to Access your account </p>
                <p style={{ marginBottom: "2.7rem" }}>
                  {" "}
                  If you dont have an account you can sign Up any time.{" "}
                </p>
                <button
                  onClick={() => {
                    navigate("/signup");
                  }}
                  className="clickable-primary-text m-auto w-1/2 md:w-1/4"
                >
                  Sign Up Now
                </button>
                <div className="clear"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
