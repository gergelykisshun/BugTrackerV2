import { FC, useRef } from "react";
import "./style.scss";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

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
    <div className="custom-select">
      <p className="text-field-label mb-1">{name}</p>
      <select
        name={name}
        id={name}
        value={value}
        onChange={changeHandler}
        className={`select-field ${utilityClasses || ""}`}
      >
        {elements.map((element, i) => (
          <option key={i} className="option-field" value={element}>
            {element}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownSelect;
