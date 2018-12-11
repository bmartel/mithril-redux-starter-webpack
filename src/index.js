import "@babel/polyfill";
import m from "mithril";
import hydrate from "mitts/hydrate";
import routes from "@/routes";
import store from "@/store";

import "@/index.css";

export default hydrate(m, routes, store);
