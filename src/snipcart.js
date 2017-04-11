angular.module('snipcart', []);

angular.module('snipcart')
  .provider('$snipcart', SnipcartProvider);

function SnipcartProvider() {

  'use strict';

  this.apiKey = null;
  this.$get = ['$window', function ($window) {
    return new Service($window, this.apiKey);
  }];

  function Service($window, apiKey) {

    var service = {};
    load();

    return service;

    function load() {
      var script = $window.document.createElement('script');
      script.src = 'https://cdn.snipcart.com/scripts/2.0/snipcart.js';
      script.id = 'snipcart';

      var dataApiKey = $window.document.createAttribute('data-api-key');
      dataApiKey.value = apiKey;
      script.attributes.setNamedItem(dataApiKey);

      script.addEventListener('load', function () {
        service.Snipcart = $window.Snipcart;
        service.api = $window.Snipcart.api;
        service.subscribe = $window.Snipcart.subscribe;
      });

      $window.document.getElementsByTagName('head')[0].appendChild(script);
    }

  }

}
