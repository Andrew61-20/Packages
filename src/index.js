import React from "react";
import ReactDOM from "react-dom";
// import {Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./components/App";
import * as serviceWorker from './serviceWorker';
// import './index.css';

ReactDOM.render(
<React.StrictMode>
  <App />
</React.StrictMode>,
document.querySelector("#root")
);
serviceWorker.unregister();