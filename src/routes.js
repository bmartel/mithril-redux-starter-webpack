import m from "mithril";

import Counter from "@/containers/counter";
import Home from "@/containers/home";

m.route.prefix(process.env.NODE_ENV === "production" ? "" : "#");

export default {
  "/": { view: () => m(Home) },
  "/counter": { view: () => m(Counter) },
};
