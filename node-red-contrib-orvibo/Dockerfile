ARG BUILD_FROM
FROM $BUILD_FROM
ENV LANG C.UTF-8

ADD package.json .
RUN printf "nameserver 8.8.8.8\nnameserver 9.9.9.9\nnameserver 1.1.1.1" > /etc/resolv.conf
RUN apk update && apk add --no-cache nodejs && npm install

COPY . .

RUN chmod a+x /run.sh
CMD [ "/run.sh" ]