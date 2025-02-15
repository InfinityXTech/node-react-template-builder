import React, { CSSProperties } from 'react';

import ComponentHeader from '../form-elements/component-header.tsx';
import ComponentLabel from '../form-elements/component-label.tsx';
import Dustbin from './dustbin.tsx';
import ItemTypes from '../ItemTypes.ts';

const accepts = [ItemTypes.BOX, ItemTypes.CARD];

export interface MultiColumnRowBaseProps
{
  style?: CSSProperties;
  controls: any;
  data: any;
  editModeOn: any;
  getDataById: any;
  setAsChild: any;
  removeChild: (data: any, index: number) => void;
  seq: any;
  className: string;
  index: any;
}
class MultiColumnRowBase extends React.Component<MultiColumnRowBaseProps> {
  render() {
    const {
      controls, data, editModeOn, getDataById, setAsChild, removeChild, seq, className, index,
    } = this.props;
    const { childItems, pageBreakBefore } = data;
    let baseClasses = 'SortableItem rfb-item';
    if (pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div style={{ ...this.props.style }} className={baseClasses}>
        <ComponentHeader {...this.props} />
        <div>
          <ComponentLabel {...this.props} />
          <div className="row">
            {childItems.map((x: any, i: any) => (
              <div key={`${i}_${x || '_'}`} className={className}>{
                controls ? controls[i] :
                  <Dustbin
                    style={{ width: '100%' }}
                    data={data}
                    accepts={accepts}
                    items={childItems}
                    col={i}
                    parentIndex={index}
                    editModeOn={editModeOn}
                    _onDestroy={() => removeChild(data, i)}
                    getDataById={getDataById}
                    setAsChild={setAsChild}
                    seq={seq}
                  />}
              </div>))}
          </div>
        </div>
      </div>
    );
  }
}

const TwoColumnRow = ({
  data,
  class_name,
  ...rest
}: any) => {
  const className = class_name || 'col-md-6';
  if (!data.childItems) {
    data.childItems = [null, null]; data.isContainer = true;
  }
  return (
    <MultiColumnRowBase {...rest} className={className} data={data} />
  );
};

const ThreeColumnRow = ({
  data,
  class_name,
  ...rest
}: any) => {
  const className = class_name || 'col-md-4';
  if (!data.childItems) {
    data.childItems = [null, null, null]; data.isContainer = true;
  }
  return (
    <MultiColumnRowBase {...rest} className={className} data={data} />
  );
};

const MultiColumnRow = ({
  data,
  ...rest
}: any) => {
  const colCount = data.col_count || 4;
  const className = data.class_name || (colCount === 4 ? 'col-md-3' : 'col');
  if (!data.childItems) {
    data.childItems = Array.from({ length: colCount }, (v, i) => null);
    data.isContainer = true;
  }
  return <MultiColumnRowBase {...rest} className={className} data={data} />;
};

export { TwoColumnRow, ThreeColumnRow, MultiColumnRow };
