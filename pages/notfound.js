import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled, { css } from 'styled-components';

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
  font-family: inherit;
  font-weight: 200;
  font-size: 24px;
  color: #17223b;
  @media (prefers-color-scheme: dark) {
    color: #ffffff;
  }
`;

const NotFoundPage = () => {
  return (
    <Wrapper>
      <ImageWrapper>
        <img src="/notfound.png" alt="page not found" />
      </ImageWrapper>
      <Caption>
        Ooops&nbsp;
        <span role="img" aria-label="thinking emoji">
          🤔
        </span>
        &nbsp; Seems like you are lost in space!
      </Caption>
      <Link href="/">
        <a className="btn--back-home page-not-found">
          <i className="zmdi zmdi-long-arrow-left" />
          &nbsp;&nbsp;back to planet earth
        </a>
      </Link>
    </Wrapper>
  );
};

export default NotFoundPage;
