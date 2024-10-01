import React, { CSSProperties } from "react";
import ComponentHeader from "../component-header";
import ComponentLabel from "../component-label";
import StarRating from "../star-rating";
export interface IRatingData {
  field_name: string;
  pageBreakBefore: boolean;
}

export interface IRating {
  style?: CSSProperties;
  data: IRatingData;
  mutable: boolean;
  read_only: boolean;
  defaultValue?: string;
}
export class Rating extends React.Component<IRating> {
  inputField: any;

  constructor(props: any) {
    super(props);
    this.inputField = React.createRef();
  }

  render() {
    const props = {
      name: this.props.data.field_name,
      ratingAmount: 5,
      rating: this.props.mutable
        ? this.props.defaultValue !== undefined
          ? parseFloat(this.props.defaultValue)
          : 0
        : 0,
      editing: this.props.mutable,
      disabled: this.props.mutable ? this.props.read_only : undefined,
      ref: this.props.mutable ? this.inputField : null,
    };

    let baseClasses = "SortableItem rfb-item";
    if (this.props.data.pageBreakBefore) {
      baseClasses += " alwaysbreak";
    }

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className="form-group">
          <ComponentLabel {...this.props} />
          <StarRating {...props} />
        </div>
      </div>
    );
  }
}
