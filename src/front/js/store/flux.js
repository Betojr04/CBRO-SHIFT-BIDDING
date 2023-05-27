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
      bidResponse: null // added to store the response of submitting a bid
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
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
          setStore({ shifts });
        } catch (error) {
          console.log('Failed to load shifts:', error);
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
          setStore({ bidResponse });
        } catch (error) {
          console.log('Failed to submit bid:', error);
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
