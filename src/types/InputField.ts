import { Control, FieldValues, Path } from 'react-hook-form';
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

export interface IInputField<T extends FieldValues = FieldValues>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  control?: Control<T>;
  name?: Path<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rules?: any;
  label: string;
  type?: FieldTypes;
  value?: string;
  textSize?: number;
  options?: InputOption[];
  onValueChange?: (value: string | boolean) => void;
}
