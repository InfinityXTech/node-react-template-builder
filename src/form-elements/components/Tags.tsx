import React, { CSSProperties } from "react";
import Select from "react-select";

import ComponentHeader from "../component-header";
import ComponentLabel from "../component-label";
export interface ITagsDataOption {
  key: string;
  value: string;
  text: string;
}
export interface ITagsData {
  field_name: string;
  pageBreakBefore: boolean;
  options: ITagsDataOption[];
}

export interface ITagsProps {
  style?: CSSProperties;
  data: ITagsData;
  mutable: boolean;
  defaultValue?: string;
  read_only?: boolean;
  ref?: any;
  disabled?: boolean;
}

export interface ITagsState {
  value: string;
}
export class Tags extends React.Component<ITagsProps, ITagsState> {
  inputField: any;

  constructor(props: any) {
    super(props);
    this.inputField = React.createRef();
    const { defaultValue, data } = props;
    this.state = { value: this.getDefaultValue(defaultValue, data.options) };
  }

  getDefaultValue(defaultValue: any, options: any) {
    if (defaultValue) {
      if (typeof defaultValue === "string") {
        const vals = defaultValue.split(",").map((x) => x.trim());
        return options.filter((x: any) => vals.indexOf(x.value) > -1);
      }
      return options.filter((x: any) => defaultValue.indexOf(x.value) > -1);
    }
    return [];
  }

  // state = { value: this.props.defaultValue !== undefined ? this.props.defaultValue.split(',') : [] };

  handleChange = (e: any) => {
    this.setState({ value: e || [] });
  };

  render() {
    const options = this.props.data.options.map((option: any) => {
      option.label = option.text;
      return option;
    });
    const props = {
      isMulti: true,
      name: this.props.data.field_name,
      onChange: this.handleChange,
      options,
      value: !this.props.mutable ? options[0].text : "", // to show a sample of what tags looks like
      isDisabled: this.props.mutable ? this.props.read_only : null,
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
          <Select {...props} />
        </div>
      </div>
    );
  }
}
