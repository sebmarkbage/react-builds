/** @license React vundefined
 * react-flight-dom-webpack.development.js
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
  (global = global || self, factory(global.ReactFlightDOMClient = {}));
}(this, (function (exports) { 'use strict';

  function createStringDecoder() {
    return new TextDecoder();
  }
  var decoderOptions = {
    stream: true
  };
  function readPartialStringChunk(decoder, buffer) {
    return decoder.decode(buffer, decoderOptions);
  }
  function readFinalStringChunk(decoder, buffer) {
    return decoder.decode(buffer);
  }

  // eslint-disable-next-line no-unused-vars
  function resolveModuleReference(moduleData) {
    return moduleData;
  } // The chunk cache contains all the chunks we've preloaded so far.
  // If they're still pending they're a thenable. This map also exists
  // in Webpack but unfortunately it's not exposed so we have to
  // replicate it in user space. null means that it has already loaded.

  var chunkCache = new Map(); // Start preloading the modules since we might need them soon.
  // This function doesn't suspend.

  function preloadModule(moduleData) {
    var chunks = moduleData.chunks;

    for (var i = 0; i < chunks.length; i++) {
      var chunkId = chunks[i];
      var entry = chunkCache.get(chunkId);

      if (entry === undefined) {
        var thenable = __webpack_chunk_load__(chunkId);

        var resolve = chunkCache.set.bind(chunkCache, chunkId, null);
        var reject = chunkCache.set.bind(chunkCache, chunkId);
        thenable.then(resolve, reject);
        chunkCache.set(chunkId, thenable);
      }
    }
  } // Actually require the module or suspend if it's not yet ready.
  // Increase priority if necessary.

  function requireModule(moduleData) {
    var chunks = moduleData.chunks;

    for (var i = 0; i < chunks.length; i++) {
      var chunkId = chunks[i];
      var entry = chunkCache.get(chunkId);

      if (entry !== null) {
        // We assume that preloadModule has been called before.
        // So we don't expect to see entry being undefined here, that's an error.
        // Let's throw either an error or the Promise.
        throw entry;
      }
    }

    return __webpack_require__(moduleData.id)[moduleData.name];
  }

  // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
  // nor polyfill, then a plain number is used for performance.
  var hasSymbol = typeof Symbol === 'function' && Symbol.for;
  var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
  var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
  var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;

  var PENDING = 0;
  var RESOLVED = 1;
  var ERRORED = 2;

  function Chunk(status, value) {
    this._status = status;
    this._value = value;
  }

  Chunk.prototype.then = function (resolve) {
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
      partialRow: '',
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
    response.chunks.forEach(function (chunk) {
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
      Object.defineProperty(element._store, 'validated', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: true // This element has already been validated on the server.

      });
      Object.defineProperty(element, '_self', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: null
      });
      Object.defineProperty(element, '_source', {
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
    var moduleReference = resolveModuleReference(moduleMetaData); // TODO: Do this earlier, as the chunk is resolved.

    preloadModule(moduleReference);
    var moduleExport = requireModule(moduleReference); // The ordering here is important because this call might suspend.
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
    if (typeof value === 'string') {
      if (value[0] === '$') {
        if (value === '$') {
          return REACT_ELEMENT_TYPE;
        } else if (value[1] === '$' || value[1] === '@') {
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

      if (value === '@') {
        return REACT_BLOCK_TYPE;
      }
    }

    if (typeof value === 'object' && value !== null) {
      var tuple = value;

      switch (tuple[0]) {
        case REACT_ELEMENT_TYPE:
          {
            // TODO: Consider having React just directly accept these arrays as elements.
            // Or even change the ReactElement type to be an array.
            return createElement(tuple[1], tuple[2], tuple[3]);
          }

        case REACT_BLOCK_TYPE:
          {
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
    reportGlobalError(response, new Error('Connection closed.'));
  }

  function createResponse$1() {
    var response = createResponse();

    response.fromJSON = function (key, value) {
      return parseModelFromJSON(response, this, key, value);
    };

    {
      response.stringDecoder = createStringDecoder();
    }

    return response;
  }

  function processFullRow(response, row) {
    if (row === '') {
      return;
    }

    var tag = row[0];

    switch (tag) {
      case 'J':
        {
          var colon = row.indexOf(':', 1);
          var id = parseInt(row.substring(1, colon), 16);
          var json = row.substring(colon + 1);
          var model = JSON.parse(json, response.fromJSON);
          resolveModelChunk(response, id, model);
          return;
        }

      case 'E':
        {
          var _colon = row.indexOf(':', 1);

          var _id = parseInt(row.substring(1, _colon), 16);

          var _json = row.substring(_colon + 1);

          var errorInfo = JSON.parse(_json);
          resolveErrorChunk(response, _id, errorInfo.message, errorInfo.stack);
          return;
        }

      default:
        {
          // Assume this is the root model.
          var _model = JSON.parse(row, response.fromJSON);

          resolveModelChunk(response, 0, _model);
          return;
        }
    }
  }

  function processStringChunk(response, chunk, offset) {
    var linebreak = chunk.indexOf('\n', offset);

    while (linebreak > -1) {
      var fullrow = response.partialRow + chunk.substring(offset, linebreak);
      processFullRow(response, fullrow);
      response.partialRow = '';
      offset = linebreak + 1;
      linebreak = chunk.indexOf('\n', offset);
    }

    response.partialRow += chunk.substring(offset);
  }
  function processBinaryChunk(response, chunk) {

    var stringDecoder = response.stringDecoder;
    var linebreak = chunk.indexOf(10); // newline

    while (linebreak > -1) {
      var fullrow = response.partialRow + readFinalStringChunk(stringDecoder, chunk.subarray(0, linebreak));
      processFullRow(response, fullrow);
      response.partialRow = '';
      chunk = chunk.subarray(linebreak + 1);
      linebreak = chunk.indexOf(10); // newline
    }

    response.partialRow += readPartialStringChunk(stringDecoder, chunk);
  }

  function startReadingFromStream(response, stream) {
    var reader = stream.getReader();

    function progress(_ref) {
      var done = _ref.done,
          value = _ref.value;

      if (done) {
        close(response);
        return;
      }

      var buffer = value;
      processBinaryChunk(response, buffer);
      return reader.read().then(progress, error);
    }

    function error(e) {
      reportGlobalError(response, e);
    }

    reader.read().then(progress, error);
  }

  function createFromReadableStream(stream) {
    var response = createResponse$1();
    startReadingFromStream(response, stream);
    return response;
  }

  function createFromFetch(promiseForResponse) {
    var response = createResponse$1();
    promiseForResponse.then(function (r) {
      startReadingFromStream(response, r.body);
    }, function (e) {
      reportGlobalError(response, e);
    });
    return response;
  }

  function createFromXHR(request) {
    var response = createResponse$1();
    var processedLength = 0;

    function progress(e) {
      var chunk = request.responseText;
      processStringChunk(response, chunk, processedLength);
      processedLength = chunk.length;
    }

    function load(e) {
      progress();
      close(response);
    }

    function error(e) {
      reportGlobalError(response, new TypeError('Network error'));
    }

    request.addEventListener('progress', progress);
    request.addEventListener('load', load);
    request.addEventListener('error', error);
    request.addEventListener('abort', error);
    request.addEventListener('timeout', error);
    return response;
  }

  exports.createFromFetch = createFromFetch;
  exports.createFromReadableStream = createFromReadableStream;
  exports.createFromXHR = createFromXHR;

})));
