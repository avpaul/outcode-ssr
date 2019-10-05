import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { subscriber } from '../../services/themeService';
import notFoundImage from '../../assets/notfound.png';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 600px;
`;

const ImageWrapper = styled.div`
  height: 300px;
  img {
    height: 100%;
  }
`;

const Caption = styled.div`
  padding: 8px;
  margin-top: 8px;
  margin-bottom: 8px;
  font-family: 'Avenir';
  font-weight: 200;
  font-size: 24px;
  color: #17223b;
  ${props =>
    props.theme === 'dark' &&
    css`
      color: #ffffff;
    `}
`;

const NotFoundPage = () => {
  const [theme, setTheme] = useState(subscriber.value);
  useEffect(() => {
    subscriber.subscribe(value => {
      setTheme(value);
    });
  });

  return (
    <Wrapper>
      <ImageWrapper>
        <img src={notFoundImage} alt="page not found" />
      </ImageWrapper>
      <Caption theme={theme}>
        Ooops&nbsp;
        <span role="img" aria-label="thinking emoji">
          🤔
        </span>
        &nbsp; Seems like you are lost in space!
      </Caption>
      <Link
        to="/"
        className={`btn--back-home page-not-found ${
          theme === 'dark' ? 'theme-dark' : ''
        }`}
      >
        <i className="zmdi zmdi-long-arrow-left" />
        &nbsp;&nbsp;back to planet earth
      </Link>
    </Wrapper>
  );
};

export default NotFoundPage;
