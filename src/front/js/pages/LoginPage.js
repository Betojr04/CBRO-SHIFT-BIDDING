import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Container,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import "../../styles/loginpage.css";

const LoginPage = () => {
  const handleLogin = () => {
    // Perform login logic here
    // After successful login, redirect to "/bidform"
    // You can replace the code below with your actual login logic
    const isLoggedIn = true; // Replace with the result of your login logic

    if (isLoggedIn) {
      window.location.href = "/shiftidform";
    } else {
      // Handle login error
      alert("Login failed. Please try again.");
    }
  };

  return (
    <Container>
      <Box py={10}>
        <Grid container spacing={3} direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h2" gutterBottom>
              Make sure to submit your shift bid before May 12th at 8am.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8} md={6}>
            <TextField
              required
              fullWidth
              id="username"
              label="Username"
              variant="outlined"
              margin="normal"
            />
            <TextField
              required
              fullWidth
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
            />
            <Box mt={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={handleLogin}
              >
                Log in
              </Button>
            </Box>
            <Box mt={2}>
              <Typography variant="body1">
                Don't have an account?{" "}
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  Sign up
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default LoginPage;
