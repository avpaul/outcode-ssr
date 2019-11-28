import React, { useEffect, useState } from 'react';
import App from 'next/app';
import Head from 'next/head';
import styled from 'styled-components';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import './styles/App.scss';

const AppContainerWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  background-color: #ffffff;

  @media (prefers-color-scheme: dark) {
    background-color: #202124;
  }
`;

const AppContainer = styled.div`
  position: relative;
  width: 100%;
  @media (min-width: 768px) {
    width: 70%;
    margin: 0 auto;
  }
  @media (min-width: 1441px) {
    width: 55%;
    margin: 0 auto;
  }
`;

class AppWrapper extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <meta name="theme-color" content="#17223B" />
          <meta
            name="description"
            key="description"
            content="Javascript full-stack software engineer. Experienced in full project life cycle, and working in demanding environments focused on producing cutting-edge systems."
          />
          <meta name="twitter:card" key="tw:card" content="summary" />
          <meta name="twitter:site" key="tw:site" content="@av_depaul" />
          <meta
            name="twitter:title"
            key="tw:title"
            content="Outcode by AV Paul"
          />
          <meta
            property="twitter:image"
            key="tw:image"
            content="https://outcode.dev/profile-image.png"
          />
          <meta
            name="twitter:description"
            key="tw:description"
            content="Javascript full-stack software engineer. Experienced in full project life cycle, and working in demanding environments focused on producing cutting-edge systems."
          />
          <meta name="twitter:creator" key="tw:creator" content="@av_depaul" />
          <meta
            property="og:title"
            key="og:title"
            content="Outcode by AV Paul"
          />
          <meta property="og:type" key="og:type" content="blog" />
          <meta
            property="og:url"
            key="og:url"
            content="https://www.outcode.dev/"
          />
          <meta
            property="og:description"
            key="og:description"
            content="Javascript full-stack software engineer. Experienced in full project life cycle, and working in demanding environments focused on producing cutting-edge systems."
          />
          <meta
            property="og:site_name"
            key="og:site_name"
            content="Outcode by AV Paul"
          />
          <meta
            property="og:image"
            key="og:image"
            content="https://outcode.dev/profile-image.png"
          />
          <meta
            httpEquiv="Content-Security-Policy"
            content={process.env.APP_CSP}
          /> 
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.16.0/themes/prism-okaidia.min.css"
          />
          <title key="title">Outcode by AV Paul</title>
        </Head>
        <AppContainerWrapper>
          <AppContainer>
            <Navbar />
            {/*  child component will go here */}
            <Component {...pageProps} />
            <Footer />
          </AppContainer>
        </AppContainerWrapper>

        <style
          dangerouslySetInnerHTML={{
            __html: `
          @font-face {
              font-family: 'Avenir';
              src: url('./avenir/AvenirLTStd-Light.woff');
              font-weight: 200;
            }
          @font-face {
              font-family: 'Avenir';
              src: url('./avenir/AvenirLTStd-Medium.woff');
              font-weight: 500;
            }
          @font-face {
              font-family: 'Avenir';
              src: url('./avenir/AvenirLTStd-Heavy.woff');
              font-weight: 700;
            }
          `
          }}
        ></style>
      </>
    );
  }
}

export default AppWrapper;
