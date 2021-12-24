import grapesjs from "grapesjs";
import "./gjs.scss";
import { useEffect, useState, useRef } from "react";
import BuilderCanvas from "./styled/BuilderCanvas";
import BuilderSidebar from "./styled/BuilderSidebar";
import { STYLED_GRID_WRAPPER } from "./styled";
import "./gjs-preset-funnel";
import {
  RiArrowGoBackLine,
  RiArrowGoForwardLine,
  RiFullscreenLine,
  RiFullscreenExitFill,
  RiTabletLine,
  RiSmartphoneLine,
  RiTv2Line,
  RiMistFill
} from "react-icons/ri";
import {
  Tabs,
  TabList,
  Button,
  TabPanels,
  Tab,
  TabPanel
} from "@chakra-ui/react";
import styled from "styled-components";

const maxHeight = "calc(100vh - 87px)";

const PanelHeader = styled("div")`
  padding: 8px 16px;
  cursor: pointer;
  user-select: none;
  flex-grow: 1;
`;
const PanelHeading = styled("div")`
  display: flex;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  justify-content: space-between;
  padding: 4px;
  max-height: 45px;
  height: 45px;
  width: 100%;
  position: relative;

  &:hover {
    scrollbar-width: thin;
  }
`;
const AsideTop = styled("div")`
  max-height: calc(100vh - (77px));
`;
const StickyPanel = styled("div")`
  position: sticky;
  min-height: 35px;
  background: #3b3b3d;
  display: flex;
  color: white;
  gap: 8px;
  justify-content: center;
  align-items: center;
  z-index: 100;
  ${(props) => (props.buttom ? "bottom: 0" : "top: 0")}
`;
const PanelSection = styled("section")`
  display: flex;
  padding: 8px;
  position: relative;
  box-sizing: border-box;
`;
const PanelContent = styled("div")`
  min-height: ${maxHeight};
  max-height: ${maxHeight};
  overflow-y: auto;
  border: none;

  .gjs-blocks-cs {
    padding: 8px;
    background: transparent;
    .gjs-block {
      box-shadow: none;
      color: #c4c4c4;
      &:hover {
        color: red;
      }
    }
  }
  .gjs-block-category {
    border: none;
  }
  .gjs-title {
    background: transparent;
    border: none;
    font-style: normal;
    font-weight: 500;
    color: #848484;
  }
`;

const EditorAside = styled("div")`
  background: #f4f3f3;
  flex-basis: 200px;
  position: relative;
  padding: 0;
`;
const EditorGrid = styled("div")`
  display: flex;
  min-height: calc(100vh - 45px);
  max-height: calc(100vh - 45px);
  /* grid-template-columns: minmax(300px, 300px) auto; */
  /* grid-template-rows: 1fr; */
  overflow: hidden;
  width: 100%;
`;
const EditorMain = styled("div")`
  background: #333;
  overflow: hidden;
  position: relative;
  outline: 2px dashed orange;
  outline-offset: -4px;
  flex-grow: 1;
  .gjs-frame-wrapper {
    padding: 10px;
    background: red;
  }
  .gjs-editor {
    background: transparent;
    .gjs-cv-canvas {
      background: red;
      height: 100%;
      top: 0;
      width: 100%;
      left: 0;
      position: absolute;
    }
  }
`;
const EditorCanvas = styled("section")`
  display: block;
  overflow: scroll;
  scrollbar-width: thin;

  /* background: white; */
  /* border: 1px dashed #8a8a8a; */

  /* left: 0; */
  /* top: 0; */
`;

function PageBuilder({ initialData = null }) {
  const canvas = useRef(null); //Canvas ref
  const bm = useRef(null); //Blocks manager panel ref
  const lm = useRef(null); // Layers manager panel ref
  const sm = useRef(null); // Styles manager panel ref
  // Canvas panel refs
  const ca = useRef(null); //Canvas actions panel ref
  const cal = useRef(null); //Canvas actions left panel ref
  const cac = useRef(null); //Canvas actions center panel ref
  const car = useRef(null); //Canvas actions right panel ref

  const aside = useRef(null); //Aside ref
  const [editor, setEditor] = useState(null); //Editor ref

  useEffect(() => {
    const crc = "create-comp";
    const mvc = "move-comp";
    const swv = "sw-visibility";
    const expt = "export-template";
    const osm = "open-sm";
    const otm = "open-tm";
    const ola = "open-layers";
    const obl = "open-blocks";
    const ful = "fullscreen";
    const prv = "preview";

    if (!editor) {
      const config = {
        // Get the content for the canvas directly from the element
        container: canvas.current,
        showOffsets: 1,
        noticeOnUnload: 0,
        // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
        fromElement: true,
        // Size of the editor
        height: "100%",
        width: "100%",
        // Disable the storage manager for the moment
        storageManager: { autoload: 0 },
        // Avoid any default panel
        blockManager: {
          appendTo: bm.current
        },
        layerManager: {
          appendTo: lm.current
        },
        selectorManager: {
          appendTo: sm.current
        },
        styleManager: {
          appendTo: sm.current,
          sectors: [
            {
              name: "Textual",
              open: false,
              buildProps: ["fontSize"],
              properties: [
                {
                  id: "fontSize",
                  name: "Font size",
                  property: "font-size",
                  type: "select",
                  // List of options, available only for 'select' and 'radio'  types
                  options: [
                    { value: "12px", name: "Small" },
                    { value: "18px", name: "Medium" },
                    { value: "32px", name: "Large" },
                    { value: "64px", name: "Extra Large" }
                  ]
                }
              ]
            },
            {
              name: "Dimension",
              open: true,
              // Use built-in properties
              buildProps: [
                "width",
                "min-width",
                "height",
                "min-height",
                "padding",
                "margin"
              ],
              // Use `properties` to define/override single property
              properties: [
                {
                  // Type of the input,
                  // options: integer | radio | select | color | slider | file | composite | stack
                  type: "integer",
                  name: "The width", // Label for the property
                  property: "width", // CSS property (if buildProps contains it will be extended)
                  units: ["px", "%", "em"], // Units, available only for 'integer' types
                  defaults: "auto", // Default value
                  min: 0 // Min value, available only for 'integer' types
                }
              ]
            },
            {
              name: "Background",
              open: false,
              buildProps: ["background-color", "color", "box-shadow"]
            }
          ]
        },
        deviceManager: {
          appendTo: cac.current,
          devices: [
            {
              name: "Desktop",
              width: "" // default size
            },
            {
              name: "Tablet",
              width: "500px", // this value will be used on canvas width
              widthMedia: "768px" // this value will be used in CSS @media
            },
            {
              name: "Mobile",
              width: "320px", // this value will be used on canvas width
              widthMedia: "500px" // this value will be used in CSS @media
            }
          ]
        },
        panels: {
          defaults: [
            {
              id: "panel-devices",
              el: cac.current,
              buttons: [
                {
                  id: "device-desktop",
                  label: "",
                  command: "set-device-desktop",
                  active: 1,
                  togglable: false,
                  attributes: {
                    title: "Preview on desktop client",
                    class: "icon icon-device-desktop"
                  }
                },
                {
                  id: "device-tablet",
                  label: ``,
                  command: "set-device-tablet",
                  togglable: true,
                  attributes: {
                    title: "Preview on tablet client",
                    class: "icon icon-device-tablet"
                  }
                },
                {
                  id: "device-mobile",
                  label: ``,
                  command: "set-device-mobile",
                  attributes: {
                    title: "Preview on mobile client",
                    class: "icon icon-device-mobile"
                  },
                  togglable: true
                }
              ]
            },
            {
              id: "layers",
              el: aside.current,
              // Make the panel resizable
              resizable: {
                maxDim: 300,
                minDim: 250,
                tc: 0, // Top handler
                cl: 0, // Left handler
                cr: 1, // Right handler
                bc: 0 // Bottom handler
                // Being a flex child we need to change `flex-basis` property
                // instead of the `width` (default)
                // keyWidth: "flex-basis"
              }
            },
            {
              id: "canvas-action-panel",
              el: ca.current
            },
            {
              id: "canvas-left-action-panel",
              el: cal.current,
              buttons: [
                {
                  id: swv,
                  command: swv,
                  context: swv,
                  // className: "fa fa-square-o",
                  active: 1,
                  togglable: true,
                  label: "",
                  attributes: {
                    class: "icon icon-sw"
                  }
                }
              ]
            },

            {
              id: "canvas-right-action-panel",
              el: car.current,
              buttons: [
                {
                  id: prv,
                  context: prv,
                  command: (e) => e.runCommand(prv),
                  class: "text-gray-400",
                  label: "<button>Preview</button>"
                }
              ]
            }
          ]
        },
        plugins: ["gjs-preset-funnel"],
        pluginsOpts: {
          "gjs-preset-funnel": {}
        }
      };
      const e = grapesjs.init(config);
      // Commands

      setEditor(e);
    } else {
      editor.Commands.add("set-device-desktop", {
        run: (editor) => editor.setDevice("Desktop")
      });
      editor.Commands.add("set-device-mobile", {
        run: (editor) => editor.setDevice("Mobile")
      });
      editor.Commands.add("set-device-tablet", {
        run: (editor) => editor.setDevice("Tablet")
      });
      editor.on("change:device", () =>
        console.log("Current device: ", editor.getDevice())
      );
    }
  }, [canvas, bm, lm, aside, sm, ca, cal, cac, car, editor]);

  return (
    <div className="left-0 ">
      <PanelHeading ref={ca} flex spaceBetween>
        <PanelSection ref={cal}></PanelSection>
        <PanelSection ref={cac}></PanelSection>
        <PanelSection ref={car}></PanelSection>
      </PanelHeading>

      <EditorGrid id="editor-grid">
        <EditorAside id="aside-panel" ref={aside}>
          <Tabs as={AsideTop}>
            <TabList as={PanelHeading} bg="white">
              <Tab
                as={PanelHeader}
                _selected={{
                  borderBottom: "2px solid #333",
                  color: "#060E4F"
                }}>
                Elements
              </Tab>
              <Tab
                as={PanelHeader}
                _selected={{
                  borderBottom: "2px solid #333",
                  color: "#060E4F"
                }}>
                Layers
              </Tab>
              <Tab
                as={PanelHeader}
                _selected={{
                  borderBottom: "2px solid #333",
                  color: "#060E4F"
                }}>
                Styles
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel as={PanelContent} ref={bm}></TabPanel>
              <TabPanel as={PanelContent} ref={lm}></TabPanel>
              <TabPanel as={PanelContent} ref={sm}></TabPanel>
            </TabPanels>
          </Tabs>
          <StickyPanel bottom>
            <span>Undo</span>
            <span>Redo</span>
            <span>Reload</span>
            <span>Setting</span>
            <span>Publish</span>
          </StickyPanel>
        </EditorAside>

        <EditorMain id="main_panel">
          {/* Main canvas */}
          <EditorCanvas id="editor-canvas" content={initialData} ref={canvas}>
            <div>Hello World</div>
          </EditorCanvas>
        </EditorMain>
      </EditorGrid>
    </div>
  );
}
export default PageBuilder;

function dummyContent() {
  return <h1>Hello world</h1>;
}
