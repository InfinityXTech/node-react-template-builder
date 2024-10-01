import React, { CSSProperties, Component } from "react";
import ComponentHeader from "../component-header";

export enum SYSTEM_STATUS {
    SUCCESS="success",
    PRIMARY="primary",
    DANGER="danger",
    WARNING="warning",
    INFO="info",
}

interface IBadgeProps {
    title: string;
    status: SYSTEM_STATUS;
}

interface IData {
    data: IBadgeProps;
    style: CSSProperties;
}

export class Badge extends Component<IData> {
    inputField: any;

    constructor(props: any) {
        super(props);
        this.inputField = React.createRef();
    }

    render() {
        const {
            title,
            status,
        } = this.props.data;

        return (
            <div style={this.props.style}>
                <ComponentHeader {...this.props} />
                <span
                    key={title}
                    className={`badge badge-${status} fw-semibold me-1`}
                    >
                    {title}
                </span>
            </div>
        );
    }
}
