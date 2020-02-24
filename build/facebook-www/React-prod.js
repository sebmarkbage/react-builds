/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 * @preventMunge
 * @preserve-invariant-messages
 */

"use strict";
var assign = require("object-assign"),
  hasSymbol = "function" === typeof Symbol && Symbol.for,
  REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103,
  REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106,
  REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107,
  REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108,
  REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114,
  REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109,
  REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110,
  REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112,
  REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113,
  REACT_SUSPENSE_LIST_TYPE = hasSymbol
    ? Symbol.for("react.suspense_list")
    : 60120,
  REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115,
  REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116,
  REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121,
  REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118,
  REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119,
  MAYBE_ITERATOR_SYMBOL = "function" === typeof Symbol && Symbol.iterator;
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
require("ReactFeatureFlags");
var ReactCurrentOwner = require("ReactCurrentOwner"),
  hasOwnProperty = Object.prototype.hasOwnProperty,
  RESERVED_PROPS = { key: !0, ref: !0, __self: !0, __source: !0 };
function ReactElement(type, key, ref, self, source, owner, props) {
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type: type,
    key: key,
    ref: ref,
    props: props,
    _owner: owner
  };
}
function jsx(type, config, maybeKey) {
  var propName,
    props = {},
    key = null,
    ref = null;
  void 0 !== maybeKey && (key = "" + maybeKey);
  void 0 !== config.key && (key = "" + config.key);
  void 0 !== config.ref && (ref = config.ref);
  for (propName in config)
    hasOwnProperty.call(config, propName) &&
      !RESERVED_PROPS.hasOwnProperty(propName) &&
      (props[propName] = config[propName]);
  if (type && type.defaultProps)
    for (propName in ((config = type.defaultProps), config))
      void 0 === props[propName] && (props[propName] = config[propName]);
  return ReactElement(
    type,
    key,
    ref,
    void 0,
    void 0,
    ReactCurrentOwner.current,
    props
  );
}
function createElement(type, config, children) {
  var propName,
    props = {},
    key = null,
    ref = null,
    self = null,
    source = null;
  if (null != config)
    for (propName in (void 0 !== config.ref && (ref = config.ref),
    void 0 !== config.key && (key = "" + config.key),
    (self = void 0 === config.__self ? null : config.__self),
    (source = void 0 === config.__source ? null : config.__source),
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
  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props
  );
}
function cloneAndReplaceKey(oldElement, newKey) {
  return ReactElement(
    oldElement.type,
    newKey,
    oldElement.ref,
    oldElement._self,
    oldElement._source,
    oldElement._owner,
    oldElement.props
  );
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
    ("" + key).replace(/[=:]/g, function(match) {
      return escaperLookup[match];
    })
  );
}
var userProvidedKeyEscapeRegex = /\/+/g,
  traverseContextPool = [];
function getPooledTraverseContext(
  mapResult,
  keyPrefix,
  mapFunction,
  mapContext
) {
  if (traverseContextPool.length) {
    var traverseContext = traverseContextPool.pop();
    traverseContext.result = mapResult;
    traverseContext.keyPrefix = keyPrefix;
    traverseContext.func = mapFunction;
    traverseContext.context = mapContext;
    traverseContext.count = 0;
    return traverseContext;
  }
  return {
    result: mapResult,
    keyPrefix: keyPrefix,
    func: mapFunction,
    context: mapContext,
    count: 0
  };
}
function releaseTraverseContext(traverseContext) {
  traverseContext.result = null;
  traverseContext.keyPrefix = null;
  traverseContext.func = null;
  traverseContext.context = null;
  traverseContext.count = 0;
  10 > traverseContextPool.length && traverseContextPool.push(traverseContext);
}
function traverseAllChildrenImpl(
  children,
  nameSoFar,
  callback,
  traverseContext
) {
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
      callback(
        traverseContext,
        children,
        "" === nameSoFar ? "." + getComponentKey(children, 0) : nameSoFar
      ),
      1
    );
  invokeCallback = 0;
  nameSoFar = "" === nameSoFar ? "." : nameSoFar + ":";
  if (Array.isArray(children))
    for (var i = 0; i < children.length; i++) {
      type = children[i];
      var nextName = nameSoFar + getComponentKey(type, i);
      invokeCallback += traverseAllChildrenImpl(
        type,
        nextName,
        callback,
        traverseContext
      );
    }
  else if (
    (null === children || "object" !== typeof children
      ? (nextName = null)
      : ((nextName =
          (MAYBE_ITERATOR_SYMBOL && children[MAYBE_ITERATOR_SYMBOL]) ||
          children["@@iterator"]),
        (nextName = "function" === typeof nextName ? nextName : null)),
    "function" === typeof nextName)
  )
    for (
      children = nextName.call(children), i = 0;
      !(type = children.next()).done;

    )
      (type = type.value),
        (nextName = nameSoFar + getComponentKey(type, i++)),
        (invokeCallback += traverseAllChildrenImpl(
          type,
          nextName,
          callback,
          traverseContext
        ));
  else if ("object" === type)
    throw ((callback = "" + children),
    Error(
      formatProdErrorMessage(
        31,
        "[object Object]" === callback
          ? "object with keys {" + Object.keys(children).join(", ") + "}"
          : callback,
        ""
      )
    ));
  return invokeCallback;
}
function traverseAllChildren(children, callback, traverseContext) {
  return null == children
    ? 0
    : traverseAllChildrenImpl(children, "", callback, traverseContext);
}
function getComponentKey(component, index) {
  return "object" === typeof component &&
    null !== component &&
    null != component.key
    ? escape(component.key)
    : index.toString(36);
}
function forEachSingleChild(bookKeeping, child) {
  bookKeeping.func.call(bookKeeping.context, child, bookKeeping.count++);
}
function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
    keyPrefix = bookKeeping.keyPrefix;
  bookKeeping = bookKeeping.func.call(
    bookKeeping.context,
    child,
    bookKeeping.count++
  );
  Array.isArray(bookKeeping)
    ? mapIntoWithKeyPrefixInternal(bookKeeping, result, childKey, function(c) {
        return c;
      })
    : null != bookKeeping &&
      (isValidElement(bookKeeping) &&
        (bookKeeping = cloneAndReplaceKey(
          bookKeeping,
          keyPrefix +
            (!bookKeeping.key || (child && child.key === bookKeeping.key)
              ? ""
              : ("" + bookKeeping.key).replace(
                  userProvidedKeyEscapeRegex,
                  "$&/"
                ) + "/") +
            childKey
        )),
      result.push(bookKeeping));
}
function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = "";
  null != prefix &&
    (escapedPrefix =
      ("" + prefix).replace(userProvidedKeyEscapeRegex, "$&/") + "/");
  array = getPooledTraverseContext(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, array);
  releaseTraverseContext(array);
}
var ReactCurrentDispatcher = require("ReactCurrentDispatcher");
function resolveDispatcher() {
  var dispatcher = ReactCurrentDispatcher.current;
  if (null === dispatcher) throw Error(formatProdErrorMessage(321));
  return dispatcher;
}
var emptyObject$1 = {},
  ReactCurrentBatchConfig = { suspense: null },
  ReactSharedInternals = {
    ReactCurrentDispatcher: ReactCurrentDispatcher,
    ReactCurrentBatchConfig: ReactCurrentBatchConfig,
    ReactCurrentOwner: ReactCurrentOwner,
    IsSomeRendererActing: { current: !1 },
    assign: assign
  };
exports.Children = {
  map: function(children, func, context) {
    if (null == children) return children;
    var result = [];
    mapIntoWithKeyPrefixInternal(children, result, null, func, context);
    return result;
  },
  forEach: function(children, forEachFunc, forEachContext) {
    if (null == children) return children;
    forEachFunc = getPooledTraverseContext(
      null,
      null,
      forEachFunc,
      forEachContext
    );
    traverseAllChildren(children, forEachSingleChild, forEachFunc);
    releaseTraverseContext(forEachFunc);
  },
  count: function(children) {
    return traverseAllChildren(
      children,
      function() {
        return null;
      },
      null
    );
  },
  toArray: function(children) {
    var result = [];
    mapIntoWithKeyPrefixInternal(children, result, null, function(child) {
      return child;
    });
    return result;
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
exports.Fragment = REACT_FRAGMENT_TYPE;
exports.Profiler = REACT_PROFILER_TYPE;
exports.PureComponent = PureComponent;
exports.StrictMode = REACT_STRICT_MODE_TYPE;
exports.Suspense = REACT_SUSPENSE_TYPE;
exports.SuspenseList = REACT_SUSPENSE_LIST_TYPE;
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
exports.block = function(query, render) {
  return function() {
    var args = arguments;
    return {
      $$typeof: REACT_BLOCK_TYPE,
      query: function() {
        return query.apply(null, args);
      },
      render: render
    };
  };
};
exports.cloneElement = function(element, config, children) {
  if (null === element || void 0 === element)
    throw Error(formatProdErrorMessage(267, element));
  var props = Object.assign({}, element.props),
    key = element.key,
    ref = element.ref,
    self = element._self,
    source = element._source,
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
  return ReactElement(element.type, key, ref, self, source, owner, props);
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
exports.createElement = createElement;
exports.createFactory = function(type) {
  var factory = createElement.bind(null, type);
  factory.type = type;
  return factory;
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
  return { $$typeof: REACT_LAZY_TYPE, _ctor: ctor, _status: -1, _result: null };
};
exports.memo = function(type, compare) {
  return {
    $$typeof: REACT_MEMO_TYPE,
    type: type,
    compare: void 0 === compare ? null : compare
  };
};
exports.unstable_createScope = function() {
  return { $$typeof: REACT_SCOPE_TYPE };
};
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
exports.useDeferredValue = function(value, config) {
  return resolveDispatcher().useDeferredValue(value, config);
};
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
exports.useReducer = function(reducer, initialArg, init) {
  return resolveDispatcher().useReducer(reducer, initialArg, init);
};
exports.useRef = function(initialValue) {
  return resolveDispatcher().useRef(initialValue);
};
exports.useState = function(initialState) {
  return resolveDispatcher().useState(initialState);
};
exports.useTransition = function(config) {
  return resolveDispatcher().useTransition(config);
};
exports.version = "16.12.0";
