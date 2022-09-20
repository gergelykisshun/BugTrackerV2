import { FC } from "react";
import RequiredStar from "../../../svg/requiredStar";
import "./style.scss";

type Props = {
  value: any;
  changeHandler: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  name: string;
  required?: boolean;
  utilityClasses?: string;
  disabled?: boolean;
};

const InputField: FC<Props> = ({
  changeHandler,
  name,
  value,
  required,
  utilityClasses,
  disabled,
}) => {
  return (
    <>
      <label htmlFor={name} className="text-field-label">
        {name}
        {required && <RequiredStar />}
      </label>
      <input
        id={name}
        type="text"
        className={`text-field-input ${utilityClasses}`}
        value={value}
        onChange={changeHandler}
        required={required}
        name={name}
        placeholder={name}
        disabled={disabled}
      />
    </>
  );
};

export default InputField;
