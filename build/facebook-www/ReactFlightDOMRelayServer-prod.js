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
var ReactFlightDOMRelayServerIntegration = require("ReactFlightDOMRelayServerIntegration");
function formatProdErrorMessage(code) {
  for (
    var url = "https://reactjs.org/docs/error-decoder.html?invariant=" + code,
      i = 1;
    i < arguments.length;
    i++
  )
    url += "&args[]=" + encodeURIComponent(arguments[i]);
  return (
    "Minified React error #" +
    code +
    "; visit " +
    url +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
function convertModelToJSON(request, parent, key, model) {
  parent = resolveModelToJSON(request, parent, key, model);
  if ("object" === typeof parent && null !== parent) {
    if (Array.isArray(parent)) {
      var jsonArray = [];
      for (key = 0; key < parent.length; key++)
        jsonArray[key] = convertModelToJSON(
          request,
          parent,
          "" + key,
          parent[key]
        );
      return jsonArray;
    }
    key = {};
    for (jsonArray in parent)
      key[jsonArray] = convertModelToJSON(
        request,
        parent,
        jsonArray,
        parent[jsonArray]
      );
    return key;
  }
  return parent;
}
function processModelChunk(request, id, model) {
  request = convertModelToJSON(request, {}, "", model);
  return { type: "json", id: id, json: request };
}
function writeChunk(destination, chunk) {
  "json" === chunk.type
    ? ReactFlightDOMRelayServerIntegration.emitModel(
        destination,
        chunk.id,
        chunk.json
      )
    : ReactFlightDOMRelayServerIntegration.emitError(
        destination,
        chunk.id,
        chunk.json.message,
        chunk.json.stack
      );
  return !0;
}
var REACT_ELEMENT_TYPE = 60103,
  REACT_FRAGMENT_TYPE = 60107,
  REACT_LAZY_TYPE = 60116,
  REACT_BLOCK_TYPE = 60121,
  REACT_SERVER_BLOCK_TYPE = 60122;
if ("function" === typeof Symbol && Symbol.for) {
  var symbolFor = Symbol.for;
  REACT_ELEMENT_TYPE = symbolFor("react.element");
  REACT_FRAGMENT_TYPE = symbolFor("react.fragment");
  REACT_LAZY_TYPE = symbolFor("react.lazy");
  REACT_BLOCK_TYPE = symbolFor("react.block");
  REACT_SERVER_BLOCK_TYPE = symbolFor("react.server.block");
}
function createRequest(model, destination, bundlerConfig) {
  var pingedSegments = [],
    request = {
      destination: destination,
      bundlerConfig: bundlerConfig,
      nextChunkId: 0,
      pendingChunks: 0,
      pingedSegments: pingedSegments,
      completedJSONChunks: [],
      completedErrorChunks: [],
      flowing: !1,
      toJSON: function(key, value) {
        return resolveModelToJSON(request, this, key, value);
      }
    };
  request.pendingChunks++;
  destination = createSegment(request, function() {
    return model;
  });
  pingedSegments.push(destination);
  return request;
}
function attemptResolveElement(element) {
  var type = element.type,
    props = element.props;
  if ("function" === typeof type) return type(props);
  if ("string" === typeof type || type[0] === REACT_SERVER_BLOCK_TYPE)
    return [REACT_ELEMENT_TYPE, type, element.key, element.props];
  if (type === REACT_FRAGMENT_TYPE) return element.props.children;
  throw Error(formatProdErrorMessage(351));
}
function createSegment(request, query) {
  var segment = {
    id: request.nextChunkId++,
    query: query,
    ping: function() {
      var pingedSegments = request.pingedSegments;
      pingedSegments.push(segment);
      1 === pingedSegments.length && performWork(request);
    }
  };
  return segment;
}
function resolveModelToJSON(request, parent, key, value) {
  switch (value) {
    case REACT_ELEMENT_TYPE:
      return "$";
    case REACT_SERVER_BLOCK_TYPE:
      return "@";
    case REACT_LAZY_TYPE:
    case REACT_BLOCK_TYPE:
      throw Error(formatProdErrorMessage(352));
  }
  if (parent[0] === REACT_SERVER_BLOCK_TYPE)
    switch (key) {
      case "1":
        try {
          return ReactFlightDOMRelayServerIntegration.resolveModuleMetaData(
            request.bundlerConfig,
            value
          );
        } catch (x) {
          return (
            request.pendingChunks++,
            (parent = request.nextChunkId++),
            emitErrorChunk(request, parent, x),
            "$" + parent.toString(16)
          );
        }
      case "2":
        parent = value;
        try {
          return parent();
        } catch (x$1) {
          if (
            "object" === typeof x$1 &&
            null !== x$1 &&
            "function" === typeof x$1.then
          )
            return (
              request.pendingChunks++,
              (request = createSegment(request, parent)),
              (parent = request.ping),
              x$1.then(parent, parent),
              "$" + request.id.toString(16)
            );
          request.pendingChunks++;
          parent = request.nextChunkId++;
          emitErrorChunk(request, parent, x$1);
          return "$" + parent.toString(16);
        }
      default:
        throw Error(formatProdErrorMessage(353));
    }
  if ("string" === typeof value)
    return (
      (request = "$" === value[0] || "@" === value[0] ? "$" + value : value),
      request
    );
  for (
    ;
    "object" === typeof value &&
    null !== value &&
    value.$$typeof === REACT_ELEMENT_TYPE;

  ) {
    parent = value;
    try {
      value = attemptResolveElement(parent);
    } catch (x$4) {
      if (
        "object" === typeof x$4 &&
        null !== x$4 &&
        "function" === typeof x$4.then
      )
        return (
          request.pendingChunks++,
          (request = createSegment(request, function() {
            return value;
          })),
          (parent = request.ping),
          x$4.then(parent, parent),
          "$" + request.id.toString(16)
        );
      throw x$4;
    }
  }
  return value;
}
function emitErrorChunk(request, id, error) {
  var stack = "";
  try {
    if (error instanceof Error) {
      var message = "" + error.message;
      stack = "" + error.stack;
    } else message = "Error: " + error;
  } catch (x) {
    message = "An error occurred but serializing the error message failed.";
  }
  request.completedErrorChunks.push({
    type: "error",
    id: id,
    json: { message: message, stack: stack }
  });
}
function retrySegment(request, segment) {
  var query = segment.query,
    value;
  try {
    for (
      value = query();
      "object" === typeof value &&
      null !== value &&
      value.$$typeof === REACT_ELEMENT_TYPE;

    )
      (query = value),
        (segment.query = function() {
          return value;
        }),
        (value = attemptResolveElement(query));
    var processedChunk = processModelChunk(request, segment.id, value);
    request.completedJSONChunks.push(processedChunk);
  } catch (x) {
    "object" === typeof x && null !== x && "function" === typeof x.then
      ? ((request = segment.ping), x.then(request, request))
      : emitErrorChunk(request, segment.id, x);
  }
}
function performWork(request) {
  var pingedSegments = request.pingedSegments;
  request.pingedSegments = [];
  for (var i = 0; i < pingedSegments.length; i++)
    retrySegment(request, pingedSegments[i]);
  if (request.flowing && !reentrant) {
    reentrant = !0;
    pingedSegments = request.destination;
    try {
      var jsonChunks = request.completedJSONChunks;
      for (i = 0; i < jsonChunks.length; i++)
        if (
          (request.pendingChunks--, !writeChunk(pingedSegments, jsonChunks[i]))
        ) {
          request.flowing = !1;
          i++;
          break;
        }
      jsonChunks.splice(0, i);
      var errorChunks = request.completedErrorChunks;
      for (i = 0; i < errorChunks.length; i++)
        if (
          (request.pendingChunks--, !writeChunk(pingedSegments, errorChunks[i]))
        ) {
          request.flowing = !1;
          i++;
          break;
        }
      errorChunks.splice(0, i);
    } finally {
      reentrant = !1;
    }
    0 === request.pendingChunks &&
      ReactFlightDOMRelayServerIntegration.close(pingedSegments);
  }
}
var reentrant = !1;
exports.render = function(model, destination, config) {
  model = createRequest(model, destination, config);
  model.flowing = !0;
  performWork(model);
};
