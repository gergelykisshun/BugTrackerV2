import { FC } from "react";

type Props = {
  elements: string[];
  value: string;
  name: string;
  changeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const DropdownSelect: FC<Props> = ({
  elements,
  name,
  value,
  changeHandler,
}) => {
  return (
    <select name={name} id={name} value={value} onChange={changeHandler}>
      {elements.map((element) => (
        <option value={element}>{element}</option>
      ))}
    </select>
  );
};

export default DropdownSelect;
