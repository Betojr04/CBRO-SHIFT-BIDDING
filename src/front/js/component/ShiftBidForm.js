import React, { useState } from "react";
import PropTypes from "prop-types";
import ShiftSelect from "./ShiftSelect";
import ChoicesList from "./ChoicesList";
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  form: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const ShiftBidForm = ({ shifts, seniority }) => {
  const [selectedShift, setSelectedShift] = useState("");
  const [choices, setChoices] = useState([]);

  const classes = useStyles();

  const handleShiftChange = (event) => {
    setSelectedShift(event.target.value);
  };

  const handleAddChoice = (event) => {
    event.preventDefault();
    if (choices.length < seniority && selectedShift) {
      setChoices([...choices, selectedShift]);
      setSelectedShift("");
    } else {
      alert("You can't add more choices");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would submit the user's choices to your API
    console.log(choices);
  };

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={6}>
        <Paper className={classes.root}>
          <Typography variant="h6">Shift Bid Form</Typography>
          <form onSubmit={handleSubmit} className={classes.form}>
            <ShiftSelect
              shifts={shifts}
              selectedShift={selectedShift}
              handleShiftChange={handleShiftChange}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddChoice}
              className={classes.button}
            >
              Add Choice
            </Button>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              className={classes.button}
            >
              Submit Bid
            </Button>
          </form>
          <ChoicesList choices={choices} shifts={shifts} />
        </Paper>
      </Grid>
    </Grid>
  );
};

ShiftBidForm.propTypes = {
  seniority: PropTypes.number.isRequired,
};

export default ShiftBidForm;
