const mockedRKOList = [
  {
    id: "1",
    client: "МБАУМ ООО",
    bankAccount: "001232131231",
  },
  {
    id: "2",
    client: "МБАУМ ООО",
    bankAccount: "123123123",
  },
];

export function rkoSeeds(server) {
  mockedRKOList.forEach((auth) => {
    server.create("rko", auth);
  });
}
