import React from "react";

import Image from "next/image";

const Footer = () => {
  return (
    <footer className="footer">
      <a
        href="https://www.paymongo.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="logo">
          <Image
            src="/paymongo_logo.svg"
            alt="PayMongo Logo"
            width={120}
            height={32}
          />
        </span>
      </a>
      <div>
        <a href="https://dev.to/" target="_blank" rel="noopener noreferrer">
          Blog Tutorial
        </a>
        <a
          href="https://developers.paymongo.com/docs/testing"
          target="_blank"
          rel="noopener noreferrer"
        >
          Test Cards
        </a>
        <a
          href="https://developers.paymongo.com/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          PayMongo Docs
        </a>
      </div>
    </footer>
  );
};

export default Footer;
