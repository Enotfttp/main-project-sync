import { EPaymentScheduleStatus } from "@entities/schedule/types";
import { RenderField } from "@features/Fields/RenderFields.types";

export const filterFields: RenderField[] = [
  {
    id: "id",
    name: "id",
    type: "number",
    label: "Индификатор записи",
    placeholder: "Введите индификатор записи...",
  },

  {
    id: "dataName",
    name: "dataName",
    type: "text",
    label: "Наименование ПУ",
    placeholder: "Введите наименование ПУ...",
  },
  {
    id: "dataTrfNumber",
    name: "dataTrfNumber",
    type: "text",
    label: "Номер ПУ",
    placeholder: "Введите номер ПУ...",
  },
  {
    id: "status",
    name: "status",
    type: "select",
    label: "Статус",
    placeholder: "Выберите статус...",
    options: Object.entries(EPaymentScheduleStatus).map(([key, val]) => ({
      value: key,
      label: val,
    })),
  },
  {
    id: "utilityCurrencyTariff",
    name: "utilityCurrencyTariff",
    type: "text",
    label: "Валюта тарифа",
    placeholder: "Введите валюту тарифа...",
  },
  {
    id: "utilityAmountFullCur",
    name: "utilityAmountFullCur",
    type: "number",
    label: "Общая сумма комисии с учётом скидок, без НДС",
    placeholder: "Введите общую сумму комисии с учётом скидок, без НДС...",
  },
  {
    id: "utilityPriority",
    name: "utilityPriority",
    type: "number",
    label: "Приоритет оплаты",
    placeholder: "Введите приоритет оплаты...",
  },
  {
    id: "vatDocumentTypeAmountFullNds",
    name: "vatDocumentTypeAmountFullNds",
    type: "number",
    label: "Общая сумма комисии с учётом скидок, с НДС",
    placeholder: "Введите общую сумму комисии с учётом скидок, с НДС...",
  },
  {
    id: "vatDocumentTypeVatRate",
    name: "vatDocumentTypeVatRate",
    type: "number",
    label: "Ставка НДС",
    placeholder: "Введите ставку НДС...",
  },
  {
    id: "vatDocumentTypeAmountNdsCur",
    name: "vatDocumentTypeAmountNdsCur",
    type: "number",
    label: "Сумма НДС в валюте тарифа",
    placeholder: "Введите сумму НДС в валюте тарифа...",
  },
  {
    id: "processDocProcessCode",
    name: "processDocProcessCode",
    type: "text",
    label: "Код управляющего признака",
    placeholder: "Введите код управляющего признака...",
  },
  {
    id: "processDocProcessStartDate",
    name: "processDocProcessStartDate",
    type: "date",
    label: "Дата начала списания комиссии",
    placeholder: "Введите дату начала списания комиссии...",
  },
  {
    id: "processDocProcessEndDate",
    name: "processDocProcessEndDate",
    type: "date",
    label: "Дата окончания списания комиссии",
    placeholder: "Введите дату окончания списания комиссии...",
  },
];
