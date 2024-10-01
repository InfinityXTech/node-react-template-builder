import React, { CSSProperties, Component } from "react";
import ComponentHeader from "../component-header";

export interface IProgressbar {
    value: number;
    status: string;
}

export interface IData {
    data: IProgressbar;
    style: CSSProperties;
}

export class Progressbar extends Component<IData> {
    inputField: any;

    constructor(props: any) {
        super(props);
        this.inputField = React.createRef();
    }

    render() {
        const {
            value,
            status
        } = this.props.data;

        return (
            <div style={this.props.style}>
                <ComponentHeader {...this.props} />
                <div className="d-flex flex-column w-100 me-2">
                    <div className="d-flex flex-stack mb-2">
                        <span className="text-muted me-2 fs-7 fw-semibold">{value + '%'}</span>
                    </div>
                    <div className="progress h-6px w-100">
                    <div
                        className={`progress-bar bg-${status}`}
                        role="progressbar"
                        style={{ width: value + '%' }}
                    ></div>
                    </div>
                </div>
            </div>
        );
    }
}
