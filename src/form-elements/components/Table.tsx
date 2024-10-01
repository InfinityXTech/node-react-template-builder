import React, { Component } from "react";
import { ITableProps } from "../../types/table";
import ComponentHeader from "../component-header";
// import "./_table.scss";

export class Table extends Component<ITableProps> {
    inputField: any;

    constructor(props: any) {
        super(props);
        this.inputField = React.createRef();
    }

    renderCellValue(value: React.ReactNode) {
        if (React.isValidElement(value)) {
            return value;
        }
        return String(value);
    }

    render() {
        const {
            options: columns,
            showHeader = true,
            className,
            title,
            desc,
            rows,
            tableClassName = "table align-middle gs-0 gy-5",
        } = this.props.data;

        return (
            <div style={this.props.style}>
                <ComponentHeader {...this.props} />
                {this.props.data.rows && (
                <div className={`card ${className}`}>
                    <div className="card-header border-0 pt-5">
                        <h3 className="card-title align-items-start flex-column">
                        <div className="card-label fw-bold fs-3 mb-1">{title}</div>
                        <div className="text-muted mt-1 fw-semibold fs-7">{desc}</div>
                        </h3>
                    </div>
                    <div className="card-body py-3">
                        <div className="table-responsive">
                            <table className={tableClassName ?? ""}>
                                {showHeader && (
                                    <thead>
                                        <tr>
                                            {columns.map((column) => (
                                                <th key={column.key}>{column.text}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                )}
                                <tbody>
                                    {rows.map((item, index) => (
                                        <tr key={index}>
                                            {columns.map((column) => (
                                                <td key={column.key}>
                                                    {this.renderCellValue(item[column.value])}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                )}
            </div>
        );
    }
}
