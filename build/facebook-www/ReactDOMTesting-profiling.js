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

/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
"use strict";
var React = require("react"),
  Scheduler = require("scheduler");
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
if (!React) throw Error(formatProdErrorMessage(227));
var ReactFbErrorUtils = require("ReactFbErrorUtils");
if ("function" !== typeof ReactFbErrorUtils.invokeGuardedCallback)
  throw Error(formatProdErrorMessage(255));
function invokeGuardedCallbackImpl(name, func, context, a, b, c, d, e, f) {
  ReactFbErrorUtils.invokeGuardedCallback.apply(this, arguments);
}
var hasError = !1,
  caughtError = null,
  hasRethrowError = !1,
  rethrowError = null,
  reporter = {
    onError: function(error) {
      hasError = !0;
      caughtError = error;
    }
  };
function invokeGuardedCallback(name, func, context, a, b, c, d, e, f) {
  hasError = !1;
  caughtError = null;
  invokeGuardedCallbackImpl.apply(reporter, arguments);
}
function invokeGuardedCallbackAndCatchFirstError(
  name,
  func,
  context,
  a,
  b,
  c,
  d,
  e,
  f
) {
  invokeGuardedCallback.apply(this, arguments);
  if (hasError) {
    if (hasError) {
      var error = caughtError;
      hasError = !1;
      caughtError = null;
    } else throw Error(formatProdErrorMessage(198));
    hasRethrowError || ((hasRethrowError = !0), (rethrowError = error));
  }
}
var getFiberCurrentPropsFromNode = null,
  getInstanceFromNode = null,
  getNodeFromInstance = null;
function executeDispatch(event, listener, inst) {
  var type = event.type || "unknown-event";
  event.currentTarget = void 0 !== inst.tag ? getNodeFromInstance(inst) : inst;
  invokeGuardedCallbackAndCatchFirstError(type, listener, void 0, event);
  event.currentTarget = null;
}
var eventPluginOrder = null,
  namesToPlugins = {};
function recomputePluginOrdering() {
  if (eventPluginOrder)
    for (var pluginName in namesToPlugins) {
      var pluginModule = namesToPlugins[pluginName],
        pluginIndex = eventPluginOrder.indexOf(pluginName);
      if (!(-1 < pluginIndex))
        throw Error(formatProdErrorMessage(96, pluginName));
      if (!plugins[pluginIndex]) {
        if (!pluginModule.extractEvents)
          throw Error(formatProdErrorMessage(97, pluginName));
        plugins[pluginIndex] = pluginModule;
        pluginIndex = pluginModule.eventTypes;
        for (var eventName in pluginIndex) {
          var JSCompiler_inline_result = void 0;
          var dispatchConfig = pluginIndex[eventName],
            eventName$jscomp$0 = eventName;
          if (eventNameDispatchConfigs.hasOwnProperty(eventName$jscomp$0))
            throw Error(formatProdErrorMessage(99, eventName$jscomp$0));
          eventNameDispatchConfigs[eventName$jscomp$0] = dispatchConfig;
          var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
          if (phasedRegistrationNames) {
            for (JSCompiler_inline_result in phasedRegistrationNames)
              phasedRegistrationNames.hasOwnProperty(
                JSCompiler_inline_result
              ) &&
                publishRegistrationName(
                  phasedRegistrationNames[JSCompiler_inline_result],
                  pluginModule,
                  eventName$jscomp$0
                );
            JSCompiler_inline_result = !0;
          } else
            dispatchConfig.registrationName
              ? (publishRegistrationName(
                  dispatchConfig.registrationName,
                  pluginModule,
                  eventName$jscomp$0
                ),
                (JSCompiler_inline_result = !0))
              : (JSCompiler_inline_result = !1);
          if (!JSCompiler_inline_result)
            throw Error(formatProdErrorMessage(98, eventName, pluginName));
        }
      }
    }
}
function publishRegistrationName(registrationName, pluginModule, eventName) {
  if (registrationNameModules[registrationName])
    throw Error(formatProdErrorMessage(100, registrationName));
  registrationNameModules[registrationName] = pluginModule;
  registrationNameDependencies[registrationName] =
    pluginModule.eventTypes[eventName].dependencies;
}
var plugins = [],
  eventNameDispatchConfigs = {},
  registrationNameModules = {},
  registrationNameDependencies = {};
function injectEventPluginsByName(injectedNamesToPlugins) {
  var isOrderingDirty = !1,
    pluginName;
  for (pluginName in injectedNamesToPlugins)
    if (injectedNamesToPlugins.hasOwnProperty(pluginName)) {
      var pluginModule = injectedNamesToPlugins[pluginName];
      if (
        !namesToPlugins.hasOwnProperty(pluginName) ||
        namesToPlugins[pluginName] !== pluginModule
      ) {
        if (namesToPlugins[pluginName])
          throw Error(formatProdErrorMessage(102, pluginName));
        namesToPlugins[pluginName] = pluginModule;
        isOrderingDirty = !0;
      }
    }
  isOrderingDirty && recomputePluginOrdering();
}
var canUseDOM = !(
    "undefined" === typeof window ||
    "undefined" === typeof window.document ||
    "undefined" === typeof window.document.createElement
  ),
  restoreImpl = null,
  restoreTarget = null,
  restoreQueue = null;
function restoreStateOfTarget(target) {
  if ((target = getInstanceFromNode(target))) {
    if ("function" !== typeof restoreImpl)
      throw Error(formatProdErrorMessage(280));
    var stateNode = target.stateNode;
    stateNode &&
      ((stateNode = getFiberCurrentPropsFromNode(stateNode)),
      restoreImpl(target.stateNode, target.type, stateNode));
  }
}
function enqueueStateRestore(target) {
  restoreTarget
    ? restoreQueue
      ? restoreQueue.push(target)
      : (restoreQueue = [target])
    : (restoreTarget = target);
}
function restoreStateIfNeeded() {
  if (restoreTarget) {
    var target = restoreTarget,
      queuedTargets = restoreQueue;
    restoreQueue = restoreTarget = null;
    restoreStateOfTarget(target);
    if (queuedTargets)
      for (target = 0; target < queuedTargets.length; target++)
        restoreStateOfTarget(queuedTargets[target]);
  }
}
function batchedUpdatesImpl(fn, bookkeeping) {
  return fn(bookkeeping);
}
function discreteUpdatesImpl(fn, a, b, c, d) {
  return fn(a, b, c, d);
}
function flushDiscreteUpdatesImpl() {}
var batchedEventUpdatesImpl = batchedUpdatesImpl,
  isInsideEventHandler = !1,
  isBatchingEventUpdates = !1;
function finishEventHandler() {
  if (null !== restoreTarget || null !== restoreQueue)
    flushDiscreteUpdatesImpl(), restoreStateIfNeeded();
}
function batchedEventUpdates(fn, a, b) {
  if (isBatchingEventUpdates) return fn(a, b);
  isBatchingEventUpdates = !0;
  try {
    return batchedEventUpdatesImpl(fn, a, b);
  } finally {
    (isBatchingEventUpdates = !1), finishEventHandler();
  }
}
function executeUserEventHandler(fn, value) {
  var previouslyInEventHandler = isInsideEventHandler;
  try {
    (isInsideEventHandler = !0),
      invokeGuardedCallbackAndCatchFirstError(
        "object" === typeof value && null !== value ? value.type : "",
        fn,
        void 0,
        value
      );
  } finally {
    isInsideEventHandler = previouslyInEventHandler;
  }
}
function discreteUpdates(fn, a, b, c, d) {
  var prevIsInsideEventHandler = isInsideEventHandler;
  isInsideEventHandler = !0;
  try {
    return discreteUpdatesImpl(fn, a, b, c, d);
  } finally {
    (isInsideEventHandler = prevIsInsideEventHandler) || finishEventHandler();
  }
}
var lastFlushedEventTimeStamp = 0;
function flushDiscreteUpdatesIfNeeded(timeStamp) {
  isInsideEventHandler ||
    (0 !== timeStamp && lastFlushedEventTimeStamp === timeStamp) ||
    ((lastFlushedEventTimeStamp = timeStamp), flushDiscreteUpdatesImpl());
}
var UserBlockingPriority = Scheduler.unstable_UserBlockingPriority,
  runWithPriority = Scheduler.unstable_runWithPriority,
  listenToResponderEventTypesImpl,
  rootEventTypesToEventResponderInstances = new Map(),
  currentTimeStamp = 0,
  currentInstance = null,
  currentDocument = null,
  currentPropagationBehavior = 0,
  eventResponderContext = {
    dispatchEvent: function(eventValue, eventListener, eventPriority) {
      validateResponderContext();
      validateEventValue(eventValue);
      switch (eventPriority) {
        case 0:
          flushDiscreteUpdatesIfNeeded(currentTimeStamp);
          discreteUpdates(function() {
            return executeUserEventHandler(eventListener, eventValue);
          });
          break;
        case 1:
          runWithPriority(UserBlockingPriority, function() {
            return executeUserEventHandler(eventListener, eventValue);
          });
          break;
        case 2:
          executeUserEventHandler(eventListener, eventValue);
      }
    },
    isTargetWithinResponder: function(target) {
      validateResponderContext();
      if (null != target) {
        target = getClosestInstanceFromNode(target);
        for (var responderFiber = currentInstance.fiber; null !== target; ) {
          if (target === responderFiber || target.alternate === responderFiber)
            return !0;
          target = target.return;
        }
      }
      return !1;
    },
    isTargetWithinResponderScope: function(target) {
      validateResponderContext();
      var responder = currentInstance.responder;
      if (null != target) {
        target = getClosestInstanceFromNode(target);
        for (var responderFiber = currentInstance.fiber; null !== target; ) {
          if (target === responderFiber || target.alternate === responderFiber)
            return !0;
          a: {
            var JSCompiler_inline_result = target.tag;
            if (
              5 === JSCompiler_inline_result ||
              21 === JSCompiler_inline_result
            )
              if (
                ((JSCompiler_inline_result = target.dependencies),
                null !== JSCompiler_inline_result &&
                  ((JSCompiler_inline_result =
                    JSCompiler_inline_result.responders),
                  null !== JSCompiler_inline_result &&
                    JSCompiler_inline_result.has(responder)))
              ) {
                JSCompiler_inline_result = !0;
                break a;
              }
            JSCompiler_inline_result = !1;
          }
          if (JSCompiler_inline_result) break;
          target = target.return;
        }
      }
      return !1;
    },
    isTargetWithinNode: function(childTarget, parentTarget) {
      validateResponderContext();
      var childFiber = getClosestInstanceFromNode(childTarget),
        parentFiber = getClosestInstanceFromNode(parentTarget);
      if (null != childFiber && null != parentFiber) {
        for (childTarget = parentFiber.alternate; null !== childFiber; ) {
          if (childFiber === parentFiber || childFiber === childTarget)
            return !0;
          childFiber = childFiber.return;
        }
        return !1;
      }
      return parentTarget.contains(childTarget);
    },
    addRootEventTypes: function(rootEventTypes) {
      validateResponderContext();
      listenToResponderEventTypesImpl(rootEventTypes, currentDocument);
      for (var i = 0; i < rootEventTypes.length; i++) {
        var rootEventType = rootEventTypes[i],
          eventResponderInstance = currentInstance,
          rootEventResponderInstances = rootEventTypesToEventResponderInstances.get(
            rootEventType
          );
        void 0 === rootEventResponderInstances &&
          ((rootEventResponderInstances = new Set()),
          rootEventTypesToEventResponderInstances.set(
            rootEventType,
            rootEventResponderInstances
          ));
        var rootEventTypesSet = eventResponderInstance.rootEventTypes;
        null === rootEventTypesSet &&
          (rootEventTypesSet = eventResponderInstance.rootEventTypes = new Set());
        if (rootEventTypesSet.has(rootEventType))
          throw Error(formatProdErrorMessage(325, rootEventType));
        rootEventTypesSet.add(rootEventType);
        rootEventResponderInstances.add(eventResponderInstance);
      }
    },
    removeRootEventTypes: function(rootEventTypes) {
      validateResponderContext();
      for (var i = 0; i < rootEventTypes.length; i++) {
        var rootEventType = rootEventTypes[i],
          rootEventResponders = rootEventTypesToEventResponderInstances.get(
            rootEventType
          ),
          rootEventTypesSet = currentInstance.rootEventTypes;
        null !== rootEventTypesSet && rootEventTypesSet.delete(rootEventType);
        void 0 !== rootEventResponders &&
          rootEventResponders.delete(currentInstance);
      }
    },
    getActiveDocument: getActiveDocument,
    objectAssign: Object.assign,
    getTimeStamp: function() {
      validateResponderContext();
      return currentTimeStamp;
    },
    isTargetWithinHostComponent: function(target, elementType) {
      validateResponderContext();
      for (target = getClosestInstanceFromNode(target); null !== target; ) {
        if (5 === target.tag && target.type === elementType) return !0;
        target = target.return;
      }
      return !1;
    },
    continuePropagation: function() {
      currentPropagationBehavior = 1;
    },
    enqueueStateRestore: enqueueStateRestore,
    getResponderNode: function() {
      validateResponderContext();
      var responderFiber = currentInstance.fiber;
      return 21 === responderFiber.tag ? null : responderFiber.stateNode;
    }
  };
function validateEventValue(eventValue) {
  if ("object" === typeof eventValue && null !== eventValue) {
    var type = eventValue.type,
      timeStamp = eventValue.timeStamp;
    if (null == eventValue.target || null == type || null == timeStamp)
      throw Error(
        'context.dispatchEvent: "target", "timeStamp", and "type" fields on event object are required.'
      );
    eventValue.isDefaultPrevented = function() {};
    eventValue.isPropagationStopped = function() {};
    Object.defineProperty(eventValue, "nativeEvent", { get: function() {} });
  }
}
function getActiveDocument() {
  return currentDocument;
}
function unmountEventResponder(responderInstance) {
  var onUnmount = responderInstance.responder.onUnmount;
  if (null !== onUnmount) {
    var props = responderInstance.props,
      state = responderInstance.state,
      previousInstance = currentInstance;
    currentInstance = responderInstance;
    try {
      onUnmount(eventResponderContext, props, state);
    } finally {
      currentInstance = previousInstance;
    }
  }
  onUnmount = responderInstance.rootEventTypes;
  if (null !== onUnmount)
    for (
      onUnmount = Array.from(onUnmount), props = 0;
      props < onUnmount.length;
      props++
    )
      (state = rootEventTypesToEventResponderInstances.get(onUnmount[props])),
        void 0 !== state && state.delete(responderInstance);
}
function validateResponderContext() {
  if (null === currentInstance) throw Error(formatProdErrorMessage(346));
}
function DEPRECATED_dispatchEventForResponderEventSystem(
  topLevelType,
  targetFiber,
  nativeEvent,
  nativeEventTarget,
  eventSystemFlags
) {
  var previousInstance = currentInstance,
    previousTimeStamp = currentTimeStamp,
    previousDocument = currentDocument,
    previousPropagationBehavior = currentPropagationBehavior;
  currentPropagationBehavior = 0;
  currentDocument =
    9 === nativeEventTarget.nodeType
      ? nativeEventTarget
      : nativeEventTarget.ownerDocument;
  currentTimeStamp = nativeEvent.timeStamp;
  try {
    batchedEventUpdates(function() {
      var isPassiveEvent = 0 !== (eventSystemFlags & 4),
        isPassiveSupported = 0 === (eventSystemFlags & 16);
      isPassiveSupported = isPassiveEvent || !isPassiveSupported;
      var visitedResponders = new Set(),
        buttons = nativeEvent.buttons,
        pointerType = nativeEvent.pointerType,
        eventPointerType = "";
      void 0 !== pointerType
        ? (eventPointerType = pointerType)
        : void 0 !== nativeEvent.key
        ? (eventPointerType = "keyboard")
        : void 0 !== buttons
        ? (eventPointerType = "mouse")
        : void 0 !== nativeEvent.changedTouches && (eventPointerType = "touch");
      isPassiveEvent = {
        nativeEvent: nativeEvent,
        passive: isPassiveEvent,
        pointerType: eventPointerType,
        target: nativeEventTarget,
        type: topLevelType
      };
      buttons = targetFiber;
      for (pointerType = !1; null !== buttons; ) {
        var _node = buttons;
        eventPointerType = _node.dependencies;
        _node = _node.tag;
        if (4 === _node) pointerType = !0;
        else if (
          (5 === _node || 21 === _node) &&
          null !== eventPointerType &&
          ((eventPointerType = eventPointerType.responders),
          null !== eventPointerType)
        ) {
          eventPointerType = Array.from(eventPointerType.values());
          _node = 0;
          for (var length = eventPointerType.length; _node < length; _node++) {
            var responderInstance = eventPointerType[_node],
              props = responderInstance.props,
              responder = responderInstance.responder,
              state = responderInstance.state,
              JSCompiler_temp;
            if ((JSCompiler_temp = !visitedResponders.has(responder)))
              if (
                ((JSCompiler_temp = responder.targetEventTypes),
                null !== JSCompiler_temp)
              )
                a: {
                  for (var i = 0, len = JSCompiler_temp.length; i < len; i++) {
                    var eventType = JSCompiler_temp[i];
                    if (
                      eventType === topLevelType ||
                      (!isPassiveSupported &&
                        eventType === topLevelType + "_active")
                    ) {
                      JSCompiler_temp = !0;
                      break a;
                    }
                  }
                  JSCompiler_temp = !1;
                }
              else JSCompiler_temp = !1;
            !JSCompiler_temp ||
              (pointerType && !responder.targetPortalPropagation) ||
              (visitedResponders.add(responder),
              (JSCompiler_temp = responder.onEvent),
              null !== JSCompiler_temp &&
                ((currentInstance = responderInstance),
                JSCompiler_temp(
                  isPassiveEvent,
                  eventResponderContext,
                  props,
                  state
                ),
                1 === currentPropagationBehavior &&
                  (visitedResponders.delete(responder),
                  (currentPropagationBehavior = 0))));
          }
        }
        buttons = buttons.return;
      }
      buttons = rootEventTypesToEventResponderInstances.get(topLevelType);
      visitedResponders = [];
      void 0 !== buttons &&
        visitedResponders.push.apply(visitedResponders, Array.from(buttons));
      isPassiveSupported ||
        ((isPassiveSupported = rootEventTypesToEventResponderInstances.get(
          topLevelType + "_active"
        )),
        void 0 !== isPassiveSupported &&
          visitedResponders.push.apply(
            visitedResponders,
            Array.from(isPassiveSupported)
          ));
      if (0 < visitedResponders.length)
        for (
          isPassiveSupported = Array.from(visitedResponders),
            visitedResponders = 0;
          visitedResponders < isPassiveSupported.length;
          visitedResponders++
        )
          (buttons = isPassiveSupported[visitedResponders]),
            (pointerType = buttons.props),
            (eventPointerType = buttons.state),
            (_node = buttons.responder.onRootEvent),
            null !== _node &&
              ((currentInstance = buttons),
              _node(
                isPassiveEvent,
                eventResponderContext,
                pointerType,
                eventPointerType
              ));
    });
  } finally {
    (currentInstance = previousInstance),
      (currentTimeStamp = previousTimeStamp),
      (currentDocument = previousDocument),
      (currentPropagationBehavior = previousPropagationBehavior);
  }
}
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
  if (null !== propertyInfo)
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
  return !1;
}
function PropertyInfoRecord(
  name,
  type,
  mustUseProperty,
  attributeName,
  attributeNamespace,
  sanitizeURL
) {
  this.acceptsBooleans = 2 === type || 3 === type || 4 === type;
  this.attributeName = attributeName;
  this.attributeNamespace = attributeNamespace;
  this.mustUseProperty = mustUseProperty;
  this.propertyName = name;
  this.type = type;
  this.sanitizeURL = sanitizeURL;
}
var properties = {},
  reservedProps = "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(
    " "
  );
reservedProps.push("DEPRECATED_flareListeners");
reservedProps.forEach(function(name) {
  properties[name] = new PropertyInfoRecord(name, 0, !1, name, null, !1);
});
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"]
].forEach(function(_ref) {
  var name = _ref[0];
  properties[name] = new PropertyInfoRecord(name, 1, !1, _ref[1], null, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(
    name,
    2,
    !1,
    name.toLowerCase(),
    null,
    !1
  );
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha"
].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(name, 2, !1, name, null, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function(name) {
    properties[name] = new PropertyInfoRecord(
      name,
      3,
      !1,
      name.toLowerCase(),
      null,
      !1
    );
  });
["checked", "multiple", "muted", "selected"].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(name, 3, !0, name, null, !1);
});
["capture", "download"].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(name, 4, !1, name, null, !1);
});
["cols", "rows", "size", "span"].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(name, 6, !1, name, null, !1);
});
["rowSpan", "start"].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(
    name,
    5,
    !1,
    name.toLowerCase(),
    null,
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
    !1
  );
});
properties.xlinkHref = new PropertyInfoRecord(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0
);
["src", "href", "action", "formAction"].forEach(function(attributeName) {
  properties[attributeName] = new PropertyInfoRecord(
    attributeName,
    1,
    !1,
    attributeName.toLowerCase(),
    null,
    !0
  );
});
var ReactSharedInternals =
    React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
function setValueForProperty(node, name, value, isCustomComponentTag) {
  var JSCompiler_inline_result = properties.hasOwnProperty(name)
    ? properties[name]
    : null;
  var JSCompiler_inline_result$jscomp$0 =
    null !== JSCompiler_inline_result
      ? 0 === JSCompiler_inline_result.type
      : isCustomComponentTag
      ? !1
      : !(2 < name.length) ||
        ("o" !== name[0] && "O" !== name[0]) ||
        ("n" !== name[1] && "N" !== name[1])
      ? !1
      : !0;
  if (!JSCompiler_inline_result$jscomp$0)
    if (
      (shouldRemoveAttribute(
        name,
        value,
        JSCompiler_inline_result,
        isCustomComponentTag
      ) && (value = null),
      isCustomComponentTag || null === JSCompiler_inline_result)
    )
      isAttributeNameSafe(name) &&
        (null === value
          ? node.removeAttribute(name)
          : node.setAttribute(name, "" + value));
    else if (JSCompiler_inline_result.mustUseProperty)
      node[JSCompiler_inline_result.propertyName] =
        null === value
          ? 3 === JSCompiler_inline_result.type
            ? !1
            : ""
          : value;
    else if (
      ((name = JSCompiler_inline_result.attributeName),
      (isCustomComponentTag = JSCompiler_inline_result.attributeNamespace),
      null === value)
    )
      node.removeAttribute(name);
    else {
      JSCompiler_inline_result$jscomp$0 = JSCompiler_inline_result.type;
      if (
        3 === JSCompiler_inline_result$jscomp$0 ||
        (4 === JSCompiler_inline_result$jscomp$0 && !0 === value)
      )
        value = "";
      else if (
        ((value = "" + value),
        JSCompiler_inline_result.sanitizeURL &&
          isJavaScriptProtocol.test(value.toString()))
      )
        throw Error(formatProdErrorMessage(323, ""));
      isCustomComponentTag
        ? node.setAttributeNS(isCustomComponentTag, name, value)
        : node.setAttribute(name, value);
    }
}
var BEFORE_SLASH_RE = /^(.*)[\\\/]/,
  REACT_ELEMENT_TYPE = 60103,
  REACT_PORTAL_TYPE = 60106,
  REACT_FRAGMENT_TYPE = 60107,
  REACT_STRICT_MODE_TYPE = 60108,
  REACT_PROFILER_TYPE = 60114,
  REACT_PROVIDER_TYPE = 60109,
  REACT_CONTEXT_TYPE = 60110,
  REACT_CONCURRENT_MODE_TYPE = 60111,
  REACT_FORWARD_REF_TYPE = 60112,
  REACT_SUSPENSE_TYPE = 60113,
  REACT_SUSPENSE_LIST_TYPE = 60120,
  REACT_MEMO_TYPE = 60115,
  REACT_LAZY_TYPE = 60116,
  REACT_BLOCK_TYPE = 60121,
  REACT_RESPONDER_TYPE = 60118,
  REACT_SCOPE_TYPE = 60119;
if ("function" === typeof Symbol && Symbol.for) {
  var symbolFor = Symbol.for;
  REACT_ELEMENT_TYPE = symbolFor("react.element");
  REACT_PORTAL_TYPE = symbolFor("react.portal");
  REACT_FRAGMENT_TYPE = symbolFor("react.fragment");
  REACT_STRICT_MODE_TYPE = symbolFor("react.strict_mode");
  REACT_PROFILER_TYPE = symbolFor("react.profiler");
  REACT_PROVIDER_TYPE = symbolFor("react.provider");
  REACT_CONTEXT_TYPE = symbolFor("react.context");
  REACT_CONCURRENT_MODE_TYPE = symbolFor("react.concurrent_mode");
  REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref");
  REACT_SUSPENSE_TYPE = symbolFor("react.suspense");
  REACT_SUSPENSE_LIST_TYPE = symbolFor("react.suspense_list");
  REACT_MEMO_TYPE = symbolFor("react.memo");
  REACT_LAZY_TYPE = symbolFor("react.lazy");
  REACT_BLOCK_TYPE = symbolFor("react.block");
  symbolFor("react.fundamental");
  REACT_RESPONDER_TYPE = symbolFor("react.responder");
  REACT_SCOPE_TYPE = symbolFor("react.scope");
}
var MAYBE_ITERATOR_SYMBOL = "function" === typeof Symbol && Symbol.iterator;
function getIteratorFn(maybeIterable) {
  if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
  maybeIterable =
    (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
    maybeIterable["@@iterator"];
  return "function" === typeof maybeIterable ? maybeIterable : null;
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
function getStackByFiberInDevAndProd(workInProgress) {
  var info = "";
  do {
    a: switch (workInProgress.tag) {
      case 3:
      case 4:
      case 6:
      case 7:
      case 10:
      case 9:
        var JSCompiler_inline_result = "";
        break a;
      default:
        var owner = workInProgress._debugOwner,
          source = workInProgress._debugSource,
          name = getComponentName(workInProgress.type);
        JSCompiler_inline_result = null;
        owner && (JSCompiler_inline_result = getComponentName(owner.type));
        owner = name;
        name = "";
        source
          ? (name =
              " (at " +
              source.fileName.replace(BEFORE_SLASH_RE, "") +
              ":" +
              source.lineNumber +
              ")")
          : JSCompiler_inline_result &&
            (name = " (created by " + JSCompiler_inline_result + ")");
        JSCompiler_inline_result = "\n    in " + (owner || "Unknown") + name;
    }
    info += JSCompiler_inline_result;
    workInProgress = workInProgress.return;
  } while (workInProgress);
  return info;
}
function getToStringValue(value) {
  switch (typeof value) {
    case "boolean":
    case "number":
    case "object":
    case "string":
    case "undefined":
      return value;
    default:
      return "";
  }
}
function isCheckable(elem) {
  var type = elem.type;
  return (
    (elem = elem.nodeName) &&
    "input" === elem.toLowerCase() &&
    ("checkbox" === type || "radio" === type)
  );
}
function trackValueOnNode(node) {
  var valueField = isCheckable(node) ? "checked" : "value",
    descriptor = Object.getOwnPropertyDescriptor(
      node.constructor.prototype,
      valueField
    ),
    currentValue = "" + node[valueField];
  if (
    !node.hasOwnProperty(valueField) &&
    "undefined" !== typeof descriptor &&
    "function" === typeof descriptor.get &&
    "function" === typeof descriptor.set
  ) {
    var get = descriptor.get,
      set = descriptor.set;
    Object.defineProperty(node, valueField, {
      configurable: !0,
      get: function() {
        return get.call(this);
      },
      set: function(value) {
        currentValue = "" + value;
        set.call(this, value);
      }
    });
    Object.defineProperty(node, valueField, {
      enumerable: descriptor.enumerable
    });
    return {
      getValue: function() {
        return currentValue;
      },
      setValue: function(value) {
        currentValue = "" + value;
      },
      stopTracking: function() {
        node._valueTracker = null;
        delete node[valueField];
      }
    };
  }
}
function track(node) {
  node._valueTracker || (node._valueTracker = trackValueOnNode(node));
}
function updateValueIfChanged(node) {
  if (!node) return !1;
  var tracker = node._valueTracker;
  if (!tracker) return !0;
  var lastValue = tracker.getValue();
  var value = "";
  node &&
    (value = isCheckable(node)
      ? node.checked
        ? "true"
        : "false"
      : node.value);
  node = value;
  return node !== lastValue ? (tracker.setValue(node), !0) : !1;
}
function getHostProps(element, props) {
  var checked = props.checked;
  return Object.assign({}, props, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: null != checked ? checked : element._wrapperState.initialChecked
  });
}
function initWrapperState(element, props) {
  var defaultValue = null == props.defaultValue ? "" : props.defaultValue,
    JSCompiler_temp_const =
      null != props.checked ? props.checked : props.defaultChecked;
  defaultValue = getToStringValue(
    null != props.value ? props.value : defaultValue
  );
  element._wrapperState = {
    initialChecked: JSCompiler_temp_const,
    initialValue: defaultValue,
    controlled:
      "checkbox" === props.type || "radio" === props.type
        ? null != props.checked
        : null != props.value
  };
}
function updateChecked(element, props) {
  props = props.checked;
  null != props && setValueForProperty(element, "checked", props, !1);
}
function updateWrapper(element, props) {
  updateChecked(element, props);
  var value = getToStringValue(props.value),
    type = props.type;
  if (null != value)
    if ("number" === type) {
      if ((0 === value && "" === element.value) || element.value != value)
        element.value = "" + value;
    } else element.value !== "" + value && (element.value = "" + value);
  else if ("submit" === type || "reset" === type) {
    element.removeAttribute("value");
    return;
  }
  props.hasOwnProperty("value")
    ? setDefaultValue(element, props.type, value)
    : props.hasOwnProperty("defaultValue") &&
      setDefaultValue(
        element,
        props.type,
        getToStringValue(props.defaultValue)
      );
  null == props.checked &&
    null != props.defaultChecked &&
    (element.defaultChecked = !!props.defaultChecked);
}
function postMountWrapper(element, props, isHydrating) {
  if (props.hasOwnProperty("value") || props.hasOwnProperty("defaultValue")) {
    var type = props.type;
    if (
      !(
        ("submit" !== type && "reset" !== type) ||
        (void 0 !== props.value && null !== props.value)
      )
    )
      return;
    props = "" + element._wrapperState.initialValue;
    isHydrating || props === element.value || (element.value = props);
    element.defaultValue = props;
  }
  isHydrating = element.name;
  "" !== isHydrating && (element.name = "");
  element.defaultChecked = !!element._wrapperState.initialChecked;
  "" !== isHydrating && (element.name = isHydrating);
}
function setDefaultValue(node, type, value) {
  if ("number" !== type || node.ownerDocument.activeElement !== node)
    null == value
      ? (node.defaultValue = "" + node._wrapperState.initialValue)
      : node.defaultValue !== "" + value && (node.defaultValue = "" + value);
}
function flattenChildren(children) {
  var content = "";
  React.Children.forEach(children, function(child) {
    null != child && (content += child);
  });
  return content;
}
function getHostProps$1(element, props) {
  element = Object.assign({ children: void 0 }, props);
  if ((props = flattenChildren(props.children))) element.children = props;
  return element;
}
function updateOptions(node, multiple, propValue, setDefaultSelected) {
  node = node.options;
  if (multiple) {
    multiple = {};
    for (var i = 0; i < propValue.length; i++)
      multiple["$" + propValue[i]] = !0;
    for (propValue = 0; propValue < node.length; propValue++)
      (i = multiple.hasOwnProperty("$" + node[propValue].value)),
        node[propValue].selected !== i && (node[propValue].selected = i),
        i && setDefaultSelected && (node[propValue].defaultSelected = !0);
  } else {
    propValue = "" + getToStringValue(propValue);
    multiple = null;
    for (i = 0; i < node.length; i++) {
      if (node[i].value === propValue) {
        node[i].selected = !0;
        setDefaultSelected && (node[i].defaultSelected = !0);
        return;
      }
      null !== multiple || node[i].disabled || (multiple = node[i]);
    }
    null !== multiple && (multiple.selected = !0);
  }
}
function getHostProps$3(element, props) {
  if (null != props.dangerouslySetInnerHTML)
    throw Error(formatProdErrorMessage(91));
  return Object.assign({}, props, {
    value: void 0,
    defaultValue: void 0,
    children: "" + element._wrapperState.initialValue
  });
}
function initWrapperState$2(element, props) {
  var initialValue = props.value;
  null == initialValue &&
    ((props = props.defaultValue),
    null == props && (props = ""),
    (initialValue = props));
  element._wrapperState = { initialValue: getToStringValue(initialValue) };
}
function updateWrapper$1(element, props) {
  var value = getToStringValue(props.value),
    defaultValue = getToStringValue(props.defaultValue);
  null != value &&
    ((value = "" + value),
    value !== element.value && (element.value = value),
    null == props.defaultValue &&
      element.defaultValue !== value &&
      (element.defaultValue = value));
  null != defaultValue && (element.defaultValue = "" + defaultValue);
}
function postMountWrapper$3(element) {
  var textContent = element.textContent;
  textContent === element._wrapperState.initialValue &&
    "" !== textContent &&
    null !== textContent &&
    (element.value = textContent);
}
var Namespaces = {
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
function getChildNamespace(parentNamespace, type) {
  return null == parentNamespace ||
    "http://www.w3.org/1999/xhtml" === parentNamespace
    ? getIntrinsicNamespace(type)
    : "http://www.w3.org/2000/svg" === parentNamespace &&
      "foreignObject" === type
    ? "http://www.w3.org/1999/xhtml"
    : parentNamespace;
}
var reusableSVGContainer,
  setInnerHTML = (function(func) {
    return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction
      ? function(arg0, arg1, arg2, arg3) {
          MSApp.execUnsafeLocalFunction(function() {
            return func(arg0, arg1, arg2, arg3);
          });
        }
      : func;
  })(function(node, html) {
    if (node.namespaceURI !== Namespaces.svg || "innerHTML" in node)
      node.innerHTML = html;
    else {
      reusableSVGContainer =
        reusableSVGContainer || document.createElement("div");
      reusableSVGContainer.innerHTML =
        "<svg>" + html.valueOf().toString() + "</svg>";
      for (html = reusableSVGContainer.firstChild; node.firstChild; )
        node.removeChild(node.firstChild);
      for (; html.firstChild; ) node.appendChild(html.firstChild);
    }
  });
function setTextContent(node, text) {
  if (text) {
    var firstChild = node.firstChild;
    if (
      firstChild &&
      firstChild === node.lastChild &&
      3 === firstChild.nodeType
    ) {
      firstChild.nodeValue = text;
      return;
    }
  }
  node.textContent = text;
}
function makePrefixMap(styleProp, eventName) {
  var prefixes = {};
  prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
  prefixes["Webkit" + styleProp] = "webkit" + eventName;
  prefixes["Moz" + styleProp] = "moz" + eventName;
  return prefixes;
}
var vendorPrefixes = {
    animationend: makePrefixMap("Animation", "AnimationEnd"),
    animationiteration: makePrefixMap("Animation", "AnimationIteration"),
    animationstart: makePrefixMap("Animation", "AnimationStart"),
    transitionend: makePrefixMap("Transition", "TransitionEnd")
  },
  prefixedEventNames = {},
  style = {};
canUseDOM &&
  ((style = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete vendorPrefixes.animationend.animation,
    delete vendorPrefixes.animationiteration.animation,
    delete vendorPrefixes.animationstart.animation),
  "TransitionEvent" in window ||
    delete vendorPrefixes.transitionend.transition);
function getVendorPrefixedEventName(eventName) {
  if (prefixedEventNames[eventName]) return prefixedEventNames[eventName];
  if (!vendorPrefixes[eventName]) return eventName;
  var prefixMap = vendorPrefixes[eventName],
    styleProp;
  for (styleProp in prefixMap)
    if (prefixMap.hasOwnProperty(styleProp) && styleProp in style)
      return (prefixedEventNames[eventName] = prefixMap[styleProp]);
  return eventName;
}
var TOP_ANIMATION_END = getVendorPrefixedEventName("animationend"),
  TOP_ANIMATION_ITERATION = getVendorPrefixedEventName("animationiteration"),
  TOP_ANIMATION_START = getVendorPrefixedEventName("animationstart"),
  TOP_TRANSITION_END = getVendorPrefixedEventName("transitionend"),
  mediaEventTypes = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ),
  elementListenerMap = new ("function" === typeof WeakMap ? WeakMap : Map)();
function getListenerMapForElement(target) {
  var listenerMap = elementListenerMap.get(target);
  void 0 === listenerMap &&
    ((listenerMap = new Map()), elementListenerMap.set(target, listenerMap));
  return listenerMap;
}
function getNearestMountedFiber(fiber) {
  var node = fiber,
    nearestMounted = fiber;
  if (fiber.alternate) for (; node.return; ) node = node.return;
  else {
    fiber = node;
    do
      (node = fiber),
        0 !== (node.effectTag & 1026) && (nearestMounted = node.return),
        (fiber = node.return);
    while (fiber);
  }
  return 3 === node.tag ? nearestMounted : null;
}
function getSuspenseInstanceFromFiber(fiber) {
  if (13 === fiber.tag) {
    var suspenseState = fiber.memoizedState;
    null === suspenseState &&
      ((fiber = fiber.alternate),
      null !== fiber && (suspenseState = fiber.memoizedState));
    if (null !== suspenseState) return suspenseState.dehydrated;
  }
  return null;
}
function assertIsMounted(fiber) {
  if (getNearestMountedFiber(fiber) !== fiber)
    throw Error(formatProdErrorMessage(188));
}
function findCurrentFiberUsingSlowPath(fiber) {
  var alternate = fiber.alternate;
  if (!alternate) {
    alternate = getNearestMountedFiber(fiber);
    if (null === alternate) throw Error(formatProdErrorMessage(188));
    return alternate !== fiber ? null : fiber;
  }
  for (var a = fiber, b = alternate; ; ) {
    var parentA = a.return;
    if (null === parentA) break;
    var parentB = parentA.alternate;
    if (null === parentB) {
      b = parentA.return;
      if (null !== b) {
        a = b;
        continue;
      }
      break;
    }
    if (parentA.child === parentB.child) {
      for (parentB = parentA.child; parentB; ) {
        if (parentB === a) return assertIsMounted(parentA), fiber;
        if (parentB === b) return assertIsMounted(parentA), alternate;
        parentB = parentB.sibling;
      }
      throw Error(formatProdErrorMessage(188));
    }
    if (a.return !== b.return) (a = parentA), (b = parentB);
    else {
      for (var didFindChild = !1, child$11 = parentA.child; child$11; ) {
        if (child$11 === a) {
          didFindChild = !0;
          a = parentA;
          b = parentB;
          break;
        }
        if (child$11 === b) {
          didFindChild = !0;
          b = parentA;
          a = parentB;
          break;
        }
        child$11 = child$11.sibling;
      }
      if (!didFindChild) {
        for (child$11 = parentB.child; child$11; ) {
          if (child$11 === a) {
            didFindChild = !0;
            a = parentB;
            b = parentA;
            break;
          }
          if (child$11 === b) {
            didFindChild = !0;
            b = parentB;
            a = parentA;
            break;
          }
          child$11 = child$11.sibling;
        }
        if (!didFindChild) throw Error(formatProdErrorMessage(189));
      }
    }
    if (a.alternate !== b) throw Error(formatProdErrorMessage(190));
  }
  if (3 !== a.tag) throw Error(formatProdErrorMessage(188));
  return a.stateNode.current === a ? fiber : alternate;
}
function findCurrentHostFiber(parent) {
  parent = findCurrentFiberUsingSlowPath(parent);
  if (!parent) return null;
  for (var node = parent; ; ) {
    if (5 === node.tag || 6 === node.tag) return node;
    if (node.child) (node.child.return = node), (node = node.child);
    else {
      if (node === parent) break;
      for (; !node.sibling; ) {
        if (!node.return || node.return === parent) return null;
        node = node.return;
      }
      node.sibling.return = node.return;
      node = node.sibling;
    }
  }
  return null;
}
function accumulateInto(current, next) {
  if (null == next) throw Error(formatProdErrorMessage(30));
  if (null == current) return next;
  if (Array.isArray(current)) {
    if (Array.isArray(next)) return current.push.apply(current, next), current;
    current.push(next);
    return current;
  }
  return Array.isArray(next) ? [current].concat(next) : [current, next];
}
var eventQueue = null;
function executeDispatchesAndReleaseTopLevel(e) {
  if (e) {
    var dispatchListeners = e._dispatchListeners,
      dispatchInstances = e._dispatchInstances;
    if (Array.isArray(dispatchListeners))
      for (var previousInstance, i = 0; i < dispatchListeners.length; i++) {
        var instance = dispatchInstances[i];
        if (instance !== previousInstance && e.isPropagationStopped()) break;
        executeDispatch(e, dispatchListeners[i], dispatchInstances[i]);
        previousInstance = instance;
      }
    else
      dispatchListeners &&
        executeDispatch(e, dispatchListeners, dispatchInstances);
    e._dispatchListeners = null;
    e._dispatchInstances = null;
    e.isPersistent() || e.constructor.release(e);
  }
}
function runEventsInBatch(events) {
  null !== events && (eventQueue = accumulateInto(eventQueue, events));
  events = eventQueue;
  eventQueue = null;
  if (events) {
    Array.isArray(events)
      ? events.forEach(executeDispatchesAndReleaseTopLevel, void 0)
      : events && executeDispatchesAndReleaseTopLevel.call(void 0, events);
    if (eventQueue) throw Error(formatProdErrorMessage(95));
    if (hasRethrowError)
      throw ((events = rethrowError),
      (hasRethrowError = !1),
      (rethrowError = null),
      events);
  }
}
function getEventTarget(nativeEvent) {
  nativeEvent = nativeEvent.target || nativeEvent.srcElement || window;
  nativeEvent.correspondingUseElement &&
    (nativeEvent = nativeEvent.correspondingUseElement);
  return 3 === nativeEvent.nodeType ? nativeEvent.parentNode : nativeEvent;
}
function isEventSupported(eventNameSuffix) {
  if (!canUseDOM) return !1;
  eventNameSuffix = "on" + eventNameSuffix;
  var isSupported = eventNameSuffix in document;
  isSupported ||
    ((isSupported = document.createElement("div")),
    isSupported.setAttribute(eventNameSuffix, "return;"),
    (isSupported = "function" === typeof isSupported[eventNameSuffix]));
  return isSupported;
}
var callbackBookkeepingPool = [];
function releaseTopLevelCallbackBookKeeping(instance) {
  instance.topLevelType = null;
  instance.nativeEvent = null;
  instance.targetInst = null;
  instance.ancestors.length = 0;
  10 > callbackBookkeepingPool.length && callbackBookkeepingPool.push(instance);
}
function getTopLevelCallbackBookKeeping(
  topLevelType,
  nativeEvent,
  targetInst,
  eventSystemFlags
) {
  if (callbackBookkeepingPool.length) {
    var instance = callbackBookkeepingPool.pop();
    instance.topLevelType = topLevelType;
    instance.eventSystemFlags = eventSystemFlags;
    instance.nativeEvent = nativeEvent;
    instance.targetInst = targetInst;
    return instance;
  }
  return {
    topLevelType: topLevelType,
    eventSystemFlags: eventSystemFlags,
    nativeEvent: nativeEvent,
    targetInst: targetInst,
    ancestors: []
  };
}
function handleTopLevel(bookKeeping) {
  var targetInst = bookKeeping.targetInst,
    ancestor = targetInst;
  do {
    if (!ancestor) {
      bookKeeping.ancestors.push(ancestor);
      break;
    }
    var JSCompiler_inline_result = ancestor;
    if (3 === JSCompiler_inline_result.tag)
      JSCompiler_inline_result =
        JSCompiler_inline_result.stateNode.containerInfo;
    else {
      for (; JSCompiler_inline_result.return; )
        JSCompiler_inline_result = JSCompiler_inline_result.return;
      JSCompiler_inline_result =
        3 !== JSCompiler_inline_result.tag
          ? null
          : JSCompiler_inline_result.stateNode.containerInfo;
    }
    if (!JSCompiler_inline_result) break;
    var tag = ancestor.tag;
    (5 !== tag && 6 !== tag) || bookKeeping.ancestors.push(ancestor);
    ancestor = getClosestInstanceFromNode(JSCompiler_inline_result);
  } while (ancestor);
  for (ancestor = 0; ancestor < bookKeeping.ancestors.length; ancestor++) {
    targetInst = bookKeeping.ancestors[ancestor];
    JSCompiler_inline_result = getEventTarget(bookKeeping.nativeEvent);
    tag = bookKeeping.topLevelType;
    var nativeEvent = bookKeeping.nativeEvent,
      eventSystemFlags = bookKeeping.eventSystemFlags;
    0 === ancestor && (eventSystemFlags |= 64);
    for (var events = null, i = 0; i < plugins.length; i++) {
      var possiblePlugin = plugins[i];
      possiblePlugin &&
        (possiblePlugin = possiblePlugin.extractEvents(
          tag,
          targetInst,
          nativeEvent,
          JSCompiler_inline_result,
          eventSystemFlags
        )) &&
        (events = accumulateInto(events, possiblePlugin));
    }
    runEventsInBatch(events);
  }
}
function legacyListenToTopLevelEvent(topLevelType, mountAt, listenerMap) {
  if (!listenerMap.has(topLevelType))
    switch (topLevelType) {
      case "scroll":
        legacyTrapCapturedEvent("scroll", mountAt, listenerMap);
        break;
      case "focus":
      case "blur":
        legacyTrapCapturedEvent("focus", mountAt, listenerMap);
        legacyTrapCapturedEvent("blur", mountAt, listenerMap);
        break;
      case "cancel":
      case "close":
        isEventSupported(topLevelType) &&
          legacyTrapCapturedEvent(topLevelType, mountAt, listenerMap);
        break;
      case "invalid":
      case "submit":
      case "reset":
        break;
      default:
        -1 === mediaEventTypes.indexOf(topLevelType) &&
          legacyTrapBubbledEvent(topLevelType, mountAt, listenerMap);
    }
}
function legacyTrapBubbledEvent(topLevelType, element, listenerMap) {
  element = addTrappedEventListener(element, topLevelType, !1);
  listenerMap &&
    listenerMap.set(topLevelType, { passive: void 0, listener: element });
}
function legacyTrapCapturedEvent(topLevelType, element, listenerMap) {
  element = addTrappedEventListener(element, topLevelType, !0);
  listenerMap.set(topLevelType, { passive: void 0, listener: element });
}
var simpleEventPluginEventTypes = {},
  topLevelEventsToDispatchConfig = new Map(),
  eventPriorities = new Map(),
  otherDiscreteEvents = "change selectionchange textInput compositionstart compositionend compositionupdate".split(
    " "
  ),
  continuousPairsForSimpleEventPlugin = [
    "abort",
    "abort",
    TOP_ANIMATION_END,
    "animationEnd",
    TOP_ANIMATION_ITERATION,
    "animationIteration",
    TOP_ANIMATION_START,
    "animationStart",
    "canplay",
    "canPlay",
    "canplaythrough",
    "canPlayThrough",
    "durationchange",
    "durationChange",
    "emptied",
    "emptied",
    "encrypted",
    "encrypted",
    "ended",
    "ended",
    "error",
    "error",
    "gotpointercapture",
    "gotPointerCapture",
    "load",
    "load",
    "loadeddata",
    "loadedData",
    "loadedmetadata",
    "loadedMetadata",
    "loadstart",
    "loadStart",
    "lostpointercapture",
    "lostPointerCapture",
    "playing",
    "playing",
    "progress",
    "progress",
    "seeking",
    "seeking",
    "stalled",
    "stalled",
    "suspend",
    "suspend",
    "timeupdate",
    "timeUpdate",
    TOP_TRANSITION_END,
    "transitionEnd",
    "waiting",
    "waiting"
  ];
function processSimpleEventPluginPairsByPriority(eventTypes, priority) {
  for (var i = 0; i < eventTypes.length; i += 2) {
    var topEvent = eventTypes[i],
      event = eventTypes[i + 1],
      onEvent = "on" + (event[0].toUpperCase() + event.slice(1));
    onEvent = {
      phasedRegistrationNames: {
        bubbled: onEvent,
        captured: onEvent + "Capture"
      },
      dependencies: [topEvent],
      eventPriority: priority
    };
    eventPriorities.set(topEvent, priority);
    topLevelEventsToDispatchConfig.set(topEvent, onEvent);
    simpleEventPluginEventTypes[event] = onEvent;
  }
}
processSimpleEventPluginPairsByPriority(
  "blur blur cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focus focus input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(
    " "
  ),
  0
);
processSimpleEventPluginPairsByPriority(
  "drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(
    " "
  ),
  1
);
processSimpleEventPluginPairsByPriority(continuousPairsForSimpleEventPlugin, 2);
for (
  var i$jscomp$inline_301 = 0;
  i$jscomp$inline_301 < otherDiscreteEvents.length;
  i$jscomp$inline_301++
)
  eventPriorities.set(otherDiscreteEvents[i$jscomp$inline_301], 0);
var attemptSynchronousHydration,
  attemptUserBlockingHydration,
  attemptContinuousHydration,
  attemptHydrationAtCurrentPriority,
  hasScheduledReplayAttempt = !1,
  queuedDiscreteEvents = [],
  queuedFocus = null,
  queuedDrag = null,
  queuedMouse = null,
  queuedPointers = new Map(),
  queuedPointerCaptures = new Map(),
  queuedExplicitHydrationTargets = [],
  discreteReplayableEvents = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput close cancel copy cut paste click change contextmenu reset submit".split(
    " "
  ),
  continuousReplayableEvents = "focus blur dragenter dragleave mouseover mouseout pointerover pointerout gotpointercapture lostpointercapture".split(
    " "
  );
function trapReplayableEventForDocument(topLevelType, document, listenerMap) {
  legacyListenToTopLevelEvent(topLevelType, document, listenerMap);
  var activeEventKey = topLevelType + "_active";
  listenerMap.has(activeEventKey) ||
    ((topLevelType = addResponderEventSystemEvent(document, topLevelType, !1)),
    listenerMap.set(activeEventKey, { passive: !1, listener: topLevelType }));
}
function eagerlyTrapReplayableEvents(container, document) {
  var listenerMapForDoc = getListenerMapForElement(document);
  discreteReplayableEvents.forEach(function(topLevelType) {
    trapReplayableEventForDocument(topLevelType, document, listenerMapForDoc);
  });
  continuousReplayableEvents.forEach(function(topLevelType) {
    trapReplayableEventForDocument(topLevelType, document, listenerMapForDoc);
  });
}
function createQueuedReplayableEvent(
  blockedOn,
  topLevelType,
  eventSystemFlags,
  targetContainer,
  nativeEvent
) {
  return {
    blockedOn: blockedOn,
    topLevelType: topLevelType,
    eventSystemFlags: eventSystemFlags | 32,
    nativeEvent: nativeEvent,
    targetContainers: null !== targetContainer ? [targetContainer] : []
  };
}
function queueDiscreteEvent(
  blockedOn,
  topLevelType,
  eventSystemFlags,
  targetContainer,
  nativeEvent
) {
  blockedOn = createQueuedReplayableEvent(
    blockedOn,
    topLevelType,
    eventSystemFlags,
    targetContainer,
    nativeEvent
  );
  queuedDiscreteEvents.push(blockedOn);
  if (1 === queuedDiscreteEvents.length)
    for (; null !== blockedOn.blockedOn; ) {
      topLevelType = getInstanceFromNode$2(blockedOn.blockedOn);
      if (null === topLevelType) break;
      attemptSynchronousHydration(topLevelType);
      if (null === blockedOn.blockedOn) replayUnblockedEvents();
      else break;
    }
}
function clearIfContinuousEvent(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case "focus":
    case "blur":
      queuedFocus = null;
      break;
    case "dragenter":
    case "dragleave":
      queuedDrag = null;
      break;
    case "mouseover":
    case "mouseout":
      queuedMouse = null;
      break;
    case "pointerover":
    case "pointerout":
      queuedPointers.delete(nativeEvent.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      queuedPointerCaptures.delete(nativeEvent.pointerId);
  }
}
function accumulateOrCreateContinuousQueuedReplayableEvent(
  existingQueuedEvent,
  blockedOn,
  topLevelType,
  eventSystemFlags,
  targetContainer,
  nativeEvent
) {
  if (
    null === existingQueuedEvent ||
    existingQueuedEvent.nativeEvent !== nativeEvent
  )
    return (
      (existingQueuedEvent = createQueuedReplayableEvent(
        blockedOn,
        topLevelType,
        eventSystemFlags,
        targetContainer,
        nativeEvent
      )),
      null !== blockedOn &&
        ((blockedOn = getInstanceFromNode$2(blockedOn)),
        null !== blockedOn && attemptContinuousHydration(blockedOn)),
      existingQueuedEvent
    );
  existingQueuedEvent.eventSystemFlags |= eventSystemFlags;
  blockedOn = existingQueuedEvent.targetContainers;
  null !== targetContainer &&
    -1 === blockedOn.indexOf(targetContainer) &&
    blockedOn.push(targetContainer);
  return existingQueuedEvent;
}
function queueIfContinuousEvent(
  blockedOn,
  topLevelType,
  eventSystemFlags,
  targetContainer,
  nativeEvent
) {
  switch (topLevelType) {
    case "focus":
      return (
        (queuedFocus = accumulateOrCreateContinuousQueuedReplayableEvent(
          queuedFocus,
          blockedOn,
          topLevelType,
          eventSystemFlags,
          targetContainer,
          nativeEvent
        )),
        !0
      );
    case "dragenter":
      return (
        (queuedDrag = accumulateOrCreateContinuousQueuedReplayableEvent(
          queuedDrag,
          blockedOn,
          topLevelType,
          eventSystemFlags,
          targetContainer,
          nativeEvent
        )),
        !0
      );
    case "mouseover":
      return (
        (queuedMouse = accumulateOrCreateContinuousQueuedReplayableEvent(
          queuedMouse,
          blockedOn,
          topLevelType,
          eventSystemFlags,
          targetContainer,
          nativeEvent
        )),
        !0
      );
    case "pointerover":
      var pointerId = nativeEvent.pointerId;
      queuedPointers.set(
        pointerId,
        accumulateOrCreateContinuousQueuedReplayableEvent(
          queuedPointers.get(pointerId) || null,
          blockedOn,
          topLevelType,
          eventSystemFlags,
          targetContainer,
          nativeEvent
        )
      );
      return !0;
    case "gotpointercapture":
      return (
        (pointerId = nativeEvent.pointerId),
        queuedPointerCaptures.set(
          pointerId,
          accumulateOrCreateContinuousQueuedReplayableEvent(
            queuedPointerCaptures.get(pointerId) || null,
            blockedOn,
            topLevelType,
            eventSystemFlags,
            targetContainer,
            nativeEvent
          )
        ),
        !0
      );
  }
  return !1;
}
function attemptExplicitHydrationTarget(queuedTarget) {
  var targetInst = getClosestInstanceFromNode(queuedTarget.target);
  if (null !== targetInst) {
    var nearestMounted = getNearestMountedFiber(targetInst);
    if (null !== nearestMounted)
      if (((targetInst = nearestMounted.tag), 13 === targetInst)) {
        if (
          ((targetInst = getSuspenseInstanceFromFiber(nearestMounted)),
          null !== targetInst)
        ) {
          queuedTarget.blockedOn = targetInst;
          Scheduler.unstable_runWithPriority(queuedTarget.priority, function() {
            attemptHydrationAtCurrentPriority(nearestMounted);
          });
          return;
        }
      } else if (3 === targetInst && nearestMounted.stateNode.hydrate) {
        queuedTarget.blockedOn =
          3 === nearestMounted.tag
            ? nearestMounted.stateNode.containerInfo
            : null;
        return;
      }
  }
  queuedTarget.blockedOn = null;
}
function attemptReplayContinuousQueuedEvent(queuedEvent) {
  if (null !== queuedEvent.blockedOn) return !1;
  for (
    var targetContainers = queuedEvent.targetContainers;
    0 < targetContainers.length;

  ) {
    var nextBlockedOn = attemptToDispatchEvent(
      queuedEvent.topLevelType,
      queuedEvent.eventSystemFlags,
      targetContainers[0],
      queuedEvent.nativeEvent
    );
    if (null !== nextBlockedOn)
      return (
        (targetContainers = getInstanceFromNode$2(nextBlockedOn)),
        null !== targetContainers &&
          attemptContinuousHydration(targetContainers),
        (queuedEvent.blockedOn = nextBlockedOn),
        !1
      );
    targetContainers.shift();
  }
  return !0;
}
function attemptReplayContinuousQueuedEventInMap(queuedEvent, key, map) {
  attemptReplayContinuousQueuedEvent(queuedEvent) && map.delete(key);
}
function replayUnblockedEvents() {
  for (hasScheduledReplayAttempt = !1; 0 < queuedDiscreteEvents.length; ) {
    var nextDiscreteEvent = queuedDiscreteEvents[0];
    if (null !== nextDiscreteEvent.blockedOn) {
      nextDiscreteEvent = getInstanceFromNode$2(nextDiscreteEvent.blockedOn);
      null !== nextDiscreteEvent &&
        attemptUserBlockingHydration(nextDiscreteEvent);
      break;
    }
    for (
      var targetContainers = nextDiscreteEvent.targetContainers;
      0 < targetContainers.length;

    ) {
      var nextBlockedOn = attemptToDispatchEvent(
        nextDiscreteEvent.topLevelType,
        nextDiscreteEvent.eventSystemFlags,
        targetContainers[0],
        nextDiscreteEvent.nativeEvent
      );
      if (null !== nextBlockedOn) {
        nextDiscreteEvent.blockedOn = nextBlockedOn;
        break;
      }
      targetContainers.shift();
    }
    null === nextDiscreteEvent.blockedOn && queuedDiscreteEvents.shift();
  }
  null !== queuedFocus &&
    attemptReplayContinuousQueuedEvent(queuedFocus) &&
    (queuedFocus = null);
  null !== queuedDrag &&
    attemptReplayContinuousQueuedEvent(queuedDrag) &&
    (queuedDrag = null);
  null !== queuedMouse &&
    attemptReplayContinuousQueuedEvent(queuedMouse) &&
    (queuedMouse = null);
  queuedPointers.forEach(attemptReplayContinuousQueuedEventInMap);
  queuedPointerCaptures.forEach(attemptReplayContinuousQueuedEventInMap);
}
function scheduleCallbackIfUnblocked(queuedEvent, unblocked) {
  queuedEvent.blockedOn === unblocked &&
    ((queuedEvent.blockedOn = null),
    hasScheduledReplayAttempt ||
      ((hasScheduledReplayAttempt = !0),
      Scheduler.unstable_scheduleCallback(
        Scheduler.unstable_NormalPriority,
        replayUnblockedEvents
      )));
}
function retryIfBlockedOn(unblocked) {
  function unblock(queuedEvent) {
    return scheduleCallbackIfUnblocked(queuedEvent, unblocked);
  }
  if (0 < queuedDiscreteEvents.length) {
    scheduleCallbackIfUnblocked(queuedDiscreteEvents[0], unblocked);
    for (var i = 1; i < queuedDiscreteEvents.length; i++) {
      var queuedEvent$jscomp$0 = queuedDiscreteEvents[i];
      queuedEvent$jscomp$0.blockedOn === unblocked &&
        (queuedEvent$jscomp$0.blockedOn = null);
    }
  }
  null !== queuedFocus && scheduleCallbackIfUnblocked(queuedFocus, unblocked);
  null !== queuedDrag && scheduleCallbackIfUnblocked(queuedDrag, unblocked);
  null !== queuedMouse && scheduleCallbackIfUnblocked(queuedMouse, unblocked);
  queuedPointers.forEach(unblock);
  queuedPointerCaptures.forEach(unblock);
  for (i = 0; i < queuedExplicitHydrationTargets.length; i++)
    (queuedEvent$jscomp$0 = queuedExplicitHydrationTargets[i]),
      queuedEvent$jscomp$0.blockedOn === unblocked &&
        (queuedEvent$jscomp$0.blockedOn = null);
  for (
    ;
    0 < queuedExplicitHydrationTargets.length &&
    ((i = queuedExplicitHydrationTargets[0]), null === i.blockedOn);

  )
    attemptExplicitHydrationTarget(i),
      null === i.blockedOn && queuedExplicitHydrationTargets.shift();
}
var passiveBrowserEventsSupported = !1;
if (canUseDOM)
  try {
    var options = {};
    Object.defineProperty(options, "passive", {
      get: function() {
        passiveBrowserEventsSupported = !0;
      }
    });
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch (e) {
    passiveBrowserEventsSupported = !1;
  }
var UserBlockingPriority$1 = Scheduler.unstable_UserBlockingPriority,
  runWithPriority$1 = Scheduler.unstable_runWithPriority,
  _enabled = !0;
function addResponderEventSystemEvent(document, topLevelType, passive) {
  var eventFlags = 2;
  passive
    ? passiveBrowserEventsSupported
      ? (eventFlags |= 4)
      : ((eventFlags |= 24), (passive = !1))
    : (eventFlags |= 8);
  eventFlags = dispatchEvent.bind(null, topLevelType, eventFlags, document);
  passiveBrowserEventsSupported
    ? document.addEventListener(topLevelType, eventFlags, {
        capture: !0,
        passive: passive
      })
    : document.addEventListener(topLevelType, eventFlags, !0);
  return eventFlags;
}
function addTrappedEventListener(
  targetContainer,
  topLevelType,
  capture,
  isDeferredListenerForLegacyFBSupport,
  passive,
  priority
) {
  void 0 === priority
    ? ((isDeferredListenerForLegacyFBSupport = eventPriorities.get(
        topLevelType
      )),
      (isDeferredListenerForLegacyFBSupport =
        void 0 === isDeferredListenerForLegacyFBSupport
          ? 2
          : isDeferredListenerForLegacyFBSupport))
    : (isDeferredListenerForLegacyFBSupport = priority);
  switch (isDeferredListenerForLegacyFBSupport) {
    case 0:
      isDeferredListenerForLegacyFBSupport = dispatchDiscreteEvent;
      break;
    case 1:
      isDeferredListenerForLegacyFBSupport = dispatchUserBlockingUpdate;
      break;
    default:
      isDeferredListenerForLegacyFBSupport = dispatchEvent;
  }
  isDeferredListenerForLegacyFBSupport = isDeferredListenerForLegacyFBSupport.bind(
    null,
    topLevelType,
    1,
    targetContainer
  );
  null === targetContainer && (targetContainer = document);
  capture
    ? targetContainer.addEventListener(
        topLevelType,
        isDeferredListenerForLegacyFBSupport,
        !0
      )
    : targetContainer.addEventListener(
        topLevelType,
        isDeferredListenerForLegacyFBSupport,
        !1
      );
  return isDeferredListenerForLegacyFBSupport;
}
function dispatchDiscreteEvent(
  topLevelType,
  eventSystemFlags,
  container,
  nativeEvent
) {
  flushDiscreteUpdatesIfNeeded(nativeEvent.timeStamp);
  discreteUpdates(
    dispatchEvent,
    topLevelType,
    eventSystemFlags,
    container,
    nativeEvent
  );
}
function dispatchUserBlockingUpdate(
  topLevelType,
  eventSystemFlags,
  container,
  nativeEvent
) {
  runWithPriority$1(
    UserBlockingPriority$1,
    dispatchEvent.bind(
      null,
      topLevelType,
      eventSystemFlags,
      container,
      nativeEvent
    )
  );
}
function dispatchEvent(
  topLevelType,
  eventSystemFlags,
  targetContainer,
  nativeEvent
) {
  if (_enabled)
    if (
      0 < queuedDiscreteEvents.length &&
      -1 < discreteReplayableEvents.indexOf(topLevelType)
    )
      queueDiscreteEvent(
        null,
        topLevelType,
        eventSystemFlags,
        targetContainer,
        nativeEvent
      );
    else {
      var blockedOn = attemptToDispatchEvent(
        topLevelType,
        eventSystemFlags,
        targetContainer,
        nativeEvent
      );
      if (null === blockedOn) clearIfContinuousEvent(topLevelType, nativeEvent);
      else if (-1 < discreteReplayableEvents.indexOf(topLevelType))
        queueDiscreteEvent(
          blockedOn,
          topLevelType,
          eventSystemFlags,
          targetContainer,
          nativeEvent
        );
      else if (
        !queueIfContinuousEvent(
          blockedOn,
          topLevelType,
          eventSystemFlags,
          targetContainer,
          nativeEvent
        )
      ) {
        clearIfContinuousEvent(topLevelType, nativeEvent);
        if (eventSystemFlags & 1) {
          targetContainer = getTopLevelCallbackBookKeeping(
            topLevelType,
            nativeEvent,
            null,
            eventSystemFlags
          );
          try {
            batchedEventUpdates(handleTopLevel, targetContainer);
          } finally {
            releaseTopLevelCallbackBookKeeping(targetContainer);
          }
        }
        eventSystemFlags & 2 &&
          DEPRECATED_dispatchEventForResponderEventSystem(
            topLevelType,
            null,
            nativeEvent,
            getEventTarget(nativeEvent),
            eventSystemFlags
          );
      }
    }
}
function attemptToDispatchEvent(
  topLevelType,
  eventSystemFlags,
  targetContainer,
  nativeEvent
) {
  targetContainer = getEventTarget(nativeEvent);
  var targetInst = getClosestInstanceFromNode(targetContainer);
  if (null !== targetInst) {
    var nearestMounted = getNearestMountedFiber(targetInst);
    if (null === nearestMounted) targetInst = null;
    else {
      var tag = nearestMounted.tag;
      if (13 === tag) {
        targetInst = getSuspenseInstanceFromFiber(nearestMounted);
        if (null !== targetInst) return targetInst;
        targetInst = null;
      } else if (3 === tag) {
        if (nearestMounted.stateNode.hydrate)
          return 3 === nearestMounted.tag
            ? nearestMounted.stateNode.containerInfo
            : null;
        targetInst = null;
      } else nearestMounted !== targetInst && (targetInst = null);
    }
  }
  if (eventSystemFlags & 1) {
    nearestMounted = getTopLevelCallbackBookKeeping(
      topLevelType,
      nativeEvent,
      targetInst,
      eventSystemFlags
    );
    try {
      batchedEventUpdates(handleTopLevel, nearestMounted);
    } finally {
      releaseTopLevelCallbackBookKeeping(nearestMounted);
    }
  }
  eventSystemFlags & 2 &&
    DEPRECATED_dispatchEventForResponderEventSystem(
      topLevelType,
      targetInst,
      nativeEvent,
      targetContainer,
      eventSystemFlags
    );
  return null;
}
var isUnitlessNumber = {
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
function dangerousStyleValue(name, value, isCustomProperty) {
  return null == value || "boolean" === typeof value || "" === value
    ? ""
    : isCustomProperty ||
      "number" !== typeof value ||
      0 === value ||
      (isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name])
    ? ("" + value).trim()
    : value + "px";
}
function setValueForStyles(node, styles) {
  node = node.style;
  for (var styleName in styles)
    if (styles.hasOwnProperty(styleName)) {
      var isCustomProperty = 0 === styleName.indexOf("--"),
        styleValue = dangerousStyleValue(
          styleName,
          styles[styleName],
          isCustomProperty
        );
      "float" === styleName && (styleName = "cssFloat");
      isCustomProperty
        ? node.setProperty(styleName, styleValue)
        : (node[styleName] = styleValue);
    }
}
var voidElementTags = Object.assign(
  { menuitem: !0 },
  {
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
  }
);
function assertValidProps(tag, props) {
  if (props) {
    if (
      voidElementTags[tag] &&
      (null != props.children || null != props.dangerouslySetInnerHTML)
    )
      throw Error(formatProdErrorMessage(137, tag, ""));
    if (null != props.dangerouslySetInnerHTML) {
      if (null != props.children) throw Error(formatProdErrorMessage(60));
      if (
        !(
          "object" === typeof props.dangerouslySetInnerHTML &&
          "__html" in props.dangerouslySetInnerHTML
        )
      )
        throw Error(formatProdErrorMessage(61));
    }
    if (null != props.style && "object" !== typeof props.style)
      throw Error(formatProdErrorMessage(62, ""));
  }
}
function isCustomComponent(tagName, props) {
  if (-1 === tagName.indexOf("-")) return "string" === typeof props.is;
  switch (tagName) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
function ensureListeningTo(rootContainerInstance, registrationName) {
  rootContainerInstance =
    9 === rootContainerInstance.nodeType ||
    11 === rootContainerInstance.nodeType
      ? rootContainerInstance
      : rootContainerInstance.ownerDocument;
  var listenerMap = getListenerMapForElement(rootContainerInstance);
  registrationName = registrationNameDependencies[registrationName];
  for (var i = 0; i < registrationName.length; i++)
    legacyListenToTopLevelEvent(
      registrationName[i],
      rootContainerInstance,
      listenerMap
    );
}
function noop() {}
function listenToEventResponderEventTypes(eventTypes, document) {
  for (
    var listenerMap = getListenerMapForElement(document),
      i = 0,
      length = eventTypes.length;
    i < length;
    ++i
  ) {
    var eventType = eventTypes[i],
      length$jscomp$0 = eventType.length,
      eventKey = (length$jscomp$0 =
        "_active" !== eventType.substring(length$jscomp$0 - 7, length$jscomp$0))
        ? eventType + "_passive"
        : eventType;
    eventType = length$jscomp$0
      ? eventType
      : eventType.substring(0, eventType.length - 7);
    if (!listenerMap.has(eventKey)) {
      if (length$jscomp$0) {
        if (listenerMap.has(eventType + "_active")) continue;
      } else {
        var passiveKey = eventType + "_passive",
          passiveItem = listenerMap.get(passiveKey);
        void 0 !== passiveItem &&
          (document.removeEventListener(eventType, passiveItem.listener, !0),
          listenerMap.delete(passiveKey));
      }
      eventType = addResponderEventSystemEvent(
        document,
        eventType,
        length$jscomp$0
      );
      listenerMap.set(eventKey, {
        passive: length$jscomp$0,
        listener: eventType
      });
    }
  }
}
listenToResponderEventTypesImpl = listenToEventResponderEventTypes;
function getActiveElement(doc) {
  doc = doc || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof doc) return null;
  try {
    return doc.activeElement || doc.body;
  } catch (e$19) {
    return doc.body;
  }
}
function getLeafNode(node) {
  for (; node && node.firstChild; ) node = node.firstChild;
  return node;
}
function getNodeForCharacterOffset(root, offset) {
  var node = getLeafNode(root);
  root = 0;
  for (var nodeEnd; node; ) {
    if (3 === node.nodeType) {
      nodeEnd = root + node.textContent.length;
      if (root <= offset && nodeEnd >= offset)
        return { node: node, offset: offset - root };
      root = nodeEnd;
    }
    a: {
      for (; node; ) {
        if (node.nextSibling) {
          node = node.nextSibling;
          break a;
        }
        node = node.parentNode;
      }
      node = void 0;
    }
    node = getLeafNode(node);
  }
}
function containsNode(outerNode, innerNode) {
  return outerNode && innerNode
    ? outerNode === innerNode
      ? !0
      : outerNode && 3 === outerNode.nodeType
      ? !1
      : innerNode && 3 === innerNode.nodeType
      ? containsNode(outerNode, innerNode.parentNode)
      : "contains" in outerNode
      ? outerNode.contains(innerNode)
      : outerNode.compareDocumentPosition
      ? !!(outerNode.compareDocumentPosition(innerNode) & 16)
      : !1
    : !1;
}
function getActiveElementDeep() {
  for (
    var win = window, element = getActiveElement();
    element instanceof win.HTMLIFrameElement;

  ) {
    try {
      var JSCompiler_inline_result =
        "string" === typeof element.contentWindow.location.href;
    } catch (err) {
      JSCompiler_inline_result = !1;
    }
    if (JSCompiler_inline_result) win = element.contentWindow;
    else break;
    element = getActiveElement(win.document);
  }
  return element;
}
function hasSelectionCapabilities(elem) {
  var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
  return (
    nodeName &&
    (("input" === nodeName &&
      ("text" === elem.type ||
        "search" === elem.type ||
        "tel" === elem.type ||
        "url" === elem.type ||
        "password" === elem.type)) ||
      "textarea" === nodeName ||
      "true" === elem.contentEditable)
  );
}
var eventsEnabled = null,
  selectionInformation = null;
function shouldAutoFocusHostComponent(type, props) {
  switch (type) {
    case "button":
    case "input":
    case "select":
    case "textarea":
      return !!props.autoFocus;
  }
  return !1;
}
function shouldSetTextContent(type, props) {
  return (
    "textarea" === type ||
    "option" === type ||
    "noscript" === type ||
    "string" === typeof props.children ||
    "number" === typeof props.children ||
    ("object" === typeof props.dangerouslySetInnerHTML &&
      null !== props.dangerouslySetInnerHTML &&
      null != props.dangerouslySetInnerHTML.__html)
  );
}
var scheduleTimeout = "function" === typeof setTimeout ? setTimeout : void 0,
  cancelTimeout = "function" === typeof clearTimeout ? clearTimeout : void 0;
function dispatchBeforeDetachedBlur(target) {
  var targetInstance = getClosestInstanceFromNode(target);
  selectionInformation.activeElementDetached = target;
  DEPRECATED_dispatchEventForResponderEventSystem(
    "beforeblur",
    targetInstance,
    { target: target, timeStamp: Date.now() },
    target,
    6
  );
}
function clearSuspenseBoundary(parentInstance, suspenseInstance) {
  var node = suspenseInstance,
    depth = 0;
  do {
    var nextNode = node.nextSibling;
    parentInstance.removeChild(node);
    if (nextNode && 8 === nextNode.nodeType)
      if (((node = nextNode.data), "/$" === node)) {
        if (0 === depth) {
          parentInstance.removeChild(nextNode);
          retryIfBlockedOn(suspenseInstance);
          return;
        }
        depth--;
      } else ("$" !== node && "$?" !== node && "$!" !== node) || depth++;
    node = nextNode;
  } while (node);
  retryIfBlockedOn(suspenseInstance);
}
function getNextHydratable(node) {
  for (; null != node; node = node.nextSibling) {
    var nodeType = node.nodeType;
    if (1 === nodeType || 3 === nodeType) break;
    if (
      8 === nodeType &&
      ((nodeType = node.data),
      "$" === nodeType || "$!" === nodeType || "$?" === nodeType)
    )
      break;
  }
  return node;
}
function getParentSuspenseInstance(targetInstance) {
  targetInstance = targetInstance.previousSibling;
  for (var depth = 0; targetInstance; ) {
    if (8 === targetInstance.nodeType) {
      var data = targetInstance.data;
      if ("$" === data || "$!" === data || "$?" === data) {
        if (0 === depth) return targetInstance;
        depth--;
      } else "/$" === data && depth++;
    }
    targetInstance = targetInstance.previousSibling;
  }
  return null;
}
var randomKey = Math.random()
    .toString(36)
    .slice(2),
  internalInstanceKey = "__reactFiber$" + randomKey,
  internalEventHandlersKey = "__reactEvents$" + randomKey,
  internalContainerInstanceKey = "__reactContainer$" + randomKey;
function getClosestInstanceFromNode(targetNode) {
  var targetInst = targetNode[internalInstanceKey];
  if (targetInst) return targetInst;
  for (var parentNode = targetNode.parentNode; parentNode; ) {
    if (
      (targetInst =
        parentNode[internalContainerInstanceKey] ||
        parentNode[internalInstanceKey])
    ) {
      parentNode = targetInst.alternate;
      if (
        null !== targetInst.child ||
        (null !== parentNode && null !== parentNode.child)
      )
        for (
          targetNode = getParentSuspenseInstance(targetNode);
          null !== targetNode;

        ) {
          if ((parentNode = targetNode[internalInstanceKey])) return parentNode;
          targetNode = getParentSuspenseInstance(targetNode);
        }
      return targetInst;
    }
    targetNode = parentNode;
    parentNode = targetNode.parentNode;
  }
  return null;
}
function getInstanceFromNode$2(node) {
  node = node[internalInstanceKey] || node[internalContainerInstanceKey];
  return !node ||
    (5 !== node.tag && 6 !== node.tag && 13 !== node.tag && 3 !== node.tag)
    ? null
    : node;
}
function getNodeFromInstance$1(inst) {
  if (5 === inst.tag || 6 === inst.tag) return inst.stateNode;
  throw Error(formatProdErrorMessage(33));
}
function getFiberCurrentPropsFromNode$1(node) {
  return node[internalEventHandlersKey] || null;
}
var root = null,
  startText = null,
  fallbackText = null;
function getData() {
  if (fallbackText) return fallbackText;
  var start,
    startValue = startText,
    startLength = startValue.length,
    end,
    endValue = "value" in root ? root.value : root.textContent,
    endLength = endValue.length;
  for (
    start = 0;
    start < startLength && startValue[start] === endValue[start];
    start++
  );
  var minEnd = startLength - start;
  for (
    end = 1;
    end <= minEnd &&
    startValue[startLength - end] === endValue[endLength - end];
    end++
  );
  return (fallbackText = endValue.slice(start, 1 < end ? 1 - end : void 0));
}
function functionThatReturnsTrue() {
  return !0;
}
function functionThatReturnsFalse() {
  return !1;
}
function SyntheticEvent(
  dispatchConfig,
  targetInst,
  nativeEvent,
  nativeEventTarget
) {
  this.dispatchConfig = dispatchConfig;
  this._targetInst = targetInst;
  this.nativeEvent = nativeEvent;
  this._dispatchInstances = this._dispatchListeners = null;
  dispatchConfig = this.constructor.Interface;
  for (var propName in dispatchConfig)
    dispatchConfig.hasOwnProperty(propName) &&
      ((targetInst = dispatchConfig[propName])
        ? (this[propName] = targetInst(nativeEvent))
        : "target" === propName
        ? (this.target = nativeEventTarget)
        : (this[propName] = nativeEvent[propName]));
  this.isDefaultPrevented = (null != nativeEvent.defaultPrevented
  ? nativeEvent.defaultPrevented
  : !1 === nativeEvent.returnValue)
    ? functionThatReturnsTrue
    : functionThatReturnsFalse;
  this.isPropagationStopped = functionThatReturnsFalse;
  return this;
}
Object.assign(SyntheticEvent.prototype, {
  preventDefault: function() {
    this.defaultPrevented = !0;
    var event = this.nativeEvent;
    event &&
      (event.preventDefault
        ? event.preventDefault()
        : "unknown" !== typeof event.returnValue && (event.returnValue = !1),
      (this.isDefaultPrevented = functionThatReturnsTrue));
  },
  stopPropagation: function() {
    var event = this.nativeEvent;
    event &&
      (event.stopPropagation
        ? event.stopPropagation()
        : "unknown" !== typeof event.cancelBubble && (event.cancelBubble = !0),
      (this.isPropagationStopped = functionThatReturnsTrue));
  },
  persist: function() {
    this.isPersistent = functionThatReturnsTrue;
  },
  isPersistent: functionThatReturnsFalse,
  destructor: function() {
    var Interface = this.constructor.Interface,
      propName;
    for (propName in Interface) this[propName] = null;
    this.nativeEvent = this._targetInst = this.dispatchConfig = null;
    this.isPropagationStopped = this.isDefaultPrevented = functionThatReturnsFalse;
    this._dispatchInstances = this._dispatchListeners = null;
  }
});
SyntheticEvent.Interface = {
  type: null,
  target: null,
  currentTarget: function() {
    return null;
  },
  eventPhase: null,
  bubbles: null,
  cancelable: null,
  timeStamp: function(event) {
    return event.timeStamp || Date.now();
  },
  defaultPrevented: null,
  isTrusted: null
};
SyntheticEvent.extend = function(Interface) {
  function E() {}
  function Class() {
    return Super.apply(this, arguments);
  }
  var Super = this;
  E.prototype = Super.prototype;
  var prototype = new E();
  Object.assign(prototype, Class.prototype);
  Class.prototype = prototype;
  Class.prototype.constructor = Class;
  Class.Interface = Object.assign({}, Super.Interface, Interface);
  Class.extend = Super.extend;
  addEventPoolingTo(Class);
  return Class;
};
addEventPoolingTo(SyntheticEvent);
function getPooledEvent(dispatchConfig, targetInst, nativeEvent, nativeInst) {
  if (this.eventPool.length) {
    var instance = this.eventPool.pop();
    this.call(instance, dispatchConfig, targetInst, nativeEvent, nativeInst);
    return instance;
  }
  return new this(dispatchConfig, targetInst, nativeEvent, nativeInst);
}
function releasePooledEvent(event) {
  if (!(event instanceof this)) throw Error(formatProdErrorMessage(279));
  event.destructor();
  10 > this.eventPool.length && this.eventPool.push(event);
}
function addEventPoolingTo(EventConstructor) {
  EventConstructor.eventPool = [];
  EventConstructor.getPooled = getPooledEvent;
  EventConstructor.release = releasePooledEvent;
}
var SyntheticCompositionEvent = SyntheticEvent.extend({ data: null }),
  SyntheticInputEvent = SyntheticEvent.extend({ data: null });
function getListener(inst, registrationName) {
  var listener = inst.stateNode;
  if (!listener) return null;
  var props = getFiberCurrentPropsFromNode(listener);
  if (!props) return null;
  listener = props[registrationName];
  a: switch (registrationName) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (props = !props.disabled) ||
        ((inst = inst.type),
        (props = !(
          "button" === inst ||
          "input" === inst ||
          "select" === inst ||
          "textarea" === inst
        )));
      inst = !props;
      break a;
    default:
      inst = !1;
  }
  if (inst) return null;
  if (listener && "function" !== typeof listener)
    throw Error(formatProdErrorMessage(231, registrationName, typeof listener));
  return listener;
}
function accumulateTwoPhaseListeners(event) {
  var phasedRegistrationNames = event.dispatchConfig.phasedRegistrationNames,
    dispatchListeners = [],
    dispatchInstances = [],
    bubbled = phasedRegistrationNames.bubbled;
  phasedRegistrationNames = phasedRegistrationNames.captured;
  for (var node = event._targetInst; null !== node; ) {
    if (5 === node.tag) {
      if (null !== phasedRegistrationNames) {
        var captureListener = getListener(node, phasedRegistrationNames);
        null != captureListener &&
          (dispatchListeners.unshift(captureListener),
          dispatchInstances.unshift(node));
      }
      null !== bubbled &&
        ((captureListener = getListener(node, bubbled)),
        null != captureListener &&
          (dispatchListeners.push(captureListener),
          dispatchInstances.push(node)));
    }
    node = node.return;
  }
  0 < dispatchListeners.length &&
    ((event._dispatchListeners = dispatchListeners),
    (event._dispatchInstances = dispatchInstances));
}
var END_KEYCODES = [9, 13, 27, 32],
  canUseCompositionEvent = canUseDOM && "CompositionEvent" in window,
  documentMode = null;
canUseDOM &&
  "documentMode" in document &&
  (documentMode = document.documentMode);
var canUseTextInputEvent = canUseDOM && "TextEvent" in window && !documentMode,
  useFallbackCompositionData =
    canUseDOM &&
    (!canUseCompositionEvent ||
      (documentMode && 8 < documentMode && 11 >= documentMode)),
  SPACEBAR_CHAR = String.fromCharCode(32),
  eventTypes = {
    beforeInput: {
      phasedRegistrationNames: {
        bubbled: "onBeforeInput",
        captured: "onBeforeInputCapture"
      },
      dependencies: ["compositionend", "keypress", "textInput", "paste"]
    },
    compositionEnd: {
      phasedRegistrationNames: {
        bubbled: "onCompositionEnd",
        captured: "onCompositionEndCapture"
      },
      dependencies: "blur compositionend keydown keypress keyup mousedown".split(
        " "
      )
    },
    compositionStart: {
      phasedRegistrationNames: {
        bubbled: "onCompositionStart",
        captured: "onCompositionStartCapture"
      },
      dependencies: "blur compositionstart keydown keypress keyup mousedown".split(
        " "
      )
    },
    compositionUpdate: {
      phasedRegistrationNames: {
        bubbled: "onCompositionUpdate",
        captured: "onCompositionUpdateCapture"
      },
      dependencies: "blur compositionupdate keydown keypress keyup mousedown".split(
        " "
      )
    }
  },
  hasSpaceKeypress = !1;
function isFallbackCompositionEnd(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case "keyup":
      return -1 !== END_KEYCODES.indexOf(nativeEvent.keyCode);
    case "keydown":
      return 229 !== nativeEvent.keyCode;
    case "keypress":
    case "mousedown":
    case "blur":
      return !0;
    default:
      return !1;
  }
}
function getDataFromCustomEvent(nativeEvent) {
  nativeEvent = nativeEvent.detail;
  return "object" === typeof nativeEvent && "data" in nativeEvent
    ? nativeEvent.data
    : null;
}
var isComposing = !1;
function getNativeBeforeInputChars(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case "compositionend":
      return getDataFromCustomEvent(nativeEvent);
    case "keypress":
      if (32 !== nativeEvent.which) return null;
      hasSpaceKeypress = !0;
      return SPACEBAR_CHAR;
    case "textInput":
      return (
        (topLevelType = nativeEvent.data),
        topLevelType === SPACEBAR_CHAR && hasSpaceKeypress ? null : topLevelType
      );
    default:
      return null;
  }
}
function getFallbackBeforeInputChars(topLevelType, nativeEvent) {
  if (isComposing)
    return "compositionend" === topLevelType ||
      (!canUseCompositionEvent &&
        isFallbackCompositionEnd(topLevelType, nativeEvent))
      ? ((topLevelType = getData()),
        (fallbackText = startText = root = null),
        (isComposing = !1),
        topLevelType)
      : null;
  switch (topLevelType) {
    case "paste":
      return null;
    case "keypress":
      if (
        !(nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) ||
        (nativeEvent.ctrlKey && nativeEvent.altKey)
      ) {
        if (nativeEvent.char && 1 < nativeEvent.char.length)
          return nativeEvent.char;
        if (nativeEvent.which) return String.fromCharCode(nativeEvent.which);
      }
      return null;
    case "compositionend":
      return useFallbackCompositionData && "ko" !== nativeEvent.locale
        ? null
        : nativeEvent.data;
    default:
      return null;
  }
}
var BeforeInputEventPlugin = {
    eventTypes: eventTypes,
    extractEvents: function(
      topLevelType,
      targetInst,
      nativeEvent,
      nativeEventTarget
    ) {
      var JSCompiler_inline_result;
      if (canUseCompositionEvent)
        b: {
          switch (topLevelType) {
            case "compositionstart":
              var eventType = eventTypes.compositionStart;
              break b;
            case "compositionend":
              eventType = eventTypes.compositionEnd;
              break b;
            case "compositionupdate":
              eventType = eventTypes.compositionUpdate;
              break b;
          }
          eventType = void 0;
        }
      else
        isComposing
          ? isFallbackCompositionEnd(topLevelType, nativeEvent) &&
            (eventType = eventTypes.compositionEnd)
          : "keydown" === topLevelType &&
            229 === nativeEvent.keyCode &&
            (eventType = eventTypes.compositionStart);
      eventType
        ? (useFallbackCompositionData &&
            "ko" !== nativeEvent.locale &&
            (isComposing || eventType !== eventTypes.compositionStart
              ? eventType === eventTypes.compositionEnd &&
                isComposing &&
                (JSCompiler_inline_result = getData())
              : ((root = nativeEventTarget),
                (startText = "value" in root ? root.value : root.textContent),
                (isComposing = !0))),
          (eventType = SyntheticCompositionEvent.getPooled(
            eventType,
            targetInst,
            nativeEvent,
            nativeEventTarget
          )),
          JSCompiler_inline_result
            ? (eventType.data = JSCompiler_inline_result)
            : ((JSCompiler_inline_result = getDataFromCustomEvent(nativeEvent)),
              null !== JSCompiler_inline_result &&
                (eventType.data = JSCompiler_inline_result)),
          accumulateTwoPhaseListeners(eventType),
          (JSCompiler_inline_result = eventType))
        : (JSCompiler_inline_result = null);
      (topLevelType = canUseTextInputEvent
        ? getNativeBeforeInputChars(topLevelType, nativeEvent)
        : getFallbackBeforeInputChars(topLevelType, nativeEvent))
        ? ((targetInst = SyntheticInputEvent.getPooled(
            eventTypes.beforeInput,
            targetInst,
            nativeEvent,
            nativeEventTarget
          )),
          (targetInst.data = topLevelType),
          accumulateTwoPhaseListeners(targetInst))
        : (targetInst = null);
      return null === JSCompiler_inline_result
        ? targetInst
        : null === targetInst
        ? JSCompiler_inline_result
        : [JSCompiler_inline_result, targetInst];
    }
  },
  supportedInputTypes = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
function isTextInputElement(elem) {
  var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
  return "input" === nodeName
    ? !!supportedInputTypes[elem.type]
    : "textarea" === nodeName
    ? !0
    : !1;
}
var eventTypes$1 = {
  change: {
    phasedRegistrationNames: {
      bubbled: "onChange",
      captured: "onChangeCapture"
    },
    dependencies: "blur change click focus input keydown keyup selectionchange".split(
      " "
    )
  }
};
function createAndAccumulateChangeEvent(inst, nativeEvent, target) {
  inst = SyntheticEvent.getPooled(
    eventTypes$1.change,
    inst,
    nativeEvent,
    target
  );
  inst.type = "change";
  enqueueStateRestore(target);
  accumulateTwoPhaseListeners(inst);
  return inst;
}
var activeElement = null,
  activeElementInst = null;
function runEventInBatch(event) {
  runEventsInBatch(event);
}
function getInstIfValueChanged(targetInst) {
  var targetNode = getNodeFromInstance$1(targetInst);
  if (updateValueIfChanged(targetNode)) return targetInst;
}
function getTargetInstForChangeEvent(topLevelType, targetInst) {
  if ("change" === topLevelType) return targetInst;
}
var isInputEventSupported = !1;
canUseDOM &&
  (isInputEventSupported =
    isEventSupported("input") &&
    (!document.documentMode || 9 < document.documentMode));
function stopWatchingForValueChange() {
  activeElement &&
    (activeElement.detachEvent("onpropertychange", handlePropertyChange),
    (activeElementInst = activeElement = null));
}
function handlePropertyChange(nativeEvent) {
  if (
    "value" === nativeEvent.propertyName &&
    getInstIfValueChanged(activeElementInst)
  )
    if (
      ((nativeEvent = createAndAccumulateChangeEvent(
        activeElementInst,
        nativeEvent,
        getEventTarget(nativeEvent)
      )),
      isInsideEventHandler)
    )
      runEventsInBatch(nativeEvent);
    else {
      isInsideEventHandler = !0;
      try {
        batchedUpdatesImpl(runEventInBatch, nativeEvent);
      } finally {
        (isInsideEventHandler = !1), finishEventHandler();
      }
    }
}
function handleEventsForInputEventPolyfill(topLevelType, target, targetInst) {
  "focus" === topLevelType
    ? (stopWatchingForValueChange(),
      (activeElement = target),
      (activeElementInst = targetInst),
      activeElement.attachEvent("onpropertychange", handlePropertyChange))
    : "blur" === topLevelType && stopWatchingForValueChange();
}
function getTargetInstForInputEventPolyfill(topLevelType) {
  if (
    "selectionchange" === topLevelType ||
    "keyup" === topLevelType ||
    "keydown" === topLevelType
  )
    return getInstIfValueChanged(activeElementInst);
}
function getTargetInstForClickEvent(topLevelType, targetInst) {
  if ("click" === topLevelType) return getInstIfValueChanged(targetInst);
}
function getTargetInstForInputOrChangeEvent(topLevelType, targetInst) {
  if ("input" === topLevelType || "change" === topLevelType)
    return getInstIfValueChanged(targetInst);
}
var ChangeEventPlugin = {
  eventTypes: eventTypes$1,
  _isInputEventSupported: isInputEventSupported,
  extractEvents: function(
    topLevelType,
    targetInst,
    nativeEvent,
    nativeEventTarget
  ) {
    var targetNode = targetInst ? getNodeFromInstance$1(targetInst) : window,
      nodeName = targetNode.nodeName && targetNode.nodeName.toLowerCase();
    if (
      "select" === nodeName ||
      ("input" === nodeName && "file" === targetNode.type)
    )
      var getTargetInstFunc = getTargetInstForChangeEvent;
    else if (isTextInputElement(targetNode))
      if (isInputEventSupported)
        getTargetInstFunc = getTargetInstForInputOrChangeEvent;
      else {
        getTargetInstFunc = getTargetInstForInputEventPolyfill;
        var handleEventFunc = handleEventsForInputEventPolyfill;
      }
    else
      (nodeName = targetNode.nodeName) &&
        "input" === nodeName.toLowerCase() &&
        ("checkbox" === targetNode.type || "radio" === targetNode.type) &&
        (getTargetInstFunc = getTargetInstForClickEvent);
    if (
      getTargetInstFunc &&
      (getTargetInstFunc = getTargetInstFunc(topLevelType, targetInst))
    )
      return createAndAccumulateChangeEvent(
        getTargetInstFunc,
        nativeEvent,
        nativeEventTarget
      );
    handleEventFunc && handleEventFunc(topLevelType, targetNode, targetInst);
    "blur" === topLevelType &&
      (topLevelType = targetNode._wrapperState) &&
      topLevelType.controlled &&
      "number" === targetNode.type &&
      setDefaultValue(targetNode, "number", targetNode.value);
  }
};
function getParent(inst) {
  do inst = inst.return;
  while (inst && 5 !== inst.tag);
  return inst ? inst : null;
}
function accumulateDispatches(inst, ignoredDirection, event) {
  inst &&
    event &&
    event.dispatchConfig.registrationName &&
    (ignoredDirection = getListener(
      inst,
      event.dispatchConfig.registrationName
    )) &&
    ((event._dispatchListeners = accumulateInto(
      event._dispatchListeners,
      ignoredDirection
    )),
    (event._dispatchInstances = accumulateInto(
      event._dispatchInstances,
      inst
    )));
}
var SyntheticUIEvent = SyntheticEvent.extend({ view: null, detail: null }),
  modifierKeyToProp = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
function modifierStateGetter(keyArg) {
  var nativeEvent = this.nativeEvent;
  return nativeEvent.getModifierState
    ? nativeEvent.getModifierState(keyArg)
    : (keyArg = modifierKeyToProp[keyArg])
    ? !!nativeEvent[keyArg]
    : !1;
}
function getEventModifierState() {
  return modifierStateGetter;
}
var previousScreenX = 0,
  previousScreenY = 0,
  isMovementXSet = !1,
  isMovementYSet = !1,
  SyntheticMouseEvent = SyntheticUIEvent.extend({
    screenX: null,
    screenY: null,
    clientX: null,
    clientY: null,
    pageX: null,
    pageY: null,
    ctrlKey: null,
    shiftKey: null,
    altKey: null,
    metaKey: null,
    getModifierState: getEventModifierState,
    button: null,
    buttons: null,
    relatedTarget: function(event) {
      return (
        event.relatedTarget ||
        (event.fromElement === event.srcElement
          ? event.toElement
          : event.fromElement)
      );
    },
    movementX: function(event) {
      if ("movementX" in event) return event.movementX;
      var screenX = previousScreenX;
      previousScreenX = event.screenX;
      return isMovementXSet
        ? "mousemove" === event.type
          ? event.screenX - screenX
          : 0
        : ((isMovementXSet = !0), 0);
    },
    movementY: function(event) {
      if ("movementY" in event) return event.movementY;
      var screenY = previousScreenY;
      previousScreenY = event.screenY;
      return isMovementYSet
        ? "mousemove" === event.type
          ? event.screenY - screenY
          : 0
        : ((isMovementYSet = !0), 0);
    }
  }),
  SyntheticPointerEvent = SyntheticMouseEvent.extend({
    pointerId: null,
    width: null,
    height: null,
    pressure: null,
    tangentialPressure: null,
    tiltX: null,
    tiltY: null,
    twist: null,
    pointerType: null,
    isPrimary: null
  }),
  eventTypes$2 = {
    mouseEnter: {
      registrationName: "onMouseEnter",
      dependencies: ["mouseout", "mouseover"]
    },
    mouseLeave: {
      registrationName: "onMouseLeave",
      dependencies: ["mouseout", "mouseover"]
    },
    pointerEnter: {
      registrationName: "onPointerEnter",
      dependencies: ["pointerout", "pointerover"]
    },
    pointerLeave: {
      registrationName: "onPointerLeave",
      dependencies: ["pointerout", "pointerover"]
    }
  },
  EnterLeaveEventPlugin = {
    eventTypes: eventTypes$2,
    extractEvents: function(
      topLevelType,
      targetInst,
      nativeEvent,
      nativeEventTarget,
      eventSystemFlags
    ) {
      var isOverEvent =
          "mouseover" === topLevelType || "pointerover" === topLevelType,
        isOutEvent =
          "mouseout" === topLevelType || "pointerout" === topLevelType;
      if (
        (isOverEvent &&
          0 === (eventSystemFlags & 32) &&
          (nativeEvent.relatedTarget || nativeEvent.fromElement)) ||
        (!isOutEvent && !isOverEvent)
      )
        return null;
      isOverEvent =
        nativeEventTarget.window === nativeEventTarget
          ? nativeEventTarget
          : (isOverEvent = nativeEventTarget.ownerDocument)
          ? isOverEvent.defaultView || isOverEvent.parentWindow
          : window;
      if (isOutEvent) {
        if (
          ((isOutEvent = targetInst),
          (targetInst = (targetInst =
            nativeEvent.relatedTarget || nativeEvent.toElement)
            ? getClosestInstanceFromNode(targetInst)
            : null),
          null !== targetInst)
        ) {
          var nearestMounted = getNearestMountedFiber(targetInst);
          if (
            targetInst !== nearestMounted ||
            (5 !== targetInst.tag && 6 !== targetInst.tag)
          )
            targetInst = null;
        }
      } else isOutEvent = null;
      if (isOutEvent === targetInst) return null;
      if ("mouseout" === topLevelType || "mouseover" === topLevelType) {
        var eventInterface = SyntheticMouseEvent;
        var leaveEventType = eventTypes$2.mouseLeave;
        var enterEventType = eventTypes$2.mouseEnter;
        var eventTypePrefix = "mouse";
      } else if (
        "pointerout" === topLevelType ||
        "pointerover" === topLevelType
      )
        (eventInterface = SyntheticPointerEvent),
          (leaveEventType = eventTypes$2.pointerLeave),
          (enterEventType = eventTypes$2.pointerEnter),
          (eventTypePrefix = "pointer");
      topLevelType =
        null == isOutEvent ? isOverEvent : getNodeFromInstance$1(isOutEvent);
      isOverEvent =
        null == targetInst ? isOverEvent : getNodeFromInstance$1(targetInst);
      leaveEventType = eventInterface.getPooled(
        leaveEventType,
        isOutEvent,
        nativeEvent,
        nativeEventTarget
      );
      leaveEventType.type = eventTypePrefix + "leave";
      leaveEventType.target = topLevelType;
      leaveEventType.relatedTarget = isOverEvent;
      nativeEvent = eventInterface.getPooled(
        enterEventType,
        targetInst,
        nativeEvent,
        nativeEventTarget
      );
      nativeEvent.type = eventTypePrefix + "enter";
      nativeEvent.target = isOverEvent;
      nativeEvent.relatedTarget = topLevelType;
      nativeEventTarget = isOutEvent;
      eventTypePrefix = targetInst;
      if (nativeEventTarget && eventTypePrefix)
        a: {
          eventInterface = nativeEventTarget;
          enterEventType = eventTypePrefix;
          isOutEvent = 0;
          for (
            topLevelType = eventInterface;
            topLevelType;
            topLevelType = getParent(topLevelType)
          )
            isOutEvent++;
          topLevelType = 0;
          for (
            targetInst = enterEventType;
            targetInst;
            targetInst = getParent(targetInst)
          )
            topLevelType++;
          for (; 0 < isOutEvent - topLevelType; )
            (eventInterface = getParent(eventInterface)), isOutEvent--;
          for (; 0 < topLevelType - isOutEvent; )
            (enterEventType = getParent(enterEventType)), topLevelType--;
          for (; isOutEvent--; ) {
            if (
              eventInterface === enterEventType ||
              eventInterface === enterEventType.alternate
            )
              break a;
            eventInterface = getParent(eventInterface);
            enterEventType = getParent(enterEventType);
          }
          eventInterface = null;
        }
      else eventInterface = null;
      enterEventType = eventInterface;
      for (
        eventInterface = [];
        nativeEventTarget && nativeEventTarget !== enterEventType;

      ) {
        isOutEvent = nativeEventTarget.alternate;
        if (null !== isOutEvent && isOutEvent === enterEventType) break;
        eventInterface.push(nativeEventTarget);
        nativeEventTarget = getParent(nativeEventTarget);
      }
      for (
        nativeEventTarget = [];
        eventTypePrefix && eventTypePrefix !== enterEventType;

      ) {
        isOutEvent = eventTypePrefix.alternate;
        if (null !== isOutEvent && isOutEvent === enterEventType) break;
        nativeEventTarget.push(eventTypePrefix);
        eventTypePrefix = getParent(eventTypePrefix);
      }
      for (
        eventTypePrefix = 0;
        eventTypePrefix < eventInterface.length;
        eventTypePrefix++
      )
        accumulateDispatches(
          eventInterface[eventTypePrefix],
          "bubbled",
          leaveEventType
        );
      for (eventTypePrefix = nativeEventTarget.length; 0 < eventTypePrefix--; )
        accumulateDispatches(
          nativeEventTarget[eventTypePrefix],
          "captured",
          nativeEvent
        );
      return 0 === (eventSystemFlags & 64)
        ? [leaveEventType]
        : [leaveEventType, nativeEvent];
    }
  };
function is(x, y) {
  return (x === y && (0 !== x || 1 / x === 1 / y)) || (x !== x && y !== y);
}
var objectIs = "function" === typeof Object.is ? Object.is : is,
  hasOwnProperty$1 = Object.prototype.hasOwnProperty;
function shallowEqual(objA, objB) {
  if (objectIs(objA, objB)) return !0;
  if (
    "object" !== typeof objA ||
    null === objA ||
    "object" !== typeof objB ||
    null === objB
  )
    return !1;
  var keysA = Object.keys(objA),
    keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return !1;
  for (keysB = 0; keysB < keysA.length; keysB++)
    if (
      !hasOwnProperty$1.call(objB, keysA[keysB]) ||
      !objectIs(objA[keysA[keysB]], objB[keysA[keysB]])
    )
      return !1;
  return !0;
}
var skipSelectionChangeEvent =
    canUseDOM && "documentMode" in document && 11 >= document.documentMode,
  eventTypes$3 = {
    select: {
      phasedRegistrationNames: {
        bubbled: "onSelect",
        captured: "onSelectCapture"
      },
      dependencies: "blur contextmenu dragend focus keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    }
  },
  activeElement$1 = null,
  activeElementInst$1 = null,
  lastSelection = null,
  mouseDown = !1;
function constructSelectEvent(nativeEvent, nativeEventTarget) {
  var doc =
    nativeEventTarget.window === nativeEventTarget
      ? nativeEventTarget.document
      : 9 === nativeEventTarget.nodeType
      ? nativeEventTarget
      : nativeEventTarget.ownerDocument;
  if (
    mouseDown ||
    null == activeElement$1 ||
    activeElement$1 !== getActiveElement(doc)
  )
    return null;
  doc = activeElement$1;
  "selectionStart" in doc && hasSelectionCapabilities(doc)
    ? (doc = { start: doc.selectionStart, end: doc.selectionEnd })
    : ((doc = (
        (doc.ownerDocument && doc.ownerDocument.defaultView) ||
        window
      ).getSelection()),
      (doc = {
        anchorNode: doc.anchorNode,
        anchorOffset: doc.anchorOffset,
        focusNode: doc.focusNode,
        focusOffset: doc.focusOffset
      }));
  return lastSelection && shallowEqual(lastSelection, doc)
    ? null
    : ((lastSelection = doc),
      (nativeEvent = SyntheticEvent.getPooled(
        eventTypes$3.select,
        activeElementInst$1,
        nativeEvent,
        nativeEventTarget
      )),
      (nativeEvent.type = "select"),
      (nativeEvent.target = activeElement$1),
      accumulateTwoPhaseListeners(nativeEvent),
      nativeEvent);
}
var SelectEventPlugin = {
    eventTypes: eventTypes$3,
    extractEvents: function(
      topLevelType,
      targetInst,
      nativeEvent,
      nativeEventTarget,
      eventSystemFlags,
      container
    ) {
      eventSystemFlags =
        container ||
        (nativeEventTarget.window === nativeEventTarget
          ? nativeEventTarget.document
          : 9 === nativeEventTarget.nodeType
          ? nativeEventTarget
          : nativeEventTarget.ownerDocument);
      if (!(container = !eventSystemFlags)) {
        a: {
          eventSystemFlags = getListenerMapForElement(eventSystemFlags);
          container = registrationNameDependencies.onSelect;
          for (var i = 0; i < container.length; i++)
            if (!eventSystemFlags.has(container[i])) {
              eventSystemFlags = !1;
              break a;
            }
          eventSystemFlags = !0;
        }
        container = !eventSystemFlags;
      }
      if (container) return null;
      eventSystemFlags = targetInst
        ? getNodeFromInstance$1(targetInst)
        : window;
      switch (topLevelType) {
        case "focus":
          if (
            isTextInputElement(eventSystemFlags) ||
            "true" === eventSystemFlags.contentEditable
          )
            (activeElement$1 = eventSystemFlags),
              (activeElementInst$1 = targetInst),
              (lastSelection = null);
          break;
        case "blur":
          lastSelection = activeElementInst$1 = activeElement$1 = null;
          break;
        case "mousedown":
          mouseDown = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          return (
            (mouseDown = !1),
            constructSelectEvent(nativeEvent, nativeEventTarget)
          );
        case "selectionchange":
          if (skipSelectionChangeEvent) break;
        case "keydown":
        case "keyup":
          return constructSelectEvent(nativeEvent, nativeEventTarget);
      }
      return null;
    }
  },
  SyntheticAnimationEvent = SyntheticEvent.extend({
    animationName: null,
    elapsedTime: null,
    pseudoElement: null
  }),
  SyntheticClipboardEvent = SyntheticEvent.extend({
    clipboardData: function(event) {
      return "clipboardData" in event
        ? event.clipboardData
        : window.clipboardData;
    }
  }),
  SyntheticFocusEvent = SyntheticUIEvent.extend({ relatedTarget: null });
function getEventCharCode(nativeEvent) {
  var keyCode = nativeEvent.keyCode;
  "charCode" in nativeEvent
    ? ((nativeEvent = nativeEvent.charCode),
      0 === nativeEvent && 13 === keyCode && (nativeEvent = 13))
    : (nativeEvent = keyCode);
  10 === nativeEvent && (nativeEvent = 13);
  return 32 <= nativeEvent || 13 === nativeEvent ? nativeEvent : 0;
}
var normalizeKey = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  },
  translateToKey = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  },
  SyntheticKeyboardEvent = SyntheticUIEvent.extend({
    key: function(nativeEvent) {
      if (nativeEvent.key) {
        var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
        if ("Unidentified" !== key) return key;
      }
      return "keypress" === nativeEvent.type
        ? ((nativeEvent = getEventCharCode(nativeEvent)),
          13 === nativeEvent ? "Enter" : String.fromCharCode(nativeEvent))
        : "keydown" === nativeEvent.type || "keyup" === nativeEvent.type
        ? translateToKey[nativeEvent.keyCode] || "Unidentified"
        : "";
    },
    location: null,
    ctrlKey: null,
    shiftKey: null,
    altKey: null,
    metaKey: null,
    repeat: null,
    locale: null,
    getModifierState: getEventModifierState,
    charCode: function(event) {
      return "keypress" === event.type ? getEventCharCode(event) : 0;
    },
    keyCode: function(event) {
      return "keydown" === event.type || "keyup" === event.type
        ? event.keyCode
        : 0;
    },
    which: function(event) {
      return "keypress" === event.type
        ? getEventCharCode(event)
        : "keydown" === event.type || "keyup" === event.type
        ? event.keyCode
        : 0;
    }
  }),
  SyntheticDragEvent = SyntheticMouseEvent.extend({ dataTransfer: null }),
  SyntheticTouchEvent = SyntheticUIEvent.extend({
    touches: null,
    targetTouches: null,
    changedTouches: null,
    altKey: null,
    metaKey: null,
    ctrlKey: null,
    shiftKey: null,
    getModifierState: getEventModifierState
  }),
  SyntheticTransitionEvent = SyntheticEvent.extend({
    propertyName: null,
    elapsedTime: null,
    pseudoElement: null
  }),
  SyntheticWheelEvent = SyntheticMouseEvent.extend({
    deltaX: function(event) {
      return "deltaX" in event
        ? event.deltaX
        : "wheelDeltaX" in event
        ? -event.wheelDeltaX
        : 0;
    },
    deltaY: function(event) {
      return "deltaY" in event
        ? event.deltaY
        : "wheelDeltaY" in event
        ? -event.wheelDeltaY
        : "wheelDelta" in event
        ? -event.wheelDelta
        : 0;
    },
    deltaZ: null,
    deltaMode: null
  }),
  SimpleEventPlugin = {
    eventTypes: simpleEventPluginEventTypes,
    extractEvents: function(
      topLevelType,
      targetInst,
      nativeEvent,
      nativeEventTarget
    ) {
      var dispatchConfig = topLevelEventsToDispatchConfig.get(topLevelType);
      if (!dispatchConfig) return null;
      switch (topLevelType) {
        case "keypress":
          if (0 === getEventCharCode(nativeEvent)) return null;
        case "keydown":
        case "keyup":
          topLevelType = SyntheticKeyboardEvent;
          break;
        case "blur":
        case "focus":
        case "beforeblur":
        case "afterblur":
          topLevelType = SyntheticFocusEvent;
          break;
        case "click":
          if (2 === nativeEvent.button) return null;
        case "auxclick":
        case "dblclick":
        case "mousedown":
        case "mousemove":
        case "mouseup":
        case "mouseout":
        case "mouseover":
        case "contextmenu":
          topLevelType = SyntheticMouseEvent;
          break;
        case "drag":
        case "dragend":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "dragstart":
        case "drop":
          topLevelType = SyntheticDragEvent;
          break;
        case "touchcancel":
        case "touchend":
        case "touchmove":
        case "touchstart":
          topLevelType = SyntheticTouchEvent;
          break;
        case TOP_ANIMATION_END:
        case TOP_ANIMATION_ITERATION:
        case TOP_ANIMATION_START:
          topLevelType = SyntheticAnimationEvent;
          break;
        case TOP_TRANSITION_END:
          topLevelType = SyntheticTransitionEvent;
          break;
        case "scroll":
          topLevelType = SyntheticUIEvent;
          break;
        case "wheel":
          topLevelType = SyntheticWheelEvent;
          break;
        case "copy":
        case "cut":
        case "paste":
          topLevelType = SyntheticClipboardEvent;
          break;
        case "gotpointercapture":
        case "lostpointercapture":
        case "pointercancel":
        case "pointerdown":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "pointerup":
          topLevelType = SyntheticPointerEvent;
          break;
        default:
          topLevelType = SyntheticEvent;
      }
      targetInst = topLevelType.getPooled(
        dispatchConfig,
        targetInst,
        nativeEvent,
        nativeEventTarget
      );
      accumulateTwoPhaseListeners(targetInst);
      return targetInst;
    }
  };
if (eventPluginOrder) throw Error(formatProdErrorMessage(101));
eventPluginOrder = Array.prototype.slice.call(
  "ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(
    " "
  )
);
recomputePluginOrdering();
var getInstanceFromNodeImpl$jscomp$inline_481 = getInstanceFromNode$2;
getFiberCurrentPropsFromNode = getFiberCurrentPropsFromNode$1;
getInstanceFromNode = getInstanceFromNodeImpl$jscomp$inline_481;
getNodeFromInstance = getNodeFromInstance$1;
injectEventPluginsByName({
  SimpleEventPlugin: SimpleEventPlugin,
  EnterLeaveEventPlugin: EnterLeaveEventPlugin,
  ChangeEventPlugin: ChangeEventPlugin,
  SelectEventPlugin: SelectEventPlugin,
  BeforeInputEventPlugin: BeforeInputEventPlugin
});
var valueStack = [],
  index = -1;
function pop(cursor) {
  0 > index ||
    ((cursor.current = valueStack[index]), (valueStack[index] = null), index--);
}
function push(cursor, value) {
  index++;
  valueStack[index] = cursor.current;
  cursor.current = value;
}
var emptyContextObject = {},
  Scheduler_runWithPriority = Scheduler.unstable_runWithPriority,
  Scheduler_scheduleCallback = Scheduler.unstable_scheduleCallback,
  Scheduler_cancelCallback = Scheduler.unstable_cancelCallback,
  Scheduler_shouldYield = Scheduler.unstable_shouldYield,
  Scheduler_requestPaint = Scheduler.unstable_requestPaint,
  Scheduler_now = Scheduler.unstable_now,
  Scheduler_getCurrentPriorityLevel =
    Scheduler.unstable_getCurrentPriorityLevel,
  Scheduler_ImmediatePriority = Scheduler.unstable_ImmediatePriority,
  Scheduler_UserBlockingPriority = Scheduler.unstable_UserBlockingPriority,
  Scheduler_NormalPriority = Scheduler.unstable_NormalPriority,
  Scheduler_LowPriority = Scheduler.unstable_LowPriority,
  Scheduler_IdlePriority = Scheduler.unstable_IdlePriority,
  fakeCallbackNode = {},
  requestPaint =
    void 0 !== Scheduler_requestPaint ? Scheduler_requestPaint : function() {},
  syncQueue = null,
  immediateQueueCallbackNode = null,
  isFlushingSyncQueue = !1,
  initialTimeMs = Scheduler_now(),
  now =
    1e4 > initialTimeMs
      ? Scheduler_now
      : function() {
          return Scheduler_now() - initialTimeMs;
        };
function getCurrentPriorityLevel() {
  switch (Scheduler_getCurrentPriorityLevel()) {
    case Scheduler_ImmediatePriority:
      return 99;
    case Scheduler_UserBlockingPriority:
      return 98;
    case Scheduler_NormalPriority:
      return 97;
    case Scheduler_LowPriority:
      return 96;
    case Scheduler_IdlePriority:
      return 95;
    default:
      throw Error(formatProdErrorMessage(332));
  }
}
function reactPriorityToSchedulerPriority(reactPriorityLevel) {
  switch (reactPriorityLevel) {
    case 99:
      return Scheduler_ImmediatePriority;
    case 98:
      return Scheduler_UserBlockingPriority;
    case 97:
      return Scheduler_NormalPriority;
    case 96:
      return Scheduler_LowPriority;
    case 95:
      return Scheduler_IdlePriority;
    default:
      throw Error(formatProdErrorMessage(332));
  }
}
function runWithPriority$2(reactPriorityLevel, fn) {
  reactPriorityLevel = reactPriorityToSchedulerPriority(reactPriorityLevel);
  return Scheduler_runWithPriority(reactPriorityLevel, fn);
}
function scheduleCallback(reactPriorityLevel, callback, options) {
  reactPriorityLevel = reactPriorityToSchedulerPriority(reactPriorityLevel);
  return Scheduler_scheduleCallback(reactPriorityLevel, callback, options);
}
function scheduleSyncCallback(callback) {
  null === syncQueue
    ? ((syncQueue = [callback]),
      (immediateQueueCallbackNode = Scheduler_scheduleCallback(
        Scheduler_ImmediatePriority,
        flushSyncCallbackQueueImpl
      )))
    : syncQueue.push(callback);
  return fakeCallbackNode;
}
function flushSyncCallbackQueue() {
  if (null !== immediateQueueCallbackNode) {
    var node = immediateQueueCallbackNode;
    immediateQueueCallbackNode = null;
    Scheduler_cancelCallback(node);
  }
  flushSyncCallbackQueueImpl();
}
function flushSyncCallbackQueueImpl() {
  if (!isFlushingSyncQueue && null !== syncQueue) {
    isFlushingSyncQueue = !0;
    var i = 0;
    try {
      var queue = syncQueue;
      runWithPriority$2(99, function() {
        for (; i < queue.length; i++) {
          var callback = queue[i];
          do callback = callback(!0);
          while (null !== callback);
        }
      });
      syncQueue = null;
    } catch (error) {
      throw (null !== syncQueue && (syncQueue = syncQueue.slice(i + 1)),
      Scheduler_scheduleCallback(
        Scheduler_ImmediatePriority,
        flushSyncCallbackQueue
      ),
      error);
    } finally {
      isFlushingSyncQueue = !1;
    }
  }
}
function computeExpirationBucket(currentTime, expirationInMs, bucketSizeMs) {
  bucketSizeMs /= 10;
  return (
    1073741821 -
    ((((1073741821 - currentTime + expirationInMs / 10) / bucketSizeMs) | 0) +
      1) *
      bucketSizeMs
  );
}
function resolveDefaultProps(Component, baseProps) {
  if (Component && Component.defaultProps) {
    baseProps = Object.assign({}, baseProps);
    Component = Component.defaultProps;
    for (var propName in Component)
      void 0 === baseProps[propName] &&
        (baseProps[propName] = Component[propName]);
  }
  return baseProps;
}
var valueCursor = { current: null },
  currentlyRenderingFiber = null,
  lastContextDependency = null,
  lastContextWithAllBitsObserved = null;
function resetContextDependencies() {
  lastContextWithAllBitsObserved = lastContextDependency = currentlyRenderingFiber = null;
}
function popProvider(providerFiber) {
  var currentValue = valueCursor.current;
  pop(valueCursor);
  providerFiber.type._context._currentValue = currentValue;
}
function scheduleWorkOnParentPath(parent, renderExpirationTime) {
  for (; null !== parent; ) {
    var alternate = parent.alternate;
    if (parent.childExpirationTime < renderExpirationTime)
      (parent.childExpirationTime = renderExpirationTime),
        null !== alternate &&
          alternate.childExpirationTime < renderExpirationTime &&
          (alternate.childExpirationTime = renderExpirationTime);
    else if (
      null !== alternate &&
      alternate.childExpirationTime < renderExpirationTime
    )
      alternate.childExpirationTime = renderExpirationTime;
    else break;
    parent = parent.return;
  }
}
function prepareToReadContext(workInProgress, renderExpirationTime) {
  currentlyRenderingFiber = workInProgress;
  lastContextWithAllBitsObserved = lastContextDependency = null;
  workInProgress = workInProgress.dependencies;
  null !== workInProgress &&
    null !== workInProgress.firstContext &&
    (workInProgress.expirationTime >= renderExpirationTime &&
      (didReceiveUpdate = !0),
    (workInProgress.firstContext = null));
}
function readContext(context, observedBits) {
  if (
    lastContextWithAllBitsObserved !== context &&
    !1 !== observedBits &&
    0 !== observedBits
  ) {
    if ("number" !== typeof observedBits || 1073741823 === observedBits)
      (lastContextWithAllBitsObserved = context), (observedBits = 1073741823);
    observedBits = { context: context, observedBits: observedBits, next: null };
    if (null === lastContextDependency) {
      if (null === currentlyRenderingFiber)
        throw Error(formatProdErrorMessage(308));
      lastContextDependency = observedBits;
      currentlyRenderingFiber.dependencies = {
        expirationTime: 0,
        firstContext: observedBits,
        responders: null
      };
    } else lastContextDependency = lastContextDependency.next = observedBits;
  }
  return context._currentValue;
}
var hasForceUpdate = !1;
function initializeUpdateQueue(fiber) {
  fiber.updateQueue = {
    baseState: fiber.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null },
    effects: null
  };
}
function cloneUpdateQueue(current, workInProgress) {
  current = current.updateQueue;
  workInProgress.updateQueue === current &&
    (workInProgress.updateQueue = {
      baseState: current.baseState,
      firstBaseUpdate: current.firstBaseUpdate,
      lastBaseUpdate: current.lastBaseUpdate,
      shared: current.shared,
      effects: current.effects
    });
}
function createUpdate(expirationTime, suspenseConfig) {
  return {
    expirationTime: expirationTime,
    suspenseConfig: suspenseConfig,
    tag: 0,
    payload: null,
    callback: null,
    next: null
  };
}
function enqueueUpdate(fiber, update) {
  fiber = fiber.updateQueue;
  if (null !== fiber) {
    fiber = fiber.shared;
    var pending = fiber.pending;
    null === pending
      ? (update.next = update)
      : ((update.next = pending.next), (pending.next = update));
    fiber.pending = update;
  }
}
function enqueueCapturedUpdate(workInProgress, capturedUpdate) {
  var queue = workInProgress.updateQueue,
    current = workInProgress.alternate;
  if (
    null !== current &&
    ((current = current.updateQueue), queue === current)
  ) {
    var newFirst = null,
      newLast = null;
    queue = queue.firstBaseUpdate;
    if (null !== queue) {
      do {
        var clone = {
          expirationTime: queue.expirationTime,
          suspenseConfig: queue.suspenseConfig,
          tag: queue.tag,
          payload: queue.payload,
          callback: queue.callback,
          next: null
        };
        null === newLast
          ? (newFirst = newLast = clone)
          : (newLast = newLast.next = clone);
        queue = queue.next;
      } while (null !== queue);
      null === newLast
        ? (newFirst = newLast = capturedUpdate)
        : (newLast = newLast.next = capturedUpdate);
    } else newFirst = newLast = capturedUpdate;
    queue = {
      baseState: current.baseState,
      firstBaseUpdate: newFirst,
      lastBaseUpdate: newLast,
      shared: current.shared,
      effects: current.effects
    };
    workInProgress.updateQueue = queue;
    return;
  }
  workInProgress = queue.lastBaseUpdate;
  null === workInProgress
    ? (queue.firstBaseUpdate = capturedUpdate)
    : (workInProgress.next = capturedUpdate);
  queue.lastBaseUpdate = capturedUpdate;
}
function processUpdateQueue(
  workInProgress$jscomp$0,
  props,
  instance,
  renderExpirationTime
) {
  var queue = workInProgress$jscomp$0.updateQueue;
  hasForceUpdate = !1;
  var firstBaseUpdate = queue.firstBaseUpdate,
    lastBaseUpdate = queue.lastBaseUpdate,
    pendingQueue = queue.shared.pending;
  if (null !== pendingQueue) {
    queue.shared.pending = null;
    var lastPendingUpdate = pendingQueue,
      firstPendingUpdate = lastPendingUpdate.next;
    lastPendingUpdate.next = null;
    null === lastBaseUpdate
      ? (firstBaseUpdate = firstPendingUpdate)
      : (lastBaseUpdate.next = firstPendingUpdate);
    lastBaseUpdate = lastPendingUpdate;
    var current = workInProgress$jscomp$0.alternate;
    if (null !== current) {
      current = current.updateQueue;
      var currentLastBaseUpdate = current.lastBaseUpdate;
      currentLastBaseUpdate !== lastBaseUpdate &&
        (null === currentLastBaseUpdate
          ? (current.firstBaseUpdate = firstPendingUpdate)
          : (currentLastBaseUpdate.next = firstPendingUpdate),
        (current.lastBaseUpdate = lastPendingUpdate));
    }
  }
  if (null !== firstBaseUpdate) {
    currentLastBaseUpdate = queue.baseState;
    lastBaseUpdate = 0;
    current = firstPendingUpdate = lastPendingUpdate = null;
    do {
      pendingQueue = firstBaseUpdate.expirationTime;
      if (pendingQueue < renderExpirationTime) {
        var clone = {
          expirationTime: firstBaseUpdate.expirationTime,
          suspenseConfig: firstBaseUpdate.suspenseConfig,
          tag: firstBaseUpdate.tag,
          payload: firstBaseUpdate.payload,
          callback: firstBaseUpdate.callback,
          next: null
        };
        null === current
          ? ((firstPendingUpdate = current = clone),
            (lastPendingUpdate = currentLastBaseUpdate))
          : (current = current.next = clone);
        pendingQueue > lastBaseUpdate && (lastBaseUpdate = pendingQueue);
      } else {
        null !== current &&
          (current = current.next = {
            expirationTime: 1073741823,
            suspenseConfig: firstBaseUpdate.suspenseConfig,
            tag: firstBaseUpdate.tag,
            payload: firstBaseUpdate.payload,
            callback: firstBaseUpdate.callback,
            next: null
          });
        markRenderEventTimeAndConfig(
          pendingQueue,
          firstBaseUpdate.suspenseConfig
        );
        a: {
          var workInProgress = workInProgress$jscomp$0,
            update = firstBaseUpdate;
          pendingQueue = props;
          clone = instance;
          switch (update.tag) {
            case 1:
              workInProgress = update.payload;
              if ("function" === typeof workInProgress) {
                currentLastBaseUpdate = workInProgress.call(
                  clone,
                  currentLastBaseUpdate,
                  pendingQueue
                );
                break a;
              }
              currentLastBaseUpdate = workInProgress;
              break a;
            case 3:
              workInProgress.effectTag =
                (workInProgress.effectTag & -4097) | 64;
            case 0:
              workInProgress = update.payload;
              pendingQueue =
                "function" === typeof workInProgress
                  ? workInProgress.call(
                      clone,
                      currentLastBaseUpdate,
                      pendingQueue
                    )
                  : workInProgress;
              if (null === pendingQueue || void 0 === pendingQueue) break a;
              currentLastBaseUpdate = Object.assign(
                {},
                currentLastBaseUpdate,
                pendingQueue
              );
              break a;
            case 2:
              hasForceUpdate = !0;
          }
        }
        null !== firstBaseUpdate.callback &&
          ((workInProgress$jscomp$0.effectTag |= 32),
          (pendingQueue = queue.effects),
          null === pendingQueue
            ? (queue.effects = [firstBaseUpdate])
            : pendingQueue.push(firstBaseUpdate));
      }
      firstBaseUpdate = firstBaseUpdate.next;
      if (null === firstBaseUpdate)
        if (((pendingQueue = queue.shared.pending), null === pendingQueue))
          break;
        else
          (firstBaseUpdate = pendingQueue.next),
            (pendingQueue.next = null),
            (queue.lastBaseUpdate = pendingQueue),
            (queue.shared.pending = null);
    } while (1);
    null === current && (lastPendingUpdate = currentLastBaseUpdate);
    queue.baseState = lastPendingUpdate;
    queue.firstBaseUpdate = firstPendingUpdate;
    queue.lastBaseUpdate = current;
    markUnprocessedUpdateTime(lastBaseUpdate);
    workInProgress$jscomp$0.expirationTime = lastBaseUpdate;
    workInProgress$jscomp$0.memoizedState = currentLastBaseUpdate;
  }
}
function commitUpdateQueue(finishedWork, finishedQueue, instance) {
  finishedWork = finishedQueue.effects;
  finishedQueue.effects = null;
  if (null !== finishedWork)
    for (
      finishedQueue = 0;
      finishedQueue < finishedWork.length;
      finishedQueue++
    ) {
      var effect = finishedWork[finishedQueue],
        callback = effect.callback;
      if (null !== callback) {
        effect.callback = null;
        effect = instance;
        if ("function" !== typeof callback)
          throw Error(formatProdErrorMessage(191, callback));
        callback.call(effect);
      }
    }
}
var ReactCurrentBatchConfig = ReactSharedInternals.ReactCurrentBatchConfig,
  emptyRefsObject = new React.Component().refs;
function applyDerivedStateFromProps(
  workInProgress,
  ctor,
  getDerivedStateFromProps,
  nextProps
) {
  ctor = workInProgress.memoizedState;
  getDerivedStateFromProps = getDerivedStateFromProps(nextProps, ctor);
  getDerivedStateFromProps =
    null === getDerivedStateFromProps || void 0 === getDerivedStateFromProps
      ? ctor
      : Object.assign({}, ctor, getDerivedStateFromProps);
  workInProgress.memoizedState = getDerivedStateFromProps;
  0 === workInProgress.expirationTime &&
    (workInProgress.updateQueue.baseState = getDerivedStateFromProps);
}
var classComponentUpdater = {
  isMounted: function(component) {
    return (component = component._reactInternals)
      ? getNearestMountedFiber(component) === component
      : !1;
  },
  enqueueSetState: function(inst, payload, callback) {
    inst = inst._reactInternals;
    var currentTime = requestCurrentTimeForUpdate(),
      suspenseConfig = ReactCurrentBatchConfig.suspense;
    currentTime = computeExpirationForFiber(currentTime, inst, suspenseConfig);
    suspenseConfig = createUpdate(currentTime, suspenseConfig);
    suspenseConfig.payload = payload;
    void 0 !== callback &&
      null !== callback &&
      (suspenseConfig.callback = callback);
    enqueueUpdate(inst, suspenseConfig);
    scheduleUpdateOnFiber(inst, currentTime);
  },
  enqueueReplaceState: function(inst, payload, callback) {
    inst = inst._reactInternals;
    var currentTime = requestCurrentTimeForUpdate(),
      suspenseConfig = ReactCurrentBatchConfig.suspense;
    currentTime = computeExpirationForFiber(currentTime, inst, suspenseConfig);
    suspenseConfig = createUpdate(currentTime, suspenseConfig);
    suspenseConfig.tag = 1;
    suspenseConfig.payload = payload;
    void 0 !== callback &&
      null !== callback &&
      (suspenseConfig.callback = callback);
    enqueueUpdate(inst, suspenseConfig);
    scheduleUpdateOnFiber(inst, currentTime);
  },
  enqueueForceUpdate: function(inst, callback) {
    inst = inst._reactInternals;
    var currentTime = requestCurrentTimeForUpdate(),
      suspenseConfig = ReactCurrentBatchConfig.suspense;
    currentTime = computeExpirationForFiber(currentTime, inst, suspenseConfig);
    suspenseConfig = createUpdate(currentTime, suspenseConfig);
    suspenseConfig.tag = 2;
    void 0 !== callback &&
      null !== callback &&
      (suspenseConfig.callback = callback);
    enqueueUpdate(inst, suspenseConfig);
    scheduleUpdateOnFiber(inst, currentTime);
  }
};
function checkShouldComponentUpdate(
  workInProgress,
  ctor,
  oldProps,
  newProps,
  oldState,
  newState,
  nextContext
) {
  workInProgress = workInProgress.stateNode;
  return "function" === typeof workInProgress.shouldComponentUpdate
    ? workInProgress.shouldComponentUpdate(newProps, newState, nextContext)
    : ctor.prototype && ctor.prototype.isPureReactComponent
    ? !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState)
    : !0;
}
function constructClassInstance(workInProgress, ctor, props) {
  var context = emptyContextObject,
    contextType = ctor.contextType;
  "object" === typeof contextType &&
    null !== contextType &&
    (context = readContext(contextType));
  ctor = new ctor(props, context);
  workInProgress.memoizedState =
    null !== ctor.state && void 0 !== ctor.state ? ctor.state : null;
  ctor.updater = classComponentUpdater;
  workInProgress.stateNode = ctor;
  ctor._reactInternals = workInProgress;
  return ctor;
}
function callComponentWillReceiveProps(
  workInProgress,
  instance,
  newProps,
  nextContext
) {
  workInProgress = instance.state;
  "function" === typeof instance.componentWillReceiveProps &&
    instance.componentWillReceiveProps(newProps, nextContext);
  "function" === typeof instance.UNSAFE_componentWillReceiveProps &&
    instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
  instance.state !== workInProgress &&
    classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
}
function mountClassInstance(
  workInProgress,
  ctor,
  newProps,
  renderExpirationTime
) {
  var instance = workInProgress.stateNode;
  instance.props = newProps;
  instance.state = workInProgress.memoizedState;
  instance.refs = emptyRefsObject;
  initializeUpdateQueue(workInProgress);
  var contextType = ctor.contextType;
  instance.context =
    "object" === typeof contextType && null !== contextType
      ? readContext(contextType)
      : emptyContextObject;
  processUpdateQueue(workInProgress, newProps, instance, renderExpirationTime);
  instance.state = workInProgress.memoizedState;
  contextType = ctor.getDerivedStateFromProps;
  "function" === typeof contextType &&
    (applyDerivedStateFromProps(workInProgress, ctor, contextType, newProps),
    (instance.state = workInProgress.memoizedState));
  "function" === typeof ctor.getDerivedStateFromProps ||
    "function" === typeof instance.getSnapshotBeforeUpdate ||
    ("function" !== typeof instance.UNSAFE_componentWillMount &&
      "function" !== typeof instance.componentWillMount) ||
    ((ctor = instance.state),
    "function" === typeof instance.componentWillMount &&
      instance.componentWillMount(),
    "function" === typeof instance.UNSAFE_componentWillMount &&
      instance.UNSAFE_componentWillMount(),
    ctor !== instance.state &&
      classComponentUpdater.enqueueReplaceState(instance, instance.state, null),
    processUpdateQueue(
      workInProgress,
      newProps,
      instance,
      renderExpirationTime
    ),
    (instance.state = workInProgress.memoizedState));
  "function" === typeof instance.componentDidMount &&
    (workInProgress.effectTag |= 4);
}
var isArray = Array.isArray;
function coerceRef(returnFiber, current, element) {
  returnFiber = element.ref;
  if (
    null !== returnFiber &&
    "function" !== typeof returnFiber &&
    "object" !== typeof returnFiber
  ) {
    if (element._owner) {
      element = element._owner;
      if (element) {
        if (1 !== element.tag) throw Error(formatProdErrorMessage(309));
        var inst = element.stateNode;
      }
      if (!inst) throw Error(formatProdErrorMessage(147, returnFiber));
      var stringRef = "" + returnFiber;
      if (
        null !== current &&
        null !== current.ref &&
        "function" === typeof current.ref &&
        current.ref._stringRef === stringRef
      )
        return current.ref;
      current = function(value) {
        var refs = inst.refs;
        refs === emptyRefsObject && (refs = inst.refs = {});
        null === value ? delete refs[stringRef] : (refs[stringRef] = value);
      };
      current._stringRef = stringRef;
      return current;
    }
    if ("string" !== typeof returnFiber)
      throw Error(formatProdErrorMessage(284));
    if (!element._owner) throw Error(formatProdErrorMessage(290, returnFiber));
  }
  return returnFiber;
}
function throwOnInvalidObjectType(returnFiber, newChild) {
  if ("textarea" !== returnFiber.type)
    throw Error(
      formatProdErrorMessage(
        31,
        "[object Object]" === Object.prototype.toString.call(newChild)
          ? "object with keys {" + Object.keys(newChild).join(", ") + "}"
          : newChild,
        ""
      )
    );
}
function resolveLazyType(lazyComponent) {
  try {
    var init = lazyComponent._init;
    return init(lazyComponent._payload);
  } catch (x) {
    return lazyComponent;
  }
}
function ChildReconciler(shouldTrackSideEffects) {
  function deleteChild(returnFiber, childToDelete) {
    if (shouldTrackSideEffects) {
      var last = returnFiber.lastEffect;
      null !== last
        ? ((last.nextEffect = childToDelete),
          (returnFiber.lastEffect = childToDelete))
        : (returnFiber.firstEffect = returnFiber.lastEffect = childToDelete);
      childToDelete.nextEffect = null;
      childToDelete.effectTag = 8;
    }
  }
  function deleteRemainingChildren(returnFiber, currentFirstChild) {
    if (!shouldTrackSideEffects) return null;
    for (; null !== currentFirstChild; )
      deleteChild(returnFiber, currentFirstChild),
        (currentFirstChild = currentFirstChild.sibling);
    return null;
  }
  function mapRemainingChildren(returnFiber, currentFirstChild) {
    for (returnFiber = new Map(); null !== currentFirstChild; )
      null !== currentFirstChild.key
        ? returnFiber.set(currentFirstChild.key, currentFirstChild)
        : returnFiber.set(currentFirstChild.index, currentFirstChild),
        (currentFirstChild = currentFirstChild.sibling);
    return returnFiber;
  }
  function useFiber(fiber, pendingProps) {
    fiber = createWorkInProgress(fiber, pendingProps);
    fiber.index = 0;
    fiber.sibling = null;
    return fiber;
  }
  function placeChild(newFiber, lastPlacedIndex, newIndex) {
    newFiber.index = newIndex;
    if (!shouldTrackSideEffects) return lastPlacedIndex;
    newIndex = newFiber.alternate;
    if (null !== newIndex)
      return (
        (newIndex = newIndex.index),
        newIndex < lastPlacedIndex
          ? ((newFiber.effectTag = 2), lastPlacedIndex)
          : newIndex
      );
    newFiber.effectTag = 2;
    return lastPlacedIndex;
  }
  function placeSingleChild(newFiber) {
    shouldTrackSideEffects &&
      null === newFiber.alternate &&
      (newFiber.effectTag = 2);
    return newFiber;
  }
  function updateTextNode(returnFiber, current, textContent, expirationTime) {
    if (null === current || 6 !== current.tag)
      return (
        (current = createFiberFromText(
          textContent,
          returnFiber.mode,
          expirationTime
        )),
        (current.return = returnFiber),
        current
      );
    current = useFiber(current, textContent);
    current.return = returnFiber;
    return current;
  }
  function updateElement(returnFiber, current, element, expirationTime) {
    if (null !== current) {
      if (current.elementType === element.type) {
        var existing = useFiber(current, element.props);
        existing.ref = coerceRef(returnFiber, current, element);
        existing.return = returnFiber;
        return existing;
      }
      if (
        22 === current.tag &&
        ((existing = element.type),
        existing.$$typeof === REACT_LAZY_TYPE &&
          (existing = resolveLazyType(existing)),
        existing.$$typeof === REACT_BLOCK_TYPE &&
          existing._render === current.type._render)
      )
        return (
          (current = useFiber(current, element.props)),
          (current.return = returnFiber),
          (current.type = existing),
          current
        );
    }
    existing = createFiberFromTypeAndProps(
      element.type,
      element.key,
      element.props,
      null,
      returnFiber.mode,
      expirationTime
    );
    existing.ref = coerceRef(returnFiber, current, element);
    existing.return = returnFiber;
    return existing;
  }
  function updatePortal(returnFiber, current, portal, expirationTime) {
    if (
      null === current ||
      4 !== current.tag ||
      current.stateNode.containerInfo !== portal.containerInfo ||
      current.stateNode.implementation !== portal.implementation
    )
      return (
        (current = createFiberFromPortal(
          portal,
          returnFiber.mode,
          expirationTime
        )),
        (current.return = returnFiber),
        current
      );
    current = useFiber(current, portal.children || []);
    current.return = returnFiber;
    return current;
  }
  function updateFragment(returnFiber, current, fragment, expirationTime, key) {
    if (null === current || 7 !== current.tag)
      return (
        (current = createFiberFromFragment(
          fragment,
          returnFiber.mode,
          expirationTime,
          key
        )),
        (current.return = returnFiber),
        current
      );
    current = useFiber(current, fragment);
    current.return = returnFiber;
    return current;
  }
  function createChild(returnFiber, newChild, expirationTime) {
    if ("string" === typeof newChild || "number" === typeof newChild)
      return (
        (newChild = createFiberFromText(
          "" + newChild,
          returnFiber.mode,
          expirationTime
        )),
        (newChild.return = returnFiber),
        newChild
      );
    if ("object" === typeof newChild && null !== newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return (
            (expirationTime = createFiberFromTypeAndProps(
              newChild.type,
              newChild.key,
              newChild.props,
              null,
              returnFiber.mode,
              expirationTime
            )),
            (expirationTime.ref = coerceRef(returnFiber, null, newChild)),
            (expirationTime.return = returnFiber),
            expirationTime
          );
        case REACT_PORTAL_TYPE:
          return (
            (newChild = createFiberFromPortal(
              newChild,
              returnFiber.mode,
              expirationTime
            )),
            (newChild.return = returnFiber),
            newChild
          );
      }
      if (isArray(newChild) || getIteratorFn(newChild))
        return (
          (newChild = createFiberFromFragment(
            newChild,
            returnFiber.mode,
            expirationTime,
            null
          )),
          (newChild.return = returnFiber),
          newChild
        );
      throwOnInvalidObjectType(returnFiber, newChild);
    }
    return null;
  }
  function updateSlot(returnFiber, oldFiber, newChild, expirationTime) {
    var key = null !== oldFiber ? oldFiber.key : null;
    if ("string" === typeof newChild || "number" === typeof newChild)
      return null !== key
        ? null
        : updateTextNode(returnFiber, oldFiber, "" + newChild, expirationTime);
    if ("object" === typeof newChild && null !== newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return newChild.key === key
            ? newChild.type === REACT_FRAGMENT_TYPE
              ? updateFragment(
                  returnFiber,
                  oldFiber,
                  newChild.props.children,
                  expirationTime,
                  key
                )
              : updateElement(returnFiber, oldFiber, newChild, expirationTime)
            : null;
        case REACT_PORTAL_TYPE:
          return newChild.key === key
            ? updatePortal(returnFiber, oldFiber, newChild, expirationTime)
            : null;
      }
      if (isArray(newChild) || getIteratorFn(newChild))
        return null !== key
          ? null
          : updateFragment(
              returnFiber,
              oldFiber,
              newChild,
              expirationTime,
              null
            );
      throwOnInvalidObjectType(returnFiber, newChild);
    }
    return null;
  }
  function updateFromMap(
    existingChildren,
    returnFiber,
    newIdx,
    newChild,
    expirationTime
  ) {
    if ("string" === typeof newChild || "number" === typeof newChild)
      return (
        (existingChildren = existingChildren.get(newIdx) || null),
        updateTextNode(
          returnFiber,
          existingChildren,
          "" + newChild,
          expirationTime
        )
      );
    if ("object" === typeof newChild && null !== newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return (
            (existingChildren =
              existingChildren.get(
                null === newChild.key ? newIdx : newChild.key
              ) || null),
            newChild.type === REACT_FRAGMENT_TYPE
              ? updateFragment(
                  returnFiber,
                  existingChildren,
                  newChild.props.children,
                  expirationTime,
                  newChild.key
                )
              : updateElement(
                  returnFiber,
                  existingChildren,
                  newChild,
                  expirationTime
                )
          );
        case REACT_PORTAL_TYPE:
          return (
            (existingChildren =
              existingChildren.get(
                null === newChild.key ? newIdx : newChild.key
              ) || null),
            updatePortal(
              returnFiber,
              existingChildren,
              newChild,
              expirationTime
            )
          );
      }
      if (isArray(newChild) || getIteratorFn(newChild))
        return (
          (existingChildren = existingChildren.get(newIdx) || null),
          updateFragment(
            returnFiber,
            existingChildren,
            newChild,
            expirationTime,
            null
          )
        );
      throwOnInvalidObjectType(returnFiber, newChild);
    }
    return null;
  }
  function reconcileChildrenArray(
    returnFiber,
    currentFirstChild,
    newChildren,
    expirationTime
  ) {
    for (
      var resultingFirstChild = null,
        previousNewFiber = null,
        oldFiber = currentFirstChild,
        newIdx = (currentFirstChild = 0),
        nextOldFiber = null;
      null !== oldFiber && newIdx < newChildren.length;
      newIdx++
    ) {
      oldFiber.index > newIdx
        ? ((nextOldFiber = oldFiber), (oldFiber = null))
        : (nextOldFiber = oldFiber.sibling);
      var newFiber = updateSlot(
        returnFiber,
        oldFiber,
        newChildren[newIdx],
        expirationTime
      );
      if (null === newFiber) {
        null === oldFiber && (oldFiber = nextOldFiber);
        break;
      }
      shouldTrackSideEffects &&
        oldFiber &&
        null === newFiber.alternate &&
        deleteChild(returnFiber, oldFiber);
      currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
      null === previousNewFiber
        ? (resultingFirstChild = newFiber)
        : (previousNewFiber.sibling = newFiber);
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }
    if (newIdx === newChildren.length)
      return (
        deleteRemainingChildren(returnFiber, oldFiber), resultingFirstChild
      );
    if (null === oldFiber) {
      for (; newIdx < newChildren.length; newIdx++)
        (oldFiber = createChild(
          returnFiber,
          newChildren[newIdx],
          expirationTime
        )),
          null !== oldFiber &&
            ((currentFirstChild = placeChild(
              oldFiber,
              currentFirstChild,
              newIdx
            )),
            null === previousNewFiber
              ? (resultingFirstChild = oldFiber)
              : (previousNewFiber.sibling = oldFiber),
            (previousNewFiber = oldFiber));
      return resultingFirstChild;
    }
    for (
      oldFiber = mapRemainingChildren(returnFiber, oldFiber);
      newIdx < newChildren.length;
      newIdx++
    )
      (nextOldFiber = updateFromMap(
        oldFiber,
        returnFiber,
        newIdx,
        newChildren[newIdx],
        expirationTime
      )),
        null !== nextOldFiber &&
          (shouldTrackSideEffects &&
            null !== nextOldFiber.alternate &&
            oldFiber.delete(
              null === nextOldFiber.key ? newIdx : nextOldFiber.key
            ),
          (currentFirstChild = placeChild(
            nextOldFiber,
            currentFirstChild,
            newIdx
          )),
          null === previousNewFiber
            ? (resultingFirstChild = nextOldFiber)
            : (previousNewFiber.sibling = nextOldFiber),
          (previousNewFiber = nextOldFiber));
    shouldTrackSideEffects &&
      oldFiber.forEach(function(child) {
        return deleteChild(returnFiber, child);
      });
    return resultingFirstChild;
  }
  function reconcileChildrenIterator(
    returnFiber,
    currentFirstChild,
    newChildrenIterable,
    expirationTime
  ) {
    var iteratorFn = getIteratorFn(newChildrenIterable);
    if ("function" !== typeof iteratorFn)
      throw Error(formatProdErrorMessage(150));
    newChildrenIterable = iteratorFn.call(newChildrenIterable);
    if (null == newChildrenIterable) throw Error(formatProdErrorMessage(151));
    for (
      var previousNewFiber = (iteratorFn = null),
        oldFiber = currentFirstChild,
        newIdx = (currentFirstChild = 0),
        nextOldFiber = null,
        step = newChildrenIterable.next();
      null !== oldFiber && !step.done;
      newIdx++, step = newChildrenIterable.next()
    ) {
      oldFiber.index > newIdx
        ? ((nextOldFiber = oldFiber), (oldFiber = null))
        : (nextOldFiber = oldFiber.sibling);
      var newFiber = updateSlot(
        returnFiber,
        oldFiber,
        step.value,
        expirationTime
      );
      if (null === newFiber) {
        null === oldFiber && (oldFiber = nextOldFiber);
        break;
      }
      shouldTrackSideEffects &&
        oldFiber &&
        null === newFiber.alternate &&
        deleteChild(returnFiber, oldFiber);
      currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
      null === previousNewFiber
        ? (iteratorFn = newFiber)
        : (previousNewFiber.sibling = newFiber);
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }
    if (step.done)
      return deleteRemainingChildren(returnFiber, oldFiber), iteratorFn;
    if (null === oldFiber) {
      for (; !step.done; newIdx++, step = newChildrenIterable.next())
        (step = createChild(returnFiber, step.value, expirationTime)),
          null !== step &&
            ((currentFirstChild = placeChild(step, currentFirstChild, newIdx)),
            null === previousNewFiber
              ? (iteratorFn = step)
              : (previousNewFiber.sibling = step),
            (previousNewFiber = step));
      return iteratorFn;
    }
    for (
      oldFiber = mapRemainingChildren(returnFiber, oldFiber);
      !step.done;
      newIdx++, step = newChildrenIterable.next()
    )
      (step = updateFromMap(
        oldFiber,
        returnFiber,
        newIdx,
        step.value,
        expirationTime
      )),
        null !== step &&
          (shouldTrackSideEffects &&
            null !== step.alternate &&
            oldFiber.delete(null === step.key ? newIdx : step.key),
          (currentFirstChild = placeChild(step, currentFirstChild, newIdx)),
          null === previousNewFiber
            ? (iteratorFn = step)
            : (previousNewFiber.sibling = step),
          (previousNewFiber = step));
    shouldTrackSideEffects &&
      oldFiber.forEach(function(child) {
        return deleteChild(returnFiber, child);
      });
    return iteratorFn;
  }
  return function(returnFiber, currentFirstChild, newChild, expirationTime) {
    var isUnkeyedTopLevelFragment =
      "object" === typeof newChild &&
      null !== newChild &&
      newChild.type === REACT_FRAGMENT_TYPE &&
      null === newChild.key;
    isUnkeyedTopLevelFragment && (newChild = newChild.props.children);
    var isObject = "object" === typeof newChild && null !== newChild;
    if (isObject)
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          a: {
            isObject = newChild.key;
            for (
              isUnkeyedTopLevelFragment = currentFirstChild;
              null !== isUnkeyedTopLevelFragment;

            ) {
              if (isUnkeyedTopLevelFragment.key === isObject) {
                switch (isUnkeyedTopLevelFragment.tag) {
                  case 7:
                    if (newChild.type === REACT_FRAGMENT_TYPE) {
                      deleteRemainingChildren(
                        returnFiber,
                        isUnkeyedTopLevelFragment.sibling
                      );
                      currentFirstChild = useFiber(
                        isUnkeyedTopLevelFragment,
                        newChild.props.children
                      );
                      currentFirstChild.return = returnFiber;
                      returnFiber = currentFirstChild;
                      break a;
                    }
                    break;
                  case 22:
                    if (
                      ((isObject = newChild.type),
                      isObject.$$typeof === REACT_LAZY_TYPE &&
                        (isObject = resolveLazyType(isObject)),
                      isObject.$$typeof === REACT_BLOCK_TYPE &&
                        isObject._render ===
                          isUnkeyedTopLevelFragment.type._render)
                    ) {
                      deleteRemainingChildren(
                        returnFiber,
                        isUnkeyedTopLevelFragment.sibling
                      );
                      currentFirstChild = useFiber(
                        isUnkeyedTopLevelFragment,
                        newChild.props
                      );
                      currentFirstChild.type = isObject;
                      currentFirstChild.return = returnFiber;
                      returnFiber = currentFirstChild;
                      break a;
                    }
                  default:
                    if (
                      isUnkeyedTopLevelFragment.elementType === newChild.type
                    ) {
                      deleteRemainingChildren(
                        returnFiber,
                        isUnkeyedTopLevelFragment.sibling
                      );
                      currentFirstChild = useFiber(
                        isUnkeyedTopLevelFragment,
                        newChild.props
                      );
                      currentFirstChild.ref = coerceRef(
                        returnFiber,
                        isUnkeyedTopLevelFragment,
                        newChild
                      );
                      currentFirstChild.return = returnFiber;
                      returnFiber = currentFirstChild;
                      break a;
                    }
                }
                deleteRemainingChildren(returnFiber, isUnkeyedTopLevelFragment);
                break;
              } else deleteChild(returnFiber, isUnkeyedTopLevelFragment);
              isUnkeyedTopLevelFragment = isUnkeyedTopLevelFragment.sibling;
            }
            newChild.type === REACT_FRAGMENT_TYPE
              ? ((currentFirstChild = createFiberFromFragment(
                  newChild.props.children,
                  returnFiber.mode,
                  expirationTime,
                  newChild.key
                )),
                (currentFirstChild.return = returnFiber),
                (returnFiber = currentFirstChild))
              : ((expirationTime = createFiberFromTypeAndProps(
                  newChild.type,
                  newChild.key,
                  newChild.props,
                  null,
                  returnFiber.mode,
                  expirationTime
                )),
                (expirationTime.ref = coerceRef(
                  returnFiber,
                  currentFirstChild,
                  newChild
                )),
                (expirationTime.return = returnFiber),
                (returnFiber = expirationTime));
          }
          return placeSingleChild(returnFiber);
        case REACT_PORTAL_TYPE:
          a: {
            for (
              isUnkeyedTopLevelFragment = newChild.key;
              null !== currentFirstChild;

            ) {
              if (currentFirstChild.key === isUnkeyedTopLevelFragment)
                if (
                  4 === currentFirstChild.tag &&
                  currentFirstChild.stateNode.containerInfo ===
                    newChild.containerInfo &&
                  currentFirstChild.stateNode.implementation ===
                    newChild.implementation
                ) {
                  deleteRemainingChildren(
                    returnFiber,
                    currentFirstChild.sibling
                  );
                  currentFirstChild = useFiber(
                    currentFirstChild,
                    newChild.children || []
                  );
                  currentFirstChild.return = returnFiber;
                  returnFiber = currentFirstChild;
                  break a;
                } else {
                  deleteRemainingChildren(returnFiber, currentFirstChild);
                  break;
                }
              else deleteChild(returnFiber, currentFirstChild);
              currentFirstChild = currentFirstChild.sibling;
            }
            currentFirstChild = createFiberFromPortal(
              newChild,
              returnFiber.mode,
              expirationTime
            );
            currentFirstChild.return = returnFiber;
            returnFiber = currentFirstChild;
          }
          return placeSingleChild(returnFiber);
      }
    if ("string" === typeof newChild || "number" === typeof newChild)
      return (
        (newChild = "" + newChild),
        null !== currentFirstChild && 6 === currentFirstChild.tag
          ? (deleteRemainingChildren(returnFiber, currentFirstChild.sibling),
            (currentFirstChild = useFiber(currentFirstChild, newChild)),
            (currentFirstChild.return = returnFiber),
            (returnFiber = currentFirstChild))
          : (deleteRemainingChildren(returnFiber, currentFirstChild),
            (currentFirstChild = createFiberFromText(
              newChild,
              returnFiber.mode,
              expirationTime
            )),
            (currentFirstChild.return = returnFiber),
            (returnFiber = currentFirstChild)),
        placeSingleChild(returnFiber)
      );
    if (isArray(newChild))
      return reconcileChildrenArray(
        returnFiber,
        currentFirstChild,
        newChild,
        expirationTime
      );
    if (getIteratorFn(newChild))
      return reconcileChildrenIterator(
        returnFiber,
        currentFirstChild,
        newChild,
        expirationTime
      );
    isObject && throwOnInvalidObjectType(returnFiber, newChild);
    if ("undefined" === typeof newChild && !isUnkeyedTopLevelFragment)
      switch (returnFiber.tag) {
        case 1:
        case 0:
          throw ((returnFiber = returnFiber.type),
          Error(
            formatProdErrorMessage(
              152,
              returnFiber.displayName || returnFiber.name || "Component"
            )
          ));
      }
    return deleteRemainingChildren(returnFiber, currentFirstChild);
  };
}
var reconcileChildFibers = ChildReconciler(!0),
  mountChildFibers = ChildReconciler(!1),
  NO_CONTEXT = {},
  contextStackCursor = { current: NO_CONTEXT },
  contextFiberStackCursor = { current: NO_CONTEXT },
  rootInstanceStackCursor = { current: NO_CONTEXT };
function requiredContext(c) {
  if (c === NO_CONTEXT) throw Error(formatProdErrorMessage(174));
  return c;
}
function pushHostContainer(fiber, nextRootInstance) {
  push(rootInstanceStackCursor, nextRootInstance);
  push(contextFiberStackCursor, fiber);
  push(contextStackCursor, NO_CONTEXT);
  fiber = nextRootInstance.nodeType;
  switch (fiber) {
    case 9:
    case 11:
      nextRootInstance = (nextRootInstance = nextRootInstance.documentElement)
        ? nextRootInstance.namespaceURI
        : getChildNamespace(null, "");
      break;
    default:
      (fiber = 8 === fiber ? nextRootInstance.parentNode : nextRootInstance),
        (nextRootInstance = fiber.namespaceURI || null),
        (fiber = fiber.tagName),
        (nextRootInstance = getChildNamespace(nextRootInstance, fiber));
  }
  pop(contextStackCursor);
  push(contextStackCursor, nextRootInstance);
}
function popHostContainer() {
  pop(contextStackCursor);
  pop(contextFiberStackCursor);
  pop(rootInstanceStackCursor);
}
function pushHostContext(fiber) {
  requiredContext(rootInstanceStackCursor.current);
  var context = requiredContext(contextStackCursor.current);
  var JSCompiler_inline_result = getChildNamespace(context, fiber.type);
  context !== JSCompiler_inline_result &&
    (push(contextFiberStackCursor, fiber),
    push(contextStackCursor, JSCompiler_inline_result));
}
function popHostContext(fiber) {
  contextFiberStackCursor.current === fiber &&
    (pop(contextStackCursor), pop(contextFiberStackCursor));
}
var suspenseStackCursor = { current: 0 };
function findFirstSuspended(row) {
  for (var node = row; null !== node; ) {
    if (13 === node.tag) {
      var state = node.memoizedState;
      if (
        null !== state &&
        ((state = state.dehydrated),
        null === state || "$?" === state.data || "$!" === state.data)
      )
        return node;
    } else if (19 === node.tag && void 0 !== node.memoizedProps.revealOrder) {
      if (0 !== (node.effectTag & 64)) return node;
    } else if (null !== node.child) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === row) break;
    for (; null === node.sibling; ) {
      if (null === node.return || node.return === row) return null;
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
  return null;
}
var emptyObject = {},
  isArray$1 = Array.isArray;
function updateEventListener(
  listener,
  fiber,
  visistedResponders,
  respondersMap,
  rootContainerInstance
) {
  if (listener) {
    var responder = listener.responder;
    var props = listener.props;
  }
  if (!responder || responder.$$typeof !== REACT_RESPONDER_TYPE)
    throw Error(formatProdErrorMessage(339));
  listener = props;
  if (!visistedResponders.has(responder))
    if (
      (visistedResponders.add(responder),
      (visistedResponders = respondersMap.get(responder)),
      void 0 === visistedResponders)
    ) {
      visistedResponders = rootContainerInstance;
      props = emptyObject;
      rootContainerInstance = responder.getInitialState;
      null !== rootContainerInstance &&
        (props = rootContainerInstance(listener));
      rootContainerInstance = {
        fiber: fiber,
        props: listener,
        responder: responder,
        rootEventTypes: null,
        state: props
      };
      if (!visistedResponders)
        for (; null !== fiber; ) {
          var tag = fiber.tag;
          if (5 === tag) {
            visistedResponders = fiber.stateNode;
            break;
          } else if (3 === tag) {
            visistedResponders = fiber.stateNode.containerInfo;
            break;
          }
          fiber = fiber.return;
        }
      fiber = props;
      visistedResponders = visistedResponders.ownerDocument;
      props = responder.targetEventTypes;
      null !== props &&
        listenToEventResponderEventTypes(props, visistedResponders);
      visistedResponders = responder.onMount;
      if (null !== visistedResponders) {
        props = currentInstance;
        currentInstance = rootContainerInstance;
        try {
          visistedResponders(eventResponderContext, listener, fiber);
        } finally {
          currentInstance = props;
        }
      }
      respondersMap.set(responder, rootContainerInstance);
    } else
      (visistedResponders.props = listener), (visistedResponders.fiber = fiber);
}
function updateDeprecatedEventListeners(
  listeners,
  fiber,
  rootContainerInstance
) {
  var visistedResponders = new Set(),
    dependencies = fiber.dependencies;
  if (null != listeners) {
    null === dependencies &&
      (dependencies = fiber.dependencies = {
        expirationTime: 0,
        firstContext: null,
        responders: new Map()
      });
    var respondersMap = dependencies.responders;
    null === respondersMap &&
      (dependencies.responders = respondersMap = new Map());
    if (isArray$1(listeners))
      for (var i = 0, length = listeners.length; i < length; i++)
        updateEventListener(
          listeners[i],
          fiber,
          visistedResponders,
          respondersMap,
          rootContainerInstance
        );
    else
      updateEventListener(
        listeners,
        fiber,
        visistedResponders,
        respondersMap,
        rootContainerInstance
      );
  }
  if (
    null !== dependencies &&
    ((listeners = dependencies.responders), null !== listeners)
  )
    for (
      fiber = Array.from(listeners.keys()),
        rootContainerInstance = 0,
        dependencies = fiber.length;
      rootContainerInstance < dependencies;
      rootContainerInstance++
    )
      (respondersMap = fiber[rootContainerInstance]),
        visistedResponders.has(respondersMap) ||
          ((i = listeners.get(respondersMap)),
          unmountEventResponder(i),
          listeners.delete(respondersMap));
}
function createDeprecatedResponderListener(responder, props) {
  return { responder: responder, props: props };
}
function unmountDeprecatedResponderListeners(fiber) {
  fiber = fiber.dependencies;
  if (null !== fiber) {
    var respondersMap = fiber.responders;
    if (null !== respondersMap) {
      respondersMap = Array.from(respondersMap.values());
      for (var i = 0, length = respondersMap.length; i < length; i++)
        unmountEventResponder(respondersMap[i]);
      fiber.responders = null;
    }
  }
}
var workInProgressPrimarySources = [];
function resetWorkInProgressVersions() {
  for (var i = 0; i < workInProgressPrimarySources.length; i++)
    workInProgressPrimarySources[i]._workInProgressVersionPrimary = null;
  workInProgressPrimarySources.length = 0;
}
var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher,
  ReactCurrentBatchConfig$1 = ReactSharedInternals.ReactCurrentBatchConfig,
  renderExpirationTime = 0,
  currentlyRenderingFiber$1 = null,
  currentHook = null,
  workInProgressHook = null,
  didScheduleRenderPhaseUpdate = !1;
function throwInvalidHookError() {
  throw Error(formatProdErrorMessage(321));
}
function areHookInputsEqual(nextDeps, prevDeps) {
  if (null === prevDeps) return !1;
  for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++)
    if (!objectIs(nextDeps[i], prevDeps[i])) return !1;
  return !0;
}
function renderWithHooks(
  current,
  workInProgress,
  Component,
  props,
  secondArg,
  nextRenderExpirationTime
) {
  renderExpirationTime = nextRenderExpirationTime;
  currentlyRenderingFiber$1 = workInProgress;
  workInProgress.memoizedState = null;
  workInProgress.updateQueue = null;
  workInProgress.expirationTime = 0;
  ReactCurrentDispatcher.current =
    null === current || null === current.memoizedState
      ? HooksDispatcherOnMount
      : HooksDispatcherOnUpdate;
  current = Component(props, secondArg);
  if (workInProgress.expirationTime === renderExpirationTime) {
    nextRenderExpirationTime = 0;
    do {
      workInProgress.expirationTime = 0;
      if (!(25 > nextRenderExpirationTime))
        throw Error(formatProdErrorMessage(301));
      nextRenderExpirationTime += 1;
      workInProgressHook = currentHook = null;
      workInProgress.updateQueue = null;
      ReactCurrentDispatcher.current = HooksDispatcherOnRerender;
      current = Component(props, secondArg);
    } while (workInProgress.expirationTime === renderExpirationTime);
  }
  ReactCurrentDispatcher.current = ContextOnlyDispatcher;
  workInProgress = null !== currentHook && null !== currentHook.next;
  renderExpirationTime = 0;
  workInProgressHook = currentHook = currentlyRenderingFiber$1 = null;
  didScheduleRenderPhaseUpdate = !1;
  if (workInProgress) throw Error(formatProdErrorMessage(300));
  return current;
}
function bailoutHooks(current, workInProgress, expirationTime) {
  workInProgress.updateQueue = current.updateQueue;
  workInProgress.effectTag &= -517;
  current.expirationTime <= expirationTime && (current.expirationTime = 0);
}
function mountWorkInProgressHook() {
  var hook = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null
  };
  null === workInProgressHook
    ? (currentlyRenderingFiber$1.memoizedState = workInProgressHook = hook)
    : (workInProgressHook = workInProgressHook.next = hook);
  return workInProgressHook;
}
function updateWorkInProgressHook() {
  if (null === currentHook) {
    var nextCurrentHook = currentlyRenderingFiber$1.alternate;
    nextCurrentHook =
      null !== nextCurrentHook ? nextCurrentHook.memoizedState : null;
  } else nextCurrentHook = currentHook.next;
  var nextWorkInProgressHook =
    null === workInProgressHook
      ? currentlyRenderingFiber$1.memoizedState
      : workInProgressHook.next;
  if (null !== nextWorkInProgressHook)
    (workInProgressHook = nextWorkInProgressHook),
      (currentHook = nextCurrentHook);
  else {
    if (null === nextCurrentHook) throw Error(formatProdErrorMessage(310));
    currentHook = nextCurrentHook;
    nextCurrentHook = {
      memoizedState: currentHook.memoizedState,
      baseState: currentHook.baseState,
      baseQueue: currentHook.baseQueue,
      queue: currentHook.queue,
      next: null
    };
    null === workInProgressHook
      ? (currentlyRenderingFiber$1.memoizedState = workInProgressHook = nextCurrentHook)
      : (workInProgressHook = workInProgressHook.next = nextCurrentHook);
  }
  return workInProgressHook;
}
function basicStateReducer(state, action) {
  return "function" === typeof action ? action(state) : action;
}
function updateReducer(reducer) {
  var hook = updateWorkInProgressHook(),
    queue = hook.queue;
  if (null === queue) throw Error(formatProdErrorMessage(311));
  queue.lastRenderedReducer = reducer;
  var current = currentHook,
    baseQueue = current.baseQueue,
    pendingQueue = queue.pending;
  if (null !== pendingQueue) {
    if (null !== baseQueue) {
      var baseFirst = baseQueue.next;
      baseQueue.next = pendingQueue.next;
      pendingQueue.next = baseFirst;
    }
    current.baseQueue = baseQueue = pendingQueue;
    queue.pending = null;
  }
  if (null !== baseQueue) {
    baseQueue = baseQueue.next;
    current = current.baseState;
    var newBaseQueueLast = (baseFirst = pendingQueue = null),
      update = baseQueue;
    do {
      var updateExpirationTime = update.expirationTime;
      if (updateExpirationTime < renderExpirationTime) {
        var clone = {
          expirationTime: update.expirationTime,
          suspenseConfig: update.suspenseConfig,
          action: update.action,
          eagerReducer: update.eagerReducer,
          eagerState: update.eagerState,
          next: null
        };
        null === newBaseQueueLast
          ? ((baseFirst = newBaseQueueLast = clone), (pendingQueue = current))
          : (newBaseQueueLast = newBaseQueueLast.next = clone);
        updateExpirationTime > currentlyRenderingFiber$1.expirationTime &&
          ((currentlyRenderingFiber$1.expirationTime = updateExpirationTime),
          markUnprocessedUpdateTime(updateExpirationTime));
      } else
        null !== newBaseQueueLast &&
          (newBaseQueueLast = newBaseQueueLast.next = {
            expirationTime: 1073741823,
            suspenseConfig: update.suspenseConfig,
            action: update.action,
            eagerReducer: update.eagerReducer,
            eagerState: update.eagerState,
            next: null
          }),
          markRenderEventTimeAndConfig(
            updateExpirationTime,
            update.suspenseConfig
          ),
          (current =
            update.eagerReducer === reducer
              ? update.eagerState
              : reducer(current, update.action));
      update = update.next;
    } while (null !== update && update !== baseQueue);
    null === newBaseQueueLast
      ? (pendingQueue = current)
      : (newBaseQueueLast.next = baseFirst);
    objectIs(current, hook.memoizedState) || (didReceiveUpdate = !0);
    hook.memoizedState = current;
    hook.baseState = pendingQueue;
    hook.baseQueue = newBaseQueueLast;
    queue.lastRenderedState = current;
  }
  return [hook.memoizedState, queue.dispatch];
}
function rerenderReducer(reducer) {
  var hook = updateWorkInProgressHook(),
    queue = hook.queue;
  if (null === queue) throw Error(formatProdErrorMessage(311));
  queue.lastRenderedReducer = reducer;
  var dispatch = queue.dispatch,
    lastRenderPhaseUpdate = queue.pending,
    newState = hook.memoizedState;
  if (null !== lastRenderPhaseUpdate) {
    queue.pending = null;
    var update = (lastRenderPhaseUpdate = lastRenderPhaseUpdate.next);
    do (newState = reducer(newState, update.action)), (update = update.next);
    while (update !== lastRenderPhaseUpdate);
    objectIs(newState, hook.memoizedState) || (didReceiveUpdate = !0);
    hook.memoizedState = newState;
    null === hook.baseQueue && (hook.baseState = newState);
    queue.lastRenderedState = newState;
  }
  return [newState, dispatch];
}
function readFromUnsubcribedMutableSource(root, source, getSnapshot) {
  var getVersion = source._getVersion;
  getVersion = getVersion(source._source);
  var JSCompiler_inline_result = source._workInProgressVersionPrimary;
  if (null !== JSCompiler_inline_result)
    root = JSCompiler_inline_result === getVersion;
  else if (
    ((root = root.mutableSourcePendingUpdateTime),
    (root = 0 === root ? !0 : 0 === root || root >= renderExpirationTime))
  )
    (source._workInProgressVersionPrimary = getVersion),
      workInProgressPrimarySources.push(source);
  if (root) return getSnapshot(source._source);
  workInProgressPrimarySources.push(source);
  throw Error(formatProdErrorMessage(350));
}
function useMutableSource(hook, source, getSnapshot, subscribe) {
  var root = workInProgressRoot;
  if (null === root) throw Error(formatProdErrorMessage(349));
  var getVersion = source._getVersion,
    version = getVersion(source._source),
    dispatcher = ReactCurrentDispatcher.current,
    _dispatcher$useState = dispatcher.useState(function() {
      return readFromUnsubcribedMutableSource(root, source, getSnapshot);
    }),
    snapshot = _dispatcher$useState[0],
    setSnapshot = _dispatcher$useState[1];
  _dispatcher$useState = workInProgressHook;
  var memoizedState = hook.memoizedState,
    refs = memoizedState.refs,
    prevGetSnapshot = refs.getSnapshot,
    prevSource = memoizedState.source;
  memoizedState = memoizedState.subscribe;
  var fiber = currentlyRenderingFiber$1;
  hook.memoizedState = { refs: refs, source: source, subscribe: subscribe };
  dispatcher.useEffect(
    function() {
      refs.getSnapshot = getSnapshot;
    },
    [getSnapshot]
  );
  dispatcher.useEffect(
    function() {
      var unsubscribe = subscribe(source._source, function() {
          var latestGetSnapshot = refs.getSnapshot;
          try {
            setSnapshot(latestGetSnapshot(source._source));
            var currentTime = requestCurrentTimeForUpdate(),
              expirationTime = computeExpirationForFiber(
                currentTime,
                fiber,
                ReactCurrentBatchConfig.suspense
              );
            root.mutableSourcePendingUpdateTime = expirationTime;
          } catch (error) {
            setSnapshot(function() {
              throw error;
            });
          }
        }),
        maybeNewVersion = getVersion(source._source);
      objectIs(version, maybeNewVersion) ||
        ((maybeNewVersion = getSnapshot(source._source)),
        objectIs(snapshot, maybeNewVersion) || setSnapshot(maybeNewVersion));
      return unsubscribe;
    },
    [source, subscribe]
  );
  (objectIs(prevSource, source) &&
    objectIs(memoizedState, subscribe) &&
    objectIs(prevGetSnapshot, getSnapshot)) ||
    ((_dispatcher$useState.baseQueue = null),
    (snapshot = readFromUnsubcribedMutableSource(root, source, getSnapshot)),
    (_dispatcher$useState.memoizedState = _dispatcher$useState.baseState = snapshot));
  return snapshot;
}
function updateMutableSource(source, getSnapshot, subscribe) {
  var hook = updateWorkInProgressHook();
  return useMutableSource(hook, source, getSnapshot, subscribe);
}
function mountState(initialState) {
  var hook = mountWorkInProgressHook();
  "function" === typeof initialState && (initialState = initialState());
  hook.memoizedState = hook.baseState = initialState;
  initialState = hook.queue = {
    pending: null,
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: initialState
  };
  initialState = initialState.dispatch = dispatchAction.bind(
    null,
    currentlyRenderingFiber$1,
    initialState
  );
  return [hook.memoizedState, initialState];
}
function pushEffect(tag, create, destroy, deps) {
  tag = { tag: tag, create: create, destroy: destroy, deps: deps, next: null };
  create = currentlyRenderingFiber$1.updateQueue;
  null === create
    ? ((create = { lastEffect: null }),
      (currentlyRenderingFiber$1.updateQueue = create),
      (create.lastEffect = tag.next = tag))
    : ((destroy = create.lastEffect),
      null === destroy
        ? (create.lastEffect = tag.next = tag)
        : ((deps = destroy.next),
          (destroy.next = tag),
          (tag.next = deps),
          (create.lastEffect = tag)));
  return tag;
}
function updateRef() {
  return updateWorkInProgressHook().memoizedState;
}
function mountEffectImpl(fiberEffectTag, hookEffectTag, create, deps) {
  var hook = mountWorkInProgressHook();
  currentlyRenderingFiber$1.effectTag |= fiberEffectTag;
  hook.memoizedState = pushEffect(
    1 | hookEffectTag,
    create,
    void 0,
    void 0 === deps ? null : deps
  );
}
function updateEffectImpl(fiberEffectTag, hookEffectTag, create, deps) {
  var hook = updateWorkInProgressHook();
  deps = void 0 === deps ? null : deps;
  var destroy = void 0;
  if (null !== currentHook) {
    var prevEffect = currentHook.memoizedState;
    destroy = prevEffect.destroy;
    if (null !== deps && areHookInputsEqual(deps, prevEffect.deps)) {
      pushEffect(hookEffectTag, create, destroy, deps);
      return;
    }
  }
  currentlyRenderingFiber$1.effectTag |= fiberEffectTag;
  hook.memoizedState = pushEffect(1 | hookEffectTag, create, destroy, deps);
}
function mountEffect(create, deps) {
  return mountEffectImpl(516, 4, create, deps);
}
function updateEffect(create, deps) {
  return updateEffectImpl(516, 4, create, deps);
}
function updateLayoutEffect(create, deps) {
  return updateEffectImpl(4, 2, create, deps);
}
function imperativeHandleEffect(create, ref) {
  if ("function" === typeof ref)
    return (
      (create = create()),
      ref(create),
      function() {
        ref(null);
      }
    );
  if (null !== ref && void 0 !== ref)
    return (
      (create = create()),
      (ref.current = create),
      function() {
        ref.current = null;
      }
    );
}
function updateImperativeHandle(ref, create, deps) {
  deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
  return updateEffectImpl(
    4,
    2,
    imperativeHandleEffect.bind(null, create, ref),
    deps
  );
}
function mountDebugValue() {}
function mountCallback(callback, deps) {
  mountWorkInProgressHook().memoizedState = [
    callback,
    void 0 === deps ? null : deps
  ];
  return callback;
}
function updateCallback(callback, deps) {
  var hook = updateWorkInProgressHook();
  deps = void 0 === deps ? null : deps;
  var prevState = hook.memoizedState;
  if (
    null !== prevState &&
    null !== deps &&
    areHookInputsEqual(deps, prevState[1])
  )
    return prevState[0];
  hook.memoizedState = [callback, deps];
  return callback;
}
function updateMemo(nextCreate, deps) {
  var hook = updateWorkInProgressHook();
  deps = void 0 === deps ? null : deps;
  var prevState = hook.memoizedState;
  if (
    null !== prevState &&
    null !== deps &&
    areHookInputsEqual(deps, prevState[1])
  )
    return prevState[0];
  nextCreate = nextCreate();
  hook.memoizedState = [nextCreate, deps];
  return nextCreate;
}
function startTransition(setPending, config, callback) {
  var priorityLevel = getCurrentPriorityLevel();
  runWithPriority$2(98 > priorityLevel ? 98 : priorityLevel, function() {
    setPending(!0);
  });
  runWithPriority$2(97 < priorityLevel ? 97 : priorityLevel, function() {
    var previousConfig = ReactCurrentBatchConfig$1.suspense;
    ReactCurrentBatchConfig$1.suspense = void 0 === config ? null : config;
    try {
      setPending(!1), callback();
    } finally {
      ReactCurrentBatchConfig$1.suspense = previousConfig;
    }
  });
}
function dispatchAction(fiber, queue, action) {
  var currentTime = requestCurrentTimeForUpdate(),
    suspenseConfig = ReactCurrentBatchConfig.suspense;
  currentTime = computeExpirationForFiber(currentTime, fiber, suspenseConfig);
  suspenseConfig = {
    expirationTime: currentTime,
    suspenseConfig: suspenseConfig,
    action: action,
    eagerReducer: null,
    eagerState: null,
    next: null
  };
  var pending = queue.pending;
  null === pending
    ? (suspenseConfig.next = suspenseConfig)
    : ((suspenseConfig.next = pending.next), (pending.next = suspenseConfig));
  queue.pending = suspenseConfig;
  pending = fiber.alternate;
  if (
    fiber === currentlyRenderingFiber$1 ||
    (null !== pending && pending === currentlyRenderingFiber$1)
  )
    (didScheduleRenderPhaseUpdate = !0),
      (suspenseConfig.expirationTime = renderExpirationTime),
      (currentlyRenderingFiber$1.expirationTime = renderExpirationTime);
  else {
    if (
      0 === fiber.expirationTime &&
      (null === pending || 0 === pending.expirationTime) &&
      ((pending = queue.lastRenderedReducer), null !== pending)
    )
      try {
        var currentState = queue.lastRenderedState,
          eagerState = pending(currentState, action);
        suspenseConfig.eagerReducer = pending;
        suspenseConfig.eagerState = eagerState;
        if (objectIs(eagerState, currentState)) return;
      } catch (error) {
      } finally {
      }
    scheduleUpdateOnFiber(fiber, currentTime);
  }
}
function updateEventListener$1() {}
var ContextOnlyDispatcher = {
    readContext: readContext,
    useCallback: throwInvalidHookError,
    useContext: throwInvalidHookError,
    useEffect: throwInvalidHookError,
    useImperativeHandle: throwInvalidHookError,
    useLayoutEffect: throwInvalidHookError,
    useMemo: throwInvalidHookError,
    useReducer: throwInvalidHookError,
    useRef: throwInvalidHookError,
    useState: throwInvalidHookError,
    useDebugValue: throwInvalidHookError,
    useResponder: throwInvalidHookError,
    useDeferredValue: throwInvalidHookError,
    useTransition: throwInvalidHookError,
    useMutableSource: throwInvalidHookError,
    useEvent: throwInvalidHookError
  },
  HooksDispatcherOnMount = {
    readContext: readContext,
    useCallback: mountCallback,
    useContext: readContext,
    useEffect: mountEffect,
    useImperativeHandle: function(ref, create, deps) {
      deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
      return mountEffectImpl(
        4,
        2,
        imperativeHandleEffect.bind(null, create, ref),
        deps
      );
    },
    useLayoutEffect: function(create, deps) {
      return mountEffectImpl(4, 2, create, deps);
    },
    useMemo: function(nextCreate, deps) {
      var hook = mountWorkInProgressHook();
      deps = void 0 === deps ? null : deps;
      nextCreate = nextCreate();
      hook.memoizedState = [nextCreate, deps];
      return nextCreate;
    },
    useReducer: function(reducer, initialArg, init) {
      var hook = mountWorkInProgressHook();
      initialArg = void 0 !== init ? init(initialArg) : initialArg;
      hook.memoizedState = hook.baseState = initialArg;
      reducer = hook.queue = {
        pending: null,
        dispatch: null,
        lastRenderedReducer: reducer,
        lastRenderedState: initialArg
      };
      reducer = reducer.dispatch = dispatchAction.bind(
        null,
        currentlyRenderingFiber$1,
        reducer
      );
      return [hook.memoizedState, reducer];
    },
    useRef: function(initialValue) {
      var hook = mountWorkInProgressHook();
      initialValue = { current: initialValue };
      return (hook.memoizedState = initialValue);
    },
    useState: mountState,
    useDebugValue: mountDebugValue,
    useResponder: createDeprecatedResponderListener,
    useDeferredValue: function(value, config) {
      var _mountState = mountState(value),
        prevValue = _mountState[0],
        setValue = _mountState[1];
      mountEffect(
        function() {
          var previousConfig = ReactCurrentBatchConfig$1.suspense;
          ReactCurrentBatchConfig$1.suspense =
            void 0 === config ? null : config;
          try {
            setValue(value);
          } finally {
            ReactCurrentBatchConfig$1.suspense = previousConfig;
          }
        },
        [value, config]
      );
      return prevValue;
    },
    useTransition: function(config) {
      var _mountState2 = mountState(!1),
        isPending = _mountState2[0];
      _mountState2 = _mountState2[1];
      return [
        mountCallback(startTransition.bind(null, _mountState2, config), [
          _mountState2,
          config
        ]),
        isPending
      ];
    },
    useMutableSource: function(source, getSnapshot, subscribe) {
      var hook = mountWorkInProgressHook();
      hook.memoizedState = {
        refs: { getSnapshot: getSnapshot },
        source: source,
        subscribe: subscribe
      };
      return useMutableSource(hook, source, getSnapshot, subscribe);
    },
    useEvent: function() {}
  },
  HooksDispatcherOnUpdate = {
    readContext: readContext,
    useCallback: updateCallback,
    useContext: readContext,
    useEffect: updateEffect,
    useImperativeHandle: updateImperativeHandle,
    useLayoutEffect: updateLayoutEffect,
    useMemo: updateMemo,
    useReducer: updateReducer,
    useRef: updateRef,
    useState: function() {
      return updateReducer(basicStateReducer);
    },
    useDebugValue: mountDebugValue,
    useResponder: createDeprecatedResponderListener,
    useDeferredValue: function(value, config) {
      var _updateState = updateReducer(basicStateReducer),
        prevValue = _updateState[0],
        setValue = _updateState[1];
      updateEffect(
        function() {
          var previousConfig = ReactCurrentBatchConfig$1.suspense;
          ReactCurrentBatchConfig$1.suspense =
            void 0 === config ? null : config;
          try {
            setValue(value);
          } finally {
            ReactCurrentBatchConfig$1.suspense = previousConfig;
          }
        },
        [value, config]
      );
      return prevValue;
    },
    useTransition: function(config) {
      var _updateState2 = updateReducer(basicStateReducer),
        isPending = _updateState2[0];
      _updateState2 = _updateState2[1];
      return [
        updateCallback(startTransition.bind(null, _updateState2, config), [
          _updateState2,
          config
        ]),
        isPending
      ];
    },
    useMutableSource: updateMutableSource,
    useEvent: updateEventListener$1
  },
  HooksDispatcherOnRerender = {
    readContext: readContext,
    useCallback: updateCallback,
    useContext: readContext,
    useEffect: updateEffect,
    useImperativeHandle: updateImperativeHandle,
    useLayoutEffect: updateLayoutEffect,
    useMemo: updateMemo,
    useReducer: rerenderReducer,
    useRef: updateRef,
    useState: function() {
      return rerenderReducer(basicStateReducer);
    },
    useDebugValue: mountDebugValue,
    useResponder: createDeprecatedResponderListener,
    useDeferredValue: function(value, config) {
      var _rerenderState = rerenderReducer(basicStateReducer),
        prevValue = _rerenderState[0],
        setValue = _rerenderState[1];
      updateEffect(
        function() {
          var previousConfig = ReactCurrentBatchConfig$1.suspense;
          ReactCurrentBatchConfig$1.suspense =
            void 0 === config ? null : config;
          try {
            setValue(value);
          } finally {
            ReactCurrentBatchConfig$1.suspense = previousConfig;
          }
        },
        [value, config]
      );
      return prevValue;
    },
    useTransition: function(config) {
      var _rerenderState2 = rerenderReducer(basicStateReducer),
        isPending = _rerenderState2[0];
      _rerenderState2 = _rerenderState2[1];
      return [
        updateCallback(startTransition.bind(null, _rerenderState2, config), [
          _rerenderState2,
          config
        ]),
        isPending
      ];
    },
    useMutableSource: updateMutableSource,
    useEvent: updateEventListener$1
  },
  hydrationParentFiber = null,
  nextHydratableInstance = null,
  isHydrating = !1;
function deleteHydratableInstance(returnFiber, instance) {
  var fiber = createFiber(5, null, null, 0);
  fiber.elementType = "DELETED";
  fiber.type = "DELETED";
  fiber.stateNode = instance;
  fiber.return = returnFiber;
  fiber.effectTag = 8;
  null !== returnFiber.lastEffect
    ? ((returnFiber.lastEffect.nextEffect = fiber),
      (returnFiber.lastEffect = fiber))
    : (returnFiber.firstEffect = returnFiber.lastEffect = fiber);
}
function tryHydrate(fiber, nextInstance) {
  switch (fiber.tag) {
    case 5:
      var type = fiber.type;
      nextInstance =
        1 !== nextInstance.nodeType ||
        type.toLowerCase() !== nextInstance.nodeName.toLowerCase()
          ? null
          : nextInstance;
      return null !== nextInstance
        ? ((fiber.stateNode = nextInstance), !0)
        : !1;
    case 6:
      return (
        (nextInstance =
          "" === fiber.pendingProps || 3 !== nextInstance.nodeType
            ? null
            : nextInstance),
        null !== nextInstance ? ((fiber.stateNode = nextInstance), !0) : !1
      );
    case 13:
      return (
        (nextInstance = 8 !== nextInstance.nodeType ? null : nextInstance),
        null !== nextInstance
          ? ((fiber.memoizedState = {
              dehydrated: nextInstance,
              baseTime: 0,
              retryTime: 1
            }),
            (type = createFiber(18, null, null, 0)),
            (type.stateNode = nextInstance),
            (type.return = fiber),
            (fiber.child = type),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function tryToClaimNextHydratableInstance(fiber) {
  if (isHydrating) {
    var nextInstance = nextHydratableInstance;
    if (nextInstance) {
      var firstAttemptedInstance = nextInstance;
      if (!tryHydrate(fiber, nextInstance)) {
        nextInstance = getNextHydratable(firstAttemptedInstance.nextSibling);
        if (!nextInstance || !tryHydrate(fiber, nextInstance)) {
          fiber.effectTag = (fiber.effectTag & -1025) | 2;
          isHydrating = !1;
          hydrationParentFiber = fiber;
          return;
        }
        deleteHydratableInstance(hydrationParentFiber, firstAttemptedInstance);
      }
      hydrationParentFiber = fiber;
      nextHydratableInstance = getNextHydratable(nextInstance.firstChild);
    } else
      (fiber.effectTag = (fiber.effectTag & -1025) | 2),
        (isHydrating = !1),
        (hydrationParentFiber = fiber);
  }
}
function popToNextHostParent(fiber) {
  for (
    fiber = fiber.return;
    null !== fiber && 5 !== fiber.tag && 3 !== fiber.tag && 13 !== fiber.tag;

  )
    fiber = fiber.return;
  hydrationParentFiber = fiber;
}
function popHydrationState(fiber) {
  if (fiber !== hydrationParentFiber) return !1;
  if (!isHydrating) return popToNextHostParent(fiber), (isHydrating = !0), !1;
  var type = fiber.type;
  if (
    5 !== fiber.tag ||
    ("head" !== type &&
      "body" !== type &&
      !shouldSetTextContent(type, fiber.memoizedProps))
  )
    for (type = nextHydratableInstance; type; )
      deleteHydratableInstance(fiber, type),
        (type = getNextHydratable(type.nextSibling));
  popToNextHostParent(fiber);
  if (13 === fiber.tag) {
    fiber = fiber.memoizedState;
    fiber = null !== fiber ? fiber.dehydrated : null;
    if (!fiber) throw Error(formatProdErrorMessage(317));
    a: {
      fiber = fiber.nextSibling;
      for (type = 0; fiber; ) {
        if (8 === fiber.nodeType) {
          var data = fiber.data;
          if ("/$" === data) {
            if (0 === type) {
              nextHydratableInstance = getNextHydratable(fiber.nextSibling);
              break a;
            }
            type--;
          } else ("$" !== data && "$!" !== data && "$?" !== data) || type++;
        }
        fiber = fiber.nextSibling;
      }
      nextHydratableInstance = null;
    }
  } else
    nextHydratableInstance = hydrationParentFiber
      ? getNextHydratable(fiber.stateNode.nextSibling)
      : null;
  return !0;
}
function resetHydrationState() {
  nextHydratableInstance = hydrationParentFiber = null;
  isHydrating = !1;
}
var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner,
  didReceiveUpdate = !1;
function reconcileChildren(
  current,
  workInProgress,
  nextChildren,
  renderExpirationTime
) {
  workInProgress.child =
    null === current
      ? mountChildFibers(
          workInProgress,
          null,
          nextChildren,
          renderExpirationTime
        )
      : reconcileChildFibers(
          workInProgress,
          current.child,
          nextChildren,
          renderExpirationTime
        );
}
function updateForwardRef(
  current,
  workInProgress,
  Component,
  nextProps,
  renderExpirationTime
) {
  Component = Component.render;
  var ref = workInProgress.ref;
  prepareToReadContext(workInProgress, renderExpirationTime);
  nextProps = renderWithHooks(
    current,
    workInProgress,
    Component,
    nextProps,
    ref,
    renderExpirationTime
  );
  if (null !== current && !didReceiveUpdate)
    return (
      bailoutHooks(current, workInProgress, renderExpirationTime),
      bailoutOnAlreadyFinishedWork(
        current,
        workInProgress,
        renderExpirationTime
      )
    );
  workInProgress.effectTag |= 1;
  reconcileChildren(current, workInProgress, nextProps, renderExpirationTime);
  return workInProgress.child;
}
function updateMemoComponent(
  current,
  workInProgress,
  Component,
  nextProps,
  updateExpirationTime,
  renderExpirationTime
) {
  if (null === current) {
    var type = Component.type;
    if (
      "function" === typeof type &&
      !shouldConstruct(type) &&
      void 0 === type.defaultProps &&
      null === Component.compare &&
      void 0 === Component.defaultProps
    )
      return (
        (workInProgress.tag = 15),
        (workInProgress.type = type),
        updateSimpleMemoComponent(
          current,
          workInProgress,
          type,
          nextProps,
          updateExpirationTime,
          renderExpirationTime
        )
      );
    current = createFiberFromTypeAndProps(
      Component.type,
      null,
      nextProps,
      null,
      workInProgress.mode,
      renderExpirationTime
    );
    current.ref = workInProgress.ref;
    current.return = workInProgress;
    return (workInProgress.child = current);
  }
  type = current.child;
  if (
    updateExpirationTime < renderExpirationTime &&
    ((updateExpirationTime = type.memoizedProps),
    (Component = Component.compare),
    (Component = null !== Component ? Component : shallowEqual),
    Component(updateExpirationTime, nextProps) &&
      current.ref === workInProgress.ref)
  )
    return bailoutOnAlreadyFinishedWork(
      current,
      workInProgress,
      renderExpirationTime
    );
  workInProgress.effectTag |= 1;
  current = createWorkInProgress(type, nextProps);
  current.ref = workInProgress.ref;
  current.return = workInProgress;
  return (workInProgress.child = current);
}
function updateSimpleMemoComponent(
  current,
  workInProgress,
  Component,
  nextProps,
  updateExpirationTime,
  renderExpirationTime
) {
  return null !== current &&
    shallowEqual(current.memoizedProps, nextProps) &&
    current.ref === workInProgress.ref &&
    ((didReceiveUpdate = !1), updateExpirationTime < renderExpirationTime)
    ? ((workInProgress.expirationTime = current.expirationTime),
      bailoutOnAlreadyFinishedWork(
        current,
        workInProgress,
        renderExpirationTime
      ))
    : updateFunctionComponent(
        current,
        workInProgress,
        Component,
        nextProps,
        renderExpirationTime
      );
}
function markRef(current, workInProgress) {
  var ref = workInProgress.ref;
  if (
    (null === current && null !== ref) ||
    (null !== current && current.ref !== ref)
  )
    workInProgress.effectTag |= 128;
}
function updateFunctionComponent(
  current,
  workInProgress,
  Component,
  nextProps,
  renderExpirationTime
) {
  prepareToReadContext(workInProgress, renderExpirationTime);
  Component = renderWithHooks(
    current,
    workInProgress,
    Component,
    nextProps,
    void 0,
    renderExpirationTime
  );
  if (null !== current && !didReceiveUpdate)
    return (
      bailoutHooks(current, workInProgress, renderExpirationTime),
      bailoutOnAlreadyFinishedWork(
        current,
        workInProgress,
        renderExpirationTime
      )
    );
  workInProgress.effectTag |= 1;
  reconcileChildren(current, workInProgress, Component, renderExpirationTime);
  return workInProgress.child;
}
function updateBlock(
  current,
  workInProgress,
  block,
  nextProps,
  renderExpirationTime
) {
  var render = block._render;
  block = block._data;
  prepareToReadContext(workInProgress, renderExpirationTime);
  nextProps = renderWithHooks(
    current,
    workInProgress,
    render,
    nextProps,
    block,
    renderExpirationTime
  );
  if (null !== current && !didReceiveUpdate)
    return (
      bailoutHooks(current, workInProgress, renderExpirationTime),
      bailoutOnAlreadyFinishedWork(
        current,
        workInProgress,
        renderExpirationTime
      )
    );
  workInProgress.effectTag |= 1;
  reconcileChildren(current, workInProgress, nextProps, renderExpirationTime);
  return workInProgress.child;
}
function updateClassComponent(
  current,
  workInProgress,
  Component,
  nextProps,
  renderExpirationTime
) {
  prepareToReadContext(workInProgress, renderExpirationTime);
  if (null === workInProgress.stateNode)
    null !== current &&
      ((current.alternate = null),
      (workInProgress.alternate = null),
      (workInProgress.effectTag |= 2)),
      constructClassInstance(workInProgress, Component, nextProps),
      mountClassInstance(
        workInProgress,
        Component,
        nextProps,
        renderExpirationTime
      ),
      (nextProps = !0);
  else if (null === current) {
    var instance = workInProgress.stateNode,
      oldProps = workInProgress.memoizedProps;
    instance.props = oldProps;
    var oldContext = instance.context,
      contextType = Component.contextType,
      nextContext = emptyContextObject;
    "object" === typeof contextType &&
      null !== contextType &&
      (nextContext = readContext(contextType));
    var getDerivedStateFromProps = Component.getDerivedStateFromProps;
    (contextType =
      "function" === typeof getDerivedStateFromProps ||
      "function" === typeof instance.getSnapshotBeforeUpdate) ||
      ("function" !== typeof instance.UNSAFE_componentWillReceiveProps &&
        "function" !== typeof instance.componentWillReceiveProps) ||
      ((oldProps !== nextProps || oldContext !== nextContext) &&
        callComponentWillReceiveProps(
          workInProgress,
          instance,
          nextProps,
          nextContext
        ));
    hasForceUpdate = !1;
    var oldState = workInProgress.memoizedState;
    instance.state = oldState;
    processUpdateQueue(
      workInProgress,
      nextProps,
      instance,
      renderExpirationTime
    );
    oldContext = workInProgress.memoizedState;
    oldProps !== nextProps || oldState !== oldContext || hasForceUpdate
      ? ("function" === typeof getDerivedStateFromProps &&
          (applyDerivedStateFromProps(
            workInProgress,
            Component,
            getDerivedStateFromProps,
            nextProps
          ),
          (oldContext = workInProgress.memoizedState)),
        (oldProps =
          hasForceUpdate ||
          checkShouldComponentUpdate(
            workInProgress,
            Component,
            oldProps,
            nextProps,
            oldState,
            oldContext,
            nextContext
          ))
          ? (contextType ||
              ("function" !== typeof instance.UNSAFE_componentWillMount &&
                "function" !== typeof instance.componentWillMount) ||
              ("function" === typeof instance.componentWillMount &&
                instance.componentWillMount(),
              "function" === typeof instance.UNSAFE_componentWillMount &&
                instance.UNSAFE_componentWillMount()),
            "function" === typeof instance.componentDidMount &&
              (workInProgress.effectTag |= 4))
          : ("function" === typeof instance.componentDidMount &&
              (workInProgress.effectTag |= 4),
            (workInProgress.memoizedProps = nextProps),
            (workInProgress.memoizedState = oldContext)),
        (instance.props = nextProps),
        (instance.state = oldContext),
        (instance.context = nextContext),
        (nextProps = oldProps))
      : ("function" === typeof instance.componentDidMount &&
          (workInProgress.effectTag |= 4),
        (nextProps = !1));
  } else
    (instance = workInProgress.stateNode),
      cloneUpdateQueue(current, workInProgress),
      (nextContext = workInProgress.memoizedProps),
      (instance.props =
        workInProgress.type === workInProgress.elementType
          ? nextContext
          : resolveDefaultProps(workInProgress.type, nextContext)),
      (oldContext = instance.context),
      (contextType = Component.contextType),
      (oldProps = emptyContextObject),
      "object" === typeof contextType &&
        null !== contextType &&
        (oldProps = readContext(contextType)),
      (getDerivedStateFromProps = Component.getDerivedStateFromProps),
      (contextType =
        "function" === typeof getDerivedStateFromProps ||
        "function" === typeof instance.getSnapshotBeforeUpdate) ||
        ("function" !== typeof instance.UNSAFE_componentWillReceiveProps &&
          "function" !== typeof instance.componentWillReceiveProps) ||
        ((nextContext !== nextProps || oldContext !== oldProps) &&
          callComponentWillReceiveProps(
            workInProgress,
            instance,
            nextProps,
            oldProps
          )),
      (hasForceUpdate = !1),
      (oldContext = workInProgress.memoizedState),
      (instance.state = oldContext),
      processUpdateQueue(
        workInProgress,
        nextProps,
        instance,
        renderExpirationTime
      ),
      (oldState = workInProgress.memoizedState),
      nextContext !== nextProps || oldContext !== oldState || hasForceUpdate
        ? ("function" === typeof getDerivedStateFromProps &&
            (applyDerivedStateFromProps(
              workInProgress,
              Component,
              getDerivedStateFromProps,
              nextProps
            ),
            (oldState = workInProgress.memoizedState)),
          (getDerivedStateFromProps =
            hasForceUpdate ||
            checkShouldComponentUpdate(
              workInProgress,
              Component,
              nextContext,
              nextProps,
              oldContext,
              oldState,
              oldProps
            ))
            ? (contextType ||
                ("function" !== typeof instance.UNSAFE_componentWillUpdate &&
                  "function" !== typeof instance.componentWillUpdate) ||
                ("function" === typeof instance.componentWillUpdate &&
                  instance.componentWillUpdate(nextProps, oldState, oldProps),
                "function" === typeof instance.UNSAFE_componentWillUpdate &&
                  instance.UNSAFE_componentWillUpdate(
                    nextProps,
                    oldState,
                    oldProps
                  )),
              "function" === typeof instance.componentDidUpdate &&
                (workInProgress.effectTag |= 4),
              "function" === typeof instance.getSnapshotBeforeUpdate &&
                (workInProgress.effectTag |= 256))
            : ("function" !== typeof instance.componentDidUpdate ||
                (nextContext === current.memoizedProps &&
                  oldContext === current.memoizedState) ||
                (workInProgress.effectTag |= 4),
              "function" !== typeof instance.getSnapshotBeforeUpdate ||
                (nextContext === current.memoizedProps &&
                  oldContext === current.memoizedState) ||
                (workInProgress.effectTag |= 256),
              (workInProgress.memoizedProps = nextProps),
              (workInProgress.memoizedState = oldState)),
          (instance.props = nextProps),
          (instance.state = oldState),
          (instance.context = oldProps),
          (nextProps = getDerivedStateFromProps))
        : ("function" !== typeof instance.componentDidUpdate ||
            (nextContext === current.memoizedProps &&
              oldContext === current.memoizedState) ||
            (workInProgress.effectTag |= 4),
          "function" !== typeof instance.getSnapshotBeforeUpdate ||
            (nextContext === current.memoizedProps &&
              oldContext === current.memoizedState) ||
            (workInProgress.effectTag |= 256),
          (nextProps = !1));
  return finishClassComponent(
    current,
    workInProgress,
    Component,
    nextProps,
    !1,
    renderExpirationTime
  );
}
function finishClassComponent(
  current,
  workInProgress,
  Component,
  shouldUpdate,
  hasContext,
  renderExpirationTime
) {
  markRef(current, workInProgress);
  hasContext = 0 !== (workInProgress.effectTag & 64);
  if (!shouldUpdate && !hasContext)
    return bailoutOnAlreadyFinishedWork(
      current,
      workInProgress,
      renderExpirationTime
    );
  shouldUpdate = workInProgress.stateNode;
  ReactCurrentOwner$1.current = workInProgress;
  Component =
    hasContext && "function" !== typeof Component.getDerivedStateFromError
      ? null
      : shouldUpdate.render();
  workInProgress.effectTag |= 1;
  null !== current && hasContext
    ? ((workInProgress.child = reconcileChildFibers(
        workInProgress,
        current.child,
        null,
        renderExpirationTime
      )),
      (workInProgress.child = reconcileChildFibers(
        workInProgress,
        null,
        Component,
        renderExpirationTime
      )))
    : reconcileChildren(
        current,
        workInProgress,
        Component,
        renderExpirationTime
      );
  workInProgress.memoizedState = shouldUpdate.state;
  return workInProgress.child;
}
function mountSuspenseState(renderExpirationTime) {
  return { dehydrated: null, baseTime: renderExpirationTime, retryTime: 0 };
}
function updateSuspenseState(prevSuspenseState, renderExpirationTime) {
  prevSuspenseState = prevSuspenseState.baseTime;
  return {
    dehydrated: null,
    baseTime:
      0 !== prevSuspenseState && prevSuspenseState < renderExpirationTime
        ? prevSuspenseState
        : renderExpirationTime,
    retryTime: 0
  };
}
function getRemainingWorkInPrimaryTree(
  current,
  workInProgress,
  currentPrimaryChildFragment,
  renderExpirationTime
) {
  currentPrimaryChildFragment = (null !== currentPrimaryChildFragment
    ? currentPrimaryChildFragment
    : current
  ).childExpirationTime;
  current = current.memoizedState;
  return null !== current &&
    ((current = current.baseTime),
    0 !== current &&
      current < renderExpirationTime &&
      current > currentPrimaryChildFragment)
    ? current
    : currentPrimaryChildFragment < renderExpirationTime
    ? currentPrimaryChildFragment
    : 0 !== (workInProgress.mode & 2) &&
      ((workInProgress = workInProgressRoot),
      null !== workInProgress &&
        ((workInProgress = workInProgress.lastPendingTime),
        workInProgress < renderExpirationTime))
    ? workInProgress
    : 0;
}
function updateSuspenseComponent(
  current,
  workInProgress,
  renderExpirationTime
) {
  var mode = workInProgress.mode,
    nextProps = workInProgress.pendingProps,
    suspenseContext = suspenseStackCursor.current,
    nextDidTimeout = !1,
    didSuspend = 0 !== (workInProgress.effectTag & 64),
    JSCompiler_temp;
  if (!(JSCompiler_temp = didSuspend))
    a: {
      if (null !== current)
        if (
          ((JSCompiler_temp = current.memoizedState), null !== JSCompiler_temp)
        ) {
          if (
            ((JSCompiler_temp = JSCompiler_temp.baseTime),
            0 !== JSCompiler_temp && JSCompiler_temp < renderExpirationTime)
          ) {
            JSCompiler_temp = !0;
            break a;
          }
        } else {
          JSCompiler_temp = !1;
          break a;
        }
      JSCompiler_temp = 0 !== (suspenseContext & 2);
    }
  JSCompiler_temp
    ? ((nextDidTimeout = !0), (workInProgress.effectTag &= -65))
    : (null !== current && null === current.memoizedState) ||
      void 0 === nextProps.fallback ||
      !0 === nextProps.unstable_avoidThisFallback ||
      (suspenseContext |= 1);
  push(suspenseStackCursor, suspenseContext & 1);
  if (null === current) {
    if (
      void 0 !== nextProps.fallback &&
      (tryToClaimNextHydratableInstance(workInProgress),
      (current = workInProgress.memoizedState),
      null !== current && ((current = current.dehydrated), null !== current))
    )
      return (
        0 === (workInProgress.mode & 2)
          ? (workInProgress.expirationTime = 1073741823)
          : "$!" === current.data
          ? ((renderExpirationTime = requestCurrentTimeForUpdate()),
            (renderExpirationTime = computeExpirationBucket(
              renderExpirationTime,
              5e3,
              250
            )),
            (workInProgress.expirationTime = renderExpirationTime))
          : (workInProgress.expirationTime = 1),
        null
      );
    if (nextDidTimeout) {
      nextProps = nextProps.fallback;
      current = createFiberFromFragment(null, mode, 0, null);
      current.return = workInProgress;
      if (0 === (workInProgress.mode & 2))
        for (
          nextDidTimeout =
            null !== workInProgress.memoizedState
              ? workInProgress.child.child
              : workInProgress.child,
            current.child = nextDidTimeout;
          null !== nextDidTimeout;

        )
          (nextDidTimeout.return = current),
            (nextDidTimeout = nextDidTimeout.sibling);
      mode = createFiberFromFragment(
        nextProps,
        mode,
        renderExpirationTime,
        null
      );
      mode.return = workInProgress;
      current.sibling = mode;
      workInProgress.memoizedState = mountSuspenseState(renderExpirationTime);
      workInProgress.child = current;
      return mode;
    }
    current = nextProps.children;
    workInProgress.memoizedState = null;
    return (workInProgress.child = mountChildFibers(
      workInProgress,
      null,
      current,
      renderExpirationTime
    ));
  }
  suspenseContext = current.memoizedState;
  if (null !== suspenseContext) {
    JSCompiler_temp = suspenseContext.dehydrated;
    if (null !== JSCompiler_temp) {
      if (didSuspend) {
        if (null !== workInProgress.memoizedState)
          return (
            (workInProgress.child = current.child),
            (workInProgress.effectTag |= 64),
            null
          );
        nextDidTimeout = nextProps.fallback;
        nextProps = createFiberFromFragment(null, mode, 0, null);
        nextProps.return = workInProgress;
        nextProps.child = null;
        if (0 === (workInProgress.mode & 2))
          for (
            didSuspend = nextProps.child = workInProgress.child;
            null !== didSuspend;

          )
            (didSuspend.return = nextProps), (didSuspend = didSuspend.sibling);
        else
          reconcileChildFibers(
            workInProgress,
            current.child,
            null,
            renderExpirationTime
          );
        mode = createFiberFromFragment(
          nextDidTimeout,
          mode,
          renderExpirationTime,
          null
        );
        mode.return = workInProgress;
        nextProps.sibling = mode;
        mode.effectTag |= 2;
        nextProps.childExpirationTime = getRemainingWorkInPrimaryTree(
          current,
          workInProgress,
          null,
          renderExpirationTime
        );
        workInProgress.memoizedState = updateSuspenseState(
          current.memoizedState,
          renderExpirationTime
        );
        workInProgress.child = nextProps;
        return mode;
      }
      if (0 === (workInProgress.mode & 2))
        workInProgress = retrySuspenseComponentWithoutHydrating(
          current,
          workInProgress,
          renderExpirationTime
        );
      else if ("$!" === JSCompiler_temp.data)
        workInProgress = retrySuspenseComponentWithoutHydrating(
          current,
          workInProgress,
          renderExpirationTime
        );
      else if (
        ((mode = current.childExpirationTime >= renderExpirationTime),
        didReceiveUpdate || mode)
      )
        1073741823 > renderExpirationTime &&
          suspenseContext.retryTime <= renderExpirationTime &&
          ((mode = renderExpirationTime + 1),
          (suspenseContext.retryTime = mode),
          scheduleUpdateOnFiber(current, mode)),
          renderDidSuspendDelayIfPossible(),
          (workInProgress = retrySuspenseComponentWithoutHydrating(
            current,
            workInProgress,
            renderExpirationTime
          ));
      else if ("$?" === JSCompiler_temp.data)
        (workInProgress.effectTag |= 64),
          (workInProgress.child = current.child),
          (workInProgress = retryDehydratedSuspenseBoundary.bind(
            null,
            current
          )),
          (JSCompiler_temp._reactRetry = workInProgress),
          (workInProgress = null);
      else {
        nextHydratableInstance = getNextHydratable(JSCompiler_temp.nextSibling);
        popToNextHostParent(workInProgress);
        isHydrating = !0;
        for (
          current = renderExpirationTime = mountChildFibers(
            workInProgress,
            null,
            workInProgress.pendingProps.children,
            renderExpirationTime
          );
          current;

        )
          (current.effectTag |= 1024), (current = current.sibling);
        workInProgress.child = renderExpirationTime;
        workInProgress = workInProgress.child;
      }
      return workInProgress;
    }
    mode = current.child;
    didSuspend = mode.sibling;
    if (nextDidTimeout) {
      nextDidTimeout = nextProps.fallback;
      nextProps = createWorkInProgress(mode, mode.pendingProps);
      nextProps.return = workInProgress;
      if (
        0 === (workInProgress.mode & 2) &&
        ((suspenseContext =
          null !== workInProgress.memoizedState
            ? workInProgress.child.child
            : workInProgress.child),
        suspenseContext !== mode.child)
      )
        for (nextProps.child = suspenseContext; null !== suspenseContext; )
          (suspenseContext.return = nextProps),
            (suspenseContext = suspenseContext.sibling);
      nextDidTimeout = createWorkInProgress(didSuspend, nextDidTimeout);
      nextDidTimeout.return = workInProgress;
      nextProps.sibling = nextDidTimeout;
      nextProps.childExpirationTime = getRemainingWorkInPrimaryTree(
        current,
        workInProgress,
        mode,
        renderExpirationTime
      );
      workInProgress.memoizedState = updateSuspenseState(
        current.memoizedState,
        renderExpirationTime
      );
      workInProgress.child = nextProps;
      return nextDidTimeout;
    }
    renderExpirationTime = reconcileChildFibers(
      workInProgress,
      mode.child,
      nextProps.children,
      renderExpirationTime
    );
    workInProgress.memoizedState = null;
    return (workInProgress.child = renderExpirationTime);
  }
  didSuspend = current.child;
  if (nextDidTimeout) {
    nextDidTimeout = nextProps.fallback;
    nextProps = createFiberFromFragment(null, mode, 0, null);
    nextProps.return = workInProgress;
    nextProps.child = didSuspend;
    null !== didSuspend && (didSuspend.return = nextProps);
    if (0 === (workInProgress.mode & 2))
      for (
        didSuspend =
          null !== workInProgress.memoizedState
            ? workInProgress.child.child
            : workInProgress.child,
          nextProps.child = didSuspend;
        null !== didSuspend;

      )
        (didSuspend.return = nextProps), (didSuspend = didSuspend.sibling);
    mode = createFiberFromFragment(
      nextDidTimeout,
      mode,
      renderExpirationTime,
      null
    );
    mode.return = workInProgress;
    nextProps.sibling = mode;
    mode.effectTag |= 2;
    nextProps.childExpirationTime = getRemainingWorkInPrimaryTree(
      current,
      workInProgress,
      null,
      renderExpirationTime
    );
    workInProgress.memoizedState = mountSuspenseState(renderExpirationTime);
    workInProgress.child = nextProps;
    return mode;
  }
  workInProgress.memoizedState = null;
  return (workInProgress.child = reconcileChildFibers(
    workInProgress,
    didSuspend,
    nextProps.children,
    renderExpirationTime
  ));
}
function retrySuspenseComponentWithoutHydrating(
  current,
  workInProgress,
  renderExpirationTime
) {
  workInProgress.memoizedState = null;
  reconcileChildren(
    current,
    workInProgress,
    workInProgress.pendingProps.children,
    renderExpirationTime
  );
  return workInProgress.child;
}
function scheduleWorkOnFiber(fiber, renderExpirationTime) {
  fiber.expirationTime < renderExpirationTime &&
    (fiber.expirationTime = renderExpirationTime);
  var alternate = fiber.alternate;
  null !== alternate &&
    alternate.expirationTime < renderExpirationTime &&
    (alternate.expirationTime = renderExpirationTime);
  scheduleWorkOnParentPath(fiber.return, renderExpirationTime);
}
function initSuspenseListRenderState(
  workInProgress,
  isBackwards,
  tail,
  lastContentRow,
  tailMode,
  lastEffectBeforeRendering
) {
  var renderState = workInProgress.memoizedState;
  null === renderState
    ? (workInProgress.memoizedState = {
        isBackwards: isBackwards,
        rendering: null,
        renderingStartTime: 0,
        last: lastContentRow,
        tail: tail,
        tailExpiration: 0,
        tailMode: tailMode,
        lastEffect: lastEffectBeforeRendering
      })
    : ((renderState.isBackwards = isBackwards),
      (renderState.rendering = null),
      (renderState.renderingStartTime = 0),
      (renderState.last = lastContentRow),
      (renderState.tail = tail),
      (renderState.tailExpiration = 0),
      (renderState.tailMode = tailMode),
      (renderState.lastEffect = lastEffectBeforeRendering));
}
function updateSuspenseListComponent(
  current,
  workInProgress,
  renderExpirationTime
) {
  var nextProps = workInProgress.pendingProps,
    revealOrder = nextProps.revealOrder,
    tailMode = nextProps.tail;
  reconcileChildren(
    current,
    workInProgress,
    nextProps.children,
    renderExpirationTime
  );
  nextProps = suspenseStackCursor.current;
  if (0 !== (nextProps & 2))
    (nextProps = (nextProps & 1) | 2), (workInProgress.effectTag |= 64);
  else {
    if (null !== current && 0 !== (current.effectTag & 64))
      a: for (current = workInProgress.child; null !== current; ) {
        if (13 === current.tag)
          null !== current.memoizedState &&
            scheduleWorkOnFiber(current, renderExpirationTime);
        else if (19 === current.tag)
          scheduleWorkOnFiber(current, renderExpirationTime);
        else if (null !== current.child) {
          current.child.return = current;
          current = current.child;
          continue;
        }
        if (current === workInProgress) break a;
        for (; null === current.sibling; ) {
          if (null === current.return || current.return === workInProgress)
            break a;
          current = current.return;
        }
        current.sibling.return = current.return;
        current = current.sibling;
      }
    nextProps &= 1;
  }
  push(suspenseStackCursor, nextProps);
  if (0 === (workInProgress.mode & 2)) workInProgress.memoizedState = null;
  else
    switch (revealOrder) {
      case "forwards":
        renderExpirationTime = workInProgress.child;
        for (revealOrder = null; null !== renderExpirationTime; )
          (current = renderExpirationTime.alternate),
            null !== current &&
              null === findFirstSuspended(current) &&
              (revealOrder = renderExpirationTime),
            (renderExpirationTime = renderExpirationTime.sibling);
        renderExpirationTime = revealOrder;
        null === renderExpirationTime
          ? ((revealOrder = workInProgress.child),
            (workInProgress.child = null))
          : ((revealOrder = renderExpirationTime.sibling),
            (renderExpirationTime.sibling = null));
        initSuspenseListRenderState(
          workInProgress,
          !1,
          revealOrder,
          renderExpirationTime,
          tailMode,
          workInProgress.lastEffect
        );
        break;
      case "backwards":
        renderExpirationTime = null;
        revealOrder = workInProgress.child;
        for (workInProgress.child = null; null !== revealOrder; ) {
          current = revealOrder.alternate;
          if (null !== current && null === findFirstSuspended(current)) {
            workInProgress.child = revealOrder;
            break;
          }
          current = revealOrder.sibling;
          revealOrder.sibling = renderExpirationTime;
          renderExpirationTime = revealOrder;
          revealOrder = current;
        }
        initSuspenseListRenderState(
          workInProgress,
          !0,
          renderExpirationTime,
          null,
          tailMode,
          workInProgress.lastEffect
        );
        break;
      case "together":
        initSuspenseListRenderState(
          workInProgress,
          !1,
          null,
          null,
          void 0,
          workInProgress.lastEffect
        );
        break;
      default:
        workInProgress.memoizedState = null;
    }
  return workInProgress.child;
}
function bailoutOnAlreadyFinishedWork(
  current,
  workInProgress,
  renderExpirationTime
) {
  null !== current && (workInProgress.dependencies = current.dependencies);
  var updateExpirationTime = workInProgress.expirationTime;
  0 !== updateExpirationTime && markUnprocessedUpdateTime(updateExpirationTime);
  if (workInProgress.childExpirationTime < renderExpirationTime) return null;
  if (null !== current && workInProgress.child !== current.child)
    throw Error(formatProdErrorMessage(153));
  if (null !== workInProgress.child) {
    current = workInProgress.child;
    renderExpirationTime = createWorkInProgress(current, current.pendingProps);
    workInProgress.child = renderExpirationTime;
    for (
      renderExpirationTime.return = workInProgress;
      null !== current.sibling;

    )
      (current = current.sibling),
        (renderExpirationTime = renderExpirationTime.sibling = createWorkInProgress(
          current,
          current.pendingProps
        )),
        (renderExpirationTime.return = workInProgress);
    renderExpirationTime.sibling = null;
  }
  return workInProgress.child;
}
function isFiberSuspenseAndTimedOut(fiber) {
  var memoizedState = fiber.memoizedState;
  return (
    13 === fiber.tag &&
    null !== memoizedState &&
    null === memoizedState.dehydrated
  );
}
var emptyObject$1 = {};
function collectScopedNodesFromChildren(
  startingChild,
  fn$jscomp$0,
  scopedNodes$jscomp$0
) {
  for (; null !== startingChild; ) {
    var node = startingChild,
      fn = fn$jscomp$0,
      scopedNodes = scopedNodes$jscomp$0;
    if (5 === node.tag) {
      var type = node.type,
        memoizedProps = node.memoizedProps,
        instance = node.stateNode;
      null !== instance &&
        !0 === fn(type, memoizedProps || emptyObject$1, instance) &&
        scopedNodes.push(instance);
    }
    type = node.child;
    isFiberSuspenseAndTimedOut(node) && (type = node.child.sibling.child);
    null !== type && collectScopedNodesFromChildren(type, fn, scopedNodes);
    startingChild = startingChild.sibling;
  }
}
function collectFirstScopedNodeFromChildren(startingChild, fn$jscomp$0) {
  for (; null !== startingChild; ) {
    a: {
      var JSCompiler_inline_result = startingChild;
      var fn = fn$jscomp$0;
      if (5 === JSCompiler_inline_result.tag) {
        var type = JSCompiler_inline_result.type,
          memoizedProps = JSCompiler_inline_result.memoizedProps,
          instance = JSCompiler_inline_result.stateNode;
        if (null !== instance && !0 === fn(type, memoizedProps, instance)) {
          JSCompiler_inline_result = instance;
          break a;
        }
      }
      type = JSCompiler_inline_result.child;
      isFiberSuspenseAndTimedOut(JSCompiler_inline_result) &&
        (type = JSCompiler_inline_result.child.sibling.child);
      JSCompiler_inline_result =
        null !== type ? collectFirstScopedNodeFromChildren(type, fn) : null;
    }
    if (null !== JSCompiler_inline_result) return JSCompiler_inline_result;
    startingChild = startingChild.sibling;
  }
  return null;
}
function collectNearestChildContextValues(
  startingChild,
  context$jscomp$0,
  childContextValues$jscomp$0
) {
  for (; null !== startingChild; ) {
    var node = startingChild,
      context = context$jscomp$0,
      childContextValues = childContextValues$jscomp$0;
    if (10 === node.tag && node.type._context === context)
      childContextValues.push(node.memoizedProps.value);
    else {
      var child = node.child;
      isFiberSuspenseAndTimedOut(node) && (child = node.child.sibling.child);
      null !== child &&
        collectNearestChildContextValues(child, context, childContextValues);
    }
    startingChild = startingChild.sibling;
  }
}
function createScopeMethods(scope, instance) {
  return {
    DO_NOT_USE_queryAllNodes: function(fn) {
      var child = instance.fiber.child,
        scopedNodes = [];
      null !== child && collectScopedNodesFromChildren(child, fn, scopedNodes);
      return 0 === scopedNodes.length ? null : scopedNodes;
    },
    DO_NOT_USE_queryFirstNode: function(fn) {
      var child = instance.fiber.child;
      return null !== child
        ? collectFirstScopedNodeFromChildren(child, fn)
        : null;
    },
    containsNode: function(node) {
      for (node = getClosestInstanceFromNode(node) || null; null !== node; ) {
        if (
          21 === node.tag &&
          node.type === scope &&
          node.stateNode === instance
        )
          return !0;
        node = node.return;
      }
      return !1;
    },
    getChildContextValues: function(context) {
      var child = instance.fiber.child,
        childContextValues = [];
      null !== child &&
        collectNearestChildContextValues(child, context, childContextValues);
      return childContextValues;
    }
  };
}
function markUpdate(workInProgress) {
  workInProgress.effectTag |= 4;
}
var appendAllChildren,
  updateHostContainer,
  updateHostComponent$1,
  updateHostText$1;
appendAllChildren = function(parent, workInProgress) {
  for (var node = workInProgress.child; null !== node; ) {
    if (5 === node.tag || 6 === node.tag) parent.appendChild(node.stateNode);
    else if (4 !== node.tag && null !== node.child) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === workInProgress) break;
    for (; null === node.sibling; ) {
      if (null === node.return || node.return === workInProgress) return;
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
};
updateHostContainer = function() {};
updateHostComponent$1 = function(
  current,
  workInProgress,
  type,
  newProps,
  rootContainerInstance
) {
  var oldProps = current.memoizedProps;
  if (oldProps !== newProps) {
    var instance = workInProgress.stateNode;
    requiredContext(contextStackCursor.current);
    current = null;
    switch (type) {
      case "input":
        oldProps = getHostProps(instance, oldProps);
        newProps = getHostProps(instance, newProps);
        current = [];
        break;
      case "option":
        oldProps = getHostProps$1(instance, oldProps);
        newProps = getHostProps$1(instance, newProps);
        current = [];
        break;
      case "select":
        oldProps = Object.assign({}, oldProps, { value: void 0 });
        newProps = Object.assign({}, newProps, { value: void 0 });
        current = [];
        break;
      case "textarea":
        oldProps = getHostProps$3(instance, oldProps);
        newProps = getHostProps$3(instance, newProps);
        current = [];
        break;
      default:
        "function" !== typeof oldProps.onClick &&
          "function" === typeof newProps.onClick &&
          (instance.onclick = noop);
    }
    assertValidProps(type, newProps);
    var propKey, styleName;
    type = null;
    for (propKey in oldProps)
      if (
        !newProps.hasOwnProperty(propKey) &&
        oldProps.hasOwnProperty(propKey) &&
        null != oldProps[propKey]
      )
        if ("style" === propKey)
          for (styleName in ((instance = oldProps[propKey]), instance))
            instance.hasOwnProperty(styleName) &&
              (type || (type = {}), (type[styleName] = ""));
        else
          "dangerouslySetInnerHTML" !== propKey &&
            "children" !== propKey &&
            "DEPRECATED_flareListeners" !== propKey &&
            "suppressContentEditableWarning" !== propKey &&
            "suppressHydrationWarning" !== propKey &&
            "autoFocus" !== propKey &&
            (registrationNameModules.hasOwnProperty(propKey)
              ? current || (current = [])
              : (current = current || []).push(propKey, null));
    for (propKey in newProps) {
      var nextProp = newProps[propKey];
      instance = null != oldProps ? oldProps[propKey] : void 0;
      if (
        newProps.hasOwnProperty(propKey) &&
        nextProp !== instance &&
        (null != nextProp || null != instance)
      )
        if ("style" === propKey)
          if (instance) {
            for (styleName in instance)
              !instance.hasOwnProperty(styleName) ||
                (nextProp && nextProp.hasOwnProperty(styleName)) ||
                (type || (type = {}), (type[styleName] = ""));
            for (styleName in nextProp)
              nextProp.hasOwnProperty(styleName) &&
                instance[styleName] !== nextProp[styleName] &&
                (type || (type = {}), (type[styleName] = nextProp[styleName]));
          } else
            type || (current || (current = []), current.push(propKey, type)),
              (type = nextProp);
        else
          "dangerouslySetInnerHTML" === propKey
            ? ((nextProp = nextProp ? nextProp.__html : void 0),
              (instance = instance ? instance.__html : void 0),
              null != nextProp &&
                instance !== nextProp &&
                (current = current || []).push(propKey, nextProp))
            : "children" === propKey
            ? instance === nextProp ||
              ("string" !== typeof nextProp && "number" !== typeof nextProp) ||
              (current = current || []).push(propKey, "" + nextProp)
            : "DEPRECATED_flareListeners" !== propKey &&
              "suppressContentEditableWarning" !== propKey &&
              "suppressHydrationWarning" !== propKey &&
              (registrationNameModules.hasOwnProperty(propKey)
                ? (null != nextProp &&
                    ensureListeningTo(rootContainerInstance, propKey),
                  current || instance === nextProp || (current = []))
                : (current = current || []).push(propKey, nextProp));
    }
    type && (current = current || []).push("style", type);
    rootContainerInstance = current;
    (workInProgress.updateQueue = rootContainerInstance) &&
      markUpdate(workInProgress);
  }
};
updateHostText$1 = function(current, workInProgress, oldText, newText) {
  oldText !== newText && markUpdate(workInProgress);
};
function cutOffTailIfNeeded(renderState, hasRenderedATailFallback) {
  switch (renderState.tailMode) {
    case "hidden":
      hasRenderedATailFallback = renderState.tail;
      for (var lastTailNode = null; null !== hasRenderedATailFallback; )
        null !== hasRenderedATailFallback.alternate &&
          (lastTailNode = hasRenderedATailFallback),
          (hasRenderedATailFallback = hasRenderedATailFallback.sibling);
      null === lastTailNode
        ? (renderState.tail = null)
        : (lastTailNode.sibling = null);
      break;
    case "collapsed":
      lastTailNode = renderState.tail;
      for (var lastTailNode$84 = null; null !== lastTailNode; )
        null !== lastTailNode.alternate && (lastTailNode$84 = lastTailNode),
          (lastTailNode = lastTailNode.sibling);
      null === lastTailNode$84
        ? hasRenderedATailFallback || null === renderState.tail
          ? (renderState.tail = null)
          : (renderState.tail.sibling = null)
        : (lastTailNode$84.sibling = null);
  }
}
function completeWork(current, workInProgress, renderExpirationTime) {
  var newProps = workInProgress.pendingProps;
  switch (workInProgress.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return null;
    case 1:
      return null;
    case 3:
      return (
        popHostContainer(),
        resetWorkInProgressVersions(),
        (newProps = workInProgress.stateNode),
        newProps.pendingContext &&
          ((newProps.context = newProps.pendingContext),
          (newProps.pendingContext = null)),
        (null === current || null === current.child) &&
          popHydrationState(workInProgress) &&
          markUpdate(workInProgress),
        updateHostContainer(workInProgress),
        null
      );
    case 5:
      popHostContext(workInProgress);
      renderExpirationTime = requiredContext(rootInstanceStackCursor.current);
      var type = workInProgress.type;
      if (null !== current && null != workInProgress.stateNode)
        updateHostComponent$1(
          current,
          workInProgress,
          type,
          newProps,
          renderExpirationTime
        ),
          current.memoizedProps.DEPRECATED_flareListeners !==
            newProps.DEPRECATED_flareListeners && markUpdate(workInProgress),
          current.ref !== workInProgress.ref &&
            (workInProgress.effectTag |= 128);
      else {
        if (!newProps) {
          if (null === workInProgress.stateNode)
            throw Error(formatProdErrorMessage(166));
          return null;
        }
        current = requiredContext(contextStackCursor.current);
        if (popHydrationState(workInProgress)) {
          type = workInProgress.stateNode;
          var type$jscomp$0 = workInProgress.type;
          current = workInProgress.memoizedProps;
          type[internalInstanceKey] = workInProgress;
          type[internalEventHandlersKey] = current;
          switch (type$jscomp$0) {
            case "iframe":
            case "object":
            case "embed":
              legacyTrapBubbledEvent("load", type);
              break;
            case "video":
            case "audio":
              for (var i = 0; i < mediaEventTypes.length; i++)
                legacyTrapBubbledEvent(mediaEventTypes[i], type);
              break;
            case "source":
              legacyTrapBubbledEvent("error", type);
              break;
            case "img":
            case "image":
            case "link":
              legacyTrapBubbledEvent("error", type);
              legacyTrapBubbledEvent("load", type);
              break;
            case "form":
              legacyTrapBubbledEvent("reset", type);
              legacyTrapBubbledEvent("submit", type);
              break;
            case "details":
              legacyTrapBubbledEvent("toggle", type);
              break;
            case "input":
              initWrapperState(type, current);
              legacyTrapBubbledEvent("invalid", type);
              ensureListeningTo(renderExpirationTime, "onChange");
              break;
            case "select":
              type._wrapperState = { wasMultiple: !!current.multiple };
              legacyTrapBubbledEvent("invalid", type);
              ensureListeningTo(renderExpirationTime, "onChange");
              break;
            case "textarea":
              initWrapperState$2(type, current),
                legacyTrapBubbledEvent("invalid", type),
                ensureListeningTo(renderExpirationTime, "onChange");
          }
          assertValidProps(type$jscomp$0, current);
          i = null;
          for (var propKey in current)
            if (current.hasOwnProperty(propKey)) {
              var nextProp = current[propKey];
              "children" === propKey
                ? "string" === typeof nextProp
                  ? type.textContent !== nextProp &&
                    (i = ["children", nextProp])
                  : "number" === typeof nextProp &&
                    type.textContent !== "" + nextProp &&
                    (i = ["children", "" + nextProp])
                : registrationNameModules.hasOwnProperty(propKey) &&
                  null != nextProp &&
                  ensureListeningTo(renderExpirationTime, propKey);
            }
          switch (type$jscomp$0) {
            case "input":
              track(type);
              postMountWrapper(type, current, !0);
              break;
            case "textarea":
              track(type);
              postMountWrapper$3(type);
              break;
            case "select":
            case "option":
              break;
            default:
              "function" === typeof current.onClick && (type.onclick = noop);
          }
          type = i;
          workInProgress.updateQueue = type;
          null !== type && markUpdate(workInProgress);
          newProps = newProps.DEPRECATED_flareListeners;
          null != newProps &&
            updateDeprecatedEventListeners(
              newProps,
              workInProgress,
              renderExpirationTime
            );
        } else {
          propKey =
            9 === renderExpirationTime.nodeType
              ? renderExpirationTime
              : renderExpirationTime.ownerDocument;
          current === Namespaces.html &&
            (current = getIntrinsicNamespace(type));
          current === Namespaces.html
            ? "script" === type
              ? ((current = propKey.createElement("div")),
                (current.innerHTML = "<script>\x3c/script>"),
                (current = current.removeChild(current.firstChild)))
              : "string" === typeof newProps.is
              ? (current = propKey.createElement(type, { is: newProps.is }))
              : ((current = propKey.createElement(type)),
                "select" === type &&
                  ((propKey = current),
                  newProps.multiple
                    ? (propKey.multiple = !0)
                    : newProps.size && (propKey.size = newProps.size)))
            : (current = propKey.createElementNS(current, type));
          current[internalInstanceKey] = workInProgress;
          current[internalEventHandlersKey] = newProps;
          appendAllChildren(current, workInProgress, !1, !1);
          workInProgress.stateNode = current;
          propKey = newProps.DEPRECATED_flareListeners;
          null != propKey &&
            updateDeprecatedEventListeners(
              propKey,
              workInProgress,
              renderExpirationTime
            );
          propKey = isCustomComponent(type, newProps);
          switch (type) {
            case "iframe":
            case "object":
            case "embed":
              legacyTrapBubbledEvent("load", current);
              i = newProps;
              break;
            case "video":
            case "audio":
              for (i = 0; i < mediaEventTypes.length; i++)
                legacyTrapBubbledEvent(mediaEventTypes[i], current);
              i = newProps;
              break;
            case "source":
              legacyTrapBubbledEvent("error", current);
              i = newProps;
              break;
            case "img":
            case "image":
            case "link":
              legacyTrapBubbledEvent("error", current);
              legacyTrapBubbledEvent("load", current);
              i = newProps;
              break;
            case "form":
              legacyTrapBubbledEvent("reset", current);
              legacyTrapBubbledEvent("submit", current);
              i = newProps;
              break;
            case "details":
              legacyTrapBubbledEvent("toggle", current);
              i = newProps;
              break;
            case "input":
              initWrapperState(current, newProps);
              i = getHostProps(current, newProps);
              legacyTrapBubbledEvent("invalid", current);
              ensureListeningTo(renderExpirationTime, "onChange");
              break;
            case "option":
              i = getHostProps$1(current, newProps);
              break;
            case "select":
              current._wrapperState = { wasMultiple: !!newProps.multiple };
              i = Object.assign({}, newProps, { value: void 0 });
              legacyTrapBubbledEvent("invalid", current);
              ensureListeningTo(renderExpirationTime, "onChange");
              break;
            case "textarea":
              initWrapperState$2(current, newProps);
              i = getHostProps$3(current, newProps);
              legacyTrapBubbledEvent("invalid", current);
              ensureListeningTo(renderExpirationTime, "onChange");
              break;
            default:
              i = newProps;
          }
          assertValidProps(type, i);
          nextProp = i;
          for (type$jscomp$0 in nextProp)
            if (nextProp.hasOwnProperty(type$jscomp$0)) {
              var nextProp$jscomp$0 = nextProp[type$jscomp$0];
              "style" === type$jscomp$0
                ? setValueForStyles(current, nextProp$jscomp$0)
                : "dangerouslySetInnerHTML" === type$jscomp$0
                ? ((nextProp$jscomp$0 = nextProp$jscomp$0
                    ? nextProp$jscomp$0.__html
                    : void 0),
                  null != nextProp$jscomp$0 &&
                    setInnerHTML(current, nextProp$jscomp$0))
                : "children" === type$jscomp$0
                ? "string" === typeof nextProp$jscomp$0
                  ? ("textarea" !== type || "" !== nextProp$jscomp$0) &&
                    setTextContent(current, nextProp$jscomp$0)
                  : "number" === typeof nextProp$jscomp$0 &&
                    setTextContent(current, "" + nextProp$jscomp$0)
                : "DEPRECATED_flareListeners" !== type$jscomp$0 &&
                  "suppressContentEditableWarning" !== type$jscomp$0 &&
                  "suppressHydrationWarning" !== type$jscomp$0 &&
                  "autoFocus" !== type$jscomp$0 &&
                  (registrationNameModules.hasOwnProperty(type$jscomp$0)
                    ? null != nextProp$jscomp$0 &&
                      ensureListeningTo(renderExpirationTime, type$jscomp$0)
                    : null != nextProp$jscomp$0 &&
                      setValueForProperty(
                        current,
                        type$jscomp$0,
                        nextProp$jscomp$0,
                        propKey
                      ));
            }
          switch (type) {
            case "input":
              track(current);
              postMountWrapper(current, newProps, !1);
              break;
            case "textarea":
              track(current);
              postMountWrapper$3(current);
              break;
            case "option":
              null != newProps.value &&
                current.setAttribute(
                  "value",
                  "" + getToStringValue(newProps.value)
                );
              break;
            case "select":
              current.multiple = !!newProps.multiple;
              renderExpirationTime = newProps.value;
              null != renderExpirationTime
                ? updateOptions(
                    current,
                    !!newProps.multiple,
                    renderExpirationTime,
                    !1
                  )
                : null != newProps.defaultValue &&
                  updateOptions(
                    current,
                    !!newProps.multiple,
                    newProps.defaultValue,
                    !0
                  );
              break;
            default:
              "function" === typeof i.onClick && (current.onclick = noop);
          }
          shouldAutoFocusHostComponent(type, newProps) &&
            markUpdate(workInProgress);
        }
        null !== workInProgress.ref && (workInProgress.effectTag |= 128);
      }
      return null;
    case 6:
      if (current && null != workInProgress.stateNode)
        updateHostText$1(
          current,
          workInProgress,
          current.memoizedProps,
          newProps
        );
      else {
        if ("string" !== typeof newProps && null === workInProgress.stateNode)
          throw Error(formatProdErrorMessage(166));
        renderExpirationTime = requiredContext(rootInstanceStackCursor.current);
        requiredContext(contextStackCursor.current);
        popHydrationState(workInProgress)
          ? ((newProps = workInProgress.stateNode),
            (renderExpirationTime = workInProgress.memoizedProps),
            (newProps[internalInstanceKey] = workInProgress),
            newProps.nodeValue !== renderExpirationTime &&
              markUpdate(workInProgress))
          : ((newProps = (9 === renderExpirationTime.nodeType
              ? renderExpirationTime
              : renderExpirationTime.ownerDocument
            ).createTextNode(newProps)),
            (newProps[internalInstanceKey] = workInProgress),
            (workInProgress.stateNode = newProps));
      }
      return null;
    case 13:
      pop(suspenseStackCursor);
      newProps = workInProgress.memoizedState;
      if (null !== newProps && null !== newProps.dehydrated) {
        if (null === current) {
          if (!popHydrationState(workInProgress))
            throw Error(formatProdErrorMessage(318));
          newProps = workInProgress.memoizedState;
          newProps = null !== newProps ? newProps.dehydrated : null;
          if (!newProps) throw Error(formatProdErrorMessage(317));
          newProps[internalInstanceKey] = workInProgress;
        } else
          resetHydrationState(),
            0 === (workInProgress.effectTag & 64) &&
              (workInProgress.memoizedState = null),
            (workInProgress.effectTag |= 4);
        return null;
      }
      if (0 !== (workInProgress.effectTag & 64))
        return (
          (workInProgress.expirationTime = renderExpirationTime), workInProgress
        );
      newProps = null !== newProps;
      renderExpirationTime = !1;
      null === current
        ? void 0 !== workInProgress.memoizedProps.fallback &&
          popHydrationState(workInProgress)
        : ((type = current.memoizedState),
          (renderExpirationTime = null !== type),
          newProps ||
            null === type ||
            ((type = current.child.sibling),
            null !== type &&
              ((type$jscomp$0 = workInProgress.firstEffect),
              null !== type$jscomp$0
                ? ((workInProgress.firstEffect = type),
                  (type.nextEffect = type$jscomp$0))
                : ((workInProgress.firstEffect = workInProgress.lastEffect = type),
                  (type.nextEffect = null)),
              (type.effectTag = 8))));
      newProps &&
        !renderExpirationTime &&
        0 !== (workInProgress.mode & 2) &&
        ((null === current &&
          !0 !== workInProgress.memoizedProps.unstable_avoidThisFallback) ||
        0 !== (suspenseStackCursor.current & 1)
          ? 0 === workInProgressRootExitStatus &&
            (workInProgressRootExitStatus = 3)
          : renderDidSuspendDelayIfPossible());
      if (newProps || renderExpirationTime) workInProgress.effectTag |= 4;
      null !== workInProgress.updateQueue &&
        null != workInProgress.memoizedProps.suspenseCallback &&
        (workInProgress.effectTag |= 4);
      return null;
    case 4:
      return popHostContainer(), updateHostContainer(workInProgress), null;
    case 10:
      return popProvider(workInProgress), null;
    case 17:
      return null;
    case 19:
      pop(suspenseStackCursor);
      newProps = workInProgress.memoizedState;
      if (null === newProps) return null;
      type = 0 !== (workInProgress.effectTag & 64);
      type$jscomp$0 = newProps.rendering;
      if (null === type$jscomp$0)
        if (type) cutOffTailIfNeeded(newProps, !1);
        else {
          if (
            0 !== workInProgressRootExitStatus ||
            (null !== current && 0 !== (current.effectTag & 64))
          )
            for (
              type$jscomp$0 = workInProgress.child;
              null !== type$jscomp$0;

            ) {
              current = findFirstSuspended(type$jscomp$0);
              if (null !== current) {
                workInProgress.effectTag |= 64;
                cutOffTailIfNeeded(newProps, !1);
                type = current.updateQueue;
                null !== type &&
                  ((workInProgress.updateQueue = type),
                  (workInProgress.effectTag |= 4));
                null === newProps.lastEffect &&
                  (workInProgress.firstEffect = null);
                workInProgress.lastEffect = newProps.lastEffect;
                newProps = renderExpirationTime;
                for (
                  renderExpirationTime = workInProgress.child;
                  null !== renderExpirationTime;

                )
                  (type = renderExpirationTime),
                    (type$jscomp$0 = newProps),
                    (type.effectTag &= 2),
                    (type.nextEffect = null),
                    (type.firstEffect = null),
                    (type.lastEffect = null),
                    (current = type.alternate),
                    null === current
                      ? ((type.childExpirationTime = 0),
                        (type.expirationTime = type$jscomp$0),
                        (type.child = null),
                        (type.memoizedProps = null),
                        (type.memoizedState = null),
                        (type.updateQueue = null),
                        (type.dependencies = null),
                        (type.stateNode = null))
                      : ((type.childExpirationTime =
                          current.childExpirationTime),
                        (type.expirationTime = current.expirationTime),
                        (type.child = current.child),
                        (type.memoizedProps = current.memoizedProps),
                        (type.memoizedState = current.memoizedState),
                        (type.updateQueue = current.updateQueue),
                        (type$jscomp$0 = current.dependencies),
                        (type.dependencies =
                          null === type$jscomp$0
                            ? null
                            : {
                                expirationTime: type$jscomp$0.expirationTime,
                                firstContext: type$jscomp$0.firstContext,
                                responders: type$jscomp$0.responders
                              })),
                    (renderExpirationTime = renderExpirationTime.sibling);
                push(
                  suspenseStackCursor,
                  (suspenseStackCursor.current & 1) | 2
                );
                return workInProgress.child;
              }
              type$jscomp$0 = type$jscomp$0.sibling;
            }
        }
      else {
        if (!type)
          if (
            ((current = findFirstSuspended(type$jscomp$0)), null !== current)
          ) {
            if (
              ((workInProgress.effectTag |= 64),
              (type = !0),
              (renderExpirationTime = current.updateQueue),
              null !== renderExpirationTime &&
                ((workInProgress.updateQueue = renderExpirationTime),
                (workInProgress.effectTag |= 4)),
              cutOffTailIfNeeded(newProps, !0),
              null === newProps.tail &&
                "hidden" === newProps.tailMode &&
                !type$jscomp$0.alternate)
            )
              return (
                (workInProgress = workInProgress.lastEffect =
                  newProps.lastEffect),
                null !== workInProgress && (workInProgress.nextEffect = null),
                null
              );
          } else
            2 * now() - newProps.renderingStartTime > newProps.tailExpiration &&
              1 < renderExpirationTime &&
              ((workInProgress.effectTag |= 64),
              (type = !0),
              cutOffTailIfNeeded(newProps, !1),
              (workInProgress.expirationTime = workInProgress.childExpirationTime =
                renderExpirationTime - 1));
        newProps.isBackwards
          ? ((type$jscomp$0.sibling = workInProgress.child),
            (workInProgress.child = type$jscomp$0))
          : ((renderExpirationTime = newProps.last),
            null !== renderExpirationTime
              ? (renderExpirationTime.sibling = type$jscomp$0)
              : (workInProgress.child = type$jscomp$0),
            (newProps.last = type$jscomp$0));
      }
      return null !== newProps.tail
        ? (0 === newProps.tailExpiration &&
            (newProps.tailExpiration = now() + 500),
          (renderExpirationTime = newProps.tail),
          (newProps.rendering = renderExpirationTime),
          (newProps.tail = renderExpirationTime.sibling),
          (newProps.lastEffect = workInProgress.lastEffect),
          (newProps.renderingStartTime = now()),
          (renderExpirationTime.sibling = null),
          (workInProgress = suspenseStackCursor.current),
          push(
            suspenseStackCursor,
            type ? (workInProgress & 1) | 2 : workInProgress & 1
          ),
          renderExpirationTime)
        : null;
    case 21:
      return (
        null === current
          ? ((renderExpirationTime = workInProgress.type),
            (type = { fiber: workInProgress, methods: null }),
            (workInProgress.stateNode = type),
            (type.methods = createScopeMethods(renderExpirationTime, type)),
            (newProps = newProps.DEPRECATED_flareListeners),
            null != newProps &&
              ((renderExpirationTime = requiredContext(
                rootInstanceStackCursor.current
              )),
              updateDeprecatedEventListeners(
                newProps,
                workInProgress,
                renderExpirationTime
              )),
            null !== workInProgress.ref &&
              ((workInProgress.effectTag |= 128), markUpdate(workInProgress)))
          : ((current.memoizedProps.DEPRECATED_flareListeners ===
              newProps.DEPRECATED_flareListeners &&
              null === workInProgress.ref) ||
              markUpdate(workInProgress),
            current.ref !== workInProgress.ref &&
              (workInProgress.effectTag |= 128)),
        null
      );
    case 22:
      return null;
  }
  throw Error(formatProdErrorMessage(156, workInProgress.tag));
}
function unwindWork(workInProgress) {
  switch (workInProgress.tag) {
    case 1:
      var effectTag = workInProgress.effectTag;
      return effectTag & 4096
        ? ((workInProgress.effectTag = (effectTag & -4097) | 64),
          workInProgress)
        : null;
    case 3:
      popHostContainer();
      resetWorkInProgressVersions();
      effectTag = workInProgress.effectTag;
      if (0 !== (effectTag & 64)) throw Error(formatProdErrorMessage(285));
      workInProgress.effectTag = (effectTag & -4097) | 64;
      return workInProgress;
    case 5:
      return popHostContext(workInProgress), null;
    case 13:
      pop(suspenseStackCursor);
      effectTag = workInProgress.memoizedState;
      if (null !== effectTag && null !== effectTag.dehydrated) {
        if (null === workInProgress.alternate)
          throw Error(formatProdErrorMessage(340));
        resetHydrationState();
      }
      effectTag = workInProgress.effectTag;
      return effectTag & 4096
        ? ((workInProgress.effectTag = (effectTag & -4097) | 64),
          workInProgress)
        : null;
    case 19:
      return pop(suspenseStackCursor), null;
    case 4:
      return popHostContainer(), null;
    case 10:
      return popProvider(workInProgress), null;
    default:
      return null;
  }
}
function createCapturedValue(value, source) {
  return {
    value: value,
    source: source,
    stack: getStackByFiberInDevAndProd(source)
  };
}
var ReactFiberErrorDialogWWW = require("ReactFiberErrorDialog");
if ("function" !== typeof ReactFiberErrorDialogWWW.showErrorDialog)
  throw Error(formatProdErrorMessage(320));
var PossiblyWeakSet = "function" === typeof WeakSet ? WeakSet : Set;
function logError(boundary, errorInfo) {
  var source = errorInfo.source,
    stack = errorInfo.stack;
  null === stack &&
    null !== source &&
    (stack = getStackByFiberInDevAndProd(source));
  errorInfo = {
    componentName: null !== source ? getComponentName(source.type) : null,
    componentStack: null !== stack ? stack : "",
    error: errorInfo.value,
    errorBoundary: null,
    errorBoundaryName: null,
    errorBoundaryFound: !1,
    willRetry: !1
  };
  null !== boundary &&
    1 === boundary.tag &&
    ((errorInfo.errorBoundary = boundary.stateNode),
    (errorInfo.errorBoundaryName = getComponentName(boundary.type)),
    (errorInfo.errorBoundaryFound = !0),
    (errorInfo.willRetry = !0));
  try {
    !1 !== ReactFiberErrorDialogWWW.showErrorDialog(errorInfo) &&
      console.error(errorInfo.error);
  } catch (e$101) {
    setTimeout(function() {
      throw e$101;
    });
  }
}
function safelyDetachRef(current) {
  var ref = current.ref;
  if (null !== ref)
    if ("function" === typeof ref)
      try {
        ref(null);
      } catch (refError) {
        captureCommitPhaseError(current, refError);
      }
    else ref.current = null;
}
function commitBeforeMutationLifeCycles(current, finishedWork) {
  switch (finishedWork.tag) {
    case 0:
    case 11:
    case 15:
    case 22:
      return;
    case 1:
      if (finishedWork.effectTag & 256 && null !== current) {
        var prevProps = current.memoizedProps,
          prevState = current.memoizedState;
        current = finishedWork.stateNode;
        finishedWork = current.getSnapshotBeforeUpdate(
          finishedWork.elementType === finishedWork.type
            ? prevProps
            : resolveDefaultProps(finishedWork.type, prevProps),
          prevState
        );
        current.__reactInternalSnapshotBeforeUpdate = finishedWork;
      }
      return;
    case 3:
    case 5:
    case 6:
    case 4:
    case 17:
      return;
  }
  throw Error(formatProdErrorMessage(163));
}
function commitLifeCycles(finishedRoot, current, finishedWork) {
  switch (finishedWork.tag) {
    case 0:
    case 11:
    case 15:
    case 22:
      finishedRoot = finishedWork.updateQueue;
      finishedRoot = null !== finishedRoot ? finishedRoot.lastEffect : null;
      if (null !== finishedRoot) {
        current = finishedRoot = finishedRoot.next;
        do {
          if (3 === (current.tag & 3)) {
            var create = current.create;
            current.destroy = create();
          }
          current = current.next;
        } while (current !== finishedRoot);
      }
      finishedRoot = finishedWork.updateQueue;
      finishedRoot = null !== finishedRoot ? finishedRoot.lastEffect : null;
      if (null !== finishedRoot) {
        current = finishedRoot = finishedRoot.next;
        do {
          var _effect = current;
          create = _effect.next;
          _effect = _effect.tag;
          0 !== (_effect & 4) &&
            0 !== (_effect & 1) &&
            (enqueuePendingPassiveHookEffectUnmount(finishedWork, current),
            enqueuePendingPassiveHookEffectMount(finishedWork, current));
          current = create;
        } while (current !== finishedRoot);
      }
      return;
    case 1:
      finishedRoot = finishedWork.stateNode;
      finishedWork.effectTag & 4 &&
        (null === current
          ? finishedRoot.componentDidMount()
          : ((create =
              finishedWork.elementType === finishedWork.type
                ? current.memoizedProps
                : resolveDefaultProps(
                    finishedWork.type,
                    current.memoizedProps
                  )),
            finishedRoot.componentDidUpdate(
              create,
              current.memoizedState,
              finishedRoot.__reactInternalSnapshotBeforeUpdate
            )));
      current = finishedWork.updateQueue;
      null !== current &&
        commitUpdateQueue(finishedWork, current, finishedRoot);
      return;
    case 3:
      finishedRoot = finishedWork.updateQueue;
      if (null !== finishedRoot) {
        current = null;
        if (null !== finishedWork.child)
          switch (finishedWork.child.tag) {
            case 5:
              current = finishedWork.child.stateNode;
              break;
            case 1:
              current = finishedWork.child.stateNode;
          }
        commitUpdateQueue(finishedWork, finishedRoot, current);
      }
      return;
    case 5:
      finishedRoot = finishedWork.stateNode;
      null === current &&
        finishedWork.effectTag & 4 &&
        shouldAutoFocusHostComponent(
          finishedWork.type,
          finishedWork.memoizedProps
        ) &&
        finishedRoot.focus();
      return;
    case 6:
      return;
    case 4:
      return;
    case 12:
      return;
    case 13:
      null === finishedWork.memoizedState &&
        ((finishedWork = finishedWork.alternate),
        null !== finishedWork &&
          ((finishedWork = finishedWork.memoizedState),
          null !== finishedWork &&
            ((finishedWork = finishedWork.dehydrated),
            null !== finishedWork &&
              (retryIfBlockedOn(finishedWork),
              (finishedRoot = finishedRoot.hydrationCallbacks),
              null !== finishedRoot &&
                (finishedRoot = finishedRoot.onHydrated) &&
                finishedRoot(finishedWork)))));
      return;
    case 19:
    case 17:
    case 20:
    case 21:
      return;
  }
  throw Error(formatProdErrorMessage(163));
}
function commitUnmount(finishedRoot, current) {
  "function" === typeof onCommitFiberUnmount && onCommitFiberUnmount(current);
  switch (current.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
    case 22:
      finishedRoot = current.updateQueue;
      if (
        null !== finishedRoot &&
        ((finishedRoot = finishedRoot.lastEffect), null !== finishedRoot)
      ) {
        var effect = (finishedRoot = finishedRoot.next);
        do {
          var _effect2 = effect,
            destroy = _effect2.destroy;
          _effect2 = _effect2.tag;
          if (void 0 !== destroy)
            if (0 !== (_effect2 & 4))
              enqueuePendingPassiveHookEffectUnmount(current, effect);
            else {
              _effect2 = current;
              try {
                destroy();
              } catch (error) {
                captureCommitPhaseError(_effect2, error);
              }
            }
          effect = effect.next;
        } while (effect !== finishedRoot);
      }
      break;
    case 1:
      safelyDetachRef(current);
      finishedRoot = current.stateNode;
      if ("function" === typeof finishedRoot.componentWillUnmount)
        try {
          (finishedRoot.props = current.memoizedProps),
            (finishedRoot.state = current.memoizedState),
            finishedRoot.componentWillUnmount();
        } catch (unmountError) {
          captureCommitPhaseError(current, unmountError);
        }
      break;
    case 5:
      unmountDeprecatedResponderListeners(current);
      finishedRoot = current.stateNode;
      selectionInformation &&
        finishedRoot === selectionInformation.focusedElem &&
        dispatchBeforeDetachedBlur(finishedRoot);
      safelyDetachRef(current);
      break;
    case 4:
      unmountHostComponents(finishedRoot, current);
      break;
    case 18:
      finishedRoot = finishedRoot.hydrationCallbacks;
      null !== finishedRoot &&
        (finishedRoot = finishedRoot.onDeleted) &&
        finishedRoot(current.stateNode);
      break;
    case 21:
      unmountDeprecatedResponderListeners(current), safelyDetachRef(current);
  }
}
function detachFiber(current) {
  var alternate = current.alternate;
  current.return = null;
  current.child = null;
  current.memoizedState = null;
  current.updateQueue = null;
  current.dependencies = null;
  current.alternate = null;
  current.firstEffect = null;
  current.lastEffect = null;
  current.pendingProps = null;
  current.memoizedProps = null;
  current.stateNode = null;
  null !== alternate && detachFiber(alternate);
}
function isHostParent(fiber) {
  return 5 === fiber.tag || 3 === fiber.tag || 4 === fiber.tag;
}
function commitPlacement(finishedWork) {
  a: {
    for (var parent = finishedWork.return; null !== parent; ) {
      if (isHostParent(parent)) break a;
      parent = parent.return;
    }
    throw Error(formatProdErrorMessage(160));
  }
  var parentFiber = parent;
  parent = parentFiber.stateNode;
  switch (parentFiber.tag) {
    case 5:
      var isContainer = !1;
      break;
    case 3:
      parent = parent.containerInfo;
      isContainer = !0;
      break;
    case 4:
      parent = parent.containerInfo;
      isContainer = !0;
      break;
    default:
      throw Error(formatProdErrorMessage(161));
  }
  parentFiber.effectTag & 16 &&
    (setTextContent(parent, ""), (parentFiber.effectTag &= -17));
  a: b: for (parentFiber = finishedWork; ; ) {
    for (; null === parentFiber.sibling; ) {
      if (null === parentFiber.return || isHostParent(parentFiber.return)) {
        parentFiber = null;
        break a;
      }
      parentFiber = parentFiber.return;
    }
    parentFiber.sibling.return = parentFiber.return;
    for (
      parentFiber = parentFiber.sibling;
      5 !== parentFiber.tag && 6 !== parentFiber.tag && 18 !== parentFiber.tag;

    ) {
      if (parentFiber.effectTag & 2) continue b;
      if (null === parentFiber.child || 4 === parentFiber.tag) continue b;
      else
        (parentFiber.child.return = parentFiber),
          (parentFiber = parentFiber.child);
    }
    if (!(parentFiber.effectTag & 2)) {
      parentFiber = parentFiber.stateNode;
      break a;
    }
  }
  isContainer
    ? insertOrAppendPlacementNodeIntoContainer(
        finishedWork,
        parentFiber,
        parent
      )
    : insertOrAppendPlacementNode(finishedWork, parentFiber, parent);
}
function insertOrAppendPlacementNodeIntoContainer(node, before, parent) {
  var tag = node.tag,
    isHost = 5 === tag || 6 === tag;
  if (isHost)
    (node = isHost ? node.stateNode : node.stateNode.instance),
      before
        ? 8 === parent.nodeType
          ? parent.parentNode.insertBefore(node, before)
          : parent.insertBefore(node, before)
        : (8 === parent.nodeType
            ? ((before = parent.parentNode), before.insertBefore(node, parent))
            : ((before = parent), before.appendChild(node)),
          (parent = parent._reactRootContainer),
          (null !== parent && void 0 !== parent) ||
            null !== before.onclick ||
            (before.onclick = noop));
  else if (4 !== tag && ((node = node.child), null !== node))
    for (
      insertOrAppendPlacementNodeIntoContainer(node, before, parent),
        node = node.sibling;
      null !== node;

    )
      insertOrAppendPlacementNodeIntoContainer(node, before, parent),
        (node = node.sibling);
}
function insertOrAppendPlacementNode(node, before, parent) {
  var tag = node.tag,
    isHost = 5 === tag || 6 === tag;
  if (isHost)
    (node = isHost ? node.stateNode : node.stateNode.instance),
      before ? parent.insertBefore(node, before) : parent.appendChild(node);
  else if (4 !== tag && ((node = node.child), null !== node))
    for (
      insertOrAppendPlacementNode(node, before, parent), node = node.sibling;
      null !== node;

    )
      insertOrAppendPlacementNode(node, before, parent), (node = node.sibling);
}
function unmountHostComponents(finishedRoot$jscomp$0, current) {
  for (
    var node = current,
      currentParentIsValid = !1,
      currentParent,
      currentParentIsContainer;
    ;

  ) {
    if (!currentParentIsValid) {
      currentParentIsValid = node.return;
      a: for (;;) {
        if (null === currentParentIsValid)
          throw Error(formatProdErrorMessage(160));
        currentParent = currentParentIsValid.stateNode;
        switch (currentParentIsValid.tag) {
          case 5:
            currentParentIsContainer = !1;
            break a;
          case 3:
            currentParent = currentParent.containerInfo;
            currentParentIsContainer = !0;
            break a;
          case 4:
            currentParent = currentParent.containerInfo;
            currentParentIsContainer = !0;
            break a;
        }
        currentParentIsValid = currentParentIsValid.return;
      }
      currentParentIsValid = !0;
    }
    if (5 === node.tag || 6 === node.tag) {
      a: for (
        var finishedRoot = finishedRoot$jscomp$0,
          root = node,
          node$jscomp$0 = root;
        ;

      )
        if (
          (commitUnmount(finishedRoot, node$jscomp$0),
          null !== node$jscomp$0.child && 4 !== node$jscomp$0.tag)
        )
          (node$jscomp$0.child.return = node$jscomp$0),
            (node$jscomp$0 = node$jscomp$0.child);
        else {
          if (node$jscomp$0 === root) break a;
          for (; null === node$jscomp$0.sibling; ) {
            if (null === node$jscomp$0.return || node$jscomp$0.return === root)
              break a;
            node$jscomp$0 = node$jscomp$0.return;
          }
          node$jscomp$0.sibling.return = node$jscomp$0.return;
          node$jscomp$0 = node$jscomp$0.sibling;
        }
      currentParentIsContainer
        ? ((finishedRoot = currentParent),
          (root = node.stateNode),
          8 === finishedRoot.nodeType
            ? finishedRoot.parentNode.removeChild(root)
            : finishedRoot.removeChild(root))
        : currentParent.removeChild(node.stateNode);
    } else if (18 === node.tag)
      (finishedRoot = finishedRoot$jscomp$0.hydrationCallbacks),
        null !== finishedRoot &&
          (finishedRoot = finishedRoot.onDeleted) &&
          finishedRoot(node.stateNode),
        currentParentIsContainer
          ? ((finishedRoot = currentParent),
            (root = node.stateNode),
            8 === finishedRoot.nodeType
              ? clearSuspenseBoundary(finishedRoot.parentNode, root)
              : 1 === finishedRoot.nodeType &&
                clearSuspenseBoundary(finishedRoot, root),
            retryIfBlockedOn(finishedRoot))
          : clearSuspenseBoundary(currentParent, node.stateNode);
    else if (4 === node.tag) {
      if (null !== node.child) {
        currentParent = node.stateNode.containerInfo;
        currentParentIsContainer = !0;
        node.child.return = node;
        node = node.child;
        continue;
      }
    } else if (
      (commitUnmount(finishedRoot$jscomp$0, node), null !== node.child)
    ) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === current) break;
    for (; null === node.sibling; ) {
      if (null === node.return || node.return === current) return;
      node = node.return;
      4 === node.tag && (currentParentIsValid = !1);
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
}
function commitWork(current, finishedWork) {
  switch (finishedWork.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
    case 22:
      finishedWork = finishedWork.updateQueue;
      finishedWork = null !== finishedWork ? finishedWork.lastEffect : null;
      if (null !== finishedWork) {
        var effect = (finishedWork = finishedWork.next);
        do {
          if (3 === (effect.tag & 3)) {
            var destroy = effect.destroy;
            effect.destroy = void 0;
            void 0 !== destroy && destroy();
          }
          effect = effect.next;
        } while (effect !== finishedWork);
      }
      return;
    case 1:
      return;
    case 5:
      effect = finishedWork.stateNode;
      if (null != effect) {
        destroy = finishedWork.memoizedProps;
        current = null !== current ? current.memoizedProps : destroy;
        var type = finishedWork.type,
          updatePayload = finishedWork.updateQueue;
        finishedWork.updateQueue = null;
        if (null !== updatePayload) {
          effect[internalEventHandlersKey] = destroy;
          "input" === type &&
            "radio" === destroy.type &&
            null != destroy.name &&
            updateChecked(effect, destroy);
          isCustomComponent(type, current);
          for (
            var isCustomComponentTag = isCustomComponent(type, destroy), i = 0;
            i < updatePayload.length;
            i += 2
          ) {
            var propKey = updatePayload[i],
              propValue = updatePayload[i + 1];
            "style" === propKey
              ? setValueForStyles(effect, propValue)
              : "dangerouslySetInnerHTML" === propKey
              ? setInnerHTML(effect, propValue)
              : "children" === propKey
              ? setTextContent(effect, propValue)
              : setValueForProperty(
                  effect,
                  propKey,
                  propValue,
                  isCustomComponentTag
                );
          }
          switch (type) {
            case "input":
              updateWrapper(effect, destroy);
              break;
            case "textarea":
              updateWrapper$1(effect, destroy);
              break;
            case "select":
              (type = effect._wrapperState.wasMultiple),
                (effect._wrapperState.wasMultiple = !!destroy.multiple),
                (updatePayload = destroy.value),
                null != updatePayload
                  ? updateOptions(effect, !!destroy.multiple, updatePayload, !1)
                  : type !== !!destroy.multiple &&
                    (null != destroy.defaultValue
                      ? updateOptions(
                          effect,
                          !!destroy.multiple,
                          destroy.defaultValue,
                          !0
                        )
                      : updateOptions(
                          effect,
                          !!destroy.multiple,
                          destroy.multiple ? [] : "",
                          !1
                        ));
          }
        }
        effect = destroy.DEPRECATED_flareListeners;
        current.DEPRECATED_flareListeners !== effect &&
          updateDeprecatedEventListeners(effect, finishedWork, null);
      }
      return;
    case 6:
      if (null === finishedWork.stateNode)
        throw Error(formatProdErrorMessage(162));
      finishedWork.stateNode.nodeValue = finishedWork.memoizedProps;
      return;
    case 3:
      finishedWork = finishedWork.stateNode;
      finishedWork.hydrate &&
        ((finishedWork.hydrate = !1),
        retryIfBlockedOn(finishedWork.containerInfo));
      return;
    case 12:
      return;
    case 13:
      effect = finishedWork.memoizedState;
      destroy = finishedWork;
      null === effect
        ? (current = !1)
        : ((current = !0),
          (destroy = finishedWork.child),
          (globalMostRecentFallbackTime = now()));
      if (null !== destroy)
        a: for (type = destroy; ; ) {
          if (5 === type.tag)
            if (((updatePayload = type.stateNode), current)) {
              if (selectionInformation) {
                isCustomComponentTag = selectionInformation.focusedElem;
                if ((i = null !== isCustomComponentTag))
                  b: {
                    for (
                      i = getClosestInstanceFromNode(isCustomComponentTag);
                      null !== i;

                    ) {
                      if (5 === i.tag && i.stateNode === updatePayload) {
                        i = !0;
                        break b;
                      }
                      i = i.return;
                    }
                    i = !1;
                  }
                i && dispatchBeforeDetachedBlur(isCustomComponentTag);
              }
              updatePayload = updatePayload.style;
              "function" === typeof updatePayload.setProperty
                ? updatePayload.setProperty("display", "none", "important")
                : (updatePayload.display = "none");
            } else
              (updatePayload = type.stateNode),
                (isCustomComponentTag = type.memoizedProps.style),
                (isCustomComponentTag =
                  void 0 !== isCustomComponentTag &&
                  null !== isCustomComponentTag &&
                  isCustomComponentTag.hasOwnProperty("display")
                    ? isCustomComponentTag.display
                    : null),
                (updatePayload.style.display = dangerousStyleValue(
                  "display",
                  isCustomComponentTag
                ));
          else if (6 === type.tag)
            type.stateNode.nodeValue = current ? "" : type.memoizedProps;
          else if (
            13 === type.tag &&
            null !== type.memoizedState &&
            null === type.memoizedState.dehydrated
          ) {
            updatePayload = type.child.sibling;
            updatePayload.return = type;
            type = updatePayload;
            continue;
          } else if (null !== type.child) {
            type.child.return = type;
            type = type.child;
            continue;
          }
          if (type === destroy) break;
          for (; null === type.sibling; ) {
            if (null === type.return || type.return === destroy) break a;
            type = type.return;
          }
          type.sibling.return = type.return;
          type = type.sibling;
        }
      null !== effect &&
        ((effect = finishedWork.memoizedProps.suspenseCallback),
        "function" === typeof effect &&
          ((destroy = finishedWork.updateQueue),
          null !== destroy && effect(new Set(destroy))));
      attachSuspenseRetryListeners(finishedWork);
      return;
    case 19:
      attachSuspenseRetryListeners(finishedWork);
      return;
    case 17:
      return;
    case 21:
      finishedWork.stateNode.fiber = finishedWork;
      effect = finishedWork.memoizedProps;
      destroy = effect.DEPRECATED_flareListeners;
      ((null !== current ? current.memoizedProps : effect)
        .DEPRECATED_flareListeners === destroy &&
        null !== current) ||
        updateDeprecatedEventListeners(destroy, finishedWork, null);
      return;
  }
  throw Error(formatProdErrorMessage(163));
}
function attachSuspenseRetryListeners(finishedWork) {
  var wakeables = finishedWork.updateQueue;
  if (null !== wakeables) {
    finishedWork.updateQueue = null;
    var retryCache = finishedWork.stateNode;
    null === retryCache &&
      (retryCache = finishedWork.stateNode = new PossiblyWeakSet());
    wakeables.forEach(function(wakeable) {
      var retry = resolveRetryWakeable.bind(null, finishedWork, wakeable);
      retryCache.has(wakeable) ||
        (retryCache.add(wakeable), wakeable.then(retry, retry));
    });
  }
}
var PossiblyWeakMap$1 = "function" === typeof WeakMap ? WeakMap : Map;
function createRootErrorUpdate(fiber, errorInfo, expirationTime) {
  expirationTime = createUpdate(expirationTime, null);
  expirationTime.tag = 3;
  expirationTime.payload = { element: null };
  var error = errorInfo.value;
  expirationTime.callback = function() {
    hasUncaughtError || ((hasUncaughtError = !0), (firstUncaughtError = error));
    logError(fiber, errorInfo);
  };
  return expirationTime;
}
function createClassErrorUpdate(fiber, errorInfo, expirationTime) {
  expirationTime = createUpdate(expirationTime, null);
  expirationTime.tag = 3;
  var getDerivedStateFromError = fiber.type.getDerivedStateFromError;
  if ("function" === typeof getDerivedStateFromError) {
    var error = errorInfo.value;
    expirationTime.payload = function() {
      logError(fiber, errorInfo);
      return getDerivedStateFromError(error);
    };
  }
  var inst = fiber.stateNode;
  null !== inst &&
    "function" === typeof inst.componentDidCatch &&
    (expirationTime.callback = function() {
      "function" !== typeof getDerivedStateFromError &&
        (null === legacyErrorBoundariesThatAlreadyFailed
          ? (legacyErrorBoundariesThatAlreadyFailed = new Set([this]))
          : legacyErrorBoundariesThatAlreadyFailed.add(this),
        logError(fiber, errorInfo));
      var stack = errorInfo.stack;
      this.componentDidCatch(errorInfo.value, {
        componentStack: null !== stack ? stack : ""
      });
    });
  return expirationTime;
}
var ceil = Math.ceil,
  ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher,
  ReactCurrentOwner$2 = ReactSharedInternals.ReactCurrentOwner,
  executionContext = 0,
  workInProgressRoot = null,
  workInProgress = null,
  renderExpirationTime$1 = 0,
  workInProgressRootExitStatus = 0,
  workInProgressRootFatalError = null,
  workInProgressRootLatestProcessedExpirationTime = 1073741823,
  workInProgressRootLatestSuspenseTimeout = 1073741823,
  workInProgressRootCanSuspendUsingConfig = null,
  workInProgressRootNextUnprocessedUpdateTime = 0,
  workInProgressRootHasPendingPing = !1,
  globalMostRecentFallbackTime = 0,
  nextEffect = null,
  hasUncaughtError = !1,
  firstUncaughtError = null,
  legacyErrorBoundariesThatAlreadyFailed = null,
  rootDoesHavePassiveEffects = !1,
  rootWithPendingPassiveEffects = null,
  pendingPassiveEffectsRenderPriority = 90,
  pendingPassiveHookEffectsMount = [],
  pendingPassiveHookEffectsUnmount = [],
  rootsWithPendingDiscreteUpdates = null,
  nestedUpdateCount = 0,
  rootWithNestedUpdates = null,
  currentEventTime = 0;
function requestCurrentTimeForUpdate() {
  return 0 !== (executionContext & 48)
    ? 1073741821 - ((now() / 10) | 0)
    : 0 !== currentEventTime
    ? currentEventTime
    : (currentEventTime = 1073741821 - ((now() / 10) | 0));
}
function computeExpirationForFiber(currentTime, fiber, suspenseConfig) {
  fiber = fiber.mode;
  if (0 === (fiber & 2)) return 1073741823;
  var priorityLevel = getCurrentPriorityLevel();
  if (0 === (fiber & 4)) return 99 === priorityLevel ? 1073741823 : 1073741822;
  if (0 !== (executionContext & 16)) return renderExpirationTime$1;
  if (null !== suspenseConfig)
    currentTime = computeExpirationBucket(
      currentTime,
      suspenseConfig.timeoutMs | 0 || 5e3,
      250
    );
  else
    switch (priorityLevel) {
      case 99:
        currentTime = 1073741823;
        break;
      case 98:
        currentTime = computeExpirationBucket(currentTime, 150, 100);
        break;
      case 97:
      case 96:
        currentTime = computeExpirationBucket(currentTime, 5e3, 250);
        break;
      case 95:
        currentTime = 2;
        break;
      default:
        throw Error(formatProdErrorMessage(326));
    }
  null !== workInProgressRoot &&
    currentTime === renderExpirationTime$1 &&
    --currentTime;
  return currentTime;
}
function scheduleUpdateOnFiber(fiber, expirationTime) {
  if (50 < nestedUpdateCount)
    throw ((nestedUpdateCount = 0),
    (rootWithNestedUpdates = null),
    Error(formatProdErrorMessage(185)));
  fiber = markUpdateTimeFromFiberToRoot(fiber, expirationTime);
  if (null !== fiber) {
    var priorityLevel = getCurrentPriorityLevel();
    1073741823 === expirationTime
      ? 0 !== (executionContext & 8) && 0 === (executionContext & 48)
        ? performSyncWorkOnRoot(fiber)
        : (ensureRootIsScheduled(fiber),
          0 === executionContext && flushSyncCallbackQueue())
      : ensureRootIsScheduled(fiber);
    0 === (executionContext & 4) ||
      (98 !== priorityLevel && 99 !== priorityLevel) ||
      (null === rootsWithPendingDiscreteUpdates
        ? (rootsWithPendingDiscreteUpdates = new Map([[fiber, expirationTime]]))
        : ((priorityLevel = rootsWithPendingDiscreteUpdates.get(fiber)),
          (void 0 === priorityLevel || priorityLevel > expirationTime) &&
            rootsWithPendingDiscreteUpdates.set(fiber, expirationTime)));
  }
}
function markUpdateTimeFromFiberToRoot(fiber, expirationTime) {
  fiber.expirationTime < expirationTime &&
    (fiber.expirationTime = expirationTime);
  var alternate = fiber.alternate;
  null !== alternate &&
    alternate.expirationTime < expirationTime &&
    (alternate.expirationTime = expirationTime);
  var node = fiber.return,
    root = null;
  if (null === node && 3 === fiber.tag) root = fiber.stateNode;
  else
    for (; null !== node; ) {
      alternate = node.alternate;
      node.childExpirationTime < expirationTime &&
        (node.childExpirationTime = expirationTime);
      null !== alternate &&
        alternate.childExpirationTime < expirationTime &&
        (alternate.childExpirationTime = expirationTime);
      if (null === node.return && 3 === node.tag) {
        root = node.stateNode;
        break;
      }
      node = node.return;
    }
  null !== root &&
    (workInProgressRoot === root &&
      (markUnprocessedUpdateTime(expirationTime),
      4 === workInProgressRootExitStatus &&
        markRootSuspendedAtTime(root, renderExpirationTime$1)),
    markRootUpdatedAtTime(root, expirationTime));
  return root;
}
function getNextRootExpirationTimeToWorkOn(root) {
  var lastExpiredTime = root.lastExpiredTime;
  if (0 !== lastExpiredTime) return lastExpiredTime;
  lastExpiredTime = root.firstPendingTime;
  if (!isRootSuspendedAtTime(root, lastExpiredTime)) return lastExpiredTime;
  var lastPingedTime = root.lastPingedTime;
  root = root.nextKnownPendingLevel;
  root = lastPingedTime > root ? lastPingedTime : root;
  return 2 >= root && lastExpiredTime !== root ? 0 : root;
}
function ensureRootIsScheduled(root) {
  if (0 !== root.lastExpiredTime)
    (root.callbackExpirationTime = 1073741823),
      (root.callbackPriority = 99),
      (root.callbackNode = scheduleSyncCallback(
        performSyncWorkOnRoot.bind(null, root)
      ));
  else {
    var expirationTime = getNextRootExpirationTimeToWorkOn(root),
      existingCallbackNode = root.callbackNode;
    if (0 === expirationTime)
      null !== existingCallbackNode &&
        ((root.callbackNode = null),
        (root.callbackExpirationTime = 0),
        (root.callbackPriority = 90));
    else {
      var currentTime = requestCurrentTimeForUpdate();
      1073741823 === expirationTime
        ? (currentTime = 99)
        : 1 === expirationTime || 2 === expirationTime
        ? (currentTime = 95)
        : ((currentTime =
            10 * (1073741821 - expirationTime) -
            10 * (1073741821 - currentTime)),
          (currentTime =
            0 >= currentTime
              ? 99
              : 250 >= currentTime
              ? 98
              : 5250 >= currentTime
              ? 97
              : 95));
      if (null !== existingCallbackNode) {
        var existingCallbackPriority = root.callbackPriority;
        if (
          root.callbackExpirationTime === expirationTime &&
          existingCallbackPriority >= currentTime
        )
          return;
        existingCallbackNode !== fakeCallbackNode &&
          Scheduler_cancelCallback(existingCallbackNode);
      }
      root.callbackExpirationTime = expirationTime;
      root.callbackPriority = currentTime;
      expirationTime =
        1073741823 === expirationTime
          ? scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root))
          : scheduleCallback(
              currentTime,
              performConcurrentWorkOnRoot.bind(null, root),
              { timeout: 10 * (1073741821 - expirationTime) - now() }
            );
      root.callbackNode = expirationTime;
    }
  }
}
function performConcurrentWorkOnRoot(root, didTimeout) {
  currentEventTime = 0;
  if (didTimeout)
    return (
      (didTimeout = requestCurrentTimeForUpdate()),
      markRootExpiredAtTime(root, didTimeout),
      ensureRootIsScheduled(root),
      null
    );
  var expirationTime = getNextRootExpirationTimeToWorkOn(root);
  if (0 === expirationTime) return null;
  didTimeout = root.callbackNode;
  if (0 !== (executionContext & 48)) throw Error(formatProdErrorMessage(327));
  flushPassiveEffects();
  var expirationTime$jscomp$0 = expirationTime;
  var exitStatus = executionContext;
  executionContext |= 16;
  var prevDispatcher = pushDispatcher();
  (root === workInProgressRoot &&
    expirationTime$jscomp$0 === renderExpirationTime$1) ||
    prepareFreshStack(root, expirationTime$jscomp$0);
  do
    try {
      workLoopConcurrent();
      break;
    } catch (thrownValue) {
      handleError(root, thrownValue);
    }
  while (1);
  resetContextDependencies();
  ReactCurrentDispatcher$1.current = prevDispatcher;
  executionContext = exitStatus;
  null !== workInProgress
    ? (exitStatus = 0)
    : ((workInProgressRoot = null),
      (exitStatus = workInProgressRootExitStatus));
  if (0 !== exitStatus) {
    2 === exitStatus &&
      ((expirationTime = 2 < expirationTime ? 2 : expirationTime),
      (exitStatus = renderRootSync(root, expirationTime)));
    if (1 === exitStatus)
      throw ((didTimeout = workInProgressRootFatalError),
      prepareFreshStack(root, expirationTime),
      markRootSuspendedAtTime(root, expirationTime),
      ensureRootIsScheduled(root),
      didTimeout);
    expirationTime$jscomp$0 = root.finishedWork = root.current.alternate;
    root.finishedExpirationTime = expirationTime;
    switch (exitStatus) {
      case 0:
      case 1:
        throw Error(formatProdErrorMessage(345));
      case 2:
        commitRoot(root);
        break;
      case 3:
        markRootSuspendedAtTime(root, expirationTime);
        exitStatus = root.lastSuspendedTime;
        expirationTime === exitStatus &&
          (root.nextKnownPendingLevel = getRemainingExpirationTime(
            expirationTime$jscomp$0
          ));
        if (
          1073741823 === workInProgressRootLatestProcessedExpirationTime &&
          ((expirationTime$jscomp$0 =
            globalMostRecentFallbackTime + 500 - now()),
          10 < expirationTime$jscomp$0)
        ) {
          if (
            workInProgressRootHasPendingPing &&
            ((prevDispatcher = root.lastPingedTime),
            0 === prevDispatcher || prevDispatcher >= expirationTime)
          ) {
            root.lastPingedTime = expirationTime;
            prepareFreshStack(root, expirationTime);
            break;
          }
          prevDispatcher = getNextRootExpirationTimeToWorkOn(root);
          if (0 !== prevDispatcher && prevDispatcher !== expirationTime) break;
          if (0 !== exitStatus && exitStatus !== expirationTime) {
            root.lastPingedTime = exitStatus;
            break;
          }
          root.timeoutHandle = scheduleTimeout(
            commitRoot.bind(null, root),
            expirationTime$jscomp$0
          );
          break;
        }
        commitRoot(root);
        break;
      case 4:
        markRootSuspendedAtTime(root, expirationTime);
        exitStatus = root.lastSuspendedTime;
        expirationTime === exitStatus &&
          (root.nextKnownPendingLevel = getRemainingExpirationTime(
            expirationTime$jscomp$0
          ));
        if (
          workInProgressRootHasPendingPing &&
          ((expirationTime$jscomp$0 = root.lastPingedTime),
          0 === expirationTime$jscomp$0 ||
            expirationTime$jscomp$0 >= expirationTime)
        ) {
          root.lastPingedTime = expirationTime;
          prepareFreshStack(root, expirationTime);
          break;
        }
        expirationTime$jscomp$0 = getNextRootExpirationTimeToWorkOn(root);
        if (
          0 !== expirationTime$jscomp$0 &&
          expirationTime$jscomp$0 !== expirationTime
        )
          break;
        if (0 !== exitStatus && exitStatus !== expirationTime) {
          root.lastPingedTime = exitStatus;
          break;
        }
        1073741823 !== workInProgressRootLatestSuspenseTimeout
          ? (expirationTime$jscomp$0 =
              10 * (1073741821 - workInProgressRootLatestSuspenseTimeout) -
              now())
          : 1073741823 === workInProgressRootLatestProcessedExpirationTime
          ? (expirationTime$jscomp$0 = 0)
          : ((expirationTime$jscomp$0 =
              10 *
                (1073741821 - workInProgressRootLatestProcessedExpirationTime) -
              5e3),
            (exitStatus = now()),
            (expirationTime = 10 * (1073741821 - expirationTime) - exitStatus),
            (expirationTime$jscomp$0 = exitStatus - expirationTime$jscomp$0),
            0 > expirationTime$jscomp$0 && (expirationTime$jscomp$0 = 0),
            (expirationTime$jscomp$0 =
              (120 > expirationTime$jscomp$0
                ? 120
                : 480 > expirationTime$jscomp$0
                ? 480
                : 1080 > expirationTime$jscomp$0
                ? 1080
                : 1920 > expirationTime$jscomp$0
                ? 1920
                : 3e3 > expirationTime$jscomp$0
                ? 3e3
                : 4320 > expirationTime$jscomp$0
                ? 4320
                : 1960 * ceil(expirationTime$jscomp$0 / 1960)) -
              expirationTime$jscomp$0),
            expirationTime < expirationTime$jscomp$0 &&
              (expirationTime$jscomp$0 = expirationTime));
        if (10 < expirationTime$jscomp$0) {
          root.timeoutHandle = scheduleTimeout(
            commitRoot.bind(null, root),
            expirationTime$jscomp$0
          );
          break;
        }
        commitRoot(root);
        break;
      case 5:
        if (
          1073741823 !== workInProgressRootLatestProcessedExpirationTime &&
          null !== workInProgressRootCanSuspendUsingConfig
        ) {
          prevDispatcher = workInProgressRootLatestProcessedExpirationTime;
          var suspenseConfig = workInProgressRootCanSuspendUsingConfig;
          expirationTime$jscomp$0 = suspenseConfig.busyMinDurationMs | 0;
          0 >= expirationTime$jscomp$0
            ? (expirationTime$jscomp$0 = 0)
            : ((exitStatus = suspenseConfig.busyDelayMs | 0),
              (prevDispatcher =
                now() -
                (10 * (1073741821 - prevDispatcher) -
                  (suspenseConfig.timeoutMs | 0 || 5e3))),
              (expirationTime$jscomp$0 =
                prevDispatcher <= exitStatus
                  ? 0
                  : exitStatus + expirationTime$jscomp$0 - prevDispatcher));
          if (10 < expirationTime$jscomp$0) {
            markRootSuspendedAtTime(root, expirationTime);
            root.timeoutHandle = scheduleTimeout(
              commitRoot.bind(null, root),
              expirationTime$jscomp$0
            );
            break;
          }
        }
        commitRoot(root);
        break;
      default:
        throw Error(formatProdErrorMessage(329));
    }
  }
  ensureRootIsScheduled(root);
  return root.callbackNode === didTimeout
    ? performConcurrentWorkOnRoot.bind(null, root)
    : null;
}
function performSyncWorkOnRoot(root) {
  if (0 !== (executionContext & 48)) throw Error(formatProdErrorMessage(327));
  flushPassiveEffects();
  var lastExpiredTime = root.lastExpiredTime;
  lastExpiredTime =
    0 !== lastExpiredTime
      ? root === workInProgressRoot && renderExpirationTime$1 >= lastExpiredTime
        ? renderExpirationTime$1
        : lastExpiredTime
      : 1073741823;
  var exitStatus = renderRootSync(root, lastExpiredTime);
  0 !== root.tag &&
    2 === exitStatus &&
    ((lastExpiredTime = 2 < lastExpiredTime ? 2 : lastExpiredTime),
    (exitStatus = renderRootSync(root, lastExpiredTime)));
  if (1 === exitStatus)
    throw ((exitStatus = workInProgressRootFatalError),
    prepareFreshStack(root, lastExpiredTime),
    markRootSuspendedAtTime(root, lastExpiredTime),
    ensureRootIsScheduled(root),
    exitStatus);
  root.finishedWork = root.current.alternate;
  root.finishedExpirationTime = lastExpiredTime;
  commitRoot(root);
  ensureRootIsScheduled(root);
  return null;
}
function flushRoot(root, expirationTime) {
  markRootExpiredAtTime(root, expirationTime);
  ensureRootIsScheduled(root);
  0 === (executionContext & 48) && flushSyncCallbackQueue();
}
function flushDiscreteUpdates() {
  0 === (executionContext & 49) &&
    (flushPendingDiscreteUpdates(), flushPassiveEffects());
}
function flushPendingDiscreteUpdates() {
  if (null !== rootsWithPendingDiscreteUpdates) {
    var roots = rootsWithPendingDiscreteUpdates;
    rootsWithPendingDiscreteUpdates = null;
    roots.forEach(function(expirationTime, root) {
      markRootExpiredAtTime(root, expirationTime);
      ensureRootIsScheduled(root);
    });
    flushSyncCallbackQueue();
  }
}
function batchedUpdates$1(fn, a) {
  var prevExecutionContext = executionContext;
  executionContext |= 1;
  try {
    return fn(a);
  } finally {
    (executionContext = prevExecutionContext),
      0 === executionContext && flushSyncCallbackQueue();
  }
}
function discreteUpdates$1(fn, a, b, c, d) {
  var prevExecutionContext = executionContext;
  executionContext |= 4;
  try {
    return runWithPriority$2(98, fn.bind(null, a, b, c, d));
  } finally {
    (executionContext = prevExecutionContext),
      0 === executionContext && flushSyncCallbackQueue();
  }
}
function flushSync(fn, a) {
  if (0 !== (executionContext & 48)) throw Error(formatProdErrorMessage(187));
  var prevExecutionContext = executionContext;
  executionContext |= 1;
  try {
    return runWithPriority$2(99, fn.bind(null, a));
  } finally {
    (executionContext = prevExecutionContext), flushSyncCallbackQueue();
  }
}
function prepareFreshStack(root, expirationTime) {
  root.finishedWork = null;
  root.finishedExpirationTime = 0;
  var timeoutHandle = root.timeoutHandle;
  -1 !== timeoutHandle &&
    ((root.timeoutHandle = -1), cancelTimeout(timeoutHandle));
  if (null !== workInProgress)
    for (timeoutHandle = workInProgress.return; null !== timeoutHandle; ) {
      var interruptedWork = timeoutHandle;
      switch (interruptedWork.tag) {
        case 3:
          popHostContainer();
          resetWorkInProgressVersions();
          break;
        case 5:
          popHostContext(interruptedWork);
          break;
        case 4:
          popHostContainer();
          break;
        case 13:
          pop(suspenseStackCursor);
          break;
        case 19:
          pop(suspenseStackCursor);
          break;
        case 10:
          popProvider(interruptedWork);
      }
      timeoutHandle = timeoutHandle.return;
    }
  workInProgressRoot = root;
  workInProgress = createWorkInProgress(root.current, null);
  renderExpirationTime$1 = expirationTime;
  workInProgressRootExitStatus = 0;
  workInProgressRootFatalError = null;
  workInProgressRootLatestSuspenseTimeout = workInProgressRootLatestProcessedExpirationTime = 1073741823;
  workInProgressRootCanSuspendUsingConfig = null;
  workInProgressRootNextUnprocessedUpdateTime = 0;
  workInProgressRootHasPendingPing = !1;
}
function handleError(root$jscomp$0, thrownValue) {
  do {
    try {
      resetContextDependencies();
      ReactCurrentDispatcher.current = ContextOnlyDispatcher;
      if (didScheduleRenderPhaseUpdate)
        for (
          var hook = currentlyRenderingFiber$1.memoizedState;
          null !== hook;

        ) {
          var queue = hook.queue;
          null !== queue && (queue.pending = null);
          hook = hook.next;
        }
      renderExpirationTime = 0;
      workInProgressHook = currentHook = currentlyRenderingFiber$1 = null;
      didScheduleRenderPhaseUpdate = !1;
      if (null === workInProgress || null === workInProgress.return)
        return (
          (workInProgressRootExitStatus = 1),
          (workInProgressRootFatalError = thrownValue),
          (workInProgress = null)
        );
      a: {
        var root = root$jscomp$0,
          returnFiber = workInProgress.return,
          sourceFiber = workInProgress,
          value = thrownValue;
        thrownValue = renderExpirationTime$1;
        sourceFiber.effectTag |= 2048;
        sourceFiber.firstEffect = sourceFiber.lastEffect = null;
        if (
          null !== value &&
          "object" === typeof value &&
          "function" === typeof value.then
        ) {
          var wakeable = value;
          if (0 === (sourceFiber.mode & 2)) {
            var currentSource = sourceFiber.alternate;
            currentSource
              ? ((sourceFiber.updateQueue = currentSource.updateQueue),
                (sourceFiber.memoizedState = currentSource.memoizedState),
                (sourceFiber.expirationTime = currentSource.expirationTime))
              : ((sourceFiber.updateQueue = null),
                (sourceFiber.memoizedState = null));
          }
          var hasInvisibleParentBoundary =
              0 !== (suspenseStackCursor.current & 1),
            workInProgress$111 = returnFiber;
          do {
            var JSCompiler_temp;
            if ((JSCompiler_temp = 13 === workInProgress$111.tag)) {
              var nextState = workInProgress$111.memoizedState;
              if (null !== nextState)
                JSCompiler_temp = null !== nextState.dehydrated ? !0 : !1;
              else {
                var props = workInProgress$111.memoizedProps;
                JSCompiler_temp =
                  void 0 === props.fallback
                    ? !1
                    : !0 !== props.unstable_avoidThisFallback
                    ? !0
                    : hasInvisibleParentBoundary
                    ? !1
                    : !0;
              }
            }
            if (JSCompiler_temp) {
              var wakeables = workInProgress$111.updateQueue;
              if (null === wakeables) {
                var updateQueue = new Set();
                updateQueue.add(wakeable);
                workInProgress$111.updateQueue = updateQueue;
              } else wakeables.add(wakeable);
              if (0 === (workInProgress$111.mode & 2)) {
                workInProgress$111.effectTag |= 64;
                sourceFiber.effectTag &= -2981;
                if (1 === sourceFiber.tag)
                  if (null === sourceFiber.alternate) sourceFiber.tag = 17;
                  else {
                    var update = createUpdate(1073741823, null);
                    update.tag = 2;
                    enqueueUpdate(sourceFiber, update);
                  }
                sourceFiber.expirationTime = 1073741823;
                break a;
              }
              value = void 0;
              sourceFiber = thrownValue;
              var pingCache = root.pingCache;
              null === pingCache
                ? ((pingCache = root.pingCache = new PossiblyWeakMap$1()),
                  (value = new Set()),
                  pingCache.set(wakeable, value))
                : ((value = pingCache.get(wakeable)),
                  void 0 === value &&
                    ((value = new Set()), pingCache.set(wakeable, value)));
              if (!value.has(sourceFiber)) {
                value.add(sourceFiber);
                var ping = pingSuspendedRoot.bind(
                  null,
                  root,
                  wakeable,
                  sourceFiber
                );
                wakeable.then(ping, ping);
              }
              workInProgress$111.effectTag |= 4096;
              workInProgress$111.expirationTime = thrownValue;
              break a;
            }
            workInProgress$111 = workInProgress$111.return;
          } while (null !== workInProgress$111);
          value = Error(
            (getComponentName(sourceFiber.type) || "A React component") +
              " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display." +
              getStackByFiberInDevAndProd(sourceFiber)
          );
        }
        5 !== workInProgressRootExitStatus &&
          (workInProgressRootExitStatus = 2);
        value = createCapturedValue(value, sourceFiber);
        workInProgress$111 = returnFiber;
        do {
          switch (workInProgress$111.tag) {
            case 3:
              wakeable = value;
              workInProgress$111.effectTag |= 4096;
              workInProgress$111.expirationTime = thrownValue;
              var update$112 = createRootErrorUpdate(
                workInProgress$111,
                wakeable,
                thrownValue
              );
              enqueueCapturedUpdate(workInProgress$111, update$112);
              break a;
            case 1:
              wakeable = value;
              var ctor = workInProgress$111.type,
                instance = workInProgress$111.stateNode;
              if (
                0 === (workInProgress$111.effectTag & 64) &&
                ("function" === typeof ctor.getDerivedStateFromError ||
                  (null !== instance &&
                    "function" === typeof instance.componentDidCatch &&
                    (null === legacyErrorBoundariesThatAlreadyFailed ||
                      !legacyErrorBoundariesThatAlreadyFailed.has(instance))))
              ) {
                workInProgress$111.effectTag |= 4096;
                workInProgress$111.expirationTime = thrownValue;
                var update$114 = createClassErrorUpdate(
                  workInProgress$111,
                  wakeable,
                  thrownValue
                );
                enqueueCapturedUpdate(workInProgress$111, update$114);
                break a;
              }
          }
          workInProgress$111 = workInProgress$111.return;
        } while (null !== workInProgress$111);
      }
      workInProgress = completeUnitOfWork(workInProgress);
    } catch (yetAnotherThrownValue) {
      thrownValue = yetAnotherThrownValue;
      continue;
    }
    break;
  } while (1);
}
function pushDispatcher() {
  var prevDispatcher = ReactCurrentDispatcher$1.current;
  ReactCurrentDispatcher$1.current = ContextOnlyDispatcher;
  return null === prevDispatcher ? ContextOnlyDispatcher : prevDispatcher;
}
function markRenderEventTimeAndConfig(expirationTime, suspenseConfig) {
  expirationTime < workInProgressRootLatestProcessedExpirationTime &&
    2 < expirationTime &&
    (workInProgressRootLatestProcessedExpirationTime = expirationTime);
  null !== suspenseConfig &&
    expirationTime < workInProgressRootLatestSuspenseTimeout &&
    2 < expirationTime &&
    ((workInProgressRootLatestSuspenseTimeout = expirationTime),
    (workInProgressRootCanSuspendUsingConfig = suspenseConfig));
}
function markUnprocessedUpdateTime(expirationTime) {
  expirationTime > workInProgressRootNextUnprocessedUpdateTime &&
    (workInProgressRootNextUnprocessedUpdateTime = expirationTime);
}
function renderDidSuspendDelayIfPossible() {
  if (0 === workInProgressRootExitStatus || 3 === workInProgressRootExitStatus)
    workInProgressRootExitStatus = 4;
  0 !== workInProgressRootNextUnprocessedUpdateTime &&
    null !== workInProgressRoot &&
    (markRootSuspendedAtTime(workInProgressRoot, renderExpirationTime$1),
    markRootUpdatedAtTime(
      workInProgressRoot,
      workInProgressRootNextUnprocessedUpdateTime
    ));
}
function renderRootSync(root, expirationTime) {
  var prevExecutionContext = executionContext;
  executionContext |= 16;
  var prevDispatcher = pushDispatcher();
  (root === workInProgressRoot && expirationTime === renderExpirationTime$1) ||
    prepareFreshStack(root, expirationTime);
  do
    try {
      workLoopSync();
      break;
    } catch (thrownValue) {
      handleError(root, thrownValue);
    }
  while (1);
  resetContextDependencies();
  executionContext = prevExecutionContext;
  ReactCurrentDispatcher$1.current = prevDispatcher;
  if (null !== workInProgress) throw Error(formatProdErrorMessage(261));
  workInProgressRoot = null;
  return workInProgressRootExitStatus;
}
function workLoopSync() {
  for (; null !== workInProgress; )
    workInProgress = performUnitOfWork(workInProgress);
}
function workLoopConcurrent() {
  for (; null !== workInProgress && !Scheduler_shouldYield(); )
    workInProgress = performUnitOfWork(workInProgress);
}
function performUnitOfWork(unitOfWork) {
  var next = beginWork$1(
    unitOfWork.alternate,
    unitOfWork,
    renderExpirationTime$1
  );
  unitOfWork.memoizedProps = unitOfWork.pendingProps;
  null === next && (next = completeUnitOfWork(unitOfWork));
  ReactCurrentOwner$2.current = null;
  return next;
}
function completeUnitOfWork(unitOfWork) {
  workInProgress = unitOfWork;
  do {
    var current = workInProgress.alternate;
    unitOfWork = workInProgress.return;
    if (0 === (workInProgress.effectTag & 2048)) {
      current = completeWork(current, workInProgress, renderExpirationTime$1);
      if (
        1 === renderExpirationTime$1 ||
        1 !== workInProgress.childExpirationTime
      ) {
        for (
          var newChildExpirationTime = 0, child = workInProgress.child;
          null !== child;

        ) {
          var childUpdateExpirationTime = child.expirationTime,
            childChildExpirationTime = child.childExpirationTime;
          childUpdateExpirationTime > newChildExpirationTime &&
            (newChildExpirationTime = childUpdateExpirationTime);
          childChildExpirationTime > newChildExpirationTime &&
            (newChildExpirationTime = childChildExpirationTime);
          child = child.sibling;
        }
        workInProgress.childExpirationTime = newChildExpirationTime;
      }
      if (null !== current) return current;
      null !== unitOfWork &&
        0 === (unitOfWork.effectTag & 2048) &&
        (null === unitOfWork.firstEffect &&
          (unitOfWork.firstEffect = workInProgress.firstEffect),
        null !== workInProgress.lastEffect &&
          (null !== unitOfWork.lastEffect &&
            (unitOfWork.lastEffect.nextEffect = workInProgress.firstEffect),
          (unitOfWork.lastEffect = workInProgress.lastEffect)),
        1 < workInProgress.effectTag &&
          (null !== unitOfWork.lastEffect
            ? (unitOfWork.lastEffect.nextEffect = workInProgress)
            : (unitOfWork.firstEffect = workInProgress),
          (unitOfWork.lastEffect = workInProgress)));
    } else {
      current = unwindWork(workInProgress);
      if (null !== current) return (current.effectTag &= 2047), current;
      null !== unitOfWork &&
        ((unitOfWork.firstEffect = unitOfWork.lastEffect = null),
        (unitOfWork.effectTag |= 2048));
    }
    current = workInProgress.sibling;
    if (null !== current) return current;
    workInProgress = unitOfWork;
  } while (null !== workInProgress);
  0 === workInProgressRootExitStatus && (workInProgressRootExitStatus = 5);
  return null;
}
function getRemainingExpirationTime(fiber) {
  var updateExpirationTime = fiber.expirationTime;
  fiber = fiber.childExpirationTime;
  return updateExpirationTime > fiber ? updateExpirationTime : fiber;
}
function commitRoot(root) {
  var renderPriorityLevel = getCurrentPriorityLevel();
  runWithPriority$2(99, commitRootImpl.bind(null, root, renderPriorityLevel));
  return null;
}
function commitRootImpl(root, renderPriorityLevel) {
  do flushPassiveEffects();
  while (null !== rootWithPendingPassiveEffects);
  if (0 !== (executionContext & 48)) throw Error(formatProdErrorMessage(327));
  var finishedWork = root.finishedWork,
    expirationTime = root.finishedExpirationTime;
  if (null === finishedWork) return null;
  root.finishedWork = null;
  root.finishedExpirationTime = 0;
  if (finishedWork === root.current) throw Error(formatProdErrorMessage(177));
  root.callbackNode = null;
  root.callbackExpirationTime = 0;
  root.callbackPriority = 90;
  root.nextKnownPendingLevel = 0;
  var remainingExpirationTimeBeforeCommit = getRemainingExpirationTime(
    finishedWork
  );
  root.firstPendingTime = remainingExpirationTimeBeforeCommit;
  remainingExpirationTimeBeforeCommit < root.lastPendingTime &&
    (root.lastPendingTime = remainingExpirationTimeBeforeCommit);
  expirationTime <= root.lastSuspendedTime
    ? (root.firstSuspendedTime = root.lastSuspendedTime = root.nextKnownPendingLevel = 0)
    : expirationTime <= root.firstSuspendedTime &&
      (root.firstSuspendedTime = expirationTime - 1);
  expirationTime <= root.lastPingedTime && (root.lastPingedTime = 0);
  expirationTime <= root.lastExpiredTime && (root.lastExpiredTime = 0);
  root.mutableSourcePendingUpdateTime <= expirationTime &&
    (root.mutableSourcePendingUpdateTime = 0);
  root === workInProgressRoot &&
    ((workInProgress = workInProgressRoot = null),
    (renderExpirationTime$1 = 0));
  1 < finishedWork.effectTag
    ? null !== finishedWork.lastEffect
      ? ((finishedWork.lastEffect.nextEffect = finishedWork),
        (remainingExpirationTimeBeforeCommit = finishedWork.firstEffect))
      : (remainingExpirationTimeBeforeCommit = finishedWork)
    : (remainingExpirationTimeBeforeCommit = finishedWork.firstEffect);
  if (null !== remainingExpirationTimeBeforeCommit) {
    var prevExecutionContext = executionContext;
    executionContext |= 32;
    ReactCurrentOwner$2.current = null;
    eventsEnabled = _enabled;
    var focusedElem = getActiveElementDeep();
    if (hasSelectionCapabilities(focusedElem)) {
      if ("selectionStart" in focusedElem)
        var JSCompiler_temp = {
          start: focusedElem.selectionStart,
          end: focusedElem.selectionEnd
        };
      else
        a: {
          JSCompiler_temp =
            ((JSCompiler_temp = focusedElem.ownerDocument) &&
              JSCompiler_temp.defaultView) ||
            window;
          var selection =
            JSCompiler_temp.getSelection && JSCompiler_temp.getSelection();
          if (selection && 0 !== selection.rangeCount) {
            JSCompiler_temp = selection.anchorNode;
            var anchorOffset = selection.anchorOffset,
              focusNode = selection.focusNode;
            selection = selection.focusOffset;
            try {
              JSCompiler_temp.nodeType, focusNode.nodeType;
            } catch (e$20) {
              JSCompiler_temp = null;
              break a;
            }
            var length = 0,
              start = -1,
              end = -1,
              indexWithinAnchor = 0,
              indexWithinFocus = 0,
              node = focusedElem,
              parentNode = null;
            b: for (;;) {
              for (var next; ; ) {
                node !== JSCompiler_temp ||
                  (0 !== anchorOffset && 3 !== node.nodeType) ||
                  (start = length + anchorOffset);
                node !== focusNode ||
                  (0 !== selection && 3 !== node.nodeType) ||
                  (end = length + selection);
                3 === node.nodeType && (length += node.nodeValue.length);
                if (null === (next = node.firstChild)) break;
                parentNode = node;
                node = next;
              }
              for (;;) {
                if (node === focusedElem) break b;
                parentNode === JSCompiler_temp &&
                  ++indexWithinAnchor === anchorOffset &&
                  (start = length);
                parentNode === focusNode &&
                  ++indexWithinFocus === selection &&
                  (end = length);
                if (null !== (next = node.nextSibling)) break;
                node = parentNode;
                parentNode = node.parentNode;
              }
              node = next;
            }
            JSCompiler_temp =
              -1 === start || -1 === end ? null : { start: start, end: end };
          } else JSCompiler_temp = null;
        }
      JSCompiler_temp = JSCompiler_temp || { start: 0, end: 0 };
    } else JSCompiler_temp = null;
    selectionInformation = {
      activeElementDetached: null,
      focusedElem: focusedElem,
      selectionRange: JSCompiler_temp
    };
    _enabled = !1;
    nextEffect = remainingExpirationTimeBeforeCommit;
    do
      try {
        commitBeforeMutationEffects();
      } catch (error) {
        if (null === nextEffect) throw Error(formatProdErrorMessage(330));
        captureCommitPhaseError(nextEffect, error);
        nextEffect = nextEffect.nextEffect;
      }
    while (null !== nextEffect);
    nextEffect = remainingExpirationTimeBeforeCommit;
    do
      try {
        for (focusedElem = root; null !== nextEffect; ) {
          var effectTag = nextEffect.effectTag;
          effectTag & 16 && setTextContent(nextEffect.stateNode, "");
          if (effectTag & 128) {
            var current = nextEffect.alternate;
            if (null !== current) {
              var currentRef = current.ref;
              null !== currentRef &&
                ("function" === typeof currentRef
                  ? currentRef(null)
                  : (currentRef.current = null));
            }
          }
          switch (effectTag & 1038) {
            case 2:
              commitPlacement(nextEffect);
              nextEffect.effectTag &= -3;
              break;
            case 6:
              commitPlacement(nextEffect);
              nextEffect.effectTag &= -3;
              commitWork(nextEffect.alternate, nextEffect);
              break;
            case 1024:
              nextEffect.effectTag &= -1025;
              break;
            case 1028:
              nextEffect.effectTag &= -1025;
              commitWork(nextEffect.alternate, nextEffect);
              break;
            case 4:
              commitWork(nextEffect.alternate, nextEffect);
              break;
            case 8:
              (JSCompiler_temp = nextEffect),
                unmountHostComponents(focusedElem, JSCompiler_temp),
                detachFiber(JSCompiler_temp);
          }
          nextEffect = nextEffect.nextEffect;
        }
      } catch (error$121) {
        if (null === nextEffect) throw Error(formatProdErrorMessage(330));
        captureCommitPhaseError(nextEffect, error$121);
        nextEffect = nextEffect.nextEffect;
      }
    while (null !== nextEffect);
    currentRef = selectionInformation;
    current = getActiveElementDeep();
    effectTag = currentRef.focusedElem;
    JSCompiler_temp = currentRef.selectionRange;
    if (
      current !== effectTag &&
      effectTag &&
      effectTag.ownerDocument &&
      containsNode(effectTag.ownerDocument.documentElement, effectTag)
    ) {
      null !== JSCompiler_temp &&
        hasSelectionCapabilities(effectTag) &&
        ((current = JSCompiler_temp.start),
        (currentRef = JSCompiler_temp.end),
        void 0 === currentRef && (currentRef = current),
        "selectionStart" in effectTag
          ? ((effectTag.selectionStart = current),
            (effectTag.selectionEnd = Math.min(
              currentRef,
              effectTag.value.length
            )))
          : ((currentRef =
              ((current = effectTag.ownerDocument || document) &&
                current.defaultView) ||
              window),
            currentRef.getSelection &&
              ((currentRef = currentRef.getSelection()),
              (anchorOffset = effectTag.textContent.length),
              (focusedElem = Math.min(JSCompiler_temp.start, anchorOffset)),
              (JSCompiler_temp =
                void 0 === JSCompiler_temp.end
                  ? focusedElem
                  : Math.min(JSCompiler_temp.end, anchorOffset)),
              !currentRef.extend &&
                focusedElem > JSCompiler_temp &&
                ((anchorOffset = JSCompiler_temp),
                (JSCompiler_temp = focusedElem),
                (focusedElem = anchorOffset)),
              (anchorOffset = getNodeForCharacterOffset(
                effectTag,
                focusedElem
              )),
              (focusNode = getNodeForCharacterOffset(
                effectTag,
                JSCompiler_temp
              )),
              anchorOffset &&
                focusNode &&
                (1 !== currentRef.rangeCount ||
                  currentRef.anchorNode !== anchorOffset.node ||
                  currentRef.anchorOffset !== anchorOffset.offset ||
                  currentRef.focusNode !== focusNode.node ||
                  currentRef.focusOffset !== focusNode.offset) &&
                ((current = current.createRange()),
                current.setStart(anchorOffset.node, anchorOffset.offset),
                currentRef.removeAllRanges(),
                focusedElem > JSCompiler_temp
                  ? (currentRef.addRange(current),
                    currentRef.extend(focusNode.node, focusNode.offset))
                  : (current.setEnd(focusNode.node, focusNode.offset),
                    currentRef.addRange(current))))));
      current = [];
      for (currentRef = effectTag; (currentRef = currentRef.parentNode); )
        1 === currentRef.nodeType &&
          current.push({
            element: currentRef,
            left: currentRef.scrollLeft,
            top: currentRef.scrollTop
          });
      "function" === typeof effectTag.focus && effectTag.focus();
      for (effectTag = 0; effectTag < current.length; effectTag++)
        (currentRef = current[effectTag]),
          (currentRef.element.scrollLeft = currentRef.left),
          (currentRef.element.scrollTop = currentRef.top);
    }
    _enabled = !!eventsEnabled;
    eventsEnabled = null;
    effectTag = selectionInformation.activeElementDetached;
    null !== effectTag &&
      DEPRECATED_dispatchEventForResponderEventSystem(
        "blur",
        null,
        { isTargetAttached: !1, target: effectTag, timeStamp: Date.now() },
        effectTag,
        6
      );
    selectionInformation = null;
    root.current = finishedWork;
    nextEffect = remainingExpirationTimeBeforeCommit;
    do
      try {
        for (effectTag = root; null !== nextEffect; ) {
          var effectTag$jscomp$0 = nextEffect.effectTag;
          effectTag$jscomp$0 & 36 &&
            commitLifeCycles(effectTag, nextEffect.alternate, nextEffect);
          if (effectTag$jscomp$0 & 128) {
            current = void 0;
            var ref = nextEffect.ref;
            if (null !== ref) {
              var instance = nextEffect.stateNode;
              switch (nextEffect.tag) {
                case 5:
                  current = instance;
                  break;
                default:
                  current = instance;
              }
              21 === nextEffect.tag && (current = instance.methods);
              "function" === typeof ref
                ? ref(current)
                : (ref.current = current);
            }
          }
          nextEffect = nextEffect.nextEffect;
        }
      } catch (error$122) {
        if (null === nextEffect) throw Error(formatProdErrorMessage(330));
        captureCommitPhaseError(nextEffect, error$122);
        nextEffect = nextEffect.nextEffect;
      }
    while (null !== nextEffect);
    nextEffect = null;
    requestPaint();
    executionContext = prevExecutionContext;
  } else root.current = finishedWork;
  if (rootDoesHavePassiveEffects)
    (rootDoesHavePassiveEffects = !1),
      (rootWithPendingPassiveEffects = root),
      (pendingPassiveEffectsRenderPriority = renderPriorityLevel);
  else
    for (
      nextEffect = remainingExpirationTimeBeforeCommit;
      null !== nextEffect;

    )
      (renderPriorityLevel = nextEffect.nextEffect),
        (nextEffect.nextEffect = null),
        (nextEffect = renderPriorityLevel);
  renderPriorityLevel = root.firstPendingTime;
  0 === renderPriorityLevel && (legacyErrorBoundariesThatAlreadyFailed = null);
  1073741823 === renderPriorityLevel
    ? root === rootWithNestedUpdates
      ? nestedUpdateCount++
      : ((nestedUpdateCount = 0), (rootWithNestedUpdates = root))
    : (nestedUpdateCount = 0);
  "function" === typeof onCommitFiberRoot &&
    onCommitFiberRoot(finishedWork.stateNode, expirationTime);
  ensureRootIsScheduled(root);
  if (hasUncaughtError)
    throw ((hasUncaughtError = !1),
    (root = firstUncaughtError),
    (firstUncaughtError = null),
    root);
  if (0 !== (executionContext & 8)) return null;
  flushSyncCallbackQueue();
  return null;
}
function commitBeforeMutationEffects() {
  for (; null !== nextEffect; ) {
    var effectTag = nextEffect.effectTag;
    0 !== (effectTag & 256) &&
      commitBeforeMutationLifeCycles(nextEffect.alternate, nextEffect);
    0 === (effectTag & 512) ||
      rootDoesHavePassiveEffects ||
      ((rootDoesHavePassiveEffects = !0),
      scheduleCallback(97, function() {
        flushPassiveEffects();
        return null;
      }));
    nextEffect = nextEffect.nextEffect;
  }
}
function flushPassiveEffects() {
  if (90 !== pendingPassiveEffectsRenderPriority) {
    var priorityLevel =
      97 < pendingPassiveEffectsRenderPriority
        ? 97
        : pendingPassiveEffectsRenderPriority;
    pendingPassiveEffectsRenderPriority = 90;
    return runWithPriority$2(priorityLevel, flushPassiveEffectsImpl);
  }
}
function enqueuePendingPassiveHookEffectMount(fiber, effect) {
  pendingPassiveHookEffectsMount.push(effect, fiber);
  rootDoesHavePassiveEffects ||
    ((rootDoesHavePassiveEffects = !0),
    scheduleCallback(97, function() {
      flushPassiveEffects();
      return null;
    }));
}
function enqueuePendingPassiveHookEffectUnmount(fiber, effect) {
  pendingPassiveHookEffectsUnmount.push(effect, fiber);
  rootDoesHavePassiveEffects ||
    ((rootDoesHavePassiveEffects = !0),
    scheduleCallback(97, function() {
      flushPassiveEffects();
      return null;
    }));
}
function flushPassiveEffectsImpl() {
  if (null === rootWithPendingPassiveEffects) return !1;
  rootWithPendingPassiveEffects = null;
  if (0 !== (executionContext & 48)) throw Error(formatProdErrorMessage(331));
  var prevExecutionContext = executionContext;
  executionContext |= 32;
  var unmountEffects = pendingPassiveHookEffectsUnmount;
  pendingPassiveHookEffectsUnmount = [];
  for (var i = 0; i < unmountEffects.length; i += 2) {
    var effect = unmountEffects[i],
      fiber = unmountEffects[i + 1],
      destroy = effect.destroy;
    effect.destroy = void 0;
    if ("function" === typeof destroy)
      try {
        destroy();
      } catch (error) {
        if (null === fiber) throw Error(formatProdErrorMessage(330));
        captureCommitPhaseError(fiber, error);
      }
  }
  unmountEffects = pendingPassiveHookEffectsMount;
  pendingPassiveHookEffectsMount = [];
  for (i = 0; i < unmountEffects.length; i += 2) {
    effect = unmountEffects[i];
    fiber = unmountEffects[i + 1];
    try {
      var create = effect.create;
      effect.destroy = create();
    } catch (error$130) {
      if (null === fiber) throw Error(formatProdErrorMessage(330));
      captureCommitPhaseError(fiber, error$130);
    }
  }
  executionContext = prevExecutionContext;
  flushSyncCallbackQueue();
  return !0;
}
function captureCommitPhaseErrorOnRoot(rootFiber, sourceFiber, error) {
  sourceFiber = createCapturedValue(error, sourceFiber);
  sourceFiber = createRootErrorUpdate(rootFiber, sourceFiber, 1073741823);
  enqueueUpdate(rootFiber, sourceFiber);
  rootFiber = markUpdateTimeFromFiberToRoot(rootFiber, 1073741823);
  null !== rootFiber && ensureRootIsScheduled(rootFiber);
}
function captureCommitPhaseError(sourceFiber, error) {
  if (3 === sourceFiber.tag)
    captureCommitPhaseErrorOnRoot(sourceFiber, sourceFiber, error);
  else
    for (var fiber = sourceFiber.return; null !== fiber; ) {
      if (3 === fiber.tag) {
        captureCommitPhaseErrorOnRoot(fiber, sourceFiber, error);
        break;
      } else if (1 === fiber.tag) {
        var instance = fiber.stateNode;
        if (
          "function" === typeof fiber.type.getDerivedStateFromError ||
          ("function" === typeof instance.componentDidCatch &&
            (null === legacyErrorBoundariesThatAlreadyFailed ||
              !legacyErrorBoundariesThatAlreadyFailed.has(instance)))
        ) {
          sourceFiber = createCapturedValue(error, sourceFiber);
          sourceFiber = createClassErrorUpdate(fiber, sourceFiber, 1073741823);
          enqueueUpdate(fiber, sourceFiber);
          fiber = markUpdateTimeFromFiberToRoot(fiber, 1073741823);
          null !== fiber && ensureRootIsScheduled(fiber);
          break;
        }
      }
      fiber = fiber.return;
    }
}
function pingSuspendedRoot(root, wakeable, suspendedTime) {
  var pingCache = root.pingCache;
  null !== pingCache && pingCache.delete(wakeable);
  workInProgressRoot === root && renderExpirationTime$1 === suspendedTime
    ? 4 === workInProgressRootExitStatus ||
      (3 === workInProgressRootExitStatus &&
        1073741823 === workInProgressRootLatestProcessedExpirationTime &&
        500 > now() - globalMostRecentFallbackTime)
      ? prepareFreshStack(root, renderExpirationTime$1)
      : (workInProgressRootHasPendingPing = !0)
    : isRootSuspendedAtTime(root, suspendedTime) &&
      ((wakeable = root.lastPingedTime),
      (0 !== wakeable && wakeable < suspendedTime) ||
        ((root.lastPingedTime = suspendedTime), ensureRootIsScheduled(root)));
}
function retryTimedOutBoundary(boundaryFiber, retryTime) {
  0 === retryTime &&
    ((retryTime = requestCurrentTimeForUpdate()),
    (retryTime = computeExpirationForFiber(retryTime, boundaryFiber, null)));
  boundaryFiber = markUpdateTimeFromFiberToRoot(boundaryFiber, retryTime);
  null !== boundaryFiber && ensureRootIsScheduled(boundaryFiber);
}
function retryDehydratedSuspenseBoundary(boundaryFiber) {
  var suspenseState = boundaryFiber.memoizedState,
    retryTime = 0;
  null !== suspenseState && (retryTime = suspenseState.retryTime);
  retryTimedOutBoundary(boundaryFiber, retryTime);
}
function resolveRetryWakeable(boundaryFiber, wakeable) {
  var retryTime = 0;
  switch (boundaryFiber.tag) {
    case 13:
      var retryCache = boundaryFiber.stateNode;
      var suspenseState = boundaryFiber.memoizedState;
      null !== suspenseState && (retryTime = suspenseState.retryTime);
      break;
    case 19:
      retryCache = boundaryFiber.stateNode;
      break;
    default:
      throw Error(formatProdErrorMessage(314));
  }
  null !== retryCache && retryCache.delete(wakeable);
  retryTimedOutBoundary(boundaryFiber, retryTime);
}
var beginWork$1;
beginWork$1 = function(current, workInProgress, renderExpirationTime) {
  var updateExpirationTime = workInProgress.expirationTime;
  if (null !== current) {
    var newProps = workInProgress.pendingProps;
    if (current.memoizedProps !== newProps) didReceiveUpdate = !0;
    else {
      if (updateExpirationTime < renderExpirationTime) {
        didReceiveUpdate = !1;
        switch (workInProgress.tag) {
          case 3:
            pushHostContainer(
              workInProgress,
              workInProgress.stateNode.containerInfo
            );
            resetHydrationState();
            break;
          case 5:
            pushHostContext(workInProgress);
            if (
              workInProgress.mode & 4 &&
              1 !== renderExpirationTime &&
              newProps.hidden
            )
              return (
                (workInProgress.expirationTime = workInProgress.childExpirationTime = 1),
                null
              );
            break;
          case 4:
            pushHostContainer(
              workInProgress,
              workInProgress.stateNode.containerInfo
            );
            break;
          case 10:
            updateExpirationTime = workInProgress.memoizedProps.value;
            newProps = workInProgress.type._context;
            push(valueCursor, newProps._currentValue);
            newProps._currentValue = updateExpirationTime;
            break;
          case 13:
            updateExpirationTime = workInProgress.memoizedState;
            if (null !== updateExpirationTime) {
              if (null !== updateExpirationTime.dehydrated) {
                push(suspenseStackCursor, suspenseStackCursor.current & 1);
                workInProgress.effectTag |= 64;
                break;
              }
              updateExpirationTime = workInProgress.child;
              newProps = updateExpirationTime.childExpirationTime;
              if (0 !== newProps && newProps >= renderExpirationTime)
                return updateSuspenseComponent(
                  current,
                  workInProgress,
                  renderExpirationTime
                );
              for (
                updateExpirationTime = updateExpirationTime.child;
                null !== updateExpirationTime;

              ) {
                newProps = updateExpirationTime.expirationTime;
                var childChildExpirationTime =
                  updateExpirationTime.childExpirationTime;
                if (
                  (0 !== newProps && newProps >= renderExpirationTime) ||
                  (0 !== childChildExpirationTime &&
                    childChildExpirationTime >= renderExpirationTime)
                )
                  return updateSuspenseComponent(
                    current,
                    workInProgress,
                    renderExpirationTime
                  );
                updateExpirationTime = updateExpirationTime.sibling;
              }
              push(suspenseStackCursor, suspenseStackCursor.current & 1);
              workInProgress = bailoutOnAlreadyFinishedWork(
                current,
                workInProgress,
                renderExpirationTime
              );
              return null !== workInProgress ? workInProgress.sibling : null;
            }
            push(suspenseStackCursor, suspenseStackCursor.current & 1);
            break;
          case 19:
            updateExpirationTime =
              workInProgress.childExpirationTime >= renderExpirationTime;
            if (0 !== (current.effectTag & 64)) {
              if (updateExpirationTime)
                return updateSuspenseListComponent(
                  current,
                  workInProgress,
                  renderExpirationTime
                );
              workInProgress.effectTag |= 64;
            }
            newProps = workInProgress.memoizedState;
            null !== newProps &&
              ((newProps.rendering = null),
              (newProps.tail = null),
              (newProps.lastEffect = null));
            push(suspenseStackCursor, suspenseStackCursor.current);
            if (!updateExpirationTime) return null;
        }
        return bailoutOnAlreadyFinishedWork(
          current,
          workInProgress,
          renderExpirationTime
        );
      }
      didReceiveUpdate = !1;
    }
  } else didReceiveUpdate = !1;
  workInProgress.expirationTime = 0;
  switch (workInProgress.tag) {
    case 2:
      return (
        (updateExpirationTime = workInProgress.type),
        null !== current &&
          ((current.alternate = null),
          (workInProgress.alternate = null),
          (workInProgress.effectTag |= 2)),
        (current = workInProgress.pendingProps),
        prepareToReadContext(workInProgress, renderExpirationTime),
        (newProps = renderWithHooks(
          null,
          workInProgress,
          updateExpirationTime,
          current,
          void 0,
          renderExpirationTime
        )),
        (workInProgress.effectTag |= 1),
        "object" === typeof newProps &&
        null !== newProps &&
        "function" === typeof newProps.render &&
        void 0 === newProps.$$typeof
          ? ((workInProgress.tag = 1),
            (workInProgress.memoizedState = null),
            (workInProgress.updateQueue = null),
            (workInProgress.memoizedState =
              null !== newProps.state && void 0 !== newProps.state
                ? newProps.state
                : null),
            initializeUpdateQueue(workInProgress),
            (childChildExpirationTime =
              updateExpirationTime.getDerivedStateFromProps),
            "function" === typeof childChildExpirationTime &&
              applyDerivedStateFromProps(
                workInProgress,
                updateExpirationTime,
                childChildExpirationTime,
                current
              ),
            (newProps.updater = classComponentUpdater),
            (workInProgress.stateNode = newProps),
            (newProps._reactInternals = workInProgress),
            mountClassInstance(
              workInProgress,
              updateExpirationTime,
              current,
              renderExpirationTime
            ),
            (workInProgress = finishClassComponent(
              null,
              workInProgress,
              updateExpirationTime,
              !0,
              !1,
              renderExpirationTime
            )))
          : ((workInProgress.tag = 0),
            reconcileChildren(
              null,
              workInProgress,
              newProps,
              renderExpirationTime
            ),
            (workInProgress = workInProgress.child)),
        workInProgress
      );
    case 16:
      newProps = workInProgress.elementType;
      a: {
        null !== current &&
          ((current.alternate = null),
          (workInProgress.alternate = null),
          (workInProgress.effectTag |= 2));
        current = workInProgress.pendingProps;
        childChildExpirationTime = newProps._init;
        newProps = childChildExpirationTime(newProps._payload);
        workInProgress.type = newProps;
        childChildExpirationTime = workInProgress.tag = resolveLazyComponentTag(
          newProps
        );
        var resolvedProps = resolveDefaultProps(newProps, current);
        switch (childChildExpirationTime) {
          case 0:
            workInProgress = updateFunctionComponent(
              null,
              workInProgress,
              newProps,
              resolvedProps,
              renderExpirationTime
            );
            break a;
          case 1:
            workInProgress = updateClassComponent(
              null,
              workInProgress,
              newProps,
              resolvedProps,
              renderExpirationTime
            );
            break a;
          case 11:
            workInProgress = updateForwardRef(
              null,
              workInProgress,
              newProps,
              resolvedProps,
              renderExpirationTime
            );
            break a;
          case 14:
            workInProgress = updateMemoComponent(
              null,
              workInProgress,
              newProps,
              resolveDefaultProps(newProps.type, resolvedProps),
              updateExpirationTime,
              renderExpirationTime
            );
            break a;
          case 22:
            workInProgress = updateBlock(
              null,
              workInProgress,
              newProps,
              current,
              renderExpirationTime
            );
            break a;
        }
        throw Error(formatProdErrorMessage(306, newProps, ""));
      }
      return workInProgress;
    case 0:
      return (
        (updateExpirationTime = workInProgress.type),
        (newProps = workInProgress.pendingProps),
        (newProps =
          workInProgress.elementType === updateExpirationTime
            ? newProps
            : resolveDefaultProps(updateExpirationTime, newProps)),
        updateFunctionComponent(
          current,
          workInProgress,
          updateExpirationTime,
          newProps,
          renderExpirationTime
        )
      );
    case 1:
      return (
        (updateExpirationTime = workInProgress.type),
        (newProps = workInProgress.pendingProps),
        (newProps =
          workInProgress.elementType === updateExpirationTime
            ? newProps
            : resolveDefaultProps(updateExpirationTime, newProps)),
        updateClassComponent(
          current,
          workInProgress,
          updateExpirationTime,
          newProps,
          renderExpirationTime
        )
      );
    case 3:
      pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
      updateExpirationTime = workInProgress.updateQueue;
      if (null === current || null === updateExpirationTime)
        throw Error(formatProdErrorMessage(282));
      updateExpirationTime = workInProgress.pendingProps;
      newProps = workInProgress.memoizedState;
      newProps = null !== newProps ? newProps.element : null;
      cloneUpdateQueue(current, workInProgress);
      processUpdateQueue(
        workInProgress,
        updateExpirationTime,
        null,
        renderExpirationTime
      );
      updateExpirationTime = workInProgress.memoizedState.element;
      if (updateExpirationTime === newProps)
        resetHydrationState(),
          (workInProgress = bailoutOnAlreadyFinishedWork(
            current,
            workInProgress,
            renderExpirationTime
          ));
      else {
        if ((newProps = workInProgress.stateNode.hydrate))
          (nextHydratableInstance = getNextHydratable(
            workInProgress.stateNode.containerInfo.firstChild
          )),
            (hydrationParentFiber = workInProgress),
            (newProps = isHydrating = !0);
        if (newProps)
          for (
            renderExpirationTime = mountChildFibers(
              workInProgress,
              null,
              updateExpirationTime,
              renderExpirationTime
            ),
              workInProgress.child = renderExpirationTime;
            renderExpirationTime;

          )
            (renderExpirationTime.effectTag =
              (renderExpirationTime.effectTag & -3) | 1024),
              (renderExpirationTime = renderExpirationTime.sibling);
        else
          reconcileChildren(
            current,
            workInProgress,
            updateExpirationTime,
            renderExpirationTime
          ),
            resetHydrationState();
        workInProgress = workInProgress.child;
      }
      return workInProgress;
    case 5:
      return (
        pushHostContext(workInProgress),
        null === current && tryToClaimNextHydratableInstance(workInProgress),
        (updateExpirationTime = workInProgress.type),
        (newProps = workInProgress.pendingProps),
        (childChildExpirationTime =
          null !== current ? current.memoizedProps : null),
        (resolvedProps = newProps.children),
        shouldSetTextContent(updateExpirationTime, newProps)
          ? (resolvedProps = null)
          : null !== childChildExpirationTime &&
            shouldSetTextContent(
              updateExpirationTime,
              childChildExpirationTime
            ) &&
            (workInProgress.effectTag |= 16),
        markRef(current, workInProgress),
        workInProgress.mode & 4 && 1 !== renderExpirationTime && newProps.hidden
          ? ((workInProgress.expirationTime = workInProgress.childExpirationTime = 1),
            (workInProgress = null))
          : (reconcileChildren(
              current,
              workInProgress,
              resolvedProps,
              renderExpirationTime
            ),
            (workInProgress = workInProgress.child)),
        workInProgress
      );
    case 6:
      return (
        null === current && tryToClaimNextHydratableInstance(workInProgress),
        null
      );
    case 13:
      return updateSuspenseComponent(
        current,
        workInProgress,
        renderExpirationTime
      );
    case 4:
      return (
        pushHostContainer(
          workInProgress,
          workInProgress.stateNode.containerInfo
        ),
        (updateExpirationTime = workInProgress.pendingProps),
        null === current
          ? (workInProgress.child = reconcileChildFibers(
              workInProgress,
              null,
              updateExpirationTime,
              renderExpirationTime
            ))
          : reconcileChildren(
              current,
              workInProgress,
              updateExpirationTime,
              renderExpirationTime
            ),
        workInProgress.child
      );
    case 11:
      return (
        (updateExpirationTime = workInProgress.type),
        (newProps = workInProgress.pendingProps),
        (newProps =
          workInProgress.elementType === updateExpirationTime
            ? newProps
            : resolveDefaultProps(updateExpirationTime, newProps)),
        updateForwardRef(
          current,
          workInProgress,
          updateExpirationTime,
          newProps,
          renderExpirationTime
        )
      );
    case 7:
      return (
        reconcileChildren(
          current,
          workInProgress,
          workInProgress.pendingProps,
          renderExpirationTime
        ),
        workInProgress.child
      );
    case 8:
      return (
        reconcileChildren(
          current,
          workInProgress,
          workInProgress.pendingProps.children,
          renderExpirationTime
        ),
        workInProgress.child
      );
    case 12:
      return (
        reconcileChildren(
          current,
          workInProgress,
          workInProgress.pendingProps.children,
          renderExpirationTime
        ),
        workInProgress.child
      );
    case 10:
      a: {
        updateExpirationTime = workInProgress.type._context;
        newProps = workInProgress.pendingProps;
        resolvedProps = workInProgress.memoizedProps;
        childChildExpirationTime = newProps.value;
        var context = workInProgress.type._context;
        push(valueCursor, context._currentValue);
        context._currentValue = childChildExpirationTime;
        if (null !== resolvedProps)
          if (
            ((context = resolvedProps.value),
            (childChildExpirationTime = objectIs(
              context,
              childChildExpirationTime
            )
              ? 0
              : ("function" ===
                typeof updateExpirationTime._calculateChangedBits
                  ? updateExpirationTime._calculateChangedBits(
                      context,
                      childChildExpirationTime
                    )
                  : 1073741823) | 0),
            0 === childChildExpirationTime)
          ) {
            if (resolvedProps.children === newProps.children) {
              workInProgress = bailoutOnAlreadyFinishedWork(
                current,
                workInProgress,
                renderExpirationTime
              );
              break a;
            }
          } else
            for (
              resolvedProps = workInProgress.child,
                null !== resolvedProps &&
                  (resolvedProps.return = workInProgress);
              null !== resolvedProps;

            ) {
              var list = resolvedProps.dependencies;
              if (null !== list) {
                context = resolvedProps.child;
                for (
                  var dependency = list.firstContext;
                  null !== dependency;

                ) {
                  if (
                    dependency.context === updateExpirationTime &&
                    0 !== (dependency.observedBits & childChildExpirationTime)
                  ) {
                    1 === resolvedProps.tag &&
                      ((dependency = createUpdate(renderExpirationTime, null)),
                      (dependency.tag = 2),
                      enqueueUpdate(resolvedProps, dependency));
                    resolvedProps.expirationTime < renderExpirationTime &&
                      (resolvedProps.expirationTime = renderExpirationTime);
                    dependency = resolvedProps.alternate;
                    null !== dependency &&
                      dependency.expirationTime < renderExpirationTime &&
                      (dependency.expirationTime = renderExpirationTime);
                    scheduleWorkOnParentPath(
                      resolvedProps.return,
                      renderExpirationTime
                    );
                    list.expirationTime < renderExpirationTime &&
                      (list.expirationTime = renderExpirationTime);
                    break;
                  }
                  dependency = dependency.next;
                }
              } else if (10 === resolvedProps.tag)
                context =
                  resolvedProps.type === workInProgress.type
                    ? null
                    : resolvedProps.child;
              else if (18 === resolvedProps.tag) {
                context = resolvedProps.return;
                if (null === context) throw Error(formatProdErrorMessage(341));
                context.expirationTime < renderExpirationTime &&
                  (context.expirationTime = renderExpirationTime);
                list = context.alternate;
                null !== list &&
                  list.expirationTime < renderExpirationTime &&
                  (list.expirationTime = renderExpirationTime);
                scheduleWorkOnParentPath(context, renderExpirationTime);
                context = resolvedProps.sibling;
              } else context = resolvedProps.child;
              if (null !== context) context.return = resolvedProps;
              else
                for (context = resolvedProps; null !== context; ) {
                  if (context === workInProgress) {
                    context = null;
                    break;
                  }
                  resolvedProps = context.sibling;
                  if (null !== resolvedProps) {
                    resolvedProps.return = context.return;
                    context = resolvedProps;
                    break;
                  }
                  context = context.return;
                }
              resolvedProps = context;
            }
        reconcileChildren(
          current,
          workInProgress,
          newProps.children,
          renderExpirationTime
        );
        workInProgress = workInProgress.child;
      }
      return workInProgress;
    case 9:
      return (
        (newProps = workInProgress.type),
        (childChildExpirationTime = workInProgress.pendingProps),
        (updateExpirationTime = childChildExpirationTime.children),
        prepareToReadContext(workInProgress, renderExpirationTime),
        (newProps = readContext(
          newProps,
          childChildExpirationTime.unstable_observedBits
        )),
        (updateExpirationTime = updateExpirationTime(newProps)),
        (workInProgress.effectTag |= 1),
        reconcileChildren(
          current,
          workInProgress,
          updateExpirationTime,
          renderExpirationTime
        ),
        workInProgress.child
      );
    case 14:
      return (
        (newProps = workInProgress.type),
        (childChildExpirationTime = resolveDefaultProps(
          newProps,
          workInProgress.pendingProps
        )),
        (childChildExpirationTime = resolveDefaultProps(
          newProps.type,
          childChildExpirationTime
        )),
        updateMemoComponent(
          current,
          workInProgress,
          newProps,
          childChildExpirationTime,
          updateExpirationTime,
          renderExpirationTime
        )
      );
    case 15:
      return updateSimpleMemoComponent(
        current,
        workInProgress,
        workInProgress.type,
        workInProgress.pendingProps,
        updateExpirationTime,
        renderExpirationTime
      );
    case 17:
      return (
        (updateExpirationTime = workInProgress.type),
        (newProps = workInProgress.pendingProps),
        (newProps =
          workInProgress.elementType === updateExpirationTime
            ? newProps
            : resolveDefaultProps(updateExpirationTime, newProps)),
        null !== current &&
          ((current.alternate = null),
          (workInProgress.alternate = null),
          (workInProgress.effectTag |= 2)),
        (workInProgress.tag = 1),
        prepareToReadContext(workInProgress, renderExpirationTime),
        constructClassInstance(workInProgress, updateExpirationTime, newProps),
        mountClassInstance(
          workInProgress,
          updateExpirationTime,
          newProps,
          renderExpirationTime
        ),
        finishClassComponent(
          null,
          workInProgress,
          updateExpirationTime,
          !0,
          !1,
          renderExpirationTime
        )
      );
    case 19:
      return updateSuspenseListComponent(
        current,
        workInProgress,
        renderExpirationTime
      );
    case 21:
      return (
        reconcileChildren(
          current,
          workInProgress,
          workInProgress.pendingProps.children,
          renderExpirationTime
        ),
        workInProgress.child
      );
    case 22:
      return updateBlock(
        current,
        workInProgress,
        workInProgress.type,
        workInProgress.pendingProps,
        renderExpirationTime
      );
  }
  throw Error(formatProdErrorMessage(156, workInProgress.tag));
};
var IsThisRendererActing = { current: !1 },
  onCommitFiberRoot = null,
  onCommitFiberUnmount = null;
function injectInternals(internals) {
  if ("undefined" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return !1;
  var hook = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (hook.isDisabled || !hook.supportsFiber) return !0;
  try {
    var rendererID = hook.inject(internals);
    onCommitFiberRoot = function(root) {
      try {
        hook.onCommitFiberRoot(
          rendererID,
          root,
          void 0,
          64 === (root.current.effectTag & 64)
        );
      } catch (err) {}
    };
    onCommitFiberUnmount = function(fiber) {
      try {
        hook.onCommitFiberUnmount(rendererID, fiber);
      } catch (err) {}
    };
  } catch (err) {}
  return !0;
}
function FiberNode(tag, pendingProps, key, mode) {
  this.tag = tag;
  this.key = key;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = pendingProps;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = mode;
  this.effectTag = 0;
  this.lastEffect = this.firstEffect = this.nextEffect = null;
  this.childExpirationTime = this.expirationTime = 0;
  this.alternate = null;
}
function createFiber(tag, pendingProps, key, mode) {
  return new FiberNode(tag, pendingProps, key, mode);
}
function shouldConstruct(Component) {
  Component = Component.prototype;
  return !(!Component || !Component.isReactComponent);
}
function resolveLazyComponentTag(Component) {
  if ("function" === typeof Component)
    return shouldConstruct(Component) ? 1 : 0;
  if (void 0 !== Component && null !== Component) {
    Component = Component.$$typeof;
    if (Component === REACT_FORWARD_REF_TYPE) return 11;
    if (Component === REACT_MEMO_TYPE) return 14;
    if (Component === REACT_BLOCK_TYPE) return 22;
  }
  return 2;
}
function createWorkInProgress(current, pendingProps) {
  var workInProgress = current.alternate;
  null === workInProgress
    ? ((workInProgress = createFiber(
        current.tag,
        pendingProps,
        current.key,
        current.mode
      )),
      (workInProgress.elementType = current.elementType),
      (workInProgress.type = current.type),
      (workInProgress.stateNode = current.stateNode),
      (workInProgress.alternate = current),
      (current.alternate = workInProgress))
    : ((workInProgress.pendingProps = pendingProps),
      (workInProgress.effectTag = 0),
      (workInProgress.nextEffect = null),
      (workInProgress.firstEffect = null),
      (workInProgress.lastEffect = null));
  workInProgress.childExpirationTime = current.childExpirationTime;
  workInProgress.expirationTime = current.expirationTime;
  workInProgress.child = current.child;
  workInProgress.memoizedProps = current.memoizedProps;
  workInProgress.memoizedState = current.memoizedState;
  workInProgress.updateQueue = current.updateQueue;
  pendingProps = current.dependencies;
  workInProgress.dependencies =
    null === pendingProps
      ? null
      : {
          expirationTime: pendingProps.expirationTime,
          firstContext: pendingProps.firstContext,
          responders: pendingProps.responders
        };
  workInProgress.sibling = current.sibling;
  workInProgress.index = current.index;
  workInProgress.ref = current.ref;
  return workInProgress;
}
function createFiberFromTypeAndProps(
  type,
  key,
  pendingProps,
  owner,
  mode,
  expirationTime
) {
  var fiberTag = 2;
  owner = type;
  if ("function" === typeof type) shouldConstruct(type) && (fiberTag = 1);
  else if ("string" === typeof type) fiberTag = 5;
  else
    a: switch (type) {
      case REACT_FRAGMENT_TYPE:
        return createFiberFromFragment(
          pendingProps.children,
          mode,
          expirationTime,
          key
        );
      case REACT_CONCURRENT_MODE_TYPE:
        fiberTag = 8;
        mode |= 7;
        break;
      case REACT_STRICT_MODE_TYPE:
        fiberTag = 8;
        mode |= 1;
        break;
      case REACT_PROFILER_TYPE:
        return (
          (type = createFiber(12, pendingProps, key, mode | 8)),
          (type.elementType = REACT_PROFILER_TYPE),
          (type.type = REACT_PROFILER_TYPE),
          (type.expirationTime = expirationTime),
          type
        );
      case REACT_SUSPENSE_TYPE:
        return (
          (type = createFiber(13, pendingProps, key, mode)),
          (type.type = REACT_SUSPENSE_TYPE),
          (type.elementType = REACT_SUSPENSE_TYPE),
          (type.expirationTime = expirationTime),
          type
        );
      case REACT_SUSPENSE_LIST_TYPE:
        return (
          (type = createFiber(19, pendingProps, key, mode)),
          (type.elementType = REACT_SUSPENSE_LIST_TYPE),
          (type.expirationTime = expirationTime),
          type
        );
      default:
        if ("object" === typeof type && null !== type)
          switch (type.$$typeof) {
            case REACT_PROVIDER_TYPE:
              fiberTag = 10;
              break a;
            case REACT_CONTEXT_TYPE:
              fiberTag = 9;
              break a;
            case REACT_FORWARD_REF_TYPE:
              fiberTag = 11;
              break a;
            case REACT_MEMO_TYPE:
              fiberTag = 14;
              break a;
            case REACT_LAZY_TYPE:
              fiberTag = 16;
              owner = null;
              break a;
            case REACT_BLOCK_TYPE:
              fiberTag = 22;
              break a;
            case REACT_SCOPE_TYPE:
              return (
                (key = createFiber(21, pendingProps, key, mode)),
                (key.type = type),
                (key.elementType = type),
                (key.expirationTime = expirationTime),
                key
              );
          }
        throw Error(
          formatProdErrorMessage(130, null == type ? type : typeof type, "")
        );
    }
  key = createFiber(fiberTag, pendingProps, key, mode);
  key.elementType = type;
  key.type = owner;
  key.expirationTime = expirationTime;
  return key;
}
function createFiberFromFragment(elements, mode, expirationTime, key) {
  elements = createFiber(7, elements, key, mode);
  elements.expirationTime = expirationTime;
  return elements;
}
function createFiberFromText(content, mode, expirationTime) {
  content = createFiber(6, content, null, mode);
  content.expirationTime = expirationTime;
  return content;
}
function createFiberFromPortal(portal, mode, expirationTime) {
  mode = createFiber(
    4,
    null !== portal.children ? portal.children : [],
    portal.key,
    mode
  );
  mode.expirationTime = expirationTime;
  mode.stateNode = {
    containerInfo: portal.containerInfo,
    pendingChildren: null,
    implementation: portal.implementation
  };
  return mode;
}
function FiberRootNode(containerInfo, tag, hydrate) {
  this.tag = tag;
  this.current = null;
  this.containerInfo = containerInfo;
  this.pingCache = this.pendingChildren = null;
  this.finishedExpirationTime = 0;
  this.finishedWork = null;
  this.timeoutHandle = -1;
  this.pendingContext = this.context = null;
  this.hydrate = hydrate;
  this.callbackNode = null;
  this.callbackPriority = 90;
  this.mutableSourcePendingUpdateTime = this.lastExpiredTime = this.lastPingedTime = this.nextKnownPendingLevel = this.lastSuspendedTime = this.firstSuspendedTime = this.lastPendingTime = this.firstPendingTime = 0;
  this.hydrationCallbacks = null;
}
function isRootSuspendedAtTime(root, expirationTime) {
  var firstSuspendedTime = root.firstSuspendedTime;
  root = root.lastSuspendedTime;
  return (
    0 !== firstSuspendedTime &&
    firstSuspendedTime >= expirationTime &&
    root <= expirationTime
  );
}
function markRootSuspendedAtTime(root, expirationTime) {
  var firstSuspendedTime = root.firstSuspendedTime,
    lastSuspendedTime = root.lastSuspendedTime;
  firstSuspendedTime < expirationTime &&
    (root.firstSuspendedTime = expirationTime);
  if (lastSuspendedTime > expirationTime || 0 === firstSuspendedTime)
    root.lastSuspendedTime = expirationTime;
  expirationTime <= root.lastPingedTime && (root.lastPingedTime = 0);
  expirationTime <= root.lastExpiredTime && (root.lastExpiredTime = 0);
}
function markRootUpdatedAtTime(root, expirationTime) {
  expirationTime > root.firstPendingTime &&
    (root.firstPendingTime = expirationTime);
  var lastPendingTime = root.lastPendingTime;
  if (0 === lastPendingTime || expirationTime < lastPendingTime)
    root.lastPendingTime = expirationTime;
  lastPendingTime = root.firstSuspendedTime;
  0 !== lastPendingTime &&
    (expirationTime >= lastPendingTime
      ? (root.firstSuspendedTime = root.lastSuspendedTime = root.nextKnownPendingLevel = 0)
      : expirationTime >= root.lastSuspendedTime &&
        (root.lastSuspendedTime = expirationTime + 1),
    expirationTime > root.nextKnownPendingLevel &&
      (root.nextKnownPendingLevel = expirationTime));
}
function markRootExpiredAtTime(root, expirationTime) {
  var lastExpiredTime = root.lastExpiredTime;
  if (0 === lastExpiredTime || lastExpiredTime > expirationTime)
    root.lastExpiredTime = expirationTime;
}
var enqueueTaskImpl = null;
function enqueueTask(task) {
  if (null === enqueueTaskImpl)
    try {
      var requireString = ("require" + Math.random()).slice(0, 7);
      enqueueTaskImpl = (module && module[requireString])("timers")
        .setImmediate;
    } catch (_err) {
      enqueueTaskImpl = function(callback) {
        var channel = new MessageChannel();
        channel.port1.onmessage = callback;
        channel.port2.postMessage(void 0);
      };
    }
  return enqueueTaskImpl(task);
}
function createPortal(children, containerInfo, implementation) {
  var key =
    3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return {
    $$typeof: REACT_PORTAL_TYPE,
    key: null == key ? null : "" + key,
    children: children,
    containerInfo: containerInfo,
    implementation: implementation
  };
}
function updateContainer(element, container, parentComponent, callback) {
  parentComponent = container.current;
  var currentTime = requestCurrentTimeForUpdate(),
    suspenseConfig = ReactCurrentBatchConfig.suspense;
  currentTime = computeExpirationForFiber(
    currentTime,
    parentComponent,
    suspenseConfig
  );
  null === container.context
    ? (container.context = emptyContextObject)
    : (container.pendingContext = emptyContextObject);
  container = createUpdate(currentTime, suspenseConfig);
  container.payload = { element: element };
  callback = void 0 === callback ? null : callback;
  null !== callback && (container.callback = callback);
  enqueueUpdate(parentComponent, container);
  scheduleUpdateOnFiber(parentComponent, currentTime);
  return currentTime;
}
function markRetryTimeImpl(fiber, retryTime) {
  fiber = fiber.memoizedState;
  null !== fiber &&
    null !== fiber.dehydrated &&
    fiber.retryTime < retryTime &&
    (fiber.retryTime = retryTime);
}
function markRetryTimeIfNotHydrated(fiber, retryTime) {
  markRetryTimeImpl(fiber, retryTime);
  (fiber = fiber.alternate) && markRetryTimeImpl(fiber, retryTime);
}
var IsSomeRendererActing$1 = ReactSharedInternals.IsSomeRendererActing,
  isSchedulerMocked =
    "function" === typeof Scheduler.unstable_flushAllWithoutAsserting,
  flushWork =
    Scheduler.unstable_flushAllWithoutAsserting ||
    function() {
      for (var didFlushWork = !1; flushPassiveEffects(); ) didFlushWork = !0;
      return didFlushWork;
    };
function flushWorkAndMicroTasks(onDone) {
  try {
    flushWork(),
      enqueueTask(function() {
        flushWork() ? flushWorkAndMicroTasks(onDone) : onDone();
      });
  } catch (err) {
    onDone(err);
  }
}
var actingUpdatesScopeDepth = 0,
  didWarnAboutUsingActInProd = !1;
function ReactDOMRoot(container, options) {
  this._internalRoot = createRootImpl(container, 2, options);
}
function ReactDOMBlockingRoot(container, tag, options) {
  this._internalRoot = createRootImpl(container, tag, options);
}
ReactDOMRoot.prototype.render = ReactDOMBlockingRoot.prototype.render = function(
  children
) {
  updateContainer(children, this._internalRoot, null, null);
};
ReactDOMRoot.prototype.unmount = ReactDOMBlockingRoot.prototype.unmount = function() {
  var root = this._internalRoot,
    container = root.containerInfo;
  updateContainer(null, root, null, function() {
    container[internalContainerInstanceKey] = null;
  });
};
function createRootImpl(container, tag, options) {
  var hydrate = null != options && !0 === options.hydrate,
    hydrationCallbacks = (null != options && options.hydrationOptions) || null;
  options = new FiberRootNode(container, tag, hydrate);
  options.hydrationCallbacks = hydrationCallbacks;
  hydrationCallbacks = createFiber(
    3,
    null,
    null,
    2 === tag ? 7 : 1 === tag ? 3 : 0
  );
  options.current = hydrationCallbacks;
  hydrationCallbacks.stateNode = options;
  initializeUpdateQueue(hydrationCallbacks);
  container[internalContainerInstanceKey] = options.current;
  hydrate &&
    0 !== tag &&
    eagerlyTrapReplayableEvents(
      container,
      9 === container.nodeType ? container : container.ownerDocument
    );
  return options;
}
function isValidContainer(node) {
  return !(
    !node ||
    (1 !== node.nodeType &&
      9 !== node.nodeType &&
      11 !== node.nodeType &&
      (8 !== node.nodeType ||
        " react-mount-point-unstable " !== node.nodeValue))
  );
}
attemptSynchronousHydration = function(fiber) {
  switch (fiber.tag) {
    case 3:
      var root$132 = fiber.stateNode;
      root$132.hydrate && flushRoot(root$132, root$132.firstPendingTime);
      break;
    case 13:
      flushSync(function() {
        return scheduleUpdateOnFiber(fiber, 1073741823);
      }),
        (root$132 = computeExpirationBucket(
          requestCurrentTimeForUpdate(),
          150,
          100
        )),
        markRetryTimeIfNotHydrated(fiber, root$132);
  }
};
attemptUserBlockingHydration = function(fiber) {
  if (13 === fiber.tag) {
    var expTime = computeExpirationBucket(
      requestCurrentTimeForUpdate(),
      150,
      100
    );
    scheduleUpdateOnFiber(fiber, expTime);
    markRetryTimeIfNotHydrated(fiber, expTime);
  }
};
attemptContinuousHydration = function(fiber) {
  13 === fiber.tag &&
    (scheduleUpdateOnFiber(fiber, 3), markRetryTimeIfNotHydrated(fiber, 3));
};
attemptHydrationAtCurrentPriority = function(fiber) {
  if (13 === fiber.tag) {
    var currentTime = requestCurrentTimeForUpdate();
    currentTime = computeExpirationForFiber(currentTime, fiber, null);
    scheduleUpdateOnFiber(fiber, currentTime);
    markRetryTimeIfNotHydrated(fiber, currentTime);
  }
};
restoreImpl = function(domElement, tag, props) {
  switch (tag) {
    case "input":
      updateWrapper(domElement, props);
      tag = props.name;
      if ("radio" === props.type && null != tag) {
        for (props = domElement; props.parentNode; ) props = props.parentNode;
        props = props.querySelectorAll(
          "input[name=" + JSON.stringify("" + tag) + '][type="radio"]'
        );
        for (tag = 0; tag < props.length; tag++) {
          var otherNode = props[tag];
          if (otherNode !== domElement && otherNode.form === domElement.form) {
            var otherProps = getFiberCurrentPropsFromNode$1(otherNode);
            if (!otherProps) throw Error(formatProdErrorMessage(90));
            updateValueIfChanged(otherNode);
            updateWrapper(otherNode, otherProps);
          }
        }
      }
      break;
    case "textarea":
      updateWrapper$1(domElement, props);
      break;
    case "select":
      (tag = props.value),
        null != tag && updateOptions(domElement, !!props.multiple, tag, !1);
  }
};
batchedUpdatesImpl = batchedUpdates$1;
discreteUpdatesImpl = discreteUpdates$1;
flushDiscreteUpdatesImpl = flushDiscreteUpdates;
batchedEventUpdatesImpl = function(fn, a) {
  var prevExecutionContext = executionContext;
  executionContext |= 2;
  try {
    return fn(a);
  } finally {
    (executionContext = prevExecutionContext),
      0 === executionContext && flushSyncCallbackQueue();
  }
};
var Internals = {
  Events: [
    getInstanceFromNode$2,
    getNodeFromInstance$1,
    getFiberCurrentPropsFromNode$1,
    injectEventPluginsByName,
    eventNameDispatchConfigs,
    enqueueStateRestore,
    restoreStateIfNeeded,
    dispatchEvent,
    runEventsInBatch,
    flushPassiveEffects,
    IsThisRendererActing
  ]
};
(function(devToolsConfig) {
  var findFiberByHostInstance = devToolsConfig.findFiberByHostInstance;
  return injectInternals({
    bundleType: devToolsConfig.bundleType,
    version: devToolsConfig.version,
    rendererPackageName: devToolsConfig.rendererPackageName,
    rendererConfig: devToolsConfig.rendererConfig,
    overrideHookState: null,
    overrideProps: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: ReactSharedInternals.ReactCurrentDispatcher,
    findHostInstanceByFiber: function(fiber) {
      fiber = findCurrentHostFiber(fiber);
      return null === fiber ? null : fiber.stateNode;
    },
    findFiberByHostInstance: function(instance) {
      return findFiberByHostInstance ? findFiberByHostInstance(instance) : null;
    },
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null
  });
})({
  findFiberByHostInstance: getClosestInstanceFromNode,
  bundleType: 0,
  version: "16.13.1",
  rendererPackageName: "react-dom"
});
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Internals;
exports.act = function(callback) {
  function onDone() {
    actingUpdatesScopeDepth--;
    IsSomeRendererActing$1.current = previousIsSomeRendererActing;
    IsThisRendererActing.current = previousIsThisRendererActing;
  }
  !1 === didWarnAboutUsingActInProd &&
    ((didWarnAboutUsingActInProd = !0),
    console.error(
      "act(...) is not supported in production builds of React, and might not behave as expected."
    ));
  actingUpdatesScopeDepth++;
  var previousIsSomeRendererActing = IsSomeRendererActing$1.current;
  var previousIsThisRendererActing = IsThisRendererActing.current;
  IsSomeRendererActing$1.current = !0;
  IsThisRendererActing.current = !0;
  try {
    var result = batchedUpdates$1(callback);
  } catch (error) {
    throw (onDone(), error);
  }
  if (
    null !== result &&
    "object" === typeof result &&
    "function" === typeof result.then
  )
    return {
      then: function(resolve, reject) {
        result.then(
          function() {
            1 < actingUpdatesScopeDepth ||
            (!0 === isSchedulerMocked && !0 === previousIsSomeRendererActing)
              ? (onDone(), resolve())
              : flushWorkAndMicroTasks(function(err) {
                  onDone();
                  err ? reject(err) : resolve();
                });
          },
          function(err) {
            onDone();
            reject(err);
          }
        );
      }
    };
  try {
    1 !== actingUpdatesScopeDepth ||
      (!1 !== isSchedulerMocked && !1 !== previousIsSomeRendererActing) ||
      flushWork(),
      onDone();
  } catch (err) {
    throw (onDone(), err);
  }
  return {
    then: function(resolve) {
      resolve();
    }
  };
};
exports.createBlockingRoot = function(container, options) {
  if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
  return new ReactDOMBlockingRoot(container, 1, options);
};
exports.createPortal = function(children, container) {
  var key =
    2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!isValidContainer(container)) throw Error(formatProdErrorMessage(200));
  return createPortal(children, container, null, key);
};
exports.createRoot = function(container, options) {
  if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
  return new ReactDOMRoot(container, options);
};
exports.flushSync = flushSync;
exports.unstable_batchedUpdates = batchedUpdates$1;
exports.unstable_discreteUpdates = discreteUpdates$1;
exports.unstable_flushControlled = function(fn) {
  var prevExecutionContext = executionContext;
  executionContext |= 1;
  try {
    runWithPriority$2(99, fn);
  } finally {
    (executionContext = prevExecutionContext),
      0 === executionContext && flushSyncCallbackQueue();
  }
};
exports.unstable_flushDiscreteUpdates = flushDiscreteUpdates;
exports.unstable_scheduleHydration = function(target) {
  if (target) {
    var priority = Scheduler.unstable_getCurrentPriorityLevel();
    target = { blockedOn: null, target: target, priority: priority };
    for (
      var i = 0;
      i < queuedExplicitHydrationTargets.length &&
      !(priority <= queuedExplicitHydrationTargets[i].priority);
      i++
    );
    queuedExplicitHydrationTargets.splice(i, 0, target);
    0 === i && attemptExplicitHydrationTarget(target);
  }
};
exports.version = "16.13.1";
