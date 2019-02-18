FROM ubuntu:16.04

MAINTAINER Digital Catapult

RUN apt-get update && apt-get install -y xinetd python-pip wget && \
    pip install sh requests

WORKDIR business-ecosystem-logic-proxy

RUN wget https://nodejs.org/dist/v6.9.1/node-v6.9.1-linux-x64.tar.xz && \
    tar -xvf node-v6.9.1-linux-x64.tar.xz && \
    echo 'export PATH=$PATH:/business-ecosystem-logic-proxy/node-v6.9.1-linux-x64/bin' >> ~/.bashrc && \
    mkdir indexes && \
    mkdir themes


# Indexes used by the Business API Ecosystem for searching
VOLUME /business-ecosystem-logic-proxy/indexes
# Themes that can be used to customize the web portal
VOLUME /business-ecosystem-logic-proxy/themes
# Static files ready to be rendered including the selected theme and js files
VOLUME /business-ecosystem-logic-proxy/static
VOLUME /business-ecosystem-logic-proxy/locales
VOLUME /business-ecosystem-logic-proxy/public/resources/core/js
VOLUME /business-ecosystem-logic-proxy/views
VOLUME /business-ecosystem-logic-proxy/lib

# Install npm dependencies
COPY ./package.json .
COPY ./package-lock.json .
COPY ./install.sh .
RUN export PATH=$PATH:/business-ecosystem-logic-proxy/node-v6.9.1-linux-x64/bin && \
    ./install.sh

# Project sources
COPY ./controllers controllers
COPY ./db db
COPY ./default_locales default_locales
COPY ./lib lib
COPY ./locales locales
COPY ./public public
COPY ./views views
COPY ./collect_static.js .
COPY ./config.js .
COPY ./fill_indexes.js .
COPY ./log_config.json .
COPY ./server.js .

# Docker dir (scripts & config)
COPY ./docker/entrypoint.sh /
COPY ./docker/cleanIndex.sh /
COPY ./docker/serviceIndexes /etc/xinetd.d/

ENV MONGO_HOST localhost
ENV MONGO_PORT 27017
ENV ENDPOINT_INVENTORY_PATH DSProductInventory
ENV ENDPOINT_INVENTORY_HOST localhost
ENV ENDPOINT_INVENTORY_PORT 8080
ENV ENDPOINT_INVENTORY_APP_SSL false

EXPOSE 8004

ENTRYPOINT ["/entrypoint.sh"]
