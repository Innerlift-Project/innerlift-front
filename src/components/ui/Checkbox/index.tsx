import { CheckboxProps, CheckboxVariant } from "@/types/Checkbox";
import styles from "./styles.module.css";

export default function Checkbox(props: CheckboxProps) {
  const checkboxId =
  props.id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  const checkboxClasses = [
    styles.checkbox,
    styles[`variant-${props.variant || CheckboxVariant.DEFAULT}`],
    props.className,
  ].join(" ");

  return (
    <div className={styles.checkboxContainer}>
      <label className={styles.label} htmlFor={checkboxId}>
        <input
          type="checkbox"
          id={checkboxId}
          className={checkboxClasses}
        />
        <span className={styles.checkmark}>
          <svg
            className={styles.checkIcon}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 6L9 17L4 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </label>
      {(props.children || props.label) && (
        <label
          htmlFor={checkboxId}
          className={`${styles.labelText} ${props.labelClassName}`}
        >
          {props.children || props.label}
        </label>
      )}
    </div>
  );
}
