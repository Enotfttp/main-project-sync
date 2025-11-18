import { IEventsList } from "@entities/events";

const mockedEventsList: IEventsList[] = [
  {
    id: "1",
    serviceId: "1",
    eventDate: "24.02.2025",
    eventType: "Тип события",
    execDate: "24.03.2025",
    rollbackDate: "28.03.2025",
  },
  {
    id: "2",
    serviceId: "1",
    eventDate: "21.02.2025",
    eventType: "Тип события 2",
    execDate: "21.03.2025",
    rollbackDate: "29.03.2025",
  },
  {
    id: "3",
    serviceId: "2",
    eventDate: "31.03.3035",
    eventType: "Тип события 3",
    execDate: "31.03.3035",
    rollbackDate: "01.05.2025",
  },
];

export function eventSeeds(server) {
  mockedEventsList.forEach((auth) => {
    server.create("event", auth);
  });
}
