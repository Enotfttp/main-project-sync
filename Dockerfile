# --- Этап 1: сборка фронта ---
FROM node:22.14.0 AS builder

WORKDIR /app

# Копируем package.json и package-lock.json (или pnpm-lock.yaml, если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем остальные файлы проекта
COPY . .

# Собираем проект
RUN npm run build

# --- Этап 2: Nginx ---
FROM docker.repo-ci.sfera.inno.local/comc-docker/astra/ubi118-1.8.3-nginx:1.26.3

# Копируем собранный фронт из предыдущего этапа
COPY --from=builder /app/dist /opt/app-root/src

# Копируем entrypoint
COPY entrypoint.sh /opt/app-root/entrypoint.sh
RUN chmod +x /opt/app-root/entrypoint.sh && \
    rm -f /var/log/nginx/access.log /var/log/nginx/error.log && \
    ln -s /dev/stdout /var/log/nginx/access.log && \
    ln -s /dev/stderr /var/log/nginx/error.log

EXPOSE 8080

ENTRYPOINT ["/bin/bash", "-c", "/opt/app-root/entrypoint.sh"]
