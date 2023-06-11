const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      error: null,
      demo: [
        { title: "FIRST", background: "white", initial: "white" },
        { title: "SECOND", background: "white", initial: "white" },
      ],
      shifts: [],
      bidError: null,
      shiftError: null,
      isLoggedIn: false,
      currentUser: null,
    },
    actions: {
      exampleFunction: () => {
        actions.changeColor(0, "green");
      },
      getMessage: async () => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore((store) => ({ ...store, message: data.message }));
          return true;
        } catch (error) {
          console.error("Error loading message from backend", error);
          return false;
        }
      },
      changeColor: (index, color) => {
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });
        setStore((store) => ({ ...store, demo: demo }));
      },
      fetchShifts: async () => {
        try {
          const response = await fetch("/api/shifts");
          if (!response.ok) {
            throw new Error("Unable to fetch shifts.");
          }
          const shifts = await response.json();
          setStore((store) => ({ ...store, shifts: shifts, shiftError: null }));
          return true;
        } catch (error) {
          setStore((store) => ({
            ...store,
            shiftError: "Failed to fetch shifts. Please try again.",
          }));
          console.error("Error:", error);
          return false;
        }
      },
      submitBid: async (shiftId, bid) => {
        try {
          const response = await fetch(`/api/shifts/${shiftId}/bids`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bid }),
          });
          if (!response.ok) {
            throw new Error("Unable to submit bid.");
          }
          const updatedShift = await response.json();
          setStore((store) => {
            const shifts = store.shifts.map((shift) =>
              shift.id === shiftId ? updatedShift : shift
            );
            return { ...store, shifts: shifts, bidError: null };
          });
          return true;
        } catch (error) {
          setStore((store) => ({
            ...store,
            bidError: "Failed to submit bid. Please try again.",
          }));
          console.error("Error:", error);
          return false;
        }
      },
      registerUser: async (userData) => {
        try {
          const response = await fetch("/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
          });
          if (!response.ok) {
            throw new Error("Failed to register user.");
          }
          return true;
        } catch (error) {
          console.error("Error:", error);
          return false;
        }
      },
      loginUser: async (email, password) => {
        try {
          const response = await fetch("/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            const error = await response.json();
            console.log("Login error:", error.error);
            throw new Error(error.error);
          }

          const data = await response.json();
          // Save the access token to local storage or state, depending on your implementation
          localStorage.setItem("accessToken", data.access_token);
          console.log("Login successful");

          // Return any data that you want to pass back to the component
          return data;
        } catch (error) {
          console.log("Error logging in user", error);
          throw error;
        }
      },
      logoutUser: () => {
        localStorage.removeItem("accessToken");
        setStore({ isLoggedIn: false, currentUser: null });
      },
    },
  };
};

export default getState;
