// ForgotPassword.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../homepage/header"; // Import your Header component if needed
import "./ForgotPassword.css"; // Import your CSS file for styling
import { Button } from "@mui/material";
import { forgotpass } from "../../apiCalls/apiRoutes";
import { apiCall } from "../../apiCalls/apiCalls";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [confirmationText, setConfirmationText] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      // Implement logic to send a reset password link to the provided email
      // You can make an API call here to handle the reset password functionality
      // Example API call:
      const response = await apiCall("post", forgotpass, { email });

      // Update the confirmationText based on the success or failure of the operation

      // Example assuming a successful response:
      setConfirmationText(
        "Reset password link sent successfully to your email. Check your inbox, and follow the instructions."
      );
      setError("");
    } catch (error) {
      if(email == ""){
        setError("Please enter your email");
      }
      else{
        setError("Failed to send reset password link. Please try again after some time.");
      }
      setConfirmationText("");
    }
  };

  return (
    <>
      <Header />
      <div className="ForgotPasswordContainer mt-5">
        <div className="ForgotPasswordMid">
          <div className="ForgotPasswordLeftside">
            <form onSubmit={handleResetPassword}>
              <fieldset>
               <div id="p">
               <p>
                  <h3 htmlFor="email">Email:</h3>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email..."
                    className="field"
                    required
                  />
                </p>
               <div className="button1">
               <Button   onClick={handleResetPassword}>Reset Password</Button>
               </div>
                {/* <Link to="/resetpassword" class="button">Reset Password</Link> */}

            
               </div>
              </fieldset>
            </form>
            {error && <p className="error-text">{error}</p>}
            {confirmationText && (
              <div className="confirmation-text">
                <p className="success-text">{confirmationText}</p>
                <p>
                  Please note that the reset password link is valid for 24 hours.
                </p>
              </div>
            )}
            <div className="additional-links">
              <p>
                Remember your password? <Link to="/login">Login</Link>
              </p>
              <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
