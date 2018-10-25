import { createReducer } from "midux";
import { UPDATE_TITLE } from "@/actions/page";

const page = createReducer(
  { title: "Mithril + Redux" },
  {
    [UPDATE_TITLE]: (state, action) => ({
      ...state,
      title: action.title,
    }),
  }
);

export default page;
