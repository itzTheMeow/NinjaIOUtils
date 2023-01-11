// ==UserScript==
// @name         NinjaIOUtils
// @namespace    https://itsmeow.cat
// @description  A modloader for Ninja.io.
// @author       Meow
// @match        https://ninja.io/*
// @match        https://ninja.io
// @match        http://ninja.io/*
// @match        http://ninja.io
// @match        https://*.ninja.io/*
// @match        http://*.ninja.io/*
// @match        https://*.ninja.io
// @match        http://*.ninja.io
// @icon         https://www.google.com/s2/favicons?domain=ninja.io
// @require      https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.5.1/socket.io.min.js
// @homepageURL  https://nutils.itsmeow.cat
// @supportURL   https://github.com/itzTheMeow/NinjaIOUtils/issues
// @grant        none
// @version      2.0
// ==/UserScript==

/*
  This file was generated automatically by a build script!
  If you want to see the source code, view it on github:
  > https://github.com/itzTheMeow/NinjaIOUtils
*/

(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
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
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

  // node_modules/localforage/dist/localforage.js
  var require_localforage = __commonJS({
    "node_modules/localforage/dist/localforage.js"(exports, module) {
      (function(f) {
        if (typeof exports === "object" && typeof module !== "undefined") {
          module.exports = f();
        } else if (typeof define === "function" && define.amd) {
          define([], f);
        } else {
          var g;
          if (typeof window !== "undefined") {
            g = window;
          } else if (typeof global !== "undefined") {
            g = global;
          } else if (typeof self !== "undefined") {
            g = self;
          } else {
            g = this;
          }
          g.localforage = f();
        }
      })(function() {
        var define2, module2, exports2;
        return function e(t, n, r) {
          function s(o2, u) {
            if (!n[o2]) {
              if (!t[o2]) {
                var a = typeof __require == "function" && __require;
                if (!u && a)
                  return a(o2, true);
                if (i)
                  return i(o2, true);
                var f = new Error("Cannot find module '" + o2 + "'");
                throw f.code = "MODULE_NOT_FOUND", f;
              }
              var l = n[o2] = { exports: {} };
              t[o2][0].call(l.exports, function(e2) {
                var n2 = t[o2][1][e2];
                return s(n2 ? n2 : e2);
              }, l, l.exports, e, t, n, r);
            }
            return n[o2].exports;
          }
          var i = typeof __require == "function" && __require;
          for (var o = 0; o < r.length; o++)
            s(r[o]);
          return s;
        }({ 1: [function(_dereq_, module3, exports3) {
          (function(global2) {
            "use strict";
            var Mutation = global2.MutationObserver || global2.WebKitMutationObserver;
            var scheduleDrain;
            {
              if (Mutation) {
                var called = 0;
                var observer = new Mutation(nextTick);
                var element = global2.document.createTextNode("");
                observer.observe(element, {
                  characterData: true
                });
                scheduleDrain = function() {
                  element.data = called = ++called % 2;
                };
              } else if (!global2.setImmediate && typeof global2.MessageChannel !== "undefined") {
                var channel = new global2.MessageChannel();
                channel.port1.onmessage = nextTick;
                scheduleDrain = function() {
                  channel.port2.postMessage(0);
                };
              } else if ("document" in global2 && "onreadystatechange" in global2.document.createElement("script")) {
                scheduleDrain = function() {
                  var scriptEl = global2.document.createElement("script");
                  scriptEl.onreadystatechange = function() {
                    nextTick();
                    scriptEl.onreadystatechange = null;
                    scriptEl.parentNode.removeChild(scriptEl);
                    scriptEl = null;
                  };
                  global2.document.documentElement.appendChild(scriptEl);
                };
              } else {
                scheduleDrain = function() {
                  setTimeout(nextTick, 0);
                };
              }
            }
            var draining;
            var queue = [];
            function nextTick() {
              draining = true;
              var i, oldQueue;
              var len = queue.length;
              while (len) {
                oldQueue = queue;
                queue = [];
                i = -1;
                while (++i < len) {
                  oldQueue[i]();
                }
                len = queue.length;
              }
              draining = false;
            }
            module3.exports = immediate;
            function immediate(task) {
              if (queue.push(task) === 1 && !draining) {
                scheduleDrain();
              }
            }
          }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
        }, {}], 2: [function(_dereq_, module3, exports3) {
          "use strict";
          var immediate = _dereq_(1);
          function INTERNAL() {
          }
          var handlers = {};
          var REJECTED = ["REJECTED"];
          var FULFILLED = ["FULFILLED"];
          var PENDING = ["PENDING"];
          module3.exports = Promise2;
          function Promise2(resolver) {
            if (typeof resolver !== "function") {
              throw new TypeError("resolver must be a function");
            }
            this.state = PENDING;
            this.queue = [];
            this.outcome = void 0;
            if (resolver !== INTERNAL) {
              safelyResolveThenable(this, resolver);
            }
          }
          Promise2.prototype["catch"] = function(onRejected) {
            return this.then(null, onRejected);
          };
          Promise2.prototype.then = function(onFulfilled, onRejected) {
            if (typeof onFulfilled !== "function" && this.state === FULFILLED || typeof onRejected !== "function" && this.state === REJECTED) {
              return this;
            }
            var promise = new this.constructor(INTERNAL);
            if (this.state !== PENDING) {
              var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
              unwrap(promise, resolver, this.outcome);
            } else {
              this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
            }
            return promise;
          };
          function QueueItem(promise, onFulfilled, onRejected) {
            this.promise = promise;
            if (typeof onFulfilled === "function") {
              this.onFulfilled = onFulfilled;
              this.callFulfilled = this.otherCallFulfilled;
            }
            if (typeof onRejected === "function") {
              this.onRejected = onRejected;
              this.callRejected = this.otherCallRejected;
            }
          }
          QueueItem.prototype.callFulfilled = function(value) {
            handlers.resolve(this.promise, value);
          };
          QueueItem.prototype.otherCallFulfilled = function(value) {
            unwrap(this.promise, this.onFulfilled, value);
          };
          QueueItem.prototype.callRejected = function(value) {
            handlers.reject(this.promise, value);
          };
          QueueItem.prototype.otherCallRejected = function(value) {
            unwrap(this.promise, this.onRejected, value);
          };
          function unwrap(promise, func, value) {
            immediate(function() {
              var returnValue;
              try {
                returnValue = func(value);
              } catch (e) {
                return handlers.reject(promise, e);
              }
              if (returnValue === promise) {
                handlers.reject(promise, new TypeError("Cannot resolve promise with itself"));
              } else {
                handlers.resolve(promise, returnValue);
              }
            });
          }
          handlers.resolve = function(self2, value) {
            var result = tryCatch(getThen, value);
            if (result.status === "error") {
              return handlers.reject(self2, result.value);
            }
            var thenable = result.value;
            if (thenable) {
              safelyResolveThenable(self2, thenable);
            } else {
              self2.state = FULFILLED;
              self2.outcome = value;
              var i = -1;
              var len = self2.queue.length;
              while (++i < len) {
                self2.queue[i].callFulfilled(value);
              }
            }
            return self2;
          };
          handlers.reject = function(self2, error) {
            self2.state = REJECTED;
            self2.outcome = error;
            var i = -1;
            var len = self2.queue.length;
            while (++i < len) {
              self2.queue[i].callRejected(error);
            }
            return self2;
          };
          function getThen(obj) {
            var then = obj && obj.then;
            if (obj && (typeof obj === "object" || typeof obj === "function") && typeof then === "function") {
              return function appyThen() {
                then.apply(obj, arguments);
              };
            }
          }
          function safelyResolveThenable(self2, thenable) {
            var called = false;
            function onError(value) {
              if (called) {
                return;
              }
              called = true;
              handlers.reject(self2, value);
            }
            function onSuccess(value) {
              if (called) {
                return;
              }
              called = true;
              handlers.resolve(self2, value);
            }
            function tryToUnwrap() {
              thenable(onSuccess, onError);
            }
            var result = tryCatch(tryToUnwrap);
            if (result.status === "error") {
              onError(result.value);
            }
          }
          function tryCatch(func, value) {
            var out = {};
            try {
              out.value = func(value);
              out.status = "success";
            } catch (e) {
              out.status = "error";
              out.value = e;
            }
            return out;
          }
          Promise2.resolve = resolve;
          function resolve(value) {
            if (value instanceof this) {
              return value;
            }
            return handlers.resolve(new this(INTERNAL), value);
          }
          Promise2.reject = reject;
          function reject(reason) {
            var promise = new this(INTERNAL);
            return handlers.reject(promise, reason);
          }
          Promise2.all = all;
          function all(iterable) {
            var self2 = this;
            if (Object.prototype.toString.call(iterable) !== "[object Array]") {
              return this.reject(new TypeError("must be an array"));
            }
            var len = iterable.length;
            var called = false;
            if (!len) {
              return this.resolve([]);
            }
            var values = new Array(len);
            var resolved = 0;
            var i = -1;
            var promise = new this(INTERNAL);
            while (++i < len) {
              allResolver(iterable[i], i);
            }
            return promise;
            function allResolver(value, i2) {
              self2.resolve(value).then(resolveFromAll, function(error) {
                if (!called) {
                  called = true;
                  handlers.reject(promise, error);
                }
              });
              function resolveFromAll(outValue) {
                values[i2] = outValue;
                if (++resolved === len && !called) {
                  called = true;
                  handlers.resolve(promise, values);
                }
              }
            }
          }
          Promise2.race = race;
          function race(iterable) {
            var self2 = this;
            if (Object.prototype.toString.call(iterable) !== "[object Array]") {
              return this.reject(new TypeError("must be an array"));
            }
            var len = iterable.length;
            var called = false;
            if (!len) {
              return this.resolve([]);
            }
            var i = -1;
            var promise = new this(INTERNAL);
            while (++i < len) {
              resolver(iterable[i]);
            }
            return promise;
            function resolver(value) {
              self2.resolve(value).then(function(response) {
                if (!called) {
                  called = true;
                  handlers.resolve(promise, response);
                }
              }, function(error) {
                if (!called) {
                  called = true;
                  handlers.reject(promise, error);
                }
              });
            }
          }
        }, { "1": 1 }], 3: [function(_dereq_, module3, exports3) {
          (function(global2) {
            "use strict";
            if (typeof global2.Promise !== "function") {
              global2.Promise = _dereq_(2);
            }
          }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
        }, { "2": 2 }], 4: [function(_dereq_, module3, exports3) {
          "use strict";
          var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
            return typeof obj;
          } : function(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
          };
          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }
          function getIDB() {
            try {
              if (typeof indexedDB !== "undefined") {
                return indexedDB;
              }
              if (typeof webkitIndexedDB !== "undefined") {
                return webkitIndexedDB;
              }
              if (typeof mozIndexedDB !== "undefined") {
                return mozIndexedDB;
              }
              if (typeof OIndexedDB !== "undefined") {
                return OIndexedDB;
              }
              if (typeof msIndexedDB !== "undefined") {
                return msIndexedDB;
              }
            } catch (e) {
              return;
            }
          }
          var idb = getIDB();
          function isIndexedDBValid() {
            try {
              if (!idb || !idb.open) {
                return false;
              }
              var isSafari = typeof openDatabase !== "undefined" && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);
              var hasFetch = typeof fetch === "function" && fetch.toString().indexOf("[native code") !== -1;
              return (!isSafari || hasFetch) && typeof indexedDB !== "undefined" && typeof IDBKeyRange !== "undefined";
            } catch (e) {
              return false;
            }
          }
          function createBlob(parts, properties) {
            parts = parts || [];
            properties = properties || {};
            try {
              return new Blob(parts, properties);
            } catch (e) {
              if (e.name !== "TypeError") {
                throw e;
              }
              var Builder = typeof BlobBuilder !== "undefined" ? BlobBuilder : typeof MSBlobBuilder !== "undefined" ? MSBlobBuilder : typeof MozBlobBuilder !== "undefined" ? MozBlobBuilder : WebKitBlobBuilder;
              var builder = new Builder();
              for (var i = 0; i < parts.length; i += 1) {
                builder.append(parts[i]);
              }
              return builder.getBlob(properties.type);
            }
          }
          if (typeof Promise === "undefined") {
            _dereq_(3);
          }
          var Promise$1 = Promise;
          function executeCallback(promise, callback) {
            if (callback) {
              promise.then(function(result) {
                callback(null, result);
              }, function(error) {
                callback(error);
              });
            }
          }
          function executeTwoCallbacks(promise, callback, errorCallback) {
            if (typeof callback === "function") {
              promise.then(callback);
            }
            if (typeof errorCallback === "function") {
              promise["catch"](errorCallback);
            }
          }
          function normalizeKey(key2) {
            if (typeof key2 !== "string") {
              console.warn(key2 + " used as a key, but it is not a string.");
              key2 = String(key2);
            }
            return key2;
          }
          function getCallback() {
            if (arguments.length && typeof arguments[arguments.length - 1] === "function") {
              return arguments[arguments.length - 1];
            }
          }
          var DETECT_BLOB_SUPPORT_STORE = "local-forage-detect-blob-support";
          var supportsBlobs = void 0;
          var dbContexts = {};
          var toString = Object.prototype.toString;
          var READ_ONLY = "readonly";
          var READ_WRITE = "readwrite";
          function _binStringToArrayBuffer(bin) {
            var length2 = bin.length;
            var buf = new ArrayBuffer(length2);
            var arr = new Uint8Array(buf);
            for (var i = 0; i < length2; i++) {
              arr[i] = bin.charCodeAt(i);
            }
            return buf;
          }
          function _checkBlobSupportWithoutCaching(idb2) {
            return new Promise$1(function(resolve) {
              var txn = idb2.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
              var blob = createBlob([""]);
              txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, "key");
              txn.onabort = function(e) {
                e.preventDefault();
                e.stopPropagation();
                resolve(false);
              };
              txn.oncomplete = function() {
                var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
                var matchedEdge = navigator.userAgent.match(/Edge\//);
                resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
              };
            })["catch"](function() {
              return false;
            });
          }
          function _checkBlobSupport(idb2) {
            if (typeof supportsBlobs === "boolean") {
              return Promise$1.resolve(supportsBlobs);
            }
            return _checkBlobSupportWithoutCaching(idb2).then(function(value) {
              supportsBlobs = value;
              return supportsBlobs;
            });
          }
          function _deferReadiness(dbInfo) {
            var dbContext = dbContexts[dbInfo.name];
            var deferredOperation = {};
            deferredOperation.promise = new Promise$1(function(resolve, reject) {
              deferredOperation.resolve = resolve;
              deferredOperation.reject = reject;
            });
            dbContext.deferredOperations.push(deferredOperation);
            if (!dbContext.dbReady) {
              dbContext.dbReady = deferredOperation.promise;
            } else {
              dbContext.dbReady = dbContext.dbReady.then(function() {
                return deferredOperation.promise;
              });
            }
          }
          function _advanceReadiness(dbInfo) {
            var dbContext = dbContexts[dbInfo.name];
            var deferredOperation = dbContext.deferredOperations.pop();
            if (deferredOperation) {
              deferredOperation.resolve();
              return deferredOperation.promise;
            }
          }
          function _rejectReadiness(dbInfo, err) {
            var dbContext = dbContexts[dbInfo.name];
            var deferredOperation = dbContext.deferredOperations.pop();
            if (deferredOperation) {
              deferredOperation.reject(err);
              return deferredOperation.promise;
            }
          }
          function _getConnection(dbInfo, upgradeNeeded) {
            return new Promise$1(function(resolve, reject) {
              dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext();
              if (dbInfo.db) {
                if (upgradeNeeded) {
                  _deferReadiness(dbInfo);
                  dbInfo.db.close();
                } else {
                  return resolve(dbInfo.db);
                }
              }
              var dbArgs = [dbInfo.name];
              if (upgradeNeeded) {
                dbArgs.push(dbInfo.version);
              }
              var openreq = idb.open.apply(idb, dbArgs);
              if (upgradeNeeded) {
                openreq.onupgradeneeded = function(e) {
                  var db = openreq.result;
                  try {
                    db.createObjectStore(dbInfo.storeName);
                    if (e.oldVersion <= 1) {
                      db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
                    }
                  } catch (ex) {
                    if (ex.name === "ConstraintError") {
                      console.warn('The database "' + dbInfo.name + '" has been upgraded from version ' + e.oldVersion + " to version " + e.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
                    } else {
                      throw ex;
                    }
                  }
                };
              }
              openreq.onerror = function(e) {
                e.preventDefault();
                reject(openreq.error);
              };
              openreq.onsuccess = function() {
                var db = openreq.result;
                db.onversionchange = function(e) {
                  e.target.close();
                };
                resolve(db);
                _advanceReadiness(dbInfo);
              };
            });
          }
          function _getOriginalConnection(dbInfo) {
            return _getConnection(dbInfo, false);
          }
          function _getUpgradedConnection(dbInfo) {
            return _getConnection(dbInfo, true);
          }
          function _isUpgradeNeeded(dbInfo, defaultVersion) {
            if (!dbInfo.db) {
              return true;
            }
            var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
            var isDowngrade = dbInfo.version < dbInfo.db.version;
            var isUpgrade = dbInfo.version > dbInfo.db.version;
            if (isDowngrade) {
              if (dbInfo.version !== defaultVersion) {
                console.warn('The database "' + dbInfo.name + `" can't be downgraded from version ` + dbInfo.db.version + " to version " + dbInfo.version + ".");
              }
              dbInfo.version = dbInfo.db.version;
            }
            if (isUpgrade || isNewStore) {
              if (isNewStore) {
                var incVersion = dbInfo.db.version + 1;
                if (incVersion > dbInfo.version) {
                  dbInfo.version = incVersion;
                }
              }
              return true;
            }
            return false;
          }
          function _encodeBlob(blob) {
            return new Promise$1(function(resolve, reject) {
              var reader = new FileReader();
              reader.onerror = reject;
              reader.onloadend = function(e) {
                var base64 = btoa(e.target.result || "");
                resolve({
                  __local_forage_encoded_blob: true,
                  data: base64,
                  type: blob.type
                });
              };
              reader.readAsBinaryString(blob);
            });
          }
          function _decodeBlob(encodedBlob) {
            var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));
            return createBlob([arrayBuff], { type: encodedBlob.type });
          }
          function _isEncodedBlob(value) {
            return value && value.__local_forage_encoded_blob;
          }
          function _fullyReady(callback) {
            var self2 = this;
            var promise = self2._initReady().then(function() {
              var dbContext = dbContexts[self2._dbInfo.name];
              if (dbContext && dbContext.dbReady) {
                return dbContext.dbReady;
              }
            });
            executeTwoCallbacks(promise, callback, callback);
            return promise;
          }
          function _tryReconnect(dbInfo) {
            _deferReadiness(dbInfo);
            var dbContext = dbContexts[dbInfo.name];
            var forages = dbContext.forages;
            for (var i = 0; i < forages.length; i++) {
              var forage = forages[i];
              if (forage._dbInfo.db) {
                forage._dbInfo.db.close();
                forage._dbInfo.db = null;
              }
            }
            dbInfo.db = null;
            return _getOriginalConnection(dbInfo).then(function(db) {
              dbInfo.db = db;
              if (_isUpgradeNeeded(dbInfo)) {
                return _getUpgradedConnection(dbInfo);
              }
              return db;
            }).then(function(db) {
              dbInfo.db = dbContext.db = db;
              for (var i2 = 0; i2 < forages.length; i2++) {
                forages[i2]._dbInfo.db = db;
              }
            })["catch"](function(err) {
              _rejectReadiness(dbInfo, err);
              throw err;
            });
          }
          function createTransaction(dbInfo, mode, callback, retries) {
            if (retries === void 0) {
              retries = 1;
            }
            try {
              var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
              callback(null, tx);
            } catch (err) {
              if (retries > 0 && (!dbInfo.db || err.name === "InvalidStateError" || err.name === "NotFoundError")) {
                return Promise$1.resolve().then(function() {
                  if (!dbInfo.db || err.name === "NotFoundError" && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version) {
                    if (dbInfo.db) {
                      dbInfo.version = dbInfo.db.version + 1;
                    }
                    return _getUpgradedConnection(dbInfo);
                  }
                }).then(function() {
                  return _tryReconnect(dbInfo).then(function() {
                    createTransaction(dbInfo, mode, callback, retries - 1);
                  });
                })["catch"](callback);
              }
              callback(err);
            }
          }
          function createDbContext() {
            return {
              forages: [],
              db: null,
              dbReady: null,
              deferredOperations: []
            };
          }
          function _initStorage(options) {
            var self2 = this;
            var dbInfo = {
              db: null
            };
            if (options) {
              for (var i in options) {
                dbInfo[i] = options[i];
              }
            }
            var dbContext = dbContexts[dbInfo.name];
            if (!dbContext) {
              dbContext = createDbContext();
              dbContexts[dbInfo.name] = dbContext;
            }
            dbContext.forages.push(self2);
            if (!self2._initReady) {
              self2._initReady = self2.ready;
              self2.ready = _fullyReady;
            }
            var initPromises = [];
            function ignoreErrors() {
              return Promise$1.resolve();
            }
            for (var j = 0; j < dbContext.forages.length; j++) {
              var forage = dbContext.forages[j];
              if (forage !== self2) {
                initPromises.push(forage._initReady()["catch"](ignoreErrors));
              }
            }
            var forages = dbContext.forages.slice(0);
            return Promise$1.all(initPromises).then(function() {
              dbInfo.db = dbContext.db;
              return _getOriginalConnection(dbInfo);
            }).then(function(db) {
              dbInfo.db = db;
              if (_isUpgradeNeeded(dbInfo, self2._defaultConfig.version)) {
                return _getUpgradedConnection(dbInfo);
              }
              return db;
            }).then(function(db) {
              dbInfo.db = dbContext.db = db;
              self2._dbInfo = dbInfo;
              for (var k = 0; k < forages.length; k++) {
                var forage2 = forages[k];
                if (forage2 !== self2) {
                  forage2._dbInfo.db = dbInfo.db;
                  forage2._dbInfo.version = dbInfo.version;
                }
              }
            });
          }
          function getItem(key2, callback) {
            var self2 = this;
            key2 = normalizeKey(key2);
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self2._dbInfo.storeName);
                    var req = store.get(key2);
                    req.onsuccess = function() {
                      var value = req.result;
                      if (value === void 0) {
                        value = null;
                      }
                      if (_isEncodedBlob(value)) {
                        value = _decodeBlob(value);
                      }
                      resolve(value);
                    };
                    req.onerror = function() {
                      reject(req.error);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function iterate(iterator, callback) {
            var self2 = this;
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self2._dbInfo.storeName);
                    var req = store.openCursor();
                    var iterationNumber = 1;
                    req.onsuccess = function() {
                      var cursor = req.result;
                      if (cursor) {
                        var value = cursor.value;
                        if (_isEncodedBlob(value)) {
                          value = _decodeBlob(value);
                        }
                        var result = iterator(value, cursor.key, iterationNumber++);
                        if (result !== void 0) {
                          resolve(result);
                        } else {
                          cursor["continue"]();
                        }
                      } else {
                        resolve();
                      }
                    };
                    req.onerror = function() {
                      reject(req.error);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function setItem(key2, value, callback) {
            var self2 = this;
            key2 = normalizeKey(key2);
            var promise = new Promise$1(function(resolve, reject) {
              var dbInfo;
              self2.ready().then(function() {
                dbInfo = self2._dbInfo;
                if (toString.call(value) === "[object Blob]") {
                  return _checkBlobSupport(dbInfo.db).then(function(blobSupport) {
                    if (blobSupport) {
                      return value;
                    }
                    return _encodeBlob(value);
                  });
                }
                return value;
              }).then(function(value2) {
                createTransaction(self2._dbInfo, READ_WRITE, function(err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self2._dbInfo.storeName);
                    if (value2 === null) {
                      value2 = void 0;
                    }
                    var req = store.put(value2, key2);
                    transaction.oncomplete = function() {
                      if (value2 === void 0) {
                        value2 = null;
                      }
                      resolve(value2);
                    };
                    transaction.onabort = transaction.onerror = function() {
                      var err2 = req.error ? req.error : req.transaction.error;
                      reject(err2);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function removeItem(key2, callback) {
            var self2 = this;
            key2 = normalizeKey(key2);
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                createTransaction(self2._dbInfo, READ_WRITE, function(err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self2._dbInfo.storeName);
                    var req = store["delete"](key2);
                    transaction.oncomplete = function() {
                      resolve();
                    };
                    transaction.onerror = function() {
                      reject(req.error);
                    };
                    transaction.onabort = function() {
                      var err2 = req.error ? req.error : req.transaction.error;
                      reject(err2);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function clear(callback) {
            var self2 = this;
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                createTransaction(self2._dbInfo, READ_WRITE, function(err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self2._dbInfo.storeName);
                    var req = store.clear();
                    transaction.oncomplete = function() {
                      resolve();
                    };
                    transaction.onabort = transaction.onerror = function() {
                      var err2 = req.error ? req.error : req.transaction.error;
                      reject(err2);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function length(callback) {
            var self2 = this;
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self2._dbInfo.storeName);
                    var req = store.count();
                    req.onsuccess = function() {
                      resolve(req.result);
                    };
                    req.onerror = function() {
                      reject(req.error);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function key(n, callback) {
            var self2 = this;
            var promise = new Promise$1(function(resolve, reject) {
              if (n < 0) {
                resolve(null);
                return;
              }
              self2.ready().then(function() {
                createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self2._dbInfo.storeName);
                    var advanced = false;
                    var req = store.openKeyCursor();
                    req.onsuccess = function() {
                      var cursor = req.result;
                      if (!cursor) {
                        resolve(null);
                        return;
                      }
                      if (n === 0) {
                        resolve(cursor.key);
                      } else {
                        if (!advanced) {
                          advanced = true;
                          cursor.advance(n);
                        } else {
                          resolve(cursor.key);
                        }
                      }
                    };
                    req.onerror = function() {
                      reject(req.error);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function keys(callback) {
            var self2 = this;
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                  if (err) {
                    return reject(err);
                  }
                  try {
                    var store = transaction.objectStore(self2._dbInfo.storeName);
                    var req = store.openKeyCursor();
                    var keys2 = [];
                    req.onsuccess = function() {
                      var cursor = req.result;
                      if (!cursor) {
                        resolve(keys2);
                        return;
                      }
                      keys2.push(cursor.key);
                      cursor["continue"]();
                    };
                    req.onerror = function() {
                      reject(req.error);
                    };
                  } catch (e) {
                    reject(e);
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function dropInstance(options, callback) {
            callback = getCallback.apply(this, arguments);
            var currentConfig = this.config();
            options = typeof options !== "function" && options || {};
            if (!options.name) {
              options.name = options.name || currentConfig.name;
              options.storeName = options.storeName || currentConfig.storeName;
            }
            var self2 = this;
            var promise;
            if (!options.name) {
              promise = Promise$1.reject("Invalid arguments");
            } else {
              var isCurrentDb = options.name === currentConfig.name && self2._dbInfo.db;
              var dbPromise = isCurrentDb ? Promise$1.resolve(self2._dbInfo.db) : _getOriginalConnection(options).then(function(db) {
                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;
                dbContext.db = db;
                for (var i = 0; i < forages.length; i++) {
                  forages[i]._dbInfo.db = db;
                }
                return db;
              });
              if (!options.storeName) {
                promise = dbPromise.then(function(db) {
                  _deferReadiness(options);
                  var dbContext = dbContexts[options.name];
                  var forages = dbContext.forages;
                  db.close();
                  for (var i = 0; i < forages.length; i++) {
                    var forage = forages[i];
                    forage._dbInfo.db = null;
                  }
                  var dropDBPromise = new Promise$1(function(resolve, reject) {
                    var req = idb.deleteDatabase(options.name);
                    req.onerror = function() {
                      var db2 = req.result;
                      if (db2) {
                        db2.close();
                      }
                      reject(req.error);
                    };
                    req.onblocked = function() {
                      console.warn('dropInstance blocked for database "' + options.name + '" until all open connections are closed');
                    };
                    req.onsuccess = function() {
                      var db2 = req.result;
                      if (db2) {
                        db2.close();
                      }
                      resolve(db2);
                    };
                  });
                  return dropDBPromise.then(function(db2) {
                    dbContext.db = db2;
                    for (var i2 = 0; i2 < forages.length; i2++) {
                      var _forage = forages[i2];
                      _advanceReadiness(_forage._dbInfo);
                    }
                  })["catch"](function(err) {
                    (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function() {
                    });
                    throw err;
                  });
                });
              } else {
                promise = dbPromise.then(function(db) {
                  if (!db.objectStoreNames.contains(options.storeName)) {
                    return;
                  }
                  var newVersion = db.version + 1;
                  _deferReadiness(options);
                  var dbContext = dbContexts[options.name];
                  var forages = dbContext.forages;
                  db.close();
                  for (var i = 0; i < forages.length; i++) {
                    var forage = forages[i];
                    forage._dbInfo.db = null;
                    forage._dbInfo.version = newVersion;
                  }
                  var dropObjectPromise = new Promise$1(function(resolve, reject) {
                    var req = idb.open(options.name, newVersion);
                    req.onerror = function(err) {
                      var db2 = req.result;
                      db2.close();
                      reject(err);
                    };
                    req.onupgradeneeded = function() {
                      var db2 = req.result;
                      db2.deleteObjectStore(options.storeName);
                    };
                    req.onsuccess = function() {
                      var db2 = req.result;
                      db2.close();
                      resolve(db2);
                    };
                  });
                  return dropObjectPromise.then(function(db2) {
                    dbContext.db = db2;
                    for (var j = 0; j < forages.length; j++) {
                      var _forage2 = forages[j];
                      _forage2._dbInfo.db = db2;
                      _advanceReadiness(_forage2._dbInfo);
                    }
                  })["catch"](function(err) {
                    (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function() {
                    });
                    throw err;
                  });
                });
              }
            }
            executeCallback(promise, callback);
            return promise;
          }
          var asyncStorage = {
            _driver: "asyncStorage",
            _initStorage,
            _support: isIndexedDBValid(),
            iterate,
            getItem,
            setItem,
            removeItem,
            clear,
            length,
            key,
            keys,
            dropInstance
          };
          function isWebSQLValid() {
            return typeof openDatabase === "function";
          }
          var BASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
          var BLOB_TYPE_PREFIX = "~~local_forage_type~";
          var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;
          var SERIALIZED_MARKER = "__lfsc__:";
          var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;
          var TYPE_ARRAYBUFFER = "arbf";
          var TYPE_BLOB = "blob";
          var TYPE_INT8ARRAY = "si08";
          var TYPE_UINT8ARRAY = "ui08";
          var TYPE_UINT8CLAMPEDARRAY = "uic8";
          var TYPE_INT16ARRAY = "si16";
          var TYPE_INT32ARRAY = "si32";
          var TYPE_UINT16ARRAY = "ur16";
          var TYPE_UINT32ARRAY = "ui32";
          var TYPE_FLOAT32ARRAY = "fl32";
          var TYPE_FLOAT64ARRAY = "fl64";
          var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;
          var toString$1 = Object.prototype.toString;
          function stringToBuffer(serializedString) {
            var bufferLength = serializedString.length * 0.75;
            var len = serializedString.length;
            var i;
            var p = 0;
            var encoded1, encoded2, encoded3, encoded4;
            if (serializedString[serializedString.length - 1] === "=") {
              bufferLength--;
              if (serializedString[serializedString.length - 2] === "=") {
                bufferLength--;
              }
            }
            var buffer = new ArrayBuffer(bufferLength);
            var bytes = new Uint8Array(buffer);
            for (i = 0; i < len; i += 4) {
              encoded1 = BASE_CHARS.indexOf(serializedString[i]);
              encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
              encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
              encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);
              bytes[p++] = encoded1 << 2 | encoded2 >> 4;
              bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
              bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
            }
            return buffer;
          }
          function bufferToString(buffer) {
            var bytes = new Uint8Array(buffer);
            var base64String = "";
            var i;
            for (i = 0; i < bytes.length; i += 3) {
              base64String += BASE_CHARS[bytes[i] >> 2];
              base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
              base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
              base64String += BASE_CHARS[bytes[i + 2] & 63];
            }
            if (bytes.length % 3 === 2) {
              base64String = base64String.substring(0, base64String.length - 1) + "=";
            } else if (bytes.length % 3 === 1) {
              base64String = base64String.substring(0, base64String.length - 2) + "==";
            }
            return base64String;
          }
          function serialize(value, callback) {
            var valueType = "";
            if (value) {
              valueType = toString$1.call(value);
            }
            if (value && (valueType === "[object ArrayBuffer]" || value.buffer && toString$1.call(value.buffer) === "[object ArrayBuffer]")) {
              var buffer;
              var marker = SERIALIZED_MARKER;
              if (value instanceof ArrayBuffer) {
                buffer = value;
                marker += TYPE_ARRAYBUFFER;
              } else {
                buffer = value.buffer;
                if (valueType === "[object Int8Array]") {
                  marker += TYPE_INT8ARRAY;
                } else if (valueType === "[object Uint8Array]") {
                  marker += TYPE_UINT8ARRAY;
                } else if (valueType === "[object Uint8ClampedArray]") {
                  marker += TYPE_UINT8CLAMPEDARRAY;
                } else if (valueType === "[object Int16Array]") {
                  marker += TYPE_INT16ARRAY;
                } else if (valueType === "[object Uint16Array]") {
                  marker += TYPE_UINT16ARRAY;
                } else if (valueType === "[object Int32Array]") {
                  marker += TYPE_INT32ARRAY;
                } else if (valueType === "[object Uint32Array]") {
                  marker += TYPE_UINT32ARRAY;
                } else if (valueType === "[object Float32Array]") {
                  marker += TYPE_FLOAT32ARRAY;
                } else if (valueType === "[object Float64Array]") {
                  marker += TYPE_FLOAT64ARRAY;
                } else {
                  callback(new Error("Failed to get type for BinaryArray"));
                }
              }
              callback(marker + bufferToString(buffer));
            } else if (valueType === "[object Blob]") {
              var fileReader = new FileReader();
              fileReader.onload = function() {
                var str = BLOB_TYPE_PREFIX + value.type + "~" + bufferToString(this.result);
                callback(SERIALIZED_MARKER + TYPE_BLOB + str);
              };
              fileReader.readAsArrayBuffer(value);
            } else {
              try {
                callback(JSON.stringify(value));
              } catch (e) {
                console.error("Couldn't convert value into a JSON string: ", value);
                callback(null, e);
              }
            }
          }
          function deserialize(value) {
            if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
              return JSON.parse(value);
            }
            var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
            var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);
            var blobType;
            if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
              var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
              blobType = matcher[1];
              serializedString = serializedString.substring(matcher[0].length);
            }
            var buffer = stringToBuffer(serializedString);
            switch (type) {
              case TYPE_ARRAYBUFFER:
                return buffer;
              case TYPE_BLOB:
                return createBlob([buffer], { type: blobType });
              case TYPE_INT8ARRAY:
                return new Int8Array(buffer);
              case TYPE_UINT8ARRAY:
                return new Uint8Array(buffer);
              case TYPE_UINT8CLAMPEDARRAY:
                return new Uint8ClampedArray(buffer);
              case TYPE_INT16ARRAY:
                return new Int16Array(buffer);
              case TYPE_UINT16ARRAY:
                return new Uint16Array(buffer);
              case TYPE_INT32ARRAY:
                return new Int32Array(buffer);
              case TYPE_UINT32ARRAY:
                return new Uint32Array(buffer);
              case TYPE_FLOAT32ARRAY:
                return new Float32Array(buffer);
              case TYPE_FLOAT64ARRAY:
                return new Float64Array(buffer);
              default:
                throw new Error("Unkown type: " + type);
            }
          }
          var localforageSerializer = {
            serialize,
            deserialize,
            stringToBuffer,
            bufferToString
          };
          function createDbTable(t, dbInfo, callback, errorCallback) {
            t.executeSql("CREATE TABLE IF NOT EXISTS " + dbInfo.storeName + " (id INTEGER PRIMARY KEY, key unique, value)", [], callback, errorCallback);
          }
          function _initStorage$1(options) {
            var self2 = this;
            var dbInfo = {
              db: null
            };
            if (options) {
              for (var i in options) {
                dbInfo[i] = typeof options[i] !== "string" ? options[i].toString() : options[i];
              }
            }
            var dbInfoPromise = new Promise$1(function(resolve, reject) {
              try {
                dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
              } catch (e) {
                return reject(e);
              }
              dbInfo.db.transaction(function(t) {
                createDbTable(t, dbInfo, function() {
                  self2._dbInfo = dbInfo;
                  resolve();
                }, function(t2, error) {
                  reject(error);
                });
              }, reject);
            });
            dbInfo.serializer = localforageSerializer;
            return dbInfoPromise;
          }
          function tryExecuteSql(t, dbInfo, sqlStatement, args, callback, errorCallback) {
            t.executeSql(sqlStatement, args, callback, function(t2, error) {
              if (error.code === error.SYNTAX_ERR) {
                t2.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?", [dbInfo.storeName], function(t3, results) {
                  if (!results.rows.length) {
                    createDbTable(t3, dbInfo, function() {
                      t3.executeSql(sqlStatement, args, callback, errorCallback);
                    }, errorCallback);
                  } else {
                    errorCallback(t3, error);
                  }
                }, errorCallback);
              } else {
                errorCallback(t2, error);
              }
            }, errorCallback);
          }
          function getItem$1(key2, callback) {
            var self2 = this;
            key2 = normalizeKey(key2);
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                var dbInfo = self2._dbInfo;
                dbInfo.db.transaction(function(t) {
                  tryExecuteSql(t, dbInfo, "SELECT * FROM " + dbInfo.storeName + " WHERE key = ? LIMIT 1", [key2], function(t2, results) {
                    var result = results.rows.length ? results.rows.item(0).value : null;
                    if (result) {
                      result = dbInfo.serializer.deserialize(result);
                    }
                    resolve(result);
                  }, function(t2, error) {
                    reject(error);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function iterate$1(iterator, callback) {
            var self2 = this;
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                var dbInfo = self2._dbInfo;
                dbInfo.db.transaction(function(t) {
                  tryExecuteSql(t, dbInfo, "SELECT * FROM " + dbInfo.storeName, [], function(t2, results) {
                    var rows = results.rows;
                    var length2 = rows.length;
                    for (var i = 0; i < length2; i++) {
                      var item = rows.item(i);
                      var result = item.value;
                      if (result) {
                        result = dbInfo.serializer.deserialize(result);
                      }
                      result = iterator(result, item.key, i + 1);
                      if (result !== void 0) {
                        resolve(result);
                        return;
                      }
                    }
                    resolve();
                  }, function(t2, error) {
                    reject(error);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function _setItem(key2, value, callback, retriesLeft) {
            var self2 = this;
            key2 = normalizeKey(key2);
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                if (value === void 0) {
                  value = null;
                }
                var originalValue = value;
                var dbInfo = self2._dbInfo;
                dbInfo.serializer.serialize(value, function(value2, error) {
                  if (error) {
                    reject(error);
                  } else {
                    dbInfo.db.transaction(function(t) {
                      tryExecuteSql(t, dbInfo, "INSERT OR REPLACE INTO " + dbInfo.storeName + " (key, value) VALUES (?, ?)", [key2, value2], function() {
                        resolve(originalValue);
                      }, function(t2, error2) {
                        reject(error2);
                      });
                    }, function(sqlError) {
                      if (sqlError.code === sqlError.QUOTA_ERR) {
                        if (retriesLeft > 0) {
                          resolve(_setItem.apply(self2, [key2, originalValue, callback, retriesLeft - 1]));
                          return;
                        }
                        reject(sqlError);
                      }
                    });
                  }
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function setItem$1(key2, value, callback) {
            return _setItem.apply(this, [key2, value, callback, 1]);
          }
          function removeItem$1(key2, callback) {
            var self2 = this;
            key2 = normalizeKey(key2);
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                var dbInfo = self2._dbInfo;
                dbInfo.db.transaction(function(t) {
                  tryExecuteSql(t, dbInfo, "DELETE FROM " + dbInfo.storeName + " WHERE key = ?", [key2], function() {
                    resolve();
                  }, function(t2, error) {
                    reject(error);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function clear$1(callback) {
            var self2 = this;
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                var dbInfo = self2._dbInfo;
                dbInfo.db.transaction(function(t) {
                  tryExecuteSql(t, dbInfo, "DELETE FROM " + dbInfo.storeName, [], function() {
                    resolve();
                  }, function(t2, error) {
                    reject(error);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function length$1(callback) {
            var self2 = this;
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                var dbInfo = self2._dbInfo;
                dbInfo.db.transaction(function(t) {
                  tryExecuteSql(t, dbInfo, "SELECT COUNT(key) as c FROM " + dbInfo.storeName, [], function(t2, results) {
                    var result = results.rows.item(0).c;
                    resolve(result);
                  }, function(t2, error) {
                    reject(error);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function key$1(n, callback) {
            var self2 = this;
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                var dbInfo = self2._dbInfo;
                dbInfo.db.transaction(function(t) {
                  tryExecuteSql(t, dbInfo, "SELECT key FROM " + dbInfo.storeName + " WHERE id = ? LIMIT 1", [n + 1], function(t2, results) {
                    var result = results.rows.length ? results.rows.item(0).key : null;
                    resolve(result);
                  }, function(t2, error) {
                    reject(error);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function keys$1(callback) {
            var self2 = this;
            var promise = new Promise$1(function(resolve, reject) {
              self2.ready().then(function() {
                var dbInfo = self2._dbInfo;
                dbInfo.db.transaction(function(t) {
                  tryExecuteSql(t, dbInfo, "SELECT key FROM " + dbInfo.storeName, [], function(t2, results) {
                    var keys2 = [];
                    for (var i = 0; i < results.rows.length; i++) {
                      keys2.push(results.rows.item(i).key);
                    }
                    resolve(keys2);
                  }, function(t2, error) {
                    reject(error);
                  });
                });
              })["catch"](reject);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function getAllStoreNames(db) {
            return new Promise$1(function(resolve, reject) {
              db.transaction(function(t) {
                t.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function(t2, results) {
                  var storeNames = [];
                  for (var i = 0; i < results.rows.length; i++) {
                    storeNames.push(results.rows.item(i).name);
                  }
                  resolve({
                    db,
                    storeNames
                  });
                }, function(t2, error) {
                  reject(error);
                });
              }, function(sqlError) {
                reject(sqlError);
              });
            });
          }
          function dropInstance$1(options, callback) {
            callback = getCallback.apply(this, arguments);
            var currentConfig = this.config();
            options = typeof options !== "function" && options || {};
            if (!options.name) {
              options.name = options.name || currentConfig.name;
              options.storeName = options.storeName || currentConfig.storeName;
            }
            var self2 = this;
            var promise;
            if (!options.name) {
              promise = Promise$1.reject("Invalid arguments");
            } else {
              promise = new Promise$1(function(resolve) {
                var db;
                if (options.name === currentConfig.name) {
                  db = self2._dbInfo.db;
                } else {
                  db = openDatabase(options.name, "", "", 0);
                }
                if (!options.storeName) {
                  resolve(getAllStoreNames(db));
                } else {
                  resolve({
                    db,
                    storeNames: [options.storeName]
                  });
                }
              }).then(function(operationInfo) {
                return new Promise$1(function(resolve, reject) {
                  operationInfo.db.transaction(function(t) {
                    function dropTable(storeName) {
                      return new Promise$1(function(resolve2, reject2) {
                        t.executeSql("DROP TABLE IF EXISTS " + storeName, [], function() {
                          resolve2();
                        }, function(t2, error) {
                          reject2(error);
                        });
                      });
                    }
                    var operations = [];
                    for (var i = 0, len = operationInfo.storeNames.length; i < len; i++) {
                      operations.push(dropTable(operationInfo.storeNames[i]));
                    }
                    Promise$1.all(operations).then(function() {
                      resolve();
                    })["catch"](function(e) {
                      reject(e);
                    });
                  }, function(sqlError) {
                    reject(sqlError);
                  });
                });
              });
            }
            executeCallback(promise, callback);
            return promise;
          }
          var webSQLStorage = {
            _driver: "webSQLStorage",
            _initStorage: _initStorage$1,
            _support: isWebSQLValid(),
            iterate: iterate$1,
            getItem: getItem$1,
            setItem: setItem$1,
            removeItem: removeItem$1,
            clear: clear$1,
            length: length$1,
            key: key$1,
            keys: keys$1,
            dropInstance: dropInstance$1
          };
          function isLocalStorageValid() {
            try {
              return typeof localStorage !== "undefined" && "setItem" in localStorage && !!localStorage.setItem;
            } catch (e) {
              return false;
            }
          }
          function _getKeyPrefix(options, defaultConfig) {
            var keyPrefix = options.name + "/";
            if (options.storeName !== defaultConfig.storeName) {
              keyPrefix += options.storeName + "/";
            }
            return keyPrefix;
          }
          function checkIfLocalStorageThrows() {
            var localStorageTestKey = "_localforage_support_test";
            try {
              localStorage.setItem(localStorageTestKey, true);
              localStorage.removeItem(localStorageTestKey);
              return false;
            } catch (e) {
              return true;
            }
          }
          function _isLocalStorageUsable() {
            return !checkIfLocalStorageThrows() || localStorage.length > 0;
          }
          function _initStorage$2(options) {
            var self2 = this;
            var dbInfo = {};
            if (options) {
              for (var i in options) {
                dbInfo[i] = options[i];
              }
            }
            dbInfo.keyPrefix = _getKeyPrefix(options, self2._defaultConfig);
            if (!_isLocalStorageUsable()) {
              return Promise$1.reject();
            }
            self2._dbInfo = dbInfo;
            dbInfo.serializer = localforageSerializer;
            return Promise$1.resolve();
          }
          function clear$2(callback) {
            var self2 = this;
            var promise = self2.ready().then(function() {
              var keyPrefix = self2._dbInfo.keyPrefix;
              for (var i = localStorage.length - 1; i >= 0; i--) {
                var key2 = localStorage.key(i);
                if (key2.indexOf(keyPrefix) === 0) {
                  localStorage.removeItem(key2);
                }
              }
            });
            executeCallback(promise, callback);
            return promise;
          }
          function getItem$2(key2, callback) {
            var self2 = this;
            key2 = normalizeKey(key2);
            var promise = self2.ready().then(function() {
              var dbInfo = self2._dbInfo;
              var result = localStorage.getItem(dbInfo.keyPrefix + key2);
              if (result) {
                result = dbInfo.serializer.deserialize(result);
              }
              return result;
            });
            executeCallback(promise, callback);
            return promise;
          }
          function iterate$2(iterator, callback) {
            var self2 = this;
            var promise = self2.ready().then(function() {
              var dbInfo = self2._dbInfo;
              var keyPrefix = dbInfo.keyPrefix;
              var keyPrefixLength = keyPrefix.length;
              var length2 = localStorage.length;
              var iterationNumber = 1;
              for (var i = 0; i < length2; i++) {
                var key2 = localStorage.key(i);
                if (key2.indexOf(keyPrefix) !== 0) {
                  continue;
                }
                var value = localStorage.getItem(key2);
                if (value) {
                  value = dbInfo.serializer.deserialize(value);
                }
                value = iterator(value, key2.substring(keyPrefixLength), iterationNumber++);
                if (value !== void 0) {
                  return value;
                }
              }
            });
            executeCallback(promise, callback);
            return promise;
          }
          function key$2(n, callback) {
            var self2 = this;
            var promise = self2.ready().then(function() {
              var dbInfo = self2._dbInfo;
              var result;
              try {
                result = localStorage.key(n);
              } catch (error) {
                result = null;
              }
              if (result) {
                result = result.substring(dbInfo.keyPrefix.length);
              }
              return result;
            });
            executeCallback(promise, callback);
            return promise;
          }
          function keys$2(callback) {
            var self2 = this;
            var promise = self2.ready().then(function() {
              var dbInfo = self2._dbInfo;
              var length2 = localStorage.length;
              var keys2 = [];
              for (var i = 0; i < length2; i++) {
                var itemKey = localStorage.key(i);
                if (itemKey.indexOf(dbInfo.keyPrefix) === 0) {
                  keys2.push(itemKey.substring(dbInfo.keyPrefix.length));
                }
              }
              return keys2;
            });
            executeCallback(promise, callback);
            return promise;
          }
          function length$2(callback) {
            var self2 = this;
            var promise = self2.keys().then(function(keys2) {
              return keys2.length;
            });
            executeCallback(promise, callback);
            return promise;
          }
          function removeItem$2(key2, callback) {
            var self2 = this;
            key2 = normalizeKey(key2);
            var promise = self2.ready().then(function() {
              var dbInfo = self2._dbInfo;
              localStorage.removeItem(dbInfo.keyPrefix + key2);
            });
            executeCallback(promise, callback);
            return promise;
          }
          function setItem$2(key2, value, callback) {
            var self2 = this;
            key2 = normalizeKey(key2);
            var promise = self2.ready().then(function() {
              if (value === void 0) {
                value = null;
              }
              var originalValue = value;
              return new Promise$1(function(resolve, reject) {
                var dbInfo = self2._dbInfo;
                dbInfo.serializer.serialize(value, function(value2, error) {
                  if (error) {
                    reject(error);
                  } else {
                    try {
                      localStorage.setItem(dbInfo.keyPrefix + key2, value2);
                      resolve(originalValue);
                    } catch (e) {
                      if (e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED") {
                        reject(e);
                      }
                      reject(e);
                    }
                  }
                });
              });
            });
            executeCallback(promise, callback);
            return promise;
          }
          function dropInstance$2(options, callback) {
            callback = getCallback.apply(this, arguments);
            options = typeof options !== "function" && options || {};
            if (!options.name) {
              var currentConfig = this.config();
              options.name = options.name || currentConfig.name;
              options.storeName = options.storeName || currentConfig.storeName;
            }
            var self2 = this;
            var promise;
            if (!options.name) {
              promise = Promise$1.reject("Invalid arguments");
            } else {
              promise = new Promise$1(function(resolve) {
                if (!options.storeName) {
                  resolve(options.name + "/");
                } else {
                  resolve(_getKeyPrefix(options, self2._defaultConfig));
                }
              }).then(function(keyPrefix) {
                for (var i = localStorage.length - 1; i >= 0; i--) {
                  var key2 = localStorage.key(i);
                  if (key2.indexOf(keyPrefix) === 0) {
                    localStorage.removeItem(key2);
                  }
                }
              });
            }
            executeCallback(promise, callback);
            return promise;
          }
          var localStorageWrapper = {
            _driver: "localStorageWrapper",
            _initStorage: _initStorage$2,
            _support: isLocalStorageValid(),
            iterate: iterate$2,
            getItem: getItem$2,
            setItem: setItem$2,
            removeItem: removeItem$2,
            clear: clear$2,
            length: length$2,
            key: key$2,
            keys: keys$2,
            dropInstance: dropInstance$2
          };
          var sameValue = function sameValue2(x, y) {
            return x === y || typeof x === "number" && typeof y === "number" && isNaN(x) && isNaN(y);
          };
          var includes = function includes2(array, searchElement) {
            var len = array.length;
            var i = 0;
            while (i < len) {
              if (sameValue(array[i], searchElement)) {
                return true;
              }
              i++;
            }
            return false;
          };
          var isArray = Array.isArray || function(arg) {
            return Object.prototype.toString.call(arg) === "[object Array]";
          };
          var DefinedDrivers = {};
          var DriverSupport = {};
          var DefaultDrivers = {
            INDEXEDDB: asyncStorage,
            WEBSQL: webSQLStorage,
            LOCALSTORAGE: localStorageWrapper
          };
          var DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];
          var OptionalDriverMethods = ["dropInstance"];
          var LibraryMethods = ["clear", "getItem", "iterate", "key", "keys", "length", "removeItem", "setItem"].concat(OptionalDriverMethods);
          var DefaultConfig = {
            description: "",
            driver: DefaultDriverOrder.slice(),
            name: "localforage",
            size: 4980736,
            storeName: "keyvaluepairs",
            version: 1
          };
          function callWhenReady(localForageInstance, libraryMethod) {
            localForageInstance[libraryMethod] = function() {
              var _args = arguments;
              return localForageInstance.ready().then(function() {
                return localForageInstance[libraryMethod].apply(localForageInstance, _args);
              });
            };
          }
          function extend() {
            for (var i = 1; i < arguments.length; i++) {
              var arg = arguments[i];
              if (arg) {
                for (var _key in arg) {
                  if (arg.hasOwnProperty(_key)) {
                    if (isArray(arg[_key])) {
                      arguments[0][_key] = arg[_key].slice();
                    } else {
                      arguments[0][_key] = arg[_key];
                    }
                  }
                }
              }
            }
            return arguments[0];
          }
          var LocalForage = function() {
            function LocalForage2(options) {
              _classCallCheck(this, LocalForage2);
              for (var driverTypeKey in DefaultDrivers) {
                if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
                  var driver = DefaultDrivers[driverTypeKey];
                  var driverName = driver._driver;
                  this[driverTypeKey] = driverName;
                  if (!DefinedDrivers[driverName]) {
                    this.defineDriver(driver);
                  }
                }
              }
              this._defaultConfig = extend({}, DefaultConfig);
              this._config = extend({}, this._defaultConfig, options);
              this._driverSet = null;
              this._initDriver = null;
              this._ready = false;
              this._dbInfo = null;
              this._wrapLibraryMethodsWithReady();
              this.setDriver(this._config.driver)["catch"](function() {
              });
            }
            LocalForage2.prototype.config = function config(options) {
              if ((typeof options === "undefined" ? "undefined" : _typeof(options)) === "object") {
                if (this._ready) {
                  return new Error("Can't call config() after localforage has been used.");
                }
                for (var i in options) {
                  if (i === "storeName") {
                    options[i] = options[i].replace(/\W/g, "_");
                  }
                  if (i === "version" && typeof options[i] !== "number") {
                    return new Error("Database version must be a number.");
                  }
                  this._config[i] = options[i];
                }
                if ("driver" in options && options.driver) {
                  return this.setDriver(this._config.driver);
                }
                return true;
              } else if (typeof options === "string") {
                return this._config[options];
              } else {
                return this._config;
              }
            };
            LocalForage2.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
              var promise = new Promise$1(function(resolve, reject) {
                try {
                  var driverName = driverObject._driver;
                  var complianceError = new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");
                  if (!driverObject._driver) {
                    reject(complianceError);
                    return;
                  }
                  var driverMethods = LibraryMethods.concat("_initStorage");
                  for (var i = 0, len = driverMethods.length; i < len; i++) {
                    var driverMethodName = driverMethods[i];
                    var isRequired = !includes(OptionalDriverMethods, driverMethodName);
                    if ((isRequired || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] !== "function") {
                      reject(complianceError);
                      return;
                    }
                  }
                  var configureMissingMethods = function configureMissingMethods2() {
                    var methodNotImplementedFactory = function methodNotImplementedFactory2(methodName) {
                      return function() {
                        var error = new Error("Method " + methodName + " is not implemented by the current driver");
                        var promise2 = Promise$1.reject(error);
                        executeCallback(promise2, arguments[arguments.length - 1]);
                        return promise2;
                      };
                    };
                    for (var _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++) {
                      var optionalDriverMethod = OptionalDriverMethods[_i];
                      if (!driverObject[optionalDriverMethod]) {
                        driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod);
                      }
                    }
                  };
                  configureMissingMethods();
                  var setDriverSupport = function setDriverSupport2(support) {
                    if (DefinedDrivers[driverName]) {
                      console.info("Redefining LocalForage driver: " + driverName);
                    }
                    DefinedDrivers[driverName] = driverObject;
                    DriverSupport[driverName] = support;
                    resolve();
                  };
                  if ("_support" in driverObject) {
                    if (driverObject._support && typeof driverObject._support === "function") {
                      driverObject._support().then(setDriverSupport, reject);
                    } else {
                      setDriverSupport(!!driverObject._support);
                    }
                  } else {
                    setDriverSupport(true);
                  }
                } catch (e) {
                  reject(e);
                }
              });
              executeTwoCallbacks(promise, callback, errorCallback);
              return promise;
            };
            LocalForage2.prototype.driver = function driver() {
              return this._driver || null;
            };
            LocalForage2.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
              var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error("Driver not found."));
              executeTwoCallbacks(getDriverPromise, callback, errorCallback);
              return getDriverPromise;
            };
            LocalForage2.prototype.getSerializer = function getSerializer(callback) {
              var serializerPromise = Promise$1.resolve(localforageSerializer);
              executeTwoCallbacks(serializerPromise, callback);
              return serializerPromise;
            };
            LocalForage2.prototype.ready = function ready(callback) {
              var self2 = this;
              var promise = self2._driverSet.then(function() {
                if (self2._ready === null) {
                  self2._ready = self2._initDriver();
                }
                return self2._ready;
              });
              executeTwoCallbacks(promise, callback, callback);
              return promise;
            };
            LocalForage2.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
              var self2 = this;
              if (!isArray(drivers)) {
                drivers = [drivers];
              }
              var supportedDrivers = this._getSupportedDrivers(drivers);
              function setDriverToConfig() {
                self2._config.driver = self2.driver();
              }
              function extendSelfWithDriver(driver) {
                self2._extend(driver);
                setDriverToConfig();
                self2._ready = self2._initStorage(self2._config);
                return self2._ready;
              }
              function initDriver(supportedDrivers2) {
                return function() {
                  var currentDriverIndex = 0;
                  function driverPromiseLoop() {
                    while (currentDriverIndex < supportedDrivers2.length) {
                      var driverName = supportedDrivers2[currentDriverIndex];
                      currentDriverIndex++;
                      self2._dbInfo = null;
                      self2._ready = null;
                      return self2.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
                    }
                    setDriverToConfig();
                    var error = new Error("No available storage method found.");
                    self2._driverSet = Promise$1.reject(error);
                    return self2._driverSet;
                  }
                  return driverPromiseLoop();
                };
              }
              var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function() {
                return Promise$1.resolve();
              }) : Promise$1.resolve();
              this._driverSet = oldDriverSetDone.then(function() {
                var driverName = supportedDrivers[0];
                self2._dbInfo = null;
                self2._ready = null;
                return self2.getDriver(driverName).then(function(driver) {
                  self2._driver = driver._driver;
                  setDriverToConfig();
                  self2._wrapLibraryMethodsWithReady();
                  self2._initDriver = initDriver(supportedDrivers);
                });
              })["catch"](function() {
                setDriverToConfig();
                var error = new Error("No available storage method found.");
                self2._driverSet = Promise$1.reject(error);
                return self2._driverSet;
              });
              executeTwoCallbacks(this._driverSet, callback, errorCallback);
              return this._driverSet;
            };
            LocalForage2.prototype.supports = function supports(driverName) {
              return !!DriverSupport[driverName];
            };
            LocalForage2.prototype._extend = function _extend(libraryMethodsAndProperties) {
              extend(this, libraryMethodsAndProperties);
            };
            LocalForage2.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
              var supportedDrivers = [];
              for (var i = 0, len = drivers.length; i < len; i++) {
                var driverName = drivers[i];
                if (this.supports(driverName)) {
                  supportedDrivers.push(driverName);
                }
              }
              return supportedDrivers;
            };
            LocalForage2.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
              for (var i = 0, len = LibraryMethods.length; i < len; i++) {
                callWhenReady(this, LibraryMethods[i]);
              }
            };
            LocalForage2.prototype.createInstance = function createInstance(options) {
              return new LocalForage2(options);
            };
            return LocalForage2;
          }();
          var localforage_js = new LocalForage();
          module3.exports = localforage_js;
        }, { "3": 3 }] }, {}, [4])(4);
      });
    }
  });

  // src/index.ts
  
  

  // src/api/Ninja.ts
  

  // src/config.ts
  var config_default = {
    ver: "2.0",
    api: "http://localhost:8907",
    customDelimiter: "__custom",
    settingsKey: "nutils_settings",
    Colors: {
      black: 0,
      dotGreen: 65280,
      dotGrey: 8947848,
      dotOrange: 16757012,
      green: 8978312,
      grey: 16777215,
      red: 12603201,
      white: 13421772,
      yellow: 16763904
    },
    MapIDs: {
      Hull: 1,
      Igloo: 2,
      Temple: 3,
      DragonsDen: 4,
      dm_Arena1: 5,
      Elysium: 6,
      Tobruk: 7,
      ColdFusion: 8,
      TwinFaces: 9,
      KodysIsland: 10,
      Canyon: 11,
      Hill364: 12,
      Stasis: 13,
      ctf_Evening: 14,
      ArcticDusk: 15,
      Cathedral: 16,
      ctf_Lambda: 17,
      Aerial: 18,
      ctf_FacingWorlds: 19,
      ctf_Ash: 20,
      ctf_Naom: 21,
      dm_Hunter: 22,
      Tribal: 23,
      Kiwi: 24,
      Webb: 26,
      dm_Sleet: 27,
      SpaceStation: 28,
      Sinkhole: 29,
      LonelyIsland: 30,
      dm_Nexus: 31
    },
    WeaponReloadTimes: {
      Fists: 0,
      Shotgun: 0,
      SubmachineGun: 0,
      NadeLauncher: 2e3,
      Barrett: 2500,
      ShockRifle: 0,
      PulseGun: 0,
      FlameThrower: 0,
      RPG: 4e3,
      Rifle: 2e3,
      LaserGun: 0,
      LinkGun: 0,
      AK47: 0,
      Chainsaw: 0,
      DesertEagle: 0,
      Minigun: 0,
      X75: 0,
      MAC10: 0,
      Bow: 300,
      RocketLauncher: 0,
      Carbine: 0,
      BoomerangGun: 0,
      M60: 4e3,
      Uzi: 0,
      Bouncyball: 0
    }
  };

  // src/hookModMenu.ts
  
  

  // src/ui/scrollbar.ts
  
  
  function Scrollbar() {
    class _Scrollbar extends PIXI.Container {
      constructor(h, start = 0) {
        super();
        this.h = h;
        this.start = start;
        this.scrollBar.lineStyle(1, 16777215, 0.4, 0);
        this.scrollBar.drawRoundedRect(0, -5, 20, this.h, 4);
        this.scrollBar.endFill();
        this.scrollBar.x = 0;
        this.scrollBar.y = 0;
        this.scrollBar.interactive = true;
        this.scrollBar.alpha = 0.5;
        this.addChild(this.scrollBar);
        this.scrollBar.hitArea = new PIXI.Rectangle(-4, -4, 32, this.h + 8);
        this.scrollButton.lineStyle(1, 16777215, 0.4, 0);
        this.scrollButton.beginFill(16777215, 0.2);
        this.scrollButton.drawRoundedRect(0, 0, 16, 32, 4);
        this.scrollButton.endFill();
        this.scrollButton.hitArea = new PIXI.Rectangle(0, 0, 0, 0);
        this.addChild(this.scrollButton);
        this.scrollButton.x = 2;
        this.scrollButton.y = -3 + (this.h - 39) * this.start;
        this.scrollBar.on("mouseover", () => {
          this.scrollBar.alpha = 1;
        });
        this.scrollBar.on("mouseout", () => {
          this.scrollBar.alpha = 0.5;
        });
        this.scrollBar.on("mouseupoutside", () => {
          this.scrolling = false;
        });
        this.scrollBar.on("mousedown", (c) => {
          c.stopPropagation();
          this.scrolling = true;
          this.oy = c.data.global.y / App.Scale;
        });
        this.scrollBar.on("mouseup", (c) => {
          c.stopPropagation();
          this.scrolling = false;
        });
        this.scrollBar.on("mousemove", (c) => {
          this.scroll(c.data.global.y / App.Scale);
        });
        this.scrollBar.on("pointerup", () => {
          this.scrolling = false;
        });
        this.scrollBar.on("pointerupoutside", () => {
          this.scrolling = false;
        });
        this.scrollBar.on("pointerdown", (c) => {
          this.scrolling = true;
          this.oy = c.data.global.y / App.Scale;
          this.scroll(c.data.global.y / App.Scale);
        });
        this.scrollBar.on("pointermove", (c) => this.scroll(c.data.global.y / App.Scale));
        this.wheelListener = (c) => {
          this.scrolling = true;
          this.scroll(this.oy + 0.2 * c.data.delta);
          this.scrolling = false;
        };
      }
      scrolling = false;
      oy = 0;
      scrollBar = new PIXI.Graphics();
      scrollButton = new PIXI.Graphics();
      wheelListener;
      enableWheel() {
        UserInput.hasListener(UserInput.WHEEL, this.wheelListener) || UserInput.addListener(UserInput.WHEEL, this.wheelListener);
      }
      disableWheel() {
        UserInput.removeListener(UserInput.WHEEL, this.wheelListener);
      }
      scroll(a) {
        if (this.scrolling) {
          let b = this.scrollButton.y + (a - this.oy);
          -3 > b ? b = -3 : b > this.h - 39 && (b = this.h - 39);
          let c = this.h / (this.h - 39);
          this.scrollButton.y = b;
          this.oy = a;
          this.emit(Scrollbar2.SCROLL, 1 / this.h * (b + 3) * c);
        }
      }
      reset() {
        this.scrollButton.y = -3 + (this.h - 39) * this.start;
      }
      onMouseOver() {
        this.scrollButton.alpha = 1;
      }
      onMouseOut() {
        this.scrollButton.alpha = 0.5;
      }
    }
    const Scrollbar2 = _Scrollbar;
    Scrollbar2.SCROLL = "scroll";
    return Scrollbar2;
  }

  // src/hookModMenu.ts
  function hookModMenu() {
    const menu = Ninja_default.activeMenu();
    menu.memberButton.parent.removeChild(menu.memberButton);
    menu.clanButton.parent.removeChild(menu.clanButton);
    let menuClanState = 0;
    const memberclanButton = new MemberMenuButton("", 16763904, 18);
    memberclanButton.x = 0;
    memberclanButton.y = menu.rankingButton.y + 70;
    menu.on(Layer.Events.MEMBER_ACCESS + "f", () => {
      menuClanState = 0;
      memberclanButton.emit(MemberMenuButton.BUTTON_PRESSED, true);
    });
    menu.on(Layer.Events.CLAN_BROWSER_ACCESS + "f", () => {
      menuClanState = 1;
      memberclanButton.emit(MemberMenuButton.BUTTON_PRESSED, true);
    });
    memberclanButton.on(MemberMenuButton.BUTTON_PRESSED, (force = false) => {
      if (!["member", "clan"].includes(menu.mode) && !force)
        menuClanState = 0;
      menuClanState++;
      if (menuClanState == 3)
        menuClanState = 0;
      title1.style.fill = title2.style.fill = FontStyle.MenuTitle.fill;
      switch (menuClanState) {
        case 0:
          menu.emit(Layer.Events.MENU_ACCESS);
          break;
        case 1:
          menu.emit(Layer.Events.MEMBER_ACCESS);
          title1.style.fill = config_default.Colors.white;
          break;
        case 2:
          menu.emit(Layer.Events.CLAN_BROWSER_ACCESS);
          title2.style.fill = config_default.Colors.white;
          break;
      }
    });
    menu.memberButton.setActive = (n) => {
      if (menuClanState == 1 || !menuClanState && !n) {
        memberclanButton.setActive(n);
        if (!n)
          title1.style.fill = FontStyle.MenuTitle.fill;
      }
    };
    menu.clanButton.setActive = (n) => {
      if (menuClanState == 2 || !menuClanState && !n) {
        memberclanButton.setActive(n);
        if (!n)
          title2.style.fill = FontStyle.MenuTitle.fill;
      }
    };
    const ico1 = new PIXI.Sprite(App.CombinedTextures["menu_icon_players"]);
    ico1.x = 0.25 * memberclanButton.rectWidth;
    memberclanButton.addChild(ico1);
    const ico2 = new PIXI.Sprite(App.CombinedTextures["menu_icon_clans"]);
    ico2.x = 0.75 * memberclanButton.rectWidth;
    memberclanButton.addChild(ico2);
    ico1.scale.x = ico1.scale.y = ico2.scale.x = ico2.scale.y = 0.25;
    ico1.anchor.x = ico1.anchor.y = ico2.anchor.x = ico2.anchor.y = 0.5;
    ico1.tint = ico2.tint = config_default.Colors.white;
    ico1.y = ico2.y = 0.37 * memberclanButton.rectHeight;
    const icosep = new PIXI.Text("/", {
      ...FontStyle.MenuTitle,
      fontSize: 16,
      fill: config_default.Colors.white
    });
    icosep.x = 0.5 * memberclanButton.rectWidth;
    icosep.y = 0.37 * memberclanButton.rectHeight;
    icosep.anchor.x = icosep.anchor.y = 0.5;
    memberclanButton.addChild(icosep);
    const title1 = new PIXI.Text("Players", {
      ...FontStyle.MenuTitle,
      fontSize: 10
    });
    title1.x = 0.25 * memberclanButton.rectWidth;
    memberclanButton.addChild(title1);
    const title2 = new PIXI.Text("Clans", {
      ...FontStyle.MenuTitle,
      fontSize: 14
    });
    title2.x = 0.75 * memberclanButton.rectWidth;
    memberclanButton.addChild(title2);
    const titlesep = new PIXI.Text("/", {
      ...FontStyle.MenuTitle,
      fontSize: 14,
      fill: config_default.Colors.white
    });
    titlesep.x = 0.5 * memberclanButton.rectWidth;
    memberclanButton.addChild(titlesep);
    title1.y = title2.y = titlesep.y = 0.7 * memberclanButton.rectHeight;
    title1.anchor.x = title1.anchor.y = title2.anchor.x = title2.anchor.y = titlesep.anchor.x = titlesep.anchor.y = 0.5;
    menu.container.addChild(memberclanButton);
    const setActive = menu.clanButton.setActive.bind(menu.clanButton);
    menu.clanButton.setActive = (n) => {
      setActive(n);
      if (!n)
        utilsButton.setActive(false);
    };
    const utilsButton = new MemberMenuButton("Mods", 16763904, 15, "gears_icon");
    utilsButton.x = 0;
    utilsButton.y = menu.memberButton.y + 70;
    utilsButton.on(MemberMenuButton.BUTTON_PRESSED, () => {
      if (utilsButton.active) {
        utilsButton.setActive(false);
        menu.emit(Layer.Events.MENU_ACCESS);
        return;
      }
      menu.emit(Layer.Events.MENU_ACCESS);
      menu.playButton.setActive(false);
      utilsButton.setActive(true);
      modsMenu.show();
      App.Layer.addChild(modsMenu);
      App.Layer.emit(Layer.Events.HIDE_MENU);
      app.onResize();
    });
    utilsButton.icon.scale.x = utilsButton.icon.scale.y = 0.7;
    menu.container.addChild(utilsButton);
    class ModsMenu extends Feature {
      ox = 40;
      oy = 20;
      marginTop = 0;
      marginLeft = 0;
      showInstalled = false;
      modItemHeight = 110;
      shownConfig = null;
      background = new PIXI.Graphics();
      closeButton = new ImgButton();
      titleText = new PIXI.Text("Mods", FontStyle.MediumOrangeText);
      modContainer = new PIXI.Container();
      configContainer = new PIXI.Container();
      filterBox = new Checkbox("filter", "Show Installed", this.showInstalled);
      scroller = new (Scrollbar())(460);
      constructor() {
        super();
        this.background.x = 0;
        this.background.y = 40;
        this.background.lineStyle(1, 16777215, 0.1, 0);
        this.background.beginFill(3355443, 1);
        this.background.drawRect(0, 0, 660, 524);
        this.background.endFill();
        this.background.beginFill(0, 0.3);
        this.background.drawRect(10, 10, 640, 504);
        this.background.endFill();
        this.background.drawRect(15, 42, 630, 2);
        this.container.addChild(this.background);
        this.titleText.x = 0.5 * this.width - 20;
        this.titleText.y = this.oy + 36;
        this.titleText.anchor.x = 0.5;
        this.titleText.resolution = 2;
        this.container.addChild(this.titleText);
        this.closeButton = new ImgButton();
        this.closeButton.x = this.background.width - 40;
        this.closeButton.y = this.oy + 34;
        this.closeButton.scale.x = this.closeButton.scale.y = 0.4;
        this.closeButton.on("mousedown", () => this.shownConfig ? this.show() : App.Layer.onMenuAccess());
        this.container.addChild(this.closeButton);
        this.marginLeft += 20;
        this.marginTop = this.titleText.height * 3.25;
        this.filterBox.x = this.marginLeft + 6;
        this.filterBox.y = this.marginTop;
        this.filterBox.addEventListener(Checkbox.CHANGE, () => {
          this.showInstalled = this.filterBox.checked;
          this.indexList();
        });
        this.container.addChild(this.filterBox);
        this.configContainer.x = this.marginLeft + 4;
        this.configContainer.y = this.marginTop;
        this.container.addChild(this.configContainer);
        this.marginTop += 8;
        this.modContainer.x = this.marginLeft;
        this.modContainer.y = this.marginTop + this.filterBox.height;
        this.container.addChild(this.modContainer);
        this.scroller.x = this.width - this.scroller.width * 1.75;
        this.scroller.y = this.titleText.height * 3 + 2;
        this.scroller.on(Scrollbar().SCROLL, (prog) => {
          this.scrollTop = prog;
          this.indexList();
        });
        this.container.addChild(this.scroller);
        this.container.x = 0.5 * -this.width;
        this.reposition();
      }
      reposition() {
        this.marginTop = 0;
      }
      constructModItem(mod) {
        const iconSize = 52, maxDesc = 150, container = new PIXI.Graphics();
        container.beginFill(mod.isInstalled() ? config_default.Colors.green : config_default.Colors.white, 0.1);
        container.drawRoundedRect(0, 0, 620 - this.scroller.width, this.modItemHeight, 6);
        container.endFill();
        let pl = 0, pt = 0;
        const icon = new PIXI.Graphics();
        icon.beginFill(config_default.Colors.black, 0.2);
        icon.drawRoundedRect(pl += 10, pt = pl, iconSize, iconSize, 8);
        icon.endFill();
        const iconSprite = new PIXI.Sprite(App.CombinedTextures[mod.details.icon]);
        iconSprite.width = iconSprite.height = iconSize - 10;
        iconSprite.anchor.x = iconSprite.anchor.y = 0.5;
        iconSprite.x = iconSize / 2 + pl;
        iconSprite.y = iconSize / 2 + pt;
        icon.addChild(iconSprite);
        container.addChild(icon);
        const label = new PIXI.Text(mod.name, { ...FontStyle.ClanTitle, fontSize: 30 });
        label.x = pl += iconSize + 4;
        label.y = pt += 8;
        container.addChild(label);
        const authorLabel = new PIXI.Text(mod.details.author == "builtin" ? "Built-In" : "by " + mod.details.author, { ...FontStyle.SmallMenuTextYellow, fontSize: 20 });
        authorLabel.x = pl + label.width + 4;
        authorLabel.y = pt + 5;
        container.addChild(authorLabel);
        const description = new PIXI.Text((mod.details.description.slice(0, maxDesc) + (mod.details.description.length > maxDesc ? "..." : "")).trim(), { ...FontStyle.SmallMenuTextWhite2, wordWrap: true, wordWrapWidth: 600 });
        description.x = pl = 12;
        description.y = pt += iconSize - 2;
        container.addChild(description);
        pt = 12;
        pl = container.width;
        if (!mod.details.core) {
          const button = new Button("installer");
          button.setText(mod.isInstalled() ? "Uninstall" : "Install");
          button.setTint(mod.isInstalled() ? config_default.Colors.red : config_default.Colors.green);
          button.scale.x = button.scale.y = 0.7;
          button.x = pl -= button.width;
          button.y = pt;
          button.addListener(Button.BUTTON_RELEASED, () => {
            mod.doInstall(!mod.isInstalled());
            this.indexList();
          });
          container.addChild(button);
        }
        if (mod.isInstalled() && mod.config) {
          const button = new Button("settings");
          button.scale.x = button.scale.y = 0.7;
          button.setText("");
          button.x = pl -= button.width + 8;
          button.y = pt;
          button.width = button.height;
          button.addListener(Button.BUTTON_RELEASED, () => {
            this.showConfig(mod);
          });
          const ico = new PIXI.Sprite(App.CombinedTextures["menu_icon_settings"]);
          ico.width = button.width - 4;
          ico.height = button.height - 4;
          ico.anchor.x = ico.anchor.y = 0.5;
          ico.x = 6;
          ico.y = button.height / 2 + 3;
          button.addChild(ico);
          container.addChild(button);
        }
        return container;
      }
      scrollTop = 0;
      maxMods = 3;
      show() {
        this.shownConfig = null;
        this.titleText.text = "Mods";
        this.modContainer.visible = this.filterBox.visible = this.scroller.visible = true;
        this.configContainer.visible = false;
        this.scroller.enableWheel();
        this.indexList();
      }
      indexList() {
        const mods = Ninja_default.mods.filter((m) => this.showInstalled ? m.isInstalled() : true), top = Math.round((mods.length - this.maxMods) * this.scrollTop);
        this.modContainer.removeChildren();
        mods.sort((m1, m2) => m1.name.toLowerCase() > m2.name.toLowerCase() ? 1 : -1).slice(top, top + this.maxMods).forEach((m, i) => {
          const item = this.constructModItem(m);
          item.y = (this.modItemHeight + 8) * i;
          this.modContainer.addChild(item);
        });
      }
      hide() {
        this.scroller.disableWheel();
      }
      showConfig(mod) {
        this.shownConfig = mod;
        this.scroller.disableWheel();
        this.modContainer.visible = this.filterBox.visible = this.scroller.visible = false;
        this.configContainer.visible = true;
        this.titleText.text = mod.name + " Config";
        this.configContainer.removeChildren();
        let off = 0;
        const mnu = this;
        function doKeys(store) {
          const name = (key) => {
            const n = mod.configNames[key];
            if (!n)
              return key;
            else
              return Array.isArray(n) ? n[0] : n;
          };
          store.sort((e1, e2) => name(e1[0]).toLowerCase() > name(e2[0]).toLowerCase() ? 1 : -1).forEach(([key, value]) => {
            const cfgname = mod.configNames[key], item = mnu.constructConfigItem(mod, typeof value == "boolean" ? {
              type: "bool",
              name: name(key),
              key,
              value
            } : typeof value == "number" ? {
              type: "num",
              name: name(key),
              key,
              value
            } : {
              type: "str",
              name: name(key),
              key,
              value,
              maxLength: typeof cfgname == "object" ? cfgname.maxLength || 0 : 0
            });
            item.y = off;
            off += item.height;
            mnu.configContainer.addChild(item);
          });
        }
        doKeys(Object.entries(mod.configNames).filter((e) => typeof e[1] == "object").map(([k]) => [k, mod.config.get(k)]));
        doKeys(Object.entries(mod.configNames).filter((e) => typeof e[1] !== "object").map(([k]) => [k, mod.config.get(k)]));
      }
      constructConfigItem(mod, data) {
        const container = new PIXI.Container();
        switch (data.type) {
          case "bool": {
            const box = new Checkbox(`config_${data.key}`, data.name, data.value);
            box.addEventListener(Checkbox.CHANGE, () => {
              mod.config.set(data.key, box.checked);
              mod.configChanged(data.key);
            });
            container.addChild(box);
            break;
          }
          case "str":
          case "num": {
            const isNum = data.type == "num";
            const label = new PIXI.Text(data.name, {
              fontSize: 18,
              lineHeight: 16,
              fill: 16763904,
              strokeThickness: 2,
              lineJoin: "round"
            });
            label.y = 6;
            container.addChild(label);
            const input = new InputField(`config${data.key}`);
            input.x = Math.ceil(label.width / 15) * 15 + 4;
            input.setDimensions(500, 34);
            input.setMaxChars(data.maxLength || Infinity);
            input.setText(String(data.value));
            input.setFilter(isNum ? "0123456789-" : "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 <>?!@#$%^&*()-_+=[]{}:~|/.", false);
            input.addListener(InputField.CHANGE, function(d) {
              const val = d.data.value || "";
              mod.config.set(data.key, isNum ? Number(val) : val);
              mod.configChanged(data.key);
            });
            container.addChild(input);
          }
        }
        return container;
      }
    }
    const modsMenu = new ModsMenu();
    App.Layer.mainMenuHides.push(modsMenu);
    [
      "loginMenu",
      "memberBrowserMenu",
      "clanBrowserMenu",
      "registerMenu",
      "upResetMenu",
      "profileMenu",
      "userMenu",
      "rankingMenu",
      "newsMenu",
      "partnerMenu",
      "serverListMenu",
      "clanMenu",
      "serverCreationMenu",
      "renameMenu",
      "logoutMenu",
      "guestProfileMenu"
    ].forEach((e) => App.Layer[e].hides.push(modsMenu));
    App.Layer.features.push(modsMenu);
  }

  // src/api/Settings.ts
  var Settings = class {
    constructor(key = "niou_settings", defaults) {
      this.key = key;
      this.defaults = defaults;
    }
    getStore(fillDefaults = false) {
      const store = JSON.parse(localStorage.getItem(this.key) || "{}");
      if (fillDefaults)
        return { ...this.defaults, ...store };
      else
        return store;
    }
    get(key) {
      return this.getStore()[key] ?? this.defaults[key];
    }
    set(key, value) {
      return localStorage.setItem(this.key, JSON.stringify({ ...this.getStore(), [key]: value }));
    }
  };

  // src/api/Ninja.ts
  var Ninja_default = new class Ninja {
    settings = new Settings(config_default.settingsKey, {
      enabledMods: [],
      texturePack: "",
      uiScale: 0
    });
    constructor() {
    }
    init() {
      const ninja = this;
      this.ready = true;
      const stepper = app.stepCallback;
      app.stepCallback = function(...d) {
        try {
          ninja.stepListeners.forEach((l) => l());
        } catch (err) {
          console.error(err);
        }
        return stepper(...d);
      };
      App.Stats.realSetPing = App.Stats.setPing;
      App.Stats.setPing = function(ping) {
        ninja.serverLatency = ping;
        return App.Stats.realSetPing(ping);
      };
      app.onResize = window.eval(`(function ${app.onResize.toString().replace(`App.Scale=b`, `b=Ninja.settings.get("uiScale")||b,App.Scale=b`)})`);
      app.onResize();
      hookModMenu();
      this.mods.forEach((m) => m.isInstalled() && m.loadon == "appstart" && m.load());
      this.readyListeners.forEach((l) => l());
    }
    ready = false;
    get GameVersion() {
      return document.querySelector(`script[src*="game.js"]`)?.src.split("/").pop()?.split("?v=")?.[1] || (() => {
        try {
          return App.ClientVersion;
        } catch {
          return "unknown";
        }
      })();
    }
    serverLatency = 0;
    mods = [];
    registerMod(mod) {
      this.mods.push(mod);
    }
    loadMod(id) {
      const mod = this.mods.find((m) => m.id == id);
      if (!mod || mod.loaded || !mod.isInstalled())
        return;
      if (this.ready && mod.loadon == "appstart")
        mod.load();
      else if (mod.loadon == "pagestart")
        mod.load();
    }
    log(text, color) {
      if (this.ready)
        App.Console.log(text, color);
      else
        console.log(text);
    }
    stepListeners = [];
    onstep(l) {
      this.stepListeners.push(l);
      return l;
    }
    offstep(l) {
      const i = this.stepListeners.indexOf(l);
      if (i >= 0)
        this.stepListeners.splice(i, 1);
    }
    readyListeners = [];
    onready(l) {
      this.readyListeners.push(l);
      return l;
    }
    offready(l) {
      const i = this.readyListeners.indexOf(l);
      if (i >= 0)
        this.readyListeners.splice(i, 1);
    }
    isGuest() {
      return App.Layer.setup == Layer.SETUP_GUEST;
    }
    activeMenu() {
      return this.isGuest() ? App.Layer.guestMenu : App.Layer.memberMenu;
    }
    activeClient() {
      return app.gameClient.socket ? app.gameClient : app.pvpClient.socket ? app.pvpClient : null;
    }
    inGame() {
      const active = this.activeClient();
      return app.matchStarted && active && active.socket.readyState == WebSocket.OPEN;
    }
  }();

  // src/coremods/index.ts
  var coremods_exports = {};
  __export(coremods_exports, {
    TexturePackMod: () => TexturePackMod,
    UIURLMod: () => UIURLMod
  });

  // src/coremods/TexturePack.ts
  
  var import_localforage = __toESM(require_localforage());
  

  // src/api/Mod.ts
  var Mod = class {
    constructor(details) {
      this.details = details;
    }
    get id() {
      return this.details.id;
    }
    get name() {
      return this.details.name;
    }
    loaded = false;
    loadon = "appstart";
    config = null;
    configNames;
    isInstalled() {
      return this.details.core || Ninja_default.settings.get("enabledMods").includes(this.id);
    }
    doInstall(add = true) {
      const list = new Set(Ninja_default.settings.get("enabledMods"));
      if (add) {
        list.add(this.id);
        if (!this.loaded)
          this.load();
      } else {
        list.delete(this.id);
        if (this.loaded)
          this.unload();
      }
      Ninja_default.settings.set("enabledMods", [...list]);
      return add;
    }
    load() {
      this.log(`Loaded successfully!`);
      this.loaded = true;
    }
    configChanged(key) {
    }
    unload() {
      this.log(`Unloaded mod.`);
      this.loaded = false;
    }
    log(text, color) {
      Ninja_default.log(`[${this.id}] ${text}`, color);
    }
    implementConfig(defaults, names) {
      this.config = new Settings(`modconfig_${this.id}`, defaults);
      this.configNames = names;
    }
  };

  // src/coremods/TexturePack.ts
  var TexturePackMod = class extends Mod {
    constructor() {
      super({
        id: "TexturePack",
        name: "Texture Packs",
        description: "Adds in the texture pack settings tab and allows packs to load.",
        author: "builtin",
        icon: "menu_icon_settings",
        core: true
      });
      this.loadon = "pagestart";
    }
    load() {
      const texturePack = Ninja_default.settings.get("texturePack");
      class WorkerNew extends Worker {
        _postMessage;
        constructor(url, opts) {
          super(url, opts);
          this._postMessage = this.postMessage;
          this.postMessage = this.newPostMessage;
        }
        newPostMessage(data, ...args) {
          if (texturePack && !window.SKIP_TEX_LOAD && !data?.bypass) {
            try {
              fetch(`${config_default.api}/packs/${texturePack}`).then((r) => r.json()).then(async (pack) => {
                if (pack && data.id == "loadImageBitmap" && typeof data.data[0] == "string" && texturePack) {
                  const orig = data.data[0];
                  const isCustom = texturePack == config_default.customDelimiter;
                  if ((pack.hasCombined || isCustom) && orig.includes("ninja.io") && orig.includes("combined") && orig.endsWith(".png"))
                    data.data[0] = `${config_default.api}/packs/${texturePack}/combined.png?v=${Ninja_default.GameVersion}`;
                  if ((pack.hasSeamless || isCustom) && orig.includes("ninja.io") && orig.includes("seamless") && orig.endsWith(".png"))
                    data.data[0] = `${config_default.api}/packs/${texturePack}/seamless.png?v=${Ninja_default.GameVersion}`;
                  if (data.data[0].startsWith(config_default.api) && isCustom) {
                    const zip = await import_localforage.default.getItem("custom_pack");
                    if (zip) {
                      const form = new FormData();
                      form.append("zip", zip);
                      const res = await fetch(data.data[0], {
                        method: "POST",
                        body: form
                      }).then((r) => r.blob());
                      data.data[0] = URL.createObjectURL(res);
                    } else
                      data.data[0] = orig;
                  }
                }
                this._postMessage(data, ...args);
              }).catch(() => {
                this._postMessage(data, ...args);
              });
            } catch (err) {
              console.error(err);
              this._postMessage(data, ...args);
            }
          } else
            this._postMessage(data, ...args);
        }
      }
      window.Worker = Worker = WorkerNew;
      Ninja_default.onready(() => this.init());
      super.load();
    }
    init() {
      if (!app.menu?.settingsPanel)
        return setTimeout(() => this.init(), 500);
      SettingsPanel.Tabs.TEXTURES = "tex";
      function SettingsPanelNew(w, h) {
        const pan = new SettingsPanel(w, h);
        function newTab(title, name, x, tab) {
          name = `${name}Tab`;
          pan[name] = new tab();
          pan[`${name}Button`] = new PIXI.Text(title, {
            fontSize: 18,
            lineHeight: 18,
            fill: config_default.Colors.yellow,
            strokeThickness: 3,
            lineJoin: "round"
          });
          pan[`${name}Button`].resolution = 1.5 * App.DevicePixelRatio;
          pan[`${name}Button`].anchor.x = pan[`${name}Button`].anchor.y = 0.5;
          pan[`${name}Button`].x = x + 56;
          pan[`${name}Button`].y = 28;
          pan.addChild(pan[`${name}Button`]);
          pan[`${name}ButtonBackground`] = new PIXI.Graphics();
          pan[`${name}ButtonBackground`].beginFill(16777215, 0.1);
          pan[`${name}ButtonBackground`].drawRoundedRect(0, 0, 112, 30, 2);
          pan[`${name}ButtonBackground`].endFill();
          pan[`${name}ButtonBackground`].x = x;
          pan[`${name}ButtonBackground`].y = 12;
          pan[`${name}ButtonBackground`].interactive = true;
          pan[`${name}ButtonBackground`].on("touchstart", pan.displayTab.bind(pan, SettingsPanel.Tabs.TEXTURES));
          pan[`${name}ButtonBackground`].on("mousedown", pan.displayTab.bind(pan, SettingsPanel.Tabs.TEXTURES));
          pan[`${name}ButtonBackground`].on("mouseover", function() {
            pan[`${name}ButtonBackground`].tint = 11184810;
          });
          pan[`${name}ButtonBackground`].on("mouseout", function() {
            pan[`${name}ButtonBackground`].tint = 16777215;
          });
          pan.addChild(pan[`${name}ButtonBackground`]);
        }
        newTab("Texture Pack", "tex", 302, getTexTab());
        return pan;
      }
      const oldX = app.menu.settingsPanel.x, oldY = app.menu.settingsPanel.y;
      app.menu.settingsPanel.destroy();
      app.menu.settingsPanel = SettingsPanelNew(660, 524);
      app.menu.settingsPanel.x = oldX;
      app.menu.settingsPanel.y = oldY;
      app.menu.resize();
      app.menu.settingsPanel.displayTab = function(name) {
        AudioEffects.ButtonClick.audio.play();
        Object.values(SettingsPanel.Tabs).filter((t2) => t2 !== name).forEach((i) => {
          const t2 = this[`${i}Tab`];
          if (t2.parent) {
            if (t2.onHide)
              t2.onHide();
            this.removeChild(t2);
          }
          this[`${i}TabButtonBackground`].alpha = 1;
        });
        const t = this[`${name}Tab`];
        this[`${name}TabButtonBackground`].alpha = 0;
        this.addChild(t);
        if (t.onShow)
          t.onShow();
        app.menu.settingsPanel.selectedTab = name;
        Ninja_default.activeMenu().emit("open_tab", name);
      };
      Object.values(SettingsPanel.Tabs).forEach((d) => {
        const tab = app.menu.settingsPanel[`${d}TabButtonBackground`];
        tab.on("mousedown", app.menu.settingsPanel.displayTab.bind(app.menu.settingsPanel, d));
        tab._events.mousedown.shift();
      });
    }
  };
  function getTexTab() {
    const maxPacks = 6;
    const FileUploader = document.createElement("input");
    FileUploader.type = "file";
    FileUploader.accept = "application/zip";
    FileUploader.multiple = false;
    FileUploader.style.display = "none";
    document.body.appendChild(FileUploader);
    class TexTab extends PIXI.Container {
      constructor() {
        super();
        const tab = this;
        EventDispatcher.call(this);
        this.marginLeft = 40;
        this.marginTop = 52;
        this.off = this.marginTop + 6;
        this.texTitle = new PIXI.Text("Texture Packs", {
          fontSize: 18,
          lineHeight: 18,
          fill: config_default.Colors.yellow,
          strokeThickness: 3,
          lineJoin: "round"
        });
        this.texTitle.x = this.marginLeft - 5;
        this.texTitle.y = this.off;
        this.addChild(this.texTitle);
        this.texHint = new PIXI.Text("(make sure to click save)", {
          fontSize: 14,
          fill: config_default.Colors.white,
          strokeThickness: 2,
          lineJoin: "round"
        });
        this.texHint.x = this.texTitle.x + this.texTitle.width + 3;
        this.texHint.y = this.off + 2;
        this.addChild(this.texHint);
        this.off += 30;
        const customTitle = new PIXI.Text("Custom Pack (read docs for tutorial)", {
          fontSize: 16,
          fill: config_default.Colors.white,
          strokeThickness: 2,
          lineJoin: "round"
        });
        customTitle.x = this.marginLeft;
        customTitle.y = this.off;
        this.addChild(customTitle);
        this.off += 20;
        const customDesc = new PIXI.Text("Upload a zip file containing your textures.", {
          fontSize: 14,
          fill: config_default.Colors.yellow,
          strokeThickness: 2,
          lineJoin: "round"
        });
        customDesc.x = this.marginLeft;
        customDesc.y = this.off;
        this.addChild(customDesc);
        this.off += 24;
        const uploader = new Button("uploader");
        uploader.addListener(Button.BUTTON_RELEASED, async () => {
          if (await import_localforage.default.getItem("custom_pack")) {
            await import_localforage.default.removeItem("custom_pack");
            delete this.hasCust;
            this.runPacks();
          } else {
            FileUploader.click();
          }
        });
        uploader.x = this.marginLeft + 8;
        uploader.y = this.off;
        uploader.scale.x = uploader.scale.y = 0.75;
        this.addChild(uploader);
        this.off += 12;
        const off = this.off;
        this.packIndex = 0;
        !(this.runPacks = async () => {
          try {
            this.off = off;
            if (this.hadPacks)
              this.hadPacks.map((p) => p.destroy());
            this.hadPacks = [];
            const packs = this.packList || (this.packList = await fetch(`${config_default.api}/packs`).then((r) => r && r.json()) || []);
            const custom = this.hasCust || (this.hasCust = await import_localforage.default.getItem("custom_pack") || true);
            const packList = packs.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1).slice(this.packIndex, this.packIndex + maxPacks);
            if (custom && custom !== true) {
              packList.unshift({
                id: config_default.customDelimiter,
                name: "Custom Pack",
                description: "Custom texture pack: " + custom.name,
                author: "You!",
                hasCombined: false,
                hasSeamless: false
              });
              uploader.setText("Delete");
              uploader.setTint(config_default.Colors.red);
            } else {
              uploader.setText("Upload");
              uploader.setTint(config_default.Colors.grey);
            }
            packList.forEach((pak) => {
              const hasPack = Ninja_default.settings.get("texturePack") == pak.id;
              const packName = new PIXI.Text(`${pak.name || "Texture Pack"} (by ${pak.author || "Unnamed"})`, {
                fontSize: 16,
                fill: config_default.Colors.white,
                strokeThickness: 2,
                lineJoin: "round"
              });
              packName.x = this.marginLeft;
              packName.y = this.off += 28;
              this.hadPacks.push(this.addChild(packName));
              const flags = [];
              if (pak.hasCombined)
                flags.push("textures");
              if (pak.hasSeamless)
                flags.push("terrain");
              const packDescription = new PIXI.Text(`${pak.description || "No Description."}${flags.length ? ` (${flags.join(", ")})` : ""}`, {
                fontSize: 14,
                fill: config_default.Colors.white,
                strokeThickness: 2,
                lineJoin: "round"
              });
              packDescription.x = this.marginLeft;
              packDescription.y = this.off += packName.height + 2;
              this.hadPacks.push(this.addChild(packDescription));
              const packButton = new Button(`pack_btn_${pak.id}`);
              packButton.x = packName.x + packName.width + 12;
              packButton.y = this.off - packName.height;
              packButton.setText(hasPack ? "Remove" : "Use");
              packButton.setTint(hasPack ? config_default.Colors.red : config_default.Colors.green);
              packButton.scale.x = packButton.scale.y = 0.5;
              packButton.addListener(Button.BUTTON_RELEASED, async () => {
                Ninja_default.settings.set("texturePack", hasPack ? "" : pak.id);
                app.menu.settingsPanel.controlsTab.forceRefresh = true;
                this.runPacks();
              });
              this.hadPacks.push(this.addChild(packButton));
            });
          } catch (err) {
            console.error(err);
          }
        })();
      }
    }
    TexTab.prototype.onShow = function() {
      if (!this.scroller) {
        const off = this.parent.texTabButton.height + 32;
        this.scroller = new (Scrollbar())(this.parent.height - off - 12 - this.parent.applyButton.height);
        this.scroller.x = this.parent.width - this.scroller.width * 1.75;
        this.scroller.y = off;
        this.scroller.on(Scrollbar().SCROLL, (prog) => {
          this.packIndex = Math.round((this.packList.length - maxPacks) * prog);
          this.runPacks();
        });
        this.addChild(this.scroller);
      }
      this.scroller.enableWheel();
      const tab = this;
      FileUploader.onchange = () => {
        [...FileUploader.files].forEach(async (f) => {
          if (f.type.startsWith("application/") && f.type.includes("zip")) {
            await import_localforage.default.setItem("custom_pack", f);
            delete tab.hasCust;
            tab.runPacks();
            app.menu.settingsPanel.controlsTab.forceRefresh = true;
          }
        });
      };
    };
    TexTab.prototype.onHide = function() {
      this.scroller.disableWheel();
    };
    return TexTab;
  }

  // src/coremods/UIURLs.ts
  
  

  // src/utils.ts
  function clickContainer(container) {
    container._events.mousedown.forEach((f) => f.fn());
  }

  // src/coremods/UIURLs.ts
  var UIURLMod = class extends Mod {
    constructor() {
      super({
        id: "UIURL",
        name: "UI URLs",
        description: "Saves your navigation state between page loads. Also enables joining a game via link.",
        author: "builtin",
        icon: "menu_icon_players",
        core: true
      });
    }
    load() {
      const menu = Ninja_default.activeMenu(), ProfilePaths = {
        [ProfileMenu.TAB_OVERVIEW]: "",
        [ProfileMenu.TAB_CLAN]: "clan",
        [ProfileMenu.TAB_ACCOUNT]: "account",
        [ProfileMenu.TAB_SETTINGS]: "settings"
      }, ShopPaths = {
        [CustomizationMenu.PLAYER]: "self",
        [CustomizationMenu.WEAPONS]: "weapons"
      }, SettingsPaths = {
        [SettingsPanel.Tabs.CONTROLS]: "controls",
        [SettingsPanel.Tabs.GRAPHICS]: "graphics",
        [SettingsPanel.Tabs.SOUND]: "sound",
        [SettingsPanel.Tabs.TEXTURES || "tex"]: "textures"
      };
      if (!window.location.hash.substring(1))
        window.location.hash = "/";
      menu.addListener(Layer.Events.MENU_ACCESS, () => this.switchHash("" /* menu */));
      let profCurTab = "";
      menu.on(Layer.Events.PROFILE_ACCESS, () => this.switchHash("profile" /* profile */, ProfilePaths[profCurTab]));
      const openTab = App.Layer.profileMenu.openTab.bind(App.Layer.profileMenu);
      App.Layer.profileMenu.openTab = (tab, audio) => {
        openTab(tab, audio);
        profCurTab = tab;
        this.switchHash("profile" /* profile */, ProfilePaths[tab]);
      };
      menu.on(Layer.Events.CUSTOMIZATION_ACCESS, () => this.switchHash("shop" /* shop */, ShopPaths[App.Layer.customizationMenu.display]));
      App.Layer.customizationMenu.playerCustomizationButton.on("mousedown", () => this.switchHash("shop" /* shop */, ShopPaths[CustomizationMenu.PLAYER]));
      App.Layer.customizationMenu.weaponCustomizationButton.on("mousedown", () => this.switchHash("shop" /* shop */, ShopPaths[CustomizationMenu.WEAPONS]));
      menu.on(Layer.Events.RANKING_ACCESS, () => this.switchHash("ranks" /* ranks */));
      menu.on(Layer.Events.MEMBER_ACCESS, () => this.switchHash("players" /* players */));
      menu.on(Layer.Events.CLAN_BROWSER_ACCESS, () => this.switchHash("clans" /* clans */));
      menu.on(Layer.Events.SETTINGS_ACCESS, () => this.switchHash("settings" /* settings */, SettingsPaths[app.menu.settingsPanel.selectedTab || SettingsPanel.Tabs.CONTROLS]));
      menu.on("open_tab", (tab) => this.switchHash("settings" /* settings */, SettingsPaths[tab]));
      menu.on(Layer.Events.LOGIN_ACCESS, () => this.switchHash("login" /* login */));
      menu.on(Layer.Events.REGISTER_ACCESS, () => this.switchHash("register" /* register */));
      menu.on(Layer.Events.RECOVER_ACCESS, () => this.switchHash("recovery" /* recover */));
      const curPath = window.location.hash.substring(2).split("/");
      switch (curPath[0]) {
        case "profile" /* profile */: {
          menu.emit(Layer.Events.PROFILE_ACCESS);
          const profPath = Object.entries(ProfilePaths).find((p) => p[1] == curPath[1]);
          if (profPath)
            App.Layer.profileMenu.openTab(profPath[0], false);
          break;
        }
        case "shop" /* shop */: {
          menu.emit(Layer.Events.CUSTOMIZATION_ACCESS);
          clickContainer(curPath[1] == ShopPaths[CustomizationMenu.WEAPONS] ? App.Layer.customizationMenu.weaponCustomizationButton : App.Layer.customizationMenu.playerCustomizationButton);
          break;
        }
        case "ranks" /* ranks */: {
          menu.emit(Layer.Events.RANKING_ACCESS);
          break;
        }
        case "players" /* players */: {
          menu.emit(Layer.Events.MEMBER_ACCESS + "f");
          break;
        }
        case "clans" /* clans */: {
          menu.emit(Layer.Events.CLAN_BROWSER_ACCESS + "f");
          break;
        }
        case "settings" /* settings */: {
          menu.emit(Layer.Events.SETTINGS_ACCESS);
          const settPath = Object.entries(SettingsPaths).find((p) => p[1] == curPath[1]);
          if (settPath)
            app.menu.settingsPanel.displayTab(settPath[0]);
          break;
        }
        case "login" /* login */: {
          menu.emit(Layer.Events.LOGIN_ACCESS);
          break;
        }
        case "register" /* register */: {
          menu.emit(Layer.Events.REGISTER_ACCESS);
          break;
        }
        case "recovery" /* recover */: {
          menu.emit(Layer.Events.RECOVER_ACCESS);
          break;
        }
      }
      super.load();
    }
    switchHash(path, ...extra) {
      window.location.hash = `/${[path, ...extra].filter((e) => e).join("/")}`;
    }
  };

  // src/mods/index.ts
  var mods_exports = {};
  __export(mods_exports, {
    FPSDisplayMod: () => FPSDisplayMod,
    HotkeyMessagesMod: () => HotkeyMessagesMod,
    SoundEffectsMod: () => SoundEffectsMod
  });

  // src/mods/fpsDisplay.ts
  var FPSDisplayMod = class extends Mod {
    frameDisplay;
    lastUpdate = Date.now();
    frames = 0;
    listener;
    constructor() {
      super({
        id: "FPSDisplay",
        name: "FPS Display",
        author: "Meow",
        description: "Displays your FPS and ping at the top of the screen.",
        icon: "energy_icon"
      });
      this.implementConfig({
        showTime: false
      }, {
        showTime: "Show Current Time"
      });
    }
    load() {
      this.frameDisplay = document.createElement("div");
      Object.entries({
        padding: "0.3rem 0.4rem",
        font: "16px Arial",
        position: "fixed",
        top: "0px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "rgba(0,0,0,0.5)",
        borderBottomLeftRadius: "6px",
        borderBottomRightRadius: "6px",
        pointerEvents: "none",
        userSelect: "none"
      }).forEach((e) => {
        this.frameDisplay.style[e[0]] = e[1];
      });
      this.frameDisplay.textContent = "...";
      this.lastUpdate = Date.now();
      document.body.appendChild(this.frameDisplay);
      this.listener = Ninja_default.onstep(() => this.update());
      super.load();
    }
    unload() {
      Ninja_default.offstep(this.listener);
      this.frameDisplay.remove();
      super.unload();
    }
    update() {
      const now = Date.now(), elapsed = now - this.lastUpdate;
      if (elapsed < 500) {
        this.frames++;
      } else {
        let fps = `${Math.round(this.frames / (elapsed / 1e3))} FPS`;
        if (this.config.get("showTime"))
          fps = `${new Date().toLocaleTimeString()} - ` + fps;
        if (Ninja_default.inGame())
          fps += ` - ${Ninja_default.serverLatency || 0}ms`;
        if (this.frameDisplay.innerText !== fps)
          this.frameDisplay.innerText = fps;
        this.frames = 0;
        this.lastUpdate = now;
        this.frameDisplay.style.display = "block";
      }
    }
  };

  // src/mods/hotkeyMessages.ts
  
  var HotkeyMessagesMod = class extends Mod {
    lastSent = Date.now();
    constructor() {
      super({
        id: "HotkeyMessages",
        name: "Hotkey Messages",
        author: "Anna",
        description: "Lets you send pre-defined messages in chat using hotkeys. Use fullscreen to avoid conflics with browser hotkeys.",
        icon: "chat-ingame"
      });
      this.implementConfig({
        keyA: "",
        keyS: "",
        keyD: "",
        keyQ: "",
        keyW: "",
        keyE: ""
      }, {
        keyA: "ALT + A",
        keyS: "ALT + S",
        keyD: "ALT + D",
        keyQ: "ALT + Q",
        keyW: "ALT + W",
        keyE: "ALT + E"
      });
    }
    load() {
      window.addEventListener("keydown", this.keydown);
      super.load();
    }
    unload() {
      window.removeEventListener("keydown", this.keydown);
      super.unload();
    }
    handleKeyDown(e) {
      if (e.repeat)
        return;
      const message = this.config.get(`key${e.key.toUpperCase()}`);
      if (e.altKey && message) {
        this.sendChatMessage(message);
        e.stopImmediatePropagation();
        e.preventDefault();
      }
    }
    keydown = this.handleKeyDown.bind(this);
    sendChatMessage(msg) {
      if (!Ninja_default.inGame() || this.lastSent >= Date.now())
        return;
      const binaryChatMessage = Client.compress({
        t: Protocol.Game.MESSAGE,
        msg
      });
      Ninja_default.activeClient().socket.send(binaryChatMessage);
      this.lastSent = Date.now() + 1e3 * 1.4;
    }
  };

  // src/mods/soundEffects.ts
  
  
  var SoundEffectsMod = class extends Mod {
    constructor() {
      super({
        id: "SoundEffects",
        name: "Sounds++",
        description: "Adds additional sound effects to the game.",
        author: "Meow",
        icon: "unmute_icon"
      });
    }
    load() {
      App.Console.consoleInput.addListener(InputField.CHANGE, this.consoleListener);
      super.load();
    }
    unload() {
      App.Console.consoleInput.removeListener(InputField.CHANGE, this.consoleListener);
      super.unload();
    }
    consoleTyped() {
      AudioEffects.ButtonHover.audio.play();
    }
    consoleListener = this.consoleTyped.bind(this);
  };

  // src/index.ts
  window.Ninja = Ninja_default;
  window.addEventListener("keydown", (e) => {
    if (e.key == "F11") {
      e.preventDefault();
      if (document.fullscreenElement)
        document.exitFullscreen();
      else
        document.querySelector("html").requestFullscreen();
    }
  });
  Object.values(coremods_exports).forEach((mod) => Ninja_default.registerMod(new mod()));
  Object.values(mods_exports).forEach((mod) => Ninja_default.registerMod(new mod()));
  Ninja_default.mods.forEach((m) => m.loadon == "pagestart" && !m.loaded && m.load());
  var tester = setInterval(() => {
    try {
      if (!app || !app.menu || !app.menu.joinButton || JSON.stringify(app.status) == "{}" || !APIClient || !APIClient.postCreateGame)
        return;
    } catch {
      return;
    }
    clearInterval(tester);
    Ninja_default.log("Loading NinjaIOUtils...");
    Ninja_default.init();
    if (Ninja_default.isGuest())
      alert(`NinjaIOUtils works best when you are logged in!
No support will be provided to logged out users experiencing issues, sorry.`);
    Ninja_default.log(`NinjaIOUtils ${config_default.ver} Loaded Successfully!`);
    Ninja_default.log(`This is a beta version of NinjaIOUtils. Not all features are implemented.`);
  });
})();
/*!
    localForage -- Offline Storage, Improved
    Version 1.10.0
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/
