import "@babel/polyfill";
import m from "mithril";

import routes from "@/routes";
import store from "@/store";

import "@/index.css";

if (typeof window !== "undefined") {
  store(window.__INITIAL_STATE__);

  m.route(
    document.getElementById("root"),
    "/", // eslint-disable-line
    routes
  );
}

export default { routes };
