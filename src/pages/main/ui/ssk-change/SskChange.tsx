import { SskSearchModal } from "./SskSearchModal";
import { SskUpdateModal } from "./SskUpdateModal";
import { ICorrectionalScenario } from "@entities/correctional-scenario/model/types";
import { FC, useState } from "react";

interface ISskChangeProps {
  onClose: () => void;
}

export const SskChange: FC<ISskChangeProps> = ({ onClose }) => {
  const [scenario, setScenario] = useState<ICorrectionalScenario>();

  if (scenario) {
    return <SskUpdateModal scenario={scenario} onClose={onClose} />;
  }

  return <SskSearchModal onClose={onClose} onFound={setScenario} />;
};
