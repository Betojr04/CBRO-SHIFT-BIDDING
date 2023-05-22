import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Container,
} from "@material-ui/core";

const LoginPage = () => {
  return (
    <Container>
      <Box py={10}>
        <Grid container spacing={3} direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h2" gutterBottom>
              Log in to submit your shift bid.
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
              >
                Log in
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default LoginPage;
