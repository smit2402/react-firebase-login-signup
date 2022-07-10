import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <h1 className="text-danger text-center mt-5">
          Sorry something went wrong.
        </h1>
      );
    } else {
      return this.props.children;
    }
  }
}
