export const routesPath = {
  root: '/',
  label: 'Документы РКО',
  service: {
    root: 'service/:id',
    label: 'Подписки',
    fullPath: (id: string | number) => `service/${id}`,
    events: {
      label: 'События',
      root: 'service/:id/events/:serviceId',
      shortPath: (serviceId: string | number) => `events/${serviceId}`,
      fullPath: (id: string | number, serviceId: string | number) => `service/${id}/events/${serviceId}`,
    },
    periods: {
      label: 'Периоды',
      root: 'service/:id/periods/:serviceId',
      shortPath: (serviceId: string | number) => `periods/${serviceId}`,
      fullPath: (id: string | number, serviceId: string | number) => `service/${id}/periods/${serviceId}`,
    },
  },
  testUIPage: 'testUIPage',
};
