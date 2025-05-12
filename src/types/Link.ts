import { LinkProps as NextLinkProps } from "next/link";

export enum LinkVariant {
  DEFAULT = "default",
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

export interface CustomLinkProps extends NextLinkProps {
  variant?: LinkVariant;
  className?: string;
  children: React.ReactNode;
}
