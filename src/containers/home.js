import m from "mithril";
import { connect } from "midux";

import { updateTitle } from "@/actions/page";
import Icon from "@/assets/img/icon.png";

const Home = {
  view(vnode) {
    const { actions, title } = vnode.attrs;

    return m(".flex.w-full.justify-center.mt-4", [
      m(".w-1/3.flex.flex-col.items-center", [
        m("img.w-1/6", { src: Icon, alt: "Mithril Redux" }),
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

export default connect(
  state => state.page,
  { updateTitle }
)(Home);
