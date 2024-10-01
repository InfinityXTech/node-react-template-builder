import React, { CSSProperties } from "react";
import ComponentHeader from "../component-header";
import ComponentLabel from "../component-label";

export type PhoneNumberType = "tel";

export interface IPhoneNumberData {
  field_name: string;
  pageBreakBefore: boolean;
}

export interface IPhoneNumber {
  // type: TextInputType;
  style?: CSSProperties;
  data: IPhoneNumberData;
  mutable: boolean;
  defaultValue?: string;
  read_only?: boolean;
  ref?: any;
  disabled?: boolean;
}

export class PhoneNumber extends React.Component<IPhoneNumber> {
  inputField: any;

  constructor(props: any) {
    super(props);
    this.inputField = React.createRef();
  }

  render() {
    const props = {
      type: "tel",
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
