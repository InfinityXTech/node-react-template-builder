import React, { CSSProperties } from "react";
import xss from "xss";
import ComponentHeader from "../component-header";
import { xssConfig } from "./xssConfig";

export interface ILabel {
  data: any;
  style?: CSSProperties;
}
export class Label extends React.Component<ILabel> {
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
        <label
          className={`${classNames} form-label`}
          dangerouslySetInnerHTML={{
            // __html: myxss.process(this.props.data.content),
            __html: xss(this.props.data.content, xssConfig),
          }}
        />
      </div>
    );
  }
}
