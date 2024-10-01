/**
  * <Preview />
  */

import React, { CSSProperties } from 'react';
import update from 'immutability-helper';
import { injectIntl } from 'react-intl';
import store from './stores/store.ts';
// import FormElementsEdit from './form-dynamic-edit.tsx';
import FormElementsEdit from './form-elements-edit.tsx';
import SortableFormElements from './sortable-form-elements.tsx';
import CustomDragLayer from './form-elements/component-drag-layer.tsx';

const { PlaceHolder } = SortableFormElements;

export interface PreviewProps
{
  // style?: CSSProperties;
  data: any;
  parent: any;
  showCorrectColumn: boolean;
  editElement?: any;
  files: any;
  className?: string;
  editMode: boolean;
  url: string;
  saveUrl: string;
  saveAlways: boolean;
  variables: any;
  registry?: any;
  editModeOn: () => void;
  manualEditModeOff: () => void;
  renderEditForm: (props: any) => any;
}

export interface PreviewState
{
  data: any[],
  answer_data: any,
}

class Preview extends React.Component<PreviewProps, PreviewState> {
  static defaultProps: {
    showCorrectColumn: boolean;
    files: any[];
    editMode: boolean;
    editElement: any;
    className: string;
    renderEditForm: (props: any) => any;
  };

  _onUpdate: any;

  editForm: any;

  seq: any;

  state: PreviewState = {
    data: [],
    answer_data: {},
  };

  constructor(props: any) {
    super(props);

    const { onLoad, onPost } = props;
    store.setExternalHandler(onLoad, onPost);

    this.editForm = React.createRef();
    this.state = {
      data: props.data || [],
      answer_data: {},
    };
    this.seq = 0;

    this._onUpdate = this._onChange.bind(this);
    this.getDataById = this.getDataById.bind(this);
    this.moveCard = this.moveCard.bind(this);
    this.insertCard = this.insertCard.bind(this);
    this.setAsChild = this.setAsChild.bind(this);
    this.removeChild = this.removeChild.bind(this);
    this._onDestroy = this._onDestroy.bind(this);
  }

  componentDidMount() {
    const { data, url, saveUrl, saveAlways } = this.props;
    store.subscribe((state: any) => this._onUpdate(state.data));
    store.dispatch('load', { loadUrl: url, saveUrl, data: data || [], saveAlways });
    document.addEventListener('mousedown', this.editModeOff);
  }

  componentWillUnmount() {
    // this.unsubscribe((state: any) => this._onUpdate(state.data));
    document.removeEventListener('mousedown', this.editModeOff);
  }

  editModeOff = (e: any) => {
    if (this.editForm.current && !this.editForm.current.contains(e.target)) {
      this.manualEditModeOff();
    }
  }

  manualEditModeOff = () => {
    const { editElement } = this.props;
    if (editElement && editElement.dirty) {
      editElement.dirty = false;
      this.updateElement(editElement);
    }
    this.props.manualEditModeOff();
  }

  _setValue(text: any) {
    return text.replace(/[^A-Z0-9]+/ig, '_').toLowerCase();
  }

  updateElement(element: any) {
    const { data } = this.state;
    let found = false;

    for (let i = 0, len = data.length; i < len; i++) {
      if (element.id === data[i].id) {
        data[i] = element;
        found = true;
        break;
      }
    }

    if (found) {
      this.seq = this.seq > 100000 ? 0 : this.seq + 1;
      store.dispatch('updateOrder', data);
    }
  }

  _onChange(data: any) {
    const answer_data = {};

    data.forEach((item: any) => {
      if (item && item.readOnly && this.props.variables[item.variableKey]) {
        answer_data[item.field_name] = this.props.variables[item.variableKey];
      }
    });

    this.setState({
      data,
      answer_data,
    });
  }

  _onDestroy(item: any) {
    if (item.childItems) {
      item.childItems.forEach((x: any) => {
        const child = this.getDataById(x);
        if (child) {
          store.dispatch('delete', child);
        }
      });
    }
    store.dispatch('delete', item);
  }

  getDataById(id: any) {
    const { data } = this.state;
    return data.find((x: any) => x && x.id === id);
  }

  swapChildren(data: any, item: any, child: any, col: any) {
    if (child.col !== undefined && item.id !== child.parentId) {
      return false;
    }
    if (!(child.col !== undefined && child.col !== col && item.childItems[col])) {
      // No child was assigned yet in both source and target.
      return false;
    }
    const oldId = item.childItems[col];
    const oldItem: any = this.getDataById(oldId);
    const oldCol = child.col;
    item.childItems[oldCol] = oldId;
    oldItem.col = oldCol;
    item.childItems[col] = child.id; child.col = col;
    store.dispatch('updateOrder', data);
    return true;
  }

  setAsChild(item: any, child: any, col: any, isBusy: any) {
    const { data } = this.state;
    if (this.swapChildren(data, item, child, col)) {
      return;
    } if (isBusy) {
      return;
    }
    const oldParent = this.getDataById(child.parentId);
    const oldCol = child.col;
    item.childItems[col] = child.id; child.col = col;
    child.parentId = item.id;
    child.parentIndex = data.indexOf(item);
    if (oldParent) {
      oldParent.childItems[oldCol] = null;
    }
    const list = data.filter(x => x && x.parentId === item.id);
    const toRemove = list.filter((x: any) => item.childItems.indexOf(x.id) === -1);
    let newData = data;
    if (toRemove.length) {
      // console.log('toRemove', toRemove);
      newData = data.filter(x => toRemove.indexOf(x) === -1);
    }
    if (!this.getDataById(child.id)) {
      newData.push(child);
    }
    store.dispatch('updateOrder', newData);
  }

  removeChild(item: any, col: any) {
    const { data } = this.state;
    const oldId = item.childItems[col];
    const oldItem = this.getDataById(oldId);
    if (oldItem) {
      const newData = data.filter(x => x !== oldItem);
      item.childItems[col] = null;
      // delete oldItem.parentId;
      this.seq = this.seq > 100000 ? 0 : this.seq + 1;
      store.dispatch('updateOrder', newData);
      this.setState({ data: newData });
    }
  }

  restoreCard(item: any, id: any) {
    const { data } = this.state;
    const parent = this.getDataById(item.data.parentId);
    const oldItem: any = this.getDataById(id);
    if (parent && oldItem) {
      const newIndex = data.indexOf(oldItem);
      const newData = [...data]; // data.filter(x => x !== oldItem);
      parent.childItems[oldItem.col] = null;
      delete oldItem.parentId;
      delete item.setAsChild;
      delete item.parentIndex;
      item.index = newIndex;
      this.seq = this.seq > 100000 ? 0 : this.seq + 1;
      store.dispatch('updateOrder', newData);
      this.setState({ data: newData });
    }
  }

  insertCard(item: any, hoverIndex: any, id: any) {
    const { data } = this.state;
    if (id) {
      this.restoreCard(item, id);
    } else {
      data.splice(hoverIndex, 0, item);
      this.saveData(item, hoverIndex, hoverIndex);
      store.dispatch('insertItem', item);
    }
  }

  moveCard(dragIndex: any, hoverIndex: any) {
    const { data } = this.state;
    const dragCard = data[dragIndex];
    this.saveData(dragCard, dragIndex, hoverIndex);
  }

  cardPlaceHolder() { // dragIndex: any, hoverIndex: any
    // Dummy
  }

  saveData(dragCard: any, dragIndex: any, hoverIndex: any) {
    const opt: { data: { $splice: any }} = {
      data: {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
      },
    };

    const newData = update(this.state, opt);
    this.setState(newData);
    store.dispatch('updateOrder', newData.data);
  }

  getElement(item: any, index: any) {
    if (item.custom) {
      if (!item.component || typeof item.component !== 'function') {
        item.component = this.props.registry.get(item.key);
      }
    }
    const SortableFormElement = SortableFormElements[item.element];

    if (SortableFormElement === null) {
      return null;
    }
    return <SortableFormElement id={item.id} seq={this.seq} index={index} moveCard={this.moveCard} insertCard={this.insertCard} mutable={false} parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} getDataById={this.getDataById} setAsChild={this.setAsChild} removeChild={this.removeChild} _onDestroy={this._onDestroy} />;
  }

  showEditForm(): any {
    const handleUpdateElement = (element: any) => this.updateElement(element);
    handleUpdateElement.bind(this);

    const formElementEditProps = {
      showCorrectColumn: this.props.showCorrectColumn,
      files: this.props.files,
      manualEditModeOff: this.manualEditModeOff,
      preview: this,
      element: this.props.editElement,
      updateElement: handleUpdateElement,
    };

    return this.props.renderEditForm(formElementEditProps);
  }

  render() {
    let classes = this.props.className;
    if (this.props.editMode) { classes += ' is-editing'; }
    const data = this.state.data.filter((x: any) => !!x && !x.parentId);
    const items = data.map((item, index) => this.getElement(item, index));
    return (
      <div className={classes}>
        <div className="edit-form" ref={this.editForm}>
          {this.props.editElement !== null && this.showEditForm()}
        </div>
        <div className="Sortable">{items}</div>
        <PlaceHolder id="form-place-holder" show={items.length === 0} index={items.length} moveCard={this.cardPlaceHolder} insertCard={this.insertCard} />
        <CustomDragLayer/>
      </div>
    );
  }
}

export default injectIntl(Preview);
Preview.defaultProps = {
  showCorrectColumn: false,
  files: [],
  editMode: false,
  editElement: null,
  className: 'col-md-9 col-9 react-form-builder-preview float-left',
  renderEditForm: (props: any) => <FormElementsEdit {...props} />,
};
