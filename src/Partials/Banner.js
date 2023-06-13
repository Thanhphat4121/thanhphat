import React from "react";
import "./Banner.css";
function Banner() {
  return (
    <div className="banner">
      <img src={require("../images/nikeBanner.jpg")} alt="" />
    </div>
  );
}

export default Banner;
