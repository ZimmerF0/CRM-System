import axios from "axios";

//универсальная обработка axios ошибок
export const getAxiosErrorMessage = (
  error: unknown,
  defaultMessage: string = "Произошла ошибка",
): string => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;

    switch (status) {
      case 400:
        return "Неверные данные";
      case 401:
        return "Неверный логин или пароль";
      case 409:
        return "Пользователь уже существует";
      case 500:
        return "Ошибка сервера";
      default:
        return defaultMessage;
    }
  }
  return "Ошибка сети";
};
