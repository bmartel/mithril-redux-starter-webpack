import "@babel/polyfill";
import m from "mithril";
import hydrate from "mixx/hydrate";
import routes from "@/routes";
import store from "@/store";

import "@/index.css";

hydrate(m, routes, store);
