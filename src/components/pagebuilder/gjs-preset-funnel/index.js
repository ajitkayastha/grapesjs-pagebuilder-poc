import grapesjs from "grapesjs";

// import pluginBlocks from "grapesjs-blocks-basic";
// import pluginNavbar from 'grapesjs-navbar';
// import pluginCountdown from 'grapesjs-component-countdown';
// import pluginForms from 'grapesjs-plugin-forms';
// import pluginExport from 'grapesjs-plugin-export';
// import pluginAviary from 'grapesjs-aviary';
// import pluginFilestack from 'grapesjs-plugin-filestack';

import initBlocksPlugin from "./plugins/blocks";

// import commands from "./commands";
// import components from "./components";
// import panels from "./panels";
// import styles from "./styles";

export default grapesjs.plugins.add(
  "gjs-preset-funnel",
  (editor, presetOpts = {}) => {
    let defaults = {
      // Which blocks to add
      blocks: [
        "link-block",
        "quote-block",
        "text-basic-block",
        "column1",
        "column2",
        "column3",
        "column4",
        "text",
        "link",
        "image",
        "video",
        "map"
      ],

      // Modal import title
      modalImportTitle: "Import",

      // Modal import button text
      modalImportButton: "Import",

      // Import description inside import modal
      modalImportLabel: "",

      // Default content to setup on import model open.
      // Could also be a function with a dynamic content return (must be a string)
      // eg. modalImportContent: editor => editor.getHtml(),
      modalImportContent: "",

      // Code viewer (eg. CodeMirror) options
      importViewerOptions: {},

      // Confirm text before cleaning the canvas
      textCleanCanvas: "Are you sure to clear the canvas?",

      // Show the Style Manager on component change
      showStylesOnChange: 1,

      // Text for General sector in Style Manager
      textGeneral: "General",

      // Text for Layout sector in Style Manager
      textLayout: "Layout",

      // Text for Typography sector in Style Manager
      textTypography: "Typography",

      // Text for Decorations sector in Style Manager
      textDecorations: "Decorations",

      // Text for Extra sector in Style Manager
      textExtra: "Extra",

      // Use custom set of sectors for the Style Manager
      customStyleManager: []

      // `grapesjs-blocks-basic` plugin options
      // By setting this option to `false` will avoid loading the plugin
      // textBlocksOpts: {}

      // `grapesjs-navbar` plugin options
      // By setting this option to `false` will avoid loading the plugin
      // navbarOpts: {},

      // `grapesjs-component-countdown` plugin options
      // By setting this option to `false` will avoid loading the plugin
      // countdownOpts: {},

      // `grapesjs-plugin-forms` plugin options
      // By setting this option to `false` will avoid loading the plugin
      // formsOpts: {},

      // `grapesjs-plugin-export` plugin options
      // By setting this option to `false` will avoid loading the plugin
      // exportOpts: {},

      // `grapesjs-aviary` plugin options, disabled by default
      // Aviary library should be included manually
      // By setting this option to `false` will avoid loading the plugin
      // aviaryOpts: 0,

      // `grapesjs-plugin-filestack` plugin options, disabled by default
      // Filestack library should be included manually
      // By setting this option to `false` will avoid loading the plugin
      // filestackOpts: 0
    };

    // Load defaults
    const config = { ...defaults, ...presetOpts };

    initBlocksPlugin(editor, config);

    // Load plugins
    // textBlocksOpts && addPlugin(TextBlocksPlugin, textBlocksOpts);
    // blocksBasicOpts && pluginBlocks(editor, blocksBasicOpts);
    // navbarOpts && pluginNavbar(editor, navbarOpts);
    // countdownOpts && pluginCountdown(editor, countdownOpts);
    // formsOpts && pluginForms(editor, formsOpts);
    // exportOpts && pluginExport(editor, exportOpts);
    // aviaryOpts && pluginAviary(editor, aviaryOpts);
    // filestackOpts && pluginFilestack(editor, filestackOpts);

    // Load components
    // components(editor, config);

    // Load blocks
    // blocks(editor, config);

    // Load commands
    // commands(editor, config);

    // Load panels
    // panels(editor, config);

    // Load styles
    // styles(editor, config);
  }
);
