import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./articleView.scss";

const Container = styled.div`
  position: relative;
  width: 31%;
  height: 500px;
  margin-bottom: 50px;
  padding: 32px 24px;
  color: #ffffff;
  .article-title {
    display: inline-block;
    height: 120px;
    margin-bottom: 16px;
    font-size: 30px;
    font-weight: 700;
    text-decoration: none;
    color: #ffffff;
  }
  .article-description {
    font-size: 24px;
    font-weight: 200;
  }
  @media only screen and (max-width: 768px) {
    width: 100%;
    margin-bottom: 0;
    padding: 32px;
  }
`;

const ArticleView = ({ bgColor, article }) => {
  return (
    <Container style={{ backgroundColor: bgColor }}>
      <Link to={`/${article.slug}`} className="article-title">
        {article.title}
      </Link>
      <p className="article-description">{article.description}</p>
      <Link
        to={`/${article.slug}`}
        className="btn-read-article"
        title="Read The Article"
      >
        read more&nbsp;&nbsp;
        <i className="zmdi zmdi-long-arrow-right" />
      </Link>
    </Container>
  );
};

export default ArticleView;
