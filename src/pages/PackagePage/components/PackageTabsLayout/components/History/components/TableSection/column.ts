import { Column } from "@admiral-ds/react-ui";

export const columnList: Column[] = [
  {
    name: "id",
    title: "Индификатор записи",
    width: "14.2%",
  },
  {
    name: "packageSubscriptionId",
    title: "Индификатор подписки",
    width: "14.2%",
  },
  {
    name: "resultType",
    title: "Тип результата обработки запроса",
    width: "14.2%",
  },
  {
    name: "status",
    title: "Статус",
    width: "14.2%",
  },
  {
    name: "statusCode",
    title: "Код ошибки",
    width: "14.2%",
  },
  {
    name: "statusDescription",
    title: "Текст ошибки",
    width: "14.2%",
  },
  {
    name: "kafkaSendStatus",
    title: "Статус отправки сообщения",
    width: "14.2%",
  },
];
