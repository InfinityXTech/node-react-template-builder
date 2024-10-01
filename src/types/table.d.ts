import { CSSProperties } from "react";

export interface Column {
  key: string;
  value: string;
  text: string;
}

export interface DataItem {
  [key: string]: React.ReactNode;
}

export interface ITableProps {
  rows: DataItem[];
  options: Column[];
  showHeader?: boolean;
  className?: string;
  tableClassName?: string;
  data: ITableData;
  style?: CSSProperties;
}

export interface ITableData {
  field_name: string;
  pageBreakBefore: boolean;
  rows: DataItem[];
  options: Column[];
  tableClassName?: string;
  showHeader?: boolean;
  className?: string;
  title: string;
  desc?: string;
}