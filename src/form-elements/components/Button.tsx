import React, { CSSProperties, Component } from "react";
import ComponentHeader from "../component-header";

export interface IButton {
    buttonLabel: string;
    buttonAction: string;
    status: string;
}

export interface IData {
    data: IButton;
    style: CSSProperties;
}

export class Button extends Component<IData> {
    inputField: any;

    constructor(props: any) {
        super(props);
        this.inputField = React.createRef();
    }

    render() {
        const {
            buttonLabel,
            buttonAction,
            status
        } = this.props.data;

        return (
            <div style={this.props.style}>
                <ComponentHeader {...this.props} />
                <a href={buttonAction} className={`btn btn-${status}`}>{buttonLabel}</a>
            </div>
        );
    }
}
