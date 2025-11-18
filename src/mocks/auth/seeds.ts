import { IAuthResponse } from "@entities/auth";

interface IAuthList extends Omit<IAuthResponse, "user"> {
  user: {
    password?: string;
    id: number;
    email: string;
    username: string;
    createdAt: string;
  };
}

const mockedAuthList: IAuthList[] = [
  {
    token: "123",
    user: {
      id: 1,
      email: "test@mail.ru",
      username: "test",
      createdAt: "21.02.2025",
      password: "213",
    },
  },
  {
    token: "456",
    user: {
      id: 2,
      email: "user2@example.com",
      username: "user2",
      createdAt: "22.02.2025",
      password: "213",
    },
  },
  {
    token: "789",
    user: {
      id: 3,
      email: "user3@example.com",
      username: "user3",
      createdAt: "23.02.2025",
      password: "213",
    },
  },
  {
    token: "123",
    user: {
      id: 4,
      email: "test4@mail.ru",
      username: "123",
      createdAt: "21.02.2025",
      password: "123",
    },
  },
];

export function authSeeds(server) {
  mockedAuthList.forEach((auth) => {
    server.create("authUser", auth);
  });
}
