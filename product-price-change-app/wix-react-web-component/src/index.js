import React from 'react';
import ReactDOM from 'react-dom';
import MyWebComponent from './MyWebComponent';
import reportWebVitals from './reportWebVitals';
import reactToWebComponent from "react-to-webcomponent";

class MyComponentWebComponent extends reactToWebComponent(MyWebComponent, React, ReactDOM)
{
  connectedCallback(){
    super.connectedCallback()
	  this.setAttribute('style', 'display:grid; height:inherit')
	}
}
customElements.define("my-web-components", MyComponentWebComponent);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
if (module.hot && process.env.NODE_ENV === "development") {
  module.hot.accept("./MyWebComponent", () => {});
}
