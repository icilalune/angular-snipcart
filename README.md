angular-snipcart
================

Snipcart Javascript API integration for AngularJS.

Description
-----------

This module integrate Snipcart JavaScript API as an AngularJS dependency.
It takes care of loading Snipcart javascript code so you can manage the
API key through standard Angular mechanisms.

Installation
------------

 * with bower : ``bower install angular-snipcart --save``
 * with npm : ``npm install angular-snipcart --save``
 
Usage
-----

Add a dependency on ``angular-snipcart`` module :

    angular.module('myApp', [
      // ...
      'angular-snipcart',
      // ...
    ]);

Configure your (public) API key.

    angular.module('myApp').config(['$snipcartProvider', function($snipcartProvider){
      $snipcartProvider.apiKey = 'your api key';
    });

Inject the $snipcart service wherever you need to use ``Snipcart``.

You can retrieve the ``Snipcart`` global as a property on the injected ``$snipcart`` service (eg. ``$snipcart.Snipcart``).

    angular.module('myApp').service('myService', myService);
    myService.$inject = ['$snipcart'];
    function myService($snipcart){
      $snipcart.Snipcart.api.modal.show();
    }
