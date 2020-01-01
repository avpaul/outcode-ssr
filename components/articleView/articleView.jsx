import React from 'react';
import Link from 'next/link';
import styled, { css } from 'styled-components';
import './articleView.scss';

const Container = styled.div`
  position: relative;
  width: 31%;
  height: 500px;
  margin-bottom: 48px;
  padding: 32px 24px;
  color: #ffffff;
  overflow: hidden;
  .article-title {
    display: inline-block;
    min-height: 96px;
    margin-bottom: 16px;
    font-size: 24px;
    line-height: 32px;
    font-weight: 600;
    text-decoration: none;
    color: #ffffff;
  }
  .article-description {
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;
  }
  &:hover .article-read-time {
    margin-left: 0;
    opacity: 1;
  }
  @media only screen and (max-width: 768px) {
    width: 100%;
    margin-bottom: 0;
    padding: 32px;
  }
  ${props =>
    props.backgroundColor &&
    css`
      background-color: ${props.backgroundColor};
    `}
`;

const ArticleView = ({ bgColor, article }) => {
  const formatTime = min => {
    if (min > 1) return `0${min} mins`;
    if (min === 1) return `01 min`;
    if (min <= 1) return `0${min} mins`;
  };

  return (
    <Container backgroundColor={bgColor}>
      <Link href={`/${article.slug}`}>
        <a className="article-title">{article.title}</a>
      </Link>
      <p
        className="article-description"
        dangerouslySetInnerHTML={{ __html: article.description }}
      ></p>
      <div className="article-read-time">
        <span role="img" aria-label="clock">
          🕑
        </span>
        &nbsp;{formatTime(article.readTime)}
      </div>
      <Link href={`/${article.slug}`}>
        <a className="btn-read-article" title="Read This Article">
          read more&nbsp;&nbsp;
          <i className="zmdi zmdi-long-arrow-right" />
        </a>
      </Link>
    </Container>
  );
};

export default ArticleView;
