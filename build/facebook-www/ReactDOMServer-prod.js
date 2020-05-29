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
var React = require("react");
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
var REACT_PORTAL_TYPE = 60106,
  REACT_FRAGMENT_TYPE = 60107,
  REACT_STRICT_MODE_TYPE = 60108,
  REACT_PROFILER_TYPE = 60114,
  REACT_PROVIDER_TYPE = 60109,
  REACT_CONTEXT_TYPE = 60110,
  REACT_FORWARD_REF_TYPE = 60112,
  REACT_SUSPENSE_TYPE = 60113,
  REACT_SUSPENSE_LIST_TYPE = 60120,
  REACT_MEMO_TYPE = 60115,
  REACT_LAZY_TYPE = 60116,
  REACT_BLOCK_TYPE = 60121,
  REACT_FUNDAMENTAL_TYPE = 60117,
  REACT_SCOPE_TYPE = 60119,
  REACT_DEBUG_TRACING_MODE_TYPE = 60129,
  REACT_LEGACY_HIDDEN_TYPE = 60131;
if ("function" === typeof Symbol && Symbol.for) {
  var symbolFor = Symbol.for;
  REACT_PORTAL_TYPE = symbolFor("react.portal");
  REACT_FRAGMENT_TYPE = symbolFor("react.fragment");
  REACT_STRICT_MODE_TYPE = symbolFor("react.strict_mode");
  REACT_PROFILER_TYPE = symbolFor("react.profiler");
  REACT_PROVIDER_TYPE = symbolFor("react.provider");
  REACT_CONTEXT_TYPE = symbolFor("react.context");
  REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref");
  REACT_SUSPENSE_TYPE = symbolFor("react.suspense");
  REACT_SUSPENSE_LIST_TYPE = symbolFor("react.suspense_list");
  REACT_MEMO_TYPE = symbolFor("react.memo");
  REACT_LAZY_TYPE = symbolFor("react.lazy");
  REACT_BLOCK_TYPE = symbolFor("react.block");
  REACT_FUNDAMENTAL_TYPE = symbolFor("react.fundamental");
  REACT_SCOPE_TYPE = symbolFor("react.scope");
  REACT_DEBUG_TRACING_MODE_TYPE = symbolFor("react.debug_trace_mode");
  REACT_LEGACY_HIDDEN_TYPE = symbolFor("react.legacy_hidden");
}
function getComponentName(type) {
  if (null == type) return null;
  if ("function" === typeof type) return type.displayName || type.name || null;
  if ("string" === typeof type) return type;
  switch (type) {
    case REACT_FRAGMENT_TYPE:
      return "Fragment";
    case REACT_PORTAL_TYPE:
      return "Portal";
    case REACT_PROFILER_TYPE:
      return "Profiler";
    case REACT_STRICT_MODE_TYPE:
      return "StrictMode";
    case REACT_SUSPENSE_TYPE:
      return "Suspense";
    case REACT_SUSPENSE_LIST_TYPE:
      return "SuspenseList";
  }
  if ("object" === typeof type)
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        return (type.displayName || "Context") + ".Consumer";
      case REACT_PROVIDER_TYPE:
        return (type._context.displayName || "Context") + ".Provider";
      case REACT_FORWARD_REF_TYPE:
        var innerType = type.render;
        innerType = innerType.displayName || innerType.name || "";
        return (
          type.displayName ||
          ("" !== innerType ? "ForwardRef(" + innerType + ")" : "ForwardRef")
        );
      case REACT_MEMO_TYPE:
        return getComponentName(type.type);
      case REACT_BLOCK_TYPE:
        return getComponentName(type._render);
      case REACT_LAZY_TYPE:
        innerType = type._payload;
        type = type._init;
        try {
          return getComponentName(type(innerType));
        } catch (x) {}
    }
  return null;
}
var enableFilterEmptyStringAttributesDOM = require("ReactFeatureFlags")
    .enableFilterEmptyStringAttributesDOM,
  ReactSharedInternals =
    React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  emptyObject = {};
function validateContextBounds(context, threadID) {
  for (var i = context._threadCount | 0; i <= threadID; i++)
    (context[i] = context._currentValue2), (context._threadCount = i + 1);
}
function processContext(type, context, threadID, isClass) {
  if (isClass)
    return (
      (type = type.contextType),
      "object" === typeof type && null !== type
        ? (validateContextBounds(type, threadID), type[threadID])
        : emptyObject
    );
}
for (var nextAvailableThreadIDs = new Uint16Array(16), i = 0; 15 > i; i++)
  nextAvailableThreadIDs[i] = i + 1;
nextAvailableThreadIDs[15] = 0;
var VALID_ATTRIBUTE_NAME_REGEX = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  hasOwnProperty = Object.prototype.hasOwnProperty,
  illegalAttributeNameCache = {},
  validatedAttributeNameCache = {};
function isAttributeNameSafe(attributeName) {
  if (hasOwnProperty.call(validatedAttributeNameCache, attributeName))
    return !0;
  if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) return !1;
  if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName))
    return (validatedAttributeNameCache[attributeName] = !0);
  illegalAttributeNameCache[attributeName] = !0;
  return !1;
}
function shouldRemoveAttributeWithWarning(
  name,
  value,
  propertyInfo,
  isCustomComponentTag
) {
  if (null !== propertyInfo && 0 === propertyInfo.type) return !1;
  switch (typeof value) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      if (isCustomComponentTag) return !1;
      if (null !== propertyInfo) return !propertyInfo.acceptsBooleans;
      name = name.toLowerCase().slice(0, 5);
      return "data-" !== name && "aria-" !== name;
    default:
      return !1;
  }
}
function shouldRemoveAttribute(
  name,
  value,
  propertyInfo,
  isCustomComponentTag
) {
  if (
    null === value ||
    "undefined" === typeof value ||
    shouldRemoveAttributeWithWarning(
      name,
      value,
      propertyInfo,
      isCustomComponentTag
    )
  )
    return !0;
  if (isCustomComponentTag) return !1;
  if (null !== propertyInfo) {
    if (
      enableFilterEmptyStringAttributesDOM &&
      propertyInfo.removeEmptyString &&
      "" === value
    )
      return !0;
    switch (propertyInfo.type) {
      case 3:
        return !value;
      case 4:
        return !1 === value;
      case 5:
        return isNaN(value);
      case 6:
        return isNaN(value) || 1 > value;
    }
  }
  return !1;
}
function PropertyInfoRecord(
  name,
  type,
  mustUseProperty,
  attributeName,
  attributeNamespace,
  sanitizeURL,
  removeEmptyString
) {
  this.acceptsBooleans = 2 === type || 3 === type || 4 === type;
  this.attributeName = attributeName;
  this.attributeNamespace = attributeNamespace;
  this.mustUseProperty = mustUseProperty;
  this.propertyName = name;
  this.type = type;
  this.sanitizeURL = sanitizeURL;
  this.removeEmptyString = removeEmptyString;
}
var properties = {},
  reservedProps = "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(
    " "
  );
reservedProps.push("DEPRECATED_flareListeners");
reservedProps.forEach(function(name) {
  properties[name] = new PropertyInfoRecord(name, 0, !1, name, null, !1, !1);
});
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"]
].forEach(function(_ref) {
  var name = _ref[0];
  properties[name] = new PropertyInfoRecord(name, 1, !1, _ref[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(
    name,
    2,
    !1,
    name.toLowerCase(),
    null,
    !1,
    !1
  );
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha"
].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(name, 2, !1, name, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function(name) {
    properties[name] = new PropertyInfoRecord(
      name,
      3,
      !1,
      name.toLowerCase(),
      null,
      !1,
      !1
    );
  });
["checked", "multiple", "muted", "selected"].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(name, 3, !0, name, null, !1, !1);
});
["capture", "download"].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(name, 4, !1, name, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(name, 6, !1, name, null, !1, !1);
});
["rowSpan", "start"].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(
    name,
    5,
    !1,
    name.toLowerCase(),
    null,
    !1,
    !1
  );
});
var CAMELIZE = /[\-:]([a-z])/g;
function capitalize(token) {
  return token[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function(attributeName) {
    var name = attributeName.replace(CAMELIZE, capitalize);
    properties[name] = new PropertyInfoRecord(
      name,
      1,
      !1,
      attributeName,
      null,
      !1,
      !1
    );
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function(attributeName) {
    var name = attributeName.replace(CAMELIZE, capitalize);
    properties[name] = new PropertyInfoRecord(
      name,
      1,
      !1,
      attributeName,
      "http://www.w3.org/1999/xlink",
      !1,
      !1
    );
  });
["xml:base", "xml:lang", "xml:space"].forEach(function(attributeName) {
  var name = attributeName.replace(CAMELIZE, capitalize);
  properties[name] = new PropertyInfoRecord(
    name,
    1,
    !1,
    attributeName,
    "http://www.w3.org/XML/1998/namespace",
    !1,
    !1
  );
});
["tabIndex", "crossOrigin"].forEach(function(attributeName) {
  properties[attributeName] = new PropertyInfoRecord(
    attributeName,
    1,
    !1,
    attributeName.toLowerCase(),
    null,
    !1,
    !1
  );
});
properties.xlinkHref = new PropertyInfoRecord(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1
);
["src", "href", "action", "formAction"].forEach(function(attributeName) {
  properties[attributeName] = new PropertyInfoRecord(
    attributeName,
    1,
    !1,
    attributeName.toLowerCase(),
    null,
    !0,
    !0
  );
});
var isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i,
  matchHtmlRegExp = /["'&<>]/;
function escapeTextForBrowser(text) {
  if ("boolean" === typeof text || "number" === typeof text) return "" + text;
  text = "" + text;
  var match = matchHtmlRegExp.exec(text);
  if (match) {
    var html = "",
      index,
      lastIndex = 0;
    for (index = match.index; index < text.length; index++) {
      switch (text.charCodeAt(index)) {
        case 34:
          match = "&quot;";
          break;
        case 38:
          match = "&amp;";
          break;
        case 39:
          match = "&#x27;";
          break;
        case 60:
          match = "&lt;";
          break;
        case 62:
          match = "&gt;";
          break;
        default:
          continue;
      }
      lastIndex !== index && (html += text.substring(lastIndex, index));
      lastIndex = index + 1;
      html += match;
    }
    text = lastIndex !== index ? html + text.substring(lastIndex, index) : html;
  }
  return text;
}
function createMarkupForProperty(name, value) {
  var JSCompiler_inline_result = properties.hasOwnProperty(name)
    ? properties[name]
    : null;
  var JSCompiler_temp;
  if ((JSCompiler_temp = "style" !== name))
    JSCompiler_temp =
      null !== JSCompiler_inline_result
        ? 0 === JSCompiler_inline_result.type
        : !(2 < name.length) ||
          ("o" !== name[0] && "O" !== name[0]) ||
          ("n" !== name[1] && "N" !== name[1])
        ? !1
        : !0;
  if (
    JSCompiler_temp ||
    shouldRemoveAttribute(name, value, JSCompiler_inline_result, !1)
  )
    return "";
  if (null !== JSCompiler_inline_result) {
    name = JSCompiler_inline_result.attributeName;
    JSCompiler_temp = JSCompiler_inline_result.type;
    if (3 === JSCompiler_temp || (4 === JSCompiler_temp && !0 === value))
      return name + '=""';
    if (
      JSCompiler_inline_result.sanitizeURL &&
      ((value = "" + value), isJavaScriptProtocol.test(value))
    )
      throw Error(formatProdErrorMessage(323));
    return name + '="' + (escapeTextForBrowser(value) + '"');
  }
  return isAttributeNameSafe(name)
    ? name + '="' + (escapeTextForBrowser(value) + '"')
    : "";
}
function is(x, y) {
  return (x === y && (0 !== x || 1 / x === 1 / y)) || (x !== x && y !== y);
}
var objectIs = "function" === typeof Object.is ? Object.is : is,
  currentlyRenderingComponent = null,
  firstWorkInProgressHook = null,
  workInProgressHook = null,
  isReRender = !1,
  didScheduleRenderPhaseUpdate = !1,
  renderPhaseUpdates = null,
  numberOfReRenders = 0;
function resolveCurrentlyRenderingComponent() {
  if (null === currentlyRenderingComponent)
    throw Error(formatProdErrorMessage(321));
  return currentlyRenderingComponent;
}
function createHook() {
  if (0 < numberOfReRenders) throw Error(formatProdErrorMessage(312));
  return { memoizedState: null, queue: null, next: null };
}
function createWorkInProgressHook() {
  null === workInProgressHook
    ? null === firstWorkInProgressHook
      ? ((isReRender = !1),
        (firstWorkInProgressHook = workInProgressHook = createHook()))
      : ((isReRender = !0), (workInProgressHook = firstWorkInProgressHook))
    : null === workInProgressHook.next
    ? ((isReRender = !1),
      (workInProgressHook = workInProgressHook.next = createHook()))
    : ((isReRender = !0), (workInProgressHook = workInProgressHook.next));
  return workInProgressHook;
}
function finishHooks(Component, props, children, refOrContext) {
  for (; didScheduleRenderPhaseUpdate; )
    (didScheduleRenderPhaseUpdate = !1),
      (numberOfReRenders += 1),
      (workInProgressHook = null),
      (children = Component(props, refOrContext));
  firstWorkInProgressHook = currentlyRenderingComponent = null;
  numberOfReRenders = 0;
  workInProgressHook = renderPhaseUpdates = null;
  return children;
}
function basicStateReducer(state, action) {
  return "function" === typeof action ? action(state) : action;
}
function useReducer(reducer, initialArg, init) {
  currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
  workInProgressHook = createWorkInProgressHook();
  if (isReRender) {
    var queue = workInProgressHook.queue;
    initialArg = queue.dispatch;
    if (
      null !== renderPhaseUpdates &&
      ((init = renderPhaseUpdates.get(queue)), void 0 !== init)
    ) {
      renderPhaseUpdates.delete(queue);
      queue = workInProgressHook.memoizedState;
      do (queue = reducer(queue, init.action)), (init = init.next);
      while (null !== init);
      workInProgressHook.memoizedState = queue;
      return [queue, initialArg];
    }
    return [workInProgressHook.memoizedState, initialArg];
  }
  reducer =
    reducer === basicStateReducer
      ? "function" === typeof initialArg
        ? initialArg()
        : initialArg
      : void 0 !== init
      ? init(initialArg)
      : initialArg;
  workInProgressHook.memoizedState = reducer;
  reducer = workInProgressHook.queue = { last: null, dispatch: null };
  reducer = reducer.dispatch = dispatchAction.bind(
    null,
    currentlyRenderingComponent,
    reducer
  );
  return [workInProgressHook.memoizedState, reducer];
}
function useMemo(nextCreate, deps) {
  currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
  workInProgressHook = createWorkInProgressHook();
  deps = void 0 === deps ? null : deps;
  if (null !== workInProgressHook) {
    var prevState = workInProgressHook.memoizedState;
    if (null !== prevState && null !== deps) {
      var prevDeps = prevState[1];
      a: if (null === prevDeps) prevDeps = !1;
      else {
        for (var i$1 = 0; i$1 < prevDeps.length && i$1 < deps.length; i$1++)
          if (!objectIs(deps[i$1], prevDeps[i$1])) {
            prevDeps = !1;
            break a;
          }
        prevDeps = !0;
      }
      if (prevDeps) return prevState[0];
    }
  }
  nextCreate = nextCreate();
  workInProgressHook.memoizedState = [nextCreate, deps];
  return nextCreate;
}
function dispatchAction(componentIdentity, queue, action) {
  if (!(25 > numberOfReRenders)) throw Error(formatProdErrorMessage(301));
  if (componentIdentity === currentlyRenderingComponent)
    if (
      ((didScheduleRenderPhaseUpdate = !0),
      (componentIdentity = { action: action, next: null }),
      null === renderPhaseUpdates && (renderPhaseUpdates = new Map()),
      (action = renderPhaseUpdates.get(queue)),
      void 0 === action)
    )
      renderPhaseUpdates.set(queue, componentIdentity);
    else {
      for (queue = action; null !== queue.next; ) queue = queue.next;
      queue.next = componentIdentity;
    }
}
function noop() {}
var currentPartialRenderer = null,
  Dispatcher = {
    readContext: function(context) {
      var threadID = currentPartialRenderer.threadID;
      validateContextBounds(context, threadID);
      return context[threadID];
    },
    useContext: function(context) {
      resolveCurrentlyRenderingComponent();
      var threadID = currentPartialRenderer.threadID;
      validateContextBounds(context, threadID);
      return context[threadID];
    },
    useMemo: useMemo,
    useReducer: useReducer,
    useRef: function(initialValue) {
      currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
      workInProgressHook = createWorkInProgressHook();
      var previousRef = workInProgressHook.memoizedState;
      return null === previousRef
        ? ((initialValue = { current: initialValue }),
          (workInProgressHook.memoizedState = initialValue))
        : previousRef;
    },
    useState: function(initialState) {
      return useReducer(basicStateReducer, initialState);
    },
    useLayoutEffect: function() {},
    useCallback: function(callback, deps) {
      return useMemo(function() {
        return callback;
      }, deps);
    },
    useImperativeHandle: noop,
    useEffect: noop,
    useDebugValue: noop,
    useResponder: function(responder, props) {
      return { props: props, responder: responder };
    },
    useDeferredValue: function(value) {
      resolveCurrentlyRenderingComponent();
      return value;
    },
    useTransition: function() {
      resolveCurrentlyRenderingComponent();
      return [
        function(callback) {
          callback();
        },
        !1
      ];
    },
    useOpaqueIdentifier: function() {
      return (
        (currentPartialRenderer.identifierPrefix || "") +
        "R:" +
        (currentPartialRenderer.uniqueID++).toString(36)
      );
    },
    useMutableSource: function(source, getSnapshot) {
      resolveCurrentlyRenderingComponent();
      return getSnapshot(source._source);
    }
  },
  Namespaces = {
    html: "http://www.w3.org/1999/xhtml",
    mathml: "http://www.w3.org/1998/Math/MathML",
    svg: "http://www.w3.org/2000/svg"
  };
function getIntrinsicNamespace(type) {
  switch (type) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
var omittedCloseTags = {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
  },
  voidElementTags = Object.assign({ menuitem: !0 }, omittedCloseTags),
  isUnitlessNumber = {
    animationIterationCount: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  },
  prefixes = ["Webkit", "ms", "Moz", "O"];
Object.keys(isUnitlessNumber).forEach(function(prop) {
  prefixes.forEach(function(prefix) {
    prefix = prefix + prop.charAt(0).toUpperCase() + prop.substring(1);
    isUnitlessNumber[prefix] = isUnitlessNumber[prop];
  });
});
var uppercasePattern = /([A-Z])/g,
  msPattern = /^ms-/,
  toArray = React.Children.toArray,
  ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher,
  newlineEatingTags = { listing: !0, pre: !0, textarea: !0 },
  VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/,
  validatedTagCache = {},
  styleNameCache = {};
function flattenOptionChildren(children) {
  if (void 0 === children || null === children) return children;
  var content = "";
  React.Children.forEach(children, function(child) {
    null != child && (content += child);
  });
  return content;
}
var hasOwnProperty$1 = Object.prototype.hasOwnProperty,
  RESERVED_PROPS = {
    children: null,
    dangerouslySetInnerHTML: null,
    suppressContentEditableWarning: null,
    suppressHydrationWarning: null
  };
function resolve(child, context, threadID) {
  function processChild(element, Component) {
    var isClass = Component.prototype && Component.prototype.isReactComponent,
      publicContext = processContext(Component, context, threadID, isClass),
      queue = [],
      replace = !1,
      updater = {
        isMounted: function() {
          return !1;
        },
        enqueueForceUpdate: function() {
          if (null === queue) return null;
        },
        enqueueReplaceState: function(publicInstance, completeState) {
          replace = !0;
          queue = [completeState];
        },
        enqueueSetState: function(publicInstance, currentPartialState) {
          if (null === queue) return null;
          queue.push(currentPartialState);
        }
      };
    if (isClass) {
      isClass = new Component(element.props, publicContext, updater);
      if ("function" === typeof Component.getDerivedStateFromProps) {
        var partialState = Component.getDerivedStateFromProps.call(
          null,
          element.props,
          isClass.state
        );
        null != partialState &&
          (isClass.state = Object.assign({}, isClass.state, partialState));
      }
      isClass.props = element.props;
      isClass.context = publicContext;
      isClass.updater = updater;
      updater = isClass.state;
      void 0 === updater && (isClass.state = updater = null);
      if (
        "function" === typeof isClass.UNSAFE_componentWillMount ||
        "function" === typeof isClass.componentWillMount
      )
        if (
          ("function" === typeof isClass.componentWillMount &&
            "function" !== typeof Component.getDerivedStateFromProps &&
            isClass.componentWillMount(),
          "function" === typeof isClass.UNSAFE_componentWillMount &&
            "function" !== typeof Component.getDerivedStateFromProps &&
            isClass.UNSAFE_componentWillMount(),
          queue.length)
        ) {
          updater = queue;
          var oldReplace = replace;
          queue = null;
          replace = !1;
          if (oldReplace && 1 === updater.length) isClass.state = updater[0];
          else {
            partialState = oldReplace ? updater[0] : isClass.state;
            var dontMutate = !0;
            for (
              oldReplace = oldReplace ? 1 : 0;
              oldReplace < updater.length;
              oldReplace++
            ) {
              var partial = updater[oldReplace];
              partial =
                "function" === typeof partial
                  ? partial.call(
                      isClass,
                      partialState,
                      element.props,
                      publicContext
                    )
                  : partial;
              null != partial &&
                (dontMutate
                  ? ((dontMutate = !1),
                    (partialState = Object.assign({}, partialState, partial)))
                  : Object.assign(partialState, partial));
            }
            isClass.state = partialState;
          }
        } else queue = null;
      child = isClass.render();
    } else
      (currentlyRenderingComponent = {}),
        (isClass = Component(element.props, publicContext, updater)),
        (child = isClass = finishHooks(
          Component,
          element.props,
          isClass,
          publicContext
        ));
    if (void 0 === child)
      throw Error(
        formatProdErrorMessage(152, getComponentName(Component) || "Component")
      );
  }
  for (; React.isValidElement(child); ) {
    var element$jscomp$0 = child,
      Component$jscomp$0 = element$jscomp$0.type;
    if ("function" !== typeof Component$jscomp$0) break;
    processChild(element$jscomp$0, Component$jscomp$0);
  }
  return { child: child, context: context };
}
var ReactDOMServerRenderer = (function() {
  function ReactDOMServerRenderer(children, makeStaticMarkup, options) {
    React.isValidElement(children)
      ? children.type !== REACT_FRAGMENT_TYPE
        ? (children = [children])
        : ((children = children.props.children),
          (children = React.isValidElement(children)
            ? [children]
            : toArray(children)))
      : (children = toArray(children));
    children = {
      type: null,
      domNamespace: Namespaces.html,
      children: children,
      childIndex: 0,
      context: emptyObject,
      footer: ""
    };
    var JSCompiler_inline_result = nextAvailableThreadIDs[0];
    if (0 === JSCompiler_inline_result) {
      var oldArray = nextAvailableThreadIDs;
      JSCompiler_inline_result = oldArray.length;
      var newSize = 2 * JSCompiler_inline_result;
      if (!(65536 >= newSize)) throw Error(formatProdErrorMessage(304));
      var newArray = new Uint16Array(newSize);
      newArray.set(oldArray);
      nextAvailableThreadIDs = newArray;
      nextAvailableThreadIDs[0] = JSCompiler_inline_result + 1;
      for (
        oldArray = JSCompiler_inline_result;
        oldArray < newSize - 1;
        oldArray++
      )
        nextAvailableThreadIDs[oldArray] = oldArray + 1;
      nextAvailableThreadIDs[newSize - 1] = 0;
    } else
      nextAvailableThreadIDs[0] =
        nextAvailableThreadIDs[JSCompiler_inline_result];
    this.threadID = JSCompiler_inline_result;
    this.stack = [children];
    this.exhausted = !1;
    this.currentSelectValue = null;
    this.previousWasTextNode = !1;
    this.makeStaticMarkup = makeStaticMarkup;
    this.suspenseDepth = 0;
    this.contextIndex = -1;
    this.contextStack = [];
    this.contextValueStack = [];
    this.uniqueID = 0;
    this.identifierPrefix = (options && options.identifierPrefix) || "";
  }
  var _proto = ReactDOMServerRenderer.prototype;
  _proto.destroy = function() {
    if (!this.exhausted) {
      this.exhausted = !0;
      this.clearProviders();
      var id = this.threadID;
      nextAvailableThreadIDs[id] = nextAvailableThreadIDs[0];
      nextAvailableThreadIDs[0] = id;
    }
  };
  _proto.pushProvider = function(provider) {
    var index = ++this.contextIndex,
      context = provider.type._context,
      threadID = this.threadID;
    validateContextBounds(context, threadID);
    var previousValue = context[threadID];
    this.contextStack[index] = context;
    this.contextValueStack[index] = previousValue;
    context[threadID] = provider.props.value;
  };
  _proto.popProvider = function() {
    var index = this.contextIndex,
      context = this.contextStack[index],
      previousValue = this.contextValueStack[index];
    this.contextStack[index] = null;
    this.contextValueStack[index] = null;
    this.contextIndex--;
    context[this.threadID] = previousValue;
  };
  _proto.clearProviders = function() {
    for (var index = this.contextIndex; 0 <= index; index--)
      this.contextStack[index][this.threadID] = this.contextValueStack[index];
  };
  _proto.read = function(bytes) {
    if (this.exhausted) return null;
    var prevPartialRenderer = currentPartialRenderer;
    currentPartialRenderer = this;
    var prevDispatcher = ReactCurrentDispatcher$1.current;
    ReactCurrentDispatcher$1.current = Dispatcher;
    try {
      for (var out = [""], suspended = !1; out[0].length < bytes; ) {
        if (0 === this.stack.length) {
          this.exhausted = !0;
          var id = this.threadID;
          nextAvailableThreadIDs[id] = nextAvailableThreadIDs[0];
          nextAvailableThreadIDs[0] = id;
          break;
        }
        var frame = this.stack[this.stack.length - 1];
        if (suspended || frame.childIndex >= frame.children.length) {
          var footer = frame.footer;
          "" !== footer && (this.previousWasTextNode = !1);
          this.stack.pop();
          if ("select" === frame.type) this.currentSelectValue = null;
          else if (
            null != frame.type &&
            null != frame.type.type &&
            frame.type.type.$$typeof === REACT_PROVIDER_TYPE
          )
            this.popProvider(frame.type);
          else if (frame.type === REACT_SUSPENSE_TYPE) {
            this.suspenseDepth--;
            var buffered = out.pop();
            if (suspended) {
              suspended = !1;
              var fallbackFrame = frame.fallbackFrame;
              if (!fallbackFrame) throw Error(formatProdErrorMessage(303));
              this.stack.push(fallbackFrame);
              out[this.suspenseDepth] += "\x3c!--$!--\x3e";
              continue;
            } else out[this.suspenseDepth] += buffered;
          }
          out[this.suspenseDepth] += footer;
        } else {
          var child = frame.children[frame.childIndex++],
            outBuffer = "";
          try {
            outBuffer += this.render(child, frame.context, frame.domNamespace);
          } catch (err) {
            if (null != err && "function" === typeof err.then) {
              if (!(0 < this.suspenseDepth))
                throw Error(formatProdErrorMessage(342));
              suspended = !0;
            } else throw err;
          } finally {
          }
          out.length <= this.suspenseDepth && out.push("");
          out[this.suspenseDepth] += outBuffer;
        }
      }
      return out[0];
    } finally {
      (ReactCurrentDispatcher$1.current = prevDispatcher),
        (currentPartialRenderer = prevPartialRenderer);
    }
  };
  _proto.render = function(child, context, parentNamespace) {
    if ("string" === typeof child || "number" === typeof child) {
      parentNamespace = "" + child;
      if ("" === parentNamespace) return "";
      if (this.makeStaticMarkup) return escapeTextForBrowser(parentNamespace);
      if (this.previousWasTextNode)
        return "\x3c!-- --\x3e" + escapeTextForBrowser(parentNamespace);
      this.previousWasTextNode = !0;
      return escapeTextForBrowser(parentNamespace);
    }
    context = resolve(child, context, this.threadID);
    child = context.child;
    context = context.context;
    if (null === child || !1 === child) return "";
    if (!React.isValidElement(child)) {
      if (null != child && null != child.$$typeof) {
        parentNamespace = child.$$typeof;
        if (parentNamespace === REACT_PORTAL_TYPE)
          throw Error(formatProdErrorMessage(257));
        throw Error(formatProdErrorMessage(258, parentNamespace.toString()));
      }
      child = toArray(child);
      this.stack.push({
        type: null,
        domNamespace: parentNamespace,
        children: child,
        childIndex: 0,
        context: context,
        footer: ""
      });
      return "";
    }
    var elementType = child.type;
    if ("string" === typeof elementType)
      return this.renderDOM(child, context, parentNamespace);
    switch (elementType) {
      case REACT_LEGACY_HIDDEN_TYPE:
      case REACT_DEBUG_TRACING_MODE_TYPE:
      case REACT_STRICT_MODE_TYPE:
      case REACT_PROFILER_TYPE:
      case REACT_SUSPENSE_LIST_TYPE:
      case REACT_FRAGMENT_TYPE:
        return (
          (child = toArray(child.props.children)),
          this.stack.push({
            type: null,
            domNamespace: parentNamespace,
            children: child,
            childIndex: 0,
            context: context,
            footer: ""
          }),
          ""
        );
      case REACT_SUSPENSE_TYPE:
        elementType = child.props.fallback;
        if (void 0 === elementType)
          return (
            (child = toArray(child.props.children)),
            this.stack.push({
              type: null,
              domNamespace: parentNamespace,
              children: child,
              childIndex: 0,
              context: context,
              footer: ""
            }),
            ""
          );
        elementType = toArray(elementType);
        child = toArray(child.props.children);
        this.stack.push({
          fallbackFrame: {
            type: null,
            domNamespace: parentNamespace,
            children: elementType,
            childIndex: 0,
            context: context,
            footer: "\x3c!--/$--\x3e"
          },
          type: REACT_SUSPENSE_TYPE,
          domNamespace: parentNamespace,
          children: child,
          childIndex: 0,
          context: context,
          footer: "\x3c!--/$--\x3e"
        });
        this.suspenseDepth++;
        return "\x3c!--$--\x3e";
    }
    if ("object" === typeof elementType && null !== elementType)
      switch (elementType.$$typeof) {
        case REACT_FORWARD_REF_TYPE:
          currentlyRenderingComponent = {};
          var nextChildren$12 = elementType.render(child.props, child.ref);
          nextChildren$12 = finishHooks(
            elementType.render,
            child.props,
            nextChildren$12,
            child.ref
          );
          nextChildren$12 = toArray(nextChildren$12);
          this.stack.push({
            type: null,
            domNamespace: parentNamespace,
            children: nextChildren$12,
            childIndex: 0,
            context: context,
            footer: ""
          });
          return "";
        case REACT_MEMO_TYPE:
          return (
            (child = [
              React.createElement(
                elementType.type,
                Object.assign({ ref: child.ref }, child.props)
              )
            ]),
            this.stack.push({
              type: null,
              domNamespace: parentNamespace,
              children: child,
              childIndex: 0,
              context: context,
              footer: ""
            }),
            ""
          );
        case REACT_PROVIDER_TYPE:
          return (
            (elementType = toArray(child.props.children)),
            (parentNamespace = {
              type: child,
              domNamespace: parentNamespace,
              children: elementType,
              childIndex: 0,
              context: context,
              footer: ""
            }),
            this.pushProvider(child),
            this.stack.push(parentNamespace),
            ""
          );
        case REACT_CONTEXT_TYPE:
          elementType = child.type;
          nextChildren$12 = child.props;
          var threadID = this.threadID;
          validateContextBounds(elementType, threadID);
          elementType = toArray(
            nextChildren$12.children(elementType[threadID])
          );
          this.stack.push({
            type: child,
            domNamespace: parentNamespace,
            children: elementType,
            childIndex: 0,
            context: context,
            footer: ""
          });
          return "";
        case REACT_FUNDAMENTAL_TYPE:
          throw Error(formatProdErrorMessage(338));
        case REACT_LAZY_TYPE:
          return (
            (elementType = child.type),
            (nextChildren$12 = elementType._init),
            (elementType = nextChildren$12(elementType._payload)),
            (child = [
              React.createElement(
                elementType,
                Object.assign({ ref: child.ref }, child.props)
              )
            ]),
            this.stack.push({
              type: null,
              domNamespace: parentNamespace,
              children: child,
              childIndex: 0,
              context: context,
              footer: ""
            }),
            ""
          );
        case REACT_SCOPE_TYPE:
          return (
            (child = toArray(child.props.children)),
            this.stack.push({
              type: null,
              domNamespace: parentNamespace,
              children: child,
              childIndex: 0,
              context: context,
              footer: ""
            }),
            ""
          );
      }
    throw Error(
      formatProdErrorMessage(
        130,
        null == elementType ? elementType : typeof elementType,
        ""
      )
    );
  };
  _proto.renderDOM = function(element, context, parentNamespace) {
    var tag = element.type.toLowerCase();
    parentNamespace === Namespaces.html && getIntrinsicNamespace(tag);
    if (!validatedTagCache.hasOwnProperty(tag)) {
      if (!VALID_TAG_REGEX.test(tag))
        throw Error(formatProdErrorMessage(65, tag));
      validatedTagCache[tag] = !0;
    }
    var props = element.props;
    if ("input" === tag)
      props = Object.assign({ type: void 0 }, props, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: null != props.value ? props.value : props.defaultValue,
        checked: null != props.checked ? props.checked : props.defaultChecked
      });
    else if ("textarea" === tag) {
      var initialValue = props.value;
      if (null == initialValue) {
        initialValue = props.defaultValue;
        var textareaChildren = props.children;
        if (null != textareaChildren) {
          if (null != initialValue) throw Error(formatProdErrorMessage(92));
          if (Array.isArray(textareaChildren)) {
            if (!(1 >= textareaChildren.length))
              throw Error(formatProdErrorMessage(93));
            textareaChildren = textareaChildren[0];
          }
          initialValue = "" + textareaChildren;
        }
        null == initialValue && (initialValue = "");
      }
      props = Object.assign({}, props, {
        value: void 0,
        children: "" + initialValue
      });
    } else if ("select" === tag)
      (this.currentSelectValue =
        null != props.value ? props.value : props.defaultValue),
        (props = Object.assign({}, props, { value: void 0 }));
    else if ("option" === tag) {
      textareaChildren = this.currentSelectValue;
      var optionChildren = flattenOptionChildren(props.children);
      if (null != textareaChildren) {
        var value = null != props.value ? props.value + "" : optionChildren;
        initialValue = !1;
        if (Array.isArray(textareaChildren))
          for (var j = 0; j < textareaChildren.length; j++) {
            if ("" + textareaChildren[j] === value) {
              initialValue = !0;
              break;
            }
          }
        else initialValue = "" + textareaChildren === value;
        props = Object.assign({ selected: void 0, children: void 0 }, props, {
          selected: initialValue,
          children: optionChildren
        });
      }
    }
    if ((initialValue = props)) {
      if (
        voidElementTags[tag] &&
        (null != initialValue.children ||
          null != initialValue.dangerouslySetInnerHTML)
      )
        throw Error(formatProdErrorMessage(137, tag));
      if (null != initialValue.dangerouslySetInnerHTML) {
        if (null != initialValue.children)
          throw Error(formatProdErrorMessage(60));
        if (
          !(
            "object" === typeof initialValue.dangerouslySetInnerHTML &&
            "__html" in initialValue.dangerouslySetInnerHTML
          )
        )
          throw Error(formatProdErrorMessage(61));
      }
      if (null != initialValue.style && "object" !== typeof initialValue.style)
        throw Error(formatProdErrorMessage(62));
    }
    initialValue = props;
    textareaChildren = this.makeStaticMarkup;
    optionChildren = 1 === this.stack.length;
    value = "<" + element.type;
    b: if (-1 === tag.indexOf("-")) j = "string" === typeof initialValue.is;
    else
      switch (tag) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          j = !1;
          break b;
        default:
          j = !0;
      }
    for (out in initialValue)
      if (
        hasOwnProperty$1.call(initialValue, out) &&
        "DEPRECATED_flareListeners" !== out
      ) {
        var propValue = initialValue[out];
        if (null != propValue) {
          if ("style" === out) {
            var styleName = void 0,
              serialized = "",
              delimiter = "";
            for (styleName in propValue)
              if (propValue.hasOwnProperty(styleName)) {
                var isCustomProperty = 0 === styleName.indexOf("--"),
                  styleValue = propValue[styleName];
                if (null != styleValue) {
                  if (isCustomProperty) var JSCompiler_temp = styleName;
                  else if (
                    ((JSCompiler_temp = styleName),
                    styleNameCache.hasOwnProperty(JSCompiler_temp))
                  )
                    JSCompiler_temp = styleNameCache[JSCompiler_temp];
                  else {
                    var result = JSCompiler_temp.replace(
                      uppercasePattern,
                      "-$1"
                    )
                      .toLowerCase()
                      .replace(msPattern, "-ms-");
                    JSCompiler_temp = styleNameCache[JSCompiler_temp] = result;
                  }
                  serialized += delimiter + JSCompiler_temp + ":";
                  delimiter = styleName;
                  isCustomProperty =
                    null == styleValue ||
                    "boolean" === typeof styleValue ||
                    "" === styleValue
                      ? ""
                      : isCustomProperty ||
                        "number" !== typeof styleValue ||
                        0 === styleValue ||
                        (isUnitlessNumber.hasOwnProperty(delimiter) &&
                          isUnitlessNumber[delimiter])
                      ? ("" + styleValue).trim()
                      : styleValue + "px";
                  serialized += isCustomProperty;
                  delimiter = ";";
                }
              }
            propValue = serialized || null;
          }
          styleName = null;
          j
            ? RESERVED_PROPS.hasOwnProperty(out) ||
              ((styleName = out),
              (styleName =
                isAttributeNameSafe(styleName) && null != propValue
                  ? styleName + '="' + (escapeTextForBrowser(propValue) + '"')
                  : ""))
            : (styleName = createMarkupForProperty(out, propValue));
          styleName && (value += " " + styleName);
        }
      }
    textareaChildren || (optionChildren && (value += ' data-reactroot=""'));
    var out = value;
    initialValue = "";
    omittedCloseTags.hasOwnProperty(tag)
      ? (out += "/>")
      : ((out += ">"), (initialValue = "</" + element.type + ">"));
    a: {
      textareaChildren = props.dangerouslySetInnerHTML;
      if (null != textareaChildren) {
        if (null != textareaChildren.__html) {
          textareaChildren = textareaChildren.__html;
          break a;
        }
      } else if (
        ((textareaChildren = props.children),
        "string" === typeof textareaChildren ||
          "number" === typeof textareaChildren)
      ) {
        textareaChildren = escapeTextForBrowser(textareaChildren);
        break a;
      }
      textareaChildren = null;
    }
    null != textareaChildren
      ? ((props = []),
        newlineEatingTags.hasOwnProperty(tag) &&
          "\n" === textareaChildren.charAt(0) &&
          (out += "\n"),
        (out += textareaChildren))
      : (props = toArray(props.children));
    element = element.type;
    parentNamespace =
      null == parentNamespace ||
      "http://www.w3.org/1999/xhtml" === parentNamespace
        ? getIntrinsicNamespace(element)
        : "http://www.w3.org/2000/svg" === parentNamespace &&
          "foreignObject" === element
        ? "http://www.w3.org/1999/xhtml"
        : parentNamespace;
    this.stack.push({
      domNamespace: parentNamespace,
      type: tag,
      children: props,
      childIndex: 0,
      context: context,
      footer: initialValue
    });
    this.previousWasTextNode = !1;
    return out;
  };
  return ReactDOMServerRenderer;
})();
exports.renderToNodeStream = function() {
  throw Error(formatProdErrorMessage(207));
};
exports.renderToStaticMarkup = function(element, options) {
  element = new ReactDOMServerRenderer(element, !0, options);
  try {
    return element.read(Infinity);
  } finally {
    element.destroy();
  }
};
exports.renderToStaticNodeStream = function() {
  throw Error(formatProdErrorMessage(208));
};
exports.renderToString = function(element, options) {
  element = new ReactDOMServerRenderer(element, !1, options);
  try {
    return element.read(Infinity);
  } finally {
    element.destroy();
  }
};
exports.version = "16.13.1";
