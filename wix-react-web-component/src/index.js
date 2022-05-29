import React from 'react';
import ReactDOM from 'react-dom';
import MyWebComponent from './MyWebComponent';
import reportWebVitals from './reportWebVitals';
import reactToWebComponent from "react-to-webcomponent";

const MyComponentWebComponent = reactToWebComponent(MyWebComponent, React, ReactDOM);
customElements.define("my-web-components", MyComponentWebComponent);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
if (module.hot && process.env.NODE_ENV === "development") {
  module.hot.accept("./MyWebComponent", () => {
    console.log('hot ******************************');
    // const NextApp = require("./LoadableApp").default;
    // ReactDOM.render(
    //   <React.StrictMode>
    //     <LoadableApp />
    //   </React.StrictMode>,
    //   rootId
    // );
  });
}
