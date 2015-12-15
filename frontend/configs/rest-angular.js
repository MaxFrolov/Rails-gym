'use strict';

/**
 * Config for the restangular
 */
angular.module('app')
  .config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('/api');

    RestangularProvider.addResponseInterceptor(function (response, operation, what) {
      if (operation === 'getList') {
        if (response.resources) {
          response.resources.total = _.result(response.meta, 'total');
        }
        return response.resources;
      }
      if (['get', 'post', 'put', 'patch'].indexOf(operation) !== -1) {
        return response.resource;
      }
      return response;
    });

    RestangularProvider.addRequestInterceptor(function (request, operation, what) {
      if (operation === 'post' || operation === 'put' || operation === 'patch') {
        return {resource: request};
      }
      return request;
    });

    RestangularProvider.setDefaultHeaders({'Content-Type': 'application/json'});

    RestangularProvider.setRestangularFields({
      patchFields: 'patchFields',
      exists: 'exists'
    });
  })
  .run(function(Restangular) {
    Restangular.setRestangularizePromiseInterceptor(function(promise) {
      promise.modifyFields = function(map) {
        promise.then(function(val) {
          if(promise.restangularCollection) {
            _.each(val, _.bind(modifyFields, _, _, map));
          } else {
            modifyFields(val, map)
          }
        });
        return promise;
      };
    });

    Restangular.setOnElemRestangularized(function(elem, isCollection) {
      if (!isCollection) {
        elem.patchFields = patchFields;
        elem.exists = exists;
      }
      return elem;
    });

    function patchFields() {
      var newValues;

      if (_.isPlainObject(arguments[0])) {
        newValues = arguments[0];
      } else if (_.isArray(arguments[0])) {
        newValues = _.pick(this, arguments[0]);
      } else {
        newValues = _.zipObject([[arguments[0], arguments[1] || this[arguments[0]]]])
      }

      var promise = this.patch(newValues);

      promise.then(function(newResult) {
        _.extend(this, _.pick(newResult, _.keys(newValues)));
      });

      return promise;
    }

    function exists() {
      return this.id !== undefined;
    }

    // map - should be hash. Key - new field, value - old field or fn
    function modifyFields(obj, map) {
      _.each(map, function(keyOrFn, newKey) {
        obj[newKey] = _.isString(keyOrFn) ? obj[keyOrFn] : keyOrFn(obj);
      });
    }
  });
