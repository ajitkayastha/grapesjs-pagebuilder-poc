import { formBlock } from "./blocks";
import { toAdd } from "../fn";

const defaults = {
  category: "Form",
  blocks: []
};

export default (editor, opts) => {
  let bm = editor.BlockManager;
  const config = { ...defaults, ...opts };
  const { blocks } = config;

  if (blocks.length) {
  }
};
