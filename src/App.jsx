import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";
import logo from "./logo.svg";
import "./App.scss";
import Home from "./components/home";
import Editor from "./components/editor";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const AppContainer = styled.div`
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
        <Route exact path="/" component={Home} />
        <Route exact path="/editor" component={Editor} />
        <Footer />
      </AppContainer>
    </Router>
  );
}

export default App;
