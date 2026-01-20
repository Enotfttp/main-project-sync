import { Column } from "@admiral-ds/react-ui";

export const columnList: Column[] = [
  {
    name: "id",
    title: "Индификатор записи",
    width: "20%",
  },
  {
    name: "status",
    title: "Статус",
    width: "20%",
  },
  {
    name: "accountNumber",
    title: "Номер счёта",
    width: "20%",
  },
  {
    name: "activationDateTime",
    title: "Дата подключения подписки",
    width: "20%",
    sortable: true,
    type: "date",
  },
  {
    name: "deactivationDateTime",
    title: "Дата отключения подписки",
    width: "20%",
  },
];
