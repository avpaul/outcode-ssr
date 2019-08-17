import ReactGA from "react-ga";

ReactGA.initialize("UA-135092822-1", {
  debug: process.env.NODE_ENV === "development"
});

const activateView = view => {
  ReactGA.pageview(view);
};

export default activateView;
