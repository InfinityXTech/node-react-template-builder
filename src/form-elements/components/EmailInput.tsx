import React, { CSSProperties } from "react";
import ComponentHeader from "../component-header";
import ComponentLabel from "../component-label";
export type EmailInputType = "text";

export interface IEmailInputData {
  field_name: string;
  pageBreakBefore: boolean;
}

export interface IEmailInput {
  // type: TextInputType;
  style?: CSSProperties;
  data: IEmailInputData;
  mutable: boolean;
  defaultValue?: string;
  read_only?: boolean;
  ref?: any;
  disabled?: boolean;
}

export class EmailInput extends React.Component<IEmailInput> {
  inputField: any;

  constructor(props: any) {
    super(props);
    this.inputField = React.createRef();
  }

  render() {
    const props = {
      type: "text",
      className: "form-control",
      name: this.props.data.field_name,
      defaultValue: this.props.mutable ? this.props.defaultValue : undefined,
      ref: this.props.mutable ? this.inputField : null,
      disabled: this.props.read_only,
    };

    // if (this.props.mutable) {
    //   props.defaultValue = this.props.defaultValue;
    //   props.ref = this.inputField;
    // }

    let baseClasses = "SortableItem rfb-item";
    if (this.props.data.pageBreakBefore) {
      baseClasses += " alwaysbreak";
    }

    // if (this.props.read_only) {
    //   props.disabled = 'disabled';
    // }

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className="form-group">
          <ComponentLabel {...this.props} />
          <input {...props} />
        </div>
      </div>
    );
  }
}
