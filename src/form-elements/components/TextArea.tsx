import React, { CSSProperties } from "react";
import ComponentHeader from "../component-header";
import ComponentLabel from "../component-label";
export interface ITextAreaData {
  field_name: string;
  pageBreakBefore: boolean;
}

export interface ITextArea {
  // type: TextInputType;
  style?: CSSProperties;
  data: ITextAreaData;
  mutable: boolean;
  defaultValue?: string;
  read_only?: boolean;
  ref?: any;
  disabled?: boolean;
}

export class TextArea extends React.Component<ITextArea> {
  inputField: any;

  constructor(props: any) {
    super(props);
    this.inputField = React.createRef();
  }

  render() {
    const props = {
      type: "number",
      className: "form-control",
      name: this.props.data.field_name,
      defaultValue: this.props.mutable ? this.props.defaultValue : undefined,
      ref: this.props.mutable ? this.inputField : null,
      disabled: this.props.read_only,
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
          <textarea {...props} />
        </div>
      </div>
    );
  }
}
