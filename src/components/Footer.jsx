import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-left">
          <h3>⚡ BrainBoost</h3>
          <p>Sharpen your mind. Track your progress. Level up.</p>
          <pre className="footer-madeby">
            Made with ❤️ by Team BlackHats
            
          </pre>
          <p>Website By: Akshita</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/games">Games</a></li>
            <li><a href="/scoreboard">Scoreboard</a></li>
            <li><a href="/profile">Profile</a></li>
          </ul>
        </div>

        <div className="footer-right">
          <h4>Contact</h4>
          <p>Email: madocdigital@gmail.com</p>
          <p>Contact  8847063226</p>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} BrainUp. All Rights Reserved.
      </div>
    </footer>
  );
}
