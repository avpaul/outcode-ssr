import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import Article from '../components/article/article';
import { getArticle } from '../src/api/article';
import convertFromMarkdown from '../src/helpers/markdownConverter';
import Loader from '../components/loader/loader';
import NotFoundPage from './notfound';

const ArticleInfo = styled.div`
  padding-top: 16px;
  padding-bottom: 32px;
  p {
    padding-top: 8px;
    font-family: 'Avenir';
    font-weight: 200;
    color: #17223b;

    @media (prefers-color-scheme: dark) {
      color: #ffffff;
    }
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

const ArticleContainer = () => {
  const router = useRouter();
  const [article, setArticle] = useState({ content: '', tags: [] });
  const [isSlug, setIsSlug] = useState(true);
  const [loading, setLoading] = useState(true);
  const { slug } = router.query;

  useEffect(() => {
    if (slug && !!slug.split('-', 2)[1]) {
      getArticle(slug).then(({ data, error }) => {
        if (!!error) {
          setIsSlug(false);
          return;
        }
        setArticle(data);
        setLoading(false);
      });
    } else if (slug) {
      setIsSlug(false);
    }
  }, [slug]);

  const formatTime = min => {
    if (min > 1) return `0${min} mins`;
    if (min === 1) return `01 min`;
    if (min <= 1) return `0${min} mins`;
  };

  const formatDate = date => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      year: 'numeric',
      day: '2-digit',
      month: 'short'
    }).format(new Date(date));
  };

  const formatContent = () => {
    const content = convertFromMarkdown(article.content).split(/<\/h1>/);

    const headerContent = `
        <div class="article-header">
         <div class="profile-image">
            <img src="/profile-image.png" alt="av paul" />
          </div>
          <div>
            <p>
              Last Updated on ${formatDate(article.updatedAt)}
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
        <Loader size="small" />
      ) : (
        <>
          <Head>
            <meta
              key="description"
              name="description"
              content={article.description}
            />
            <meta key="tw:card" name="twitter:card" content="summary" />
            <meta key="tw:site" name="twitter:site" content="@av_depaul" />
            <meta key="tw:title" name="twitter:title" content={article.title} />
            <meta
              key="tw:image"
              property="twitter:image"
              content="https://outcode.dev/profile-image.png"
            />
            <meta
              key="tw:description"
              name="twitter:description"
              content={article.description}
            />
            <meta
              key="tw:creator"
              name="twitter:creator"
              content="@av_depaul"
            />
            <meta key="og:title" property="og:title" content={article.title} />
            <meta key="og:type" property="og:type" content="article" />
            <meta
              key="og:url"
              property="og:url"
              content={`https://www.outcode.dev/${article.slug}`}
            />
            <meta
              key="og:description"
              property="og:description"
              content={article.description}
            />
            <meta
              key="og:site_name"
              property="og:site_name"
              content={article.title}
            />
            <meta
              key="og:image"
              property="og:image"
              content="https://outcode.dev/profile-image.png"
            />
            <title key="title">{article.title}</title>
          </Head>
          <Article content={formatContent()} tags={article.tags} />
          <ArticleInfo>
            <p>
              Written by&nbsp;
              <Link href="/">
                <a>
                  <strong>{article.author}</strong>
                </a>
              </Link>
            </p>
            <p>First Published on {formatDate(article.createdAt)}</p>
          </ArticleInfo>
          <Link href="/">
            <a className="btn--back-home">
              <i className="zmdi zmdi-long-arrow-left" />
              &nbsp; back home
            </a>
          </Link>{' '}
        </>
      )}
    </Wrapper>
  ) : (
    <NotFoundPage />
  );
};

export default ArticleContainer;
