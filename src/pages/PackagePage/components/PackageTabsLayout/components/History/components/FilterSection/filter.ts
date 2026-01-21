import {
  ComcRequestStatusText,
  ComcResultTypeText,
  RequestHistoryKafkaStatusText,
} from "@entities/history/types";
import { FilterField } from "@features/Filter/Filter.types";

export const filterFields: FilterField[] = [
  {
    id: "id",
    name: "id",
    type: "number",
    label: "Индификатор записи",
    placeholder: "Введите индификатор записи...",
  },

  {
    id: "packageSubscriptionId",
    name: "packageSubscriptionId",
    type: "number",
    label: "Индиификатор подписки",
    placeholder: "Введите индиификатор подписки...",
  },
  {
    id: "resultType",
    name: "resultType",
    type: "select",
    label: "Тип результата обработки запроса",
    placeholder: "Введите тип результата обработки запроса...",
    options: Object.entries(ComcResultTypeText).map(([key, val]) => ({
      value: key,
      label: val,
    })),
  },
  {
    id: "status",
    name: "status",
    type: "select",
    label: "Статус",
    placeholder: "Выберите статус...",
    options: Object.entries(ComcRequestStatusText).map(([key, val]) => ({
      value: key,
      label: val,
    })),
  },
  {
    id: "statusCode",
    name: "statusCode",
    type: "text",
    label: "Код ошибки",
    placeholder: "Введите код ошибки...",
  },
  {
    id: "statusDescription",
    name: "statusDescription",
    type: "text",
    label: "Текст ошибки",
    placeholder: "Введите текст ошибки...",
  },
  {
    id: "kafkaSendStatus",
    name: "kafkaSendStatus",
    type: "select",
    label: "Статус отправки сообщения",
    placeholder: "Введите статус отправки сообщения...",
    options: Object.entries(RequestHistoryKafkaStatusText).map(
      ([key, val]) => ({
        value: key,
        label: val,
      }),
    ),
  },
];
