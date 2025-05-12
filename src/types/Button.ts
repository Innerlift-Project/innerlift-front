export enum ButtonVariant {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  OUTLINE = "outline",
  GHOST = "ghost",
}

export enum ButtonSize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

export interface IconProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: IconProps;
  iconPosition?: "left" | "right";
}

export interface ButtonProps
  extends BaseButtonProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void | Promise<void>;
}
