import { addPlugin } from "./fn";
import textBlocks from "./text";
import columnBlocks from "./column";
import formBlocks from "./form";

export default (editor, opts) => {
  const config = opts;

  const defaults = {
    /* blocks: [
      // text
      "headline-block",
      "text-basic-block",
      "bullet-list-block",

      // columns
      "column-1-block",
      "column-2-block",
      "column-3-block",
      "column-4-block"

      // "text",
      // "link",
      // "image",
      // "video",
      // "map"
    ], */

    columnBlocksOpts: {},

    textBlocksOpts: {},

    formBlocksOpts: {},
    // navbarOpts: {},
    // countdownOpts: {},
    // exportOpts: {},
    mediaBlocksOpts: {},
    otherBlocksOpts: {}
  };

  // combine the defaults and passed options

  for (let name in defaults) {
    if (!(name in config)) config[name] = defaults[name];
  }

  // modify block options
  const {
    textBlocksOpts,
    columnBlocksOpts,
    formBlocksOpts
    // navbarOpts,
    // countdownOpts,
    // formsOpts,
    // exportOpts,
    // aviaryOpts,
    // filestackOpts
  } = config;

  textBlocksOpts && addPlugin(textBlocks, editor, textBlocksOpts);
  columnBlocksOpts && addPlugin(columnBlocks, editor, columnBlocksOpts);
  formBlocksOpts && addPlugin(formBlocks, editor, formBlocksOpts);
};
