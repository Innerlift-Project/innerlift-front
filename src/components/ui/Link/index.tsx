import NextLink from "next/link";
import { LinkVariant, CustomLinkProps } from "@/types/Link";
import styles from "./styles.module.css";

export default function Link({
  children,
  variant = LinkVariant.DEFAULT,
  className = "",
  ...props
}: CustomLinkProps) {
  const linkClasses = [
    styles.link,
    styles[`variant-${variant}`],
    className,
  ].join(" ");

  return (
    <NextLink {...props} className={linkClasses}>
      {children}
    </NextLink>
  );
}
