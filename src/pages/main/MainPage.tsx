import { getVisibleServiceGroups } from "./lib/servise";
import { PageSearch, ServiceGroup, SskChange } from "./ui";
import { Page } from "@shared/ui";
import { FC, useState } from "react";

const MainPage: FC = () => {
  const [searchText, setSearchText] = useState("");
  const [isSskChangeOpen, setIsSskChangeOpen] = useState(false);
  const serviceGroups = getVisibleServiceGroups(searchText, {
    "ssk-change": () => setIsSskChangeOpen(true),
  });

  return (
    <Page>
      <PageSearch value={searchText} onChange={setSearchText} />
      {serviceGroups.map((group) => (
        <ServiceGroup
          key={group.id}
          title={group.title}
          services={group.services}
        />
      ))}
      {isSskChangeOpen && (
        <SskChange onClose={() => setIsSskChangeOpen(false)} />
      )}
    </Page>
  );
};

export default MainPage;
