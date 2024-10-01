/**
 * <Toolbar />
 */

import React from "react";
import { injectIntl } from "react-intl";
import ToolbarItem from "./toolbar-draggable-item.tsx";
import ToolbarGroupItem from "./toolbar-group-item.tsx";

import store from "./stores/store.ts";
import { groupBy } from "./functions/index.tsx";
import useUUIDGenerator from "./UUID.ts";

// function isDefaultItem(item) {
//   const keys = Object.keys(item);
//   return keys.filter(x => x !== 'element' && x !== 'key' && x !== 'group_name').length === 0;
// }

function buildItems(items: any, defaultItems: any) {
  if (!items) {
    return defaultItems;
  }
  return items.map((x: any) => {
    let found = defaultItems.find(
      (y: any) => x.element === y.element && y.key === x.key
    );
    if (!found) {
      found = defaultItems.find(
        (y: any) => (x.element || x.key) === (y.element || y.key)
      );
    }
    if (found) {
      if (x.inherited !== false) {
        found = { ...found, ...x };
      } else if (x.group_name) {
        found.group_name = x.group_name;
      }
    }
    return found || x;
  });
}

function buildGroupItems(allItems: any) {
  const items = allItems.filter((x: any) => !x.group_name);
  const gItems = allItems.filter((x: any) => !!x.group_name);
  const grouped = groupBy(gItems, (x: any) => x.group_name);
  const groupKeys = gItems
    .map((x: any) => x.group_name)
    .filter((v: any, i: any, self: any) => self.indexOf(v) === i);
  return { items, grouped, groupKeys };
}

export interface ToolbarProps {
  showDescription?: boolean;
  customItems?: any;
  items?: any[];
  intl: any;
}

export interface ToolbarState {
  store?: any;
  items?: any[];
}

export enum ComponentCategory {
  UI = "UI",
  FORM = "Form",
  ELEMENT = "Elements",
  INPUT = "Inputs",
  LAYOUT = "Layouts",
  FILES = "Files",
  SPECIAL = "Special",
}

class Toolbar extends React.Component<ToolbarProps, ToolbarState> {
  constructor(props: any) {
    super(props);
    const { intl } = this.props;
    const items = buildItems(props.items, this._defaultItems(intl));
    this.state = {
      items,
    };
    this.create = this.create.bind(this);
  }

  componentDidMount() {
    store.subscribe((state: any) => this.setState({ store: state }));
  }

  static _defaultItemOptions(element: any, intl: any) {
    const { uuid } = useUUIDGenerator();
    switch (element) {
      case "Dropdown":
        return [
          {
            value: "place_holder_option_1",
            text: intl.formatMessage({ id: "place-holder-option-1" }),
            key: `dropdown_option_${uuid()}`,
          },
          {
            value: "place_holder_option_2",
            text: intl.formatMessage({ id: "place-holder-option-2" }),
            key: `dropdown_option_${uuid()}`,
          },
          {
            value: "place_holder_option_3",
            text: intl.formatMessage({ id: "place-holder-option-3" }),
            key: `dropdown_option_${uuid()}`,
          },
        ];
      case "Tags":
        return [
          {
            value: "place_holder_tag_1",
            text: intl.formatMessage({ id: "place-holder-tag-1" }),
            key: `tags_option_${uuid()}`,
          },
          {
            value: "place_holder_tag_2",
            text: intl.formatMessage({ id: "place-holder-tag-2" }),
            key: `tags_option_${uuid()}`,
          },
          {
            value: "place_holder_tag_3",
            text: intl.formatMessage({ id: "place-holder-tag-3" }),
            key: `tags_option_${uuid()}`,
          },
        ];
      case "Checkboxes":
        return [
          {
            value: "place_holder_option_1",
            text: intl.formatMessage({ id: "place-holder-option-1" }),
            key: `checkboxes_option_${uuid()}`,
          },
          {
            value: "place_holder_option_2",
            text: intl.formatMessage({ id: "place-holder-option-2" }),
            key: `checkboxes_option_${uuid()}`,
          },
          {
            value: "place_holder_option_3",
            text: intl.formatMessage({ id: "place-holder-option-3" }),
            key: `checkboxes_option_${uuid()}`,
          },
        ];
      case "RadioButtons":
        return [
          {
            value: "place_holder_option_1",
            text: intl.formatMessage({ id: "place-holder-option-1" }),
            key: `radiobuttons_option_${uuid()}`,
          },
          {
            value: "place_holder_option_2",
            text: intl.formatMessage({ id: "place-holder-option-2" }),
            key: `radiobuttons_option_${uuid()}`,
          },
          {
            value: "place_holder_option_3",
            text: intl.formatMessage({ id: "place-holder-option-3" }),
            key: `radiobuttons_option_${uuid()}`,
          },
        ];
      case "Table":
        return [
          {
            value: "table_column_1",
            text: intl.formatMessage({ id: "table-column-1" }),
            key: `table_column_${uuid()}`,
          }
        ];
      default:
        return [];
    }
  }

  _defaultItems(intl: any) {
    return [
      {
        key: "Header",
        name: intl.formatMessage({ id: "header-text" }),
        icon: "fas fa-heading",
        static: true,
        content: intl.formatMessage({ id: "place-holder-text" }),
        group_name: ComponentCategory.UI,
      },
      {
        key: "Label",
        name: intl.formatMessage({ id: "label" }),
        static: true,
        icon: "fas fa-font",
        content: intl.formatMessage({ id: "place-holder-text" }),
        group_name: ComponentCategory.ELEMENT,
      },
      {
        key: "Paragraph",
        name: intl.formatMessage({ id: "paragraph" }),
        static: true,
        icon: "fas fa-paragraph",
        content: intl.formatMessage({ id: "place-holder-text" }),
        group_name: ComponentCategory.ELEMENT,
      },
      {
        key: "LineBreak",
        name: intl.formatMessage({ id: "line-break" }),
        static: true,
        icon: "fas fa-arrows-alt-h",
        group_name: ComponentCategory.ELEMENT,
      },
      {
        key: "Dropdown",
        canHaveAnswer: true,
        name: intl.formatMessage({ id: "dropdown" }),
        icon: "far fa-caret-square-down",
        label: intl.formatMessage({ id: "place-holder-label" }),
        field_name: "dropdown_",
        options: [],
        group_name: ComponentCategory.ELEMENT,
      },
      {
        key: "Tags",
        canHaveAnswer: true,
        name: intl.formatMessage({ id: "tags" }),
        icon: "fas fa-tags",
        label: intl.formatMessage({ id: "place-holder-label" }),
        field_name: "tags_",
        options: [],
        group_name: ComponentCategory.UI,
      },
      {
        key: "Checkboxes",
        canHaveAnswer: true,
        name: intl.formatMessage({ id: "checkboxes" }),
        icon: "far fa-check-square",
        label: intl.formatMessage({ id: "place-holder-label" }),
        field_name: "checkboxes_",
        options: [],
        group_name: ComponentCategory.ELEMENT,
      },
      {
        key: "RadioButtons",
        canHaveAnswer: true,
        name: intl.formatMessage({ id: "multiple-choice" }),
        icon: "far fa-dot-circle",
        label: intl.formatMessage({ id: "place-holder-label" }),
        field_name: "radiobuttons_",
        options: [],
        group_name: ComponentCategory.ELEMENT,
      },
      {
        key: "TextInput",
        canHaveAnswer: true,
        name: intl.formatMessage({ id: "text-input" }),
        label: intl.formatMessage({ id: "place-holder-label" }),
        icon: "fas fa-font",
        field_name: "text_input_",
        group_name: ComponentCategory.INPUT,
      },
      {
        key: "EmailInput",
        canHaveAnswer: true,
        name: intl.formatMessage({ id: "email-input" }),
        label: intl.formatMessage({ id: "place-holder-email" }),
        icon: "fas fa-envelope",
        field_name: "email_input_",
        group_name: ComponentCategory.INPUT,
      },
      {
        key: "NumberInput",
        canHaveAnswer: true,
        name: intl.formatMessage({ id: "number-input" }),
        label: intl.formatMessage({ id: "place-holder-label" }),
        icon: "fas fa-plus",
        field_name: "number_input_",
        group_name: ComponentCategory.INPUT,
      },
      {
        key: "PhoneNumber",
        canHaveAnswer: true,
        name: intl.formatMessage({ id: "phone-input" }),
        label: intl.formatMessage({ id: "place-holder-phone-number" }),
        icon: "fas fa-phone",
        field_name: "phone_input_",
        group_name: ComponentCategory.INPUT,
      },
      {
        key: "TextArea",
        canHaveAnswer: true,
        name: intl.formatMessage({ id: "multi-line-input" }),
        label: intl.formatMessage({ id: "place-holder-label" }),
        icon: "fas fa-text-height",
        field_name: "text_area_",
        group_name: ComponentCategory.ELEMENT,
      },
      {
        key: "FieldSet",
        canHaveAnswer: false,
        name: intl.formatMessage({ id: "fieldset" }),
        label: intl.formatMessage({ id: "fieldset" }),
        icon: "fas fa-bars",
        field_name: "fieldset-element",
        group_name: ComponentCategory.ELEMENT,
      },
      {
        key: "TwoColumnRow",
        canHaveAnswer: false,
        name: intl.formatMessage({ id: "two-columns-row" }),
        label: "",
        icon: "fas fa-columns",
        field_name: "two_col_row_",
        group_name: ComponentCategory.LAYOUT,
      },
      {
        key: "ThreeColumnRow",
        canHaveAnswer: false,
        name: intl.formatMessage({ id: "three-columns-row" }),
        label: "",
        icon: "fas fa-columns",
        field_name: "three_col_row_",
        group_name: ComponentCategory.LAYOUT,
      },
      {
        key: "FourColumnRow",
        element: "MultiColumnRow",
        canHaveAnswer: false,
        name: intl.formatMessage({ id: "four-columns-row" }),
        label: "",
        icon: "fas fa-columns",
        field_name: "four_col_row_",
        col_count: 4,
        class_name: "col-md-3",
        group_name: ComponentCategory.LAYOUT,
      },
      {
        key: "FiveColumnRow",
        element: "MultiColumnRow",
        canHaveAnswer: false,
        name: intl.formatMessage({ id: "five-columns-row" }),
        label: "",
        icon: "fas fa-columns",
        field_name: "five_col_row_",
        col_count: 5,
        class_name: "col",
        group_name: ComponentCategory.LAYOUT,
      },
      {
        key: "SixColumnRow",
        element: "MultiColumnRow",
        canHaveAnswer: false,
        name: intl.formatMessage({ id: "six-columns-row" }),
        label: "",
        icon: "fas fa-columns",
        field_name: "six_col_row_",
        col_count: 6,
        class_name: "col-md-2",
        group_name: ComponentCategory.LAYOUT,
      },
      {
        key: "Image",
        name: intl.formatMessage({ id: "image" }),
        label: "",
        icon: "far fa-image",
        field_name: "image_",
        src: "",
        group_name: ComponentCategory.ELEMENT,
      },
      {
        key: "Rating",
        canHaveAnswer: true,
        name: intl.formatMessage({ id: "rating" }),
        label: intl.formatMessage({ id: "place-holder-label" }),
        icon: "fas fa-star",
        field_name: "rating_",
        group_name: ComponentCategory.ELEMENT,
      },
      {
        key: "DatePicker",
        canDefaultToday: true,
        canReadOnly: true,
        dateFormat: "MM/dd/yyyy",
        timeFormat: "hh:mm aa",
        showTimeSelect: false,
        showTimeSelectOnly: false,
        showTimeInput: false,
        name: intl.formatMessage({ id: "date" }),
        icon: "far fa-calendar-alt",
        label: intl.formatMessage({ id: "place-holder-label" }),
        field_name: "date_picker_",
        group_name: ComponentCategory.ELEMENT,
      },
      {
        key: "Signature",
        canReadOnly: true,
        name: intl.formatMessage({ id: "signature" }),
        icon: "fas fa-pen-square",
        label: intl.formatMessage({ id: "signature" }),
        field_name: "signature_",
        group_name: ComponentCategory.ELEMENT,
      },
      {
        key: "HyperLink",
        name: intl.formatMessage({ id: "website" }),
        icon: "fas fa-link",
        static: true,
        content: intl.formatMessage({ id: "place-holder-website-link" }),
        href: "http://www.example.com",
        group_name: ComponentCategory.ELEMENT,
      },
      {
        key: "Download",
        name: intl.formatMessage({ id: "file-attachment" }),
        icon: "fas fa-file",
        static: true,
        content: intl.formatMessage({ id: "place-holder-file-name" }),
        field_name: "download_",
        file_path: "",
        _href: "",
        group_name: ComponentCategory.ELEMENT,
      },
      {
        key: "Range",
        name: intl.formatMessage({ id: "range" }),
        icon: "fas fa-sliders-h",
        label: intl.formatMessage({ id: "place-holder-label" }),
        field_name: "range_",
        step: 1,
        default_value: 3,
        min_value: 1,
        max_value: 5,
        min_label: intl.formatMessage({ id: "easy" }),
        max_label: intl.formatMessage({ id: "difficult" }),
        group_name: ComponentCategory.ELEMENT,
      },
      {
        key: "Camera",
        name: intl.formatMessage({ id: "camera" }),
        icon: "fas fa-camera",
        label: intl.formatMessage({ id: "place-holder-label" }),
        field_name: "camera_",
        group_name: ComponentCategory.SPECIAL,
      },
      {
        key: "FileUpload",
        name: intl.formatMessage({ id: "file-upload" }),
        icon: "fas fa-file",
        label: intl.formatMessage({ id: "place-holder-label" }),
        field_name: "file_upload_",
        group_name: ComponentCategory.FILES,
      },
      {
        key: "Table",
        name: intl.formatMessage({ id: "table" }),
        icon: "fa fa-table",
        field_name: "table_",
        rows: [{ Name: 'John Doe' }],
        options: [{ key: 'name', text: 'Name', value: "Name", correct: true }],
        optionLabel: "Column",
        valueLabel: "Title",
        correctLabel: "Sortable",
        title: "Table title",
        desc: "Table description",
        group_name: ComponentCategory.ELEMENT,
      },
      {
        key: "Badge",
        name: intl.formatMessage({ id: "badge" }),
        icon: "fas fa-certificate",
        field_name: "badge_",
        title: "Badge title",
        status: "primary",
        group_name: ComponentCategory.ELEMENT,
      },
      {
        key: "Button",
        name: intl.formatMessage({ id: "button" }),
        icon: "fas fa-play",
        field_name: "button_",
        buttonLabel: "Button label",
        buttonAction: "#",
        status: "primary",
        group_name: ComponentCategory.ELEMENT,
      },
      {
        key: "Icon",
        name: intl.formatMessage({ id: "icon" }),
        icon: "fas fa-icons",
        field_name: "icon_",
        iconName: "arrow-up",
        iconWidth: 20,
        iconHeight: 20,
        status: "primary",
        group_name: ComponentCategory.ELEMENT,
      },
      {
        key: "Progressbar",
        name: intl.formatMessage({ id: "progressbar" }),
        icon: "fas fa-align-left",
        field_name: "progressbar_",
        value: 60,
        status: "primary",
        group_name: ComponentCategory.ELEMENT,
      },
      {
        key: "Social",
        name: intl.formatMessage({ id: "social" }),
        icon: "fas fa-share-alt",
        field_name: "social_",
        to: "https://facebook.com",
        socialType: "facebook",
        socialSize: 1,
        status: "primary",
        group_name: ComponentCategory.ELEMENT,
      },
    ];
  }

  addCustomOptions(item: any, elementOptions: any) {
    if (item.type === "custom") {
      const customOptions = { ...item, ...elementOptions };
      customOptions.custom = true;
      customOptions.component = item.component || null;
      customOptions.custom_options = item.custom_options || [];
      return customOptions;
    }
    return elementOptions;
  }

  create(item: any) {
    const { uuid } = useUUIDGenerator();
    const { intl } = this.props;
    const elementKey = item.element || item.key;
    const elementOptions = this.addCustomOptions(item, {
      id: uuid(),
      element: elementKey,
      text: item.name,
      group_name: item.group_name,
      static: item.static,
      required: false,
      showDescription: item.showDescription,
    });

    if (this.props.showDescription === true && !item.static) {
      elementOptions.showDescription = true;
    }

    if (item.static) {
      elementOptions.bold = false;
      elementOptions.italic = false;
    }

    if (item.canHaveAnswer) {
      elementOptions.canHaveAnswer = item.canHaveAnswer;
    }

    if (item.canReadOnly) {
      elementOptions.readOnly = false;
    }

    if (item.canDefaultToday) {
      elementOptions.defaultToday = false;
    }

    if (item.content) {
      elementOptions.content = item.content;
    }

    if (item.href) {
      elementOptions.href = item.href;
    }

    if (item.inherited !== undefined) {
      elementOptions.inherited = item.inherited;
    }

    elementOptions.canHavePageBreakBefore =
      item.canHavePageBreakBefore !== false;
    elementOptions.canHaveAlternateForm = item.canHaveAlternateForm !== false;
    elementOptions.canHaveDisplayHorizontal =
      item.canHaveDisplayHorizontal !== false;
    if (elementOptions.canHaveDisplayHorizontal) {
      elementOptions.inline = item.inline;
    }
    elementOptions.canHaveOptionCorrect = item.canHaveOptionCorrect !== false;
    elementOptions.canHaveOptionValue = item.canHaveOptionValue !== false;
    elementOptions.canPopulateFromApi = item.canPopulateFromApi !== false;

    if (item.class_name) {
      elementOptions.class_name = item.class_name;
    }

    if (elementKey === "Image") {
      elementOptions.src = item.src;
    }

    if (elementKey === "DatePicker") {
      elementOptions.dateFormat = item.dateFormat;
      elementOptions.timeFormat = item.timeFormat;
      elementOptions.showTimeSelect = item.showTimeSelect;
      elementOptions.showTimeSelectOnly = item.showTimeSelectOnly;
      elementOptions.showTimeInput = item.showTimeInput;
    }

    if (elementKey === "Download") {
      elementOptions._href = item._href;
      elementOptions.file_path = item.file_path;
    }

    if (elementKey === "Range") {
      elementOptions.step = item.step;
      elementOptions.default_value = item.default_value;
      elementOptions.min_value = item.min_value;
      elementOptions.max_value = item.max_value;
      elementOptions.min_label = item.min_label;
      elementOptions.max_label = item.max_label;
    }

    if (item.element === "MultiColumnRow") {
      elementOptions.col_count = item.col_count;
    }

    if (elementKey === "Table") {
      elementOptions.data = item.data;
      elementOptions.columns = item.columns;
      elementOptions.rows = item.rows;
      elementOptions.showHeader = item.showHeader;
      elementOptions.className = item.className;
      elementOptions.tableClassName = item.tableClassName;
      elementOptions.optionLabel = item.optionLabel;
      elementOptions.valueLabel = item.valueLabel;
      elementOptions.correctLabel = item.correctLabel;
      elementOptions.canPopulateFromApi = false;
      elementOptions.title = item.title;
      elementOptions.desc = item.desc;
    }
    
    if (elementKey === "Badge") {
      elementOptions.title = item.title;
      elementOptions.status = item.status;
    }
    
    if (elementKey === "Button") {
      elementOptions.buttonLabel = item.buttonLabel;
      elementOptions.buttonAction = item.buttonAction;
      elementOptions.status = item.status;
    }
    
    if (elementKey === "Icon") {
      elementOptions.iconName = item.iconName;
      elementOptions.iconWidth = item.iconWidth;
      elementOptions.iconHeight = item.iconHeight;
      elementOptions.status = item.status;
    }
    
    if (elementKey === "Progressbar") {
      elementOptions.value = item.value;
      elementOptions.status = item.status;
    }
    
    if (elementKey === "Social") {
      elementOptions.to = item.to;
      elementOptions.socialType = item.socialType;
      elementOptions.socialSize = item.socialSize;
      elementOptions.status = item.status;
    }

    if (item.defaultValue) {
      elementOptions.defaultValue = item.defaultValue;
    }

    if (item.field_name) {
      const ID = useUUIDGenerator();
      elementOptions.field_name = item.field_name + ID.uuid();
    }

    if (item.label) {
      elementOptions.label = item.label;
    }

    if (item.options) {
      if (item.options.length > 0) {
        elementOptions.options = item.options.map((x: any) => ({
          ...x,
          key: `custom_option_${uuid()}`,
        }));
      } else {
        elementOptions.options = Toolbar._defaultItemOptions(
          elementOptions.element,
          intl
        );
      }
    }

    return elementOptions;
  }

  _onClick(item: any) {
    // ElementActions.createElement(this.create(item));
    store.dispatch("create", this.create(item));
  }

  renderItem = (item: any) => (
    <ToolbarItem
      data={item}
      key={item.key}
      onClick={this._onClick.bind(this, item)}
      onCreate={this.create}
    />
  );

  render() {
    const { items, grouped, groupKeys } = buildGroupItems(this.state.items);
    return (
      <div className="col-md-3 col-3 react-form-builder-toolbar float-right">
        <h4>{this.props.intl.formatMessage({ id: "toolbox" })}</h4>
        <ul>
          {items.map(this.renderItem)}
          {groupKeys.map((k: any) => (
            <ToolbarGroupItem
              key={k}
              name={k}
              group={grouped.get(k)}
              renderItem={this.renderItem}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default injectIntl(Toolbar);
