import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { subscriber, themeUpdateService } from "../services/themeService";

const Nav = styled.nav`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-contents: center;
  height: 80px;
  padding: 16px 0;
  border-bottom: 1px solid #6b778d;
  .nav-logo {
    min-width: 300px;
    font-family: "Avenir";
    font-weight: 200;
    font-size: 38px;
    text-decoration: none;
    color: #17223b;
    ${props =>
      props.theme === "dark" &&
      css`
        color: #ffffff;
      `}
  }
  .nav-tag {
    font-size: 20px;
    font-weight: 500;
    color: #6b778d;
  }
  .nav-spacer {
    flex-basis: 100%;
  }
  .menu-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    a {
      height: 36px;
      width: 36px;
      margin-right: 8px;
      font-size: 22px;
      text-decoration: none;
      line-height: 36px;
      text-align: center;
      background-color: #17223b;
      color: #ffffff;
      border: none;
      border-radius: 50%;
    }
  }
  ${props =>
    props.theme === "dark" &&
    css`
      border-bottom-color: #ffffff;
    `}
`;

const ThemeButton = styled.button`
  height: 36px;
  width: 36px;
  font-size: 24px;
  background-color: #17223b;
  color: #f9a602;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:active {
    outline: false;
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
    <Nav theme={theme}>
      <Link className="nav-logo" to="/">
        outcode&nbsp;
        <span className="nav-tag">by paul</span>
      </Link>
      <div className="nav-spacer" />
      <div className="menu-wrapper">
        <a href="https://twitter.com/av_depaul">
          <i className="zmdi zmdi-twitter" />
        </a>
        <a href="https://github.com/avpaul">
          <i className="zmdi zmdi-github" />
        </a>

        <ThemeButton
          onClick={evt => {
            evt.preventDefault();
            if (theme === "light") {
              themeUpdateService.set("dark");
            } else themeUpdateService.set("light");
          }}
        >
          {theme === "light" ? (
            <i className="zmdi zmdi-brightness-2" />
          ) : (
            <i className="zmdi zmdi-brightness-7" />
          )}
        </ThemeButton>
      </div>
    </Nav>
  );
};

export default Navbar;
