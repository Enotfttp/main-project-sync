import { getVisibleServiceGroups } from "./model/servise";
import { PageSearch, ServiceGroup } from "./ui";
import { Page } from "@shared/ui";
import { FC, useState } from "react";

const MainPage: FC = () => {
  const [searchText, setSearchText] = useState("");
  const serviceGroups = getVisibleServiceGroups(searchText);

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
    </Page>
  );
};

export default MainPage;
