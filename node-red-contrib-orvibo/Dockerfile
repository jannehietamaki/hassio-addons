ARG BUILD_FROM=hassioaddons/base:5.0.1
# hadolint ignore=DL3006
FROM ${BUILD_FROM}

# Copy Node-RED package.json
COPY package.json /opt/

# Set workdir
WORKDIR /opt

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Setup base
RUN \
    apk add --no-cache --virtual .build-dependencies \
        g++=8.3.0-r0 \
        gcc=8.3.0-r0 \
        libc-dev=0.7.1-r0 \
        linux-headers=4.19.36-r0 \
        make=4.2.1-r2 \
        py2-pip=18.1-r0 \
        python2-dev=2.7.16-r1 \
    \
    && apk add --no-cache \
        nodejs=10.16.3-r0 \
        npm=10.16.3-r0 \
    \
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

# Copy root filesystem
COPY . /opt/

# Build arguments
ARG BUILD_ARCH
ARG BUILD_DATE
ARG BUILD_REF
ARG BUILD_VERSION

RUN chmod a+x /opt/run.sh
CMD [ "/opt/run.sh" ]