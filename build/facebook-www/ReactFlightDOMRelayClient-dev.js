/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 * @nolint
 * @preventMunge
 * @preserve-invariant-messages
 */

'use strict';

if (__DEV__) {
  (function() {
"use strict";

var ReactFlightDOMRelayClientIntegration = require("ReactFlightDOMRelayClientIntegration");

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var REACT_ELEMENT_TYPE = 0xeac7;
var REACT_PORTAL_TYPE = 0xeaca;
var REACT_FRAGMENT_TYPE = 0xeacb;
var REACT_STRICT_MODE_TYPE = 0xeacc;
var REACT_PROFILER_TYPE = 0xead2;
var REACT_PROVIDER_TYPE = 0xeacd;
var REACT_CONTEXT_TYPE = 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = 0xeacf;
var REACT_FORWARD_REF_TYPE = 0xead0;
var REACT_SUSPENSE_TYPE = 0xead1;
var REACT_SUSPENSE_LIST_TYPE = 0xead8;
var REACT_MEMO_TYPE = 0xead3;
var REACT_LAZY_TYPE = 0xead4;
var REACT_BLOCK_TYPE = 0xead9;
var REACT_SERVER_BLOCK_TYPE = 0xeada;
var REACT_FUNDAMENTAL_TYPE = 0xead5;
var REACT_RESPONDER_TYPE = 0xead6;
var REACT_SCOPE_TYPE = 0xead7;

if (typeof Symbol === "function" && Symbol.for) {
  var symbolFor = Symbol.for;
  REACT_ELEMENT_TYPE = symbolFor("react.element");
  REACT_PORTAL_TYPE = symbolFor("react.portal");
  REACT_FRAGMENT_TYPE = symbolFor("react.fragment");
  REACT_STRICT_MODE_TYPE = symbolFor("react.strict_mode");
  REACT_PROFILER_TYPE = symbolFor("react.profiler");
  REACT_PROVIDER_TYPE = symbolFor("react.provider");
  REACT_CONTEXT_TYPE = symbolFor("react.context");
  REACT_ASYNC_MODE_TYPE = symbolFor("react.async_mode");
  REACT_CONCURRENT_MODE_TYPE = symbolFor("react.concurrent_mode");
  REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref");
  REACT_SUSPENSE_TYPE = symbolFor("react.suspense");
  REACT_SUSPENSE_LIST_TYPE = symbolFor("react.suspense_list");
  REACT_MEMO_TYPE = symbolFor("react.memo");
  REACT_LAZY_TYPE = symbolFor("react.lazy");
  REACT_BLOCK_TYPE = symbolFor("react.block");
  REACT_SERVER_BLOCK_TYPE = symbolFor("react.server.block");
  REACT_FUNDAMENTAL_TYPE = symbolFor("react.fundamental");
  REACT_RESPONDER_TYPE = symbolFor("react.responder");
  REACT_SCOPE_TYPE = symbolFor("react.scope");
}

var PENDING = 0;
var RESOLVED = 1;
var ERRORED = 2;

function Chunk(status, value) {
  this._status = status;
  this._value = value;
}

Chunk.prototype.then = function(resolve) {
  var chunk = this;

  if (chunk._status === PENDING) {
    if (chunk._value === null) {
      chunk._value = [];
    }

    chunk._value.push(resolve);
  } else {
    resolve();
  }
};

function readRoot() {
  var response = this;
  var rootChunk = response.rootChunk;

  if (rootChunk._status === RESOLVED) {
    return rootChunk._value;
  } else if (rootChunk._status === PENDING) {
    // eslint-disable-next-line no-throw-literal
    throw rootChunk;
  } else {
    throw rootChunk._value;
  }
}

function createResponse() {
  var rootChunk = createPendingChunk();
  var chunks = new Map();
  chunks.set(0, rootChunk);
  var response = {
    partialRow: "",
    rootChunk: rootChunk,
    chunks: chunks,
    readRoot: readRoot
  };
  return response;
}

function createPendingChunk() {
  return new Chunk(PENDING, null);
}

function createErrorChunk(error) {
  return new Chunk(ERRORED, error);
}

function wakeChunk(listeners) {
  if (listeners !== null) {
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }
  }
}

function triggerErrorOnChunk(chunk, error) {
  if (chunk._status !== PENDING) {
    // We already resolved. We didn't expect to see this.
    return;
  }

  var listeners = chunk._value;
  var erroredChunk = chunk;
  erroredChunk._status = ERRORED;
  erroredChunk._value = error;
  wakeChunk(listeners);
}

function createResolvedChunk(value) {
  return new Chunk(RESOLVED, value);
}

function resolveChunk(chunk, value) {
  if (chunk._status !== PENDING) {
    // We already resolved. We didn't expect to see this.
    return;
  }

  var listeners = chunk._value;
  var resolvedChunk = chunk;
  resolvedChunk._status = RESOLVED;
  resolvedChunk._value = value;
  wakeChunk(listeners);
} // Report that any missing chunks in the model is now going to throw this
// error upon read. Also notify any pending promises.

function reportGlobalError(response, error) {
  response.chunks.forEach(function(chunk) {
    // If this chunk was already resolved or errored, it won't
    // trigger an error but if it wasn't then we need to
    // because we won't be getting any new data to resolve it.
    triggerErrorOnChunk(chunk, error);
  });
}

function readMaybeChunk(maybeChunk) {
  if (maybeChunk == null || !(maybeChunk instanceof Chunk)) {
    // $FlowFixMe
    return maybeChunk;
  }

  var chunk = maybeChunk;

  if (chunk._status === RESOLVED) {
    return chunk._value;
  } else if (chunk._status === PENDING) {
    // eslint-disable-next-line no-throw-literal
    throw chunk;
  } else {
    throw chunk._value;
  }
}

function createElement(type, key, props) {
  var element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,
    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: null,
    props: props,
    // Record the component responsible for creating this element.
    _owner: null
  };

  {
    // We don't really need to add any of these but keeping them for good measure.
    // Unfortunately, _store is enumerable in jest matchers so for equality to
    // work, I need to keep it or make _store non-enumerable in the other file.
    element._store = {};
    Object.defineProperty(element._store, "validated", {
      configurable: false,
      enumerable: false,
      writable: true,
      value: true // This element has already been validated on the server.
    });
    Object.defineProperty(element, "_self", {
      configurable: false,
      enumerable: false,
      writable: false,
      value: null
    });
    Object.defineProperty(element, "_source", {
      configurable: false,
      enumerable: false,
      writable: false,
      value: null
    });
  }

  return element;
}

function initializeBlock(tuple) {
  // Require module first and then data. The ordering matters.
  var moduleMetaData = readMaybeChunk(tuple[1]);
  var moduleReference = ReactFlightDOMRelayClientIntegration.resolveModuleReference(
    moduleMetaData
  ); // TODO: Do this earlier, as the chunk is resolved.

  ReactFlightDOMRelayClientIntegration.preloadModule(moduleReference);
  var moduleExport = ReactFlightDOMRelayClientIntegration.requireModule(
    moduleReference
  ); // The ordering here is important because this call might suspend.
  // We don't want that to prevent the module graph for being initialized.

  var data = readMaybeChunk(tuple[2]);
  return {
    $$typeof: REACT_BLOCK_TYPE,
    _status: -1,
    _data: data,
    _render: moduleExport
  };
}

function createLazyBlock(tuple) {
  var lazyType = {
    $$typeof: REACT_LAZY_TYPE,
    _payload: tuple,
    _init: initializeBlock
  };
  return lazyType;
}

function parseModelFromJSON(response, targetObj, key, value) {
  if (typeof value === "string") {
    if (value[0] === "$") {
      if (value === "$") {
        return REACT_ELEMENT_TYPE;
      } else if (value[1] === "$" || value[1] === "@") {
        // This was an escaped string value.
        return value.substring(1);
      } else {
        var id = parseInt(value.substring(1), 16);
        var chunks = response.chunks;
        var chunk = chunks.get(id);

        if (!chunk) {
          chunk = createPendingChunk();
          chunks.set(id, chunk);
        }

        return chunk;
      }
    }

    if (value === "@") {
      return REACT_BLOCK_TYPE;
    }
  }

  if (typeof value === "object" && value !== null) {
    var tuple = value;

    switch (tuple[0]) {
      case REACT_ELEMENT_TYPE: {
        // TODO: Consider having React just directly accept these arrays as elements.
        // Or even change the ReactElement type to be an array.
        return createElement(tuple[1], tuple[2], tuple[3]);
      }

      case REACT_BLOCK_TYPE: {
        // TODO: Consider having React just directly accept these arrays as blocks.
        return createLazyBlock(tuple);
      }
    }
  }

  return value;
}
function resolveModelChunk(response, id, model) {
  var chunks = response.chunks;
  var chunk = chunks.get(id);

  if (!chunk) {
    chunks.set(id, createResolvedChunk(model));
  } else {
    resolveChunk(chunk, model);
  }
}
function resolveErrorChunk(response, id, message, stack) {
  var error = new Error(message);
  error.stack = stack;
  var chunks = response.chunks;
  var chunk = chunks.get(id);

  if (!chunk) {
    chunks.set(id, createErrorChunk(error));
  } else {
    triggerErrorOnChunk(chunk, error);
  }
}
function close(response) {
  // In case there are any remaining unresolved chunks, they won't
  // be resolved now. So we need to issue an error to those.
  // Ideally we should be able to early bail out if we kept a
  // ref count of pending chunks.
  reportGlobalError(response, new Error("Connection closed."));
}

function parseModel(response, targetObj, key, value) {
  if (typeof value === "object" && value !== null) {
    if (Array.isArray(value)) {
      for (var i = 0; i < value.length; i++) {
        value[i] = parseModel(response, value, "" + i, value[i]);
      }
    } else {
      for (var innerKey in value) {
        value[innerKey] = parseModel(
          response,
          value,
          innerKey,
          value[innerKey]
        );
      }
    }
  }

  return parseModelFromJSON(response, targetObj, key, value);
}
function resolveModel(response, id, json) {
  resolveModelChunk(response, id, parseModel(response, {}, "", json));
}
function resolveError(response, id, message, stack) {
  resolveErrorChunk(response, id, message, stack);
}

exports.close = close;
exports.createResponse = createResponse;
exports.resolveError = resolveError;
exports.resolveModel = resolveModel;

  })();
}
