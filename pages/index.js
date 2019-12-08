import React, { useState } from 'react';
import styled from 'styled-components';
import ArticleView from '../components/articleView/articleView';
import SummaryBio from '../components/summaryBio/summaryBio';
import { getMainArticles } from '../src/api/article';
import { reduceTo } from '../src/helpers';
import Loader from '../components/loader/loader';

const Wrapper = styled.div`
  margin-top: 32;
  margin-bottom: 32;
`;

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

const ReloadBtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const ReloadBtn = styled.button`
  min-width: 64px;
  height: 36px;
  padding: 0 16px;
  font-family: inherit;
  text-transform: uppercase;
  font-weight: 600;
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

  @media (prefers-color-scheme: dark) {
    color: #ffffff;
    border-color: #ffffff;
    background-color: transparent;
    &:hover {
      background-color: transparent;
    }
  }
  @media only screen and (max-width: 768px) {
    margin-right: 16px;
  }
`;

const Heading = styled.h1`
  margin: 32px 0;
  font-size: 30px;
  color: #17223b;
  @media (prefers-color-scheme: dark) {
    color: #ffffff;
  }
  @media only screen and (max-width: 768px) {
    margin: 16px 0 8px 16px;
  }
`;

const Home = ({ articles: initialArticles, error: fetchError }) => {
  const [articles, setArticles] = useState(initialArticles || []);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  const colors = [
    '#167C80',
    '#72616E',
    '#B33951',
    '#BE5504',
    '#16528E',
    '#F3A712'
  ];

  const loadMore = () => {
    setPage(page + 1);
    setLoading(false);
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
    <Wrapper>
      <SummaryBio />
      <Heading>
        Things I Learned{' '}
        <span role="img" aria-label="thought">
          💭
        </span>
      </Heading>
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
      {loading && <Loader size="small" />}
      <ReloadBtnWrapper>
        {(articles || loading) && (
          <ReloadBtn
            onClick={loadMore}
            type="button"
            title="Load More Articles"
          >
            <i className="zmdi zmdi-replay" />
            &nbsp; load more
          </ReloadBtn>
        )}
      </ReloadBtnWrapper>
    </Wrapper>
  );
};

Home.getInitialProps = async () => {
  const { data, error } = await getMainArticles({ page: 0, limit: 6 });
  return { articles: data, error };
};

export default Home;
