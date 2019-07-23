import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 31%;
  height: 500px;
  margin-bottom: 50px;
  padding: 32px 24px;
  color: #ffffff;
  .article-title {
    height: 120px;
    margin-bottom: 16px;
    font-size: 32px;
    font-weight: 700;
  }
  .article-description {
    font-size: 24px;
    font-weight: 200;
  }
`;

const ReadMoreButton = styled.button`
  position: absolute;
  right: 8px;
  bottom: 8px;
  min-width: 64px;
  height: 36px;
  padding: 0 16px;
  text-transform: capitalize;
  font-weight: 500;
  text-align: center;
  font-size: 14px;
  line-height: 36px;
  text-decoration: none;
  box-shadow: none;
  cursor: pointer;
  background-color: transparent;
  color: #ffffff;
  border: none;

  &:focus {
    outline: none;
  }
  &:hover {
    color: #ffffff;
    // border: 1px solid #ffffff;
  }
`;

const ArticleView = ({ bgColor, article }) => {
  return (
    <Container style={{ backgroundColor: bgColor }}>
      <h2 className="article-title">{article.title}</h2>
      <p className="article-description">{article.description}</p>
      <ReadMoreButton>
        read more&nbsp;&nbsp;
        <i className="zmdi zmdi-long-arrow-right" />
      </ReadMoreButton>
    </Container>
  );
};

export default ArticleView;
