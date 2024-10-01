import React, { CSSProperties } from "react";
import { DragLayer } from "react-dnd";
import ItemTypes from "../ItemTypes.ts";
import { BoxDragPreview } from "./component-drag-preview.tsx";

const layerStyles: CSSProperties = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
};
function getItemStyles(props: any) {
  const { initialOffset, currentOffset } = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: "none",
    };
  }
  const { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}
const CustomDragLayer = (props: any) => {
  const { item, itemType, isDragging } = props;
  function renderItem() {
    switch (itemType) {
      case ItemTypes.BOX:
        return <BoxDragPreview item={item} />;
      default:
        return null;
    }
  }
  if (!isDragging) {
    return null;
  }
  return (
    <div style={layerStyles}>
      <div style={getItemStyles(props)}>{renderItem()}</div>
    </div>
  );
};
export default DragLayer((monitor) => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging(),
}))(CustomDragLayer);
