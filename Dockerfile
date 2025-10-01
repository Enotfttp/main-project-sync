FROM docker.repo-ci.sfera.inno.local/troc-docker/astra/alse-1.7.4-nginx:1.22

ADD ./dist/ /opt/app-root/src

USER 0
RUN rm -f /var/log/nginx/access.log /var/log/nginx/error.log && \
    ln -s /dev/stdout /var/log/nginx/access.log && \
    ln -s /dev/stderr /var/log/nginx/error.log

EXPOSE 8080
ENTRYPOINT ["/bin/bash","-c","/opt/app-root/entrypoint.sh"]
