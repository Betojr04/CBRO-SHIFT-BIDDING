import React, { useState, Context } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submitButton: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUpPage = () => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      return "Passwords do not match";
    }

    // Add more validation rules if needed

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      alert(validationError);
      return;
    }

    // Call the registerUser action to handle the registration
    actions
      .registerUser(formData)
      .then((success) => {
        if (success) {
          // Registration successful, redirect to the login page
          window.location.href = "/login";
        } else {
          // Registration failed, display an error message
          alert("Failed to register. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Registration error:", error);
        alert("An error occurred during registration. Please try again later.");
      });
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <div>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
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
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default SignUpPage;
