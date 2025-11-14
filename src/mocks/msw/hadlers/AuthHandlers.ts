import {
  IAuthResponse,
  ILoginCredentials,
  IRegisterData,
} from "@entities/auth";
import { createApiUrl } from "@mocks/msw/config";
import { uid } from "@shared/common";
import { HttpResponse, http } from "msw";

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

export const authHandlers = [
  http.post(createApiUrl("/auth/login"), async ({ request }) => {
    const body = (await request.json()) as ILoginCredentials;

    const user = mockedAuthList.find(
      (elem) =>
        elem.user.username === body.login &&
        elem.user.password === body.password,
    );
    if (user && user?.user) {
      // Удаляем пароль из ответа
      delete user.user.password;
      return HttpResponse.json<IAuthList>(user);
    }
    return HttpResponse.json("Такого пользователя нет", { status: 403 });
  }),

  http.post(createApiUrl("/auth/register"), async ({ request }) => {
    const body = (await request.json()) as IRegisterData;
    const newUser = {
      token: uid(),
      user: {
        id: 99999999999999,
        email: body.email,
        username: body.login,
        createdAt: Date.now().toString(),
        password: body.password,
      },
    };

    mockedAuthList.push(newUser);

    return HttpResponse.json(newUser);
  }),

  http.post(createApiUrl("/auth/logout"), async () => {
    // Optional: Clear authentication cookies/tokens
    const response = HttpResponse.json({
      message: "Вы успешно вышли",
      status: 200,
    });

    // Clear authentication cookies if needed
    response.headers.set(
      "Set-Cookie",
      "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/",
    );

    return HttpResponse.json(response);
  }),
  http.post(createApiUrl("/auth/refresh"), async ({ request }) => {
    const authHeader = request.headers.get("Authorization");
    const refreshToken = authHeader?.replace("Bearer ", "");
    if (!refreshToken) {
      return HttpResponse.json(
        { error: "Refresh token required" },
        { status: 400 },
      );
    }
    return HttpResponse.json({
      token: "new-access-token-123", // новый access token
    });
  }),
];
