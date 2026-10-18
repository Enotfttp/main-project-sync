import {
  StyledServiceCard,
  StyledServiceGroup,
  StyledServiceList,
} from "./ServiceGroup.styled";
import { IServiceItem } from "../../model/types";
import { Link, T, TextButton } from "@admiral-ds/react-ui";
import React, { FC } from "react";
import { Link as RouterLink } from "react-router-dom";

interface IServiceGroupProps {
  title: string;
  services: IServiceItem[];
}

export const ServiceGroup: FC<IServiceGroupProps> = ({ title, services }) => {
  return (
    <StyledServiceGroup>
      <T font="Subtitle/Subtitle 2" as="h2">
        {title}
      </T>
      <StyledServiceList>
        {services.map((service) => (
          <StyledServiceCard key={service.id}>
            {service.to ? (
              <Link
                as={RouterLink}
                to={service.to}
                dimension="s"
                appearance="primary"
              >
                {service.label}
              </Link>
            ) : (
              <TextButton
                dimension="s"
                text={service.label}
                onClick={service.action}
                textCssMixin={{
                  fontWeight: 400,
                }}
              />
            )}
          </StyledServiceCard>
        ))}
      </StyledServiceList>
    </StyledServiceGroup>
  );
};
