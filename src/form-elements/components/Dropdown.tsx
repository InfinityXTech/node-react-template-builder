import React, { CSSProperties } from "react";
import ComponentHeader from "../component-header";
import ComponentLabel from "../component-label";

export interface IDropdownDataOption {
  key: string;
  value: string;
  text: string;
}
export interface IDropdownData {
  field_name: string;
  pageBreakBefore: boolean;
  options: IDropdownDataOption[];
}

export interface IDropdown {
  style?: CSSProperties;
  data: IDropdownData;
  mutable: boolean;
  defaultValue?: string;
  read_only?: boolean;
  ref?: any;
  disabled?: boolean;
}

export class Dropdown extends React.Component<IDropdown> {
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
          <select {...props}>
            {this.props.data.options.map((option: any) => {
              const thisKey = `preview_${option.key}`;
              return (
                <option value={option.value} key={thisKey}>
                  {option.text}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  }
}
