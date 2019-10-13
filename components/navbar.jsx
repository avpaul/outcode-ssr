import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled, { css } from 'styled-components';
// import updateSubject from '../src/services/updateService';

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
    font-family: 'Avenir';
    font-weight: 200;
    font-size: 38px;
    text-decoration: none;
    color: #17223b;

    @media (prefers-color-scheme: dark) {
      color: #ffffff;
    }

    @media only screen and (max-width: 768px) {
      font-size: 32px;
      min-width: 200px;
    }
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
      &.btn-follow-twitter i {
        color: #00acee;
      }
      @media only screen and (max-width: 768px) {
        height: 32px;
        width: 32px;
        font-size: 20px;
      }
      .zmdi {
        line-height: 36px;
      }
      @media (prefers-color-scheme: dark) {
        background-color: #202124;
      }
    }
  }
  @media (prefers-color-scheme: dark) {
    border-bottom-color: #ffffff;
  }
  @media only screen and (max-width: 768px) {
    height: 64px;
    margin-left: 8px;
    margin-right: 8px;
    padding-left: 8px;
    padding-right: 8px;
  }
`;

const UpdateButton = styled.div`
  position: absolute;
  bottom: -46px;
  right: 0;
  height: 44px;
  width: 325px;
  padding-left: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 200;
  background-color: #17223b;
  color: #ffffff;
  border-radius: 2px;
  z-index: 2000;
  box-shadow: 0 8px 17px 2px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);

  .btn {
    height: 36px;
    min-width: 36px;
    margin-left: 8px;
    font-size: 14px;
    font-family: 'Avenir';
    background-color: transparent;
    color: #f9a602;
    border: none;
    cursor: pointer;

    &:focus {
      outline: none;
    }

    &:active {
      outline: false;
    }

    &:last-of-type {
      color: #ffffff;
    }

    @media only screen and (max-width: 768px) {
      height: 32px;
      width: auto;
      font-size: 14px;
    }
  }
  @media (prefers-color-scheme: dark) {
    background-color: #343e3d;
  }
`;

const Navbar = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    // updateSubject.subscribe(data => {
    //   if (data.type === 'REQUEST_UPDATE_PERMISSION') setUpdateAvailable(true);
    // });
    // return () => {
    //   if (!updateSubject.closed) updateSubject.complete();
    // };
  }, []);

  return (
    <Nav>
      <Link href="/">
        <a className="nav-logo">
          outcode&nbsp;
          <span className="nav-tag">by paul</span>
        </a>
      </Link>
      <div className="nav-spacer" />
      <div className="menu-wrapper">
        <a
          href="https://twitter.com/av_depaul"
          target="_blank"
          rel="noopener noreferrer"
          title="Follow Me On Twitter"
          className="btn-follow-twitter"
        >
          <i className="zmdi zmdi-twitter" />
        </a>
        <a
          href="https://github.com/avpaul"
          target="_blank"
          rel="noopener noreferrer"
          title="Check My Github"
        >
          <i className="zmdi zmdi-github" />
        </a>
      </div>

      {updateAvailable && (
        <UpdateButton>
          <p>Outcode update available!</p>
          <button
            className="btn"
            type="button"
            title="Refresh to use the new version"
            onClick={evt => {
              evt.preventDefault();
              setUpdateAvailable(false);
              updateSubject.next({ type: 'UPDATE_PERMISSION_GRANTED' });
            }}
          >
            REFRESH
          </button>
          <button
            className="btn"
            type="button"
            title="Update later"
            onClick={evt => {
              evt.preventDefault();
              setUpdateAvailable(false);
              updateSubject.next({ type: 'UPDATE_PERMISSION_DENIED' });
            }}
          >
            &#10005;
          </button>
        </UpdateButton>
      )}
    </Nav>
  );
};

export default Navbar;
