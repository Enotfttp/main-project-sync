import * as React from 'react';
import { useEventsPeriodsModalState } from './useEventsPeriodsModal';
import { StyledEventsPeriodsModal } from './EventsPeriodsModal.styled';
import { columnPeriodsList, columnEventsList } from './EventsPeriodsModal.column';
import { Modal } from '@shared/index';
import { useGetEventsList } from '@entities/events';
import { useGetPeriodsList } from '@entities/periods';
import { TableSort } from '@shared/index';

export const EventsPeriodsModal = ({ eventsPeriodsId, closeModal, isOpen }: ReturnType<typeof useEventsPeriodsModalState>) => {
  const { data: dataEvents } = useGetEventsList(eventsPeriodsId as string, {
    enabled: !!eventsPeriodsId && isOpen,
  });
  const { data: dataPeriods } = useGetPeriodsList(eventsPeriodsId as string, {
    enabled: !!eventsPeriodsId && isOpen,
  });

  return (
    <Modal dimension="xl" isOpen={isOpen} setClose={closeModal} title="События и Периоды" closeOnEscapeKeyDown closeOnOutsideClick>
      {{
        contentChildren: (
          <StyledEventsPeriodsModal>
            <TableSort columnList={columnEventsList} rowList={dataEvents || []} queryKey="events-list" />
            <TableSort columnList={columnPeriodsList} rowList={dataPeriods || []} queryKey="periods-list" />
          </StyledEventsPeriodsModal>
        ),
      }}
    </Modal>
  );
};
