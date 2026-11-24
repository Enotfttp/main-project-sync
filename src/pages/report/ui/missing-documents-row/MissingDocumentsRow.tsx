import {
  Chevron,
  Details,
  ExpandButton,
  IdLink,
  Line,
  MissingHeader,
  MissingRow,
} from "./MissingDocumentsRow.styled";
import { T } from "@admiral-ds/react-ui";
import { FC, MouseEvent, useState } from "react";

interface IProps {
  requestId: string;
  scheduleId: string;
  defaultOpened?: boolean;
}

export const stopNavigation = (event: MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();
};

export const MissingDocumentsRow: FC<IProps> = ({
  requestId,
  scheduleId,
  defaultOpened = false,
}) => {
  const [isOpened, setIsOpened] = useState(defaultOpened);

  return (
    <MissingRow>
      <MissingHeader>
        <ExpandButton
          dimension="mBig"
          highlightFocus={false}
          aria-expanded={isOpened}
          aria-label={isOpened ? "Свернуть строку" : "Раскрыть строку"}
          onClick={() => setIsOpened((opened) => !opened)}
        >
          <Chevron $isOpened={isOpened} aria-hidden />
        </ExpandButton>
        Документы отсутствуют
      </MissingHeader>
      {isOpened && (
        <Details>
          <Line>
            <T font="Body/Body 2 Long">Идентификатор запроса:</T>
            <IdLink
              href="#"
              dimension="s"
              appearance="primary"
              onClick={stopNavigation}
            >
              {requestId}
            </IdLink>
          </Line>
          <Line>
            <T font="Body/Body 2 Long">Идентификатор графика:</T>
            <IdLink
              href="#"
              dimension="s"
              appearance="primary"
              onClick={stopNavigation}
            >
              {scheduleId}
            </IdLink>
          </Line>
        </Details>
      )}
    </MissingRow>
  );
};
