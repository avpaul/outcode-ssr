import React, { Component } from "react";
import NotFound from "../notFoundComponent/notFound";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return <NotFound />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
