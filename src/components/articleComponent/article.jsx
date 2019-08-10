import React, { Fragment } from "react";
import ReactHTMLParser from "react-html-parser";
import "./article.scss";

const Article = ({ content, tags = [] }) => {
  const body = ReactHTMLParser(content);
  const renderTags = () =>
    tags.map(tag => (
      <div className="article-tag" key={tag}>
        {tag}
      </div>
    ));
  return (
    <Fragment>
      <div className="article--container">{body}</div>
      {tags.length > 0 && renderTags()}
    </Fragment>
  );
};

export default Article;
