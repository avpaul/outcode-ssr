import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import Article from './article';
import { getArticle } from '../../api/article';
import convertFromMarkdown from '../../helpers/markdownConverter';
import { subscriber } from '../../services/themeService';
import Loader from '../loaderComponent/loader';
import NotFoundPage from '../notFoundComponent/notFound';
import profileImage from '../../assets/profile-image.png';

const ArticleInfo = styled.div`
  padding-top: 16px;
  padding-bottom: 32px;
  p {
    padding-top: 8px;
    font-family: 'Avenir';
    font-weight: 200;
    color: #17223b;
    ${props =>
      props.theme === 'dark' &&
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
  const [article, setArticle] = useState({ content: '', tags: [] });
  const [theme, setTheme] = useState(subscriber.value);
  const [isSlug, setIsSlug] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = article.title || 'Loading...';
    document
      .querySelector('meta[name="description"]')
      .setAttribute('content', `${article.description || ''}`);
    document
      .querySelector('meta[property="og:title"]')
      .setAttribute('content', `${article.title || 'Outcode by AV Paul'}`);
    document
      .querySelector('meta[property="og:type"]')
      .setAttribute('content', 'article');
    document
      .querySelector('meta[property="og:url"]')
      .setAttribute('content', `https://www.outcode.dev/${article.slug || ''}`);
    document
      .querySelector('meta[property="og:description"]')
      .setAttribute('content', `${article.description || ''} `);
    document
      .querySelector('meta[name="twitter:description"]')
      .setAttribute('content', `${article.description || ''}`);
    document
      .querySelector('meta[name="twitter:title"]')
      .setAttribute('content', `${article.title || ''}`);
    return () => {
      document.title = 'Outcode by AV Paul';
      document
        .querySelector('meta[name="description"]')
        .setAttribute(
          'content',
          'Javascript full-stack software engineer. Experienced in full project life cycle, and working in demanding environments focused on producing cutting-edge systems.'
        );
      document
        .querySelector('meta[property="og:title"]')
        .setAttribute('content', 'Outcode by AV Paul');
      document
        .querySelector('meta[property="og:type"]')
        .setAttribute('content', 'blog');
      document
        .querySelector('meta[property="og:url"]')
        .setAttribute('content', 'https://www.outcode.dev');
      document
        .querySelector('meta[property="og:description"]')
        .setAttribute(
          'content',
          'Javascript full-stack software engineer. Experienced in full project life cycle, and working in demanding environments focused on producing cutting-edge systems.'
        );
      document
        .querySelector('meta[name="twitter:title"]')
        .setAttribute('content', 'Outcode by AV Paul');
      document
        .querySelector('meta[name="twitter:description"]')
        .setAttribute(
          'content',
          'Javascript full-stack software engineer. Experienced in full project life cycle, and working in demanding environments focused on producing cutting-edge systems.'
        );
    };
  }, [article]);

  useEffect(() => {
    let abort = false;
    const slug = match.params.slug;
    if (!slug.split('-', 2)[1]) {
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
    return [content[0], '</h1>', headerContent, content[1]].join('');
  };

  return isSlug ? (
    <Wrapper>
      {loading ? (
        <Loader theme={theme} size="small" />
      ) : (
        <>
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
            className={`btn--back-home ${theme === 'dark' ? 'theme-dark' : ''}`}
          >
            <i className="zmdi zmdi-long-arrow-left" />
            &nbsp; back home
          </Link>{' '}
        </>
      )}
    </Wrapper>
  ) : (
    <NotFoundPage />
  );
};

export default ArticleContainer;
