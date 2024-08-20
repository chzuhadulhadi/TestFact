import "./css/media.css";
import "./css/theme.css";
import bannerImg from "./css/images/3.avif";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfoTabs from "./tab";
import Login from "../LoginPages/login";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import { apiCall } from "../../apiCalls/apiCalls";
import { getPackage } from "../../apiCalls/apiRoutes";

const handleSubmit = (event) => {
  event.preventDefault();
  window.location.href = "mailto:Areilbk@gmail.com";
};

function Home({ loginCheck }) {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    console.log("loginCheck", loginCheck);
  }, [loginCheck]);

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

  useEffect(() => {
    loadPackages();
  }, []);

  return (
    <>
      <div id="home"></div>
      <br />
      <br />
      <div class="DesignHolder">
        <div class="LayoutFrame">
          <div class="Banner_sec">
            <Grid mt={10} container className="bannerside-m">
              <Grid container item alignItems="center" justifyContent="center">
                <Grid item xs={12} md={6} p={10}>
                  <div>
                    <Typography variant="h2" sx={{ color: "#000" }}>
                      Test Factory <br />
                      <span style={{ color: "#ff9000" }}>How it works</span>
                    </Typography>
                    <Typography variant="h6" sx={{ mt: "10px" }}>
                      WITH OUR HELP YOU CAN FIND THE EMPLOYEE YOU ARE LOOKING
                      FOR! Recruiting? Enter your email, Register in the
                    </Typography>
                    {/* <Button onClick={() => { navigate('/questionare') }}>Questionnaire</Button> */}
                  </div>
                </Grid>
                <Grid item xs={12} md={6} mt={5}>
                  {loginCheck ? (
                    <Login />
                  ) : (
                    <div>
                      <img src={bannerImg} alt="Banner" />
                    </div>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <div id="about"></div>

            <div class="bgcolor"></div>
            <Grid container id="Container" justifyContent="center">
              <Grid item xs={12} md={8} mb={5}>
                <div className="About_sec">
                  <div className="Center">
                    <Typography variant="h2">about us</Typography>
                    <Typography
                      variant="h5"
                      sx={{ display: "flex", lineHeight: "35px" }}
                    >
                      Today Every business can examine job candidates before
                      choosing what to hire. Your business is taken seriously by
                      the candidates. With the help of the website, you can
                      easily find an honest salesperson who knows how important
                      it is to meet goals. With the help of the website, you can
                      find a caring secretary who will take the burden off you.
                      And all easily and at good prices.
                    </Typography>
                  </div>
                </div>
              </Grid>
            </Grid>
            <div id="services"></div>
            <br />
            <br />
            <br />
            <br />
            <InfoTabs />
            <div className="Services_sec">
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={12} sx={{ textAlign: "center" }}>
                  <div className="Center">
                    <h2>our Services</h2>
                    <p>
                      Following are the services TestFactory is providing
                      currently.
                    </p>
                    <div className="Line"></div>
                  </div>
                </Grid>
              </Grid>
              <Grid container justifyContent="center" p={6}>
                <Grid item xs={12} sm={6} md={3}>
                  <div className="Serviceside">
                    <ul>
                      <li className="Development">
                        <a href="#services">
                          <h4>Intelligence Test</h4>
                        </a>
                      </li>
                    </ul>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <div className="Serviceside">
                    <ul>
                      <li className="Desdin">
                        <a href="#services">
                          <h4>Sales Test</h4>
                        </a>
                      </li>
                    </ul>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <div className="Serviceside">
                    <ul>
                      <li className="Concept">
                        <a href="#services">
                          <h4>Reliability test</h4>
                        </a>
                      </li>
                    </ul>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <div className="Serviceside">
                    <ul>
                      <li className="System">
                        <a href="#services">
                          <h4>Test in Hebrew</h4>
                        </a>
                      </li>
                    </ul>
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className="Pricing_sec" id="pricing">
              <div className="Center">
                <h2>Pricing</h2>
                <p>
                  Service Packages for every need. <br />
                </p>
                <div className="Line"></div>
                <br />
                <br />
                <br />
                <Grid container spacing={2}>
                  {packages.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4}>
                      <div className="Basic">
                        <h5>{item.packageName}</h5>
                      </div>
                      <br />
                      <div className="Dollar">
                        <h4>${item.packagePrice}</h4>
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
                      <br />=
                      <div className="Band">
                        <h5>{item.support}</h5>
                      </div>
                      <br />
                      <div className="Band last">
                        <button
                          onClick={() =>
                            navigate(
                              loginCheck ? "/dashboard/PricingPlace" : "/login"
                            )
                          }
                        >
                          Buy Now
                        </button>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
            <br />
            <br />
            <div id="contact"></div>
            <Container maxWidth="md">
              <Paper elevation={3} style={{ padding: "20px" }}>
                <Typography variant="h5" gutterBottom>
                  Contact Us
                </Typography>
                <form onSubmit={handleSubmit} className="custom-form">
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        variant="outlined"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        variant="outlined"
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        variant="outlined"
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="textarea"
                        label="Message"
                        multiline
                        rows={4}
                        variant="outlined"
                        required
                      />
                    </Grid>
                    <Grid
                      container
                      justify="flex-start"
                      style={{ marginLeft: "5px" }}
                    >
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Container>
            <br />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
