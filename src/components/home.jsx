import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import ArticleView from "./articleViewComponent/articleView";
import SummaryBio from "./summaryBioComponent/summaryBio";
import { getMainArticles } from "../api/article";
import { subscriber } from "../services/themeService";
import reduceTo from "../helpers/reduceTo";
import Loader from "./loaderComponent/loader";

const SecondaryArticles = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 16px;
  }
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
  background-color: transparent;

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
  @media only screen and (max-width: 768px) {
    margin-right: 16px;
  }
`;

const Heading = styled.h1`
  margin: 16px 0;
  font-size: 36px;
  color: #17223b;
  ${props =>
    props.theme === "dark" &&
    css`
      color: #ffffff;
    `}
  @media only screen and (max-width: 768px) {
    margin: 16px 0 8px 16px;
  }
`;

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, seTheme] = useState("light");
  const [page, setPage] = useState(0);

  const colors = [
    "#167C80",
    "#72616E",
    "#B33951",
    "#E8846B",
    "#16528E",
    "#FFC914"
  ];

  useEffect(() => {
    getMainArticles({ page: 0, limit: 6 })
      .then(({ data }) => {
        setArticles(data);
        setLoading(false);
      })
      .catch(error => {
        setArticles([]);
        setLoading(false);
        console.log(error);
      });
    subscriber.subscribe(value => {
      seTheme(value);
    });
  }, []);

  const loadMore = () => {
    setPage(page + 1);
    setLoading(true);
    getMainArticles({ page: page + 1, limit: 6 })
      .then(({ data }) => {
        setArticles(articles.concat(data));
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
  };

  return (
    <div style={{ marginTop: 32, marginBottom: 32 }}>
      <SummaryBio theme={theme} />
      <Heading theme={theme}>Recent articles:</Heading>
      {articles && (
        <SecondaryArticles>
          {articles.map((article, index) => (
            <ArticleView
              bgColor={colors[reduceTo(index, 5)]}
              key={article.slug}
              article={article}
            />
          ))}
        </SecondaryArticles>
      )}
      {loading && <Loader theme={theme} size="small" />}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end"
        }}
      >
        {(articles || loading) && (
          <ReloadBtn
            theme={theme}
            onClick={loadMore}
            type="button"
            title="Load More Articles"
          >
            <i className="zmdi zmdi-replay" />
            &nbsp; load more
          </ReloadBtn>
        )}
      </div>
    </div>
  );
};

export default Home;
