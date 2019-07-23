import React from "react";
import styled from "styled-components";

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
`;

const Navbar = () => {
  return (
    <Footer>
      <div style={{ minWidth: 350, fontWeight: 300 }}>
        <div
          style={{
            borderRight: "2px #6B778D solid",
            padding: 8,
            display: "inline-block"
          }}
        >
          <div style={{ color: "#17223B", fontSize: 32 }}>outcode</div>
          <div style={{ color: "#6B778D", textAlign: "right" }}>by paul</div>
        </div>
        <div style={{ display: "inline-block", padding: 8, color: "#6B778D" }}>
          <span>&#169;&nbsp;</span>
          <span>avpaul&nbsp; 2019</span>
        </div>
      </div>
      <div className="footer-spacer" />
      <div style={{ minWidth: 300, color: "#6B778D" }}>
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
