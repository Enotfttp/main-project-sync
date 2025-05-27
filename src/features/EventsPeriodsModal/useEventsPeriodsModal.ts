import { useState } from 'react';

export const useEventsPeriodsModalState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [eventsPeriodsId, setEventsPeriodsId] = useState<string | number | null>(null);
  // let isOpen, eventsPeriodsId
  const openModal = (id: string | number) => {
    setEventsPeriodsId(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setEventsPeriodsId(null);
  };

  return { isOpen, eventsPeriodsId, openModal, closeModal };
};

let modalState: ReturnType<typeof useEventsPeriodsModalState>;

export const useEventsPeriodsModal = () => {
  if (!modalState) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    modalState = useEventsPeriodsModalState();
  }
  return modalState;
};
