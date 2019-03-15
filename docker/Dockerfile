FROM ubuntu:16.04

MAINTAINER CoNWeT Lab. Universidad Politécnica de Madrid

ENV VERSION working-base

RUN apt-get update && apt-get install -y git xinetd python-pip wget && \
    pip install sh requests && \
    git clone https://github.com/CDECatapult/business-ecosystem-logic-proxy.git

WORKDIR business-ecosystem-logic-proxy

RUN wget https://nodejs.org/dist/v6.9.1/node-v6.9.1-linux-x64.tar.xz && \
    tar -xvf node-v6.9.1-linux-x64.tar.xz && \
    echo 'export PATH=$PATH:/business-ecosystem-logic-proxy/node-v6.9.1-linux-x64/bin' >> ~/.bashrc && \
    git fetch && \
    git checkout ba68ccef9531adc3a827f152a566ad77da295889 && \
    mkdir indexes && \
    mkdir themes

VOLUME /business-ecosystem-logic-proxy/indexes
VOLUME /business-ecosystem-logic-proxy/themes
VOLUME /business-ecosystem-logic-proxy/static
VOLUME /business-ecosystem-logic-proxy/locales
VOLUME /business-ecosystem-logic-proxy/public/resources/core/js
VOLUME /business-ecosystem-logic-proxy/views
VOLUME /business-ecosystem-logic-proxy/lib

RUN export PATH=$PATH:/business-ecosystem-logic-proxy/node-v6.9.1-linux-x64/bin && \
    npm install && \
    mkdir etc && \
    cp config.js.template etc/config.js && \
    echo "module.exports = require('./etc/config');" > config.js

COPY ./entrypoint.sh /
COPY ./cleanIndex.sh /
COPY ./getConfig.js /business-ecosystem-logic-proxy

COPY ./serviceIndexes /etc/xinetd.d/

EXPOSE 8004

ENTRYPOINT ["/entrypoint.sh"]
