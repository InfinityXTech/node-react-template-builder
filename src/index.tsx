/**
 * <ReactFormBuilder />
 */

import React, { ReactNode, useEffect, useRef, useState } from "react";
import { DndProvider } from "react-dnd";
// import { createDndContext } from "react-dnd";

// import { DndProviderProps as BaseDndProviderProps } from 'react-dnd';
// import { BackendFactory, DragDropManager } from 'dnd-core';
import { HTML5Backend } from "react-dnd-html5-backend";
import { IntlProvider } from "react-intl";
// import { MyDndProviderProps } from "./myDndProvider.ts";
// import { BackendFactory, DragDropManager } from 'dnd-core';
import Preview from "./preview.tsx";
import Toolbar from "./toolbar.tsx";
import FormGenerator, { IReactForm } from "./form.tsx";
import store from "./stores/store.ts";
import AppLocale from "./language-provider/index.ts";
import { LanguageType } from "./types/local.ts";
import { useRegistry } from "./stores/registry.ts";
import { FormBuilderProps } from "../types";

// Define your extended type
// type ExtendedDndProviderProps<BackendContext, BackendOptions> = BaseDndProviderProps<BackendContext, BackendOptions> & {
//   children: ReactNode;
// };

// const MyDndProvider: React.FC<ExtendedDndProviderProps<any, any>> = (props) => (
// <DndProvider backend={HTML5Backend}>
//   {props.children}
// </DndProvider>);

export const DndWrapper = React.memo<any>((props) => {
  const [context, setContext] = useState<boolean>(false);
  const isMounted = React.useRef(true);

  useEffect(() => {
    if (isMounted.current) {
      const el = document.getElementById(props.id);
      // console.log(el?.childNodes);
      setContext(
        el && el.childNodes && el.childNodes.length > 0 ? false : true
      );
    }
    return () => {
      isMounted.current = false;
    };
  }, [props.id]);

  // useEffect(() => {
  //   console.log(context)
  // }, [context]);
  return context === true ? (
    <DndProvider
      backend={HTML5Backend}
      key={1}
      context={window}
      options={{ rootElement: context }}
    >
      {props.children}
    </DndProvider>
  ) : null;
});

interface ReactFormBuilderProps extends FormBuilderProps {}

interface ReactFormBuilderState {
  editMode: boolean;
  editElement?: any;
}

class ReactFormBuilder extends React.Component<
  ReactFormBuilderProps,
  ReactFormBuilderState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      editMode: false,
      editElement: null,
    };
    this.editModeOn = this.editModeOn.bind(this);
  }

  editModeOn(data: any, e: any) {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.editMode) {
      this.setState({ editMode: !this.state.editMode, editElement: null });
    } else {
      this.setState({ editMode: !this.state.editMode, editElement: data });
    }
  }

  manualEditModeOff() {
    if (this.state.editMode) {
      this.setState({
        editMode: false,
        editElement: null,
      });
    }
  }

  render() {
    const toolbarProps: { showDescription?: boolean; items?: any[] } = {
      showDescription: this.props.show_description,
    };

    const language = this.props.locale ? this.props.locale : "en";
    const currentAppLocale = AppLocale[language];
    if (this.props.toolbarItems) {
      toolbarProps.items = this.props.toolbarItems;
    }

    const { registry } = useRegistry();
    // const manager = useRef(createDndContext(HTML5Backend));
    return (
      <div id="main-DnD-containier">
        <DndWrapper id="main-DnD-containier">
          <IntlProvider
            locale={currentAppLocale.locale}
            messages={currentAppLocale.messages}
          >
            <div>
              {/* <div>
           <p>
             It is easy to implement a sortable interface with React DnD. Just make
             the same component both a drag source and a drop target, and reorder
             the data in the <code>hover</code> handler.
           </p>
           <Container />
         </div> */}
              <div className="row react-form-builder clearfix">
                <Preview
                  files={this.props.files}
                  manualEditModeOff={this.manualEditModeOff.bind(this)}
                  showCorrectColumn={this.props.showCorrectColumn}
                  parent={this}
                  data={this.props.data}
                  url={this.props.url}
                  saveUrl={this.props.saveUrl}
                  onLoad={this.props.onLoad}
                  onPost={this.props.onPost}
                  editModeOn={this.editModeOn}
                  editMode={this.state.editMode}
                  variables={this.props.variables}
                  registry={registry}
                  editElement={this.state.editElement}
                  renderEditForm={this.props.renderEditForm}
                  saveAlways={this.props.saveAlways}
                />
                <Toolbar
                  {...toolbarProps}
                  customItems={this.props.customToolbarItems}
                />
              </div>
            </div>
          </IntlProvider>
        </DndWrapper>
      </div>
    );
  }
}

export interface IReactFormGenerator extends IReactForm {
  answer_data?: any;
  locale: LanguageType;
}

function ReactFormGenerator(props: IReactFormGenerator) {
  const language = props.locale ? props.locale : "en";
  const currentAppLocale = AppLocale[language];
  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <FormGenerator {...props} />
    </IntlProvider>
  );
}

const FormBuilders = {
  ReactFormBuilder,
  ReactFormGenerator,
  ElementStore: store,
  Registry: () => {
    const { registry } = useRegistry();
    return registry;
  },
};

export default FormBuilders;

export {
  ReactFormBuilder,
  ReactFormGenerator,
  store as ElementStore,
  // Registry
};
