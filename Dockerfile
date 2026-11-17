# Базовый образ Astra: актуальный список https://sfera.inno.local/knowledge/pages?id=1204699
FROM docker.repo-ci.sfera.inno.local/comc-docker/astra/ubi18-1.8.7-nginx:1.30.1
COPY entrypoint.sh /opt/entrypoint.sh
RUN mkdir -p /opt/app/src && \
    chmod 1777 /var/lib/nginx && \
    chmod +x /opt/entrypoint.sh && \
    sed -i 's/run/tmp/' /etc/nginx/nginx.conf && \
    sed -i 's/^user.*www-data.*;//' /etc/nginx/nginx.conf && \
    rm -f /etc/nginx/sites-enabled/default /etc/nginx/sites-available/default
COPY ./dist/ /opt/app/src
RUN chmod -R 777 /opt/app/src/
WORKDIR /opt/app/src

EXPOSE 8080
ENTRYPOINT ["/bin/bash","-c","/opt/entrypoint.sh"]
