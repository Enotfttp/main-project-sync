import { Column, DARK_THEME, LIGHT_THEME, Tag } from "@admiral-ds/react-ui";
import { EPackageStatus } from "@entities/package/types";
import { TTag } from "@shared/types/types";

export const statusConfig = (
  theme: typeof DARK_THEME | typeof LIGHT_THEME,
): TTag<keyof typeof EPackageStatus> => ({
  CREATED: {
    kind: "primary",
    text: EPackageStatus.CREATED,
  },
  ACTIVE: {
    kind: "success",
    text: EPackageStatus.ACTIVE,
  },
  INACTIVE: {
    kind: {
      background: `var(--admiral-color-Neutral_Neutral10, ${theme.color["Neutral/Neutral 10"]})`,
    },
    text: EPackageStatus.INACTIVE,
  },
});

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
    renderCell: (status: string) => {
      const themeStorage = localStorage.getItem("theme");
      let config;

      if (themeStorage === "dark") {
        config = statusConfig(DARK_THEME)[status];
      } else {
        config = statusConfig(LIGHT_THEME)[status];
      }
      if (!config) return null;

      return <Tag {...config}>{config.text}</Tag>;
    },
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
