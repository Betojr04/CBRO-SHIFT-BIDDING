import React, { useContext } from "react";
import { Context } from "../store/appContext";
import ShiftBidForm from "../component/ShiftBidForm";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      <ShiftBidForm />
    </div>
  );
};
