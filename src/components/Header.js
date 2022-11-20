import "./Header.css";
import Login from "./Login.js";

import ImageUpload from "./imageUpload";
// import { useState } from "react";

export default function Header() {
  // const [uploadOpen, setUploadOpen] = useState(false);

  // const handleClick = () => {
  //   console.log("clicked");
  //   // setUploadOpen(true);
  // };
  return (
    <div className="header_wrapper">
      <div className="header_wrap">
      <a href='/'>
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="instagram logo"
          className="logo"
        />
      </a>

        <div className="header-right">
          <Login />
          {/* <ImageUpload />; */}
        </div>
      </div>
    </div>
  );
}
