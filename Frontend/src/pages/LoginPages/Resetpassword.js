// ForgotPassword.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../homepage/header"; // Import your Header component if needed
import "./ForgotPassword.css"; // Import your CSS file for styling
import { apiCall } from "../../apiCalls/apiCalls";
import { resetpass } from "../../apiCalls/apiRoutes";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";




function Resetpassword() {
  const [confirmationText, setConfirmationText] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const token = queryParameters.get('token');
    console.log('token', token);
    if (!token || token == 'undefined') {
      showToastMessage('Could not verify mail.', "red", 2);
      navigate('/signup');
    }
  }, []);

  const resetPassword = async (e) => {
    const queryParameters = new URLSearchParams(window.location.search);
    const token = queryParameters.get('token');
    apiCall("post", resetpass, { token: token, password })
      .then((res) => {
        if (res.status == 200) {
          console.log(res, "res");
          showToastMessage("Password reset sucessfull", "green", 1);
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        }
      })
      .catch((err) => {
        showToastMessage(err?.response?.data?.message, "red", 2);
        setTimeout(() => {
          navigate('/signup');
        }, 2000);
      });
  }

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      // Implement logic to send a reset password link to the provided email
      // You can make an API call here to handle the reset password functionality
      // Example API call:
      // const response = await apiCall("post", forgotpass, { email });
      // Update the confirmationText based on the success or failure of the operation

      // Example assuming a successful response:
      setConfirmationText(
        "Reset password link sent successfully to your email. Check your inbox, and follow the instructions."
      );
      setError("");
    } catch (error) {
      setError("Failed to send reset password link. Please try again.");
      setConfirmationText("");
    }
  };
  useEffect(() => {
    const errortimer = setTimeout(() => {
      if (password !== confirmPassword) {
        setError("Password does not match");
      }
      else {
        setError("");
      }
    }, 2000);
  }
    , [password, confirmPassword]);

  return (
    <>
      <Header />
      <div className="ForgotPasswordContainer mt-5">
        <div className="ForgotPasswordMid">
          <div className="ForgotPasswordLeftside">
            <form onSubmit={handleResetPassword}>
              <fieldset>
                <p>

                </p>
                <p>
                  <h3 htmlFor="newPassword">New Password:</h3>
                  <input
                    type="password"
                    id="newPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your new password..."
                    className="field"
                    required
                  />
                </p>
                <p>
                  <h3 htmlFor="confirmNewPassword">Confirm New Password:</h3>
                  <input
                    type="password"
                    id="confirmNewPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your new password..."
                    className="field"
                    required
                  />
                </p>
                <p>
                  {error && <p className="error-text">{error}</p>}
                </p>
                <p>
                  <input
                    type="submit"
                    value="UPDATE PASSWORD"
                    className="button"
                    onClick={resetPassword}
                    disabled={password !== confirmPassword}
                  />
                </p>
              </fieldset>
            </form>


          </div>
        </div>
      </div>

    </>
  );
}

export default Resetpassword;
