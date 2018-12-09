import { connect } from "midux";

import Home from "@/components/home";
import { updateTitle } from "@/actions/page";

export default connect(
  state => state.page,
  { updateTitle }
)(Home);
