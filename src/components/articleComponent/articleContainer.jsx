import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import Article from "./article";
import { getArticle } from "../../api/article";
import convertFromMarkdown from "../../helpers/markdownConverter";
import { subscriber } from "../../services/themeService";

const ArticleInfo = styled.div`
  padding-top: 16px;
  padding-bottom: 32px;
  p {
    padding-top: 8px;
    font-family: "Avenir";
    font-weight: 200;
    color: #17223b;
    ${props =>
      props.theme === "dark" &&
      css`
        color: #ffffff;
      `}
  }
`;
const Wrapper = styled.div`
  margin-top: 36px;
  margin-bottom: 16px;
`;

const ArticleContainer = ({ match }) => {
  const [article, setArticle] = useState({ content: "", tags: [] });
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const { slug } = match.params;
    getArticle(slug)
      .then(({ data }) => {
        setArticle(data);
      })
      .catch(error => {});
    subscriber.subscribe(value => {
      setTheme(value);
    });
  }, [match.params]);

  return (
    <Wrapper>
      <Article
        content={convertFromMarkdown(article.content)}
        tags={article.tags}
        theme={theme}
      />
      <ArticleInfo theme={theme}>
        <p>
          Written by <strong>{article.author}</strong>
        </p>
        <p>Published on {new Date(article.updatedAt).toDateString()}</p>
      </ArticleInfo>
      <Link
        to="/"
        className={`btn--back-home ${theme === "dark" ? "theme-dark" : ""}`}
      >
        <i className="zmdi zmdi-long-arrow-left" />
        &nbsp; back home
      </Link>
    </Wrapper>
  );
};

export default ArticleContainer;
