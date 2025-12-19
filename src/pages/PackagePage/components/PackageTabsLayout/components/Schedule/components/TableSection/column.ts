import { Column } from "@admiral-ds/react-ui";

export const columnList: Column[] = [
  {
    name: "id",
    title: "Индификатор записи",
    width: "7.6%",
  },
  {
    name: "status",
    title: "Статус",
    width: "7.6%",
  },
  {
    name: "dataName",
    title: "Наименование ПУ",
    width: "7.6%",
  },
  {
    name: "dataTrfNumber",
    title: "Номер ПУ",
    width: "7.6%",
  },
  {
    name: "utilityCurrencyTariff",
    title: "Валюта тарифа",
    width: "7.6%",
  },
  {
    name: "utilityAmountFullCur",
    title: "Общая сумма комисии с учётом скидок, без НДС",
    width: "7.6%",
  },
  {
    name: "utilityPriority",
    title: "Приоритет оплаты",
    width: "7.6%",
  },
  {
    name: "vatDocumentTypeAmountFullNds",
    title: "Общая сумма комисии с учётом скидок, с НДС",
    width: "7.6%",
  },
  {
    name: "vatDocumentTypeVatRate",
    title: "Ставка НДС",
    width: "7.6%",
  },
  {
    name: "vatDocumentTypeAmountNdsCur",
    title: "Сумма НДС в валюте тарифа",
    width: "7.6%",
  },
  {
    name: "processDocProcessCode",
    title: "Код управляющего признака",
    width: "7.6%",
  },
  {
    name: "processDocProcessStartDate",
    title: "Дата начала списания комиссии",
    width: "7.6%",
  },
  {
    name: "processDocProcessEndDate",
    title: "Дата окончания списания комиссии",
    width: "7.6%",
  },
];
