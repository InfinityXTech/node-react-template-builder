/* eslint-disable max-classes-per-file */
import * as React from 'react';
import { LanguageType } from '../src/types/local';
import { Column, DataItem } from '../src/types/table';
import { SYSTEM_STATUS } from '../src/form-elements/components/Badge';
import { ICONS_STATUS } from '../src/form-elements/components/Icon/icons-status.consts';
import { Icons } from '@keen.io/icons';
import { Socials } from '../src/form-elements/components/Social';

type BaseElement = {
  id: string;
  element:
    | "Header Text"
    | "Label"
    | "Paragraph"
    | "Line Break"
    | "Dropdown"
    | "Tags"
    | "Checkboxes"
    | "Multiple Choice"
    | "Text Input"
    | "Number Input"
    | "Multi-line Input"
    | "Two Column Row"
    | "Three Column Row"
    | "Multi Column Row"
    | "Image"
    | "Rating"
    | "Date"
    | "Signature"
    | "Web site"
    | "Fieldset"
    | "File Attachment"
    | "Range"
    | "Camera"
    | "Table"
    | "Badge"
    | "Button"
    | "Icon"
    | "Progressbar"
    | "Social";
  showDescription?: boolean;
  required: boolean;
  canHaveAlternateForm: boolean;
  canHaveDisplayHorizontal: boolean;
  canHaveOptionCorrect: boolean;
  canHaveOptionValue: boolean;
  canHavePageBreakBefore: boolean;
  canPopulateFromApi: boolean;
  text: string;
};
export type StaticElement = {
  bold: boolean;
  content: string;
  inline?: boolean;
  italic: boolean;
  static: true;
};
export type FormBuilderInput = {
  canHaveAnswer?: true;
  field_name: string;
  label: string;
};
export type Option = {
  key: string;
  label?: string;
  text: string;
  value: string;
};
export type SelectableElement = {
  options: Option[];
} & FormBuilderInput;
export type ImageElement = {
  field_name: string;
  src: string;
};
export type TableElement = {
  rows: DataItem[];
  options: Column[];
  showHeader?: boolean;
  className?: string;
  tableClassName?: string;
} & FormBuilderInput;
export type BadgeElement = {
  title: string;
  status: SYSTEM_STATUS;
} & FormBuilderInput;
export type ButtonElement = {
  buttonLabel: string;
  buttonAction: string;
  status: string;
} & FormBuilderInput;
export type IconElement = {
  iconName: typeof Icons[number];
  iconWidth: number;
  iconHeight: number;
  status: ICONS_STATUS;
} & FormBuilderInput;
export type ProgressbarElement = {
  value: number;
  status: string;
} & FormBuilderInput;
export type SocialElement = {
  to: string;
  socialType: typeof Socials[number];
  socialSize: number;
  status: string;
} & FormBuilderInput;
export type DateElement = {
  dateFormat: string;
  defaultToday: boolean;
  readOnly: boolean;
  showTimeSelect: boolean;
  showTimeSelectOnly: boolean;
  showTimeInput: boolean;
  timeFormat: string;
} & FormBuilderInput;
export type RangeElement = {
  max_label: string;
  max_value: number;
  min_label: string;
  min_value: number;
} & FormBuilderInput;
export type FileElement = {
  _href: string;
  file_path: string;
  field_name: string;
} & StaticElement;
export type WebsiteElement = {
  href: string;
} & StaticElement;
export type SignatureElement = {
  readOnly: boolean;
} & FormBuilderInput;
export type TaskData = BaseElement &
  (| StaticElement
    | FormBuilderInput
    | SelectableElement
    | ImageElement
    | DateElement
    | RangeElement
    | WebsiteElement
    | FileElement
    | SignatureElement
    // eslint-disable-next-line no-use-before-define
    | FormBuilderLayout
    | TableElement
    | BadgeElement
    | ButtonElement
    | IconElement
    | ProgressbarElement
    | SocialElement
  );
export type FormBuilderLayout = {
  isContainer: true;
  childItems: TaskData[];
  field_name: string;
};
export type FormBuilderPostData = {
  task_data: TaskData[];
};

export type ToolbarItem = {
  key: string;
  name: string;
  static: boolean;
  icon: string;
  content: string;
};

export interface FormBuilderProps {
  toolbarItems?: ToolbarItem[];
  customToolbarItems?: ToolbarItem[];
  locale?: LanguageType;
  files?: any[];
  data?: any;
  url?: string;
  showCorrectColumn?: boolean;
  show_description?: boolean;
  onLoad?: () => Promise<FormBuilderPostData>;
  onPost?: (data: FormBuilderPostData) => void;
  saveUrl?: string;
  saveAlways?: boolean;
  editMode?: boolean;
  variables?: Record<any, any>;
  renderEditForm?: (props: BaseElement) => React.ReactNode;
}

export class ReactFormBuilder extends React.Component<FormBuilderProps> {}

export interface FormGeneratorOnSubmitParams {
  id: number;
  name: string;
  custom_name: string;
  value: string | string[];
}

export interface FormGeneratorProps {
  form_action: string;
  form_method: string;
  action_name?: string;
  onBlur?: (info: FormGeneratorOnSubmitParams[]) => void;
  onSubmit?: (info: FormGeneratorOnSubmitParams[]) => void;
  onChange?: (info: FormGeneratorOnSubmitParams[]) => void;
  data: any[];
  back_action?: string;
  back_name?: string;
  task_id?: number;
  answer_data?: any;
  authenticity_token?: string;
  hide_actions?: boolean;
  skip_validations?: boolean;
  display_short?: boolean;
  read_only?: boolean;
  // eslint-disable-next-line no-undef
  variables?: Record<any, any>;
  submitButton?: JSX.Element;
}

export class ReactFormGenerator extends React.Component<FormGeneratorProps> {}

export type ActionType = "load" | "updateOrder" | "delete";

export class ElementStore {
  static dispatch: (type: ActionType, data: any) => void;
}

export class Registry {
  static register: (name: string, component: React.ReactNode) => void;

  static list: () => string[];

  static get: (name: string) => React.ReactNode;
}
