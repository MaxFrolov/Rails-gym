'use strict';

angular.module('app').factory('toParams', function () {
  var r20 = /%20/g,
    rbracket = /\[\]$/;

  function buildParams(prefix, obj, traditional, add) {
    var name;

    if (_.isArray(obj)) {
      // Serialize array item.
      _.each(obj, function (v, i) {
        if (traditional || rbracket.test(prefix)) {
          // Treat each array item as a scalar.
          add(prefix, v);

        } else {
          // Item is non-scalar (array or object), encode its numeric index.
          buildParams(
            prefix + "[" + ( typeof v === "object" ? i : "" ) + "]",
            v,
            traditional,
            add
          );
        }
      });

    }
    else if (!traditional && _.isPlainObject(obj)) {
      // Serialize object item.
      for (name in obj) {
        buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
      }
    }
    else {
      // Serialize scalar item.
      add(prefix, obj);
    }
  }


  return function (a) {
    var prefix, s = [],
      add = function (key, value) {
        // If value is a function, invoke it and return its value
        value = _.isFunction(value) ? value() : (value == null ? "" : value);
        //s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        s[s.length] = (key) + "=" + (value);
      };

    for (prefix in a) {
      buildParams(prefix, a[prefix], false, add);
    }

    // Return the resulting serialization
    return s.join("&").replace(r20, "+");
  }
});
