import { useState, useEffect } from "react";
import "./app.css";
const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (time) => {
    return time.toLocaleTimeString("en-IN");
  };

  return (
    <footer className="footer">
      <p className="time">{formatTime(currentTime)}</p>
      <p>copyright © Ahmad 2023</p>
    </footer>
  );
};

export default Footer;
