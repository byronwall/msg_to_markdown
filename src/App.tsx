import React, { ChangeEventHandler, ClipboardEventHandler } from "react";

import TurndownService from "turndown";
import { tables } from "joplin-turndown-plugin-gfm";

interface AppProps {}
interface AppState {
  data: string;
  markdown: string;
}

export class App extends React.PureComponent<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = { data: "", markdown: "" };
  }

  componentDidMount() {}

  componentDidUpdate(_prevProps: AppProps, _prevState: AppState) {}

  render() {
    return (
      <div onPaste={this.handlePaste} style={{ backgroundColor: "#ccc" }}>
        <h1>msg to markdown</h1>
        <h2>usage</h2>
        <p>
          You can paste HTML content with CTRL+V. If you have HTML text on the
          clipboard, you can also paste to the textarea.
        </p>
        <textarea value={this.state.data} onChange={this.handleTextChange} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "75vh",
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: "48%", overflowX: "scroll" }}>
            <h2>HTML (parsed)</h2>
            <pre>{this.state.data}</pre>
          </div>

          <pre style={{ width: "48%", overflowX: "scroll" }}>
            <h2>
              markdown{" "}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(this.state.markdown);
                }}
              >
                copy
              </button>
            </h2>
            {this.state.markdown}
          </pre>
        </div>
      </div>
    );
  }

  handlePaste: ClipboardEventHandler<HTMLDivElement> | undefined = (e) => {
    if (e.target instanceof HTMLTextAreaElement) return;
    const _data = e.clipboardData.getData("text/html");
    const data = cleanUpNastyMsgHtml(_data);

    console.log(data);

    const parser = new window.DOMParser();

    const html = parser.parseFromString(data, "text/html");

    // process the children

    let prevLevel = 0;

    const results = [];

    for (let node of Array.from(html.body.children)) {
      const nodeName = node.nodeName;

      switch (nodeName) {
        case "P":
          console.log("test p", node);

          const className = node.getAttribute("class");

          if (className === "MsoListParagraph") {
            // handle list stuff
            const style = node.getAttribute("style") ?? "";

            const matches = regex_level.exec(style);
            if (matches !== null) {
              let level = +matches[1];

              if (level > prevLevel) {
                // push a <ul> onto the results

                results.push("<ul>");
              }

              while (level < prevLevel) {
                results.push("</ul>");

                if (prevLevel > 0) {
                  results.push("</li>");
                }

                prevLevel--;
              }
              prevLevel = level;

              results.push(`<li>${node.textContent}`);

              console.log("level", level, matches);
            }
          } else {
            // close out any open ul

            while (prevLevel > 0) {
              prevLevel--;

              results.push("</ul>");

              if (prevLevel > 0) {
                results.push("</li>");
              }
            }

            // write a <p> tag with bare text

            // TODO: add formatting
            results.push(`<p>${node.textContent}</p>`);
          }

          break;

        default:
          results.push(node.outerHTML);

          break;
      }
    }

    const result = results.join("\n");
    console.log(results);
    console.log(result);

    const turndown = new TurndownService();
    turndown.use(tables);
    const markdown = turndown.turndown(result);

    console.log(markdown);

    this.setState({ data: result, markdown });
  };

  handleTextChange: ChangeEventHandler<HTMLTextAreaElement> | undefined = (
    e
  ) => {
    const data = e.target.value;
    const turndown = new TurndownService();
    turndown.use(tables);
    this.setState({ data, markdown: turndown.turndown(data) });
  };
}

const regex_if = /<!\[if.*?endif]>/gms;
const regex_level = /level(\d)/;

function cleanUpNastyMsgHtml(input: string) {
  return input.replaceAll(regex_if, "");
}
