import {
  ChangeEvent,
  HTMLInputTypeAttribute,
  KeyboardEvent,
  ReactNode,
} from "react";
import { Controller, ControllerProps, FieldValues } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export type InputProps = {
  required?: boolean;
  name?: string;
  field_name: string;
  type?: HTMLInputTypeAttribute;
  style?: React.CSSProperties;
  inputProp?: HTMLInputElement;
  iconShowHidePass?: ReactNode;
  showArrow?: boolean;
  sizeInput?: "small" | "medium";
  markIcon?: ReactNode;
  subClassName?: string;
} & Omit<ControllerProps<any & FieldValues, any>, "render"> &
  React.HTMLProps<HTMLInputElement>;
const Input = ({
  required,
  type = "text",
  name,
  field_name,
  style,
  iconShowHidePass,
  showArrow,
  maxLength,
  onKeyDown,
  sizeInput = "medium",
  onKeyPress,
  onChange,
  markIcon,
  subClassName,
  onFocus,
  control,
  ...props
}: InputProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (onKeyDown) return onKeyDown(e);
    if (type === "number" && /^[+\-e]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (maxLength && e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }
  };

  return (
    <Controller
      render={({ field, fieldState }) => (
        <label
          className={
            "form-control relative w-full flex self-start flex-col gap-1"
          }
        >
          {name && (
            <div
              className={twMerge(
                "flex items-center gap-2 mb-1 font-semibold text-xs text-[#383E42]",
                subClassName
              )}
            >
              <div>
                {name}
                {required && <span className={"text-[#DF4848]"}> *</span>}
              </div>
              {markIcon}
            </div>
          )}
          <div className="relative w-full">
            <input
              {...field}
              {...props}
              value={field.value}
              onChange={(e) => {
                field.onChange(e);
                if (onChange) onChange(e);
              }}
              className={twMerge(
                " w-full border-[#E9E9E9] ring-transparent custom-date-input transition-all rounded duration-300 outline-none focus:outline-none focus:ring-1 ease-in-out focus:ring-[#1C64F2] focus:border-[#1C64F2]",
                fieldState.error &&
                  "ring-[#FF2626] focus:ring-[#FF2626] focus:border-[#FF2626] border-[#FF2626]",
                !showArrow && "no-arrow",
                !field.value && "has-value show-placeholder",
                sizeInput === "medium" ? "input-md" : "input-sm h-9",
                props.className
              )}
              style={style}
              autoComplete={props.autoComplete}
              onKeyDown={handleKeyDown}
              placeholder={props.placeholder}
              onKeyPress={onKeyPress}
              type={type}
              // min={1}
              maxLength={maxLength}
              onInput={handleInput}
              onFocus={(e) => {
                if (type === "number") {
                  e.target.addEventListener(
                    "wheel",
                    function (e) {
                      e.preventDefault();
                    },
                    { passive: false }
                  );
                }

                if (onFocus) onFocus(e);
              }}
            />
            {iconShowHidePass}
          </div>
          {fieldState.error && fieldState.error.message && (
            <small className="font-medium text-[#FF2626]">
              {fieldState.error && fieldState.error.message}
            </small>
          )}
        </label>
      )}
      name={field_name}
      control={control}
    />
  );
};

export default Input;
