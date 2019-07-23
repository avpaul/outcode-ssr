import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 100%;
  padding: 8px 0;
  margin-bottom: 24px;
  .article-title {
    margin-top: 16px;
    margin-bottom: 8px;
    font-size: 32px;
    font-weight: 700;
    color: #17223b;
  }
  .article-description {
    font-size: 24px;
    font-weight: 200;
    color: #6b778d;
  }
`;

const ImgContainer = styled.div`
  height: 500px;
`;
const Image = styled.img`
  height: 100%;
  width: 100%;
`;

const ReadMoreButton = styled.button`
  position: absolute;
  right: 0;
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
  border: none;
  cursor: pointer;
  color: #6b778d;

  &:focus {
    outline: none;
  }
  &:hover {
    color: #17223b;
    // background-color: #6b778d;
  }
`;

const ArticleView = ({ article }) => {
  return (
    <Container>
      <ImgContainer>
        <Image src={article.image} />
      </ImgContainer>
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
