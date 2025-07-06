import { InputHTMLAttributes } from "react";
import {ReactNode} from "react";

export enum CheckboxVariant {
  DEFAULT = "default",
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: CheckboxVariant;
  labelClassName?: string;
  className?: string;
  textSize?: number;
  children?: ReactNode;
  onValueChange?: (value: boolean) => void;
}
