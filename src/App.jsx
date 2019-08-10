import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled, { css } from "styled-components";
import { subscriber } from "./services/themeService";
import "./App.scss";
import Home from "./components/home";
import Editor from "./components/editorComponent/editor";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import article from "./components/articleComponent/articleContainer";
import UserArticles from "./components/userArticlesComponent/userArticle";

const AppContainerWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  background-color: #FFFFFF;

  ${props =>
    props.theme === "dark" &&
    css`
      background-color: #17223b;
    `}
`;

const AppContainer = styled.div`
  position: relative;
  width: 100%;
  @media (min-width: 768px) {
    width: 70%;
    margin: 0 auto;
  }
`;

const App = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    subscriber.subscribe(value => {
      setTheme(value);
    });
  }, []);

  return (
    <Router>
      <AppContainerWrapper theme={theme}>
        <AppContainer>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/editor" component={Editor} />
            <Route exact path="/my-articles" component={UserArticles} />
            <Route exact path="/:slug" component={article} />
          </Switch>
          <Footer />
        </AppContainer>
      </AppContainerWrapper>
    </Router>
  );
};

export default App;
