import React, { CSSProperties } from "react";
import xss from "xss";
import ComponentHeader from "../component-header";
import { xssConfig } from "./xssConfig";

export interface IParagraph {
  data: any;
  style?: CSSProperties;
}
export class Paragraph extends React.Component<IParagraph> {
  render() {
    let classNames = "static";
    if (this.props.data.bold) {
      classNames += " bold";
    }
    if (this.props.data.italic) {
      classNames += " italic";
    }

    let baseClasses = "SortableItem rfb-item";
    if (this.props.data.pageBreakBefore) {
      baseClasses += " alwaysbreak";
    }

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <ComponentHeader {...this.props} />
        <p
          className={classNames}
          dangerouslySetInnerHTML={{
            // __html: myxss.process(this.props.data.content),
            __html: xss(this.props.data.content, xssConfig),
          }}
        />
      </div>
    );
  }
}
