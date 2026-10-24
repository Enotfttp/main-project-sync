## ms-coms-ul-paketi-uslug-frontend

Фронтенд сервиса «Пакеты услуг»: React 19, TypeScript, Vite, TanStack Query, Admiral DS, styled-components.

### Быстрый старт

Требуется Node.js 21.5.0.

```bash
npm i
npm run dev        # http://localhost:3000, запросы идут на реальный API
npm run dev:mock   # то же самое, но API отвечает моками (MSW)
```

### Команды

| Команда                  | Что делает                                                        |
| ------------------------ | ----------------------------------------------------------------- |
| `npm run dev`            | dev-сервер в режиме `development`                                 |
| `npm run dev:mock`       | dev-сервер в режиме `mock`, запросы к `/api/v1` перехватывает MSW |
| `npm run build`          | production-сборка в `dist`                                        |
| `npm run preview`        | сборка и локальный просмотр (порт 3001)                           |
| `npm run preview:prod`   | просмотр уже собранного `dist` в режиме `production`              |
| `npm run eslint`         | проверка ESLint                                                   |
| `npm run eslint:fix`     | ESLint с автоисправлением                                         |
| `npm run fix:imports`    | исправление путей импортов (`scripts/fix-imports.js`)             |
| `npm run format`         | форматирование Prettier                                           |
| `npm run lint:all`       | `fix:imports` + `eslint:fix` + `format`                           |
| `npm run mocks:generate` | создать моки для новых сущностей / показать непокрытые эндпоинты  |
| `npm run mocks:check`    | проверить, что у всех эндпоинтов есть моки (exit 1, если нет)     |

Перед коммитом husky запускает lint-staged: `fix-imports`, Prettier и ESLint по изменённым файлам.

### Переменные окружения

Задаются в `.env.<mode>` (`.env.development`, `.env.mock`).

| Переменная          | Значения                    | Назначение                                            |
| ------------------- | --------------------------- | ----------------------------------------------------- |
| `VITE_APP_STAND`    | `development`, `production` | в `development` показываются devtools и детали ошибок |
| `VITE_API_MOCKS`    | `true`, `false`             | включает моки MSW                                     |
| `VITE_API_BASE_URL` | URL                         | объявлена в типах, но сейчас не используется          |

Базовый адрес API задаётся в `src/shared/api/instance.ts`: `${window.location.origin}/api/v1`.

### Структура

Проект построен по Feature-Sliced Design. Слой может импортировать только из слоёв ниже себя.

```
src/
  app/        роутер, провайдеры, глобальные стили, error boundary
  pages/      страницы (main, request, schedule, package)
  features/   переиспользуемые сценарии (dynamic-filters)
  entities/   бизнес-сущности: <name>/api (сервис + хуки), model (типы), ui
  shared/     api (axios), types, lib, ui-кит
  mocks/      MSW-моки API
```

Алиасы: `@app`, `@pages`, `@features`, `@entities`, `@shared`, `@mocks`. Они настроены в `tsconfig.json` и `vite.config.ts`.

### Моки (MSW)

`npm run dev:mock` регистрирует service worker (`public/mockServiceWorker.js`), который перехватывает запросы к `/api/v1`. В production-сборку код моков не попадает.

```
src/mocks/
  lib/                     общие утилиты: apiPath, createCollection, filterItems, paginate, faker
  entities/<name>/
    factory.ts             генерация данных и in-memory коллекция
    handlers.ts            хендлеры MSW
  handlers.ts              автосбор всех entities/*/handlers.ts
  browser.ts, index.ts     запуск worker
```

Как ведут себя моки:

- данные хранятся в памяти до перезагрузки страницы, поэтому PATCH/DELETE видны в последующих GET;
- seed faker фиксирован, поэтому id не меняются между перезагрузками;
- `filterItems` фильтрует по соглашению имён: `xxxFrom` и `xxxTo` задают диапазон по полю `xxx`, строки ищутся по вхождению без учёта регистра, остальные значения сравниваются строго;
- `paginate` нумерует страницы с 1 и отдаёт ответ в формате `ITableDataPaginationResponse`.

#### Добавление новой сущности

1. Создайте сервис `src/entities/<name>/api/api.ts`, вызывающий `axiosInstance.get/post/put/patch/delete`.
2. Выполните `npm run mocks:generate`. Генератор разбирает вызовы `axiosInstance` и создаёт `src/mocks/entities/<name>/factory.ts` и `handlers.ts`. Хендлер подключится автоматически, регистрировать его вручную не нужно.
3. Доработайте фабрику под реальные поля сущности.

Если сущность уже замокана, генератор ничего не перезаписывает: он выводит заготовки хендлеров для эндпоинтов, которых ещё нет в `handlers.ts`. Эндпоинты, отличающиеся только query-параметрами, объединяются в один хендлер, потому что MSW не учитывает query при сопоставлении пути.

### Docker

```bash
npm run build
docker compose up --build   # nginx, http://localhost:8080
```

Образ копирует готовый `dist`, поэтому сначала нужна сборка. `entrypoint.sh` при старте контейнера подставляет переменные окружения вида `NAME__...` в собранные файлы.
