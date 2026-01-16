import { uid } from "@shared/common";
import { Response, Server } from "miragejs";

export function authRoutes(this: Server) {
  // POST /api/auth/login
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  this.post("/auth/login", (schema: any, request) => {
    const body = JSON.parse(request.requestBody);
    const { login, password } = body;

    const record = schema
      .all("authUser")
      .models.find(
        (m) =>
          m.attrs.user.username === login && m.attrs.user.password === password,
      );

    if (!record) {
      return new Response(
        403,
        { "Content-Type": "application/json" },
        { message: "Такого пользователя нет" },
      );
    }

    // копия без пароля
    const user = { ...record.attrs.user };
    delete user.password;

    return {
      token: record.attrs.token,
      user,
    };
  });

  // POST /api/auth/register
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  this.post("/auth/register", (schema: any, request) => {
    const body = JSON.parse(request.requestBody);
    const { email, login, password } = body;

    const newRecord = schema.authUsers.create({
      token: uid(),
      user: {
        id: Date.now(),
        email,
        username: login,
        createdAt: new Date().toISOString(),
        password,
      },
    });

    return newRecord.attrs;
  });

  // POST /api/auth/logout
  this.post("/auth/logout", () => {
    return {
      message: "Вы успешно вышли",
      status: 200,
    };
  });

  // POST /api/auth/refresh
  this.post("/auth/refresh", (schema, request) => {
    const authHeader = request.requestHeaders["Authorization"];
    const refreshToken = authHeader?.replace("Bearer ", "");

    if (!refreshToken) {
      return new Response(
        400,
        { "Content-Type": "application/json" },
        { error: "Refresh token required" },
      );
    }

    return {
      token: "new-access-token-123",
    };
  });
}
