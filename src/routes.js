import m from "mithril";
import { resolve } from "mitts/util";

m.route.prefix(process.env.NODE_ENV === "production" ? "" : "#");

export default {
  "/": { onmatch: () => resolve(import("@/containers/home")) },
  "/counter": {
    onmatch: (ctx, url) => {
      if (ctx.server) {
        console.log("Counter loaded from server");
      }
      return resolve(import("@/containers/counter"));
    },
  },
};
