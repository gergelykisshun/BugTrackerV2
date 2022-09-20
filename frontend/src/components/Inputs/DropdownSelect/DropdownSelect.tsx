import { FC } from "react";
import "./style.scss";

type Props = {
  elements: string[];
  value: string;
  name: string;
  changeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  utilityClasses?: string;
};

const DropdownSelect: FC<Props> = ({
  elements,
  name,
  value,
  changeHandler,
  utilityClasses,
}) => {
  return (
    <>
      <p className="text-field-label mb-1">{name}</p>
      <select
        name={name}
        id={name}
        value={value}
        onChange={changeHandler}
        className={utilityClasses || ""}
      >
        {elements.map((element) => (
          <option value={element}>{element}</option>
        ))}
      </select>
    </>
  );
};

export default DropdownSelect;
