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

"use strict";
var ReactFlightDOMRelayClientIntegration = require("ReactFlightDOMRelayClientIntegration"),
  hasSymbol = "function" === typeof Symbol && Symbol.for,
  REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103,
  REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116,
  REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121;
function Chunk(status, value) {
  this._status = status;
  this._value = value;
}
Chunk.prototype.then = function(resolve) {
  0 === this._status
    ? (null === this._value && (this._value = []), this._value.push(resolve))
    : resolve();
};
function readRoot() {
  var rootChunk = this.rootChunk;
  if (1 === rootChunk._status) return rootChunk._value;
  if (0 === rootChunk._status) throw rootChunk;
  throw rootChunk._value;
}
function wakeChunk(listeners) {
  if (null !== listeners)
    for (var i = 0; i < listeners.length; i++) (0, listeners[i])();
}
function triggerErrorOnChunk(chunk, error) {
  if (0 === chunk._status) {
    var listeners = chunk._value;
    chunk._status = 2;
    chunk._value = error;
    wakeChunk(listeners);
  }
}
function reportGlobalError(response, error) {
  response.chunks.forEach(function(chunk) {
    triggerErrorOnChunk(chunk, error);
  });
}
function readMaybeChunk(maybeChunk) {
  if (null == maybeChunk || !(maybeChunk instanceof Chunk)) return maybeChunk;
  if (1 === maybeChunk._status) return maybeChunk._value;
  if (0 === maybeChunk._status) throw maybeChunk;
  throw maybeChunk._value;
}
function initializeBlock(tuple) {
  var moduleMetaData = readMaybeChunk(tuple[1]);
  moduleMetaData = ReactFlightDOMRelayClientIntegration.resolveModuleReference(
    moduleMetaData
  );
  ReactFlightDOMRelayClientIntegration.preloadModule(moduleMetaData);
  moduleMetaData = ReactFlightDOMRelayClientIntegration.requireModule(
    moduleMetaData
  );
  tuple = readMaybeChunk(tuple[2]);
  return {
    $$typeof: REACT_BLOCK_TYPE,
    _status: -1,
    _data: tuple,
    _render: moduleMetaData
  };
}
function parseModelFromJSON(response, targetObj, key, value) {
  if ("string" === typeof value) {
    if ("$" === value[0]) {
      if ("$" === value) return REACT_ELEMENT_TYPE;
      if ("$" === value[1] || "@" === value[1]) return value.substring(1);
      targetObj = parseInt(value.substring(1), 16);
      response = response.chunks;
      key = response.get(targetObj);
      key || ((key = new Chunk(0, null)), response.set(targetObj, key));
      return key;
    }
    if ("@" === value) return REACT_BLOCK_TYPE;
  }
  if ("object" === typeof value && null !== value)
    switch (value[0]) {
      case REACT_ELEMENT_TYPE:
        return {
          $$typeof: REACT_ELEMENT_TYPE,
          type: value[1],
          key: value[2],
          ref: null,
          props: value[3],
          _owner: null
        };
      case REACT_BLOCK_TYPE:
        return {
          $$typeof: REACT_LAZY_TYPE,
          _payload: value,
          _init: initializeBlock
        };
    }
  return value;
}
function parseModel(response, targetObj, key, value) {
  if ("object" === typeof value && null !== value)
    if (Array.isArray(value))
      for (var i = 0; i < value.length; i++)
        value[i] = parseModel(response, value, "" + i, value[i]);
    else for (i in value) value[i] = parseModel(response, value, i, value[i]);
  return parseModelFromJSON(response, targetObj, key, value);
}
exports.close = function(response) {
  reportGlobalError(response, Error("Connection closed."));
};
exports.createResponse = function() {
  var rootChunk = new Chunk(0, null),
    chunks = new Map();
  chunks.set(0, rootChunk);
  return {
    partialRow: "",
    rootChunk: rootChunk,
    chunks: chunks,
    readRoot: readRoot
  };
};
exports.resolveError = function(response, id, message, stack) {
  message = Error(message);
  message.stack = stack;
  response = response.chunks;
  (stack = response.get(id))
    ? triggerErrorOnChunk(stack, message)
    : response.set(id, new Chunk(2, message));
};
exports.resolveModel = function(response, id, json) {
  json = parseModel(response, {}, "", json);
  var chunks = response.chunks;
  (response = chunks.get(id))
    ? 0 === response._status &&
      ((id = response._value),
      (response._status = 1),
      (response._value = json),
      wakeChunk(id))
    : chunks.set(id, new Chunk(1, json));
};
