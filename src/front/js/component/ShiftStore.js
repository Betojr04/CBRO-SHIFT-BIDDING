import { ReduceStore } from "flux/utils";
import AppDispatcher from "./AppDispatcher";
import ShiftConstants from "./ShiftConstants";

class ShiftStore extends ReduceStore {
  constructor() {
    super(AppDispatcher);
  }

  getInitialState() {
    return [];
  }

  reduce(state, action) {
    switch (action.type) {
      case ShiftConstants.FETCH_SHIFTS:
        return action.value;
      case ShiftConstants.SUBMIT_BID:
        return [...state, action.value]; // Depending on your specific logic, you may want to do more than just adding the new bid to the state.
      default:
        return state;
    }
  }
}

export default new ShiftStore();
