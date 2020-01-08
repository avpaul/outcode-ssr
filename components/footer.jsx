import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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

const FooterIconLeft = styled.div`
  border-right: 2px #6b778d solid;
  padding-left: 4px;
  padding-right: 4px;
  display: inline-block;

  div:first-of-type {
    color: #17223b;
    font-size: 32px;
    font-family: inherit;
  }

  div:last-of-type {
    color: #6b778d;
    text-align: right;
    font-family: inherit;
    font-size: 16px;
  }

  @media (prefers-color-scheme: dark) {
    border-right-color: #ffffff;
    div:first-of-type {
      color: #ffffff;
    }

    div:last-of-type {
      color: #ffffff;
    }
  }
`;

const FooterIconRight = styled.div`
  display: inline-block;
  padding-left: 4px;
  padding-right: 4px;
  font-family: inherit;
  font-size: 16px;
  color: #6b778d;

  @media (prefers-color-scheme: dark) {
    color: #ffffff;
  }
`;

const FooterIcon = styled.div`
  min-width: 350px;
  font-weight: 200;
  font-family: 'Avenir';
`;

const DesignLabel = styled.div`
  min-width: 350px;
  text-align: right;
  font-family: inherit;
  font-weight: 200;
  font-size: 18px;
  color: #6b778d;

  @media (prefers-color-scheme: dark) {
    color: #ffffff;
  }
`;

const Navbar = () => {
  const bloggingSince = `2019 - ${new Date().getFullYear()}`;
  return (
    <Footer>
      <FooterIcon>
        <FooterIconLeft>
          <div>outcode</div>
          <div>by paul</div>
        </FooterIconLeft>

        <FooterIconRight>
          <span>&#169;&nbsp;</span>
          <span>avpaul&nbsp; {bloggingSince}</span>
        </FooterIconRight>
      </FooterIcon>
      <div className="footer-spacer" />
      <DesignLabel>
        Designed with much&nbsp;
        <span role="img" aria-label="heart">
          ❤️&nbsp;
        </span>
        in&nbsp;
        <span role="img" aria-label="heart">
          🇷🇼
        </span>
      </DesignLabel>
    </Footer>
  );
};

export default Navbar;
