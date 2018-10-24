import "@babel/polyfill";
import m from "mithril";

import "@/store";
import Counter from "@/containers/counter";
import Home from "@/containers/home";

import "@/index.css";

m.route.mode = "#";

m.route(
  document.getElementById("root"),
  "/", // eslint-disable-line
  {
    "/": { view: () => m(Home) },
    "/counter": { view: () => m(Counter) }
  }
);
