import { Row, SectionTitle, Value } from "./Modal.styled";
import { T } from "@admiral-ds/react-ui";
import { FC, ReactNode } from "react";

const isEmpty = (value: ReactNode) =>
  value == null || value === false || value === "";

interface IInfoRowProps {
  label: string;
  children?: ReactNode;
}

export const InfoRow: FC<IInfoRowProps> = ({ label, children }) => (
  <Row>
    <T font="Body/Body 2 Long" color="Neutral/Neutral 50">
      {label}
    </T>
    <Value>
      {isEmpty(children) ? (
        <T font="Body/Body 2 Long" color="Neutral/Neutral 90">
          —
        </T>
      ) : typeof children === "string" || typeof children === "number" ? (
        <T font="Body/Body 2 Long" color="Neutral/Neutral 90">
          {children}
        </T>
      ) : (
        children
      )}
    </Value>
  </Row>
);

export const SectionInfo: FC<{
  title: string;
  icon: ReactNode;
  children: ReactNode;
}> = ({ title, icon, children }) => (
  <>
    <SectionTitle>
      {icon}
      <T font="Subtitle/Subtitle 3" color="Primary/Primary 60 Main">
        {title}
      </T>
    </SectionTitle>

    {children}
  </>
);
