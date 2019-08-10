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

const ArticleView = ({ bgColor, article }) => {
  return (
    <Container style={{ backgroundColor: bgColor }}>
      <h2 className="article-title">{article.title}</h2>
      <p className="article-description">{article.description}</p>
      <Link to={`/${article.slug}`} className="btn-read-article">
        read more&nbsp;&nbsp;
        <i className="zmdi zmdi-long-arrow-right" />
      </Link>
    </Container>
  );
};

export default ArticleView;
