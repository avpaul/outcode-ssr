import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import ArticleView from "./articleViewComponent/articleView";
import MainArticleView from "./mainArticle";
import { mainArticle } from "../helpers/data.js";
import { getMainArticles } from "../api/article";
import { subscriber } from "../services/themeService";

const SecondaryArticles = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ReloadBtn = styled.button`
  min-width: 64px;
  height: 36px;
  padding: 0 16px;
  text-transform: uppercase;
  font-weight: 500;
  text-align: center;
  font-size: 14px;
  line-height: 36px;
  text-decoration: none;
  box-shadow: none;
  border: 1px solid #6b778d;
  cursor: pointer;
  color: #6b778d;

  &:focus {
    outline: none;
  }
  &:hover {
    color: #ffffff;
    background-color: #6b778d;
  }
  ${props =>
    props.theme === "dark" &&
    css`
      color: #ffffff;
      border-color: #ffffff;
      background-color: transparent;
      &:hover {
        background-color: transparent;
      }
    `}
`;

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [theme, seTheme] = useState("light");

  const colors = [
    "#167C80",
    "#72616E",
    "#17223B",
    "#E8846B",
    "#16528E",
    "#FFC045"
  ];

  useEffect(() => {
    getMainArticles({ page: 0, limit: 7 })
      .then(({ data }) => {
        setArticles(data);
      })
      .catch(error => {
        console.log(error);
      });
    subscriber.subscribe(value => {
      seTheme(value);
    });
  }, []);
  return (
    <div style={{ marginTop: 32, marginBottom: 32 }}>
      <MainArticleView article={mainArticle} theme={theme} />
      <SecondaryArticles>
        {articles.map((article, index) => (
          <ArticleView
            bgColor={colors[index]}
            key={article.slug}
            article={article}
          />
        ))}
      </SecondaryArticles>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end"
        }}
      >
        <ReloadBtn theme={theme}>
          <i className="zmdi zmdi-replay" />
          &nbsp; load more
        </ReloadBtn>
      </div>
    </div>
  );
};

export default Home;
