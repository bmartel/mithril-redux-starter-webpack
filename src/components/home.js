import m from "mithril";
import MithrilLogo from "@/assets/img/mithril-logo.png";
import ReduxLogo from "@/assets/img/redux-logo.png";

const Home = {
  view(vnode) {
    const { actions, title } = vnode.attrs;

    return m(".flex.w-full.justify-center.mt-4", [
      m(".mx-4.w-full.sm:w-1/2.md:w-1/3.flex.flex-col.items-center", [
        m(".inline-flex.justify-center.w-full.mb-2", [
          m("img.h-16", { src: MithrilLogo, alt: "Mithril" }),
          m("img.h-16", { src: ReduxLogo, alt: "Redux" }),
        ]),
        m("h1", title),
        m("input.w-full.border.py-2.px-3.my-3", {
          oninput: e => actions.updateTitle(e.target.value),
          value: title,
        }),
        m("p.w-full.flex.justify-end", m("a", { href: "/counter", oncreate: m.route.link }, ["Counter "])),
      ]),
    ]);
  },
};

export default Home;
