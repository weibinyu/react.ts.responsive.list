import React from "react";
import { render } from "react-dom";
import "./assets/stylesheet/index.css"
import Category from "./containers/Category/Category";

render(
    <React.StrictMode>
      <Category />
    </React.StrictMode>,
    document.getElementById("root")
);
