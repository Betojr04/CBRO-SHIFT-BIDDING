import React, { useEffect, useState } from "react";
import ShiftActions from "./ShiftActions";
import ShiftStore from "./ShiftStore";

export default function ShiftBiddingPage() {
  const [shifts, setShifts] = useState(ShiftStore.getState());

  useEffect(() => {
    ShiftStore.addListener(handleStoreChange);
    ShiftActions.fetchShifts();
    return () => {
      ShiftStore.removeListener(handleStoreChange);
    };
  }, []);

  const handleStoreChange = () => {
    setShifts(ShiftStore.getState());
  };

  const handleSubmitBid = (bid) => {
    ShiftActions.submitBid(bid);
  };

  return (
    <div>
      <h1>Available Shifts</h1>
      <ul>
        {shifts.map((shift) => (
          <li key={shift.id}>{shift.name}</li>
        ))}
      </ul>

      <form onSubmit={handleSubmitBid}>
        <label>
          Select Shift:
          <select
            value={selectedShift}
            onChange={(e) => setSelectedShift(e.target.value)}
          >
            <option value="">--Please choose a shift--</option>
            {shifts.map((shift) => (
              <option key={shift.id} value={shift.id}>
                {shift.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Your Bid:
          <input
            type="number"
            value={bid}
            onChange={(e) => setBid(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit Bid</button>
      </form>
    </div>
  );
}
