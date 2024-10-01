import React, { CSSProperties } from "react";
import ComponentHeader from "../component-header";
import xss from "xss";
import { xssConfig } from "./xssConfig";

export interface IHeader {
  data: any;
  style?: CSSProperties;
}
export class Header extends React.Component<IHeader> {
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
        <h3
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
