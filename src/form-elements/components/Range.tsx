import React, { CSSProperties } from "react";
import ComponentHeader from "../component-header";
import ComponentLabel from "../component-label";
import ReactBootstrapSlider from "react-bootstrap-slider";

export interface IRangeData {
  field_name: string;
  pageBreakBefore: boolean;
  min_value: any;
  max_value: any;
  min_label: string;
  max_label: string;
  step: any;
}

export interface IRangeProps {
  style?: CSSProperties;
  data: IRangeData;
  mutable: boolean;
  read_only: boolean;
}

export interface IRangeState {
  value?: number;
}

export class Range extends React.Component<IRangeProps, IRangeState> {
  inputField: any;

  constructor(props: any) {
    super(props);
    this.inputField = React.createRef();
    this.state = {
      value:
        props.defaultValue !== undefined
          ? parseInt(props.defaultValue, 10)
          : parseInt(props.data.default_value, 10),
    };
  }

  changeValue = (e: any) => {
    const { target } = e;
    this.setState({
      value: target.value,
    });
  };

  render() {
    const props = {
      name: this.props.data.field_name,
      type: "range",
      list: `tickmarks_${this.props.data.field_name}`,
      min: this.props.data.min_value,
      max: this.props.data.max_value,
      step: this.props.data.step,

      value: this.state.value,
      change: this.changeValue,
      ref: this.props.mutable ? this.inputField : null,
      disabled: this.props.read_only ? "disabled" : false,
    };

    const datalist: number[] = [];
    for (
      let i = parseInt(props.min, 10);
      i <= parseInt(props.max, 10);
      i += parseInt(props.step, 10)
    ) {
      datalist.push(i);
    }

    const oneBig = 100 / (datalist.length - 1);

    const _datalist = datalist.map((d, idx) => (
      <option key={`${props.list}_${idx}`}>{d}</option>
    ));

    const visibleMarks = datalist.map((d, idx) => {
      const optionProps: { key?: string; style?: CSSProperties } = {};
      let w = oneBig;
      if (idx === 0 || idx === datalist.length - 1) {
        w = oneBig / 2;
      }
      optionProps.key = `${props.list}_label_${idx}`;
      optionProps.style = { width: `${w}%` };
      if (idx === datalist.length - 1) {
        optionProps.style = { width: `${w}%`, textAlign: "right" };
      }
      return <label {...optionProps}>{d}</label>;
    });

    let baseClasses = "SortableItem rfb-item";
    if (this.props.data.pageBreakBefore) {
      baseClasses += " alwaysbreak";
    }

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className="form-group">
          <ComponentLabel {...this.props} />
          <div className="range">
            <div className="clearfix">
              <span className="float-left">{this.props.data.min_label}</span>
              <span className="float-right">{this.props.data.max_label}</span>
            </div>
            <ReactBootstrapSlider {...props} />
          </div>
          <div className="visible_marks">{visibleMarks}</div>
          <input name={props.name} value={this.state.value} type="hidden" />
          <datalist id={props.list}>{_datalist}</datalist>
        </div>
      </div>
    );
  }
}
