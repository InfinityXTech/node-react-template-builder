import React, { CSSProperties, Component } from 'react';
import ComponentHeader from './component-header.tsx';
import ComponentLabel from './component-label.tsx';

export interface CustomElemetProps {
  style?: CSSProperties;
  data: any;
  name: string;
  defaultValue: any;
  mutable?: boolean;
  read_only: boolean;
  disabled: string;
}
class CustomElement extends Component<CustomElemetProps> {
  inputField: any;

  constructor(props: any) {
    super(props);
    this.inputField = React.createRef();
  }

  render() {
    const { bare } = this.props.data;
    const props: { name?: string, defaultValue?: string, ref?: any, disabled?: string} = {};
    props.name = this.props.data.field_name;
    props.defaultValue = this.props.defaultValue;

    if (this.props.mutable && this.props.data.forwardRef) {
      props.ref = this.inputField;
    }

    if (this.props.read_only) {
      props.disabled = 'disabled';
    }

    // Return if component is invalid.
    if (!this.props.data.component) return null;
    const Element = this.props.data.component;

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses} style={{ ...this.props.style }}>
        <ComponentHeader {...this.props} />
        { bare ?
          <Element data={this.props.data} {...this.props.data.props} {...props} /> :
          <div className="form-group">
            <ComponentLabel className="form-label" {...this.props} />
            <Element data={this.props.data} {...this.props.data.props} {...props} />
          </div>
        }
      </div>
    );
  }
}


export default CustomElement;
