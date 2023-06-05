import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Grid,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  form: {
    width: "300px", // Adjust the width as needed
    marginTop: theme.spacing(3),
  },
  submitButton: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignupForm = () => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Handle the registration logic here
    // Example:
    if (formData.email && formData.password) {
      // Perform the registration logic
      // Registration successful, redirect to the login page or show success message
      // Use Link component for navigation
      return <Link to="/" />;
    } else {
      // Registration failed, display an error message
      alert("Failed to register. Please try again.");
    }
  };

  return (
    <Container className={classes.container}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submitButton}
          component={Link}
          to="/"
        >
          Sign Up
        </Button>
      </form>
    </Container>
  );
};

export default SignupForm;
