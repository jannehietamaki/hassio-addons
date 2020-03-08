ARG BUILD_FROM=hassioaddons/base:6.0.1
FROM ${BUILD_FROM}

COPY package.json /opt/

# Set workdir
WORKDIR /opt

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Setup base
RUN \
    apk add --no-cache --virtual .build-dependencies \
        g++=9.2.0-r3 \
        gcc=9.2.0-r3 \
        libc-dev=0.7.2-r0 \
        linux-headers=4.19.36-r0 \
        make=4.2.1-r2 \
        py2-pip=18.1-r0 \
        python2-dev=2.7.16-r3 \
    \
    && apk add --no-cache \
        git=2.24.1-r0 \
        lua-resty-http=0.15-r0 \
        nodejs=12.15.0-r1 \
        npm=12.15.0-r1 \
        paxctl=0.9-r0 \
        python2=2.7.16-r3 \
    \
    && paxctl -cm "$(command -v node)" \
    && npm config set unsafe-perm true \
    \
    && npm install \
        --no-audit \
        --no-optional \
        --no-update-notifier \
        --only=production \
        --unsafe-perm \
    \
    && npm cache clear --force


COPY . /opt/

# Build arguments
ARG BUILD_ARCH
ARG BUILD_DATE
ARG BUILD_REF
ARG BUILD_VERSION

EXPOSE 8081

RUN chmod a+x /opt/run.sh
CMD [ "/opt/run.sh" ]
