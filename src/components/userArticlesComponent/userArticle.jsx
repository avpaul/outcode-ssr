import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import TabContainer from "./tab";
import List from "./list";
import {
  getDraftArticles,
  getPublishedArticles,
  deleteArticle
} from "../../api/article";
import {
  subscriber
} from "../../services/updateArticleService";

const NoArticlesBanner = styled.div`
  margin-top: 14px;
  padding-left: 8px;
  color: #888888;
  font-family: "Avenir";
  font-weight: 200;
  font-size: 18px;
  a {
    text-decoration: none;
    color: inherit;
    &:hover{
      text-decoration: underline;
    }
  }
`;

const UserArticles = ({ history }) => {
  const [publishedArticles, setPublishedArticles] = useState([]);
  const [draftArticles, setDraftArticles] = useState([]);

  useEffect(() => {
    getPublishedArticles({ page: 0, limit: 6 })
      .then(({ data }) => {
        setPublishedArticles(data);
      })
      .catch(error => {});
    getDraftArticles({ page: 0, limit: 6 })
      .then(({ data }) => {
        setDraftArticles(data);
      })
      .catch(error => {});
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
                <Link
                  to="/editor"
                  className="btn-edit"
                  onClick={evt => {
                    subscriber.next(article.slug);
                  }}
                >
                  <i className="zmdi zmdi-edit" />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <NoArticlesBanner>
            <Link to="/editor">
              <i className="zmdi zmdi-file-plus" />
              &nbsp;Add a new draft
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
              <Link to={`/${article.slug}`} className="tab-title">
                {article.title}
              </Link>
              <div className="list-actions">
                <button
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
                <Link
                  to="/editor"
                  className="btn-edit"
                  onClick={() => {
                    subscriber.next(article.slug);
                  }}
                >
                  <i className="zmdi zmdi-edit" />
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
        tabs={["published", "drafts"]}
        tabContent={{ published: renderPublished(), drafts: renderDrafts() }}
      />
    </div>
  );
};

export default UserArticles;
