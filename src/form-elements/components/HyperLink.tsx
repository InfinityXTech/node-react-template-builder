import React, { CSSProperties } from "react";
import xss from "xss";
import ComponentHeader from "../component-header";
import { xssConfig } from "./xssConfig";

export interface IHyperLinkData {
  field_name: string;
  pageBreakBefore: boolean;
  href: string;
  content: string;
}

export interface IHyperLink {
  style?: CSSProperties;
  data: IHyperLinkData;
}

export class HyperLink extends React.Component<IHyperLink> {
  render() {
    let baseClasses = "SortableItem rfb-item";
    if (this.props.data.pageBreakBefore) {
      baseClasses += " alwaysbreak";
    }

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className="form-group">
          <label className={"form-label"}>
            <a
              target="_blank"
              href={this.props.data.href}
              dangerouslySetInnerHTML={{
                // __html: myxss.process(this.props.data.content),
                __html: xss(this.props.data.content, xssConfig),
              }}
            />
          </label>
        </div>
      </div>
    );
  }
}
