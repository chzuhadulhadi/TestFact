import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { apiCall } from "../../apiCalls/apiCalls";
import { getPackage, paymentRoute, getUser } from "../../apiCalls/apiRoutes";
import axios from "axios";

export default function PricingPlace() {
  const [packages, setPackages] = React.useState([]);
  const [user, setUser] = React.useState({});
  const [countryCode, setCountryCode] = React.useState("");
  const handleBuyNow = (id) => {
    apiCall("post", paymentRoute, {
      id: id,
      countryCode: countryCode.toLocaleLowerCase(),
    })
      .then((res) => {
        window.location.href = res.data.data.URL;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(user);
  useEffect(() => {
    const fetchIp = async () => {
      const response = await fetch("https://freeipapi.com/api/json");
      if (response.ok) {
        const country = await response.json();
        setCountryCode(country.countryCode.toLowerCase());
      } else {
        throw new Error("Failed to fetch IP address");
      }
    };
    fetchIp();
  }, []);
  useEffect(() => {
    loadPackages();
    loadUser();
  }, []);

  const loadUser = () => {
    apiCall("post", getUser)
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const loadPackages = () => {
    apiCall("post", getPackage)
      .then((res) => {
        console.log(res.data.data);
        setPackages(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(packages);
  return (
    <>
      <div className="w-[90%] mx-auto ">
        <div className="Pricing_sec mt-4" id="pricing">
          <div className="Center">
            <h2 className="text-xl">Pricing</h2>
            <p>
              Service Packages for every need. <br />
            </p>
            <div className="Line"></div>
            <Grid container spacing={2}>
              {packages.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} mt={5}>
                  <div className="Basic">
                    <h5>{item.packageName}</h5>
                  </div>
                  <br />
                  <div className="Dollar">
                    {countryCode === "il" ? (
                      <h4>${item.packagePrice} + VAT</h4>
                    ) : (
                      <h4>${item.packagePrice}</h4>
                    )}
                  </div>
                  <br />

                  <div className="Band">
                    <h5>
                      Duration: <span>{item.packageDuration} days</span>
                    </h5>
                  </div>
                  <br />

                  <div className="Band">
                    <h5>
                      Number Of tests: <span>{item.numberOfTests}</span>
                    </h5>
                  </div>
                  <br />
                  <div className="Band">
                    <h5>{item.support}</h5>
                  </div>
                  <br />
                  <div className="Band last">
                    <button onClick={() => handleBuyNow(item.id)}>
                      Buy Now
                    </button>
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
}
