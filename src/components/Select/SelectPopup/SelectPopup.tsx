import type { SelectOption } from "..";
import styles from "./SelectPopup.module.scss";

interface SelectPopupProps {
  options: SelectOption[];
  value: string | number | null;
  onSelect: (option: SelectOption) => void;
}

export const SelectPopup = ({ options, value, onSelect }: SelectPopupProps) => {
  return (
    <ul className={styles.optionsList}>
      {options.map((opt) => (
        <li
          key={opt.value}
          className={value === opt.value ? styles.selectedOption : ""}
          onClick={() => onSelect(opt)}
        >
          {opt.label}
        </li>
      ))}
    </ul>
  );
};
