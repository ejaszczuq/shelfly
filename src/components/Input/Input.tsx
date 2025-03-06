import React from "react";
import { FieldProps } from "formik";
import classNames from "classnames";
import "./Input.scss";
import DynamicIcon from "../DynamicIcon";

type InputVariant = "outlined" | "underlined";

interface InputProps extends FieldProps {
  label?: string;
  variant?: InputVariant;
  placeholder?: string;
  maxLength?: number;
  type?: "text" | "number" | "textarea";
  prefixIcon?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  variant = "outlined",
  placeholder,
  maxLength,
  type = "text",
  prefixIcon,
  field,
  form: { touched, errors, setFieldValue }
}) => {
  const hasError = touched[field.name] && errors[field.name];
  const labelOrError = hasError ? errors[field.name] : label;

  const handleClear = () => {
    setFieldValue(field.name, "");
  };

  return (
    <div
      className={classNames("input-container", variant, {
        error: hasError
      })}
    >
      {labelOrError && <label className="input-label">{labelOrError as string}</label>}

      <div className="input-wrapper">
        {prefixIcon && <DynamicIcon iconName={prefixIcon} fontSize="medium" color="action" className="prefix-icon" />}

        {type === "textarea" ? (
          <textarea {...field} className="input-field textarea" placeholder={placeholder} maxLength={maxLength} />
        ) : (
          <input {...field} className="input-field" type={type} placeholder={placeholder} maxLength={maxLength} />
        )}

        {maxLength && (
          <span className="char-count">
            {field.value.length} / {maxLength}
          </span>
        )}
        {field.value && <DynamicIcon className="clear-icon" onClick={handleClear} iconName="DeleteSweepTwoTone" />}
      </div>
    </div>
  );
};

export default Input;
