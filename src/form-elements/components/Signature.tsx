import React, { CSSProperties } from "react";
import SignaturePad from "react-signature-canvas";

import ComponentLabel from "../component-label";
import ComponentHeader from "../component-header";
export interface ISignatureData {
  field_name: string;
  pageBreakBefore: boolean;
}

export interface ISignatureProps {
  style?: CSSProperties;
  data: ISignatureData;
  mutable: boolean;
  defaultValue?: string;
  read_only?: boolean;
  ref?: any;
  disabled?: boolean;
}

export interface ISignatureState {
  defaultValue?: string;
}

export class Signature extends React.Component<
  ISignatureProps,
  ISignatureState
> {
  canvas: any;

  inputField: any;

  constructor(props: any) {
    super(props);
    this.state = {
      defaultValue: props.defaultValue,
    };
    this.inputField = React.createRef();
    this.canvas = React.createRef();
  }

  clear = () => {
    if (this.state.defaultValue) {
      this.setState({ defaultValue: "" });
    } else if (this.canvas.current) {
      this.canvas.current.clear();
    }
  };

  render() {
    const { defaultValue } = this.state;
    const canClear = !!defaultValue;
    const props = {
      type: "hidden",
      name: this.props.data.field_name,
      defaultValue: this.props.mutable ? this.props.defaultValue : undefined,
      ref: this.props.mutable ? this.inputField : null,
      disabled: this.props.read_only,
    };

    const pad_props = {
      defaultValue,
      ref: this.canvas,
      canClear: !this.props.read_only,
    };

    let baseClasses = "SortableItem rfb-item";
    if (this.props.data.pageBreakBefore) {
      baseClasses += " alwaysbreak";
    }

    let sourceDataURL;
    if (defaultValue && defaultValue.length > 0) {
      sourceDataURL = `data:image/png;base64,${defaultValue}`;
    }

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className="form-group">
          <ComponentLabel {...this.props} />
          {this.props.read_only === true || !!sourceDataURL ? (
            <img src={sourceDataURL} />
          ) : (
            <SignaturePad {...pad_props} />
          )}
          {canClear && (
            <i
              className="fas fa-times clear-signature"
              onClick={this.clear}
              title="Clear Signature"
            ></i>
          )}
          <input {...props} />
        </div>
      </div>
    );
  }
}
