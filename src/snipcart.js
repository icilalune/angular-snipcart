angular.module('snipcart', []);

angular.module('snipcart')
  .provider('$snipcart', SnipcartProvider);

function SnipcartProvider() {

  'use strict';

  this.apiKey = null;
  this.customFields = [];
  this.$get = ['$window', '$rootScope', function ($window, $rootScope) {
    return new Service($window, $rootScope, this.apiKey, this.customFields);
  }];

  function Service($window, $rootScope, apiKey, customFields) {

    var service = {};
    load();

    return service;

    function load() {
      var script = $window.document.createElement('script');
      script.src = 'https://cdn.snipcart.com/scripts/2.0/snipcart.js';
      script.id = 'snipcart';

      customFields.forEach(function(item, index){
        var name = 'data-cart-custom'+index;
        if(!!item.name){
          for(var sub in item){
            var customFieldProperty = $window.document.createAttribute(name+'-'+sub);
            customFieldProperty.value = item[sub];
            script.attributes.setNamedItemNS(customFieldProperty);
          }
        }
      });

      var dataApiKey = $window.document.createAttribute('data-api-key');
      dataApiKey.value = apiKey;
      script.attributes.setNamedItem(dataApiKey);

      script.addEventListener('load', function () {
        service.Snipcart = $window.Snipcart;
        service.api = $window.Snipcart.api;
        service.subscribe = $window.Snipcart.subscribe;
        $rootScope.$emit('$snipcartLoad', service);
      });

      $window.document.getElementsByTagName('head')[0].appendChild(script);
    }

  }

}
