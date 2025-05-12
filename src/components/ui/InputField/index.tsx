import styles from "./styles.module.css"
import { IInputField, FieldTypes } from "@/types/InputField";

export default function Inputfield(props: IInputField) {
  const type = props.type || FieldTypes.TEXT;
  if (type === FieldTypes.COMBO) {
    if (!props.options) {
      throw new ReferenceError(
        "InputField with type = COMBO must specify options"
      );
    }
    return (
      <div className={styles.inputContainer}>
        <label htmlFor={props.name} className={styles.inputLabel}>
          {props.label}
        </label>
        <select
          name={props.name}
          required={props.required}
          className={styles.inputData}
          disabled={props.disabled}
          value={props.value}
          onChange={(e) => {
            if (props.onValueChange) {
              props.onValueChange(e.target.value);
            }
          }}
        >
          {props.options.map((opt, index) => (
            <option key={`${opt}-${index}`} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  } else {
    return (
      <div className={styles.inputContainer}>
        <label htmlFor={props.name} className={styles.inputLabel}>
          {props.label}
        </label>
        <input
          type={type}
          name={props.name}
          value={props.value}
          required={props.required}
          disabled={props.disabled}
          placeholder={props.placeholder}
          className={styles.inputData}
          minLength={props.minLength}
          pattern={props.pattern}
          title={props.title}
          onChange={(e) => {
            if (props.onValueChange) {
              props.onValueChange(e.target.value);
            }
          }}
        />
      </div>
    );
  }
}
