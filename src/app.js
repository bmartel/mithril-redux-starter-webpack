import "@babel/polyfill";
import m from "mithril";

import "@/store";
import Counter from "@/containers/counter";
import Home from "@/containers/home";

import "@/app.css";
import "@/app.html";

m.route.mode = "#";

m.route(
  document.getElementById("app"),
  "/", // eslint-disable-line
  {
    "/": { view: () => m(Home) },
    "/counter": { view: () => m(Counter) }
  }
);
