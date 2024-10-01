import React from "react";
// import myxss from "./myxss.ts";
import xss from "xss";

const ComponentLabel = (props: any) => {
  const hasRequiredLabel =
    props.data.hasOwnProperty("required") &&
    props.data.required === true &&
    !props.read_only;
  // const labelText = myxss.process(props.data.label);
  const labelText = xss(props.data.label, {
    whiteList: {
      a: ["href", "title", "target"],
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
      ins: [],
    },
  });
  if (!labelText) {
    return null;
  }
  return (
    <label className={props.className || "form-label"}>
      <span dangerouslySetInnerHTML={{ __html: labelText }} />
      {hasRequiredLabel && (
        <span className="label-required badge badge-danger">Required</span>
      )}
    </label>
  );
};

export default ComponentLabel;
