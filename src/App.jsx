import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import logo from "./logo.svg";
import "./App.scss";
import Home from "./components/home";
import Editor from "./components/editorComponent/editor";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import article from "./components/articleComponent/articleContainer";
import UserArticles from './components/userArticlesComponent/userArticle';

const AppContainer = styled.div`
  position: relative;
  width: 100%;
  @media (min-width: 768px) {
    width: 70%;
    margin: 0 auto;
  }
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/editor" component={Editor} />
          <Route exact path="/my-articles" component={UserArticles}/>
          <Route exact path="/:slug" component={article} />
        </Switch>
        <Footer />
      </AppContainer>
    </Router>
  );
}

export default App;
