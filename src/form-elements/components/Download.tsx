import React, { CSSProperties } from "react";
import ComponentHeader from "../component-header";
export interface IDownloadData {
  field_name: string;
  pageBreakBefore: boolean;
  file_path: string;
  content: string;
}

export interface IDownload {
  style?: CSSProperties;
  data: IDownloadData;
  mutable: boolean;
  download_path?: string;
}

export class Download extends React.Component<IDownload> {
  render() {
    let baseClasses = "SortableItem rfb-item";
    if (this.props.data.pageBreakBefore) {
      baseClasses += " alwaysbreak";
    }

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className="form-group">
          <a
            href={`${this.props.download_path}?id=${this.props.data.file_path}`}
          >
            {this.props.data.content}
          </a>
        </div>
      </div>
    );
  }
}
