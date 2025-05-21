export const routesPath = {
  root: '/',
  service: {
    root: 'service',
    packages: {
      root: 'packages/:id',
      fullPath: (id: string | number) => `service/packages/${id}`,
      shortPath: (id: string | number) => `packages/${id}`,
    },
    connections: {
      root: 'connections/:id',
      fullPath: (id: string | number) => `service/connections/${id}`,
      shortPath: (id: string | number) => `connections/${id}`,
    },
  },
  testUIPage: 'testUIPage',
};
