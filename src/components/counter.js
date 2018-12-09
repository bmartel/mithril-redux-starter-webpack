import m from "mithril";

const Counter = {
  view(vnode) {
    const { actions, count } = vnode.attrs;

    return m(".flex.w-full.justify-center.mt-4", [
      m(".w-1/3.flex.flex-col.items-center", [
        m("h1", `${count} clicked`),
        m("button.border.py-2.px-3.my-3.hover:bg-grey-light.rounded", { onclick: actions.addCount }, "click me"),
        m("p", m("a", { href: "/", oncreate: m.route.link }, ["Home "])),
      ]),
    ]);
  },
};

export default Counter;
