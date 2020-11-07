ARG BUILD_FROM=hassioaddons/base:6.0.1
FROM ${BUILD_FROM}

COPY package.json /opt/

# Set workdir
WORKDIR /opt

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Setup base
RUN \
    apk add --no-cache \
        g++=9.3.0-r2 \
        gcc=9.3.0-r2 \
        libc-dev=0.7.2-r3 \
        linux-headers=5.4.5-r1 \
        make=4.3-r0 \
        py2-pip=18.1-r0 \
        python2-dev=2.7.18-r0 \ 
        musl=1.1.24-r9 \
    \
    && apk add --no-cache \
        git=2.24.3-r0 \
        lua-resty-http=0.15-r0 \
        nodejs=12.15.0-r1 \
        npm=12.15.0-r1 \
        paxctl=0.9-r0 \
        python2=2.7.18-r0 \
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

EXPOSE 10001 8080

RUN chmod a+x /opt/run.sh
CMD [ "/opt/run.sh" ]    
