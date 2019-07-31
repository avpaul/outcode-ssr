import React from "react";
import styled from "styled-components";
import Article from "./article";
import { Link } from "react-router-dom";

const ArticleInfo = styled.div`
  padding-top: 16px;
  padding-bottom: 32px;
  p {
    padding-top: 8px;
    font-family: "Avenir";
    font-weight: 200;
    color: #17223b;
  }
`;
const Wrapper = styled.div`
  margin-top: 36px;
  margin-bottom: 16px;
`;

const ArticleContainer = () => {
  return (
    <Wrapper>
      <Article content="" />
      <ArticleInfo>
        <p>
          Written by <strong>Paul</strong>
        </p>
        <p>Published 23rd July 2019</p>
      </ArticleInfo>
      <Link to="/" className="btn--back-home">
        <i className="zmdi zmdi-long-arrow-left" />
        &nbsp; back home
      </Link>
    </Wrapper>
  );
};

export default ArticleContainer;
