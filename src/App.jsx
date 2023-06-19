import { useState } from "react";
import Login from "./login";
import Cards from "./cards";
import "./app.css";
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className=".App">
      {!isLoggedIn ? <Login setIsLoggedIn={setIsLoggedIn} /> : <Cards />}
    </div>
  );
};

export default App;
