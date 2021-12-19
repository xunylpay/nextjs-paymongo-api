import React from "react";

const Header = ({ subtitle }) => {
  return (
    <div>
      <h1 className="header-title">
        Using PayMongo with <a href="https://nextjs.org">Next.js!</a>
      </h1>
      <p>{subtitle}</p>
    </div>
  );
};

export default Header;
