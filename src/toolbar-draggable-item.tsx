/**
 * <ToolbarItem />
 */

import React from "react";
import { DragSource } from "react-dnd";
import ItemTypes from "./ItemTypes.ts";

import useUUIDGenerator from "./UUID.ts";

const cardSource = {
  beginDrag(props: any) {
    const { uuid } = useUUIDGenerator();
    return {
      id: uuid(),
      index: -1,
      data: props.data,
      onCreate: props.onCreate,
    };
  },
};

export interface ToolBarItemProps {
  connectDragSource: any;
  data: any;
  onClick: any;
  onCreate: any;
}
class ToolbarItem extends React.Component<ToolBarItemProps> {
  render() {
    const { connectDragSource, data, onClick } = this.props;
    if (!connectDragSource) return null;
    return connectDragSource(
      <li onClick={onClick}>
        <i className={data.icon}></i>
        {data.name}
      </li>
    );
  }
}

export default DragSource(ItemTypes.CARD, cardSource, (connect) => ({
  connectDragSource: connect.dragSource(),
}))(ToolbarItem);
