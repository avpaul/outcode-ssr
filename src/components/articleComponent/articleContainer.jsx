import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Article from "./article";
import { getArticle } from "../../api/article";
import convertFromMarkdown from "../../helpers/markdownConverter";

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

const ArticleContainer = ({ match }) => {
  const [article, setArticle] = useState({ content: "", tags: [] });

  useEffect(() => {
    const { slug } = match.params;
    getArticle(slug)
      .then(({ data }) => {
        setArticle(data);
      })
      .catch(error => {});
  }, [match.params]);

  return (
    <Wrapper>
      <Article
        content={convertFromMarkdown(article.content)}
        tags={article.tags}
      />
      <ArticleInfo>
        <p>
          Written by <strong>{article.author}</strong>
        </p>
        <p>Published on {new Date(article.updatedAt).toDateString()}</p>
      </ArticleInfo>
      <Link to="/" className="btn--back-home">
        <i className="zmdi zmdi-long-arrow-left" />
        &nbsp; back home
      </Link>
    </Wrapper>
  );
};

export default ArticleContainer;
