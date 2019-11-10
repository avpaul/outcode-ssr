import React from 'react';
import './article.scss';

const Article = ({ content, tags = [] }) => {
  // TODO: Find out why react html parser removes the indentation in a code element
  // const body = ReactHTMLParser(content, {});
  const renderTags = () =>
    tags.map(tag => (
      <div className="article-tag" key={tag}>
        {tag}
      </div>
    ));
  return (
    <>
      <div
        className="article--container"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className="article-tags">{tags.length > 0 && renderTags()}</div>
    </>
  );
};

export default Article;
