import React, { CSSProperties } from "react";
import ComponentHeader from "../component-header";
import ComponentLabel from "../component-label";
export interface IRadioButtonsDataOption {
  key: string;
  value: string;
  text: string;
}

export interface IRadioButtonsData {
  field_name: string;
  pageBreakBefore: boolean;
  inline: boolean;
  options: IRadioButtonsDataOption[];
}

export interface IRadioButtons {
  style?: CSSProperties;
  data: IRadioButtonsData;
  mutable: boolean;
  defaultValue?: string;
  read_only?: boolean;
  ref?: any;
  disabled?: boolean;
}

export class RadioButtons extends React.Component<IRadioButtons> {
  options: any;

  constructor(props: any) {
    super(props);
    this.options = {};
  }

  render() {
    const self = this;
    let classNames = "custom-control custom-radio";
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
              name: self.props.data.field_name,
              type: "radio",
              value: option.value,
              defaultChecked: self.props.mutable
                ? self.props.defaultValue !== undefined &&
                  (self.props.defaultValue.indexOf(option.key) > -1 ||
                    self.props.defaultValue.indexOf(option.value) > -1)
                : false,
              disabled: this.props.read_only, // ? "disabled" : undefined,
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
