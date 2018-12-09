import m from "mithril";

const Loading = {
  view(vnode) {
    const { error, retry, pastDelay } = vnode.attrs;
    if (error) {
      return m("div", ["Error! ", m("button", { onclick: retry }, "Retry")]);
    } else if (pastDelay) {
      return m("div", "Loading...");
    } else {
      return null;
    }
  },
};

export default Loading;
