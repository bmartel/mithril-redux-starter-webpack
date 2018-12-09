import m from "mithril";
import MithrilLogo from "@/assets/img/mithril-logo.png";
import ReduxLogo from "@/assets/img/redux-logo.png";

const Logo = {
  view(vnode) {
    return m(".inline-flex.justify-center.w-full.mb-2", [
      m("img.h-16", { src: MithrilLogo, alt: "Mithril" }),
      m("img.h-16", { src: ReduxLogo, alt: "Redux" }),
    ]);
  },
};

export default Logo;
