ARG BUILD_FROM
FROM $BUILD_FROM

ENV LANG C.UTF-8

ADD package.json .

RUN apk add --no-cache nodejs-npm
RUN npm install

COPY . .

RUN chmod a+x /run.sh
CMD [ "/run.sh" ]