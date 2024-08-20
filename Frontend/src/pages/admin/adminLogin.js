import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { adminlogin } from "../../apiCalls/apiRoutes";
import { apiCall } from "../../apiCalls/apiCalls";
import { toast } from "react-toastify";
import { Container, Grid, Paper, TextField, Button, Typography } from "@mui/material";

function AdminLogin() {
    const navigate = useNavigate();

    const showToastMessage = (text, color, notify) => {
        if (notify === 1) {
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
        role: 1,
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
            navigate("/admin/dashboard/tests");
        }, 500);
    };

    const adminLoginHandler = (e) => {
        e.preventDefault();
        setConfirmationText("");
        apiCall("post", adminlogin, fetchedData)
            .then((res) => {
                if (res.status === 200) {
                    showToastMessage("Admin Logged in Successfully ", "green", 1);
                    successHandler(res?.data?.data?.token);
                }
            })
            .catch((err) => {
                showToastMessage(err?.response?.data?.message, "red", 2);
            });
    };

    return (
        <Container m={2}>
            <Grid
                mt={5}
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
            >
                <Grid item xs={12} sm={8} md={6} lg={4}>
                    <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
                        <Typography variant="h5" gutterBottom>
                            Admin Login Panel
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Welcome back. Please sign in to access your account.
                        </Typography>
                        <form onSubmit={adminLoginHandler}>
                            <TextField
                                type="email"
                                onChange={valueAdder}
                                label="Email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                id="email"
                                required
                            />
                            <TextField
                                type="password"
                                onChange={valueAdder}
                                label="Password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                id="password"
                                required
                            />
                            <Button className="w-1/4 " type="submit" variant="contained" color="primary" >
                                Admin Login
                            </Button>
                        </form>
                        <p style={{ color: "red" }}>{confirmationText}</p>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default AdminLogin;
