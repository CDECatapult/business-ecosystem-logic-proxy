/**
 * @author Francisco de la Vega <fdelavega@conwet.com>
 *         Jaime Pajuelo <jpajuelo@conwet.com>
 */

(function () {

    'use strict';

    angular
        .module('app')
        .config(ShoppingCartRouteConfig);

    function ShoppingCartRouteConfig($stateProvider) {

        $stateProvider
            .state('shopping-cart', {
                url: '/shopping-cart',
                data: {
                    title: 'My Shopping Cart',
                    loggingRequired: true
                },
                views: {
                    sidebar: {
                        template: '<ui-view>'
                    },
                    content: {
                        templateUrl: 'shopping-cart/list',
                        controller: 'ProductOrderCreateCtrl as orderVM'
                    }
                }
            });
    }

})();
