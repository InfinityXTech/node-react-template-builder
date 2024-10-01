import React from "react";
import * as PkgTextAreaAutosize from "react-textarea-autosize";
import * as DraftJs from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import useUUIDGenerator from "../UUID.ts";

const generateUUID = () => {
  const { uuid } = useUUIDGenerator();
  return uuid();
};

const TextAreaAutosize = (props: any) => <PkgTextAreaAutosize.default {...props} />;

function groupBy(list: any, keyGetter: any) {
  const map = new Map();
  list.forEach((item: any) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

export {
  generateUUID,
  TextAreaAutosize,
  DraftJs,
  draftToHtml,
  Editor,
  groupBy,
};
