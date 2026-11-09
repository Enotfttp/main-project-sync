import { OptionInfo } from "./ui/OptionInfo";
import { PageBack } from "@shared/ui";
import { InfoPage, InfoPageContainer } from "@shared/ui/page/Page";
import { FC } from "react";
import { useParams } from "react-router-dom";

export const OptionInfoPage: FC = () => {
  const { idOption } = useParams();

  if (!idOption) throw new Error("Нет id опции");

  return (
    <InfoPage>
      <PageBack />
      <InfoPageContainer>
        <OptionInfo id={idOption} />
      </InfoPageContainer>
    </InfoPage>
  );
};

export default OptionInfoPage;
