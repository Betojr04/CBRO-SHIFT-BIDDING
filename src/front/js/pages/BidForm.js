import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const BidForm = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/protected">Protected Page</Link>
              </li>
            </ul>
          </nav>
        </header>

        <Route exact path="/" component={Home} />

        <PrivateRoute
          path="/protected"
          component={ProtectedPage}
          isLoggedIn={isLoggedIn}
          redirectPath="/login"
        />

        <Route path="/login">
          <LoginPage login={login} />
        </Route>
      </div>
    </Router>
  );
};

const PrivateRoute = ({
  component: Component,
  isLoggedIn,
  redirectPath,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to={redirectPath} />
      }
    />
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
