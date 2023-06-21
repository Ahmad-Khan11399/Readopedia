import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; // Import the Firebase auth instance
import "./app.css";
import Header from "./header";
const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // User logged in successfully
      console.log("User logged in");
      setIsLoggedIn(true);
    } catch (error) {
      // Handle login error
      console.error("Login error:", error);
    }
  };

  return (
    <div className="main">
      <Header />
      <div className="popup">
        <h2 className="sub-heading">Login</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              className="log"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              className="log"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <br />
          <button className="log-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
