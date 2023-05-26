import AppDispatcher from "./AppDispatcher";
import ShiftConstants from "./ShiftConstants";

const ShiftActions = {
  fetchShifts: function () {
    fetch("/api/shifts")
      .then((response) => response.json())
      .then((data) => {
        AppDispatcher.dispatch({
          actionType: ShiftConstants.FETCH_SHIFTS,
          value: data,
        });
      });
  },

  submitBid: function (bid) {
    fetch("/api/shifts/bid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bid),
    })
      .then((response) => response.json())
      .then((data) => {
        AppDispatcher.dispatch({
          actionType: ShiftConstants.SUBMIT_BID,
          value: data,
        });
      });
  },
};

export default ShiftActions;
