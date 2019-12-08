import React from 'react';
import styled, { css } from 'styled-components';

const SummaryWrapper = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 32px 0 32px 0;
  padding: 0 16px;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
`;
const ProfileImage = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  img {
    height: 100%;
    width: 100%;
  }
  @media only screen and (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
`;

const SummaryText = styled.div`
  width: 100%;
  margin-left: 24px;
  margin-right: 16px;
  font-weight: 200;
  font-family: inherit;
  color: #17223b;

  p.summary_intro {
    padding-bottom: 24px;
    font-size: 24px;
  }
  p.summary_body {
    padding-bottom: 32px;
    font-size: 20px;
    line-height: 28px;
    span[aria-label='tag'] {
      color: #ff6768;
    }
  }
  p.summary_footer {
    font-size: 18px;
    span {
      display: block;
    }
    span[aria-label='tag'] {
      display: inline-block;
      color: #ff6768;
    }
    span[role='img'] {
      display: inline-block;
    }
  }
  @media (prefers-color-scheme: dark) {
    color: #ffffff;
  }

  @media only screen and (max-width: 768px) {
    margin: 0;
  }
`;

const SendEmailButton = styled.a`
  display: block;
  padding: 8px;
  margin: 8px 0;
  font-size: 16px;
  background-color: transparent;
  border: none;
  color: #17223b;
  text-decoration: underline;
  text-align: center;

  @media (prefers-color-scheme: dark) {
    color: #ffffff;
  }
`;

const SummaryBio = () => {
  return (
    <SummaryWrapper>
      <div>
        <ProfileImage>
          <img src="/profile-image.png" alt="av paul" />
        </ProfileImage>
        <SendEmailButton
          title="Send Me An Email!"
          href="mailto:paul@outcode.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Got a cool project?
        </SendEmailButton>
      </div>
      <SummaryText>
        <p className="summary_intro">
          Hi&nbsp;
          <span role="img" aria-label="hello">
            👋
          </span>
          <span role="img" aria-label="smile">
            😀
          </span>
          &nbsp;My name is <strong>AV Paul</strong>.
        </p>
        <p className="summary_body">
          Every day I use <span aria-label="tag">#javascript</span> and
          other&nbsp;
          <span aria-label="tag">#technologies</span>
          &nbsp;to find solutions to challenging problems and help businesses to
          grow&nbsp;
          <span role="img" aria-label="flying money">
            💸
          </span>
          &nbsp; I share knowledge, skills and&nbsp;
          <span role="img" aria-label="love">
            ❤️
          </span>
          &nbsp;every where I can especially here on my blog&nbsp;
          <span role="img" aria-label="hard lough">
            😂
          </span>
          &nbsp;At the end of the day I’m into&nbsp;
          <span aria-label="tag">#business,</span>
          &nbsp;<span aria-label="tag">#finance,</span>&nbsp;and
          <span aria-label="tag">&nbsp;#design</span>.
        </p>

        <p className="summary_footer">
          <span>
            Currently I’m a <span aria-label="tag">#software_engineer</span> at
            Andela.
          </span>
          <span>
            PS: I like emojis too much! They are&nbsp;
            <span role="img" aria-label="cool">
              😎
            </span>
          </span>
        </p>
      </SummaryText>
    </SummaryWrapper>
  );
};

export default SummaryBio;
