import React, { CSSProperties, Component } from "react";
import ComponentHeader from "../component-header";
import { Icon as KeenIcon, Icons } from '@keen.io/icons';

export interface IButton {
    iconName: typeof Icons[number],
    iconWidth: number,
    iconHeight: number,
    status?: ICONS_STATUS
}

export enum ICONS_STATUS {
    SUCCESS="success",
    PRIMARY="primary",
    DANGER="danger",
    WARNING="warning",
    INFO="info",
}

export interface IData {
    data: IButton;
    style: CSSProperties;
}

export class Icon extends Component<IData> {
    inputField: any;

    constructor(props: any) {
        super(props);
        this.inputField = React.createRef();
    }

    render() {
        const {
            iconName,
            iconWidth,
            iconHeight,
            status
        } = this.props.data;

        return (
            <div style={this.props.style}>
                <ComponentHeader {...this.props} />
                <div className="symbol symbol-50px me-2">
                    <span className={`symbol-label bg-light-${status} text-${status}`}>
                        <KeenIcon type={iconName} fill={`var(--${status})`} width={iconWidth} height={iconHeight} />
                    </span>
                </div>
            </div>
        );
    }
}
