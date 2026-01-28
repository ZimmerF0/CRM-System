export function validateTitle(value: string): string | null {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "Поле пустое или содержит только пробелы!"
  }
  if (trimmedValue.length < 2 || trimmedValue.length > 64) {
    return "Длина текста должна быть от 2 до 64 символов"
  }
  return null;
}
