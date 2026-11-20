import { DocumentInfo } from "./ui/DocumentInfo";
import { PageBack } from "@shared/ui";
import { InfoPage, InfoPageContainer } from "@shared/ui/page/Page";
import { FC } from "react";
import { useParams } from "react-router-dom";

export const DocumentInfoPage: FC = () => {
  const { idDocument } = useParams();

  if (!idDocument) throw new Error("Нет id документа");

  return (
    <InfoPage>
      <PageBack />
      <InfoPageContainer>
        <DocumentInfo id={idDocument} />
      </InfoPageContainer>
    </InfoPage>
  );
};

export default DocumentInfoPage;
