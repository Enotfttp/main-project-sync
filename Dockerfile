FROM docker.repo-ci.sfera.inno.local/comc-docker/astra/ubi18-1.8.3-nginx:1.26.3
ADD ./dist/ /opt/app-root/src
ADD entrypoint.sh /opt/app-root/entrypoint.sh

USER 0
RUN chmod +x /opt/app-root/entrypoint.sh && \
    rm -f /var/log/nginx/access.log /var/log/nginx/error.log && \
    ln -s /dev/stdout /var/log/nginx/access.log && \
    ln -s /dev/stderr /var/log/nginx/error.log

EXPOSE 8080
ENTRYPOINT ["/bin/bash","-c","/opt/app-root/entrypoint.sh"]
