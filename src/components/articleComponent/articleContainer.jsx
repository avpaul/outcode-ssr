import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import Article from "./article";
import { getArticle } from "../../api/article";
import convertFromMarkdown from "../../helpers/markdownConverter";
import { subscriber } from "../../services/themeService";
import Loader from "../loaderComponent/loader";
import NotFoundPage from "../notFoundComponent/notFound";
import profileImage from "../../assets/profile-image.png";


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
  a {
    color: inherit;
  }
`;

const Wrapper = styled.div`
  width: 95%;
  margin: 36px auto 16px;
  @media only screen and (max-width: 768px) {
    padding-left: 16px;
    padding-right: 16px;
  }
`;

const ArticleContainer = ({ match }) => {
  const [article, setArticle] = useState({ content: "", tags: [] });
  const [theme, setTheme] = useState(subscriber.value);
  const [isSlug, setIsSlug] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = article.title || "Loading...";
    return () => {
      document.title = "Outcode by Paul";
    };
  }, [article]);

  useEffect(() => {
    let abort = false;
    const slug = match.params.slug;
    if (!slug.split("-", 2)[1]) {
      abort = true;
      setIsSlug(false);
    }
    if (!abort) {
      getArticle(slug)
        .then(({ data }) => {
          setLoading(false);
          setArticle(data);
        })
        .catch(error => {
          setIsSlug(false);
        });
      subscriber.subscribe(value => {
        setTheme(value);
      });
    }
  }, [match.params.slug]);

  const formatTime = min => {
    if (min > 1) return `0${min} mins`;
    if (min === 1) return `01 min`;
    if (min <= 1) return `0${min} mins`;
  };

  const formatContent = () => {
    const content = convertFromMarkdown(article.content).split(/<\/h1>/);

    const headerContent = `
        <div class="article-header">
         <div class="profile-image">
            <img src=${profileImage} alt="av paul" />
          </div>
          <div>
            <p>
              Last Updated on ${new Date(article.updatedAt).toDateString()}
            </p>
            <p>${formatTime(article.readTime)}&nbsp;read</p>
          </div>
        </div>
      `;
    return [content[0], "</h1>", headerContent, content[1]].join("");
  };

  return isSlug ? (
    <Wrapper>
      {loading ? (
        <Loader theme={theme} size="small" />
      ) : (
        <>
          {/* <div
            className={`article-header ${theme === "dark" ? "theme-dark" : ""}`}
          >
            <ProfileImage>
              <img src={profileImage} alt="av paul" />
            </ProfileImage>
            <div>
              <p>
                Last Updated on {new Date(article.updatedAt).toDateString()}
              </p>
              <p>{formatTime(article.readTime)}&nbsp;read</p>
            </div>
          </div> */}
          <Article
            content={formatContent()}
            tags={article.tags}
            theme={theme}
          />
          <ArticleInfo theme={theme}>
            <p>
              Written by&nbsp;
              <Link to="/">
                <strong>{article.author}</strong>
              </Link>
            </p>
            <p>
              First Published on {new Date(article.createdAt).toDateString()}
            </p>
          </ArticleInfo>
          <Link
            to="/"
            className={`btn--back-home ${theme === "dark" ? "theme-dark" : ""}`}
          >
            <i className="zmdi zmdi-long-arrow-left" />
            &nbsp; back home
          </Link>{" "}
        </>
      )}
    </Wrapper>
  ) : (
    <NotFoundPage />
  );
};

export default ArticleContainer;
