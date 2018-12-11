import { defaultMapStateToProps, connect } from "midux";

import Counter from "@/components/counter";
import { addCount } from "@/actions/counter";

export default connect(
  defaultMapStateToProps,
  { addCount }
)(Counter);
