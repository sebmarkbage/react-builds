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

  )
    if (
      ((request = value),
      (parent = request.type),
      (key = request.props),
      "function" === typeof parent)
    )
      value = parent(key);
    else if (
      "string" === typeof parent ||
      parent[0] === REACT_SERVER_BLOCK_TYPE
    )
      value = [REACT_ELEMENT_TYPE, parent, request.key, request.props];
    else if (parent === REACT_FRAGMENT_TYPE) value = request.props.children;
    else throw Error(formatProdErrorMessage(351));
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
function performWork(request$jscomp$0) {
  var pingedSegments = request$jscomp$0.pingedSegments;
  request$jscomp$0.pingedSegments = [];
  for (var i = 0; i < pingedSegments.length; i++) {
    var request = request$jscomp$0,
      segment = pingedSegments[i],
      query = segment.query;
    try {
      var value = query(),
        id = segment.id,
        json = convertModelToJSON(request, {}, "", value);
      request.completedJSONChunks.push({ type: "json", id: id, json: json });
    } catch (x) {
      "object" === typeof x && null !== x && "function" === typeof x.then
        ? ((request = segment.ping), x.then(request, request))
        : emitErrorChunk(request, segment.id, x);
    }
  }
  if (request$jscomp$0.flowing && !reentrant) {
    reentrant = !0;
    pingedSegments = request$jscomp$0.destination;
    try {
      var jsonChunks = request$jscomp$0.completedJSONChunks;
      for (i = 0; i < jsonChunks.length; i++)
        if (
          (request$jscomp$0.pendingChunks--,
          !writeChunk(pingedSegments, jsonChunks[i]))
        ) {
          request$jscomp$0.flowing = !1;
          i++;
          break;
        }
      jsonChunks.splice(0, i);
      var errorChunks = request$jscomp$0.completedErrorChunks;
      for (i = 0; i < errorChunks.length; i++)
        if (
          (request$jscomp$0.pendingChunks--,
          !writeChunk(pingedSegments, errorChunks[i]))
        ) {
          request$jscomp$0.flowing = !1;
          i++;
          break;
        }
      errorChunks.splice(0, i);
    } finally {
      reentrant = !1;
    }
    0 === request$jscomp$0.pendingChunks &&
      ReactFlightDOMRelayServerIntegration.close(pingedSegments);
  }
}
var reentrant = !1;
exports.render = function(model, destination, config) {
  model = createRequest(model, destination, config);
  model.flowing = !0;
  performWork(model);
};
