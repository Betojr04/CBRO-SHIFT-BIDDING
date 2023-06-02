import React, { useState } from "react";

const BidForm = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/protected">Protected Page</a>
            </li>
          </ul>
        </nav>
      </header>

      <Route exact path="/" component={Home} />

      {isLoggedIn ? (
        <Route path="/protected" component={ProtectedPage} />
      ) : (
        <Route path="/protected" component={LoginPage} />
      )}
    </div>
  );
};

const Home = () => {
  return <h1>Welcome to the Home page</h1>;
};

const ProtectedPage = () => {
  const [bidValue, setBidValue] = useState("");

  const handleBidChange = (event) => {
    setBidValue(event.target.value);
  };

  const handleBidSubmit = (event) => {
    event.preventDefault();
    // Handle bid submission logic
    console.log("Bid submitted:", bidValue);
  };

  return (
    <div>
      <h1>Welcome to the Protected Page</h1>
      <form onSubmit={handleBidSubmit}>
        <label>
          Bid Amount:
          <input type="text" value={bidValue} onChange={handleBidChange} />
        </label>
        <button type="submit">Submit Bid</button>
      </form>
    </div>
  );
};

const LoginPage = ({ login }) => {
  const handleLogin = () => {
    login();
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default BidForm;
