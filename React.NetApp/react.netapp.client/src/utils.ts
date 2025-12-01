export function dateFormatter(value: string): string {
  const newDate = new Date(value);

  return `${newDate.toLocaleString()}`;
}
