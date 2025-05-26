export interface IEventsList {
  id: string;
  serviceId: string;
  eventDate: string;
  eventType: string;
  rollbackDate: string;
  execDate: string;
}

/** TODO.FIX Расшириить для большего фильтрования */
export type TFiltersEvents = {
  [K in keyof IEventsList]?: Array<IEventsList[K]> | IEventsList[K] | null;
};
