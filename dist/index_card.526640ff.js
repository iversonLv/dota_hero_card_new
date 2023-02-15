// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/query/hero.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.heroQuery = void 0;
var heroQuery = function heroQuery(id) {
  return JSON.stringify({
    query: "{\n     constants {\n       hero(id: ".concat(id, ") {\n         id\n         name\n         displayName\n         shortName\n         aliases\n         gameVersionId\n         language {\n           displayName\n           lore\n           hype\n         }\n         abilities {\n           slot\n           gameVersionId\n           abilityId\n           ability {\n             id\n             name\n             uri\n             language {\n               displayName\n               description\n               attributes\n               lore\n               aghanimDescription\n               shardDescription\n               notes\n             }\n             stat {\n               abilityId\n               type\n               behavior\n               unitTargetType\n               unitTargetTeam\n               unitTargetFlags\n               unitDamageType\n               spellImmunity\n               modifierSupportValue\n               modifierSupportBonus\n               isOnCastbar\n               isOnLearnbar\n               fightRecapLevel\n               isGrantedByScepter\n               hasScepterUpgrade\n               maxLevel\n               levelsBetweenUpgrades\n               requiredLevel\n               hotKeyOverride\n               displayAdditionalHeroes\n               castRange\n               castRangeBuffer\n               castPoint\n               channelTime\n               cooldown\n               damage\n               manaCost\n               isUltimate\n               duration\n               charges\n               chargeRestoreTime\n               isGrantedByShard\n               dispellable\n             }\n             attributes {\n               name\n               value\n               linkedSpecialBonusAbilityId\n               requiresScepter\n             }\n             isTalent\n           }\n         }\n         roles {\n           roleId\n           level\n         }\n         talents {\n           abilityId\n           slot\n         }\n         stats {\n           enabled\n           heroUnlockOrder\n           team\n           cMEnabled\n           newPlayerEnabled\n           attackType\n           startingArmor\n           startingMagicArmor\n           startingDamageMin\n           startingDamageMax\n           attackRate\n           attackAnimationPoint\n           attackAcquisitionRange\n           attackRange\n           primaryAttribute\n           strengthBase\n           strengthGain\n           intelligenceBase\n           intelligenceGain\n           agilityBase\n           agilityGain\n           mpRegen\n           moveSpeed\n           moveTurnRate\n           hpBarOffset\n           visionDaytimeRange\n           visionNighttimeRange\n           complexity\n         }\n       }\n     }\n   }\n   ")
  });
};
exports.heroQuery = heroQuery;
},{}],"src/query/roles.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rolesQuery = void 0;
var rolesQuery = function rolesQuery() {
  return JSON.stringify({
    query: "{\n      constants {\n        roles {\n          roleId\n          name\n          langKey\n        } \n      }\n    }\n    "
  });
};
exports.rolesQuery = rolesQuery;
},{}],"src/query/abilities.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.abilitiesQuery = void 0;
var abilitiesQuery = function abilitiesQuery() {
  return JSON.stringify({
    query: "{\n      constants {\n        abilities {\n          id,\n          language {\n            displayName\n          },\n        }\n    \n      }\n    }\n"
  });
};
exports.abilitiesQuery = abilitiesQuery;
},{}],"src/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SPELL_IMMUNITY_LIST = exports.PRIMARY_ATTR_LIST = exports.MP_UNIT = exports.IMG_ONERROR = exports.HP_UNIT = exports.DOTA_UNIT_TARGET_TEAM = exports.DAMAGE_TYPE = exports.BOUNUS_MANA_REGENERATION = exports.BOUNUS_HEALTH_REGENERATION = exports.BASE_MANA = exports.BASE_HEALTH = void 0;
var PRIMARY_ATTR_LIST = {
  str: "hero_strength",
  int: "hero_intelligence",
  agi: "hero_agility"
};
exports.PRIMARY_ATTR_LIST = PRIMARY_ATTR_LIST;
var IMG_ONERROR = "./images/Dota2Logo.svg";
exports.IMG_ONERROR = IMG_ONERROR;
var BASE_HEALTH = 200;
exports.BASE_HEALTH = BASE_HEALTH;
var HP_UNIT = 20;
exports.HP_UNIT = HP_UNIT;
var BOUNUS_HEALTH_REGENERATION = 0.1;
exports.BOUNUS_HEALTH_REGENERATION = BOUNUS_HEALTH_REGENERATION;
var BASE_MANA = 75;
exports.BASE_MANA = BASE_MANA;
var MP_UNIT = 12;
exports.MP_UNIT = MP_UNIT;
var BOUNUS_MANA_REGENERATION = 0.05;

// map damage type
exports.BOUNUS_MANA_REGENERATION = BOUNUS_MANA_REGENERATION;
var DAMAGE_TYPE = {
  0: "DAMAGE_TYPE_NONE",
  1: "DAMAGE_TYPE_PHYSICAL",
  2: "DAMAGE_TYPE_MAGICAL",
  4: "DAMAGE_TYPE_PURE",
  7: "DAMAGE_TYPE_ALL",
  8: "DAMAGE_TYPE_HP_REMOVAL"
};
exports.DAMAGE_TYPE = DAMAGE_TYPE;
var DOTA_UNIT_TARGET_TEAM = {
  0: "DOTA_UNIT_TARGET_TEAM_NONE",
  1: "DOTA_UNIT_TARGET_TEAM_FRIENDLY",
  2: "DOTA_UNIT_TARGET_TEAM_ENEMY",
  3: "DOTA_UNIT_TARGET_TEAM_BOTH",
  4: "DOTA_UNIT_TARGET_TEAM_CUSTOM"
};
exports.DOTA_UNIT_TARGET_TEAM = DOTA_UNIT_TARGET_TEAM;
var SPELL_IMMUNITY_LIST = {
  1: "Yes",
  3: "Yes",
  4: "No"
};
exports.SPELL_IMMUNITY_LIST = SPELL_IMMUNITY_LIST;
},{}],"src/config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIDEO_URL = exports.STRATZ_TOKEN = exports.STRATZ_HERO_URL = exports.STRATZ_API = exports.STRATZ_ABILITIE_URL = void 0;
// here we will store STRATZ token, api url, and hero url

var STRATZ_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJodHRwczovL3N0ZWFtY29tbXVuaXR5LmNvbS9vcGVuaWQvaWQvNzY1NjExOTgwODkwMDc0MDUiLCJ1bmlxdWVfbmFtZSI6Ik1tU29OLkx2IiwiU3ViamVjdCI6ImZhNzEzY2Y0LWZkZWEtNDhlOS1iN2IyLTYxYTNjN2FmZDE4YyIsIlN0ZWFtSWQiOiIxMjg3NDE2NzciLCJuYmYiOjE2NTk5MzgwNDEsImV4cCI6MTY5MTQ3NDA0MSwiaWF0IjoxNjU5OTM4MDQxLCJpc3MiOiJodHRwczovL2FwaS5zdHJhdHouY29tIn0.XsAnUKLVjJ9tISRr7O8ccReBQh2jN2h5hG0dmS7OfYA";
exports.STRATZ_TOKEN = STRATZ_TOKEN;
var STRATZ_API = "https://api.stratz.com/graphql";
exports.STRATZ_API = STRATZ_API;
var STRATZ_HERO_URL = "https://cdn.stratz.com/images/dota2/heroes";
exports.STRATZ_HERO_URL = STRATZ_HERO_URL;
var STRATZ_ABILITIE_URL = "https://cdn.stratz.com/images/dota2/abilities";
exports.STRATZ_ABILITIE_URL = STRATZ_ABILITIE_URL;
var VIDEO_URL = "https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/";
exports.VIDEO_URL = VIDEO_URL;
},{}],"src/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGraphqlData = exports.formatText = void 0;
var _config = require("./config.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// graphql fun
var getGraphqlData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(query) {
    var response, data;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return fetch(_config.STRATZ_API, {
            method: "post",
            body: query,
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer ".concat(_config.STRATZ_TOKEN)
            }
          });
        case 2:
          response = _context.sent;
          _context.next = 5;
          return response.json();
        case 5:
          data = _context.sent;
          return _context.abrupt("return", data);
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getGraphqlData(_x) {
    return _ref.apply(this, arguments);
  };
}();
exports.getGraphqlData = getGraphqlData;
var formatText = function formatText(string, splitChart, slicePlacement) {
  return string.split(splitChart).slice(slicePlacement);
};
exports.formatText = formatText;
},{"./config.js":"src/config.js"}],"src/index_card.js":[function(require,module,exports) {
"use strict";

var _hero = require("./query/hero.js");
var _roles = require("./query/roles.js");
var _abilities = require("./query/abilities.js");
var _constants = require("./constants.js");
var _config = require("./config.js");
var _utils = require("./utils.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// init state
var heroId = 1;
var heroData;
var rolesData;
var abilitiesData;

// Dom list
var heroCardNode = document.getElementsByClassName("hero-card")[0];
var heroCardFrontNode = document.getElementsByClassName("hero-card-front")[0];
var heroCards = document.getElementsByClassName("heroes-card");

// hero primary att
var heroPrimaryAttrNode = document.createElement("div");
heroPrimaryAttrNode.classList.add("hero-primary_attr");
heroCardFrontNode.appendChild(heroPrimaryAttrNode);
var heroPrimaryAttrDom = document.createElement("img");
heroPrimaryAttrNode.appendChild(heroPrimaryAttrDom);
// before the card flip, won't show the node
heroPrimaryAttrNode.style.display = "none";

// hero attack type
// it's similar with primary att show right top corner
var heroAttackTypeNode = document.createElement("div");
heroAttackTypeNode.classList.add("hero-attack_type");
heroCardFrontNode.appendChild(heroAttackTypeNode);
var heroAttackTypeDom = document.createElement("img");
heroAttackTypeNode.appendChild(heroAttackTypeDom);
// before the card flip, won't show the node
heroAttackTypeNode.style.display = "none";

// for base str, agi, int
var heroBaseNode = document.getElementsByClassName("hero-base")[0];

// hero abilities
var heroAbilitiesListNode = document.getElementsByClassName("hero-abilities-list")[0];

// hero video/image
var heroVideoNode = heroCardFrontNode.getElementsByClassName("hero-video")[0];
// hero video fallback img
var heroVideoNodeFallbackImgNode = document.createElement("img");
heroVideoNode.appendChild(heroVideoNodeFallbackImgNode);
var heroVideoSourceNode = document.createElement("source");
heroVideoNode.appendChild(heroVideoSourceNode);

// hero complexity for card
var complexityListNode = document.createElement("div");
complexityListNode.classList.add("complexity-list");
heroCardFrontNode.appendChild(complexityListNode);

// hero mp hp
var heroMpHpNode = heroCardFrontNode.getElementsByClassName("hero-mp-hp")[0];
var heroHpDom = document.createElement("span");
heroHpDom.classList.add("hero-hp");
heroMpHpNode.appendChild(heroHpDom);
var heroMpDom = document.createElement("span");
heroMpDom.classList.add("hero-mp");
heroMpHpNode.appendChild(heroMpDom);

// hero name
var heroNameNode = heroCardFrontNode.getElementsByClassName("hero-name")[0];

// hero roles
var heroRolesNode = heroCardFrontNode.getElementsByClassName("hero-roles")[0];

// hero info
var heroAttackNode = heroCardFrontNode.getElementsByClassName("hero-attack")[0];
var heroDefenseNode = heroCardFrontNode.getElementsByClassName("hero-defense")[0];
var heroMobilityNode = heroCardFrontNode.getElementsByClassName("hero-mobility")[0];

// base_attack
var heroBaseAttackDom = document.createElement("span");
heroBaseAttackDom.classList.add("hero-base_attack");
heroAttackNode.appendChild(heroBaseAttackDom);

// attack_rate
var heroAttackRateDom = document.createElement("span");
heroAttackRateDom.classList.add("hero-attack_rate");
heroAttackNode.appendChild(heroAttackRateDom);

// attack_range
var heroAttackRangeDom = document.createElement("span");
heroAttackRangeDom.classList.add("hero-attack_range");
heroAttackNode.appendChild(heroAttackRangeDom);

// trun_rate
var heroTurnRateDom = document.createElement("span");
heroTurnRateDom.classList.add("hero-turn_rate");
heroMobilityNode.appendChild(heroTurnRateDom);

// move_speed
var heroMoveSpeedDom = document.createElement("span");
heroMoveSpeedDom.classList.add("hero-move_speed");
heroMobilityNode.appendChild(heroMoveSpeedDom);

// vision
var heroVisionDom = document.createElement("span");
heroVisionDom.classList.add("hero-vision");
heroMobilityNode.appendChild(heroVisionDom);

// hero armor
var heroArmorDom = document.createElement("span");
heroArmorDom.classList.add("hero-armor");
heroDefenseNode.appendChild(heroArmorDom);

// hero magic resist
var heroMagicResistDom = document.createElement("span");
heroMagicResistDom.classList.add("hero-magic_resist");
heroDefenseNode.appendChild(heroMagicResistDom);

// part3
var heroAbilitiesTalentNode = heroCardFrontNode.getElementsByClassName("hero-abilities-talent")[0];
var heroScepterShardNode = document.createElement("img");
heroScepterShardNode.classList.add("hero-scepter-shard");
heroScepterShardNode.setAttribute("src", "./images/aghs_scepter.png");
heroScepterShardNode.setAttribute("alt", "Dota2 scepter Shard");
heroAbilitiesTalentNode.append(heroScepterShardNode);

// talent tooltip

var heroTalentNode = heroCardFrontNode.getElementsByClassName("hero-talent")[0];
var heroTalentTooltipNode = document.getElementsByClassName("talent-tooltip")[0];

// default tooltip should not display
heroTalentTooltipNode.style.display = "none";
var heroAbilityTooltipNode = document.getElementsByClassName("ability-tooltip")[0];
heroAbilityTooltipNode.style.display = "none";
var heroScepterShardTooltipNode = document.getElementsByClassName("scepter-shard-tooltip")[0];
heroScepterShardTooltipNode.style.display = "none";
// main()

var main = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var _iterator, _step, heroCard;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return init(heroId);
        case 2:
          // after click hero image should update the card
          _iterator = _createForOfIteratorHelper(heroCards);
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              heroCard = _step.value;
              heroCard.addEventListener("click", /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
                  return _regeneratorRuntime().wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        // first reset something
                        heroVideoNode.setAttribute("src", "./images/Dota2Logo.svg");
                        heroVideoNode.setAttribute("poster", "./images/Dota2Logo.svg");
                        heroVideoSourceNode.setAttribute("src", "./images/Dota2Logo.svg");
                        heroVideoNodeFallbackImgNode.setAttribute("src", "./images/Dota2Logo.svg");
                        // flip the card to back first
                        heroCardNode.style.transform = "rotateY(0deg)";
                        heroPrimaryAttrNode.style.display = "none";
                        heroAttackTypeNode.style.display = "none";
                        heroId = e.target.getAttribute("data-hero-id");
                        init(heroId);
                      case 9:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                }));
                return function (_x) {
                  return _ref2.apply(this, arguments);
                };
              }());
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function main() {
    return _ref.apply(this, arguments);
  };
}();
main();
function init(_x2) {
  return _init.apply(this, arguments);
}
function _init() {
  _init = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(heroId) {
    var _heroData$data$consta, abilities, stats, shortName, language, roles, talents, primaryAttribute, agilityBase, agilityGain, intelligenceBase, intelligenceGain, strengthBase, strengthGain, attackType, complexity, hpBarOffset, mpRegen, moveSpeed, moveTurnRate, startingMagicArmor, startingArmor, attackRate, attackRange, startingDamageMin, startingDamageMax, visionNighttimeRange, visionDaytimeRange;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _utils.getGraphqlData)((0, _hero.heroQuery)(heroId));
        case 2:
          heroData = _context3.sent;
          _context3.next = 5;
          return (0, _utils.getGraphqlData)((0, _roles.rolesQuery)());
        case 5:
          rolesData = _context3.sent;
          _context3.next = 8;
          return (0, _utils.getGraphqlData)((0, _abilities.abilitiesQuery)());
        case 8:
          abilitiesData = _context3.sent;
          // previous, we have a flip animation style for front and back card
          if (heroData && rolesData) {
            heroCardNode.style.transform = "rotateY(180deg)";
            heroPrimaryAttrNode.style.display = "flex";
            heroAttackTypeNode.style.display = "flex";
          }
          _heroData$data$consta = heroData.data.constants.hero, abilities = _heroData$data$consta.abilities, stats = _heroData$data$consta.stats, shortName = _heroData$data$consta.shortName, language = _heroData$data$consta.language, roles = _heroData$data$consta.roles, talents = _heroData$data$consta.talents;
          primaryAttribute = stats.primaryAttribute, agilityBase = stats.agilityBase, agilityGain = stats.agilityGain, intelligenceBase = stats.intelligenceBase, intelligenceGain = stats.intelligenceGain, strengthBase = stats.strengthBase, strengthGain = stats.strengthGain, attackType = stats.attackType, complexity = stats.complexity, hpBarOffset = stats.hpBarOffset, mpRegen = stats.mpRegen, moveSpeed = stats.moveSpeed, moveTurnRate = stats.moveTurnRate, startingMagicArmor = stats.startingMagicArmor, startingArmor = stats.startingArmor, attackRate = stats.attackRate, attackRange = stats.attackRange, startingDamageMin = stats.startingDamageMin, startingDamageMax = stats.startingDamageMax, visionNighttimeRange = stats.visionNighttimeRange, visionDaytimeRange = stats.visionDaytimeRange;
          updateHero(primaryAttribute, agilityBase, agilityGain, intelligenceBase, intelligenceGain, strengthBase, strengthGain, attackType, abilities, shortName, complexity, hpBarOffset, mpRegen, language, roles, rolesData, moveSpeed, moveTurnRate, startingMagicArmor, startingArmor, attackRate, attackRange, startingDamageMin, startingDamageMax, visionNighttimeRange, visionDaytimeRange, talents, abilitiesData);
        case 13:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _init.apply(this, arguments);
}
function updateHero(primaryAttribute, agilityBase, agilityGain, intelligenceBase, intelligenceGain, strengthBase, strengthGain, attackType, abilities, shortName, complexity, hpBarOffset, mpRegen, language, roles, rolesData, moveSpeed, moveTurnRate, startingMagicArmor, startingArmor, attackRate, attackRange, startingDamageMin, startingDamageMax, visionNighttimeRange, visionDaytimeRange, talents, abilitiesData) {
  setHeroBase(primaryAttribute, agilityBase, agilityGain, intelligenceBase, intelligenceGain, strengthBase, strengthGain);
  setHeroPrimaryAttribute(primaryAttribute);
  setHeroAttackType(attackType);
  setHeroAbilities(abilities);
  setHeroVideo(shortName);
  setHeroComplexity(complexity);
  setHeroHPMP(strengthBase, hpBarOffset, intelligenceBase, mpRegen);
  setHeroName(language.displayName);
  setHeroRoles(roles, rolesData.data.constants.roles);
  setHeroBasic(moveSpeed, moveTurnRate, startingMagicArmor, startingArmor, attackRate, attackRange, startingDamageMin, startingDamageMax, visionNighttimeRange, visionDaytimeRange);
  setHeroTalents(talents, abilitiesData.data.constants.abilities);
  setHeroAbilityHover(abilities);
  setHeroScepterShard(abilities);
}

/**
 * Set hero video/image
 * @param {string} shortName - Hero shortName for video
 */
function setHeroVideo(shortName) {
  // video poster
  heroVideoNode.setAttribute("src", _config.VIDEO_URL + shortName + ".webm");
  heroVideoNode.setAttribute("poster", _config.VIDEO_URL + shortName + ".png");
  heroVideoNodeFallbackImgNode.setAttribute("src", _config.VIDEO_URL + shortName + ".png");
  heroVideoSourceNode.setAttribute("src", _config.VIDEO_URL + shortName + ".webm");
  heroVideoSourceNode.setAttribute("type", "video/webm");
}

/**
 * Set hero name
 * @param {string} displayName - Hero display name base on the language
 */
function setHeroName(displayName) {
  heroNameNode.innerHTML = displayName;
}

/**
 * Set hero roles
 * @param {array} roles - List hero roles
 * @param {array} rolesData - List all roles
 */
function setHeroRoles(roles, rolesData) {
  heroRolesNode.innerHTML = "";
  var _iterator2 = _createForOfIteratorHelper(roles),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var role = _step2.value;
      var heroRolesDom = document.createElement("span");
      heroRolesDom.classList.add("hero-roles");
      heroRolesDom.innerHTML = role["roleId"] + ",";
      heroRolesNode.appendChild(heroRolesDom);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}

/**
 * Set hero hp mp
 * @param {number} strengthBase - Hero base strength
 * @param {number} hpBarOffset - Hero hp offset
 * @param {number} intelligenceBase - Hero base intelligence
 * @param {number} mpRegen - Hero mana regen
 */
function setHeroHPMP(strengthBase, hpBarOffset, intelligenceBase, mpRegen) {
  // Hero hp and hp regenration have some fomular
  // https://dota2.fandom.com/wiki/Health
  var hp = _constants.BASE_HEALTH + strengthBase * _constants.HP_UNIT;
  var hpGen = (hpBarOffset + strengthBase * _constants.BOUNUS_HEALTH_REGENERATION).toFixed(2);

  // https://dota2.fandom.com/wiki/Mana
  var mp = _constants.BASE_MANA + intelligenceBase * _constants.MP_UNIT;
  var mpGen = (mpRegen + intelligenceBase * _constants.BOUNUS_MANA_REGENERATION).toFixed(2);
  heroHpDom.innerHTML = hp + " / +" + hpGen;
  heroMpDom.innerHTML = mp + " / +" + mpGen;
}

/**
 * Set hero complexity at top right corner
 * @param {number} complexity - Hero complexity: 1, 2,3
 */
function setHeroComplexity(complexity) {
  complexityListNode.innerHTML = "";
  for (var i = 1; i <= complexity; i++) {
    var complexityImgDom = document.createElement("span");
    complexityImgDom.classList.add("hero-complexity-num");
    complexityListNode.appendChild(complexityImgDom);
  }
}

/**
 * Set hero base attribute
 * @param {string} primaryAttribute - Hero primary attribute
 * @param {number} agilityBase - Hero base agility
 * @param {number} agilityGain - Hero agility gain
 * @param {number} intelligenceBase - Hero base intelligence
 * @param {number} intelligenceGain - Hero intelligence gain
 * @param {number} strengthBase - Hero base strength
 * @param {number} strengthGain - Hero strength gain
 */
function setHeroBase(primaryAttribute, agilityBase, agilityGain, intelligenceBase, intelligenceGain, strengthBase, strengthGain) {
  heroBaseNode.innerHTML = "";
  // hero base
  var heroBaseStrGainDom = document.createElement("div");
  heroBaseStrGainDom.classList = ["hero-base-str-gain"];
  var heroBaseIntGainDom = document.createElement("div");
  heroBaseIntGainDom.classList = ["hero-base-int-gain"];
  var heroBaseAgiGainDom = document.createElement("div");
  heroBaseAgiGainDom.classList = ["hero-base-agi-gain"];
  heroBaseStrGainDom.innerHTML = "".concat(strengthBase, " <span>+").concat(strengthGain.toFixed(2), "</span>");
  heroBaseIntGainDom.innerHTML = "".concat(intelligenceBase, " <span>+").concat(intelligenceGain.toFixed(2), "</span>");
  heroBaseAgiGainDom.innerHTML = "".concat(agilityBase, " <span>+").concat(agilityGain.toFixed(2), "</span>");

  // here different primary attr hero, the first attr will be his primary attr
  if (primaryAttribute === "str") {
    heroBaseStrGainDom.classList.add("primary-att");
    heroBaseNode.appendChild(heroBaseStrGainDom);
    heroBaseNode.appendChild(heroBaseIntGainDom);
    heroBaseNode.appendChild(heroBaseAgiGainDom);
  } else if (primaryAttribute === "int") {
    heroBaseIntGainDom.classList.add("primary-att");
    heroBaseNode.appendChild(heroBaseIntGainDom);
    heroBaseNode.appendChild(heroBaseAgiGainDom);
    heroBaseNode.appendChild(heroBaseStrGainDom);
  } else if (primaryAttribute === "agi") {
    heroBaseAgiGainDom.classList.add("primary-att");
    heroBaseNode.appendChild(heroBaseAgiGainDom);
    heroBaseNode.appendChild(heroBaseStrGainDom);
    heroBaseNode.appendChild(heroBaseIntGainDom);
  }
}

/**
 * Set hero primary attribute image
 * @param {string} primaryAttribute - Hero primary attribute
 */
function setHeroPrimaryAttribute(primaryAttribute) {
  heroPrimaryAttrDom.setAttribute("src", "./images/".concat(_constants.PRIMARY_ATTR_LIST[primaryAttribute], ".png"));
}

/**
 * Set hero attack type image
 * @param {string} attackType - Hero attack type
 */
function setHeroAttackType(attackType) {
  heroAttackTypeDom.setAttribute("src", "./images/".concat(attackType.toLowerCase(), ".svg"));
}

/**
 * Set hero basic info
 * @param {number} moveSpeed - Hero move Speed
 * @param {number} moveTurnRate - Hero turn rate
 * @param {number} startingMagicArmor - Hero magic resist
 * @param {number} startingArmor  - Hero armor
 * @param {number} attackRate - Hero attack rate
 * @param {number} attackRange - Hero attack range
 * @param {number} startingDamageMin - Hero min damage
 * @param {number} startingDamageMax - Hero max damage
 * @param {number} visionNighttimeRange - Hero night time vision range
 * @param {number} visionDaytimeRange - Hero day time vision range
 */
function setHeroBasic(moveSpeed, moveTurnRate, startingMagicArmor, startingArmor, attackRate, attackRange, startingDamageMin, startingDamageMax, visionNighttimeRange, visionDaytimeRange) {
  // attack
  var baseAttack = "".concat(startingDamageMin, " - ").concat(startingDamageMax);
  // vision
  var vision = "".concat(visionNighttimeRange, " - ").concat(visionDaytimeRange);

  // attack
  heroBaseAttackDom.innerHTML = baseAttack;
  heroAttackRateDom.innerHTML = attackRate.toFixed(2);
  heroAttackRangeDom.innerHTML = attackRange;

  // defense
  heroArmorDom.innerHTML = startingArmor.toFixed(2);
  heroMagicResistDom.innerHTML = startingMagicArmor + "%";

  // mobility
  heroTurnRateDom.innerHTML = moveTurnRate.toFixed(2);
  heroMoveSpeedDom.innerHTML = moveSpeed;
  heroVisionDom.innerHTML = vision;
}

/**
 * Set hero abilities
 * @param {array} abilities - hero abilities
 */
function setHeroAbilities(abilities) {
  heroAbilitiesListNode.innerHTML = "";
  // we need filter those generic_hidden abilities that are useless
  abilities = abilities.filter(function (ability) {
    return ability["ability"]["name"] !== "generic_hidden";
  });

  // only list normal abilities
  var onlyNoramlAbilities = abilities.filter(function (ability) {
    return !ability["ability"]["stat"]["isGrantedByScepter"] && !ability["ability"]["stat"]["isGrantedByShard"];
  });

  // here get ability is graned by scepter, some ability is granted by scepter some is upgraded
  var abilitiesIsGrantedByScepter = abilities.filter(function (i) {
    return i["ability"]["stat"]["isGrantedByScepter"] || i["ability"]["stat"]["hasScepterUpgrade"];
  })[0];
  var abilitiesIsGrantedByShard = abilities.filter(function (i) {
    var _i$ability$language;
    return ((_i$ability$language = i["ability"]["language"]) === null || _i$ability$language === void 0 ? void 0 : _i$ability$language.shardDescription) || i["ability"]["stat"]["isGrantedByShard"];
  })[0];
  var _iterator3 = _createForOfIteratorHelper(onlyNoramlAbilities),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var ability = _step3.value;
      var heroAbilityDom = document.createElement("img");
      heroAbilityDom.setAttribute("onerror", "this.src=\"".concat(_constants.IMG_ONERROR, "\""));
      heroAbilityDom.setAttribute("src", "".concat(_config.STRATZ_ABILITIE_URL, "/").concat(ability["ability"]["name"], ".png"));
      heroAbilityDom.setAttribute("data-ability", ability["ability"]["name"]);
      // I wanna add yellow border for ultimate abilities
      heroAbilityDom.classList.add("hero-ability");
      if (ability["ability"]["stat"]["isUltimate"]) {
        heroAbilityDom.classList.add("hero-ability-isUltimate");
      }
      heroAbilitiesListNode.appendChild(heroAbilityDom);
    }
    // show the shard icon/scepter icon
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  heroScepterShardNode.setAttribute("src", "./images/aghs_".concat(!!abilitiesIsGrantedByScepter ? 1 : 0, "_scepter_").concat(!!abilitiesIsGrantedByShard ? 1 : 0, ".png"));
}

// {
//   "slot": 1,
//   "gameVersionId": 149,
//   "abilityId": 5003,
//   "ability": {
//     "id": 5003,
//     "name": "antimage_mana_break",
//     "uri": "antimage",
//     "language": {
//       "displayName": "Mana Break",
//       "description": [
//         "Burns an opponent's mana on each attack. Mana Break deals 50% of the mana burned as damage to the target. Mana Break has 50% effect if caused by illusions."
//       ],
//       "attributes": [
//         "MANA BURNED PER HIT: 28 / 40 / 52 / 64",
//         "MAX MANA BURNED PER HIT: 1% / 1.8% / 2.6% / 3.4%"
//       ],
//       "lore": "A modified technique of the Turstarkuri monks' peaceful ways is to turn magical energies on their owner.",
//       "aghanimDescription": null,
//       "shardDescription": null,
//       "notes": []
//     },
//     "stat": {
//       "abilityId": 5003,
//       "type": 0,
//       "behavior": 2,
//       "unitTargetType": 0,
//       "unitTargetTeam": 0,
//       "unitTargetFlags": 0,
//       "unitDamageType": 1,
//       "spellImmunity": 4,
//       "modifierSupportValue": 1,
//       "modifierSupportBonus": 0,
//       "isOnCastbar": true,
//       "isOnLearnbar": true,
//       "fightRecapLevel": 0,
//       "isGrantedByScepter": false,
//       "hasScepterUpgrade": false,
//       "maxLevel": null,
//       "levelsBetweenUpgrades": 0,
//       "requiredLevel": 0,
//       "hotKeyOverride": null,
//       "displayAdditionalHeroes": false,
//       "castRange": null,
//       "castRangeBuffer": [
//         250
//       ],
//       "castPoint": null,
//       "channelTime": null,
//       "cooldown": null,
//       "damage": null,
//       "manaCost": null,
//       "isUltimate": false,
//       "duration": "",
//       "charges": "",
//       "chargeRestoreTime": "",
//       "isGrantedByShard": false,
//       "dispellable": "NONE"
//     },
//     "attributes": [
//       {
//         "name": "illusion_percentage",
//         "value": "50",
//         "linkedSpecialBonusAbilityId": null,
//         "requiresScepter": false
//       },
//       {
//         "name": "mana_per_hit",
//         "value": "28 40 52 64",
//         "linkedSpecialBonusAbilityId": null,
//         "requiresScepter": false
//       },
//       {
//         "name": "mana_per_hit_pct",
//         "value": "1 1.8 2.6 3.4",
//         "linkedSpecialBonusAbilityId": 666,
//         "requiresScepter": false
//       },
//       {
//         "name": "percent_damage_per_burn",
//         "value": "50",
//         "linkedSpecialBonusAbilityId": null,
//         "requiresScepter": false
//       },
//       {
//         "name": "silence_chance",
//         "value": "15",
//         "linkedSpecialBonusAbilityId": null,
//         "requiresScepter": false
//       },
//       {
//         "name": "silence_duration",
//         "value": "3",
//         "linkedSpecialBonusAbilityId": null,
//         "requiresScepter": false
//       }
//     ],
//     "isTalent": false
//   }
// },

// "stats": {
//   "enabled": true,
//   "heroUnlockOrder": 1,
//   "team": true,
//   "cMEnabled": true,
//   "newPlayerEnabled": true,
//   "attackType": "Melee",
//   "startingArmor": 4,
//   "startingMagicArmor": 25,
//   "startingDamageMin": 53,
//   "startingDamageMax": 57,
//   "attackRate": 1.399999976158142,
//   "attackAnimationPoint": 0.30000001192092896,
//   "attackAcquisitionRange": 600,
//   "attackRange": 150,
//   "primaryAttribute": "agi",
//   "strengthBase": 23,
//   "strengthGain": 1.600000023841858,
//   "intelligenceBase": 12,
//   "intelligenceGain": 1.7999999523162842,
//   "agilityBase": 24,
//   "agilityGain": 2.799999952316284,
//   "mpRegen": 0,
//   "moveSpeed": 310,
//   "moveTurnRate": 0.6000000238418579,
//   "hpBarOffset": 0,
//   "visionDaytimeRange": 1800,
//   "visionNighttimeRange": 800,
//   "complexity": 1
// }

function setHeroTalents(talents, abilitiesData) {
  heroTalentTooltipNode.innerHTML = "<span class='talent-bg-img'></span>";
  // talents
  talents = talents.reverse();
  var _iterator4 = _createForOfIteratorHelper(talents),
    _step4;
  try {
    var _loop = function _loop() {
      var _heroTalentData$langu, _heroTalentData$langu2;
      var talent = _step4.value;
      var heroTalentsDom = document.createElement("span");
      heroTalentTooltipNode.appendChild(heroTalentsDom);
      var heroTalentData = abilitiesData.find(function (ability) {
        return ability["id"] === talent["abilityId"];
      });
      heroTalentsDom.innerHTML = (_heroTalentData$langu = (_heroTalentData$langu2 = heroTalentData["language"]) === null || _heroTalentData$langu2 === void 0 ? void 0 : _heroTalentData$langu2.displayName) !== null && _heroTalentData$langu !== void 0 ? _heroTalentData$langu : "loading";
      heroTalentsDom.classList = ["talent-rows item".concat(talent["slot"])];
    };
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
}

// TODO: hover the talent note
heroTalentNode.addEventListener("mouseover", function (e) {
  // after show the tooltip, we need position above the talent icon
  var heroTalent = e.target;
  dynamicModalPostion(heroTalent, "talent-tooltip", "flex");
  // const heroCard = e["path"].filter((i) => i["className"] === "hero-card")[0];
  // const heroAbilitiesTalent = e["path"].filter(
  //   (i) => i["className"] === "hero-abilities-talent"
  // )[0];

  // heroTalentTooltipNode.style.display = "flex";

  // const tooltipHeight = heroTalentTooltipNode.offsetHeight;
  // const tooltipWidth = heroTalentTooltipNode.offsetWidth;

  // const tooltipX =
  //   heroCard["offsetLeft"] +
  //   heroTalent["offsetLeft"] +
  //   heroTalent["width"] / 2 -
  //   tooltipWidth / 2 +
  //   heroAbilitiesTalent["offsetLeft"] +
  //   "px";

  // const tooltipY =
  //   heroCard["offsetTop"] +
  //   heroTalent["offsetTop"] -
  //   tooltipHeight +
  //   heroAbilitiesTalent["offsetTop"] +
  //   "px";
  // heroTalentTooltipNode.style.left = tooltipX;
  // heroTalentTooltipNode.style.top = tooltipY;
});

heroTalentNode.addEventListener("mouseout", function (e) {
  heroTalentTooltipNode.style.display = "none";
});

// ability tooltip
function setHeroAbilityHover(abilities) {
  var heroAbilitiesList = heroCardFrontNode.getElementsByClassName("hero-ability");
  var _iterator5 = _createForOfIteratorHelper(heroAbilitiesList),
    _step5;
  try {
    var _loop2 = function _loop2() {
      var i = _step5.value;
      i.addEventListener("mouseover", function (e) {
        var heroAbility = e.target;
        heroAbilityTooltipNode.innerHTML = abilityTooltipTem(heroAbility.getAttribute("data-ability"), abilities);
        dynamicModalPostion(heroAbility, "ability-tooltip");

        // similar with talent tooltip position
        // const heroCard = e["path"].filter(
        //   (p) => p["className"] === "hero-card"
        // )[0];
        // const heroAbilitiesTalent = e["path"].filter(
        //   (p) => p["className"] === "hero-abilities-talent"
        // )[0];

        // heroAbilityTooltipNode.style.display = "block";

        // const tooltipHeight = heroAbilityTooltipNode.offsetHeight;
        // const tooltipWidth = heroAbilityTooltipNode.offsetWidth;

        // let tooltipX, tooltipY;

        // // if modal height is exceed the top edge, we should move the modal right display
        // if (
        //   tooltipHeight >
        //   heroCard["offsetTop"] + heroAbility["offsetTop"] - 20
        // ) {
        //   tooltipX =
        //     heroCard["offsetLeft"] +
        //     heroAbility["offsetLeft"] +
        //     heroAbility["width"] +
        //     heroAbilitiesTalent["offsetLeft"] +
        //     "px";
        //   tooltipY =
        //     heroCard["offsetTop"] +
        //     heroAbility["offsetTop"] +
        //     heroAbility["height"] -
        //     tooltipHeight / 2 +
        //     "px";
        // } else {
        //   tooltipX =
        //     heroCard["offsetLeft"] +
        //     heroAbility["offsetLeft"] +
        //     heroAbility["width"] / 2 -
        //     tooltipWidth / 2 +
        //     heroAbilitiesTalent["offsetLeft"] +
        //     "px";
        //   tooltipY =
        //     heroCard["offsetTop"] +
        //     heroAbility["offsetTop"] -
        //     tooltipHeight +
        //     heroAbilitiesTalent["offsetTop"] +
        //     "px";
        // }

        // heroAbilityTooltipNode.style.left = tooltipX;
        // heroAbilityTooltipNode.style.top = tooltipY;

        i.addEventListener("mouseout", function (e) {
          heroAbilityTooltipNode.style.display = "none";
        });
      });
    };
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      _loop2();
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
}

// hover on the ability node
// abilities tooltip content template
var abilityTooltipTem = function abilityTooltipTem(abilityName, abilities) {
  var ability = abilities.find(function (ability) {
    return ability["ability"]["name"] === abilityName;
  });
  var _ability$ability = ability["ability"],
    name = _ability$ability.name,
    language = _ability$ability.language,
    attributes = _ability$ability.attributes,
    stat = _ability$ability.stat;
  var cooldown = stat.cooldown,
    manaCost = stat.manaCost,
    unitDamageType = stat.unitDamageType,
    dispellable = stat.dispellable,
    unitTargetTeam = stat.unitTargetTeam,
    spellImmunity = stat.spellImmunity;
  var _ref3 = language || {},
    displayName = _ref3.displayName,
    description = _ref3.description;
  var imgData = "".concat(_config.STRATZ_ABILITIE_URL, "/").concat(name, ".png");
  var abilityHTML = "";
  abilityHTML = abilityScepterShardCommonContent(spellImmunity, manaCost, cooldown, attributes, unitDamageType, dispellable, unitTargetTeam, description);
  return "\n    <div class=\"item-main\">\n      <img height=\"50px\" src='".concat(imgData, "' onerror='this.src=\"").concat(_constants.IMG_ONERROR, "\"'/>\n      <div class=\"item-main-right\"><h3>").concat(displayName, "</h3></div>\n    </div>\n\n    ").concat(abilityHTML, "\n    \n  \n    ");
};

// seem scepter and ablitiy modal have common content I will grab them in a function for reuse
function abilityScepterShardCommonContent(spellImmunity, manaCost, cooldown, attributes, unitDamageType, dispellable, unitTargetTeam) {
  var description = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : "";
  // mana cose
  var mcData = manaCost !== null ? manaCost.join(" / ") : "NA";
  //cool down
  var cdData = cooldown !== null ? cooldown.join(" / ") : "NA";
  var attribData = "";
  if (attributes) {
    var _iterator6 = _createForOfIteratorHelper(attributes),
      _step6;
    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var attr = _step6.value;
        var name = attr.name,
          value = attr.value;
        var nameData = name.replaceAll("_", " ").toUpperCase();
        var valueData = value.replaceAll(" ", " / ");
        attribData += "<div class=\"item-row\"><label>".concat(nameData, ":</label><span class=\"item-value\"> ").concat(valueData, " </span></div>");
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }
  }

  // here damage type is base on
  var damTypeText;
  if (unitDamageType === 1) {
    damTypeText = "red-txt";
  } else if (unitDamageType === 2) {
    damTypeText = "blue-txt";
  } else {
    damTypeText = "green-txt";
  }
  var dispellableHTML = dispellable === "YES" ? "<div class=\"item-row\"><label>DISPELLABLE:</label>".concat(dispellable, "</div>") : "";
  var dmgTypeHTML = unitDamageType ? "<div class=\"item-row\"><label>DAMAGE TYPE:</label><span class=\"".concat(damTypeText, "\">").concat((0, _utils.formatText)(_constants.DAMAGE_TYPE[unitDamageType], "_", 2), "</span></div>") : "";
  var unitTargetTeamHTML = unitTargetTeam ? "\n  <div class=\"item-row\"><label>DAMAGE AFFECTS: <label><span>\n      ".concat((0, _utils.formatText)(_constants.DOTA_UNIT_TARGET_TEAM[unitTargetTeam], "_", 4), "\n  </span></div>") : "";
  var spellImmunityText = spellImmunity !== 4 ? "green-txt" : "red-txt";
  var spellImmunityHTML = spellImmunity ? "\n  <div class=\"item-row\"><label>PIERCES SPELL IMMUNITY: <label><span class=\"".concat(spellImmunityText, "\">\n      ").concat(_constants.SPELL_IMMUNITY_LIST[spellImmunity], "\n</span></div>\n  ") : "";
  return "<div class=\"item-sub box\">\n    ".concat(unitTargetTeamHTML, "\n    ").concat(dispellableHTML, "\n    ").concat(dmgTypeHTML, "\n    ").concat(spellImmunityHTML, "\n  </div>\n\n  ").concat(description ? "<div class=\"item-desc box\">".concat(description[0], "</div>") : "", "\n  ").concat(attributes ? "<div class=\"item-sub box\"> ".concat(attribData, " </div>") : "", "\n\n  ").concat(manaCost !== null && cooldown !== null ? "\n    <div class=\"item-mc-cd\">\n      ".concat(manaCost !== null ? "\n        <span class=\"item-mc\">\n          <span class=\"mana-icon\"></span>".concat(mcData, "\n        </span>\n      ") : "", "\n      ").concat(cooldown !== null ? "\n        <span class=\"item-cd\">\n          <img width=\"15px\" height=\"15px\" alt=\"cooldown\" src=\"./images/cooldown.png\"/>".concat(cdData, "\n        </span>\n      ") : "", "\n    </div>\n    ") : "");
}

// scepter modal
heroScepterShardNode.addEventListener("mouseover", function (e) {
  var heroScepterShard = e.target;
  dynamicModalPostion(heroScepterShard, "scepter-shard-tooltip", "flex");
  // const heroCard = e["path"].filter((p) => p["className"] === "hero-card")[0];
  // const heroAbilitiesTalent = e["path"].filter(
  //   (p) => p["className"] === "hero-abilities-talent"
  // )[0];

  // heroScepterShardTooltipNode.style.display = "flex";

  // const tooltipHeight = heroScepterShardTooltipNode.offsetHeight;
  // const tooltipWidth = heroScepterShardTooltipNode.offsetWidth;

  // const tooltipX =
  //   heroCard["offsetLeft"] +
  //   heroScepterShard["offsetLeft"] +
  //   heroScepterShard["width"] +
  //   heroAbilitiesTalent["offsetLeft"] +
  //   "px";

  // const tooltipY =
  //   heroCard["offsetTop"] +
  //   heroScepterShard["offsetTop"] +
  //   heroScepterShard["height"] / 2 -
  //   tooltipHeight / 2 +
  //   "px";

  // heroScepterShardTooltipNode.style.left = tooltipX;
  // heroScepterShardTooltipNode.style.top = tooltipY;
});

heroScepterShardNode.addEventListener("mouseout", function (e) {
  heroScepterShardTooltipNode.style.display = "none";
});

// scepter data
function setHeroScepterShard(abilities) {
  heroScepterShardTooltipNode.innerHTML = "";
  // here get ability is graned by scepter, some ability is granted by scepter some is upgraded
  var abilitiesIsGrantedByScepter = abilities.filter(function (i) {
    var _i$ability$language2, _i$ability$language3;
    return i["ability"]["stat"]["isGrantedByScepter"] || i["ability"]["stat"]["hasScepterUpgrade"] && (((_i$ability$language2 = i["ability"]["language"]) === null || _i$ability$language2 === void 0 ? void 0 : _i$ability$language2.aghanimDescription) || ((_i$ability$language3 = i["ability"]["language"]) === null || _i$ability$language3 === void 0 ? void 0 : _i$ability$language3.description[0]));
  })[0];
  var abilitiesIsGrantedByShard = abilities.filter(function (i) {
    var _i$ability$language4;
    return i["ability"]["stat"]["isGrantedByShard"] || ((_i$ability$language4 = i["ability"]["language"]) === null || _i$ability$language4 === void 0 ? void 0 : _i$ability$language4.shardDescription);
  })[0];
  return heroScepterShardTooltipNode.innerHTML = "\n    ".concat(scepterShardTooltipTem(abilitiesIsGrantedByScepter, "scepter"), "\n    <div class=\"divided\"></div>\n    ").concat(scepterShardTooltipTem(abilitiesIsGrantedByShard, "shard"), "\n  ");
}
var scepterShardTooltipTem = function scepterShardTooltipTem(ability, isScepterOrShard) {
  // if no ability, show no data but some UI
  if (!ability) {
    return "\n      <div class=\"".concat(isScepterOrShard, " scepter-shard-row\">\n        <div class=\"item-main\">\n          <img src=\"./images/").concat(isScepterOrShard, "_0.png\" alt=\"").concat(isScepterOrShard, " img\" />\n          <div class=\"item-main-right\">\n            <h3>Aghanim's ").concat(isScepterOrShard, "</h3>\n          </div>\n        </div>\n        <div class=\"no-detail\">Current the hero does not have Aghanim</div>\n      </div>\n    ");
  }
  var _ability$ability2 = ability["ability"],
    stat = _ability$ability2.stat,
    language = _ability$ability2.language,
    name = _ability$ability2.name,
    attributes = _ability$ability2.attributes;
  var hasScepterUpgrade = stat.hasScepterUpgrade,
    isGrantedByShard = stat.isGrantedByShard,
    cooldown = stat.cooldown,
    manaCost = stat.manaCost,
    unitDamageType = stat.unitDamageType,
    dispellable = stat.dispellable,
    spellImmunity = stat.spellImmunity,
    unitTargetTeam = stat.unitTargetTeam;
  var _ref4 = language || {},
    aghanimDescription = _ref4.aghanimDescription,
    description = _ref4.description,
    displayName = _ref4.displayName,
    shardDescription = _ref4.shardDescription;
  var imgData = "".concat(_config.STRATZ_ABILITIE_URL, "/").concat(name, ".png");
  var isScepterUpgradeHTML;
  var upgradeOrNewText = "UPGRADE";
  var abilityHTML;
  // for scepter and shared, some abilities is granted some is upgraded
  if (isScepterOrShard === "scepter") {
    isScepterUpgradeHTML = hasScepterUpgrade && aghanimDescription ? aghanimDescription : description;
    upgradeOrNewText = hasScepterUpgrade && aghanimDescription ? "UPGRADE" : "NEW";
  }
  if (isScepterOrShard === "shard") {
    upgradeOrNewText = isGrantedByShard ? "NEW" : "UPGRADE";
  }
  // if new, we will show common content like ability, if it's upgrade, we some simple data
  if (upgradeOrNewText === "NEW") {
    abilityHTML = abilityScepterShardCommonContent(spellImmunity, manaCost, cooldown, attributes, unitDamageType, dispellable, unitTargetTeam);
  }
  return "\n      <div class=\"".concat(isScepterOrShard, " scepter-shard-row\">\n        <div class=\"item-main\">\n          <img src=\"../images/").concat(isScepterOrShard, "_1.png\" alt=\"").concat(isScepterOrShard, " img\" />\n          <div class=\"item-main-right\">\n            <h3>Aghanim's ").concat(isScepterOrShard, "</h3>\n          </div>\n        </div>\n\n        <div class=\"item-detail\">\n          <img class=\"ability-img\" src=\"").concat(imgData, "\" />\n          <div class=\"item-detail-right\">\n            <h3>").concat(displayName, " <span>").concat(upgradeOrNewText, "</span></h3>\n            <p>").concat(isScepterOrShard === "scepter" ? isScepterUpgradeHTML : shardDescription, "</p>\n            ").concat(abilityHTML, "\n          </div>\n        </div>\n    </div>\n    ");
};
var pushEl = function pushEl(t) {
  var className = t.className,
    offsetTop = t.offsetTop,
    offsetLeft = t.offsetLeft,
    offsetHeight = t.offsetHeight,
    offsetWidth = t.offsetWidth,
    width = t.width,
    height = t.height;
  return {
    className: className,
    offsetTop: offsetTop,
    offsetLeft: offsetLeft,
    offsetHeight: offsetHeight,
    offsetWidth: offsetWidth,
    width: width,
    height: height
  };
};
function dynamicModalPostion(target, modalNodeClas) {
  var modalNodeDisplayValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "block";
  var t = target,
    i = 0,
    arr = [];
  var mouseTargetWidth = target["offsetWidth"];
  var mouseTargetHeight = target["offsetHeight"];
  var windowScrollY = window.scrollY;
  var windowScrollX = window.scrollX;
  arr.push(pushEl(t));
  do {
    t = t.offsetParent;
    i++;
    arr.push(pushEl(t));
  } while (t.offsetParent);
  var tooltipXOffsetLeftTotal = arr.reduce(function (total, cur) {
    return total + cur.offsetLeft;
  }, 0);
  var tooltipYOffsetTopTotal = arr.reduce(function (total, cur) {
    return total + cur.offsetTop;
  }, 0);
  var tooltipX, tooltipY;
  var modalNode = document.getElementsByClassName(modalNodeClas)[0];
  modalNode.style.display = modalNodeDisplayValue;
  var tooltipHeight = modalNode.offsetHeight;
  var tooltipWidth = modalNode.offsetWidth;

  // top
  if (tooltipYOffsetTopTotal - windowScrollY >= tooltipHeight) {
    tooltipY = tooltipYOffsetTopTotal - tooltipHeight + "px";

    // top  center----
    if (tooltipXOffsetLeftTotal - windowScrollX >= tooltipWidth / 2) {
      tooltipX = tooltipXOffsetLeftTotal + mouseTargetWidth / 2 - tooltipWidth / 2 + "px";
    }
    // top left -----
    if (tooltipXOffsetLeftTotal - windowScrollX < tooltipWidth / 2) {
      tooltipX = tooltipXOffsetLeftTotal + "px";
    }
    // top right ---
    if (window.innerWidth - (tooltipXOffsetLeftTotal - windowScrollX + mouseTargetWidth) < tooltipWidth / 2) {
      tooltipX = tooltipXOffsetLeftTotal + mouseTargetHeight - tooltipWidth + "px";
    }
  }

  // top edge
  if (tooltipYOffsetTopTotal - windowScrollY < tooltipHeight / 2) {
    tooltipY = tooltipYOffsetTopTotal + "px";
    // top edge left
    if (window.innerWidth - (tooltipXOffsetLeftTotal - windowScrollX + mouseTargetWidth) >= tooltipWidth) {
      tooltipX = tooltipXOffsetLeftTotal + mouseTargetWidth + "px";
    }
    // top edget right
    if (window.innerWidth - (tooltipXOffsetLeftTotal - windowScrollX + mouseTargetWidth) < tooltipWidth) {
      tooltipX = tooltipXOffsetLeftTotal - tooltipWidth + "px";
    }
  }

  // vertical
  if (tooltipYOffsetTopTotal - windowScrollY < tooltipHeight && tooltipYOffsetTopTotal - windowScrollY >= tooltipHeight / 2) {
    tooltipY = tooltipYOffsetTopTotal + mouseTargetHeight / 2 - tooltipHeight / 2 + "px";

    // vertical right
    if (window.innerWidth - (tooltipXOffsetLeftTotal - windowScrollX + mouseTargetWidth) >= tooltipWidth) {
      tooltipX = tooltipXOffsetLeftTotal + mouseTargetWidth + "px";
    }

    // vertical left
    if (window.innerWidth - (tooltipXOffsetLeftTotal - windowScrollX + mouseTargetWidth) < tooltipWidth) {
      tooltipX = tooltipXOffsetLeftTotal - tooltipWidth + "px";
    }
  }

  // bottom edge
  if (window.innerHeight - (tooltipYOffsetTopTotal - windowScrollY + mouseTargetHeight) < tooltipHeight / 2) {
    tooltipY = tooltipYOffsetTopTotal + mouseTargetHeight - tooltipHeight + "px";

    // bottom edge right
    if (window.innerWidth - (tooltipXOffsetLeftTotal - windowScrollX + mouseTargetWidth) >= tooltipWidth) {
      tooltipX = tooltipXOffsetLeftTotal + mouseTargetWidth + "px";
    }

    // bottom edge left
    if (window.innerWidth - (tooltipXOffsetLeftTotal - windowScrollX + mouseTargetWidth) < tooltipWidth) {
      tooltipX = tooltipXOffsetLeftTotal - tooltipWidth + "px";
    }
  }

  // bottom
  if (tooltipYOffsetTopTotal - windowScrollY < 0) {
    tooltipY = tooltipYOffsetTopTotal + mouseTargetHeight + "px";

    // top  center----
    if (tooltipXOffsetLeftTotal - windowScrollX >= tooltipWidth / 2) {
      tooltipX = tooltipXOffsetLeftTotal + mouseTargetWidth / 2 - tooltipWidth / 2 + "px";
    }
    // top left -----
    if (tooltipXOffsetLeftTotal - windowScrollX < tooltipWidth / 2) {
      tooltipX = tooltipXOffsetLeftTotal + "px";
    }
    // top right ---
    if (window.innerWidth - (tooltipXOffsetLeftTotal - windowScrollX + mouseTargetWidth) < tooltipWidth / 2) {
      tooltipX = tooltipXOffsetLeftTotal + mouseTargetHeight - tooltipWidth + "px";
    }
  }
  modalNode.style.left = tooltipX;
  modalNode.style.top = tooltipY;
  console.log(windowScrollY);
  // console.table(arr)
  // console.log(tooltipYOffsetTopTotal - windowScrollY)
}
},{"./query/hero.js":"src/query/hero.js","./query/roles.js":"src/query/roles.js","./query/abilities.js":"src/query/abilities.js","./constants.js":"src/constants.js","./config.js":"src/config.js","./utils.js":"src/utils.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "33399" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index_card.js"], null)
//# sourceMappingURL=/index_card.526640ff.js.map