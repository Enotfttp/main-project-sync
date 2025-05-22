export const routesPath = {
  root: '/',
  label: 'Документы РКО',
  service: {
    root: 'service',
    packages: {
      label: 'Пакеты услуг',
      root: 'packages/:id',
      fullPath: (id: string | number) => `service/packages/${id}`,
      shortPath: (id: string | number) => `packages/${id}`,
    },
    connections: {
      label: 'Подписки',
      root: 'connections/:id',
      fullPath: (id: string | number) => `service/connections/${id}`,
      shortPath: (id: string | number) => `connections/${id}`,
    },
  },
  testUIPage: 'testUIPage',
};
