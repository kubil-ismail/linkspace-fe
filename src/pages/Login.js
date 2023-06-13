import {
  Box,
  Card,
  Grid,
  CardContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import http from "utils/http";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    http
      .post("/auth/login", { email, password })
      .then((result) => {
        console.log(result.data.data.token);
        localStorage.setItem("token", result.data.data.token);
        localStorage.setItem(
          "profile",
          JSON.stringify(result.data.data.result)
        );

        setInterval(() => {
          if (localStorage.getItem("token")) window.location.href = "/profile";
        }, 1000);
      })
      .catch((result) => {
        const { email, password } = result?.response?.data?.messages;

        Swal.fire({
          title: "Login denied",
          html:
            email?.message ??
            password?.message ??
            result?.response?.data?.messages ??
            "Something wrong, try again later",
          icon: "error",
          timer: 2000,
          showCancelButton: false,
          showConfirmButton: false,
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Box>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        height="100vh"
        sx={{
          background: "rgb(5,97,172)",
          background:
            "radial-gradient(circle, rgba(5,97,172,1) 29%, rgba(0,118,214,1) 70%)",
        }}
      >
        <Grid item md={3}>
          <Card>
            <CardContent>
              <Typography
                align="center"
                variant="h3"
                color="primary"
                sx={{ mb: 4, mt: 3 }}
              >
                Login
              </Typography>
              <form onSubmit={handleLogin}>
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                  id="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  type="password"
                  sx={{ mb: 1 }}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Login"}
                </Button>
              </form>

              <Typography align="center" mt={2}>
                Don't have an account ?{" "}
                <Link to="/register">
                  <Box
                    component="span"
                    sx={{ color: (props) => props.palette.primary.main }}
                  >
                    Sign Up
                  </Box>
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;
