export enum FieldTypes {
  TEXT = "text",
  PSWD = "password",
  EMAIL = "email",
  COMBO = "combo",
}

export interface InputOption {
  value: string;
  label: string;
}

export interface IInputField
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  type?: FieldTypes;
  value?: string;
  textSize?: number;
  options?: InputOption[];
  onValueChange?: (value: string | boolean) => void;
}
