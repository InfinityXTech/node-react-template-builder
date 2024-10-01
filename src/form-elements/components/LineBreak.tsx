import React, { CSSProperties } from "react";
import ComponentHeader from "../component-header";

export interface ILineBreak {
  data: any;
  style?: CSSProperties;
}
export class LineBreak extends React.Component<ILineBreak> {
  render() {
    let baseClasses = "SortableItem rfb-item";
    if (this.props.data.pageBreakBefore) {
      baseClasses += " alwaysbreak";
    }

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <ComponentHeader {...this.props} />
        <hr />
      </div>
    );
  }
}
