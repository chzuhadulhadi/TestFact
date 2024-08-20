import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { verifyEmail } from "../../apiCalls/apiRoutes";
import { apiCall } from "../../apiCalls/apiCalls";
import { toast } from "react-toastify";

function Verify() {

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const token = queryParameters.get('token');
    console.log('token',token);
    if (!token || token == 'undefined') {
      showToastMessage('Could not verify mail.', "red", 2);
    }
    else {
      apiCall("post", verifyEmail, { token: token })
        .then((res) => {

          if (res.status == 200) {
            showToastMessage("Email Verified", "green", 1);
            navigate('/login');
          }
        })
        .catch((err) => {
          showToastMessage(err?.response?.data?.message, "red", 2);
          navigate('/signup');
        });

    }

  }, []);
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
    if (emailToDeal != null) {
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
    // apiCall("post", login, fetchedData)
    //   .then((res) => {
    //     if (res.status == 200) {
    //       showToastMessage("User Logged in Succesfully ", "green", 1);
    //       successHandler(res?.data?.data?.token);
    //     }
    //   })
    //   .catch((err) => {
    //     showToastMessage(err?.response?.data?.message, "red", 2);
    //   });
  };
  return (
    <div className="Get_sec">
      <div className="Mid">
        <p
          onClick={() => {
            navigate("/login");
          }}
          className="fa fa-home"
        ></p>
        <div className="Leftside">
          <form onSubmit={loginHandler}>
            <fieldset>
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
                  placeholder="Password ..."
                  id="password"
                  className="field"
                  required
                />
              </p>
              <p>
                <input type="submit" value="Login" className="button" />
              </p>
            </fieldset>
          </form>
          <p style={{ color: "red" }}>{confirmationText}</p>
        </div>
        <div className="Rightside">
          <div className="loginPage">
            <h3 style={{ fontSize: "2rem", fontWeight: "bold", margin: '0px !important' }}>Login now !</h3>
            <h4> Welcome back</h4>
            <p> Please sign in to Access your account </p>
            <p style={{ marginBottom: "2.7rem" }}> If you dont have an account you can sign Up any time. </p>
            <button
              onClick={() => {
                navigate("/signup");
              }}
              className="clickable-primary-text m-auto"
            >
              Sign Up Now
            </button>
            <div className="clear"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Verify;