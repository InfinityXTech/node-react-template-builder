import React from "react";
import { injectIntl } from "react-intl";

const PLACE_HOLDER = "form-place-holder";
const PLACE_HOLDER_HIDDEN = "form-place-holder-hidden";
export interface PlaceHolderProps {
  id?: string;
  index?: number;
  show?: boolean;
  intl: any;
  text?: string;
  moveCard?: (dragIndex: any, hoverIndex: any) => void;
  insertCard?: (item: any, hoverIndex: any, id: any) => void;
}
class PlaceHolder extends React.Component<PlaceHolderProps, any> {
  static defaultProps: PlaceHolderProps;

  // constructor(props: any) {
  //   super(props);
  // }

  render() {
    const { intl } = this.props;
    const placeHolderClass = this.props.show
      ? PLACE_HOLDER
      : PLACE_HOLDER_HIDDEN;
    // eslint-disable-next-line no-nested-ternary
    const placeHolder = this.props.show
      ? this.props.text === "Dropzone"
        ? intl.formatMessage({ id: "drop-zone" })
        : this.props.text
      : "";

    return (
      <div className={placeHolderClass}>
        <div>{placeHolder}</div>
      </div>
    );
  }
}

export default injectIntl(PlaceHolder);
PlaceHolder.defaultProps = {
  text: "Dropzone",
  show: false,
  intl: undefined
};
