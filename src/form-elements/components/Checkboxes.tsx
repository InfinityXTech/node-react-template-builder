import React, { CSSProperties } from "react";
import ComponentHeader from "../component-header";
import ComponentLabel from "../component-label";
export interface ICheckboxesDataOption {
  key: string;
  value: string;
  text: string;
}

export interface ICheckboxesData {
  field_name: string;
  pageBreakBefore: boolean;
  inline: boolean;
  options: ICheckboxesDataOption[];
}

export interface ICheckboxes {
  style?: CSSProperties;
  data: ICheckboxesData;
  mutable: boolean;
  defaultValue?: string;
  read_only?: boolean;
  ref?: any;
  disabled?: boolean;
  handleChange?: () => void;
}

export class Checkboxes extends React.Component<ICheckboxes> {
  options: any;

  constructor(props: any) {
    super(props);
    this.options = {};
  }

  render() {
    const self = this;
    let classNames = "custom-control custom-checkbox";
    if (this.props.data.inline) {
      classNames += " option-inline";
    }

    let baseClasses = "SortableItem rfb-item";
    if (this.props.data.pageBreakBefore) {
      baseClasses += " alwaysbreak";
    }

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className="form-group">
          <ComponentLabel {...this.props} />
          {this.props.data.options.map((option: any) => {
            const thisKey = `preview_${option.key}`;
            const props = {
              name: `option_${option.key}`,
              type: "checkbox",
              value: option.value,
              defaultChecked: self.props.mutable
                ? self.props.defaultValue !== undefined &&
                  self.props.defaultValue.indexOf(option.key) > -1
                : false,
              disabled: this.props.read_only,
            };
            return (
              <div className={classNames} key={thisKey}>
                <input
                  id={`fid_${thisKey}`}
                  className="custom-control-input"
                  ref={(c) => {
                    if (c && self.props.mutable) {
                      self.options[`child_ref_${option.key}`] = c;
                    }
                  }}
                  {...props}
                />
                <label
                  className="custom-control-label"
                  htmlFor={`fid_${thisKey}`}
                >
                  {option.text}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
