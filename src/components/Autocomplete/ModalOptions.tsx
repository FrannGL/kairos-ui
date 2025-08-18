import { useEffect, useRef } from "react";
import styles from "./styles.module.scss";

interface ModalOptionsProps<T> {
  options: T[];
  value: T | null;
  getOptionLabel: (option: T) => string;
  getOptionValue?: (option: T) => string | number;
  onSelect: (option: T) => void;
  highlightedIndex: number;
}

export const ModalOptions = <T,>({
  options,
  value,
  getOptionLabel,
  getOptionValue,
  onSelect,
  highlightedIndex,
}: ModalOptionsProps<T>) => {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const currentItem = itemRefs.current[highlightedIndex];
    if (currentItem && listRef.current) {
      currentItem.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [highlightedIndex]);

  const isOptionSelected = (option: T) => {
    if (!value) return false;
    return getOptionValue
      ? getOptionValue(option) === getOptionValue(value)
      : getOptionLabel(option) === getOptionLabel(value);
  };

  if (options.length === 0) return null;

  return (
    <ul
      className={styles.optionsList}
      role="listbox"
      ref={listRef}
      aria-activedescendant={
        highlightedIndex >= 0
          ? (getOptionValue
              ? getOptionValue(options[highlightedIndex])
              : `option-${highlightedIndex}`
            ).toString()
          : undefined
      }
    >
      {options.map((option, index) => {
        const optionValue = getOptionValue
          ? getOptionValue(option).toString()
          : `option-${index}`;

        const isSelected = isOptionSelected(option);

        return (
          <li
            key={optionValue}
            id={optionValue}
            role="option"
            aria-selected={isSelected || undefined}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            data-testid={`option-${index}`}
            data-selected={isSelected ? "true" : undefined}
            data-highlighted={highlightedIndex === index ? "true" : undefined}
            className={`${styles.optionItem} 
              ${isSelected ? styles.selected : ""} 
              ${highlightedIndex === index ? styles.highlighted : ""}`}
            onClick={() => onSelect(option)}
          >
            {getOptionLabel(option)}
          </li>
        );
      })}
    </ul>
  );
};
