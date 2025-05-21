import styled, { css } from 'styled-components';
import { Chips, typography } from '@admiral-ds/react-ui';

export const disabledChipStyle = css`
  pointer-events: auto;
  &:hover {
    color: var(Neutral/Neutral 30, ${(p) => p.theme.color['Neutral/Neutral 30']});
  }
`;

export const hoverChipStyle = css`
  &:hover {
    background-color: var(Neutral/Neutral 10, ${(p) => p.theme.color['Neutral/Neutral 10']});
  }
`;

export const StyledChip = styled(Chips)<{ readOnly?: boolean }>`
  display: flex;
  min-width: 35px;
  max-width: 190px;

  @media (max-width: 768px) {
    max-width: 80px;
  }

  ${({ disabled, readOnly }) => (disabled ? disabledChipStyle : readOnly ? null : hoverChipStyle)}

  ${typography['Caption/Caption 1']};
`;
