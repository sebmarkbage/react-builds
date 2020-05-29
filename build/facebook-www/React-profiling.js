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
var assign = require("object-assign"),
  REACT_ELEMENT_TYPE = 60103,
  REACT_PORTAL_TYPE = 60106;
exports.Fragment = 60107;
exports.StrictMode = 60108;
exports.Profiler = 60114;
var REACT_PROVIDER_TYPE = 60109,
  REACT_CONTEXT_TYPE = 60110,
  REACT_FORWARD_REF_TYPE = 60112;
exports.Suspense = 60113;
exports.unstable_SuspenseList = 60120;
var REACT_MEMO_TYPE = 60115,
  REACT_LAZY_TYPE = 60116,
  REACT_BLOCK_TYPE = 60121,
  REACT_RESPONDER_TYPE = 60118,
  REACT_SCOPE_TYPE = 60119;
exports.unstable_DebugTracingMode = 60129;
exports.unstable_LegacyHidden = 60131;
if ("function" === typeof Symbol && Symbol.for) {
  var symbolFor = Symbol.for;
  REACT_ELEMENT_TYPE = symbolFor("react.element");
  REACT_PORTAL_TYPE = symbolFor("react.portal");
  exports.Fragment = symbolFor("react.fragment");
  exports.StrictMode = symbolFor("react.strict_mode");
  exports.Profiler = symbolFor("react.profiler");
  REACT_PROVIDER_TYPE = symbolFor("react.provider");
  REACT_CONTEXT_TYPE = symbolFor("react.context");
  REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref");
  exports.Suspense = symbolFor("react.suspense");
  exports.unstable_SuspenseList = symbolFor("react.suspense_list");
  REACT_MEMO_TYPE = symbolFor("react.memo");
  REACT_LAZY_TYPE = symbolFor("react.lazy");
  REACT_BLOCK_TYPE = symbolFor("react.block");
  REACT_RESPONDER_TYPE = symbolFor("react.responder");
  REACT_SCOPE_TYPE = symbolFor("react.scope");
  exports.unstable_DebugTracingMode = symbolFor("react.debug_trace_mode");
  exports.unstable_LegacyHidden = symbolFor("react.legacy_hidden");
}
var MAYBE_ITERATOR_SYMBOL = "function" === typeof Symbol && Symbol.iterator;
function getIteratorFn(maybeIterable) {
  if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
  maybeIterable =
    (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
    maybeIterable["@@iterator"];
  return "function" === typeof maybeIterable ? maybeIterable : null;
}
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
var ReactNoopUpdateQueue = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {},
    enqueueReplaceState: function() {},
    enqueueSetState: function() {}
  },
  emptyObject = {};
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}
Component.prototype.isReactComponent = {};
Component.prototype.setState = function(partialState, callback) {
  if (
    "object" !== typeof partialState &&
    "function" !== typeof partialState &&
    null != partialState
  )
    throw Error(formatProdErrorMessage(85));
  this.updater.enqueueSetState(this, partialState, callback, "setState");
};
Component.prototype.forceUpdate = function(callback) {
  this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
};
function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype;
function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}
var pureComponentPrototype = (PureComponent.prototype = new ComponentDummy());
pureComponentPrototype.constructor = PureComponent;
Object.assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = !0;
var ReactCurrentOwner = require("ReactCurrentOwner"),
  hasOwnProperty = Object.prototype.hasOwnProperty,
  RESERVED_PROPS = { key: !0, ref: !0, __self: !0, __source: !0 };
function cloneAndReplaceKey(oldElement, newKey) {
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type: oldElement.type,
    key: newKey,
    ref: oldElement.ref,
    props: oldElement.props,
    _owner: oldElement._owner
  };
}
function isValidElement(object) {
  return (
    "object" === typeof object &&
    null !== object &&
    object.$$typeof === REACT_ELEMENT_TYPE
  );
}
function escape(key) {
  var escaperLookup = { "=": "=0", ":": "=2" };
  return (
    "$" +
    key.replace(/[=:]/g, function(match) {
      return escaperLookup[match];
    })
  );
}
var userProvidedKeyEscapeRegex = /\/+/g;
function getElementKey(element, index) {
  return "object" === typeof element && null !== element && null != element.key
    ? escape("" + element.key)
    : index.toString(36);
}
function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
  var type = typeof children;
  if ("undefined" === type || "boolean" === type) children = null;
  var invokeCallback = !1;
  if (null === children) invokeCallback = !0;
  else
    switch (type) {
      case "string":
      case "number":
        invokeCallback = !0;
        break;
      case "object":
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = !0;
        }
    }
  if (invokeCallback)
    return (
      (invokeCallback = children),
      (callback = callback(invokeCallback)),
      (children =
        "" === nameSoFar ? "." + getElementKey(invokeCallback, 0) : nameSoFar),
      Array.isArray(callback)
        ? ((escapedPrefix = ""),
          null != children &&
            (escapedPrefix =
              children.replace(userProvidedKeyEscapeRegex, "$&/") + "/"),
          mapIntoArray(callback, array, escapedPrefix, "", function(c) {
            return c;
          }))
        : null != callback &&
          (isValidElement(callback) &&
            (callback = cloneAndReplaceKey(
              callback,
              escapedPrefix +
                (!callback.key ||
                (invokeCallback && invokeCallback.key === callback.key)
                  ? ""
                  : ("" + callback.key).replace(
                      userProvidedKeyEscapeRegex,
                      "$&/"
                    ) + "/") +
                children
            )),
          array.push(callback)),
      1
    );
  invokeCallback = 0;
  nameSoFar = "" === nameSoFar ? "." : nameSoFar + ":";
  if (Array.isArray(children))
    for (var i = 0; i < children.length; i++) {
      type = children[i];
      var nextName = nameSoFar + getElementKey(type, i);
      invokeCallback += mapIntoArray(
        type,
        array,
        escapedPrefix,
        nextName,
        callback
      );
    }
  else if (
    ((nextName = getIteratorFn(children)), "function" === typeof nextName)
  )
    for (
      children = nextName.call(children), i = 0;
      !(type = children.next()).done;

    )
      (type = type.value),
        (nextName = nameSoFar + getElementKey(type, i++)),
        (invokeCallback += mapIntoArray(
          type,
          array,
          escapedPrefix,
          nextName,
          callback
        ));
  else if ("object" === type)
    throw ((array = "" + children),
    Error(
      formatProdErrorMessage(
        31,
        "[object Object]" === array
          ? "object with keys {" + Object.keys(children).join(", ") + "}"
          : array
      )
    ));
  return invokeCallback;
}
function mapChildren(children, func, context) {
  if (null == children) return children;
  var result = [],
    count = 0;
  mapIntoArray(children, result, "", "", function(child) {
    return func.call(context, child, count++);
  });
  return result;
}
function lazyInitializer(payload) {
  if (-1 === payload._status) {
    var ctor = payload._result;
    ctor = ctor();
    payload._status = 0;
    payload._result = ctor;
    ctor.then(
      function(moduleObject) {
        0 === payload._status &&
          ((moduleObject = moduleObject.default),
          (payload._status = 1),
          (payload._result = moduleObject));
      },
      function(error) {
        0 === payload._status &&
          ((payload._status = 2), (payload._result = error));
      }
    );
  }
  if (1 === payload._status) return payload._result;
  throw payload._result;
}
function lazyInitializer$1(payload) {
  return {
    $$typeof: REACT_BLOCK_TYPE,
    _data: payload.load.apply(null, payload.args),
    _render: payload.render
  };
}
function block(render, load) {
  return void 0 === load
    ? function() {
        return { $$typeof: REACT_BLOCK_TYPE, _data: void 0, _render: render };
      }
    : function() {
        return {
          $$typeof: REACT_LAZY_TYPE,
          _payload: { load: load, args: arguments, render: render },
          _init: lazyInitializer$1
        };
      };
}
var ReactCurrentDispatcher = require("ReactCurrentDispatcher");
function resolveDispatcher() {
  var dispatcher = ReactCurrentDispatcher.current;
  if (null === dispatcher) throw Error(formatProdErrorMessage(321));
  return dispatcher;
}
var emptyObject$1 = {};
function useTransition(config) {
  return resolveDispatcher().useTransition(config);
}
function useDeferredValue(value, config) {
  return resolveDispatcher().useDeferredValue(value, config);
}
var ReactCurrentBatchConfig = { suspense: null };
require("ReactFeatureFlags");
var ReactSharedInternals = {
    ReactCurrentDispatcher: ReactCurrentDispatcher,
    ReactCurrentBatchConfig: ReactCurrentBatchConfig,
    ReactCurrentOwner: ReactCurrentOwner,
    IsSomeRendererActing: { current: !1 },
    assign: assign
  },
  ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner,
  hasOwnProperty$1 = Object.prototype.hasOwnProperty,
  RESERVED_PROPS$1 = { key: !0, ref: !0, __self: !0, __source: !0 };
function jsx(type, config, maybeKey) {
  var propName,
    props = {},
    key = null,
    ref = null;
  void 0 !== maybeKey && (key = "" + maybeKey);
  void 0 !== config.key && (key = "" + config.key);
  void 0 !== config.ref && (ref = config.ref);
  for (propName in config)
    hasOwnProperty$1.call(config, propName) &&
      !RESERVED_PROPS$1.hasOwnProperty(propName) &&
      (props[propName] = config[propName]);
  if (type && type.defaultProps)
    for (propName in ((config = type.defaultProps), config))
      void 0 === props[propName] && (props[propName] = config[propName]);
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type: type,
    key: key,
    ref: ref,
    props: props,
    _owner: ReactCurrentOwner$1.current
  };
}
exports.Children = {
  map: mapChildren,
  forEach: function(children, forEachFunc, forEachContext) {
    mapChildren(
      children,
      function() {
        forEachFunc.apply(this, arguments);
      },
      forEachContext
    );
  },
  count: function(children) {
    var n = 0;
    mapChildren(children, function() {
      n++;
    });
    return n;
  },
  toArray: function(children) {
    return (
      mapChildren(children, function(child) {
        return child;
      }) || []
    );
  },
  only: function(children) {
    if (!isValidElement(children)) throw Error(formatProdErrorMessage(143));
    return children;
  }
};
exports.Component = Component;
exports.DEPRECATED_createResponder = function(displayName, responderConfig) {
  return {
    $$typeof: REACT_RESPONDER_TYPE,
    displayName: displayName,
    getInitialState: responderConfig.getInitialState || null,
    onEvent: responderConfig.onEvent || null,
    onMount: responderConfig.onMount || null,
    onRootEvent: responderConfig.onRootEvent || null,
    onUnmount: responderConfig.onUnmount || null,
    rootEventTypes: responderConfig.rootEventTypes || null,
    targetEventTypes: responderConfig.targetEventTypes || null,
    targetPortalPropagation: responderConfig.targetPortalPropagation || !1
  };
};
exports.DEPRECATED_useResponder = function(responder, listenerProps) {
  return resolveDispatcher().useResponder(
    responder,
    listenerProps || emptyObject$1
  );
};
exports.PureComponent = PureComponent;
exports.SuspenseList = exports.unstable_SuspenseList;
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
exports.block = block;
exports.cloneElement = function(element, config, children) {
  if (null === element || void 0 === element)
    throw Error(formatProdErrorMessage(267, element));
  var props = Object.assign({}, element.props),
    key = element.key,
    ref = element.ref,
    owner = element._owner;
  if (null != config) {
    void 0 !== config.ref &&
      ((ref = config.ref), (owner = ReactCurrentOwner.current));
    void 0 !== config.key && (key = "" + config.key);
    if (element.type && element.type.defaultProps)
      var defaultProps = element.type.defaultProps;
    for (propName in config)
      hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName) &&
        (props[propName] =
          void 0 === config[propName] && void 0 !== defaultProps
            ? defaultProps[propName]
            : config[propName]);
  }
  var propName = arguments.length - 2;
  if (1 === propName) props.children = children;
  else if (1 < propName) {
    defaultProps = Array(propName);
    for (var i = 0; i < propName; i++) defaultProps[i] = arguments[i + 2];
    props.children = defaultProps;
  }
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type: element.type,
    key: key,
    ref: ref,
    props: props,
    _owner: owner
  };
};
exports.createContext = function(defaultValue, calculateChangedBits) {
  void 0 === calculateChangedBits && (calculateChangedBits = null);
  defaultValue = {
    $$typeof: REACT_CONTEXT_TYPE,
    _calculateChangedBits: calculateChangedBits,
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    _threadCount: 0,
    Provider: null,
    Consumer: null
  };
  defaultValue.Provider = {
    $$typeof: REACT_PROVIDER_TYPE,
    _context: defaultValue
  };
  return (defaultValue.Consumer = defaultValue);
};
exports.createElement = function(type, config, children) {
  var propName,
    props = {},
    key = null,
    ref = null;
  if (null != config)
    for (propName in (void 0 !== config.ref && (ref = config.ref),
    void 0 !== config.key && (key = "" + config.key),
    config))
      hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName) &&
        (props[propName] = config[propName]);
  var childrenLength = arguments.length - 2;
  if (1 === childrenLength) props.children = children;
  else if (1 < childrenLength) {
    for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++)
      childArray[i] = arguments[i + 2];
    props.children = childArray;
  }
  if (type && type.defaultProps)
    for (propName in ((childrenLength = type.defaultProps), childrenLength))
      void 0 === props[propName] &&
        (props[propName] = childrenLength[propName]);
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type: type,
    key: key,
    ref: ref,
    props: props,
    _owner: ReactCurrentOwner.current
  };
};
exports.createMutableSource = function(source, getVersion) {
  return {
    _getVersion: getVersion,
    _source: source,
    _workInProgressVersionPrimary: null,
    _workInProgressVersionSecondary: null
  };
};
exports.createRef = function() {
  return { current: null };
};
exports.forwardRef = function(render) {
  return { $$typeof: REACT_FORWARD_REF_TYPE, render: render };
};
exports.isValidElement = isValidElement;
exports.jsx = jsx;
exports.jsxDEV = void 0;
exports.jsxs = jsx;
exports.lazy = function(ctor) {
  return {
    $$typeof: REACT_LAZY_TYPE,
    _payload: { _status: -1, _result: ctor },
    _init: lazyInitializer
  };
};
exports.memo = function(type, compare) {
  return {
    $$typeof: REACT_MEMO_TYPE,
    type: type,
    compare: void 0 === compare ? null : compare
  };
};
exports.unstable_block = block;
exports.unstable_createScope = function() {
  return { $$typeof: REACT_SCOPE_TYPE };
};
exports.unstable_useDeferredValue = useDeferredValue;
exports.unstable_useOpaqueIdentifier = function() {
  return resolveDispatcher().useOpaqueIdentifier();
};
exports.unstable_useTransition = useTransition;
exports.unstable_withSuspenseConfig = function(scope, config) {
  var previousConfig = ReactCurrentBatchConfig.suspense;
  ReactCurrentBatchConfig.suspense = void 0 === config ? null : config;
  try {
    scope();
  } finally {
    ReactCurrentBatchConfig.suspense = previousConfig;
  }
};
exports.useCallback = function(callback, deps) {
  return resolveDispatcher().useCallback(callback, deps);
};
exports.useContext = function(Context, unstable_observedBits) {
  return resolveDispatcher().useContext(Context, unstable_observedBits);
};
exports.useDebugValue = function() {};
exports.useDeferredValue = useDeferredValue;
exports.useEffect = function(create, deps) {
  return resolveDispatcher().useEffect(create, deps);
};
exports.useImperativeHandle = function(ref, create, deps) {
  return resolveDispatcher().useImperativeHandle(ref, create, deps);
};
exports.useLayoutEffect = function(create, deps) {
  return resolveDispatcher().useLayoutEffect(create, deps);
};
exports.useMemo = function(create, deps) {
  return resolveDispatcher().useMemo(create, deps);
};
exports.useMutableSource = function(source, getSnapshot, subscribe) {
  return resolveDispatcher().useMutableSource(source, getSnapshot, subscribe);
};
exports.useReducer = function(reducer, initialArg, init) {
  return resolveDispatcher().useReducer(reducer, initialArg, init);
};
exports.useRef = function(initialValue) {
  return resolveDispatcher().useRef(initialValue);
};
exports.useState = function(initialState) {
  return resolveDispatcher().useState(initialState);
};
exports.useTransition = useTransition;
exports.version = "16.13.1";
