import React from "react";
import ArticleContainer from "./articleContainer";
import ErrorBoundary from "../errorBoundary/errorBoundary";

export default props => (
  <ErrorBoundary>
    <ArticleContainer {...props} />
  </ErrorBoundary>
);
