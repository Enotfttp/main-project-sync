import { StyledEventsPeriodsModal } from "./EventsPeriodsModal.styled";
import { useEventsPeriodsModalState } from "./useEventsPeriodsModal";
import { Modal } from "@shared/ui";
import * as React from "react";
// import { columnPeriodsList, columnEventsList } from './EventsPeriodsModal.column';
// import { useGetEventsList } from '@entities/events';
// import { useGetPeriodsList } from '@entities/periods';
// import { TableSort } from '@shared/ui';

export const EventsPeriodsModal = ({
  closeModal,
  isOpen,
}: ReturnType<typeof useEventsPeriodsModalState>) => {
  // const { data: dataEvents } = useGetEventsList(eventsPeriodsId as string, {
  //   enabled: !!eventsPeriodsId && isOpen,
  // });
  // const { data: dataPeriods } = useGetPeriodsList(eventsPeriodsId as string, {
  //   enabled: !!eventsPeriodsId && isOpen,
  // });

  return (
    <Modal
      dimension="xl"
      isOpen={isOpen}
      setClose={closeModal}
      title="События и Периоды"
      closeOnEscapeKeyDown
      closeOnOutsideClick
    >
      {{
        contentChildren: (
          <StyledEventsPeriodsModal>
            {/*<TableSort columnList={columnEventsList} rowList={dataEvents || []} queryKey="events-list" />*/}
            {/*<TableSort columnList={columnPeriodsList} rowList={dataPeriods || []} queryKey="periods-list" />*/}
          </StyledEventsPeriodsModal>
        ),
      }}
    </Modal>
  );
};
