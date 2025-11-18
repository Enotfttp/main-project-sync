## ms-coms-ul-paketi-uslug-frontend

### Description

Запуск проекта

```
npm i & npm run dev
```

Версия Node

```
21.5.0
```

Глобавльные переменные проекта:

```
VITE_API_BASE_URL - урл для endpont'ов
```

Команды проекта:

```
    "dev": "vite --mode development",
    "build:dev": "vite build --mode development",
    "build:prod": "vite build --mode production",
    "preview:dev": "vite preview --mode st",
    "preview:prod": "vite preview --mode production",
    "deploy:prod": "npm run build:prod && echo 'Deploying...'",
    "eslint": "eslint \"src/**/*.{js,jsx,ts,tsx,config.js}\" --cache --cache-location ./.cache/",
    "eslint:fix": "npm run eslint -- --fix",
    "preview": "npm run build && vite preview"
```
