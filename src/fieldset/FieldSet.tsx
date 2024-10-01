/* eslint-disable camelcase */
import React, { CSSProperties, useEffect, useState } from "react";

import ComponentHeader from "../form-elements/component-header.tsx";
import ComponentLabel from "../form-elements/component-label.tsx";
import FieldsetDustbin from '../multi-column/dustbin.tsx';
import ItemTypes from "../ItemTypes.ts";

const accepts = [ItemTypes.BOX, ItemTypes.CARD];

export default function FieldSetBase(props: any) {

  const [childData, setChildData] = useState<any>({});
  const [childItems, setChildItems] = useState<any>(null);

  useEffect(() => {
    const { data, class_name, ...rest } = props;
    setChildData(data);
    let count=1;
    createChild(count, data);

  }, [props]);


  const addNewChild=()=>{
    let data=props.data;
    let colCount=data.childItems.length+1;
    let oldChilds=data.childItems;
    data.childItems = Array.from({ length: colCount }, (v, i) => {return oldChilds[i]?oldChilds[i]:null});

    setChildItems( data.childItems)
  }

  const onDropSuccess=(droppedIndex: any) => {
    const totalChild=childItems?childItems.length:0;
    const isLastChild = totalChild===droppedIndex+1 ;

    if(isLastChild)
    {
      addNewChild()
    }
  }

  const createChild = (count: any, data: any) => {
    const colCount = count;
    const className = data.class_name || "col-md-12";
    if (!data.childItems) {
      data.childItems = Array.from({ length: colCount }, (v, i) => null);
      data.isContainer = true;
    }
    setChildItems(data.childItems);
  };
  const {
    controls,
    editModeOn,
    getDataById,
    setAsChild,
    removeChild,
    seq,
    className,
    index,
  } = props;
  const { pageBreakBefore } = childData;
  let baseClasses = "SortableItem rfb-item";
  if (pageBreakBefore) {
    baseClasses += " alwaysbreak";
  }

  const fieldsetStyle: CSSProperties = { width: "100%" }

  return (
    <div style={{ ...props.style }} className={baseClasses}>
      <ComponentHeader {...props} isFieldSet={true} />
      <div>
        <ComponentLabel {...props} />
        <div className="row">
          {
            childItems?.map((x: any, i: any) => (
              <div key={`${i}_${x || "_"}`} className={"col-md-12"}>
                {controls ? (
                  controls[i]
                ) : (
                  <FieldsetDustbin
                    style={fieldsetStyle}
                    data={childData}
                    accepts={accepts}
                    items={childItems}
                    key={i}
                    col={i}
                    onDropSuccess={()=> onDropSuccess(i)}
                    parentIndex={index}
                    editModeOn={editModeOn}
                    _onDestroy={() => removeChild(childData, i)}
                    getDataById={getDataById}
                    setAsChild={setAsChild}
                    seq={seq}
                    rowNo={i}
                  />
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
