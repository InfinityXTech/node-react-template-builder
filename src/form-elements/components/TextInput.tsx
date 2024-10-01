import React, { CSSProperties } from "react";
import ComponentHeader from "../component-header";
import ComponentLabel from "../component-label";

export type TextInputType = "text" | "number" | "password";

export interface ITextInputData {
  field_name: string;
  pageBreakBefore: boolean;
}

export interface ITextInput {
  // type: TextInputType;
  style?: CSSProperties;
  data: ITextInputData;
  mutable: boolean;
  defaultValue?: string | number | string[] | undefined;
  read_only?: boolean;
  ref?: any;
  disabled?: boolean;
}

export class TextInput extends React.Component<ITextInput> {
  inputField: any;

  constructor(props: any) {
    super(props);
    this.inputField = React.createRef();
  }

  render() {
    const props: {
      type: string;
      name: string;
      className: string;
      defaultValue?: string | number | string[] | undefined;
      ref?: any;
      disabled?: boolean;
    } = {
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
