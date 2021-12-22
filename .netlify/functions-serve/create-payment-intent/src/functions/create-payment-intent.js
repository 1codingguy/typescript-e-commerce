var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/dotenv/lib/main.js"(exports2, module2) {
    var fs = require("fs");
    var path = require("path");
    function log(message) {
      console.log(`[dotenv][DEBUG] ${message}`);
    }
    var NEWLINE = "\n";
    var RE_INI_KEY_VAL = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/;
    var RE_NEWLINES = /\\n/g;
    var NEWLINES_MATCH = /\n|\r|\r\n/;
    function parse(src, options) {
      const debug = Boolean(options && options.debug);
      const obj = {};
      src.toString().split(NEWLINES_MATCH).forEach(function(line, idx) {
        const keyValueArr = line.match(RE_INI_KEY_VAL);
        if (keyValueArr != null) {
          const key = keyValueArr[1];
          let val = keyValueArr[2] || "";
          const end = val.length - 1;
          const isDoubleQuoted = val[0] === '"' && val[end] === '"';
          const isSingleQuoted = val[0] === "'" && val[end] === "'";
          if (isSingleQuoted || isDoubleQuoted) {
            val = val.substring(1, end);
            if (isDoubleQuoted) {
              val = val.replace(RE_NEWLINES, NEWLINE);
            }
          } else {
            val = val.trim();
          }
          obj[key] = val;
        } else if (debug) {
          log(`did not match key and value when parsing line ${idx + 1}: ${line}`);
        }
      });
      return obj;
    }
    function config(options) {
      let dotenvPath = path.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      let debug = false;
      if (options) {
        if (options.path != null) {
          dotenvPath = options.path;
        }
        if (options.encoding != null) {
          encoding = options.encoding;
        }
        if (options.debug != null) {
          debug = true;
        }
      }
      try {
        const parsed = parse(fs.readFileSync(dotenvPath, { encoding }), { debug });
        Object.keys(parsed).forEach(function(key) {
          if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
            process.env[key] = parsed[key];
          } else if (debug) {
            log(`"${key}" is already defined in \`process.env\` and will not be overwritten`);
          }
        });
        return { parsed };
      } catch (e) {
        return { error: e };
      }
    }
    module2.exports.config = config;
    module2.exports.parse = parse;
  }
});

// node_modules/stripe/lib/ResourceNamespace.js
var require_ResourceNamespace = __commonJS({
  "node_modules/stripe/lib/ResourceNamespace.js"(exports2, module2) {
    "use strict";
    function ResourceNamespace(stripe2, resources) {
      for (const name in resources) {
        const camelCaseName = name[0].toLowerCase() + name.substring(1);
        const resource = new resources[name](stripe2);
        this[camelCaseName] = resource;
      }
    }
    module2.exports = function(namespace, resources) {
      return function(stripe2) {
        return new ResourceNamespace(stripe2, resources);
      };
    };
    module2.exports.ResourceNamespace = ResourceNamespace;
  }
});

// node_modules/qs/lib/utils.js
var require_utils = __commonJS({
  "node_modules/qs/lib/utils.js"(exports2, module2) {
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var isArray = Array.isArray;
    var hexTable = function() {
      var array = [];
      for (var i = 0; i < 256; ++i) {
        array.push("%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
      }
      return array;
    }();
    var compactQueue = function compactQueue2(queue) {
      while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];
        if (isArray(obj)) {
          var compacted = [];
          for (var j = 0; j < obj.length; ++j) {
            if (typeof obj[j] !== "undefined") {
              compacted.push(obj[j]);
            }
          }
          item.obj[item.prop] = compacted;
        }
      }
    };
    var arrayToObject = function arrayToObject2(source, options) {
      var obj = options && options.plainObjects ? Object.create(null) : {};
      for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== "undefined") {
          obj[i] = source[i];
        }
      }
      return obj;
    };
    var merge = function merge2(target, source, options) {
      if (!source) {
        return target;
      }
      if (typeof source !== "object") {
        if (isArray(target)) {
          target.push(source);
        } else if (target && typeof target === "object") {
          if (options && (options.plainObjects || options.allowPrototypes) || !has.call(Object.prototype, source)) {
            target[source] = true;
          }
        } else {
          return [target, source];
        }
        return target;
      }
      if (!target || typeof target !== "object") {
        return [target].concat(source);
      }
      var mergeTarget = target;
      if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options);
      }
      if (isArray(target) && isArray(source)) {
        source.forEach(function(item, i) {
          if (has.call(target, i)) {
            var targetItem = target[i];
            if (targetItem && typeof targetItem === "object" && item && typeof item === "object") {
              target[i] = merge2(targetItem, item, options);
            } else {
              target.push(item);
            }
          } else {
            target[i] = item;
          }
        });
        return target;
      }
      return Object.keys(source).reduce(function(acc, key) {
        var value = source[key];
        if (has.call(acc, key)) {
          acc[key] = merge2(acc[key], value, options);
        } else {
          acc[key] = value;
        }
        return acc;
      }, mergeTarget);
    };
    var assign = function assignSingleSource(target, source) {
      return Object.keys(source).reduce(function(acc, key) {
        acc[key] = source[key];
        return acc;
      }, target);
    };
    var decode = function(str, decoder, charset) {
      var strWithoutPlus = str.replace(/\+/g, " ");
      if (charset === "iso-8859-1") {
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
      }
      try {
        return decodeURIComponent(strWithoutPlus);
      } catch (e) {
        return strWithoutPlus;
      }
    };
    var encode = function encode2(str, defaultEncoder, charset) {
      if (str.length === 0) {
        return str;
      }
      var string = typeof str === "string" ? str : String(str);
      if (charset === "iso-8859-1") {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
          return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
        });
      }
      var out = "";
      for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);
        if (c === 45 || c === 46 || c === 95 || c === 126 || c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 97 && c <= 122) {
          out += string.charAt(i);
          continue;
        }
        if (c < 128) {
          out = out + hexTable[c];
          continue;
        }
        if (c < 2048) {
          out = out + (hexTable[192 | c >> 6] + hexTable[128 | c & 63]);
          continue;
        }
        if (c < 55296 || c >= 57344) {
          out = out + (hexTable[224 | c >> 12] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63]);
          continue;
        }
        i += 1;
        c = 65536 + ((c & 1023) << 10 | string.charCodeAt(i) & 1023);
        out += hexTable[240 | c >> 18] + hexTable[128 | c >> 12 & 63] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
      }
      return out;
    };
    var compact = function compact2(value) {
      var queue = [{ obj: { o: value }, prop: "o" }];
      var refs = [];
      for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];
        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
          var key = keys[j];
          var val = obj[key];
          if (typeof val === "object" && val !== null && refs.indexOf(val) === -1) {
            queue.push({ obj, prop: key });
            refs.push(val);
          }
        }
      }
      compactQueue(queue);
      return value;
    };
    var isRegExp = function isRegExp2(obj) {
      return Object.prototype.toString.call(obj) === "[object RegExp]";
    };
    var isBuffer = function isBuffer2(obj) {
      if (!obj || typeof obj !== "object") {
        return false;
      }
      return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
    };
    var combine = function combine2(a, b) {
      return [].concat(a, b);
    };
    module2.exports = {
      arrayToObject,
      assign,
      combine,
      compact,
      decode,
      encode,
      isBuffer,
      isRegExp,
      merge
    };
  }
});

// node_modules/qs/lib/formats.js
var require_formats = __commonJS({
  "node_modules/qs/lib/formats.js"(exports2, module2) {
    "use strict";
    var replace = String.prototype.replace;
    var percentTwenties = /%20/g;
    module2.exports = {
      "default": "RFC3986",
      formatters: {
        RFC1738: function(value) {
          return replace.call(value, percentTwenties, "+");
        },
        RFC3986: function(value) {
          return value;
        }
      },
      RFC1738: "RFC1738",
      RFC3986: "RFC3986"
    };
  }
});

// node_modules/qs/lib/stringify.js
var require_stringify = __commonJS({
  "node_modules/qs/lib/stringify.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var formats = require_formats();
    var has = Object.prototype.hasOwnProperty;
    var arrayPrefixGenerators = {
      brackets: function brackets(prefix) {
        return prefix + "[]";
      },
      comma: "comma",
      indices: function indices(prefix, key) {
        return prefix + "[" + key + "]";
      },
      repeat: function repeat(prefix) {
        return prefix;
      }
    };
    var isArray = Array.isArray;
    var push = Array.prototype.push;
    var pushToArray = function(arr, valueOrArray) {
      push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
    };
    var toISO = Date.prototype.toISOString;
    var defaults = {
      addQueryPrefix: false,
      allowDots: false,
      charset: "utf-8",
      charsetSentinel: false,
      delimiter: "&",
      encode: true,
      encoder: utils.encode,
      encodeValuesOnly: false,
      formatter: formats.formatters[formats["default"]],
      indices: false,
      serializeDate: function serializeDate(date) {
        return toISO.call(date);
      },
      skipNulls: false,
      strictNullHandling: false
    };
    var stringify = function stringify2(object, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly, charset) {
      var obj = object;
      if (typeof filter === "function") {
        obj = filter(prefix, obj);
      } else if (obj instanceof Date) {
        obj = serializeDate(obj);
      } else if (generateArrayPrefix === "comma" && isArray(obj)) {
        obj = obj.join(",");
      }
      if (obj === null) {
        if (strictNullHandling) {
          return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset) : prefix;
        }
        obj = "";
      }
      if (typeof obj === "string" || typeof obj === "number" || typeof obj === "boolean" || utils.isBuffer(obj)) {
        if (encoder) {
          var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset);
          return [formatter(keyValue) + "=" + formatter(encoder(obj, defaults.encoder, charset))];
        }
        return [formatter(prefix) + "=" + formatter(String(obj))];
      }
      var values = [];
      if (typeof obj === "undefined") {
        return values;
      }
      var objKeys;
      if (isArray(filter)) {
        objKeys = filter;
      } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
      }
      for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];
        if (skipNulls && obj[key] === null) {
          continue;
        }
        if (isArray(obj)) {
          pushToArray(values, stringify2(obj[key], typeof generateArrayPrefix === "function" ? generateArrayPrefix(prefix, key) : prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly, charset));
        } else {
          pushToArray(values, stringify2(obj[key], prefix + (allowDots ? "." + key : "[" + key + "]"), generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly, charset));
        }
      }
      return values;
    };
    var normalizeStringifyOptions = function normalizeStringifyOptions2(opts) {
      if (!opts) {
        return defaults;
      }
      if (opts.encoder !== null && opts.encoder !== void 0 && typeof opts.encoder !== "function") {
        throw new TypeError("Encoder has to be a function.");
      }
      var charset = opts.charset || defaults.charset;
      if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
        throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      }
      var format = formats["default"];
      if (typeof opts.format !== "undefined") {
        if (!has.call(formats.formatters, opts.format)) {
          throw new TypeError("Unknown format option provided.");
        }
        format = opts.format;
      }
      var formatter = formats.formatters[format];
      var filter = defaults.filter;
      if (typeof opts.filter === "function" || isArray(opts.filter)) {
        filter = opts.filter;
      }
      return {
        addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots: typeof opts.allowDots === "undefined" ? defaults.allowDots : !!opts.allowDots,
        charset,
        charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
        delimiter: typeof opts.delimiter === "undefined" ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === "boolean" ? opts.encode : defaults.encode,
        encoder: typeof opts.encoder === "function" ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter,
        formatter,
        serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === "function" ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
      };
    };
    module2.exports = function(object, opts) {
      var obj = object;
      var options = normalizeStringifyOptions(opts);
      var objKeys;
      var filter;
      if (typeof options.filter === "function") {
        filter = options.filter;
        obj = filter("", obj);
      } else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
      }
      var keys = [];
      if (typeof obj !== "object" || obj === null) {
        return "";
      }
      var arrayFormat;
      if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
      } else if (opts && "indices" in opts) {
        arrayFormat = opts.indices ? "indices" : "repeat";
      } else {
        arrayFormat = "indices";
      }
      var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];
      if (!objKeys) {
        objKeys = Object.keys(obj);
      }
      if (options.sort) {
        objKeys.sort(options.sort);
      }
      for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];
        if (options.skipNulls && obj[key] === null) {
          continue;
        }
        pushToArray(keys, stringify(obj[key], key, generateArrayPrefix, options.strictNullHandling, options.skipNulls, options.encode ? options.encoder : null, options.filter, options.sort, options.allowDots, options.serializeDate, options.formatter, options.encodeValuesOnly, options.charset));
      }
      var joined = keys.join(options.delimiter);
      var prefix = options.addQueryPrefix === true ? "?" : "";
      if (options.charsetSentinel) {
        if (options.charset === "iso-8859-1") {
          prefix += "utf8=%26%2310003%3B&";
        } else {
          prefix += "utf8=%E2%9C%93&";
        }
      }
      return joined.length > 0 ? prefix + joined : "";
    };
  }
});

// node_modules/qs/lib/parse.js
var require_parse = __commonJS({
  "node_modules/qs/lib/parse.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var has = Object.prototype.hasOwnProperty;
    var defaults = {
      allowDots: false,
      allowPrototypes: false,
      arrayLimit: 20,
      charset: "utf-8",
      charsetSentinel: false,
      comma: false,
      decoder: utils.decode,
      delimiter: "&",
      depth: 5,
      ignoreQueryPrefix: false,
      interpretNumericEntities: false,
      parameterLimit: 1e3,
      parseArrays: true,
      plainObjects: false,
      strictNullHandling: false
    };
    var interpretNumericEntities = function(str) {
      return str.replace(/&#(\d+);/g, function($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
      });
    };
    var isoSentinel = "utf8=%26%2310003%3B";
    var charsetSentinel = "utf8=%E2%9C%93";
    var parseValues = function parseQueryStringValues(str, options) {
      var obj = {};
      var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, "") : str;
      var limit = options.parameterLimit === Infinity ? void 0 : options.parameterLimit;
      var parts = cleanStr.split(options.delimiter, limit);
      var skipIndex = -1;
      var i;
      var charset = options.charset;
      if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
          if (parts[i].indexOf("utf8=") === 0) {
            if (parts[i] === charsetSentinel) {
              charset = "utf-8";
            } else if (parts[i] === isoSentinel) {
              charset = "iso-8859-1";
            }
            skipIndex = i;
            i = parts.length;
          }
        }
      }
      for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
          continue;
        }
        var part = parts[i];
        var bracketEqualsPos = part.indexOf("]=");
        var pos = bracketEqualsPos === -1 ? part.indexOf("=") : bracketEqualsPos + 1;
        var key, val;
        if (pos === -1) {
          key = options.decoder(part, defaults.decoder, charset);
          val = options.strictNullHandling ? null : "";
        } else {
          key = options.decoder(part.slice(0, pos), defaults.decoder, charset);
          val = options.decoder(part.slice(pos + 1), defaults.decoder, charset);
        }
        if (val && options.interpretNumericEntities && charset === "iso-8859-1") {
          val = interpretNumericEntities(val);
        }
        if (val && options.comma && val.indexOf(",") > -1) {
          val = val.split(",");
        }
        if (has.call(obj, key)) {
          obj[key] = utils.combine(obj[key], val);
        } else {
          obj[key] = val;
        }
      }
      return obj;
    };
    var parseObject = function(chain, val, options) {
      var leaf = val;
      for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];
        if (root === "[]" && options.parseArrays) {
          obj = [].concat(leaf);
        } else {
          obj = options.plainObjects ? Object.create(null) : {};
          var cleanRoot = root.charAt(0) === "[" && root.charAt(root.length - 1) === "]" ? root.slice(1, -1) : root;
          var index = parseInt(cleanRoot, 10);
          if (!options.parseArrays && cleanRoot === "") {
            obj = { 0: leaf };
          } else if (!isNaN(index) && root !== cleanRoot && String(index) === cleanRoot && index >= 0 && (options.parseArrays && index <= options.arrayLimit)) {
            obj = [];
            obj[index] = leaf;
          } else {
            obj[cleanRoot] = leaf;
          }
        }
        leaf = obj;
      }
      return leaf;
    };
    var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
      if (!givenKey) {
        return;
      }
      var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, "[$1]") : givenKey;
      var brackets = /(\[[^[\]]*])/;
      var child = /(\[[^[\]]*])/g;
      var segment = brackets.exec(key);
      var parent = segment ? key.slice(0, segment.index) : key;
      var keys = [];
      if (parent) {
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
          if (!options.allowPrototypes) {
            return;
          }
        }
        keys.push(parent);
      }
      var i = 0;
      while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
          if (!options.allowPrototypes) {
            return;
          }
        }
        keys.push(segment[1]);
      }
      if (segment) {
        keys.push("[" + key.slice(segment.index) + "]");
      }
      return parseObject(keys, val, options);
    };
    var normalizeParseOptions = function normalizeParseOptions2(opts) {
      if (!opts) {
        return defaults;
      }
      if (opts.decoder !== null && opts.decoder !== void 0 && typeof opts.decoder !== "function") {
        throw new TypeError("Decoder has to be a function.");
      }
      if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
        throw new Error("The charset option must be either utf-8, iso-8859-1, or undefined");
      }
      var charset = typeof opts.charset === "undefined" ? defaults.charset : opts.charset;
      return {
        allowDots: typeof opts.allowDots === "undefined" ? defaults.allowDots : !!opts.allowDots,
        allowPrototypes: typeof opts.allowPrototypes === "boolean" ? opts.allowPrototypes : defaults.allowPrototypes,
        arrayLimit: typeof opts.arrayLimit === "number" ? opts.arrayLimit : defaults.arrayLimit,
        charset,
        charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === "boolean" ? opts.comma : defaults.comma,
        decoder: typeof opts.decoder === "function" ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === "string" || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        depth: typeof opts.depth === "number" ? opts.depth : defaults.depth,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === "boolean" ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === "number" ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === "boolean" ? opts.plainObjects : defaults.plainObjects,
        strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
      };
    };
    module2.exports = function(str, opts) {
      var options = normalizeParseOptions(opts);
      if (str === "" || str === null || typeof str === "undefined") {
        return options.plainObjects ? Object.create(null) : {};
      }
      var tempObj = typeof str === "string" ? parseValues(str, options) : str;
      var obj = options.plainObjects ? Object.create(null) : {};
      var keys = Object.keys(tempObj);
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
      }
      return utils.compact(obj);
    };
  }
});

// node_modules/qs/lib/index.js
var require_lib = __commonJS({
  "node_modules/qs/lib/index.js"(exports2, module2) {
    "use strict";
    var stringify = require_stringify();
    var parse = require_parse();
    var formats = require_formats();
    module2.exports = {
      formats,
      parse,
      stringify
    };
  }
});

// node_modules/stripe/lib/utils.js
var require_utils2 = __commonJS({
  "node_modules/stripe/lib/utils.js"(exports2, module2) {
    "use strict";
    var EventEmitter = require("events").EventEmitter;
    var qs = require_lib();
    var crypto = require("crypto");
    var hasOwn = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    var exec = null;
    try {
      exec = require("child_process").exec;
    } catch (e) {
      if (e.code !== "MODULE_NOT_FOUND") {
        throw e;
      }
    }
    var OPTIONS_KEYS = [
      "apiKey",
      "idempotencyKey",
      "stripeAccount",
      "apiVersion",
      "maxNetworkRetries",
      "timeout"
    ];
    var DEPRECATED_OPTIONS = {
      api_key: "apiKey",
      idempotency_key: "idempotencyKey",
      stripe_account: "stripeAccount",
      stripe_version: "apiVersion",
      stripeVersion: "apiVersion"
    };
    var DEPRECATED_OPTIONS_KEYS = Object.keys(DEPRECATED_OPTIONS);
    var utils = module2.exports = {
      isOptionsHash(o) {
        return o && typeof o === "object" && (OPTIONS_KEYS.some((prop) => hasOwn(o, prop)) || DEPRECATED_OPTIONS_KEYS.some((prop) => hasOwn(o, prop)));
      },
      stringifyRequestData: (data) => {
        return qs.stringify(data, {
          serializeDate: (d) => Math.floor(d.getTime() / 1e3)
        }).replace(/%5B/g, "[").replace(/%5D/g, "]");
      },
      makeURLInterpolator: (() => {
        const rc = {
          "\n": "\\n",
          '"': '\\"',
          "\u2028": "\\u2028",
          "\u2029": "\\u2029"
        };
        return (str) => {
          const cleanString = str.replace(/["\n\r\u2028\u2029]/g, ($0) => rc[$0]);
          return (outputs) => {
            return cleanString.replace(/\{([\s\S]+?)\}/g, ($0, $1) => encodeURIComponent(outputs[$1] || ""));
          };
        };
      })(),
      extractUrlParams: (path) => {
        const params = path.match(/\{\w+\}/g);
        if (!params) {
          return [];
        }
        return params.map((param) => param.replace(/[{}]/g, ""));
      },
      getDataFromArgs(args) {
        if (!Array.isArray(args) || !args[0] || typeof args[0] !== "object") {
          return {};
        }
        if (!utils.isOptionsHash(args[0])) {
          return args.shift();
        }
        const argKeys = Object.keys(args[0]);
        const optionKeysInArgs = argKeys.filter((key) => OPTIONS_KEYS.includes(key));
        if (optionKeysInArgs.length > 0 && optionKeysInArgs.length !== argKeys.length) {
          emitWarning(`Options found in arguments (${optionKeysInArgs.join(", ")}). Did you mean to pass an options object? See https://github.com/stripe/stripe-node/wiki/Passing-Options.`);
        }
        return {};
      },
      getOptionsFromArgs: (args) => {
        const opts = {
          auth: null,
          headers: {},
          settings: {}
        };
        if (args.length > 0) {
          const arg = args[args.length - 1];
          if (typeof arg === "string") {
            opts.auth = args.pop();
          } else if (utils.isOptionsHash(arg)) {
            const params = __spreadValues({}, args.pop());
            const extraKeys = Object.keys(params).filter((key) => !OPTIONS_KEYS.includes(key));
            if (extraKeys.length) {
              const nonDeprecated = extraKeys.filter((key) => {
                if (!DEPRECATED_OPTIONS[key]) {
                  return true;
                }
                const newParam = DEPRECATED_OPTIONS[key];
                if (params[newParam]) {
                  throw Error(`Both '${newParam}' and '${key}' were provided; please remove '${key}', which is deprecated.`);
                }
                emitWarning(`'${key}' is deprecated; use '${newParam}' instead.`);
                params[newParam] = params[key];
              });
              if (nonDeprecated.length) {
                emitWarning(`Invalid options found (${extraKeys.join(", ")}); ignoring.`);
              }
            }
            if (params.apiKey) {
              opts.auth = params.apiKey;
            }
            if (params.idempotencyKey) {
              opts.headers["Idempotency-Key"] = params.idempotencyKey;
            }
            if (params.stripeAccount) {
              opts.headers["Stripe-Account"] = params.stripeAccount;
            }
            if (params.apiVersion) {
              opts.headers["Stripe-Version"] = params.apiVersion;
            }
            if (Number.isInteger(params.maxNetworkRetries)) {
              opts.settings.maxNetworkRetries = params.maxNetworkRetries;
            }
            if (Number.isInteger(params.timeout)) {
              opts.settings.timeout = params.timeout;
            }
          }
        }
        return opts;
      },
      protoExtend(sub) {
        const Super = this;
        const Constructor = hasOwn(sub, "constructor") ? sub.constructor : function(...args) {
          Super.apply(this, args);
        };
        Object.assign(Constructor, Super);
        Constructor.prototype = Object.create(Super.prototype);
        Object.assign(Constructor.prototype, sub);
        return Constructor;
      },
      secureCompare: (a, b) => {
        a = Buffer.from(a);
        b = Buffer.from(b);
        if (a.length !== b.length) {
          return false;
        }
        if (crypto.timingSafeEqual) {
          return crypto.timingSafeEqual(a, b);
        }
        const len = a.length;
        let result = 0;
        for (let i = 0; i < len; ++i) {
          result |= a[i] ^ b[i];
        }
        return result === 0;
      },
      removeNullish: (obj) => {
        if (typeof obj !== "object") {
          throw new Error("Argument must be an object");
        }
        return Object.keys(obj).reduce((result, key) => {
          if (obj[key] != null) {
            result[key] = obj[key];
          }
          return result;
        }, {});
      },
      normalizeHeaders: (obj) => {
        if (!(obj && typeof obj === "object")) {
          return obj;
        }
        return Object.keys(obj).reduce((result, header) => {
          result[utils.normalizeHeader(header)] = obj[header];
          return result;
        }, {});
      },
      normalizeHeader: (header) => {
        return header.split("-").map((text) => text.charAt(0).toUpperCase() + text.substr(1).toLowerCase()).join("-");
      },
      checkForStream: (obj) => {
        if (obj.file && obj.file.data) {
          return obj.file.data instanceof EventEmitter;
        }
        return false;
      },
      callbackifyPromiseWithTimeout: (promise, callback) => {
        if (callback) {
          return promise.then((res) => {
            setTimeout(() => {
              callback(null, res);
            }, 0);
          }, (err) => {
            setTimeout(() => {
              callback(err, null);
            }, 0);
          });
        }
        return promise;
      },
      pascalToCamelCase: (name) => {
        if (name === "OAuth") {
          return "oauth";
        } else {
          return name[0].toLowerCase() + name.substring(1);
        }
      },
      emitWarning,
      safeExec: (cmd, cb) => {
        if (utils._exec === null) {
          cb(new Error("exec not available"), null);
          return;
        }
        try {
          utils._exec(cmd, cb);
        } catch (e) {
          cb(e, null);
        }
      },
      _exec: exec,
      isObject: (obj) => {
        const type = typeof obj;
        return (type === "function" || type === "object") && !!obj;
      },
      flattenAndStringify: (data) => {
        const result = {};
        const step = (obj, prevKey) => {
          Object.keys(obj).forEach((key) => {
            const value = obj[key];
            const newKey = prevKey ? `${prevKey}[${key}]` : key;
            if (utils.isObject(value)) {
              if (!Buffer.isBuffer(value) && !value.hasOwnProperty("data")) {
                return step(value, newKey);
              } else {
                result[newKey] = value;
              }
            } else {
              result[newKey] = String(value);
            }
          });
        };
        step(data);
        return result;
      },
      uuid4: () => {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
          const r = Math.random() * 16 | 0;
          const v = c === "x" ? r : r & 3 | 8;
          return v.toString(16);
        });
      },
      validateInteger: (name, n, defaultVal) => {
        if (!Number.isInteger(n)) {
          if (defaultVal !== void 0) {
            return defaultVal;
          } else {
            throw new Error(`${name} must be an integer`);
          }
        }
        return n;
      }
    };
    function emitWarning(warning) {
      if (typeof process.emitWarning !== "function") {
        return console.warn(`Stripe: ${warning}`);
      }
      return process.emitWarning(warning, "Stripe");
    }
  }
});

// node_modules/stripe/lib/Error.js
var require_Error = __commonJS({
  "node_modules/stripe/lib/Error.js"(exports2, module2) {
    "use strict";
    var StripeError = class extends Error {
      constructor(raw = {}) {
        super(raw.message);
        this.type = this.constructor.name;
        this.raw = raw;
        this.rawType = raw.type;
        this.code = raw.code;
        this.doc_url = raw.doc_url;
        this.param = raw.param;
        this.detail = raw.detail;
        this.headers = raw.headers;
        this.requestId = raw.requestId;
        this.statusCode = raw.statusCode;
        this.message = raw.message;
        this.charge = raw.charge;
        this.decline_code = raw.decline_code;
        this.payment_intent = raw.payment_intent;
        this.payment_method = raw.payment_method;
        this.payment_method_type = raw.payment_method_type;
        this.setup_intent = raw.setup_intent;
        this.source = raw.source;
      }
      static generate(rawStripeError) {
        switch (rawStripeError.type) {
          case "card_error":
            return new StripeCardError(rawStripeError);
          case "invalid_request_error":
            return new StripeInvalidRequestError(rawStripeError);
          case "api_error":
            return new StripeAPIError(rawStripeError);
          case "authentication_error":
            return new StripeAuthenticationError(rawStripeError);
          case "rate_limit_error":
            return new StripeRateLimitError(rawStripeError);
          case "idempotency_error":
            return new StripeIdempotencyError(rawStripeError);
          case "invalid_grant":
            return new StripeInvalidGrantError(rawStripeError);
          default:
            return new GenericError("Generic", "Unknown Error");
        }
      }
    };
    var StripeCardError = class extends StripeError {
    };
    var StripeInvalidRequestError = class extends StripeError {
    };
    var StripeAPIError = class extends StripeError {
    };
    var StripeAuthenticationError = class extends StripeError {
    };
    var StripePermissionError = class extends StripeError {
    };
    var StripeRateLimitError = class extends StripeError {
    };
    var StripeConnectionError = class extends StripeError {
    };
    var StripeSignatureVerificationError = class extends StripeError {
    };
    var StripeIdempotencyError = class extends StripeError {
    };
    var StripeInvalidGrantError = class extends StripeError {
    };
    module2.exports.generate = StripeError.generate;
    module2.exports.StripeError = StripeError;
    module2.exports.StripeCardError = StripeCardError;
    module2.exports.StripeInvalidRequestError = StripeInvalidRequestError;
    module2.exports.StripeAPIError = StripeAPIError;
    module2.exports.StripeAuthenticationError = StripeAuthenticationError;
    module2.exports.StripePermissionError = StripePermissionError;
    module2.exports.StripeRateLimitError = StripeRateLimitError;
    module2.exports.StripeConnectionError = StripeConnectionError;
    module2.exports.StripeSignatureVerificationError = StripeSignatureVerificationError;
    module2.exports.StripeIdempotencyError = StripeIdempotencyError;
    module2.exports.StripeInvalidGrantError = StripeInvalidGrantError;
  }
});

// node_modules/stripe/lib/makeRequest.js
var require_makeRequest = __commonJS({
  "node_modules/stripe/lib/makeRequest.js"(exports2, module2) {
    "use strict";
    var utils = require_utils2();
    function getRequestOpts(self, requestArgs, spec, overrideData) {
      const commandPath = utils.makeURLInterpolator(spec.path || "");
      const requestMethod = (spec.method || "GET").toUpperCase();
      const urlParams = spec.urlParams || [];
      const encode = spec.encode || ((data2) => data2);
      const host = spec.host;
      const path = self.createResourcePathWithSymbols(spec.path);
      const args = [].slice.call(requestArgs);
      const urlData = urlParams.reduce((urlData2, param) => {
        const arg = args.shift();
        if (typeof arg !== "string") {
          throw new Error(`Stripe: Argument "${param}" must be a string, but got: ${arg} (on API request to \`${requestMethod} ${path}\`)`);
        }
        urlData2[param] = arg;
        return urlData2;
      }, {});
      const dataFromArgs = utils.getDataFromArgs(args);
      const data = encode(Object.assign({}, dataFromArgs, overrideData));
      const options = utils.getOptionsFromArgs(args);
      if (args.filter((x) => x != null).length) {
        throw new Error(`Stripe: Unknown arguments (${args}). Did you mean to pass an options object? See https://github.com/stripe/stripe-node/wiki/Passing-Options. (on API request to ${requestMethod} \`${path}\`)`);
      }
      const requestPath = self.createFullPath(commandPath, urlData);
      const headers = Object.assign(options.headers, spec.headers);
      if (spec.validator) {
        spec.validator(data, { headers });
      }
      const dataInQuery = spec.method === "GET" || spec.method === "DELETE";
      const bodyData = dataInQuery ? {} : data;
      const queryData = dataInQuery ? data : {};
      return {
        requestMethod,
        requestPath,
        bodyData,
        queryData,
        auth: options.auth,
        headers,
        host,
        settings: options.settings
      };
    }
    function makeRequest(self, requestArgs, spec, overrideData) {
      return new Promise((resolve, reject) => {
        let opts;
        try {
          opts = getRequestOpts(self, requestArgs, spec, overrideData);
        } catch (err) {
          reject(err);
          return;
        }
        function requestCallback(err, response) {
          if (err) {
            reject(err);
          } else {
            resolve(spec.transformResponseData ? spec.transformResponseData(response) : response);
          }
        }
        const emptyQuery = Object.keys(opts.queryData).length === 0;
        const path = [
          opts.requestPath,
          emptyQuery ? "" : "?",
          utils.stringifyRequestData(opts.queryData)
        ].join("");
        const { headers, settings } = opts;
        self._request(opts.requestMethod, opts.host, path, opts.bodyData, opts.auth, { headers, settings }, requestCallback);
      });
    }
    module2.exports = makeRequest;
  }
});

// node_modules/stripe/lib/autoPagination.js
var require_autoPagination = __commonJS({
  "node_modules/stripe/lib/autoPagination.js"(exports2, module2) {
    "use strict";
    var makeRequest = require_makeRequest();
    var utils = require_utils2();
    function makeAutoPaginationMethods(self, requestArgs, spec, firstPagePromise) {
      const promiseCache = { currentPromise: null };
      const reverseIteration = isReverseIteration(requestArgs);
      let listPromise = firstPagePromise;
      let i = 0;
      function iterate(listResult) {
        if (!(listResult && listResult.data && typeof listResult.data.length === "number")) {
          throw Error("Unexpected: Stripe API response does not have a well-formed `data` array.");
        }
        if (i < listResult.data.length) {
          const idx = reverseIteration ? listResult.data.length - 1 - i : i;
          const value = listResult.data[idx];
          i += 1;
          return { value, done: false };
        } else if (listResult.has_more) {
          i = 0;
          const lastId = getLastId(listResult, reverseIteration);
          listPromise = makeRequest(self, requestArgs, spec, {
            [reverseIteration ? "ending_before" : "starting_after"]: lastId
          });
          return listPromise.then(iterate);
        }
        return { value: void 0, done: true };
      }
      function asyncIteratorNext() {
        return memoizedPromise(promiseCache, (resolve, reject) => {
          return listPromise.then(iterate).then(resolve).catch(reject);
        });
      }
      const autoPagingEach = makeAutoPagingEach(asyncIteratorNext);
      const autoPagingToArray = makeAutoPagingToArray(autoPagingEach);
      const autoPaginationMethods = {
        autoPagingEach,
        autoPagingToArray,
        next: asyncIteratorNext,
        return: () => {
          return {};
        },
        [getAsyncIteratorSymbol()]: () => {
          return autoPaginationMethods;
        }
      };
      return autoPaginationMethods;
    }
    module2.exports.makeAutoPaginationMethods = makeAutoPaginationMethods;
    function getAsyncIteratorSymbol() {
      if (typeof Symbol !== "undefined" && Symbol.asyncIterator) {
        return Symbol.asyncIterator;
      }
      return "@@asyncIterator";
    }
    function getDoneCallback(args) {
      if (args.length < 2) {
        return void 0;
      }
      const onDone = args[1];
      if (typeof onDone !== "function") {
        throw Error(`The second argument to autoPagingEach, if present, must be a callback function; received ${typeof onDone}`);
      }
      return onDone;
    }
    function getItemCallback(args) {
      if (args.length === 0) {
        return void 0;
      }
      const onItem = args[0];
      if (typeof onItem !== "function") {
        throw Error(`The first argument to autoPagingEach, if present, must be a callback function; received ${typeof onItem}`);
      }
      if (onItem.length === 2) {
        return onItem;
      }
      if (onItem.length > 2) {
        throw Error(`The \`onItem\` callback function passed to autoPagingEach must accept at most two arguments; got ${onItem}`);
      }
      return function _onItem(item, next) {
        const shouldContinue = onItem(item);
        next(shouldContinue);
      };
    }
    function getLastId(listResult, reverseIteration) {
      const lastIdx = reverseIteration ? 0 : listResult.data.length - 1;
      const lastItem = listResult.data[lastIdx];
      const lastId = lastItem && lastItem.id;
      if (!lastId) {
        throw Error("Unexpected: No `id` found on the last item while auto-paging a list.");
      }
      return lastId;
    }
    function memoizedPromise(promiseCache, cb) {
      if (promiseCache.currentPromise) {
        return promiseCache.currentPromise;
      }
      promiseCache.currentPromise = new Promise(cb).then((ret) => {
        promiseCache.currentPromise = void 0;
        return ret;
      });
      return promiseCache.currentPromise;
    }
    function makeAutoPagingEach(asyncIteratorNext) {
      return function autoPagingEach() {
        const args = [].slice.call(arguments);
        const onItem = getItemCallback(args);
        const onDone = getDoneCallback(args);
        if (args.length > 2) {
          throw Error("autoPagingEach takes up to two arguments; received:", args);
        }
        const autoPagePromise = wrapAsyncIteratorWithCallback(asyncIteratorNext, onItem);
        return utils.callbackifyPromiseWithTimeout(autoPagePromise, onDone);
      };
    }
    function makeAutoPagingToArray(autoPagingEach) {
      return function autoPagingToArray(opts, onDone) {
        const limit = opts && opts.limit;
        if (!limit) {
          throw Error("You must pass a `limit` option to autoPagingToArray, e.g., `autoPagingToArray({limit: 1000});`.");
        }
        if (limit > 1e4) {
          throw Error("You cannot specify a limit of more than 10,000 items to fetch in `autoPagingToArray`; use `autoPagingEach` to iterate through longer lists.");
        }
        const promise = new Promise((resolve, reject) => {
          const items = [];
          autoPagingEach((item) => {
            items.push(item);
            if (items.length >= limit) {
              return false;
            }
          }).then(() => {
            resolve(items);
          }).catch(reject);
        });
        return utils.callbackifyPromiseWithTimeout(promise, onDone);
      };
    }
    function wrapAsyncIteratorWithCallback(asyncIteratorNext, onItem) {
      return new Promise((resolve, reject) => {
        function handleIteration(iterResult) {
          if (iterResult.done) {
            resolve();
            return;
          }
          const item = iterResult.value;
          return new Promise((next) => {
            onItem(item, next);
          }).then((shouldContinue) => {
            if (shouldContinue === false) {
              return handleIteration({ done: true });
            } else {
              return asyncIteratorNext().then(handleIteration);
            }
          });
        }
        asyncIteratorNext().then(handleIteration).catch(reject);
      });
    }
    function isReverseIteration(requestArgs) {
      const args = [].slice.call(requestArgs);
      const dataFromArgs = utils.getDataFromArgs(args);
      return !!dataFromArgs.ending_before;
    }
  }
});

// node_modules/stripe/lib/StripeMethod.js
var require_StripeMethod = __commonJS({
  "node_modules/stripe/lib/StripeMethod.js"(exports2, module2) {
    "use strict";
    var utils = require_utils2();
    var makeRequest = require_makeRequest();
    var makeAutoPaginationMethods = require_autoPagination().makeAutoPaginationMethods;
    function stripeMethod(spec) {
      return function(...args) {
        const callback = typeof args[args.length - 1] == "function" && args.pop();
        spec.urlParams = utils.extractUrlParams(this.createResourcePathWithSymbols(spec.path || ""));
        const requestPromise = utils.callbackifyPromiseWithTimeout(makeRequest(this, args, spec, {}), callback);
        if (spec.methodType === "list") {
          const autoPaginationMethods = makeAutoPaginationMethods(this, args, spec, requestPromise);
          Object.assign(requestPromise, autoPaginationMethods);
        }
        return requestPromise;
      };
    }
    module2.exports = stripeMethod;
  }
});

// node_modules/stripe/lib/StripeMethod.basic.js
var require_StripeMethod_basic = __commonJS({
  "node_modules/stripe/lib/StripeMethod.basic.js"(exports2, module2) {
    "use strict";
    var stripeMethod = require_StripeMethod();
    module2.exports = {
      create: stripeMethod({
        method: "POST"
      }),
      list: stripeMethod({
        method: "GET",
        methodType: "list"
      }),
      retrieve: stripeMethod({
        method: "GET",
        path: "/{id}"
      }),
      update: stripeMethod({
        method: "POST",
        path: "{id}"
      }),
      del: stripeMethod({
        method: "DELETE",
        path: "{id}"
      })
    };
  }
});

// node_modules/stripe/lib/StripeResource.js
var require_StripeResource = __commonJS({
  "node_modules/stripe/lib/StripeResource.js"(exports2, module2) {
    "use strict";
    var http = require("http");
    var https = require("https");
    var path = require("path");
    var utils = require_utils2();
    var {
      StripeConnectionError,
      StripeAuthenticationError,
      StripePermissionError,
      StripeRateLimitError,
      StripeError,
      StripeAPIError
    } = require_Error();
    var defaultHttpAgent = new http.Agent({ keepAlive: true });
    var defaultHttpsAgent = new https.Agent({ keepAlive: true });
    StripeResource.extend = utils.protoExtend;
    StripeResource.method = require_StripeMethod();
    StripeResource.BASIC_METHODS = require_StripeMethod_basic();
    StripeResource.MAX_BUFFERED_REQUEST_METRICS = 100;
    var MAX_RETRY_AFTER_WAIT = 60;
    function StripeResource(stripe2, deprecatedUrlData) {
      this._stripe = stripe2;
      if (deprecatedUrlData) {
        throw new Error("Support for curried url params was dropped in stripe-node v7.0.0. Instead, pass two ids.");
      }
      this.basePath = utils.makeURLInterpolator(this.basePath || stripe2.getApiField("basePath"));
      this.resourcePath = this.path;
      this.path = utils.makeURLInterpolator(this.path);
      if (this.includeBasic) {
        this.includeBasic.forEach(function(methodName) {
          this[methodName] = StripeResource.BASIC_METHODS[methodName];
        }, this);
      }
      this.initialize(...arguments);
    }
    StripeResource.prototype = {
      path: "",
      basePath: null,
      initialize() {
      },
      requestDataProcessor: null,
      validateRequest: null,
      createFullPath(commandPath, urlData) {
        return path.join(this.basePath(urlData), this.path(urlData), typeof commandPath == "function" ? commandPath(urlData) : commandPath).replace(/\\/g, "/");
      },
      createResourcePathWithSymbols(pathWithSymbols) {
        return `/${path.join(this.resourcePath, pathWithSymbols || "").replace(/\\/g, "/")}`;
      },
      wrapTimeout: utils.callbackifyPromiseWithTimeout,
      _timeoutHandler(timeout, req, callback) {
        return () => {
          const timeoutErr = new TypeError("ETIMEDOUT");
          timeoutErr.code = "ETIMEDOUT";
          req._isAborted = true;
          req.abort();
          callback.call(this, new StripeConnectionError({
            message: `Request aborted due to timeout being reached (${timeout}ms)`,
            detail: timeoutErr
          }), null);
        };
      },
      _responseHandler(req, callback) {
        return (res) => {
          let response = "";
          res.setEncoding("utf8");
          res.on("data", (chunk) => {
            response += chunk;
          });
          res.once("end", () => {
            const headers = res.headers || {};
            res.requestId = headers["request-id"];
            const stripeAccount = headers["stripe-account"];
            if (stripeAccount) {
              res.stripeAccount = stripeAccount;
            }
            const apiVersion = headers["stripe-version"];
            if (apiVersion) {
              res.apiVersion = apiVersion;
            }
            const idempotencyKey = headers["idempotency-key"];
            if (idempotencyKey) {
              res.idempotencyKey = idempotencyKey;
            }
            const requestEndTime = Date.now();
            const requestDurationMs = requestEndTime - req._requestStart;
            const responseEvent = utils.removeNullish({
              api_version: headers["stripe-version"],
              account: headers["stripe-account"],
              idempotency_key: headers["idempotency-key"],
              method: req._requestEvent.method,
              path: req._requestEvent.path,
              status: res.statusCode,
              request_id: res.requestId,
              elapsed: requestDurationMs,
              request_start_time: req._requestStart,
              request_end_time: requestEndTime
            });
            this._stripe._emitter.emit("response", responseEvent);
            try {
              response = JSON.parse(response);
              if (response.error) {
                let err;
                if (typeof response.error === "string") {
                  response.error = {
                    type: response.error,
                    message: response.error_description
                  };
                }
                response.error.headers = headers;
                response.error.statusCode = res.statusCode;
                response.error.requestId = res.requestId;
                if (res.statusCode === 401) {
                  err = new StripeAuthenticationError(response.error);
                } else if (res.statusCode === 403) {
                  err = new StripePermissionError(response.error);
                } else if (res.statusCode === 429) {
                  err = new StripeRateLimitError(response.error);
                } else {
                  err = StripeError.generate(response.error);
                }
                return callback.call(this, err, null);
              }
            } catch (e) {
              return callback.call(this, new StripeAPIError({
                message: "Invalid JSON received from the Stripe API",
                response,
                exception: e,
                requestId: headers["request-id"]
              }), null);
            }
            this._recordRequestMetrics(res.requestId, requestDurationMs);
            Object.defineProperty(response, "lastResponse", {
              enumerable: false,
              writable: false,
              value: res
            });
            callback.call(this, null, response);
          });
        };
      },
      _generateConnectionErrorMessage(requestRetries) {
        return `An error occurred with our connection to Stripe.${requestRetries > 0 ? ` Request was retried ${requestRetries} times.` : ""}`;
      },
      _errorHandler(req, requestRetries, callback) {
        return (error) => {
          if (req._isAborted) {
            return;
          }
          callback.call(this, new StripeConnectionError({
            message: this._generateConnectionErrorMessage(requestRetries),
            detail: error
          }), null);
        };
      },
      _shouldRetry(res, numRetries, maxRetries) {
        if (numRetries >= maxRetries) {
          return false;
        }
        if (!res) {
          return true;
        }
        if (res.headers && res.headers["stripe-should-retry"] === "false") {
          return false;
        }
        if (res.headers && res.headers["stripe-should-retry"] === "true") {
          return true;
        }
        if (res.statusCode === 409) {
          return true;
        }
        if (res.statusCode >= 500) {
          return true;
        }
        return false;
      },
      _getSleepTimeInMS(numRetries, retryAfter = null) {
        const initialNetworkRetryDelay = this._stripe.getInitialNetworkRetryDelay();
        const maxNetworkRetryDelay = this._stripe.getMaxNetworkRetryDelay();
        let sleepSeconds = Math.min(initialNetworkRetryDelay * Math.pow(numRetries - 1, 2), maxNetworkRetryDelay);
        sleepSeconds *= 0.5 * (1 + Math.random());
        sleepSeconds = Math.max(initialNetworkRetryDelay, sleepSeconds);
        if (Number.isInteger(retryAfter) && retryAfter <= MAX_RETRY_AFTER_WAIT) {
          sleepSeconds = Math.max(sleepSeconds, retryAfter);
        }
        return sleepSeconds * 1e3;
      },
      _getMaxNetworkRetries(settings = {}) {
        return settings.maxNetworkRetries && Number.isInteger(settings.maxNetworkRetries) ? settings.maxNetworkRetries : this._stripe.getMaxNetworkRetries();
      },
      _defaultIdempotencyKey(method, settings) {
        const maxRetries = this._getMaxNetworkRetries(settings);
        if (method === "POST" && maxRetries > 0) {
          return `stripe-node-retry-${utils.uuid4()}`;
        }
        return null;
      },
      _makeHeaders(auth, contentLength, apiVersion, clientUserAgent, method, userSuppliedHeaders, userSuppliedSettings) {
        const defaultHeaders = {
          Authorization: auth ? `Bearer ${auth}` : this._stripe.getApiField("auth"),
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": contentLength,
          "User-Agent": this._getUserAgentString(),
          "X-Stripe-Client-User-Agent": clientUserAgent,
          "X-Stripe-Client-Telemetry": this._getTelemetryHeader(),
          "Stripe-Version": apiVersion,
          "Idempotency-Key": this._defaultIdempotencyKey(method, userSuppliedSettings)
        };
        return Object.assign(utils.removeNullish(defaultHeaders), utils.normalizeHeaders(userSuppliedHeaders));
      },
      _getUserAgentString() {
        const packageVersion = this._stripe.getConstant("PACKAGE_VERSION");
        const appInfo = this._stripe._appInfo ? this._stripe.getAppInfoAsString() : "";
        return `Stripe/v1 NodeBindings/${packageVersion} ${appInfo}`.trim();
      },
      _getTelemetryHeader() {
        if (this._stripe.getTelemetryEnabled() && this._stripe._prevRequestMetrics.length > 0) {
          const metrics = this._stripe._prevRequestMetrics.shift();
          return JSON.stringify({
            last_request_metrics: metrics
          });
        }
      },
      _recordRequestMetrics(requestId, requestDurationMs) {
        if (this._stripe.getTelemetryEnabled() && requestId) {
          if (this._stripe._prevRequestMetrics.length > StripeResource.MAX_BUFFERED_REQUEST_METRICS) {
            utils.emitWarning("Request metrics buffer is full, dropping telemetry message.");
          } else {
            this._stripe._prevRequestMetrics.push({
              request_id: requestId,
              request_duration_ms: requestDurationMs
            });
          }
        }
      },
      _request(method, host, path2, data, auth, options = {}, callback) {
        let requestData;
        const retryRequest = (requestFn, apiVersion, headers, requestRetries, retryAfter) => {
          return setTimeout(requestFn, this._getSleepTimeInMS(requestRetries, retryAfter), apiVersion, headers, requestRetries + 1);
        };
        const makeRequest = (apiVersion, headers, numRetries) => {
          const timeout = options.settings && Number.isInteger(options.settings.timeout) && options.settings.timeout >= 0 ? options.settings.timeout : this._stripe.getApiField("timeout");
          const isInsecureConnection = this._stripe.getApiField("protocol") === "http";
          let agent = this._stripe.getApiField("agent");
          if (agent == null) {
            agent = isInsecureConnection ? defaultHttpAgent : defaultHttpsAgent;
          }
          const req = (isInsecureConnection ? http : https).request({
            host: host || this._stripe.getApiField("host"),
            port: this._stripe.getApiField("port"),
            path: path2,
            method,
            agent,
            headers,
            ciphers: "DEFAULT:!aNULL:!eNULL:!LOW:!EXPORT:!SSLv2:!MD5"
          });
          const requestStartTime = Date.now();
          const requestEvent = utils.removeNullish({
            api_version: apiVersion,
            account: headers["Stripe-Account"],
            idempotency_key: headers["Idempotency-Key"],
            method,
            path: path2,
            request_start_time: requestStartTime
          });
          const requestRetries = numRetries || 0;
          const maxRetries = this._getMaxNetworkRetries(options.settings);
          req._requestEvent = requestEvent;
          req._requestStart = requestStartTime;
          this._stripe._emitter.emit("request", requestEvent);
          req.setTimeout(timeout, this._timeoutHandler(timeout, req, callback));
          req.once("response", (res) => {
            if (this._shouldRetry(res, requestRetries, maxRetries)) {
              return retryRequest(makeRequest, apiVersion, headers, requestRetries, ((res || {}).headers || {})["retry-after"]);
            } else {
              return this._responseHandler(req, callback)(res);
            }
          });
          req.on("error", (error) => {
            if (this._shouldRetry(null, requestRetries, maxRetries)) {
              return retryRequest(makeRequest, apiVersion, headers, requestRetries, null);
            } else {
              return this._errorHandler(req, requestRetries, callback)(error);
            }
          });
          req.once("socket", (socket) => {
            if (socket.connecting) {
              socket.once(isInsecureConnection ? "connect" : "secureConnect", () => {
                req.write(requestData);
                req.end();
              });
            } else {
              req.write(requestData);
              req.end();
            }
          });
        };
        const prepareAndMakeRequest = (error, data2) => {
          if (error) {
            return callback(error);
          }
          requestData = data2;
          this._stripe.getClientUserAgent((clientUserAgent) => {
            const apiVersion = this._stripe.getApiField("version");
            const headers = this._makeHeaders(auth, requestData.length, apiVersion, clientUserAgent, method, options.headers, options.settings);
            makeRequest(apiVersion, headers);
          });
        };
        if (this.requestDataProcessor) {
          this.requestDataProcessor(method, data, options.headers, prepareAndMakeRequest);
        } else {
          prepareAndMakeRequest(null, utils.stringifyRequestData(data || {}));
        }
      }
    };
    module2.exports = StripeResource;
  }
});

// node_modules/stripe/lib/resources/Accounts.js
var require_Accounts = __commonJS({
  "node_modules/stripe/lib/resources/Accounts.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    var stripeMethod = StripeResource.method;
    module2.exports = StripeResource.extend({
      path: "",
      create: stripeMethod({
        method: "POST",
        path: "accounts"
      }),
      retrieve(id) {
        if (typeof id === "string") {
          return stripeMethod({
            method: "GET",
            path: "accounts/{id}"
          }).apply(this, arguments);
        } else {
          if (id === null || id === void 0) {
            [].shift.apply(arguments);
          }
          return stripeMethod({
            method: "GET",
            path: "account"
          }).apply(this, arguments);
        }
      },
      update: stripeMethod({
        method: "POST",
        path: "accounts/{account}"
      }),
      list: stripeMethod({
        method: "GET",
        path: "accounts",
        methodType: "list"
      }),
      del: stripeMethod({
        method: "DELETE",
        path: "accounts/{account}"
      }),
      reject: stripeMethod({
        method: "POST",
        path: "accounts/{account}/reject"
      }),
      retrieveCapability: stripeMethod({
        method: "GET",
        path: "accounts/{account}/capabilities/{capability}"
      }),
      updateCapability: stripeMethod({
        method: "POST",
        path: "accounts/{account}/capabilities/{capability}"
      }),
      listCapabilities: stripeMethod({
        method: "GET",
        path: "accounts/{account}/capabilities",
        methodType: "list"
      }),
      createExternalAccount: stripeMethod({
        method: "POST",
        path: "accounts/{account}/external_accounts"
      }),
      retrieveExternalAccount: stripeMethod({
        method: "GET",
        path: "accounts/{account}/external_accounts/{id}"
      }),
      updateExternalAccount: stripeMethod({
        method: "POST",
        path: "accounts/{account}/external_accounts/{id}"
      }),
      listExternalAccounts: stripeMethod({
        method: "GET",
        path: "accounts/{account}/external_accounts",
        methodType: "list"
      }),
      deleteExternalAccount: stripeMethod({
        method: "DELETE",
        path: "accounts/{account}/external_accounts/{id}"
      }),
      createLoginLink: stripeMethod({
        method: "POST",
        path: "accounts/{account}/login_links"
      }),
      createPerson: stripeMethod({
        method: "POST",
        path: "accounts/{account}/persons"
      }),
      retrievePerson: stripeMethod({
        method: "GET",
        path: "accounts/{account}/persons/{person}"
      }),
      updatePerson: stripeMethod({
        method: "POST",
        path: "accounts/{account}/persons/{person}"
      }),
      listPersons: stripeMethod({
        method: "GET",
        path: "accounts/{account}/persons",
        methodType: "list"
      }),
      deletePerson: stripeMethod({
        method: "DELETE",
        path: "accounts/{account}/persons/{person}"
      })
    });
  }
});

// node_modules/stripe/lib/resources/AccountLinks.js
var require_AccountLinks = __commonJS({
  "node_modules/stripe/lib/resources/AccountLinks.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    module2.exports = StripeResource.extend({
      path: "account_links",
      includeBasic: ["create"]
    });
  }
});

// node_modules/stripe/lib/resources/ApplePayDomains.js
var require_ApplePayDomains = __commonJS({
  "node_modules/stripe/lib/resources/ApplePayDomains.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    module2.exports = StripeResource.extend({
      path: "apple_pay/domains",
      includeBasic: ["create", "retrieve", "list", "del"]
    });
  }
});

// node_modules/stripe/lib/resources/ApplicationFees.js
var require_ApplicationFees = __commonJS({
  "node_modules/stripe/lib/resources/ApplicationFees.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    var stripeMethod = StripeResource.method;
    module2.exports = StripeResource.extend({
      path: "application_fees",
      includeBasic: ["retrieve", "list"],
      createRefund: stripeMethod({
        method: "POST",
        path: "/{id}/refunds"
      }),
      retrieveRefund: stripeMethod({
        method: "GET",
        path: "/{fee}/refunds/{id}"
      }),
      updateRefund: stripeMethod({
        method: "POST",
        path: "/{fee}/refunds/{id}"
      }),
      listRefunds: stripeMethod({
        method: "GET",
        path: "/{id}/refunds",
        methodType: "list"
      })
    });
  }
});

// node_modules/stripe/lib/resources/Balance.js
var require_Balance = __commonJS({
  "node_modules/stripe/lib/resources/Balance.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    var stripeMethod = StripeResource.method;
    module2.exports = StripeResource.extend({
      path: "balance",
      retrieve: stripeMethod({
        method: "GET",
        path: ""
      })
    });
  }
});

// node_modules/stripe/lib/resources/BalanceTransactions.js
var require_BalanceTransactions = __commonJS({
  "node_modules/stripe/lib/resources/BalanceTransactions.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    module2.exports = StripeResource.extend({
      path: "balance_transactions",
      includeBasic: ["retrieve", "list"]
    });
  }
});

// node_modules/stripe/lib/resources/Charges.js
var require_Charges = __commonJS({
  "node_modules/stripe/lib/resources/Charges.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    var stripeMethod = StripeResource.method;
    module2.exports = StripeResource.extend({
      path: "charges",
      includeBasic: ["create", "retrieve", "update", "list"],
      capture: stripeMethod({
        method: "POST",
        path: "/{charge}/capture"
      })
    });
  }
});

// node_modules/stripe/lib/resources/CountrySpecs.js
var require_CountrySpecs = __commonJS({
  "node_modules/stripe/lib/resources/CountrySpecs.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    module2.exports = StripeResource.extend({
      path: "country_specs",
      includeBasic: ["retrieve", "list"]
    });
  }
});

// node_modules/stripe/lib/resources/Coupons.js
var require_Coupons = __commonJS({
  "node_modules/stripe/lib/resources/Coupons.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    module2.exports = StripeResource.extend({
      path: "coupons",
      includeBasic: ["create", "retrieve", "update", "list", "del"]
    });
  }
});

// node_modules/stripe/lib/resources/CreditNotes.js
var require_CreditNotes = __commonJS({
  "node_modules/stripe/lib/resources/CreditNotes.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    var stripeMethod = StripeResource.method;
    module2.exports = StripeResource.extend({
      path: "credit_notes",
      includeBasic: ["create", "retrieve", "update", "list"],
      preview: stripeMethod({
        method: "GET",
        path: "/preview"
      }),
      voidCreditNote: stripeMethod({
        method: "POST",
        path: "/{id}/void"
      }),
      listLineItems: stripeMethod({
        method: "GET",
        path: "/{creditNote}/lines",
        methodType: "list"
      }),
      listPreviewLineItems: stripeMethod({
        method: "GET",
        path: "/preview/lines",
        methodType: "list"
      })
    });
  }
});

// node_modules/stripe/lib/resources/Customers.js
var require_Customers = __commonJS({
  "node_modules/stripe/lib/resources/Customers.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    var stripeMethod = StripeResource.method;
    module2.exports = StripeResource.extend({
      path: "customers",
      includeBasic: ["create", "retrieve", "update", "list", "del"],
      deleteDiscount: stripeMethod({
        method: "DELETE",
        path: "/{customer}/discount"
      }),
      createBalanceTransaction: stripeMethod({
        method: "POST",
        path: "/{customer}/balance_transactions"
      }),
      retrieveBalanceTransaction: stripeMethod({
        method: "GET",
        path: "/{customer}/balance_transactions/{transaction}"
      }),
      updateBalanceTransaction: stripeMethod({
        method: "POST",
        path: "/{customer}/balance_transactions/{transaction}"
      }),
      listBalanceTransactions: stripeMethod({
        method: "GET",
        path: "/{customer}/balance_transactions",
        methodType: "list"
      }),
      createSource: stripeMethod({
        method: "POST",
        path: "/{customer}/sources"
      }),
      retrieveSource: stripeMethod({
        method: "GET",
        path: "/{customer}/sources/{id}"
      }),
      updateSource: stripeMethod({
        method: "POST",
        path: "/{customer}/sources/{id}"
      }),
      listSources: stripeMethod({
        method: "GET",
        path: "/{customer}/sources",
        methodType: "list"
      }),
      deleteSource: stripeMethod({
        method: "DELETE",
        path: "/{customer}/sources/{id}"
      }),
      verifySource: stripeMethod({
        method: "POST",
        path: "/{customer}/sources/{id}/verify"
      }),
      createTaxId: stripeMethod({
        method: "POST",
        path: "/{customer}/tax_ids"
      }),
      retrieveTaxId: stripeMethod({
        method: "GET",
        path: "/{customer}/tax_ids/{id}"
      }),
      listTaxIds: stripeMethod({
        method: "GET",
        path: "/{customer}/tax_ids",
        methodType: "list"
      }),
      deleteTaxId: stripeMethod({
        method: "DELETE",
        path: "/{customer}/tax_ids/{id}"
      })
    });
  }
});

// node_modules/stripe/lib/resources/Disputes.js
var require_Disputes = __commonJS({
  "node_modules/stripe/lib/resources/Disputes.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    var stripeMethod = StripeResource.method;
    module2.exports = StripeResource.extend({
      path: "disputes",
      includeBasic: ["retrieve", "update", "list"],
      close: stripeMethod({
        method: "POST",
        path: "/{dispute}/close"
      })
    });
  }
});

// node_modules/stripe/lib/resources/EphemeralKeys.js
var require_EphemeralKeys = __commonJS({
  "node_modules/stripe/lib/resources/EphemeralKeys.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    var stripeMethod = StripeResource.method;
    module2.exports = StripeResource.extend({
      path: "ephemeral_keys",
      includeBasic: ["del"],
      create: stripeMethod({
        method: "POST",
        path: "",
        validator: (data, options) => {
          if (!options.headers || !options.headers["Stripe-Version"]) {
            throw new Error("stripe_version must be specified to create an ephemeral key");
          }
        }
      })
    });
  }
});

// node_modules/stripe/lib/resources/Events.js
var require_Events = __commonJS({
  "node_modules/stripe/lib/resources/Events.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    module2.exports = StripeResource.extend({
      path: "events",
      includeBasic: ["retrieve", "list"]
    });
  }
});

// node_modules/stripe/lib/resources/ExchangeRates.js
var require_ExchangeRates = __commonJS({
  "node_modules/stripe/lib/resources/ExchangeRates.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    module2.exports = StripeResource.extend({
      path: "exchange_rates",
      includeBasic: ["retrieve", "list"]
    });
  }
});

// node_modules/stripe/lib/multipart.js
var require_multipart = __commonJS({
  "node_modules/stripe/lib/multipart.js"(exports2, module2) {
    "use strict";
    var utils = require_utils2();
    var { StripeError } = require_Error();
    var StreamProcessingError = class extends StripeError {
    };
    var multipartDataGenerator = (method, data, headers) => {
      const segno = (Math.round(Math.random() * 1e16) + Math.round(Math.random() * 1e16)).toString();
      headers["Content-Type"] = `multipart/form-data; boundary=${segno}`;
      let buffer = Buffer.alloc(0);
      function push(l) {
        const prevBuffer = buffer;
        const newBuffer = l instanceof Buffer ? l : Buffer.from(l);
        buffer = Buffer.alloc(prevBuffer.length + newBuffer.length + 2);
        prevBuffer.copy(buffer);
        newBuffer.copy(buffer, prevBuffer.length);
        buffer.write("\r\n", buffer.length - 2);
      }
      function q(s) {
        return `"${s.replace(/"|"/g, "%22").replace(/\r\n|\r|\n/g, " ")}"`;
      }
      const flattenedData = utils.flattenAndStringify(data);
      for (const k in flattenedData) {
        const v = flattenedData[k];
        push(`--${segno}`);
        if (v.hasOwnProperty("data")) {
          push(`Content-Disposition: form-data; name=${q(k)}; filename=${q(v.name || "blob")}`);
          push(`Content-Type: ${v.type || "application/octet-stream"}`);
          push("");
          push(v.data);
        } else {
          push(`Content-Disposition: form-data; name=${q(k)}`);
          push("");
          push(v);
        }
      }
      push(`--${segno}--`);
      return buffer;
    };
    var streamProcessor = (method, data, headers, callback) => {
      const bufferArray = [];
      data.file.data.on("data", (line) => {
        bufferArray.push(line);
      }).once("end", () => {
        const bufferData = Object.assign({}, data);
        bufferData.file.data = Buffer.concat(bufferArray);
        const buffer = multipartDataGenerator(method, bufferData, headers);
        callback(null, buffer);
      }).on("error", (err) => {
        callback(new StreamProcessingError({
          message: "An error occurred while attempting to process the file for upload.",
          detail: err
        }), null);
      });
    };
    var multipartRequestDataProcessor = (method, data, headers, callback) => {
      data = data || {};
      if (method !== "POST") {
        return callback(null, utils.stringifyRequestData(data));
      }
      const isStream = utils.checkForStream(data);
      if (isStream) {
        return streamProcessor(method, data, headers, callback);
      }
      const buffer = multipartDataGenerator(method, data, headers);
      return callback(null, buffer);
    };
    module2.exports.multipartRequestDataProcessor = multipartRequestDataProcessor;
  }
});

// node_modules/stripe/lib/resources/Files.js
var require_Files = __commonJS({
  "node_modules/stripe/lib/resources/Files.js"(exports2, module2) {
    "use strict";
    var { multipartRequestDataProcessor } = require_multipart();
    var StripeResource = require_StripeResource();
    var stripeMethod = StripeResource.method;
    module2.exports = StripeResource.extend({
      path: "files",
      includeBasic: ["retrieve", "list"],
      create: stripeMethod({
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        host: "files.stripe.com"
      }),
      requestDataProcessor: multipartRequestDataProcessor
    });
  }
});

// node_modules/stripe/lib/resources/FileLinks.js
var require_FileLinks = __commonJS({
  "node_modules/stripe/lib/resources/FileLinks.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    module2.exports = StripeResource.extend({
      path: "file_links",
      includeBasic: ["create", "retrieve", "update", "list"]
    });
  }
});

// node_modules/stripe/lib/resources/Invoices.js
var require_Invoices = __commonJS({
  "node_modules/stripe/lib/resources/Invoices.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    var stripeMethod = StripeResource.method;
    module2.exports = StripeResource.extend({
      path: "invoices",
      includeBasic: ["create", "retrieve", "update", "list", "del"],
      finalizeInvoice: stripeMethod({
        method: "POST",
        path: "/{invoice}/finalize"
      }),
      markUncollectible: stripeMethod({
        method: "POST",
        path: "/{invoice}/mark_uncollectible"
      }),
      pay: stripeMethod({
        method: "POST",
        path: "/{invoice}/pay"
      }),
      retrieveUpcoming: stripeMethod({
        method: "GET",
        path: "/upcoming"
      }),
      sendInvoice: stripeMethod({
        method: "POST",
        path: "/{invoice}/send"
      }),
      voidInvoice: stripeMethod({
        method: "POST",
        path: "/{invoice}/void"
      }),
      listLineItems: stripeMethod({
        method: "GET",
        path: "/{invoice}/lines",
        methodType: "list"
      }),
      listUpcomingLineItems: stripeMethod({
        method: "GET",
        path: "/upcoming/lines",
        methodType: "list"
      })
    });
  }
});

// node_modules/stripe/lib/resources/InvoiceItems.js
var require_InvoiceItems = __commonJS({
  "node_modules/stripe/lib/resources/InvoiceItems.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    module2.exports = StripeResource.extend({
      path: "invoiceitems",
      includeBasic: ["create", "retrieve", "update", "list", "del"]
    });
  }
});

// node_modules/stripe/lib/resources/IssuerFraudRecords.js
var require_IssuerFraudRecords = __commonJS({
  "node_modules/stripe/lib/resources/IssuerFraudRecords.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    module2.exports = StripeResource.extend({
      path: "issuer_fraud_records",
      includeBasic: ["retrieve", "list"]
    });
  }
});

// node_modules/stripe/lib/resources/Mandates.js
var require_Mandates = __commonJS({
  "node_modules/stripe/lib/resources/Mandates.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    module2.exports = StripeResource.extend({
      path: "mandates",
      includeBasic: ["retrieve"]
    });
  }
});

// node_modules/stripe/lib/resources/OAuth.js
var require_OAuth = __commonJS({
  "node_modules/stripe/lib/resources/OAuth.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    var stripeMethod = StripeResource.method;
    var utils = require_utils2();
    var oAuthHost = "connect.stripe.com";
    module2.exports = StripeResource.extend({
      basePath: "/",
      authorizeUrl(params, options) {
        params = params || {};
        options = options || {};
        let path = "oauth/authorize";
        if (options.express) {
          path = `express/${path}`;
        }
        if (!params.response_type) {
          params.response_type = "code";
        }
        if (!params.client_id) {
          params.client_id = this._stripe.getClientId();
        }
        if (!params.scope) {
          params.scope = "read_write";
        }
        return `https://${oAuthHost}/${path}?${utils.stringifyRequestData(params)}`;
      },
      token: stripeMethod({
        method: "POST",
        path: "oauth/token",
        host: oAuthHost
      }),
      deauthorize(spec) {
        if (!spec.client_id) {
          spec.client_id = this._stripe.getClientId();
        }
        return stripeMethod({
          method: "POST",
          path: "oauth/deauthorize",
          host: oAuthHost
        }).apply(this, arguments);
      }
    });
  }
});

// node_modules/stripe/lib/resources/Orders.js
var require_Orders = __commonJS({
  "node_modules/stripe/lib/resources/Orders.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    var stripeMethod = StripeResource.method;
    module2.exports = StripeResource.extend({
      path: "orders",
      includeBasic: ["create", "retrieve", "update", "list"],
      pay: stripeMethod({
        method: "POST",
        path: "/{id}/pay"
      }),
      returnOrder: stripeMethod({
        method: "POST",
        path: "/{id}/returns"
      })
    });
  }
});

// node_modules/stripe/lib/resources/OrderReturns.js
var require_OrderReturns = __commonJS({
  "node_modules/stripe/lib/resources/OrderReturns.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    module2.exports = StripeResource.extend({
      path: "order_returns",
      includeBasic: ["retrieve", "list"]
    });
  }
});

// node_modules/stripe/lib/resources/PaymentIntents.js
var require_PaymentIntents = __commonJS({
  "node_modules/stripe/lib/resources/PaymentIntents.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    var stripeMethod = StripeResource.method;
    module2.exports = StripeResource.extend({
      path: "payment_intents",
      includeBasic: ["create", "retrieve", "update", "list"],
      cancel: stripeMethod({
        method: "POST",
        path: "/{intent}/cancel"
      }),
      capture: stripeMethod({
        method: "POST",
        path: "/{intent}/capture"
      }),
      confirm: stripeMethod({
        method: "POST",
        path: "/{intent}/confirm"
      })
    });
  }
});

// node_modules/stripe/lib/resources/PaymentMethods.js
var require_PaymentMethods = __commonJS({
  "node_modules/stripe/lib/resources/PaymentMethods.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    var stripeMethod = StripeResource.method;
    module2.exports = StripeResource.extend({
      path: "payment_methods",
      includeBasic: ["create", "retrieve", "update", "list"],
      attach: stripeMethod({
        method: "POST",
        path: "/{paymentMethod}/attach"
      }),
      detach: stripeMethod({
        method: "POST",
        path: "/{paymentMethod}/detach"
      })
    });
  }
});

// node_modules/stripe/lib/resources/Payouts.js
var require_Payouts = __commonJS({
  "node_modules/stripe/lib/resources/Payouts.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    var stripeMethod = StripeResource.method;
    module2.exports = StripeResource.extend({
      path: "payouts",
      includeBasic: ["create", "retrieve", "update", "list"],
      cancel: stripeMethod({
        method: "POST",
        path: "/{payout}/cancel"
      }),
      reverse: stripeMethod({
        method: "POST",
        path: "/{payout}/reverse"
      })
    });
  }
});

// node_modules/stripe/lib/resources/Plans.js
var require_Plans = __commonJS({
  "node_modules/stripe/lib/resources/Plans.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    module2.exports = StripeResource.extend({
      path: "plans",
      includeBasic: ["create", "retrieve", "update", "list", "del"]
    });
  }
});

// node_modules/stripe/lib/resources/Prices.js
var require_Prices = __commonJS({
  "node_modules/stripe/lib/resources/Prices.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    module2.exports = StripeResource.extend({
      path: "prices",
      includeBasic: ["create", "retrieve", "update", "list"]
    });
  }
});

// node_modules/stripe/lib/resources/Products.js
var require_Products = __commonJS({
  "node_modules/stripe/lib/resources/Products.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    module2.exports = StripeResource.extend({
      path: "products",
      includeBasic: ["create", "retrieve", "update", "list", "del"]
    });
  }
});

// node_modules/stripe/lib/resources/PromotionCodes.js
var require_PromotionCodes = __commonJS({
  "node_modules/stripe/lib/resources/PromotionCodes.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    module2.exports = StripeResource.extend({
      path: "promotion_codes",
      includeBasic: ["create", "retrieve", "update", "list"]
    });
  }
});

// node_modules/stripe/lib/resources/Refunds.js
var require_Refunds = __commonJS({
  "node_modules/stripe/lib/resources/Refunds.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    module2.exports = StripeResource.extend({
      path: "refunds",
      includeBasic: ["create", "retrieve", "update", "list"]
    });
  }
});

// node_modules/stripe/lib/resources/Reviews.js
var require_Reviews = __commonJS({
  "node_modules/stripe/lib/resources/Reviews.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    var stripeMethod = StripeResource.method;
    module2.exports = StripeResource.extend({
      path: "reviews",
      includeBasic: ["retrieve", "list"],
      approve: stripeMethod({
        method: "POST",
        path: "/{review}/approve"
      })
    });
  }
});

// node_modules/stripe/lib/resources/SetupAttempts.js
var require_SetupAttempts = __commonJS({
  "node_modules/stripe/lib/resources/SetupAttempts.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    module2.exports = StripeResource.extend({
      path: "setup_attempts",
      includeBasic: ["list"]
    });
  }
});

// node_modules/stripe/lib/resources/SetupIntents.js
var require_SetupIntents = __commonJS({
  "node_modules/stripe/lib/resources/SetupIntents.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    var stripeMethod = StripeResource.method;
    module2.exports = StripeResource.extend({
      path: "setup_intents",
      includeBasic: ["create", "retrieve", "update", "list"],
      cancel: stripeMethod({
        method: "POST",
        path: "/{intent}/cancel"
      }),
      confirm: stripeMethod({
        method: "POST",
        path: "/{intent}/confirm"
      })
    });
  }
});

// node_modules/stripe/lib/resources/SKUs.js
var require_SKUs = __commonJS({
  "node_modules/stripe/lib/resources/SKUs.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    module2.exports = StripeResource.extend({
      path: "skus",
      includeBasic: ["create", "retrieve", "update", "list", "del"]
    });
  }
});

// node_modules/stripe/lib/resources/Sources.js
var require_Sources = __commonJS({
  "node_modules/stripe/lib/resources/Sources.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    var stripeMethod = StripeResource.method;
    module2.exports = StripeResource.extend({
      path: "sources",
      includeBasic: ["create", "retrieve", "update"],
      listSourceTransactions: stripeMethod({
        method: "GET",
        path: "/{source}/source_transactions",
        methodType: "list"
      }),
      verify: stripeMethod({
        method: "POST",
        path: "/{source}/verify"
      })
    });
  }
});

// node_modules/stripe/lib/resources/Subscriptions.js
var require_Subscriptions = __commonJS({
  "node_modules/stripe/lib/resources/Subscriptions.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    var stripeMethod = StripeResource.method;
    module2.exports = StripeResource.extend({
      path: "subscriptions",
      includeBasic: ["create", "retrieve", "update", "list", "del"],
      deleteDiscount: stripeMethod({
        method: "DELETE",
        path: "/{subscriptionExposedId}/discount"
      })
    });
  }
});

// node_modules/stripe/lib/resources/SubscriptionItems.js
var require_SubscriptionItems = __commonJS({
  "node_modules/stripe/lib/resources/SubscriptionItems.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    var stripeMethod = StripeResource.method;
    module2.exports = StripeResource.extend({
      path: "subscription_items",
      includeBasic: ["create", "retrieve", "update", "list", "del"],
      createUsageRecord: stripeMethod({
        method: "POST",
        path: "/{subscriptionItem}/usage_records"
      }),
      listUsageRecordSummaries: stripeMethod({
        method: "GET",
        path: "/{subscriptionItem}/usage_record_summaries",
        methodType: "list"
      })
    });
  }
});

// node_modules/stripe/lib/resources/SubscriptionSchedules.js
var require_SubscriptionSchedules = __commonJS({
  "node_modules/stripe/lib/resources/SubscriptionSchedules.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    var stripeMethod = StripeResource.method;
    module2.exports = StripeResource.extend({
      path: "subscription_schedules",
      includeBasic: ["create", "retrieve", "update", "list"],
      cancel: stripeMethod({
        method: "POST",
        path: "/{schedule}/cancel"
      }),
      release: stripeMethod({
        method: "POST",
        path: "/{schedule}/release"
      })
    });
  }
});

// node_modules/stripe/lib/resources/TaxRates.js
var require_TaxRates = __commonJS({
  "node_modules/stripe/lib/resources/TaxRates.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    module2.exports = StripeResource.extend({
      path: "tax_rates",
      includeBasic: ["create", "retrieve", "update", "list"]
    });
  }
});

// node_modules/stripe/lib/resources/Tokens.js
var require_Tokens = __commonJS({
  "node_modules/stripe/lib/resources/Tokens.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    module2.exports = StripeResource.extend({
      path: "tokens",
      includeBasic: ["create", "retrieve"]
    });
  }
});

// node_modules/stripe/lib/resources/Topups.js
var require_Topups = __commonJS({
  "node_modules/stripe/lib/resources/Topups.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    var stripeMethod = StripeResource.method;
    module2.exports = StripeResource.extend({
      path: "topups",
      includeBasic: ["create", "retrieve", "update", "list"],
      cancel: stripeMethod({
        method: "POST",
        path: "/{topup}/cancel"
      })
    });
  }
});

// node_modules/stripe/lib/resources/Transfers.js
var require_Transfers = __commonJS({
  "node_modules/stripe/lib/resources/Transfers.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    var stripeMethod = StripeResource.method;
    module2.exports = StripeResource.extend({
      path: "transfers",
      includeBasic: ["create", "retrieve", "update", "list"],
      createReversal: stripeMethod({
        method: "POST",
        path: "/{id}/reversals"
      }),
      retrieveReversal: stripeMethod({
        method: "GET",
        path: "/{transfer}/reversals/{id}"
      }),
      updateReversal: stripeMethod({
        method: "POST",
        path: "/{transfer}/reversals/{id}"
      }),
      listReversals: stripeMethod({
        method: "GET",
        path: "/{id}/reversals",
        methodType: "list"
      })
    });
  }
});

// node_modules/stripe/lib/resources/WebhookEndpoints.js
var require_WebhookEndpoints = __commonJS({
  "node_modules/stripe/lib/resources/WebhookEndpoints.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    module2.exports = StripeResource.extend({
      path: "webhook_endpoints",
      includeBasic: ["create", "retrieve", "update", "list", "del"]
    });
  }
});

// node_modules/stripe/lib/resources/BillingPortal/Sessions.js
var require_Sessions = __commonJS({
  "node_modules/stripe/lib/resources/BillingPortal/Sessions.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    module2.exports = StripeResource.extend({
      path: "billing_portal/sessions",
      includeBasic: ["create"]
    });
  }
});

// node_modules/stripe/lib/resources/Checkout/Sessions.js
var require_Sessions2 = __commonJS({
  "node_modules/stripe/lib/resources/Checkout/Sessions.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    var stripeMethod = StripeResource.method;
    module2.exports = StripeResource.extend({
      path: "checkout/sessions",
      includeBasic: ["create", "retrieve", "list"],
      listLineItems: stripeMethod({
        method: "GET",
        path: "/{session}/line_items",
        methodType: "list"
      })
    });
  }
});

// node_modules/stripe/lib/resources/Issuing/Authorizations.js
var require_Authorizations = __commonJS({
  "node_modules/stripe/lib/resources/Issuing/Authorizations.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    var stripeMethod = StripeResource.method;
    module2.exports = StripeResource.extend({
      path: "issuing/authorizations",
      includeBasic: ["retrieve", "update", "list"],
      approve: stripeMethod({
        method: "POST",
        path: "/{authorization}/approve"
      }),
      decline: stripeMethod({
        method: "POST",
        path: "/{authorization}/decline"
      })
    });
  }
});

// node_modules/stripe/lib/resources/Issuing/Cards.js
var require_Cards = __commonJS({
  "node_modules/stripe/lib/resources/Issuing/Cards.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    var stripeMethod = StripeResource.method;
    module2.exports = StripeResource.extend({
      path: "issuing/cards",
      includeBasic: ["create", "retrieve", "update", "list"],
      retrieveDetails: stripeMethod({
        method: "GET",
        path: "/{card}/details"
      })
    });
  }
});

// node_modules/stripe/lib/resources/Issuing/Cardholders.js
var require_Cardholders = __commonJS({
  "node_modules/stripe/lib/resources/Issuing/Cardholders.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    module2.exports = StripeResource.extend({
      path: "issuing/cardholders",
      includeBasic: ["create", "retrieve", "update", "list"]
    });
  }
});

// node_modules/stripe/lib/resources/Issuing/Disputes.js
var require_Disputes2 = __commonJS({
  "node_modules/stripe/lib/resources/Issuing/Disputes.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    var stripeMethod = StripeResource.method;
    module2.exports = StripeResource.extend({
      path: "issuing/disputes",
      includeBasic: ["create", "retrieve", "update", "list"],
      submit: stripeMethod({
        method: "POST",
        path: "/{dispute}/submit"
      })
    });
  }
});

// node_modules/stripe/lib/resources/Issuing/Transactions.js
var require_Transactions = __commonJS({
  "node_modules/stripe/lib/resources/Issuing/Transactions.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    module2.exports = StripeResource.extend({
      path: "issuing/transactions",
      includeBasic: ["retrieve", "update", "list"]
    });
  }
});

// node_modules/stripe/lib/resources/Radar/EarlyFraudWarnings.js
var require_EarlyFraudWarnings = __commonJS({
  "node_modules/stripe/lib/resources/Radar/EarlyFraudWarnings.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    module2.exports = StripeResource.extend({
      path: "radar/early_fraud_warnings",
      includeBasic: ["retrieve", "list"]
    });
  }
});

// node_modules/stripe/lib/resources/Radar/ValueLists.js
var require_ValueLists = __commonJS({
  "node_modules/stripe/lib/resources/Radar/ValueLists.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    module2.exports = StripeResource.extend({
      path: "radar/value_lists",
      includeBasic: ["create", "retrieve", "update", "list", "del"]
    });
  }
});

// node_modules/stripe/lib/resources/Radar/ValueListItems.js
var require_ValueListItems = __commonJS({
  "node_modules/stripe/lib/resources/Radar/ValueListItems.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    module2.exports = StripeResource.extend({
      path: "radar/value_list_items",
      includeBasic: ["create", "retrieve", "list", "del"]
    });
  }
});

// node_modules/stripe/lib/resources/Reporting/ReportRuns.js
var require_ReportRuns = __commonJS({
  "node_modules/stripe/lib/resources/Reporting/ReportRuns.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    module2.exports = StripeResource.extend({
      path: "reporting/report_runs",
      includeBasic: ["create", "retrieve", "list"]
    });
  }
});

// node_modules/stripe/lib/resources/Reporting/ReportTypes.js
var require_ReportTypes = __commonJS({
  "node_modules/stripe/lib/resources/Reporting/ReportTypes.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    module2.exports = StripeResource.extend({
      path: "reporting/report_types",
      includeBasic: ["retrieve", "list"]
    });
  }
});

// node_modules/stripe/lib/resources/Sigma/ScheduledQueryRuns.js
var require_ScheduledQueryRuns = __commonJS({
  "node_modules/stripe/lib/resources/Sigma/ScheduledQueryRuns.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    module2.exports = StripeResource.extend({
      path: "sigma/scheduled_query_runs",
      includeBasic: ["retrieve", "list"]
    });
  }
});

// node_modules/stripe/lib/resources/Terminal/ConnectionTokens.js
var require_ConnectionTokens = __commonJS({
  "node_modules/stripe/lib/resources/Terminal/ConnectionTokens.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    module2.exports = StripeResource.extend({
      path: "terminal/connection_tokens",
      includeBasic: ["create"]
    });
  }
});

// node_modules/stripe/lib/resources/Terminal/Locations.js
var require_Locations = __commonJS({
  "node_modules/stripe/lib/resources/Terminal/Locations.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    module2.exports = StripeResource.extend({
      path: "terminal/locations",
      includeBasic: ["create", "retrieve", "update", "list", "del"]
    });
  }
});

// node_modules/stripe/lib/resources/Terminal/Readers.js
var require_Readers = __commonJS({
  "node_modules/stripe/lib/resources/Terminal/Readers.js"(exports2, module2) {
    "use strict";
    var StripeResource = require_StripeResource();
    module2.exports = StripeResource.extend({
      path: "terminal/readers",
      includeBasic: ["create", "retrieve", "update", "list", "del"]
    });
  }
});

// node_modules/stripe/lib/resources.js
var require_resources = __commonJS({
  "node_modules/stripe/lib/resources.js"(exports2, module2) {
    "use strict";
    var resourceNamespace = require_ResourceNamespace();
    module2.exports = {
      Accounts: require_Accounts(),
      Account: require_Accounts(),
      AccountLinks: require_AccountLinks(),
      ApplePayDomains: require_ApplePayDomains(),
      ApplicationFees: require_ApplicationFees(),
      Balance: require_Balance(),
      BalanceTransactions: require_BalanceTransactions(),
      Charges: require_Charges(),
      CountrySpecs: require_CountrySpecs(),
      Coupons: require_Coupons(),
      CreditNotes: require_CreditNotes(),
      Customers: require_Customers(),
      Disputes: require_Disputes(),
      EphemeralKeys: require_EphemeralKeys(),
      Events: require_Events(),
      ExchangeRates: require_ExchangeRates(),
      Files: require_Files(),
      FileLinks: require_FileLinks(),
      Invoices: require_Invoices(),
      InvoiceItems: require_InvoiceItems(),
      IssuerFraudRecords: require_IssuerFraudRecords(),
      Mandates: require_Mandates(),
      OAuth: require_OAuth(),
      Orders: require_Orders(),
      OrderReturns: require_OrderReturns(),
      PaymentIntents: require_PaymentIntents(),
      PaymentMethods: require_PaymentMethods(),
      Payouts: require_Payouts(),
      Plans: require_Plans(),
      Prices: require_Prices(),
      Products: require_Products(),
      PromotionCodes: require_PromotionCodes(),
      Refunds: require_Refunds(),
      Reviews: require_Reviews(),
      SetupAttempts: require_SetupAttempts(),
      SetupIntents: require_SetupIntents(),
      Skus: require_SKUs(),
      Sources: require_Sources(),
      Subscriptions: require_Subscriptions(),
      SubscriptionItems: require_SubscriptionItems(),
      SubscriptionSchedules: require_SubscriptionSchedules(),
      TaxRates: require_TaxRates(),
      Tokens: require_Tokens(),
      Topups: require_Topups(),
      Transfers: require_Transfers(),
      WebhookEndpoints: require_WebhookEndpoints(),
      BillingPortal: resourceNamespace("billingPortal", {
        Sessions: require_Sessions()
      }),
      Checkout: resourceNamespace("checkout", {
        Sessions: require_Sessions2()
      }),
      Issuing: resourceNamespace("issuing", {
        Authorizations: require_Authorizations(),
        Cards: require_Cards(),
        Cardholders: require_Cardholders(),
        Disputes: require_Disputes2(),
        Transactions: require_Transactions()
      }),
      Radar: resourceNamespace("radar", {
        EarlyFraudWarnings: require_EarlyFraudWarnings(),
        ValueLists: require_ValueLists(),
        ValueListItems: require_ValueListItems()
      }),
      Reporting: resourceNamespace("reporting", {
        ReportRuns: require_ReportRuns(),
        ReportTypes: require_ReportTypes()
      }),
      Sigma: resourceNamespace("sigma", {
        ScheduledQueryRuns: require_ScheduledQueryRuns()
      }),
      Terminal: resourceNamespace("terminal", {
        ConnectionTokens: require_ConnectionTokens(),
        Locations: require_Locations(),
        Readers: require_Readers()
      })
    };
  }
});

// node_modules/stripe/package.json
var require_package = __commonJS({
  "node_modules/stripe/package.json"(exports2, module2) {
    module2.exports = {
      name: "stripe",
      version: "8.130.0",
      description: "Stripe API wrapper",
      keywords: [
        "stripe",
        "payment processing",
        "credit cards",
        "api"
      ],
      homepage: "https://github.com/stripe/stripe-node",
      author: "Stripe <support@stripe.com> (https://stripe.com/)",
      contributors: [
        "Ask Bj\xF8rn Hansen <ask@develooper.com> (http://www.askask.com/)",
        "Michelle Bu <michelle@stripe.com>",
        "Alex Sexton <alex@stripe.com>",
        "James Padolsey"
      ],
      repository: {
        type: "git",
        url: "git://github.com/stripe/stripe-node.git"
      },
      "bugs:": "https://github.com/stripe/stripe-node/issues",
      engines: {
        node: "^8.1 || >=10.*"
      },
      main: "lib/stripe.js",
      types: "types/2020-08-27/index.d.ts",
      devDependencies: {
        "@typescript-eslint/eslint-plugin": "^2.13.0",
        "@typescript-eslint/parser": "^2.13.0",
        chai: "~4.2.0",
        "chai-as-promised": "~7.1.1",
        coveralls: "^3.0.0",
        eslint: "^6.8.0",
        "eslint-config-prettier": "^4.1.0",
        "eslint-plugin-chai-friendly": "^0.4.0",
        "eslint-plugin-prettier": "^3.0.1",
        mocha: "~6.1.4",
        "mocha-junit-reporter": "^1.23.1",
        nock: "^10.0.6",
        nyc: "^14.1.0",
        prettier: "^1.16.4",
        typescript: "^3.7.2"
      },
      dependencies: {
        "@types/node": ">=8.1.0",
        qs: "^6.6.0"
      },
      license: "MIT",
      scripts: {
        clean: "rm -rf ./.nyc_output ./node_modules/.cache ./coverage",
        mocha: "nyc mocha",
        "mocha-only": "mocha",
        test: "yarn lint && yarn test-typescript && yarn mocha",
        "test-typescript": "tsc --build types/test",
        lint: "eslint --ext .js,.jsx,.ts .",
        fix: "yarn lint --fix && ./scripts/updateAPIVersion.js",
        report: "nyc -r text -r lcov report",
        coveralls: "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js"
      }
    };
  }
});

// node_modules/stripe/lib/Webhooks.js
var require_Webhooks = __commonJS({
  "node_modules/stripe/lib/Webhooks.js"(exports2, module2) {
    "use strict";
    var crypto = require("crypto");
    var utils = require_utils2();
    var { StripeError, StripeSignatureVerificationError } = require_Error();
    var Webhook = {
      DEFAULT_TOLERANCE: 300,
      constructEvent(payload, header, secret, tolerance) {
        this.signature.verifyHeader(payload, header, secret, tolerance || Webhook.DEFAULT_TOLERANCE);
        const jsonPayload = JSON.parse(payload);
        return jsonPayload;
      },
      generateTestHeaderString: function(opts) {
        if (!opts) {
          throw new StripeError({
            message: "Options are required"
          });
        }
        opts.timestamp = Math.floor(opts.timestamp) || Math.floor(Date.now() / 1e3);
        opts.scheme = opts.scheme || signature.EXPECTED_SCHEME;
        opts.signature = opts.signature || signature._computeSignature(opts.timestamp + "." + opts.payload, opts.secret);
        const generatedHeader = [
          "t=" + opts.timestamp,
          opts.scheme + "=" + opts.signature
        ].join(",");
        return generatedHeader;
      }
    };
    var signature = {
      EXPECTED_SCHEME: "v1",
      _computeSignature: (payload, secret) => {
        return crypto.createHmac("sha256", secret).update(payload, "utf8").digest("hex");
      },
      verifyHeader(payload, header, secret, tolerance) {
        payload = Buffer.isBuffer(payload) ? payload.toString("utf8") : payload;
        if (Array.isArray(header)) {
          throw new Error("Unexpected: An array was passed as a header, which should not be possible for the stripe-signature header.");
        }
        header = Buffer.isBuffer(header) ? header.toString("utf8") : header;
        const details = parseHeader(header, this.EXPECTED_SCHEME);
        if (!details || details.timestamp === -1) {
          throw new StripeSignatureVerificationError({
            message: "Unable to extract timestamp and signatures from header",
            detail: {
              header,
              payload
            }
          });
        }
        if (!details.signatures.length) {
          throw new StripeSignatureVerificationError({
            message: "No signatures found with expected scheme",
            detail: {
              header,
              payload
            }
          });
        }
        const expectedSignature = this._computeSignature(`${details.timestamp}.${payload}`, secret);
        const signatureFound = !!details.signatures.filter(utils.secureCompare.bind(utils, expectedSignature)).length;
        if (!signatureFound) {
          throw new StripeSignatureVerificationError({
            message: "No signatures found matching the expected signature for payload. Are you passing the raw request body you received from Stripe? https://github.com/stripe/stripe-node#webhook-signing",
            detail: {
              header,
              payload
            }
          });
        }
        const timestampAge = Math.floor(Date.now() / 1e3) - details.timestamp;
        if (tolerance > 0 && timestampAge > tolerance) {
          throw new StripeSignatureVerificationError({
            message: "Timestamp outside the tolerance zone",
            detail: {
              header,
              payload
            }
          });
        }
        return true;
      }
    };
    function parseHeader(header, scheme) {
      if (typeof header !== "string") {
        return null;
      }
      return header.split(",").reduce((accum, item) => {
        const kv = item.split("=");
        if (kv[0] === "t") {
          accum.timestamp = kv[1];
        }
        if (kv[0] === scheme) {
          accum.signatures.push(kv[1]);
        }
        return accum;
      }, {
        timestamp: -1,
        signatures: []
      });
    }
    Webhook.signature = signature;
    module2.exports = Webhook;
  }
});

// node_modules/stripe/lib/stripe.js
var require_stripe = __commonJS({
  "node_modules/stripe/lib/stripe.js"(exports2, module2) {
    "use strict";
    var resources = require_resources();
    var DEFAULT_HOST = "api.stripe.com";
    var DEFAULT_PORT = "443";
    var DEFAULT_BASE_PATH = "/v1/";
    var DEFAULT_API_VERSION = null;
    var DEFAULT_TIMEOUT = 8e4;
    Stripe.PACKAGE_VERSION = require_package().version;
    Stripe.USER_AGENT = {
      bindings_version: Stripe.PACKAGE_VERSION,
      lang: "node",
      lang_version: process.version,
      platform: process.platform,
      publisher: "stripe",
      uname: null,
      typescript: false
    };
    Stripe.USER_AGENT_SERIALIZED = null;
    var MAX_NETWORK_RETRY_DELAY_SEC = 2;
    var INITIAL_NETWORK_RETRY_DELAY_SEC = 0.5;
    var APP_INFO_PROPERTIES = ["name", "version", "url", "partner_id"];
    var ALLOWED_CONFIG_PROPERTIES = [
      "apiVersion",
      "typescript",
      "maxNetworkRetries",
      "httpAgent",
      "timeout",
      "host",
      "port",
      "protocol",
      "telemetry",
      "appInfo"
    ];
    var EventEmitter = require("events").EventEmitter;
    var utils = require_utils2();
    var { emitWarning } = utils;
    Stripe.StripeResource = require_StripeResource();
    Stripe.resources = resources;
    function Stripe(key, config = {}) {
      if (!(this instanceof Stripe)) {
        return new Stripe(key, config);
      }
      const props = this._getPropsFromConfig(config);
      Object.defineProperty(this, "_emitter", {
        value: new EventEmitter(),
        enumerable: false,
        configurable: false,
        writable: false
      });
      this.VERSION = Stripe.PACKAGE_VERSION;
      this.on = this._emitter.on.bind(this._emitter);
      this.once = this._emitter.once.bind(this._emitter);
      this.off = this._emitter.removeListener.bind(this._emitter);
      if (props.protocol && props.protocol !== "https" && (!props.host || /\.stripe\.com$/.test(props.host))) {
        throw new Error("The `https` protocol must be used when sending requests to `*.stripe.com`");
      }
      this._api = {
        auth: null,
        host: props.host || DEFAULT_HOST,
        port: props.port || DEFAULT_PORT,
        protocol: props.protocol || "https",
        basePath: DEFAULT_BASE_PATH,
        version: props.apiVersion || DEFAULT_API_VERSION,
        timeout: utils.validateInteger("timeout", props.timeout, DEFAULT_TIMEOUT),
        maxNetworkRetries: utils.validateInteger("maxNetworkRetries", props.maxNetworkRetries, 0),
        agent: props.httpAgent || null,
        dev: false
      };
      const typescript = props.typescript || false;
      if (typescript !== Stripe.USER_AGENT.typescript) {
        Stripe.USER_AGENT_SERIALIZED = null;
        Stripe.USER_AGENT.typescript = typescript;
      }
      if (props.appInfo) {
        this._setAppInfo(props.appInfo);
      }
      this._prepResources();
      this._setApiKey(key);
      this.errors = require_Error();
      this.webhooks = require_Webhooks();
      this._prevRequestMetrics = [];
      this._enableTelemetry = props.telemetry !== false;
      this.StripeResource = Stripe.StripeResource;
    }
    Stripe.errors = require_Error();
    Stripe.webhooks = require_Webhooks();
    Stripe.prototype = {
      setHost(host, port, protocol) {
        emitWarning("`setHost` is deprecated. Use the `host` config option instead.");
        this._setApiField("host", host);
        if (port) {
          this.setPort(port);
        }
        if (protocol) {
          this.setProtocol(protocol);
        }
      },
      setProtocol(protocol) {
        emitWarning("`setProtocol` is deprecated. Use the `protocol` config option instead.");
        this._setApiField("protocol", protocol.toLowerCase());
      },
      setPort(port) {
        emitWarning("`setPort` is deprecated. Use the `port` config option instead.");
        this._setApiField("port", port);
      },
      setApiVersion(version) {
        emitWarning("`setApiVersion` is deprecated. Use the `apiVersion` config or request option instead.");
        if (version) {
          this._setApiField("version", version);
        }
      },
      setApiKey(key) {
        emitWarning("`setApiKey` is deprecated. Use the `apiKey` request option instead.");
        this._setApiKey(key);
      },
      _setApiKey(key) {
        if (key) {
          this._setApiField("auth", `Bearer ${key}`);
        }
      },
      setTimeout(timeout) {
        emitWarning("`setTimeout` is deprecated. Use the `timeout` config or request option instead.");
        this._setApiField("timeout", timeout == null ? DEFAULT_TIMEOUT : timeout);
      },
      setAppInfo(info) {
        emitWarning("`setAppInfo` is deprecated. Use the `appInfo` config option instead.");
        this._setAppInfo(info);
      },
      _setAppInfo(info) {
        if (info && typeof info !== "object") {
          throw new Error("AppInfo must be an object.");
        }
        if (info && !info.name) {
          throw new Error("AppInfo.name is required");
        }
        info = info || {};
        const appInfo = APP_INFO_PROPERTIES.reduce((accum, prop) => {
          if (typeof info[prop] == "string") {
            accum = accum || {};
            accum[prop] = info[prop];
          }
          return accum;
        }, void 0);
        Stripe.USER_AGENT_SERIALIZED = void 0;
        this._appInfo = appInfo;
      },
      setHttpAgent(agent) {
        emitWarning("`setHttpAgent` is deprecated. Use the `httpAgent` config option instead.");
        this._setApiField("agent", agent);
      },
      _setApiField(key, value) {
        this._api[key] = value;
      },
      getApiField(key) {
        return this._api[key];
      },
      setClientId(clientId) {
        this._clientId = clientId;
      },
      getClientId() {
        return this._clientId;
      },
      getConstant: (c) => {
        switch (c) {
          case "DEFAULT_HOST":
            return DEFAULT_HOST;
          case "DEFAULT_PORT":
            return DEFAULT_PORT;
          case "DEFAULT_BASE_PATH":
            return DEFAULT_BASE_PATH;
          case "DEFAULT_API_VERSION":
            return DEFAULT_API_VERSION;
          case "DEFAULT_TIMEOUT":
            return DEFAULT_TIMEOUT;
          case "MAX_NETWORK_RETRY_DELAY_SEC":
            return MAX_NETWORK_RETRY_DELAY_SEC;
          case "INITIAL_NETWORK_RETRY_DELAY_SEC":
            return INITIAL_NETWORK_RETRY_DELAY_SEC;
        }
        return Stripe[c];
      },
      getMaxNetworkRetries() {
        return this.getApiField("maxNetworkRetries");
      },
      setMaxNetworkRetries(maxNetworkRetries) {
        this._setApiNumberField("maxNetworkRetries", maxNetworkRetries);
      },
      _setApiNumberField(prop, n, defaultVal) {
        const val = utils.validateInteger(prop, n, defaultVal);
        this._setApiField(prop, val);
      },
      getMaxNetworkRetryDelay() {
        return MAX_NETWORK_RETRY_DELAY_SEC;
      },
      getInitialNetworkRetryDelay() {
        return INITIAL_NETWORK_RETRY_DELAY_SEC;
      },
      getClientUserAgent(cb) {
        if (Stripe.USER_AGENT_SERIALIZED) {
          return cb(Stripe.USER_AGENT_SERIALIZED);
        }
        this.getClientUserAgentSeeded(Stripe.USER_AGENT, (cua) => {
          Stripe.USER_AGENT_SERIALIZED = cua;
          cb(Stripe.USER_AGENT_SERIALIZED);
        });
      },
      getClientUserAgentSeeded(seed, cb) {
        utils.safeExec("uname -a", (err, uname) => {
          const userAgent = {};
          for (const field in seed) {
            userAgent[field] = encodeURIComponent(seed[field]);
          }
          userAgent.uname = encodeURIComponent(uname || "UNKNOWN");
          if (this._appInfo) {
            userAgent.application = this._appInfo;
          }
          cb(JSON.stringify(userAgent));
        });
      },
      getAppInfoAsString() {
        if (!this._appInfo) {
          return "";
        }
        let formatted = this._appInfo.name;
        if (this._appInfo.version) {
          formatted += `/${this._appInfo.version}`;
        }
        if (this._appInfo.url) {
          formatted += ` (${this._appInfo.url})`;
        }
        return formatted;
      },
      setTelemetryEnabled(enableTelemetry) {
        emitWarning("`setTelemetryEnabled` is deprecated. Use the `telemetry` config option instead.");
        this._enableTelemetry = enableTelemetry;
      },
      getTelemetryEnabled() {
        return this._enableTelemetry;
      },
      _prepResources() {
        for (const name in resources) {
          this[utils.pascalToCamelCase(name)] = new resources[name](this);
        }
      },
      _getPropsFromConfig(config) {
        if (!config) {
          return {};
        }
        const isString = typeof config === "string";
        const isObject = config === Object(config) && !Array.isArray(config);
        if (!isObject && !isString) {
          throw new Error("Config must either be an object or a string");
        }
        if (isString) {
          return {
            apiVersion: config
          };
        }
        const values = Object.keys(config).filter((value) => !ALLOWED_CONFIG_PROPERTIES.includes(value));
        if (values.length > 0) {
          throw new Error(`Config object may only contain the following: ${ALLOWED_CONFIG_PROPERTIES.join(", ")}`);
        }
        return config;
      }
    };
    module2.exports = Stripe;
    module2.exports.Stripe = Stripe;
    module2.exports.default = Stripe;
  }
});

// functions/create-payment-intent.ts
require_main().config();
var stripe = require_stripe()(process.env.REACT_APP_STRIPE_SECRET_KEY);
exports.handler = async function(event, context) {
  if (event.body) {
    const { cart, totalAmount } = JSON.parse(event.body);
    const calculateTotal = (cart2) => {
      return cart2.reduce((total, cartItem) => {
        const { price, amount } = cartItem;
        total += amount * price;
        return total;
      }, 0);
    };
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateTotal(cart),
        currency: "thb"
      });
      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret })
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: error.message })
      };
    }
  } else {
    return {
      statusCode: 200,
      body: "create-payment-intent"
    };
  }
};
//# sourceMappingURL=create-payment-intent.js.map
