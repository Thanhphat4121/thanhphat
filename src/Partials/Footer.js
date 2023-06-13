import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import "./Footer.css";
export default function Footer() {
  return (
    <div className="footer">
      <div className="sponsor">
        <div className="sponsor-items">
          <img src="https://logowik.com/content/uploads/images/697_nike.jpg" />
        </div>
        
      </div>
      <div className="contact">
        <div className="contact-items">
          <a href="https://www.facebook.com/">
            {" "}
            <FaFacebookF />
          </a>
        </div>
        <div className="contact-items">
          <FaInstagram />
        </div>
        <div className="contact-items">
          <FiTwitter />
        </div>
      </div>
      <div className="author">
         <br />
       ☻ Thành Phát - Trúc Ngân - Diễm My ♥
      </div>
    </div>
  );
}
