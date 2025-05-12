"use client";

import styles from "./styles.module.css";
import Image from "next/image";
import { ButtonVariant, ButtonProps } from "@/types/Button";

export default function Button(props: ButtonProps) {
  const iconPosition = props.iconPosition || "left";
  const handleClick = async () => {
    if (props.disabled) return;

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      props.onClick && (await props.onClick());
    } catch (error) {
      console.error("Button click error:", error);
    }
  };

  const buttonClasses = [
    styles.button,
    styles[`variant-${props.variant || ButtonVariant.PRIMARY}`],
    styles[`size-${props.size}`],
    props.fullWidth ? styles.fullWidth : "",
    props.disabled ? styles.disabled : "",
    props.className,
  ].join(" ");

  return (
    <button
      type={props.type}
      className={buttonClasses}
      disabled={props.disabled}
      onClick={handleClick}
    >
      {props.icon && iconPosition === "left" && (
        <Image
          src={props.icon.src}
          alt={props.icon.alt || "Button icon"}
          width={props.icon.width || 24}
          height={props.icon.height || 24}
        />
      )}
      {props.children}
      {props.icon && iconPosition === "right" && (
        <Image
          src={props.icon.src}
          alt={props.icon.alt || "Button icon"}
          width={props.icon.width || 24}
          height={props.icon.height || 24}
        />
      )}
    </button>
  );
}
