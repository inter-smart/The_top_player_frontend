import React from "react";
import Image from "next/legacy/image";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div
          className="NotFound container-fluid"
          // style={{
          //   marginTop: `${navHeight + 5}px`,
          // }}
        >
          <div className="Image_notFound">
            <Image
              src={"/images/logo.png"}
              layout="fill"
              objectFit="contain"
              objectPosition={"center"}
              alt="Not found"
            />
            <h1> Page Not Found </h1>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false })}
            >
              Go back?
            </button>
          </div>
        </div>
      );
    }

    // Return children components in case of no error

    return this.props.children;
  }
}

export default ErrorBoundary;
