/** @license React vundefined
 * react-flight-dom-webpack-server.browser.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.ReactFlightDOMServer = {}));
}(this, (function (exports) { 'use strict';

  function scheduleWork(callback) {
    callback();
  }
  function writeChunk(destination, buffer) {
    destination.enqueue(buffer);
    return destination.desiredSize > 0;
  }
  function close(destination) {
    destination.close();
  }
  var textEncoder = new TextEncoder();
  function convertStringToBuffer(content) {
    return textEncoder.encode(content);
  }

  // This file is an intermediate layer to translate between Flight
  var stringify = JSON.stringify;

  function serializeRowHeader(tag, id) {
    return tag + id.toString(16) + ':';
  }

  function processErrorChunk(request, id, message, stack) {
    var errorInfo = {
      message: message,
      stack: stack
    };
    var row = serializeRowHeader('E', id) + stringify(errorInfo) + '\n';
    return convertStringToBuffer(row);
  }
  function processModelChunk(request, id, model) {
    var json = stringify(model, request.toJSON);
    var row;

    if (id === 0) {
      row = json + '\n';
    } else {
      row = serializeRowHeader('J', id) + json + '\n';
    }

    return convertStringToBuffer(row);
  }

  // eslint-disable-next-line no-unused-vars
  function resolveModuleMetaData(config, modulePath) {
    return config[modulePath];
  }

  // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
  // nor polyfill, then a plain number is used for performance.
  var hasSymbol = typeof Symbol === 'function' && Symbol.for;
  var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
  var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
  var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
  var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
  var REACT_SERVER_BLOCK_TYPE = hasSymbol ? Symbol.for('react.server.block') : 0xeada;

  function createRequest(model, destination, bundlerConfig) {
    var pingedSegments = [];
    var request = {
      destination: destination,
      bundlerConfig: bundlerConfig,
      nextChunkId: 0,
      pendingChunks: 0,
      pingedSegments: pingedSegments,
      completedJSONChunks: [],
      completedErrorChunks: [],
      flowing: false,
      toJSON: function (key, value) {
        return resolveModelToJSON(request, this, key, value);
      }
    };
    request.pendingChunks++;
    var rootSegment = createSegment(request, function () {
      return model;
    });
    pingedSegments.push(rootSegment);
    return request;
  }

  function attemptResolveElement(element) {
    var type = element.type;
    var props = element.props;

    if (typeof type === 'function') {
      // This is a server-side component.
      return type(props);
    } else if (typeof type === 'string') {
      // This is a host element. E.g. HTML.
      return [REACT_ELEMENT_TYPE, type, element.key, element.props];
    } else if (type[0] === REACT_SERVER_BLOCK_TYPE) {
      return [REACT_ELEMENT_TYPE, type, element.key, element.props];
    } else if (type === REACT_FRAGMENT_TYPE) {
      return element.props.children;
    } else {
      {
        {
          throw Error( "Unsupported type." );
        }
      }
    }
  }

  function pingSegment(request, segment) {
    var pingedSegments = request.pingedSegments;
    pingedSegments.push(segment);

    if (pingedSegments.length === 1) {
      scheduleWork(function () {
        return performWork(request);
      });
    }
  }

  function createSegment(request, query) {
    var id = request.nextChunkId++;
    var segment = {
      id: id,
      query: query,
      ping: function () {
        return pingSegment(request, segment);
      }
    };
    return segment;
  }

  function serializeIDRef(id) {
    return '$' + id.toString(16);
  }

  function escapeStringValue(value) {
    if (value[0] === '$' || value[0] === '@') {
      // We need to escape $ or @ prefixed strings since we use those to encode
      // references to IDs and as special symbol values.
      return '$' + value;
    } else {
      return value;
    }
  }

  function resolveModelToJSON(request, parent, key, value) {
    // Special Symbols
    switch (value) {
      case REACT_ELEMENT_TYPE:
        return '$';

      case REACT_SERVER_BLOCK_TYPE:
        return '@';

      case REACT_LAZY_TYPE:
      case REACT_BLOCK_TYPE:
        {
          {
            throw Error( "React Blocks (and Lazy Components) are expected to be replaced by a compiler on the server. Try configuring your compiler set up and avoid using React.lazy inside of Blocks." );
          }
        }

    }

    if (parent[0] === REACT_SERVER_BLOCK_TYPE) {
      // We're currently encoding part of a Block. Look up which key.
      switch (key) {
        case '1':
          {
            // Module reference
            var moduleReference = value;

            try {
              var moduleMetaData = resolveModuleMetaData(request.bundlerConfig, moduleReference);
              return moduleMetaData;
            } catch (x) {
              request.pendingChunks++;
              var errorId = request.nextChunkId++;
              emitErrorChunk(request, errorId, x);
              return serializeIDRef(errorId);
            }
          }

        case '2':
          {
            // Load function
            var load = value;

            try {
              // Attempt to resolve the data.
              return load();
            } catch (x) {
              if (typeof x === 'object' && x !== null && typeof x.then === 'function') {
                // Something suspended, we'll need to create a new segment and resolve it later.
                request.pendingChunks++;
                var newSegment = createSegment(request, load);
                var ping = newSegment.ping;
                x.then(ping, ping);
                return serializeIDRef(newSegment.id);
              } else {
                // This load failed, encode the error as a separate row and reference that.
                request.pendingChunks++;

                var _errorId = request.nextChunkId++;

                emitErrorChunk(request, _errorId, x);
                return serializeIDRef(_errorId);
              }
            }
          }

        default:
          {
            {
              {
                throw Error( "A server block should never encode any other slots. This is a bug in React." );
              }
            }
          }
      }
    }

    if (typeof value === 'string') {
      return escapeStringValue(value);
    } // Resolve server components.


    while (typeof value === 'object' && value !== null && value.$$typeof === REACT_ELEMENT_TYPE) {
      // TODO: Concatenate keys of parents onto children.
      // TODO: Allow elements to suspend independently and serialize as references to future elements.
      var element = value;
      value = attemptResolveElement(element);
    }

    return value;
  }

  function emitErrorChunk(request, id, error) {
    // TODO: We should not leak error messages to the client in prod.
    // Give this an error code instead and log on the server.
    // We can serialize the error in DEV as a convenience.
    var message;
    var stack = '';

    try {
      if (error instanceof Error) {
        message = '' + error.message;
        stack = '' + error.stack;
      } else {
        message = 'Error: ' + error;
      }
    } catch (x) {
      message = 'An error occurred but serializing the error message failed.';
    }

    var processedChunk = processErrorChunk(request, id, message, stack);
    request.completedErrorChunks.push(processedChunk);
  }

  function retrySegment(request, segment) {
    var query = segment.query;

    try {
      var _value = query();

      var processedChunk = processModelChunk(request, segment.id, _value);
      request.completedJSONChunks.push(processedChunk);
    } catch (x) {
      if (typeof x === 'object' && x !== null && typeof x.then === 'function') {
        // Something suspended again, let's pick it back up later.
        var ping = segment.ping;
        x.then(ping, ping);
        return;
      } else {
        // This errored, we need to serialize this error to the
        emitErrorChunk(request, segment.id, x);
      }
    }
  }

  function performWork(request) {
    var pingedSegments = request.pingedSegments;
    request.pingedSegments = [];

    for (var i = 0; i < pingedSegments.length; i++) {
      var segment = pingedSegments[i];
      retrySegment(request, segment);
    }

    if (request.flowing) {
      flushCompletedChunks(request);
    }
  }

  var reentrant = false;

  function flushCompletedChunks(request) {
    if (reentrant) {
      return;
    }

    reentrant = true;
    var destination = request.destination;

    try {
      var jsonChunks = request.completedJSONChunks;
      var i = 0;

      for (; i < jsonChunks.length; i++) {
        request.pendingChunks--;
        var chunk = jsonChunks[i];

        if (!writeChunk(destination, chunk)) {
          request.flowing = false;
          i++;
          break;
        }
      }

      jsonChunks.splice(0, i);
      var errorChunks = request.completedErrorChunks;
      i = 0;

      for (; i < errorChunks.length; i++) {
        request.pendingChunks--;
        var _chunk = errorChunks[i];

        if (!writeChunk(destination, _chunk)) {
          request.flowing = false;
          i++;
          break;
        }
      }

      errorChunks.splice(0, i);
    } finally {
      reentrant = false;
    }

    if (request.pendingChunks === 0) {
      // We're done.
      close(destination);
    }
  }

  function startWork(request) {
    request.flowing = true;
    scheduleWork(function () {
      return performWork(request);
    });
  }
  function startFlowing(request) {
    request.flowing = true;
    flushCompletedChunks(request);
  }

  function renderToReadableStream(model, webpackMap) {
    var request;
    return new ReadableStream({
      start: function (controller) {
        request = createRequest(model, controller, webpackMap);
        startWork(request);
      },
      pull: function (controller) {
        startFlowing(request);
      },
      cancel: function (reason) {}
    });
  }

  exports.renderToReadableStream = renderToReadableStream;

})));
