import saveAs from "file-saver";
import React, { CSSProperties } from "react";
import ComponentHeader from "../component-header";
import ComponentLabel from "../component-label";
export interface IFileUploadData {
  field_name: string;
  pageBreakBefore: boolean;
  fileType: string;
}

export interface IFileUploadProps {
  style?: CSSProperties;
  data: IFileUploadData;
  defaultValue: string;
  read_only: boolean;
  mutable: boolean;
}

export interface IFileUploadState {
  fileUpload: any;
}

export class FileUpload extends React.Component<
  IFileUploadProps,
  IFileUploadState
> {
  constructor(props: any) {
    super(props);
    this.state = { fileUpload: null };
  }

  displayFileUpload = (e: any) => {
    const self = this;
    const { target } = e;
    let file;

    if (target.files && target.files.length > 0) {
      file = target.files[0];

      self.setState({
        fileUpload: file,
      });
    }
  };

  clearFileUpload = () => {
    this.setState({
      fileUpload: null,
    });
  };

  saveFile = async (e: any) => {
    e.preventDefault();
    const sourceUrl = this.props.defaultValue;
    const response = await fetch(sourceUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      // responseType: 'blob',
    });
    const dispositionHeader = response.headers.get("Content-Disposition");
    const resBlob = await response.blob();
    // eslint-disable-next-line no-undef
    const blob = new Blob([resBlob], {
      type:
        this.props.data.fileType || response.headers.get("Content-Type") || "",
    });
    if (dispositionHeader && dispositionHeader.indexOf(";filename=") > -1) {
      const fileName = dispositionHeader.split(";filename=")[1];
      saveAs(blob, fileName);
    } else {
      const fileName = sourceUrl.substring(sourceUrl.lastIndexOf("/") + 1);
      saveAs(response.url, fileName);
    }
  };

  render() {
    let baseClasses = "SortableItem rfb-item";
    const name = this.props.data.field_name;
    const fileInputStyle: CSSProperties = this.state.fileUpload
      ? { display: "none" }
      : {};
    if (this.props.data.pageBreakBefore) {
      baseClasses += " alwaysbreak";
    }
    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div className="form-group">
          <ComponentLabel {...this.props} />
          {this.props.read_only === true &&
          this.props.defaultValue &&
          this.props.defaultValue.length > 0 ? (
            <div>
              <button className="btn btn-default" onClick={this.saveFile}>
                <i className="fas fa-download"></i> Download File
              </button>
            </div>
          ) : (
            <div className="image-upload-container">
              <div style={fileInputStyle}>
                <input
                  name={name}
                  type="file"
                  accept={this.props.data.fileType || "*"}
                  className="image-upload"
                  onChange={this.displayFileUpload}
                />
                <div className="image-upload-control">
                  <div className="btn btn-default">
                    <i className="fas fa-file"></i> Upload File
                  </div>
                  <p>Select a file from your computer or device.</p>
                </div>
              </div>

              {this.state.fileUpload && (
                <div>
                  <div className="file-upload-preview">
                    <div
                      style={{ display: "inline-block", marginRight: "5px" }}
                    >
                      {`Name: ${this.state.fileUpload.name}`}
                    </div>
                    <div style={{ display: "inline-block", marginLeft: "5px" }}>
                      {this.state.fileUpload.size.length > 6
                        ? `Size:  ${Math.ceil(
                            this.state.fileUpload.size / (1024 * 1024)
                          )} mb`
                        : `Size:  ${Math.ceil(
                            this.state.fileUpload.size / 1024
                          )} kb`}
                    </div>
                  </div>
                  <br />
                  <div
                    className="btn btn-file-upload-clear"
                    onClick={this.clearFileUpload}
                  >
                    <i className="fas fa-times"></i> Clear File
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
