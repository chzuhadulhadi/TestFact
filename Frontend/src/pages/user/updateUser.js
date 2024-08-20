import React from "react";
import { useState, useEffect } from "react";
import { myInfo, updateUser } from "../../apiCalls/apiRoutes";
import { apiCall } from "../../apiCalls/apiCalls";
import { toast } from "react-toastify";

function UpdateUser() {
  const [userData, setUserData] = useState({});
  const [updateData, setUpdateData] = useState(false);

  useEffect(() => {
    // Fetch user data from the server
    apiCall("post", myInfo)
      .then((res) => {
        if (res.status == 200) {
          setUserData(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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

  // console.log(userData);
  const handleUpdate = () => {
    setUpdateData(false);
    apiCall("post", updateUser, userData)
      .then((res) => {
        if (res.status === 200) {
          showToastMessage("User data updated successfully", "green", 1);
          // setUserData(res.data.data);
        }
      })
      .catch((err) => {
        console.error(err);
        showToastMessage("Failed to update user data", "red", 0);
      });
  };

  // Your component logic here
  return (
    <div class="Get_sec" style={{ height: "100vh" }}>
      <h1>My account details</h1>
      <div class="container">
        <div class="row gutters justify-content-center align-items-center">
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6">
            <div class="card h-100 justify-content-center align-items-center">
              <div class="card-body">
                <div class="row gutters">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-2">
                    <h3 class="mb-2 text-primary">Personal Details</h3>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group my-2">
                      <label for="fullName">Full Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="fullName"
                        placeholder="Enter full name"
                        value={userData.firstName}
                        onChange={(e) => {
                          setUserData({
                            ...userData,
                            firstName: e.target.value,
                          });
                          setUpdateData(true);
                        }}
                      />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group my-2">
                      <label for="fullName">Company Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="fullName"
                        placeholder="Enter Company Name"
                        value={userData.lastName}
                        onChange={(e) => {
                          setUserData({
                            ...userData,
                            lastName: e.target.value,
                          });
                          setUpdateData(true);
                        }}
                      />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group my-2">
                      <label for="eMail">Email</label>
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        placeholder="Enter email ID"
                        value={userData.email}
                        onChange={(e) => {
                          setUserData({ ...userData, email: e.target.value });
                          setUpdateData(true);
                        }}
                      />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group my-2">
                      <label for="phone">Phone</label>
                      <input
                        type="text"
                        class="form-control"
                        id="phone"
                        placeholder="Enter phone number"
                        value={userData.phoneNumber}
                        onChange={(e) => {
                          setUserData({
                            ...userData,
                            phoneNumber: e.target.value,
                          });
                          setUpdateData(true);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div class="row gutters">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="text-right">
                      {updateData ? (
                        <button
                          type="button"
                          id="submit"
                          name="submit"
                          onClick={handleUpdate}
                          class="btn btn-primary"
                        >
                          Update
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
