/* Copyright (c) 2015 - 2016 CoNWeT Lab., Universidad Politécnica de Madrid
 *
 * This file belongs to the bae-logic-proxy-test of the
 * Business API Ecosystem
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
/* eslint no-console: 0 */

var indexes = require("./lib/indexes.js"),
    request = require("request"),
    utils = require("./lib/utils");

function createUrl(api, extra) {
    return utils.getAPIProtocol(api) + "://" + utils.getAPIHost(api) + ":" + utils.getAPIPort(api) + extra;
}

function genericRequest(options, extra) {
    return new Promise((resolve, reject) => {
      request(options, function (err, response, body) {
          if (err) {
              console.error(err);
              reject(err);
              return;
          }

          if (response.statusCode == 200) {
              var parsedBody = JSON.parse(body);

              if (extra) {
                  parsedBody.forEach(function (element) {
                      element[extra.field] = extra.value;
                  });
              }
              console.log('parsedBody', parsedBody)
              resolve(parsedBody);
          } else {
              reject(new Error("Unexpected HTTP error code: " + response.statusCode));
              return;
          }
      });
    });
}

function getProducts() {
    var url = createUrl("DSProductCatalog", "/DSProductCatalog/api/catalogManagement/v2/productSpecification");
    return genericRequest(url);
}

function getOfferings(catalog, qstring) {
     // For every catalog!
    var url;
    if (catalog) {
        url = createUrl("DSProductCatalog", "/DSProductCatalog/api/catalogManagement/v2/catalog/" + catalog + "/productOffering");
    } else {
        url = createUrl("DSProductCatalog", "/DSProductCatalog/api/catalogManagement/v2/productOffering");
    }

    if (qstring) {
        url += qstring;
    }

    return genericRequest(url, {
        field: "catalog",
        value: catalog
    });
}

function getCatalogs() {
    var url = createUrl("DSProductCatalog", "/DSProductCatalog/api/catalogManagement/v2/catalog");
    return genericRequest(url);
}

function getInventory() {
    var url = createUrl("DSProductInventory", "/DSProductInventory/api/productInventory/v2/product");
    return genericRequest(url);
}

function getOrders() {
    var url = createUrl("DSProductOrdering", "/DSProductOrdering/api/productOrdering/v2/productOrder");
    return genericRequest(url);
}

function downloadProducts() {
    console.log('Download products...')
    return getProducts()
        .then(indexes.saveIndexProduct);
}

function downloadOfferings(catalog, qstring) {
    console.log('Download offerings...')
    return getOfferings(catalog, qstring)
        .then(indexes.saveIndexOffering);
}

function downloadCatalogOfferings(catalogs) {
    console.log('Download catalog offerings...')
    var promise = Promise.resolve();
    if (catalogs.length) {
        catalogs.forEach(function (catalog) {
            promise = promise.then(function () {
                return downloadOfferings(catalog.id, '?isBundle=false');
            });
        });
        catalogs.forEach(function (catalog) {
            promise = promise.then(function () {
                return downloadOfferings(catalog.id, '?isBundle=true');
            });
        });

    } else {
        promise = promise.then(function() {
            return downloadOfferings();
        });
    }
    promise = promise.then(function ()  {
        return indexes.saveIndexCatalog(catalogs)
    });
    return promise;
}

function downloadCatalogs() {
    console.log('Download catalogs...')
    return getCatalogs()
        .then(downloadCatalogOfferings);
}

function downloadInventory() {
    console.log('Download inventory...')
    return getInventory()
        .then(indexes.saveIndexInventory);
}

function downloadOrdering() {
    console.log('Download ordering...')
    return getOrders()
        .then(indexes.saveIndexOrder);
}

indexes.init()
    .then(downloadProducts)
    .then(downloadCatalogs)
    .then(downloadInventory)
    .then(downloadOrdering)
    .then(indexes.close)
    .then(() => console.log("All saved!"))
    .catch(e => console.error("Error: ", e, e.message));
