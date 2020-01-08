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
          {/* <meta
            httpEquiv="Content-Security-Policy"
            content={process.env.APP_CSP}
          /> */}
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
              src: local('Avenir'), url('./avenir/AvenirLTStd-Light.woff') format("woff");
              font-weight: 200;
            }
          @font-face {
              font-family: 'Avenir';
              src: local('Avenir'), url('./avenir/AvenirLTStd-Medium.woff') format("woff");
              font-weight: 400;
            }
          @font-face {
              font-family: 'Avenir';
              src: local('Avenir'), url('./avenir/AvenirLTStd-Heavy.woff') format("woff");
              font-weight: 600;
            }

            @font-face {
              font-display: optional;
              font-family: 'SF Mono';
              src: local('SF Mono'), 
                   url('./SFMono/SFMonoLight.woff') format("woff"), 
                   url('./SFMono/SFMono-Light.otf') format("opentype");
              font-weight: 200;
            }
          @font-face {
            font-display: optional;
              font-family: 'SF Mono';
              src: local('SF Mono'), 
                   url('./SFMono/SFMonoRegular.woff') format("woff"), 
                   url('./SFMono/SFMono-Regular.otf') format("opentype");
              font-weight: 400;
            }
          @font-face {
              font-display: optional;
              font-family: 'SF Mono';
              src: local('SF Mono'), 
                   url('./SFMono/SFMonoBold.woff') format("woff"), 
                   url('./SFMono/SFMono-Bold.otf') format("opentype");
              font-weight: 600;
            }
          `
          }}
        ></style>
      </>
    );
  }
}

export default AppWrapper;
