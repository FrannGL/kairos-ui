export function filterOptions<T>(
  options: T[],
  inputValue: string,
  getOptionLabel: (option: T) => string
) {
  const query = inputValue.toLowerCase().trim();
  if (!query) return options;

  return options.filter((option) =>
    getOptionLabel(option).toLowerCase().includes(query)
  );
}
