const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      shifts: [], // added to store the list of shifts
      bidResponse: null, // added to store the response of submitting a bid
      error: null, // added to store the error message if there's any error while making a request
    },
    actions: {
      // Use getActions to call a function within a function
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          if (!resp.ok) {
            throw new Error('HTTP error ' + resp.status);
          }
          const data = await resp.json();
          setStore({ message: data.message, error: null }); // error is set to null when request is successful
          // returning data to resolve the Promise
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
          setStore({ error: error.message }); // set the error message in the store
          return error;
        }
      },

      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },

      loadShifts: async () => {
        try {
          const response = await fetch('http://your-api-url/shifts');
          if (!response.ok) {
            throw new Error('HTTP error ' + response.status);
          }
          const shifts = await response.json();
          setStore({ shifts, error: null }); // error is set to null when request is successful
          // returning shifts to resolve the Promise
          return shifts;
        } catch (error) {
          console.log('Failed to load shifts:', error);
          setStore({ error: error.message }); // set the error message in the store
          return error;
        }
      },

      submitBid: async (shiftId, userId) => {
        try {
          const response = await fetch('http://your-api-url/bids', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ shiftId, userId })
          });
          if (!response.ok) {
            throw new Error('HTTP error ' + response.status);
          }
          const bidResponse = await response.json();
          setStore({ bidResponse, error: null }); // error is set to null when request is successful
          // returning bidResponse to resolve the Promise
          return bidResponse;
        } catch (error) {
          console.log('Failed to submit bid:', error);
          setStore({ error: error.message }); // set the error message in the store
          return error;
        }
      }
    },
  };
};

export default getState;





// const getState = ({ getStore, getActions, setStore }) => {
//   return {
//     store: {
//       message: null,
//       demo: [
//         {
//           title: "FIRST",
//           background: "white",
//           initial: "white",
//         },
//         {
//           title: "SECOND",
//           background: "white",
//           initial: "white",
//         },
//       ],
//     },
//     actions: {
//       // Use getActions to call a function within a fuction
//       exampleFunction: () => {
//         getActions().changeColor(0, "green");
//       },
//       getMessage: async () => {
//         try {
//           // fetching data from the backend
//           const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
//           const data = await resp.json();
//           setStore({ message: data.message });
//           // don't forget to return something, that is how the async resolves
//           return data;
//         } catch (error) {
//           console.log("Error loading message from backend", error);
//         }
//       },
//       changeColor: (index, color) => {
//         //get the store
//         const store = getStore();

//         //we have to loop the entire demo array to look for the respective index
//         //and change its color
//         const demo = store.demo.map((elm, i) => {
//           if (i === index) elm.background = color;
//           return elm;
//         });

//         //reset the global store
//         setStore({ demo: demo });
//       },
//     },
//   };
// };

// export default getState;
