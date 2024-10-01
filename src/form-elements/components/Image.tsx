import React, { CSSProperties } from "react";
import ComponentHeader from "../component-header";
export interface IImageData {
  field_name: string;
  pageBreakBefore: boolean;
  center: boolean;
  width: number;
  height: number;
  src: string;
}

export interface IImage {
  style?: CSSProperties;
  data: IImageData;
  mutable: boolean;
  defaultValue: string;
  handleChange?: () => void;
}

export class Image extends React.Component<IImage> {
  render() {
    const style: CSSProperties = this.props.data.center
      ? { textAlign: "center" }
      : {};

    let baseClasses = "SortableItem rfb-item";
    if (this.props.data.pageBreakBefore) {
      baseClasses += " alwaysbreak";
    }

    return (
      <div style={{ ...this.props.style, ...style }} className={baseClasses}>
        <ComponentHeader {...this.props} />
        {this.props.data.src && (
          <img
            src={this.props.data.src}
            width={`${this.props.data.width}"px"`}
            height={`${this.props.data.height}"px"`}
          />
        )}
        {!this.props.data.src && <div className="no-image">No Image</div>}
      </div>
    );
  }
}
