import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h2>Activ Summarizer</h2>
          </div>
          {/* <div className="footer-section">
            <h4>PRODUCTS</h4>
            <ul>
              <li>
                <a href="#">Youtube Summary</a>
              </li>
              <li>
                <a href="#">Reddit Summary</a>
              </li>
              <li>
                <a href="#">Arxiv Summary</a>
              </li>
              <li>
                <a href="#">Comments Insights</a>
              </li>
            </ul>
          </div> */}
          <div className="footer-section">
            <h4>FOLLOW US</h4>
            <ul>
              <li>
                <a href="#">Discord</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>LEGAL</h4>
            <ul>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Activ Summarizer. All Rights Reserved.</p>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
