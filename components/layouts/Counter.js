var React = require("react");
var ReactDOM = require("react-dom");
var Counter = require("react-counter");

ReactDOM.createRoot(document.body).render(
  <Counter begin={0} end={1000} time={2000} easing="outCube" />
);
