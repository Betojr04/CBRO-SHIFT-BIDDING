import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  Divider,
  Button,
} from "@material-ui/core";

export const HelpPage = () => {
  const handleEmailClick = () => {
    window.location.href = "mailto:scheduling-department@example.com";
  };
  return (
    <Box p={3}>
      <Typography variant="h2" gutterBottom>
        Help & Support
      </Typography>
      <Divider />

      <Box my={2}>
        <Typography variant="h5" gutterBottom>
          How to Submit a Shift Bid
        </Typography>
        <Typography variant="body1">
          1. Navigate to the "Shift Bidding" section.
        </Typography>
        <Typography variant="body1">2. Select the desired shift.</Typography>
        <Typography variant="body1">
          3. Click "Submit" to place your bid.
        </Typography>
      </Box>

      <Box my={2}>
        <Typography variant="h5" gutterBottom>
          Troubleshooting
        </Typography>
        <List>
          <ListItem>
            <Typography variant="body1">
              - If you're having trouble submitting a bid, ensure you have an
              active internet connection and try again.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1">
              - If the problem persists, try refreshing the page or logging out
              and back in.
            </Typography>
          </ListItem>
        </List>
      </Box>

      <Box my={2}>
        <Typography variant="h5" gutterBottom>
          Frequently Asked Questions
        </Typography>
        <Typography variant="body1">
          Q: Can I change my shift bid once it's submitted?
        </Typography>
        <Typography variant="body1">
          A: Yes, you can change your bid any time before the bidding period
          ends.
        </Typography>
        <Typography variant="body1">
          Q: What happens if two people bid for the same shift?
        </Typography>
        <Typography variant="body1">
          A: In case of a tie, the shift will be assigned based on seniority.
        </Typography>
      </Box>
      <Box my={2}>
        <Typography variant="h5" gutterBottom>
          Still Need Help?
        </Typography>
        <Typography variant="body1">
          If you can't find the answer you're looking for, feel free to reach
          out to our scheduling department.
        </Typography>
        <Button variant="outlined" color="primary" onClick={handleEmailClick}>
          Contact Scheduling Department
        </Button>
      </Box>
    </Box>
  );
};
