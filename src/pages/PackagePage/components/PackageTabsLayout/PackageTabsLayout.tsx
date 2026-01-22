import { Options, RequestTypes, Schedule } from "./components";
import { HorizontalTabsTemplate } from "@shared/ui";
import * as React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

type TTabs = "schedule" | "options" | "requestTypes";

const TABS = [
  {
    text: "Графики",
    tabId: "schedule",
  },
  {
    text: "Опции пакета",
    tabId: "options",
  },
  {
    text: "Типы запросов",
    tabId: "requestTypes",
  },
];

export const PackageTabsLayout = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error("Вы не выбрали Пакет услуг");
  }

  const [tabId, setTabId] = useState<TTabs>("schedule");

  return (
    <>
      <HorizontalTabsTemplate
        tabs={TABS}
        defaultSelectedTabId={tabId}
        onSelectTab={(tabId) => setTabId(tabId as TTabs)}
      />
      {tabId === "schedule" && <Schedule />}
      {tabId === "options" && <Options />}
      {tabId === "requestTypes" && <RequestTypes />}
    </>
  );
};
