import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { subscriber } from "../services/themeService";

const Footer = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding-top: 32px;
  padding-bottom: 54px;
  font-size: 24px;
  font-weight: 200;
  .footer-spacer {
    flex-basis: 100%;
  }
  @media only screen and (max-width: 768px) {
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    .footer-spacer {
      margin: 8px 0;
    }
  }
`;

const Navbar = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    subscriber.subscribe(value => {
      setTheme(value);
    });
  }, []);

  return (
    <Footer>
      <div style={{ minWidth: 350, fontWeight: 300 }}>
        <div
          style={{
            borderRight: "2px #6B778D solid",
            borderRightColor: `${theme === "dark" ? "#FFFFFF" : "#6B778D"}}`,
            paddingLeft: 4,
            paddingRight: 4,
            display: "inline-block"
          }}
        >
          <div
            style={{
              color: `${theme === "dark" ? "#FFFFFF" : "#17223B"}`,
              fontSize: 32,
              fontFamily: "Avenir"
            }}
          >
            outcode
          </div>
          <div
            style={{
              color: `${theme === "dark" ? "#FFFFFF" : "#6B778D"}`,
              textAlign: "right",
              fontFamily: "Avenir",
              fontSize: 16
            }}
          >
            by paul
          </div>
        </div>
        <div
          style={{
            display: "inline-block",
            paddingLeft: 4,
            paddingRight: 4,
            color: `${theme === "dark" ? "#FFFFFF" : "#6B778D"}`,
            fontFamily: "Avenir",
            fontSize: 16
          }}
        >
          <span>&#169;&nbsp;</span>
          <span>avpaul&nbsp; 2019</span>
        </div>
      </div>
      <div className="footer-spacer" />
      <div
        style={{
          minWidth: 350,
          color: `${theme === "dark" ? "#FFFFFF" : "#6B778D"}`,
          fontFamily: "Avenir",
          fontWeight: 200,
          fontSize: 18
        }}
      >
        Designed with much&nbsp;
        <span role="img" aria-label="heart">
          ❤️&nbsp;
        </span>
        in&nbsp;
        <span role="img" aria-label="heart">
          🇷🇼
        </span>
      </div>
    </Footer>
  );
};

export default Navbar;
