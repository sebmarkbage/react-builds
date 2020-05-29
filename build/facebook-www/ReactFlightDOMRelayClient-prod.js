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
var ReactFlightDOMRelayClientIntegration = require("ReactFlightDOMRelayClientIntegration");
function parseModelRecursively(response, parentObj, value) {
  if ("string" === typeof value)
    return (
      "$" === value[0]
        ? "$" === value
          ? (response = REACT_ELEMENT_TYPE)
          : "$" === value[1] || "@" === value[1]
          ? (response = value.substring(1))
          : ((value = parseInt(value.substring(1), 16)),
            (response = getChunk(response, value)),
            (response =
              parentObj[0] === REACT_BLOCK_TYPE
                ? response
                : readChunk(response)))
        : (response = "@" === value ? REACT_BLOCK_TYPE : value),
      response
    );
  if ("object" === typeof value && null !== value) {
    if (Array.isArray(value)) {
      for (parentObj = 0; parentObj < value.length; parentObj++)
        value[parentObj] = parseModelRecursively(
          response,
          value,
          value[parentObj]
        );
      response =
        value[0] === REACT_ELEMENT_TYPE
          ? {
              $$typeof: REACT_ELEMENT_TYPE,
              type: value[1],
              key: value[2],
              ref: null,
              props: value[3],
              _owner: null
            }
          : value[0] === REACT_BLOCK_TYPE
          ? {
              $$typeof: REACT_LAZY_TYPE,
              _payload: value,
              _init: initializeBlock
            }
          : value;
      return response;
    }
    for (var innerKey in value)
      value[innerKey] = parseModelRecursively(response, value, value[innerKey]);
  }
  return value;
}
var dummy = {},
  REACT_ELEMENT_TYPE = 60103,
  REACT_LAZY_TYPE = 60116,
  REACT_BLOCK_TYPE = 60121;
if ("function" === typeof Symbol && Symbol.for) {
  var symbolFor = Symbol.for;
  REACT_ELEMENT_TYPE = symbolFor("react.element");
  REACT_LAZY_TYPE = symbolFor("react.lazy");
  REACT_BLOCK_TYPE = symbolFor("react.block");
}
function Chunk(status, value, response) {
  this._status = status;
  this._value = value;
  this._response = response;
}
Chunk.prototype.then = function(resolve) {
  0 === this._status
    ? (null === this._value && (this._value = []), this._value.push(resolve))
    : resolve();
};
function readChunk(chunk) {
  switch (chunk._status) {
    case 2:
      return chunk._value;
    case 1:
      var value = parseModelRecursively(chunk._response, dummy, chunk._value);
      chunk._status = 2;
      return (chunk._value = value);
    case 0:
      throw chunk;
    default:
      throw chunk._value;
  }
}
function readRoot() {
  var chunk = getChunk(this, 0);
  return readChunk(chunk);
}
function wakeChunk(listeners) {
  if (null !== listeners)
    for (var i = 0; i < listeners.length; i++) (0, listeners[i])();
}
function triggerErrorOnChunk(chunk, error) {
  if (0 === chunk._status) {
    var listeners = chunk._value;
    chunk._status = 3;
    chunk._value = error;
    wakeChunk(listeners);
  }
}
function reportGlobalError(response, error) {
  response._chunks.forEach(function(chunk) {
    triggerErrorOnChunk(chunk, error);
  });
}
function readMaybeChunk(maybeChunk) {
  return null != maybeChunk && maybeChunk instanceof Chunk
    ? readChunk(maybeChunk)
    : maybeChunk;
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
function getChunk(response, id) {
  var chunks = response._chunks,
    chunk = chunks.get(id);
  chunk || ((chunk = new Chunk(0, null, response)), chunks.set(id, chunk));
  return chunk;
}
exports.close = function(response) {
  reportGlobalError(response, Error("Connection closed."));
};
exports.createResponse = function() {
  return { _chunks: new Map(), readRoot: readRoot };
};
exports.resolveError = function(response, id, message, stack) {
  message = Error(message);
  message.stack = stack;
  stack = response._chunks;
  var chunk = stack.get(id);
  chunk
    ? triggerErrorOnChunk(chunk, message)
    : stack.set(id, new Chunk(3, message, response));
};
exports.resolveModel = function(response, id, model) {
  var chunks = response._chunks,
    chunk = chunks.get(id);
  chunk
    ? 0 === chunk._status &&
      ((response = chunk._value),
      (chunk._status = 1),
      (chunk._value = model),
      wakeChunk(response))
    : chunks.set(id, new Chunk(1, model, response));
};
