/**
 * <FormValidator />
 */

import React from "react";
import xss from "xss";
import IntlMessages from "./language-provider/IntlMessages.tsx";

// const myxss = new xss.FilterXSS({
//   whiteList: {
//     u: [],
//     br: [],
//     b: [],
//     i: [],
//     ol: ["style"],
//     ul: ["style"],
//     li: [],
//     p: ["style"],
//     sub: [],
//     sup: [],
//     div: ["style"],
//     em: [],
//     strong: [],
//     span: ["style"],
//   },
// });

export interface FormValidatorProps {
  emitter: any;
}

export interface FormValidationState {
  errors: any[];
}
export default class FormValidator extends React.Component<
  FormValidatorProps,
  FormValidationState
> {
  subscription: any;

  constructor(props: any) {
    super(props);
    this.state = {
      errors: [],
    };
  }

  componentDidMount() {
    this.subscription = this.props.emitter.addListener(
      "formValidation",
      (errors: any) => {
        this.setState({ errors });
      }
    );
  }

  componentWillUnmount() {
    this.subscription.remove();
  }

  dismissModal(e: any) {
    e.preventDefault();
    this.setState({ errors: [] });
  }

  render() {
    const errors = this.state.errors.map((error: any, index: any) => (
      <li
        key={`error_${index}`}
        dangerouslySetInnerHTML={{
          // __html: myxss.process(error)
          __html: xss(error, {
            whiteList: {
              u: [],
              br: [],
              b: [],
              i: [],
              ol: ["style"],
              ul: ["style"],
              li: [],
              p: ["style"],
              sub: [],
              sup: [],
              div: ["style"],
              em: [],
              strong: [],
              span: ["style"],
            },
          })
        }}
      />
    ));

    return (
      <div>
        {this.state.errors.length > 0 && (
          <div className="alert alert-danger validation-error">
            <div className="clearfix">
              <i className="fas fa-exclamation-triangle float-left"></i>
              <ul className="float-left">{errors}</ul>
            </div>
            <div className="clearfix">
              <a
                className="float-right btn btn-default btn-sm btn-danger"
                onClick={this.dismissModal.bind(this)}
              >
                <IntlMessages id="dismiss" />
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }
}
