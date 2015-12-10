'use strict';

angular.module('app')
  .directive('horizontalForm', function() {
    return {
      restrict: 'E',
      scope: {
        fields: '=',
        obj: '=',
        errors: '=',
        width: '=?',
        prefix: '@?',
        vertical: '='
      },
      templateUrl: 'directives/horizontal-form/horizontal-form.html',
      link: function(scope) {
        var templates = ['date', 'date-time', 'radio', 'select', 'checkbox-list', 'location', 'contacts',
          'textarea', 'checkbox', 'phone', 'birthday'];
        scope.processField = processField;

        scope.removeError = removeError;

        function removeError(field) {
          if (scope.errors && scope.errors[field.fullName]) {
            delete scope.errors[field.fullName]
          }
        }

        if (!scope.obj) {
          throw 'Obj attribute is required';
        }

        function processField(field) {
          var fullName = (field.prefix || scope.prefix || '') + field.name;
          var labelClass = {'control-label__required': field.label && !field.optional};
          var fieldClass = {};

          labelClass['col-sm-' + (scope.width ? 12 - scope.width : 4)] = !scope.vertical;
          fieldClass['col-sm-' + (scope.width || 8)] = !scope.vertical;

          return _.extend(field, {
            obj: field.obj || scope.obj,
            required: !field.optional,
            tplType: _.include(templates, field.type) ? field.type : 'text',
            fullName: fullName,
            htmlId: 'form-' + fullName.replace('.', '-'),
            labelClass: labelClass,
            fieldClass: fieldClass,
            allowClear: field.allowClear ? 'true' : 'false',
            onChange: field.onChange || _.noop
          });
        }
      }
    };
  });
