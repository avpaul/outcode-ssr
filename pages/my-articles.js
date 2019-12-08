import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import TabContainer from '../components/tab';
import List from '../components/list/list';
import {
  getDraftArticles,
  getPublishedArticles,
  deleteArticle
} from '../src/api/article';
import { cookieParser } from '../src/helpers';

const NoArticlesBanner = styled.div`
  margin-top: 14px;
  padding-left: 8px;
  color: #888888;
  font-family: inherit;
  font-weight: 400;
  font-size: 18px;
  a {
    text-decoration: none;
    color: inherit;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const UserArticles = () => {
  const [publishedArticles, setPublishedArticles] = useState([]);
  const [draftArticles, setDraftArticles] = useState([]);

  useEffect(() => {
    getPublishedArticles({ page: 0, limit: 6 }).then(({ data, error }) => {
      setPublishedArticles(data);
    });

    getDraftArticles({ page: 0, limit: 6 }).then(({ data, error }) => {
      if (error) {
        return;
      }
      setDraftArticles(data);
    });
  }, []);

  const renderDrafts = () => {
    return (
      <List>
        {draftArticles.length !== 0 ? (
          draftArticles.map(article => (
            <div className="list-item" key={article.slug}>
              <h2 className="tab-title">{article.title}</h2>
              <div className="list-actions">
                <button
                  title="Delete This Article"
                  className="btn-delete"
                  onClick={() => {
                    deleteArticle(article.slug)
                      .then(data => {
                        const remainingArticles = draftArticles.filter(
                          draft => draft.slug !== article.slug
                        );
                        setDraftArticles(remainingArticles);
                      })
                      .catch(error => {});
                  }}
                >
                  <i className="zmdi zmdi-delete" />
                </button>
                <Link href={`/editor?slug=${article.slug}`}>
                  <a title="Edit This Article" className="btn-edit">
                    <i className="zmdi zmdi-edit" />
                  </a>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <NoArticlesBanner>
            <Link href="/editor">
              <a title="Write A New Article">
                <i className="zmdi zmdi-file-plus" />
                &nbsp;Add a new draft
              </a>
            </Link>
          </NoArticlesBanner>
        )}
      </List>
    );
  };
  const renderPublished = () => {
    return (
      <List>
        {publishedArticles.length !== 0 ? (
          publishedArticles.map(article => (
            <div className="list-item" key={article.slug}>
              <Link href={`/${article.slug}`}>
                <a className="tab-title" title="Read This Article">
                  {article.title}
                </a>
              </Link>
              <div className="list-actions">
                <button
                  title="Delete This Article"
                  className="btn-delete"
                  onClick={() => {
                    deleteArticle(article.slug)
                      .then(data => {
                        const remainingArticles = publishedArticles.filter(
                          draft => draft.slug !== article.slug
                        );
                        setPublishedArticles(remainingArticles);
                      })
                      .catch(error => {});
                  }}
                >
                  <i className="zmdi zmdi-delete" />
                </button>
                <Link href={`/editor?slug=${article.slug}`}>
                  <a title="Update This Article" className="btn-edit">
                    <i className="zmdi zmdi-edit" />
                  </a>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <NoArticlesBanner>
            No published articles found! Publish one now.
          </NoArticlesBanner>
        )}
      </List>
    );
  };
  return (
    <div>
      <TabContainer
        tabs={['published', 'drafts']}
        tabContent={{ published: renderPublished(), drafts: renderDrafts() }}
      />
    </div>
  );
};

UserArticles.getInitialProps = async ({ req, res }) => {
  const cookies = cookieParser(req.headers.cookie);
  if (!cookies.token) {
    res.writeHead(302, { Location: '/notfound' });
    res.end();
  }
  return {};
};

export default UserArticles;
