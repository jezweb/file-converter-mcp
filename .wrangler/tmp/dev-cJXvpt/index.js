var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn2, res) => function __init() {
  return fn2 && (res = (0, fn2[__getOwnPropNames(fn2)[0]])(fn2 = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// .wrangler/tmp/bundle-iuZbtB/checked-fetch.js
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
var urls;
var init_checked_fetch = __esm({
  ".wrangler/tmp/bundle-iuZbtB/checked-fetch.js"() {
    "use strict";
    urls = /* @__PURE__ */ new Set();
    __name(checkURL, "checkURL");
    globalThis.fetch = new Proxy(globalThis.fetch, {
      apply(target, thisArg, argArray) {
        const [request, init] = argArray;
        checkURL(request, init);
        return Reflect.apply(target, thisArg, argArray);
      }
    });
  }
});

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_checked_fetch();
    init_modules_watch_stub();
  }
});

// node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports, module) {
    init_checked_fetch();
    init_modules_watch_stub();
    var s2 = 1e3;
    var m3 = s2 * 60;
    var h3 = m3 * 60;
    var d2 = h3 * 24;
    var w3 = d2 * 7;
    var y3 = d2 * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match2 = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match2) {
        return;
      }
      var n3 = parseFloat(match2[1]);
      var type = (match2[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n3 * y3;
        case "weeks":
        case "week":
        case "w":
          return n3 * w3;
        case "days":
        case "day":
        case "d":
          return n3 * d2;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n3 * h3;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n3 * m3;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n3 * s2;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n3;
        default:
          return void 0;
      }
    }
    __name(parse, "parse");
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d2) {
        return Math.round(ms / d2) + "d";
      }
      if (msAbs >= h3) {
        return Math.round(ms / h3) + "h";
      }
      if (msAbs >= m3) {
        return Math.round(ms / m3) + "m";
      }
      if (msAbs >= s2) {
        return Math.round(ms / s2) + "s";
      }
      return ms + "ms";
    }
    __name(fmtShort, "fmtShort");
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d2) {
        return plural(ms, msAbs, d2, "day");
      }
      if (msAbs >= h3) {
        return plural(ms, msAbs, h3, "hour");
      }
      if (msAbs >= m3) {
        return plural(ms, msAbs, m3, "minute");
      }
      if (msAbs >= s2) {
        return plural(ms, msAbs, s2, "second");
      }
      return ms + " ms";
    }
    __name(fmtLong, "fmtLong");
    function plural(ms, msAbs, n3, name) {
      var isPlural = msAbs >= n3 * 1.5;
      return Math.round(ms / n3) + " " + name + (isPlural ? "s" : "");
    }
    __name(plural, "plural");
  }
});

// node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/debug/src/common.js"(exports, module) {
    init_checked_fetch();
    init_modules_watch_stub();
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i2 = 0; i2 < namespace.length; i2++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i2);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      __name(selectColor, "selectColor");
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug2(...args) {
          if (!debug2.enabled) {
            return;
          }
          const self = debug2;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match2, format) => {
            if (match2 === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match2 = formatter.call(self, val);
              args.splice(index, 1);
              index--;
            }
            return match2;
          });
          createDebug.formatArgs.call(self, args);
          const logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }
        __name(debug2, "debug");
        debug2.namespace = namespace;
        debug2.useColors = createDebug.useColors();
        debug2.color = createDebug.selectColor(namespace);
        debug2.extend = extend;
        debug2.destroy = createDebug.destroy;
        Object.defineProperty(debug2, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v3) => {
            enableOverride = v3;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug2);
        }
        return debug2;
      }
      __name(createDebug, "createDebug");
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      __name(extend, "extend");
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i2;
        const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        const len = split.length;
        for (i2 = 0; i2 < len; i2++) {
          if (!split[i2]) {
            continue;
          }
          namespaces = split[i2].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
          } else {
            createDebug.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
      }
      __name(enable, "enable");
      function disable() {
        const namespaces = [
          ...createDebug.names.map(toNamespace),
          ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      __name(disable, "disable");
      function enabled(name) {
        if (name[name.length - 1] === "*") {
          return true;
        }
        let i2;
        let len;
        for (i2 = 0, len = createDebug.skips.length; i2 < len; i2++) {
          if (createDebug.skips[i2].test(name)) {
            return false;
          }
        }
        for (i2 = 0, len = createDebug.names.length; i2 < len; i2++) {
          if (createDebug.names[i2].test(name)) {
            return true;
          }
        }
        return false;
      }
      __name(enabled, "enabled");
      function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
      }
      __name(toNamespace, "toNamespace");
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      __name(coerce, "coerce");
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      __name(destroy, "destroy");
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    __name(setup, "setup");
    module.exports = setup;
  }
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/debug/src/browser.js"(exports, module) {
    init_checked_fetch();
    init_modules_watch_stub();
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && "Cloudflare-Workers" && "Cloudflare-Workers".toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && "Cloudflare-Workers" && "Cloudflare-Workers".toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && "Cloudflare-Workers" && "Cloudflare-Workers".toLowerCase().match(/applewebkit\/(\d+)/);
    }
    __name(useColors, "useColors");
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c2 = "color: " + this.color;
      args.splice(1, 0, c2, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match2) => {
        if (match2 === "%%") {
          return;
        }
        index++;
        if (match2 === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c2);
    }
    __name(formatArgs, "formatArgs");
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    __name(save, "save");
    function load() {
      let r2;
      try {
        r2 = exports.storage.getItem("debug");
      } catch (error) {
      }
      if (!r2 && typeof process !== "undefined" && "env" in process) {
        r2 = process.env.DEBUG;
      }
      return r2;
    }
    __name(load, "load");
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    __name(localstorage, "localstorage");
    module.exports = require_common()(exports);
    var { formatters } = module.exports;
    formatters.j = function(v3) {
      try {
        return JSON.stringify(v3);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/ws/browser.js
var require_browser2 = __commonJS({
  "node_modules/ws/browser.js"(exports, module) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    module.exports = function() {
      throw new Error(
        "ws does not work in the browser. Browser clients must use the native WebSocket object"
      );
    };
  }
});

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/generated/version.js
var packageVersion;
var init_version = __esm({
  "node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/generated/version.js"() {
    init_checked_fetch();
    init_modules_watch_stub();
    packageVersion = "0.0.12";
  }
});

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/NodeWebSocketTransport.js
var NodeWebSocketTransport_exports = {};
__export(NodeWebSocketTransport_exports, {
  NodeWebSocketTransport: () => NodeWebSocketTransport
});
var import_ws, NodeWebSocketTransport;
var init_NodeWebSocketTransport = __esm({
  "node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/NodeWebSocketTransport.js"() {
    init_checked_fetch();
    init_modules_watch_stub();
    import_ws = __toESM(require_browser2(), 1);
    init_version();
    NodeWebSocketTransport = class {
      static create(url, headers) {
        return new Promise((resolve, reject) => {
          const ws = new import_ws.default(url, [], {
            followRedirects: true,
            perMessageDeflate: false,
            maxPayload: 256 * 1024 * 1024,
            headers: {
              "User-Agent": `Puppeteer ${packageVersion}`,
              ...headers
            }
          });
          ws.addEventListener("open", () => {
            return resolve(new NodeWebSocketTransport(ws));
          });
          ws.addEventListener("error", reject);
        });
      }
      #ws;
      onmessage;
      onclose;
      constructor(ws) {
        this.#ws = ws;
        this.#ws.addEventListener("message", (event) => {
          setImmediate(() => {
            if (this.onmessage) {
              this.onmessage.call(null, event.data);
            }
          });
        });
        this.#ws.addEventListener("close", () => {
          if (this.onclose) {
            this.onclose.call(null);
          }
        });
        this.#ws.addEventListener("error", () => {
        });
      }
      send(message) {
        this.#ws.send(message);
      }
      close() {
        this.#ws.close();
      }
    };
    __name(NodeWebSocketTransport, "NodeWebSocketTransport");
  }
});

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/BrowserWebSocketTransport.js
var BrowserWebSocketTransport_exports = {};
__export(BrowserWebSocketTransport_exports, {
  BrowserWebSocketTransport: () => BrowserWebSocketTransport
});
var BrowserWebSocketTransport;
var init_BrowserWebSocketTransport = __esm({
  "node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/BrowserWebSocketTransport.js"() {
    init_checked_fetch();
    init_modules_watch_stub();
    BrowserWebSocketTransport = class {
      static create(url) {
        return new Promise((resolve, reject) => {
          const ws = new WebSocket(url);
          ws.addEventListener("open", () => {
            return resolve(new BrowserWebSocketTransport(ws));
          });
          ws.addEventListener("error", reject);
        });
      }
      #ws;
      onmessage;
      onclose;
      constructor(ws) {
        this.#ws = ws;
        this.#ws.addEventListener("message", (event) => {
          if (this.onmessage) {
            this.onmessage.call(null, event.data);
          }
        });
        this.#ws.addEventListener("close", () => {
          if (this.onclose) {
            this.onclose.call(null);
          }
        });
        this.#ws.addEventListener("error", () => {
        });
      }
      send(message) {
        this.#ws.send(message);
      }
      close() {
        this.#ws.close();
      }
    };
    __name(BrowserWebSocketTransport, "BrowserWebSocketTransport");
  }
});

// .wrangler/tmp/bundle-iuZbtB/middleware-loader.entry.ts
init_checked_fetch();
init_modules_watch_stub();

// .wrangler/tmp/bundle-iuZbtB/middleware-insertion-facade.js
init_checked_fetch();
init_modules_watch_stub();

// src/index.ts
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/index.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/hono.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/hono-base.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/compose.js
init_checked_fetch();
init_modules_watch_stub();
var compose = /* @__PURE__ */ __name((middleware, onError, onNotFound) => {
  return (context, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i2) {
      if (i2 <= index) {
        throw new Error("next() called multiple times");
      }
      index = i2;
      let res;
      let isError = false;
      let handler;
      if (middleware[i2]) {
        handler = middleware[i2][0][0];
        context.req.routeIndex = i2;
      } else {
        handler = i2 === middleware.length && next || void 0;
      }
      if (handler) {
        try {
          res = await handler(context, () => dispatch(i2 + 1));
        } catch (err) {
          if (err instanceof Error && onError) {
            context.error = err;
            res = await onError(err, context);
            isError = true;
          } else {
            throw err;
          }
        }
      } else {
        if (context.finalized === false && onNotFound) {
          res = await onNotFound(context);
        }
      }
      if (res && (context.finalized === false || isError)) {
        context.res = res;
      }
      return context;
    }
    __name(dispatch, "dispatch");
  };
}, "compose");

// node_modules/hono/dist/context.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/request.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/http-exception.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/request/constants.js
init_checked_fetch();
init_modules_watch_stub();
var GET_MATCH_RESULT = Symbol();

// node_modules/hono/dist/utils/body.js
init_checked_fetch();
init_modules_watch_stub();
var parseBody = /* @__PURE__ */ __name(async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = request instanceof HonoRequest ? request.raw.headers : request.headers;
  const contentType = headers.get("Content-Type");
  if (contentType?.startsWith("multipart/form-data") || contentType?.startsWith("application/x-www-form-urlencoded")) {
    return parseFormData(request, { all, dot });
  }
  return {};
}, "parseBody");
async function parseFormData(request, options) {
  const formData = await request.formData();
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
__name(parseFormData, "parseFormData");
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value);
        delete form[key];
      }
    });
  }
  return form;
}
__name(convertFormDataToBodyData, "convertFormDataToBodyData");
var handleParsingAllValues = /* @__PURE__ */ __name((form, key, value) => {
  if (form[key] !== void 0) {
    if (Array.isArray(form[key])) {
      ;
      form[key].push(value);
    } else {
      form[key] = [form[key], value];
    }
  } else {
    if (!key.endsWith("[]")) {
      form[key] = value;
    } else {
      form[key] = [value];
    }
  }
}, "handleParsingAllValues");
var handleParsingNestedValues = /* @__PURE__ */ __name((form, key, value) => {
  let nestedForm = form;
  const keys = key.split(".");
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
}, "handleParsingNestedValues");

// node_modules/hono/dist/utils/url.js
init_checked_fetch();
init_modules_watch_stub();
var splitPath = /* @__PURE__ */ __name((path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
}, "splitPath");
var splitRoutingPath = /* @__PURE__ */ __name((routePath) => {
  const { groups, path } = extractGroupsFromPath(routePath);
  const paths = splitPath(path);
  return replaceGroupMarks(paths, groups);
}, "splitRoutingPath");
var extractGroupsFromPath = /* @__PURE__ */ __name((path) => {
  const groups = [];
  path = path.replace(/\{[^}]+\}/g, (match2, index) => {
    const mark = `@${index}`;
    groups.push([mark, match2]);
    return mark;
  });
  return { groups, path };
}, "extractGroupsFromPath");
var replaceGroupMarks = /* @__PURE__ */ __name((paths, groups) => {
  for (let i2 = groups.length - 1; i2 >= 0; i2--) {
    const [mark] = groups[i2];
    for (let j3 = paths.length - 1; j3 >= 0; j3--) {
      if (paths[j3].includes(mark)) {
        paths[j3] = paths[j3].replace(mark, groups[i2][1]);
        break;
      }
    }
  }
  return paths;
}, "replaceGroupMarks");
var patternCache = {};
var getPattern = /* @__PURE__ */ __name((label, next) => {
  if (label === "*") {
    return "*";
  }
  const match2 = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match2) {
    const cacheKey = `${label}#${next}`;
    if (!patternCache[cacheKey]) {
      if (match2[2]) {
        patternCache[cacheKey] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey, match2[1], new RegExp(`^${match2[2]}(?=/${next})`)] : [label, match2[1], new RegExp(`^${match2[2]}$`)];
      } else {
        patternCache[cacheKey] = [label, match2[1], true];
      }
    }
    return patternCache[cacheKey];
  }
  return null;
}, "getPattern");
var tryDecode = /* @__PURE__ */ __name((str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match2) => {
      try {
        return decoder(match2);
      } catch {
        return match2;
      }
    });
  }
}, "tryDecode");
var tryDecodeURI = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURI), "tryDecodeURI");
var getPath = /* @__PURE__ */ __name((request) => {
  const url = request.url;
  const start = url.indexOf("/", url.indexOf(":") + 4);
  let i2 = start;
  for (; i2 < url.length; i2++) {
    const charCode = url.charCodeAt(i2);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i2);
      const path = url.slice(start, queryIndex === -1 ? void 0 : queryIndex);
      return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
    } else if (charCode === 63) {
      break;
    }
  }
  return url.slice(start, i2);
}, "getPath");
var getPathNoStrict = /* @__PURE__ */ __name((request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
}, "getPathNoStrict");
var mergePath = /* @__PURE__ */ __name((base, sub, ...rest) => {
  if (rest.length) {
    sub = mergePath(sub, ...rest);
  }
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
}, "mergePath");
var checkOptionalParameter = /* @__PURE__ */ __name((path) => {
  if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) {
    return null;
  }
  const segments = path.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (/\?/.test(segment)) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.replace("?", "");
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v3, i2, a2) => a2.indexOf(v3) === i2);
}, "checkOptionalParameter");
var _decodeURI = /* @__PURE__ */ __name((value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return value.indexOf("%") !== -1 ? tryDecode(value, decodeURIComponent_) : value;
}, "_decodeURI");
var _getQueryParam = /* @__PURE__ */ __name((url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf(`?${key}`, 8);
    if (keyIndex2 === -1) {
      keyIndex2 = url.indexOf(`&${key}`, 8);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = {};
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) {
        results[name] = [];
      }
      ;
      results[name].push(value);
    } else {
      results[name] ??= value;
    }
  }
  return key ? results[key] : results;
}, "_getQueryParam");
var getQueryParam = _getQueryParam;
var getQueryParams = /* @__PURE__ */ __name((url, key) => {
  return _getQueryParam(url, key, true);
}, "getQueryParams");
var decodeURIComponent_ = decodeURIComponent;

// node_modules/hono/dist/request.js
var tryDecodeURIComponent = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURIComponent_), "tryDecodeURIComponent");
var HonoRequest = /* @__PURE__ */ __name(class {
  raw;
  #validatedData;
  #matchResult;
  routeIndex = 0;
  path;
  bodyCache = {};
  constructor(request, path = "/", matchResult = [[]]) {
    this.raw = request;
    this.path = path;
    this.#matchResult = matchResult;
    this.#validatedData = {};
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex][1][key];
    const param = this.#getParamValue(paramKey);
    return param && /\%/.test(param) ? tryDecodeURIComponent(param) : param;
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value !== void 0) {
        decoded[key] = /\%/.test(value) ? tryDecodeURIComponent(value) : value;
      }
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name) {
      return this.raw.headers.get(name) ?? void 0;
    }
    const headerData = {};
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return this.bodyCache.parsedBody ??= await parseBody(this, options);
  }
  #cachedBody = (key) => {
    const { bodyCache, raw: raw2 } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    const anyCachedKey = Object.keys(bodyCache)[0];
    if (anyCachedKey) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        return new Response(body)[key]();
      });
    }
    return bodyCache[key] = raw2[key]();
  };
  json() {
    return this.#cachedBody("text").then((text) => JSON.parse(text));
  }
  text() {
    return this.#cachedBody("text");
  }
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  blob() {
    return this.#cachedBody("blob");
  }
  formData() {
    return this.#cachedBody("formData");
  }
  addValidatedData(target, data) {
    this.#validatedData[target] = data;
  }
  valid(target) {
    return this.#validatedData[target];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [GET_MATCH_RESULT]() {
    return this.#matchResult;
  }
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
}, "HonoRequest");

// node_modules/hono/dist/utils/html.js
init_checked_fetch();
init_modules_watch_stub();
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw = /* @__PURE__ */ __name((value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
}, "raw");
var resolveCallback = /* @__PURE__ */ __name(async (str, phase, preserveCallbacks, context, buffer) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c2) => c2({ phase, buffer, context }))).then(
    (res) => Promise.all(
      res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))
    ).then(() => buffer[0])
  );
  if (preserveCallbacks) {
    return raw(await resStr, callbacks);
  } else {
    return resStr;
  }
}, "resolveCallback");

// node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setDefaultContentType = /* @__PURE__ */ __name((contentType, headers) => {
  return {
    "Content-Type": contentType,
    ...headers
  };
}, "setDefaultContentType");
var Context = /* @__PURE__ */ __name(class {
  #rawRequest;
  #req;
  env = {};
  #var;
  finalized = false;
  error;
  #status;
  #executionCtx;
  #res;
  #layout;
  #renderer;
  #notFoundHandler;
  #preparedHeaders;
  #matchResult;
  #path;
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  get res() {
    return this.#res ||= new Response(null, {
      headers: this.#preparedHeaders ??= new Headers()
    });
  }
  set res(_res) {
    if (this.#res && _res) {
      _res = new Response(_res.body, _res);
      for (const [k3, v3] of this.#res.headers.entries()) {
        if (k3 === "content-type") {
          continue;
        }
        if (k3 === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k3, v3);
        }
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  render = (...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  };
  setLayout = (layout) => this.#layout = layout;
  getLayout = () => this.#layout;
  setRenderer = (renderer) => {
    this.#renderer = renderer;
  };
  header = (name, value, options) => {
    if (this.finalized) {
      this.#res = new Response(this.#res.body, this.#res);
    }
    const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers();
    if (value === void 0) {
      headers.delete(name);
    } else if (options?.append) {
      headers.append(name, value);
    } else {
      headers.set(name, value);
    }
  };
  status = (status) => {
    this.#status = status;
  };
  set = (key, value) => {
    this.#var ??= /* @__PURE__ */ new Map();
    this.#var.set(key, value);
  };
  get = (key) => {
    return this.#var ? this.#var.get(key) : void 0;
  };
  get var() {
    if (!this.#var) {
      return {};
    }
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    const responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders ?? new Headers();
    if (typeof arg === "object" && "headers" in arg) {
      const argHeaders = arg.headers instanceof Headers ? arg.headers : new Headers(arg.headers);
      for (const [key, value] of argHeaders) {
        if (key.toLowerCase() === "set-cookie") {
          responseHeaders.append(key, value);
        } else {
          responseHeaders.set(key, value);
        }
      }
    }
    if (headers) {
      for (const [k3, v3] of Object.entries(headers)) {
        if (typeof v3 === "string") {
          responseHeaders.set(k3, v3);
        } else {
          responseHeaders.delete(k3);
          for (const v22 of v3) {
            responseHeaders.append(k3, v22);
          }
        }
      }
    }
    const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
    return new Response(data, { status, headers: responseHeaders });
  }
  newResponse = (...args) => this.#newResponse(...args);
  body = (data, arg, headers) => this.#newResponse(data, arg, headers);
  text = (text, arg, headers) => {
    return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(
      text,
      arg,
      setDefaultContentType(TEXT_PLAIN, headers)
    );
  };
  json = (object, arg, headers) => {
    return this.#newResponse(
      JSON.stringify(object),
      arg,
      setDefaultContentType("application/json", headers)
    );
  };
  html = (html, arg, headers) => {
    const res = /* @__PURE__ */ __name((html2) => this.#newResponse(html2, arg, setDefaultContentType("text/html; charset=UTF-8", headers)), "res");
    return typeof html === "object" ? resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html);
  };
  redirect = (location, status) => {
    const locationString = String(location);
    this.header(
      "Location",
      !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString)
    );
    return this.newResponse(null, status ?? 302);
  };
  notFound = () => {
    this.#notFoundHandler ??= () => new Response();
    return this.#notFoundHandler(this);
  };
}, "Context");

// node_modules/hono/dist/router.js
init_checked_fetch();
init_modules_watch_stub();
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = /* @__PURE__ */ __name(class extends Error {
}, "UnsupportedPathError");

// node_modules/hono/dist/utils/constants.js
init_checked_fetch();
init_modules_watch_stub();
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// node_modules/hono/dist/hono-base.js
var notFoundHandler = /* @__PURE__ */ __name((c2) => {
  return c2.text("404 Not Found", 404);
}, "notFoundHandler");
var errorHandler = /* @__PURE__ */ __name((err, c2) => {
  if ("getResponse" in err) {
    const res = err.getResponse();
    return c2.newResponse(res.body, res);
  }
  console.error(err);
  return c2.text("Internal Server Error", 500);
}, "errorHandler");
var Hono = /* @__PURE__ */ __name(class {
  get;
  post;
  put;
  delete;
  options;
  patch;
  all;
  on;
  use;
  router;
  getPath;
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.#addRoute(method, this.#path, args1);
        }
        args.forEach((handler) => {
          this.#addRoute(method, this.#path, handler);
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      for (const p2 of [path].flat()) {
        this.#path = p2;
        for (const m3 of [method].flat()) {
          handlers.map((handler) => {
            this.#addRoute(m3.toUpperCase(), this.#path, handler);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone = new Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.errorHandler = this.errorHandler;
    clone.#notFoundHandler = this.#notFoundHandler;
    clone.routes = this.routes;
    return clone;
  }
  #notFoundHandler = notFoundHandler;
  errorHandler = errorHandler;
  route(path, app2) {
    const subApp = this.basePath(path);
    app2.routes.map((r2) => {
      let handler;
      if (app2.errorHandler === errorHandler) {
        handler = r2.handler;
      } else {
        handler = /* @__PURE__ */ __name(async (c2, next) => (await compose([], app2.errorHandler)(c2, () => r2.handler(c2, next))).res, "handler");
        handler[COMPOSED_HANDLER] = r2.handler;
      }
      subApp.#addRoute(r2.method, r2.path, handler);
    });
    return this;
  }
  basePath(path) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  onError = (handler) => {
    this.errorHandler = handler;
    return this;
  };
  notFound = (handler) => {
    this.#notFoundHandler = handler;
    return this;
  };
  mount(path, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        if (options.replaceRequest === false) {
          replaceRequest = /* @__PURE__ */ __name((request) => request, "replaceRequest");
        } else {
          replaceRequest = options.replaceRequest;
        }
      }
    }
    const getOptions = optionHandler ? (c2) => {
      const options2 = optionHandler(c2);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c2) => {
      let executionContext = void 0;
      try {
        executionContext = c2.executionCtx;
      } catch {
      }
      return [c2.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request) => {
        const url = new URL(request.url);
        url.pathname = url.pathname.slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler = /* @__PURE__ */ __name(async (c2, next) => {
      const res = await applicationHandler(replaceRequest(c2.req.raw), ...getOptions(c2));
      if (res) {
        return res;
      }
      await next();
    }, "handler");
    this.#addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
    return this;
  }
  #addRoute(method, path, handler) {
    method = method.toUpperCase();
    path = mergePath(this._basePath, path);
    const r2 = { basePath: this._basePath, path, method, handler };
    this.router.add(method, path, [handler, r2]);
    this.routes.push(r2);
  }
  #handleError(err, c2) {
    if (err instanceof Error) {
      return this.errorHandler(err, c2);
    }
    throw err;
  }
  #dispatch(request, executionCtx, env, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request, executionCtx, env, "GET")))();
    }
    const path = this.getPath(request, { env });
    const matchResult = this.router.match(method, path);
    const c2 = new Context(request, {
      path,
      matchResult,
      env,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c2, async () => {
          c2.res = await this.#notFoundHandler(c2);
        });
      } catch (err) {
        return this.#handleError(err, c2);
      }
      return res instanceof Promise ? res.then(
        (resolved) => resolved || (c2.finalized ? c2.res : this.#notFoundHandler(c2))
      ).catch((err) => this.#handleError(err, c2)) : res ?? this.#notFoundHandler(c2);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context = await composed(c2);
        if (!context.finalized) {
          throw new Error(
            "Context is not finalized. Did you forget to return a Response object or `await next()`?"
          );
        }
        return context.res;
      } catch (err) {
        return this.#handleError(err, c2);
      }
    })();
  }
  fetch = (request, ...rest) => {
    return this.#dispatch(request, rest[1], rest[0], request.method);
  };
  request = (input, requestInit, Env, executionCtx) => {
    if (input instanceof Request) {
      return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
    }
    input = input.toString();
    return this.fetch(
      new Request(
        /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`,
        requestInit
      ),
      Env,
      executionCtx
    );
  };
  fire = () => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
    });
  };
}, "Hono");

// node_modules/hono/dist/router/reg-exp-router/index.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/router/reg-exp-router/router.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/router/reg-exp-router/matcher.js
init_checked_fetch();
init_modules_watch_stub();
var emptyParam = [];
function match(method, path) {
  const matchers = this.buildAllMatchers();
  const match2 = /* @__PURE__ */ __name((method2, path2) => {
    const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
    const staticMatch = matcher[2][path2];
    if (staticMatch) {
      return staticMatch;
    }
    const match3 = path2.match(matcher[0]);
    if (!match3) {
      return [[], emptyParam];
    }
    const index = match3.indexOf("", 1);
    return [matcher[1][index], match3];
  }, "match2");
  this.match = match2;
  return match2(method, path);
}
__name(match, "match");

// node_modules/hono/dist/router/reg-exp-router/node.js
init_checked_fetch();
init_modules_watch_stub();
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a2, b3) {
  if (a2.length === 1) {
    return b3.length === 1 ? a2 < b3 ? -1 : 1 : -1;
  }
  if (b3.length === 1) {
    return 1;
  }
  if (a2 === ONLY_WILDCARD_REG_EXP_STR || a2 === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b3 === ONLY_WILDCARD_REG_EXP_STR || b3 === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a2 === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b3 === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a2.length === b3.length ? a2 < b3 ? -1 : 1 : b3.length - a2.length;
}
__name(compareKey, "compareKey");
var Node2 = /* @__PURE__ */ __name(class {
  #index;
  #varIndex;
  #children = /* @__PURE__ */ Object.create(null);
  insert(tokens, index, paramMap, context, pathErrorCheckOnly) {
    if (tokens.length === 0) {
      if (this.#index !== void 0) {
        throw PATH_ERROR;
      }
      if (pathErrorCheckOnly) {
        return;
      }
      this.#index = index;
      return;
    }
    const [token, ...restTokens] = tokens;
    const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let node;
    if (pattern) {
      const name = pattern[1];
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      if (name && pattern[2]) {
        if (regexpStr === ".*") {
          throw PATH_ERROR;
        }
        regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
        if (/\((?!\?:)/.test(regexpStr)) {
          throw PATH_ERROR;
        }
      }
      node = this.#children[regexpStr];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k3) => k3 !== ONLY_WILDCARD_REG_EXP_STR && k3 !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[regexpStr] = new Node2();
        if (name !== "") {
          node.#varIndex = context.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name !== "") {
        paramMap.push([name, node.#varIndex]);
      }
    } else {
      node = this.#children[token];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k3) => k3.length > 1 && k3 !== ONLY_WILDCARD_REG_EXP_STR && k3 !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[token] = new Node2();
      }
    }
    node.insert(restTokens, index, paramMap, context, pathErrorCheckOnly);
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.#children).sort(compareKey);
    const strList = childKeys.map((k3) => {
      const c2 = this.#children[k3];
      return (typeof c2.#varIndex === "number" ? `(${k3})@${c2.#varIndex}` : regExpMetaChars.has(k3) ? `\\${k3}` : k3) + c2.buildRegExpStr();
    });
    if (typeof this.#index === "number") {
      strList.unshift(`#${this.#index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
}, "Node");

// node_modules/hono/dist/router/reg-exp-router/trie.js
init_checked_fetch();
init_modules_watch_stub();
var Trie = /* @__PURE__ */ __name(class {
  #context = { varIndex: 0 };
  #root = new Node2();
  insert(path, index, pathErrorCheckOnly) {
    const paramAssoc = [];
    const groups = [];
    for (let i2 = 0; ; ) {
      let replaced = false;
      path = path.replace(/\{[^}]+\}/g, (m3) => {
        const mark = `@\\${i2}`;
        groups[i2] = [mark, m3];
        i2++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i2 = groups.length - 1; i2 >= 0; i2--) {
      const [mark] = groups[i2];
      for (let j3 = tokens.length - 1; j3 >= 0; j3--) {
        if (tokens[j3].indexOf(mark) !== -1) {
          tokens[j3] = tokens[j3].replace(mark, groups[i2][1]);
          break;
        }
      }
    }
    this.#root.insert(tokens, index, paramAssoc, this.#context, pathErrorCheckOnly);
    return paramAssoc;
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_3, handlerIndex, paramIndex) => {
      if (handlerIndex !== void 0) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== void 0) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
}, "Trie");

// node_modules/hono/dist/router/reg-exp-router/router.js
var nullMatcher = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ??= new RegExp(
    path === "*" ? "" : `^${path.replace(
      /\/\*$|([.\\+*[^\]$()])/g,
      (_3, metaChar) => metaChar ? `\\${metaChar}` : "(?:|/.*)"
    )}$`
  );
}
__name(buildWildcardRegExp, "buildWildcardRegExp");
function clearWildcardRegExpCache() {
  wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
__name(clearWildcardRegExpCache, "clearWildcardRegExpCache");
function buildMatcherFromPreprocessedRoutes(routes) {
  const trie = new Trie();
  const handlerData = [];
  if (routes.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes.map(
    (route) => [!/\*|\/:/.test(route[0]), ...route]
  ).sort(
    ([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length
  );
  const staticMap = /* @__PURE__ */ Object.create(null);
  for (let i2 = 0, j3 = -1, len = routesWithStaticPathFlag.length; i2 < len; i2++) {
    const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i2];
    if (pathErrorCheckOnly) {
      staticMap[path] = [handlers.map(([h3]) => [h3, /* @__PURE__ */ Object.create(null)]), emptyParam];
    } else {
      j3++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path, j3, pathErrorCheckOnly);
    } catch (e2) {
      throw e2 === PATH_ERROR ? new UnsupportedPathError(path) : e2;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j3] = handlers.map(([h3, paramCount]) => {
      const paramIndexMap = /* @__PURE__ */ Object.create(null);
      paramCount -= 1;
      for (; paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h3, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i2 = 0, len = handlerData.length; i2 < len; i2++) {
    for (let j3 = 0, len2 = handlerData[i2].length; j3 < len2; j3++) {
      const map = handlerData[i2][j3]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k3 = 0, len3 = keys.length; k3 < len3; k3++) {
        map[keys[k3]] = paramReplacementMap[map[keys[k3]]];
      }
    }
  }
  const handlerMap = [];
  for (const i2 in indexReplacementMap) {
    handlerMap[i2] = handlerData[indexReplacementMap[i2]];
  }
  return [regexp, handlerMap, staticMap];
}
__name(buildMatcherFromPreprocessedRoutes, "buildMatcherFromPreprocessedRoutes");
function findMiddleware(middleware, path) {
  if (!middleware) {
    return void 0;
  }
  for (const k3 of Object.keys(middleware).sort((a2, b3) => b3.length - a2.length)) {
    if (buildWildcardRegExp(k3).test(path)) {
      return [...middleware[k3]];
    }
  }
  return void 0;
}
__name(findMiddleware, "findMiddleware");
var RegExpRouter = /* @__PURE__ */ __name(class {
  name = "RegExpRouter";
  #middleware;
  #routes;
  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
    this.#routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
  }
  add(method, path, handler) {
    const middleware = this.#middleware;
    const routes = this.#routes;
    if (!middleware || !routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      ;
      [middleware, routes].forEach((handlerMap) => {
        handlerMap[method] = /* @__PURE__ */ Object.create(null);
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p2) => {
          handlerMap[method][p2] = [...handlerMap[METHOD_NAME_ALL][p2]];
        });
      });
    }
    if (path === "/*") {
      path = "*";
    }
    const paramCount = (path.match(/\/:/g) || []).length;
    if (/\*$/.test(path)) {
      const re2 = buildWildcardRegExp(path);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m3) => {
          middleware[m3][path] ||= findMiddleware(middleware[m3], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
        });
      } else {
        middleware[method][path] ||= findMiddleware(middleware[method], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
      }
      Object.keys(middleware).forEach((m3) => {
        if (method === METHOD_NAME_ALL || method === m3) {
          Object.keys(middleware[m3]).forEach((p2) => {
            re2.test(p2) && middleware[m3][p2].push([handler, paramCount]);
          });
        }
      });
      Object.keys(routes).forEach((m3) => {
        if (method === METHOD_NAME_ALL || method === m3) {
          Object.keys(routes[m3]).forEach(
            (p2) => re2.test(p2) && routes[m3][p2].push([handler, paramCount])
          );
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (let i2 = 0, len = paths.length; i2 < len; i2++) {
      const path2 = paths[i2];
      Object.keys(routes).forEach((m3) => {
        if (method === METHOD_NAME_ALL || method === m3) {
          routes[m3][path2] ||= [
            ...findMiddleware(middleware[m3], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || []
          ];
          routes[m3][path2].push([handler, paramCount - len + i2 + 1]);
        }
      });
    }
  }
  match = match;
  buildAllMatchers() {
    const matchers = /* @__PURE__ */ Object.create(null);
    Object.keys(this.#routes).concat(Object.keys(this.#middleware)).forEach((method) => {
      matchers[method] ||= this.#buildMatcher(method);
    });
    this.#middleware = this.#routes = void 0;
    clearWildcardRegExpCache();
    return matchers;
  }
  #buildMatcher(method) {
    const routes = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.#middleware, this.#routes].forEach((r2) => {
      const ownRoute = r2[method] ? Object.keys(r2[method]).map((path) => [path, r2[method][path]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute ||= true;
        routes.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes.push(
          ...Object.keys(r2[METHOD_NAME_ALL]).map((path) => [path, r2[METHOD_NAME_ALL][path]])
        );
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes);
    }
  }
}, "RegExpRouter");

// node_modules/hono/dist/router/reg-exp-router/prepared-router.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/router/smart-router/index.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/router/smart-router/router.js
init_checked_fetch();
init_modules_watch_stub();
var SmartRouter = /* @__PURE__ */ __name(class {
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init) {
    this.#routers = init.routers;
  }
  add(method, path, handler) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path, handler]);
  }
  match(method, path) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i2 = 0;
    let res;
    for (; i2 < len; i2++) {
      const router = routers[i2];
      try {
        for (let i22 = 0, len2 = routes.length; i22 < len2; i22++) {
          router.add(...routes[i22]);
        }
        res = router.match(method, path);
      } catch (e2) {
        if (e2 instanceof UnsupportedPathError) {
          continue;
        }
        throw e2;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = void 0;
      break;
    }
    if (i2 === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.#routers[0];
  }
}, "SmartRouter");

// node_modules/hono/dist/router/trie-router/index.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/router/trie-router/router.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/hono/dist/router/trie-router/node.js
init_checked_fetch();
init_modules_watch_stub();
var emptyParams = /* @__PURE__ */ Object.create(null);
var Node3 = /* @__PURE__ */ __name(class {
  #methods;
  #children;
  #patterns;
  #order = 0;
  #params = emptyParams;
  constructor(method, handler, children) {
    this.#children = children || /* @__PURE__ */ Object.create(null);
    this.#methods = [];
    if (method && handler) {
      const m3 = /* @__PURE__ */ Object.create(null);
      m3[method] = { handler, possibleKeys: [], score: 0 };
      this.#methods = [m3];
    }
    this.#patterns = [];
  }
  insert(method, path, handler) {
    this.#order = ++this.#order;
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = [];
    for (let i2 = 0, len = parts.length; i2 < len; i2++) {
      const p2 = parts[i2];
      const nextP = parts[i2 + 1];
      const pattern = getPattern(p2, nextP);
      const key = Array.isArray(pattern) ? pattern[0] : p2;
      if (key in curNode.#children) {
        curNode = curNode.#children[key];
        if (pattern) {
          possibleKeys.push(pattern[1]);
        }
        continue;
      }
      curNode.#children[key] = new Node3();
      if (pattern) {
        curNode.#patterns.push(pattern);
        possibleKeys.push(pattern[1]);
      }
      curNode = curNode.#children[key];
    }
    curNode.#methods.push({
      [method]: {
        handler,
        possibleKeys: possibleKeys.filter((v3, i2, a2) => a2.indexOf(v3) === i2),
        score: this.#order
      }
    });
    return curNode;
  }
  #getHandlerSets(node, method, nodeParams, params) {
    const handlerSets = [];
    for (let i2 = 0, len = node.#methods.length; i2 < len; i2++) {
      const m3 = node.#methods[i2];
      const handlerSet = m3[method] || m3[METHOD_NAME_ALL];
      const processedSet = {};
      if (handlerSet !== void 0) {
        handlerSet.params = /* @__PURE__ */ Object.create(null);
        handlerSets.push(handlerSet);
        if (nodeParams !== emptyParams || params && params !== emptyParams) {
          for (let i22 = 0, len2 = handlerSet.possibleKeys.length; i22 < len2; i22++) {
            const key = handlerSet.possibleKeys[i22];
            const processed = processedSet[handlerSet.score];
            handlerSet.params[key] = params?.[key] && !processed ? params[key] : nodeParams[key] ?? params?.[key];
            processedSet[handlerSet.score] = true;
          }
        }
      }
    }
    return handlerSets;
  }
  search(method, path) {
    const handlerSets = [];
    this.#params = emptyParams;
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path);
    const curNodesQueue = [];
    for (let i2 = 0, len = parts.length; i2 < len; i2++) {
      const part = parts[i2];
      const isLast = i2 === len - 1;
      const tempNodes = [];
      for (let j3 = 0, len2 = curNodes.length; j3 < len2; j3++) {
        const node = curNodes[j3];
        const nextNode = node.#children[part];
        if (nextNode) {
          nextNode.#params = node.#params;
          if (isLast) {
            if (nextNode.#children["*"]) {
              handlerSets.push(
                ...this.#getHandlerSets(nextNode.#children["*"], method, node.#params)
              );
            }
            handlerSets.push(...this.#getHandlerSets(nextNode, method, node.#params));
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (let k3 = 0, len3 = node.#patterns.length; k3 < len3; k3++) {
          const pattern = node.#patterns[k3];
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (pattern === "*") {
            const astNode = node.#children["*"];
            if (astNode) {
              handlerSets.push(...this.#getHandlerSets(astNode, method, node.#params));
              astNode.#params = params;
              tempNodes.push(astNode);
            }
            continue;
          }
          const [key, name, matcher] = pattern;
          if (!part && !(matcher instanceof RegExp)) {
            continue;
          }
          const child = node.#children[key];
          const restPathString = parts.slice(i2).join("/");
          if (matcher instanceof RegExp) {
            const m3 = matcher.exec(restPathString);
            if (m3) {
              params[name] = m3[0];
              handlerSets.push(...this.#getHandlerSets(child, method, node.#params, params));
              if (Object.keys(child.#children).length) {
                child.#params = params;
                const componentCount = m3[0].match(/\//)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name] = part;
            if (isLast) {
              handlerSets.push(...this.#getHandlerSets(child, method, params, node.#params));
              if (child.#children["*"]) {
                handlerSets.push(
                  ...this.#getHandlerSets(child.#children["*"], method, params, node.#params)
                );
              }
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      curNodes = tempNodes.concat(curNodesQueue.shift() ?? []);
    }
    if (handlerSets.length > 1) {
      handlerSets.sort((a2, b3) => {
        return a2.score - b3.score;
      });
    }
    return [handlerSets.map(({ handler, params }) => [handler, params])];
  }
}, "Node");

// node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = /* @__PURE__ */ __name(class {
  name = "TrieRouter";
  #node;
  constructor() {
    this.#node = new Node3();
  }
  add(method, path, handler) {
    const results = checkOptionalParameter(path);
    if (results) {
      for (let i2 = 0, len = results.length; i2 < len; i2++) {
        this.#node.insert(method, results[i2], handler);
      }
      return;
    }
    this.#node.insert(method, path, handler);
  }
  match(method, path) {
    return this.#node.search(method, path);
  }
}, "TrieRouter");

// node_modules/hono/dist/hono.js
var Hono2 = /* @__PURE__ */ __name(class extends Hono {
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter(), new TrieRouter()]
    });
  }
}, "Hono");

// node_modules/hono/dist/middleware/cors/index.js
init_checked_fetch();
init_modules_watch_stub();
var cors = /* @__PURE__ */ __name((options) => {
  const defaults = {
    origin: "*",
    allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
    allowHeaders: [],
    exposeHeaders: []
  };
  const opts = {
    ...defaults,
    ...options
  };
  const findAllowOrigin = ((optsOrigin) => {
    if (typeof optsOrigin === "string") {
      if (optsOrigin === "*") {
        return () => optsOrigin;
      } else {
        return (origin) => optsOrigin === origin ? origin : null;
      }
    } else if (typeof optsOrigin === "function") {
      return optsOrigin;
    } else {
      return (origin) => optsOrigin.includes(origin) ? origin : null;
    }
  })(opts.origin);
  const findAllowMethods = ((optsAllowMethods) => {
    if (typeof optsAllowMethods === "function") {
      return optsAllowMethods;
    } else if (Array.isArray(optsAllowMethods)) {
      return () => optsAllowMethods;
    } else {
      return () => [];
    }
  })(opts.allowMethods);
  return /* @__PURE__ */ __name(async function cors2(c2, next) {
    function set(key, value) {
      c2.res.headers.set(key, value);
    }
    __name(set, "set");
    const allowOrigin = await findAllowOrigin(c2.req.header("origin") || "", c2);
    if (allowOrigin) {
      set("Access-Control-Allow-Origin", allowOrigin);
    }
    if (opts.credentials) {
      set("Access-Control-Allow-Credentials", "true");
    }
    if (opts.exposeHeaders?.length) {
      set("Access-Control-Expose-Headers", opts.exposeHeaders.join(","));
    }
    if (c2.req.method === "OPTIONS") {
      if (opts.origin !== "*") {
        set("Vary", "Origin");
      }
      if (opts.maxAge != null) {
        set("Access-Control-Max-Age", opts.maxAge.toString());
      }
      const allowMethods = await findAllowMethods(c2.req.header("origin") || "", c2);
      if (allowMethods.length) {
        set("Access-Control-Allow-Methods", allowMethods.join(","));
      }
      let headers = opts.allowHeaders;
      if (!headers?.length) {
        const requestHeaders = c2.req.header("Access-Control-Request-Headers");
        if (requestHeaders) {
          headers = requestHeaders.split(/\s*,\s*/);
        }
      }
      if (headers?.length) {
        set("Access-Control-Allow-Headers", headers.join(","));
        c2.res.headers.append("Vary", "Access-Control-Request-Headers");
      }
      c2.res.headers.delete("Content-Length");
      c2.res.headers.delete("Content-Type");
      return new Response(null, {
        headers: c2.res.headers,
        status: 204,
        statusText: "No Content"
      });
    }
    await next();
    if (opts.origin !== "*") {
      c2.header("Vary", "Origin", { append: true });
    }
  }, "cors2");
}, "cors");

// src/mcp/server.ts
init_checked_fetch();
init_modules_watch_stub();

// src/mcp/tools.ts
init_checked_fetch();
init_modules_watch_stub();
var tools = [
  // Phase 2: Browser Rendering PDFs (3 tools)
  {
    name: "html_to_pdf",
    description: "Convert HTML/CSS to PDF document using Cloudflare Browser Rendering. Returns publicly accessible URL to generated PDF. Supports custom page formats, margins, and landscape orientation.",
    inputSchema: {
      type: "object",
      properties: {
        html: {
          type: "string",
          description: "HTML content to convert (must be valid HTML). Can include inline CSS styles or <style> tags."
        },
        format: {
          type: "string",
          enum: ["A4", "Letter", "Legal"],
          description: "Paper size format. Default: A4 (210mm \xD7 297mm). Letter: 8.5in \xD7 11in. Legal: 8.5in \xD7 14in."
        },
        landscape: {
          type: "boolean",
          description: "Enable landscape orientation (width > height). Default: false (portrait)."
        },
        margin: {
          type: "object",
          properties: {
            top: { type: "string", description: 'Top margin (e.g., "1cm", "20px", "0.5in")' },
            right: { type: "string", description: "Right margin" },
            bottom: { type: "string", description: "Bottom margin" },
            left: { type: "string", description: "Left margin" }
          },
          description: "Page margins. Default: 1cm all sides. Supports units: cm, mm, in, px."
        }
      },
      required: ["html"]
    }
  },
  {
    name: "url_to_pdf",
    description: "Convert any publicly accessible webpage to PDF by URL using Cloudflare Browser Rendering. Captures the full rendered page including CSS, JavaScript, and images. Returns publicly accessible URL to generated PDF.",
    inputSchema: {
      type: "object",
      properties: {
        url: {
          type: "string",
          description: "URL of webpage to convert (must be publicly accessible via HTTP/HTTPS). Example: https://example.com"
        },
        format: {
          type: "string",
          enum: ["A4", "Letter", "Legal"],
          description: "Paper size format. Default: A4."
        },
        landscape: {
          type: "boolean",
          description: "Enable landscape orientation. Default: false."
        },
        margin: {
          type: "object",
          properties: {
            top: { type: "string", description: 'Top margin (e.g., "1cm")' },
            right: { type: "string", description: "Right margin" },
            bottom: { type: "string", description: "Bottom margin" },
            left: { type: "string", description: "Left margin" }
          },
          description: "Page margins. Default: 1cm all sides."
        }
      },
      required: ["url"]
    }
  },
  {
    name: "markdown_to_pdf",
    description: "Convert markdown to beautifully styled PDF document using Cloudflare Browser Rendering. Automatically applies professional typography, syntax highlighting for code blocks, and table styling. Returns publicly accessible URL to generated PDF.",
    inputSchema: {
      type: "object",
      properties: {
        markdown: {
          type: "string",
          description: "Markdown content to convert. Supports full CommonMark syntax: headings, lists, code blocks, tables, blockquotes, links, images."
        },
        format: {
          type: "string",
          enum: ["A4", "Letter", "Legal"],
          description: "Paper size format. Default: A4."
        },
        landscape: {
          type: "boolean",
          description: "Enable landscape orientation. Default: false."
        },
        margin: {
          type: "object",
          properties: {
            top: { type: "string", description: "Top margin" },
            right: { type: "string", description: "Right margin" },
            bottom: { type: "string", description: "Bottom margin" },
            left: { type: "string", description: "Left margin" }
          },
          description: "Page margins. Default: 1cm all sides."
        },
        css: {
          type: "string",
          description: "Optional custom CSS to append to default styles. Can override fonts, colors, spacing, etc."
        }
      },
      required: ["markdown"]
    }
  },
  // Phase 3: Browser Rendering Screenshots (2 tools)
  {
    name: "html_to_screenshot",
    description: "Convert HTML/CSS to screenshot image (PNG, JPEG, or WebP) using Cloudflare Browser Rendering. Captures full page or custom viewport. Returns publicly accessible URL to generated image. Ideal for visual previews, thumbnails, or capturing dynamically generated content.",
    inputSchema: {
      type: "object",
      properties: {
        html: {
          type: "string",
          description: "HTML content to capture (must be valid HTML). Can include inline CSS styles or <style> tags."
        },
        format: {
          type: "string",
          enum: ["png", "jpeg", "webp"],
          description: "Image format. Default: png. PNG supports transparency, JPEG is smaller, WebP is most efficient."
        },
        fullPage: {
          type: "boolean",
          description: "Capture full page height (true) or single viewport (false). Default: true."
        },
        viewport: {
          type: "object",
          properties: {
            width: { type: "number", description: "Viewport width in pixels. Default: 1280" },
            height: { type: "number", description: "Viewport height in pixels. Default: 720" }
          },
          description: "Custom viewport size for screenshot. Uses 2x device scale for sharp images."
        }
      },
      required: ["html"]
    }
  },
  {
    name: "url_to_screenshot",
    description: "Capture screenshot of any publicly accessible webpage by URL using Cloudflare Browser Rendering. Waits for page load and network idle. Supports full page capture or custom viewport. Returns publicly accessible URL to generated image.",
    inputSchema: {
      type: "object",
      properties: {
        url: {
          type: "string",
          description: "URL of webpage to capture (must be publicly accessible via HTTP/HTTPS). Example: https://example.com"
        },
        format: {
          type: "string",
          enum: ["png", "jpeg", "webp"],
          description: "Image format. Default: png."
        },
        fullPage: {
          type: "boolean",
          description: "Capture full page height (true) or single viewport (false). Default: true."
        },
        viewport: {
          type: "object",
          properties: {
            width: { type: "number", description: "Viewport width in pixels. Default: 1280" },
            height: { type: "number", description: "Viewport height in pixels. Default: 720" }
          },
          description: "Custom viewport size for screenshot."
        }
      },
      required: ["url"]
    }
  },
  // Phase 4: Workers AI Markdown (1 tool)
  {
    name: "document_to_markdown",
    description: "Convert documents (PDF, DOCX, XLSX, images) to RAG-ready markdown using Workers AI. Supports all major document formats and uses AI vision models for images (object detection + summarization). Returns structured markdown text ideal for RAG applications, embeddings, and text analysis.",
    inputSchema: {
      type: "object",
      properties: {
        fileUrl: {
          type: "string",
          description: "Publicly accessible URL to document file. Supported formats: .pdf, .docx, .xlsx, .xls, .xlsm, .xlsb, .ods, .odt, .csv, .html, .xml, .jpeg, .jpg, .png, .webp, .svg, .numbers"
        },
        fileName: {
          type: "string",
          description: "Optional file name with extension. If not provided, will be extracted from URL. Used to determine file type."
        }
      },
      required: ["fileUrl"]
    }
  },
  // Phase 5: PDF.co Data Extraction (1 tool)
  {
    name: "excel_to_json",
    description: "Parse Excel spreadsheets (xls, xlsx, csv) to structured JSON using PDF.co API. Supports multi-sheet workbooks via worksheetIndex parameter. Extracts calculated cell values (formulas are computed, not extracted as text). Returns both JSON data and permanent R2 storage URL. Ideal for data extraction, analysis, and processing.",
    inputSchema: {
      type: "object",
      properties: {
        fileUrl: {
          type: "string",
          description: "Publicly accessible URL to Excel file. Supported formats: .xls, .xlsx, .csv. File must be downloadable without authentication."
        },
        worksheetIndex: {
          type: "string",
          description: 'Optional 1-based worksheet index (default: "1" for first sheet). Use "2" for second sheet, "3" for third, etc. Only one worksheet is converted per call.'
        }
      },
      required: ["fileUrl"]
    }
  },
  // Phase 6: PDF.co Office Conversions (1 tool)
  {
    name: "office_to_pdf",
    description: "Convert Office documents (DOCX, DOC, XLSX, XLS, PPTX, PPT, RTF, TXT, CSV, XPS) to PDF using PDF.co API. Returns permanently stored PDF URL. NOTE: PowerPoint files (PPT/PPTX) have limited support - PDF.co may not provide assistance for rendering issues. Office macros are disabled. For Excel files, use worksheetIndex to convert specific sheet (1=first, 2=second, etc.) or omit to convert all sheets.",
    inputSchema: {
      type: "object",
      properties: {
        fileUrl: {
          type: "string",
          description: "Publicly accessible URL to Office file. Supported formats: .doc, .docx, .xls, .xlsx, .ppt, .pptx, .csv, .rtf, .txt, .xps. File must be downloadable without authentication."
        },
        worksheetIndex: {
          type: "number",
          description: "Excel files only: 1-based worksheet index to convert. Use 1 for first sheet, 2 for second, etc. Omit to convert all sheets to multi-page PDF. This parameter is ignored for non-Excel files."
        },
        autosize: {
          type: "boolean",
          description: "Excel files only: Auto-adjust page dimensions to fit content. Recommended for better readability. Default: false. This parameter is ignored for non-Excel files."
        }
      },
      required: ["fileUrl"]
    }
  }
  // Phase 7: PDF.co PDF Operations
  // - merge_pdfs
  // - split_pdf
  // - extract_pdf_tables
  // Phase 8: Browser Rendering Images
  // - pdf_to_images
  // - document_to_images
];
var getToolByName = /* @__PURE__ */ __name((name) => {
  return tools.find((tool) => tool.name === name);
}, "getToolByName");

// src/utils/responses.ts
init_checked_fetch();
init_modules_watch_stub();
var ErrorCodes = {
  PARSE_ERROR: -32700,
  INVALID_REQUEST: -32600,
  METHOD_NOT_FOUND: -32601,
  INVALID_PARAMS: -32602,
  INTERNAL_ERROR: -32603
};
function createMCPResponse(id, result) {
  return {
    jsonrpc: "2.0",
    id,
    result
  };
}
__name(createMCPResponse, "createMCPResponse");
function createMCPError(id, code, message, data) {
  return {
    jsonrpc: "2.0",
    id,
    error: {
      code,
      message,
      data
    }
  };
}
__name(createMCPError, "createMCPError");
function createParseError(id = 0) {
  return createMCPError(id, ErrorCodes.PARSE_ERROR, "Parse error");
}
__name(createParseError, "createParseError");
function createInvalidRequest(id = 0) {
  return createMCPError(id, ErrorCodes.INVALID_REQUEST, "Invalid request");
}
__name(createInvalidRequest, "createInvalidRequest");
function createMethodNotFound(id) {
  return createMCPError(id, ErrorCodes.METHOD_NOT_FOUND, "Method not found");
}
__name(createMethodNotFound, "createMethodNotFound");
function createInvalidParams(id, message) {
  return createMCPError(
    id,
    ErrorCodes.INVALID_PARAMS,
    message || "Invalid params"
  );
}
__name(createInvalidParams, "createInvalidParams");
function createInternalError(id, message) {
  return createMCPError(
    id,
    ErrorCodes.INTERNAL_ERROR,
    message || "Internal error"
  );
}
__name(createInternalError, "createInternalError");

// src/handlers/browser-pdf.ts
init_checked_fetch();
init_modules_watch_stub();

// node_modules/marked/lib/marked.esm.js
init_checked_fetch();
init_modules_watch_stub();
function L() {
  return { async: false, breaks: false, extensions: null, gfm: true, hooks: null, pedantic: false, renderer: null, silent: false, tokenizer: null, walkTokens: null };
}
__name(L, "L");
var T = L();
function G(u4) {
  T = u4;
}
__name(G, "G");
var I = { exec: () => null };
function h(u4, e2 = "") {
  let t2 = typeof u4 == "string" ? u4 : u4.source, n3 = { replace: (r2, i2) => {
    let s2 = typeof i2 == "string" ? i2 : i2.source;
    return s2 = s2.replace(m.caret, "$1"), t2 = t2.replace(r2, s2), n3;
  }, getRegex: () => new RegExp(t2, e2) };
  return n3;
}
__name(h, "h");
var m = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceTabs: /^\t+/, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] /, listReplaceTask: /^\[[ xX]\] +/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (u4) => new RegExp(`^( {0,3}${u4})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (u4) => new RegExp(`^ {0,${Math.min(3, u4 - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (u4) => new RegExp(`^ {0,${Math.min(3, u4 - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (u4) => new RegExp(`^ {0,${Math.min(3, u4 - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (u4) => new RegExp(`^ {0,${Math.min(3, u4 - 1)}}#`), htmlBeginRegex: (u4) => new RegExp(`^ {0,${Math.min(3, u4 - 1)}}<(?:[a-z].*>|!--)`, "i") };
var be = /^(?:[ \t]*(?:\n|$))+/;
var Re = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/;
var Te = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
var E = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
var Oe = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
var F = /(?:[*+-]|\d{1,9}[.)])/;
var ie = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/;
var oe = h(ie).replace(/bull/g, F).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex();
var we = h(ie).replace(/bull/g, F).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex();
var j = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/;
var ye = /^[^\n]+/;
var Q = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/;
var Pe = h(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", Q).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex();
var Se = h(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, F).getRegex();
var v = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
var U = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
var $e = h("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", U).replace("tag", v).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
var ae = h(j).replace("hr", E).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", v).getRegex();
var _e = h(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", ae).getRegex();
var K = { blockquote: _e, code: Re, def: Pe, fences: Te, heading: Oe, hr: E, html: $e, lheading: oe, list: Se, newline: be, paragraph: ae, table: I, text: ye };
var re = h("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", E).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", v).getRegex();
var Le = { ...K, lheading: we, table: re, paragraph: h(j).replace("hr", E).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", re).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", v).getRegex() };
var Me = { ...K, html: h(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", U).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: I, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: h(j).replace("hr", E).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", oe).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() };
var ze = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
var Ae = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
var le = /^( {2,}|\\)\n(?!\s*$)/;
var Ie = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
var D = /[\p{P}\p{S}]/u;
var W = /[\s\p{P}\p{S}]/u;
var ue = /[^\s\p{P}\p{S}]/u;
var Ee = h(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, W).getRegex();
var pe = /(?!~)[\p{P}\p{S}]/u;
var Ce = /(?!~)[\s\p{P}\p{S}]/u;
var Be = /(?:[^\s\p{P}\p{S}]|~)/u;
var qe = h(/link|code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<!`)(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("code", /(?<!`)(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex();
var ce = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/;
var ve = h(ce, "u").replace(/punct/g, D).getRegex();
var De = h(ce, "u").replace(/punct/g, pe).getRegex();
var he = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)";
var He = h(he, "gu").replace(/notPunctSpace/g, ue).replace(/punctSpace/g, W).replace(/punct/g, D).getRegex();
var Ze = h(he, "gu").replace(/notPunctSpace/g, Be).replace(/punctSpace/g, Ce).replace(/punct/g, pe).getRegex();
var Ge = h("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, ue).replace(/punctSpace/g, W).replace(/punct/g, D).getRegex();
var Ne = h(/\\(punct)/, "gu").replace(/punct/g, D).getRegex();
var Fe = h(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
var je = h(U).replace("(?:-->|$)", "-->").getRegex();
var Qe = h("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", je).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
var q = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/;
var Ue = h(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", q).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex();
var de = h(/^!?\[(label)\]\[(ref)\]/).replace("label", q).replace("ref", Q).getRegex();
var ke = h(/^!?\[(ref)\](?:\[\])?/).replace("ref", Q).getRegex();
var Ke = h("reflink|nolink(?!\\()", "g").replace("reflink", de).replace("nolink", ke).getRegex();
var se = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/;
var X = { _backpedal: I, anyPunctuation: Ne, autolink: Fe, blockSkip: qe, br: le, code: Ae, del: I, emStrongLDelim: ve, emStrongRDelimAst: He, emStrongRDelimUnd: Ge, escape: ze, link: Ue, nolink: ke, punctuation: Ee, reflink: de, reflinkSearch: Ke, tag: Qe, text: Ie, url: I };
var We = { ...X, link: h(/^!?\[(label)\]\((.*?)\)/).replace("label", q).getRegex(), reflink: h(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", q).getRegex() };
var N = { ...X, emStrongRDelimAst: Ze, emStrongLDelim: De, url: h(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", se).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: h(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", se).getRegex() };
var Xe = { ...N, br: h(le).replace("{2,}", "*").getRegex(), text: h(N.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() };
var C = { normal: K, gfm: Le, pedantic: Me };
var M = { normal: X, gfm: N, breaks: Xe, pedantic: We };
var Je = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
var ge = /* @__PURE__ */ __name((u4) => Je[u4], "ge");
function w(u4, e2) {
  if (e2) {
    if (m.escapeTest.test(u4))
      return u4.replace(m.escapeReplace, ge);
  } else if (m.escapeTestNoEncode.test(u4))
    return u4.replace(m.escapeReplaceNoEncode, ge);
  return u4;
}
__name(w, "w");
function J(u4) {
  try {
    u4 = encodeURI(u4).replace(m.percentDecode, "%");
  } catch {
    return null;
  }
  return u4;
}
__name(J, "J");
function V(u4, e2) {
  let t2 = u4.replace(m.findPipe, (i2, s2, o2) => {
    let a2 = false, l2 = s2;
    for (; --l2 >= 0 && o2[l2] === "\\"; )
      a2 = !a2;
    return a2 ? "|" : " |";
  }), n3 = t2.split(m.splitPipe), r2 = 0;
  if (n3[0].trim() || n3.shift(), n3.length > 0 && !n3.at(-1)?.trim() && n3.pop(), e2)
    if (n3.length > e2)
      n3.splice(e2);
    else
      for (; n3.length < e2; )
        n3.push("");
  for (; r2 < n3.length; r2++)
    n3[r2] = n3[r2].trim().replace(m.slashPipe, "|");
  return n3;
}
__name(V, "V");
function z(u4, e2, t2) {
  let n3 = u4.length;
  if (n3 === 0)
    return "";
  let r2 = 0;
  for (; r2 < n3; ) {
    let i2 = u4.charAt(n3 - r2 - 1);
    if (i2 === e2 && !t2)
      r2++;
    else if (i2 !== e2 && t2)
      r2++;
    else
      break;
  }
  return u4.slice(0, n3 - r2);
}
__name(z, "z");
function fe(u4, e2) {
  if (u4.indexOf(e2[1]) === -1)
    return -1;
  let t2 = 0;
  for (let n3 = 0; n3 < u4.length; n3++)
    if (u4[n3] === "\\")
      n3++;
    else if (u4[n3] === e2[0])
      t2++;
    else if (u4[n3] === e2[1] && (t2--, t2 < 0))
      return n3;
  return t2 > 0 ? -2 : -1;
}
__name(fe, "fe");
function me(u4, e2, t2, n3, r2) {
  let i2 = e2.href, s2 = e2.title || null, o2 = u4[1].replace(r2.other.outputLinkReplace, "$1");
  n3.state.inLink = true;
  let a2 = { type: u4[0].charAt(0) === "!" ? "image" : "link", raw: t2, href: i2, title: s2, text: o2, tokens: n3.inlineTokens(o2) };
  return n3.state.inLink = false, a2;
}
__name(me, "me");
function Ve(u4, e2, t2) {
  let n3 = u4.match(t2.other.indentCodeCompensation);
  if (n3 === null)
    return e2;
  let r2 = n3[1];
  return e2.split(`
`).map((i2) => {
    let s2 = i2.match(t2.other.beginningSpace);
    if (s2 === null)
      return i2;
    let [o2] = s2;
    return o2.length >= r2.length ? i2.slice(r2.length) : i2;
  }).join(`
`);
}
__name(Ve, "Ve");
var y = /* @__PURE__ */ __name(class {
  options;
  rules;
  lexer;
  constructor(e2) {
    this.options = e2 || T;
  }
  space(e2) {
    let t2 = this.rules.block.newline.exec(e2);
    if (t2 && t2[0].length > 0)
      return { type: "space", raw: t2[0] };
  }
  code(e2) {
    let t2 = this.rules.block.code.exec(e2);
    if (t2) {
      let n3 = t2[0].replace(this.rules.other.codeRemoveIndent, "");
      return { type: "code", raw: t2[0], codeBlockStyle: "indented", text: this.options.pedantic ? n3 : z(n3, `
`) };
    }
  }
  fences(e2) {
    let t2 = this.rules.block.fences.exec(e2);
    if (t2) {
      let n3 = t2[0], r2 = Ve(n3, t2[3] || "", this.rules);
      return { type: "code", raw: n3, lang: t2[2] ? t2[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t2[2], text: r2 };
    }
  }
  heading(e2) {
    let t2 = this.rules.block.heading.exec(e2);
    if (t2) {
      let n3 = t2[2].trim();
      if (this.rules.other.endingHash.test(n3)) {
        let r2 = z(n3, "#");
        (this.options.pedantic || !r2 || this.rules.other.endingSpaceChar.test(r2)) && (n3 = r2.trim());
      }
      return { type: "heading", raw: t2[0], depth: t2[1].length, text: n3, tokens: this.lexer.inline(n3) };
    }
  }
  hr(e2) {
    let t2 = this.rules.block.hr.exec(e2);
    if (t2)
      return { type: "hr", raw: z(t2[0], `
`) };
  }
  blockquote(e2) {
    let t2 = this.rules.block.blockquote.exec(e2);
    if (t2) {
      let n3 = z(t2[0], `
`).split(`
`), r2 = "", i2 = "", s2 = [];
      for (; n3.length > 0; ) {
        let o2 = false, a2 = [], l2;
        for (l2 = 0; l2 < n3.length; l2++)
          if (this.rules.other.blockquoteStart.test(n3[l2]))
            a2.push(n3[l2]), o2 = true;
          else if (!o2)
            a2.push(n3[l2]);
          else
            break;
        n3 = n3.slice(l2);
        let c2 = a2.join(`
`), p2 = c2.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        r2 = r2 ? `${r2}
${c2}` : c2, i2 = i2 ? `${i2}
${p2}` : p2;
        let g2 = this.lexer.state.top;
        if (this.lexer.state.top = true, this.lexer.blockTokens(p2, s2, true), this.lexer.state.top = g2, n3.length === 0)
          break;
        let d2 = s2.at(-1);
        if (d2?.type === "code")
          break;
        if (d2?.type === "blockquote") {
          let R2 = d2, f2 = R2.raw + `
` + n3.join(`
`), O2 = this.blockquote(f2);
          s2[s2.length - 1] = O2, r2 = r2.substring(0, r2.length - R2.raw.length) + O2.raw, i2 = i2.substring(0, i2.length - R2.text.length) + O2.text;
          break;
        } else if (d2?.type === "list") {
          let R2 = d2, f2 = R2.raw + `
` + n3.join(`
`), O2 = this.list(f2);
          s2[s2.length - 1] = O2, r2 = r2.substring(0, r2.length - d2.raw.length) + O2.raw, i2 = i2.substring(0, i2.length - R2.raw.length) + O2.raw, n3 = f2.substring(s2.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return { type: "blockquote", raw: r2, tokens: s2, text: i2 };
    }
  }
  list(e2) {
    let t2 = this.rules.block.list.exec(e2);
    if (t2) {
      let n3 = t2[1].trim(), r2 = n3.length > 1, i2 = { type: "list", raw: "", ordered: r2, start: r2 ? +n3.slice(0, -1) : "", loose: false, items: [] };
      n3 = r2 ? `\\d{1,9}\\${n3.slice(-1)}` : `\\${n3}`, this.options.pedantic && (n3 = r2 ? n3 : "[*+-]");
      let s2 = this.rules.other.listItemRegex(n3), o2 = false;
      for (; e2; ) {
        let l2 = false, c2 = "", p2 = "";
        if (!(t2 = s2.exec(e2)) || this.rules.block.hr.test(e2))
          break;
        c2 = t2[0], e2 = e2.substring(c2.length);
        let g2 = t2[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (H2) => " ".repeat(3 * H2.length)), d2 = e2.split(`
`, 1)[0], R2 = !g2.trim(), f2 = 0;
        if (this.options.pedantic ? (f2 = 2, p2 = g2.trimStart()) : R2 ? f2 = t2[1].length + 1 : (f2 = t2[2].search(this.rules.other.nonSpaceChar), f2 = f2 > 4 ? 1 : f2, p2 = g2.slice(f2), f2 += t2[1].length), R2 && this.rules.other.blankLine.test(d2) && (c2 += d2 + `
`, e2 = e2.substring(d2.length + 1), l2 = true), !l2) {
          let H2 = this.rules.other.nextBulletRegex(f2), ee = this.rules.other.hrRegex(f2), te = this.rules.other.fencesBeginRegex(f2), ne = this.rules.other.headingBeginRegex(f2), xe = this.rules.other.htmlBeginRegex(f2);
          for (; e2; ) {
            let Z2 = e2.split(`
`, 1)[0], A2;
            if (d2 = Z2, this.options.pedantic ? (d2 = d2.replace(this.rules.other.listReplaceNesting, "  "), A2 = d2) : A2 = d2.replace(this.rules.other.tabCharGlobal, "    "), te.test(d2) || ne.test(d2) || xe.test(d2) || H2.test(d2) || ee.test(d2))
              break;
            if (A2.search(this.rules.other.nonSpaceChar) >= f2 || !d2.trim())
              p2 += `
` + A2.slice(f2);
            else {
              if (R2 || g2.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || te.test(g2) || ne.test(g2) || ee.test(g2))
                break;
              p2 += `
` + d2;
            }
            !R2 && !d2.trim() && (R2 = true), c2 += Z2 + `
`, e2 = e2.substring(Z2.length + 1), g2 = A2.slice(f2);
          }
        }
        i2.loose || (o2 ? i2.loose = true : this.rules.other.doubleBlankLine.test(c2) && (o2 = true));
        let O2 = null, Y2;
        this.options.gfm && (O2 = this.rules.other.listIsTask.exec(p2), O2 && (Y2 = O2[0] !== "[ ] ", p2 = p2.replace(this.rules.other.listReplaceTask, ""))), i2.items.push({ type: "list_item", raw: c2, task: !!O2, checked: Y2, loose: false, text: p2, tokens: [] }), i2.raw += c2;
      }
      let a2 = i2.items.at(-1);
      if (a2)
        a2.raw = a2.raw.trimEnd(), a2.text = a2.text.trimEnd();
      else
        return;
      i2.raw = i2.raw.trimEnd();
      for (let l2 = 0; l2 < i2.items.length; l2++)
        if (this.lexer.state.top = false, i2.items[l2].tokens = this.lexer.blockTokens(i2.items[l2].text, []), !i2.loose) {
          let c2 = i2.items[l2].tokens.filter((g2) => g2.type === "space"), p2 = c2.length > 0 && c2.some((g2) => this.rules.other.anyLine.test(g2.raw));
          i2.loose = p2;
        }
      if (i2.loose)
        for (let l2 = 0; l2 < i2.items.length; l2++)
          i2.items[l2].loose = true;
      return i2;
    }
  }
  html(e2) {
    let t2 = this.rules.block.html.exec(e2);
    if (t2)
      return { type: "html", block: true, raw: t2[0], pre: t2[1] === "pre" || t2[1] === "script" || t2[1] === "style", text: t2[0] };
  }
  def(e2) {
    let t2 = this.rules.block.def.exec(e2);
    if (t2) {
      let n3 = t2[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), r2 = t2[2] ? t2[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", i2 = t2[3] ? t2[3].substring(1, t2[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t2[3];
      return { type: "def", tag: n3, raw: t2[0], href: r2, title: i2 };
    }
  }
  table(e2) {
    let t2 = this.rules.block.table.exec(e2);
    if (!t2 || !this.rules.other.tableDelimiter.test(t2[2]))
      return;
    let n3 = V(t2[1]), r2 = t2[2].replace(this.rules.other.tableAlignChars, "").split("|"), i2 = t2[3]?.trim() ? t2[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], s2 = { type: "table", raw: t2[0], header: [], align: [], rows: [] };
    if (n3.length === r2.length) {
      for (let o2 of r2)
        this.rules.other.tableAlignRight.test(o2) ? s2.align.push("right") : this.rules.other.tableAlignCenter.test(o2) ? s2.align.push("center") : this.rules.other.tableAlignLeft.test(o2) ? s2.align.push("left") : s2.align.push(null);
      for (let o2 = 0; o2 < n3.length; o2++)
        s2.header.push({ text: n3[o2], tokens: this.lexer.inline(n3[o2]), header: true, align: s2.align[o2] });
      for (let o2 of i2)
        s2.rows.push(V(o2, s2.header.length).map((a2, l2) => ({ text: a2, tokens: this.lexer.inline(a2), header: false, align: s2.align[l2] })));
      return s2;
    }
  }
  lheading(e2) {
    let t2 = this.rules.block.lheading.exec(e2);
    if (t2)
      return { type: "heading", raw: t2[0], depth: t2[2].charAt(0) === "=" ? 1 : 2, text: t2[1], tokens: this.lexer.inline(t2[1]) };
  }
  paragraph(e2) {
    let t2 = this.rules.block.paragraph.exec(e2);
    if (t2) {
      let n3 = t2[1].charAt(t2[1].length - 1) === `
` ? t2[1].slice(0, -1) : t2[1];
      return { type: "paragraph", raw: t2[0], text: n3, tokens: this.lexer.inline(n3) };
    }
  }
  text(e2) {
    let t2 = this.rules.block.text.exec(e2);
    if (t2)
      return { type: "text", raw: t2[0], text: t2[0], tokens: this.lexer.inline(t2[0]) };
  }
  escape(e2) {
    let t2 = this.rules.inline.escape.exec(e2);
    if (t2)
      return { type: "escape", raw: t2[0], text: t2[1] };
  }
  tag(e2) {
    let t2 = this.rules.inline.tag.exec(e2);
    if (t2)
      return !this.lexer.state.inLink && this.rules.other.startATag.test(t2[0]) ? this.lexer.state.inLink = true : this.lexer.state.inLink && this.rules.other.endATag.test(t2[0]) && (this.lexer.state.inLink = false), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t2[0]) ? this.lexer.state.inRawBlock = true : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t2[0]) && (this.lexer.state.inRawBlock = false), { type: "html", raw: t2[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: false, text: t2[0] };
  }
  link(e2) {
    let t2 = this.rules.inline.link.exec(e2);
    if (t2) {
      let n3 = t2[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(n3)) {
        if (!this.rules.other.endAngleBracket.test(n3))
          return;
        let s2 = z(n3.slice(0, -1), "\\");
        if ((n3.length - s2.length) % 2 === 0)
          return;
      } else {
        let s2 = fe(t2[2], "()");
        if (s2 === -2)
          return;
        if (s2 > -1) {
          let a2 = (t2[0].indexOf("!") === 0 ? 5 : 4) + t2[1].length + s2;
          t2[2] = t2[2].substring(0, s2), t2[0] = t2[0].substring(0, a2).trim(), t2[3] = "";
        }
      }
      let r2 = t2[2], i2 = "";
      if (this.options.pedantic) {
        let s2 = this.rules.other.pedanticHrefTitle.exec(r2);
        s2 && (r2 = s2[1], i2 = s2[3]);
      } else
        i2 = t2[3] ? t2[3].slice(1, -1) : "";
      return r2 = r2.trim(), this.rules.other.startAngleBracket.test(r2) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n3) ? r2 = r2.slice(1) : r2 = r2.slice(1, -1)), me(t2, { href: r2 && r2.replace(this.rules.inline.anyPunctuation, "$1"), title: i2 && i2.replace(this.rules.inline.anyPunctuation, "$1") }, t2[0], this.lexer, this.rules);
    }
  }
  reflink(e2, t2) {
    let n3;
    if ((n3 = this.rules.inline.reflink.exec(e2)) || (n3 = this.rules.inline.nolink.exec(e2))) {
      let r2 = (n3[2] || n3[1]).replace(this.rules.other.multipleSpaceGlobal, " "), i2 = t2[r2.toLowerCase()];
      if (!i2) {
        let s2 = n3[0].charAt(0);
        return { type: "text", raw: s2, text: s2 };
      }
      return me(n3, i2, n3[0], this.lexer, this.rules);
    }
  }
  emStrong(e2, t2, n3 = "") {
    let r2 = this.rules.inline.emStrongLDelim.exec(e2);
    if (!r2 || r2[3] && n3.match(this.rules.other.unicodeAlphaNumeric))
      return;
    if (!(r2[1] || r2[2] || "") || !n3 || this.rules.inline.punctuation.exec(n3)) {
      let s2 = [...r2[0]].length - 1, o2, a2, l2 = s2, c2 = 0, p2 = r2[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (p2.lastIndex = 0, t2 = t2.slice(-1 * e2.length + s2); (r2 = p2.exec(t2)) != null; ) {
        if (o2 = r2[1] || r2[2] || r2[3] || r2[4] || r2[5] || r2[6], !o2)
          continue;
        if (a2 = [...o2].length, r2[3] || r2[4]) {
          l2 += a2;
          continue;
        } else if ((r2[5] || r2[6]) && s2 % 3 && !((s2 + a2) % 3)) {
          c2 += a2;
          continue;
        }
        if (l2 -= a2, l2 > 0)
          continue;
        a2 = Math.min(a2, a2 + l2 + c2);
        let g2 = [...r2[0]][0].length, d2 = e2.slice(0, s2 + r2.index + g2 + a2);
        if (Math.min(s2, a2) % 2) {
          let f2 = d2.slice(1, -1);
          return { type: "em", raw: d2, text: f2, tokens: this.lexer.inlineTokens(f2) };
        }
        let R2 = d2.slice(2, -2);
        return { type: "strong", raw: d2, text: R2, tokens: this.lexer.inlineTokens(R2) };
      }
    }
  }
  codespan(e2) {
    let t2 = this.rules.inline.code.exec(e2);
    if (t2) {
      let n3 = t2[2].replace(this.rules.other.newLineCharGlobal, " "), r2 = this.rules.other.nonSpaceChar.test(n3), i2 = this.rules.other.startingSpaceChar.test(n3) && this.rules.other.endingSpaceChar.test(n3);
      return r2 && i2 && (n3 = n3.substring(1, n3.length - 1)), { type: "codespan", raw: t2[0], text: n3 };
    }
  }
  br(e2) {
    let t2 = this.rules.inline.br.exec(e2);
    if (t2)
      return { type: "br", raw: t2[0] };
  }
  del(e2) {
    let t2 = this.rules.inline.del.exec(e2);
    if (t2)
      return { type: "del", raw: t2[0], text: t2[2], tokens: this.lexer.inlineTokens(t2[2]) };
  }
  autolink(e2) {
    let t2 = this.rules.inline.autolink.exec(e2);
    if (t2) {
      let n3, r2;
      return t2[2] === "@" ? (n3 = t2[1], r2 = "mailto:" + n3) : (n3 = t2[1], r2 = n3), { type: "link", raw: t2[0], text: n3, href: r2, tokens: [{ type: "text", raw: n3, text: n3 }] };
    }
  }
  url(e2) {
    let t2;
    if (t2 = this.rules.inline.url.exec(e2)) {
      let n3, r2;
      if (t2[2] === "@")
        n3 = t2[0], r2 = "mailto:" + n3;
      else {
        let i2;
        do
          i2 = t2[0], t2[0] = this.rules.inline._backpedal.exec(t2[0])?.[0] ?? "";
        while (i2 !== t2[0]);
        n3 = t2[0], t2[1] === "www." ? r2 = "http://" + t2[0] : r2 = t2[0];
      }
      return { type: "link", raw: t2[0], text: n3, href: r2, tokens: [{ type: "text", raw: n3, text: n3 }] };
    }
  }
  inlineText(e2) {
    let t2 = this.rules.inline.text.exec(e2);
    if (t2) {
      let n3 = this.lexer.state.inRawBlock;
      return { type: "text", raw: t2[0], text: t2[0], escaped: n3 };
    }
  }
}, "y");
var x = /* @__PURE__ */ __name(class u {
  tokens;
  options;
  state;
  tokenizer;
  inlineQueue;
  constructor(e2) {
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e2 || T, this.options.tokenizer = this.options.tokenizer || new y(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: false, inRawBlock: false, top: true };
    let t2 = { other: m, block: C.normal, inline: M.normal };
    this.options.pedantic ? (t2.block = C.pedantic, t2.inline = M.pedantic) : this.options.gfm && (t2.block = C.gfm, this.options.breaks ? t2.inline = M.breaks : t2.inline = M.gfm), this.tokenizer.rules = t2;
  }
  static get rules() {
    return { block: C, inline: M };
  }
  static lex(e2, t2) {
    return new u(t2).lex(e2);
  }
  static lexInline(e2, t2) {
    return new u(t2).inlineTokens(e2);
  }
  lex(e2) {
    e2 = e2.replace(m.carriageReturn, `
`), this.blockTokens(e2, this.tokens);
    for (let t2 = 0; t2 < this.inlineQueue.length; t2++) {
      let n3 = this.inlineQueue[t2];
      this.inlineTokens(n3.src, n3.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e2, t2 = [], n3 = false) {
    for (this.options.pedantic && (e2 = e2.replace(m.tabCharGlobal, "    ").replace(m.spaceLine, "")); e2; ) {
      let r2;
      if (this.options.extensions?.block?.some((s2) => (r2 = s2.call({ lexer: this }, e2, t2)) ? (e2 = e2.substring(r2.raw.length), t2.push(r2), true) : false))
        continue;
      if (r2 = this.tokenizer.space(e2)) {
        e2 = e2.substring(r2.raw.length);
        let s2 = t2.at(-1);
        r2.raw.length === 1 && s2 !== void 0 ? s2.raw += `
` : t2.push(r2);
        continue;
      }
      if (r2 = this.tokenizer.code(e2)) {
        e2 = e2.substring(r2.raw.length);
        let s2 = t2.at(-1);
        s2?.type === "paragraph" || s2?.type === "text" ? (s2.raw += (s2.raw.endsWith(`
`) ? "" : `
`) + r2.raw, s2.text += `
` + r2.text, this.inlineQueue.at(-1).src = s2.text) : t2.push(r2);
        continue;
      }
      if (r2 = this.tokenizer.fences(e2)) {
        e2 = e2.substring(r2.raw.length), t2.push(r2);
        continue;
      }
      if (r2 = this.tokenizer.heading(e2)) {
        e2 = e2.substring(r2.raw.length), t2.push(r2);
        continue;
      }
      if (r2 = this.tokenizer.hr(e2)) {
        e2 = e2.substring(r2.raw.length), t2.push(r2);
        continue;
      }
      if (r2 = this.tokenizer.blockquote(e2)) {
        e2 = e2.substring(r2.raw.length), t2.push(r2);
        continue;
      }
      if (r2 = this.tokenizer.list(e2)) {
        e2 = e2.substring(r2.raw.length), t2.push(r2);
        continue;
      }
      if (r2 = this.tokenizer.html(e2)) {
        e2 = e2.substring(r2.raw.length), t2.push(r2);
        continue;
      }
      if (r2 = this.tokenizer.def(e2)) {
        e2 = e2.substring(r2.raw.length);
        let s2 = t2.at(-1);
        s2?.type === "paragraph" || s2?.type === "text" ? (s2.raw += (s2.raw.endsWith(`
`) ? "" : `
`) + r2.raw, s2.text += `
` + r2.raw, this.inlineQueue.at(-1).src = s2.text) : this.tokens.links[r2.tag] || (this.tokens.links[r2.tag] = { href: r2.href, title: r2.title }, t2.push(r2));
        continue;
      }
      if (r2 = this.tokenizer.table(e2)) {
        e2 = e2.substring(r2.raw.length), t2.push(r2);
        continue;
      }
      if (r2 = this.tokenizer.lheading(e2)) {
        e2 = e2.substring(r2.raw.length), t2.push(r2);
        continue;
      }
      let i2 = e2;
      if (this.options.extensions?.startBlock) {
        let s2 = 1 / 0, o2 = e2.slice(1), a2;
        this.options.extensions.startBlock.forEach((l2) => {
          a2 = l2.call({ lexer: this }, o2), typeof a2 == "number" && a2 >= 0 && (s2 = Math.min(s2, a2));
        }), s2 < 1 / 0 && s2 >= 0 && (i2 = e2.substring(0, s2 + 1));
      }
      if (this.state.top && (r2 = this.tokenizer.paragraph(i2))) {
        let s2 = t2.at(-1);
        n3 && s2?.type === "paragraph" ? (s2.raw += (s2.raw.endsWith(`
`) ? "" : `
`) + r2.raw, s2.text += `
` + r2.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s2.text) : t2.push(r2), n3 = i2.length !== e2.length, e2 = e2.substring(r2.raw.length);
        continue;
      }
      if (r2 = this.tokenizer.text(e2)) {
        e2 = e2.substring(r2.raw.length);
        let s2 = t2.at(-1);
        s2?.type === "text" ? (s2.raw += (s2.raw.endsWith(`
`) ? "" : `
`) + r2.raw, s2.text += `
` + r2.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s2.text) : t2.push(r2);
        continue;
      }
      if (e2) {
        let s2 = "Infinite loop on byte: " + e2.charCodeAt(0);
        if (this.options.silent) {
          console.error(s2);
          break;
        } else
          throw new Error(s2);
      }
    }
    return this.state.top = true, t2;
  }
  inline(e2, t2 = []) {
    return this.inlineQueue.push({ src: e2, tokens: t2 }), t2;
  }
  inlineTokens(e2, t2 = []) {
    let n3 = e2, r2 = null;
    if (this.tokens.links) {
      let o2 = Object.keys(this.tokens.links);
      if (o2.length > 0)
        for (; (r2 = this.tokenizer.rules.inline.reflinkSearch.exec(n3)) != null; )
          o2.includes(r2[0].slice(r2[0].lastIndexOf("[") + 1, -1)) && (n3 = n3.slice(0, r2.index) + "[" + "a".repeat(r2[0].length - 2) + "]" + n3.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (r2 = this.tokenizer.rules.inline.anyPunctuation.exec(n3)) != null; )
      n3 = n3.slice(0, r2.index) + "++" + n3.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    for (; (r2 = this.tokenizer.rules.inline.blockSkip.exec(n3)) != null; )
      n3 = n3.slice(0, r2.index) + "[" + "a".repeat(r2[0].length - 2) + "]" + n3.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    n3 = this.options.hooks?.emStrongMask?.call({ lexer: this }, n3) ?? n3;
    let i2 = false, s2 = "";
    for (; e2; ) {
      i2 || (s2 = ""), i2 = false;
      let o2;
      if (this.options.extensions?.inline?.some((l2) => (o2 = l2.call({ lexer: this }, e2, t2)) ? (e2 = e2.substring(o2.raw.length), t2.push(o2), true) : false))
        continue;
      if (o2 = this.tokenizer.escape(e2)) {
        e2 = e2.substring(o2.raw.length), t2.push(o2);
        continue;
      }
      if (o2 = this.tokenizer.tag(e2)) {
        e2 = e2.substring(o2.raw.length), t2.push(o2);
        continue;
      }
      if (o2 = this.tokenizer.link(e2)) {
        e2 = e2.substring(o2.raw.length), t2.push(o2);
        continue;
      }
      if (o2 = this.tokenizer.reflink(e2, this.tokens.links)) {
        e2 = e2.substring(o2.raw.length);
        let l2 = t2.at(-1);
        o2.type === "text" && l2?.type === "text" ? (l2.raw += o2.raw, l2.text += o2.text) : t2.push(o2);
        continue;
      }
      if (o2 = this.tokenizer.emStrong(e2, n3, s2)) {
        e2 = e2.substring(o2.raw.length), t2.push(o2);
        continue;
      }
      if (o2 = this.tokenizer.codespan(e2)) {
        e2 = e2.substring(o2.raw.length), t2.push(o2);
        continue;
      }
      if (o2 = this.tokenizer.br(e2)) {
        e2 = e2.substring(o2.raw.length), t2.push(o2);
        continue;
      }
      if (o2 = this.tokenizer.del(e2)) {
        e2 = e2.substring(o2.raw.length), t2.push(o2);
        continue;
      }
      if (o2 = this.tokenizer.autolink(e2)) {
        e2 = e2.substring(o2.raw.length), t2.push(o2);
        continue;
      }
      if (!this.state.inLink && (o2 = this.tokenizer.url(e2))) {
        e2 = e2.substring(o2.raw.length), t2.push(o2);
        continue;
      }
      let a2 = e2;
      if (this.options.extensions?.startInline) {
        let l2 = 1 / 0, c2 = e2.slice(1), p2;
        this.options.extensions.startInline.forEach((g2) => {
          p2 = g2.call({ lexer: this }, c2), typeof p2 == "number" && p2 >= 0 && (l2 = Math.min(l2, p2));
        }), l2 < 1 / 0 && l2 >= 0 && (a2 = e2.substring(0, l2 + 1));
      }
      if (o2 = this.tokenizer.inlineText(a2)) {
        e2 = e2.substring(o2.raw.length), o2.raw.slice(-1) !== "_" && (s2 = o2.raw.slice(-1)), i2 = true;
        let l2 = t2.at(-1);
        l2?.type === "text" ? (l2.raw += o2.raw, l2.text += o2.text) : t2.push(o2);
        continue;
      }
      if (e2) {
        let l2 = "Infinite loop on byte: " + e2.charCodeAt(0);
        if (this.options.silent) {
          console.error(l2);
          break;
        } else
          throw new Error(l2);
      }
    }
    return t2;
  }
}, "u");
var P = /* @__PURE__ */ __name(class {
  options;
  parser;
  constructor(e2) {
    this.options = e2 || T;
  }
  space(e2) {
    return "";
  }
  code({ text: e2, lang: t2, escaped: n3 }) {
    let r2 = (t2 || "").match(m.notSpaceStart)?.[0], i2 = e2.replace(m.endingNewline, "") + `
`;
    return r2 ? '<pre><code class="language-' + w(r2) + '">' + (n3 ? i2 : w(i2, true)) + `</code></pre>
` : "<pre><code>" + (n3 ? i2 : w(i2, true)) + `</code></pre>
`;
  }
  blockquote({ tokens: e2 }) {
    return `<blockquote>
${this.parser.parse(e2)}</blockquote>
`;
  }
  html({ text: e2 }) {
    return e2;
  }
  def(e2) {
    return "";
  }
  heading({ tokens: e2, depth: t2 }) {
    return `<h${t2}>${this.parser.parseInline(e2)}</h${t2}>
`;
  }
  hr(e2) {
    return `<hr>
`;
  }
  list(e2) {
    let t2 = e2.ordered, n3 = e2.start, r2 = "";
    for (let o2 = 0; o2 < e2.items.length; o2++) {
      let a2 = e2.items[o2];
      r2 += this.listitem(a2);
    }
    let i2 = t2 ? "ol" : "ul", s2 = t2 && n3 !== 1 ? ' start="' + n3 + '"' : "";
    return "<" + i2 + s2 + `>
` + r2 + "</" + i2 + `>
`;
  }
  listitem(e2) {
    let t2 = "";
    if (e2.task) {
      let n3 = this.checkbox({ checked: !!e2.checked });
      e2.loose ? e2.tokens[0]?.type === "paragraph" ? (e2.tokens[0].text = n3 + " " + e2.tokens[0].text, e2.tokens[0].tokens && e2.tokens[0].tokens.length > 0 && e2.tokens[0].tokens[0].type === "text" && (e2.tokens[0].tokens[0].text = n3 + " " + w(e2.tokens[0].tokens[0].text), e2.tokens[0].tokens[0].escaped = true)) : e2.tokens.unshift({ type: "text", raw: n3 + " ", text: n3 + " ", escaped: true }) : t2 += n3 + " ";
    }
    return t2 += this.parser.parse(e2.tokens, !!e2.loose), `<li>${t2}</li>
`;
  }
  checkbox({ checked: e2 }) {
    return "<input " + (e2 ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph({ tokens: e2 }) {
    return `<p>${this.parser.parseInline(e2)}</p>
`;
  }
  table(e2) {
    let t2 = "", n3 = "";
    for (let i2 = 0; i2 < e2.header.length; i2++)
      n3 += this.tablecell(e2.header[i2]);
    t2 += this.tablerow({ text: n3 });
    let r2 = "";
    for (let i2 = 0; i2 < e2.rows.length; i2++) {
      let s2 = e2.rows[i2];
      n3 = "";
      for (let o2 = 0; o2 < s2.length; o2++)
        n3 += this.tablecell(s2[o2]);
      r2 += this.tablerow({ text: n3 });
    }
    return r2 && (r2 = `<tbody>${r2}</tbody>`), `<table>
<thead>
` + t2 + `</thead>
` + r2 + `</table>
`;
  }
  tablerow({ text: e2 }) {
    return `<tr>
${e2}</tr>
`;
  }
  tablecell(e2) {
    let t2 = this.parser.parseInline(e2.tokens), n3 = e2.header ? "th" : "td";
    return (e2.align ? `<${n3} align="${e2.align}">` : `<${n3}>`) + t2 + `</${n3}>
`;
  }
  strong({ tokens: e2 }) {
    return `<strong>${this.parser.parseInline(e2)}</strong>`;
  }
  em({ tokens: e2 }) {
    return `<em>${this.parser.parseInline(e2)}</em>`;
  }
  codespan({ text: e2 }) {
    return `<code>${w(e2, true)}</code>`;
  }
  br(e2) {
    return "<br>";
  }
  del({ tokens: e2 }) {
    return `<del>${this.parser.parseInline(e2)}</del>`;
  }
  link({ href: e2, title: t2, tokens: n3 }) {
    let r2 = this.parser.parseInline(n3), i2 = J(e2);
    if (i2 === null)
      return r2;
    e2 = i2;
    let s2 = '<a href="' + e2 + '"';
    return t2 && (s2 += ' title="' + w(t2) + '"'), s2 += ">" + r2 + "</a>", s2;
  }
  image({ href: e2, title: t2, text: n3, tokens: r2 }) {
    r2 && (n3 = this.parser.parseInline(r2, this.parser.textRenderer));
    let i2 = J(e2);
    if (i2 === null)
      return w(n3);
    e2 = i2;
    let s2 = `<img src="${e2}" alt="${n3}"`;
    return t2 && (s2 += ` title="${w(t2)}"`), s2 += ">", s2;
  }
  text(e2) {
    return "tokens" in e2 && e2.tokens ? this.parser.parseInline(e2.tokens) : "escaped" in e2 && e2.escaped ? e2.text : w(e2.text);
  }
}, "P");
var $ = /* @__PURE__ */ __name(class {
  strong({ text: e2 }) {
    return e2;
  }
  em({ text: e2 }) {
    return e2;
  }
  codespan({ text: e2 }) {
    return e2;
  }
  del({ text: e2 }) {
    return e2;
  }
  html({ text: e2 }) {
    return e2;
  }
  text({ text: e2 }) {
    return e2;
  }
  link({ text: e2 }) {
    return "" + e2;
  }
  image({ text: e2 }) {
    return "" + e2;
  }
  br() {
    return "";
  }
}, "$");
var b = /* @__PURE__ */ __name(class u2 {
  options;
  renderer;
  textRenderer;
  constructor(e2) {
    this.options = e2 || T, this.options.renderer = this.options.renderer || new P(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new $();
  }
  static parse(e2, t2) {
    return new u2(t2).parse(e2);
  }
  static parseInline(e2, t2) {
    return new u2(t2).parseInline(e2);
  }
  parse(e2, t2 = true) {
    let n3 = "";
    for (let r2 = 0; r2 < e2.length; r2++) {
      let i2 = e2[r2];
      if (this.options.extensions?.renderers?.[i2.type]) {
        let o2 = i2, a2 = this.options.extensions.renderers[o2.type].call({ parser: this }, o2);
        if (a2 !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "def", "paragraph", "text"].includes(o2.type)) {
          n3 += a2 || "";
          continue;
        }
      }
      let s2 = i2;
      switch (s2.type) {
        case "space": {
          n3 += this.renderer.space(s2);
          continue;
        }
        case "hr": {
          n3 += this.renderer.hr(s2);
          continue;
        }
        case "heading": {
          n3 += this.renderer.heading(s2);
          continue;
        }
        case "code": {
          n3 += this.renderer.code(s2);
          continue;
        }
        case "table": {
          n3 += this.renderer.table(s2);
          continue;
        }
        case "blockquote": {
          n3 += this.renderer.blockquote(s2);
          continue;
        }
        case "list": {
          n3 += this.renderer.list(s2);
          continue;
        }
        case "html": {
          n3 += this.renderer.html(s2);
          continue;
        }
        case "def": {
          n3 += this.renderer.def(s2);
          continue;
        }
        case "paragraph": {
          n3 += this.renderer.paragraph(s2);
          continue;
        }
        case "text": {
          let o2 = s2, a2 = this.renderer.text(o2);
          for (; r2 + 1 < e2.length && e2[r2 + 1].type === "text"; )
            o2 = e2[++r2], a2 += `
` + this.renderer.text(o2);
          t2 ? n3 += this.renderer.paragraph({ type: "paragraph", raw: a2, text: a2, tokens: [{ type: "text", raw: a2, text: a2, escaped: true }] }) : n3 += a2;
          continue;
        }
        default: {
          let o2 = 'Token with "' + s2.type + '" type was not found.';
          if (this.options.silent)
            return console.error(o2), "";
          throw new Error(o2);
        }
      }
    }
    return n3;
  }
  parseInline(e2, t2 = this.renderer) {
    let n3 = "";
    for (let r2 = 0; r2 < e2.length; r2++) {
      let i2 = e2[r2];
      if (this.options.extensions?.renderers?.[i2.type]) {
        let o2 = this.options.extensions.renderers[i2.type].call({ parser: this }, i2);
        if (o2 !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(i2.type)) {
          n3 += o2 || "";
          continue;
        }
      }
      let s2 = i2;
      switch (s2.type) {
        case "escape": {
          n3 += t2.text(s2);
          break;
        }
        case "html": {
          n3 += t2.html(s2);
          break;
        }
        case "link": {
          n3 += t2.link(s2);
          break;
        }
        case "image": {
          n3 += t2.image(s2);
          break;
        }
        case "strong": {
          n3 += t2.strong(s2);
          break;
        }
        case "em": {
          n3 += t2.em(s2);
          break;
        }
        case "codespan": {
          n3 += t2.codespan(s2);
          break;
        }
        case "br": {
          n3 += t2.br(s2);
          break;
        }
        case "del": {
          n3 += t2.del(s2);
          break;
        }
        case "text": {
          n3 += t2.text(s2);
          break;
        }
        default: {
          let o2 = 'Token with "' + s2.type + '" type was not found.';
          if (this.options.silent)
            return console.error(o2), "";
          throw new Error(o2);
        }
      }
    }
    return n3;
  }
}, "u");
var _a;
var S = /* @__PURE__ */ __name((_a = class {
  options;
  block;
  constructor(e2) {
    this.options = e2 || T;
  }
  preprocess(e2) {
    return e2;
  }
  postprocess(e2) {
    return e2;
  }
  processAllTokens(e2) {
    return e2;
  }
  emStrongMask(e2) {
    return e2;
  }
  provideLexer() {
    return this.block ? x.lex : x.lexInline;
  }
  provideParser() {
    return this.block ? b.parse : b.parseInline;
  }
}, __publicField(_a, "passThroughHooks", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"])), __publicField(_a, "passThroughHooksRespectAsync", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"])), _a), "S");
var B = /* @__PURE__ */ __name(class {
  defaults = L();
  options = this.setOptions;
  parse = this.parseMarkdown(true);
  parseInline = this.parseMarkdown(false);
  Parser = b;
  Renderer = P;
  TextRenderer = $;
  Lexer = x;
  Tokenizer = y;
  Hooks = S;
  constructor(...e2) {
    this.use(...e2);
  }
  walkTokens(e2, t2) {
    let n3 = [];
    for (let r2 of e2)
      switch (n3 = n3.concat(t2.call(this, r2)), r2.type) {
        case "table": {
          let i2 = r2;
          for (let s2 of i2.header)
            n3 = n3.concat(this.walkTokens(s2.tokens, t2));
          for (let s2 of i2.rows)
            for (let o2 of s2)
              n3 = n3.concat(this.walkTokens(o2.tokens, t2));
          break;
        }
        case "list": {
          let i2 = r2;
          n3 = n3.concat(this.walkTokens(i2.items, t2));
          break;
        }
        default: {
          let i2 = r2;
          this.defaults.extensions?.childTokens?.[i2.type] ? this.defaults.extensions.childTokens[i2.type].forEach((s2) => {
            let o2 = i2[s2].flat(1 / 0);
            n3 = n3.concat(this.walkTokens(o2, t2));
          }) : i2.tokens && (n3 = n3.concat(this.walkTokens(i2.tokens, t2)));
        }
      }
    return n3;
  }
  use(...e2) {
    let t2 = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return e2.forEach((n3) => {
      let r2 = { ...n3 };
      if (r2.async = this.defaults.async || r2.async || false, n3.extensions && (n3.extensions.forEach((i2) => {
        if (!i2.name)
          throw new Error("extension name required");
        if ("renderer" in i2) {
          let s2 = t2.renderers[i2.name];
          s2 ? t2.renderers[i2.name] = function(...o2) {
            let a2 = i2.renderer.apply(this, o2);
            return a2 === false && (a2 = s2.apply(this, o2)), a2;
          } : t2.renderers[i2.name] = i2.renderer;
        }
        if ("tokenizer" in i2) {
          if (!i2.level || i2.level !== "block" && i2.level !== "inline")
            throw new Error("extension level must be 'block' or 'inline'");
          let s2 = t2[i2.level];
          s2 ? s2.unshift(i2.tokenizer) : t2[i2.level] = [i2.tokenizer], i2.start && (i2.level === "block" ? t2.startBlock ? t2.startBlock.push(i2.start) : t2.startBlock = [i2.start] : i2.level === "inline" && (t2.startInline ? t2.startInline.push(i2.start) : t2.startInline = [i2.start]));
        }
        "childTokens" in i2 && i2.childTokens && (t2.childTokens[i2.name] = i2.childTokens);
      }), r2.extensions = t2), n3.renderer) {
        let i2 = this.defaults.renderer || new P(this.defaults);
        for (let s2 in n3.renderer) {
          if (!(s2 in i2))
            throw new Error(`renderer '${s2}' does not exist`);
          if (["options", "parser"].includes(s2))
            continue;
          let o2 = s2, a2 = n3.renderer[o2], l2 = i2[o2];
          i2[o2] = (...c2) => {
            let p2 = a2.apply(i2, c2);
            return p2 === false && (p2 = l2.apply(i2, c2)), p2 || "";
          };
        }
        r2.renderer = i2;
      }
      if (n3.tokenizer) {
        let i2 = this.defaults.tokenizer || new y(this.defaults);
        for (let s2 in n3.tokenizer) {
          if (!(s2 in i2))
            throw new Error(`tokenizer '${s2}' does not exist`);
          if (["options", "rules", "lexer"].includes(s2))
            continue;
          let o2 = s2, a2 = n3.tokenizer[o2], l2 = i2[o2];
          i2[o2] = (...c2) => {
            let p2 = a2.apply(i2, c2);
            return p2 === false && (p2 = l2.apply(i2, c2)), p2;
          };
        }
        r2.tokenizer = i2;
      }
      if (n3.hooks) {
        let i2 = this.defaults.hooks || new S();
        for (let s2 in n3.hooks) {
          if (!(s2 in i2))
            throw new Error(`hook '${s2}' does not exist`);
          if (["options", "block"].includes(s2))
            continue;
          let o2 = s2, a2 = n3.hooks[o2], l2 = i2[o2];
          S.passThroughHooks.has(s2) ? i2[o2] = (c2) => {
            if (this.defaults.async && S.passThroughHooksRespectAsync.has(s2))
              return (async () => {
                let g2 = await a2.call(i2, c2);
                return l2.call(i2, g2);
              })();
            let p2 = a2.call(i2, c2);
            return l2.call(i2, p2);
          } : i2[o2] = (...c2) => {
            if (this.defaults.async)
              return (async () => {
                let g2 = await a2.apply(i2, c2);
                return g2 === false && (g2 = await l2.apply(i2, c2)), g2;
              })();
            let p2 = a2.apply(i2, c2);
            return p2 === false && (p2 = l2.apply(i2, c2)), p2;
          };
        }
        r2.hooks = i2;
      }
      if (n3.walkTokens) {
        let i2 = this.defaults.walkTokens, s2 = n3.walkTokens;
        r2.walkTokens = function(o2) {
          let a2 = [];
          return a2.push(s2.call(this, o2)), i2 && (a2 = a2.concat(i2.call(this, o2))), a2;
        };
      }
      this.defaults = { ...this.defaults, ...r2 };
    }), this;
  }
  setOptions(e2) {
    return this.defaults = { ...this.defaults, ...e2 }, this;
  }
  lexer(e2, t2) {
    return x.lex(e2, t2 ?? this.defaults);
  }
  parser(e2, t2) {
    return b.parse(e2, t2 ?? this.defaults);
  }
  parseMarkdown(e2) {
    return (n3, r2) => {
      let i2 = { ...r2 }, s2 = { ...this.defaults, ...i2 }, o2 = this.onError(!!s2.silent, !!s2.async);
      if (this.defaults.async === true && i2.async === false)
        return o2(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof n3 > "u" || n3 === null)
        return o2(new Error("marked(): input parameter is undefined or null"));
      if (typeof n3 != "string")
        return o2(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n3) + ", string expected"));
      if (s2.hooks && (s2.hooks.options = s2, s2.hooks.block = e2), s2.async)
        return (async () => {
          let a2 = s2.hooks ? await s2.hooks.preprocess(n3) : n3, c2 = await (s2.hooks ? await s2.hooks.provideLexer() : e2 ? x.lex : x.lexInline)(a2, s2), p2 = s2.hooks ? await s2.hooks.processAllTokens(c2) : c2;
          s2.walkTokens && await Promise.all(this.walkTokens(p2, s2.walkTokens));
          let d2 = await (s2.hooks ? await s2.hooks.provideParser() : e2 ? b.parse : b.parseInline)(p2, s2);
          return s2.hooks ? await s2.hooks.postprocess(d2) : d2;
        })().catch(o2);
      try {
        s2.hooks && (n3 = s2.hooks.preprocess(n3));
        let l2 = (s2.hooks ? s2.hooks.provideLexer() : e2 ? x.lex : x.lexInline)(n3, s2);
        s2.hooks && (l2 = s2.hooks.processAllTokens(l2)), s2.walkTokens && this.walkTokens(l2, s2.walkTokens);
        let p2 = (s2.hooks ? s2.hooks.provideParser() : e2 ? b.parse : b.parseInline)(l2, s2);
        return s2.hooks && (p2 = s2.hooks.postprocess(p2)), p2;
      } catch (a2) {
        return o2(a2);
      }
    };
  }
  onError(e2, t2) {
    return (n3) => {
      if (n3.message += `
Please report this to https://github.com/markedjs/marked.`, e2) {
        let r2 = "<p>An error occurred:</p><pre>" + w(n3.message + "", true) + "</pre>";
        return t2 ? Promise.resolve(r2) : r2;
      }
      if (t2)
        return Promise.reject(n3);
      throw n3;
    };
  }
}, "B");
var _ = new B();
function k(u4, e2) {
  return _.parse(u4, e2);
}
__name(k, "k");
k.options = k.setOptions = function(u4) {
  return _.setOptions(u4), k.defaults = _.defaults, G(k.defaults), k;
};
k.getDefaults = L;
k.defaults = T;
k.use = function(...u4) {
  return _.use(...u4), k.defaults = _.defaults, G(k.defaults), k;
};
k.walkTokens = function(u4, e2) {
  return _.walkTokens(u4, e2);
};
k.parseInline = _.parseInline;
k.Parser = b;
k.parser = b.parse;
k.Renderer = P;
k.TextRenderer = $;
k.Lexer = x;
k.lexer = x.lex;
k.Tokenizer = y;
k.Hooks = S;
k.parse = k;
var Ht = k.options;
var Zt = k.setOptions;
var Gt = k.use;
var Nt = k.walkTokens;
var Ft = k.parseInline;
var Qt = b.parse;
var Ut = x.lex;

// src/lib/browser-client.ts
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/puppeteer-cloudflare.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/cloudflare/PuppeteerWorkers.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Puppeteer.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/BrowserConnector.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/environment.js
init_checked_fetch();
init_modules_watch_stub();
var isNode = !!(typeof process !== "undefined" && process.version);
var DEFERRED_PROMISE_DEBUG_TIMEOUT = typeof process !== "undefined" && typeof process.env["PUPPETEER_DEFERRED_PROMISE_DEBUG_TIMEOUT"] !== "undefined" ? Number(process.env["PUPPETEER_DEFERRED_PROMISE_DEBUG_TIMEOUT"]) : -1;

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/util/assert.js
init_checked_fetch();
init_modules_watch_stub();
var assert = /* @__PURE__ */ __name((value, message) => {
  if (!value) {
    throw new Error(message);
  }
}, "assert");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/util/ErrorLike.js
init_checked_fetch();
init_modules_watch_stub();
function isErrorLike(obj) {
  return typeof obj === "object" && obj !== null && "name" in obj && "message" in obj;
}
__name(isErrorLike, "isErrorLike");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Browser.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/api/Browser.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/EventEmitter.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/third_party/mitt/index.js
init_checked_fetch();
init_modules_watch_stub();
function n(n3) {
  return { all: n3 = n3 || /* @__PURE__ */ new Map(), on: function(t2, e2) {
    var i2 = n3.get(t2);
    i2 ? i2.push(e2) : n3.set(t2, [e2]);
  }, off: function(t2, e2) {
    var i2 = n3.get(t2);
    i2 && (e2 ? i2.splice(i2.indexOf(e2) >>> 0, 1) : n3.set(t2, []));
  }, emit: function(t2, e2) {
    var i2 = n3.get(t2);
    i2 && i2.slice().map(function(n4) {
      n4(e2);
    }), (i2 = n3.get("*")) && i2.slice().map(function(n4) {
      n4(t2, e2);
    });
  } };
}
__name(n, "n");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/EventEmitter.js
var EventEmitter = class {
  emitter;
  eventsMap = /* @__PURE__ */ new Map();
  /**
   * @internal
   */
  constructor() {
    this.emitter = n(this.eventsMap);
  }
  /**
   * Bind an event listener to fire when an event occurs.
   * @param event - the event type you'd like to listen to. Can be a string or symbol.
   * @param handler - the function to be called when the event occurs.
   * @returns `this` to enable you to chain method calls.
   */
  on(event, handler) {
    this.emitter.on(event, handler);
    return this;
  }
  /**
   * Remove an event listener from firing.
   * @param event - the event type you'd like to stop listening to.
   * @param handler - the function that should be removed.
   * @returns `this` to enable you to chain method calls.
   */
  off(event, handler) {
    this.emitter.off(event, handler);
    return this;
  }
  /**
   * Remove an event listener.
   * @deprecated please use {@link EventEmitter.off} instead.
   */
  removeListener(event, handler) {
    this.off(event, handler);
    return this;
  }
  /**
   * Add an event listener.
   * @deprecated please use {@link EventEmitter.on} instead.
   */
  addListener(event, handler) {
    this.on(event, handler);
    return this;
  }
  /**
   * Emit an event and call any associated listeners.
   *
   * @param event - the event you'd like to emit
   * @param eventData - any data you'd like to emit with the event
   * @returns `true` if there are any listeners, `false` if there are not.
   */
  emit(event, eventData) {
    this.emitter.emit(event, eventData);
    return this.eventListenersCount(event) > 0;
  }
  /**
   * Like `on` but the listener will only be fired once and then it will be removed.
   * @param event - the event you'd like to listen to
   * @param handler - the handler function to run when the event occurs
   * @returns `this` to enable you to chain method calls.
   */
  once(event, handler) {
    const onceHandler = /* @__PURE__ */ __name((eventData) => {
      handler(eventData);
      this.off(event, onceHandler);
    }, "onceHandler");
    return this.on(event, onceHandler);
  }
  /**
   * Gets the number of listeners for a given event.
   *
   * @param event - the event to get the listener count for
   * @returns the number of listeners bound to the given event
   */
  listenerCount(event) {
    return this.eventListenersCount(event);
  }
  /**
   * Removes all listeners. If given an event argument, it will remove only
   * listeners for that event.
   * @param event - the event to remove listeners for.
   * @returns `this` to enable you to chain method calls.
   */
  removeAllListeners(event) {
    if (event) {
      this.eventsMap.delete(event);
    } else {
      this.eventsMap.clear();
    }
    return this;
  }
  eventListenersCount(event) {
    return this.eventsMap.get(event)?.length || 0;
  }
};
__name(EventEmitter, "EventEmitter");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/util.js
init_checked_fetch();
init_modules_watch_stub();
import { Buffer as Buffer2 } from "node:buffer";

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/util/Deferred.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Errors.js
init_checked_fetch();
init_modules_watch_stub();
var CustomError = class extends Error {
  /**
   * @internal
   */
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
};
__name(CustomError, "CustomError");
var TimeoutError = class extends CustomError {
};
__name(TimeoutError, "TimeoutError");
var ProtocolError = class extends CustomError {
  #code;
  #originalMessage = "";
  set code(code) {
    this.#code = code;
  }
  /**
   * @readonly
   * @public
   */
  get code() {
    return this.#code;
  }
  set originalMessage(originalMessage) {
    this.#originalMessage = originalMessage;
  }
  /**
   * @readonly
   * @public
   */
  get originalMessage() {
    return this.#originalMessage;
  }
};
__name(ProtocolError, "ProtocolError");
var TargetCloseError = class extends ProtocolError {
};
__name(TargetCloseError, "TargetCloseError");
var errors = Object.freeze({
  TimeoutError,
  ProtocolError
});

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/util/Deferred.js
var Deferred = class {
  #isResolved = false;
  #isRejected = false;
  #value;
  #resolver = () => {
  };
  #taskPromise = new Promise((resolve) => {
    this.#resolver = resolve;
  });
  #timeoutId;
  constructor(opts) {
    this.#timeoutId = opts && opts.timeout > 0 ? setTimeout(() => {
      this.reject(new TimeoutError(opts.message));
    }, opts.timeout) : void 0;
  }
  #finish(value) {
    clearTimeout(this.#timeoutId);
    this.#value = value;
    this.#resolver();
  }
  resolve(value) {
    if (this.#isRejected || this.#isResolved) {
      return;
    }
    this.#isResolved = true;
    this.#finish(value);
  }
  reject(error) {
    if (this.#isRejected || this.#isResolved) {
      return;
    }
    this.#isRejected = true;
    this.#finish(error);
  }
  resolved() {
    return this.#isResolved;
  }
  finished() {
    return this.#isResolved || this.#isRejected;
  }
  value() {
    return this.#value;
  }
  async valueOrThrow() {
    await this.#taskPromise;
    if (this.#isRejected) {
      throw this.#value;
    }
    return this.#value;
  }
  static create(opts) {
    return new Deferred(opts);
  }
  static async race(awaitables) {
    const deferredWithTimeout = /* @__PURE__ */ new Set();
    try {
      const promises = awaitables.map((value) => {
        if (value instanceof Deferred) {
          if (value.#timeoutId) {
            deferredWithTimeout.add(value);
          }
          return value.valueOrThrow();
        }
        return value;
      });
      return await Promise.race(promises);
    } finally {
      for (const deferred of deferredWithTimeout) {
        deferred.reject(new Error("Timeout cleared"));
      }
    }
  }
};
__name(Deferred, "Deferred");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Debug.js
init_checked_fetch();
init_modules_watch_stub();
var debugModule = null;
async function importDebug() {
  if (!debugModule) {
    debugModule = (await Promise.resolve().then(() => __toESM(require_browser(), 1))).default;
  }
  return debugModule;
}
__name(importDebug, "importDebug");
var debug = /* @__PURE__ */ __name((prefix) => {
  if (isNode) {
    return async (...logArgs) => {
      if (captureLogs) {
        capturedLogs.push(prefix + logArgs);
      }
      (await importDebug())(prefix)(logArgs);
    };
  }
  return (...logArgs) => {
    const debugLevel = globalThis.__PUPPETEER_DEBUG;
    if (!debugLevel) {
      return;
    }
    const everythingShouldBeLogged = debugLevel === "*";
    const prefixMatchesDebugLevel = everythingShouldBeLogged || /**
     * If the debug level is `foo*`, that means we match any prefix that
     * starts with `foo`. If the level is `foo`, we match only the prefix
     * `foo`.
     */
    (debugLevel.endsWith("*") ? prefix.startsWith(debugLevel) : prefix === debugLevel);
    if (!prefixMatchesDebugLevel) {
      return;
    }
    console.log(`${prefix}:`, ...logArgs);
  };
}, "debug");
var capturedLogs = [];
var captureLogs = false;

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/ElementHandle.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/api/ElementHandle.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/GetQueryHandler.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/AriaQueryHandler.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/util/AsyncIterableUtil.js
init_checked_fetch();
init_modules_watch_stub();
var AsyncIterableUtil = class {
  static async *map(iterable, map) {
    for await (const value of iterable) {
      yield await map(value);
    }
  }
  static async *flatMap(iterable, map) {
    for await (const value of iterable) {
      yield* map(value);
    }
  }
  static async collect(iterable) {
    const result = [];
    for await (const value of iterable) {
      result.push(value);
    }
    return result;
  }
  static async first(iterable) {
    for await (const value of iterable) {
      return value;
    }
    return;
  }
};
__name(AsyncIterableUtil, "AsyncIterableUtil");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/QueryHandler.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/util/Function.js
init_checked_fetch();
init_modules_watch_stub();
var createdFunctions = /* @__PURE__ */ new Map();
var createFunction = /* @__PURE__ */ __name((functionValue) => {
  let fn2 = createdFunctions.get(functionValue);
  if (fn2) {
    return fn2;
  }
  fn2 = new Function(`return ${functionValue}`)();
  createdFunctions.set(functionValue, fn2);
  return fn2;
}, "createFunction");
function stringifyFunction(fn2) {
  const value = fn2.toString();
  return value;
}
__name(stringifyFunction, "stringifyFunction");
var interpolateFunction = /* @__PURE__ */ __name((fn2, replacements) => {
  let value = stringifyFunction(fn2);
  for (const [name, jsValue] of Object.entries(replacements)) {
    value = value.replace(
      new RegExp(`PLACEHOLDER\\(\\s*(?:'${name}'|"${name}")\\s*\\)`, "g"),
      // Wrapping this ensures tersers that accidently inline PLACEHOLDER calls
      // are still valid. Without, we may get calls like ()=>{...}() which is
      // not valid.
      `(${jsValue})`
    );
  }
  return createFunction(value);
}, "interpolateFunction");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/HandleIterator.js
init_checked_fetch();
init_modules_watch_stub();
var DEFAULT_BATCH_SIZE = 20;
async function* fastTransposeIteratorHandle(iterator, size) {
  const array = await iterator.evaluateHandle(async (iterator2, size2) => {
    const results = [];
    while (results.length < size2) {
      const result = await iterator2.next();
      if (result.done) {
        break;
      }
      results.push(result.value);
    }
    return results;
  }, size);
  const properties = await array.getProperties();
  await array.dispose();
  yield* properties.values();
  return properties.size === 0;
}
__name(fastTransposeIteratorHandle, "fastTransposeIteratorHandle");
async function* transposeIteratorHandle(iterator) {
  let size = DEFAULT_BATCH_SIZE;
  try {
    while (!(yield* fastTransposeIteratorHandle(iterator, size))) {
      size <<= 1;
    }
  } finally {
    await iterator.dispose();
  }
}
__name(transposeIteratorHandle, "transposeIteratorHandle");
async function* transposeIterableHandle(handle) {
  yield* transposeIteratorHandle(await handle.evaluateHandle((iterable) => {
    return async function* () {
      yield* iterable;
    }();
  }));
}
__name(transposeIterableHandle, "transposeIterableHandle");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/LazyArg.js
init_checked_fetch();
init_modules_watch_stub();
var _get;
var _LazyArg = class {
  constructor(get) {
    __privateAdd(this, _get, void 0);
    __privateSet(this, _get, get);
  }
  async get(context) {
    return __privateGet(this, _get).call(this, context);
  }
};
var LazyArg = _LazyArg;
__name(LazyArg, "LazyArg");
_get = new WeakMap();
__publicField(LazyArg, "create", (get) => {
  return new _LazyArg(get);
});

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/QueryHandler.js
var QueryHandler = class {
  static get _querySelector() {
    if (this.querySelector) {
      return this.querySelector;
    }
    if (!this.querySelectorAll) {
      throw new Error("Cannot create default `querySelector`.");
    }
    return this.querySelector = interpolateFunction(async (node, selector, PuppeteerUtil) => {
      const querySelectorAll = PLACEHOLDER("querySelectorAll");
      const results = querySelectorAll(node, selector, PuppeteerUtil);
      for await (const result of results) {
        return result;
      }
      return null;
    }, {
      querySelectorAll: stringifyFunction(this.querySelectorAll)
    });
  }
  static get _querySelectorAll() {
    if (this.querySelectorAll) {
      return this.querySelectorAll;
    }
    if (!this.querySelector) {
      throw new Error("Cannot create default `querySelectorAll`.");
    }
    return this.querySelectorAll = interpolateFunction(async function* (node, selector, PuppeteerUtil) {
      const querySelector = PLACEHOLDER("querySelector");
      const result = await querySelector(node, selector, PuppeteerUtil);
      if (result) {
        yield result;
      }
    }, {
      querySelector: stringifyFunction(this.querySelector)
    });
  }
  /**
   * Queries for multiple nodes given a selector and {@link ElementHandle}.
   *
   * Akin to {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll | Document.querySelectorAll()}.
   */
  static async *queryAll(element, selector) {
    element.assertElementHasWorld();
    const handle = await element.evaluateHandle(this._querySelectorAll, selector, LazyArg.create((context) => {
      return context.puppeteerUtil;
    }));
    yield* transposeIterableHandle(handle);
  }
  /**
   * Queries for a single node given a selector and {@link ElementHandle}.
   *
   * Akin to {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector}.
   */
  static async queryOne(element, selector) {
    element.assertElementHasWorld();
    const result = await element.evaluateHandle(this._querySelector, selector, LazyArg.create((context) => {
      return context.puppeteerUtil;
    }));
    if (!(result instanceof ElementHandle)) {
      await result.dispose();
      return null;
    }
    return result;
  }
  /**
   * Waits until a single node appears for a given selector and
   * {@link ElementHandle}.
   *
   * This will always query the handle in the Puppeteer world and migrate the
   * result to the main world.
   */
  static async waitFor(elementOrFrame, selector, options) {
    let frame;
    let element;
    if (!(elementOrFrame instanceof ElementHandle)) {
      frame = elementOrFrame;
    } else {
      frame = elementOrFrame.frame;
      element = await frame.isolatedRealm().adoptHandle(elementOrFrame);
    }
    const { visible = false, hidden = false, timeout, signal } = options;
    try {
      signal?.throwIfAborted();
      const handle = await frame.isolatedRealm().waitForFunction(async (PuppeteerUtil, query, selector2, root, visible2) => {
        const querySelector = PuppeteerUtil.createFunction(query);
        const node = await querySelector(root ?? document, selector2, PuppeteerUtil);
        return PuppeteerUtil.checkVisibility(node, visible2);
      }, {
        polling: visible || hidden ? "raf" : "mutation",
        root: element,
        timeout,
        signal
      }, LazyArg.create((context) => {
        return context.puppeteerUtil;
      }), stringifyFunction(this._querySelector), selector, element, visible ? true : hidden ? false : void 0);
      if (signal?.aborted) {
        await handle.dispose();
        throw signal.reason;
      }
      if (!(handle instanceof ElementHandle)) {
        await handle.dispose();
        return null;
      }
      return frame.mainRealm().transferHandle(handle);
    } catch (error) {
      if (!isErrorLike(error)) {
        throw error;
      }
      if (error.name === "AbortError") {
        throw error;
      }
      error.message = `Waiting for selector \`${selector}\` failed: ${error.message}`;
      throw error;
    } finally {
      if (element) {
        await element.dispose();
      }
    }
  }
};
__name(QueryHandler, "QueryHandler");
// Either one of these may be implemented, but at least one must be.
__publicField(QueryHandler, "querySelectorAll");
__publicField(QueryHandler, "querySelector");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/AriaQueryHandler.js
var queryAXTree = /* @__PURE__ */ __name(async (client, element, accessibleName, role) => {
  const { nodes } = await client.send("Accessibility.queryAXTree", {
    objectId: element.id,
    accessibleName,
    role
  });
  return nodes.filter((node) => {
    return !node.role || node.role.value !== "StaticText";
  });
}, "queryAXTree");
var KNOWN_ATTRIBUTES = Object.freeze(["name", "role"]);
var isKnownAttribute = /* @__PURE__ */ __name((attribute) => {
  return KNOWN_ATTRIBUTES.includes(attribute);
}, "isKnownAttribute");
var normalizeValue = /* @__PURE__ */ __name((value) => {
  return value.replace(/ +/g, " ").trim();
}, "normalizeValue");
var ATTRIBUTE_REGEXP = /\[\s*(?<attribute>\w+)\s*=\s*(?<quote>"|')(?<value>\\.|.*?(?=\k<quote>))\k<quote>\s*\]/g;
var parseARIASelector = /* @__PURE__ */ __name((selector) => {
  const queryOptions = {};
  const defaultName = selector.replace(ATTRIBUTE_REGEXP, (_3, attribute, __, value) => {
    attribute = attribute.trim();
    assert(isKnownAttribute(attribute), `Unknown aria attribute "${attribute}" in selector`);
    queryOptions[attribute] = normalizeValue(value);
    return "";
  });
  if (defaultName && !queryOptions.name) {
    queryOptions.name = normalizeValue(defaultName);
  }
  return queryOptions;
}, "parseARIASelector");
var _ARIAQueryHandler = class extends QueryHandler {
  static async *queryAll(element, selector) {
    const context = element.executionContext();
    const { name, role } = parseARIASelector(selector);
    const results = await queryAXTree(context._client, element, name, role);
    const world = context._world;
    yield* AsyncIterableUtil.map(results, (node) => {
      return world.adoptBackendNode(node.backendDOMNodeId);
    });
  }
};
var ARIAQueryHandler = _ARIAQueryHandler;
__name(ARIAQueryHandler, "ARIAQueryHandler");
__publicField(ARIAQueryHandler, "querySelector", async (node, selector, { ariaQuerySelector }) => {
  return ariaQuerySelector(node, selector);
});
__publicField(ARIAQueryHandler, "queryOne", async (element, selector) => {
  return await AsyncIterableUtil.first(_ARIAQueryHandler.queryAll(element, selector)) ?? null;
});

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/CustomQueryHandler.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/ScriptInjector.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/generated/injected.js
init_checked_fetch();
init_modules_watch_stub();
var source = '"use strict";var C=Object.defineProperty;var ne=Object.getOwnPropertyDescriptor;var oe=Object.getOwnPropertyNames;var se=Object.prototype.hasOwnProperty;var u=(t,e)=>{for(var n in e)C(t,n,{get:e[n],enumerable:!0})},ie=(t,e,n,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of oe(e))!se.call(t,o)&&o!==n&&C(t,o,{get:()=>e[o],enumerable:!(r=ne(e,o))||r.enumerable});return t};var le=t=>ie(C({},"__esModule",{value:!0}),t);var Oe={};u(Oe,{default:()=>Re});module.exports=le(Oe);var T=class extends Error{constructor(e){super(e),this.name=this.constructor.name,Error.captureStackTrace(this,this.constructor)}},S=class extends T{},I=class extends T{#e;#t="";set code(e){this.#e=e}get code(){return this.#e}set originalMessage(e){this.#t=e}get originalMessage(){return this.#t}};var qe=Object.freeze({TimeoutError:S,ProtocolError:I});var f=class t{#e=!1;#t=!1;#n;#r=()=>{};#o=new Promise(e=>{this.#r=e});#s;constructor(e){this.#s=e&&e.timeout>0?setTimeout(()=>{this.reject(new S(e.message))},e.timeout):void 0}#i(e){clearTimeout(this.#s),this.#n=e,this.#r()}resolve(e){this.#t||this.#e||(this.#e=!0,this.#i(e))}reject(e){this.#t||this.#e||(this.#t=!0,this.#i(e))}resolved(){return this.#e}finished(){return this.#e||this.#t}value(){return this.#n}async valueOrThrow(){if(await this.#o,this.#t)throw this.#n;return this.#n}static create(e){return new t(e)}static async race(e){let n=new Set;try{let r=e.map(o=>o instanceof t?(o.#s&&n.add(o),o.valueOrThrow()):o);return await Promise.race(r)}finally{for(let r of n)r.reject(new Error("Timeout cleared"))}}};var G=new Map,X=t=>{let e=G.get(t);return e||(e=new Function(`return ${t}`)(),G.set(t,e),e)};var R={};u(R,{ariaQuerySelector:()=>ae,ariaQuerySelectorAll:()=>k});var ae=(t,e)=>window.__ariaQuerySelector(t,e),k=async function*(t,e){yield*await window.__ariaQuerySelectorAll(t,e)};var q={};u(q,{customQuerySelectors:()=>M});var O=class{#e=new Map;register(e,n){if(!n.queryOne&&n.queryAll){let r=n.queryAll;n.queryOne=(o,i)=>{for(let s of r(o,i))return s;return null}}else if(n.queryOne&&!n.queryAll){let r=n.queryOne;n.queryAll=(o,i)=>{let s=r(o,i);return s?[s]:[]}}else if(!n.queryOne||!n.queryAll)throw new Error("At least one query method must be defined.");this.#e.set(e,{querySelector:n.queryOne,querySelectorAll:n.queryAll})}unregister(e){this.#e.delete(e)}get(e){return this.#e.get(e)}clear(){this.#e.clear()}},M=new O;var D={};u(D,{pierceQuerySelector:()=>ce,pierceQuerySelectorAll:()=>ue});var ce=(t,e)=>{let n=null,r=o=>{let i=document.createTreeWalker(o,NodeFilter.SHOW_ELEMENT);do{let s=i.currentNode;s.shadowRoot&&r(s.shadowRoot),!(s instanceof ShadowRoot)&&s!==o&&!n&&s.matches(e)&&(n=s)}while(!n&&i.nextNode())};return t instanceof Document&&(t=t.documentElement),r(t),n},ue=(t,e)=>{let n=[],r=o=>{let i=document.createTreeWalker(o,NodeFilter.SHOW_ELEMENT);do{let s=i.currentNode;s.shadowRoot&&r(s.shadowRoot),!(s instanceof ShadowRoot)&&s!==o&&s.matches(e)&&n.push(s)}while(i.nextNode())};return t instanceof Document&&(t=t.documentElement),r(t),n};var m=(t,e)=>{if(!t)throw new Error(e)};var P=class{#e;#t;#n;#r;constructor(e,n){this.#e=e,this.#t=n}async start(){let e=this.#r=f.create(),n=await this.#e();if(n){e.resolve(n);return}this.#n=new MutationObserver(async()=>{let r=await this.#e();r&&(e.resolve(r),await this.stop())}),this.#n.observe(this.#t,{childList:!0,subtree:!0,attributes:!0})}async stop(){m(this.#r,"Polling never started."),this.#r.finished()||this.#r.reject(new Error("Polling stopped")),this.#n&&(this.#n.disconnect(),this.#n=void 0)}result(){return m(this.#r,"Polling never started."),this.#r.valueOrThrow()}},E=class{#e;#t;constructor(e){this.#e=e}async start(){let e=this.#t=f.create(),n=await this.#e();if(n){e.resolve(n);return}let r=async()=>{if(e.finished())return;let o=await this.#e();if(!o){window.requestAnimationFrame(r);return}e.resolve(o),await this.stop()};window.requestAnimationFrame(r)}async stop(){m(this.#t,"Polling never started."),this.#t.finished()||this.#t.reject(new Error("Polling stopped"))}result(){return m(this.#t,"Polling never started."),this.#t.valueOrThrow()}},N=class{#e;#t;#n;#r;constructor(e,n){this.#e=e,this.#t=n}async start(){let e=this.#r=f.create(),n=await this.#e();if(n){e.resolve(n);return}this.#n=setInterval(async()=>{let r=await this.#e();r&&(e.resolve(r),await this.stop())},this.#t)}async stop(){m(this.#r,"Polling never started."),this.#r.finished()||this.#r.reject(new Error("Polling stopped")),this.#n&&(clearInterval(this.#n),this.#n=void 0)}result(){return m(this.#r,"Polling never started."),this.#r.valueOrThrow()}};var H={};u(H,{pQuerySelector:()=>Ie,pQuerySelectorAll:()=>re});var c=class{static async*map(e,n){for await(let r of e)yield await n(r)}static async*flatMap(e,n){for await(let r of e)yield*n(r)}static async collect(e){let n=[];for await(let r of e)n.push(r);return n}static async first(e){for await(let n of e)return n}};var p={attribute:/\\[\\s*(?:(?<namespace>\\*|[-\\w\\P{ASCII}]*)\\|)?(?<name>[-\\w\\P{ASCII}]+)\\s*(?:(?<operator>\\W?=)\\s*(?<value>.+?)\\s*(\\s(?<caseSensitive>[iIsS]))?\\s*)?\\]/gu,id:/#(?<name>[-\\w\\P{ASCII}]+)/gu,class:/\\.(?<name>[-\\w\\P{ASCII}]+)/gu,comma:/\\s*,\\s*/g,combinator:/\\s*[\\s>+~]\\s*/g,"pseudo-element":/::(?<name>[-\\w\\P{ASCII}]+)(?:\\((?<argument>\xB6+)\\))?/gu,"pseudo-class":/:(?<name>[-\\w\\P{ASCII}]+)(?:\\((?<argument>\xB6+)\\))?/gu,universal:/(?:(?<namespace>\\*|[-\\w\\P{ASCII}]*)\\|)?\\*/gu,type:/(?:(?<namespace>\\*|[-\\w\\P{ASCII}]*)\\|)?(?<name>[-\\w\\P{ASCII}]+)/gu},fe=new Set(["combinator","comma"]);var de=t=>{switch(t){case"pseudo-element":case"pseudo-class":return new RegExp(p[t].source.replace("(?<argument>\\xB6+)","(?<argument>.+)"),"gu");default:return p[t]}};function me(t,e){let n=0,r="";for(;e<t.length;e++){let o=t[e];switch(o){case"(":++n;break;case")":--n;break}if(r+=o,n===0)return r}return r}function he(t,e=p){if(!t)return[];let n=[t];for(let[o,i]of Object.entries(e))for(let s=0;s<n.length;s++){let l=n[s];if(typeof l!="string")continue;i.lastIndex=0;let a=i.exec(l);if(!a)continue;let h=a.index-1,d=[],V=a[0],B=l.slice(0,h+1);B&&d.push(B),d.push({...a.groups,type:o,content:V});let z=l.slice(h+V.length+1);z&&d.push(z),n.splice(s,1,...d)}let r=0;for(let o of n)switch(typeof o){case"string":throw new Error(`Unexpected sequence ${o} found at index ${r}`);case"object":r+=o.content.length,o.pos=[r-o.content.length,r],fe.has(o.type)&&(o.content=o.content.trim()||" ");break}return n}var pe=/([\'"])([^\\\\\\n]+?)\\1/g,ge=/\\\\./g;function K(t,e=p){if(t=t.trim(),t==="")return[];let n=[];t=t.replace(ge,(i,s)=>(n.push({value:i,offset:s}),"\\uE000".repeat(i.length))),t=t.replace(pe,(i,s,l,a)=>(n.push({value:i,offset:a}),`${s}${"\\uE001".repeat(l.length)}${s}`));{let i=0,s;for(;(s=t.indexOf("(",i))>-1;){let l=me(t,s);n.push({value:l,offset:s}),t=`${t.substring(0,s)}(${"\\xB6".repeat(l.length-2)})${t.substring(s+l.length)}`,i=s+l.length}}let r=he(t,e),o=new Set;for(let i of n.reverse())for(let s of r){let{offset:l,value:a}=i;if(!(s.pos[0]<=l&&l+a.length<=s.pos[1]))continue;let{content:h}=s,d=l-s.pos[0];s.content=h.slice(0,d)+a+h.slice(d+a.length),s.content!==h&&o.add(s)}for(let i of o){let s=de(i.type);if(!s)throw new Error(`Unknown token type: ${i.type}`);s.lastIndex=0;let l=s.exec(i.content);if(!l)throw new Error(`Unable to parse content for ${i.type}: ${i.content}`);Object.assign(i,l.groups)}return r}function*x(t,e){switch(t.type){case"list":for(let n of t.list)yield*x(n,t);break;case"complex":yield*x(t.left,t),yield*x(t.right,t);break;case"compound":yield*t.list.map(n=>[n,t]);break;default:yield[t,e]}}function g(t){let e;return Array.isArray(t)?e=t:e=[...x(t)].map(([n])=>n),e.map(n=>n.content).join("")}p.combinator=/\\s*(>>>>?|[\\s>+~])\\s*/g;var ye=/\\\\[\\s\\S]/g,we=t=>t.length<=1?t:((t[0]===\'"\'||t[0]==="\'")&&t.endsWith(t[0])&&(t=t.slice(1,-1)),t.replace(ye,e=>e[1]));function Y(t){let e=!0,n=K(t);if(n.length===0)return[[],e];let r=[],o=[r],i=[o],s=[];for(let l of n){switch(l.type){case"combinator":switch(l.content){case">>>":e=!1,s.length&&(r.push(g(s)),s.splice(0)),r=[],o.push(">>>"),o.push(r);continue;case">>>>":e=!1,s.length&&(r.push(g(s)),s.splice(0)),r=[],o.push(">>>>"),o.push(r);continue}break;case"pseudo-element":if(!l.name.startsWith("-p-"))break;e=!1,s.length&&(r.push(g(s)),s.splice(0)),r.push({name:l.name.slice(3),value:we(l.argument??"")});continue;case"comma":s.length&&(r.push(g(s)),s.splice(0)),r=[],o=[r],i.push(o);continue}s.push(l)}return s.length&&r.push(g(s)),[i,e]}var Q={};u(Q,{textQuerySelectorAll:()=>b});var Se=new Set(["checkbox","image","radio"]),be=t=>t instanceof HTMLSelectElement||t instanceof HTMLTextAreaElement||t instanceof HTMLInputElement&&!Se.has(t.type),Te=new Set(["SCRIPT","STYLE"]),w=t=>!Te.has(t.nodeName)&&!document.head?.contains(t),_=new WeakMap,Z=t=>{for(;t;)_.delete(t),t instanceof ShadowRoot?t=t.host:t=t.parentNode},J=new WeakSet,Pe=new MutationObserver(t=>{for(let e of t)Z(e.target)}),y=t=>{let e=_.get(t);if(e||(e={full:"",immediate:[]},!w(t)))return e;let n="";if(be(t))e.full=t.value,e.immediate.push(t.value),t.addEventListener("input",r=>{Z(r.target)},{once:!0,capture:!0});else{for(let r=t.firstChild;r;r=r.nextSibling){if(r.nodeType===Node.TEXT_NODE){e.full+=r.nodeValue??"",n+=r.nodeValue??"";continue}n&&e.immediate.push(n),n="",r.nodeType===Node.ELEMENT_NODE&&(e.full+=y(r).full)}n&&e.immediate.push(n),t instanceof Element&&t.shadowRoot&&(e.full+=y(t.shadowRoot).full),J.has(t)||(Pe.observe(t,{childList:!0,characterData:!0}),J.add(t))}return _.set(t,e),e};var b=function*(t,e){let n=!1;for(let r of t.childNodes)if(r instanceof Element&&w(r)){let o;r.shadowRoot?o=b(r.shadowRoot,e):o=b(r,e);for(let i of o)yield i,n=!0}n||t instanceof Element&&w(t)&&y(t).full.includes(e)&&(yield t)};var U={};u(U,{checkVisibility:()=>Ne,pierce:()=>A,pierceAll:()=>L});var Ee=["hidden","collapse"],Ne=(t,e)=>{if(!t)return e===!1;if(e===void 0)return t;let n=t.nodeType===Node.TEXT_NODE?t.parentElement:t,r=window.getComputedStyle(n),o=r&&!Ee.includes(r.visibility)&&!xe(n);return e===o?t:!1};function xe(t){let e=t.getBoundingClientRect();return e.width===0||e.height===0}var Ae=t=>"shadowRoot"in t&&t.shadowRoot instanceof ShadowRoot;function*A(t){Ae(t)?yield t.shadowRoot:yield t}function*L(t){t=A(t).next().value,yield t;let e=[document.createTreeWalker(t,NodeFilter.SHOW_ELEMENT)];for(let n of e){let r;for(;r=n.nextNode();)r.shadowRoot&&(yield r.shadowRoot,e.push(document.createTreeWalker(r.shadowRoot,NodeFilter.SHOW_ELEMENT)))}}var $={};u($,{xpathQuerySelectorAll:()=>j});var j=function*(t,e){let r=(t.ownerDocument||document).evaluate(e,t,null,XPathResult.ORDERED_NODE_ITERATOR_TYPE),o;for(;o=r.iterateNext();)yield o};var ve=/[-\\w\\P{ASCII}*]/,ee=t=>"querySelectorAll"in t,v=class extends Error{constructor(e,n){super(`${e} is not a valid selector: ${n}`)}},F=class{#e;#t;#n=[];#r=void 0;elements;constructor(e,n,r){this.elements=[e],this.#e=n,this.#t=r,this.#o()}async run(){if(typeof this.#r=="string")switch(this.#r.trimStart()){case":scope":this.#o();break}for(;this.#r!==void 0;this.#o()){let e=this.#r,n=this.#e;typeof e=="string"?e[0]&&ve.test(e[0])?this.elements=c.flatMap(this.elements,async function*(r){ee(r)&&(yield*r.querySelectorAll(e))}):this.elements=c.flatMap(this.elements,async function*(r){if(!r.parentElement){if(!ee(r))return;yield*r.querySelectorAll(e);return}let o=0;for(let i of r.parentElement.children)if(++o,i===r)break;yield*r.parentElement.querySelectorAll(`:scope>:nth-child(${o})${e}`)}):this.elements=c.flatMap(this.elements,async function*(r){switch(e.name){case"text":yield*b(r,e.value);break;case"xpath":yield*j(r,e.value);break;case"aria":yield*k(r,e.value);break;default:let o=M.get(e.name);if(!o)throw new v(n,`Unknown selector type: ${e.name}`);yield*o.querySelectorAll(r,e.value)}})}}#o(){if(this.#n.length!==0){this.#r=this.#n.shift();return}if(this.#t.length===0){this.#r=void 0;return}let e=this.#t.shift();switch(e){case">>>>":{this.elements=c.flatMap(this.elements,A),this.#o();break}case">>>":{this.elements=c.flatMap(this.elements,L),this.#o();break}default:this.#n=e,this.#o();break}}},W=class{#e=new WeakMap;calculate(e,n=[]){if(e===null)return n;e instanceof ShadowRoot&&(e=e.host);let r=this.#e.get(e);if(r)return[...r,...n];let o=0;for(let s=e.previousSibling;s;s=s.previousSibling)++o;let i=this.calculate(e.parentNode,[o]);return this.#e.set(e,i),[...i,...n]}},te=(t,e)=>{if(t.length+e.length===0)return 0;let[n=-1,...r]=t,[o=-1,...i]=e;return n===o?te(r,i):n<o?-1:1},Ce=async function*(t){let e=new Set;for await(let r of t)e.add(r);let n=new W;yield*[...e.values()].map(r=>[r,n.calculate(r)]).sort(([,r],[,o])=>te(r,o)).map(([r])=>r)},re=function(t,e){let n,r;try{[n,r]=Y(e)}catch{return t.querySelectorAll(e)}if(r)return t.querySelectorAll(e);if(n.some(o=>{let i=0;return o.some(s=>(typeof s=="string"?++i:i=0,i>1))}))throw new v(e,"Multiple deep combinators found in sequence.");return Ce(c.flatMap(n,o=>{let i=new F(t,e,o);return i.run(),i.elements}))},Ie=async function(t,e){for await(let n of re(t,e))return n;return null};var ke=Object.freeze({...R,...q,...D,...H,...Q,...U,...$,Deferred:f,createFunction:X,createTextContent:y,IntervalPoller:N,isSuitableNodeForTextMatching:w,MutationPoller:P,RAFPoller:E}),Re=ke;\n';

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/ScriptInjector.js
var ScriptInjector = class {
  #updated = false;
  #amendments = /* @__PURE__ */ new Set();
  // Appends a statement of the form `(PuppeteerUtil) => {...}`.
  append(statement) {
    this.#update(() => {
      this.#amendments.add(statement);
    });
  }
  pop(statement) {
    this.#update(() => {
      this.#amendments.delete(statement);
    });
  }
  inject(inject, force = false) {
    if (this.#updated || force) {
      inject(this.#get());
    }
    this.#updated = false;
  }
  #update(callback) {
    callback();
    this.#updated = true;
  }
  #get() {
    return `(() => {
      const module = {};
      ${source}
      ${[...this.#amendments].map((statement) => {
      return `(${statement})(module.exports.default);`;
    }).join("")}
      return module.exports.default;
    })()`;
  }
};
__name(ScriptInjector, "ScriptInjector");
var scriptInjector = new ScriptInjector();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/CustomQueryHandler.js
var CustomQueryHandlerRegistry = class {
  #handlers = /* @__PURE__ */ new Map();
  /**
   * @internal
   */
  get(name) {
    const handler = this.#handlers.get(name);
    return handler ? handler[1] : void 0;
  }
  /**
   * Registers a {@link CustomQueryHandler | custom query handler}.
   *
   * @remarks
   * After registration, the handler can be used everywhere where a selector is
   * expected by prepending the selection string with `<name>/`. The name is
   * only allowed to consist of lower- and upper case latin letters.
   *
   * @example
   *
   * ```ts
   * Puppeteer.customQueryHandlers.register('lit', { … });
   * const aHandle = await page.$('lit/…');
   * ```
   *
   * @param name - Name to register under.
   * @param queryHandler - {@link CustomQueryHandler | Custom query handler} to
   * register.
   *
   * @internal
   */
  register(name, handler) {
    assert(!this.#handlers.has(name), `Cannot register over existing handler: ${name}`);
    assert(/^[a-zA-Z]+$/.test(name), `Custom query handler names may only contain [a-zA-Z]`);
    assert(handler.queryAll || handler.queryOne, `At least one query method must be implemented.`);
    const Handler = /* @__PURE__ */ __name(class extends QueryHandler {
      static querySelectorAll = interpolateFunction((node, selector, PuppeteerUtil) => {
        return PuppeteerUtil.customQuerySelectors.get(PLACEHOLDER("name")).querySelectorAll(node, selector);
      }, { name: JSON.stringify(name) });
      static querySelector = interpolateFunction((node, selector, PuppeteerUtil) => {
        return PuppeteerUtil.customQuerySelectors.get(PLACEHOLDER("name")).querySelector(node, selector);
      }, { name: JSON.stringify(name) });
    }, "Handler");
    const registerScript = interpolateFunction((PuppeteerUtil) => {
      PuppeteerUtil.customQuerySelectors.register(PLACEHOLDER("name"), {
        queryAll: PLACEHOLDER("queryAll"),
        queryOne: PLACEHOLDER("queryOne")
      });
    }, {
      name: JSON.stringify(name),
      queryAll: handler.queryAll ? stringifyFunction(handler.queryAll) : String(void 0),
      queryOne: handler.queryOne ? stringifyFunction(handler.queryOne) : String(void 0)
    }).toString();
    this.#handlers.set(name, [registerScript, Handler]);
    scriptInjector.append(registerScript);
  }
  /**
   * Unregisters the {@link CustomQueryHandler | custom query handler} for the
   * given name.
   *
   * @throws `Error` if there is no handler under the given name.
   *
   * @internal
   */
  unregister(name) {
    const handler = this.#handlers.get(name);
    if (!handler) {
      throw new Error(`Cannot unregister unknown handler: ${name}`);
    }
    scriptInjector.pop(handler[0]);
    this.#handlers.delete(name);
  }
  /**
   * Gets the names of all {@link CustomQueryHandler | custom query handlers}.
   *
   * @internal
   */
  names() {
    return [...this.#handlers.keys()];
  }
  /**
   * Unregisters all custom query handlers.
   *
   * @internal
   */
  clear() {
    for (const [registerScript] of this.#handlers) {
      scriptInjector.pop(registerScript);
    }
    this.#handlers.clear();
  }
};
__name(CustomQueryHandlerRegistry, "CustomQueryHandlerRegistry");
var customQueryHandlers = new CustomQueryHandlerRegistry();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/PierceQueryHandler.js
init_checked_fetch();
init_modules_watch_stub();
var PierceQueryHandler = class extends QueryHandler {
};
__name(PierceQueryHandler, "PierceQueryHandler");
__publicField(PierceQueryHandler, "querySelector", (element, selector, { pierceQuerySelector }) => {
  return pierceQuerySelector(element, selector);
});
__publicField(PierceQueryHandler, "querySelectorAll", (element, selector, { pierceQuerySelectorAll }) => {
  return pierceQuerySelectorAll(element, selector);
});

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/PQueryHandler.js
init_checked_fetch();
init_modules_watch_stub();
var PQueryHandler = class extends QueryHandler {
};
__name(PQueryHandler, "PQueryHandler");
__publicField(PQueryHandler, "querySelectorAll", (element, selector, { pQuerySelectorAll }) => {
  return pQuerySelectorAll(element, selector);
});
__publicField(PQueryHandler, "querySelector", (element, selector, { pQuerySelector }) => {
  return pQuerySelector(element, selector);
});

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/TextQueryHandler.js
init_checked_fetch();
init_modules_watch_stub();
var TextQueryHandler = class extends QueryHandler {
};
__name(TextQueryHandler, "TextQueryHandler");
__publicField(TextQueryHandler, "querySelectorAll", (element, selector, { textQuerySelectorAll }) => {
  return textQuerySelectorAll(element, selector);
});

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/XPathQueryHandler.js
init_checked_fetch();
init_modules_watch_stub();
var XPathQueryHandler = class extends QueryHandler {
};
__name(XPathQueryHandler, "XPathQueryHandler");
__publicField(XPathQueryHandler, "querySelectorAll", (element, selector, { xpathQuerySelectorAll }) => {
  return xpathQuerySelectorAll(element, selector);
});

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/GetQueryHandler.js
var BUILTIN_QUERY_HANDLERS = Object.freeze({
  aria: ARIAQueryHandler,
  pierce: PierceQueryHandler,
  xpath: XPathQueryHandler,
  text: TextQueryHandler
});
var QUERY_SEPARATORS = ["=", "/"];
function getQueryHandlerAndSelector(selector) {
  for (const handlerMap of [
    customQueryHandlers.names().map((name) => {
      return [name, customQueryHandlers.get(name)];
    }),
    Object.entries(BUILTIN_QUERY_HANDLERS)
  ]) {
    for (const [name, QueryHandler2] of handlerMap) {
      for (const separator of QUERY_SEPARATORS) {
        const prefix = `${name}${separator}`;
        if (selector.startsWith(prefix)) {
          selector = selector.slice(prefix.length);
          return { updatedSelector: selector, QueryHandler: QueryHandler2 };
        }
      }
    }
  }
  return { updatedSelector: selector, QueryHandler: PQueryHandler };
}
__name(getQueryHandlerAndSelector, "getQueryHandlerAndSelector");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/api/JSHandle.js
init_checked_fetch();
init_modules_watch_stub();
var JSHandle = class {
  /**
   * @internal
   */
  constructor() {
  }
  /**
   * @internal
   */
  get disposed() {
    throw new Error("Not implemented");
  }
  /**
   * @internal
   */
  executionContext() {
    throw new Error("Not implemented");
  }
  /**
   * @internal
   */
  get client() {
    throw new Error("Not implemented");
  }
  async evaluate() {
    throw new Error("Not implemented");
  }
  async evaluateHandle() {
    throw new Error("Not implemented");
  }
  async getProperty() {
    throw new Error("Not implemented");
  }
  /**
   * Gets a map of handles representing the properties of the current handle.
   *
   * @example
   *
   * ```ts
   * const listHandle = await page.evaluateHandle(() => document.body.children);
   * const properties = await listHandle.getProperties();
   * const children = [];
   * for (const property of properties.values()) {
   *   const element = property.asElement();
   *   if (element) {
   *     children.push(element);
   *   }
   * }
   * children; // holds elementHandles to all children of document.body
   * ```
   */
  async getProperties() {
    throw new Error("Not implemented");
  }
  /**
   * A vanilla object representing the serializable portions of the
   * referenced object.
   * @throws Throws if the object cannot be serialized due to circularity.
   *
   * @remarks
   * If the object has a `toJSON` function, it **will not** be called.
   */
  async jsonValue() {
    throw new Error("Not implemented");
  }
  /**
   * Either `null` or the handle itself if the handle is an
   * instance of {@link ElementHandle}.
   */
  asElement() {
    throw new Error("Not implemented");
  }
  /**
   * Releases the object referenced by the handle for garbage collection.
   */
  async dispose() {
    throw new Error("Not implemented");
  }
  /**
   * Returns a string representation of the JSHandle.
   *
   * @remarks
   * Useful during debugging.
   */
  toString() {
    throw new Error("Not implemented");
  }
  /**
   * @internal
   */
  get id() {
    throw new Error("Not implemented");
  }
  /**
   * Provides access to the
   * {@link https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-RemoteObject | Protocol.Runtime.RemoteObject}
   * backing this handle.
   */
  remoteObject() {
    throw new Error("Not implemented");
  }
};
__name(JSHandle, "JSHandle");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/api/ElementHandle.js
var ElementHandle = class extends JSHandle {
  /**
   * @internal
   */
  handle;
  /**
   * @internal
   */
  constructor(handle) {
    super();
    this.handle = handle;
  }
  /**
   * @internal
   */
  get id() {
    return this.handle.id;
  }
  /**
   * @internal
   */
  get disposed() {
    return this.handle.disposed;
  }
  async getProperty(propertyName) {
    return this.handle.getProperty(propertyName);
  }
  /**
   * @internal
   */
  async getProperties() {
    return this.handle.getProperties();
  }
  /**
   * @internal
   */
  async evaluate(pageFunction, ...args) {
    return this.handle.evaluate(pageFunction, ...args);
  }
  /**
   * @internal
   */
  evaluateHandle(pageFunction, ...args) {
    return this.handle.evaluateHandle(pageFunction, ...args);
  }
  /**
   * @internal
   */
  async jsonValue() {
    return this.handle.jsonValue();
  }
  /**
   * @internal
   */
  toString() {
    return this.handle.toString();
  }
  /**
   * @internal
   */
  async dispose() {
    return await this.handle.dispose();
  }
  asElement() {
    return this;
  }
  /**
   * @internal
   */
  executionContext() {
    throw new Error("Not implemented");
  }
  /**
   * @internal
   */
  get client() {
    throw new Error("Not implemented");
  }
  get frame() {
    throw new Error("Not implemented");
  }
  /**
   * Queries the current element for an element matching the given selector.
   *
   * @param selector - The selector to query for.
   * @returns A {@link ElementHandle | element handle} to the first element
   * matching the given selector. Otherwise, `null`.
   */
  async $(selector) {
    const { updatedSelector, QueryHandler: QueryHandler2 } = getQueryHandlerAndSelector(selector);
    return await QueryHandler2.queryOne(this, updatedSelector);
  }
  /**
   * Queries the current element for all elements matching the given selector.
   *
   * @param selector - The selector to query for.
   * @returns An array of {@link ElementHandle | element handles} that point to
   * elements matching the given selector.
   */
  async $$(selector) {
    const { updatedSelector, QueryHandler: QueryHandler2 } = getQueryHandlerAndSelector(selector);
    return AsyncIterableUtil.collect(QueryHandler2.queryAll(this, updatedSelector));
  }
  /**
   * Runs the given function on the first element matching the given selector in
   * the current element.
   *
   * If the given function returns a promise, then this method will wait till
   * the promise resolves.
   *
   * @example
   *
   * ```ts
   * const tweetHandle = await page.$('.tweet');
   * expect(await tweetHandle.$eval('.like', node => node.innerText)).toBe(
   *   '100'
   * );
   * expect(await tweetHandle.$eval('.retweets', node => node.innerText)).toBe(
   *   '10'
   * );
   * ```
   *
   * @param selector - The selector to query for.
   * @param pageFunction - The function to be evaluated in this element's page's
   * context. The first element matching the selector will be passed in as the
   * first argument.
   * @param args - Additional arguments to pass to `pageFunction`.
   * @returns A promise to the result of the function.
   */
  async $eval(selector, pageFunction, ...args) {
    pageFunction = withSourcePuppeteerURLIfNone(this.$eval.name, pageFunction);
    const elementHandle = await this.$(selector);
    if (!elementHandle) {
      throw new Error(`Error: failed to find element matching selector "${selector}"`);
    }
    const result = await elementHandle.evaluate(pageFunction, ...args);
    await elementHandle.dispose();
    return result;
  }
  /**
   * Runs the given function on an array of elements matching the given selector
   * in the current element.
   *
   * If the given function returns a promise, then this method will wait till
   * the promise resolves.
   *
   * @example
   * HTML:
   *
   * ```html
   * <div class="feed">
   *   <div class="tweet">Hello!</div>
   *   <div class="tweet">Hi!</div>
   * </div>
   * ```
   *
   * JavaScript:
   *
   * ```js
   * const feedHandle = await page.$('.feed');
   * expect(
   *   await feedHandle.$$eval('.tweet', nodes => nodes.map(n => n.innerText))
   * ).toEqual(['Hello!', 'Hi!']);
   * ```
   *
   * @param selector - The selector to query for.
   * @param pageFunction - The function to be evaluated in the element's page's
   * context. An array of elements matching the given selector will be passed to
   * the function as its first argument.
   * @param args - Additional arguments to pass to `pageFunction`.
   * @returns A promise to the result of the function.
   */
  async $$eval(selector, pageFunction, ...args) {
    pageFunction = withSourcePuppeteerURLIfNone(this.$$eval.name, pageFunction);
    const results = await this.$$(selector);
    const elements = await this.evaluateHandle((_3, ...elements2) => {
      return elements2;
    }, ...results);
    const [result] = await Promise.all([
      elements.evaluate(pageFunction, ...args),
      ...results.map((results2) => {
        return results2.dispose();
      })
    ]);
    await elements.dispose();
    return result;
  }
  /**
   * @deprecated Use {@link ElementHandle.$$} with the `xpath` prefix.
   *
   * Example: `await elementHandle.$$('xpath/' + xpathExpression)`
   *
   * The method evaluates the XPath expression relative to the elementHandle.
   * If `xpath` starts with `//` instead of `.//`, the dot will be appended
   * automatically.
   *
   * If there are no such elements, the method will resolve to an empty array.
   * @param expression - Expression to {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/evaluate | evaluate}
   */
  async $x(expression) {
    if (expression.startsWith("//")) {
      expression = `.${expression}`;
    }
    return this.$$(`xpath/${expression}`);
  }
  /**
   * Wait for an element matching the given selector to appear in the current
   * element.
   *
   * Unlike {@link Frame.waitForSelector}, this method does not work across
   * navigations or if the element is detached from DOM.
   *
   * @example
   *
   * ```ts
   * import puppeteer from 'puppeteer';
   *
   * (async () => {
   *   const browser = await puppeteer.launch();
   *   const page = await browser.newPage();
   *   let currentURL;
   *   page
   *     .mainFrame()
   *     .waitForSelector('img')
   *     .then(() => console.log('First URL with image: ' + currentURL));
   *
   *   for (currentURL of [
   *     'https://example.com',
   *     'https://google.com',
   *     'https://bbc.com',
   *   ]) {
   *     await page.goto(currentURL);
   *   }
   *   await browser.close();
   * })();
   * ```
   *
   * @param selector - The selector to query and wait for.
   * @param options - Options for customizing waiting behavior.
   * @returns An element matching the given selector.
   * @throws Throws if an element matching the given selector doesn't appear.
   */
  async waitForSelector(selector, options = {}) {
    const { updatedSelector, QueryHandler: QueryHandler2 } = getQueryHandlerAndSelector(selector);
    return await QueryHandler2.waitFor(this, updatedSelector, options);
  }
  async #checkVisibility(visibility) {
    const element = await this.frame.isolatedRealm().adoptHandle(this);
    try {
      return await this.frame.isolatedRealm().evaluate(async (PuppeteerUtil, element2, visibility2) => {
        return Boolean(PuppeteerUtil.checkVisibility(element2, visibility2));
      }, LazyArg.create((context) => {
        return context.puppeteerUtil;
      }), element, visibility);
    } finally {
      await element.dispose();
    }
  }
  /**
   * Checks if an element is visible using the same mechanism as
   * {@link ElementHandle.waitForSelector}.
   */
  async isVisible() {
    return this.#checkVisibility(true);
  }
  /**
   * Checks if an element is hidden using the same mechanism as
   * {@link ElementHandle.waitForSelector}.
   */
  async isHidden() {
    return this.#checkVisibility(false);
  }
  /**
   * @deprecated Use {@link ElementHandle.waitForSelector} with the `xpath`
   * prefix.
   *
   * Example: `await elementHandle.waitForSelector('xpath/' + xpathExpression)`
   *
   * The method evaluates the XPath expression relative to the elementHandle.
   *
   * Wait for the `xpath` within the element. If at the moment of calling the
   * method the `xpath` already exists, the method will return immediately. If
   * the `xpath` doesn't appear after the `timeout` milliseconds of waiting, the
   * function will throw.
   *
   * If `xpath` starts with `//` instead of `.//`, the dot will be appended
   * automatically.
   *
   * @example
   * This method works across navigation.
   *
   * ```ts
   * import puppeteer from 'puppeteer';
   * (async () => {
   *   const browser = await puppeteer.launch();
   *   const page = await browser.newPage();
   *   let currentURL;
   *   page
   *     .waitForXPath('//img')
   *     .then(() => console.log('First URL with image: ' + currentURL));
   *   for (currentURL of [
   *     'https://example.com',
   *     'https://google.com',
   *     'https://bbc.com',
   *   ]) {
   *     await page.goto(currentURL);
   *   }
   *   await browser.close();
   * })();
   * ```
   *
   * @param xpath - A
   * {@link https://developer.mozilla.org/en-US/docs/Web/XPath | xpath} of an
   * element to wait for
   * @param options - Optional waiting parameters
   * @returns Promise which resolves when element specified by xpath string is
   * added to DOM. Resolves to `null` if waiting for `hidden: true` and xpath is
   * not found in DOM, otherwise resolves to `ElementHandle`.
   * @remarks
   * The optional Argument `options` have properties:
   *
   * - `visible`: A boolean to wait for element to be present in DOM and to be
   *   visible, i.e. to not have `display: none` or `visibility: hidden` CSS
   *   properties. Defaults to `false`.
   *
   * - `hidden`: A boolean wait for element to not be found in the DOM or to be
   *   hidden, i.e. have `display: none` or `visibility: hidden` CSS properties.
   *   Defaults to `false`.
   *
   * - `timeout`: A number which is maximum time to wait for in milliseconds.
   *   Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The
   *   default value can be changed by using the {@link Page.setDefaultTimeout}
   *   method.
   */
  async waitForXPath(xpath, options = {}) {
    if (xpath.startsWith("//")) {
      xpath = `.${xpath}`;
    }
    return this.waitForSelector(`xpath/${xpath}`, options);
  }
  /**
   * Converts the current handle to the given element type.
   *
   * @example
   *
   * ```ts
   * const element: ElementHandle<Element> = await page.$(
   *   '.class-name-of-anchor'
   * );
   * // DO NOT DISPOSE `element`, this will be always be the same handle.
   * const anchor: ElementHandle<HTMLAnchorElement> = await element.toElement(
   *   'a'
   * );
   * ```
   *
   * @param tagName - The tag name of the desired element type.
   * @throws An error if the handle does not match. **The handle will not be
   * automatically disposed.**
   */
  async toElement(tagName) {
    const isMatchingTagName = await this.evaluate((node, tagName2) => {
      return node.nodeName === tagName2.toUpperCase();
    }, tagName);
    if (!isMatchingTagName) {
      throw new Error(`Element is not a(n) \`${tagName}\` element`);
    }
    return this;
  }
  /**
   * Resolves to the content frame for element handles referencing
   * iframe nodes, or null otherwise
   */
  async contentFrame() {
    throw new Error("Not implemented");
  }
  async clickablePoint() {
    throw new Error("Not implemented");
  }
  /**
   * This method scrolls element into view if needed, and then
   * uses {@link Page} to hover over the center of the element.
   * If the element is detached from DOM, the method throws an error.
   */
  async hover() {
    throw new Error("Not implemented");
  }
  async click() {
    throw new Error("Not implemented");
  }
  async drag() {
    throw new Error("Not implemented");
  }
  async dragEnter() {
    throw new Error("Not implemented");
  }
  async dragOver() {
    throw new Error("Not implemented");
  }
  async drop() {
    throw new Error("Not implemented");
  }
  async dragAndDrop() {
    throw new Error("Not implemented");
  }
  /**
   * Triggers a `change` and `input` event once all the provided options have been
   * selected. If there's no `<select>` element matching `selector`, the method
   * throws an error.
   *
   * @example
   *
   * ```ts
   * handle.select('blue'); // single selection
   * handle.select('red', 'green', 'blue'); // multiple selections
   * ```
   *
   * @param values - Values of options to select. If the `<select>` has the
   * `multiple` attribute, all values are considered, otherwise only the first
   * one is taken into account.
   */
  async select(...values) {
    for (const value of values) {
      assert(isString(value), 'Values must be strings. Found value "' + value + '" of type "' + typeof value + '"');
    }
    return this.evaluate((element, vals) => {
      const values2 = new Set(vals);
      if (!(element instanceof HTMLSelectElement)) {
        throw new Error("Element is not a <select> element.");
      }
      const selectedValues = /* @__PURE__ */ new Set();
      if (!element.multiple) {
        for (const option of element.options) {
          option.selected = false;
        }
        for (const option of element.options) {
          if (values2.has(option.value)) {
            option.selected = true;
            selectedValues.add(option.value);
            break;
          }
        }
      } else {
        for (const option of element.options) {
          option.selected = values2.has(option.value);
          if (option.selected) {
            selectedValues.add(option.value);
          }
        }
      }
      element.dispatchEvent(new Event("input", { bubbles: true }));
      element.dispatchEvent(new Event("change", { bubbles: true }));
      return [...selectedValues.values()];
    }, values);
  }
  async uploadFile() {
    throw new Error("Not implemented");
  }
  /**
   * This method scrolls element into view if needed, and then uses
   * {@link Touchscreen.tap} to tap in the center of the element.
   * If the element is detached from DOM, the method throws an error.
   */
  async tap() {
    throw new Error("Not implemented");
  }
  async touchStart() {
    throw new Error("Not implemented");
  }
  async touchMove() {
    throw new Error("Not implemented");
  }
  async touchEnd() {
    throw new Error("Not implemented");
  }
  /**
   * Calls {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus | focus} on the element.
   */
  async focus() {
    await this.evaluate((element) => {
      if (!(element instanceof HTMLElement)) {
        throw new Error("Cannot focus non-HTMLElement");
      }
      return element.focus();
    });
  }
  async type() {
    throw new Error("Not implemented");
  }
  async press() {
    throw new Error("Not implemented");
  }
  /**
   * This method returns the bounding box of the element (relative to the main frame),
   * or `null` if the element is not visible.
   */
  async boundingBox() {
    throw new Error("Not implemented");
  }
  /**
   * This method returns boxes of the element, or `null` if the element is not visible.
   *
   * @remarks
   *
   * Boxes are represented as an array of points;
   * Each Point is an object `{x, y}`. Box points are sorted clock-wise.
   */
  async boxModel() {
    throw new Error("Not implemented");
  }
  async screenshot() {
    throw new Error("Not implemented");
  }
  /**
   * @internal
   */
  async assertConnectedElement() {
    const error = await this.evaluate(async (element) => {
      if (!element.isConnected) {
        return "Node is detached from document";
      }
      if (element.nodeType !== Node.ELEMENT_NODE) {
        return "Node is not of type HTMLElement";
      }
      return;
    });
    if (error) {
      throw new Error(error);
    }
  }
  /**
   * @internal
   */
  async scrollIntoViewIfNeeded() {
    if (await this.isIntersectingViewport({
      threshold: 1
    })) {
      return;
    }
    await this.scrollIntoView();
  }
  /**
   * Resolves to true if the element is visible in the current viewport. If an
   * element is an SVG, we check if the svg owner element is in the viewport
   * instead. See https://crbug.com/963246.
   *
   * @param options - Threshold for the intersection between 0 (no intersection) and 1
   * (full intersection). Defaults to 1.
   */
  async isIntersectingViewport(options) {
    await this.assertConnectedElement();
    const { threshold = 0 } = options ?? {};
    const svgHandle = await this.#asSVGElementHandle(this);
    const intersectionTarget = svgHandle ? await this.#getOwnerSVGElement(svgHandle) : this;
    try {
      return await intersectionTarget.evaluate(async (element, threshold2) => {
        const visibleRatio = await new Promise((resolve) => {
          const observer = new IntersectionObserver((entries) => {
            resolve(entries[0].intersectionRatio);
            observer.disconnect();
          });
          observer.observe(element);
        });
        return threshold2 === 1 ? visibleRatio === 1 : visibleRatio > threshold2;
      }, threshold);
    } finally {
      if (intersectionTarget !== this) {
        await intersectionTarget.dispose();
      }
    }
  }
  /**
   * Scrolls the element into view using either the automation protocol client
   * or by calling element.scrollIntoView.
   */
  async scrollIntoView() {
    await this.assertConnectedElement();
    await this.evaluate(async (element) => {
      element.scrollIntoView({
        block: "center",
        inline: "center",
        behavior: "instant"
      });
    });
  }
  /**
   * Returns true if an element is an SVGElement (included svg, path, rect
   * etc.).
   */
  async #asSVGElementHandle(handle) {
    if (await handle.evaluate((element) => {
      return element instanceof SVGElement;
    })) {
      return handle;
    } else {
      return null;
    }
  }
  async #getOwnerSVGElement(handle) {
    return await handle.evaluateHandle((element) => {
      if (element instanceof SVGSVGElement) {
        return element;
      }
      return element.ownerSVGElement;
    });
  }
  /**
   * @internal
   */
  assertElementHasWorld() {
    assert(this.executionContext()._world);
  }
  autofill() {
    throw new Error("Not implemented");
  }
};
__name(ElementHandle, "ElementHandle");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/JSHandle.js
init_checked_fetch();
init_modules_watch_stub();
var CDPJSHandle = class extends JSHandle {
  #disposed = false;
  #context;
  #remoteObject;
  get disposed() {
    return this.#disposed;
  }
  constructor(context, remoteObject) {
    super();
    this.#context = context;
    this.#remoteObject = remoteObject;
  }
  executionContext() {
    return this.#context;
  }
  get client() {
    return this.#context._client;
  }
  /**
   * @see {@link ExecutionContext.evaluate} for more details.
   */
  async evaluate(pageFunction, ...args) {
    pageFunction = withSourcePuppeteerURLIfNone(this.evaluate.name, pageFunction);
    return await this.executionContext().evaluate(pageFunction, this, ...args);
  }
  /**
   * @see {@link ExecutionContext.evaluateHandle} for more details.
   */
  async evaluateHandle(pageFunction, ...args) {
    pageFunction = withSourcePuppeteerURLIfNone(this.evaluateHandle.name, pageFunction);
    return await this.executionContext().evaluateHandle(pageFunction, this, ...args);
  }
  async getProperty(propertyName) {
    return this.evaluateHandle((object, propertyName2) => {
      return object[propertyName2];
    }, propertyName);
  }
  async getProperties() {
    assert(this.#remoteObject.objectId);
    const response = await this.client.send("Runtime.getProperties", {
      objectId: this.#remoteObject.objectId,
      ownProperties: true
    });
    const result = /* @__PURE__ */ new Map();
    for (const property of response.result) {
      if (!property.enumerable || !property.value) {
        continue;
      }
      result.set(property.name, createJSHandle(this.#context, property.value));
    }
    return result;
  }
  async jsonValue() {
    if (!this.#remoteObject.objectId) {
      return valueFromRemoteObject(this.#remoteObject);
    }
    const value = await this.evaluate((object) => {
      return object;
    });
    if (value === void 0) {
      throw new Error("Could not serialize referenced object");
    }
    return value;
  }
  /**
   * Either `null` or the handle itself if the handle is an
   * instance of {@link ElementHandle}.
   */
  asElement() {
    return null;
  }
  async dispose() {
    if (this.#disposed) {
      return;
    }
    this.#disposed = true;
    await releaseObject(this.client, this.#remoteObject);
  }
  toString() {
    if (!this.#remoteObject.objectId) {
      return "JSHandle:" + valueFromRemoteObject(this.#remoteObject);
    }
    const type = this.#remoteObject.subtype || this.#remoteObject.type;
    return "JSHandle@" + type;
  }
  get id() {
    return this.#remoteObject.objectId;
  }
  remoteObject() {
    return this.#remoteObject;
  }
};
__name(CDPJSHandle, "CDPJSHandle");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/ElementHandle.js
var applyOffsetsToQuad = /* @__PURE__ */ __name((quad, offsetX, offsetY) => {
  return quad.map((part) => {
    return { x: part.x + offsetX, y: part.y + offsetY };
  });
}, "applyOffsetsToQuad");
var CDPElementHandle = class extends ElementHandle {
  #frame;
  constructor(context, remoteObject, frame) {
    super(new CDPJSHandle(context, remoteObject));
    this.#frame = frame;
  }
  /**
   * @internal
   */
  executionContext() {
    return this.handle.executionContext();
  }
  /**
   * @internal
   */
  get client() {
    return this.handle.client;
  }
  remoteObject() {
    return this.handle.remoteObject();
  }
  get #frameManager() {
    return this.#frame._frameManager;
  }
  get #page() {
    return this.#frame.page();
  }
  get frame() {
    return this.#frame;
  }
  async $(selector) {
    return super.$(selector);
  }
  async $$(selector) {
    return super.$$(selector);
  }
  async waitForSelector(selector, options) {
    return await super.waitForSelector(selector, options);
  }
  async contentFrame() {
    const nodeInfo = await this.client.send("DOM.describeNode", {
      objectId: this.id
    });
    if (typeof nodeInfo.node.frameId !== "string") {
      return null;
    }
    return this.#frameManager.frame(nodeInfo.node.frameId);
  }
  async scrollIntoView() {
    await this.assertConnectedElement();
    try {
      await this.client.send("DOM.scrollIntoViewIfNeeded", {
        objectId: this.id
      });
    } catch (error) {
      debugError(error);
      await super.scrollIntoView();
    }
  }
  async #getOOPIFOffsets(frame) {
    let offsetX = 0;
    let offsetY = 0;
    let currentFrame = frame;
    while (currentFrame && currentFrame.parentFrame()) {
      const parent = currentFrame.parentFrame();
      if (!currentFrame.isOOPFrame() || !parent) {
        currentFrame = parent;
        continue;
      }
      const { backendNodeId } = await parent._client().send("DOM.getFrameOwner", {
        frameId: currentFrame._id
      });
      const result = await parent._client().send("DOM.getBoxModel", {
        backendNodeId
      });
      if (!result) {
        break;
      }
      const contentBoxQuad = result.model.content;
      const topLeftCorner = this.#fromProtocolQuad(contentBoxQuad)[0];
      offsetX += topLeftCorner.x;
      offsetY += topLeftCorner.y;
      currentFrame = parent;
    }
    return { offsetX, offsetY };
  }
  async clickablePoint(offset) {
    const [result, layoutMetrics] = await Promise.all([
      this.client.send("DOM.getContentQuads", {
        objectId: this.id
      }).catch(debugError),
      this.#page._client().send("Page.getLayoutMetrics")
    ]);
    if (!result || !result.quads.length) {
      throw new Error("Node is either not clickable or not an HTMLElement");
    }
    const { clientWidth, clientHeight } = layoutMetrics.cssLayoutViewport || layoutMetrics.layoutViewport;
    const { offsetX, offsetY } = await this.#getOOPIFOffsets(this.#frame);
    const quads = result.quads.map((quad2) => {
      return this.#fromProtocolQuad(quad2);
    }).map((quad2) => {
      return applyOffsetsToQuad(quad2, offsetX, offsetY);
    }).map((quad2) => {
      return this.#intersectQuadWithViewport(quad2, clientWidth, clientHeight);
    }).filter((quad2) => {
      return computeQuadArea(quad2) > 1;
    });
    if (!quads.length) {
      throw new Error("Node is either not clickable or not an HTMLElement");
    }
    const quad = quads[0];
    if (offset) {
      let minX = Number.MAX_SAFE_INTEGER;
      let minY = Number.MAX_SAFE_INTEGER;
      for (const point of quad) {
        if (point.x < minX) {
          minX = point.x;
        }
        if (point.y < minY) {
          minY = point.y;
        }
      }
      if (minX !== Number.MAX_SAFE_INTEGER && minY !== Number.MAX_SAFE_INTEGER) {
        return {
          x: minX + offset.x,
          y: minY + offset.y
        };
      }
    }
    let x3 = 0;
    let y3 = 0;
    for (const point of quad) {
      x3 += point.x;
      y3 += point.y;
    }
    return {
      x: x3 / 4,
      y: y3 / 4
    };
  }
  #getBoxModel() {
    const params = {
      objectId: this.id
    };
    return this.client.send("DOM.getBoxModel", params).catch((error) => {
      return debugError(error);
    });
  }
  #fromProtocolQuad(quad) {
    return [
      { x: quad[0], y: quad[1] },
      { x: quad[2], y: quad[3] },
      { x: quad[4], y: quad[5] },
      { x: quad[6], y: quad[7] }
    ];
  }
  #intersectQuadWithViewport(quad, width, height) {
    return quad.map((point) => {
      return {
        x: Math.min(Math.max(point.x, 0), width),
        y: Math.min(Math.max(point.y, 0), height)
      };
    });
  }
  /**
   * This method scrolls element into view if needed, and then
   * uses {@link Page.mouse} to hover over the center of the element.
   * If the element is detached from DOM, the method throws an error.
   */
  async hover() {
    await this.scrollIntoViewIfNeeded();
    const { x: x3, y: y3 } = await this.clickablePoint();
    await this.#page.mouse.move(x3, y3);
  }
  /**
   * This method scrolls element into view if needed, and then
   * uses {@link Page.mouse} to click in the center of the element.
   * If the element is detached from DOM, the method throws an error.
   */
  async click(options = {}) {
    await this.scrollIntoViewIfNeeded();
    const { x: x3, y: y3 } = await this.clickablePoint(options.offset);
    await this.#page.mouse.click(x3, y3, options);
  }
  /**
   * This method creates and captures a dragevent from the element.
   */
  async drag(target) {
    assert(this.#page.isDragInterceptionEnabled(), "Drag Interception is not enabled!");
    await this.scrollIntoViewIfNeeded();
    const start = await this.clickablePoint();
    return await this.#page.mouse.drag(start, target);
  }
  async dragEnter(data = { items: [], dragOperationsMask: 1 }) {
    await this.scrollIntoViewIfNeeded();
    const target = await this.clickablePoint();
    await this.#page.mouse.dragEnter(target, data);
  }
  async dragOver(data = { items: [], dragOperationsMask: 1 }) {
    await this.scrollIntoViewIfNeeded();
    const target = await this.clickablePoint();
    await this.#page.mouse.dragOver(target, data);
  }
  async drop(data = { items: [], dragOperationsMask: 1 }) {
    await this.scrollIntoViewIfNeeded();
    const destination = await this.clickablePoint();
    await this.#page.mouse.drop(destination, data);
  }
  async dragAndDrop(target, options) {
    assert(this.#page.isDragInterceptionEnabled(), "Drag Interception is not enabled!");
    await this.scrollIntoViewIfNeeded();
    const startPoint = await this.clickablePoint();
    const targetPoint = await target.clickablePoint();
    await this.#page.mouse.dragAndDrop(startPoint, targetPoint, options);
  }
  async uploadFile(...filePaths) {
    const isMultiple = await this.evaluate((element) => {
      return element.multiple;
    });
    assert(filePaths.length <= 1 || isMultiple, "Multiple file uploads only work with <input type=file multiple>");
    let path;
    try {
      path = await import("path");
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error(`JSHandle#uploadFile can only be used in Node-like environments.`);
      }
      throw error;
    }
    const files = filePaths.map((filePath) => {
      if (path.win32.isAbsolute(filePath) || path.posix.isAbsolute(filePath)) {
        return filePath;
      } else {
        return path.resolve(filePath);
      }
    });
    const { node } = await this.client.send("DOM.describeNode", {
      objectId: this.id
    });
    const { backendNodeId } = node;
    if (files.length === 0) {
      await this.evaluate((element) => {
        element.files = new DataTransfer().files;
        element.dispatchEvent(new Event("input", { bubbles: true }));
        element.dispatchEvent(new Event("change", { bubbles: true }));
      });
    } else {
      await this.client.send("DOM.setFileInputFiles", {
        objectId: this.id,
        files,
        backendNodeId
      });
    }
  }
  async tap() {
    await this.scrollIntoViewIfNeeded();
    const { x: x3, y: y3 } = await this.clickablePoint();
    await this.#page.touchscreen.touchStart(x3, y3);
    await this.#page.touchscreen.touchEnd();
  }
  async touchStart() {
    await this.scrollIntoViewIfNeeded();
    const { x: x3, y: y3 } = await this.clickablePoint();
    await this.#page.touchscreen.touchStart(x3, y3);
  }
  async touchMove() {
    await this.scrollIntoViewIfNeeded();
    const { x: x3, y: y3 } = await this.clickablePoint();
    await this.#page.touchscreen.touchMove(x3, y3);
  }
  async touchEnd() {
    await this.scrollIntoViewIfNeeded();
    await this.#page.touchscreen.touchEnd();
  }
  async type(text, options) {
    await this.focus();
    await this.#page.keyboard.type(text, options);
  }
  async press(key, options) {
    await this.focus();
    await this.#page.keyboard.press(key, options);
  }
  async boundingBox() {
    const result = await this.#getBoxModel();
    if (!result) {
      return null;
    }
    const { offsetX, offsetY } = await this.#getOOPIFOffsets(this.#frame);
    const quad = result.model.border;
    const x3 = Math.min(quad[0], quad[2], quad[4], quad[6]);
    const y3 = Math.min(quad[1], quad[3], quad[5], quad[7]);
    const width = Math.max(quad[0], quad[2], quad[4], quad[6]) - x3;
    const height = Math.max(quad[1], quad[3], quad[5], quad[7]) - y3;
    return { x: x3 + offsetX, y: y3 + offsetY, width, height };
  }
  async boxModel() {
    const result = await this.#getBoxModel();
    if (!result) {
      return null;
    }
    const { offsetX, offsetY } = await this.#getOOPIFOffsets(this.#frame);
    const { content, padding, border, margin, width, height } = result.model;
    return {
      content: applyOffsetsToQuad(this.#fromProtocolQuad(content), offsetX, offsetY),
      padding: applyOffsetsToQuad(this.#fromProtocolQuad(padding), offsetX, offsetY),
      border: applyOffsetsToQuad(this.#fromProtocolQuad(border), offsetX, offsetY),
      margin: applyOffsetsToQuad(this.#fromProtocolQuad(margin), offsetX, offsetY),
      width,
      height
    };
  }
  async screenshot(options = {}) {
    let needsViewportReset = false;
    let boundingBox = await this.boundingBox();
    assert(boundingBox, "Node is either not visible or not an HTMLElement");
    const viewport = this.#page.viewport();
    if (viewport && (boundingBox.width > viewport.width || boundingBox.height > viewport.height)) {
      const newViewport = {
        width: Math.max(viewport.width, Math.ceil(boundingBox.width)),
        height: Math.max(viewport.height, Math.ceil(boundingBox.height))
      };
      await this.#page.setViewport(Object.assign({}, viewport, newViewport));
      needsViewportReset = true;
    }
    await this.scrollIntoViewIfNeeded();
    boundingBox = await this.boundingBox();
    assert(boundingBox, "Node is either not visible or not an HTMLElement");
    assert(boundingBox.width !== 0, "Node has 0 width.");
    assert(boundingBox.height !== 0, "Node has 0 height.");
    const layoutMetrics = await this.client.send("Page.getLayoutMetrics");
    const { pageX, pageY } = layoutMetrics.cssVisualViewport || layoutMetrics.layoutViewport;
    const clip = Object.assign({}, boundingBox);
    clip.x += pageX;
    clip.y += pageY;
    const imageData = await this.#page.screenshot(Object.assign({}, {
      clip
    }, options));
    if (needsViewportReset && viewport) {
      await this.#page.setViewport(viewport);
    }
    return imageData;
  }
  async autofill(data) {
    const nodeInfo = await this.client.send("DOM.describeNode", {
      objectId: this.handle.id
    });
    const fieldId = nodeInfo.node.backendNodeId;
    const frameId = this.#frame._id;
    await this.client.send("Autofill.trigger", {
      fieldId,
      frameId,
      card: data.creditCard
    });
  }
};
__name(CDPElementHandle, "CDPElementHandle");
function computeQuadArea(quad) {
  let area = 0;
  for (let i2 = 0; i2 < quad.length; ++i2) {
    const p1 = quad[i2];
    const p2 = quad[(i2 + 1) % quad.length];
    area += (p1.x * p2.y - p2.x * p1.y) / 2;
  }
  return Math.abs(area);
}
__name(computeQuadArea, "computeQuadArea");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/util.js
var debugError = debug("puppeteer:error");
function createEvaluationError(details) {
  let name;
  let message;
  if (!details.exception) {
    name = "Error";
    message = details.text;
  } else if ((details.exception.type !== "object" || details.exception.subtype !== "error") && !details.exception.objectId) {
    return valueFromRemoteObject(details.exception);
  } else {
    const detail = getErrorDetails(details);
    name = detail.name;
    message = detail.message;
  }
  const messageHeight = message.split("\n").length;
  const error = new Error(message);
  error.name = name;
  const stackLines = error.stack.split("\n");
  const messageLines = stackLines.splice(0, messageHeight);
  stackLines.shift();
  if (details.stackTrace && stackLines.length < Error.stackTraceLimit) {
    for (const frame of details.stackTrace.callFrames.reverse()) {
      if (PuppeteerURL.isPuppeteerURL(frame.url) && frame.url !== PuppeteerURL.INTERNAL_URL) {
        const url = PuppeteerURL.parse(frame.url);
        stackLines.unshift(`    at ${frame.functionName || url.functionName} (${url.functionName} at ${url.siteString}, <anonymous>:${frame.lineNumber}:${frame.columnNumber})`);
      } else {
        stackLines.push(`    at ${frame.functionName || "<anonymous>"} (${frame.url}:${frame.lineNumber}:${frame.columnNumber})`);
      }
      if (stackLines.length >= Error.stackTraceLimit) {
        break;
      }
    }
  }
  error.stack = [...messageLines, ...stackLines].join("\n");
  return error;
}
__name(createEvaluationError, "createEvaluationError");
function createClientError(details) {
  let name;
  let message;
  if (!details.exception) {
    name = "Error";
    message = details.text;
  } else if ((details.exception.type !== "object" || details.exception.subtype !== "error") && !details.exception.objectId) {
    return valueFromRemoteObject(details.exception);
  } else {
    const detail = getErrorDetails(details);
    name = detail.name;
    message = detail.message;
  }
  const messageHeight = message.split("\n").length;
  const error = new Error(message);
  error.name = name;
  const stackLines = [];
  const messageLines = error.stack.split("\n").splice(0, messageHeight);
  if (details.stackTrace && stackLines.length < Error.stackTraceLimit) {
    for (const frame of details.stackTrace.callFrames.reverse()) {
      stackLines.push(`    at ${frame.functionName || "<anonymous>"} (${frame.url}:${frame.lineNumber}:${frame.columnNumber})`);
      if (stackLines.length >= Error.stackTraceLimit) {
        break;
      }
    }
  }
  error.stack = [...messageLines, ...stackLines].join("\n");
  return error;
}
__name(createClientError, "createClientError");
var getErrorDetails = /* @__PURE__ */ __name((details) => {
  let name = "";
  let message;
  const lines = details.exception?.description?.split("\n    at ") ?? [];
  const size = Math.min(details.stackTrace?.callFrames.length ?? 0, lines.length - 1);
  lines.splice(-size, size);
  if (details.exception?.className) {
    name = details.exception.className;
  }
  message = lines.join("\n");
  if (name && message.startsWith(`${name}: `)) {
    message = message.slice(name.length + 2);
  }
  return { message, name };
}, "getErrorDetails");
var SOURCE_URL = Symbol("Source URL for Puppeteer evaluation scripts");
var _functionName, _siteString;
var _PuppeteerURL = class {
  constructor() {
    __privateAdd(this, _functionName, void 0);
    __privateAdd(this, _siteString, void 0);
  }
  static fromCallSite(functionName, site) {
    const url = new _PuppeteerURL();
    __privateSet(url, _functionName, functionName);
    __privateSet(url, _siteString, site.toString());
    return url;
  }
  get functionName() {
    return __privateGet(this, _functionName);
  }
  get siteString() {
    return __privateGet(this, _siteString);
  }
  toString() {
    return `pptr:${[
      __privateGet(this, _functionName),
      encodeURIComponent(__privateGet(this, _siteString))
    ].join(";")}`;
  }
};
var PuppeteerURL = _PuppeteerURL;
__name(PuppeteerURL, "PuppeteerURL");
_functionName = new WeakMap();
_siteString = new WeakMap();
__publicField(PuppeteerURL, "INTERNAL_URL", "pptr:internal");
__publicField(PuppeteerURL, "parse", (url) => {
  url = url.slice("pptr:".length);
  const [functionName = "", siteString = ""] = url.split(";");
  const puppeteerUrl = new _PuppeteerURL();
  __privateSet(puppeteerUrl, _functionName, functionName);
  __privateSet(puppeteerUrl, _siteString, decodeURIComponent(siteString));
  return puppeteerUrl;
});
__publicField(PuppeteerURL, "isPuppeteerURL", (url) => {
  return url.startsWith("pptr:");
});
var withSourcePuppeteerURLIfNone = /* @__PURE__ */ __name((functionName, object) => {
  if (Object.prototype.hasOwnProperty.call(object, SOURCE_URL)) {
    return object;
  }
  const original = Error.prepareStackTrace;
  Error.prepareStackTrace = (_3, stack) => {
    return stack[2];
  };
  const site = new Error().stack;
  Error.prepareStackTrace = original;
  return Object.assign(object, {
    [SOURCE_URL]: PuppeteerURL.fromCallSite(functionName, site)
  });
}, "withSourcePuppeteerURLIfNone");
var getSourcePuppeteerURLIfAvailable = /* @__PURE__ */ __name((object) => {
  if (Object.prototype.hasOwnProperty.call(object, SOURCE_URL)) {
    return object[SOURCE_URL];
  }
  return void 0;
}, "getSourcePuppeteerURLIfAvailable");
function valueFromRemoteObject(remoteObject) {
  assert(!remoteObject.objectId, "Cannot extract value when objectId is given");
  if (remoteObject.unserializableValue) {
    if (remoteObject.type === "bigint") {
      return BigInt(remoteObject.unserializableValue.replace("n", ""));
    }
    switch (remoteObject.unserializableValue) {
      case "-0":
        return -0;
      case "NaN":
        return NaN;
      case "Infinity":
        return Infinity;
      case "-Infinity":
        return -Infinity;
      default:
        throw new Error("Unsupported unserializable value: " + remoteObject.unserializableValue);
    }
  }
  return remoteObject.value;
}
__name(valueFromRemoteObject, "valueFromRemoteObject");
async function releaseObject(client, remoteObject) {
  if (!remoteObject.objectId) {
    return;
  }
  await client.send("Runtime.releaseObject", { objectId: remoteObject.objectId }).catch((error) => {
    debugError(error);
  });
}
__name(releaseObject, "releaseObject");
function addEventListener2(emitter, eventName, handler) {
  emitter.on(eventName, handler);
  return { emitter, eventName, handler };
}
__name(addEventListener2, "addEventListener");
function removeEventListeners(listeners) {
  for (const listener of listeners) {
    listener.emitter.removeListener(listener.eventName, listener.handler);
  }
  listeners.length = 0;
}
__name(removeEventListeners, "removeEventListeners");
var isString = /* @__PURE__ */ __name((obj) => {
  return typeof obj === "string" || obj instanceof String;
}, "isString");
var isNumber = /* @__PURE__ */ __name((obj) => {
  return typeof obj === "number" || obj instanceof Number;
}, "isNumber");
async function waitForEvent(emitter, eventName, predicate, timeout, abortPromise) {
  const deferred = Deferred.create({
    message: `Timeout exceeded while waiting for event ${String(eventName)}`,
    timeout
  });
  const listener = addEventListener2(emitter, eventName, async (event) => {
    if (await predicate(event)) {
      deferred.resolve(event);
    }
  });
  try {
    const response = await Deferred.race([deferred, abortPromise]);
    if (isErrorLike(response)) {
      throw response;
    }
    return response;
  } catch (error) {
    throw error;
  } finally {
    removeEventListeners([listener]);
  }
}
__name(waitForEvent, "waitForEvent");
function createJSHandle(context, remoteObject) {
  if (remoteObject.subtype === "node" && context._world) {
    return new CDPElementHandle(context, remoteObject, context._world.frame());
  }
  return new CDPJSHandle(context, remoteObject);
}
__name(createJSHandle, "createJSHandle");
function evaluationString(fun, ...args) {
  if (isString(fun)) {
    assert(args.length === 0, "Cannot evaluate a string with arguments");
    return fun;
  }
  function serializeArgument(arg) {
    if (Object.is(arg, void 0)) {
      return "undefined";
    }
    return JSON.stringify(arg);
  }
  __name(serializeArgument, "serializeArgument");
  return `(${fun})(${args.map(serializeArgument).join(",")})`;
}
__name(evaluationString, "evaluationString");
function addPageBinding(type, name) {
  const callCDP = globalThis[name];
  Object.assign(globalThis, {
    [name](...args) {
      const callPuppeteer = globalThis[name];
      callPuppeteer.args ??= /* @__PURE__ */ new Map();
      callPuppeteer.callbacks ??= /* @__PURE__ */ new Map();
      const seq = (callPuppeteer.lastSeq ?? 0) + 1;
      callPuppeteer.lastSeq = seq;
      callPuppeteer.args.set(seq, args);
      callCDP(JSON.stringify({
        type,
        name,
        seq,
        args,
        isTrivial: !args.some((value) => {
          return value instanceof Node;
        })
      }));
      return new Promise((resolve, reject) => {
        callPuppeteer.callbacks.set(seq, {
          resolve(value) {
            callPuppeteer.args.delete(seq);
            resolve(value);
          },
          reject(value) {
            callPuppeteer.args.delete(seq);
            reject(value);
          }
        });
      });
    }
  });
}
__name(addPageBinding, "addPageBinding");
function pageBindingInitString(type, name) {
  return evaluationString(addPageBinding, type, name);
}
__name(pageBindingInitString, "pageBindingInitString");
async function waitWithTimeout(promise, taskName, timeout) {
  const deferred = Deferred.create({
    message: `waiting for ${taskName} failed: timeout ${timeout}ms exceeded`,
    timeout
  });
  return await Deferred.race([promise, deferred]);
}
__name(waitWithTimeout, "waitWithTimeout");
var fs = null;
async function importFSPromises() {
  if (!fs) {
    try {
      fs = await import("fs/promises");
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error("Cannot write to a path outside of a Node-like environment. fs");
      }
      throw error;
    }
  }
  return fs;
}
__name(importFSPromises, "importFSPromises");
async function getReadableAsBuffer(readable, path) {
  const buffers = [];
  if (path) {
    throw new Error("Cannot write to a path outside of a Node-like environment.");
  } else {
    for await (const chunk of readable) {
      buffers.push(chunk);
    }
  }
  try {
    return Buffer2.concat(buffers);
  } catch (error) {
    console.log(error);
    return null;
  }
}
__name(getReadableAsBuffer, "getReadableAsBuffer");
async function getReadableFromProtocolStream(client, handle) {
  const { Readable } = await import("node:stream");
  let eof = false;
  return new Readable({
    async read(size) {
      if (eof) {
        return;
      }
      try {
        const response = await client.send("IO.read", { handle, size });
        this.push(response.data, response.base64Encoded ? "base64" : void 0);
        if (response.eof) {
          eof = true;
          await client.send("IO.close", { handle });
          this.push(null);
        }
      } catch (error) {
        if (isErrorLike(error)) {
          this.destroy(error);
          return;
        }
        throw error;
      }
    }
  });
}
__name(getReadableFromProtocolStream, "getReadableFromProtocolStream");
async function setPageContent(page, content) {
  return page.evaluate((html) => {
    document.open();
    document.write(html);
    document.close();
  }, content);
}
__name(setPageContent, "setPageContent");
function getPageContent() {
  let content = "";
  for (const node of document.childNodes) {
    switch (node) {
      case document.documentElement:
        content += document.documentElement.outerHTML;
        break;
      default:
        content += new XMLSerializer().serializeToString(node);
        break;
    }
  }
  return content;
}
__name(getPageContent, "getPageContent");
function validateDialogType(type) {
  let dialogType = null;
  const validDialogTypes = /* @__PURE__ */ new Set([
    "alert",
    "confirm",
    "prompt",
    "beforeunload"
  ]);
  if (validDialogTypes.has(type)) {
    dialogType = type;
  }
  assert(dialogType, `Unknown javascript dialog type: ${type}`);
  return dialogType;
}
__name(validateDialogType, "validateDialogType");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/api/Browser.js
var WEB_PERMISSION_TO_PROTOCOL_PERMISSION = /* @__PURE__ */ new Map([
  ["geolocation", "geolocation"],
  ["midi", "midi"],
  ["notifications", "notifications"],
  // TODO: push isn't a valid type?
  // ['push', 'push'],
  ["camera", "videoCapture"],
  ["microphone", "audioCapture"],
  ["background-sync", "backgroundSync"],
  ["ambient-light-sensor", "sensors"],
  ["accelerometer", "sensors"],
  ["gyroscope", "sensors"],
  ["magnetometer", "sensors"],
  ["accessibility-events", "accessibilityEvents"],
  ["clipboard-read", "clipboardReadWrite"],
  ["clipboard-write", "clipboardReadWrite"],
  ["clipboard-sanitized-write", "clipboardSanitizedWrite"],
  ["payment-handler", "paymentHandler"],
  ["persistent-storage", "durableStorage"],
  ["idle-detection", "idleDetection"],
  // chrome-specific permissions we have.
  ["midi-sysex", "midiSysex"]
]);
var Browser = class extends EventEmitter {
  /**
   * @internal
   */
  constructor() {
    super();
  }
  /**
   * @internal
   */
  _attach() {
    throw new Error("Not implemented");
  }
  /**
   * @internal
   */
  _detach() {
    throw new Error("Not implemented");
  }
  /**
   * @internal
   */
  get _targets() {
    throw new Error("Not implemented");
  }
  /**
   * The spawned browser process. Returns `null` if the browser instance was created with
   * {@link Puppeteer.connect}.
   */
  process() {
    throw new Error("Not implemented");
  }
  /**
   * @internal
   */
  _getIsPageTargetCallback() {
    throw new Error("Not implemented");
  }
  createIncognitoBrowserContext() {
    throw new Error("Not implemented");
  }
  /**
   * Returns an array of all open browser contexts. In a newly created browser, this will
   * return a single instance of {@link BrowserContext}.
   */
  browserContexts() {
    throw new Error("Not implemented");
  }
  /**
   * Returns the default browser context. The default browser context cannot be closed.
   */
  defaultBrowserContext() {
    throw new Error("Not implemented");
  }
  _disposeContext() {
    throw new Error("Not implemented");
  }
  /**
   * The browser websocket endpoint which can be used as an argument to
   * {@link Puppeteer.connect}.
   *
   * @returns The Browser websocket url.
   *
   * @remarks
   *
   * The format is `ws://${host}:${port}/devtools/browser/<id>`.
   *
   * You can find the `webSocketDebuggerUrl` from `http://${host}:${port}/json/version`.
   * Learn more about the
   * {@link https://chromedevtools.github.io/devtools-protocol | devtools protocol} and
   * the {@link
   * https://chromedevtools.github.io/devtools-protocol/#how-do-i-access-the-browser-target
   * | browser endpoint}.
   */
  wsEndpoint() {
    throw new Error("Not implemented");
  }
  /**
   * Promise which resolves to a new {@link Page} object. The Page is created in
   * a default browser context.
   */
  newPage() {
    throw new Error("Not implemented");
  }
  _createPageInContext() {
    throw new Error("Not implemented");
  }
  /**
   * All active targets inside the Browser. In case of multiple browser contexts, returns
   * an array with all the targets in all browser contexts.
   */
  targets() {
    throw new Error("Not implemented");
  }
  /**
   * The target associated with the browser.
   */
  target() {
    throw new Error("Not implemented");
  }
  /**
   * Searches for a target in all browser contexts.
   *
   * @param predicate - A function to be run for every target.
   * @returns The first target found that matches the `predicate` function.
   *
   * @example
   *
   * An example of finding a target for a page opened via `window.open`:
   *
   * ```ts
   * await page.evaluate(() => window.open('https://www.example.com/'));
   * const newWindowTarget = await browser.waitForTarget(
   *   target => target.url() === 'https://www.example.com/'
   * );
   * ```
   */
  async waitForTarget(predicate, options = {}) {
    const { timeout = 3e4 } = options;
    const targetDeferred = Deferred.create();
    this.on("targetcreated", check);
    this.on("targetchanged", check);
    try {
      this.targets().forEach(check);
      if (!timeout) {
        return await targetDeferred.valueOrThrow();
      }
      return await waitWithTimeout(targetDeferred.valueOrThrow(), "target", timeout);
    } finally {
      this.off("targetcreated", check);
      this.off("targetchanged", check);
    }
    async function check(target) {
      if (await predicate(target) && !targetDeferred.resolved()) {
        targetDeferred.resolve(target);
      }
    }
    __name(check, "check");
  }
  /**
   * An array of all open pages inside the Browser.
   *
   * @remarks
   *
   * In case of multiple browser contexts, returns an array with all the pages in all
   * browser contexts. Non-visible pages, such as `"background_page"`, will not be listed
   * here. You can find them using {@link Target.page}.
   */
  async pages() {
    const contextPages = await Promise.all(this.browserContexts().map((context) => {
      return context.pages();
    }));
    return contextPages.reduce((acc, x3) => {
      return acc.concat(x3);
    }, []);
  }
  /**
   * Get the BISO session ID associated with this browser
   *
   * @public
   */
  sessionId() {
    throw new Error("Not implemented");
  }
  /**
   * A string representing the browser name and version.
   *
   * @remarks
   *
   * For headless browser, this is similar to `HeadlessChrome/61.0.3153.0`. For
   * non-headless or new-headless, this is similar to `Chrome/61.0.3153.0`. For
   * Firefox, it is similar to `Firefox/116.0a1`.
   *
   * The format of browser.version() might change with future releases of
   * browsers.
   */
  version() {
    throw new Error("Not implemented");
  }
  /**
   * The browser's original user agent. Pages can override the browser user agent with
   * {@link Page.setUserAgent}.
   */
  userAgent() {
    throw new Error("Not implemented");
  }
  /**
   * Closes the browser and all of its pages (if any were opened). The
   * {@link Browser} object itself is considered to be disposed and cannot be
   * used anymore.
   */
  close() {
    throw new Error("Not implemented");
  }
  /**
   * Disconnects Puppeteer from the browser, but leaves the browser process running.
   * After calling `disconnect`, the {@link Browser} object is considered disposed and
   * cannot be used anymore.
   */
  disconnect() {
    throw new Error("Not implemented");
  }
  /**
   * Indicates that the browser is connected.
   */
  isConnected() {
    throw new Error("Not implemented");
  }
};
__name(Browser, "Browser");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/api/BrowserContext.js
init_checked_fetch();
init_modules_watch_stub();
var BrowserContext = class extends EventEmitter {
  /**
   * @internal
   */
  constructor() {
    super();
  }
  /**
   * An array of all active targets inside the browser context.
   */
  targets() {
    throw new Error("Not implemented");
  }
  waitForTarget() {
    throw new Error("Not implemented");
  }
  /**
   * An array of all pages inside the browser context.
   *
   * @returns Promise which resolves to an array of all open pages.
   * Non visible pages, such as `"background_page"`, will not be listed here.
   * You can find them using {@link Target.page | the target page}.
   */
  pages() {
    throw new Error("Not implemented");
  }
  /**
   * Returns whether BrowserContext is incognito.
   * The default browser context is the only non-incognito browser context.
   *
   * @remarks
   * The default browser context cannot be closed.
   */
  isIncognito() {
    throw new Error("Not implemented");
  }
  overridePermissions() {
    throw new Error("Not implemented");
  }
  /**
   * Clears all permission overrides for the browser context.
   *
   * @example
   *
   * ```ts
   * const context = browser.defaultBrowserContext();
   * context.overridePermissions('https://example.com', ['clipboard-read']);
   * // do stuff ..
   * context.clearPermissionOverrides();
   * ```
   */
  clearPermissionOverrides() {
    throw new Error("Not implemented");
  }
  /**
   * Creates a new page in the browser context.
   */
  newPage() {
    throw new Error("Not implemented");
  }
  /**
   * The browser this browser context belongs to.
   */
  browser() {
    throw new Error("Not implemented");
  }
  /**
   * Closes the browser context. All the targets that belong to the browser context
   * will be closed.
   *
   * @remarks
   * Only incognito browser contexts can be closed.
   */
  close() {
    throw new Error("Not implemented");
  }
  get id() {
    return void 0;
  }
};
__name(BrowserContext, "BrowserContext");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/ChromeTargetManager.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Connection.js
init_checked_fetch();
init_modules_watch_stub();
var debugProtocolSend = debug("puppeteer:protocol:SEND \u25BA");
var debugProtocolReceive = debug("puppeteer:protocol:RECV \u25C0");
var ConnectionEmittedEvents = {
  Disconnected: Symbol("Connection.Disconnected")
};
function createIncrementalIdGenerator() {
  let id = 0;
  return () => {
    return ++id;
  };
}
__name(createIncrementalIdGenerator, "createIncrementalIdGenerator");
var Callback = class {
  #id;
  #error = new ProtocolError();
  #deferred = Deferred.create();
  #timer;
  #label;
  constructor(id, label, timeout) {
    this.#id = id;
    this.#label = label;
    if (timeout) {
      this.#timer = setTimeout(() => {
        this.#deferred.reject(rewriteError(this.#error, `${label} timed out. Increase the 'protocolTimeout' setting in launch/connect calls for a higher timeout if needed.`));
      }, timeout);
    }
  }
  resolve(value) {
    clearTimeout(this.#timer);
    this.#deferred.resolve(value);
  }
  reject(error) {
    clearTimeout(this.#timer);
    this.#deferred.reject(error);
  }
  get id() {
    return this.#id;
  }
  get promise() {
    return this.#deferred;
  }
  get error() {
    return this.#error;
  }
  get label() {
    return this.#label;
  }
};
__name(Callback, "Callback");
var CallbackRegistry = class {
  #callbacks = /* @__PURE__ */ new Map();
  #idGenerator = createIncrementalIdGenerator();
  create(label, timeout, request) {
    const callback = new Callback(this.#idGenerator(), label, timeout);
    this.#callbacks.set(callback.id, callback);
    try {
      request(callback.id);
    } catch (error) {
      callback.promise.valueOrThrow().catch(debugError).finally(() => {
        this.#callbacks.delete(callback.id);
      });
      callback.reject(error);
      throw error;
    }
    return callback.promise.valueOrThrow().finally(() => {
      this.#callbacks.delete(callback.id);
    });
  }
  reject(id, message, originalMessage) {
    const callback = this.#callbacks.get(id);
    if (!callback) {
      return;
    }
    this._reject(callback, message, originalMessage);
  }
  _reject(callback, errorMessage, originalMessage) {
    const isError = errorMessage instanceof ProtocolError;
    const message = isError ? errorMessage.message : errorMessage;
    const error = isError ? errorMessage : callback.error;
    callback.reject(rewriteError(error, `Protocol error (${callback.label}): ${message}`, originalMessage));
  }
  resolve(id, value) {
    const callback = this.#callbacks.get(id);
    if (!callback) {
      return;
    }
    callback.resolve(value);
  }
  clear() {
    for (const callback of this.#callbacks.values()) {
      this._reject(callback, new TargetCloseError("Target closed"));
    }
    this.#callbacks.clear();
  }
};
__name(CallbackRegistry, "CallbackRegistry");
var Connection = class extends EventEmitter {
  #url;
  #transport;
  #delay;
  #timeout;
  #sessions = /* @__PURE__ */ new Map();
  #closed = false;
  #manuallyAttached = /* @__PURE__ */ new Set();
  #callbacks = new CallbackRegistry();
  constructor(url, transport, delay = 0, timeout) {
    super();
    this.#url = url;
    this.#delay = delay;
    this.#timeout = timeout ?? 18e4;
    this.#transport = transport;
    this.#transport.onmessage = this.onMessage.bind(this);
    this.#transport.onclose = this.#onClose.bind(this);
  }
  static fromSession(session) {
    return session.connection();
  }
  get timeout() {
    return this.#timeout;
  }
  /**
   * @internal
   */
  get _closed() {
    return this.#closed;
  }
  /**
   * @internal
   */
  get _sessions() {
    return this.#sessions;
  }
  /**
   * @param sessionId - The session id
   * @returns The current CDP session if it exists
   */
  session(sessionId) {
    return this.#sessions.get(sessionId) || null;
  }
  url() {
    return this.#url;
  }
  send(method, ...paramArgs) {
    const params = paramArgs.length ? paramArgs[0] : void 0;
    return this._rawSend(this.#callbacks, method, params);
  }
  /**
   * @internal
   */
  _rawSend(callbacks, method, params, sessionId) {
    return callbacks.create(method, this.#timeout, (id) => {
      const stringifiedMessage = JSON.stringify({
        method,
        params,
        id,
        sessionId
      });
      debugProtocolSend(stringifiedMessage);
      this.#transport.send(stringifiedMessage);
    });
  }
  /**
   * @internal
   */
  async closeBrowser() {
    await this.send("Browser.close");
  }
  /**
   * @internal
   */
  async onMessage(message) {
    if (this.#delay) {
      await new Promise((r2) => {
        return setTimeout(r2, this.#delay);
      });
    }
    debugProtocolReceive(message);
    const object = JSON.parse(message);
    if (object.method === "Target.attachedToTarget") {
      const sessionId = object.params.sessionId;
      const session = new CDPSessionImpl(this, object.params.targetInfo.type, sessionId, object.sessionId);
      this.#sessions.set(sessionId, session);
      this.emit("sessionattached", session);
      const parentSession = this.#sessions.get(object.sessionId);
      if (parentSession) {
        parentSession.emit("sessionattached", session);
      }
    } else if (object.method === "Target.detachedFromTarget") {
      const session = this.#sessions.get(object.params.sessionId);
      if (session) {
        session._onClosed();
        this.#sessions.delete(object.params.sessionId);
        this.emit("sessiondetached", session);
        const parentSession = this.#sessions.get(object.sessionId);
        if (parentSession) {
          parentSession.emit("sessiondetached", session);
        }
      }
    }
    if (object.sessionId) {
      const session = this.#sessions.get(object.sessionId);
      if (session) {
        session._onMessage(object);
      }
    } else if (object.id) {
      if (object.error) {
        this.#callbacks.reject(object.id, createProtocolErrorMessage(object), object.error.message);
      } else {
        this.#callbacks.resolve(object.id, object.result);
      }
    } else {
      this.emit(object.method, object.params);
    }
  }
  #onClose() {
    if (this.#closed) {
      return;
    }
    this.#closed = true;
    this.#transport.onmessage = void 0;
    this.#transport.onclose = void 0;
    this.#callbacks.clear();
    for (const session of this.#sessions.values()) {
      session._onClosed();
    }
    this.#sessions.clear();
    this.emit(ConnectionEmittedEvents.Disconnected);
  }
  dispose() {
    this.#onClose();
    this.#transport.close();
  }
  /**
   * @internal
   */
  isAutoAttached(targetId) {
    return !this.#manuallyAttached.has(targetId);
  }
  /**
   * @internal
   */
  async _createSession(targetInfo, isAutoAttachEmulated = true) {
    if (!isAutoAttachEmulated) {
      this.#manuallyAttached.add(targetInfo.targetId);
    }
    const { sessionId } = await this.send("Target.attachToTarget", {
      targetId: targetInfo.targetId,
      flatten: true
    });
    this.#manuallyAttached.delete(targetInfo.targetId);
    const session = this.#sessions.get(sessionId);
    if (!session) {
      throw new Error("CDPSession creation failed.");
    }
    return session;
  }
  /**
   * @param targetInfo - The target info
   * @returns The CDP session that is created
   */
  async createSession(targetInfo) {
    return await this._createSession(targetInfo, false);
  }
};
__name(Connection, "Connection");
var CDPSessionEmittedEvents = {
  Disconnected: Symbol("CDPSession.Disconnected")
};
var CDPSession = class extends EventEmitter {
  /**
   * @internal
   */
  constructor() {
    super();
  }
  connection() {
    throw new Error("Not implemented");
  }
  /**
   * Parent session in terms of CDP's auto-attach mechanism.
   *
   * @internal
   */
  parentSession() {
    return void 0;
  }
  send() {
    throw new Error("Not implemented");
  }
  /**
   * Detaches the cdpSession from the target. Once detached, the cdpSession object
   * won't emit any events and can't be used to send messages.
   */
  async detach() {
    throw new Error("Not implemented");
  }
  /**
   * Returns the session's id.
   */
  id() {
    throw new Error("Not implemented");
  }
};
__name(CDPSession, "CDPSession");
var CDPSessionImpl = class extends CDPSession {
  #sessionId;
  #targetType;
  #callbacks = new CallbackRegistry();
  #connection;
  #parentSessionId;
  /**
   * @internal
   */
  constructor(connection, targetType, sessionId, parentSessionId) {
    super();
    this.#connection = connection;
    this.#targetType = targetType;
    this.#sessionId = sessionId;
    this.#parentSessionId = parentSessionId;
  }
  connection() {
    return this.#connection;
  }
  parentSession() {
    if (!this.#parentSessionId) {
      return;
    }
    const parent = this.#connection?.session(this.#parentSessionId);
    return parent ?? void 0;
  }
  send(method, ...paramArgs) {
    if (!this.#connection) {
      return Promise.reject(new TargetCloseError(`Protocol error (${method}): Session closed. Most likely the ${this.#targetType} has been closed.`));
    }
    const params = paramArgs.length ? paramArgs[0] : void 0;
    return this.#connection._rawSend(this.#callbacks, method, params, this.#sessionId);
  }
  /**
   * @internal
   */
  _onMessage(object) {
    if (object.id) {
      if (object.error) {
        this.#callbacks.reject(object.id, createProtocolErrorMessage(object), object.error.message);
      } else {
        this.#callbacks.resolve(object.id, object.result);
      }
    } else {
      assert(!object.id);
      this.emit(object.method, object.params);
    }
  }
  /**
   * Detaches the cdpSession from the target. Once detached, the cdpSession object
   * won't emit any events and can't be used to send messages.
   */
  async detach() {
    if (!this.#connection) {
      throw new Error(`Session already detached. Most likely the ${this.#targetType} has been closed.`);
    }
    await this.#connection.send("Target.detachFromTarget", {
      sessionId: this.#sessionId
    });
  }
  /**
   * @internal
   */
  _onClosed() {
    this.#callbacks.clear();
    this.#connection = void 0;
    this.emit(CDPSessionEmittedEvents.Disconnected);
  }
  /**
   * Returns the session's id.
   */
  id() {
    return this.#sessionId;
  }
};
__name(CDPSessionImpl, "CDPSessionImpl");
function createProtocolErrorMessage(object) {
  let message = `${object.error.message}`;
  if (object.error && typeof object.error === "object" && "data" in object.error) {
    message += ` ${object.error.data}`;
  }
  return message;
}
__name(createProtocolErrorMessage, "createProtocolErrorMessage");
function rewriteError(error, message, originalMessage) {
  error.message = message;
  error.originalMessage = originalMessage ?? error.originalMessage;
  return error;
}
__name(rewriteError, "rewriteError");
function isTargetClosedError(error) {
  return error instanceof TargetCloseError;
}
__name(isTargetClosedError, "isTargetClosedError");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Target.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/api/Target.js
init_checked_fetch();
init_modules_watch_stub();
var TargetType;
(function(TargetType2) {
  TargetType2["PAGE"] = "page";
  TargetType2["BACKGROUND_PAGE"] = "background_page";
  TargetType2["SERVICE_WORKER"] = "service_worker";
  TargetType2["SHARED_WORKER"] = "shared_worker";
  TargetType2["BROWSER"] = "browser";
  TargetType2["WEBVIEW"] = "webview";
  TargetType2["OTHER"] = "other";
})(TargetType || (TargetType = {}));
var Target = class {
  /**
   * @internal
   */
  constructor() {
  }
  /**
   * If the target is not of type `"service_worker"` or `"shared_worker"`, returns `null`.
   */
  async worker() {
    return null;
  }
  /**
   * If the target is not of type `"page"`, `"webview"` or `"background_page"`,
   * returns `null`.
   */
  async page() {
    return null;
  }
  url() {
    throw new Error("not implemented");
  }
  /**
   * Creates a Chrome Devtools Protocol session attached to the target.
   */
  createCDPSession() {
    throw new Error("not implemented");
  }
  /**
   * Identifies what kind of target this is.
   *
   * @remarks
   *
   * See {@link https://developer.chrome.com/extensions/background_pages | docs} for more info about background pages.
   */
  type() {
    throw new Error("not implemented");
  }
  /**
   * Get the browser the target belongs to.
   */
  browser() {
    throw new Error("not implemented");
  }
  /**
   * Get the browser context the target belongs to.
   */
  browserContext() {
    throw new Error("not implemented");
  }
  /**
   * Get the target that opened this target. Top-level targets return `null`.
   */
  opener() {
    throw new Error("not implemented");
  }
};
__name(Target, "Target");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Page.js
init_checked_fetch();
init_modules_watch_stub();
import { Buffer as Buffer4 } from "node:buffer";

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/api/Page.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/NetworkManager.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/util/DebuggableDeferred.js
init_checked_fetch();
init_modules_watch_stub();
function createDebuggableDeferred(message) {
  if (DEFERRED_PROMISE_DEBUG_TIMEOUT > 0) {
    return Deferred.create({
      message,
      timeout: DEFERRED_PROMISE_DEBUG_TIMEOUT
    });
  }
  return Deferred.create();
}
__name(createDebuggableDeferred, "createDebuggableDeferred");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/HTTPRequest.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/api/HTTPRequest.js
init_checked_fetch();
init_modules_watch_stub();
var HTTPRequest = class {
  /**
   * @internal
   */
  _requestId = "";
  /**
   * @internal
   */
  _interceptionId;
  /**
   * @internal
   */
  _failureText = null;
  /**
   * @internal
   */
  _response = null;
  /**
   * @internal
   */
  _fromMemoryCache = false;
  /**
   * @internal
   */
  _redirectChain = [];
  /**
   * Warning! Using this client can break Puppeteer. Use with caution.
   *
   * @experimental
   */
  get client() {
    throw new Error("Not implemented");
  }
  /**
   * @internal
   */
  constructor() {
  }
  /**
   * The URL of the request
   */
  url() {
    throw new Error("Not implemented");
  }
  /**
   * The `ContinueRequestOverrides` that will be used
   * if the interception is allowed to continue (ie, `abort()` and
   * `respond()` aren't called).
   */
  continueRequestOverrides() {
    throw new Error("Not implemented");
  }
  /**
   * The `ResponseForRequest` that gets used if the
   * interception is allowed to respond (ie, `abort()` is not called).
   */
  responseForRequest() {
    throw new Error("Not implemented");
  }
  /**
   * The most recent reason for aborting the request
   */
  abortErrorReason() {
    throw new Error("Not implemented");
  }
  /**
   * An InterceptResolutionState object describing the current resolution
   * action and priority.
   *
   * InterceptResolutionState contains:
   * action: InterceptResolutionAction
   * priority?: number
   *
   * InterceptResolutionAction is one of: `abort`, `respond`, `continue`,
   * `disabled`, `none`, or `already-handled`.
   */
  interceptResolutionState() {
    throw new Error("Not implemented");
  }
  /**
   * Is `true` if the intercept resolution has already been handled,
   * `false` otherwise.
   */
  isInterceptResolutionHandled() {
    throw new Error("Not implemented");
  }
  enqueueInterceptAction() {
    throw new Error("Not implemented");
  }
  /**
   * Awaits pending interception handlers and then decides how to fulfill
   * the request interception.
   */
  async finalizeInterceptions() {
    throw new Error("Not implemented");
  }
  /**
   * Contains the request's resource type as it was perceived by the rendering
   * engine.
   */
  resourceType() {
    throw new Error("Not implemented");
  }
  /**
   * The method used (`GET`, `POST`, etc.)
   */
  method() {
    throw new Error("Not implemented");
  }
  /**
   * The request's post body, if any.
   */
  postData() {
    throw new Error("Not implemented");
  }
  /**
   * An object with HTTP headers associated with the request. All
   * header names are lower-case.
   */
  headers() {
    throw new Error("Not implemented");
  }
  /**
   * A matching `HTTPResponse` object, or null if the response has not
   * been received yet.
   */
  response() {
    throw new Error("Not implemented");
  }
  /**
   * The frame that initiated the request, or null if navigating to
   * error pages.
   */
  frame() {
    throw new Error("Not implemented");
  }
  /**
   * True if the request is the driver of the current frame's navigation.
   */
  isNavigationRequest() {
    throw new Error("Not implemented");
  }
  /**
   * The initiator of the request.
   */
  initiator() {
    throw new Error("Not implemented");
  }
  /**
   * A `redirectChain` is a chain of requests initiated to fetch a resource.
   * @remarks
   *
   * `redirectChain` is shared between all the requests of the same chain.
   *
   * For example, if the website `http://example.com` has a single redirect to
   * `https://example.com`, then the chain will contain one request:
   *
   * ```ts
   * const response = await page.goto('http://example.com');
   * const chain = response.request().redirectChain();
   * console.log(chain.length); // 1
   * console.log(chain[0].url()); // 'http://example.com'
   * ```
   *
   * If the website `https://google.com` has no redirects, then the chain will be empty:
   *
   * ```ts
   * const response = await page.goto('https://google.com');
   * const chain = response.request().redirectChain();
   * console.log(chain.length); // 0
   * ```
   *
   * @returns the chain of requests - if a server responds with at least a
   * single redirect, this chain will contain all requests that were redirected.
   */
  redirectChain() {
    throw new Error("Not implemented");
  }
  /**
   * Access information about the request's failure.
   *
   * @remarks
   *
   * @example
   *
   * Example of logging all failed requests:
   *
   * ```ts
   * page.on('requestfailed', request => {
   *   console.log(request.url() + ' ' + request.failure().errorText);
   * });
   * ```
   *
   * @returns `null` unless the request failed. If the request fails this can
   * return an object with `errorText` containing a human-readable error
   * message, e.g. `net::ERR_FAILED`. It is not guaranteed that there will be
   * failure text if the request fails.
   */
  failure() {
    throw new Error("Not implemented");
  }
  async continue() {
    throw new Error("Not implemented");
  }
  async respond() {
    throw new Error("Not implemented");
  }
  async abort() {
    throw new Error("Not implemented");
  }
};
__name(HTTPRequest, "HTTPRequest");
var InterceptResolutionAction;
(function(InterceptResolutionAction2) {
  InterceptResolutionAction2["Abort"] = "abort";
  InterceptResolutionAction2["Respond"] = "respond";
  InterceptResolutionAction2["Continue"] = "continue";
  InterceptResolutionAction2["Disabled"] = "disabled";
  InterceptResolutionAction2["None"] = "none";
  InterceptResolutionAction2["AlreadyHandled"] = "already-handled";
})(InterceptResolutionAction || (InterceptResolutionAction = {}));
function headersArray(headers) {
  const result = [];
  for (const name in headers) {
    const value = headers[name];
    if (!Object.is(value, void 0)) {
      const values = Array.isArray(value) ? value : [value];
      result.push(...values.map((value2) => {
        return { name, value: value2 + "" };
      }));
    }
  }
  return result;
}
__name(headersArray, "headersArray");
var STATUS_TEXTS = {
  "100": "Continue",
  "101": "Switching Protocols",
  "102": "Processing",
  "103": "Early Hints",
  "200": "OK",
  "201": "Created",
  "202": "Accepted",
  "203": "Non-Authoritative Information",
  "204": "No Content",
  "205": "Reset Content",
  "206": "Partial Content",
  "207": "Multi-Status",
  "208": "Already Reported",
  "226": "IM Used",
  "300": "Multiple Choices",
  "301": "Moved Permanently",
  "302": "Found",
  "303": "See Other",
  "304": "Not Modified",
  "305": "Use Proxy",
  "306": "Switch Proxy",
  "307": "Temporary Redirect",
  "308": "Permanent Redirect",
  "400": "Bad Request",
  "401": "Unauthorized",
  "402": "Payment Required",
  "403": "Forbidden",
  "404": "Not Found",
  "405": "Method Not Allowed",
  "406": "Not Acceptable",
  "407": "Proxy Authentication Required",
  "408": "Request Timeout",
  "409": "Conflict",
  "410": "Gone",
  "411": "Length Required",
  "412": "Precondition Failed",
  "413": "Payload Too Large",
  "414": "URI Too Long",
  "415": "Unsupported Media Type",
  "416": "Range Not Satisfiable",
  "417": "Expectation Failed",
  "418": "I'm a teapot",
  "421": "Misdirected Request",
  "422": "Unprocessable Entity",
  "423": "Locked",
  "424": "Failed Dependency",
  "425": "Too Early",
  "426": "Upgrade Required",
  "428": "Precondition Required",
  "429": "Too Many Requests",
  "431": "Request Header Fields Too Large",
  "451": "Unavailable For Legal Reasons",
  "500": "Internal Server Error",
  "501": "Not Implemented",
  "502": "Bad Gateway",
  "503": "Service Unavailable",
  "504": "Gateway Timeout",
  "505": "HTTP Version Not Supported",
  "506": "Variant Also Negotiates",
  "507": "Insufficient Storage",
  "508": "Loop Detected",
  "510": "Not Extended",
  "511": "Network Authentication Required"
};

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/HTTPRequest.js
var HTTPRequest2 = class extends HTTPRequest {
  _requestId;
  _interceptionId;
  _failureText = null;
  _response = null;
  _fromMemoryCache = false;
  _redirectChain;
  #client;
  #isNavigationRequest;
  #allowInterception;
  #interceptionHandled = false;
  #url;
  #resourceType;
  #method;
  #postData;
  #headers = {};
  #frame;
  #continueRequestOverrides;
  #responseForRequest = null;
  #abortErrorReason = null;
  #interceptResolutionState = {
    action: InterceptResolutionAction.None
  };
  #interceptHandlers;
  #initiator;
  get client() {
    return this.#client;
  }
  constructor(client, frame, interceptionId, allowInterception, data, redirectChain) {
    super();
    this.#client = client;
    this._requestId = data.requestId;
    this.#isNavigationRequest = data.requestId === data.loaderId && data.type === "Document";
    this._interceptionId = interceptionId;
    this.#allowInterception = allowInterception;
    this.#url = data.request.url;
    this.#resourceType = (data.type || "other").toLowerCase();
    this.#method = data.request.method;
    this.#postData = data.request.postData;
    this.#frame = frame;
    this._redirectChain = redirectChain;
    this.#continueRequestOverrides = {};
    this.#interceptHandlers = [];
    this.#initiator = data.initiator;
    for (const [key, value] of Object.entries(data.request.headers)) {
      this.#headers[key.toLowerCase()] = value;
    }
  }
  url() {
    return this.#url;
  }
  continueRequestOverrides() {
    assert(this.#allowInterception, "Request Interception is not enabled!");
    return this.#continueRequestOverrides;
  }
  responseForRequest() {
    assert(this.#allowInterception, "Request Interception is not enabled!");
    return this.#responseForRequest;
  }
  abortErrorReason() {
    assert(this.#allowInterception, "Request Interception is not enabled!");
    return this.#abortErrorReason;
  }
  interceptResolutionState() {
    if (!this.#allowInterception) {
      return { action: InterceptResolutionAction.Disabled };
    }
    if (this.#interceptionHandled) {
      return { action: InterceptResolutionAction.AlreadyHandled };
    }
    return { ...this.#interceptResolutionState };
  }
  isInterceptResolutionHandled() {
    return this.#interceptionHandled;
  }
  enqueueInterceptAction(pendingHandler) {
    this.#interceptHandlers.push(pendingHandler);
  }
  async finalizeInterceptions() {
    await this.#interceptHandlers.reduce((promiseChain, interceptAction) => {
      return promiseChain.then(interceptAction);
    }, Promise.resolve());
    const { action } = this.interceptResolutionState();
    switch (action) {
      case "abort":
        return this.#abort(this.#abortErrorReason);
      case "respond":
        if (this.#responseForRequest === null) {
          throw new Error("Response is missing for the interception");
        }
        return this.#respond(this.#responseForRequest);
      case "continue":
        return this.#continue(this.#continueRequestOverrides);
    }
  }
  resourceType() {
    return this.#resourceType;
  }
  method() {
    return this.#method;
  }
  postData() {
    return this.#postData;
  }
  headers() {
    return this.#headers;
  }
  response() {
    return this._response;
  }
  frame() {
    return this.#frame;
  }
  isNavigationRequest() {
    return this.#isNavigationRequest;
  }
  initiator() {
    return this.#initiator;
  }
  redirectChain() {
    return this._redirectChain.slice();
  }
  failure() {
    if (!this._failureText) {
      return null;
    }
    return {
      errorText: this._failureText
    };
  }
  async continue(overrides = {}, priority) {
    if (this.#url.startsWith("data:")) {
      return;
    }
    assert(this.#allowInterception, "Request Interception is not enabled!");
    assert(!this.#interceptionHandled, "Request is already handled!");
    if (priority === void 0) {
      return this.#continue(overrides);
    }
    this.#continueRequestOverrides = overrides;
    if (this.#interceptResolutionState.priority === void 0 || priority > this.#interceptResolutionState.priority) {
      this.#interceptResolutionState = {
        action: InterceptResolutionAction.Continue,
        priority
      };
      return;
    }
    if (priority === this.#interceptResolutionState.priority) {
      if (this.#interceptResolutionState.action === "abort" || this.#interceptResolutionState.action === "respond") {
        return;
      }
      this.#interceptResolutionState.action = InterceptResolutionAction.Continue;
    }
    return;
  }
  async #continue(overrides = {}) {
    const { url, method, postData, headers } = overrides;
    this.#interceptionHandled = true;
    const postDataBinaryBase64 = postData ? Buffer.from(postData).toString("base64") : void 0;
    if (this._interceptionId === void 0) {
      throw new Error("HTTPRequest is missing _interceptionId needed for Fetch.continueRequest");
    }
    await this.#client.send("Fetch.continueRequest", {
      requestId: this._interceptionId,
      url,
      method,
      postData: postDataBinaryBase64,
      headers: headers ? headersArray(headers) : void 0
    }).catch((error) => {
      this.#interceptionHandled = false;
      return handleError(error);
    });
  }
  async respond(response, priority) {
    if (this.#url.startsWith("data:")) {
      return;
    }
    assert(this.#allowInterception, "Request Interception is not enabled!");
    assert(!this.#interceptionHandled, "Request is already handled!");
    if (priority === void 0) {
      return this.#respond(response);
    }
    this.#responseForRequest = response;
    if (this.#interceptResolutionState.priority === void 0 || priority > this.#interceptResolutionState.priority) {
      this.#interceptResolutionState = {
        action: InterceptResolutionAction.Respond,
        priority
      };
      return;
    }
    if (priority === this.#interceptResolutionState.priority) {
      if (this.#interceptResolutionState.action === "abort") {
        return;
      }
      this.#interceptResolutionState.action = InterceptResolutionAction.Respond;
    }
  }
  async #respond(response) {
    this.#interceptionHandled = true;
    const responseBody = response.body && isString(response.body) ? Buffer.from(response.body) : response.body || null;
    const responseHeaders = {};
    if (response.headers) {
      for (const header of Object.keys(response.headers)) {
        const value = response.headers[header];
        responseHeaders[header.toLowerCase()] = Array.isArray(value) ? value.map((item) => {
          return String(item);
        }) : String(value);
      }
    }
    if (response.contentType) {
      responseHeaders["content-type"] = response.contentType;
    }
    if (responseBody && !("content-length" in responseHeaders)) {
      responseHeaders["content-length"] = String(Buffer.byteLength(responseBody));
    }
    const status = response.status || 200;
    if (this._interceptionId === void 0) {
      throw new Error("HTTPRequest is missing _interceptionId needed for Fetch.fulfillRequest");
    }
    await this.#client.send("Fetch.fulfillRequest", {
      requestId: this._interceptionId,
      responseCode: status,
      responsePhrase: STATUS_TEXTS[status],
      responseHeaders: headersArray(responseHeaders),
      body: responseBody ? responseBody.toString("base64") : void 0
    }).catch((error) => {
      this.#interceptionHandled = false;
      return handleError(error);
    });
  }
  async abort(errorCode = "failed", priority) {
    if (this.#url.startsWith("data:")) {
      return;
    }
    const errorReason = errorReasons[errorCode];
    assert(errorReason, "Unknown error code: " + errorCode);
    assert(this.#allowInterception, "Request Interception is not enabled!");
    assert(!this.#interceptionHandled, "Request is already handled!");
    if (priority === void 0) {
      return this.#abort(errorReason);
    }
    this.#abortErrorReason = errorReason;
    if (this.#interceptResolutionState.priority === void 0 || priority >= this.#interceptResolutionState.priority) {
      this.#interceptResolutionState = {
        action: InterceptResolutionAction.Abort,
        priority
      };
      return;
    }
  }
  async #abort(errorReason) {
    this.#interceptionHandled = true;
    if (this._interceptionId === void 0) {
      throw new Error("HTTPRequest is missing _interceptionId needed for Fetch.failRequest");
    }
    await this.#client.send("Fetch.failRequest", {
      requestId: this._interceptionId,
      errorReason: errorReason || "Failed"
    }).catch(handleError);
  }
};
__name(HTTPRequest2, "HTTPRequest");
var errorReasons = {
  aborted: "Aborted",
  accessdenied: "AccessDenied",
  addressunreachable: "AddressUnreachable",
  blockedbyclient: "BlockedByClient",
  blockedbyresponse: "BlockedByResponse",
  connectionaborted: "ConnectionAborted",
  connectionclosed: "ConnectionClosed",
  connectionfailed: "ConnectionFailed",
  connectionrefused: "ConnectionRefused",
  connectionreset: "ConnectionReset",
  internetdisconnected: "InternetDisconnected",
  namenotresolved: "NameNotResolved",
  timedout: "TimedOut",
  failed: "Failed"
};
async function handleError(error) {
  if (["Invalid header"].includes(error.originalMessage)) {
    throw error;
  }
  debugError(error);
}
__name(handleError, "handleError");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/HTTPResponse.js
init_checked_fetch();
init_modules_watch_stub();
import { Buffer as Buffer3 } from "node:buffer";

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/api/HTTPResponse.js
init_checked_fetch();
init_modules_watch_stub();
var HTTPResponse = class {
  /**
   * @internal
   */
  constructor() {
  }
  /**
   * @internal
   */
  _resolveBody(_err) {
    throw new Error("Not implemented");
  }
  /**
   * The IP address and port number used to connect to the remote
   * server.
   */
  remoteAddress() {
    throw new Error("Not implemented");
  }
  /**
   * The URL of the response.
   */
  url() {
    throw new Error("Not implemented");
  }
  /**
   * True if the response was successful (status in the range 200-299).
   */
  ok() {
    const status = this.status();
    return status === 0 || status >= 200 && status <= 299;
  }
  /**
   * The status code of the response (e.g., 200 for a success).
   */
  status() {
    throw new Error("Not implemented");
  }
  /**
   * The status text of the response (e.g. usually an "OK" for a
   * success).
   */
  statusText() {
    throw new Error("Not implemented");
  }
  /**
   * An object with HTTP headers associated with the response. All
   * header names are lower-case.
   */
  headers() {
    throw new Error("Not implemented");
  }
  /**
   * {@link SecurityDetails} if the response was received over the
   * secure connection, or `null` otherwise.
   */
  securityDetails() {
    throw new Error("Not implemented");
  }
  /**
   * Timing information related to the response.
   */
  timing() {
    throw new Error("Not implemented");
  }
  /**
   * Promise which resolves to a buffer with response body.
   */
  buffer() {
    throw new Error("Not implemented");
  }
  /**
   * Promise which resolves to a text representation of response body.
   */
  async text() {
    const content = await this.buffer();
    return content.toString("utf8");
  }
  /**
   * Promise which resolves to a JSON representation of response body.
   *
   * @remarks
   *
   * This method will throw if the response body is not parsable via
   * `JSON.parse`.
   */
  async json() {
    const content = await this.text();
    return JSON.parse(content);
  }
  /**
   * A matching {@link HTTPRequest} object.
   */
  request() {
    throw new Error("Not implemented");
  }
  /**
   * True if the response was served from either the browser's disk
   * cache or memory cache.
   */
  fromCache() {
    throw new Error("Not implemented");
  }
  /**
   * True if the response was served by a service worker.
   */
  fromServiceWorker() {
    throw new Error("Not implemented");
  }
  /**
   * A {@link Frame} that initiated this response, or `null` if
   * navigating to error pages.
   */
  frame() {
    throw new Error("Not implemented");
  }
};
__name(HTTPResponse, "HTTPResponse");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/SecurityDetails.js
init_checked_fetch();
init_modules_watch_stub();
var SecurityDetails = class {
  #subjectName;
  #issuer;
  #validFrom;
  #validTo;
  #protocol;
  #sanList;
  /**
   * @internal
   */
  constructor(securityPayload) {
    this.#subjectName = securityPayload.subjectName;
    this.#issuer = securityPayload.issuer;
    this.#validFrom = securityPayload.validFrom;
    this.#validTo = securityPayload.validTo;
    this.#protocol = securityPayload.protocol;
    this.#sanList = securityPayload.sanList;
  }
  /**
   * The name of the issuer of the certificate.
   */
  issuer() {
    return this.#issuer;
  }
  /**
   * {@link https://en.wikipedia.org/wiki/Unix_time | Unix timestamp}
   * marking the start of the certificate's validity.
   */
  validFrom() {
    return this.#validFrom;
  }
  /**
   * {@link https://en.wikipedia.org/wiki/Unix_time | Unix timestamp}
   * marking the end of the certificate's validity.
   */
  validTo() {
    return this.#validTo;
  }
  /**
   * The security protocol being used, e.g. "TLS 1.2".
   */
  protocol() {
    return this.#protocol;
  }
  /**
   * The name of the subject to which the certificate was issued.
   */
  subjectName() {
    return this.#subjectName;
  }
  /**
   * The list of {@link https://en.wikipedia.org/wiki/Subject_Alternative_Name | subject alternative names (SANs)} of the certificate.
   */
  subjectAlternativeNames() {
    return this.#sanList;
  }
};
__name(SecurityDetails, "SecurityDetails");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/HTTPResponse.js
var HTTPResponse2 = class extends HTTPResponse {
  #client;
  #request;
  #contentPromise = null;
  #bodyLoadedDeferred = Deferred.create();
  #remoteAddress;
  #status;
  #statusText;
  #url;
  #fromDiskCache;
  #fromServiceWorker;
  #headers = {};
  #securityDetails;
  #timing;
  constructor(client, request, responsePayload, extraInfo) {
    super();
    this.#client = client;
    this.#request = request;
    this.#remoteAddress = {
      ip: responsePayload.remoteIPAddress,
      port: responsePayload.remotePort
    };
    this.#statusText = this.#parseStatusTextFromExtrInfo(extraInfo) || responsePayload.statusText;
    this.#url = request.url();
    this.#fromDiskCache = !!responsePayload.fromDiskCache;
    this.#fromServiceWorker = !!responsePayload.fromServiceWorker;
    this.#status = extraInfo ? extraInfo.statusCode : responsePayload.status;
    const headers = extraInfo ? extraInfo.headers : responsePayload.headers;
    for (const [key, value] of Object.entries(headers)) {
      this.#headers[key.toLowerCase()] = value;
    }
    this.#securityDetails = responsePayload.securityDetails ? new SecurityDetails(responsePayload.securityDetails) : null;
    this.#timing = responsePayload.timing || null;
  }
  #parseStatusTextFromExtrInfo(extraInfo) {
    if (!extraInfo || !extraInfo.headersText) {
      return;
    }
    const firstLine = extraInfo.headersText.split("\r", 1)[0];
    if (!firstLine) {
      return;
    }
    const match2 = firstLine.match(/[^ ]* [^ ]* (.*)/);
    if (!match2) {
      return;
    }
    const statusText = match2[1];
    if (!statusText) {
      return;
    }
    return statusText;
  }
  _resolveBody(err) {
    if (err) {
      return this.#bodyLoadedDeferred.resolve(err);
    }
    return this.#bodyLoadedDeferred.resolve();
  }
  remoteAddress() {
    return this.#remoteAddress;
  }
  url() {
    return this.#url;
  }
  status() {
    return this.#status;
  }
  statusText() {
    return this.#statusText;
  }
  headers() {
    return this.#headers;
  }
  securityDetails() {
    return this.#securityDetails;
  }
  timing() {
    return this.#timing;
  }
  buffer() {
    if (!this.#contentPromise) {
      this.#contentPromise = this.#bodyLoadedDeferred.valueOrThrow().then(async (error) => {
        if (error) {
          throw error;
        }
        try {
          const response = await this.#client.send("Network.getResponseBody", {
            requestId: this.#request._requestId
          });
          return Buffer3.from(response.body, response.base64Encoded ? "base64" : "utf8");
        } catch (error2) {
          if (error2 instanceof ProtocolError && error2.originalMessage === "No resource with given identifier found") {
            throw new ProtocolError("Could not load body for this request. This might happen if the request is a preflight request.");
          }
          throw error2;
        }
      });
    }
    return this.#contentPromise;
  }
  request() {
    return this.#request;
  }
  fromCache() {
    return this.#fromDiskCache || this.#request._fromMemoryCache;
  }
  fromServiceWorker() {
    return this.#fromServiceWorker;
  }
  frame() {
    return this.#request.frame();
  }
};
__name(HTTPResponse2, "HTTPResponse");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/NetworkEventManager.js
init_checked_fetch();
init_modules_watch_stub();
var NetworkEventManager = class {
  /**
   * There are four possible orders of events:
   * A. `_onRequestWillBeSent`
   * B. `_onRequestWillBeSent`, `_onRequestPaused`
   * C. `_onRequestPaused`, `_onRequestWillBeSent`
   * D. `_onRequestPaused`, `_onRequestWillBeSent`, `_onRequestPaused`,
   * `_onRequestWillBeSent`, `_onRequestPaused`, `_onRequestPaused`
   * (see crbug.com/1196004)
   *
   * For `_onRequest` we need the event from `_onRequestWillBeSent` and
   * optionally the `interceptionId` from `_onRequestPaused`.
   *
   * If request interception is disabled, call `_onRequest` once per call to
   * `_onRequestWillBeSent`.
   * If request interception is enabled, call `_onRequest` once per call to
   * `_onRequestPaused` (once per `interceptionId`).
   *
   * Events are stored to allow for subsequent events to call `_onRequest`.
   *
   * Note that (chains of) redirect requests have the same `requestId` (!) as
   * the original request. We have to anticipate series of events like these:
   * A. `_onRequestWillBeSent`,
   * `_onRequestWillBeSent`, ...
   * B. `_onRequestWillBeSent`, `_onRequestPaused`,
   * `_onRequestWillBeSent`, `_onRequestPaused`, ...
   * C. `_onRequestWillBeSent`, `_onRequestPaused`,
   * `_onRequestPaused`, `_onRequestWillBeSent`, ...
   * D. `_onRequestPaused`, `_onRequestWillBeSent`,
   * `_onRequestPaused`, `_onRequestWillBeSent`, `_onRequestPaused`,
   * `_onRequestWillBeSent`, `_onRequestPaused`, `_onRequestPaused`, ...
   * (see crbug.com/1196004)
   */
  #requestWillBeSentMap = /* @__PURE__ */ new Map();
  #requestPausedMap = /* @__PURE__ */ new Map();
  #httpRequestsMap = /* @__PURE__ */ new Map();
  /*
   * The below maps are used to reconcile Network.responseReceivedExtraInfo
   * events with their corresponding request. Each response and redirect
   * response gets an ExtraInfo event, and we don't know which will come first.
   * This means that we have to store a Response or an ExtraInfo for each
   * response, and emit the event when we get both of them. In addition, to
   * handle redirects, we have to make them Arrays to represent the chain of
   * events.
   */
  #responseReceivedExtraInfoMap = /* @__PURE__ */ new Map();
  #queuedRedirectInfoMap = /* @__PURE__ */ new Map();
  #queuedEventGroupMap = /* @__PURE__ */ new Map();
  forget(networkRequestId) {
    this.#requestWillBeSentMap.delete(networkRequestId);
    this.#requestPausedMap.delete(networkRequestId);
    this.#queuedEventGroupMap.delete(networkRequestId);
    this.#queuedRedirectInfoMap.delete(networkRequestId);
    this.#responseReceivedExtraInfoMap.delete(networkRequestId);
  }
  responseExtraInfo(networkRequestId) {
    if (!this.#responseReceivedExtraInfoMap.has(networkRequestId)) {
      this.#responseReceivedExtraInfoMap.set(networkRequestId, []);
    }
    return this.#responseReceivedExtraInfoMap.get(networkRequestId);
  }
  queuedRedirectInfo(fetchRequestId) {
    if (!this.#queuedRedirectInfoMap.has(fetchRequestId)) {
      this.#queuedRedirectInfoMap.set(fetchRequestId, []);
    }
    return this.#queuedRedirectInfoMap.get(fetchRequestId);
  }
  queueRedirectInfo(fetchRequestId, redirectInfo) {
    this.queuedRedirectInfo(fetchRequestId).push(redirectInfo);
  }
  takeQueuedRedirectInfo(fetchRequestId) {
    return this.queuedRedirectInfo(fetchRequestId).shift();
  }
  inFlightRequestsCount() {
    let inFlightRequestCounter = 0;
    for (const request of this.#httpRequestsMap.values()) {
      if (!request.response()) {
        inFlightRequestCounter++;
      }
    }
    return inFlightRequestCounter;
  }
  storeRequestWillBeSent(networkRequestId, event) {
    this.#requestWillBeSentMap.set(networkRequestId, event);
  }
  getRequestWillBeSent(networkRequestId) {
    return this.#requestWillBeSentMap.get(networkRequestId);
  }
  forgetRequestWillBeSent(networkRequestId) {
    this.#requestWillBeSentMap.delete(networkRequestId);
  }
  getRequestPaused(networkRequestId) {
    return this.#requestPausedMap.get(networkRequestId);
  }
  forgetRequestPaused(networkRequestId) {
    this.#requestPausedMap.delete(networkRequestId);
  }
  storeRequestPaused(networkRequestId, event) {
    this.#requestPausedMap.set(networkRequestId, event);
  }
  getRequest(networkRequestId) {
    return this.#httpRequestsMap.get(networkRequestId);
  }
  storeRequest(networkRequestId, request) {
    this.#httpRequestsMap.set(networkRequestId, request);
  }
  forgetRequest(networkRequestId) {
    this.#httpRequestsMap.delete(networkRequestId);
  }
  getQueuedEventGroup(networkRequestId) {
    return this.#queuedEventGroupMap.get(networkRequestId);
  }
  queueEventGroup(networkRequestId, event) {
    this.#queuedEventGroupMap.set(networkRequestId, event);
  }
  forgetQueuedEventGroup(networkRequestId) {
    this.#queuedEventGroupMap.delete(networkRequestId);
  }
};
__name(NetworkEventManager, "NetworkEventManager");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/NetworkManager.js
var NetworkManagerEmittedEvents = {
  Request: Symbol("NetworkManager.Request"),
  RequestServedFromCache: Symbol("NetworkManager.RequestServedFromCache"),
  Response: Symbol("NetworkManager.Response"),
  RequestFailed: Symbol("NetworkManager.RequestFailed"),
  RequestFinished: Symbol("NetworkManager.RequestFinished")
};
var NetworkManager = class extends EventEmitter {
  #client;
  #ignoreHTTPSErrors;
  #frameManager;
  #networkEventManager = new NetworkEventManager();
  #extraHTTPHeaders = {};
  #credentials;
  #attemptedAuthentications = /* @__PURE__ */ new Set();
  #userRequestInterceptionEnabled = false;
  #protocolRequestInterceptionEnabled = false;
  #userCacheDisabled = false;
  #emulatedNetworkConditions = {
    offline: false,
    upload: -1,
    download: -1,
    latency: 0
  };
  #deferredInit;
  constructor(client, ignoreHTTPSErrors, frameManager) {
    super();
    this.#client = client;
    this.#ignoreHTTPSErrors = ignoreHTTPSErrors;
    this.#frameManager = frameManager;
    this.#client.on("Fetch.requestPaused", this.#onRequestPaused.bind(this));
    this.#client.on("Fetch.authRequired", this.#onAuthRequired.bind(this));
    this.#client.on("Network.requestWillBeSent", this.#onRequestWillBeSent.bind(this));
    this.#client.on("Network.requestServedFromCache", this.#onRequestServedFromCache.bind(this));
    this.#client.on("Network.responseReceived", this.#onResponseReceived.bind(this));
    this.#client.on("Network.loadingFinished", this.#onLoadingFinished.bind(this));
    this.#client.on("Network.loadingFailed", this.#onLoadingFailed.bind(this));
    this.#client.on("Network.responseReceivedExtraInfo", this.#onResponseReceivedExtraInfo.bind(this));
  }
  /**
   * Initialize calls should avoid async dependencies between CDP calls as those
   * might not resolve until after the target is resumed causing a deadlock.
   */
  initialize() {
    if (this.#deferredInit) {
      return this.#deferredInit.valueOrThrow();
    }
    this.#deferredInit = createDebuggableDeferred("NetworkManager initialization timed out");
    const init = Promise.all([
      this.#ignoreHTTPSErrors ? this.#client.send("Security.setIgnoreCertificateErrors", {
        ignore: true
      }) : null,
      this.#client.send("Network.enable")
    ]);
    const deferredInitPromise = this.#deferredInit;
    init.then(() => {
      deferredInitPromise.resolve();
    }).catch((err) => {
      deferredInitPromise.reject(err);
    });
    return this.#deferredInit.valueOrThrow();
  }
  async authenticate(credentials) {
    this.#credentials = credentials;
    await this.#updateProtocolRequestInterception();
  }
  async setExtraHTTPHeaders(extraHTTPHeaders) {
    this.#extraHTTPHeaders = {};
    for (const key of Object.keys(extraHTTPHeaders)) {
      const value = extraHTTPHeaders[key];
      assert(isString(value), `Expected value of header "${key}" to be String, but "${typeof value}" is found.`);
      this.#extraHTTPHeaders[key.toLowerCase()] = value;
    }
    await this.#client.send("Network.setExtraHTTPHeaders", {
      headers: this.#extraHTTPHeaders
    });
  }
  extraHTTPHeaders() {
    return Object.assign({}, this.#extraHTTPHeaders);
  }
  inFlightRequestsCount() {
    return this.#networkEventManager.inFlightRequestsCount();
  }
  async setOfflineMode(value) {
    this.#emulatedNetworkConditions.offline = value;
    await this.#updateNetworkConditions();
  }
  async emulateNetworkConditions(networkConditions) {
    this.#emulatedNetworkConditions.upload = networkConditions ? networkConditions.upload : -1;
    this.#emulatedNetworkConditions.download = networkConditions ? networkConditions.download : -1;
    this.#emulatedNetworkConditions.latency = networkConditions ? networkConditions.latency : 0;
    await this.#updateNetworkConditions();
  }
  async #updateNetworkConditions() {
    await this.#client.send("Network.emulateNetworkConditions", {
      offline: this.#emulatedNetworkConditions.offline,
      latency: this.#emulatedNetworkConditions.latency,
      uploadThroughput: this.#emulatedNetworkConditions.upload,
      downloadThroughput: this.#emulatedNetworkConditions.download
    });
  }
  async setUserAgent(userAgent, userAgentMetadata) {
    await this.#client.send("Network.setUserAgentOverride", {
      userAgent,
      userAgentMetadata
    });
  }
  async setCacheEnabled(enabled) {
    this.#userCacheDisabled = !enabled;
    await this.#updateProtocolCacheDisabled();
  }
  async setRequestInterception(value) {
    this.#userRequestInterceptionEnabled = value;
    await this.#updateProtocolRequestInterception();
  }
  async #updateProtocolRequestInterception() {
    const enabled = this.#userRequestInterceptionEnabled || !!this.#credentials;
    if (enabled === this.#protocolRequestInterceptionEnabled) {
      return;
    }
    this.#protocolRequestInterceptionEnabled = enabled;
    if (enabled) {
      await Promise.all([
        this.#updateProtocolCacheDisabled(),
        this.#client.send("Fetch.enable", {
          handleAuthRequests: true,
          patterns: [{ urlPattern: "*" }]
        })
      ]);
    } else {
      await Promise.all([
        this.#updateProtocolCacheDisabled(),
        this.#client.send("Fetch.disable")
      ]);
    }
  }
  #cacheDisabled() {
    return this.#userCacheDisabled;
  }
  async #updateProtocolCacheDisabled() {
    await this.#client.send("Network.setCacheDisabled", {
      cacheDisabled: this.#cacheDisabled()
    });
  }
  #onRequestWillBeSent(event) {
    if (this.#userRequestInterceptionEnabled && !event.request.url.startsWith("data:")) {
      const { requestId: networkRequestId } = event;
      this.#networkEventManager.storeRequestWillBeSent(networkRequestId, event);
      const requestPausedEvent = this.#networkEventManager.getRequestPaused(networkRequestId);
      if (requestPausedEvent) {
        const { requestId: fetchRequestId } = requestPausedEvent;
        this.#patchRequestEventHeaders(event, requestPausedEvent);
        this.#onRequest(event, fetchRequestId);
        this.#networkEventManager.forgetRequestPaused(networkRequestId);
      }
      return;
    }
    this.#onRequest(event, void 0);
  }
  #onAuthRequired(event) {
    let response = "Default";
    if (this.#attemptedAuthentications.has(event.requestId)) {
      response = "CancelAuth";
    } else if (this.#credentials) {
      response = "ProvideCredentials";
      this.#attemptedAuthentications.add(event.requestId);
    }
    const { username, password } = this.#credentials || {
      username: void 0,
      password: void 0
    };
    this.#client.send("Fetch.continueWithAuth", {
      requestId: event.requestId,
      authChallengeResponse: { response, username, password }
    }).catch(debugError);
  }
  /**
   * CDP may send a Fetch.requestPaused without or before a
   * Network.requestWillBeSent
   *
   * CDP may send multiple Fetch.requestPaused
   * for the same Network.requestWillBeSent.
   */
  #onRequestPaused(event) {
    if (!this.#userRequestInterceptionEnabled && this.#protocolRequestInterceptionEnabled) {
      this.#client.send("Fetch.continueRequest", {
        requestId: event.requestId
      }).catch(debugError);
    }
    const { networkId: networkRequestId, requestId: fetchRequestId } = event;
    if (!networkRequestId) {
      this.#onRequestWithoutNetworkInstrumentation(event);
      return;
    }
    const requestWillBeSentEvent = (() => {
      const requestWillBeSentEvent2 = this.#networkEventManager.getRequestWillBeSent(networkRequestId);
      if (requestWillBeSentEvent2 && (requestWillBeSentEvent2.request.url !== event.request.url || requestWillBeSentEvent2.request.method !== event.request.method)) {
        this.#networkEventManager.forgetRequestWillBeSent(networkRequestId);
        return;
      }
      return requestWillBeSentEvent2;
    })();
    if (requestWillBeSentEvent) {
      this.#patchRequestEventHeaders(requestWillBeSentEvent, event);
      this.#onRequest(requestWillBeSentEvent, fetchRequestId);
    } else {
      this.#networkEventManager.storeRequestPaused(networkRequestId, event);
    }
  }
  #patchRequestEventHeaders(requestWillBeSentEvent, requestPausedEvent) {
    requestWillBeSentEvent.request.headers = {
      ...requestWillBeSentEvent.request.headers,
      // includes extra headers, like: Accept, Origin
      ...requestPausedEvent.request.headers
    };
  }
  #onRequestWithoutNetworkInstrumentation(event) {
    const frame = event.frameId ? this.#frameManager.frame(event.frameId) : null;
    const request = new HTTPRequest2(this.#client, frame, event.requestId, this.#userRequestInterceptionEnabled, event, []);
    this.emit(NetworkManagerEmittedEvents.Request, request);
    void request.finalizeInterceptions();
  }
  #onRequest(event, fetchRequestId) {
    let redirectChain = [];
    if (event.redirectResponse) {
      let redirectResponseExtraInfo = null;
      if (event.redirectHasExtraInfo) {
        redirectResponseExtraInfo = this.#networkEventManager.responseExtraInfo(event.requestId).shift();
        if (!redirectResponseExtraInfo) {
          this.#networkEventManager.queueRedirectInfo(event.requestId, {
            event,
            fetchRequestId
          });
          return;
        }
      }
      const request2 = this.#networkEventManager.getRequest(event.requestId);
      if (request2) {
        this.#handleRequestRedirect(request2, event.redirectResponse, redirectResponseExtraInfo);
        redirectChain = request2._redirectChain;
      }
    }
    const frame = event.frameId ? this.#frameManager.frame(event.frameId) : null;
    const request = new HTTPRequest2(this.#client, frame, fetchRequestId, this.#userRequestInterceptionEnabled, event, redirectChain);
    this.#networkEventManager.storeRequest(event.requestId, request);
    this.emit(NetworkManagerEmittedEvents.Request, request);
    void request.finalizeInterceptions();
  }
  #onRequestServedFromCache(event) {
    const request = this.#networkEventManager.getRequest(event.requestId);
    if (request) {
      request._fromMemoryCache = true;
    }
    this.emit(NetworkManagerEmittedEvents.RequestServedFromCache, request);
  }
  #handleRequestRedirect(request, responsePayload, extraInfo) {
    const response = new HTTPResponse2(this.#client, request, responsePayload, extraInfo);
    request._response = response;
    request._redirectChain.push(request);
    response._resolveBody(new Error("Response body is unavailable for redirect responses"));
    this.#forgetRequest(request, false);
    this.emit(NetworkManagerEmittedEvents.Response, response);
    this.emit(NetworkManagerEmittedEvents.RequestFinished, request);
  }
  #emitResponseEvent(responseReceived, extraInfo) {
    const request = this.#networkEventManager.getRequest(responseReceived.requestId);
    if (!request) {
      return;
    }
    const extraInfos = this.#networkEventManager.responseExtraInfo(responseReceived.requestId);
    if (extraInfos.length) {
      debugError(new Error("Unexpected extraInfo events for request " + responseReceived.requestId));
    }
    if (responseReceived.response.fromDiskCache) {
      extraInfo = null;
    }
    const response = new HTTPResponse2(this.#client, request, responseReceived.response, extraInfo);
    request._response = response;
    this.emit(NetworkManagerEmittedEvents.Response, response);
  }
  #onResponseReceived(event) {
    const request = this.#networkEventManager.getRequest(event.requestId);
    let extraInfo = null;
    if (request && !request._fromMemoryCache && event.hasExtraInfo) {
      extraInfo = this.#networkEventManager.responseExtraInfo(event.requestId).shift();
      if (!extraInfo) {
        this.#networkEventManager.queueEventGroup(event.requestId, {
          responseReceivedEvent: event
        });
        return;
      }
    }
    this.#emitResponseEvent(event, extraInfo);
  }
  #onResponseReceivedExtraInfo(event) {
    const redirectInfo = this.#networkEventManager.takeQueuedRedirectInfo(event.requestId);
    if (redirectInfo) {
      this.#networkEventManager.responseExtraInfo(event.requestId).push(event);
      this.#onRequest(redirectInfo.event, redirectInfo.fetchRequestId);
      return;
    }
    const queuedEvents = this.#networkEventManager.getQueuedEventGroup(event.requestId);
    if (queuedEvents) {
      this.#networkEventManager.forgetQueuedEventGroup(event.requestId);
      this.#emitResponseEvent(queuedEvents.responseReceivedEvent, event);
      if (queuedEvents.loadingFinishedEvent) {
        this.#emitLoadingFinished(queuedEvents.loadingFinishedEvent);
      }
      if (queuedEvents.loadingFailedEvent) {
        this.#emitLoadingFailed(queuedEvents.loadingFailedEvent);
      }
      return;
    }
    this.#networkEventManager.responseExtraInfo(event.requestId).push(event);
  }
  #forgetRequest(request, events) {
    const requestId = request._requestId;
    const interceptionId = request._interceptionId;
    this.#networkEventManager.forgetRequest(requestId);
    interceptionId !== void 0 && this.#attemptedAuthentications.delete(interceptionId);
    if (events) {
      this.#networkEventManager.forget(requestId);
    }
  }
  #onLoadingFinished(event) {
    const queuedEvents = this.#networkEventManager.getQueuedEventGroup(event.requestId);
    if (queuedEvents) {
      queuedEvents.loadingFinishedEvent = event;
    } else {
      this.#emitLoadingFinished(event);
    }
  }
  #emitLoadingFinished(event) {
    const request = this.#networkEventManager.getRequest(event.requestId);
    if (!request) {
      return;
    }
    if (request.response()) {
      request.response()?._resolveBody(null);
    }
    this.#forgetRequest(request, true);
    this.emit(NetworkManagerEmittedEvents.RequestFinished, request);
  }
  #onLoadingFailed(event) {
    const queuedEvents = this.#networkEventManager.getQueuedEventGroup(event.requestId);
    if (queuedEvents) {
      queuedEvents.loadingFailedEvent = event;
    } else {
      this.#emitLoadingFailed(event);
    }
  }
  #emitLoadingFailed(event) {
    const request = this.#networkEventManager.getRequest(event.requestId);
    if (!request) {
      return;
    }
    request._failureText = event.errorText;
    const response = request.response();
    if (response) {
      response._resolveBody(null);
    }
    this.#forgetRequest(request, true);
    this.emit(NetworkManagerEmittedEvents.RequestFailed, request);
  }
};
__name(NetworkManager, "NetworkManager");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/PDFOptions.js
init_checked_fetch();
init_modules_watch_stub();
var paperFormats = {
  letter: { width: 8.5, height: 11 },
  legal: { width: 8.5, height: 14 },
  tabloid: { width: 11, height: 17 },
  ledger: { width: 17, height: 11 },
  a0: { width: 33.1, height: 46.8 },
  a1: { width: 23.4, height: 33.1 },
  a2: { width: 16.54, height: 23.4 },
  a3: { width: 11.7, height: 16.54 },
  a4: { width: 8.27, height: 11.7 },
  a5: { width: 5.83, height: 8.27 },
  a6: { width: 4.13, height: 5.83 }
};

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/api/locators/locators.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/api/locators/Locator.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/third_party/rxjs/rxjs.js
init_checked_fetch();
init_modules_watch_stub();
var n2 = /* @__PURE__ */ __name(function(t2, r2) {
  return n2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n3, t3) {
    n3.__proto__ = t3;
  } || function(n3, t3) {
    for (var r3 in t3)
      Object.prototype.hasOwnProperty.call(t3, r3) && (n3[r3] = t3[r3]);
  }, n2(t2, r2);
}, "n");
function t(t2, r2) {
  if ("function" != typeof r2 && null !== r2)
    throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
  function e2() {
    this.constructor = t2;
  }
  __name(e2, "e");
  n2(t2, r2), t2.prototype = null === r2 ? Object.create(r2) : (e2.prototype = r2.prototype, new e2());
}
__name(t, "t");
function r(n3, t2, r2, e2) {
  return new (r2 || (r2 = Promise))(function(o2, i2) {
    function u4(n4) {
      try {
        s2(e2.next(n4));
      } catch (n5) {
        i2(n5);
      }
    }
    __name(u4, "u");
    function c2(n4) {
      try {
        s2(e2.throw(n4));
      } catch (n5) {
        i2(n5);
      }
    }
    __name(c2, "c");
    function s2(n4) {
      var t3;
      n4.done ? o2(n4.value) : (t3 = n4.value, t3 instanceof r2 ? t3 : new r2(function(n5) {
        n5(t3);
      })).then(u4, c2);
    }
    __name(s2, "s");
    s2((e2 = e2.apply(n3, t2 || [])).next());
  });
}
__name(r, "r");
function e(n3, t2) {
  var r2, e2, o2, i2, u4 = { label: 0, sent: function() {
    if (1 & o2[0])
      throw o2[1];
    return o2[1];
  }, trys: [], ops: [] };
  return i2 = { next: c2(0), throw: c2(1), return: c2(2) }, "function" == typeof Symbol && (i2[Symbol.iterator] = function() {
    return this;
  }), i2;
  function c2(c3) {
    return function(s2) {
      return function(c4) {
        if (r2)
          throw new TypeError("Generator is already executing.");
        for (; i2 && (i2 = 0, c4[0] && (u4 = 0)), u4; )
          try {
            if (r2 = 1, e2 && (o2 = 2 & c4[0] ? e2.return : c4[0] ? e2.throw || ((o2 = e2.return) && o2.call(e2), 0) : e2.next) && !(o2 = o2.call(e2, c4[1])).done)
              return o2;
            switch (e2 = 0, o2 && (c4 = [2 & c4[0], o2.value]), c4[0]) {
              case 0:
              case 1:
                o2 = c4;
                break;
              case 4:
                return u4.label++, { value: c4[1], done: false };
              case 5:
                u4.label++, e2 = c4[1], c4 = [0];
                continue;
              case 7:
                c4 = u4.ops.pop(), u4.trys.pop();
                continue;
              default:
                if (!(o2 = u4.trys, (o2 = o2.length > 0 && o2[o2.length - 1]) || 6 !== c4[0] && 2 !== c4[0])) {
                  u4 = 0;
                  continue;
                }
                if (3 === c4[0] && (!o2 || c4[1] > o2[0] && c4[1] < o2[3])) {
                  u4.label = c4[1];
                  break;
                }
                if (6 === c4[0] && u4.label < o2[1]) {
                  u4.label = o2[1], o2 = c4;
                  break;
                }
                if (o2 && u4.label < o2[2]) {
                  u4.label = o2[2], u4.ops.push(c4);
                  break;
                }
                o2[2] && u4.ops.pop(), u4.trys.pop();
                continue;
            }
            c4 = t2.call(n3, u4);
          } catch (n4) {
            c4 = [6, n4], e2 = 0;
          } finally {
            r2 = o2 = 0;
          }
        if (5 & c4[0])
          throw c4[1];
        return { value: c4[0] ? c4[1] : void 0, done: true };
      }([c3, s2]);
    };
  }
  __name(c2, "c");
}
__name(e, "e");
function o(n3) {
  var t2 = "function" == typeof Symbol && Symbol.iterator, r2 = t2 && n3[t2], e2 = 0;
  if (r2)
    return r2.call(n3);
  if (n3 && "number" == typeof n3.length)
    return { next: function() {
      return n3 && e2 >= n3.length && (n3 = void 0), { value: n3 && n3[e2++], done: !n3 };
    } };
  throw new TypeError(t2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
__name(o, "o");
function i(n3, t2) {
  var r2 = "function" == typeof Symbol && n3[Symbol.iterator];
  if (!r2)
    return n3;
  var e2, o2, i2 = r2.call(n3), u4 = [];
  try {
    for (; (void 0 === t2 || t2-- > 0) && !(e2 = i2.next()).done; )
      u4.push(e2.value);
  } catch (n4) {
    o2 = { error: n4 };
  } finally {
    try {
      e2 && !e2.done && (r2 = i2.return) && r2.call(i2);
    } finally {
      if (o2)
        throw o2.error;
    }
  }
  return u4;
}
__name(i, "i");
function u3(n3, t2, r2) {
  if (r2 || 2 === arguments.length)
    for (var e2, o2 = 0, i2 = t2.length; o2 < i2; o2++)
      !e2 && o2 in t2 || (e2 || (e2 = Array.prototype.slice.call(t2, 0, o2)), e2[o2] = t2[o2]);
  return n3.concat(e2 || Array.prototype.slice.call(t2));
}
__name(u3, "u");
function c(n3) {
  return this instanceof c ? (this.v = n3, this) : new c(n3);
}
__name(c, "c");
function s(n3, t2, r2) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var e2, o2 = r2.apply(n3, t2 || []), i2 = [];
  return e2 = {}, u4("next"), u4("throw"), u4("return"), e2[Symbol.asyncIterator] = function() {
    return this;
  }, e2;
  function u4(n4) {
    o2[n4] && (e2[n4] = function(t3) {
      return new Promise(function(r3, e3) {
        i2.push([n4, t3, r3, e3]) > 1 || s2(n4, t3);
      });
    });
  }
  __name(u4, "u");
  function s2(n4, t3) {
    try {
      (r3 = o2[n4](t3)).value instanceof c ? Promise.resolve(r3.value.v).then(l2, a2) : f2(i2[0][2], r3);
    } catch (n5) {
      f2(i2[0][3], n5);
    }
    var r3;
  }
  __name(s2, "s");
  function l2(n4) {
    s2("next", n4);
  }
  __name(l2, "l");
  function a2(n4) {
    s2("throw", n4);
  }
  __name(a2, "a");
  function f2(n4, t3) {
    n4(t3), i2.shift(), i2.length && s2(i2[0][0], i2[0][1]);
  }
  __name(f2, "f");
}
__name(s, "s");
function l(n3) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var t2, r2 = n3[Symbol.asyncIterator];
  return r2 ? r2.call(n3) : (n3 = o(n3), t2 = {}, e2("next"), e2("throw"), e2("return"), t2[Symbol.asyncIterator] = function() {
    return this;
  }, t2);
  function e2(r3) {
    t2[r3] = n3[r3] && function(t3) {
      return new Promise(function(e3, o2) {
        (function(n4, t4, r4, e4) {
          Promise.resolve(e4).then(function(t5) {
            n4({ value: t5, done: r4 });
          }, t4);
        })(e3, o2, (t3 = n3[r3](t3)).done, t3.value);
      });
    };
  }
  __name(e2, "e");
}
__name(l, "l");
function a(n3) {
  return "function" == typeof n3;
}
__name(a, "a");
function f(n3) {
  var t2 = n3(function(n4) {
    Error.call(n4), n4.stack = new Error().stack;
  });
  return t2.prototype = Object.create(Error.prototype), t2.prototype.constructor = t2, t2;
}
__name(f, "f");
var h2 = f(function(n3) {
  return function(t2) {
    n3(this), this.message = t2 ? t2.length + " errors occurred during unsubscription:\n" + t2.map(function(n4, t3) {
      return t3 + 1 + ") " + n4.toString();
    }).join("\n  ") : "", this.name = "UnsubscriptionError", this.errors = t2;
  };
});
function p(n3, t2) {
  if (n3) {
    var r2 = n3.indexOf(t2);
    0 <= r2 && n3.splice(r2, 1);
  }
}
__name(p, "p");
var v2 = function() {
  function n3(n4) {
    this.initialTeardown = n4, this.closed = false, this._parentage = null, this._finalizers = null;
  }
  __name(n3, "n");
  var t2;
  return n3.prototype.unsubscribe = function() {
    var n4, t3, r2, e2, c2;
    if (!this.closed) {
      this.closed = true;
      var s2 = this._parentage;
      if (s2)
        if (this._parentage = null, Array.isArray(s2))
          try {
            for (var l2 = o(s2), f2 = l2.next(); !f2.done; f2 = l2.next()) {
              f2.value.remove(this);
            }
          } catch (t4) {
            n4 = { error: t4 };
          } finally {
            try {
              f2 && !f2.done && (t3 = l2.return) && t3.call(l2);
            } finally {
              if (n4)
                throw n4.error;
            }
          }
        else
          s2.remove(this);
      var p2 = this.initialTeardown;
      if (a(p2))
        try {
          p2();
        } catch (n5) {
          c2 = n5 instanceof h2 ? n5.errors : [n5];
        }
      var v3 = this._finalizers;
      if (v3) {
        this._finalizers = null;
        try {
          for (var d2 = o(v3), y3 = d2.next(); !y3.done; y3 = d2.next()) {
            var m3 = y3.value;
            try {
              b2(m3);
            } catch (n5) {
              c2 = null != c2 ? c2 : [], n5 instanceof h2 ? c2 = u3(u3([], i(c2)), i(n5.errors)) : c2.push(n5);
            }
          }
        } catch (n5) {
          r2 = { error: n5 };
        } finally {
          try {
            y3 && !y3.done && (e2 = d2.return) && e2.call(d2);
          } finally {
            if (r2)
              throw r2.error;
          }
        }
      }
      if (c2)
        throw new h2(c2);
    }
  }, n3.prototype.add = function(t3) {
    var r2;
    if (t3 && t3 !== this)
      if (this.closed)
        b2(t3);
      else {
        if (t3 instanceof n3) {
          if (t3.closed || t3._hasParent(this))
            return;
          t3._addParent(this);
        }
        (this._finalizers = null !== (r2 = this._finalizers) && void 0 !== r2 ? r2 : []).push(t3);
      }
  }, n3.prototype._hasParent = function(n4) {
    var t3 = this._parentage;
    return t3 === n4 || Array.isArray(t3) && t3.includes(n4);
  }, n3.prototype._addParent = function(n4) {
    var t3 = this._parentage;
    this._parentage = Array.isArray(t3) ? (t3.push(n4), t3) : t3 ? [t3, n4] : n4;
  }, n3.prototype._removeParent = function(n4) {
    var t3 = this._parentage;
    t3 === n4 ? this._parentage = null : Array.isArray(t3) && p(t3, n4);
  }, n3.prototype.remove = function(t3) {
    var r2 = this._finalizers;
    r2 && p(r2, t3), t3 instanceof n3 && t3._removeParent(this);
  }, n3.EMPTY = ((t2 = new n3()).closed = true, t2), n3;
}();
function d(n3) {
  return n3 instanceof v2 || n3 && "closed" in n3 && a(n3.remove) && a(n3.add) && a(n3.unsubscribe);
}
__name(d, "d");
function b2(n3) {
  a(n3) ? n3() : n3.unsubscribe();
}
__name(b2, "b");
v2.EMPTY;
var y2 = { onUnhandledError: null, onStoppedNotification: null, Promise: void 0, useDeprecatedSynchronousErrorHandling: false, useDeprecatedNextContext: false };
var m2 = { setTimeout: function(n3, t2) {
  for (var r2 = [], e2 = 2; e2 < arguments.length; e2++)
    r2[e2 - 2] = arguments[e2];
  var o2 = m2.delegate;
  return (null == o2 ? void 0 : o2.setTimeout) ? o2.setTimeout.apply(o2, u3([n3, t2], i(r2))) : setTimeout.apply(void 0, u3([n3, t2], i(r2)));
}, clearTimeout: function(n3) {
  var t2 = m2.delegate;
  return ((null == t2 ? void 0 : t2.clearTimeout) || clearTimeout)(n3);
}, delegate: void 0 };
function w2(n3) {
  m2.setTimeout(function() {
    throw n3;
  });
}
__name(w2, "w");
function x2() {
}
__name(x2, "x");
var g = function(n3) {
  function r2(t2) {
    var r3 = n3.call(this) || this;
    return r3.isStopped = false, t2 ? (r3.destination = t2, d(t2) && t2.add(r3)) : r3.destination = P2, r3;
  }
  __name(r2, "r");
  return t(r2, n3), r2.create = function(n4, t2, r3) {
    return new I2(n4, t2, r3);
  }, r2.prototype.next = function(n4) {
    this.isStopped || this._next(n4);
  }, r2.prototype.error = function(n4) {
    this.isStopped || (this.isStopped = true, this._error(n4));
  }, r2.prototype.complete = function() {
    this.isStopped || (this.isStopped = true, this._complete());
  }, r2.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = true, n3.prototype.unsubscribe.call(this), this.destination = null);
  }, r2.prototype._next = function(n4) {
    this.destination.next(n4);
  }, r2.prototype._error = function(n4) {
    try {
      this.destination.error(n4);
    } finally {
      this.unsubscribe();
    }
  }, r2.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }, r2;
}(v2);
var _2 = Function.prototype.bind;
function S2(n3, t2) {
  return _2.call(n3, t2);
}
__name(S2, "S");
var E2 = function() {
  function n3(n4) {
    this.partialObserver = n4;
  }
  __name(n3, "n");
  return n3.prototype.next = function(n4) {
    var t2 = this.partialObserver;
    if (t2.next)
      try {
        t2.next(n4);
      } catch (n5) {
        A(n5);
      }
  }, n3.prototype.error = function(n4) {
    var t2 = this.partialObserver;
    if (t2.error)
      try {
        t2.error(n4);
      } catch (n5) {
        A(n5);
      }
    else
      A(n4);
  }, n3.prototype.complete = function() {
    var n4 = this.partialObserver;
    if (n4.complete)
      try {
        n4.complete();
      } catch (n5) {
        A(n5);
      }
  }, n3;
}();
var I2 = function(n3) {
  function r2(t2, r3, e2) {
    var o2, i2, u4 = n3.call(this) || this;
    a(t2) || !t2 ? o2 = { next: null != t2 ? t2 : void 0, error: null != r3 ? r3 : void 0, complete: null != e2 ? e2 : void 0 } : u4 && y2.useDeprecatedNextContext ? ((i2 = Object.create(t2)).unsubscribe = function() {
      return u4.unsubscribe();
    }, o2 = { next: t2.next && S2(t2.next, i2), error: t2.error && S2(t2.error, i2), complete: t2.complete && S2(t2.complete, i2) }) : o2 = t2;
    return u4.destination = new E2(o2), u4;
  }
  __name(r2, "r");
  return t(r2, n3), r2;
}(g);
function A(n3) {
  w2(n3);
}
__name(A, "A");
var P2 = { closed: true, next: x2, error: function(n3) {
  throw n3;
}, complete: x2 };
var T2 = "function" == typeof Symbol && Symbol.observable || "@@observable";
function O(n3) {
  return n3;
}
__name(O, "O");
function j2() {
  for (var n3 = [], t2 = 0; t2 < arguments.length; t2++)
    n3[t2] = arguments[t2];
  return k2(n3);
}
__name(j2, "j");
function k2(n3) {
  return 0 === n3.length ? O : 1 === n3.length ? n3[0] : function(t2) {
    return n3.reduce(function(n4, t3) {
      return t3(n4);
    }, t2);
  };
}
__name(k2, "k");
var z2 = function() {
  function n3(n4) {
    n4 && (this._subscribe = n4);
  }
  __name(n3, "n");
  return n3.prototype.lift = function(t2) {
    var r2 = new n3();
    return r2.source = this, r2.operator = t2, r2;
  }, n3.prototype.subscribe = function(n4, t2, r2) {
    var e2, o2 = this, i2 = (e2 = n4) && e2 instanceof g || function(n5) {
      return n5 && a(n5.next) && a(n5.error) && a(n5.complete);
    }(e2) && d(e2) ? n4 : new I2(n4, t2, r2);
    return function() {
      var n5 = o2, t3 = n5.operator, r3 = n5.source;
      i2.add(t3 ? t3.call(i2, r3) : r3 ? o2._subscribe(i2) : o2._trySubscribe(i2));
    }(), i2;
  }, n3.prototype._trySubscribe = function(n4) {
    try {
      return this._subscribe(n4);
    } catch (t2) {
      n4.error(t2);
    }
  }, n3.prototype.forEach = function(n4, t2) {
    var r2 = this;
    return new (t2 = L2(t2))(function(t3, e2) {
      var o2 = new I2({ next: function(t4) {
        try {
          n4(t4);
        } catch (n5) {
          e2(n5), o2.unsubscribe();
        }
      }, error: e2, complete: t3 });
      r2.subscribe(o2);
    });
  }, n3.prototype._subscribe = function(n4) {
    var t2;
    return null === (t2 = this.source) || void 0 === t2 ? void 0 : t2.subscribe(n4);
  }, n3.prototype[T2] = function() {
    return this;
  }, n3.prototype.pipe = function() {
    for (var n4 = [], t2 = 0; t2 < arguments.length; t2++)
      n4[t2] = arguments[t2];
    return k2(n4)(this);
  }, n3.prototype.toPromise = function(n4) {
    var t2 = this;
    return new (n4 = L2(n4))(function(n5, r2) {
      var e2;
      t2.subscribe(function(n6) {
        return e2 = n6;
      }, function(n6) {
        return r2(n6);
      }, function() {
        return n5(e2);
      });
    });
  }, n3.create = function(t2) {
    return new n3(t2);
  }, n3;
}();
function L2(n3) {
  var t2;
  return null !== (t2 = null != n3 ? n3 : y2.Promise) && void 0 !== t2 ? t2 : Promise;
}
__name(L2, "L");
function U2(n3) {
  return function(t2) {
    if (function(n4) {
      return a(null == n4 ? void 0 : n4.lift);
    }(t2))
      return t2.lift(function(t3) {
        try {
          return n3(t3, this);
        } catch (n4) {
          this.error(n4);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
__name(U2, "U");
function C2(n3, t2, r2, e2, o2) {
  return new D2(n3, t2, r2, e2, o2);
}
__name(C2, "C");
var D2 = function(n3) {
  function r2(t2, r3, e2, o2, i2, u4) {
    var c2 = n3.call(this, t2) || this;
    return c2.onFinalize = i2, c2.shouldUnsubscribe = u4, c2._next = r3 ? function(n4) {
      try {
        r3(n4);
      } catch (n5) {
        t2.error(n5);
      }
    } : n3.prototype._next, c2._error = o2 ? function(n4) {
      try {
        o2(n4);
      } catch (n5) {
        t2.error(n5);
      } finally {
        this.unsubscribe();
      }
    } : n3.prototype._error, c2._complete = e2 ? function() {
      try {
        e2();
      } catch (n4) {
        t2.error(n4);
      } finally {
        this.unsubscribe();
      }
    } : n3.prototype._complete, c2;
  }
  __name(r2, "r");
  return t(r2, n3), r2.prototype.unsubscribe = function() {
    var t2;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var r3 = this.closed;
      n3.prototype.unsubscribe.call(this), !r3 && (null === (t2 = this.onFinalize) || void 0 === t2 || t2.call(this));
    }
  }, r2;
}(g);
var N2 = { now: function() {
  return (N2.delegate || Date).now();
}, delegate: void 0 };
var Y = function(n3) {
  function r2(t2, r3) {
    return n3.call(this) || this;
  }
  __name(r2, "r");
  return t(r2, n3), r2.prototype.schedule = function(n4, t2) {
    return this;
  }, r2;
}(v2);
var q2 = { setInterval: function(n3, t2) {
  for (var r2 = [], e2 = 2; e2 < arguments.length; e2++)
    r2[e2 - 2] = arguments[e2];
  var o2 = q2.delegate;
  return (null == o2 ? void 0 : o2.setInterval) ? o2.setInterval.apply(o2, u3([n3, t2], i(r2))) : setInterval.apply(void 0, u3([n3, t2], i(r2)));
}, clearInterval: function(n3) {
  var t2 = q2.delegate;
  return ((null == t2 ? void 0 : t2.clearInterval) || clearInterval)(n3);
}, delegate: void 0 };
var F2 = function(n3) {
  function r2(t2, r3) {
    var e2 = n3.call(this, t2, r3) || this;
    return e2.scheduler = t2, e2.work = r3, e2.pending = false, e2;
  }
  __name(r2, "r");
  return t(r2, n3), r2.prototype.schedule = function(n4, t2) {
    var r3;
    if (void 0 === t2 && (t2 = 0), this.closed)
      return this;
    this.state = n4;
    var e2 = this.id, o2 = this.scheduler;
    return null != e2 && (this.id = this.recycleAsyncId(o2, e2, t2)), this.pending = true, this.delay = t2, this.id = null !== (r3 = this.id) && void 0 !== r3 ? r3 : this.requestAsyncId(o2, this.id, t2), this;
  }, r2.prototype.requestAsyncId = function(n4, t2, r3) {
    return void 0 === r3 && (r3 = 0), q2.setInterval(n4.flush.bind(n4, this), r3);
  }, r2.prototype.recycleAsyncId = function(n4, t2, r3) {
    if (void 0 === r3 && (r3 = 0), null != r3 && this.delay === r3 && false === this.pending)
      return t2;
    null != t2 && q2.clearInterval(t2);
  }, r2.prototype.execute = function(n4, t2) {
    if (this.closed)
      return new Error("executing a cancelled action");
    this.pending = false;
    var r3 = this._execute(n4, t2);
    if (r3)
      return r3;
    false === this.pending && null != this.id && (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
  }, r2.prototype._execute = function(n4, t2) {
    var r3, e2 = false;
    try {
      this.work(n4);
    } catch (n5) {
      e2 = true, r3 = n5 || new Error("Scheduled action threw falsy error");
    }
    if (e2)
      return this.unsubscribe(), r3;
  }, r2.prototype.unsubscribe = function() {
    if (!this.closed) {
      var t2 = this.id, r3 = this.scheduler, e2 = r3.actions;
      this.work = this.state = this.scheduler = null, this.pending = false, p(e2, this), null != t2 && (this.id = this.recycleAsyncId(r3, t2, null)), this.delay = null, n3.prototype.unsubscribe.call(this);
    }
  }, r2;
}(Y);
var R = function() {
  function n3(t2, r2) {
    void 0 === r2 && (r2 = n3.now), this.schedulerActionCtor = t2, this.now = r2;
  }
  __name(n3, "n");
  return n3.prototype.schedule = function(n4, t2, r2) {
    return void 0 === t2 && (t2 = 0), new this.schedulerActionCtor(this, n4).schedule(r2, t2);
  }, n3.now = N2.now, n3;
}();
var M2 = new (function(n3) {
  function r2(t2, r3) {
    void 0 === r3 && (r3 = R.now);
    var e2 = n3.call(this, t2, r3) || this;
    return e2.actions = [], e2._active = false, e2;
  }
  __name(r2, "r");
  return t(r2, n3), r2.prototype.flush = function(n4) {
    var t2 = this.actions;
    if (this._active)
      t2.push(n4);
    else {
      var r3;
      this._active = true;
      do {
        if (r3 = n4.execute(n4.state, n4.delay))
          break;
      } while (n4 = t2.shift());
      if (this._active = false, r3) {
        for (; n4 = t2.shift(); )
          n4.unsubscribe();
        throw r3;
      }
    }
  }, r2;
}(R))(F2);
var G2 = new z2(function(n3) {
  return n3.complete();
});
function H(n3) {
  return n3 && a(n3.schedule);
}
__name(H, "H");
function V2(n3) {
  return n3[n3.length - 1];
}
__name(V2, "V");
var B2 = /* @__PURE__ */ __name(function(n3) {
  return n3 && "number" == typeof n3.length && "function" != typeof n3;
}, "B");
function J2(n3) {
  return a(null == n3 ? void 0 : n3.then);
}
__name(J2, "J");
function K2(n3) {
  return a(n3[T2]);
}
__name(K2, "K");
function Q2(n3) {
  return Symbol.asyncIterator && a(null == n3 ? void 0 : n3[Symbol.asyncIterator]);
}
__name(Q2, "Q");
function W2(n3) {
  return new TypeError("You provided " + (null !== n3 && "object" == typeof n3 ? "an invalid object" : "'" + n3 + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
__name(W2, "W");
var X2 = "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator";
function Z(n3) {
  return a(null == n3 ? void 0 : n3[X2]);
}
__name(Z, "Z");
function $2(n3) {
  return s(this, arguments, function() {
    var t2, r2, o2;
    return e(this, function(e2) {
      switch (e2.label) {
        case 0:
          t2 = n3.getReader(), e2.label = 1;
        case 1:
          e2.trys.push([1, , 9, 10]), e2.label = 2;
        case 2:
          return [4, c(t2.read())];
        case 3:
          return r2 = e2.sent(), o2 = r2.value, r2.done ? [4, c(void 0)] : [3, 5];
        case 4:
          return [2, e2.sent()];
        case 5:
          return [4, c(o2)];
        case 6:
          return [4, e2.sent()];
        case 7:
          return e2.sent(), [3, 2];
        case 8:
          return [3, 10];
        case 9:
          return t2.releaseLock(), [7];
        case 10:
          return [2];
      }
    });
  });
}
__name($2, "$");
function nn(n3) {
  return a(null == n3 ? void 0 : n3.getReader);
}
__name(nn, "nn");
function tn(n3) {
  if (n3 instanceof z2)
    return n3;
  if (null != n3) {
    if (K2(n3))
      return i2 = n3, new z2(function(n4) {
        var t3 = i2[T2]();
        if (a(t3.subscribe))
          return t3.subscribe(n4);
        throw new TypeError("Provided object does not correctly implement Symbol.observable");
      });
    if (B2(n3))
      return e2 = n3, new z2(function(n4) {
        for (var t3 = 0; t3 < e2.length && !n4.closed; t3++)
          n4.next(e2[t3]);
        n4.complete();
      });
    if (J2(n3))
      return r2 = n3, new z2(function(n4) {
        r2.then(function(t3) {
          n4.closed || (n4.next(t3), n4.complete());
        }, function(t3) {
          return n4.error(t3);
        }).then(null, w2);
      });
    if (Q2(n3))
      return rn(n3);
    if (Z(n3))
      return t2 = n3, new z2(function(n4) {
        var r3, e3;
        try {
          for (var i3 = o(t2), u4 = i3.next(); !u4.done; u4 = i3.next()) {
            var c2 = u4.value;
            if (n4.next(c2), n4.closed)
              return;
          }
        } catch (n5) {
          r3 = { error: n5 };
        } finally {
          try {
            u4 && !u4.done && (e3 = i3.return) && e3.call(i3);
          } finally {
            if (r3)
              throw r3.error;
          }
        }
        n4.complete();
      });
    if (nn(n3))
      return rn($2(n3));
  }
  var t2, r2, e2, i2;
  throw W2(n3);
}
__name(tn, "tn");
function rn(n3) {
  return new z2(function(t2) {
    (function(n4, t3) {
      var o2, i2, u4, c2;
      return r(this, void 0, void 0, function() {
        var r2, s2;
        return e(this, function(e2) {
          switch (e2.label) {
            case 0:
              e2.trys.push([0, 5, 6, 11]), o2 = l(n4), e2.label = 1;
            case 1:
              return [4, o2.next()];
            case 2:
              if ((i2 = e2.sent()).done)
                return [3, 4];
              if (r2 = i2.value, t3.next(r2), t3.closed)
                return [2];
              e2.label = 3;
            case 3:
              return [3, 1];
            case 4:
              return [3, 11];
            case 5:
              return s2 = e2.sent(), u4 = { error: s2 }, [3, 11];
            case 6:
              return e2.trys.push([6, , 9, 10]), i2 && !i2.done && (c2 = o2.return) ? [4, c2.call(o2)] : [3, 8];
            case 7:
              e2.sent(), e2.label = 8;
            case 8:
              return [3, 10];
            case 9:
              if (u4)
                throw u4.error;
              return [7];
            case 10:
              return [7];
            case 11:
              return t3.complete(), [2];
          }
        });
      });
    })(n3, t2).catch(function(n4) {
      return t2.error(n4);
    });
  });
}
__name(rn, "rn");
function en(n3, t2, r2, e2, o2) {
  void 0 === e2 && (e2 = 0), void 0 === o2 && (o2 = false);
  var i2 = t2.schedule(function() {
    r2(), o2 ? n3.add(this.schedule(null, e2)) : this.unsubscribe();
  }, e2);
  if (n3.add(i2), !o2)
    return i2;
}
__name(en, "en");
function on(n3, t2) {
  return void 0 === t2 && (t2 = 0), U2(function(r2, e2) {
    r2.subscribe(C2(e2, function(r3) {
      return en(e2, n3, function() {
        return e2.next(r3);
      }, t2);
    }, function() {
      return en(e2, n3, function() {
        return e2.complete();
      }, t2);
    }, function(r3) {
      return en(e2, n3, function() {
        return e2.error(r3);
      }, t2);
    }));
  });
}
__name(on, "on");
function un(n3, t2) {
  return void 0 === t2 && (t2 = 0), U2(function(r2, e2) {
    e2.add(n3.schedule(function() {
      return r2.subscribe(e2);
    }, t2));
  });
}
__name(un, "un");
function cn(n3, t2) {
  if (!n3)
    throw new Error("Iterable cannot be null");
  return new z2(function(r2) {
    en(r2, t2, function() {
      var e2 = n3[Symbol.asyncIterator]();
      en(r2, t2, function() {
        e2.next().then(function(n4) {
          n4.done ? r2.complete() : r2.next(n4.value);
        });
      }, 0, true);
    });
  });
}
__name(cn, "cn");
function sn(n3, t2) {
  if (null != n3) {
    if (K2(n3))
      return function(n4, t3) {
        return tn(n4).pipe(un(t3), on(t3));
      }(n3, t2);
    if (B2(n3))
      return function(n4, t3) {
        return new z2(function(r2) {
          var e2 = 0;
          return t3.schedule(function() {
            e2 === n4.length ? r2.complete() : (r2.next(n4[e2++]), r2.closed || this.schedule());
          });
        });
      }(n3, t2);
    if (J2(n3))
      return function(n4, t3) {
        return tn(n4).pipe(un(t3), on(t3));
      }(n3, t2);
    if (Q2(n3))
      return cn(n3, t2);
    if (Z(n3))
      return function(n4, t3) {
        return new z2(function(r2) {
          var e2;
          return en(r2, t3, function() {
            e2 = n4[X2](), en(r2, t3, function() {
              var n5, t4, o2;
              try {
                t4 = (n5 = e2.next()).value, o2 = n5.done;
              } catch (n6) {
                return void r2.error(n6);
              }
              o2 ? r2.complete() : r2.next(t4);
            }, 0, true);
          }), function() {
            return a(null == e2 ? void 0 : e2.return) && e2.return();
          };
        });
      }(n3, t2);
    if (nn(n3))
      return function(n4, t3) {
        return cn($2(n4), t3);
      }(n3, t2);
  }
  throw W2(n3);
}
__name(sn, "sn");
function ln(n3, t2) {
  return t2 ? sn(n3, t2) : tn(n3);
}
__name(ln, "ln");
var an = f(function(n3) {
  return function() {
    n3(this), this.name = "EmptyError", this.message = "no elements in sequence";
  };
});
function fn(n3, t2) {
  var r2 = "object" == typeof t2;
  return new Promise(function(e2, o2) {
    var i2 = new I2({ next: function(n4) {
      e2(n4), i2.unsubscribe();
    }, error: o2, complete: function() {
      r2 ? e2(t2.defaultValue) : o2(new an());
    } });
    n3.subscribe(i2);
  });
}
__name(fn, "fn");
function hn(n3, t2) {
  return U2(function(r2, e2) {
    var o2 = 0;
    r2.subscribe(C2(e2, function(r3) {
      e2.next(n3.call(t2, r3, o2++));
    }));
  });
}
__name(hn, "hn");
var pn = Array.isArray;
function vn(n3) {
  return hn(function(t2) {
    return function(n4, t3) {
      return pn(t3) ? n4.apply(void 0, u3([], i(t3))) : n4(t3);
    }(n3, t2);
  });
}
__name(vn, "vn");
function dn(n3, t2, r2) {
  return void 0 === r2 && (r2 = 1 / 0), a(t2) ? dn(function(r3, e2) {
    return hn(function(n4, o2) {
      return t2(r3, n4, e2, o2);
    })(tn(n3(r3, e2)));
  }, r2) : ("number" == typeof t2 && (r2 = t2), U2(function(t3, e2) {
    return function(n4, t4, r3, e3, o2, i2, u4, c2) {
      var s2 = [], l2 = 0, a2 = 0, f2 = false, h3 = /* @__PURE__ */ __name(function() {
        !f2 || s2.length || l2 || t4.complete();
      }, "h"), p2 = /* @__PURE__ */ __name(function(n5) {
        return l2 < e3 ? v3(n5) : s2.push(n5);
      }, "p"), v3 = /* @__PURE__ */ __name(function(n5) {
        i2 && t4.next(n5), l2++;
        var c3 = false;
        tn(r3(n5, a2++)).subscribe(C2(t4, function(n6) {
          null == o2 || o2(n6), i2 ? p2(n6) : t4.next(n6);
        }, function() {
          c3 = true;
        }, void 0, function() {
          if (c3)
            try {
              l2--;
              for (var n6 = function() {
                var n7 = s2.shift();
                u4 ? en(t4, u4, function() {
                  return v3(n7);
                }) : v3(n7);
              }; s2.length && l2 < e3; )
                n6();
              h3();
            } catch (n7) {
              t4.error(n7);
            }
        }));
      }, "v");
      return n4.subscribe(C2(t4, p2, function() {
        f2 = true, h3();
      })), function() {
        null == c2 || c2();
      };
    }(t3, e2, n3, r2);
  }));
}
__name(dn, "dn");
function bn(n3) {
  return new z2(function(t2) {
    tn(n3()).subscribe(t2);
  });
}
__name(bn, "bn");
var yn = ["addListener", "removeListener"];
var mn = ["addEventListener", "removeEventListener"];
var wn = ["on", "off"];
function xn(n3, t2, r2, e2) {
  if (a(r2) && (e2 = r2, r2 = void 0), e2)
    return xn(n3, t2, r2).pipe(vn(e2));
  var o2 = i(function(n4) {
    return a(n4.addEventListener) && a(n4.removeEventListener);
  }(n3) ? mn.map(function(e3) {
    return function(o3) {
      return n3[e3](t2, o3, r2);
    };
  }) : function(n4) {
    return a(n4.addListener) && a(n4.removeListener);
  }(n3) ? yn.map(gn(n3, t2)) : function(n4) {
    return a(n4.on) && a(n4.off);
  }(n3) ? wn.map(gn(n3, t2)) : [], 2), u4 = o2[0], c2 = o2[1];
  if (!u4 && B2(n3))
    return dn(function(n4) {
      return xn(n4, t2, r2);
    })(tn(n3));
  if (!u4)
    throw new TypeError("Invalid event target");
  return new z2(function(n4) {
    var t3 = /* @__PURE__ */ __name(function() {
      for (var t4 = [], r3 = 0; r3 < arguments.length; r3++)
        t4[r3] = arguments[r3];
      return n4.next(1 < t4.length ? t4 : t4[0]);
    }, "t");
    return u4(t3), function() {
      return c2(t3);
    };
  });
}
__name(xn, "xn");
function gn(n3, t2) {
  return function(r2) {
    return function(e2) {
      return n3[r2](t2, e2);
    };
  };
}
__name(gn, "gn");
function _n(n3, t2, r2) {
  void 0 === n3 && (n3 = 0), void 0 === r2 && (r2 = M2);
  var e2 = -1;
  return null != t2 && (H(t2) ? r2 = t2 : e2 = t2), new z2(function(t3) {
    var o2, i2 = (o2 = n3) instanceof Date && !isNaN(o2) ? +n3 - r2.now() : n3;
    i2 < 0 && (i2 = 0);
    var u4 = 0;
    return r2.schedule(function() {
      t3.closed || (t3.next(u4++), 0 <= e2 ? this.schedule(void 0, e2) : t3.complete());
    }, i2);
  });
}
__name(_n, "_n");
function Sn() {
  for (var n3 = [], t2 = 0; t2 < arguments.length; t2++)
    n3[t2] = arguments[t2];
  var r2 = function(n4) {
    return H(V2(n4)) ? n4.pop() : void 0;
  }(n3), e2 = function(n4, t3) {
    return "number" == typeof V2(n4) ? n4.pop() : t3;
  }(n3, 1 / 0), o2 = n3;
  return o2.length ? 1 === o2.length ? tn(o2[0]) : function(n4) {
    return void 0 === n4 && (n4 = 1 / 0), dn(O, n4);
  }(e2)(ln(o2, r2)) : G2;
}
__name(Sn, "Sn");
var En = Array.isArray;
function In(n3, t2) {
  return U2(function(r2, e2) {
    var o2 = 0;
    r2.subscribe(C2(e2, function(r3) {
      return n3.call(t2, r3, o2++) && e2.next(r3);
    }));
  });
}
__name(In, "In");
function An() {
  for (var n3, t2 = [], r2 = 0; r2 < arguments.length; r2++)
    t2[r2] = arguments[r2];
  return 1 === (t2 = 1 === (n3 = t2).length && En(n3[0]) ? n3[0] : n3).length ? tn(t2[0]) : new z2(Pn(t2));
}
__name(An, "An");
function Pn(n3) {
  return function(t2) {
    for (var r2 = [], e2 = function(e3) {
      r2.push(tn(n3[e3]).subscribe(C2(t2, function(n4) {
        if (r2) {
          for (var o3 = 0; o3 < r2.length; o3++)
            o3 !== e3 && r2[o3].unsubscribe();
          r2 = null;
        }
        t2.next(n4);
      })));
    }, o2 = 0; r2 && !t2.closed && o2 < n3.length; o2++)
      e2(o2);
  };
}
__name(Pn, "Pn");
function Tn(n3) {
  return U2(function(t2, r2) {
    var e2, o2 = null, i2 = false;
    o2 = t2.subscribe(C2(r2, void 0, void 0, function(u4) {
      e2 = tn(n3(u4, Tn(n3)(t2))), o2 ? (o2.unsubscribe(), o2 = null, e2.subscribe(r2)) : i2 = true;
    })), i2 && (o2.unsubscribe(), o2 = null, e2.subscribe(r2));
  });
}
__name(Tn, "Tn");
function On(n3) {
  return U2(function(t2, r2) {
    var e2 = false;
    t2.subscribe(C2(r2, function(n4) {
      e2 = true, r2.next(n4);
    }, function() {
      e2 || r2.next(n3), r2.complete();
    }));
  });
}
__name(On, "On");
function jn() {
  return U2(function(n3, t2) {
    n3.subscribe(C2(t2, x2));
  });
}
__name(jn, "jn");
function kn(n3) {
  return void 0 === n3 && (n3 = zn), U2(function(t2, r2) {
    var e2 = false;
    t2.subscribe(C2(r2, function(n4) {
      e2 = true, r2.next(n4);
    }, function() {
      return e2 ? r2.complete() : r2.error(n3());
    }));
  });
}
__name(kn, "kn");
function zn() {
  return new an();
}
__name(zn, "zn");
function Ln(n3, t2) {
  var r2 = arguments.length >= 2;
  return function(e2) {
    return e2.pipe(n3 ? In(function(t3, r3) {
      return n3(t3, r3, e2);
    }) : O, (o2 = 1) <= 0 ? function() {
      return G2;
    } : U2(function(n4, t3) {
      var r3 = 0;
      n4.subscribe(C2(t3, function(n5) {
        ++r3 <= o2 && (t3.next(n5), o2 <= r3 && t3.complete());
      }));
    }), r2 ? On(t2) : kn(function() {
      return new an();
    }));
    var o2;
  };
}
__name(Ln, "Ln");
function Un() {
  for (var n3 = [], t2 = 0; t2 < arguments.length; t2++)
    n3[t2] = arguments[t2];
  return n3.length ? U2(function(t3, r2) {
    Pn(u3([t3], i(n3)))(r2);
  }) : O;
}
__name(Un, "Un");
function Cn(n3) {
  var t2;
  void 0 === n3 && (n3 = 1 / 0);
  var r2 = (t2 = n3 && "object" == typeof n3 ? n3 : { count: n3 }).count, e2 = void 0 === r2 ? 1 / 0 : r2, o2 = t2.delay, i2 = t2.resetOnSuccess, u4 = void 0 !== i2 && i2;
  return e2 <= 0 ? O : U2(function(n4, t3) {
    var r3, i3 = 0, c2 = /* @__PURE__ */ __name(function() {
      var s2 = false;
      r3 = n4.subscribe(C2(t3, function(n5) {
        u4 && (i3 = 0), t3.next(n5);
      }, void 0, function(n5) {
        if (i3++ < e2) {
          var u5 = /* @__PURE__ */ __name(function() {
            r3 ? (r3.unsubscribe(), r3 = null, c2()) : s2 = true;
          }, "u");
          if (null != o2) {
            var l2 = "number" == typeof o2 ? _n(o2) : tn(o2(n5, i3)), a2 = C2(t3, function() {
              a2.unsubscribe(), u5();
            }, function() {
              t3.complete();
            });
            l2.subscribe(a2);
          } else
            u5();
        } else
          t3.error(n5);
      })), s2 && (r3.unsubscribe(), r3 = null, c2());
    }, "c");
    c2();
  });
}
__name(Cn, "Cn");
function Dn(n3, t2, r2) {
  var e2 = a(n3) || t2 || r2 ? { next: n3, error: t2, complete: r2 } : n3;
  return e2 ? U2(function(n4, t3) {
    var r3;
    null === (r3 = e2.subscribe) || void 0 === r3 || r3.call(e2);
    var o2 = true;
    n4.subscribe(C2(t3, function(n5) {
      var r4;
      null === (r4 = e2.next) || void 0 === r4 || r4.call(e2, n5), t3.next(n5);
    }, function() {
      var n5;
      o2 = false, null === (n5 = e2.complete) || void 0 === n5 || n5.call(e2), t3.complete();
    }, function(n5) {
      var r4;
      o2 = false, null === (r4 = e2.error) || void 0 === r4 || r4.call(e2, n5), t3.error(n5);
    }, function() {
      var n5, t4;
      o2 && (null === (n5 = e2.unsubscribe) || void 0 === n5 || n5.call(e2)), null === (t4 = e2.finalize) || void 0 === t4 || t4.call(e2);
    }));
  }) : O;
}
__name(Dn, "Dn");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/api/locators/Locator.js
var RETRY_DELAY = 100;
var LocatorEmittedEvents;
(function(LocatorEmittedEvents2) {
  LocatorEmittedEvents2["Action"] = "action";
})(LocatorEmittedEvents || (LocatorEmittedEvents = {}));
var Locator = class extends EventEmitter {
  /**
   * Creates a race between multiple locators but ensures that only a single one
   * acts.
   *
   * @public
   */
  static race(locators) {
    return RaceLocator.create(locators);
  }
  /**
   * @internal
   */
  visibility = null;
  /**
   * @internal
   */
  _timeout = 3e4;
  #ensureElementIsInTheViewport = true;
  #waitForEnabled = true;
  #waitForStableBoundingBox = true;
  /**
   * @internal
   */
  operators = {
    conditions: (conditions, signal) => {
      return dn((handle) => {
        return Sn(...conditions.map((condition) => {
          return condition(handle, signal);
        })).pipe(On(handle));
      });
    },
    retryAndRaceWithSignalAndTimer: (signal) => {
      const candidates = [];
      if (signal) {
        candidates.push(xn(signal, "abort").pipe(hn(() => {
          throw signal.reason;
        })));
      }
      if (this._timeout > 0) {
        candidates.push(_n(this._timeout).pipe(hn(() => {
          throw new TimeoutError(`Timed out after waiting ${this._timeout}ms`);
        })));
      }
      return j2(Cn({ delay: RETRY_DELAY }), Un(...candidates));
    }
  };
  // Determines when the locator will timeout for actions.
  get timeout() {
    return this._timeout;
  }
  on(eventName, handler) {
    return super.on(eventName, handler);
  }
  once(eventName, handler) {
    return super.once(eventName, handler);
  }
  off(eventName, handler) {
    return super.off(eventName, handler);
  }
  setTimeout(timeout) {
    const locator = this._clone();
    locator._timeout = timeout;
    return locator;
  }
  setVisibility(visibility) {
    const locator = this._clone();
    locator.visibility = visibility;
    return locator;
  }
  setWaitForEnabled(value) {
    const locator = this._clone();
    locator.#waitForEnabled = value;
    return locator;
  }
  setEnsureElementIsInTheViewport(value) {
    const locator = this._clone();
    locator.#ensureElementIsInTheViewport = value;
    return locator;
  }
  setWaitForStableBoundingBox(value) {
    const locator = this._clone();
    locator.#waitForStableBoundingBox = value;
    return locator;
  }
  /**
   * @internal
   */
  copyOptions(locator) {
    this._timeout = locator._timeout;
    this.visibility = locator.visibility;
    this.#waitForEnabled = locator.#waitForEnabled;
    this.#ensureElementIsInTheViewport = locator.#ensureElementIsInTheViewport;
    this.#waitForStableBoundingBox = locator.#waitForStableBoundingBox;
    return this;
  }
  /**
   * If the element has a "disabled" property, wait for the element to be
   * enabled.
   */
  #waitForEnabledIfNeeded = (handle, signal) => {
    if (!this.#waitForEnabled) {
      return G2;
    }
    return ln(handle.frame.waitForFunction((element) => {
      if (!(element instanceof HTMLElement)) {
        return true;
      }
      const isNativeFormControl = [
        "BUTTON",
        "INPUT",
        "SELECT",
        "TEXTAREA",
        "OPTION",
        "OPTGROUP"
      ].includes(element.nodeName);
      return !isNativeFormControl || !element.hasAttribute("disabled");
    }, {
      timeout: this._timeout,
      signal
    }, handle)).pipe(jn());
  };
  /**
   * Compares the bounding box of the element for two consecutive animation
   * frames and waits till they are the same.
   */
  #waitForStableBoundingBoxIfNeeded = (handle) => {
    if (!this.#waitForStableBoundingBox) {
      return G2;
    }
    return bn(() => {
      return ln(handle.evaluate((element) => {
        return new Promise((resolve) => {
          window.requestAnimationFrame(() => {
            const rect1 = element.getBoundingClientRect();
            window.requestAnimationFrame(() => {
              const rect2 = element.getBoundingClientRect();
              resolve([
                {
                  x: rect1.x,
                  y: rect1.y,
                  width: rect1.width,
                  height: rect1.height
                },
                {
                  x: rect2.x,
                  y: rect2.y,
                  width: rect2.width,
                  height: rect2.height
                }
              ]);
            });
          });
        });
      }));
    }).pipe(Ln(([rect1, rect2]) => {
      return rect1.x === rect2.x && rect1.y === rect2.y && rect1.width === rect2.width && rect1.height === rect2.height;
    }), Cn({ delay: RETRY_DELAY }), jn());
  };
  /**
   * Checks if the element is in the viewport and auto-scrolls it if it is not.
   */
  #ensureElementIsInTheViewportIfNeeded = (handle) => {
    if (!this.#ensureElementIsInTheViewport) {
      return G2;
    }
    return ln(handle.isIntersectingViewport({ threshold: 0 })).pipe(In((isIntersectingViewport) => {
      return !isIntersectingViewport;
    }), dn(() => {
      return ln(handle.scrollIntoView());
    }), dn(() => {
      return bn(() => {
        return ln(handle.isIntersectingViewport({ threshold: 0 }));
      }).pipe(Ln(O), Cn({ delay: RETRY_DELAY }), jn());
    }));
  };
  #click(options) {
    const signal = options?.signal;
    return this._wait(options).pipe(this.operators.conditions([
      this.#ensureElementIsInTheViewportIfNeeded,
      this.#waitForStableBoundingBoxIfNeeded,
      this.#waitForEnabledIfNeeded
    ], signal), Dn(() => {
      return this.emit(LocatorEmittedEvents.Action);
    }), dn((handle) => {
      return ln(handle.click(options)).pipe(Tn((_3, caught) => {
        void handle.dispose().catch(debugError);
        return caught;
      }));
    }), this.operators.retryAndRaceWithSignalAndTimer(signal));
  }
  #fill(value, options) {
    const signal = options?.signal;
    return this._wait(options).pipe(this.operators.conditions([
      this.#ensureElementIsInTheViewportIfNeeded,
      this.#waitForStableBoundingBoxIfNeeded,
      this.#waitForEnabledIfNeeded
    ], signal), Dn(() => {
      return this.emit(LocatorEmittedEvents.Action);
    }), dn((handle) => {
      return ln(handle.evaluate((el) => {
        if (el instanceof HTMLSelectElement) {
          return "select";
        }
        if (el instanceof HTMLTextAreaElement) {
          return "typeable-input";
        }
        if (el instanceof HTMLInputElement) {
          if ((/* @__PURE__ */ new Set([
            "textarea",
            "text",
            "url",
            "tel",
            "search",
            "password",
            "number",
            "email"
          ])).has(el.type)) {
            return "typeable-input";
          } else {
            return "other-input";
          }
        }
        if (el.isContentEditable) {
          return "contenteditable";
        }
        return "unknown";
      })).pipe(dn((inputType) => {
        switch (inputType) {
          case "select":
            return ln(handle.select(value).then(x2));
          case "contenteditable":
          case "typeable-input":
            return ln(handle.evaluate((input, newValue) => {
              const currentValue = input.isContentEditable ? input.innerText : input.value;
              if (newValue.length <= currentValue.length || !newValue.startsWith(input.value)) {
                if (input.isContentEditable) {
                  input.innerText = "";
                } else {
                  input.value = "";
                }
                return newValue;
              }
              const originalValue = input.isContentEditable ? input.innerText : input.value;
              if (input.isContentEditable) {
                input.innerText = "";
                input.innerText = originalValue;
              } else {
                input.value = "";
                input.value = originalValue;
              }
              return newValue.substring(originalValue.length);
            }, value)).pipe(dn((textToType) => {
              return ln(handle.type(textToType));
            }));
          case "other-input":
            return ln(handle.focus()).pipe(dn(() => {
              return ln(handle.evaluate((input, value2) => {
                input.value = value2;
                input.dispatchEvent(new Event("input", { bubbles: true }));
                input.dispatchEvent(new Event("change", { bubbles: true }));
              }, value));
            }));
          case "unknown":
            throw new Error(`Element cannot be filled out.`);
        }
      })).pipe(Tn((_3, caught) => {
        void handle.dispose().catch(debugError);
        return caught;
      }));
    }), this.operators.retryAndRaceWithSignalAndTimer(signal));
  }
  #hover(options) {
    const signal = options?.signal;
    return this._wait(options).pipe(this.operators.conditions([
      this.#ensureElementIsInTheViewportIfNeeded,
      this.#waitForStableBoundingBoxIfNeeded
    ], signal), Dn(() => {
      return this.emit(LocatorEmittedEvents.Action);
    }), dn((handle) => {
      return ln(handle.hover()).pipe(Tn((_3, caught) => {
        void handle.dispose().catch(debugError);
        return caught;
      }));
    }), this.operators.retryAndRaceWithSignalAndTimer(signal));
  }
  #scroll(options) {
    const signal = options?.signal;
    return this._wait(options).pipe(this.operators.conditions([
      this.#ensureElementIsInTheViewportIfNeeded,
      this.#waitForStableBoundingBoxIfNeeded
    ], signal), Dn(() => {
      return this.emit(LocatorEmittedEvents.Action);
    }), dn((handle) => {
      return ln(handle.evaluate((el, scrollTop, scrollLeft) => {
        if (scrollTop !== void 0) {
          el.scrollTop = scrollTop;
        }
        if (scrollLeft !== void 0) {
          el.scrollLeft = scrollLeft;
        }
      }, options?.scrollTop, options?.scrollLeft)).pipe(Tn((_3, caught) => {
        void handle.dispose().catch(debugError);
        return caught;
      }));
    }), this.operators.retryAndRaceWithSignalAndTimer(signal));
  }
  /**
   * Clones the locator.
   */
  clone() {
    return this._clone();
  }
  /**
   * Waits for the locator to get a handle from the page.
   *
   * @public
   */
  async waitHandle(options) {
    return await fn(this._wait(options).pipe(this.operators.retryAndRaceWithSignalAndTimer(options?.signal)));
  }
  /**
   * Waits for the locator to get the serialized value from the page.
   *
   * Note this requires the value to be JSON-serializable.
   *
   * @public
   */
  async wait(options) {
    const handle = await this.waitHandle(options);
    try {
      return await handle.jsonValue();
    } finally {
      void handle.dispose().catch(debugError);
    }
  }
  /**
   * Maps the locator using the provided mapper.
   *
   * @public
   */
  map(mapper) {
    return new MappedLocator(this._clone(), (handle) => {
      return handle.evaluateHandle(mapper);
    });
  }
  /**
   * Creates an expectation that is evaluated against located values.
   *
   * If the expectations do not match, then the locator will retry.
   *
   * @public
   */
  filter(predicate) {
    return new FilteredLocator(this._clone(), async (handle, signal) => {
      await handle.frame.waitForFunction(predicate, { signal, timeout: this._timeout }, handle);
      return true;
    });
  }
  /**
   * Creates an expectation that is evaluated against located handles.
   *
   * If the expectations do not match, then the locator will retry.
   *
   * @internal
   */
  filterHandle(predicate) {
    return new FilteredLocator(this._clone(), predicate);
  }
  /**
   * Maps the locator using the provided mapper.
   *
   * @internal
   */
  mapHandle(mapper) {
    return new MappedLocator(this._clone(), mapper);
  }
  click(options) {
    return fn(this.#click(options));
  }
  /**
   * Fills out the input identified by the locator using the provided value. The
   * type of the input is determined at runtime and the appropriate fill-out
   * method is chosen based on the type. contenteditable, selector, inputs are
   * supported.
   */
  fill(value, options) {
    return fn(this.#fill(value, options));
  }
  hover(options) {
    return fn(this.#hover(options));
  }
  scroll(options) {
    return fn(this.#scroll(options));
  }
};
__name(Locator, "Locator");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/api/locators/NodeLocator.js
init_checked_fetch();
init_modules_watch_stub();
var NodeLocator = class extends Locator {
  static create(pageOrFrame, selector) {
    return new NodeLocator(pageOrFrame, selector).setTimeout("getDefaultTimeout" in pageOrFrame ? pageOrFrame.getDefaultTimeout() : pageOrFrame.page().getDefaultTimeout());
  }
  #pageOrFrame;
  #selector;
  constructor(pageOrFrame, selector) {
    super();
    this.#pageOrFrame = pageOrFrame;
    this.#selector = selector;
  }
  /**
   * Waits for the element to become visible or hidden. visibility === 'visible'
   * means that the element has a computed style, the visibility property other
   * than 'hidden' or 'collapse' and non-empty bounding box. visibility ===
   * 'hidden' means the opposite of that.
   */
  #waitForVisibilityIfNeeded = (handle) => {
    if (!this.visibility) {
      return G2;
    }
    return (() => {
      switch (this.visibility) {
        case "hidden":
          return bn(() => {
            return ln(handle.isHidden());
          });
        case "visible":
          return bn(() => {
            return ln(handle.isVisible());
          });
      }
    })().pipe(Ln(O), Cn({ delay: RETRY_DELAY }), jn());
  };
  _clone() {
    return new NodeLocator(this.#pageOrFrame, this.#selector).copyOptions(this);
  }
  _wait(options) {
    const signal = options?.signal;
    return bn(() => {
      return ln(this.#pageOrFrame.waitForSelector(this.#selector, {
        visible: false,
        timeout: this._timeout,
        signal
      }));
    }).pipe(In((value) => {
      return value !== null;
    }), kn(), this.operators.conditions([this.#waitForVisibilityIfNeeded], signal));
  }
};
__name(NodeLocator, "NodeLocator");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/api/locators/FilteredLocator.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/api/locators/DelegatedLocator.js
init_checked_fetch();
init_modules_watch_stub();
var DelegatedLocator = class extends Locator {
  #delegate;
  constructor(delegate) {
    super();
    this.#delegate = delegate;
    this.copyOptions(this.#delegate);
  }
  get delegate() {
    return this.#delegate;
  }
  setTimeout(timeout) {
    const locator = super.setTimeout(timeout);
    locator.#delegate = this.#delegate.setTimeout(timeout);
    return locator;
  }
  setVisibility(visibility) {
    const locator = super.setVisibility(visibility);
    locator.#delegate = locator.#delegate.setVisibility(visibility);
    return locator;
  }
  setWaitForEnabled(value) {
    const locator = super.setWaitForEnabled(value);
    locator.#delegate = this.#delegate.setWaitForEnabled(value);
    return locator;
  }
  setEnsureElementIsInTheViewport(value) {
    const locator = super.setEnsureElementIsInTheViewport(value);
    locator.#delegate = this.#delegate.setEnsureElementIsInTheViewport(value);
    return locator;
  }
  setWaitForStableBoundingBox(value) {
    const locator = super.setWaitForStableBoundingBox(value);
    locator.#delegate = this.#delegate.setWaitForStableBoundingBox(value);
    return locator;
  }
};
__name(DelegatedLocator, "DelegatedLocator");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/api/locators/FilteredLocator.js
var FilteredLocator = class extends DelegatedLocator {
  #predicate;
  constructor(base, predicate) {
    super(base);
    this.#predicate = predicate;
  }
  _clone() {
    return new FilteredLocator(this.delegate.clone(), this.#predicate).copyOptions(this);
  }
  _wait(options) {
    return this.delegate._wait(options).pipe(dn((handle) => {
      return ln(Promise.resolve(this.#predicate(handle, options?.signal))).pipe(In((value) => {
        return value;
      }), hn(() => {
        return handle;
      }));
    }), kn());
  }
};
__name(FilteredLocator, "FilteredLocator");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/api/locators/RaceLocator.js
init_checked_fetch();
init_modules_watch_stub();
function checkLocatorArray(locators) {
  for (const locator of locators) {
    if (!(locator instanceof Locator)) {
      throw new Error("Unknown locator for race candidate");
    }
  }
  return locators;
}
__name(checkLocatorArray, "checkLocatorArray");
var RaceLocator = class extends Locator {
  static create(locators) {
    const array = checkLocatorArray(locators);
    return new RaceLocator(array);
  }
  #locators;
  constructor(locators) {
    super();
    this.#locators = locators;
  }
  _clone() {
    return new RaceLocator(this.#locators.map((locator) => {
      return locator.clone();
    })).copyOptions(this);
  }
  _wait(options) {
    return An(...this.#locators.map((locator) => {
      return locator._wait(options);
    }));
  }
};
__name(RaceLocator, "RaceLocator");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/api/locators/MappedLocator.js
init_checked_fetch();
init_modules_watch_stub();
var MappedLocator = class extends DelegatedLocator {
  #mapper;
  constructor(base, mapper) {
    super(base);
    this.#mapper = mapper;
  }
  _clone() {
    return new MappedLocator(this.delegate.clone(), this.#mapper).copyOptions(this);
  }
  _wait(options) {
    return this.delegate._wait(options).pipe(dn((handle) => {
      return ln(Promise.resolve(this.#mapper(handle, options?.signal)));
    }));
  }
};
__name(MappedLocator, "MappedLocator");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/api/locators/FunctionLocator.js
init_checked_fetch();
init_modules_watch_stub();
var FunctionLocator = class extends Locator {
  static create(pageOrFrame, func) {
    return new FunctionLocator(pageOrFrame, func).setTimeout("getDefaultTimeout" in pageOrFrame ? pageOrFrame.getDefaultTimeout() : pageOrFrame.page().getDefaultTimeout());
  }
  #pageOrFrame;
  #func;
  constructor(pageOrFrame, func) {
    super();
    this.#pageOrFrame = pageOrFrame;
    this.#func = func;
  }
  _clone() {
    return new FunctionLocator(this.#pageOrFrame, this.#func);
  }
  _wait(options) {
    const signal = options?.signal;
    return bn(() => {
      return ln(this.#pageOrFrame.waitForFunction(this.#func, {
        timeout: this.timeout,
        signal
      }));
    }).pipe(kn());
  }
};
__name(FunctionLocator, "FunctionLocator");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/api/Page.js
var Page = class extends EventEmitter {
  #handlerMap = /* @__PURE__ */ new WeakMap();
  /**
   * @internal
   */
  constructor() {
    super();
  }
  /**
   * `true` if the service worker are being bypassed, `false` otherwise.
   */
  isServiceWorkerBypassed() {
    throw new Error("Not implemented");
  }
  /**
   * `true` if drag events are being intercepted, `false` otherwise.
   */
  isDragInterceptionEnabled() {
    throw new Error("Not implemented");
  }
  /**
   * `true` if the page has JavaScript enabled, `false` otherwise.
   */
  isJavaScriptEnabled() {
    throw new Error("Not implemented");
  }
  /**
   * Listen to page events.
   *
   * :::note
   *
   * This method exists to define event typings and handle proper wireup of
   * cooperative request interception. Actual event listening and dispatching is
   * delegated to {@link EventEmitter}.
   *
   * :::
   */
  on(eventName, handler) {
    if (eventName === "request") {
      const wrap = this.#handlerMap.get(handler) || ((event) => {
        event.enqueueInterceptAction(() => {
          return handler(event);
        });
      });
      this.#handlerMap.set(handler, wrap);
      return super.on(eventName, wrap);
    }
    return super.on(eventName, handler);
  }
  once(eventName, handler) {
    return super.once(eventName, handler);
  }
  off(eventName, handler) {
    if (eventName === "request") {
      handler = this.#handlerMap.get(handler) || handler;
    }
    return super.off(eventName, handler);
  }
  waitForFileChooser() {
    throw new Error("Not implemented");
  }
  async setGeolocation() {
    throw new Error("Not implemented");
  }
  /**
   * A target this page was created from.
   */
  target() {
    throw new Error("Not implemented");
  }
  /**
   * Get the browser the page belongs to.
   */
  browser() {
    throw new Error("Not implemented");
  }
  /**
   * Get the browser context that the page belongs to.
   */
  browserContext() {
    throw new Error("Not implemented");
  }
  /**
   * The page's main frame.
   *
   * @remarks
   * Page is guaranteed to have a main frame which persists during navigations.
   */
  mainFrame() {
    throw new Error("Not implemented");
  }
  /**
   * Creates a Chrome Devtools Protocol session attached to the page.
   */
  createCDPSession() {
    throw new Error("Not implemented");
  }
  /**
   * {@inheritDoc Keyboard}
   */
  get keyboard() {
    throw new Error("Not implemented");
  }
  /**
   * {@inheritDoc Touchscreen}
   */
  get touchscreen() {
    throw new Error("Not implemented");
  }
  /**
   * {@inheritDoc Coverage}
   */
  get coverage() {
    throw new Error("Not implemented");
  }
  /**
   * {@inheritDoc Tracing}
   */
  get tracing() {
    throw new Error("Not implemented");
  }
  /**
   * {@inheritDoc Accessibility}
   */
  get accessibility() {
    throw new Error("Not implemented");
  }
  /**
   * An array of all frames attached to the page.
   */
  frames() {
    throw new Error("Not implemented");
  }
  /**
   * All of the dedicated {@link
   * https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API |
   * WebWorkers} associated with the page.
   *
   * @remarks
   * This does not contain ServiceWorkers
   */
  workers() {
    throw new Error("Not implemented");
  }
  async setRequestInterception() {
    throw new Error("Not implemented");
  }
  async setBypassServiceWorker() {
    throw new Error("Not implemented");
  }
  async setDragInterception() {
    throw new Error("Not implemented");
  }
  setOfflineMode() {
    throw new Error("Not implemented");
  }
  emulateNetworkConditions() {
    throw new Error("Not implemented");
  }
  setDefaultNavigationTimeout() {
    throw new Error("Not implemented");
  }
  setDefaultTimeout() {
    throw new Error("Not implemented");
  }
  /**
   * Maximum time in milliseconds.
   */
  getDefaultTimeout() {
    throw new Error("Not implemented");
  }
  locator(selectorOrFunc) {
    if (typeof selectorOrFunc === "string") {
      return NodeLocator.create(this, selectorOrFunc);
    } else {
      return FunctionLocator.create(this, selectorOrFunc);
    }
  }
  /**
   * A shortcut for {@link Locator.race} that does not require static imports.
   *
   * @internal
   */
  locatorRace(locators) {
    return Locator.race(locators);
  }
  /**
   * Runs `document.querySelector` within the page. If no element matches the
   * selector, the return value resolves to `null`.
   *
   * @param selector - A `selector` to query page for
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | selector}
   * to query page for.
   */
  async $(selector) {
    return this.mainFrame().$(selector);
  }
  /**
   * The method runs `document.querySelectorAll` within the page. If no elements
   * match the selector, the return value resolves to `[]`.
   * @remarks
   * Shortcut for {@link Frame.$$ | Page.mainFrame().$$(selector) }.
   * @param selector - A `selector` to query page for
   */
  async $$(selector) {
    return this.mainFrame().$$(selector);
  }
  async evaluateHandle() {
    throw new Error("Not implemented");
  }
  async queryObjects() {
    throw new Error("Not implemented");
  }
  /**
   * This method runs `document.querySelector` within the page and passes the
   * result as the first argument to the `pageFunction`.
   *
   * @remarks
   *
   * If no element is found matching `selector`, the method will throw an error.
   *
   * If `pageFunction` returns a promise `$eval` will wait for the promise to
   * resolve and then return its value.
   *
   * @example
   *
   * ```ts
   * const searchValue = await page.$eval('#search', el => el.value);
   * const preloadHref = await page.$eval('link[rel=preload]', el => el.href);
   * const html = await page.$eval('.main-container', el => el.outerHTML);
   * ```
   *
   * If you are using TypeScript, you may have to provide an explicit type to the
   * first argument of the `pageFunction`.
   * By default it is typed as `Element`, but you may need to provide a more
   * specific sub-type:
   *
   * @example
   *
   * ```ts
   * // if you don't provide HTMLInputElement here, TS will error
   * // as `value` is not on `Element`
   * const searchValue = await page.$eval(
   *   '#search',
   *   (el: HTMLInputElement) => el.value
   * );
   * ```
   *
   * The compiler should be able to infer the return type
   * from the `pageFunction` you provide. If it is unable to, you can use the generic
   * type to tell the compiler what return type you expect from `$eval`:
   *
   * @example
   *
   * ```ts
   * // The compiler can infer the return type in this case, but if it can't
   * // or if you want to be more explicit, provide it as the generic type.
   * const searchValue = await page.$eval<string>(
   *   '#search',
   *   (el: HTMLInputElement) => el.value
   * );
   * ```
   *
   * @param selector - the
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | selector}
   * to query for
   * @param pageFunction - the function to be evaluated in the page context.
   * Will be passed the result of `document.querySelector(selector)` as its
   * first argument.
   * @param args - any additional arguments to pass through to `pageFunction`.
   *
   * @returns The result of calling `pageFunction`. If it returns an element it
   * is wrapped in an {@link ElementHandle}, else the raw value itself is
   * returned.
   */
  async $eval(selector, pageFunction, ...args) {
    pageFunction = withSourcePuppeteerURLIfNone(this.$eval.name, pageFunction);
    return this.mainFrame().$eval(selector, pageFunction, ...args);
  }
  /**
   * This method runs `Array.from(document.querySelectorAll(selector))` within
   * the page and passes the result as the first argument to the `pageFunction`.
   *
   * @remarks
   * If `pageFunction` returns a promise `$$eval` will wait for the promise to
   * resolve and then return its value.
   *
   * @example
   *
   * ```ts
   * // get the amount of divs on the page
   * const divCount = await page.$$eval('div', divs => divs.length);
   *
   * // get the text content of all the `.options` elements:
   * const options = await page.$$eval('div > span.options', options => {
   *   return options.map(option => option.textContent);
   * });
   * ```
   *
   * If you are using TypeScript, you may have to provide an explicit type to the
   * first argument of the `pageFunction`.
   * By default it is typed as `Element[]`, but you may need to provide a more
   * specific sub-type:
   *
   * @example
   *
   * ```ts
   * // if you don't provide HTMLInputElement here, TS will error
   * // as `value` is not on `Element`
   * await page.$$eval('input', (elements: HTMLInputElement[]) => {
   *   return elements.map(e => e.value);
   * });
   * ```
   *
   * The compiler should be able to infer the return type
   * from the `pageFunction` you provide. If it is unable to, you can use the generic
   * type to tell the compiler what return type you expect from `$$eval`:
   *
   * @example
   *
   * ```ts
   * // The compiler can infer the return type in this case, but if it can't
   * // or if you want to be more explicit, provide it as the generic type.
   * const allInputValues = await page.$$eval<string[]>(
   *   'input',
   *   (elements: HTMLInputElement[]) => elements.map(e => e.textContent)
   * );
   * ```
   *
   * @param selector - the
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | selector}
   * to query for
   * @param pageFunction - the function to be evaluated in the page context.
   * Will be passed the result of
   * `Array.from(document.querySelectorAll(selector))` as its first argument.
   * @param args - any additional arguments to pass through to `pageFunction`.
   *
   * @returns The result of calling `pageFunction`. If it returns an element it
   * is wrapped in an {@link ElementHandle}, else the raw value itself is
   * returned.
   */
  async $$eval(selector, pageFunction, ...args) {
    pageFunction = withSourcePuppeteerURLIfNone(this.$$eval.name, pageFunction);
    return this.mainFrame().$$eval(selector, pageFunction, ...args);
  }
  /**
   * The method evaluates the XPath expression relative to the page document as
   * its context node. If there are no such elements, the method resolves to an
   * empty array.
   *
   * @remarks
   * Shortcut for {@link Frame.$x | Page.mainFrame().$x(expression) }.
   *
   * @param expression - Expression to evaluate
   */
  async $x(expression) {
    return this.mainFrame().$x(expression);
  }
  async cookies() {
    throw new Error("Not implemented");
  }
  async deleteCookie() {
    throw new Error("Not implemented");
  }
  async setCookie() {
    throw new Error("Not implemented");
  }
  /**
   * Adds a `<script>` tag into the page with the desired URL or content.
   *
   * @remarks
   * Shortcut for
   * {@link Frame.addScriptTag | page.mainFrame().addScriptTag(options)}.
   *
   * @param options - Options for the script.
   * @returns An {@link ElementHandle | element handle} to the injected
   * `<script>` element.
   */
  async addScriptTag(options) {
    return this.mainFrame().addScriptTag(options);
  }
  async addStyleTag(options) {
    return this.mainFrame().addStyleTag(options);
  }
  async exposeFunction() {
    throw new Error("Not implemented");
  }
  async removeExposedFunction() {
    throw new Error("Not implemented");
  }
  async authenticate() {
    throw new Error("Not implemented");
  }
  async setExtraHTTPHeaders() {
    throw new Error("Not implemented");
  }
  async setUserAgent() {
    throw new Error("Not implemented");
  }
  /**
   * Object containing metrics as key/value pairs.
   *
   * @returns
   *
   * - `Timestamp` : The timestamp when the metrics sample was taken.
   *
   * - `Documents` : Number of documents in the page.
   *
   * - `Frames` : Number of frames in the page.
   *
   * - `JSEventListeners` : Number of events in the page.
   *
   * - `Nodes` : Number of DOM nodes in the page.
   *
   * - `LayoutCount` : Total number of full or partial page layout.
   *
   * - `RecalcStyleCount` : Total number of page style recalculations.
   *
   * - `LayoutDuration` : Combined durations of all page layouts.
   *
   * - `RecalcStyleDuration` : Combined duration of all page style
   *   recalculations.
   *
   * - `ScriptDuration` : Combined duration of JavaScript execution.
   *
   * - `TaskDuration` : Combined duration of all tasks performed by the browser.
   *
   * - `JSHeapUsedSize` : Used JavaScript heap size.
   *
   * - `JSHeapTotalSize` : Total JavaScript heap size.
   *
   * @remarks
   * All timestamps are in monotonic time: monotonically increasing time
   * in seconds since an arbitrary point in the past.
   */
  async metrics() {
    throw new Error("Not implemented");
  }
  /**
   * The page's URL.
   * @remarks Shortcut for
   * {@link Frame.url | page.mainFrame().url()}.
   */
  url() {
    throw new Error("Not implemented");
  }
  /**
   * The full HTML contents of the page, including the DOCTYPE.
   */
  async content() {
    throw new Error("Not implemented");
  }
  async setContent() {
    throw new Error("Not implemented");
  }
  async goto() {
    throw new Error("Not implemented");
  }
  async reload() {
    throw new Error("Not implemented");
  }
  /**
   * Waits for the page to navigate to a new URL or to reload. It is useful when
   * you run code that will indirectly cause the page to navigate.
   *
   * @example
   *
   * ```ts
   * const [response] = await Promise.all([
   *   page.waitForNavigation(), // The promise resolves after navigation has finished
   *   page.click('a.my-link'), // Clicking the link will indirectly cause a navigation
   * ]);
   * ```
   *
   * @remarks
   * Usage of the
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/History_API | History API}
   * to change the URL is considered a navigation.
   *
   * @param options - Navigation parameters which might have the following
   * properties:
   * @returns A `Promise` which resolves to the main resource response.
   *
   * - In case of multiple redirects, the navigation will resolve with the
   *   response of the last redirect.
   * - In case of navigation to a different anchor or navigation due to History
   *   API usage, the navigation will resolve with `null`.
   */
  async waitForNavigation(options = {}) {
    return await this.mainFrame().waitForNavigation(options);
  }
  async waitForRequest() {
    throw new Error("Not implemented");
  }
  async waitForResponse() {
    throw new Error("Not implemented");
  }
  async waitForNetworkIdle() {
    throw new Error("Not implemented");
  }
  /**
   * @internal
   */
  async _waitForNetworkIdle(networkManager, idleTime, timeout, closedDeferred) {
    const idleDeferred = Deferred.create();
    const abortDeferred = Deferred.create();
    let idleTimer;
    const cleanup = /* @__PURE__ */ __name(() => {
      clearTimeout(idleTimer);
      abortDeferred.reject(new Error("abort"));
    }, "cleanup");
    const evaluate = /* @__PURE__ */ __name(() => {
      clearTimeout(idleTimer);
      if (networkManager.inFlightRequestsCount() === 0) {
        idleTimer = setTimeout(() => {
          return idleDeferred.resolve();
        }, idleTime);
      }
    }, "evaluate");
    const listenToEvent = /* @__PURE__ */ __name((event) => {
      return waitForEvent(networkManager, event, () => {
        evaluate();
        return false;
      }, timeout, abortDeferred);
    }, "listenToEvent");
    const eventPromises = [
      listenToEvent(NetworkManagerEmittedEvents.Request),
      listenToEvent(NetworkManagerEmittedEvents.Response),
      listenToEvent(NetworkManagerEmittedEvents.RequestFailed)
    ];
    evaluate();
    const closedPromise = closedDeferred.valueOrThrow();
    await Deferred.race([idleDeferred, ...eventPromises, closedPromise]).then((r2) => {
      cleanup();
      return r2;
    }, (error) => {
      cleanup();
      throw error;
    });
  }
  async waitForFrame() {
    throw new Error("Not implemented");
  }
  async goBack() {
    throw new Error("Not implemented");
  }
  async goForward() {
    throw new Error("Not implemented");
  }
  /**
   * Brings page to front (activates tab).
   */
  async bringToFront() {
    throw new Error("Not implemented");
  }
  /**
   * Emulates a given device's metrics and user agent.
   *
   * To aid emulation, Puppeteer provides a list of known devices that can be
   * via {@link KnownDevices}.
   *
   * @remarks
   * This method is a shortcut for calling two methods:
   * {@link Page.setUserAgent} and {@link Page.setViewport}.
   *
   * @remarks
   * This method will resize the page. A lot of websites don't expect phones to
   * change size, so you should emulate before navigating to the page.
   *
   * @example
   *
   * ```ts
   * import {KnownDevices} from 'puppeteer';
   * const iPhone = KnownDevices['iPhone 6'];
   *
   * (async () => {
   *   const browser = await puppeteer.launch();
   *   const page = await browser.newPage();
   *   await page.emulate(iPhone);
   *   await page.goto('https://www.google.com');
   *   // other actions...
   *   await browser.close();
   * })();
   * ```
   */
  async emulate(device) {
    await Promise.all([
      this.setUserAgent(device.userAgent),
      this.setViewport(device.viewport)
    ]);
  }
  async setJavaScriptEnabled() {
    throw new Error("Not implemented");
  }
  async setBypassCSP() {
    throw new Error("Not implemented");
  }
  async emulateMediaType() {
    throw new Error("Not implemented");
  }
  async emulateCPUThrottling() {
    throw new Error("Not implemented");
  }
  async emulateMediaFeatures() {
    throw new Error("Not implemented");
  }
  async emulateTimezone() {
    throw new Error("Not implemented");
  }
  async emulateIdleState() {
    throw new Error("Not implemented");
  }
  async emulateVisionDeficiency() {
    throw new Error("Not implemented");
  }
  async setViewport() {
    throw new Error("Not implemented");
  }
  /**
   * Current page viewport settings.
   *
   * @returns
   *
   * - `width`: page's width in pixels
   *
   * - `height`: page's height in pixels
   *
   * - `deviceScaleFactor`: Specify device scale factor (can be though of as
   *   dpr). Defaults to `1`.
   *
   * - `isMobile`: Whether the meta viewport tag is taken into account. Defaults
   *   to `false`.
   *
   * - `hasTouch`: Specifies if viewport supports touch events. Defaults to
   *   `false`.
   *
   * - `isLandScape`: Specifies if viewport is in landscape mode. Defaults to
   *   `false`.
   */
  viewport() {
    throw new Error("Not implemented");
  }
  async evaluate() {
    throw new Error("Not implemented");
  }
  async evaluateOnNewDocument() {
    throw new Error("Not implemented");
  }
  async removeScriptToEvaluateOnNewDocument() {
    throw new Error("Not implemented");
  }
  async setCacheEnabled() {
    throw new Error("Not implemented");
  }
  /**
   * @internal
   */
  async _maybeWriteBufferToFile(path, buffer) {
    if (!path) {
      return;
    }
    const fs2 = await importFSPromises();
    await fs2.writeFile(path, buffer);
  }
  async screenshot() {
    throw new Error("Not implemented");
  }
  /**
   * @internal
   */
  _getPDFOptions(options = {}, lengthUnit = "in") {
    const defaults = {
      scale: 1,
      displayHeaderFooter: false,
      headerTemplate: "",
      footerTemplate: "",
      printBackground: false,
      landscape: false,
      pageRanges: "",
      preferCSSPageSize: false,
      omitBackground: false,
      timeout: 3e4
    };
    let width = 8.5;
    let height = 11;
    if (options.format) {
      const format = paperFormats[options.format.toLowerCase()];
      assert(format, "Unknown paper format: " + options.format);
      width = format.width;
      height = format.height;
    } else {
      width = convertPrintParameterToInches(options.width, lengthUnit) ?? width;
      height = convertPrintParameterToInches(options.height, lengthUnit) ?? height;
    }
    const margin = {
      top: convertPrintParameterToInches(options.margin?.top, lengthUnit) || 0,
      left: convertPrintParameterToInches(options.margin?.left, lengthUnit) || 0,
      bottom: convertPrintParameterToInches(options.margin?.bottom, lengthUnit) || 0,
      right: convertPrintParameterToInches(options.margin?.right, lengthUnit) || 0
    };
    const output = {
      ...defaults,
      ...options,
      width,
      height,
      margin
    };
    return output;
  }
  async createPDFStream() {
    throw new Error("Not implemented");
  }
  async pdf() {
    throw new Error("Not implemented");
  }
  /**
   * The page's title
   *
   * @remarks
   * Shortcut for {@link Frame.title | page.mainFrame().title()}.
   */
  async title() {
    throw new Error("Not implemented");
  }
  async close() {
    throw new Error("Not implemented");
  }
  /**
   * Indicates that the page has been closed.
   * @returns
   */
  isClosed() {
    throw new Error("Not implemented");
  }
  /**
   * {@inheritDoc Mouse}
   */
  get mouse() {
    throw new Error("Not implemented");
  }
  /**
   * This method fetches an element with `selector`, scrolls it into view if
   * needed, and then uses {@link Page | Page.mouse} to click in the center of the
   * element. If there's no element matching `selector`, the method throws an
   * error.
   * @remarks Bear in mind that if `click()` triggers a navigation event and
   * there's a separate `page.waitForNavigation()` promise to be resolved, you
   * may end up with a race condition that yields unexpected results. The
   * correct pattern for click and wait for navigation is the following:
   *
   * ```ts
   * const [response] = await Promise.all([
   *   page.waitForNavigation(waitOptions),
   *   page.click(selector, clickOptions),
   * ]);
   * ```
   *
   * Shortcut for {@link Frame.click | page.mainFrame().click(selector[, options]) }.
   * @param selector - A `selector` to search for element to click. If there are
   * multiple elements satisfying the `selector`, the first will be clicked
   * @param options - `Object`
   * @returns Promise which resolves when the element matching `selector` is
   * successfully clicked. The Promise will be rejected if there is no element
   * matching `selector`.
   */
  click(selector, options) {
    return this.mainFrame().click(selector, options);
  }
  /**
   * This method fetches an element with `selector` and focuses it. If there's no
   * element matching `selector`, the method throws an error.
   * @param selector - A
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | selector }
   * of an element to focus. If there are multiple elements satisfying the
   * selector, the first will be focused.
   * @returns Promise which resolves when the element matching selector is
   * successfully focused. The promise will be rejected if there is no element
   * matching selector.
   * @remarks
   * Shortcut for {@link Frame.focus | page.mainFrame().focus(selector)}.
   */
  focus(selector) {
    return this.mainFrame().focus(selector);
  }
  /**
   * This method fetches an element with `selector`, scrolls it into view if
   * needed, and then uses {@link Page | Page.mouse}
   * to hover over the center of the element.
   * If there's no element matching `selector`, the method throws an error.
   * @param selector - A
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | selector}
   * to search for element to hover. If there are multiple elements satisfying
   * the selector, the first will be hovered.
   * @returns Promise which resolves when the element matching `selector` is
   * successfully hovered. Promise gets rejected if there's no element matching
   * `selector`.
   * @remarks
   * Shortcut for {@link Page.hover | page.mainFrame().hover(selector)}.
   */
  hover(selector) {
    return this.mainFrame().hover(selector);
  }
  /**
   * Triggers a `change` and `input` event once all the provided options have been
   * selected. If there's no `<select>` element matching `selector`, the method
   * throws an error.
   *
   * @example
   *
   * ```ts
   * page.select('select#colors', 'blue'); // single selection
   * page.select('select#colors', 'red', 'green', 'blue'); // multiple selections
   * ```
   *
   * @param selector - A
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | Selector}
   * to query the page for
   * @param values - Values of options to select. If the `<select>` has the
   * `multiple` attribute, all values are considered, otherwise only the first one
   * is taken into account.
   * @returns
   *
   * @remarks
   * Shortcut for {@link Frame.select | page.mainFrame().select()}
   */
  select(selector, ...values) {
    return this.mainFrame().select(selector, ...values);
  }
  /**
   * This method fetches an element with `selector`, scrolls it into view if
   * needed, and then uses {@link Page | Page.touchscreen}
   * to tap in the center of the element.
   * If there's no element matching `selector`, the method throws an error.
   * @param selector - A
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | Selector}
   * to search for element to tap. If there are multiple elements satisfying the
   * selector, the first will be tapped.
   * @returns
   * @remarks
   * Shortcut for {@link Frame.tap | page.mainFrame().tap(selector)}.
   */
  tap(selector) {
    return this.mainFrame().tap(selector);
  }
  /**
   * Sends a `keydown`, `keypress/input`, and `keyup` event for each character
   * in the text.
   *
   * To press a special key, like `Control` or `ArrowDown`, use {@link Keyboard.press}.
   * @example
   *
   * ```ts
   * await page.type('#mytextarea', 'Hello');
   * // Types instantly
   * await page.type('#mytextarea', 'World', {delay: 100});
   * // Types slower, like a user
   * ```
   *
   * @param selector - A
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | selector}
   * of an element to type into. If there are multiple elements satisfying the
   * selector, the first will be used.
   * @param text - A text to type into a focused element.
   * @param options - have property `delay` which is the Time to wait between
   * key presses in milliseconds. Defaults to `0`.
   * @returns
   * @remarks
   */
  type(selector, text, options) {
    return this.mainFrame().type(selector, text, options);
  }
  /**
   * @deprecated Replace with `new Promise(r => setTimeout(r, milliseconds));`.
   *
   * Causes your script to wait for the given number of milliseconds.
   *
   * @remarks
   * It's generally recommended to not wait for a number of seconds, but instead
   * use {@link Frame.waitForSelector}, {@link Frame.waitForXPath} or
   * {@link Frame.waitForFunction} to wait for exactly the conditions you want.
   *
   * @example
   *
   * Wait for 1 second:
   *
   * ```ts
   * await page.waitForTimeout(1000);
   * ```
   *
   * @param milliseconds - the number of milliseconds to wait.
   */
  waitForTimeout(milliseconds) {
    return this.mainFrame().waitForTimeout(milliseconds);
  }
  /**
   * Wait for the `selector` to appear in page. If at the moment of calling the
   * method the `selector` already exists, the method will return immediately. If
   * the `selector` doesn't appear after the `timeout` milliseconds of waiting, the
   * function will throw.
   *
   * @example
   * This method works across navigations:
   *
   * ```ts
   * import puppeteer from 'puppeteer';
   * (async () => {
   *   const browser = await puppeteer.launch();
   *   const page = await browser.newPage();
   *   let currentURL;
   *   page
   *     .waitForSelector('img')
   *     .then(() => console.log('First URL with image: ' + currentURL));
   *   for (currentURL of [
   *     'https://example.com',
   *     'https://google.com',
   *     'https://bbc.com',
   *   ]) {
   *     await page.goto(currentURL);
   *   }
   *   await browser.close();
   * })();
   * ```
   *
   * @param selector - A
   * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors | selector}
   * of an element to wait for
   * @param options - Optional waiting parameters
   * @returns Promise which resolves when element specified by selector string
   * is added to DOM. Resolves to `null` if waiting for hidden: `true` and
   * selector is not found in DOM.
   * @remarks
   * The optional Parameter in Arguments `options` are:
   *
   * - `visible`: A boolean wait for element to be present in DOM and to be
   *   visible, i.e. to not have `display: none` or `visibility: hidden` CSS
   *   properties. Defaults to `false`.
   *
   * - `hidden`: Wait for element to not be found in the DOM or to be hidden,
   *   i.e. have `display: none` or `visibility: hidden` CSS properties. Defaults to
   *   `false`.
   *
   * - `timeout`: maximum time to wait for in milliseconds. Defaults to `30000`
   *   (30 seconds). Pass `0` to disable timeout. The default value can be changed
   *   by using the {@link Page.setDefaultTimeout} method.
   */
  async waitForSelector(selector, options = {}) {
    return await this.mainFrame().waitForSelector(selector, options);
  }
  /**
   * Wait for the `xpath` to appear in page. If at the moment of calling the
   * method the `xpath` already exists, the method will return immediately. If
   * the `xpath` doesn't appear after the `timeout` milliseconds of waiting, the
   * function will throw.
   *
   * @example
   * This method works across navigation
   *
   * ```ts
   * import puppeteer from 'puppeteer';
   * (async () => {
   *   const browser = await puppeteer.launch();
   *   const page = await browser.newPage();
   *   let currentURL;
   *   page
   *     .waitForXPath('//img')
   *     .then(() => console.log('First URL with image: ' + currentURL));
   *   for (currentURL of [
   *     'https://example.com',
   *     'https://google.com',
   *     'https://bbc.com',
   *   ]) {
   *     await page.goto(currentURL);
   *   }
   *   await browser.close();
   * })();
   * ```
   *
   * @param xpath - A
   * {@link https://developer.mozilla.org/en-US/docs/Web/XPath | xpath} of an
   * element to wait for
   * @param options - Optional waiting parameters
   * @returns Promise which resolves when element specified by xpath string is
   * added to DOM. Resolves to `null` if waiting for `hidden: true` and xpath is
   * not found in DOM, otherwise resolves to `ElementHandle`.
   * @remarks
   * The optional Argument `options` have properties:
   *
   * - `visible`: A boolean to wait for element to be present in DOM and to be
   *   visible, i.e. to not have `display: none` or `visibility: hidden` CSS
   *   properties. Defaults to `false`.
   *
   * - `hidden`: A boolean wait for element to not be found in the DOM or to be
   *   hidden, i.e. have `display: none` or `visibility: hidden` CSS properties.
   *   Defaults to `false`.
   *
   * - `timeout`: A number which is maximum time to wait for in milliseconds.
   *   Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default
   *   value can be changed by using the {@link Page.setDefaultTimeout} method.
   */
  waitForXPath(xpath, options) {
    return this.mainFrame().waitForXPath(xpath, options);
  }
  /**
   * Waits for a function to finish evaluating in the page's context.
   *
   * @example
   * The {@link Page.waitForFunction} can be used to observe viewport size change:
   *
   * ```ts
   * import puppeteer from 'puppeteer';
   * (async () => {
   *   const browser = await puppeteer.launch();
   *   const page = await browser.newPage();
   *   const watchDog = page.waitForFunction('window.innerWidth < 100');
   *   await page.setViewport({width: 50, height: 50});
   *   await watchDog;
   *   await browser.close();
   * })();
   * ```
   *
   * @example
   * To pass arguments from node.js to the predicate of
   * {@link Page.waitForFunction} function:
   *
   * ```ts
   * const selector = '.foo';
   * await page.waitForFunction(
   *   selector => !!document.querySelector(selector),
   *   {},
   *   selector
   * );
   * ```
   *
   * @example
   * The predicate of {@link Page.waitForFunction} can be asynchronous too:
   *
   * ```ts
   * const username = 'github-username';
   * await page.waitForFunction(
   *   async username => {
   *     const githubResponse = await fetch(
   *       `https://api.github.com/users/${username}`
   *     );
   *     const githubUser = await githubResponse.json();
   *     // show the avatar
   *     const img = document.createElement('img');
   *     img.src = githubUser.avatar_url;
   *     // wait 3 seconds
   *     await new Promise((resolve, reject) => setTimeout(resolve, 3000));
   *     img.remove();
   *   },
   *   {},
   *   username
   * );
   * ```
   *
   * @param pageFunction - Function to be evaluated in browser context
   * @param options - Options for configuring waiting behavior.
   */
  waitForFunction(pageFunction, options, ...args) {
    return this.mainFrame().waitForFunction(pageFunction, options, ...args);
  }
  waitForDevicePrompt() {
    throw new Error("Not implemented");
  }
};
__name(Page, "Page");
var unitToPixels = {
  px: 1,
  in: 96,
  cm: 37.8,
  mm: 3.78
};
function convertPrintParameterToInches(parameter, lengthUnit = "in") {
  if (typeof parameter === "undefined") {
    return void 0;
  }
  let pixels;
  if (isNumber(parameter)) {
    pixels = parameter;
  } else if (isString(parameter)) {
    const text = parameter;
    let unit = text.substring(text.length - 2).toLowerCase();
    let valueText = "";
    if (unit in unitToPixels) {
      valueText = text.substring(0, text.length - 2);
    } else {
      unit = "px";
      valueText = text;
    }
    const value = Number(valueText);
    assert(!isNaN(value), "Failed to parse parameter value: " + text);
    pixels = value * unitToPixels[unit];
  } else {
    throw new Error("page.pdf() Cannot handle parameter type: " + typeof parameter);
  }
  return pixels / unitToPixels[lengthUnit];
}
__name(convertPrintParameterToInches, "convertPrintParameterToInches");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Accessibility.js
init_checked_fetch();
init_modules_watch_stub();
var Accessibility = class {
  #client;
  /**
   * @internal
   */
  constructor(client) {
    this.#client = client;
  }
  /**
   * Captures the current state of the accessibility tree.
   * The returned object represents the root accessible node of the page.
   *
   * @remarks
   *
   * **NOTE** The Chrome accessibility tree contains nodes that go unused on
   * most platforms and by most screen readers. Puppeteer will discard them as
   * well for an easier to process tree, unless `interestingOnly` is set to
   * `false`.
   *
   * @example
   * An example of dumping the entire accessibility tree:
   *
   * ```ts
   * const snapshot = await page.accessibility.snapshot();
   * console.log(snapshot);
   * ```
   *
   * @example
   * An example of logging the focused node's name:
   *
   * ```ts
   * const snapshot = await page.accessibility.snapshot();
   * const node = findFocusedNode(snapshot);
   * console.log(node && node.name);
   *
   * function findFocusedNode(node) {
   *   if (node.focused) return node;
   *   for (const child of node.children || []) {
   *     const foundNode = findFocusedNode(child);
   *     return foundNode;
   *   }
   *   return null;
   * }
   * ```
   *
   * @returns An AXNode object representing the snapshot.
   */
  async snapshot(options = {}) {
    const { interestingOnly = true, root = null } = options;
    const { nodes } = await this.#client.send("Accessibility.getFullAXTree");
    let backendNodeId;
    if (root) {
      const { node } = await this.#client.send("DOM.describeNode", {
        objectId: root.id
      });
      backendNodeId = node.backendNodeId;
    }
    const defaultRoot = AXNode.createTree(nodes);
    let needle = defaultRoot;
    if (backendNodeId) {
      needle = defaultRoot.find((node) => {
        return node.payload.backendDOMNodeId === backendNodeId;
      });
      if (!needle) {
        return null;
      }
    }
    if (!interestingOnly) {
      return this.serializeTree(needle)[0] ?? null;
    }
    const interestingNodes = /* @__PURE__ */ new Set();
    this.collectInterestingNodes(interestingNodes, defaultRoot, false);
    if (!interestingNodes.has(needle)) {
      return null;
    }
    return this.serializeTree(needle, interestingNodes)[0] ?? null;
  }
  serializeTree(node, interestingNodes) {
    const children = [];
    for (const child of node.children) {
      children.push(...this.serializeTree(child, interestingNodes));
    }
    if (interestingNodes && !interestingNodes.has(node)) {
      return children;
    }
    const serializedNode = node.serialize();
    if (children.length) {
      serializedNode.children = children;
    }
    return [serializedNode];
  }
  collectInterestingNodes(collection, node, insideControl) {
    if (node.isInteresting(insideControl)) {
      collection.add(node);
    }
    if (node.isLeafNode()) {
      return;
    }
    insideControl = insideControl || node.isControl();
    for (const child of node.children) {
      this.collectInterestingNodes(collection, child, insideControl);
    }
  }
};
__name(Accessibility, "Accessibility");
var AXNode = class {
  payload;
  children = [];
  #richlyEditable = false;
  #editable = false;
  #focusable = false;
  #hidden = false;
  #name;
  #role;
  #ignored;
  #cachedHasFocusableChild;
  constructor(payload) {
    this.payload = payload;
    this.#name = this.payload.name ? this.payload.name.value : "";
    this.#role = this.payload.role ? this.payload.role.value : "Unknown";
    this.#ignored = this.payload.ignored;
    for (const property of this.payload.properties || []) {
      if (property.name === "editable") {
        this.#richlyEditable = property.value.value === "richtext";
        this.#editable = true;
      }
      if (property.name === "focusable") {
        this.#focusable = property.value.value;
      }
      if (property.name === "hidden") {
        this.#hidden = property.value.value;
      }
    }
  }
  #isPlainTextField() {
    if (this.#richlyEditable) {
      return false;
    }
    if (this.#editable) {
      return true;
    }
    return this.#role === "textbox" || this.#role === "searchbox";
  }
  #isTextOnlyObject() {
    const role = this.#role;
    return role === "LineBreak" || role === "text" || role === "InlineTextBox";
  }
  #hasFocusableChild() {
    if (this.#cachedHasFocusableChild === void 0) {
      this.#cachedHasFocusableChild = false;
      for (const child of this.children) {
        if (child.#focusable || child.#hasFocusableChild()) {
          this.#cachedHasFocusableChild = true;
          break;
        }
      }
    }
    return this.#cachedHasFocusableChild;
  }
  find(predicate) {
    if (predicate(this)) {
      return this;
    }
    for (const child of this.children) {
      const result = child.find(predicate);
      if (result) {
        return result;
      }
    }
    return null;
  }
  isLeafNode() {
    if (!this.children.length) {
      return true;
    }
    if (this.#isPlainTextField() || this.#isTextOnlyObject()) {
      return true;
    }
    switch (this.#role) {
      case "doc-cover":
      case "graphics-symbol":
      case "img":
      case "Meter":
      case "scrollbar":
      case "slider":
      case "separator":
      case "progressbar":
        return true;
      default:
        break;
    }
    if (this.#hasFocusableChild()) {
      return false;
    }
    if (this.#focusable && this.#name) {
      return true;
    }
    if (this.#role === "heading" && this.#name) {
      return true;
    }
    return false;
  }
  isControl() {
    switch (this.#role) {
      case "button":
      case "checkbox":
      case "ColorWell":
      case "combobox":
      case "DisclosureTriangle":
      case "listbox":
      case "menu":
      case "menubar":
      case "menuitem":
      case "menuitemcheckbox":
      case "menuitemradio":
      case "radio":
      case "scrollbar":
      case "searchbox":
      case "slider":
      case "spinbutton":
      case "switch":
      case "tab":
      case "textbox":
      case "tree":
      case "treeitem":
        return true;
      default:
        return false;
    }
  }
  isInteresting(insideControl) {
    const role = this.#role;
    if (role === "Ignored" || this.#hidden || this.#ignored) {
      return false;
    }
    if (this.#focusable || this.#richlyEditable) {
      return true;
    }
    if (this.isControl()) {
      return true;
    }
    if (insideControl) {
      return false;
    }
    return this.isLeafNode() && !!this.#name;
  }
  serialize() {
    const properties = /* @__PURE__ */ new Map();
    for (const property of this.payload.properties || []) {
      properties.set(property.name.toLowerCase(), property.value.value);
    }
    if (this.payload.name) {
      properties.set("name", this.payload.name.value);
    }
    if (this.payload.value) {
      properties.set("value", this.payload.value.value);
    }
    if (this.payload.description) {
      properties.set("description", this.payload.description.value);
    }
    const node = {
      role: this.#role
    };
    const userStringProperties = [
      "name",
      "value",
      "description",
      "keyshortcuts",
      "roledescription",
      "valuetext"
    ];
    const getUserStringPropertyValue = /* @__PURE__ */ __name((key) => {
      return properties.get(key);
    }, "getUserStringPropertyValue");
    for (const userStringProperty of userStringProperties) {
      if (!properties.has(userStringProperty)) {
        continue;
      }
      node[userStringProperty] = getUserStringPropertyValue(userStringProperty);
    }
    const booleanProperties = [
      "disabled",
      "expanded",
      "focused",
      "modal",
      "multiline",
      "multiselectable",
      "readonly",
      "required",
      "selected"
    ];
    const getBooleanPropertyValue = /* @__PURE__ */ __name((key) => {
      return properties.get(key);
    }, "getBooleanPropertyValue");
    for (const booleanProperty of booleanProperties) {
      if (booleanProperty === "focused" && this.#role === "RootWebArea") {
        continue;
      }
      const value = getBooleanPropertyValue(booleanProperty);
      if (!value) {
        continue;
      }
      node[booleanProperty] = getBooleanPropertyValue(booleanProperty);
    }
    const tristateProperties = ["checked", "pressed"];
    for (const tristateProperty of tristateProperties) {
      if (!properties.has(tristateProperty)) {
        continue;
      }
      const value = properties.get(tristateProperty);
      node[tristateProperty] = value === "mixed" ? "mixed" : value === "true" ? true : false;
    }
    const numericalProperties = [
      "level",
      "valuemax",
      "valuemin"
    ];
    const getNumericalPropertyValue = /* @__PURE__ */ __name((key) => {
      return properties.get(key);
    }, "getNumericalPropertyValue");
    for (const numericalProperty of numericalProperties) {
      if (!properties.has(numericalProperty)) {
        continue;
      }
      node[numericalProperty] = getNumericalPropertyValue(numericalProperty);
    }
    const tokenProperties = [
      "autocomplete",
      "haspopup",
      "invalid",
      "orientation"
    ];
    const getTokenPropertyValue = /* @__PURE__ */ __name((key) => {
      return properties.get(key);
    }, "getTokenPropertyValue");
    for (const tokenProperty of tokenProperties) {
      const value = getTokenPropertyValue(tokenProperty);
      if (!value || value === "false") {
        continue;
      }
      node[tokenProperty] = getTokenPropertyValue(tokenProperty);
    }
    return node;
  }
  static createTree(payloads) {
    const nodeById = /* @__PURE__ */ new Map();
    for (const payload of payloads) {
      nodeById.set(payload.nodeId, new AXNode(payload));
    }
    for (const node of nodeById.values()) {
      for (const childId of node.payload.childIds || []) {
        const child = nodeById.get(childId);
        if (child) {
          node.children.push(child);
        }
      }
    }
    return nodeById.values().next().value;
  }
};
__name(AXNode, "AXNode");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Binding.js
init_checked_fetch();
init_modules_watch_stub();
var Binding = class {
  #name;
  #fn;
  constructor(name, fn2) {
    this.#name = name;
    this.#fn = fn2;
  }
  get name() {
    return this.#name;
  }
  /**
   * @param context - Context to run the binding in; the context should have
   * the binding added to it beforehand.
   * @param id - ID of the call. This should come from the CDP
   * `onBindingCalled` response.
   * @param args - Plain arguments from CDP.
   */
  async run(context, id, args, isTrivial) {
    const garbage = [];
    try {
      if (!isTrivial) {
        const handles = await context.evaluateHandle((name, seq) => {
          return globalThis[name].args.get(seq);
        }, this.#name, id);
        try {
          const properties = await handles.getProperties();
          for (const [index, handle] of properties) {
            if (index in args) {
              switch (handle.remoteObject().subtype) {
                case "node":
                  args[+index] = handle;
                  break;
                default:
                  garbage.push(handle.dispose());
              }
            } else {
              garbage.push(handle.dispose());
            }
          }
        } finally {
          await handles.dispose();
        }
      }
      await context.evaluate((name, seq, result) => {
        const callbacks = globalThis[name].callbacks;
        callbacks.get(seq).resolve(result);
        callbacks.delete(seq);
      }, this.#name, id, await this.#fn(...args));
      for (const arg of args) {
        if (arg instanceof JSHandle) {
          garbage.push(arg.dispose());
        }
      }
    } catch (error) {
      if (isErrorLike(error)) {
        await context.evaluate((name, seq, message, stack) => {
          const error2 = new Error(message);
          error2.stack = stack;
          const callbacks = globalThis[name].callbacks;
          callbacks.get(seq).reject(error2);
          callbacks.delete(seq);
        }, this.#name, id, error.message, error.stack).catch(debugError);
      } else {
        await context.evaluate((name, seq, error2) => {
          const callbacks = globalThis[name].callbacks;
          callbacks.get(seq).reject(error2);
          callbacks.delete(seq);
        }, this.#name, id, error).catch(debugError);
      }
    } finally {
      await Promise.all(garbage);
    }
  }
};
__name(Binding, "Binding");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/ConsoleMessage.js
init_checked_fetch();
init_modules_watch_stub();
var ConsoleMessage = class {
  #type;
  #text;
  #args;
  #stackTraceLocations;
  /**
   * @public
   */
  constructor(type, text, args, stackTraceLocations) {
    this.#type = type;
    this.#text = text;
    this.#args = args;
    this.#stackTraceLocations = stackTraceLocations;
  }
  /**
   * The type of the console message.
   */
  type() {
    return this.#type;
  }
  /**
   * The text of the console message.
   */
  text() {
    return this.#text;
  }
  /**
   * An array of arguments passed to the console.
   */
  args() {
    return this.#args;
  }
  /**
   * The location of the console message.
   */
  location() {
    return this.#stackTraceLocations[0] ?? {};
  }
  /**
   * The array of locations on the stack of the console message.
   */
  stackTrace() {
    return this.#stackTraceLocations;
  }
};
__name(ConsoleMessage, "ConsoleMessage");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Coverage.js
init_checked_fetch();
init_modules_watch_stub();
var Coverage = class {
  #jsCoverage;
  #cssCoverage;
  constructor(client) {
    this.#jsCoverage = new JSCoverage(client);
    this.#cssCoverage = new CSSCoverage(client);
  }
  /**
   * @param options - Set of configurable options for coverage defaults to
   * `resetOnNavigation : true, reportAnonymousScripts : false,`
   * `includeRawScriptCoverage : false, useBlockCoverage : true`
   * @returns Promise that resolves when coverage is started.
   *
   * @remarks
   * Anonymous scripts are ones that don't have an associated url. These are
   * scripts that are dynamically created on the page using `eval` or
   * `new Function`. If `reportAnonymousScripts` is set to `true`, anonymous
   * scripts URL will start with `debugger://VM` (unless a magic //# sourceURL
   * comment is present, in which case that will the be URL).
   */
  async startJSCoverage(options = {}) {
    return await this.#jsCoverage.start(options);
  }
  /**
   * Promise that resolves to the array of coverage reports for
   * all scripts.
   *
   * @remarks
   * JavaScript Coverage doesn't include anonymous scripts by default.
   * However, scripts with sourceURLs are reported.
   */
  async stopJSCoverage() {
    return await this.#jsCoverage.stop();
  }
  /**
   * @param options - Set of configurable options for coverage, defaults to
   * `resetOnNavigation : true`
   * @returns Promise that resolves when coverage is started.
   */
  async startCSSCoverage(options = {}) {
    return await this.#cssCoverage.start(options);
  }
  /**
   * Promise that resolves to the array of coverage reports
   * for all stylesheets.
   *
   * @remarks
   * CSS Coverage doesn't include dynamically injected style tags
   * without sourceURLs.
   */
  async stopCSSCoverage() {
    return await this.#cssCoverage.stop();
  }
};
__name(Coverage, "Coverage");
var JSCoverage = class {
  #client;
  #enabled = false;
  #scriptURLs = /* @__PURE__ */ new Map();
  #scriptSources = /* @__PURE__ */ new Map();
  #eventListeners = [];
  #resetOnNavigation = false;
  #reportAnonymousScripts = false;
  #includeRawScriptCoverage = false;
  constructor(client) {
    this.#client = client;
  }
  async start(options = {}) {
    assert(!this.#enabled, "JSCoverage is already enabled");
    const { resetOnNavigation = true, reportAnonymousScripts = false, includeRawScriptCoverage = false, useBlockCoverage = true } = options;
    this.#resetOnNavigation = resetOnNavigation;
    this.#reportAnonymousScripts = reportAnonymousScripts;
    this.#includeRawScriptCoverage = includeRawScriptCoverage;
    this.#enabled = true;
    this.#scriptURLs.clear();
    this.#scriptSources.clear();
    this.#eventListeners = [
      addEventListener2(this.#client, "Debugger.scriptParsed", this.#onScriptParsed.bind(this)),
      addEventListener2(this.#client, "Runtime.executionContextsCleared", this.#onExecutionContextsCleared.bind(this))
    ];
    await Promise.all([
      this.#client.send("Profiler.enable"),
      this.#client.send("Profiler.startPreciseCoverage", {
        callCount: this.#includeRawScriptCoverage,
        detailed: useBlockCoverage
      }),
      this.#client.send("Debugger.enable"),
      this.#client.send("Debugger.setSkipAllPauses", { skip: true })
    ]);
  }
  #onExecutionContextsCleared() {
    if (!this.#resetOnNavigation) {
      return;
    }
    this.#scriptURLs.clear();
    this.#scriptSources.clear();
  }
  async #onScriptParsed(event) {
    if (PuppeteerURL.isPuppeteerURL(event.url)) {
      return;
    }
    if (!event.url && !this.#reportAnonymousScripts) {
      return;
    }
    try {
      const response = await this.#client.send("Debugger.getScriptSource", {
        scriptId: event.scriptId
      });
      this.#scriptURLs.set(event.scriptId, event.url);
      this.#scriptSources.set(event.scriptId, response.scriptSource);
    } catch (error) {
      debugError(error);
    }
  }
  async stop() {
    assert(this.#enabled, "JSCoverage is not enabled");
    this.#enabled = false;
    const result = await Promise.all([
      this.#client.send("Profiler.takePreciseCoverage"),
      this.#client.send("Profiler.stopPreciseCoverage"),
      this.#client.send("Profiler.disable"),
      this.#client.send("Debugger.disable")
    ]);
    removeEventListeners(this.#eventListeners);
    const coverage = [];
    const profileResponse = result[0];
    for (const entry of profileResponse.result) {
      let url = this.#scriptURLs.get(entry.scriptId);
      if (!url && this.#reportAnonymousScripts) {
        url = "debugger://VM" + entry.scriptId;
      }
      const text = this.#scriptSources.get(entry.scriptId);
      if (text === void 0 || url === void 0) {
        continue;
      }
      const flattenRanges = [];
      for (const func of entry.functions) {
        flattenRanges.push(...func.ranges);
      }
      const ranges = convertToDisjointRanges(flattenRanges);
      if (!this.#includeRawScriptCoverage) {
        coverage.push({ url, ranges, text });
      } else {
        coverage.push({ url, ranges, text, rawScriptCoverage: entry });
      }
    }
    return coverage;
  }
};
__name(JSCoverage, "JSCoverage");
var CSSCoverage = class {
  #client;
  #enabled = false;
  #stylesheetURLs = /* @__PURE__ */ new Map();
  #stylesheetSources = /* @__PURE__ */ new Map();
  #eventListeners = [];
  #resetOnNavigation = false;
  constructor(client) {
    this.#client = client;
  }
  async start(options = {}) {
    assert(!this.#enabled, "CSSCoverage is already enabled");
    const { resetOnNavigation = true } = options;
    this.#resetOnNavigation = resetOnNavigation;
    this.#enabled = true;
    this.#stylesheetURLs.clear();
    this.#stylesheetSources.clear();
    this.#eventListeners = [
      addEventListener2(this.#client, "CSS.styleSheetAdded", this.#onStyleSheet.bind(this)),
      addEventListener2(this.#client, "Runtime.executionContextsCleared", this.#onExecutionContextsCleared.bind(this))
    ];
    await Promise.all([
      this.#client.send("DOM.enable"),
      this.#client.send("CSS.enable"),
      this.#client.send("CSS.startRuleUsageTracking")
    ]);
  }
  #onExecutionContextsCleared() {
    if (!this.#resetOnNavigation) {
      return;
    }
    this.#stylesheetURLs.clear();
    this.#stylesheetSources.clear();
  }
  async #onStyleSheet(event) {
    const header = event.header;
    if (!header.sourceURL) {
      return;
    }
    try {
      const response = await this.#client.send("CSS.getStyleSheetText", {
        styleSheetId: header.styleSheetId
      });
      this.#stylesheetURLs.set(header.styleSheetId, header.sourceURL);
      this.#stylesheetSources.set(header.styleSheetId, response.text);
    } catch (error) {
      debugError(error);
    }
  }
  async stop() {
    assert(this.#enabled, "CSSCoverage is not enabled");
    this.#enabled = false;
    const ruleTrackingResponse = await this.#client.send("CSS.stopRuleUsageTracking");
    await Promise.all([
      this.#client.send("CSS.disable"),
      this.#client.send("DOM.disable")
    ]);
    removeEventListeners(this.#eventListeners);
    const styleSheetIdToCoverage = /* @__PURE__ */ new Map();
    for (const entry of ruleTrackingResponse.ruleUsage) {
      let ranges = styleSheetIdToCoverage.get(entry.styleSheetId);
      if (!ranges) {
        ranges = [];
        styleSheetIdToCoverage.set(entry.styleSheetId, ranges);
      }
      ranges.push({
        startOffset: entry.startOffset,
        endOffset: entry.endOffset,
        count: entry.used ? 1 : 0
      });
    }
    const coverage = [];
    for (const styleSheetId of this.#stylesheetURLs.keys()) {
      const url = this.#stylesheetURLs.get(styleSheetId);
      assert(typeof url !== "undefined", `Stylesheet URL is undefined (styleSheetId=${styleSheetId})`);
      const text = this.#stylesheetSources.get(styleSheetId);
      assert(typeof text !== "undefined", `Stylesheet text is undefined (styleSheetId=${styleSheetId})`);
      const ranges = convertToDisjointRanges(styleSheetIdToCoverage.get(styleSheetId) || []);
      coverage.push({ url, ranges, text });
    }
    return coverage;
  }
};
__name(CSSCoverage, "CSSCoverage");
function convertToDisjointRanges(nestedRanges) {
  const points = [];
  for (const range of nestedRanges) {
    points.push({ offset: range.startOffset, type: 0, range });
    points.push({ offset: range.endOffset, type: 1, range });
  }
  points.sort((a2, b3) => {
    if (a2.offset !== b3.offset) {
      return a2.offset - b3.offset;
    }
    if (a2.type !== b3.type) {
      return b3.type - a2.type;
    }
    const aLength = a2.range.endOffset - a2.range.startOffset;
    const bLength = b3.range.endOffset - b3.range.startOffset;
    if (a2.type === 0) {
      return bLength - aLength;
    }
    return aLength - bLength;
  });
  const hitCountStack = [];
  const results = [];
  let lastOffset = 0;
  for (const point of points) {
    if (hitCountStack.length && lastOffset < point.offset && hitCountStack[hitCountStack.length - 1] > 0) {
      const lastResult = results[results.length - 1];
      if (lastResult && lastResult.end === lastOffset) {
        lastResult.end = point.offset;
      } else {
        results.push({ start: lastOffset, end: point.offset });
      }
    }
    lastOffset = point.offset;
    if (point.type === 0) {
      hitCountStack.push(point.range.count);
    } else {
      hitCountStack.pop();
    }
  }
  return results.filter((range) => {
    return range.end - range.start > 0;
  });
}
__name(convertToDisjointRanges, "convertToDisjointRanges");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Dialog.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/api/Dialog.js
init_checked_fetch();
init_modules_watch_stub();
var Dialog = class {
  #type;
  #message;
  #defaultValue;
  #handled = false;
  /**
   * @internal
   */
  constructor(type, message, defaultValue = "") {
    this.#type = type;
    this.#message = message;
    this.#defaultValue = defaultValue;
  }
  /**
   * The type of the dialog.
   */
  type() {
    return this.#type;
  }
  /**
   * The message displayed in the dialog.
   */
  message() {
    return this.#message;
  }
  /**
   * The default value of the prompt, or an empty string if the dialog
   * is not a `prompt`.
   */
  defaultValue() {
    return this.#defaultValue;
  }
  /**
   * @internal
   */
  sendCommand(_options) {
    throw new Error("Not implemented");
  }
  /**
   * A promise that resolves when the dialog has been accepted.
   *
   * @param promptText - optional text that will be entered in the dialog
   * prompt. Has no effect if the dialog's type is not `prompt`.
   *
   */
  async accept(promptText) {
    assert(!this.#handled, "Cannot accept dialog which is already handled!");
    this.#handled = true;
    await this.sendCommand({
      accept: true,
      text: promptText
    });
  }
  /**
   * A promise which will resolve once the dialog has been dismissed
   */
  async dismiss() {
    assert(!this.#handled, "Cannot dismiss dialog which is already handled!");
    this.#handled = true;
    await this.sendCommand({
      accept: false
    });
  }
};
__name(Dialog, "Dialog");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Dialog.js
var CDPDialog = class extends Dialog {
  #client;
  /**
   * @internal
   */
  constructor(client, type, message, defaultValue = "") {
    super(type, message, defaultValue);
    this.#client = client;
  }
  /**
   * @internal
   */
  async sendCommand(options) {
    await this.#client.send("Page.handleJavaScriptDialog", {
      accept: options.accept,
      promptText: options.text
    });
  }
};
__name(CDPDialog, "CDPDialog");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/EmulationManager.js
init_checked_fetch();
init_modules_watch_stub();
var EmulationManager = class {
  #client;
  #emulatingMobile = false;
  #hasTouch = false;
  #javascriptEnabled = true;
  constructor(client) {
    this.#client = client;
  }
  get javascriptEnabled() {
    return this.#javascriptEnabled;
  }
  async emulateViewport(viewport) {
    const mobile = viewport.isMobile || false;
    const width = viewport.width;
    const height = viewport.height;
    const deviceScaleFactor = viewport.deviceScaleFactor ?? 1;
    const screenOrientation = viewport.isLandscape ? { angle: 90, type: "landscapePrimary" } : { angle: 0, type: "portraitPrimary" };
    const hasTouch = viewport.hasTouch || false;
    await Promise.all([
      this.#client.send("Emulation.setDeviceMetricsOverride", {
        mobile,
        width,
        height,
        deviceScaleFactor,
        screenOrientation
      }),
      this.#client.send("Emulation.setTouchEmulationEnabled", {
        enabled: hasTouch
      })
    ]);
    const reloadNeeded = this.#emulatingMobile !== mobile || this.#hasTouch !== hasTouch;
    this.#emulatingMobile = mobile;
    this.#hasTouch = hasTouch;
    return reloadNeeded;
  }
  async emulateIdleState(overrides) {
    if (overrides) {
      await this.#client.send("Emulation.setIdleOverride", {
        isUserActive: overrides.isUserActive,
        isScreenUnlocked: overrides.isScreenUnlocked
      });
    } else {
      await this.#client.send("Emulation.clearIdleOverride");
    }
  }
  async emulateTimezone(timezoneId) {
    try {
      await this.#client.send("Emulation.setTimezoneOverride", {
        timezoneId: timezoneId || ""
      });
    } catch (error) {
      if (isErrorLike(error) && error.message.includes("Invalid timezone")) {
        throw new Error(`Invalid timezone ID: ${timezoneId}`);
      }
      throw error;
    }
  }
  async emulateVisionDeficiency(type) {
    const visionDeficiencies = /* @__PURE__ */ new Set([
      "none",
      "achromatopsia",
      "blurredVision",
      "deuteranopia",
      "protanopia",
      "tritanopia"
    ]);
    try {
      assert(!type || visionDeficiencies.has(type), `Unsupported vision deficiency: ${type}`);
      await this.#client.send("Emulation.setEmulatedVisionDeficiency", {
        type: type || "none"
      });
    } catch (error) {
      throw error;
    }
  }
  async emulateCPUThrottling(factor) {
    assert(factor === null || factor >= 1, "Throttling rate should be greater or equal to 1");
    await this.#client.send("Emulation.setCPUThrottlingRate", {
      rate: factor ?? 1
    });
  }
  async emulateMediaFeatures(features) {
    if (!features) {
      await this.#client.send("Emulation.setEmulatedMedia", {});
    }
    if (Array.isArray(features)) {
      for (const mediaFeature of features) {
        const name = mediaFeature.name;
        assert(/^(?:prefers-(?:color-scheme|reduced-motion)|color-gamut)$/.test(name), "Unsupported media feature: " + name);
      }
      await this.#client.send("Emulation.setEmulatedMedia", {
        features
      });
    }
  }
  async emulateMediaType(type) {
    assert(type === "screen" || type === "print" || (type ?? void 0) === void 0, "Unsupported media type: " + type);
    await this.#client.send("Emulation.setEmulatedMedia", {
      media: type || ""
    });
  }
  async setGeolocation(options) {
    const { longitude, latitude, accuracy = 0 } = options;
    if (longitude < -180 || longitude > 180) {
      throw new Error(`Invalid longitude "${longitude}": precondition -180 <= LONGITUDE <= 180 failed.`);
    }
    if (latitude < -90 || latitude > 90) {
      throw new Error(`Invalid latitude "${latitude}": precondition -90 <= LATITUDE <= 90 failed.`);
    }
    if (accuracy < 0) {
      throw new Error(`Invalid accuracy "${accuracy}": precondition 0 <= ACCURACY failed.`);
    }
    await this.#client.send("Emulation.setGeolocationOverride", {
      longitude,
      latitude,
      accuracy
    });
  }
  /**
   * Resets default white background
   */
  async resetDefaultBackgroundColor() {
    await this.#client.send("Emulation.setDefaultBackgroundColorOverride");
  }
  /**
   * Hides default white background
   */
  async setTransparentBackgroundColor() {
    await this.#client.send("Emulation.setDefaultBackgroundColorOverride", {
      color: { r: 0, g: 0, b: 0, a: 0 }
    });
  }
  async setJavaScriptEnabled(enabled) {
    if (this.#javascriptEnabled === enabled) {
      return;
    }
    this.#javascriptEnabled = enabled;
    await this.#client.send("Emulation.setScriptExecutionDisabled", {
      value: !enabled
    });
  }
};
__name(EmulationManager, "EmulationManager");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/FileChooser.js
init_checked_fetch();
init_modules_watch_stub();
var FileChooser = class {
  #element;
  #multiple;
  #handled = false;
  /**
   * @internal
   */
  constructor(element, event) {
    this.#element = element;
    this.#multiple = event.mode !== "selectSingle";
  }
  /**
   * Whether file chooser allow for
   * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#attr-multiple | multiple}
   * file selection.
   */
  isMultiple() {
    return this.#multiple;
  }
  /**
   * Accept the file chooser request with the given file paths.
   *
   * @remarks This will not validate whether the file paths exists. Also, if a
   * path is relative, then it is resolved against the
   * {@link https://nodejs.org/api/process.html#process_process_cwd | current working directory}.
   * For locals script connecting to remote chrome environments, paths must be
   * absolute.
   */
  async accept(paths) {
    assert(!this.#handled, "Cannot accept FileChooser which is already handled!");
    this.#handled = true;
    await this.#element.uploadFile(...paths);
  }
  /**
   * Closes the file chooser without selecting any files.
   */
  cancel() {
    assert(!this.#handled, "Cannot cancel FileChooser which is already handled!");
    this.#handled = true;
  }
};
__name(FileChooser, "FileChooser");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/FrameManager.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/DeviceRequestPrompt.js
init_checked_fetch();
init_modules_watch_stub();
var DeviceRequestPromptDevice = class {
  /**
   * Device id during a prompt.
   */
  id;
  /**
   * Device name as it appears in a prompt.
   */
  name;
  /**
   * @internal
   */
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
};
__name(DeviceRequestPromptDevice, "DeviceRequestPromptDevice");
var DeviceRequestPrompt = class {
  #client;
  #timeoutSettings;
  #id;
  #handled = false;
  #updateDevicesHandle = this.#updateDevices.bind(this);
  #waitForDevicePromises = /* @__PURE__ */ new Set();
  /**
   * Current list of selectable devices.
   */
  devices = [];
  /**
   * @internal
   */
  constructor(client, timeoutSettings, firstEvent) {
    this.#client = client;
    this.#timeoutSettings = timeoutSettings;
    this.#id = firstEvent.id;
    this.#client.on("DeviceAccess.deviceRequestPrompted", this.#updateDevicesHandle);
    this.#client.on("Target.detachedFromTarget", () => {
      this.#client = null;
    });
    this.#updateDevices(firstEvent);
  }
  #updateDevices(event) {
    if (event.id !== this.#id) {
      return;
    }
    for (const rawDevice of event.devices) {
      if (this.devices.some((device) => {
        return device.id === rawDevice.id;
      })) {
        continue;
      }
      const newDevice = new DeviceRequestPromptDevice(rawDevice.id, rawDevice.name);
      this.devices.push(newDevice);
      for (const waitForDevicePromise of this.#waitForDevicePromises) {
        if (waitForDevicePromise.filter(newDevice)) {
          waitForDevicePromise.promise.resolve(newDevice);
        }
      }
    }
  }
  /**
   * Resolve to the first device in the prompt matching a filter.
   */
  async waitForDevice(filter, options = {}) {
    for (const device of this.devices) {
      if (filter(device)) {
        return device;
      }
    }
    const { timeout = this.#timeoutSettings.timeout() } = options;
    const deferred = Deferred.create({
      message: `Waiting for \`DeviceRequestPromptDevice\` failed: ${timeout}ms exceeded`,
      timeout
    });
    const handle = { filter, promise: deferred };
    this.#waitForDevicePromises.add(handle);
    try {
      return await deferred.valueOrThrow();
    } finally {
      this.#waitForDevicePromises.delete(handle);
    }
  }
  /**
   * Select a device in the prompt's list.
   */
  async select(device) {
    assert(this.#client !== null, "Cannot select device through detached session!");
    assert(this.devices.includes(device), "Cannot select unknown device!");
    assert(!this.#handled, "Cannot select DeviceRequestPrompt which is already handled!");
    this.#client.off("DeviceAccess.deviceRequestPrompted", this.#updateDevicesHandle);
    this.#handled = true;
    return this.#client.send("DeviceAccess.selectPrompt", {
      id: this.#id,
      deviceId: device.id
    });
  }
  /**
   * Cancel the prompt.
   */
  async cancel() {
    assert(this.#client !== null, "Cannot cancel prompt through detached session!");
    assert(!this.#handled, "Cannot cancel DeviceRequestPrompt which is already handled!");
    this.#client.off("DeviceAccess.deviceRequestPrompted", this.#updateDevicesHandle);
    this.#handled = true;
    return this.#client.send("DeviceAccess.cancelPrompt", { id: this.#id });
  }
};
__name(DeviceRequestPrompt, "DeviceRequestPrompt");
var DeviceRequestPromptManager = class {
  #client;
  #timeoutSettings;
  #deviceRequestPrompDeferreds = /* @__PURE__ */ new Set();
  /**
   * @internal
   */
  constructor(client, timeoutSettings) {
    this.#client = client;
    this.#timeoutSettings = timeoutSettings;
    this.#client.on("DeviceAccess.deviceRequestPrompted", (event) => {
      this.#onDeviceRequestPrompted(event);
    });
    this.#client.on("Target.detachedFromTarget", () => {
      this.#client = null;
    });
  }
  /**
   * Wait for device prompt created by an action like calling WebBluetooth's
   * requestDevice.
   */
  async waitForDevicePrompt(options = {}) {
    assert(this.#client !== null, "Cannot wait for device prompt through detached session!");
    const needsEnable = this.#deviceRequestPrompDeferreds.size === 0;
    let enablePromise;
    if (needsEnable) {
      enablePromise = this.#client.send("DeviceAccess.enable");
    }
    const { timeout = this.#timeoutSettings.timeout() } = options;
    const deferred = Deferred.create({
      message: `Waiting for \`DeviceRequestPrompt\` failed: ${timeout}ms exceeded`,
      timeout
    });
    this.#deviceRequestPrompDeferreds.add(deferred);
    try {
      const [result] = await Promise.all([
        deferred.valueOrThrow(),
        enablePromise
      ]);
      return result;
    } finally {
      this.#deviceRequestPrompDeferreds.delete(deferred);
    }
  }
  /**
   * @internal
   */
  #onDeviceRequestPrompted(event) {
    if (!this.#deviceRequestPrompDeferreds.size) {
      return;
    }
    assert(this.#client !== null);
    const devicePrompt = new DeviceRequestPrompt(this.#client, this.#timeoutSettings, event);
    for (const promise of this.#deviceRequestPrompDeferreds) {
      promise.resolve(devicePrompt);
    }
    this.#deviceRequestPrompDeferreds.clear();
  }
};
__name(DeviceRequestPromptManager, "DeviceRequestPromptManager");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/ExecutionContext.js
init_checked_fetch();
init_modules_watch_stub();
var SOURCE_URL_REGEX = /^[\040\t]*\/\/[@#] sourceURL=\s*(\S*?)\s*$/m;
var getSourceUrlComment = /* @__PURE__ */ __name((url) => {
  return `//# sourceURL=${url}`;
}, "getSourceUrlComment");
var ExecutionContext = class {
  _client;
  _world;
  _contextId;
  _contextName;
  constructor(client, contextPayload, world) {
    this._client = client;
    this._world = world;
    this._contextId = contextPayload.id;
    if (contextPayload.name) {
      this._contextName = contextPayload.name;
    }
  }
  #bindingsInstalled = false;
  #puppeteerUtil;
  get puppeteerUtil() {
    let promise = Promise.resolve();
    if (!this.#bindingsInstalled) {
      promise = Promise.all([
        this.#installGlobalBinding(new Binding("__ariaQuerySelector", ARIAQueryHandler.queryOne)),
        this.#installGlobalBinding(new Binding("__ariaQuerySelectorAll", async (element, selector) => {
          const results = ARIAQueryHandler.queryAll(element, selector);
          return element.executionContext().evaluateHandle((...elements) => {
            return elements;
          }, ...await AsyncIterableUtil.collect(results));
        }))
      ]);
      this.#bindingsInstalled = true;
    }
    scriptInjector.inject((script) => {
      if (this.#puppeteerUtil) {
        void this.#puppeteerUtil.then((handle) => {
          void handle.dispose();
        });
      }
      this.#puppeteerUtil = promise.then(() => {
        return this.evaluateHandle(script);
      });
    }, !this.#puppeteerUtil);
    return this.#puppeteerUtil;
  }
  async #installGlobalBinding(binding) {
    try {
      if (this._world) {
        this._world._bindings.set(binding.name, binding);
        await this._world._addBindingToContext(this, binding.name);
      }
    } catch {
    }
  }
  /**
   * Evaluates the given function.
   *
   * @example
   *
   * ```ts
   * const executionContext = await page.mainFrame().executionContext();
   * const result = await executionContext.evaluate(() => Promise.resolve(8 * 7))* ;
   * console.log(result); // prints "56"
   * ```
   *
   * @example
   * A string can also be passed in instead of a function:
   *
   * ```ts
   * console.log(await executionContext.evaluate('1 + 2')); // prints "3"
   * ```
   *
   * @example
   * Handles can also be passed as `args`. They resolve to their referenced object:
   *
   * ```ts
   * const oneHandle = await executionContext.evaluateHandle(() => 1);
   * const twoHandle = await executionContext.evaluateHandle(() => 2);
   * const result = await executionContext.evaluate(
   *   (a, b) => a + b,
   *   oneHandle,
   *   twoHandle
   * );
   * await oneHandle.dispose();
   * await twoHandle.dispose();
   * console.log(result); // prints '3'.
   * ```
   *
   * @param pageFunction - The function to evaluate.
   * @param args - Additional arguments to pass into the function.
   * @returns The result of evaluating the function. If the result is an object,
   * a vanilla object containing the serializable properties of the result is
   * returned.
   */
  async evaluate(pageFunction, ...args) {
    return await this.#evaluate(true, pageFunction, ...args);
  }
  /**
   * Evaluates the given function.
   *
   * Unlike {@link ExecutionContext.evaluate | evaluate}, this method returns a
   * handle to the result of the function.
   *
   * This method may be better suited if the object cannot be serialized (e.g.
   * `Map`) and requires further manipulation.
   *
   * @example
   *
   * ```ts
   * const context = await page.mainFrame().executionContext();
   * const handle: JSHandle<typeof globalThis> = await context.evaluateHandle(
   *   () => Promise.resolve(self)
   * );
   * ```
   *
   * @example
   * A string can also be passed in instead of a function.
   *
   * ```ts
   * const handle: JSHandle<number> = await context.evaluateHandle('1 + 2');
   * ```
   *
   * @example
   * Handles can also be passed as `args`. They resolve to their referenced object:
   *
   * ```ts
   * const bodyHandle: ElementHandle<HTMLBodyElement> =
   *   await context.evaluateHandle(() => {
   *     return document.body;
   *   });
   * const stringHandle: JSHandle<string> = await context.evaluateHandle(
   *   body => body.innerHTML,
   *   body
   * );
   * console.log(await stringHandle.jsonValue()); // prints body's innerHTML
   * // Always dispose your garbage! :)
   * await bodyHandle.dispose();
   * await stringHandle.dispose();
   * ```
   *
   * @param pageFunction - The function to evaluate.
   * @param args - Additional arguments to pass into the function.
   * @returns A {@link JSHandle | handle} to the result of evaluating the
   * function. If the result is a `Node`, then this will return an
   * {@link ElementHandle | element handle}.
   */
  async evaluateHandle(pageFunction, ...args) {
    return this.#evaluate(false, pageFunction, ...args);
  }
  async #evaluate(returnByValue, pageFunction, ...args) {
    const sourceUrlComment = getSourceUrlComment(getSourcePuppeteerURLIfAvailable(pageFunction)?.toString() ?? PuppeteerURL.INTERNAL_URL);
    if (isString(pageFunction)) {
      const contextId = this._contextId;
      const expression = pageFunction;
      const expressionWithSourceUrl = SOURCE_URL_REGEX.test(expression) ? expression : `${expression}
${sourceUrlComment}
`;
      const { exceptionDetails: exceptionDetails2, result: remoteObject2 } = await this._client.send("Runtime.evaluate", {
        expression: expressionWithSourceUrl,
        contextId,
        returnByValue,
        awaitPromise: true,
        userGesture: true
      }).catch(rewriteError2);
      if (exceptionDetails2) {
        throw createEvaluationError(exceptionDetails2);
      }
      return returnByValue ? valueFromRemoteObject(remoteObject2) : createJSHandle(this, remoteObject2);
    }
    const functionDeclaration = stringifyFunction(pageFunction);
    const functionDeclarationWithSourceUrl = SOURCE_URL_REGEX.test(functionDeclaration) ? functionDeclaration : `${functionDeclaration}
${sourceUrlComment}
`;
    let callFunctionOnPromise;
    try {
      callFunctionOnPromise = this._client.send("Runtime.callFunctionOn", {
        functionDeclaration: functionDeclarationWithSourceUrl,
        executionContextId: this._contextId,
        arguments: await Promise.all(args.map(convertArgument.bind(this))),
        returnByValue,
        awaitPromise: true,
        userGesture: true
      });
    } catch (error) {
      if (error instanceof TypeError && error.message.startsWith("Converting circular structure to JSON")) {
        error.message += " Recursive objects are not allowed.";
      }
      throw error;
    }
    const { exceptionDetails, result: remoteObject } = await callFunctionOnPromise.catch(rewriteError2);
    if (exceptionDetails) {
      throw createEvaluationError(exceptionDetails);
    }
    return returnByValue ? valueFromRemoteObject(remoteObject) : createJSHandle(this, remoteObject);
    async function convertArgument(arg) {
      if (arg instanceof LazyArg) {
        arg = await arg.get(this);
      }
      if (typeof arg === "bigint") {
        return { unserializableValue: `${arg.toString()}n` };
      }
      if (Object.is(arg, -0)) {
        return { unserializableValue: "-0" };
      }
      if (Object.is(arg, Infinity)) {
        return { unserializableValue: "Infinity" };
      }
      if (Object.is(arg, -Infinity)) {
        return { unserializableValue: "-Infinity" };
      }
      if (Object.is(arg, NaN)) {
        return { unserializableValue: "NaN" };
      }
      const objectHandle = arg && (arg instanceof CDPJSHandle || arg instanceof CDPElementHandle) ? arg : null;
      if (objectHandle) {
        if (objectHandle.executionContext() !== this) {
          throw new Error("JSHandles can be evaluated only in the context they were created!");
        }
        if (objectHandle.disposed) {
          throw new Error("JSHandle is disposed!");
        }
        if (objectHandle.remoteObject().unserializableValue) {
          return {
            unserializableValue: objectHandle.remoteObject().unserializableValue
          };
        }
        if (!objectHandle.remoteObject().objectId) {
          return { value: objectHandle.remoteObject().value };
        }
        return { objectId: objectHandle.remoteObject().objectId };
      }
      return { value: arg };
    }
    __name(convertArgument, "convertArgument");
  }
};
__name(ExecutionContext, "ExecutionContext");
var rewriteError2 = /* @__PURE__ */ __name((error) => {
  if (error.message.includes("Object reference chain is too long")) {
    return { result: { type: "undefined" } };
  }
  if (error.message.includes("Object couldn't be returned by value")) {
    return { result: { type: "undefined" } };
  }
  if (error.message.endsWith("Cannot find context with specified id") || error.message.endsWith("Inspected target navigated or closed")) {
    throw new Error("Execution context was destroyed, most likely because of a navigation.");
  }
  throw error;
}, "rewriteError");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Frame.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/api/Frame.js
init_checked_fetch();
init_modules_watch_stub();
var Frame = class extends EventEmitter {
  /**
   * @internal
   */
  _id;
  /**
   * @internal
   */
  _parentId;
  /**
   * @internal
   */
  worlds;
  /**
   * @internal
   */
  _name;
  /**
   * @internal
   */
  _hasStartedLoading = false;
  /**
   * @internal
   */
  constructor() {
    super();
  }
  /**
   * The page associated with the frame.
   */
  page() {
    throw new Error("Not implemented");
  }
  /**
   * Is `true` if the frame is an out-of-process (OOP) frame. Otherwise,
   * `false`.
   */
  isOOPFrame() {
    throw new Error("Not implemented");
  }
  async goto() {
    throw new Error("Not implemented");
  }
  async waitForNavigation() {
    throw new Error("Not implemented");
  }
  /**
   * @internal
   */
  _client() {
    throw new Error("Not implemented");
  }
  /**
   * @internal
   */
  executionContext() {
    throw new Error("Not implemented");
  }
  /**
   * @internal
   */
  mainRealm() {
    throw new Error("Not implemented");
  }
  /**
   * @internal
   */
  isolatedRealm() {
    throw new Error("Not implemented");
  }
  async evaluateHandle() {
    throw new Error("Not implemented");
  }
  async evaluate() {
    throw new Error("Not implemented");
  }
  locator(selectorOrFunc) {
    if (typeof selectorOrFunc === "string") {
      return NodeLocator.create(this, selectorOrFunc);
    } else {
      return FunctionLocator.create(this, selectorOrFunc);
    }
  }
  async $() {
    throw new Error("Not implemented");
  }
  async $$() {
    throw new Error("Not implemented");
  }
  async $eval() {
    throw new Error("Not implemented");
  }
  async $$eval() {
    throw new Error("Not implemented");
  }
  async $x() {
    throw new Error("Not implemented");
  }
  /**
   * Waits for an element matching the given selector to appear in the frame.
   *
   * This method works across navigations.
   *
   * @example
   *
   * ```ts
   * import puppeteer from 'puppeteer';
   *
   * (async () => {
   *   const browser = await puppeteer.launch();
   *   const page = await browser.newPage();
   *   let currentURL;
   *   page
   *     .mainFrame()
   *     .waitForSelector('img')
   *     .then(() => console.log('First URL with image: ' + currentURL));
   *
   *   for (currentURL of [
   *     'https://example.com',
   *     'https://google.com',
   *     'https://bbc.com',
   *   ]) {
   *     await page.goto(currentURL);
   *   }
   *   await browser.close();
   * })();
   * ```
   *
   * @param selector - The selector to query and wait for.
   * @param options - Options for customizing waiting behavior.
   * @returns An element matching the given selector.
   * @throws Throws if an element matching the given selector doesn't appear.
   */
  async waitForSelector(selector, options = {}) {
    const { updatedSelector, QueryHandler: QueryHandler2 } = getQueryHandlerAndSelector(selector);
    return await QueryHandler2.waitFor(this, updatedSelector, options);
  }
  /**
   * @deprecated Use {@link Frame.waitForSelector} with the `xpath` prefix.
   *
   * Example: `await frame.waitForSelector('xpath/' + xpathExpression)`
   *
   * The method evaluates the XPath expression relative to the Frame.
   * If `xpath` starts with `//` instead of `.//`, the dot will be appended
   * automatically.
   *
   * Wait for the `xpath` to appear in page. If at the moment of calling the
   * method the `xpath` already exists, the method will return immediately. If
   * the xpath doesn't appear after the `timeout` milliseconds of waiting, the
   * function will throw.
   *
   * For a code example, see the example for {@link Frame.waitForSelector}. That
   * function behaves identically other than taking a CSS selector rather than
   * an XPath.
   *
   * @param xpath - the XPath expression to wait for.
   * @param options - options to configure the visibility of the element and how
   * long to wait before timing out.
   */
  async waitForXPath(xpath, options = {}) {
    if (xpath.startsWith("//")) {
      xpath = `.${xpath}`;
    }
    return this.waitForSelector(`xpath/${xpath}`, options);
  }
  /**
   * @example
   * The `waitForFunction` can be used to observe viewport size change:
   *
   * ```ts
   * import puppeteer from 'puppeteer';
   *
   * (async () => {
   * .  const browser = await puppeteer.launch();
   * .  const page = await browser.newPage();
   * .  const watchDog = page.mainFrame().waitForFunction('window.innerWidth < 100');
   * .  page.setViewport({width: 50, height: 50});
   * .  await watchDog;
   * .  await browser.close();
   * })();
   * ```
   *
   * To pass arguments from Node.js to the predicate of `page.waitForFunction` function:
   *
   * ```ts
   * const selector = '.foo';
   * await frame.waitForFunction(
   *   selector => !!document.querySelector(selector),
   *   {}, // empty options object
   *   selector
   * );
   * ```
   *
   * @param pageFunction - the function to evaluate in the frame context.
   * @param options - options to configure the polling method and timeout.
   * @param args - arguments to pass to the `pageFunction`.
   * @returns the promise which resolve when the `pageFunction` returns a truthy value.
   */
  waitForFunction(pageFunction, options = {}, ...args) {
    return this.mainRealm().waitForFunction(pageFunction, options, ...args);
  }
  /**
   * The full HTML contents of the frame, including the DOCTYPE.
   */
  async content() {
    throw new Error("Not implemented");
  }
  async setContent() {
    throw new Error("Not implemented");
  }
  /**
   * The frame's `name` attribute as specified in the tag.
   *
   * @remarks
   * If the name is empty, it returns the `id` attribute instead.
   *
   * @remarks
   * This value is calculated once when the frame is created, and will not
   * update if the attribute is changed later.
   */
  name() {
    return this._name || "";
  }
  /**
   * The frame's URL.
   */
  url() {
    throw new Error("Not implemented");
  }
  /**
   * The parent frame, if any. Detached and main frames return `null`.
   */
  parentFrame() {
    throw new Error("Not implemented");
  }
  /**
   * An array of child frames.
   */
  childFrames() {
    throw new Error("Not implemented");
  }
  /**
   * Is`true` if the frame has been detached. Otherwise, `false`.
   */
  isDetached() {
    throw new Error("Not implemented");
  }
  /**
   * Adds a `<script>` tag into the page with the desired url or content.
   *
   * @param options - Options for the script.
   * @returns An {@link ElementHandle | element handle} to the injected
   * `<script>` element.
   */
  async addScriptTag(options) {
    let { content = "", type } = options;
    const { path } = options;
    if (+!!options.url + +!!path + +!!content !== 1) {
      throw new Error("Exactly one of `url`, `path`, or `content` must be specified.");
    }
    if (path) {
      const fs2 = await importFSPromises();
      content = await fs2.readFile(path, "utf8");
      content += `//# sourceURL=${path.replace(/\n/g, "")}`;
    }
    type = type ?? "text/javascript";
    return this.mainRealm().transferHandle(await this.isolatedRealm().evaluateHandle(async ({ Deferred: Deferred2 }, { url, id, type: type2, content: content2 }) => {
      const deferred = Deferred2.create();
      const script = document.createElement("script");
      script.type = type2;
      script.text = content2;
      if (url) {
        script.src = url;
        script.addEventListener("load", () => {
          return deferred.resolve();
        }, { once: true });
        script.addEventListener("error", (event) => {
          deferred.reject(new Error(event.message ?? "Could not load script"));
        }, { once: true });
      } else {
        deferred.resolve();
      }
      if (id) {
        script.id = id;
      }
      document.head.appendChild(script);
      await deferred.valueOrThrow();
      return script;
    }, LazyArg.create((context) => {
      return context.puppeteerUtil;
    }), { ...options, type, content }));
  }
  async addStyleTag(options) {
    let { content = "" } = options;
    const { path } = options;
    if (+!!options.url + +!!path + +!!content !== 1) {
      throw new Error("Exactly one of `url`, `path`, or `content` must be specified.");
    }
    if (path) {
      const fs2 = await importFSPromises();
      content = await fs2.readFile(path, "utf8");
      content += "/*# sourceURL=" + path.replace(/\n/g, "") + "*/";
      options.content = content;
    }
    return this.mainRealm().transferHandle(await this.isolatedRealm().evaluateHandle(async ({ Deferred: Deferred2 }, { url, content: content2 }) => {
      const deferred = Deferred2.create();
      let element;
      if (!url) {
        element = document.createElement("style");
        element.appendChild(document.createTextNode(content2));
      } else {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = url;
        element = link;
      }
      element.addEventListener("load", () => {
        deferred.resolve();
      }, { once: true });
      element.addEventListener("error", (event) => {
        deferred.reject(new Error(event.message ?? "Could not load style"));
      }, { once: true });
      document.head.appendChild(element);
      await deferred.valueOrThrow();
      return element;
    }, LazyArg.create((context) => {
      return context.puppeteerUtil;
    }), options));
  }
  /**
   * Clicks the first element found that matches `selector`.
   *
   * @remarks
   * If `click()` triggers a navigation event and there's a separate
   * `page.waitForNavigation()` promise to be resolved, you may end up with a
   * race condition that yields unexpected results. The correct pattern for
   * click and wait for navigation is the following:
   *
   * ```ts
   * const [response] = await Promise.all([
   *   page.waitForNavigation(waitOptions),
   *   frame.click(selector, clickOptions),
   * ]);
   * ```
   *
   * @param selector - The selector to query for.
   */
  click(selector, options = {}) {
    return this.isolatedRealm().click(selector, options);
  }
  /**
   * Focuses the first element that matches the `selector`.
   *
   * @param selector - The selector to query for.
   * @throws Throws if there's no element matching `selector`.
   */
  async focus(selector) {
    return this.isolatedRealm().focus(selector);
  }
  /**
   * Hovers the pointer over the center of the first element that matches the
   * `selector`.
   *
   * @param selector - The selector to query for.
   * @throws Throws if there's no element matching `selector`.
   */
  hover(selector) {
    return this.isolatedRealm().hover(selector);
  }
  /**
   * Selects a set of value on the first `<select>` element that matches the
   * `selector`.
   *
   * @example
   *
   * ```ts
   * frame.select('select#colors', 'blue'); // single selection
   * frame.select('select#colors', 'red', 'green', 'blue'); // multiple selections
   * ```
   *
   * @param selector - The selector to query for.
   * @param values - The array of values to select. If the `<select>` has the
   * `multiple` attribute, all values are considered, otherwise only the first
   * one is taken into account.
   * @returns the list of values that were successfully selected.
   * @throws Throws if there's no `<select>` matching `selector`.
   */
  select(selector, ...values) {
    return this.isolatedRealm().select(selector, ...values);
  }
  /**
   * Taps the first element that matches the `selector`.
   *
   * @param selector - The selector to query for.
   * @throws Throws if there's no element matching `selector`.
   */
  tap(selector) {
    return this.isolatedRealm().tap(selector);
  }
  /**
   * Sends a `keydown`, `keypress`/`input`, and `keyup` event for each character
   * in the text.
   *
   * @remarks
   * To press a special key, like `Control` or `ArrowDown`, use
   * {@link Keyboard.press}.
   *
   * @example
   *
   * ```ts
   * await frame.type('#mytextarea', 'Hello'); // Types instantly
   * await frame.type('#mytextarea', 'World', {delay: 100}); // Types slower, like a user
   * ```
   *
   * @param selector - the selector for the element to type into. If there are
   * multiple the first will be used.
   * @param text - text to type into the element
   * @param options - takes one option, `delay`, which sets the time to wait
   * between key presses in milliseconds. Defaults to `0`.
   */
  type(selector, text, options) {
    return this.isolatedRealm().type(selector, text, options);
  }
  /**
   * @deprecated Replace with `new Promise(r => setTimeout(r, milliseconds));`.
   *
   * Causes your script to wait for the given number of milliseconds.
   *
   * @remarks
   * It's generally recommended to not wait for a number of seconds, but instead
   * use {@link Frame.waitForSelector}, {@link Frame.waitForXPath} or
   * {@link Frame.waitForFunction} to wait for exactly the conditions you want.
   *
   * @example
   *
   * Wait for 1 second:
   *
   * ```ts
   * await frame.waitForTimeout(1000);
   * ```
   *
   * @param milliseconds - the number of milliseconds to wait.
   */
  waitForTimeout(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }
  /**
   * The frame's title.
   */
  async title() {
    throw new Error("Not implemented");
  }
  waitForDevicePrompt() {
    throw new Error("Not implemented");
  }
};
__name(Frame, "Frame");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/IsolatedWorld.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/IsolatedWorlds.js
init_checked_fetch();
init_modules_watch_stub();
var MAIN_WORLD = Symbol("mainWorld");
var PUPPETEER_WORLD = Symbol("puppeteerWorld");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/LifecycleWatcher.js
init_checked_fetch();
init_modules_watch_stub();
var puppeteerToProtocolLifecycle = /* @__PURE__ */ new Map([
  ["load", "load"],
  ["domcontentloaded", "DOMContentLoaded"],
  ["networkidle0", "networkIdle"],
  ["networkidle2", "networkAlmostIdle"]
]);
var LifecycleWatcher = class {
  #expectedLifecycle;
  #frame;
  #timeout;
  #navigationRequest = null;
  #eventListeners;
  #initialLoaderId;
  #terminationDeferred;
  #sameDocumentNavigationDeferred = Deferred.create();
  #lifecycleDeferred = Deferred.create();
  #newDocumentNavigationDeferred = Deferred.create();
  #hasSameDocumentNavigation;
  #swapped;
  #navigationResponseReceived;
  constructor(networkManager, frame, waitUntil, timeout) {
    if (Array.isArray(waitUntil)) {
      waitUntil = waitUntil.slice();
    } else if (typeof waitUntil === "string") {
      waitUntil = [waitUntil];
    }
    this.#initialLoaderId = frame._loaderId;
    this.#expectedLifecycle = waitUntil.map((value) => {
      const protocolEvent = puppeteerToProtocolLifecycle.get(value);
      assert(protocolEvent, "Unknown value for options.waitUntil: " + value);
      return protocolEvent;
    });
    this.#frame = frame;
    this.#timeout = timeout;
    this.#eventListeners = [
      addEventListener2(frame, FrameEmittedEvents.LifecycleEvent, this.#checkLifecycleComplete.bind(this)),
      addEventListener2(frame, FrameEmittedEvents.FrameNavigatedWithinDocument, this.#navigatedWithinDocument.bind(this)),
      addEventListener2(frame, FrameEmittedEvents.FrameNavigated, this.#navigated.bind(this)),
      addEventListener2(frame, FrameEmittedEvents.FrameSwapped, this.#frameSwapped.bind(this)),
      addEventListener2(frame, FrameEmittedEvents.FrameDetached, this.#onFrameDetached.bind(this)),
      addEventListener2(networkManager, NetworkManagerEmittedEvents.Request, this.#onRequest.bind(this)),
      addEventListener2(networkManager, NetworkManagerEmittedEvents.Response, this.#onResponse.bind(this)),
      addEventListener2(networkManager, NetworkManagerEmittedEvents.RequestFailed, this.#onRequestFailed.bind(this))
    ];
    this.#terminationDeferred = Deferred.create({
      timeout: this.#timeout,
      message: `Navigation timeout of ${this.#timeout} ms exceeded`
    });
    this.#checkLifecycleComplete();
  }
  #onRequest(request) {
    if (request.frame() !== this.#frame || !request.isNavigationRequest()) {
      return;
    }
    this.#navigationRequest = request;
    this.#navigationResponseReceived?.resolve();
    this.#navigationResponseReceived = Deferred.create();
    if (request.response() !== null) {
      this.#navigationResponseReceived?.resolve();
    }
  }
  #onRequestFailed(request) {
    if (this.#navigationRequest?._requestId !== request._requestId) {
      return;
    }
    this.#navigationResponseReceived?.resolve();
  }
  #onResponse(response) {
    if (this.#navigationRequest?._requestId !== response.request()._requestId) {
      return;
    }
    this.#navigationResponseReceived?.resolve();
  }
  #onFrameDetached(frame) {
    if (this.#frame === frame) {
      this.#terminationDeferred.resolve(new Error("Navigating frame was detached"));
      return;
    }
    this.#checkLifecycleComplete();
  }
  async navigationResponse() {
    await this.#navigationResponseReceived?.valueOrThrow();
    return this.#navigationRequest ? this.#navigationRequest.response() : null;
  }
  sameDocumentNavigationPromise() {
    return this.#sameDocumentNavigationDeferred.valueOrThrow();
  }
  newDocumentNavigationPromise() {
    return this.#newDocumentNavigationDeferred.valueOrThrow();
  }
  lifecyclePromise() {
    return this.#lifecycleDeferred.valueOrThrow();
  }
  terminationPromise() {
    return this.#terminationDeferred.valueOrThrow();
  }
  #navigatedWithinDocument() {
    this.#hasSameDocumentNavigation = true;
    this.#checkLifecycleComplete();
  }
  #navigated() {
    this.#checkLifecycleComplete();
  }
  #frameSwapped() {
    this.#swapped = true;
    this.#checkLifecycleComplete();
  }
  #checkLifecycleComplete() {
    if (!checkLifecycle(this.#frame, this.#expectedLifecycle)) {
      return;
    }
    this.#lifecycleDeferred.resolve();
    if (this.#hasSameDocumentNavigation) {
      this.#sameDocumentNavigationDeferred.resolve(void 0);
    }
    if (this.#swapped || this.#frame._loaderId !== this.#initialLoaderId) {
      this.#newDocumentNavigationDeferred.resolve(void 0);
    }
    function checkLifecycle(frame, expectedLifecycle) {
      for (const event of expectedLifecycle) {
        if (!frame._lifecycleEvents.has(event)) {
          return false;
        }
      }
      for (const child of frame.childFrames()) {
        if (child._hasStartedLoading && !checkLifecycle(child, expectedLifecycle)) {
          return false;
        }
      }
      return true;
    }
    __name(checkLifecycle, "checkLifecycle");
  }
  dispose() {
    removeEventListeners(this.#eventListeners);
    this.#terminationDeferred.resolve(new Error("LifecycleWatcher disposed"));
  }
};
__name(LifecycleWatcher, "LifecycleWatcher");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/WaitTask.js
init_checked_fetch();
init_modules_watch_stub();
var WaitTask = class {
  #world;
  #polling;
  #root;
  #fn;
  #args;
  #timeout;
  #result = Deferred.create();
  #poller;
  #signal;
  constructor(world, options, fn2, ...args) {
    this.#world = world;
    this.#polling = options.polling;
    this.#root = options.root;
    this.#signal = options.signal;
    this.#signal?.addEventListener("abort", () => {
      void this.terminate(this.#signal?.reason);
    }, {
      once: true
    });
    switch (typeof fn2) {
      case "string":
        this.#fn = `() => {return (${fn2});}`;
        break;
      default:
        this.#fn = stringifyFunction(fn2);
        break;
    }
    this.#args = args;
    this.#world.taskManager.add(this);
    if (options.timeout) {
      this.#timeout = setTimeout(() => {
        void this.terminate(new TimeoutError(`Waiting failed: ${options.timeout}ms exceeded`));
      }, options.timeout);
    }
    void this.rerun();
  }
  get result() {
    return this.#result.valueOrThrow();
  }
  async rerun() {
    try {
      switch (this.#polling) {
        case "raf":
          this.#poller = await this.#world.evaluateHandle(({ RAFPoller, createFunction: createFunction2 }, fn2, ...args) => {
            const fun = createFunction2(fn2);
            return new RAFPoller(() => {
              return fun(...args);
            });
          }, LazyArg.create((context) => {
            return context.puppeteerUtil;
          }), this.#fn, ...this.#args);
          break;
        case "mutation":
          this.#poller = await this.#world.evaluateHandle(({ MutationPoller, createFunction: createFunction2 }, root, fn2, ...args) => {
            const fun = createFunction2(fn2);
            return new MutationPoller(() => {
              return fun(...args);
            }, root || document);
          }, LazyArg.create((context) => {
            return context.puppeteerUtil;
          }), this.#root, this.#fn, ...this.#args);
          break;
        default:
          this.#poller = await this.#world.evaluateHandle(({ IntervalPoller, createFunction: createFunction2 }, ms, fn2, ...args) => {
            const fun = createFunction2(fn2);
            return new IntervalPoller(() => {
              return fun(...args);
            }, ms);
          }, LazyArg.create((context) => {
            return context.puppeteerUtil;
          }), this.#polling, this.#fn, ...this.#args);
          break;
      }
      await this.#poller.evaluate((poller) => {
        void poller.start();
      });
      const result = await this.#poller.evaluateHandle((poller) => {
        return poller.result();
      });
      this.#result.resolve(result);
      await this.terminate();
    } catch (error) {
      const badError = this.getBadError(error);
      if (badError) {
        await this.terminate(badError);
      }
    }
  }
  async terminate(error) {
    this.#world.taskManager.delete(this);
    if (this.#timeout) {
      clearTimeout(this.#timeout);
    }
    if (error && !this.#result.finished()) {
      this.#result.reject(error);
    }
    if (this.#poller) {
      try {
        await this.#poller.evaluateHandle(async (poller) => {
          await poller.stop();
        });
        if (this.#poller) {
          await this.#poller.dispose();
          this.#poller = void 0;
        }
      } catch {
      }
    }
  }
  /**
   * Not all errors lead to termination. They usually imply we need to rerun the task.
   */
  getBadError(error) {
    if (isErrorLike(error)) {
      if (error.message.includes("Execution context is not available in detached frame")) {
        return new Error("Waiting failed: Frame detached");
      }
      if (error.message.includes("Execution context was destroyed")) {
        return;
      }
      if (error.message.includes("Cannot find context with specified id")) {
        return;
      }
      return error;
    }
    return new Error("WaitTask failed with an error", {
      cause: error
    });
  }
};
__name(WaitTask, "WaitTask");
var TaskManager = class {
  #tasks = /* @__PURE__ */ new Set();
  add(task) {
    this.#tasks.add(task);
  }
  delete(task) {
    this.#tasks.delete(task);
  }
  terminateAll(error) {
    for (const task of this.#tasks) {
      void task.terminate(error);
    }
    this.#tasks.clear();
  }
  async rerunAll() {
    await Promise.all([...this.#tasks].map((task) => {
      return task.rerun();
    }));
  }
};
__name(TaskManager, "TaskManager");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/IsolatedWorld.js
var IsolatedWorld = class {
  #frame;
  #document;
  #context = Deferred.create();
  #detached = false;
  // Set of bindings that have been registered in the current context.
  #contextBindings = /* @__PURE__ */ new Set();
  // Contains mapping from functions that should be bound to Puppeteer functions.
  #bindings = /* @__PURE__ */ new Map();
  #taskManager = new TaskManager();
  get taskManager() {
    return this.#taskManager;
  }
  get _bindings() {
    return this.#bindings;
  }
  constructor(frame) {
    this.#frame = frame;
    this.#client.on("Runtime.bindingCalled", this.#onBindingCalled);
  }
  get #client() {
    return this.#frame._client();
  }
  get #frameManager() {
    return this.#frame._frameManager;
  }
  get #timeoutSettings() {
    return this.#frameManager.timeoutSettings;
  }
  frame() {
    return this.#frame;
  }
  clearContext() {
    this.#document = void 0;
    this.#context = Deferred.create();
  }
  setContext(context) {
    this.#contextBindings.clear();
    this.#context.resolve(context);
    void this.#taskManager.rerunAll();
  }
  hasContext() {
    return this.#context.resolved();
  }
  _detach() {
    this.#detached = true;
    this.#client.off("Runtime.bindingCalled", this.#onBindingCalled);
    this.#taskManager.terminateAll(new Error("waitForFunction failed: frame got detached."));
  }
  executionContext() {
    if (this.#detached) {
      throw new Error(`Execution context is not available in detached frame "${this.#frame.url()}" (are you trying to evaluate?)`);
    }
    if (this.#context === null) {
      throw new Error(`Execution content promise is missing`);
    }
    return this.#context.valueOrThrow();
  }
  async evaluateHandle(pageFunction, ...args) {
    pageFunction = withSourcePuppeteerURLIfNone(this.evaluateHandle.name, pageFunction);
    const context = await this.executionContext();
    return context.evaluateHandle(pageFunction, ...args);
  }
  async evaluate(pageFunction, ...args) {
    pageFunction = withSourcePuppeteerURLIfNone(this.evaluate.name, pageFunction);
    const context = await this.executionContext();
    return context.evaluate(pageFunction, ...args);
  }
  async $(selector) {
    const document2 = await this.document();
    return document2.$(selector);
  }
  async $$(selector) {
    const document2 = await this.document();
    return document2.$$(selector);
  }
  async document() {
    if (this.#document) {
      return this.#document;
    }
    const context = await this.executionContext();
    this.#document = await context.evaluateHandle(() => {
      return document;
    });
    return this.#document;
  }
  async $x(expression) {
    const document2 = await this.document();
    return document2.$x(expression);
  }
  async $eval(selector, pageFunction, ...args) {
    pageFunction = withSourcePuppeteerURLIfNone(this.$eval.name, pageFunction);
    const document2 = await this.document();
    return document2.$eval(selector, pageFunction, ...args);
  }
  async $$eval(selector, pageFunction, ...args) {
    pageFunction = withSourcePuppeteerURLIfNone(this.$$eval.name, pageFunction);
    const document2 = await this.document();
    return document2.$$eval(selector, pageFunction, ...args);
  }
  async content() {
    return await this.evaluate(getPageContent);
  }
  async setContent(html, options = {}) {
    const { waitUntil = ["load"], timeout = this.#timeoutSettings.navigationTimeout() } = options;
    await setPageContent(this, html);
    const watcher = new LifecycleWatcher(this.#frameManager.networkManager, this.#frame, waitUntil, timeout);
    const error = await Deferred.race([
      watcher.terminationPromise(),
      watcher.lifecyclePromise()
    ]);
    watcher.dispose();
    if (error) {
      throw error;
    }
  }
  async click(selector, options) {
    const handle = await this.$(selector);
    assert(handle, `No element found for selector: ${selector}`);
    await handle.click(options);
    await handle.dispose();
  }
  async focus(selector) {
    const handle = await this.$(selector);
    assert(handle, `No element found for selector: ${selector}`);
    await handle.focus();
    await handle.dispose();
  }
  async hover(selector) {
    const handle = await this.$(selector);
    assert(handle, `No element found for selector: ${selector}`);
    await handle.hover();
    await handle.dispose();
  }
  async select(selector, ...values) {
    const handle = await this.$(selector);
    assert(handle, `No element found for selector: ${selector}`);
    const result = await handle.select(...values);
    await handle.dispose();
    return result;
  }
  async tap(selector) {
    const handle = await this.$(selector);
    assert(handle, `No element found for selector: ${selector}`);
    await handle.tap();
    await handle.dispose();
  }
  async type(selector, text, options) {
    const handle = await this.$(selector);
    assert(handle, `No element found for selector: ${selector}`);
    await handle.type(text, options);
    await handle.dispose();
  }
  // If multiple waitFor are set up asynchronously, we need to wait for the
  // first one to set up the binding in the page before running the others.
  #mutex = new Mutex();
  async _addBindingToContext(context, name) {
    if (this.#contextBindings.has(name)) {
      return;
    }
    await this.#mutex.acquire();
    try {
      await context._client.send("Runtime.addBinding", context._contextName ? {
        name,
        executionContextName: context._contextName
      } : {
        name,
        executionContextId: context._contextId
      });
      await context.evaluate(addPageBinding, "internal", name);
      this.#contextBindings.add(name);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("Execution context was destroyed")) {
          return;
        }
        if (error.message.includes("Cannot find context with specified id")) {
          return;
        }
      }
      debugError(error);
    } finally {
      this.#mutex.release();
    }
  }
  #onBindingCalled = async (event) => {
    let payload;
    try {
      payload = JSON.parse(event.payload);
    } catch {
      return;
    }
    const { type, name, seq, args, isTrivial } = payload;
    if (type !== "internal") {
      return;
    }
    if (!this.#contextBindings.has(name)) {
      return;
    }
    try {
      const context = await this.#context.valueOrThrow();
      if (event.executionContextId !== context._contextId) {
        return;
      }
      const binding = this._bindings.get(name);
      await binding?.run(context, seq, args, isTrivial);
    } catch (err) {
      debugError(err);
    }
  };
  waitForFunction(pageFunction, options = {}, ...args) {
    const { polling = "raf", timeout = this.#timeoutSettings.timeout(), root, signal } = options;
    if (typeof polling === "number" && polling < 0) {
      throw new Error("Cannot poll with non-positive interval");
    }
    const waitTask = new WaitTask(this, {
      polling,
      root,
      timeout,
      signal
    }, pageFunction, ...args);
    return waitTask.result;
  }
  async title() {
    return this.evaluate(() => {
      return document.title;
    });
  }
  async adoptBackendNode(backendNodeId) {
    const executionContext = await this.executionContext();
    const { object } = await this.#client.send("DOM.resolveNode", {
      backendNodeId,
      executionContextId: executionContext._contextId
    });
    return createJSHandle(executionContext, object);
  }
  async adoptHandle(handle) {
    const context = await this.executionContext();
    assert(handle.executionContext() !== context, "Cannot adopt handle that already belongs to this execution context");
    const nodeInfo = await this.#client.send("DOM.describeNode", {
      objectId: handle.id
    });
    return await this.adoptBackendNode(nodeInfo.node.backendNodeId);
  }
  async transferHandle(handle) {
    const context = await this.executionContext();
    if (handle.executionContext() === context) {
      return handle;
    }
    const info = await this.#client.send("DOM.describeNode", {
      objectId: handle.remoteObject().objectId
    });
    const newHandle = await this.adoptBackendNode(info.node.backendNodeId);
    await handle.dispose();
    return newHandle;
  }
};
__name(IsolatedWorld, "IsolatedWorld");
var Mutex = class {
  #locked = false;
  #acquirers = [];
  // This is FIFO.
  acquire() {
    if (!this.#locked) {
      this.#locked = true;
      return Promise.resolve();
    }
    const deferred = Deferred.create();
    this.#acquirers.push(deferred.resolve.bind(deferred));
    return deferred.valueOrThrow();
  }
  release() {
    const resolve = this.#acquirers.shift();
    if (!resolve) {
      this.#locked = false;
      return;
    }
    resolve();
  }
};
__name(Mutex, "Mutex");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Frame.js
var FrameEmittedEvents = {
  FrameNavigated: Symbol("Frame.FrameNavigated"),
  FrameSwapped: Symbol("Frame.FrameSwapped"),
  LifecycleEvent: Symbol("Frame.LifecycleEvent"),
  FrameNavigatedWithinDocument: Symbol("Frame.FrameNavigatedWithinDocument"),
  FrameDetached: Symbol("Frame.FrameDetached")
};
var Frame2 = class extends Frame {
  #url = "";
  #detached = false;
  #client;
  _frameManager;
  _id;
  _loaderId = "";
  _hasStartedLoading = false;
  _lifecycleEvents = /* @__PURE__ */ new Set();
  _parentId;
  constructor(frameManager, frameId, parentFrameId, client) {
    super();
    this._frameManager = frameManager;
    this.#url = "";
    this._id = frameId;
    this._parentId = parentFrameId;
    this.#detached = false;
    this._loaderId = "";
    this.updateClient(client);
  }
  updateClient(client) {
    this.#client = client;
    this.worlds = {
      [MAIN_WORLD]: new IsolatedWorld(this),
      [PUPPETEER_WORLD]: new IsolatedWorld(this)
    };
  }
  page() {
    return this._frameManager.page();
  }
  isOOPFrame() {
    return this.#client !== this._frameManager.client;
  }
  async goto(url, options = {}) {
    const { referer = this._frameManager.networkManager.extraHTTPHeaders()["referer"], referrerPolicy = this._frameManager.networkManager.extraHTTPHeaders()["referer-policy"], waitUntil = ["load"], timeout = this._frameManager.timeoutSettings.navigationTimeout() } = options;
    let ensureNewDocumentNavigation = false;
    const watcher = new LifecycleWatcher(this._frameManager.networkManager, this, waitUntil, timeout);
    let error = await Deferred.race([
      navigate(this.#client, url, referer, referrerPolicy, this._id),
      watcher.terminationPromise()
    ]);
    if (!error) {
      error = await Deferred.race([
        watcher.terminationPromise(),
        ensureNewDocumentNavigation ? watcher.newDocumentNavigationPromise() : watcher.sameDocumentNavigationPromise()
      ]);
    }
    try {
      if (error) {
        throw error;
      }
      return await watcher.navigationResponse();
    } finally {
      watcher.dispose();
    }
    async function navigate(client, url2, referrer, referrerPolicy2, frameId) {
      try {
        const response = await client.send("Page.navigate", {
          url: url2,
          referrer,
          frameId,
          referrerPolicy: referrerPolicy2
        });
        ensureNewDocumentNavigation = !!response.loaderId;
        if (response.errorText === "net::ERR_HTTP_RESPONSE_CODE_FAILURE") {
          return null;
        }
        return response.errorText ? new Error(`${response.errorText} at ${url2}`) : null;
      } catch (error2) {
        if (isErrorLike(error2)) {
          return error2;
        }
        throw error2;
      }
    }
    __name(navigate, "navigate");
  }
  async waitForNavigation(options = {}) {
    const { waitUntil = ["load"], timeout = this._frameManager.timeoutSettings.navigationTimeout() } = options;
    const watcher = new LifecycleWatcher(this._frameManager.networkManager, this, waitUntil, timeout);
    const error = await Deferred.race([
      watcher.terminationPromise(),
      watcher.sameDocumentNavigationPromise(),
      watcher.newDocumentNavigationPromise()
    ]);
    try {
      if (error) {
        throw error;
      }
      return await watcher.navigationResponse();
    } finally {
      watcher.dispose();
    }
  }
  _client() {
    return this.#client;
  }
  executionContext() {
    return this.worlds[MAIN_WORLD].executionContext();
  }
  /**
   * @internal
   */
  mainRealm() {
    return this.worlds[MAIN_WORLD];
  }
  /**
   * @internal
   */
  isolatedRealm() {
    return this.worlds[PUPPETEER_WORLD];
  }
  async evaluateHandle(pageFunction, ...args) {
    pageFunction = withSourcePuppeteerURLIfNone(this.evaluateHandle.name, pageFunction);
    return this.mainRealm().evaluateHandle(pageFunction, ...args);
  }
  async evaluate(pageFunction, ...args) {
    pageFunction = withSourcePuppeteerURLIfNone(this.evaluate.name, pageFunction);
    return this.mainRealm().evaluate(pageFunction, ...args);
  }
  async $(selector) {
    return this.mainRealm().$(selector);
  }
  async $$(selector) {
    return this.mainRealm().$$(selector);
  }
  async $eval(selector, pageFunction, ...args) {
    pageFunction = withSourcePuppeteerURLIfNone(this.$eval.name, pageFunction);
    return this.mainRealm().$eval(selector, pageFunction, ...args);
  }
  async $$eval(selector, pageFunction, ...args) {
    pageFunction = withSourcePuppeteerURLIfNone(this.$$eval.name, pageFunction);
    return this.mainRealm().$$eval(selector, pageFunction, ...args);
  }
  async $x(expression) {
    return this.mainRealm().$x(expression);
  }
  async content() {
    return this.isolatedRealm().content();
  }
  async setContent(html, options = {}) {
    return this.isolatedRealm().setContent(html, options);
  }
  name() {
    return this._name || "";
  }
  url() {
    return this.#url;
  }
  parentFrame() {
    return this._frameManager._frameTree.parentFrame(this._id) || null;
  }
  childFrames() {
    return this._frameManager._frameTree.childFrames(this._id);
  }
  isDetached() {
    return this.#detached;
  }
  async title() {
    return this.isolatedRealm().title();
  }
  _deviceRequestPromptManager() {
    if (this.isOOPFrame()) {
      return this._frameManager._deviceRequestPromptManager(this.#client);
    }
    const parentFrame = this.parentFrame();
    assert(parentFrame !== null);
    return parentFrame._deviceRequestPromptManager();
  }
  waitForDevicePrompt(options = {}) {
    return this._deviceRequestPromptManager().waitForDevicePrompt(options);
  }
  _navigated(framePayload) {
    this._name = framePayload.name;
    this.#url = `${framePayload.url}${framePayload.urlFragment || ""}`;
  }
  _navigatedWithinDocument(url) {
    this.#url = url;
  }
  _onLifecycleEvent(loaderId, name) {
    if (name === "init") {
      this._loaderId = loaderId;
      this._lifecycleEvents.clear();
    }
    this._lifecycleEvents.add(name);
  }
  _onLoadingStopped() {
    this._lifecycleEvents.add("DOMContentLoaded");
    this._lifecycleEvents.add("load");
  }
  _onLoadingStarted() {
    this._hasStartedLoading = true;
  }
  _detach() {
    this.#detached = true;
    this.worlds[MAIN_WORLD]._detach();
    this.worlds[PUPPETEER_WORLD]._detach();
  }
};
__name(Frame2, "Frame");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/FrameTree.js
init_checked_fetch();
init_modules_watch_stub();
var FrameTree = class {
  #frames = /* @__PURE__ */ new Map();
  // frameID -> parentFrameID
  #parentIds = /* @__PURE__ */ new Map();
  // frameID -> childFrameIDs
  #childIds = /* @__PURE__ */ new Map();
  #mainFrame;
  #waitRequests = /* @__PURE__ */ new Map();
  getMainFrame() {
    return this.#mainFrame;
  }
  getById(frameId) {
    return this.#frames.get(frameId);
  }
  /**
   * Returns a promise that is resolved once the frame with
   * the given ID is added to the tree.
   */
  waitForFrame(frameId) {
    const frame = this.getById(frameId);
    if (frame) {
      return Promise.resolve(frame);
    }
    const deferred = Deferred.create();
    const callbacks = this.#waitRequests.get(frameId) || /* @__PURE__ */ new Set();
    callbacks.add(deferred);
    return deferred.valueOrThrow();
  }
  frames() {
    return Array.from(this.#frames.values());
  }
  addFrame(frame) {
    this.#frames.set(frame._id, frame);
    if (frame._parentId) {
      this.#parentIds.set(frame._id, frame._parentId);
      if (!this.#childIds.has(frame._parentId)) {
        this.#childIds.set(frame._parentId, /* @__PURE__ */ new Set());
      }
      this.#childIds.get(frame._parentId).add(frame._id);
    } else if (!this.#mainFrame) {
      this.#mainFrame = frame;
    }
    this.#waitRequests.get(frame._id)?.forEach((request) => {
      return request.resolve(frame);
    });
  }
  removeFrame(frame) {
    this.#frames.delete(frame._id);
    this.#parentIds.delete(frame._id);
    if (frame._parentId) {
      this.#childIds.get(frame._parentId)?.delete(frame._id);
    } else {
      this.#mainFrame = void 0;
    }
  }
  childFrames(frameId) {
    const childIds = this.#childIds.get(frameId);
    if (!childIds) {
      return [];
    }
    return Array.from(childIds).map((id) => {
      return this.getById(id);
    }).filter((frame) => {
      return frame !== void 0;
    });
  }
  parentFrame(frameId) {
    const parentId = this.#parentIds.get(frameId);
    return parentId ? this.getById(parentId) : void 0;
  }
};
__name(FrameTree, "FrameTree");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/FrameManager.js
var UTILITY_WORLD_NAME = "__puppeteer_utility_world__";
var FrameManagerEmittedEvents = {
  FrameAttached: Symbol("FrameManager.FrameAttached"),
  FrameNavigated: Symbol("FrameManager.FrameNavigated"),
  FrameDetached: Symbol("FrameManager.FrameDetached"),
  FrameSwapped: Symbol("FrameManager.FrameSwapped"),
  LifecycleEvent: Symbol("FrameManager.LifecycleEvent"),
  FrameNavigatedWithinDocument: Symbol("FrameManager.FrameNavigatedWithinDocument")
};
var FrameManager = class extends EventEmitter {
  #page;
  #networkManager;
  #timeoutSettings;
  #contextIdToContext = /* @__PURE__ */ new Map();
  #isolatedWorlds = /* @__PURE__ */ new Set();
  #client;
  /**
   * @internal
   */
  _frameTree = new FrameTree();
  /**
   * Set of frame IDs stored to indicate if a frame has received a
   * frameNavigated event so that frame tree responses could be ignored as the
   * frameNavigated event usually contains the latest information.
   */
  #frameNavigatedReceived = /* @__PURE__ */ new Set();
  #deviceRequestPromptManagerMap = /* @__PURE__ */ new WeakMap();
  get timeoutSettings() {
    return this.#timeoutSettings;
  }
  get networkManager() {
    return this.#networkManager;
  }
  get client() {
    return this.#client;
  }
  constructor(client, page, ignoreHTTPSErrors, timeoutSettings) {
    super();
    this.#client = client;
    this.#page = page;
    this.#networkManager = new NetworkManager(client, ignoreHTTPSErrors, this);
    this.#timeoutSettings = timeoutSettings;
    this.setupEventListeners(this.#client);
    client.once(CDPSessionEmittedEvents.Disconnected, () => {
      const mainFrame = this._frameTree.getMainFrame();
      if (mainFrame) {
        this.#removeFramesRecursively(mainFrame);
      }
    });
  }
  setupEventListeners(session) {
    session.on("Page.frameAttached", (event) => {
      this.#onFrameAttached(session, event.frameId, event.parentFrameId);
    });
    session.on("Page.frameNavigated", (event) => {
      this.#frameNavigatedReceived.add(event.frame.id);
      void this.#onFrameNavigated(event.frame);
    });
    session.on("Page.navigatedWithinDocument", (event) => {
      this.#onFrameNavigatedWithinDocument(event.frameId, event.url);
    });
    session.on("Page.frameDetached", (event) => {
      this.#onFrameDetached(event.frameId, event.reason);
    });
    session.on("Page.frameStartedLoading", (event) => {
      this.#onFrameStartedLoading(event.frameId);
    });
    session.on("Page.frameStoppedLoading", (event) => {
      this.#onFrameStoppedLoading(event.frameId);
    });
    session.on("Runtime.executionContextCreated", (event) => {
      this.#onExecutionContextCreated(event.context, session);
    });
    session.on("Runtime.executionContextDestroyed", (event) => {
      this.#onExecutionContextDestroyed(event.executionContextId, session);
    });
    session.on("Runtime.executionContextsCleared", () => {
      this.#onExecutionContextsCleared(session);
    });
    session.on("Page.lifecycleEvent", (event) => {
      this.#onLifecycleEvent(event);
    });
  }
  async initialize(client = this.#client) {
    try {
      const result = await Promise.all([
        client.send("Page.enable"),
        client.send("Page.getFrameTree")
      ]);
      const { frameTree } = result[1];
      this.#handleFrameTree(client, frameTree);
      await Promise.all([
        client.send("Page.setLifecycleEventsEnabled", { enabled: true }),
        client.send("Runtime.enable").then(() => {
          return this.#createIsolatedWorld(client, UTILITY_WORLD_NAME);
        }),
        // TODO: Network manager is not aware of OOP iframes yet.
        client === this.#client ? this.#networkManager.initialize() : Promise.resolve()
      ]);
    } catch (error) {
      if (isErrorLike(error) && isTargetClosedError(error)) {
        return;
      }
      throw error;
    }
  }
  executionContextById(contextId, session = this.#client) {
    const context = this.getExecutionContextById(contextId, session);
    assert(context, "INTERNAL ERROR: missing context with id = " + contextId);
    return context;
  }
  getExecutionContextById(contextId, session = this.#client) {
    return this.#contextIdToContext.get(`${session.id()}:${contextId}`);
  }
  page() {
    return this.#page;
  }
  mainFrame() {
    const mainFrame = this._frameTree.getMainFrame();
    assert(mainFrame, "Requesting main frame too early!");
    return mainFrame;
  }
  frames() {
    return Array.from(this._frameTree.frames());
  }
  frame(frameId) {
    return this._frameTree.getById(frameId) || null;
  }
  onAttachedToTarget(target) {
    if (target._getTargetInfo().type !== "iframe") {
      return;
    }
    const frame = this.frame(target._getTargetInfo().targetId);
    if (frame) {
      frame.updateClient(target._session());
    }
    this.setupEventListeners(target._session());
    void this.initialize(target._session());
  }
  /**
   * @internal
   */
  _deviceRequestPromptManager(client) {
    let manager = this.#deviceRequestPromptManagerMap.get(client);
    if (manager === void 0) {
      manager = new DeviceRequestPromptManager(client, this.#timeoutSettings);
      this.#deviceRequestPromptManagerMap.set(client, manager);
    }
    return manager;
  }
  #onLifecycleEvent(event) {
    const frame = this.frame(event.frameId);
    if (!frame) {
      return;
    }
    frame._onLifecycleEvent(event.loaderId, event.name);
    this.emit(FrameManagerEmittedEvents.LifecycleEvent, frame);
    frame.emit(FrameEmittedEvents.LifecycleEvent);
  }
  #onFrameStartedLoading(frameId) {
    const frame = this.frame(frameId);
    if (!frame) {
      return;
    }
    frame._onLoadingStarted();
  }
  #onFrameStoppedLoading(frameId) {
    const frame = this.frame(frameId);
    if (!frame) {
      return;
    }
    frame._onLoadingStopped();
    this.emit(FrameManagerEmittedEvents.LifecycleEvent, frame);
    frame.emit(FrameEmittedEvents.LifecycleEvent);
  }
  #handleFrameTree(session, frameTree) {
    if (frameTree.frame.parentId) {
      this.#onFrameAttached(session, frameTree.frame.id, frameTree.frame.parentId);
    }
    if (!this.#frameNavigatedReceived.has(frameTree.frame.id)) {
      void this.#onFrameNavigated(frameTree.frame);
    } else {
      this.#frameNavigatedReceived.delete(frameTree.frame.id);
    }
    if (!frameTree.childFrames) {
      return;
    }
    for (const child of frameTree.childFrames) {
      this.#handleFrameTree(session, child);
    }
  }
  #onFrameAttached(session, frameId, parentFrameId) {
    let frame = this.frame(frameId);
    if (frame) {
      if (session && frame.isOOPFrame()) {
        frame.updateClient(session);
      }
      return;
    }
    frame = new Frame2(this, frameId, parentFrameId, session);
    this._frameTree.addFrame(frame);
    this.emit(FrameManagerEmittedEvents.FrameAttached, frame);
  }
  async #onFrameNavigated(framePayload) {
    const frameId = framePayload.id;
    const isMainFrame = !framePayload.parentId;
    let frame = this._frameTree.getById(frameId);
    if (frame) {
      for (const child of frame.childFrames()) {
        this.#removeFramesRecursively(child);
      }
    }
    if (isMainFrame) {
      if (frame) {
        this._frameTree.removeFrame(frame);
        frame._id = frameId;
      } else {
        frame = new Frame2(this, frameId, void 0, this.#client);
      }
      this._frameTree.addFrame(frame);
    }
    frame = await this._frameTree.waitForFrame(frameId);
    frame._navigated(framePayload);
    this.emit(FrameManagerEmittedEvents.FrameNavigated, frame);
    frame.emit(FrameEmittedEvents.FrameNavigated);
  }
  async #createIsolatedWorld(session, name) {
    const key = `${session.id()}:${name}`;
    if (this.#isolatedWorlds.has(key)) {
      return;
    }
    await session.send("Page.addScriptToEvaluateOnNewDocument", {
      source: `//# sourceURL=${PuppeteerURL.INTERNAL_URL}`,
      worldName: name
    });
    await Promise.all(this.frames().filter((frame) => {
      return frame._client() === session;
    }).map((frame) => {
      return session.send("Page.createIsolatedWorld", {
        frameId: frame._id,
        worldName: name,
        grantUniveralAccess: true
      }).catch(debugError);
    }));
    this.#isolatedWorlds.add(key);
  }
  #onFrameNavigatedWithinDocument(frameId, url) {
    const frame = this.frame(frameId);
    if (!frame) {
      return;
    }
    frame._navigatedWithinDocument(url);
    this.emit(FrameManagerEmittedEvents.FrameNavigatedWithinDocument, frame);
    frame.emit(FrameEmittedEvents.FrameNavigatedWithinDocument);
    this.emit(FrameManagerEmittedEvents.FrameNavigated, frame);
    frame.emit(FrameEmittedEvents.FrameNavigated);
  }
  #onFrameDetached(frameId, reason) {
    const frame = this.frame(frameId);
    if (reason === "remove") {
      if (frame) {
        this.#removeFramesRecursively(frame);
      }
    } else if (reason === "swap") {
      this.emit(FrameManagerEmittedEvents.FrameSwapped, frame);
      frame?.emit(FrameEmittedEvents.FrameSwapped);
    }
  }
  #onExecutionContextCreated(contextPayload, session) {
    const auxData = contextPayload.auxData;
    const frameId = auxData && auxData.frameId;
    const frame = typeof frameId === "string" ? this.frame(frameId) : void 0;
    let world;
    if (frame) {
      if (frame._client() !== session) {
        return;
      }
      if (contextPayload.auxData && contextPayload.auxData["isDefault"]) {
        world = frame.worlds[MAIN_WORLD];
      } else if (contextPayload.name === UTILITY_WORLD_NAME && !frame.worlds[PUPPETEER_WORLD].hasContext()) {
        world = frame.worlds[PUPPETEER_WORLD];
      }
    }
    const context = new ExecutionContext(frame?._client() || this.#client, contextPayload, world);
    if (world) {
      world.setContext(context);
    }
    const key = `${session.id()}:${contextPayload.id}`;
    this.#contextIdToContext.set(key, context);
  }
  #onExecutionContextDestroyed(executionContextId, session) {
    const key = `${session.id()}:${executionContextId}`;
    const context = this.#contextIdToContext.get(key);
    if (!context) {
      return;
    }
    this.#contextIdToContext.delete(key);
    if (context._world) {
      context._world.clearContext();
    }
  }
  #onExecutionContextsCleared(session) {
    for (const [key, context] of this.#contextIdToContext.entries()) {
      if (context._client !== session) {
        continue;
      }
      if (context._world) {
        context._world.clearContext();
      }
      this.#contextIdToContext.delete(key);
    }
  }
  #removeFramesRecursively(frame) {
    for (const child of frame.childFrames()) {
      this.#removeFramesRecursively(child);
    }
    frame._detach();
    this._frameTree.removeFrame(frame);
    this.emit(FrameManagerEmittedEvents.FrameDetached, frame);
    frame.emit(FrameEmittedEvents.FrameDetached, frame);
  }
};
__name(FrameManager, "FrameManager");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Input.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/api/Input.js
init_checked_fetch();
init_modules_watch_stub();
var Keyboard = class {
  /**
   * @internal
   */
  constructor() {
  }
  async down() {
    throw new Error("Not implemented");
  }
  async up() {
    throw new Error("Not implemented");
  }
  async sendCharacter() {
    throw new Error("Not implemented");
  }
  async type() {
    throw new Error("Not implemented");
  }
  async press() {
    throw new Error("Not implemented");
  }
};
__name(Keyboard, "Keyboard");
var MouseButton = Object.freeze({
  Left: "left",
  Right: "right",
  Middle: "middle",
  Back: "back",
  Forward: "forward"
});
var Mouse = class {
  /**
   * @internal
   */
  constructor() {
  }
  /**
   * Resets the mouse to the default state: No buttons pressed; position at
   * (0,0).
   */
  async reset() {
    throw new Error("Not implemented");
  }
  async move() {
    throw new Error("Not implemented");
  }
  async down() {
    throw new Error("Not implemented");
  }
  async up() {
    throw new Error("Not implemented");
  }
  async click() {
    throw new Error("Not implemented");
  }
  async wheel() {
    throw new Error("Not implemented");
  }
  async drag() {
    throw new Error("Not implemented");
  }
  async dragEnter() {
    throw new Error("Not implemented");
  }
  async dragOver() {
    throw new Error("Not implemented");
  }
  async drop() {
    throw new Error("Not implemented");
  }
  async dragAndDrop() {
    throw new Error("Not implemented");
  }
};
__name(Mouse, "Mouse");
var Touchscreen = class {
  /**
   * @internal
   */
  constructor() {
  }
  async tap() {
    throw new Error("Not implemented");
  }
  async touchStart() {
    throw new Error("Not implemented");
  }
  async touchMove() {
    throw new Error("Not implemented");
  }
  async touchEnd() {
    throw new Error("Not implemented");
  }
};
__name(Touchscreen, "Touchscreen");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/USKeyboardLayout.js
init_checked_fetch();
init_modules_watch_stub();
var _keyDefinitions = {
  "0": { keyCode: 48, key: "0", code: "Digit0" },
  "1": { keyCode: 49, key: "1", code: "Digit1" },
  "2": { keyCode: 50, key: "2", code: "Digit2" },
  "3": { keyCode: 51, key: "3", code: "Digit3" },
  "4": { keyCode: 52, key: "4", code: "Digit4" },
  "5": { keyCode: 53, key: "5", code: "Digit5" },
  "6": { keyCode: 54, key: "6", code: "Digit6" },
  "7": { keyCode: 55, key: "7", code: "Digit7" },
  "8": { keyCode: 56, key: "8", code: "Digit8" },
  "9": { keyCode: 57, key: "9", code: "Digit9" },
  Power: { key: "Power", code: "Power" },
  Eject: { key: "Eject", code: "Eject" },
  Abort: { keyCode: 3, code: "Abort", key: "Cancel" },
  Help: { keyCode: 6, code: "Help", key: "Help" },
  Backspace: { keyCode: 8, code: "Backspace", key: "Backspace" },
  Tab: { keyCode: 9, code: "Tab", key: "Tab" },
  Numpad5: {
    keyCode: 12,
    shiftKeyCode: 101,
    key: "Clear",
    code: "Numpad5",
    shiftKey: "5",
    location: 3
  },
  NumpadEnter: {
    keyCode: 13,
    code: "NumpadEnter",
    key: "Enter",
    text: "\r",
    location: 3
  },
  Enter: { keyCode: 13, code: "Enter", key: "Enter", text: "\r" },
  "\r": { keyCode: 13, code: "Enter", key: "Enter", text: "\r" },
  "\n": { keyCode: 13, code: "Enter", key: "Enter", text: "\r" },
  ShiftLeft: { keyCode: 16, code: "ShiftLeft", key: "Shift", location: 1 },
  ShiftRight: { keyCode: 16, code: "ShiftRight", key: "Shift", location: 2 },
  ControlLeft: {
    keyCode: 17,
    code: "ControlLeft",
    key: "Control",
    location: 1
  },
  ControlRight: {
    keyCode: 17,
    code: "ControlRight",
    key: "Control",
    location: 2
  },
  AltLeft: { keyCode: 18, code: "AltLeft", key: "Alt", location: 1 },
  AltRight: { keyCode: 18, code: "AltRight", key: "Alt", location: 2 },
  Pause: { keyCode: 19, code: "Pause", key: "Pause" },
  CapsLock: { keyCode: 20, code: "CapsLock", key: "CapsLock" },
  Escape: { keyCode: 27, code: "Escape", key: "Escape" },
  Convert: { keyCode: 28, code: "Convert", key: "Convert" },
  NonConvert: { keyCode: 29, code: "NonConvert", key: "NonConvert" },
  Space: { keyCode: 32, code: "Space", key: " " },
  Numpad9: {
    keyCode: 33,
    shiftKeyCode: 105,
    key: "PageUp",
    code: "Numpad9",
    shiftKey: "9",
    location: 3
  },
  PageUp: { keyCode: 33, code: "PageUp", key: "PageUp" },
  Numpad3: {
    keyCode: 34,
    shiftKeyCode: 99,
    key: "PageDown",
    code: "Numpad3",
    shiftKey: "3",
    location: 3
  },
  PageDown: { keyCode: 34, code: "PageDown", key: "PageDown" },
  End: { keyCode: 35, code: "End", key: "End" },
  Numpad1: {
    keyCode: 35,
    shiftKeyCode: 97,
    key: "End",
    code: "Numpad1",
    shiftKey: "1",
    location: 3
  },
  Home: { keyCode: 36, code: "Home", key: "Home" },
  Numpad7: {
    keyCode: 36,
    shiftKeyCode: 103,
    key: "Home",
    code: "Numpad7",
    shiftKey: "7",
    location: 3
  },
  ArrowLeft: { keyCode: 37, code: "ArrowLeft", key: "ArrowLeft" },
  Numpad4: {
    keyCode: 37,
    shiftKeyCode: 100,
    key: "ArrowLeft",
    code: "Numpad4",
    shiftKey: "4",
    location: 3
  },
  Numpad8: {
    keyCode: 38,
    shiftKeyCode: 104,
    key: "ArrowUp",
    code: "Numpad8",
    shiftKey: "8",
    location: 3
  },
  ArrowUp: { keyCode: 38, code: "ArrowUp", key: "ArrowUp" },
  ArrowRight: { keyCode: 39, code: "ArrowRight", key: "ArrowRight" },
  Numpad6: {
    keyCode: 39,
    shiftKeyCode: 102,
    key: "ArrowRight",
    code: "Numpad6",
    shiftKey: "6",
    location: 3
  },
  Numpad2: {
    keyCode: 40,
    shiftKeyCode: 98,
    key: "ArrowDown",
    code: "Numpad2",
    shiftKey: "2",
    location: 3
  },
  ArrowDown: { keyCode: 40, code: "ArrowDown", key: "ArrowDown" },
  Select: { keyCode: 41, code: "Select", key: "Select" },
  Open: { keyCode: 43, code: "Open", key: "Execute" },
  PrintScreen: { keyCode: 44, code: "PrintScreen", key: "PrintScreen" },
  Insert: { keyCode: 45, code: "Insert", key: "Insert" },
  Numpad0: {
    keyCode: 45,
    shiftKeyCode: 96,
    key: "Insert",
    code: "Numpad0",
    shiftKey: "0",
    location: 3
  },
  Delete: { keyCode: 46, code: "Delete", key: "Delete" },
  NumpadDecimal: {
    keyCode: 46,
    shiftKeyCode: 110,
    code: "NumpadDecimal",
    key: "\0",
    shiftKey: ".",
    location: 3
  },
  Digit0: { keyCode: 48, code: "Digit0", shiftKey: ")", key: "0" },
  Digit1: { keyCode: 49, code: "Digit1", shiftKey: "!", key: "1" },
  Digit2: { keyCode: 50, code: "Digit2", shiftKey: "@", key: "2" },
  Digit3: { keyCode: 51, code: "Digit3", shiftKey: "#", key: "3" },
  Digit4: { keyCode: 52, code: "Digit4", shiftKey: "$", key: "4" },
  Digit5: { keyCode: 53, code: "Digit5", shiftKey: "%", key: "5" },
  Digit6: { keyCode: 54, code: "Digit6", shiftKey: "^", key: "6" },
  Digit7: { keyCode: 55, code: "Digit7", shiftKey: "&", key: "7" },
  Digit8: { keyCode: 56, code: "Digit8", shiftKey: "*", key: "8" },
  Digit9: { keyCode: 57, code: "Digit9", shiftKey: "(", key: "9" },
  KeyA: { keyCode: 65, code: "KeyA", shiftKey: "A", key: "a" },
  KeyB: { keyCode: 66, code: "KeyB", shiftKey: "B", key: "b" },
  KeyC: { keyCode: 67, code: "KeyC", shiftKey: "C", key: "c" },
  KeyD: { keyCode: 68, code: "KeyD", shiftKey: "D", key: "d" },
  KeyE: { keyCode: 69, code: "KeyE", shiftKey: "E", key: "e" },
  KeyF: { keyCode: 70, code: "KeyF", shiftKey: "F", key: "f" },
  KeyG: { keyCode: 71, code: "KeyG", shiftKey: "G", key: "g" },
  KeyH: { keyCode: 72, code: "KeyH", shiftKey: "H", key: "h" },
  KeyI: { keyCode: 73, code: "KeyI", shiftKey: "I", key: "i" },
  KeyJ: { keyCode: 74, code: "KeyJ", shiftKey: "J", key: "j" },
  KeyK: { keyCode: 75, code: "KeyK", shiftKey: "K", key: "k" },
  KeyL: { keyCode: 76, code: "KeyL", shiftKey: "L", key: "l" },
  KeyM: { keyCode: 77, code: "KeyM", shiftKey: "M", key: "m" },
  KeyN: { keyCode: 78, code: "KeyN", shiftKey: "N", key: "n" },
  KeyO: { keyCode: 79, code: "KeyO", shiftKey: "O", key: "o" },
  KeyP: { keyCode: 80, code: "KeyP", shiftKey: "P", key: "p" },
  KeyQ: { keyCode: 81, code: "KeyQ", shiftKey: "Q", key: "q" },
  KeyR: { keyCode: 82, code: "KeyR", shiftKey: "R", key: "r" },
  KeyS: { keyCode: 83, code: "KeyS", shiftKey: "S", key: "s" },
  KeyT: { keyCode: 84, code: "KeyT", shiftKey: "T", key: "t" },
  KeyU: { keyCode: 85, code: "KeyU", shiftKey: "U", key: "u" },
  KeyV: { keyCode: 86, code: "KeyV", shiftKey: "V", key: "v" },
  KeyW: { keyCode: 87, code: "KeyW", shiftKey: "W", key: "w" },
  KeyX: { keyCode: 88, code: "KeyX", shiftKey: "X", key: "x" },
  KeyY: { keyCode: 89, code: "KeyY", shiftKey: "Y", key: "y" },
  KeyZ: { keyCode: 90, code: "KeyZ", shiftKey: "Z", key: "z" },
  MetaLeft: { keyCode: 91, code: "MetaLeft", key: "Meta", location: 1 },
  MetaRight: { keyCode: 92, code: "MetaRight", key: "Meta", location: 2 },
  ContextMenu: { keyCode: 93, code: "ContextMenu", key: "ContextMenu" },
  NumpadMultiply: {
    keyCode: 106,
    code: "NumpadMultiply",
    key: "*",
    location: 3
  },
  NumpadAdd: { keyCode: 107, code: "NumpadAdd", key: "+", location: 3 },
  NumpadSubtract: {
    keyCode: 109,
    code: "NumpadSubtract",
    key: "-",
    location: 3
  },
  NumpadDivide: { keyCode: 111, code: "NumpadDivide", key: "/", location: 3 },
  F1: { keyCode: 112, code: "F1", key: "F1" },
  F2: { keyCode: 113, code: "F2", key: "F2" },
  F3: { keyCode: 114, code: "F3", key: "F3" },
  F4: { keyCode: 115, code: "F4", key: "F4" },
  F5: { keyCode: 116, code: "F5", key: "F5" },
  F6: { keyCode: 117, code: "F6", key: "F6" },
  F7: { keyCode: 118, code: "F7", key: "F7" },
  F8: { keyCode: 119, code: "F8", key: "F8" },
  F9: { keyCode: 120, code: "F9", key: "F9" },
  F10: { keyCode: 121, code: "F10", key: "F10" },
  F11: { keyCode: 122, code: "F11", key: "F11" },
  F12: { keyCode: 123, code: "F12", key: "F12" },
  F13: { keyCode: 124, code: "F13", key: "F13" },
  F14: { keyCode: 125, code: "F14", key: "F14" },
  F15: { keyCode: 126, code: "F15", key: "F15" },
  F16: { keyCode: 127, code: "F16", key: "F16" },
  F17: { keyCode: 128, code: "F17", key: "F17" },
  F18: { keyCode: 129, code: "F18", key: "F18" },
  F19: { keyCode: 130, code: "F19", key: "F19" },
  F20: { keyCode: 131, code: "F20", key: "F20" },
  F21: { keyCode: 132, code: "F21", key: "F21" },
  F22: { keyCode: 133, code: "F22", key: "F22" },
  F23: { keyCode: 134, code: "F23", key: "F23" },
  F24: { keyCode: 135, code: "F24", key: "F24" },
  NumLock: { keyCode: 144, code: "NumLock", key: "NumLock" },
  ScrollLock: { keyCode: 145, code: "ScrollLock", key: "ScrollLock" },
  AudioVolumeMute: {
    keyCode: 173,
    code: "AudioVolumeMute",
    key: "AudioVolumeMute"
  },
  AudioVolumeDown: {
    keyCode: 174,
    code: "AudioVolumeDown",
    key: "AudioVolumeDown"
  },
  AudioVolumeUp: { keyCode: 175, code: "AudioVolumeUp", key: "AudioVolumeUp" },
  MediaTrackNext: {
    keyCode: 176,
    code: "MediaTrackNext",
    key: "MediaTrackNext"
  },
  MediaTrackPrevious: {
    keyCode: 177,
    code: "MediaTrackPrevious",
    key: "MediaTrackPrevious"
  },
  MediaStop: { keyCode: 178, code: "MediaStop", key: "MediaStop" },
  MediaPlayPause: {
    keyCode: 179,
    code: "MediaPlayPause",
    key: "MediaPlayPause"
  },
  Semicolon: { keyCode: 186, code: "Semicolon", shiftKey: ":", key: ";" },
  Equal: { keyCode: 187, code: "Equal", shiftKey: "+", key: "=" },
  NumpadEqual: { keyCode: 187, code: "NumpadEqual", key: "=", location: 3 },
  Comma: { keyCode: 188, code: "Comma", shiftKey: "<", key: "," },
  Minus: { keyCode: 189, code: "Minus", shiftKey: "_", key: "-" },
  Period: { keyCode: 190, code: "Period", shiftKey: ">", key: "." },
  Slash: { keyCode: 191, code: "Slash", shiftKey: "?", key: "/" },
  Backquote: { keyCode: 192, code: "Backquote", shiftKey: "~", key: "`" },
  BracketLeft: { keyCode: 219, code: "BracketLeft", shiftKey: "{", key: "[" },
  Backslash: { keyCode: 220, code: "Backslash", shiftKey: "|", key: "\\" },
  BracketRight: { keyCode: 221, code: "BracketRight", shiftKey: "}", key: "]" },
  Quote: { keyCode: 222, code: "Quote", shiftKey: '"', key: "'" },
  AltGraph: { keyCode: 225, code: "AltGraph", key: "AltGraph" },
  Props: { keyCode: 247, code: "Props", key: "CrSel" },
  Cancel: { keyCode: 3, key: "Cancel", code: "Abort" },
  Clear: { keyCode: 12, key: "Clear", code: "Numpad5", location: 3 },
  Shift: { keyCode: 16, key: "Shift", code: "ShiftLeft", location: 1 },
  Control: { keyCode: 17, key: "Control", code: "ControlLeft", location: 1 },
  Alt: { keyCode: 18, key: "Alt", code: "AltLeft", location: 1 },
  Accept: { keyCode: 30, key: "Accept" },
  ModeChange: { keyCode: 31, key: "ModeChange" },
  " ": { keyCode: 32, key: " ", code: "Space" },
  Print: { keyCode: 42, key: "Print" },
  Execute: { keyCode: 43, key: "Execute", code: "Open" },
  "\0": { keyCode: 46, key: "\0", code: "NumpadDecimal", location: 3 },
  a: { keyCode: 65, key: "a", code: "KeyA" },
  b: { keyCode: 66, key: "b", code: "KeyB" },
  c: { keyCode: 67, key: "c", code: "KeyC" },
  d: { keyCode: 68, key: "d", code: "KeyD" },
  e: { keyCode: 69, key: "e", code: "KeyE" },
  f: { keyCode: 70, key: "f", code: "KeyF" },
  g: { keyCode: 71, key: "g", code: "KeyG" },
  h: { keyCode: 72, key: "h", code: "KeyH" },
  i: { keyCode: 73, key: "i", code: "KeyI" },
  j: { keyCode: 74, key: "j", code: "KeyJ" },
  k: { keyCode: 75, key: "k", code: "KeyK" },
  l: { keyCode: 76, key: "l", code: "KeyL" },
  m: { keyCode: 77, key: "m", code: "KeyM" },
  n: { keyCode: 78, key: "n", code: "KeyN" },
  o: { keyCode: 79, key: "o", code: "KeyO" },
  p: { keyCode: 80, key: "p", code: "KeyP" },
  q: { keyCode: 81, key: "q", code: "KeyQ" },
  r: { keyCode: 82, key: "r", code: "KeyR" },
  s: { keyCode: 83, key: "s", code: "KeyS" },
  t: { keyCode: 84, key: "t", code: "KeyT" },
  u: { keyCode: 85, key: "u", code: "KeyU" },
  v: { keyCode: 86, key: "v", code: "KeyV" },
  w: { keyCode: 87, key: "w", code: "KeyW" },
  x: { keyCode: 88, key: "x", code: "KeyX" },
  y: { keyCode: 89, key: "y", code: "KeyY" },
  z: { keyCode: 90, key: "z", code: "KeyZ" },
  Meta: { keyCode: 91, key: "Meta", code: "MetaLeft", location: 1 },
  "*": { keyCode: 106, key: "*", code: "NumpadMultiply", location: 3 },
  "+": { keyCode: 107, key: "+", code: "NumpadAdd", location: 3 },
  "-": { keyCode: 109, key: "-", code: "NumpadSubtract", location: 3 },
  "/": { keyCode: 111, key: "/", code: "NumpadDivide", location: 3 },
  ";": { keyCode: 186, key: ";", code: "Semicolon" },
  "=": { keyCode: 187, key: "=", code: "Equal" },
  ",": { keyCode: 188, key: ",", code: "Comma" },
  ".": { keyCode: 190, key: ".", code: "Period" },
  "`": { keyCode: 192, key: "`", code: "Backquote" },
  "[": { keyCode: 219, key: "[", code: "BracketLeft" },
  "\\": { keyCode: 220, key: "\\", code: "Backslash" },
  "]": { keyCode: 221, key: "]", code: "BracketRight" },
  "'": { keyCode: 222, key: "'", code: "Quote" },
  Attn: { keyCode: 246, key: "Attn" },
  CrSel: { keyCode: 247, key: "CrSel", code: "Props" },
  ExSel: { keyCode: 248, key: "ExSel" },
  EraseEof: { keyCode: 249, key: "EraseEof" },
  Play: { keyCode: 250, key: "Play" },
  ZoomOut: { keyCode: 251, key: "ZoomOut" },
  ")": { keyCode: 48, key: ")", code: "Digit0" },
  "!": { keyCode: 49, key: "!", code: "Digit1" },
  "@": { keyCode: 50, key: "@", code: "Digit2" },
  "#": { keyCode: 51, key: "#", code: "Digit3" },
  $: { keyCode: 52, key: "$", code: "Digit4" },
  "%": { keyCode: 53, key: "%", code: "Digit5" },
  "^": { keyCode: 54, key: "^", code: "Digit6" },
  "&": { keyCode: 55, key: "&", code: "Digit7" },
  "(": { keyCode: 57, key: "(", code: "Digit9" },
  A: { keyCode: 65, key: "A", code: "KeyA" },
  B: { keyCode: 66, key: "B", code: "KeyB" },
  C: { keyCode: 67, key: "C", code: "KeyC" },
  D: { keyCode: 68, key: "D", code: "KeyD" },
  E: { keyCode: 69, key: "E", code: "KeyE" },
  F: { keyCode: 70, key: "F", code: "KeyF" },
  G: { keyCode: 71, key: "G", code: "KeyG" },
  H: { keyCode: 72, key: "H", code: "KeyH" },
  I: { keyCode: 73, key: "I", code: "KeyI" },
  J: { keyCode: 74, key: "J", code: "KeyJ" },
  K: { keyCode: 75, key: "K", code: "KeyK" },
  L: { keyCode: 76, key: "L", code: "KeyL" },
  M: { keyCode: 77, key: "M", code: "KeyM" },
  N: { keyCode: 78, key: "N", code: "KeyN" },
  O: { keyCode: 79, key: "O", code: "KeyO" },
  P: { keyCode: 80, key: "P", code: "KeyP" },
  Q: { keyCode: 81, key: "Q", code: "KeyQ" },
  R: { keyCode: 82, key: "R", code: "KeyR" },
  S: { keyCode: 83, key: "S", code: "KeyS" },
  T: { keyCode: 84, key: "T", code: "KeyT" },
  U: { keyCode: 85, key: "U", code: "KeyU" },
  V: { keyCode: 86, key: "V", code: "KeyV" },
  W: { keyCode: 87, key: "W", code: "KeyW" },
  X: { keyCode: 88, key: "X", code: "KeyX" },
  Y: { keyCode: 89, key: "Y", code: "KeyY" },
  Z: { keyCode: 90, key: "Z", code: "KeyZ" },
  ":": { keyCode: 186, key: ":", code: "Semicolon" },
  "<": { keyCode: 188, key: "<", code: "Comma" },
  _: { keyCode: 189, key: "_", code: "Minus" },
  ">": { keyCode: 190, key: ">", code: "Period" },
  "?": { keyCode: 191, key: "?", code: "Slash" },
  "~": { keyCode: 192, key: "~", code: "Backquote" },
  "{": { keyCode: 219, key: "{", code: "BracketLeft" },
  "|": { keyCode: 220, key: "|", code: "Backslash" },
  "}": { keyCode: 221, key: "}", code: "BracketRight" },
  '"': { keyCode: 222, key: '"', code: "Quote" },
  SoftLeft: { key: "SoftLeft", code: "SoftLeft", location: 4 },
  SoftRight: { key: "SoftRight", code: "SoftRight", location: 4 },
  Camera: { keyCode: 44, key: "Camera", code: "Camera", location: 4 },
  Call: { key: "Call", code: "Call", location: 4 },
  EndCall: { keyCode: 95, key: "EndCall", code: "EndCall", location: 4 },
  VolumeDown: {
    keyCode: 182,
    key: "VolumeDown",
    code: "VolumeDown",
    location: 4
  },
  VolumeUp: { keyCode: 183, key: "VolumeUp", code: "VolumeUp", location: 4 }
};

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Input.js
var CDPKeyboard = class extends Keyboard {
  #client;
  #pressedKeys = /* @__PURE__ */ new Set();
  /**
   * @internal
   */
  _modifiers = 0;
  /**
   * @internal
   */
  constructor(client) {
    super();
    this.#client = client;
  }
  async down(key, options = {
    text: void 0,
    commands: []
  }) {
    const description = this.#keyDescriptionForString(key);
    const autoRepeat = this.#pressedKeys.has(description.code);
    this.#pressedKeys.add(description.code);
    this._modifiers |= this.#modifierBit(description.key);
    const text = options.text === void 0 ? description.text : options.text;
    await this.#client.send("Input.dispatchKeyEvent", {
      type: text ? "keyDown" : "rawKeyDown",
      modifiers: this._modifiers,
      windowsVirtualKeyCode: description.keyCode,
      code: description.code,
      key: description.key,
      text,
      unmodifiedText: text,
      autoRepeat,
      location: description.location,
      isKeypad: description.location === 3,
      commands: options.commands
    });
  }
  #modifierBit(key) {
    if (key === "Alt") {
      return 1;
    }
    if (key === "Control") {
      return 2;
    }
    if (key === "Meta") {
      return 4;
    }
    if (key === "Shift") {
      return 8;
    }
    return 0;
  }
  #keyDescriptionForString(keyString) {
    const shift = this._modifiers & 8;
    const description = {
      key: "",
      keyCode: 0,
      code: "",
      text: "",
      location: 0
    };
    const definition = _keyDefinitions[keyString];
    assert(definition, `Unknown key: "${keyString}"`);
    if (definition.key) {
      description.key = definition.key;
    }
    if (shift && definition.shiftKey) {
      description.key = definition.shiftKey;
    }
    if (definition.keyCode) {
      description.keyCode = definition.keyCode;
    }
    if (shift && definition.shiftKeyCode) {
      description.keyCode = definition.shiftKeyCode;
    }
    if (definition.code) {
      description.code = definition.code;
    }
    if (definition.location) {
      description.location = definition.location;
    }
    if (description.key.length === 1) {
      description.text = description.key;
    }
    if (definition.text) {
      description.text = definition.text;
    }
    if (shift && definition.shiftText) {
      description.text = definition.shiftText;
    }
    if (this._modifiers & ~8) {
      description.text = "";
    }
    return description;
  }
  async up(key) {
    const description = this.#keyDescriptionForString(key);
    this._modifiers &= ~this.#modifierBit(description.key);
    this.#pressedKeys.delete(description.code);
    await this.#client.send("Input.dispatchKeyEvent", {
      type: "keyUp",
      modifiers: this._modifiers,
      key: description.key,
      windowsVirtualKeyCode: description.keyCode,
      code: description.code,
      location: description.location
    });
  }
  async sendCharacter(char) {
    await this.#client.send("Input.insertText", { text: char });
  }
  charIsKey(char) {
    return !!_keyDefinitions[char];
  }
  async type(text, options = {}) {
    const delay = options.delay || void 0;
    for (const char of text) {
      if (this.charIsKey(char)) {
        await this.press(char, { delay });
      } else {
        if (delay) {
          await new Promise((f2) => {
            return setTimeout(f2, delay);
          });
        }
        await this.sendCharacter(char);
      }
    }
  }
  async press(key, options = {}) {
    const { delay = null } = options;
    await this.down(key, options);
    if (delay) {
      await new Promise((f2) => {
        return setTimeout(f2, options.delay);
      });
    }
    await this.up(key);
  }
};
__name(CDPKeyboard, "CDPKeyboard");
var getFlag = /* @__PURE__ */ __name((button) => {
  switch (button) {
    case MouseButton.Left:
      return 1;
    case MouseButton.Right:
      return 2;
    case MouseButton.Middle:
      return 4;
    case MouseButton.Back:
      return 8;
    case MouseButton.Forward:
      return 16;
  }
}, "getFlag");
var getButtonFromPressedButtons = /* @__PURE__ */ __name((buttons) => {
  if (buttons & 1) {
    return MouseButton.Left;
  } else if (buttons & 2) {
    return MouseButton.Right;
  } else if (buttons & 4) {
    return MouseButton.Middle;
  } else if (buttons & 8) {
    return MouseButton.Back;
  } else if (buttons & 16) {
    return MouseButton.Forward;
  }
  return "none";
}, "getButtonFromPressedButtons");
var CDPMouse = class extends Mouse {
  #client;
  #keyboard;
  /**
   * @internal
   */
  constructor(client, keyboard) {
    super();
    this.#client = client;
    this.#keyboard = keyboard;
  }
  #_state = {
    position: { x: 0, y: 0 },
    buttons: 0
  };
  get #state() {
    return Object.assign({ ...this.#_state }, ...this.#transactions);
  }
  // Transactions can run in parallel, so we store each of thme in this array.
  #transactions = [];
  #createTransaction() {
    const transaction = {};
    this.#transactions.push(transaction);
    const popTransaction = /* @__PURE__ */ __name(() => {
      this.#transactions.splice(this.#transactions.indexOf(transaction), 1);
    }, "popTransaction");
    return {
      update: (updates) => {
        Object.assign(transaction, updates);
      },
      commit: () => {
        this.#_state = { ...this.#_state, ...transaction };
        popTransaction();
      },
      rollback: popTransaction
    };
  }
  /**
   * This is a shortcut for a typical update, commit/rollback lifecycle based on
   * the error of the action.
   */
  async #withTransaction(action) {
    const { update, commit, rollback } = this.#createTransaction();
    try {
      await action(update);
      commit();
    } catch (error) {
      rollback();
      throw error;
    }
  }
  async reset() {
    const actions = [];
    for (const [flag, button] of [
      [1, MouseButton.Left],
      [4, MouseButton.Middle],
      [2, MouseButton.Right],
      [16, MouseButton.Forward],
      [8, MouseButton.Back]
    ]) {
      if (this.#state.buttons & flag) {
        actions.push(this.up({ button }));
      }
    }
    if (this.#state.position.x !== 0 || this.#state.position.y !== 0) {
      actions.push(this.move(0, 0));
    }
    await Promise.all(actions);
  }
  async move(x3, y3, options = {}) {
    const { steps = 1 } = options;
    const from = this.#state.position;
    const to = { x: x3, y: y3 };
    for (let i2 = 1; i2 <= steps; i2++) {
      await this.#withTransaction((updateState) => {
        updateState({
          position: {
            x: from.x + (to.x - from.x) * (i2 / steps),
            y: from.y + (to.y - from.y) * (i2 / steps)
          }
        });
        const { buttons, position } = this.#state;
        return this.#client.send("Input.dispatchMouseEvent", {
          type: "mouseMoved",
          modifiers: this.#keyboard._modifiers,
          buttons,
          button: getButtonFromPressedButtons(buttons),
          ...position
        });
      });
    }
  }
  async down(options = {}) {
    const { button = MouseButton.Left, clickCount = 1 } = options;
    const flag = getFlag(button);
    if (!flag) {
      throw new Error(`Unsupported mouse button: ${button}`);
    }
    if (this.#state.buttons & flag) {
      throw new Error(`'${button}' is already pressed.`);
    }
    await this.#withTransaction((updateState) => {
      updateState({
        buttons: this.#state.buttons | flag
      });
      const { buttons, position } = this.#state;
      return this.#client.send("Input.dispatchMouseEvent", {
        type: "mousePressed",
        modifiers: this.#keyboard._modifiers,
        clickCount,
        buttons,
        button,
        ...position
      });
    });
  }
  async up(options = {}) {
    const { button = MouseButton.Left, clickCount = 1 } = options;
    const flag = getFlag(button);
    if (!flag) {
      throw new Error(`Unsupported mouse button: ${button}`);
    }
    if (!(this.#state.buttons & flag)) {
      throw new Error(`'${button}' is not pressed.`);
    }
    await this.#withTransaction((updateState) => {
      updateState({
        buttons: this.#state.buttons & ~flag
      });
      const { buttons, position } = this.#state;
      return this.#client.send("Input.dispatchMouseEvent", {
        type: "mouseReleased",
        modifiers: this.#keyboard._modifiers,
        clickCount,
        buttons,
        button,
        ...position
      });
    });
  }
  async click(x3, y3, options = {}) {
    const { delay, count = 1, clickCount = count } = options;
    if (count < 1) {
      throw new Error("Click must occur a positive number of times.");
    }
    const actions = [this.move(x3, y3)];
    if (clickCount === count) {
      for (let i2 = 1; i2 < count; ++i2) {
        actions.push(this.down({ ...options, clickCount: i2 }), this.up({ ...options, clickCount: i2 }));
      }
    }
    actions.push(this.down({ ...options, clickCount }));
    if (typeof delay === "number") {
      await Promise.all(actions);
      actions.length = 0;
      await new Promise((resolve) => {
        setTimeout(resolve, delay);
      });
    }
    actions.push(this.up({ ...options, clickCount }));
    await Promise.all(actions);
  }
  async wheel(options = {}) {
    const { deltaX = 0, deltaY = 0 } = options;
    const { position, buttons } = this.#state;
    await this.#client.send("Input.dispatchMouseEvent", {
      type: "mouseWheel",
      pointerType: "mouse",
      modifiers: this.#keyboard._modifiers,
      deltaY,
      deltaX,
      buttons,
      ...position
    });
  }
  async drag(start, target) {
    const promise = new Promise((resolve) => {
      this.#client.once("Input.dragIntercepted", (event) => {
        return resolve(event.data);
      });
    });
    await this.move(start.x, start.y);
    await this.down();
    await this.move(target.x, target.y);
    return promise;
  }
  async dragEnter(target, data) {
    await this.#client.send("Input.dispatchDragEvent", {
      type: "dragEnter",
      x: target.x,
      y: target.y,
      modifiers: this.#keyboard._modifiers,
      data
    });
  }
  async dragOver(target, data) {
    await this.#client.send("Input.dispatchDragEvent", {
      type: "dragOver",
      x: target.x,
      y: target.y,
      modifiers: this.#keyboard._modifiers,
      data
    });
  }
  async drop(target, data) {
    await this.#client.send("Input.dispatchDragEvent", {
      type: "drop",
      x: target.x,
      y: target.y,
      modifiers: this.#keyboard._modifiers,
      data
    });
  }
  async dragAndDrop(start, target, options = {}) {
    const { delay = null } = options;
    const data = await this.drag(start, target);
    await this.dragEnter(target, data);
    await this.dragOver(target, data);
    if (delay) {
      await new Promise((resolve) => {
        return setTimeout(resolve, delay);
      });
    }
    await this.drop(target, data);
    await this.up();
  }
};
__name(CDPMouse, "CDPMouse");
var CDPTouchscreen = class extends Touchscreen {
  #client;
  #keyboard;
  /**
   * @internal
   */
  constructor(client, keyboard) {
    super();
    this.#client = client;
    this.#keyboard = keyboard;
  }
  async tap(x3, y3) {
    await this.touchStart(x3, y3);
    await this.touchEnd();
  }
  async touchStart(x3, y3) {
    const touchPoints = [{ x: Math.round(x3), y: Math.round(y3) }];
    await this.#client.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints,
      modifiers: this.#keyboard._modifiers
    });
  }
  async touchMove(x3, y3) {
    const movePoints = [{ x: Math.round(x3), y: Math.round(y3) }];
    await this.#client.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: movePoints,
      modifiers: this.#keyboard._modifiers
    });
  }
  async touchEnd() {
    await this.#client.send("Input.dispatchTouchEvent", {
      type: "touchEnd",
      touchPoints: [],
      modifiers: this.#keyboard._modifiers
    });
  }
};
__name(CDPTouchscreen, "CDPTouchscreen");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/TimeoutSettings.js
init_checked_fetch();
init_modules_watch_stub();
var DEFAULT_TIMEOUT = 3e4;
var TimeoutSettings = class {
  #defaultTimeout;
  #defaultNavigationTimeout;
  constructor() {
    this.#defaultTimeout = null;
    this.#defaultNavigationTimeout = null;
  }
  setDefaultTimeout(timeout) {
    this.#defaultTimeout = timeout;
  }
  setDefaultNavigationTimeout(timeout) {
    this.#defaultNavigationTimeout = timeout;
  }
  navigationTimeout() {
    if (this.#defaultNavigationTimeout !== null) {
      return this.#defaultNavigationTimeout;
    }
    if (this.#defaultTimeout !== null) {
      return this.#defaultTimeout;
    }
    return DEFAULT_TIMEOUT;
  }
  timeout() {
    if (this.#defaultTimeout !== null) {
      return this.#defaultTimeout;
    }
    return DEFAULT_TIMEOUT;
  }
};
__name(TimeoutSettings, "TimeoutSettings");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Tracing.js
init_checked_fetch();
init_modules_watch_stub();
var Tracing = class {
  #client;
  #recording = false;
  #path;
  /**
   * @internal
   */
  constructor(client) {
    this.#client = client;
  }
  /**
   * Starts a trace for the current page.
   * @remarks
   * Only one trace can be active at a time per browser.
   *
   * @param options - Optional `TracingOptions`.
   */
  async start(options = {}) {
    assert(!this.#recording, "Cannot start recording trace while already recording trace.");
    const defaultCategories = [
      "-*",
      "devtools.timeline",
      "v8.execute",
      "disabled-by-default-devtools.timeline",
      "disabled-by-default-devtools.timeline.frame",
      "toplevel",
      "blink.console",
      "blink.user_timing",
      "latencyInfo",
      "disabled-by-default-devtools.timeline.stack",
      "disabled-by-default-v8.cpu_profiler"
    ];
    const { path, screenshots = false, categories = defaultCategories } = options;
    if (screenshots) {
      categories.push("disabled-by-default-devtools.screenshot");
    }
    const excludedCategories = categories.filter((cat) => {
      return cat.startsWith("-");
    }).map((cat) => {
      return cat.slice(1);
    });
    const includedCategories = categories.filter((cat) => {
      return !cat.startsWith("-");
    });
    this.#path = path;
    this.#recording = true;
    await this.#client.send("Tracing.start", {
      transferMode: "ReturnAsStream",
      traceConfig: {
        excludedCategories,
        includedCategories
      }
    });
  }
  /**
   * Stops a trace started with the `start` method.
   * @returns Promise which resolves to buffer with trace data.
   */
  async stop() {
    const contentDeferred = Deferred.create();
    this.#client.once("Tracing.tracingComplete", async (event) => {
      try {
        const readable = await getReadableFromProtocolStream(this.#client, event.stream);
        const buffer = await getReadableAsBuffer(readable, this.#path);
        contentDeferred.resolve(buffer ?? void 0);
      } catch (error) {
        if (isErrorLike(error)) {
          contentDeferred.reject(error);
        } else {
          contentDeferred.reject(new Error(`Unknown error: ${error}`));
        }
      }
    });
    await this.#client.send("Tracing.end");
    this.#recording = false;
    return contentDeferred.valueOrThrow();
  }
};
__name(Tracing, "Tracing");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/WebWorker.js
init_checked_fetch();
init_modules_watch_stub();
var WebWorker = class extends EventEmitter {
  #executionContext = Deferred.create();
  #client;
  #url;
  /**
   * @internal
   */
  constructor(client, url, consoleAPICalled, exceptionThrown) {
    super();
    this.#client = client;
    this.#url = url;
    this.#client.once("Runtime.executionContextCreated", async (event) => {
      const context = new ExecutionContext(client, event.context);
      this.#executionContext.resolve(context);
    });
    this.#client.on("Runtime.consoleAPICalled", async (event) => {
      try {
        const context = await this.#executionContext.valueOrThrow();
        return consoleAPICalled(event.type, event.args.map((object) => {
          return new CDPJSHandle(context, object);
        }), event.stackTrace);
      } catch (err) {
        debugError(err);
      }
    });
    this.#client.on("Runtime.exceptionThrown", (exception) => {
      return exceptionThrown(exception.exceptionDetails);
    });
    this.#client.send("Runtime.enable").catch(debugError);
  }
  /**
   * @internal
   */
  async executionContext() {
    return this.#executionContext.valueOrThrow();
  }
  /**
   * The URL of this web worker.
   */
  url() {
    return this.#url;
  }
  /**
   * The CDP session client the WebWorker belongs to.
   */
  get client() {
    return this.#client;
  }
  /**
   * If the function passed to the `worker.evaluate` returns a Promise, then
   * `worker.evaluate` would wait for the promise to resolve and return its
   * value. If the function passed to the `worker.evaluate` returns a
   * non-serializable value, then `worker.evaluate` resolves to `undefined`.
   * DevTools Protocol also supports transferring some additional values that
   * are not serializable by `JSON`: `-0`, `NaN`, `Infinity`, `-Infinity`, and
   * bigint literals.
   * Shortcut for `await worker.executionContext()).evaluate(pageFunction, ...args)`.
   *
   * @param pageFunction - Function to be evaluated in the worker context.
   * @param args - Arguments to pass to `pageFunction`.
   * @returns Promise which resolves to the return value of `pageFunction`.
   */
  async evaluate(pageFunction, ...args) {
    pageFunction = withSourcePuppeteerURLIfNone(this.evaluate.name, pageFunction);
    const context = await this.#executionContext.valueOrThrow();
    return context.evaluate(pageFunction, ...args);
  }
  /**
   * The only difference between `worker.evaluate` and `worker.evaluateHandle`
   * is that `worker.evaluateHandle` returns in-page object (JSHandle). If the
   * function passed to the `worker.evaluateHandle` returns a `Promise`, then
   * `worker.evaluateHandle` would wait for the promise to resolve and return
   * its value. Shortcut for
   * `await worker.executionContext()).evaluateHandle(pageFunction, ...args)`
   *
   * @param pageFunction - Function to be evaluated in the page context.
   * @param args - Arguments to pass to `pageFunction`.
   * @returns Promise which resolves to the return value of `pageFunction`.
   */
  async evaluateHandle(pageFunction, ...args) {
    pageFunction = withSourcePuppeteerURLIfNone(this.evaluateHandle.name, pageFunction);
    const context = await this.#executionContext.valueOrThrow();
    return context.evaluateHandle(pageFunction, ...args);
  }
};
__name(WebWorker, "WebWorker");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Page.js
var CDPPage = class extends Page {
  /**
   * @internal
   */
  static async _create(client, target, ignoreHTTPSErrors, defaultViewport, screenshotTaskQueue) {
    const page = new CDPPage(client, target, ignoreHTTPSErrors, screenshotTaskQueue);
    await page.#initialize();
    if (defaultViewport) {
      try {
        await page.setViewport(defaultViewport);
      } catch (err) {
        if (isErrorLike(err) && isTargetClosedError(err)) {
          debugError(err);
        } else {
          throw err;
        }
      }
    }
    return page;
  }
  #closed = false;
  #client;
  #target;
  #keyboard;
  #mouse;
  #timeoutSettings = new TimeoutSettings();
  #touchscreen;
  #accessibility;
  #frameManager;
  #emulationManager;
  #tracing;
  #bindings = /* @__PURE__ */ new Map();
  #exposedFunctions = /* @__PURE__ */ new Map();
  #coverage;
  #viewport;
  #screenshotTaskQueue;
  #workers = /* @__PURE__ */ new Map();
  #fileChooserDeferreds = /* @__PURE__ */ new Set();
  #sessionCloseDeferred = Deferred.create();
  #serviceWorkerBypassed = false;
  #userDragInterceptionEnabled = false;
  #frameManagerHandlers = /* @__PURE__ */ new Map([
    [
      FrameManagerEmittedEvents.FrameAttached,
      (event) => {
        return this.emit("frameattached", event);
      }
    ],
    [
      FrameManagerEmittedEvents.FrameDetached,
      (event) => {
        return this.emit("framedetached", event);
      }
    ],
    [
      FrameManagerEmittedEvents.FrameNavigated,
      (event) => {
        return this.emit("framenavigated", event);
      }
    ]
  ]);
  #networkManagerHandlers = /* @__PURE__ */ new Map([
    [
      NetworkManagerEmittedEvents.Request,
      (event) => {
        return this.emit("request", event);
      }
    ],
    [
      NetworkManagerEmittedEvents.RequestServedFromCache,
      (event) => {
        return this.emit("requestservedfromcache", event);
      }
    ],
    [
      NetworkManagerEmittedEvents.Response,
      (event) => {
        return this.emit("response", event);
      }
    ],
    [
      NetworkManagerEmittedEvents.RequestFailed,
      (event) => {
        return this.emit("requestfailed", event);
      }
    ],
    [
      NetworkManagerEmittedEvents.RequestFinished,
      (event) => {
        return this.emit("requestfinished", event);
      }
    ]
  ]);
  #sessionHandlers = /* @__PURE__ */ new Map([
    [
      CDPSessionEmittedEvents.Disconnected,
      () => {
        return this.#sessionCloseDeferred.resolve(new TargetCloseError("Target closed"));
      }
    ],
    [
      "Page.domContentEventFired",
      () => {
        return this.emit(
          "domcontentloaded"
          /* PageEmittedEvents.DOMContentLoaded */
        );
      }
    ],
    [
      "Page.loadEventFired",
      () => {
        return this.emit(
          "load"
          /* PageEmittedEvents.Load */
        );
      }
    ],
    [
      "Page.loadEventFired",
      () => {
        return this.emit(
          "load"
          /* PageEmittedEvents.Load */
        );
      }
    ],
    [
      "Runtime.consoleAPICalled",
      (event) => {
        return this.#onConsoleAPI(event);
      }
    ],
    [
      "Runtime.bindingCalled",
      (event) => {
        return this.#onBindingCalled(event);
      }
    ],
    [
      "Page.javascriptDialogOpening",
      (event) => {
        return this.#onDialog(event);
      }
    ],
    [
      "Runtime.exceptionThrown",
      (exception) => {
        return this.#handleException(exception.exceptionDetails);
      }
    ],
    [
      "Inspector.targetCrashed",
      () => {
        return this.#onTargetCrashed();
      }
    ],
    [
      "Performance.metrics",
      (event) => {
        return this.#emitMetrics(event);
      }
    ],
    [
      "Log.entryAdded",
      (event) => {
        return this.#onLogEntryAdded(event);
      }
    ],
    [
      "Page.fileChooserOpened",
      (event) => {
        return this.#onFileChooser(event);
      }
    ]
  ]);
  /**
   * @internal
   */
  constructor(client, target, ignoreHTTPSErrors, screenshotTaskQueue) {
    super();
    this.#client = client;
    this.#target = target;
    this.#keyboard = new CDPKeyboard(client);
    this.#mouse = new CDPMouse(client, this.#keyboard);
    this.#touchscreen = new CDPTouchscreen(client, this.#keyboard);
    this.#accessibility = new Accessibility(client);
    this.#frameManager = new FrameManager(client, this, ignoreHTTPSErrors, this.#timeoutSettings);
    this.#emulationManager = new EmulationManager(client);
    this.#tracing = new Tracing(client);
    this.#coverage = new Coverage(client);
    this.#screenshotTaskQueue = screenshotTaskQueue;
    this.#viewport = null;
    this.#setupEventListeners();
  }
  #setupEventListeners() {
    this.#target._targetManager().addTargetInterceptor(this.#client, this.#onAttachedToTarget);
    this.#target._targetManager().on("targetGone", this.#onDetachedFromTarget);
    for (const [eventName, handler] of this.#frameManagerHandlers) {
      this.#frameManager.on(eventName, handler);
    }
    for (const [eventName, handler] of this.#networkManagerHandlers) {
      this.#frameManager.networkManager.on(eventName, handler);
    }
    for (const [eventName, handler] of this.#sessionHandlers) {
      this.#client.on(eventName, handler);
    }
    this.#target._isClosedDeferred.valueOrThrow().then(() => {
      this.#target._targetManager().removeTargetInterceptor(this.#client, this.#onAttachedToTarget);
      this.#target._targetManager().off("targetGone", this.#onDetachedFromTarget);
      this.emit(
        "close"
        /* PageEmittedEvents.Close */
      );
      this.#closed = true;
    }).catch(debugError);
  }
  #onDetachedFromTarget = (target) => {
    const sessionId = target._session()?.id();
    const worker = this.#workers.get(sessionId);
    if (!worker) {
      return;
    }
    this.#workers.delete(sessionId);
    this.emit("workerdestroyed", worker);
  };
  #onAttachedToTarget = (createdTarget) => {
    this.#frameManager.onAttachedToTarget(createdTarget);
    if (createdTarget._getTargetInfo().type === "worker") {
      const session = createdTarget._session();
      assert(session);
      const worker = new WebWorker(session, createdTarget.url(), this.#addConsoleMessage.bind(this), this.#handleException.bind(this));
      this.#workers.set(session.id(), worker);
      this.emit("workercreated", worker);
    }
    if (createdTarget._session()) {
      this.#target._targetManager().addTargetInterceptor(createdTarget._session(), this.#onAttachedToTarget);
    }
  };
  async #initialize() {
    try {
      await Promise.all([
        this.#frameManager.initialize(),
        this.#client.send("Performance.enable"),
        this.#client.send("Log.enable")
      ]);
    } catch (err) {
      if (isErrorLike(err) && isTargetClosedError(err)) {
        debugError(err);
      } else {
        throw err;
      }
    }
  }
  async #onFileChooser(event) {
    if (!this.#fileChooserDeferreds.size) {
      return;
    }
    const frame = this.#frameManager.frame(event.frameId);
    assert(frame, "This should never happen.");
    const handle = await frame.worlds[MAIN_WORLD].adoptBackendNode(event.backendNodeId);
    const fileChooser = new FileChooser(handle, event);
    for (const promise of this.#fileChooserDeferreds) {
      promise.resolve(fileChooser);
    }
    this.#fileChooserDeferreds.clear();
  }
  /**
   * @internal
   */
  _client() {
    return this.#client;
  }
  isServiceWorkerBypassed() {
    return this.#serviceWorkerBypassed;
  }
  isDragInterceptionEnabled() {
    return this.#userDragInterceptionEnabled;
  }
  isJavaScriptEnabled() {
    return this.#emulationManager.javascriptEnabled;
  }
  waitForFileChooser(options = {}) {
    const needsEnable = this.#fileChooserDeferreds.size === 0;
    const { timeout = this.#timeoutSettings.timeout() } = options;
    const deferred = Deferred.create({
      message: `Waiting for \`FileChooser\` failed: ${timeout}ms exceeded`,
      timeout
    });
    this.#fileChooserDeferreds.add(deferred);
    let enablePromise;
    if (needsEnable) {
      enablePromise = this.#client.send("Page.setInterceptFileChooserDialog", {
        enabled: true
      });
    }
    return Promise.all([deferred.valueOrThrow(), enablePromise]).then(([result]) => {
      return result;
    }).catch((error) => {
      this.#fileChooserDeferreds.delete(deferred);
      throw error;
    });
  }
  async setGeolocation(options) {
    return await this.#emulationManager.setGeolocation(options);
  }
  target() {
    return this.#target;
  }
  browser() {
    return this.#target.browser();
  }
  browserContext() {
    return this.#target.browserContext();
  }
  #onTargetCrashed() {
    this.emit("error", new Error("Page crashed!"));
  }
  #onLogEntryAdded(event) {
    const { level, text, args, source: source2, url, lineNumber } = event.entry;
    if (args) {
      args.map((arg) => {
        return releaseObject(this.#client, arg);
      });
    }
    if (source2 !== "worker") {
      this.emit("console", new ConsoleMessage(level, text, [], [{ url, lineNumber }]));
    }
  }
  mainFrame() {
    return this.#frameManager.mainFrame();
  }
  get keyboard() {
    return this.#keyboard;
  }
  get touchscreen() {
    return this.#touchscreen;
  }
  get coverage() {
    return this.#coverage;
  }
  get tracing() {
    return this.#tracing;
  }
  get accessibility() {
    return this.#accessibility;
  }
  frames() {
    return this.#frameManager.frames();
  }
  workers() {
    return Array.from(this.#workers.values());
  }
  async setRequestInterception(value) {
    return this.#frameManager.networkManager.setRequestInterception(value);
  }
  async setBypassServiceWorker(bypass) {
    this.#serviceWorkerBypassed = bypass;
    return this.#client.send("Network.setBypassServiceWorker", { bypass });
  }
  async setDragInterception(enabled) {
    this.#userDragInterceptionEnabled = enabled;
    return this.#client.send("Input.setInterceptDrags", { enabled });
  }
  setOfflineMode(enabled) {
    return this.#frameManager.networkManager.setOfflineMode(enabled);
  }
  emulateNetworkConditions(networkConditions) {
    return this.#frameManager.networkManager.emulateNetworkConditions(networkConditions);
  }
  setDefaultNavigationTimeout(timeout) {
    this.#timeoutSettings.setDefaultNavigationTimeout(timeout);
  }
  setDefaultTimeout(timeout) {
    this.#timeoutSettings.setDefaultTimeout(timeout);
  }
  getDefaultTimeout() {
    return this.#timeoutSettings.timeout();
  }
  async evaluateHandle(pageFunction, ...args) {
    pageFunction = withSourcePuppeteerURLIfNone(this.evaluateHandle.name, pageFunction);
    const context = await this.mainFrame().executionContext();
    return context.evaluateHandle(pageFunction, ...args);
  }
  async queryObjects(prototypeHandle) {
    const context = await this.mainFrame().executionContext();
    assert(!prototypeHandle.disposed, "Prototype JSHandle is disposed!");
    assert(prototypeHandle.id, "Prototype JSHandle must not be referencing primitive value");
    const response = await context._client.send("Runtime.queryObjects", {
      prototypeObjectId: prototypeHandle.id
    });
    return createJSHandle(context, response.objects);
  }
  async cookies(...urls2) {
    const originalCookies = (await this.#client.send("Network.getCookies", {
      urls: urls2.length ? urls2 : [this.url()]
    })).cookies;
    const unsupportedCookieAttributes = ["priority"];
    const filterUnsupportedAttributes = /* @__PURE__ */ __name((cookie) => {
      for (const attr of unsupportedCookieAttributes) {
        delete cookie[attr];
      }
      return cookie;
    }, "filterUnsupportedAttributes");
    return originalCookies.map(filterUnsupportedAttributes);
  }
  async deleteCookie(...cookies) {
    const pageURL = this.url();
    for (const cookie of cookies) {
      const item = Object.assign({}, cookie);
      if (!cookie.url && pageURL.startsWith("http")) {
        item.url = pageURL;
      }
      await this.#client.send("Network.deleteCookies", item);
    }
  }
  async setCookie(...cookies) {
    const pageURL = this.url();
    const startsWithHTTP = pageURL.startsWith("http");
    const items = cookies.map((cookie) => {
      const item = Object.assign({}, cookie);
      if (!item.url && startsWithHTTP) {
        item.url = pageURL;
      }
      assert(item.url !== "about:blank", `Blank page can not have cookie "${item.name}"`);
      assert(!String.prototype.startsWith.call(item.url || "", "data:"), `Data URL page can not have cookie "${item.name}"`);
      return item;
    });
    await this.deleteCookie(...items);
    if (items.length) {
      await this.#client.send("Network.setCookies", { cookies: items });
    }
  }
  async exposeFunction(name, pptrFunction) {
    if (this.#bindings.has(name)) {
      throw new Error(`Failed to add page binding with name ${name}: window['${name}'] already exists!`);
    }
    let binding;
    switch (typeof pptrFunction) {
      case "function":
        binding = new Binding(name, pptrFunction);
        break;
      default:
        binding = new Binding(name, pptrFunction.default);
        break;
    }
    this.#bindings.set(name, binding);
    const expression = pageBindingInitString("exposedFun", name);
    await this.#client.send("Runtime.addBinding", { name });
    const { identifier } = await this.#client.send("Page.addScriptToEvaluateOnNewDocument", {
      source: expression
    });
    this.#exposedFunctions.set(name, identifier);
    await Promise.all(this.frames().map((frame) => {
      return frame.evaluate(expression).catch(debugError);
    }));
  }
  async removeExposedFunction(name) {
    const exposedFun = this.#exposedFunctions.get(name);
    if (!exposedFun) {
      throw new Error(`Failed to remove page binding with name ${name}: window['${name}'] does not exists!`);
    }
    await this.#client.send("Runtime.removeBinding", { name });
    await this.removeScriptToEvaluateOnNewDocument(exposedFun);
    await Promise.all(this.frames().map((frame) => {
      return frame.evaluate((name2) => {
        globalThis[name2] = void 0;
      }, name).catch(debugError);
    }));
    this.#exposedFunctions.delete(name);
    this.#bindings.delete(name);
  }
  async authenticate(credentials) {
    return this.#frameManager.networkManager.authenticate(credentials);
  }
  async setExtraHTTPHeaders(headers) {
    return this.#frameManager.networkManager.setExtraHTTPHeaders(headers);
  }
  async setUserAgent(userAgent, userAgentMetadata) {
    return this.#frameManager.networkManager.setUserAgent(userAgent, userAgentMetadata);
  }
  async metrics() {
    const response = await this.#client.send("Performance.getMetrics");
    return this.#buildMetricsObject(response.metrics);
  }
  #emitMetrics(event) {
    this.emit("metrics", {
      title: event.title,
      metrics: this.#buildMetricsObject(event.metrics)
    });
  }
  #buildMetricsObject(metrics) {
    const result = {};
    for (const metric of metrics || []) {
      if (supportedMetrics.has(metric.name)) {
        result[metric.name] = metric.value;
      }
    }
    return result;
  }
  #handleException(exceptionDetails) {
    this.emit("pageerror", createClientError(exceptionDetails));
  }
  async #onConsoleAPI(event) {
    if (event.executionContextId === 0) {
      return;
    }
    const context = this.#frameManager.getExecutionContextById(event.executionContextId, this.#client);
    if (!context) {
      debugError(new Error(`ExecutionContext not found for a console message: ${JSON.stringify(event)}`));
      return;
    }
    const values = event.args.map((arg) => {
      return createJSHandle(context, arg);
    });
    this.#addConsoleMessage(event.type, values, event.stackTrace);
  }
  async #onBindingCalled(event) {
    let payload;
    try {
      payload = JSON.parse(event.payload);
    } catch {
      return;
    }
    const { type, name, seq, args, isTrivial } = payload;
    if (type !== "exposedFun") {
      return;
    }
    const context = this.#frameManager.executionContextById(event.executionContextId, this.#client);
    if (!context) {
      return;
    }
    const binding = this.#bindings.get(name);
    await binding?.run(context, seq, args, isTrivial);
  }
  #addConsoleMessage(eventType, args, stackTrace) {
    if (!this.listenerCount(
      "console"
      /* PageEmittedEvents.Console */
    )) {
      args.forEach((arg) => {
        return arg.dispose();
      });
      return;
    }
    const textTokens = [];
    for (const arg of args) {
      const remoteObject = arg.remoteObject();
      if (remoteObject.objectId) {
        textTokens.push(arg.toString());
      } else {
        textTokens.push(valueFromRemoteObject(remoteObject));
      }
    }
    const stackTraceLocations = [];
    if (stackTrace) {
      for (const callFrame of stackTrace.callFrames) {
        stackTraceLocations.push({
          url: callFrame.url,
          lineNumber: callFrame.lineNumber,
          columnNumber: callFrame.columnNumber
        });
      }
    }
    const message = new ConsoleMessage(eventType, textTokens.join(" "), args, stackTraceLocations);
    this.emit("console", message);
  }
  #onDialog(event) {
    const type = validateDialogType(event.type);
    const dialog = new CDPDialog(this.#client, type, event.message, event.defaultPrompt);
    this.emit("dialog", dialog);
  }
  url() {
    return this.mainFrame().url();
  }
  async content() {
    return await this.mainFrame().content();
  }
  async setContent(html, options = {}) {
    await this.mainFrame().setContent(html, options);
  }
  async goto(url, options = {}) {
    return await this.mainFrame().goto(url, options);
  }
  async reload(options) {
    const result = await Promise.all([
      this.waitForNavigation(options),
      this.#client.send("Page.reload")
    ]);
    return result[0];
  }
  async createCDPSession() {
    return await this.target().createCDPSession();
  }
  async waitForRequest(urlOrPredicate, options = {}) {
    const { timeout = this.#timeoutSettings.timeout() } = options;
    return waitForEvent(this.#frameManager.networkManager, NetworkManagerEmittedEvents.Request, async (request) => {
      if (isString(urlOrPredicate)) {
        return urlOrPredicate === request.url();
      }
      if (typeof urlOrPredicate === "function") {
        return !!await urlOrPredicate(request);
      }
      return false;
    }, timeout, this.#sessionCloseDeferred.valueOrThrow());
  }
  async waitForResponse(urlOrPredicate, options = {}) {
    const { timeout = this.#timeoutSettings.timeout() } = options;
    return waitForEvent(this.#frameManager.networkManager, NetworkManagerEmittedEvents.Response, async (response) => {
      if (isString(urlOrPredicate)) {
        return urlOrPredicate === response.url();
      }
      if (typeof urlOrPredicate === "function") {
        return !!await urlOrPredicate(response);
      }
      return false;
    }, timeout, this.#sessionCloseDeferred.valueOrThrow());
  }
  async waitForNetworkIdle(options = {}) {
    const { idleTime = 500, timeout = this.#timeoutSettings.timeout() } = options;
    await this._waitForNetworkIdle(this.#frameManager.networkManager, idleTime, timeout, this.#sessionCloseDeferred);
  }
  async waitForFrame(urlOrPredicate, options = {}) {
    const { timeout = this.#timeoutSettings.timeout() } = options;
    let predicate;
    if (isString(urlOrPredicate)) {
      predicate = /* @__PURE__ */ __name((frame) => {
        return Promise.resolve(urlOrPredicate === frame.url());
      }, "predicate");
    } else {
      predicate = /* @__PURE__ */ __name((frame) => {
        const value = urlOrPredicate(frame);
        if (typeof value === "boolean") {
          return Promise.resolve(value);
        }
        return value;
      }, "predicate");
    }
    const eventRace = Deferred.race([
      waitForEvent(this.#frameManager, FrameManagerEmittedEvents.FrameAttached, predicate, timeout, this.#sessionCloseDeferred.valueOrThrow()),
      waitForEvent(this.#frameManager, FrameManagerEmittedEvents.FrameNavigated, predicate, timeout, this.#sessionCloseDeferred.valueOrThrow()),
      ...this.frames().map(async (frame) => {
        if (await predicate(frame)) {
          return frame;
        }
        return await eventRace;
      })
    ]);
    return eventRace;
  }
  async goBack(options = {}) {
    return this.#go(-1, options);
  }
  async goForward(options = {}) {
    return this.#go(1, options);
  }
  async #go(delta, options) {
    const history2 = await this.#client.send("Page.getNavigationHistory");
    const entry = history2.entries[history2.currentIndex + delta];
    if (!entry) {
      return null;
    }
    const result = await Promise.all([
      this.waitForNavigation(options),
      this.#client.send("Page.navigateToHistoryEntry", { entryId: entry.id })
    ]);
    return result[0];
  }
  async bringToFront() {
    await this.#client.send("Page.bringToFront");
  }
  async setJavaScriptEnabled(enabled) {
    return await this.#emulationManager.setJavaScriptEnabled(enabled);
  }
  async setBypassCSP(enabled) {
    await this.#client.send("Page.setBypassCSP", { enabled });
  }
  async emulateMediaType(type) {
    return await this.#emulationManager.emulateMediaType(type);
  }
  async emulateCPUThrottling(factor) {
    return await this.#emulationManager.emulateCPUThrottling(factor);
  }
  async emulateMediaFeatures(features) {
    return await this.#emulationManager.emulateMediaFeatures(features);
  }
  async emulateTimezone(timezoneId) {
    return await this.#emulationManager.emulateTimezone(timezoneId);
  }
  async emulateIdleState(overrides) {
    return await this.#emulationManager.emulateIdleState(overrides);
  }
  async emulateVisionDeficiency(type) {
    return await this.#emulationManager.emulateVisionDeficiency(type);
  }
  async setViewport(viewport) {
    const needsReload = await this.#emulationManager.emulateViewport(viewport);
    this.#viewport = viewport;
    if (needsReload) {
      await this.reload();
    }
  }
  viewport() {
    return this.#viewport;
  }
  async evaluate(pageFunction, ...args) {
    pageFunction = withSourcePuppeteerURLIfNone(this.evaluate.name, pageFunction);
    return this.mainFrame().evaluate(pageFunction, ...args);
  }
  async evaluateOnNewDocument(pageFunction, ...args) {
    const source2 = evaluationString(pageFunction, ...args);
    const { identifier } = await this.#client.send("Page.addScriptToEvaluateOnNewDocument", {
      source: source2
    });
    return { identifier };
  }
  async removeScriptToEvaluateOnNewDocument(identifier) {
    await this.#client.send("Page.removeScriptToEvaluateOnNewDocument", {
      identifier
    });
  }
  async setCacheEnabled(enabled = true) {
    await this.#frameManager.networkManager.setCacheEnabled(enabled);
  }
  async screenshot(options = {}) {
    let screenshotType = "png";
    if (options.type) {
      screenshotType = options.type;
    } else if (options.path) {
      const filePath = options.path;
      const extension = filePath.slice(filePath.lastIndexOf(".") + 1).toLowerCase();
      switch (extension) {
        case "png":
          screenshotType = "png";
          break;
        case "jpeg":
        case "jpg":
          screenshotType = "jpeg";
          break;
        case "webp":
          screenshotType = "webp";
          break;
        default:
          throw new Error(`Unsupported screenshot type for extension \`.${extension}\``);
      }
    }
    if (options.quality) {
      assert(screenshotType === "jpeg" || screenshotType === "webp", "options.quality is unsupported for the " + screenshotType + " screenshots");
      assert(typeof options.quality === "number", "Expected options.quality to be a number but found " + typeof options.quality);
      assert(Number.isInteger(options.quality), "Expected options.quality to be an integer");
      assert(options.quality >= 0 && options.quality <= 100, "Expected options.quality to be between 0 and 100 (inclusive), got " + options.quality);
    }
    assert(!options.clip || !options.fullPage, "options.clip and options.fullPage are exclusive");
    if (options.clip) {
      assert(typeof options.clip.x === "number", "Expected options.clip.x to be a number but found " + typeof options.clip.x);
      assert(typeof options.clip.y === "number", "Expected options.clip.y to be a number but found " + typeof options.clip.y);
      assert(typeof options.clip.width === "number", "Expected options.clip.width to be a number but found " + typeof options.clip.width);
      assert(typeof options.clip.height === "number", "Expected options.clip.height to be a number but found " + typeof options.clip.height);
      assert(options.clip.width !== 0, "Expected options.clip.width not to be 0.");
      assert(options.clip.height !== 0, "Expected options.clip.height not to be 0.");
    }
    return this.#screenshotTaskQueue.postTask(() => {
      return this.#screenshotTask(screenshotType, options);
    });
  }
  async #screenshotTask(format, options = {}) {
    await this.#client.send("Target.activateTarget", {
      targetId: this.#target._targetId
    });
    let clip = options.clip ? processClip(options.clip) : void 0;
    let captureBeyondViewport = options.captureBeyondViewport ?? true;
    const fromSurface = options.fromSurface;
    if (options.fullPage) {
      clip = void 0;
      if (!captureBeyondViewport) {
        const metrics = await this.#client.send("Page.getLayoutMetrics");
        const { width, height } = metrics.cssContentSize || metrics.contentSize;
        const { isMobile = false, deviceScaleFactor = 1, isLandscape = false } = this.#viewport || {};
        const screenOrientation = isLandscape ? { angle: 90, type: "landscapePrimary" } : { angle: 0, type: "portraitPrimary" };
        await this.#client.send("Emulation.setDeviceMetricsOverride", {
          mobile: isMobile,
          width,
          height,
          deviceScaleFactor,
          screenOrientation
        });
      }
    } else if (!clip) {
      captureBeyondViewport = false;
    }
    const shouldSetDefaultBackground = options.omitBackground && (format === "png" || format === "webp");
    if (shouldSetDefaultBackground) {
      await this.#emulationManager.setTransparentBackgroundColor();
    }
    const result = await this.#client.send("Page.captureScreenshot", {
      format,
      optimizeForSpeed: options.optimizeForSpeed,
      quality: options.quality,
      clip: clip && {
        ...clip,
        scale: clip.scale ?? 1
      },
      captureBeyondViewport,
      fromSurface
    });
    if (shouldSetDefaultBackground) {
      await this.#emulationManager.resetDefaultBackgroundColor();
    }
    if (options.fullPage && this.#viewport) {
      await this.setViewport(this.#viewport);
    }
    if (options.encoding === "base64") {
      return result.data;
    }
    const buffer = Buffer4.from(result.data, "base64");
    await this._maybeWriteBufferToFile(options.path, buffer);
    return buffer;
    function processClip(clip2) {
      const x3 = Math.round(clip2.x);
      const y3 = Math.round(clip2.y);
      const width = Math.round(clip2.width + clip2.x - x3);
      const height = Math.round(clip2.height + clip2.y - y3);
      return { x: x3, y: y3, width, height, scale: clip2.scale };
    }
    __name(processClip, "processClip");
  }
  async createPDFStream(options = {}) {
    const { landscape, displayHeaderFooter, headerTemplate, footerTemplate, printBackground, scale, width: paperWidth, height: paperHeight, margin, pageRanges, preferCSSPageSize, omitBackground, timeout } = this._getPDFOptions(options);
    if (omitBackground) {
      await this.#emulationManager.setTransparentBackgroundColor();
    }
    const printCommandPromise = this.#client.send("Page.printToPDF", {
      transferMode: "ReturnAsStream",
      landscape,
      displayHeaderFooter,
      headerTemplate,
      footerTemplate,
      printBackground,
      scale,
      paperWidth,
      paperHeight,
      marginTop: margin.top,
      marginBottom: margin.bottom,
      marginLeft: margin.left,
      marginRight: margin.right,
      pageRanges,
      preferCSSPageSize
    });
    const result = await waitWithTimeout(printCommandPromise, "Page.printToPDF", timeout);
    if (omitBackground) {
      await this.#emulationManager.resetDefaultBackgroundColor();
    }
    assert(result.stream, "`stream` is missing from `Page.printToPDF");
    return getReadableFromProtocolStream(this.#client, result.stream);
  }
  async pdf(options = {}) {
    const { path = void 0 } = options;
    const readable = await this.createPDFStream(options);
    const buffer = await getReadableAsBuffer(readable, path);
    assert(buffer, "Could not create buffer");
    return buffer;
  }
  async title() {
    return this.mainFrame().title();
  }
  async close(options = { runBeforeUnload: void 0 }) {
    const connection = this.#client.connection();
    assert(connection, "Protocol error: Connection closed. Most likely the page has been closed.");
    const runBeforeUnload = !!options.runBeforeUnload;
    if (runBeforeUnload) {
      await this.#client.send("Page.close");
    } else {
      await connection.send("Target.closeTarget", {
        targetId: this.#target._targetId
      });
      await this.#target._isClosedDeferred.valueOrThrow();
    }
  }
  isClosed() {
    return this.#closed;
  }
  get mouse() {
    return this.#mouse;
  }
  /**
   * This method is typically coupled with an action that triggers a device
   * request from an api such as WebBluetooth.
   *
   * :::caution
   *
   * This must be called before the device request is made. It will not return a
   * currently active device prompt.
   *
   * :::
   *
   * @example
   *
   * ```ts
   * const [devicePrompt] = Promise.all([
   *   page.waitForDevicePrompt(),
   *   page.click('#connect-bluetooth'),
   * ]);
   * await devicePrompt.select(
   *   await devicePrompt.waitForDevice(({name}) => name.includes('My Device'))
   * );
   * ```
   */
  waitForDevicePrompt(options = {}) {
    return this.mainFrame().waitForDevicePrompt(options);
  }
};
__name(CDPPage, "CDPPage");
var supportedMetrics = /* @__PURE__ */ new Set([
  "Timestamp",
  "Documents",
  "Frames",
  "JSEventListeners",
  "Nodes",
  "LayoutCount",
  "RecalcStyleCount",
  "LayoutDuration",
  "RecalcStyleDuration",
  "ScriptDuration",
  "TaskDuration",
  "JSHeapUsedSize",
  "JSHeapTotalSize"
]);

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Target.js
var InitializationStatus;
(function(InitializationStatus2) {
  InitializationStatus2["SUCCESS"] = "success";
  InitializationStatus2["ABORTED"] = "aborted";
})(InitializationStatus || (InitializationStatus = {}));
var CDPTarget = class extends Target {
  #browserContext;
  #session;
  #targetInfo;
  #targetManager;
  #sessionFactory;
  /**
   * @internal
   */
  _initializedDeferred = Deferred.create();
  /**
   * @internal
   */
  _isClosedDeferred = Deferred.create();
  /**
   * @internal
   */
  _targetId;
  /**
   * To initialize the target for use, call initialize.
   *
   * @internal
   */
  constructor(targetInfo, session, browserContext, targetManager, sessionFactory) {
    super();
    this.#session = session;
    this.#targetManager = targetManager;
    this.#targetInfo = targetInfo;
    this.#browserContext = browserContext;
    this._targetId = targetInfo.targetId;
    this.#sessionFactory = sessionFactory;
  }
  /**
   * @internal
   */
  _session() {
    return this.#session;
  }
  /**
   * @internal
   */
  _sessionFactory() {
    if (!this.#sessionFactory) {
      throw new Error("sessionFactory is not initialized");
    }
    return this.#sessionFactory;
  }
  createCDPSession() {
    if (!this.#sessionFactory) {
      throw new Error("sessionFactory is not initialized");
    }
    return this.#sessionFactory(false);
  }
  url() {
    return this.#targetInfo.url;
  }
  type() {
    const type = this.#targetInfo.type;
    switch (type) {
      case "page":
        return TargetType.PAGE;
      case "background_page":
        return TargetType.BACKGROUND_PAGE;
      case "service_worker":
        return TargetType.SERVICE_WORKER;
      case "shared_worker":
        return TargetType.SHARED_WORKER;
      case "browser":
        return TargetType.BROWSER;
      case "webview":
        return TargetType.WEBVIEW;
      default:
        return TargetType.OTHER;
    }
  }
  /**
   * @internal
   */
  _targetManager() {
    if (!this.#targetManager) {
      throw new Error("targetManager is not initialized");
    }
    return this.#targetManager;
  }
  /**
   * @internal
   */
  _getTargetInfo() {
    return this.#targetInfo;
  }
  browser() {
    if (!this.#browserContext) {
      throw new Error("browserContext is not initialised");
    }
    return this.#browserContext.browser();
  }
  browserContext() {
    if (!this.#browserContext) {
      throw new Error("browserContext is not initialised");
    }
    return this.#browserContext;
  }
  opener() {
    const { openerId } = this.#targetInfo;
    if (!openerId) {
      return;
    }
    return this.browser()._targets.get(openerId);
  }
  /**
   * @internal
   */
  _targetInfoChanged(targetInfo) {
    this.#targetInfo = targetInfo;
    this._checkIfInitialized();
  }
  /**
   * @internal
   */
  _initialize() {
    this._initializedDeferred.resolve(InitializationStatus.SUCCESS);
  }
  /**
   * @internal
   */
  _checkIfInitialized() {
    if (!this._initializedDeferred.resolved()) {
      this._initializedDeferred.resolve(InitializationStatus.SUCCESS);
    }
  }
};
__name(CDPTarget, "CDPTarget");
var PageTarget = class extends CDPTarget {
  #defaultViewport;
  pagePromise;
  #screenshotTaskQueue;
  #ignoreHTTPSErrors;
  /**
   * @internal
   */
  constructor(targetInfo, session, browserContext, targetManager, sessionFactory, ignoreHTTPSErrors, defaultViewport, screenshotTaskQueue) {
    super(targetInfo, session, browserContext, targetManager, sessionFactory);
    this.#ignoreHTTPSErrors = ignoreHTTPSErrors;
    this.#defaultViewport = defaultViewport ?? void 0;
    this.#screenshotTaskQueue = screenshotTaskQueue;
  }
  _initialize() {
    this._initializedDeferred.valueOrThrow().then(async (result) => {
      if (result === InitializationStatus.ABORTED) {
        return;
      }
      const opener = this.opener();
      if (!(opener instanceof PageTarget)) {
        return;
      }
      if (!opener || !opener.pagePromise || this.type() !== "page") {
        return true;
      }
      const openerPage = await opener.pagePromise;
      if (!openerPage.listenerCount(
        "popup"
        /* PageEmittedEvents.Popup */
      )) {
        return true;
      }
      const popupPage = await this.page();
      openerPage.emit("popup", popupPage);
      return true;
    }).catch(debugError);
    this._checkIfInitialized();
  }
  async page() {
    if (!this.pagePromise) {
      const session = this._session();
      this.pagePromise = (session ? Promise.resolve(session) : this._sessionFactory()(
        /* isAutoAttachEmulated=*/
        false
      )).then((client) => {
        return CDPPage._create(client, this, this.#ignoreHTTPSErrors, this.#defaultViewport ?? null, this.#screenshotTaskQueue);
      });
    }
    return await this.pagePromise ?? null;
  }
  _checkIfInitialized() {
    if (this._initializedDeferred.resolved()) {
      return;
    }
    if (this._getTargetInfo().url !== "") {
      this._initializedDeferred.resolve(InitializationStatus.SUCCESS);
    }
  }
};
__name(PageTarget, "PageTarget");
var WorkerTarget = class extends CDPTarget {
  #workerPromise;
  async worker() {
    if (!this.#workerPromise) {
      const session = this._session();
      this.#workerPromise = (session ? Promise.resolve(session) : this._sessionFactory()(
        /* isAutoAttachEmulated=*/
        false
      )).then((client) => {
        return new WebWorker(
          client,
          this._getTargetInfo().url,
          () => {
          },
          () => {
          }
          /* exceptionThrown */
        );
      });
    }
    return this.#workerPromise;
  }
};
__name(WorkerTarget, "WorkerTarget");
var OtherTarget = class extends CDPTarget {
};
__name(OtherTarget, "OtherTarget");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/ChromeTargetManager.js
var ChromeTargetManager = class extends EventEmitter {
  #connection;
  /**
   * Keeps track of the following events: 'Target.targetCreated',
   * 'Target.targetDestroyed', 'Target.targetInfoChanged'.
   *
   * A target becomes discovered when 'Target.targetCreated' is received.
   * A target is removed from this map once 'Target.targetDestroyed' is
   * received.
   *
   * `targetFilterCallback` has no effect on this map.
   */
  #discoveredTargetsByTargetId = /* @__PURE__ */ new Map();
  /**
   * A target is added to this map once ChromeTargetManager has created
   * a Target and attached at least once to it.
   */
  #attachedTargetsByTargetId = /* @__PURE__ */ new Map();
  /**
   * Tracks which sessions attach to which target.
   */
  #attachedTargetsBySessionId = /* @__PURE__ */ new Map();
  /**
   * If a target was filtered out by `targetFilterCallback`, we still receive
   * events about it from CDP, but we don't forward them to the rest of Puppeteer.
   */
  #ignoredTargets = /* @__PURE__ */ new Set();
  #targetFilterCallback;
  #targetFactory;
  #targetInterceptors = /* @__PURE__ */ new WeakMap();
  #attachedToTargetListenersBySession = /* @__PURE__ */ new WeakMap();
  #detachedFromTargetListenersBySession = /* @__PURE__ */ new WeakMap();
  #initializeDeferred = Deferred.create();
  #targetsIdsForInit = /* @__PURE__ */ new Set();
  #waitForInitiallyDiscoveredTargets = true;
  constructor(connection, targetFactory, targetFilterCallback, waitForInitiallyDiscoveredTargets = true) {
    super();
    this.#connection = connection;
    this.#targetFilterCallback = targetFilterCallback;
    this.#targetFactory = targetFactory;
    this.#waitForInitiallyDiscoveredTargets = waitForInitiallyDiscoveredTargets;
    this.#connection.on("Target.targetCreated", this.#onTargetCreated);
    this.#connection.on("Target.targetDestroyed", this.#onTargetDestroyed);
    this.#connection.on("Target.targetInfoChanged", this.#onTargetInfoChanged);
    this.#connection.on("sessiondetached", this.#onSessionDetached);
    this.#setupAttachmentListeners(this.#connection);
    this.#connection.send("Target.setDiscoverTargets", {
      discover: true,
      filter: [{ type: "tab", exclude: true }, {}]
    }).then(this.#storeExistingTargetsForInit).catch(debugError);
  }
  #storeExistingTargetsForInit = () => {
    if (!this.#waitForInitiallyDiscoveredTargets) {
      return;
    }
    for (const [targetId, targetInfo] of this.#discoveredTargetsByTargetId.entries()) {
      const targetForFilter = new CDPTarget(targetInfo, void 0, void 0, this, void 0);
      if ((!this.#targetFilterCallback || this.#targetFilterCallback(targetForFilter)) && targetInfo.type !== "browser") {
        this.#targetsIdsForInit.add(targetId);
      }
    }
  };
  async initialize() {
    await this.#connection.send("Target.setAutoAttach", {
      waitForDebuggerOnStart: true,
      flatten: true,
      autoAttach: true
    });
    this.#finishInitializationIfReady();
    await this.#initializeDeferred.valueOrThrow();
  }
  dispose() {
    this.#connection.off("Target.targetCreated", this.#onTargetCreated);
    this.#connection.off("Target.targetDestroyed", this.#onTargetDestroyed);
    this.#connection.off("Target.targetInfoChanged", this.#onTargetInfoChanged);
    this.#connection.off("sessiondetached", this.#onSessionDetached);
    this.#removeAttachmentListeners(this.#connection);
  }
  getAvailableTargets() {
    return this.#attachedTargetsByTargetId;
  }
  addTargetInterceptor(session, interceptor) {
    const interceptors = this.#targetInterceptors.get(session) || [];
    interceptors.push(interceptor);
    this.#targetInterceptors.set(session, interceptors);
  }
  removeTargetInterceptor(client, interceptor) {
    const interceptors = this.#targetInterceptors.get(client) || [];
    this.#targetInterceptors.set(client, interceptors.filter((currentInterceptor) => {
      return currentInterceptor !== interceptor;
    }));
  }
  #setupAttachmentListeners(session) {
    const listener = /* @__PURE__ */ __name((event) => {
      return this.#onAttachedToTarget(session, event);
    }, "listener");
    assert(!this.#attachedToTargetListenersBySession.has(session));
    this.#attachedToTargetListenersBySession.set(session, listener);
    session.on("Target.attachedToTarget", listener);
    const detachedListener = /* @__PURE__ */ __name((event) => {
      return this.#onDetachedFromTarget(session, event);
    }, "detachedListener");
    assert(!this.#detachedFromTargetListenersBySession.has(session));
    this.#detachedFromTargetListenersBySession.set(session, detachedListener);
    session.on("Target.detachedFromTarget", detachedListener);
  }
  #removeAttachmentListeners(session) {
    if (this.#attachedToTargetListenersBySession.has(session)) {
      session.off("Target.attachedToTarget", this.#attachedToTargetListenersBySession.get(session));
      this.#attachedToTargetListenersBySession.delete(session);
    }
    if (this.#detachedFromTargetListenersBySession.has(session)) {
      session.off("Target.detachedFromTarget", this.#detachedFromTargetListenersBySession.get(session));
      this.#detachedFromTargetListenersBySession.delete(session);
    }
  }
  #onSessionDetached = (session) => {
    this.#removeAttachmentListeners(session);
    this.#targetInterceptors.delete(session);
  };
  #onTargetCreated = async (event) => {
    this.#discoveredTargetsByTargetId.set(event.targetInfo.targetId, event.targetInfo);
    this.emit("targetDiscovered", event.targetInfo);
    if (event.targetInfo.type === "browser" && event.targetInfo.attached) {
      if (this.#attachedTargetsByTargetId.has(event.targetInfo.targetId)) {
        return;
      }
      const target = this.#targetFactory(event.targetInfo, void 0);
      target._initialize();
      this.#attachedTargetsByTargetId.set(event.targetInfo.targetId, target);
    }
  };
  #onTargetDestroyed = (event) => {
    const targetInfo = this.#discoveredTargetsByTargetId.get(event.targetId);
    this.#discoveredTargetsByTargetId.delete(event.targetId);
    this.#finishInitializationIfReady(event.targetId);
    if (targetInfo?.type === "service_worker" && this.#attachedTargetsByTargetId.has(event.targetId)) {
      const target = this.#attachedTargetsByTargetId.get(event.targetId);
      this.emit("targetGone", target);
      this.#attachedTargetsByTargetId.delete(event.targetId);
    }
  };
  #onTargetInfoChanged = (event) => {
    this.#discoveredTargetsByTargetId.set(event.targetInfo.targetId, event.targetInfo);
    if (this.#ignoredTargets.has(event.targetInfo.targetId) || !this.#attachedTargetsByTargetId.has(event.targetInfo.targetId) || !event.targetInfo.attached) {
      return;
    }
    const target = this.#attachedTargetsByTargetId.get(event.targetInfo.targetId);
    if (!target) {
      return;
    }
    const previousURL = target.url();
    const wasInitialized = target._initializedDeferred.value() === InitializationStatus.SUCCESS;
    target._targetInfoChanged(event.targetInfo);
    if (wasInitialized && previousURL !== target.url()) {
      this.emit("targetChanged", {
        target,
        wasInitialized,
        previousURL
      });
    }
  };
  #onAttachedToTarget = async (parentSession, event) => {
    const targetInfo = event.targetInfo;
    const session = this.#connection.session(event.sessionId);
    if (!session) {
      throw new Error(`Session ${event.sessionId} was not created.`);
    }
    const silentDetach = /* @__PURE__ */ __name(async () => {
      await session.send("Runtime.runIfWaitingForDebugger").catch(debugError);
      await parentSession.send("Target.detachFromTarget", {
        sessionId: session.id()
      }).catch(debugError);
    }, "silentDetach");
    if (!this.#connection.isAutoAttached(targetInfo.targetId)) {
      return;
    }
    if (targetInfo.type === "service_worker" && this.#connection.isAutoAttached(targetInfo.targetId)) {
      this.#finishInitializationIfReady(targetInfo.targetId);
      await silentDetach();
      if (this.#attachedTargetsByTargetId.has(targetInfo.targetId)) {
        return;
      }
      const target2 = this.#targetFactory(targetInfo);
      target2._initialize();
      this.#attachedTargetsByTargetId.set(targetInfo.targetId, target2);
      this.emit("targetAvailable", target2);
      return;
    }
    const existingTarget = this.#attachedTargetsByTargetId.has(targetInfo.targetId);
    const target = existingTarget ? this.#attachedTargetsByTargetId.get(targetInfo.targetId) : this.#targetFactory(targetInfo, session);
    if (this.#targetFilterCallback && !this.#targetFilterCallback(target)) {
      this.#ignoredTargets.add(targetInfo.targetId);
      this.#finishInitializationIfReady(targetInfo.targetId);
      await silentDetach();
      return;
    }
    if (!existingTarget) {
      target._initialize();
    }
    this.#setupAttachmentListeners(session);
    if (existingTarget) {
      this.#attachedTargetsBySessionId.set(session.id(), this.#attachedTargetsByTargetId.get(targetInfo.targetId));
    } else {
      this.#attachedTargetsByTargetId.set(targetInfo.targetId, target);
      this.#attachedTargetsBySessionId.set(session.id(), target);
    }
    for (const interceptor of this.#targetInterceptors.get(parentSession) || []) {
      if (!(parentSession instanceof Connection)) {
        assert(this.#attachedTargetsBySessionId.has(parentSession.id()));
      }
      interceptor(target, parentSession instanceof Connection ? null : this.#attachedTargetsBySessionId.get(parentSession.id()));
    }
    this.#targetsIdsForInit.delete(target._targetId);
    if (!existingTarget) {
      this.emit("targetAvailable", target);
    }
    this.#finishInitializationIfReady();
    await Promise.all([
      session.send("Target.setAutoAttach", {
        waitForDebuggerOnStart: true,
        flatten: true,
        autoAttach: true
      }),
      session.send("Runtime.runIfWaitingForDebugger")
    ]).catch(debugError);
  };
  #finishInitializationIfReady(targetId) {
    targetId !== void 0 && this.#targetsIdsForInit.delete(targetId);
    if (this.#targetsIdsForInit.size === 0) {
      this.#initializeDeferred.resolve();
    }
  }
  #onDetachedFromTarget = (_parentSession, event) => {
    const target = this.#attachedTargetsBySessionId.get(event.sessionId);
    this.#attachedTargetsBySessionId.delete(event.sessionId);
    if (!target) {
      return;
    }
    this.#attachedTargetsByTargetId.delete(target._targetId);
    this.emit("targetGone", target);
  };
};
__name(ChromeTargetManager, "ChromeTargetManager");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/FirefoxTargetManager.js
init_checked_fetch();
init_modules_watch_stub();
var FirefoxTargetManager = class extends EventEmitter {
  #connection;
  /**
   * Keeps track of the following events: 'Target.targetCreated',
   * 'Target.targetDestroyed'.
   *
   * A target becomes discovered when 'Target.targetCreated' is received.
   * A target is removed from this map once 'Target.targetDestroyed' is
   * received.
   *
   * `targetFilterCallback` has no effect on this map.
   */
  #discoveredTargetsByTargetId = /* @__PURE__ */ new Map();
  /**
   * Keeps track of targets that were created via 'Target.targetCreated'
   * and which one are not filtered out by `targetFilterCallback`.
   *
   * The target is removed from here once it's been destroyed.
   */
  #availableTargetsByTargetId = /* @__PURE__ */ new Map();
  /**
   * Tracks which sessions attach to which target.
   */
  #availableTargetsBySessionId = /* @__PURE__ */ new Map();
  /**
   * If a target was filtered out by `targetFilterCallback`, we still receive
   * events about it from CDP, but we don't forward them to the rest of Puppeteer.
   */
  #ignoredTargets = /* @__PURE__ */ new Set();
  #targetFilterCallback;
  #targetFactory;
  #targetInterceptors = /* @__PURE__ */ new WeakMap();
  #attachedToTargetListenersBySession = /* @__PURE__ */ new WeakMap();
  #initializeDeferred = Deferred.create();
  #targetsIdsForInit = /* @__PURE__ */ new Set();
  constructor(connection, targetFactory, targetFilterCallback) {
    super();
    this.#connection = connection;
    this.#targetFilterCallback = targetFilterCallback;
    this.#targetFactory = targetFactory;
    this.#connection.on("Target.targetCreated", this.#onTargetCreated);
    this.#connection.on("Target.targetDestroyed", this.#onTargetDestroyed);
    this.#connection.on("sessiondetached", this.#onSessionDetached);
    this.setupAttachmentListeners(this.#connection);
  }
  addTargetInterceptor(client, interceptor) {
    const interceptors = this.#targetInterceptors.get(client) || [];
    interceptors.push(interceptor);
    this.#targetInterceptors.set(client, interceptors);
  }
  removeTargetInterceptor(client, interceptor) {
    const interceptors = this.#targetInterceptors.get(client) || [];
    this.#targetInterceptors.set(client, interceptors.filter((currentInterceptor) => {
      return currentInterceptor !== interceptor;
    }));
  }
  setupAttachmentListeners(session) {
    const listener = /* @__PURE__ */ __name((event) => {
      return this.#onAttachedToTarget(session, event);
    }, "listener");
    assert(!this.#attachedToTargetListenersBySession.has(session));
    this.#attachedToTargetListenersBySession.set(session, listener);
    session.on("Target.attachedToTarget", listener);
  }
  #onSessionDetached = (session) => {
    this.removeSessionListeners(session);
    this.#targetInterceptors.delete(session);
    this.#availableTargetsBySessionId.delete(session.id());
  };
  removeSessionListeners(session) {
    if (this.#attachedToTargetListenersBySession.has(session)) {
      session.off("Target.attachedToTarget", this.#attachedToTargetListenersBySession.get(session));
      this.#attachedToTargetListenersBySession.delete(session);
    }
  }
  getAvailableTargets() {
    return this.#availableTargetsByTargetId;
  }
  dispose() {
    this.#connection.off("Target.targetCreated", this.#onTargetCreated);
    this.#connection.off("Target.targetDestroyed", this.#onTargetDestroyed);
  }
  async initialize() {
    await this.#connection.send("Target.setDiscoverTargets", {
      discover: true,
      filter: [{}]
    });
    this.#targetsIdsForInit = new Set(this.#discoveredTargetsByTargetId.keys());
    await this.#initializeDeferred.valueOrThrow();
  }
  #onTargetCreated = async (event) => {
    if (this.#discoveredTargetsByTargetId.has(event.targetInfo.targetId)) {
      return;
    }
    this.#discoveredTargetsByTargetId.set(event.targetInfo.targetId, event.targetInfo);
    if (event.targetInfo.type === "browser" && event.targetInfo.attached) {
      const target2 = this.#targetFactory(event.targetInfo, void 0);
      target2._initialize();
      this.#availableTargetsByTargetId.set(event.targetInfo.targetId, target2);
      this.#finishInitializationIfReady(target2._targetId);
      return;
    }
    const target = this.#targetFactory(event.targetInfo, void 0);
    if (this.#targetFilterCallback && !this.#targetFilterCallback(target)) {
      this.#ignoredTargets.add(event.targetInfo.targetId);
      this.#finishInitializationIfReady(event.targetInfo.targetId);
      return;
    }
    target._initialize();
    this.#availableTargetsByTargetId.set(event.targetInfo.targetId, target);
    this.emit("targetAvailable", target);
    this.#finishInitializationIfReady(target._targetId);
  };
  #onTargetDestroyed = (event) => {
    this.#discoveredTargetsByTargetId.delete(event.targetId);
    this.#finishInitializationIfReady(event.targetId);
    const target = this.#availableTargetsByTargetId.get(event.targetId);
    if (target) {
      this.emit("targetGone", target);
      this.#availableTargetsByTargetId.delete(event.targetId);
    }
  };
  #onAttachedToTarget = async (parentSession, event) => {
    const targetInfo = event.targetInfo;
    const session = this.#connection.session(event.sessionId);
    if (!session) {
      throw new Error(`Session ${event.sessionId} was not created.`);
    }
    const target = this.#availableTargetsByTargetId.get(targetInfo.targetId);
    assert(target, `Target ${targetInfo.targetId} is missing`);
    this.setupAttachmentListeners(session);
    this.#availableTargetsBySessionId.set(session.id(), this.#availableTargetsByTargetId.get(targetInfo.targetId));
    for (const hook of this.#targetInterceptors.get(parentSession) || []) {
      if (!(parentSession instanceof Connection)) {
        assert(this.#availableTargetsBySessionId.has(parentSession.id()));
      }
      await hook(target, parentSession instanceof Connection ? null : this.#availableTargetsBySessionId.get(parentSession.id()));
    }
  };
  #finishInitializationIfReady(targetId) {
    this.#targetsIdsForInit.delete(targetId);
    if (this.#targetsIdsForInit.size === 0) {
      this.#initializeDeferred.resolve();
    }
  }
};
__name(FirefoxTargetManager, "FirefoxTargetManager");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/TaskQueue.js
init_checked_fetch();
init_modules_watch_stub();
var TaskQueue = class {
  #chain;
  constructor() {
    this.#chain = Promise.resolve();
  }
  postTask(task) {
    const result = this.#chain.then(task);
    this.#chain = result.then(() => {
      return void 0;
    }, () => {
      return void 0;
    });
    return result;
  }
};
__name(TaskQueue, "TaskQueue");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Browser.js
var CDPBrowser = class extends Browser {
  /**
   * @internal
   */
  static async _create(product, connection, contextIds, ignoreHTTPSErrors, defaultViewport, process2, closeCallback, targetFilterCallback, isPageTargetCallback, waitForInitiallyDiscoveredTargets = true, sessionId) {
    const browser = new CDPBrowser(product, connection, contextIds, ignoreHTTPSErrors, defaultViewport, process2, closeCallback, targetFilterCallback, isPageTargetCallback, waitForInitiallyDiscoveredTargets, sessionId);
    await browser._attach();
    return browser;
  }
  #ignoreHTTPSErrors;
  #defaultViewport;
  #process;
  #connection;
  #closeCallback;
  #targetFilterCallback;
  #isPageTargetCallback;
  #defaultContext;
  #contexts = /* @__PURE__ */ new Map();
  #screenshotTaskQueue;
  #targetManager;
  #sessionId;
  /**
   * @internal
   */
  get _targets() {
    return this.#targetManager.getAvailableTargets();
  }
  /**
   * @internal
   */
  constructor(product, connection, contextIds, ignoreHTTPSErrors, defaultViewport, process2, closeCallback, targetFilterCallback, isPageTargetCallback, waitForInitiallyDiscoveredTargets = true, sessionId) {
    super();
    product = product || "chrome";
    this.#ignoreHTTPSErrors = ignoreHTTPSErrors;
    this.#defaultViewport = defaultViewport;
    this.#process = process2;
    this.#screenshotTaskQueue = new TaskQueue();
    this.#connection = connection;
    this.#closeCallback = closeCallback || function() {
    };
    this.#targetFilterCallback = targetFilterCallback || (() => {
      return true;
    });
    this.#setIsPageTargetCallback(isPageTargetCallback);
    if (product === "firefox") {
      this.#targetManager = new FirefoxTargetManager(connection, this.#createTarget, this.#targetFilterCallback);
    } else {
      this.#targetManager = new ChromeTargetManager(connection, this.#createTarget, this.#targetFilterCallback, waitForInitiallyDiscoveredTargets);
    }
    this.#defaultContext = new CDPBrowserContext(this.#connection, this);
    for (const contextId of contextIds) {
      this.#contexts.set(contextId, new CDPBrowserContext(this.#connection, this, contextId));
    }
    this.#sessionId = sessionId || "unknown";
  }
  /**
   * Get the BISO session ID associated with this browser
   *
   * @public
   */
  sessionId() {
    return this.#sessionId;
  }
  #emitDisconnected = () => {
    this.emit(
      "disconnected"
      /* BrowserEmittedEvents.Disconnected */
    );
  };
  /**
   * @internal
   */
  async _attach() {
    this.#connection.on(ConnectionEmittedEvents.Disconnected, this.#emitDisconnected);
    this.#targetManager.on("targetAvailable", this.#onAttachedToTarget);
    this.#targetManager.on("targetGone", this.#onDetachedFromTarget);
    this.#targetManager.on("targetChanged", this.#onTargetChanged);
    this.#targetManager.on("targetDiscovered", this.#onTargetDiscovered);
    await this.#targetManager.initialize();
  }
  /**
   * @internal
   */
  _detach() {
    this.#connection.off(ConnectionEmittedEvents.Disconnected, this.#emitDisconnected);
    this.#targetManager.off("targetAvailable", this.#onAttachedToTarget);
    this.#targetManager.off("targetGone", this.#onDetachedFromTarget);
    this.#targetManager.off("targetChanged", this.#onTargetChanged);
    this.#targetManager.off("targetDiscovered", this.#onTargetDiscovered);
  }
  /**
   * The spawned browser process. Returns `null` if the browser instance was created with
   * {@link Puppeteer.connect}.
   */
  process() {
    return this.#process ?? null;
  }
  /**
   * @internal
   */
  _targetManager() {
    return this.#targetManager;
  }
  #setIsPageTargetCallback(isPageTargetCallback) {
    this.#isPageTargetCallback = isPageTargetCallback || ((target) => {
      return target.type() === "page" || target.type() === "background_page" || target.type() === "webview";
    });
  }
  /**
   * @internal
   */
  _getIsPageTargetCallback() {
    return this.#isPageTargetCallback;
  }
  /**
   * Creates a new incognito browser context. This won't share cookies/cache with other
   * browser contexts.
   *
   * @example
   *
   * ```ts
   * (async () => {
   *   const browser = await puppeteer.launch();
   *   // Create a new incognito browser context.
   *   const context = await browser.createIncognitoBrowserContext();
   *   // Create a new page in a pristine context.
   *   const page = await context.newPage();
   *   // Do stuff
   *   await page.goto('https://example.com');
   * })();
   * ```
   */
  async createIncognitoBrowserContext(options = {}) {
    const { proxyServer, proxyBypassList } = options;
    const { browserContextId } = await this.#connection.send("Target.createBrowserContext", {
      proxyServer,
      proxyBypassList: proxyBypassList && proxyBypassList.join(",")
    });
    const context = new CDPBrowserContext(this.#connection, this, browserContextId);
    this.#contexts.set(browserContextId, context);
    return context;
  }
  /**
   * Returns an array of all open browser contexts. In a newly created browser, this will
   * return a single instance of {@link BrowserContext}.
   */
  browserContexts() {
    return [this.#defaultContext, ...Array.from(this.#contexts.values())];
  }
  /**
   * Returns the default browser context. The default browser context cannot be closed.
   */
  defaultBrowserContext() {
    return this.#defaultContext;
  }
  /**
   * @internal
   */
  async _disposeContext(contextId) {
    if (!contextId) {
      return;
    }
    await this.#connection.send("Target.disposeBrowserContext", {
      browserContextId: contextId
    });
    this.#contexts.delete(contextId);
  }
  #createTarget = (targetInfo, session) => {
    const { browserContextId } = targetInfo;
    const context = browserContextId && this.#contexts.has(browserContextId) ? this.#contexts.get(browserContextId) : this.#defaultContext;
    if (!context) {
      throw new Error("Missing browser context");
    }
    const createSession = /* @__PURE__ */ __name((isAutoAttachEmulated) => {
      return this.#connection._createSession(targetInfo, isAutoAttachEmulated);
    }, "createSession");
    const targetForFilter = new OtherTarget(targetInfo, session, context, this.#targetManager, createSession);
    if (this.#isPageTargetCallback(targetForFilter)) {
      return new PageTarget(targetInfo, session, context, this.#targetManager, createSession, this.#ignoreHTTPSErrors, this.#defaultViewport ?? null, this.#screenshotTaskQueue);
    }
    if (targetInfo.type === "service_worker" || targetInfo.type === "shared_worker") {
      return new WorkerTarget(targetInfo, session, context, this.#targetManager, createSession);
    }
    return new OtherTarget(targetInfo, session, context, this.#targetManager, createSession);
  };
  #onAttachedToTarget = async (target) => {
    if (await target._initializedDeferred.valueOrThrow() === InitializationStatus.SUCCESS) {
      this.emit("targetcreated", target);
      target.browserContext().emit("targetcreated", target);
    }
  };
  #onDetachedFromTarget = async (target) => {
    target._initializedDeferred.resolve(InitializationStatus.ABORTED);
    target._isClosedDeferred.resolve();
    if (await target._initializedDeferred.valueOrThrow() === InitializationStatus.SUCCESS) {
      this.emit("targetdestroyed", target);
      target.browserContext().emit("targetdestroyed", target);
    }
  };
  #onTargetChanged = ({ target }) => {
    this.emit("targetchanged", target);
    target.browserContext().emit("targetchanged", target);
  };
  #onTargetDiscovered = (targetInfo) => {
    this.emit("targetdiscovered", targetInfo);
  };
  /**
   * The browser websocket endpoint which can be used as an argument to
   * {@link Puppeteer.connect}.
   *
   * @returns The Browser websocket url.
   *
   * @remarks
   *
   * The format is `ws://${host}:${port}/devtools/browser/<id>`.
   *
   * You can find the `webSocketDebuggerUrl` from `http://${host}:${port}/json/version`.
   * Learn more about the
   * {@link https://chromedevtools.github.io/devtools-protocol | devtools protocol} and
   * the {@link
   * https://chromedevtools.github.io/devtools-protocol/#how-do-i-access-the-browser-target
   * | browser endpoint}.
   */
  wsEndpoint() {
    return this.#connection.url();
  }
  /**
   * Promise which resolves to a new {@link Page} object. The Page is created in
   * a default browser context.
   */
  async newPage() {
    return this.#defaultContext.newPage();
  }
  /**
   * @internal
   */
  async _createPageInContext(contextId) {
    const { targetId } = await this.#connection.send("Target.createTarget", {
      url: "about:blank",
      browserContextId: contextId || void 0
    });
    const target = this.#targetManager.getAvailableTargets().get(targetId);
    if (!target) {
      throw new Error(`Missing target for page (id = ${targetId})`);
    }
    const initialized = await target._initializedDeferred.valueOrThrow() === InitializationStatus.SUCCESS;
    if (!initialized) {
      throw new Error(`Failed to create target for page (id = ${targetId})`);
    }
    const page = await target.page();
    if (!page) {
      throw new Error(`Failed to create a page for context (id = ${contextId})`);
    }
    return page;
  }
  /**
   * All active targets inside the Browser. In case of multiple browser contexts, returns
   * an array with all the targets in all browser contexts.
   */
  targets() {
    return Array.from(this.#targetManager.getAvailableTargets().values()).filter((target) => {
      return target._initializedDeferred.value() === InitializationStatus.SUCCESS;
    });
  }
  /**
   * The target associated with the browser.
   */
  target() {
    const browserTarget = this.targets().find((target) => {
      return target.type() === "browser";
    });
    if (!browserTarget) {
      throw new Error("Browser target is not found");
    }
    return browserTarget;
  }
  async version() {
    const version = await this.#getVersion();
    return version.product;
  }
  /**
   * The browser's original user agent. Pages can override the browser user agent with
   * {@link Page.setUserAgent}.
   */
  async userAgent() {
    const version = await this.#getVersion();
    return version.userAgent;
  }
  async close() {
    await this.#closeCallback.call(null);
    this.disconnect();
  }
  disconnect() {
    this.#targetManager.dispose();
    this.#connection.dispose();
    this._detach();
  }
  /**
   * Indicates that the browser is connected.
   */
  isConnected() {
    return !this.#connection._closed;
  }
  #getVersion() {
    return this.#connection.send("Browser.getVersion");
  }
};
__name(CDPBrowser, "CDPBrowser");
var CDPBrowserContext = class extends BrowserContext {
  #connection;
  #browser;
  #id;
  /**
   * @internal
   */
  constructor(connection, browser, contextId) {
    super();
    this.#connection = connection;
    this.#browser = browser;
    this.#id = contextId;
  }
  get id() {
    return this.#id;
  }
  /**
   * An array of all active targets inside the browser context.
   */
  targets() {
    return this.#browser.targets().filter((target) => {
      return target.browserContext() === this;
    });
  }
  /**
   * This searches for a target in this specific browser context.
   *
   * @example
   * An example of finding a target for a page opened via `window.open`:
   *
   * ```ts
   * await page.evaluate(() => window.open('https://www.example.com/'));
   * const newWindowTarget = await browserContext.waitForTarget(
   *   target => target.url() === 'https://www.example.com/'
   * );
   * ```
   *
   * @param predicate - A function to be run for every target
   * @param options - An object of options. Accepts a timeout,
   * which is the maximum wait time in milliseconds.
   * Pass `0` to disable the timeout. Defaults to 30 seconds.
   * @returns Promise which resolves to the first target found
   * that matches the `predicate` function.
   */
  waitForTarget(predicate, options = {}) {
    return this.#browser.waitForTarget((target) => {
      return target.browserContext() === this && predicate(target);
    }, options);
  }
  /**
   * An array of all pages inside the browser context.
   *
   * @returns Promise which resolves to an array of all open pages.
   * Non visible pages, such as `"background_page"`, will not be listed here.
   * You can find them using {@link CDPTarget.page | the target page}.
   */
  async pages() {
    const pages = await Promise.all(this.targets().filter((target) => {
      return target.type() === "page" || target.type() === "other" && this.#browser._getIsPageTargetCallback()?.(target);
    }).map((target) => {
      return target.page();
    }));
    return pages.filter((page) => {
      return !!page;
    });
  }
  /**
   * Returns whether BrowserContext is incognito.
   * The default browser context is the only non-incognito browser context.
   *
   * @remarks
   * The default browser context cannot be closed.
   */
  isIncognito() {
    return !!this.#id;
  }
  /**
   * @example
   *
   * ```ts
   * const context = browser.defaultBrowserContext();
   * await context.overridePermissions('https://html5demos.com', [
   *   'geolocation',
   * ]);
   * ```
   *
   * @param origin - The origin to grant permissions to, e.g. "https://example.com".
   * @param permissions - An array of permissions to grant.
   * All permissions that are not listed here will be automatically denied.
   */
  async overridePermissions(origin, permissions) {
    const protocolPermissions = permissions.map((permission) => {
      const protocolPermission = WEB_PERMISSION_TO_PROTOCOL_PERMISSION.get(permission);
      if (!protocolPermission) {
        throw new Error("Unknown permission: " + permission);
      }
      return protocolPermission;
    });
    await this.#connection.send("Browser.grantPermissions", {
      origin,
      browserContextId: this.#id || void 0,
      permissions: protocolPermissions
    });
  }
  /**
   * Clears all permission overrides for the browser context.
   *
   * @example
   *
   * ```ts
   * const context = browser.defaultBrowserContext();
   * context.overridePermissions('https://example.com', ['clipboard-read']);
   * // do stuff ..
   * context.clearPermissionOverrides();
   * ```
   */
  async clearPermissionOverrides() {
    await this.#connection.send("Browser.resetPermissions", {
      browserContextId: this.#id || void 0
    });
  }
  /**
   * Creates a new page in the browser context.
   */
  newPage() {
    return this.#browser._createPageInContext(this.#id);
  }
  /**
   * The browser this browser context belongs to.
   */
  browser() {
    return this.#browser;
  }
  /**
   * Closes the browser context. All the targets that belong to the browser context
   * will be closed.
   *
   * @remarks
   * Only incognito browser contexts can be closed.
   */
  async close() {
    assert(this.#id, "Non-incognito profiles cannot be closed!");
    await this.#browser._disposeContext(this.#id);
  }
};
__name(CDPBrowserContext, "CDPBrowserContext");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/fetch.js
init_checked_fetch();
init_modules_watch_stub();
var getFetch = /* @__PURE__ */ __name(async () => {
  return globalThis.fetch;
}, "getFetch");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/BrowserConnector.js
var getWebSocketTransportClass = /* @__PURE__ */ __name(async () => {
  return isNode ? (await Promise.resolve().then(() => (init_NodeWebSocketTransport(), NodeWebSocketTransport_exports))).NodeWebSocketTransport : (await Promise.resolve().then(() => (init_BrowserWebSocketTransport(), BrowserWebSocketTransport_exports))).BrowserWebSocketTransport;
}, "getWebSocketTransportClass");
async function _connectToCDPBrowser(options) {
  const { browserWSEndpoint, browserURL, ignoreHTTPSErrors = false, defaultViewport = { width: 800, height: 600 }, transport, headers = {}, slowMo = 0, targetFilter, _isPageTarget: isPageTarget, protocolTimeout } = options;
  assert(Number(!!browserWSEndpoint) + Number(!!browserURL) + Number(!!transport) === 1, "Exactly one of browserWSEndpoint, browserURL or transport must be passed to puppeteer.connect");
  let connection;
  if (transport) {
    connection = new Connection("", transport, slowMo, protocolTimeout);
  } else if (browserWSEndpoint) {
    const WebSocketClass = await getWebSocketTransportClass();
    const connectionTransport = await WebSocketClass.create(browserWSEndpoint, headers);
    connection = new Connection(browserWSEndpoint, connectionTransport, slowMo, protocolTimeout);
  } else if (browserURL) {
    const connectionURL = await getWSEndpoint(browserURL);
    const WebSocketClass = await getWebSocketTransportClass();
    const connectionTransport = await WebSocketClass.create(connectionURL);
    connection = new Connection(connectionURL, connectionTransport, slowMo, protocolTimeout);
  }
  const version = await connection.send("Browser.getVersion");
  const product = version.product.toLowerCase().includes("firefox") ? "firefox" : "chrome";
  const { browserContextIds } = await connection.send("Target.getBrowserContexts");
  const browser = await CDPBrowser._create(product || "chrome", connection, browserContextIds, ignoreHTTPSErrors, defaultViewport, void 0, () => {
    return connection.send("Browser.close").catch(debugError);
  }, targetFilter, isPageTarget);
  return browser;
}
__name(_connectToCDPBrowser, "_connectToCDPBrowser");
async function getWSEndpoint(browserURL) {
  const endpointURL = new URL("/json/version", browserURL);
  const fetch2 = await getFetch();
  try {
    const result = await fetch2(endpointURL.toString(), {
      method: "GET"
    });
    if (!result.ok) {
      throw new Error(`HTTP ${result.statusText}`);
    }
    const data = await result.json();
    return data.webSocketDebuggerUrl;
  } catch (error) {
    if (isErrorLike(error)) {
      error.message = `Failed to fetch browser webSocket URL from ${endpointURL}: ` + error.message;
    }
    throw error;
  }
}
__name(getWSEndpoint, "getWSEndpoint");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Puppeteer.js
var Puppeteer = class {
  /**
   * Registers a {@link CustomQueryHandler | custom query handler}.
   *
   * @remarks
   * After registration, the handler can be used everywhere where a selector is
   * expected by prepending the selection string with `<name>/`. The name is only
   * allowed to consist of lower- and upper case latin letters.
   *
   * @example
   *
   * ```
   * puppeteer.registerCustomQueryHandler('text', { … });
   * const aHandle = await page.$('text/…');
   * ```
   *
   * @param name - The name that the custom query handler will be registered
   * under.
   * @param queryHandler - The {@link CustomQueryHandler | custom query handler}
   * to register.
   *
   * @public
   */
  static registerCustomQueryHandler(name, queryHandler) {
    return this.customQueryHandlers.register(name, queryHandler);
  }
  /**
   * Unregisters a custom query handler for a given name.
   */
  static unregisterCustomQueryHandler(name) {
    return this.customQueryHandlers.unregister(name);
  }
  /**
   * Gets the names of all custom query handlers.
   */
  static customQueryHandlerNames() {
    return this.customQueryHandlers.names();
  }
  /**
   * Unregisters all custom query handlers.
   */
  static clearCustomQueryHandlers() {
    return this.customQueryHandlers.clear();
  }
  /**
   * @internal
   */
  _isPuppeteerCore;
  /**
   * @internal
   */
  _changedProduct = false;
  /**
   * @internal
   */
  constructor(settings) {
    this._isPuppeteerCore = settings.isPuppeteerCore;
    this.connect = this.connect.bind(this);
  }
  /**
   * This method attaches Puppeteer to an existing browser instance.
   *
   * @remarks
   *
   * @param options - Set of configurable options to set on the browser.
   * @returns Promise which resolves to browser instance.
   */
  connect(options) {
    return _connectToCDPBrowser(options);
  }
};
__name(Puppeteer, "Puppeteer");
/**
 * Operations for {@link CustomQueryHandler | custom query handlers}. See
 * {@link CustomQueryHandlerRegistry}.
 *
 * @internal
 */
__publicField(Puppeteer, "customQueryHandlers", customQueryHandlers);

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/cloudflare/utils.js
init_checked_fetch();
init_modules_watch_stub();
var DEFAULT_VIEWPORT = Object.freeze({ width: 800, height: 600 });
async function connectToCDPBrowser(connectionTransport, options) {
  const { ignoreHTTPSErrors = false, defaultViewport = DEFAULT_VIEWPORT, targetFilter, _isPageTarget: isPageTarget, slowMo = 0, protocolTimeout, sessionId = "unknown" } = options;
  const connection = new Connection("", connectionTransport, slowMo, protocolTimeout);
  const version = await connection.send("Browser.getVersion");
  const product = version.product.toLowerCase().includes("firefox") ? "firefox" : "chrome";
  const { browserContextIds } = await connection.send("Target.getBrowserContexts");
  const browser = await CDPBrowser._create(product || "chrome", connection, browserContextIds, ignoreHTTPSErrors, defaultViewport, void 0, () => {
    return connection.send("Browser.close").catch(console.log);
  }, targetFilter, isPageTarget, true, sessionId);
  return browser;
}
__name(connectToCDPBrowser, "connectToCDPBrowser");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/cloudflare/WorkersWebSocketTransport.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/cloudflare/chunking.js
init_checked_fetch();
init_modules_watch_stub();
var HEADER_SIZE = 4;
var MAX_MESSAGE_SIZE = 1048575;
var FIRST_CHUNK_DATA_SIZE = MAX_MESSAGE_SIZE - HEADER_SIZE;
var messageToChunks = /* @__PURE__ */ __name((data) => {
  const encoder = new TextEncoder();
  const encodedUint8Array = encoder.encode(data);
  const firstChunk = new Uint8Array(Math.min(MAX_MESSAGE_SIZE, HEADER_SIZE + encodedUint8Array.length));
  const view = new DataView(firstChunk.buffer);
  view.setUint32(0, encodedUint8Array.length, true);
  firstChunk.set(encodedUint8Array.slice(0, FIRST_CHUNK_DATA_SIZE), HEADER_SIZE);
  const chunks = [firstChunk];
  for (let i2 = FIRST_CHUNK_DATA_SIZE; i2 < data.length; i2 += MAX_MESSAGE_SIZE) {
    chunks.push(encodedUint8Array.slice(i2, i2 + MAX_MESSAGE_SIZE));
  }
  return chunks;
}, "messageToChunks");
var chunksToMessage = /* @__PURE__ */ __name((chunks, sessionid) => {
  if (chunks.length === 0) {
    return null;
  }
  const emptyBuffer = new Uint8Array(0);
  const firstChunk = chunks[0] || emptyBuffer;
  const view = new DataView(firstChunk.buffer);
  const expectedBytes = view.getUint32(0, true);
  let totalBytes = -HEADER_SIZE;
  for (let i2 = 0; i2 < chunks.length; ++i2) {
    const curChunk = chunks[i2] || emptyBuffer;
    totalBytes += curChunk.length;
    if (totalBytes > expectedBytes) {
      throw new Error(`Should have gotten the exact number of bytes but we got more.  SessionID: ${sessionid}`);
    }
    if (totalBytes === expectedBytes) {
      const chunksToCombine = chunks.splice(0, i2 + 1);
      chunksToCombine[0] = firstChunk.subarray(HEADER_SIZE);
      const combined = new Uint8Array(expectedBytes);
      let offset = 0;
      for (let j3 = 0; j3 <= i2; ++j3) {
        const chunk = chunksToCombine[j3] || emptyBuffer;
        combined.set(chunk, offset);
        offset += chunk.length;
      }
      const decoder = new TextDecoder();
      const message = decoder.decode(combined);
      return message;
    }
  }
  return null;
}, "chunksToMessage");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/cloudflare/WorkersWebSocketTransport.js
var FAKE_HOST = "https://fake.host";
var WorkersWebSocketTransport = class {
  ws;
  pingInterval;
  chunks = [];
  onmessage;
  onclose;
  sessionId;
  static async create(endpoint, sessionid) {
    const path = `${FAKE_HOST}/v1/connectDevtools?browser_session=${sessionid}`;
    const response = await endpoint.fetch(path, {
      headers: { Upgrade: "websocket" }
    });
    response.webSocket.accept();
    return new WorkersWebSocketTransport(response.webSocket, sessionid);
  }
  constructor(ws, sessionid) {
    this.pingInterval = setInterval(() => {
      return this.ws.send("ping");
    }, 1e3);
    this.ws = ws;
    this.sessionId = sessionid;
    this.ws.addEventListener("message", (event) => {
      this.chunks.push(new Uint8Array(event.data));
      const message = chunksToMessage(this.chunks, sessionid);
      if (message && this.onmessage) {
        this.onmessage(message);
      }
    });
    this.ws.addEventListener("close", () => {
      clearInterval(this.pingInterval);
      if (this.onclose) {
        this.onclose();
      }
    });
    this.ws.addEventListener("error", (e2) => {
      console.error(`Websocket error: SessionID: ${sessionid}`, e2);
      clearInterval(this.pingInterval);
    });
  }
  send(message) {
    for (const chunk of messageToChunks(message)) {
      this.ws.send(chunk);
    }
  }
  close() {
    clearInterval(this.pingInterval);
    this.ws.close();
  }
  toString() {
    return this.sessionId;
  }
};
__name(WorkersWebSocketTransport, "WorkersWebSocketTransport");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/cloudflare/PuppeteerWorkers.js
var FAKE_HOST2 = "https://fake.host";
var PuppeteerWorkers = class extends Puppeteer {
  constructor() {
    super({ isPuppeteerCore: false });
    this.connect = this.connect.bind(this);
    this.launch = this.launch.bind(this);
    this.sessions = this.sessions.bind(this);
    this.history = this.history.bind(this);
    this.limits = this.limits.bind(this);
  }
  /**
   * Launch a browser session.
   *
   * @param endpoint - Cloudflare worker binding
   * @returns a browser session or throws
   */
  async launch(endpoint, options) {
    let acquireUrl = `${FAKE_HOST2}/v1/acquire`;
    if (options?.keep_alive) {
      acquireUrl = `${acquireUrl}?keep_alive=${options.keep_alive}`;
    }
    const res = await endpoint.fetch(acquireUrl);
    const status = res.status;
    const text = await res.text();
    if (status !== 200) {
      throw new Error(`Unable to create new browser: code: ${status}: message: ${text}`);
    }
    const response = JSON.parse(text);
    return this.connect(endpoint, response.sessionId);
  }
  /**
   * Returns active sessions
   *
   * @remarks
   * Sessions with a connnectionId already have a worker connection established
   *
   * @param endpoint - Cloudflare worker binding
   * @returns List of active sessions
   */
  async sessions(endpoint) {
    const res = await endpoint.fetch(`${FAKE_HOST2}/v1/sessions`);
    const status = res.status;
    const text = await res.text();
    if (status !== 200) {
      throw new Error(`Unable to fetch new sessions: code: ${status}: message: ${text}`);
    }
    const data = JSON.parse(text);
    return data.sessions;
  }
  /**
   * Returns recent sessions (active and closed)
   *
   * @param endpoint - Cloudflare worker binding
   * @returns List of recent sessions (active and closed)
   */
  async history(endpoint) {
    const res = await endpoint.fetch(`${FAKE_HOST2}/v1/history`);
    const status = res.status;
    const text = await res.text();
    if (status !== 200) {
      throw new Error(`Unable to fetch account history: code: ${status}: message: ${text}`);
    }
    const data = JSON.parse(text);
    return data.history;
  }
  /**
   * Returns current limits
   *
   * @param endpoint - Cloudflare worker binding
   * @returns current limits
   */
  async limits(endpoint) {
    const res = await endpoint.fetch(`${FAKE_HOST2}/v1/limits`);
    const status = res.status;
    const text = await res.text();
    if (status !== 200) {
      throw new Error(`Unable to fetch account limits: code: ${status}: message: ${text}`);
    }
    const data = JSON.parse(text);
    return data;
  }
  /**
   * Establish a devtools connection to an existing session
   *
   * @param borwserWorker - BrowserWorker
   * @returns a browser instance
   */
  // @ts-expect-error we use a diferent input here and completly ignore the original class
  async connect(endpoint, sessionId) {
    try {
      const connectionTransport = await WorkersWebSocketTransport.create(endpoint, sessionId);
      return connectToCDPBrowser(connectionTransport, { sessionId });
    } catch (e2) {
      throw new Error(`Unable to connect to existing session ${sessionId} (it may still be in use or not ready yet) - retry or launch a new browser: ${e2}`);
    }
  }
};
__name(PuppeteerWorkers, "PuppeteerWorkers");

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/api/api.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/common.js
init_checked_fetch();
init_modules_watch_stub();
init_BrowserWebSocketTransport();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Configuration.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/ConnectionTransport.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Device.js
init_checked_fetch();
init_modules_watch_stub();
var knownDevices = [
  {
    name: "Blackberry PlayBook",
    userAgent: "Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.1.0; en-US) AppleWebKit/536.2+ (KHTML like Gecko) Version/7.2.1.0 Safari/536.2+",
    viewport: {
      width: 600,
      height: 1024,
      deviceScaleFactor: 1,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Blackberry PlayBook landscape",
    userAgent: "Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.1.0; en-US) AppleWebKit/536.2+ (KHTML like Gecko) Version/7.2.1.0 Safari/536.2+",
    viewport: {
      width: 1024,
      height: 600,
      deviceScaleFactor: 1,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "BlackBerry Z30",
    userAgent: "Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.2372 Mobile Safari/537.10+",
    viewport: {
      width: 360,
      height: 640,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "BlackBerry Z30 landscape",
    userAgent: "Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.2372 Mobile Safari/537.10+",
    viewport: {
      width: 640,
      height: 360,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Galaxy Note 3",
    userAgent: "Mozilla/5.0 (Linux; U; Android 4.3; en-us; SM-N900T Build/JSS15J) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
    viewport: {
      width: 360,
      height: 640,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Galaxy Note 3 landscape",
    userAgent: "Mozilla/5.0 (Linux; U; Android 4.3; en-us; SM-N900T Build/JSS15J) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
    viewport: {
      width: 640,
      height: 360,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Galaxy Note II",
    userAgent: "Mozilla/5.0 (Linux; U; Android 4.1; en-us; GT-N7100 Build/JRO03C) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
    viewport: {
      width: 360,
      height: 640,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Galaxy Note II landscape",
    userAgent: "Mozilla/5.0 (Linux; U; Android 4.1; en-us; GT-N7100 Build/JRO03C) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
    viewport: {
      width: 640,
      height: 360,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Galaxy S III",
    userAgent: "Mozilla/5.0 (Linux; U; Android 4.0; en-us; GT-I9300 Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
    viewport: {
      width: 360,
      height: 640,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Galaxy S III landscape",
    userAgent: "Mozilla/5.0 (Linux; U; Android 4.0; en-us; GT-I9300 Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
    viewport: {
      width: 640,
      height: 360,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Galaxy S5",
    userAgent: "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 360,
      height: 640,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Galaxy S5 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 640,
      height: 360,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Galaxy S8",
    userAgent: "Mozilla/5.0 (Linux; Android 7.0; SM-G950U Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36",
    viewport: {
      width: 360,
      height: 740,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Galaxy S8 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 7.0; SM-G950U Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36",
    viewport: {
      width: 740,
      height: 360,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Galaxy S9+",
    userAgent: "Mozilla/5.0 (Linux; Android 8.0.0; SM-G965U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.111 Mobile Safari/537.36",
    viewport: {
      width: 320,
      height: 658,
      deviceScaleFactor: 4.5,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Galaxy S9+ landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 8.0.0; SM-G965U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.111 Mobile Safari/537.36",
    viewport: {
      width: 658,
      height: 320,
      deviceScaleFactor: 4.5,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Galaxy Tab S4",
    userAgent: "Mozilla/5.0 (Linux; Android 8.1.0; SM-T837A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.80 Safari/537.36",
    viewport: {
      width: 712,
      height: 1138,
      deviceScaleFactor: 2.25,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Galaxy Tab S4 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 8.1.0; SM-T837A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.80 Safari/537.36",
    viewport: {
      width: 1138,
      height: 712,
      deviceScaleFactor: 2.25,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPad",
    userAgent: "Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1",
    viewport: {
      width: 768,
      height: 1024,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPad landscape",
    userAgent: "Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1",
    viewport: {
      width: 1024,
      height: 768,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPad (gen 6)",
    userAgent: "Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 768,
      height: 1024,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPad (gen 6) landscape",
    userAgent: "Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 1024,
      height: 768,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPad (gen 7)",
    userAgent: "Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 810,
      height: 1080,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPad (gen 7) landscape",
    userAgent: "Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 1080,
      height: 810,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPad Mini",
    userAgent: "Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1",
    viewport: {
      width: 768,
      height: 1024,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPad Mini landscape",
    userAgent: "Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1",
    viewport: {
      width: 1024,
      height: 768,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPad Pro",
    userAgent: "Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1",
    viewport: {
      width: 1024,
      height: 1366,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPad Pro landscape",
    userAgent: "Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1",
    viewport: {
      width: 1366,
      height: 1024,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPad Pro 11",
    userAgent: "Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 834,
      height: 1194,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPad Pro 11 landscape",
    userAgent: "Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 1194,
      height: 834,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 4",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_2 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D257 Safari/9537.53",
    viewport: {
      width: 320,
      height: 480,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 4 landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_2 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D257 Safari/9537.53",
    viewport: {
      width: 480,
      height: 320,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 5",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
    viewport: {
      width: 320,
      height: 568,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 5 landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
    viewport: {
      width: 568,
      height: 320,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 6",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 6 landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 667,
      height: 375,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 6 Plus",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 414,
      height: 736,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 6 Plus landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 736,
      height: 414,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 7",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 7 landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 667,
      height: 375,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 7 Plus",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 414,
      height: 736,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 7 Plus landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 736,
      height: 414,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 8",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 8 landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 667,
      height: 375,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 8 Plus",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 414,
      height: 736,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 8 Plus landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 736,
      height: 414,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone SE",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
    viewport: {
      width: 320,
      height: 568,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone SE landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
    viewport: {
      width: 568,
      height: 320,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone X",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 375,
      height: 812,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone X landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    viewport: {
      width: 812,
      height: 375,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone XR",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 414,
      height: 896,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone XR landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 896,
      height: 414,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 11",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 414,
      height: 828,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 11 landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 828,
      height: 414,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 11 Pro",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 375,
      height: 812,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 11 Pro landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 812,
      height: 375,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 11 Pro Max",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 414,
      height: 896,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 11 Pro Max landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 896,
      height: 414,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 12",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 390,
      height: 844,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 12 landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 844,
      height: 390,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 12 Pro",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 390,
      height: 844,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 12 Pro landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 844,
      height: 390,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 12 Pro Max",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 428,
      height: 926,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 12 Pro Max landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 926,
      height: 428,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 12 Mini",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 375,
      height: 812,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 12 Mini landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 812,
      height: 375,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 13",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 390,
      height: 844,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 13 landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 844,
      height: 390,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 13 Pro",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 390,
      height: 844,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 13 Pro landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 844,
      height: 390,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 13 Pro Max",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 428,
      height: 926,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 13 Pro Max landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 926,
      height: 428,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "iPhone 13 Mini",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 375,
      height: 812,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "iPhone 13 Mini landscape",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
    viewport: {
      width: 812,
      height: 375,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "JioPhone 2",
    userAgent: "Mozilla/5.0 (Mobile; LYF/F300B/LYF-F300B-001-01-15-130718-i;Android; rv:48.0) Gecko/48.0 Firefox/48.0 KAIOS/2.5",
    viewport: {
      width: 240,
      height: 320,
      deviceScaleFactor: 1,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "JioPhone 2 landscape",
    userAgent: "Mozilla/5.0 (Mobile; LYF/F300B/LYF-F300B-001-01-15-130718-i;Android; rv:48.0) Gecko/48.0 Firefox/48.0 KAIOS/2.5",
    viewport: {
      width: 320,
      height: 240,
      deviceScaleFactor: 1,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Kindle Fire HDX",
    userAgent: "Mozilla/5.0 (Linux; U; en-us; KFAPWI Build/JDQ39) AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.13 Safari/535.19 Silk-Accelerated=true",
    viewport: {
      width: 800,
      height: 1280,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Kindle Fire HDX landscape",
    userAgent: "Mozilla/5.0 (Linux; U; en-us; KFAPWI Build/JDQ39) AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.13 Safari/535.19 Silk-Accelerated=true",
    viewport: {
      width: 1280,
      height: 800,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "LG Optimus L70",
    userAgent: "Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; LGMS323 Build/KOT49I.MS32310c) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 384,
      height: 640,
      deviceScaleFactor: 1.25,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "LG Optimus L70 landscape",
    userAgent: "Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; LGMS323 Build/KOT49I.MS32310c) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 640,
      height: 384,
      deviceScaleFactor: 1.25,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Microsoft Lumia 550",
    userAgent: "Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 550) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Mobile Safari/537.36 Edge/14.14263",
    viewport: {
      width: 640,
      height: 360,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Microsoft Lumia 950",
    userAgent: "Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 950) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Mobile Safari/537.36 Edge/14.14263",
    viewport: {
      width: 360,
      height: 640,
      deviceScaleFactor: 4,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Microsoft Lumia 950 landscape",
    userAgent: "Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 950) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Mobile Safari/537.36 Edge/14.14263",
    viewport: {
      width: 640,
      height: 360,
      deviceScaleFactor: 4,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Nexus 10",
    userAgent: "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 10 Build/MOB31T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Safari/537.36",
    viewport: {
      width: 800,
      height: 1280,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Nexus 10 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 10 Build/MOB31T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Safari/537.36",
    viewport: {
      width: 1280,
      height: 800,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Nexus 4",
    userAgent: "Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 384,
      height: 640,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Nexus 4 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 640,
      height: 384,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Nexus 5",
    userAgent: "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 360,
      height: 640,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Nexus 5 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 640,
      height: 360,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Nexus 5X",
    userAgent: "Mozilla/5.0 (Linux; Android 8.0.0; Nexus 5X Build/OPR4.170623.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 412,
      height: 732,
      deviceScaleFactor: 2.625,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Nexus 5X landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 8.0.0; Nexus 5X Build/OPR4.170623.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 732,
      height: 412,
      deviceScaleFactor: 2.625,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Nexus 6",
    userAgent: "Mozilla/5.0 (Linux; Android 7.1.1; Nexus 6 Build/N6F26U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 412,
      height: 732,
      deviceScaleFactor: 3.5,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Nexus 6 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 7.1.1; Nexus 6 Build/N6F26U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 732,
      height: 412,
      deviceScaleFactor: 3.5,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Nexus 6P",
    userAgent: "Mozilla/5.0 (Linux; Android 8.0.0; Nexus 6P Build/OPP3.170518.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 412,
      height: 732,
      deviceScaleFactor: 3.5,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Nexus 6P landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 8.0.0; Nexus 6P Build/OPP3.170518.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 732,
      height: 412,
      deviceScaleFactor: 3.5,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Nexus 7",
    userAgent: "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 7 Build/MOB30X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Safari/537.36",
    viewport: {
      width: 600,
      height: 960,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Nexus 7 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 7 Build/MOB30X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Safari/537.36",
    viewport: {
      width: 960,
      height: 600,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Nokia Lumia 520",
    userAgent: "Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 520)",
    viewport: {
      width: 320,
      height: 533,
      deviceScaleFactor: 1.5,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Nokia Lumia 520 landscape",
    userAgent: "Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 520)",
    viewport: {
      width: 533,
      height: 320,
      deviceScaleFactor: 1.5,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Nokia N9",
    userAgent: "Mozilla/5.0 (MeeGo; NokiaN9) AppleWebKit/534.13 (KHTML, like Gecko) NokiaBrowser/8.5.0 Mobile Safari/534.13",
    viewport: {
      width: 480,
      height: 854,
      deviceScaleFactor: 1,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Nokia N9 landscape",
    userAgent: "Mozilla/5.0 (MeeGo; NokiaN9) AppleWebKit/534.13 (KHTML, like Gecko) NokiaBrowser/8.5.0 Mobile Safari/534.13",
    viewport: {
      width: 854,
      height: 480,
      deviceScaleFactor: 1,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Pixel 2",
    userAgent: "Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 411,
      height: 731,
      deviceScaleFactor: 2.625,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Pixel 2 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 731,
      height: 411,
      deviceScaleFactor: 2.625,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Pixel 2 XL",
    userAgent: "Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 411,
      height: 823,
      deviceScaleFactor: 3.5,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Pixel 2 XL landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Mobile Safari/537.36",
    viewport: {
      width: 823,
      height: 411,
      deviceScaleFactor: 3.5,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Pixel 3",
    userAgent: "Mozilla/5.0 (Linux; Android 9; Pixel 3 Build/PQ1A.181105.017.A1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.158 Mobile Safari/537.36",
    viewport: {
      width: 393,
      height: 786,
      deviceScaleFactor: 2.75,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Pixel 3 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 9; Pixel 3 Build/PQ1A.181105.017.A1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.158 Mobile Safari/537.36",
    viewport: {
      width: 786,
      height: 393,
      deviceScaleFactor: 2.75,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Pixel 4",
    userAgent: "Mozilla/5.0 (Linux; Android 10; Pixel 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Mobile Safari/537.36",
    viewport: {
      width: 353,
      height: 745,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Pixel 4 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 10; Pixel 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Mobile Safari/537.36",
    viewport: {
      width: 745,
      height: 353,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Pixel 4a (5G)",
    userAgent: "Mozilla/5.0 (Linux; Android 11; Pixel 4a (5G)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4812.0 Mobile Safari/537.36",
    viewport: {
      width: 353,
      height: 745,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Pixel 4a (5G) landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 11; Pixel 4a (5G)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4812.0 Mobile Safari/537.36",
    viewport: {
      width: 745,
      height: 353,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Pixel 5",
    userAgent: "Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4812.0 Mobile Safari/537.36",
    viewport: {
      width: 393,
      height: 851,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Pixel 5 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4812.0 Mobile Safari/537.36",
    viewport: {
      width: 851,
      height: 393,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  },
  {
    name: "Moto G4",
    userAgent: "Mozilla/5.0 (Linux; Android 7.0; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4812.0 Mobile Safari/537.36",
    viewport: {
      width: 360,
      height: 640,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    }
  },
  {
    name: "Moto G4 landscape",
    userAgent: "Mozilla/5.0 (Linux; Android 7.0; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4812.0 Mobile Safari/537.36",
    viewport: {
      width: 640,
      height: 360,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: true
    }
  }
];
var knownDevicesByName = {};
for (const device of knownDevices) {
  knownDevicesByName[device.name] = device;
}
var KnownDevices = Object.freeze(knownDevicesByName);

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/common.js
init_NodeWebSocketTransport();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/PredefinedNetworkConditions.js
init_checked_fetch();
init_modules_watch_stub();
var PredefinedNetworkConditions = Object.freeze({
  "Slow 3G": {
    download: 500 * 1e3 / 8 * 0.8,
    upload: 500 * 1e3 / 8 * 0.8,
    latency: 400 * 5
  },
  "Fast 3G": {
    download: 1.6 * 1e3 * 1e3 / 8 * 0.9,
    upload: 750 * 1e3 / 8 * 0.9,
    latency: 150 * 3.75
  }
});

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/Product.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/PuppeteerViewport.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/TargetManager.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/common/types.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/revisions.js
init_checked_fetch();
init_modules_watch_stub();
var PUPPETEER_REVISIONS = Object.freeze({
  chrome: "116.0.5845.96",
  firefox: "latest"
});

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/util/util.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/cloudflare/BrowserWorker.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/@cloudflare/puppeteer/lib/esm/puppeteer/puppeteer-cloudflare.js
var puppeteer = new PuppeteerWorkers();
var { connect, history, launch, limits, sessions } = puppeteer;
var puppeteer_cloudflare_default = puppeteer;

// src/lib/browser-client.ts
async function launchBrowser(binding) {
  return await puppeteer_cloudflare_default.launch(binding);
}
__name(launchBrowser, "launchBrowser");
async function closeBrowser(browser) {
  await browser.close();
}
__name(closeBrowser, "closeBrowser");
async function generatePdfFromHtml(browser, html, options = {}) {
  const page = await browser.newPage();
  try {
    await page.setContent(html, { waitUntil: "networkidle2" });
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      // CRITICAL: Enable CSS backgrounds/colors
      margin: {
        top: "1cm",
        right: "1cm",
        bottom: "1cm",
        left: "1cm"
      },
      ...options
    });
    return pdfBuffer;
  } finally {
    await page.close();
  }
}
__name(generatePdfFromHtml, "generatePdfFromHtml");
async function generatePdfFromUrl(browser, url, options = {}) {
  const page = await browser.newPage();
  try {
    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 3e4
    });
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "1cm",
        right: "1cm",
        bottom: "1cm",
        left: "1cm"
      },
      ...options
    });
    return pdfBuffer;
  } finally {
    await page.close();
  }
}
__name(generatePdfFromUrl, "generatePdfFromUrl");
async function generateScreenshotFromHtml(browser, html, format = "png", fullPage = true) {
  const page = await browser.newPage();
  try {
    await page.setContent(html, { waitUntil: "networkidle2" });
    const screenshotBuffer = await page.screenshot({
      type: format,
      fullPage,
      omitBackground: format === "png"
      // Transparent background for PNG
    });
    return screenshotBuffer;
  } finally {
    await page.close();
  }
}
__name(generateScreenshotFromHtml, "generateScreenshotFromHtml");
async function generateScreenshotFromUrl(browser, url, format = "png", fullPage = true) {
  const page = await browser.newPage();
  try {
    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 3e4
    });
    const screenshotBuffer = await page.screenshot({
      type: format,
      fullPage,
      omitBackground: format === "png"
    });
    return screenshotBuffer;
  } finally {
    await page.close();
  }
}
__name(generateScreenshotFromUrl, "generateScreenshotFromUrl");

// src/lib/r2-storage.ts
init_checked_fetch();
init_modules_watch_stub();
var R2_PUBLIC_URLS = {
  production: "https://pub-3418eafd6df5417cb410190a4436d31a.r2.dev",
  dev: "https://pub-cf6f1212fb854353acb8f920bd45ff9a.r2.dev"
};
var ENABLE_TTL = false;
var TTL_DAYS = 90;
function getR2PublicUrl(isDev) {
  return isDev ? R2_PUBLIC_URLS.dev : R2_PUBLIC_URLS.production;
}
__name(getR2PublicUrl, "getR2PublicUrl");
async function uploadPdfToR2(bucket, buffer, prefix = "converted", isDev = false) {
  const filename = `${Date.now()}-${crypto.randomUUID()}.pdf`;
  const key = `${prefix}/${filename}`;
  await bucket.put(key, buffer, {
    httpMetadata: {
      contentType: "application/pdf"
    },
    customMetadata: {
      uploadedAt: (/* @__PURE__ */ new Date()).toISOString(),
      ...ENABLE_TTL && { expiresAt: getExpirationDate().toISOString() }
    }
  });
  const baseUrl = getR2PublicUrl(isDev);
  const publicUrl = `${baseUrl}/${key}`;
  return {
    key,
    publicUrl,
    ...ENABLE_TTL && { expiresAt: getExpirationDate() }
  };
}
__name(uploadPdfToR2, "uploadPdfToR2");
async function uploadImageToR2(bucket, buffer, format, prefix = "converted", isDev = false) {
  const filename = `${Date.now()}-${crypto.randomUUID()}.${format}`;
  const key = `${prefix}/${filename}`;
  const contentTypeMap = {
    png: "image/png",
    jpg: "image/jpeg",
    webp: "image/webp"
  };
  await bucket.put(key, buffer, {
    httpMetadata: {
      contentType: contentTypeMap[format]
    },
    customMetadata: {
      uploadedAt: (/* @__PURE__ */ new Date()).toISOString(),
      ...ENABLE_TTL && { expiresAt: getExpirationDate().toISOString() }
    }
  });
  const baseUrl = getR2PublicUrl(isDev);
  const publicUrl = `${baseUrl}/${key}`;
  return {
    key,
    publicUrl,
    ...ENABLE_TTL && { expiresAt: getExpirationDate() }
  };
}
__name(uploadImageToR2, "uploadImageToR2");
async function uploadToR2(bucket, key, buffer, contentType, isDev = false) {
  await bucket.put(key, buffer, {
    httpMetadata: {
      contentType
    },
    customMetadata: {
      uploadedAt: (/* @__PURE__ */ new Date()).toISOString(),
      ...ENABLE_TTL && { expiresAt: getExpirationDate().toISOString() }
    }
  });
  const baseUrl = getR2PublicUrl(isDev);
  return `${baseUrl}/${key}`;
}
__name(uploadToR2, "uploadToR2");
function getExpirationDate() {
  const expiry = /* @__PURE__ */ new Date();
  expiry.setDate(expiry.getDate() + TTL_DAYS);
  return expiry;
}
__name(getExpirationDate, "getExpirationDate");

// src/handlers/browser-pdf.ts
async function htmlToPdf(args, env) {
  const { html, format = "A4", landscape = false, margin } = args;
  if (!html || html.trim().length === 0) {
    throw new Error("HTML content cannot be empty");
  }
  const browser = await launchBrowser(env.BROWSER);
  try {
    const pdfBuffer = await generatePdfFromHtml(browser, html, {
      format,
      landscape,
      margin: margin || {
        top: "1cm",
        right: "1cm",
        bottom: "1cm",
        left: "1cm"
      }
    });
    const isDev = true;
    const { publicUrl } = await uploadPdfToR2(env.R2_BUCKET, pdfBuffer, "converted/html", isDev);
    return { pdfUrl: publicUrl };
  } catch (error) {
    if (error.message.includes("timeout")) {
      throw new Error("PDF generation timed out. Try simpler HTML or increase timeout.");
    }
    throw new Error(`Failed to generate PDF from HTML: ${error.message}`);
  } finally {
    await closeBrowser(browser);
  }
}
__name(htmlToPdf, "htmlToPdf");
async function urlToPdf(args, env) {
  const { url, format = "A4", landscape = false, margin } = args;
  try {
    new URL(url);
  } catch {
    throw new Error("Invalid URL provided. Must be a valid HTTP/HTTPS URL.");
  }
  const browser = await launchBrowser(env.BROWSER);
  try {
    const pdfBuffer = await generatePdfFromUrl(browser, url, {
      format,
      landscape,
      margin: margin || {
        top: "1cm",
        right: "1cm",
        bottom: "1cm",
        left: "1cm"
      }
    });
    const isDev = true;
    const { publicUrl } = await uploadPdfToR2(env.R2_BUCKET, pdfBuffer, "converted/url", isDev);
    return { pdfUrl: publicUrl };
  } catch (error) {
    if (error.message.includes("timeout")) {
      throw new Error("PDF generation timed out. The webpage may be too complex or slow to load.");
    }
    if (error.message.includes("net::")) {
      throw new Error("Failed to load URL. Check that the URL is publicly accessible.");
    }
    throw new Error(`Failed to generate PDF from URL: ${error.message}`);
  } finally {
    await closeBrowser(browser);
  }
}
__name(urlToPdf, "urlToPdf");
async function markdownToPdf(args, env) {
  const { markdown, format = "A4", landscape = false, margin, css = "" } = args;
  if (!markdown || markdown.trim().length === 0) {
    throw new Error("Markdown content cannot be empty");
  }
  const contentHtml = await k(markdown);
  const styledHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Markdown PDF</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      background: white;
    }

    h1, h2, h3, h4, h5, h6 {
      color: #111;
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
      font-weight: 600;
      line-height: 1.25;
    }

    h1 {
      font-size: 2.5rem;
      border-bottom: 2px solid #eee;
      padding-bottom: 0.5rem;
    }

    h2 {
      font-size: 2rem;
      border-bottom: 1px solid #eee;
      padding-bottom: 0.5rem;
    }

    h3 { font-size: 1.5rem; }
    h4 { font-size: 1.25rem; }
    h5 { font-size: 1.1rem; }
    h6 { font-size: 1rem; }

    p {
      margin-bottom: 1rem;
    }

    a {
      color: #0066cc;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    ul, ol {
      margin-bottom: 1rem;
      padding-left: 2rem;
    }

    li {
      margin-bottom: 0.5rem;
    }

    blockquote {
      border-left: 4px solid #ddd;
      margin-left: 0;
      margin-bottom: 1rem;
      padding-left: 1rem;
      color: #666;
      font-style: italic;
    }

    code {
      background: #f4f4f4;
      padding: 0.2rem 0.4rem;
      border-radius: 3px;
      font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
      font-size: 0.9em;
      color: #d73a49;
    }

    pre {
      background: #f6f8fa;
      border: 1px solid #e1e4e8;
      border-radius: 6px;
      padding: 1rem;
      margin-bottom: 1rem;
      overflow-x: auto;
      line-height: 1.45;
    }

    pre code {
      background: none;
      padding: 0;
      border-radius: 0;
      color: #24292e;
      font-size: 0.85rem;
    }

    table {
      border-collapse: collapse;
      width: 100%;
      margin-bottom: 1rem;
      border: 1px solid #ddd;
    }

    th, td {
      border: 1px solid #ddd;
      padding: 0.75rem;
      text-align: left;
    }

    th {
      background: #f6f8fa;
      font-weight: 600;
    }

    tr:nth-child(even) {
      background: #f9f9f9;
    }

    img {
      max-width: 100%;
      height: auto;
      margin-bottom: 1rem;
    }

    hr {
      border: none;
      border-top: 2px solid #eee;
      margin: 2rem 0;
    }

    /* Custom CSS from user */
    ${css}
  </style>
</head>
<body>
${contentHtml}
</body>
</html>
`;
  const browser = await launchBrowser(env.BROWSER);
  try {
    const pdfBuffer = await generatePdfFromHtml(browser, styledHtml, {
      format,
      landscape,
      margin: margin || {
        top: "1cm",
        right: "1cm",
        bottom: "1cm",
        left: "1cm"
      }
    });
    const isDev = true;
    const { publicUrl } = await uploadPdfToR2(env.R2_BUCKET, pdfBuffer, "converted/markdown", isDev);
    return { pdfUrl: publicUrl };
  } catch (error) {
    if (error.message.includes("timeout")) {
      throw new Error("PDF generation timed out. Try simpler markdown content.");
    }
    throw new Error(`Failed to generate PDF from markdown: ${error.message}`);
  } finally {
    await closeBrowser(browser);
  }
}
__name(markdownToPdf, "markdownToPdf");

// src/handlers/browser-screenshot.ts
init_checked_fetch();
init_modules_watch_stub();
async function htmlToScreenshot(args, env) {
  const { html, format = "png", fullPage = true, viewport } = args;
  if (!html || html.trim().length === 0) {
    throw new Error("HTML content cannot be empty");
  }
  const browser = await launchBrowser(env.BROWSER);
  try {
    if (viewport) {
      const page = await browser.newPage();
      await page.setViewport({
        width: viewport.width || 1280,
        height: viewport.height || 720,
        deviceScaleFactor: 2
        // High DPI for sharp images
      });
      await page.close();
    }
    const imageBuffer = await generateScreenshotFromHtml(browser, html, format, fullPage);
    const isDev = true;
    const { publicUrl } = await uploadImageToR2(env.R2_BUCKET, imageBuffer, format, "converted/html-screenshot", isDev);
    return { imageUrl: publicUrl };
  } catch (error) {
    if (error.message.includes("timeout")) {
      throw new Error("Screenshot generation timed out. Try simpler HTML or increase timeout.");
    }
    throw new Error(`Failed to generate screenshot from HTML: ${error.message}`);
  } finally {
    await closeBrowser(browser);
  }
}
__name(htmlToScreenshot, "htmlToScreenshot");
async function urlToScreenshot(args, env) {
  const { url, format = "png", fullPage = true, viewport } = args;
  try {
    new URL(url);
  } catch {
    throw new Error("Invalid URL provided. Must be a valid HTTP/HTTPS URL.");
  }
  const browser = await launchBrowser(env.BROWSER);
  try {
    if (viewport) {
      const page = await browser.newPage();
      await page.setViewport({
        width: viewport.width || 1280,
        height: viewport.height || 720,
        deviceScaleFactor: 2
        // High DPI for sharp images
      });
      await page.close();
    }
    const imageBuffer = await generateScreenshotFromUrl(browser, url, format, fullPage);
    const isDev = true;
    const { publicUrl } = await uploadImageToR2(env.R2_BUCKET, imageBuffer, format, "converted/url-screenshot", isDev);
    return { imageUrl: publicUrl };
  } catch (error) {
    if (error.message.includes("timeout")) {
      throw new Error("Screenshot generation timed out. The webpage may be too complex or slow to load.");
    }
    if (error.message.includes("net::")) {
      throw new Error("Failed to load URL. Check that the URL is publicly accessible.");
    }
    throw new Error(`Failed to generate screenshot from URL: ${error.message}`);
  } finally {
    await closeBrowser(browser);
  }
}
__name(urlToScreenshot, "urlToScreenshot");

// src/handlers/ai-markdown.ts
init_checked_fetch();
init_modules_watch_stub();

// src/lib/ai-client.ts
init_checked_fetch();
init_modules_watch_stub();
async function convertToMarkdown(ai, fileName, fileBuffer, mimeType) {
  const blob = new Blob([fileBuffer], {
    type: mimeType || "application/octet-stream"
  });
  const result = await ai.toMarkdown([
    {
      name: fileName,
      blob
    }
  ]);
  return result[0];
}
__name(convertToMarkdown, "convertToMarkdown");
async function getSupportedFormats(ai) {
  return await ai.toMarkdown().supported();
}
__name(getSupportedFormats, "getSupportedFormats");
function isSupportedFormat(fileExtension, supportedFormats) {
  const normalizedExt = fileExtension.toLowerCase();
  return supportedFormats.some((f2) => f2.extension === normalizedExt);
}
__name(isSupportedFormat, "isSupportedFormat");
function getMimeTypeForExtension(fileExtension, supportedFormats) {
  const normalizedExt = fileExtension.toLowerCase();
  const format = supportedFormats.find((f2) => f2.extension === normalizedExt);
  return format?.mimeType;
}
__name(getMimeTypeForExtension, "getMimeTypeForExtension");

// src/handlers/ai-markdown.ts
async function documentToMarkdown(args, env) {
  const { fileUrl, fileName } = args;
  let url;
  try {
    url = new URL(fileUrl);
  } catch {
    throw new Error("Invalid file URL provided. Must be a valid HTTP/HTTPS URL.");
  }
  const detectedFileName = fileName || url.pathname.split("/").pop() || "document";
  const fileExtension = detectedFileName.includes(".") ? "." + detectedFileName.split(".").pop()?.toLowerCase() : "";
  const supportedFormats = await getSupportedFormats(env.AI);
  if (fileExtension && !isSupportedFormat(fileExtension, supportedFormats)) {
    const supportedExts = supportedFormats.map((f2) => f2.extension).join(", ");
    throw new Error(
      `Unsupported file format: ${fileExtension}. Supported formats: ${supportedExts}`
    );
  }
  let fileResponse;
  try {
    fileResponse = await fetch(fileUrl);
    if (!fileResponse.ok) {
      throw new Error(`HTTP ${fileResponse.status}: ${fileResponse.statusText}`);
    }
  } catch (error) {
    if (error.message.includes("HTTP")) {
      throw error;
    }
    throw new Error(
      `Failed to fetch file from URL: ${error.message}. Ensure the URL is publicly accessible.`
    );
  }
  const fileBuffer = await fileResponse.arrayBuffer();
  const responseMimeType = fileResponse.headers.get("content-type");
  const detectedMimeType = responseMimeType || getMimeTypeForExtension(fileExtension, supportedFormats);
  try {
    const result = await convertToMarkdown(
      env.AI,
      detectedFileName,
      fileBuffer,
      detectedMimeType
    );
    if (result.format === "error") {
      throw new Error(
        result.error || "Conversion failed with unknown error from Workers AI"
      );
    }
    if (!result.data) {
      throw new Error("Conversion succeeded but no markdown data returned");
    }
    return {
      markdown: result.data,
      mimeType: result.mimeType || detectedMimeType || "application/octet-stream",
      tokens: result.tokens || 0,
      fileName: detectedFileName
    };
  } catch (error) {
    if (error.message.includes("quota") || error.message.includes("limit")) {
      throw new Error(
        "Workers AI quota exceeded. Please try again later or upgrade your plan."
      );
    }
    throw new Error(`Document conversion failed: ${error.message}`);
  }
}
__name(documentToMarkdown, "documentToMarkdown");

// src/handlers/pdfco-excel.ts
init_checked_fetch();
init_modules_watch_stub();

// src/lib/pdfco-client.ts
init_checked_fetch();
init_modules_watch_stub();
var PDFCO_API_BASE = "https://api.pdf.co/v1";
var PDFCoErrorCodes = {
  400: "Bad Request - Invalid parameters",
  401: "Unauthorized - Invalid API key",
  402: "Insufficient Credits - Please add credits to your account",
  403: "Forbidden - File URL is not publicly accessible",
  404: "Not Found - Resource does not exist",
  408: "Timeout - Request took too long",
  414: "URI Too Long - URL path exceeds limits",
  415: "Unsupported Media Type - File format not supported",
  429: "Too Many Requests - Rate limit exceeded",
  441: "Invalid Password - Document is password-protected",
  442: "Invalid Document - File is damaged or incorrect format",
  443: "Security Blocked - Document security settings prevent operation",
  445: "Timeout - File too large, use async mode",
  449: "Invalid Page Index - Page number does not exist",
  500: "Server Error - Internal error, please retry"
};
async function pdfcoRequest(endpoint, body, apiKey) {
  const url = `${PDFCO_API_BASE}${endpoint}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  const data = await response.json();
  if (!response.ok || data.error === true) {
    const status = data.status || response.status;
    const errorMessage = data.message || PDFCoErrorCodes[status] || `PDF.co API error: ${status}`;
    if (status === 402) {
      throw new Error(
        "Insufficient PDF.co credits. Please add credits to your account at https://pdf.co"
      );
    } else if (status === 403) {
      throw new Error(
        "File URL is not publicly accessible. Ensure the file can be downloaded without authentication."
      );
    } else if (status === 429) {
      throw new Error(
        "PDF.co rate limit exceeded. Please wait a moment and retry."
      );
    } else if (status === 442) {
      throw new Error(
        "Invalid or damaged Excel file. Please verify the file is a valid xls/xlsx/csv file."
      );
    } else if (status === 445) {
      throw new Error(
        "File is too large for synchronous conversion. Please try again or use async mode."
      );
    }
    throw new Error(`PDF.co API error (${status}): ${errorMessage}`);
  }
  return data;
}
__name(pdfcoRequest, "pdfcoRequest");
async function convertExcelToJson(params, env) {
  const apiKey = env.PDFCO_API_KEY;
  if (!apiKey) {
    throw new Error("PDFCO_API_KEY environment variable is not set");
  }
  try {
    new URL(params.url);
  } catch {
    throw new Error("Invalid file URL provided. Must be a valid HTTP/HTTPS URL.");
  }
  const requestBody = {
    url: params.url,
    worksheetIndex: params.worksheetIndex || "1",
    async: params.async || false,
    inline: params.inline !== void 0 ? params.inline : false,
    ...params.name && { name: params.name },
    ...params.expiration && { expiration: params.expiration }
  };
  return pdfcoRequest(
    "/xls/convert/to/json",
    requestBody,
    apiKey
  );
}
__name(convertExcelToJson, "convertExcelToJson");
function getOfficeToPdfEndpoint(fileExtension) {
  const ext = fileExtension.toLowerCase();
  if ([".xls", ".xlsx", ".csv"].includes(ext)) {
    return "/pdf/convert/from/csv";
  }
  return "/pdf/convert/from/doc";
}
__name(getOfficeToPdfEndpoint, "getOfficeToPdfEndpoint");
async function convertOfficeToPdf(params, env, fileExtension) {
  const apiKey = env.PDFCO_API_KEY;
  if (!apiKey) {
    throw new Error("PDFCO_API_KEY environment variable is not set");
  }
  try {
    new URL(params.url);
  } catch {
    throw new Error("Invalid file URL provided. Must be a valid HTTP/HTTPS URL.");
  }
  const endpoint = getOfficeToPdfEndpoint(fileExtension);
  const requestBody = {
    url: params.url,
    async: params.async || false
  };
  if (params.name)
    requestBody.name = params.name;
  if (params.expiration)
    requestBody.expiration = params.expiration;
  if (params.pages)
    requestBody.pages = params.pages;
  if (endpoint === "/pdf/convert/from/csv") {
    if (params.worksheetIndex !== void 0) {
      requestBody.worksheetIndex = params.worksheetIndex;
    }
    if (params.autosize !== void 0) {
      requestBody.autosize = params.autosize;
    }
  }
  return pdfcoRequest(
    endpoint,
    requestBody,
    apiKey
  );
}
__name(convertOfficeToPdf, "convertOfficeToPdf");

// src/handlers/pdfco-excel.ts
async function excelToJson(args, env) {
  const { fileUrl, worksheetIndex } = args;
  try {
    new URL(fileUrl);
  } catch {
    throw new Error("Invalid file URL provided. Must be a valid HTTP/HTTPS URL.");
  }
  const wsIndex = worksheetIndex || "1";
  const wsIndexNum = parseInt(wsIndex, 10);
  if (isNaN(wsIndexNum) || wsIndexNum < 1) {
    throw new Error(
      "Invalid worksheetIndex. Must be a positive integer (1 for first sheet, 2 for second, etc.)"
    );
  }
  let pdfcoResponse;
  try {
    pdfcoResponse = await convertExcelToJson(
      {
        url: fileUrl,
        worksheetIndex: wsIndex,
        async: false,
        // Sync mode for simplicity
        inline: false
        // Get S3 URL (we'll download and re-upload to R2)
      },
      env
    );
  } catch (error) {
    throw new Error(`Excel conversion failed: ${error.message}`);
  }
  if (!pdfcoResponse.url) {
    throw new Error(
      "PDF.co conversion succeeded but did not return a download URL. Please retry."
    );
  }
  let jsonResponse;
  try {
    jsonResponse = await fetch(pdfcoResponse.url);
    if (!jsonResponse.ok) {
      throw new Error(
        `Failed to download converted JSON: HTTP ${jsonResponse.status}`
      );
    }
  } catch (error) {
    throw new Error(
      `Failed to download JSON from PDF.co: ${error.message}. The file may have expired.`
    );
  }
  let jsonData;
  try {
    let jsonText2 = await jsonResponse.text();
    if (jsonText2.charCodeAt(0) === 65279) {
      jsonText2 = jsonText2.slice(1);
    }
    jsonData = JSON.parse(jsonText2);
  } catch (error) {
    throw new Error(
      `Failed to parse JSON data: ${error.message}. The converted file may be corrupted.`
    );
  }
  const jsonText = JSON.stringify(jsonData, null, 2);
  const jsonBuffer = new TextEncoder().encode(jsonText);
  const isDev = fileUrl.includes("localhost") || fileUrl.includes("127.0.0.1");
  const fileName = `excel-to-json/${Date.now()}-${crypto.randomUUID()}.json`;
  const r2Url = await uploadToR2(
    env.R2_BUCKET,
    fileName,
    jsonBuffer,
    "application/json",
    isDev
  );
  return {
    jsonUrl: r2Url,
    jsonData,
    worksheetIndex: wsIndex,
    remainingCredits: pdfcoResponse.remainingCredits
  };
}
__name(excelToJson, "excelToJson");

// src/handlers/pdfco-convert.ts
init_checked_fetch();
init_modules_watch_stub();
var SUPPORTED_EXTENSIONS = [
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".ppt",
  ".pptx",
  ".csv",
  ".rtf",
  ".txt",
  ".xps"
];
var LIMITED_SUPPORT_EXTENSIONS = [".ppt", ".pptx"];
function getFileExtension(url) {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const ext = pathname.substring(pathname.lastIndexOf(".")).toLowerCase();
    return ext;
  } catch {
    throw new Error("Invalid file URL provided. Cannot extract file extension.");
  }
}
__name(getFileExtension, "getFileExtension");
async function officeToPdf(args, env) {
  const { fileUrl, worksheetIndex, autosize } = args;
  try {
    new URL(fileUrl);
  } catch {
    throw new Error("Invalid file URL provided. Must be a valid HTTP/HTTPS URL.");
  }
  const fileExtension = getFileExtension(fileUrl);
  if (!SUPPORTED_EXTENSIONS.includes(fileExtension)) {
    throw new Error(
      `Unsupported file type: ${fileExtension}. Supported formats: ${SUPPORTED_EXTENSIONS.join(", ")}`
    );
  }
  const warnings = [];
  if (LIMITED_SUPPORT_EXTENSIONS.includes(fileExtension)) {
    warnings.push(
      `PowerPoint files (${fileExtension}) have limited support. PDF.co may not provide assistance for rendering issues or bugs. Consider using Browser Rendering for critical presentations.`
    );
  }
  const macroExtensions = [".docm", ".xlsm", ".pptm"];
  const hasLikelyMacros = macroExtensions.some((ext) => fileUrl.toLowerCase().includes(ext));
  if (hasLikelyMacros) {
    warnings.push(
      "This file appears to be macro-enabled. Office macros are disabled and will not execute during conversion."
    );
  }
  if (worksheetIndex !== void 0) {
    if (![".xls", ".xlsx", ".csv"].includes(fileExtension)) {
      throw new Error(
        `worksheetIndex parameter is only supported for Excel files (.xls, .xlsx, .csv). Current file type: ${fileExtension}`
      );
    }
    if (!Number.isInteger(worksheetIndex) || worksheetIndex < 1) {
      throw new Error(
        "Invalid worksheetIndex. Must be a positive integer (1 for first sheet, 2 for second, etc.)"
      );
    }
  }
  let pdfcoResponse;
  try {
    pdfcoResponse = await convertOfficeToPdf(
      {
        url: fileUrl,
        worksheetIndex,
        autosize,
        async: false
        // Sync mode for simplicity (use async for files > 50MB)
      },
      env,
      fileExtension
    );
  } catch (error) {
    throw new Error(`Office to PDF conversion failed: ${error.message}`);
  }
  if (!pdfcoResponse.url) {
    throw new Error(
      "PDF.co conversion succeeded but did not return a download URL. Please retry."
    );
  }
  let pdfResponse;
  try {
    pdfResponse = await fetch(pdfcoResponse.url);
    if (!pdfResponse.ok) {
      throw new Error(
        `Failed to download converted PDF: HTTP ${pdfResponse.status}`
      );
    }
  } catch (error) {
    throw new Error(
      `Failed to download PDF from PDF.co: ${error.message}. The file may have expired.`
    );
  }
  const pdfBuffer = await pdfResponse.arrayBuffer();
  const bucketName = env.R2_BUCKET?.name || "";
  const isDev = bucketName.includes("dev");
  const { publicUrl } = await uploadPdfToR2(
    env.R2_BUCKET,
    pdfBuffer,
    "office-to-pdf",
    isDev
  );
  return {
    pdfUrl: publicUrl,
    pageCount: pdfcoResponse.pageCount,
    fileType: fileExtension,
    ...warnings.length > 0 && { warnings },
    remainingCredits: pdfcoResponse.remainingCredits
  };
}
__name(officeToPdf, "officeToPdf");

// src/mcp/server.ts
async function handleMCPRequest(request, env) {
  const { id, method, params } = request;
  try {
    switch (method) {
      case "initialize":
        return createMCPResponse(id, {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                protocolVersion: "2024-11-05",
                serverInfo: {
                  name: "file-converter-mcp",
                  version: "1.0.0"
                },
                capabilities: {
                  tools: {}
                }
              })
            }
          ]
        });
      case "tools/list":
        return createMCPResponse(id, {
          content: [
            {
              type: "text",
              text: JSON.stringify({ tools })
            }
          ]
        });
      case "tools/call": {
        const toolName = params?.name;
        const args = params?.arguments || {};
        if (!toolName) {
          return createInvalidParams(id, "Tool name is required");
        }
        const tool = getToolByName(toolName);
        if (!tool) {
          return createMethodNotFound(id);
        }
        try {
          let result;
          switch (toolName) {
            case "html_to_pdf":
              result = await htmlToPdf(args, env);
              break;
            case "url_to_pdf":
              result = await urlToPdf(args, env);
              break;
            case "markdown_to_pdf":
              result = await markdownToPdf(args, env);
              break;
            case "html_to_screenshot":
              result = await htmlToScreenshot(args, env);
              break;
            case "url_to_screenshot":
              result = await urlToScreenshot(args, env);
              break;
            case "document_to_markdown":
              result = await documentToMarkdown(args, env);
              break;
            case "excel_to_json":
              result = await excelToJson(args, env);
              break;
            case "office_to_pdf":
              result = await officeToPdf(args, env);
              break;
            default:
              return createInternalError(
                id,
                `Tool "${toolName}" not yet implemented`
              );
          }
          return createMCPResponse(id, {
            content: [
              {
                type: "text",
                text: JSON.stringify(result)
              }
            ]
          });
        } catch (error) {
          console.error(`Tool execution error (${toolName}):`, error);
          return createInternalError(id, error.message);
        }
      }
      default:
        return createMethodNotFound(id);
    }
  } catch (error) {
    console.error("MCP request error:", error);
    return createInternalError(id, error.message);
  }
}
__name(handleMCPRequest, "handleMCPRequest");

// src/index.ts
var app = new Hono2();
app.use("/*", cors({
  origin: "*",
  allowMethods: ["GET", "POST", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"]
}));
app.get("/health", (c2) => {
  return c2.json({
    status: "ok",
    version: "1.0.0",
    tools: 8,
    // Phase 6: 8 tools implemented (3 PDF + 2 screenshots + 1 markdown + 1 excel + 1 office)
    totalPlanned: 13
  });
});
app.get("/", (c2) => {
  const deployUrl = c2.req.url.replace(new URL(c2.req.url).pathname, "");
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>File Converter MCP Server</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 2rem;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      padding: 3rem;
    }
    h1 {
      color: #2d3748;
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }
    .subtitle {
      color: #718096;
      font-size: 1.1rem;
      margin-bottom: 2rem;
    }
    .section {
      margin: 2rem 0;
    }
    .section h2 {
      color: #667eea;
      font-size: 1.5rem;
      margin-bottom: 1rem;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 0.5rem;
    }
    .code-block {
      background: #1a202c;
      color: #68d391;
      padding: 1.5rem;
      border-radius: 8px;
      overflow-x: auto;
      font-family: 'Courier New', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
    }
    .tool-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }
    .tool-card {
      background: #f7fafc;
      padding: 1rem;
      border-radius: 8px;
      border-left: 4px solid #667eea;
    }
    .tool-name {
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 0.5rem;
    }
    .tool-desc {
      color: #718096;
      font-size: 0.9rem;
    }
    .warning {
      background: #fff5f5;
      border-left: 4px solid #f56565;
      padding: 1rem;
      border-radius: 4px;
      color: #742a2a;
      margin: 1rem 0;
    }
    .badge {
      display: inline-block;
      background: #667eea;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.85rem;
      font-weight: 500;
      margin-right: 0.5rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>\u{1F4C4} File Converter MCP Server</h1>
    <p class="subtitle">Document conversion & processing for AI agents</p>

    <div class="section">
      <h2>\u{1F680} MCP Configuration</h2>
      <p style="margin-bottom: 1rem;">Add this server to your MCP client:</p>
      <div class="code-block">{
  "name": "File Converter",
  "url": "${deployUrl}/mcp",
  "transport": "http",
  "headers": {
    "Authorization": "Bearer YOUR_TOKEN"
  }
}</div>
    </div>

    <div class="section">
      <h2>\u{1F527} Available Tools (13)</h2>

      <h3 style="margin-top: 1.5rem; color: #4a5568;">PDF Generation (Browser Rendering)</h3>
      <div class="tool-grid">
        <div class="tool-card">
          <div class="tool-name">html_to_pdf</div>
          <div class="tool-desc">Convert HTML/CSS to PDF</div>
        </div>
        <div class="tool-card">
          <div class="tool-name">url_to_pdf</div>
          <div class="tool-desc">Convert webpages to PDF</div>
        </div>
        <div class="tool-card">
          <div class="tool-name">markdown_to_pdf</div>
          <div class="tool-desc">Styled markdown PDFs</div>
        </div>
      </div>

      <h3 style="margin-top: 1.5rem; color: #4a5568;">Screenshots & Images</h3>
      <div class="tool-grid">
        <div class="tool-card">
          <div class="tool-name">html_to_screenshot</div>
          <div class="tool-desc">HTML \u2192 PNG/JPG</div>
        </div>
        <div class="tool-card">
          <div class="tool-name">url_to_screenshot</div>
          <div class="tool-desc">Webpage capture</div>
        </div>
        <div class="tool-card">
          <div class="tool-name">pdf_to_images</div>
          <div class="tool-desc">PDF pages \u2192 images</div>
        </div>
        <div class="tool-card">
          <div class="tool-name">document_to_images</div>
          <div class="tool-desc">Office \u2192 images</div>
        </div>
      </div>

      <h3 style="margin-top: 1.5rem; color: #4a5568;">Document Processing</h3>
      <div class="tool-grid">
        <div class="tool-card">
          <div class="tool-name">document_to_markdown</div>
          <div class="tool-desc">Extract text as markdown (RAG-ready)</div>
        </div>
      </div>

      <h3 style="margin-top: 1.5rem; color: #4a5568;">Data Extraction & PDF Operations</h3>
      <div class="tool-grid">
        <div class="tool-card">
          <div class="tool-name">excel_to_json</div>
          <div class="tool-desc">Parse spreadsheets</div>
        </div>
        <div class="tool-card">
          <div class="tool-name">office_to_pdf</div>
          <div class="tool-desc">DOCX/PPTX/XLSX \u2192 PDF</div>
        </div>
        <div class="tool-card">
          <div class="tool-name">merge_pdfs</div>
          <div class="tool-desc">Combine PDFs</div>
        </div>
        <div class="tool-card">
          <div class="tool-name">split_pdf</div>
          <div class="tool-desc">Extract pages</div>
        </div>
        <div class="tool-card">
          <div class="tool-name">extract_pdf_tables</div>
          <div class="tool-desc">Table data \u2192 CSV/JSON</div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>\u{1F4CA} Tech Stack</h2>
      <p style="margin-bottom: 0.5rem;">
        <span class="badge">Cloudflare Workers</span>
        <span class="badge">Browser Rendering</span>
        <span class="badge">Workers AI</span>
        <span class="badge">PDF.co</span>
        <span class="badge">R2 Storage</span>
      </p>
    </div>

    <div class="warning">
      <strong>\u26A0\uFE0F Authentication Required:</strong> The /mcp endpoint requires a Bearer token.
      Set AUTH_TOKEN in your environment or .dev.vars file.
    </div>

    <div class="section">
      <h2>\u{1F4DD} Example Request</h2>
      <div class="code-block">curl -X POST ${deployUrl}/mcp \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/list"
  }'</div>
    </div>

    <div class="section" style="text-align: center; color: #718096; padding-top: 2rem; border-top: 1px solid #e2e8f0;">
      <p>Built by Jeremy Dawes (Jez) | Powered by Cloudflare & PDF.co</p>
      <p style="margin-top: 0.5rem; font-size: 0.9rem;">
        <a href="https://www.jezweb.com.au" style="color: #667eea; text-decoration: none;">jezweb.com.au</a> |
        <a href="mailto:jeremy@jezweb.net" style="color: #667eea; text-decoration: none;">jeremy@jezweb.net</a>
      </p>
    </div>
  </div>
</body>
</html>
  `;
  return c2.html(html);
});
app.post("/mcp", async (c2) => {
  const authHeader = c2.req.header("Authorization");
  const token = authHeader?.replace("Bearer ", "");
  if (!token || token !== c2.env.AUTH_TOKEN) {
    return c2.text("Unauthorized", 401);
  }
  try {
    const body = await c2.req.json();
    if (!body || body.jsonrpc !== "2.0" || !body.method) {
      return c2.json(createInvalidRequest(body?.id || 0));
    }
    const response = await handleMCPRequest(body, c2.env);
    return c2.json(response);
  } catch (error) {
    console.error("Failed to parse request:", error);
    return c2.json(createParseError());
  }
});
var src_default = app;

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
init_checked_fetch();
init_modules_watch_stub();
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e2) {
      console.error("Failed to drain the unused request body.", e2);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// .wrangler/tmp/bundle-iuZbtB/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default
];
var middleware_insertion_facade_default = src_default;

// node_modules/wrangler/templates/middleware/common.ts
init_checked_fetch();
init_modules_watch_stub();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-iuZbtB/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
