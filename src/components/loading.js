import m from "mithril";
import "./loader.css";

const Loading = {
  view(vnode) {
    const { error, retry, pastDelay } = vnode.attrs;
    if (error) {
      return m("div", ["Error! ", m("button", { onclick: retry }, "Retry")]);
    } else if (pastDelay) {
      return m("div.loader", "Loading...");
    } else {
      return null;
    }
  },
};

export default Loading;
