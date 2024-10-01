import React, { CSSProperties } from "react";
import ComponentHeader from "../component-header";
import ComponentLabel from "../component-label";

export interface ICameraData {
  field_name: string;
  pageBreakBefore: boolean;
  center: boolean;
  width: string | number;
  height: string | number;
}

export interface ICameraProps {
  style?: CSSProperties;
  data: ICameraData;
  read_only: boolean;
  mutable: boolean;
  defaultValue: string;
}

export interface ICameraState {
  img: string;
  previewImg: string;
}

export class Camera extends React.Component<ICameraProps, ICameraState> {
  constructor(props: any) {
    super(props);
    this.state = { img: "", previewImg: "" };
  }

  displayImage = (e: any) => {
    const self = this;
    const { target } = e;
    if (target.files && target.files.length) {
      self.setState({
        img: target.files[0],
        previewImg: URL.createObjectURL(target.files[0]),
      });
    }
  };

  clearImage = () => {
    this.setState({
      img: "",
      previewImg: "",
    });
  };

  getImageSizeProps({ width, height }: ICameraData): {
    width?: string;
    height?: string;
  } {
    const imgProps: {
      width?: string;
      height?: string;
    } = { width: "100%" };
    if (width) {
      imgProps.width = `${
        Number(width) < Number(window.innerWidth)
          ? width
          : 0.9 * window.innerWidth
      }px`;
    }
    if (height) {
      imgProps.height = `${height}px`;
    }
    return imgProps;
  }

  render() {
    const imageStyle: CSSProperties = {
      objectFit: "scale-down",
      objectPosition: this.props.data.center ? "center" : "left",
    };
    let baseClasses = "SortableItem rfb-item";
    const name = this.props.data.field_name;
    const fileInputStyle: CSSProperties = this.state.img
      ? { display: "none" }
      : {};
    if (this.props.data.pageBreakBefore) {
      baseClasses += " alwaysbreak";
    }
    let sourceDataURL;
    if (
      this.props.read_only === true &&
      this.props.defaultValue &&
      this.props.defaultValue.length > 0
    ) {
      if (this.props.defaultValue.indexOf(name) > -1) {
        sourceDataURL = this.props.defaultValue;
      } else {
        sourceDataURL = `data:image/png;base64,${this.props.defaultValue}`;
      }
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
              <img
                style={imageStyle}
                src={sourceDataURL}
                {...this.getImageSizeProps(this.props.data)}
              />
            </div>
          ) : (
            <div className="image-upload-container">
              <div style={fileInputStyle}>
                <input
                  name={name}
                  type="file"
                  accept="image/*"
                  capture={"user"}
                  className="image-upload"
                  onChange={this.displayImage}
                />
                <div className="image-upload-control">
                  <div className="btn btn-default">
                    <i className="fas fa-camera"></i> Upload Photo
                  </div>
                  <p>Select an image from your computer or device.</p>
                </div>
              </div>

              {this.state.img && (
                <div>
                  <img
                    onLoad={() => URL.revokeObjectURL(this.state.previewImg)}
                    src={this.state.previewImg}
                    height="100"
                    className="image-upload-preview"
                  />
                  <br />
                  <div
                    className="btn btn-image-clear"
                    onClick={this.clearImage}
                  >
                    <i className="fas fa-times"></i> Clear Photo
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
