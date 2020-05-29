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
  Scheduler = require("scheduler"),
  tracing = require("scheduler/tracing");
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
function rethrowCaughtError() {
  if (hasRethrowError) {
    var error = rethrowError;
    hasRethrowError = !1;
    rethrowError = null;
    throw error;
  }
}
var getNodeFromInstance = null;
function executeDispatch(event, listener, inst) {
  var type = event.type || "unknown-event";
  event.currentTarget = getNodeFromInstance(inst);
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
        for (var eventName in pluginIndex)
          if (
            !publishEventForPlugin(
              pluginIndex[eventName],
              pluginModule,
              eventName
            )
          )
            throw Error(formatProdErrorMessage(98, eventName, pluginName));
      }
    }
}
function publishEventForPlugin(dispatchConfig, pluginModule, eventName) {
  if (eventNameDispatchConfigs.hasOwnProperty(eventName))
    throw Error(formatProdErrorMessage(99, eventName));
  eventNameDispatchConfigs[eventName] = dispatchConfig;
  var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
  if (phasedRegistrationNames) {
    for (var phaseName in phasedRegistrationNames)
      phasedRegistrationNames.hasOwnProperty(phaseName) &&
        publishRegistrationName(
          phasedRegistrationNames[phaseName],
          pluginModule,
          eventName
        );
    return !0;
  }
  return dispatchConfig.registrationName
    ? (publishRegistrationName(
        dispatchConfig.registrationName,
        pluginModule,
        eventName
      ),
      !0)
    : !1;
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
  if ((target = getInstanceFromNode$1(target))) {
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
var dynamicFeatureFlags = require("ReactFeatureFlags"),
  disableInputAttributeSyncing =
    dynamicFeatureFlags.disableInputAttributeSyncing,
  enableTrustedTypesIntegration =
    dynamicFeatureFlags.enableTrustedTypesIntegration,
  enableComponentStackLocations =
    dynamicFeatureFlags.enableComponentStackLocations,
  enableModernEventSystem = dynamicFeatureFlags.enableModernEventSystem,
  enableFilterEmptyStringAttributesDOM =
    dynamicFeatureFlags.enableFilterEmptyStringAttributesDOM,
  enableLegacyFBSupport = dynamicFeatureFlags.enableLegacyFBSupport,
  deferRenderPhaseUpdateToNextBatch =
    dynamicFeatureFlags.deferRenderPhaseUpdateToNextBatch;
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
function batchedUpdates(fn, bookkeeping) {
  if (isInsideEventHandler) return fn(bookkeeping);
  isInsideEventHandler = !0;
  try {
    return batchedUpdatesImpl(fn, bookkeeping);
  } finally {
    (isInsideEventHandler = !1), finishEventHandler();
  }
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
var ReactSharedInternals =
    React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  REACT_ELEMENT_TYPE = 60103,
  REACT_PORTAL_TYPE = 60106,
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
  REACT_RESPONDER_TYPE = 60118,
  REACT_SCOPE_TYPE = 60119,
  REACT_OPAQUE_ID_TYPE = 60128,
  REACT_DEBUG_TRACING_MODE_TYPE = 60129,
  REACT_OFFSCREEN_TYPE = 60130,
  REACT_LEGACY_HIDDEN_TYPE = 60131;
if ("function" === typeof Symbol && Symbol.for) {
  var symbolFor = Symbol.for;
  REACT_ELEMENT_TYPE = symbolFor("react.element");
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
  symbolFor("react.fundamental");
  REACT_RESPONDER_TYPE = symbolFor("react.responder");
  REACT_SCOPE_TYPE = symbolFor("react.scope");
  REACT_OPAQUE_ID_TYPE = symbolFor("react.opaque.id");
  REACT_DEBUG_TRACING_MODE_TYPE = symbolFor("react.debug_trace_mode");
  REACT_OFFSCREEN_TYPE = symbolFor("react.offscreen");
  REACT_LEGACY_HIDDEN_TYPE = symbolFor("react.legacy_hidden");
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
      for (var didFindChild = !1, child$0 = parentA.child; child$0; ) {
        if (child$0 === a) {
          didFindChild = !0;
          a = parentA;
          b = parentB;
          break;
        }
        if (child$0 === b) {
          didFindChild = !0;
          b = parentA;
          a = parentB;
          break;
        }
        child$0 = child$0.sibling;
      }
      if (!didFindChild) {
        for (child$0 = parentB.child; child$0; ) {
          if (child$0 === a) {
            didFindChild = !0;
            a = parentB;
            b = parentA;
            break;
          }
          if (child$0 === b) {
            didFindChild = !0;
            b = parentB;
            a = parentA;
            break;
          }
          child$0 = child$0.sibling;
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
function isFiberSuspenseAndTimedOut(fiber) {
  var memoizedState = fiber.memoizedState;
  return (
    13 === fiber.tag &&
    null !== memoizedState &&
    null === memoizedState.dehydrated
  );
}
function doesFiberContain(parentFiber, childFiber) {
  for (
    var parentFiberAlternate = parentFiber.alternate;
    null !== childFiber;

  ) {
    if (childFiber === parentFiber || childFiber === parentFiberAlternate)
      return !0;
    childFiber = childFiber.return;
  }
  return !1;
}
function isFiberHiddenOrDeletedAndContains(parentFiber, childFiber) {
  var JSCompiler_temp;
  (JSCompiler_temp =
    0 !== (parentFiber.effectTag & 8) &&
    doesFiberContain(parentFiber, childFiber)) ||
    ((JSCompiler_temp = parentFiber.child),
    (JSCompiler_temp =
      isFiberSuspenseAndTimedOut(parentFiber) &&
      null !== JSCompiler_temp &&
      doesFiberContain(JSCompiler_temp, childFiber)));
  return JSCompiler_temp;
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
  );
function forEachAccumulated(arr, cb, scope) {
  Array.isArray(arr) ? arr.forEach(cb, scope) : arr && cb.call(scope, arr);
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
      for (
        var i = 0;
        i < dispatchListeners.length && !e.isPropagationStopped();
        i++
      )
        executeDispatch(e, dispatchListeners[i], dispatchInstances[i]);
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
    forEachAccumulated(events, executeDispatchesAndReleaseTopLevel);
    if (eventQueue) throw Error(formatProdErrorMessage(95));
    rethrowCaughtError();
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
function getListener(inst, registrationName) {
  var stateNode = inst.stateNode;
  if (null === stateNode) return null;
  var props = getFiberCurrentPropsFromNode(stateNode);
  if (null === props) return null;
  stateNode = props[registrationName];
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
  if (stateNode && "function" !== typeof stateNode)
    throw Error(
      formatProdErrorMessage(231, registrationName, typeof stateNode)
    );
  return stateNode;
}
function addEventBubbleListener(target, eventType, listener) {
  target.addEventListener(eventType, listener, !1);
  return listener;
}
function addEventCaptureListener(target, eventType, listener) {
  target.addEventListener(eventType, listener, !0);
  return listener;
}
function addEventCaptureListenerWithPassiveFlag(
  target,
  eventType,
  listener,
  passive
) {
  target.addEventListener(eventType, listener, {
    capture: !0,
    passive: passive
  });
  return listener;
}
function addEventBubbleListenerWithPassiveFlag(
  target,
  eventType,
  listener,
  passive
) {
  target.addEventListener(eventType, listener, { passive: passive });
  return listener;
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
    for (
      var events = null, legacyPlugins = plugins, i = 0;
      i < legacyPlugins.length;
      i++
    ) {
      var possiblePlugin = legacyPlugins[i];
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
  element = addTrappedEventListener(element, topLevelType, 1, !1);
  listenerMap &&
    listenerMap.set(topLevelType, { passive: void 0, listener: element });
}
function legacyTrapCapturedEvent(topLevelType, element, listenerMap) {
  element = addTrappedEventListener(element, topLevelType, 1, !0);
  listenerMap.set(topLevelType, { passive: void 0, listener: element });
}
function addTrappedEventListener(
  targetContainer,
  topLevelType,
  eventSystemFlags,
  capture
) {
  eventSystemFlags = createEventListenerWrapperWithPriority(
    targetContainer,
    topLevelType,
    eventSystemFlags
  );
  return capture
    ? addEventCaptureListener(targetContainer, topLevelType, eventSystemFlags)
    : addEventBubbleListener(targetContainer, topLevelType, eventSystemFlags);
}
function getParent(inst) {
  if (!inst) return null;
  do inst = inst.return;
  while (inst && 5 !== inst.tag);
  return inst ? inst : null;
}
function accumulateDirectionalDispatches(inst, phase, event) {
  if (
    (phase = getListener(
      inst,
      event.dispatchConfig.phasedRegistrationNames[phase]
    ))
  )
    (event._dispatchListeners = accumulateInto(
      event._dispatchListeners,
      phase
    )),
      (event._dispatchInstances = accumulateInto(
        event._dispatchInstances,
        inst
      ));
}
function accumulateTwoPhaseDispatchesSingle(event) {
  if (event && event.dispatchConfig.phasedRegistrationNames) {
    for (var inst = event._targetInst, path = []; inst; )
      path.push(inst), (inst = getParent(inst));
    for (inst = path.length; 0 < inst--; )
      accumulateDirectionalDispatches(path[inst], "captured", event);
    for (inst = 0; inst < path.length; inst++)
      accumulateDirectionalDispatches(path[inst], "bubbled", event);
  }
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
var simpleEventPluginEventTypes = {},
  topLevelEventsToDispatchConfig = new Map(),
  eventPriorities = new Map(),
  otherDiscreteEvents = "change selectionchange textInput compositionstart compositionend compositionupdate".split(
    " "
  );
otherDiscreteEvents.push("beforeblur", "afterblur");
var continuousPairsForSimpleEventPlugin = [
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
  var i$jscomp$inline_291 = 0;
  i$jscomp$inline_291 < otherDiscreteEvents.length;
  i$jscomp$inline_291++
)
  eventPriorities.set(otherDiscreteEvents[i$jscomp$inline_291], 0);
function getEventPriorityForListenerSystem(type) {
  type = eventPriorities.get(type);
  return void 0 !== type ? type : 2;
}
var capturePhaseEvents = new Set(
  "focus blur scroll load abort cancel close invalid reset submit abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  )
);
capturePhaseEvents.add("beforeblur");
capturePhaseEvents.add("afterblur");
var emptyDispatchConfigForCustomEvents = {
  customEvent: !0,
  phasedRegistrationNames: { bubbled: null, captured: null }
};
function executeDispatch$1(event, listener, currentTarget) {
  var type = event.type || "unknown-event";
  event.currentTarget = currentTarget;
  invokeGuardedCallbackAndCatchFirstError(type, listener, void 0, event);
  event.currentTarget = null;
}
function dispatchEventsInBatch(dispatchQueue) {
  for (var i = 0; i < dispatchQueue.length; i++) {
    var dispatchQueueItem = dispatchQueue[i],
      event = dispatchQueueItem.event,
      capture = dispatchQueueItem.capture;
    dispatchQueueItem = dispatchQueueItem.bubble;
    a: {
      for (
        var previousInstance = void 0, i$jscomp$0 = capture.length - 1;
        0 <= i$jscomp$0;
        i$jscomp$0--
      ) {
        var _capture$i = capture[i$jscomp$0],
          instance = _capture$i.instance,
          currentTarget = _capture$i.currentTarget;
        _capture$i = _capture$i.listener;
        if (instance !== previousInstance && event.isPropagationStopped())
          break a;
        executeDispatch$1(event, _capture$i, currentTarget);
        previousInstance = instance;
      }
      previousInstance = void 0;
      for (capture = 0; capture < dispatchQueueItem.length; capture++) {
        currentTarget = dispatchQueueItem[capture];
        i$jscomp$0 = currentTarget.instance;
        instance = currentTarget.currentTarget;
        currentTarget = currentTarget.listener;
        if (i$jscomp$0 !== previousInstance && event.isPropagationStopped())
          break a;
        executeDispatch$1(event, currentTarget, instance);
        previousInstance = i$jscomp$0;
      }
    }
  }
  rethrowCaughtError();
}
function listenToTopLevelEvent(
  topLevelType,
  target,
  listenerMap,
  eventSystemFlags,
  passive,
  priority,
  capture
) {
  "selectionchange" === topLevelType &&
    ((target = target.ownerDocument || target),
    (listenerMap = getEventListenerMap(target)));
  capture = void 0 === capture ? capturePhaseEvents.has(topLevelType) : capture;
  var listenerMapKey = getListenerMapKey(topLevelType, capture),
    listenerEntry = listenerMap.get(listenerMapKey),
    shouldUpgrade =
      void 0 !== listenerEntry && !0 === listenerEntry.passive && !passive;
  if (void 0 === listenerEntry || shouldUpgrade)
    shouldUpgrade &&
      target.removeEventListener(topLevelType, listenerEntry.listener, capture),
      (topLevelType = addTrappedEventListener$1(
        target,
        topLevelType,
        eventSystemFlags,
        capture,
        !1,
        passive,
        priority
      )),
      listenerMap.set(listenerMapKey, {
        passive: passive,
        listener: topLevelType
      });
}
function listenToEvent(registrationName, rootContainerElement) {
  var listenerMap = getEventListenerMap(rootContainerElement);
  registrationName = registrationNameDependencies[registrationName];
  for (var i = 0; i < registrationName.length; i++)
    listenToTopLevelEvent(
      registrationName[i],
      rootContainerElement,
      listenerMap,
      1
    );
}
function addTrappedEventListener$1(
  targetContainer,
  topLevelType,
  eventSystemFlags,
  capture,
  isDeferredListenerForLegacyFBSupport,
  passive,
  priority
) {
  eventSystemFlags = createEventListenerWrapperWithPriority(
    targetContainer,
    topLevelType,
    eventSystemFlags,
    priority
  );
  !0 !== passive || passiveBrowserEventsSupported || (passive = !1);
  targetContainer =
    enableLegacyFBSupport && isDeferredListenerForLegacyFBSupport
      ? targetContainer.ownerDocument
      : targetContainer;
  var unsubscribeListener;
  if (enableLegacyFBSupport && isDeferredListenerForLegacyFBSupport) {
    var originalListener = eventSystemFlags;
    eventSystemFlags = function() {
      try {
        for (
          var _len = arguments.length, p = Array(_len), _key = 0;
          _key < _len;
          _key++
        )
          p[_key] = arguments[_key];
        return originalListener.apply(this, p);
      } finally {
        targetContainer.removeEventListener(
          topLevelType,
          unsubscribeListener,
          capture
        );
      }
    };
  }
  return (unsubscribeListener = capture
    ? void 0 !== passive
      ? addEventCaptureListenerWithPassiveFlag(
          targetContainer,
          topLevelType,
          eventSystemFlags,
          passive
        )
      : addEventCaptureListener(targetContainer, topLevelType, eventSystemFlags)
    : void 0 !== passive
    ? addEventBubbleListenerWithPassiveFlag(
        targetContainer,
        topLevelType,
        eventSystemFlags,
        passive
      )
    : addEventBubbleListener(targetContainer, topLevelType, eventSystemFlags));
}
function dispatchEventForPluginEventSystem(
  topLevelType,
  eventSystemFlags,
  nativeEvent,
  targetInst$jscomp$0,
  targetContainer
) {
  var ancestorInst = targetInst$jscomp$0;
  if (eventSystemFlags & 4) ancestorInst = null;
  else {
    var JSCompiler_temp;
    if (
      (JSCompiler_temp =
        enableLegacyFBSupport &&
        0 === (eventSystemFlags & 128) &&
        0 === (eventSystemFlags & 32))
    )
      "click" !== topLevelType
        ? (JSCompiler_temp = !1)
        : (addTrappedEventListener$1(
            targetContainer,
            topLevelType,
            129,
            !1,
            !0
          ),
          (JSCompiler_temp = !0));
    if (JSCompiler_temp) return;
    if (null !== targetInst$jscomp$0)
      a: for (;;) {
        if (null === targetInst$jscomp$0) return;
        var nodeTag = targetInst$jscomp$0.tag;
        if (3 === nodeTag || 4 === nodeTag) {
          JSCompiler_temp = targetInst$jscomp$0.stateNode.containerInfo;
          if (
            JSCompiler_temp === targetContainer ||
            (8 === JSCompiler_temp.nodeType &&
              JSCompiler_temp.parentNode === targetContainer)
          )
            break;
          if (4 === nodeTag)
            for (nodeTag = targetInst$jscomp$0.return; null !== nodeTag; ) {
              var grandTag = nodeTag.tag;
              if (3 === grandTag || 4 === grandTag)
                if (
                  ((grandTag = nodeTag.stateNode.containerInfo),
                  grandTag === targetContainer ||
                    (8 === grandTag.nodeType &&
                      grandTag.parentNode === targetContainer))
                )
                  return;
              nodeTag = nodeTag.return;
            }
          for (; null !== JSCompiler_temp; ) {
            nodeTag = getClosestInstanceFromNode(JSCompiler_temp);
            if (null === nodeTag) return;
            grandTag = nodeTag.tag;
            if (5 === grandTag || 6 === grandTag) {
              targetInst$jscomp$0 = ancestorInst = nodeTag;
              continue a;
            }
            JSCompiler_temp = JSCompiler_temp.parentNode;
          }
        }
        targetInst$jscomp$0 = targetInst$jscomp$0.return;
      }
  }
  batchedEventUpdates(function() {
    for (
      var targetInst = ancestorInst,
        modernPlugins = plugins,
        nativeEventTarget = getEventTarget(nativeEvent),
        dispatchQueue = [],
        i = 0;
      i < modernPlugins.length;
      i++
    )
      modernPlugins[i].extractEvents(
        dispatchQueue,
        topLevelType,
        targetInst,
        nativeEvent,
        nativeEventTarget,
        eventSystemFlags,
        targetContainer
      );
    dispatchEventsInBatch(dispatchQueue);
  });
}
function createDispatchQueueItemPhaseEntry(instance, listener, currentTarget) {
  return {
    instance: instance,
    listener: listener,
    currentTarget: currentTarget
  };
}
function accumulateTwoPhaseListeners(
  targetFiber,
  dispatchQueue,
  event,
  accumulateEventHandleListeners
) {
  var phasedRegistrationNames = event.dispatchConfig.phasedRegistrationNames,
    capturePhase = [],
    bubblePhase = [],
    bubbled = phasedRegistrationNames.bubbled;
  phasedRegistrationNames = phasedRegistrationNames.captured;
  for (
    var lastHostComponent = null, targetType = event.type;
    null !== targetFiber;

  ) {
    var _instance = targetFiber,
      stateNode = _instance.stateNode;
    _instance = _instance.tag;
    if (5 === _instance && null !== stateNode) {
      lastHostComponent = stateNode;
      if (
        accumulateEventHandleListeners &&
        ((_instance = stateNode[internalEventHandlerListenersKey] || null),
        null !== _instance)
      ) {
        _instance = Array.from(_instance);
        for (var i = 0; i < _instance.length; i++) {
          var listener = _instance[i],
            callback = listener.callback,
            capture = listener.capture;
          listener.type === targetType &&
            (!0 === capture
              ? capturePhase.push(
                  createDispatchQueueItemPhaseEntry(
                    targetFiber,
                    callback,
                    stateNode
                  )
                )
              : bubblePhase.push(
                  createDispatchQueueItemPhaseEntry(
                    targetFiber,
                    callback,
                    stateNode
                  )
                ));
        }
      }
      null !== phasedRegistrationNames &&
        ((_instance = getListener(targetFiber, phasedRegistrationNames)),
        null != _instance &&
          capturePhase.push(
            createDispatchQueueItemPhaseEntry(targetFiber, _instance, stateNode)
          ));
      null !== bubbled &&
        ((_instance = getListener(targetFiber, bubbled)),
        null != _instance &&
          bubblePhase.push(
            createDispatchQueueItemPhaseEntry(targetFiber, _instance, stateNode)
          ));
    } else if (
      accumulateEventHandleListeners &&
      21 === _instance &&
      null !== lastHostComponent &&
      ((_instance = stateNode[internalEventHandlerListenersKey] || null),
      (stateNode = lastHostComponent),
      null !== _instance)
    )
      for (_instance = Array.from(_instance), i = 0; i < _instance.length; i++)
        (listener = _instance[i]),
          (callback = listener.callback),
          (capture = listener.capture),
          listener.type === targetType &&
            (!0 === capture
              ? capturePhase.push(
                  createDispatchQueueItemPhaseEntry(
                    targetFiber,
                    callback,
                    stateNode
                  )
                )
              : bubblePhase.push(
                  createDispatchQueueItemPhaseEntry(
                    targetFiber,
                    callback,
                    stateNode
                  )
                ));
    targetFiber = targetFiber.return;
  }
  (0 === capturePhase.length && 0 === bubblePhase.length) ||
    dispatchQueue.push({
      event: event,
      capture: capturePhase,
      bubble: bubblePhase
    });
}
function getParent$1(inst) {
  if (null === inst) return null;
  do inst = inst.return;
  while (inst && 5 !== inst.tag);
  return inst ? inst : null;
}
function accumulateEnterLeaveListenersForEvent(
  dispatchQueue,
  event,
  target,
  common,
  capture
) {
  var registrationName = event.dispatchConfig.registrationName;
  if (void 0 !== registrationName) {
    for (
      var capturePhase = [], bubblePhase = [];
      null !== target && target !== common;

    ) {
      var _instance2 = target,
        alternate = _instance2.alternate,
        stateNode = _instance2.stateNode;
      if (null !== alternate && alternate === common) break;
      5 === _instance2.tag &&
        null !== stateNode &&
        ((_instance2 = stateNode),
        capture
          ? ((alternate = getListener(target, registrationName)),
            null != alternate &&
              capturePhase.push(
                createDispatchQueueItemPhaseEntry(target, alternate, _instance2)
              ))
          : ((alternate = getListener(target, registrationName)),
            null != alternate &&
              bubblePhase.push(
                createDispatchQueueItemPhaseEntry(target, alternate, _instance2)
              )));
      target = target.return;
    }
    (0 === capturePhase.length && 0 === bubblePhase.length) ||
      dispatchQueue.push({
        event: event,
        capture: capturePhase,
        bubble: bubblePhase
      });
  }
}
function clearEventHandleListenersForTarget(target) {
  var listeners = target[internalEventHandlerListenersKey] || null;
  if (null !== listeners) {
    listeners = Array.from(listeners);
    for (var i = 0; i < listeners.length; i++) listeners[i].destroy(target);
  }
}
function getListenerMapKey(topLevelType, capture) {
  return topLevelType + "__" + (capture ? "capture" : "bubble");
}
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
  enableModernEventSystem ||
    legacyListenToTopLevelEvent(topLevelType, document, listenerMap);
  var activeEventKey = topLevelType + "_active";
  listenerMap.has(activeEventKey) ||
    ((topLevelType = addResponderEventSystemEvent(document, topLevelType, !1)),
    listenerMap.set(activeEventKey, { passive: !1, listener: topLevelType }));
}
function eagerlyTrapReplayableEvents(container, document) {
  var listenerMapForDoc = getEventListenerMap(document),
    listenerMapForContainer;
  enableModernEventSystem &&
    (listenerMapForContainer = getEventListenerMap(container));
  discreteReplayableEvents.forEach(function(topLevelType) {
    enableModernEventSystem &&
      listenToTopLevelEvent(
        topLevelType,
        container,
        listenerMapForContainer,
        1
      );
    trapReplayableEventForDocument(topLevelType, document, listenerMapForDoc);
  });
  continuousReplayableEvents.forEach(function(topLevelType) {
    enableModernEventSystem &&
      listenToTopLevelEvent(
        topLevelType,
        container,
        listenerMapForContainer,
        1
      );
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
    targetContainers: [targetContainer]
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
      topLevelType = getInstanceFromNode$1(blockedOn.blockedOn);
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
        ((blockedOn = getInstanceFromNode$1(blockedOn)),
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
        (targetContainers = getInstanceFromNode$1(nextBlockedOn)),
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
      nextDiscreteEvent = getInstanceFromNode$1(nextDiscreteEvent.blockedOn);
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
var UserBlockingPriority = Scheduler.unstable_UserBlockingPriority,
  runWithPriority = Scheduler.unstable_runWithPriority,
  _enabled = !0;
function createEventListenerWrapperWithPriority(
  targetContainer,
  topLevelType,
  eventSystemFlags,
  priority
) {
  void 0 === priority &&
    ((priority = eventPriorities.get(topLevelType)),
    (priority = void 0 === priority ? 2 : priority));
  switch (priority) {
    case 0:
      priority = dispatchDiscreteEvent;
      break;
    case 1:
      priority = dispatchUserBlockingUpdate;
      break;
    default:
      priority = dispatchEvent;
  }
  return priority.bind(null, topLevelType, eventSystemFlags, targetContainer);
}
function dispatchDiscreteEvent(
  topLevelType,
  eventSystemFlags,
  container,
  nativeEvent
) {
  (enableLegacyFBSupport && 0 !== (eventSystemFlags & 128)) ||
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
  runWithPriority(
    UserBlockingPriority,
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
        if (eventSystemFlags & 1)
          if (enableModernEventSystem)
            dispatchEventForPluginEventSystem(
              topLevelType,
              eventSystemFlags,
              nativeEvent,
              null,
              targetContainer
            );
          else {
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
  var nativeEventTarget = getEventTarget(nativeEvent),
    targetInst = getClosestInstanceFromNode(nativeEventTarget);
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
  if (eventSystemFlags & 1)
    if (enableModernEventSystem)
      dispatchEventForPluginEventSystem(
        topLevelType,
        eventSystemFlags,
        nativeEvent,
        targetInst,
        targetContainer
      );
    else {
      targetContainer = getTopLevelCallbackBookKeeping(
        topLevelType,
        nativeEvent,
        targetInst,
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
      targetInst,
      nativeEvent,
      nativeEventTarget,
      eventSystemFlags
    );
  return null;
}
var UserBlockingPriority$1 = Scheduler.unstable_UserBlockingPriority,
  runWithPriority$1 = Scheduler.unstable_runWithPriority,
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
          runWithPriority$1(UserBlockingPriority$1, function() {
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
                ((JSCompiler_inline_result = target.dependencies_new),
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
      var isPassiveEvent = 0 !== (eventSystemFlags & 8),
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
        eventPointerType = buttons.tag;
        var dependencies = buttons.dependencies_new;
        if (4 === eventPointerType) pointerType = !0;
        else if (
          (5 === eventPointerType || 21 === eventPointerType) &&
          null !== dependencies &&
          ((eventPointerType = dependencies.responders),
          null !== eventPointerType)
        ) {
          eventPointerType = Array.from(eventPointerType.values());
          dependencies = 0;
          for (
            var length = eventPointerType.length;
            dependencies < length;
            dependencies++
          ) {
            var responderInstance = eventPointerType[dependencies],
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
            (dependencies = buttons.responder.onRootEvent),
            null !== dependencies &&
              ((currentInstance = buttons),
              dependencies(
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
function addResponderEventSystemEvent(document, topLevelType, passive) {
  var eventFlags = 2;
  passive &&
    (passiveBrowserEventsSupported
      ? (eventFlags |= 8)
      : ((eventFlags |= 16), (passive = !1)));
  eventFlags = dispatchEvent.bind(null, topLevelType, eventFlags, document);
  return passiveBrowserEventsSupported
    ? addEventCaptureListenerWithPassiveFlag(
        document,
        topLevelType,
        eventFlags,
        passive
      )
    : addEventCaptureListener(document, topLevelType, eventFlags);
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
var isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
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
          : node.setAttribute(
              name,
              enableTrustedTypesIntegration ? value : "" + value
            ));
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
        ((value = enableTrustedTypesIntegration ? value : "" + value),
        JSCompiler_inline_result.sanitizeURL &&
          isJavaScriptProtocol.test(value.toString()))
      )
        throw Error(formatProdErrorMessage(323));
      isCustomComponentTag
        ? node.setAttributeNS(isCustomComponentTag, name, value)
        : node.setAttribute(name, value);
    }
}
var prefix;
function describeBuiltInComponentFrame(name, source) {
  if (enableComponentStackLocations) {
    if (void 0 === prefix)
      try {
        throw Error();
      } catch (x) {
        prefix =
          ((source = x.stack.trim().match(/\n( *(at )?)/)) && source[1]) || "";
      }
    return "\n" + prefix + name;
  }
  return describeComponentFrame(name, source, null);
}
var reentry = !1;
function describeNativeComponentFrame(fn, construct) {
  if (!fn || reentry) return "";
  reentry = !0;
  var previousPrepareStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (construct)
      if (
        ((construct = function() {
          throw Error();
        }),
        Object.defineProperty(construct.prototype, "props", {
          set: function() {
            throw Error();
          }
        }),
        "object" === typeof Reflect && Reflect.construct)
      ) {
        try {
          Reflect.construct(construct, []);
        } catch (x) {
          var control = x;
        }
        Reflect.construct(fn, [], construct);
      } else {
        try {
          construct.call();
        } catch (x$30) {
          control = x$30;
        }
        fn.call(construct.prototype);
      }
    else {
      try {
        throw Error();
      } catch (x$31) {
        control = x$31;
      }
      fn();
    }
  } catch (sample) {
    if (sample && control && "string" === typeof sample.stack) {
      for (
        var sampleLines = sample.stack.split("\n"),
          controlLines = control.stack.split("\n"),
          s = sampleLines.length - 1,
          c = controlLines.length - 1;
        1 <= s && 0 <= c && sampleLines[s] !== controlLines[c];

      )
        c--;
      for (; 1 <= s && 0 <= c; s--, c--)
        if (sampleLines[s] !== controlLines[c]) {
          if (1 !== s || 1 !== c) {
            do
              if ((s--, c--, 0 > c || sampleLines[s] !== controlLines[c]))
                return "\n" + sampleLines[s].replace(" at new ", " at ");
            while (1 <= s && 0 <= c);
          }
          break;
        }
    }
  } finally {
    (reentry = !1), (Error.prepareStackTrace = previousPrepareStackTrace);
  }
  return (fn = fn ? fn.displayName || fn.name : "")
    ? describeBuiltInComponentFrame(fn)
    : "";
}
function describeComponentFrame(name, source, ownerName) {
  source = "";
  ownerName && (source = " (created by " + ownerName + ")");
  return "\n    in " + (name || "Unknown") + source;
}
function describeFunctionComponentFrame(fn, source) {
  return enableComponentStackLocations
    ? describeNativeComponentFrame(fn, !1)
    : fn
    ? describeComponentFrame(fn.displayName || fn.name || null, source, null)
    : "";
}
function describeFiber(fiber) {
  switch (fiber.tag) {
    case 5:
      return describeBuiltInComponentFrame(fiber.type, null);
    case 16:
      return describeBuiltInComponentFrame("Lazy", null);
    case 13:
      return describeBuiltInComponentFrame("Suspense", null);
    case 19:
      return describeBuiltInComponentFrame("SuspenseList", null);
    case 0:
    case 2:
    case 15:
      return describeFunctionComponentFrame(fiber.type, null);
    case 11:
      return describeFunctionComponentFrame(fiber.type.render, null);
    case 22:
      return describeFunctionComponentFrame(fiber.type._render, null);
    case 1:
      return (
        (fiber = fiber.type),
        (fiber = enableComponentStackLocations
          ? describeNativeComponentFrame(fiber, !0)
          : describeFunctionComponentFrame(fiber, null)),
        fiber
      );
    default:
      return "";
  }
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
  disableInputAttributeSyncing
    ? props.hasOwnProperty("defaultValue") &&
      setDefaultValue(element, props.type, getToStringValue(props.defaultValue))
    : props.hasOwnProperty("value")
    ? setDefaultValue(element, props.type, value)
    : props.hasOwnProperty("defaultValue") &&
      setDefaultValue(
        element,
        props.type,
        getToStringValue(props.defaultValue)
      );
  disableInputAttributeSyncing
    ? null == props.defaultChecked
      ? element.removeAttribute("checked")
      : (element.defaultChecked = !!props.defaultChecked)
    : null == props.checked &&
      null != props.defaultChecked &&
      (element.defaultChecked = !!props.defaultChecked);
}
function postMountWrapper(element, props, isHydrating) {
  if (props.hasOwnProperty("value") || props.hasOwnProperty("defaultValue")) {
    var type = props.type;
    if (
      (type = "submit" === type || "reset" === type) &&
      (void 0 === props.value || null === props.value)
    )
      return;
    var initialValue = "" + element._wrapperState.initialValue;
    if (!isHydrating)
      if (disableInputAttributeSyncing) {
        var value = getToStringValue(props.value);
        null == value ||
          (!type && value === element.value) ||
          (element.value = "" + value);
      } else initialValue !== element.value && (element.value = initialValue);
    disableInputAttributeSyncing
      ? ((type = getToStringValue(props.defaultValue)),
        null != type && (element.defaultValue = "" + type))
      : (element.defaultValue = initialValue);
  }
  type = element.name;
  "" !== type && (element.name = "");
  disableInputAttributeSyncing
    ? (isHydrating || updateChecked(element, props),
      props.hasOwnProperty("defaultChecked") &&
        ((element.defaultChecked = !element.defaultChecked),
        (element.defaultChecked = !!props.defaultChecked)))
    : (element.defaultChecked = !!element._wrapperState.initialChecked);
  "" !== type && (element.name = type);
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
      throw Error(formatProdErrorMessage(137, tag));
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
      throw Error(formatProdErrorMessage(62));
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
  if (enableModernEventSystem) {
    rootContainerInstance =
      8 === rootContainerInstance.nodeType
        ? rootContainerInstance.parentNode
        : rootContainerInstance;
    if (null == rootContainerInstance || 1 !== rootContainerInstance.nodeType)
      throw Error(formatProdErrorMessage(348));
    listenToEvent(registrationName, rootContainerInstance);
  } else {
    rootContainerInstance =
      9 === rootContainerInstance.nodeType ||
      11 === rootContainerInstance.nodeType
        ? rootContainerInstance
        : rootContainerInstance.ownerDocument;
    var listenerMap = getEventListenerMap(rootContainerInstance);
    registrationName = registrationNameDependencies[registrationName];
    for (var i = 0; i < registrationName.length; i++)
      legacyListenToTopLevelEvent(
        registrationName[i],
        rootContainerInstance,
        listenerMap
      );
  }
}
function noop() {}
function listenToEventResponderEventTypes(eventTypes, document) {
  for (
    var listenerMap = getEventListenerMap(document),
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
  } catch (e$35) {
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
function createEvent(type) {
  var event = document.createEvent("Event");
  event.initEvent(type, !1, !1);
  return event;
}
function dispatchBeforeDetachedBlur(target) {
  var event = createEvent("beforeblur");
  target.dispatchEvent(event);
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
function clearContainer(container) {
  1 === container.nodeType
    ? (container.textContent = "")
    : 9 === container.nodeType &&
      ((container = container.body),
      null != container && (container.textContent = ""));
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
var clientId = 0;
function makeOpaqueHydratingObject(attemptToReadValue) {
  return {
    $$typeof: REACT_OPAQUE_ID_TYPE,
    toString: attemptToReadValue,
    valueOf: attemptToReadValue
  };
}
var randomKey = Math.random()
    .toString(36)
    .slice(2),
  internalInstanceKey = "__reactFiber$" + randomKey,
  internalPropsKey = "__reactProps$" + randomKey,
  internalContainerInstanceKey = "__reactContainer$" + randomKey,
  internalEventHandlersKey = "__reactEvents$" + randomKey,
  internalEventHandlerListenersKey = "__reactListeners$" + randomKey;
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
function getInstanceFromNode$1(node) {
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
function getFiberCurrentPropsFromNode(node) {
  return node[internalPropsKey] || null;
}
function getEventListenerMap(node) {
  var elementListenerMap = node[internalEventHandlersKey];
  void 0 === elementListenerMap &&
    (elementListenerMap = node[internalEventHandlersKey] = new Map());
  return elementListenerMap;
}
var root = null,
  startText = null,
  fallbackText = null;
function initialize(nativeEventTarget) {
  root = nativeEventTarget;
  startText = "value" in root ? root.value : root.textContent;
  return !0;
}
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
  enableModernEventSystem ||
    (this._dispatchInstances = this._dispatchListeners = null);
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
    enableModernEventSystem || (this.isPersistent = functionThatReturnsTrue);
  },
  isPersistent: enableModernEventSystem
    ? functionThatReturnsTrue
    : functionThatReturnsFalse,
  destructor: function() {
    if (!enableModernEventSystem) {
      var Interface = this.constructor.Interface,
        propName;
      for (propName in Interface) this[propName] = null;
      this.nativeEvent = this._targetInst = this.dispatchConfig = null;
      this.isPropagationStopped = this.isDefaultPrevented = functionThatReturnsFalse;
      this._dispatchInstances = this._dispatchListeners = null;
    }
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
function createOrGetPooledEvent(
  dispatchConfig,
  targetInst,
  nativeEvent,
  nativeInst
) {
  if (!enableModernEventSystem && this.eventPool.length) {
    var instance = this.eventPool.pop();
    this.call(instance, dispatchConfig, targetInst, nativeEvent, nativeInst);
    return instance;
  }
  return new this(dispatchConfig, targetInst, nativeEvent, nativeInst);
}
function releasePooledEvent(event) {
  if (!enableModernEventSystem) {
    if (!(event instanceof this)) throw Error(formatProdErrorMessage(279));
    event.destructor();
    10 > this.eventPool.length && this.eventPool.push(event);
  }
}
function addEventPoolingTo(EventConstructor) {
  EventConstructor.getPooled = createOrGetPooledEvent;
  enableModernEventSystem ||
    ((EventConstructor.eventPool = []),
    (EventConstructor.release = releasePooledEvent));
}
var SyntheticCompositionEvent = SyntheticEvent.extend({ data: null }),
  SyntheticInputEvent = SyntheticEvent.extend({ data: null }),
  END_KEYCODES = [9, 13, 27, 32],
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
              : (isComposing = initialize(nativeEventTarget))),
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
          forEachAccumulated(eventType, accumulateTwoPhaseDispatchesSingle),
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
          forEachAccumulated(targetInst, accumulateTwoPhaseDispatchesSingle))
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
  forEachAccumulated(inst, accumulateTwoPhaseDispatchesSingle);
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
  "value" === nativeEvent.propertyName &&
    getInstIfValueChanged(activeElementInst) &&
    ((nativeEvent = createAndAccumulateChangeEvent(
      activeElementInst,
      nativeEvent,
      getEventTarget(nativeEvent)
    )),
    batchedUpdates(runEventInBatch, nativeEvent));
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
        (disableInputAttributeSyncing ||
          setDefaultValue(targetNode, "number", targetNode.value));
    }
  },
  SyntheticUIEvent = SyntheticEvent.extend({ view: null, detail: null }),
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
      forEachAccumulated(nativeEvent, accumulateTwoPhaseDispatchesSingle),
      nativeEvent);
}
var SelectEventPlugin = {
    eventTypes: eventTypes$3,
    extractEvents: function(
      topLevelType,
      targetInst,
      nativeEvent,
      nativeEventTarget
    ) {
      var doc =
          nativeEventTarget.window === nativeEventTarget
            ? nativeEventTarget.document
            : 9 === nativeEventTarget.nodeType
            ? nativeEventTarget
            : nativeEventTarget.ownerDocument,
        JSCompiler_temp;
      if (!(JSCompiler_temp = !doc)) {
        a: {
          JSCompiler_temp = registrationNameDependencies.onSelect;
          doc = getEventListenerMap(doc);
          for (var i = 0; i < JSCompiler_temp.length; i++)
            if (!doc.has(JSCompiler_temp[i])) {
              JSCompiler_temp = !1;
              break a;
            }
          JSCompiler_temp = !0;
        }
        JSCompiler_temp = !JSCompiler_temp;
      }
      if (JSCompiler_temp) return null;
      JSCompiler_temp = targetInst ? getNodeFromInstance$1(targetInst) : window;
      switch (topLevelType) {
        case "focus":
          if (
            isTextInputElement(JSCompiler_temp) ||
            "true" === JSCompiler_temp.contentEditable
          )
            (activeElement$1 = JSCompiler_temp),
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
    code: null,
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
      forEachAccumulated(targetInst, accumulateTwoPhaseDispatchesSingle);
      return targetInst;
    }
  },
  END_KEYCODES$1 = [9, 13, 27, 32],
  canUseCompositionEvent$1 = canUseDOM && "CompositionEvent" in window,
  documentMode$1 = null;
canUseDOM &&
  "documentMode" in document &&
  (documentMode$1 = document.documentMode);
var canUseTextInputEvent$1 =
    canUseDOM && "TextEvent" in window && !documentMode$1,
  useFallbackCompositionData$1 =
    canUseDOM &&
    (!canUseCompositionEvent$1 ||
      (documentMode$1 && 8 < documentMode$1 && 11 >= documentMode$1)),
  SPACEBAR_CHAR$1 = String.fromCharCode(32),
  eventTypes$4 = {
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
  hasSpaceKeypress$1 = !1;
function isFallbackCompositionEnd$1(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case "keyup":
      return -1 !== END_KEYCODES$1.indexOf(nativeEvent.keyCode);
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
function getDataFromCustomEvent$1(nativeEvent) {
  nativeEvent = nativeEvent.detail;
  return "object" === typeof nativeEvent && "data" in nativeEvent
    ? nativeEvent.data
    : null;
}
var isComposing$1 = !1;
function getNativeBeforeInputChars$1(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case "compositionend":
      return getDataFromCustomEvent$1(nativeEvent);
    case "keypress":
      if (32 !== nativeEvent.which) return null;
      hasSpaceKeypress$1 = !0;
      return SPACEBAR_CHAR$1;
    case "textInput":
      return (
        (topLevelType = nativeEvent.data),
        topLevelType === SPACEBAR_CHAR$1 && hasSpaceKeypress$1
          ? null
          : topLevelType
      );
    default:
      return null;
  }
}
function getFallbackBeforeInputChars$1(topLevelType, nativeEvent) {
  if (isComposing$1)
    return "compositionend" === topLevelType ||
      (!canUseCompositionEvent$1 &&
        isFallbackCompositionEnd$1(topLevelType, nativeEvent))
      ? ((topLevelType = getData()),
        (fallbackText = startText = root = null),
        (isComposing$1 = !1),
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
      return useFallbackCompositionData$1 && "ko" !== nativeEvent.locale
        ? null
        : nativeEvent.data;
    default:
      return null;
  }
}
var BeforeInputEventPlugin$1 = {
    eventTypes: eventTypes$4,
    extractEvents: function(
      dispatchQueue,
      topLevelType,
      targetInst,
      nativeEvent,
      nativeEventTarget
    ) {
      var fallbackData;
      if (canUseCompositionEvent$1)
        b: {
          switch (topLevelType) {
            case "compositionstart":
              var eventType = eventTypes$4.compositionStart;
              break b;
            case "compositionend":
              eventType = eventTypes$4.compositionEnd;
              break b;
            case "compositionupdate":
              eventType = eventTypes$4.compositionUpdate;
              break b;
          }
          eventType = void 0;
        }
      else
        isComposing$1
          ? isFallbackCompositionEnd$1(topLevelType, nativeEvent) &&
            (eventType = eventTypes$4.compositionEnd)
          : "keydown" === topLevelType &&
            229 === nativeEvent.keyCode &&
            (eventType = eventTypes$4.compositionStart);
      eventType &&
        (useFallbackCompositionData$1 &&
          "ko" !== nativeEvent.locale &&
          (isComposing$1 || eventType !== eventTypes$4.compositionStart
            ? eventType === eventTypes$4.compositionEnd &&
              isComposing$1 &&
              (fallbackData = getData())
            : (isComposing$1 = initialize(nativeEventTarget))),
        (eventType = SyntheticCompositionEvent.getPooled(
          eventType,
          null,
          nativeEvent,
          nativeEventTarget
        )),
        accumulateTwoPhaseListeners(targetInst, dispatchQueue, eventType),
        fallbackData
          ? (eventType.data = fallbackData)
          : ((fallbackData = getDataFromCustomEvent$1(nativeEvent)),
            null !== fallbackData && (eventType.data = fallbackData)));
      if (
        (topLevelType = canUseTextInputEvent$1
          ? getNativeBeforeInputChars$1(topLevelType, nativeEvent)
          : getFallbackBeforeInputChars$1(topLevelType, nativeEvent))
      )
        (nativeEvent = SyntheticInputEvent.getPooled(
          eventTypes$4.beforeInput,
          null,
          nativeEvent,
          nativeEventTarget
        )),
          accumulateTwoPhaseListeners(targetInst, dispatchQueue, nativeEvent),
          (nativeEvent.data = topLevelType);
    }
  },
  eventTypes$5 = {
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
function createAndAccumulateChangeEvent$1(
  dispatchQueue,
  inst,
  nativeEvent,
  target
) {
  nativeEvent = SyntheticEvent.getPooled(
    eventTypes$5.change,
    null,
    nativeEvent,
    target
  );
  nativeEvent.type = "change";
  enqueueStateRestore(target);
  accumulateTwoPhaseListeners(inst, dispatchQueue, nativeEvent);
  return nativeEvent;
}
var activeElement$2 = null,
  activeElementInst$2 = null;
function runEventInBatch$1(event) {
  dispatchEventsInBatch([event]);
}
function getInstIfValueChanged$1(targetInst) {
  var targetNode = getNodeFromInstance$1(targetInst);
  if (updateValueIfChanged(targetNode)) return targetInst;
}
function getTargetInstForChangeEvent$1(topLevelType, targetInst) {
  if ("change" === topLevelType) return targetInst;
}
var isInputEventSupported$1 = !1;
canUseDOM &&
  (isInputEventSupported$1 =
    isEventSupported("input") &&
    (!document.documentMode || 9 < document.documentMode));
function stopWatchingForValueChange$1() {
  activeElement$2 &&
    (activeElement$2.detachEvent("onpropertychange", handlePropertyChange$1),
    (activeElementInst$2 = activeElement$2 = null));
}
function handlePropertyChange$1(nativeEvent) {
  "value" === nativeEvent.propertyName &&
    getInstIfValueChanged$1(activeElementInst$2) &&
    ((nativeEvent = createAndAccumulateChangeEvent$1(
      activeElementInst$2,
      nativeEvent,
      getEventTarget(nativeEvent)
    )),
    batchedUpdates(runEventInBatch$1, nativeEvent));
}
function handleEventsForInputEventPolyfill$1(topLevelType, target, targetInst) {
  "focus" === topLevelType
    ? (stopWatchingForValueChange$1(),
      (activeElement$2 = target),
      (activeElementInst$2 = targetInst),
      activeElement$2.attachEvent("onpropertychange", handlePropertyChange$1))
    : "blur" === topLevelType && stopWatchingForValueChange$1();
}
function getTargetInstForInputEventPolyfill$1(topLevelType) {
  if (
    "selectionchange" === topLevelType ||
    "keyup" === topLevelType ||
    "keydown" === topLevelType
  )
    return getInstIfValueChanged$1(activeElementInst$2);
}
function getTargetInstForClickEvent$1(topLevelType, targetInst) {
  if ("click" === topLevelType) return getInstIfValueChanged$1(targetInst);
}
function getTargetInstForInputOrChangeEvent$1(topLevelType, targetInst) {
  if ("input" === topLevelType || "change" === topLevelType)
    return getInstIfValueChanged$1(targetInst);
}
var ChangeEventPlugin$1 = {
    eventTypes: eventTypes$5,
    _isInputEventSupported: isInputEventSupported$1,
    extractEvents: function(
      dispatchQueue,
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
        var getTargetInstFunc = getTargetInstForChangeEvent$1;
      else if (isTextInputElement(targetNode))
        if (isInputEventSupported$1)
          getTargetInstFunc = getTargetInstForInputOrChangeEvent$1;
        else {
          getTargetInstFunc = getTargetInstForInputEventPolyfill$1;
          var handleEventFunc = handleEventsForInputEventPolyfill$1;
        }
      else
        (nodeName = targetNode.nodeName) &&
          "input" === nodeName.toLowerCase() &&
          ("checkbox" === targetNode.type || "radio" === targetNode.type) &&
          (getTargetInstFunc = getTargetInstForClickEvent$1);
      if (
        getTargetInstFunc &&
        (getTargetInstFunc = getTargetInstFunc(topLevelType, targetInst))
      ) {
        createAndAccumulateChangeEvent$1(
          dispatchQueue,
          getTargetInstFunc,
          nativeEvent,
          nativeEventTarget
        );
        return;
      }
      handleEventFunc && handleEventFunc(topLevelType, targetNode, targetInst);
      "blur" === topLevelType &&
        (dispatchQueue = targetNode._wrapperState) &&
        dispatchQueue.controlled &&
        "number" === targetNode.type &&
        (disableInputAttributeSyncing ||
          setDefaultValue(targetNode, "number", targetNode.value));
    }
  },
  eventTypes$6 = {
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
  EnterLeaveEventPlugin$1 = {
    eventTypes: eventTypes$6,
    extractEvents: function(
      dispatchQueue,
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
        isOverEvent &&
        0 === (eventSystemFlags & 32) &&
        (eventSystemFlags =
          nativeEvent.relatedTarget || nativeEvent.fromElement) &&
        null !== getClosestInstanceFromNode(eventSystemFlags)
      )
        return;
      if (isOutEvent || isOverEvent) {
        eventSystemFlags =
          nativeEventTarget.window === nativeEventTarget
            ? nativeEventTarget
            : (isOverEvent = nativeEventTarget.ownerDocument)
            ? isOverEvent.defaultView || isOverEvent.parentWindow
            : window;
        if (isOutEvent) {
          if (
            ((isOverEvent = nativeEvent.relatedTarget || nativeEvent.toElement),
            (isOutEvent = targetInst),
            (isOverEvent = isOverEvent
              ? getClosestInstanceFromNode(isOverEvent)
              : null),
            null !== isOverEvent)
          ) {
            var nearestMounted = getNearestMountedFiber(isOverEvent);
            if (
              isOverEvent !== nearestMounted ||
              (5 !== isOverEvent.tag && 6 !== isOverEvent.tag)
            )
              isOverEvent = null;
          }
        } else (isOutEvent = null), (isOverEvent = targetInst);
        if (isOutEvent !== isOverEvent) {
          if ("mouseout" === topLevelType || "mouseover" === topLevelType) {
            var eventInterface = SyntheticMouseEvent;
            var leaveEventType = eventTypes$6.mouseLeave;
            var enterEventType = eventTypes$6.mouseEnter;
            var eventTypePrefix = "mouse";
          } else if (
            "pointerout" === topLevelType ||
            "pointerover" === topLevelType
          )
            (eventInterface = SyntheticPointerEvent),
              (leaveEventType = eventTypes$6.pointerLeave),
              (enterEventType = eventTypes$6.pointerEnter),
              (eventTypePrefix = "pointer");
          topLevelType =
            null == isOutEvent
              ? eventSystemFlags
              : getNodeFromInstance$1(isOutEvent);
          eventSystemFlags =
            null == isOverEvent
              ? eventSystemFlags
              : getNodeFromInstance$1(isOverEvent);
          leaveEventType = eventInterface.getPooled(
            leaveEventType,
            isOutEvent,
            nativeEvent,
            nativeEventTarget
          );
          leaveEventType.type = eventTypePrefix + "leave";
          leaveEventType.target = topLevelType;
          leaveEventType.relatedTarget = eventSystemFlags;
          nativeEvent = eventInterface.getPooled(
            enterEventType,
            isOverEvent,
            nativeEvent,
            nativeEventTarget
          );
          nativeEvent.type = eventTypePrefix + "enter";
          nativeEvent.target = eventSystemFlags;
          nativeEvent.relatedTarget = topLevelType;
          getClosestInstanceFromNode(nativeEventTarget) !== targetInst &&
            (nativeEvent = null);
          targetInst = nativeEvent;
          nativeEventTarget = isOutEvent;
          eventTypePrefix = isOverEvent;
          if (nativeEventTarget && eventTypePrefix)
            a: {
              nativeEvent = nativeEventTarget;
              eventInterface = eventTypePrefix;
              enterEventType = 0;
              for (
                topLevelType = nativeEvent;
                topLevelType;
                topLevelType = getParent$1(topLevelType)
              )
                enterEventType++;
              topLevelType = 0;
              for (
                isOutEvent = eventInterface;
                isOutEvent;
                isOutEvent = getParent$1(isOutEvent)
              )
                topLevelType++;
              for (; 0 < enterEventType - topLevelType; )
                (nativeEvent = getParent$1(nativeEvent)), enterEventType--;
              for (; 0 < topLevelType - enterEventType; )
                (eventInterface = getParent$1(eventInterface)), topLevelType--;
              for (; enterEventType--; ) {
                if (
                  nativeEvent === eventInterface ||
                  (null !== eventInterface &&
                    nativeEvent === eventInterface.alternate)
                )
                  break a;
                nativeEvent = getParent$1(nativeEvent);
                eventInterface = getParent$1(eventInterface);
              }
              nativeEvent = null;
            }
          else nativeEvent = null;
          null !== nativeEventTarget &&
            accumulateEnterLeaveListenersForEvent(
              dispatchQueue,
              leaveEventType,
              nativeEventTarget,
              nativeEvent,
              !1
            );
          null !== eventTypePrefix &&
            null !== targetInst &&
            accumulateEnterLeaveListenersForEvent(
              dispatchQueue,
              targetInst,
              eventTypePrefix,
              nativeEvent,
              !0
            );
        }
      }
    }
  },
  skipSelectionChangeEvent$1 =
    canUseDOM && "documentMode" in document && 11 >= document.documentMode,
  rootTargetDependencies = "blur contextmenu dragend focus keydown keyup mousedown mouseup".split(
    " "
  ),
  eventTypes$7 = {
    select: {
      phasedRegistrationNames: {
        bubbled: "onSelect",
        captured: "onSelectCapture"
      },
      dependencies: [].concat(rootTargetDependencies, ["selectionchange"])
    }
  },
  activeElement$3 = null,
  activeElementInst$3 = null,
  lastSelection$1 = null,
  mouseDown$1 = !1;
function constructSelectEvent$1(dispatchQueue, nativeEvent, nativeEventTarget) {
  var doc =
    nativeEventTarget.window === nativeEventTarget
      ? nativeEventTarget.document
      : 9 === nativeEventTarget.nodeType
      ? nativeEventTarget
      : nativeEventTarget.ownerDocument;
  mouseDown$1 ||
    null == activeElement$3 ||
    activeElement$3 !== getActiveElement(doc) ||
    ((doc = activeElement$3),
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
        })),
    (lastSelection$1 && shallowEqual(lastSelection$1, doc)) ||
      ((lastSelection$1 = doc),
      (nativeEvent = SyntheticEvent.getPooled(
        eventTypes$7.select,
        null,
        nativeEvent,
        nativeEventTarget
      )),
      (nativeEvent.type = "select"),
      (nativeEvent.target = activeElement$3),
      accumulateTwoPhaseListeners(
        activeElementInst$3,
        dispatchQueue,
        nativeEvent
      )));
}
var SelectEventPlugin$1 = {
    eventTypes: eventTypes$7,
    extractEvents: function(
      dispatchQueue,
      topLevelType,
      targetInst,
      nativeEvent,
      nativeEventTarget,
      eventSystemFlags,
      container
    ) {
      eventSystemFlags = getEventListenerMap(
        nativeEventTarget.window === nativeEventTarget
          ? nativeEventTarget.document
          : 9 === nativeEventTarget.nodeType
          ? nativeEventTarget
          : nativeEventTarget.ownerDocument
      );
      var capture = capturePhaseEvents.has("selectionchange");
      capture = getListenerMapKey("selectionchange", capture);
      if (
        !(eventSystemFlags = !eventSystemFlags.has(capture)) &&
        (eventSystemFlags = "selectionchange" !== topLevelType)
      ) {
        a: {
          container = getEventListenerMap(container);
          for (
            eventSystemFlags = 0;
            eventSystemFlags < rootTargetDependencies.length;
            eventSystemFlags++
          ) {
            capture = rootTargetDependencies[eventSystemFlags];
            var capture$jscomp$0 = capturePhaseEvents.has(capture);
            capture = getListenerMapKey(capture, capture$jscomp$0);
            if (!container.has(capture)) {
              container = !1;
              break a;
            }
          }
          container = !0;
        }
        eventSystemFlags = !container;
      }
      if (!eventSystemFlags)
        switch (
          ((container = targetInst
            ? getNodeFromInstance$1(targetInst)
            : window),
          topLevelType)
        ) {
          case "focus":
            if (
              isTextInputElement(container) ||
              "true" === container.contentEditable
            )
              (activeElement$3 = container),
                (activeElementInst$3 = targetInst),
                (lastSelection$1 = null);
            break;
          case "blur":
            lastSelection$1 = activeElementInst$3 = activeElement$3 = null;
            break;
          case "mousedown":
            mouseDown$1 = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            mouseDown$1 = !1;
            constructSelectEvent$1(
              dispatchQueue,
              nativeEvent,
              nativeEventTarget
            );
            break;
          case "selectionchange":
            if (skipSelectionChangeEvent$1) break;
          case "keydown":
          case "keyup":
            constructSelectEvent$1(
              dispatchQueue,
              nativeEvent,
              nativeEventTarget
            );
        }
    }
  },
  SimpleEventPlugin$1 = {
    eventTypes: simpleEventPluginEventTypes,
    extractEvents: function(
      dispatchQueue,
      topLevelType,
      targetInst,
      nativeEvent,
      nativeEventTarget,
      eventSystemFlags,
      targetContainer
    ) {
      var dispatchConfig = topLevelEventsToDispatchConfig.get(topLevelType);
      if (dispatchConfig) {
        switch (topLevelType) {
          case "keypress":
            if (0 === getEventCharCode(nativeEvent)) return;
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
            if (2 === nativeEvent.button) return;
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
        nativeEvent = topLevelType.getPooled(
          dispatchConfig,
          null,
          nativeEvent,
          nativeEventTarget
        );
        if (
          void 0 !== eventSystemFlags &&
          eventSystemFlags & 4 &&
          null != targetContainer
        ) {
          targetInst = [];
          eventSystemFlags = [];
          nativeEventTarget =
            targetContainer[internalEventHandlerListenersKey] || null;
          if (null !== nativeEventTarget) {
            nativeEventTarget = Array.from(nativeEventTarget);
            dispatchConfig = nativeEvent.type;
            topLevelType = 1 === nativeEvent.eventPhase;
            for (var i = 0; i < nativeEventTarget.length; i++) {
              var listener = nativeEventTarget[i],
                callback = listener.callback,
                capture = listener.capture;
              listener.type === dispatchConfig &&
                (topLevelType && capture
                  ? targetInst.push(
                      createDispatchQueueItemPhaseEntry(
                        null,
                        callback,
                        targetContainer
                      )
                    )
                  : topLevelType ||
                    capture ||
                    eventSystemFlags.push(
                      createDispatchQueueItemPhaseEntry(
                        null,
                        callback,
                        targetContainer
                      )
                    ));
            }
          }
          (0 === targetInst.length && 0 === eventSystemFlags.length) ||
            dispatchQueue.push({
              event: nativeEvent,
              capture: targetInst,
              bubble: eventSystemFlags
            });
        } else
          accumulateTwoPhaseListeners(
            targetInst,
            dispatchQueue,
            nativeEvent,
            !0
          );
        return nativeEvent;
      }
    }
  };
if (enableModernEventSystem)
  for (
    var eventPlugins$jscomp$inline_635 = [
        SimpleEventPlugin$1,
        EnterLeaveEventPlugin$1,
        ChangeEventPlugin$1,
        SelectEventPlugin$1,
        BeforeInputEventPlugin$1
      ],
      i$jscomp$inline_636 = 0;
    i$jscomp$inline_636 < eventPlugins$jscomp$inline_635.length;
    i$jscomp$inline_636++
  ) {
    var pluginModule$jscomp$inline_637 =
      eventPlugins$jscomp$inline_635[i$jscomp$inline_636];
    plugins.push(pluginModule$jscomp$inline_637);
    var publishedEvents$jscomp$inline_638 =
        pluginModule$jscomp$inline_637.eventTypes,
      eventName$jscomp$inline_639;
    for (eventName$jscomp$inline_639 in publishedEvents$jscomp$inline_638)
      publishEventForPlugin(
        publishedEvents$jscomp$inline_638[eventName$jscomp$inline_639],
        pluginModule$jscomp$inline_637,
        eventName$jscomp$inline_639
      );
  }
else {
  if (eventPluginOrder) throw Error(formatProdErrorMessage(101));
  eventPluginOrder = Array.prototype.slice.call(
    "ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(
      " "
    )
  );
  recomputePluginOrdering();
  getNodeFromInstance = getNodeFromInstance$1;
  injectEventPluginsByName({
    SimpleEventPlugin: SimpleEventPlugin,
    EnterLeaveEventPlugin: EnterLeaveEventPlugin,
    ChangeEventPlugin: ChangeEventPlugin,
    SelectEventPlugin: SelectEventPlugin,
    BeforeInputEventPlugin: BeforeInputEventPlugin
  });
}
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
  rendererID = null,
  injectedHook = null,
  isDevToolsPresent = "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__,
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
  Scheduler_IdlePriority = Scheduler.unstable_IdlePriority;
if (
  null == tracing.__interactionsRef ||
  null == tracing.__interactionsRef.current
)
  throw Error(formatProdErrorMessage(302));
var fakeCallbackNode = {},
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
var return_highestLanePriority = 9,
  return_updateRangeEnd = -1;
function getHighestPriorityLanes(lanes) {
  if (0 !== (1 & lanes))
    return (return_highestLanePriority = 16), (return_updateRangeEnd = 1);
  if (0 !== (2 & lanes))
    return (return_highestLanePriority = 15), (return_updateRangeEnd = 2);
  var inputDiscreteLanes = 28 & lanes;
  if (0 !== inputDiscreteLanes) {
    if (inputDiscreteLanes & 4)
      return (return_highestLanePriority = 14), (return_updateRangeEnd = 3), 4;
    return_highestLanePriority = 13;
    return_updateRangeEnd = 5;
    return inputDiscreteLanes;
  }
  inputDiscreteLanes = 224 & lanes;
  if (0 !== inputDiscreteLanes) {
    if (inputDiscreteLanes & 32)
      return (return_highestLanePriority = 12), (return_updateRangeEnd = 6), 32;
    return_highestLanePriority = 11;
    return_updateRangeEnd = 8;
    return inputDiscreteLanes;
  }
  inputDiscreteLanes = 16128 & lanes;
  if (0 !== inputDiscreteLanes) {
    if (inputDiscreteLanes & 256)
      return (
        (return_highestLanePriority = 10), (return_updateRangeEnd = 9), 256
      );
    return_highestLanePriority = 9;
    return_updateRangeEnd = 14;
    return inputDiscreteLanes;
  }
  inputDiscreteLanes = 1032192 & lanes;
  if (0 !== inputDiscreteLanes) {
    if (inputDiscreteLanes & 16384)
      return (
        (return_highestLanePriority = 8), (return_updateRangeEnd = 15), 16384
      );
    return_highestLanePriority = 7;
    return_updateRangeEnd = 20;
    return inputDiscreteLanes;
  }
  inputDiscreteLanes = 66060288 & lanes;
  if (0 !== inputDiscreteLanes) {
    if (inputDiscreteLanes & 1048576)
      return (
        (return_highestLanePriority = 6), (return_updateRangeEnd = 21), 1048576
      );
    return_highestLanePriority = 5;
    return_updateRangeEnd = 26;
    return inputDiscreteLanes;
  }
  if (lanes & 100663296)
    return (
      (return_highestLanePriority = 4), (return_updateRangeEnd = 27), 100663296
    );
  inputDiscreteLanes = 939524096 & lanes;
  if (0 !== inputDiscreteLanes) {
    if (inputDiscreteLanes & 134217728)
      return (
        (return_highestLanePriority = 3),
        (return_updateRangeEnd = 28),
        134217728
      );
    return_highestLanePriority = 2;
    return_updateRangeEnd = 30;
    return inputDiscreteLanes;
  }
  if (0 !== (1073741824 & lanes))
    return (
      (return_highestLanePriority = 1), (return_updateRangeEnd = 31), 1073741824
    );
  return_highestLanePriority = 9;
  return_updateRangeEnd = 14;
  return lanes;
}
function schedulerPriorityToLanePriority(schedulerPriorityLevel) {
  switch (schedulerPriorityLevel) {
    case 99:
      return 16;
    case 98:
      return 11;
    case 97:
    case 96:
      return 9;
    case 95:
      return 2;
    default:
      return 0;
  }
}
function lanePriorityToSchedulerPriority(lanePriority) {
  switch (lanePriority) {
    case 16:
    case 15:
      return 99;
    case 14:
    case 13:
    case 12:
    case 11:
      return 98;
    case 10:
    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
    case 4:
      return 97;
    case 3:
    case 2:
    case 1:
      return 95;
    case 0:
      return 90;
    default:
      throw Error(formatProdErrorMessage(358, lanePriority));
  }
}
function getNextLanes(root, wipLanes) {
  var pendingLanes = root.pendingLanes;
  if (0 === pendingLanes) return (return_highestLanePriority = 0);
  var nextLanes = 0,
    nextLanePriority = 0,
    equalOrHigherPriorityLanes = 0,
    expiredLanes = root.expiredLanes,
    suspendedLanes = root.suspendedLanes,
    pingedLanes = root.pingedLanes;
  if (0 !== expiredLanes)
    (nextLanes = expiredLanes),
      (nextLanePriority = return_highestLanePriority = 16),
      (equalOrHigherPriorityLanes =
        (getLowestPriorityLane(nextLanes) << 1) - 1);
  else if (((expiredLanes = pendingLanes & 134217727), 0 !== expiredLanes)) {
    var nonIdleUnblockedLanes = expiredLanes & ~suspendedLanes;
    0 !== nonIdleUnblockedLanes
      ? ((nextLanes = getHighestPriorityLanes(nonIdleUnblockedLanes)),
        (nextLanePriority = return_highestLanePriority),
        (equalOrHigherPriorityLanes = (1 << return_updateRangeEnd) - 1))
      : ((pingedLanes &= expiredLanes),
        0 !== pingedLanes &&
          ((nextLanes = getHighestPriorityLanes(pingedLanes)),
          (nextLanePriority = return_highestLanePriority),
          (equalOrHigherPriorityLanes = (1 << return_updateRangeEnd) - 1)));
  } else
    (expiredLanes = pendingLanes & ~suspendedLanes),
      0 !== expiredLanes
        ? ((nextLanes = getHighestPriorityLanes(expiredLanes)),
          (nextLanePriority = return_highestLanePriority),
          (equalOrHigherPriorityLanes = (1 << return_updateRangeEnd) - 1))
        : 0 !== pingedLanes &&
          ((nextLanes = getHighestPriorityLanes(pingedLanes)),
          (nextLanePriority = return_highestLanePriority),
          (equalOrHigherPriorityLanes = (1 << return_updateRangeEnd) - 1));
  if (0 === nextLanes) return 0;
  nextLanes = pendingLanes & equalOrHigherPriorityLanes;
  if (
    0 !== wipLanes &&
    wipLanes !== nextLanes &&
    0 === (wipLanes & suspendedLanes)
  ) {
    getHighestPriorityLanes(wipLanes);
    if (nextLanePriority <= return_highestLanePriority) return wipLanes;
    return_highestLanePriority = nextLanePriority;
  }
  wipLanes = root.entangledLanes;
  if (0 !== wipLanes)
    for (root = root.entanglements, wipLanes &= nextLanes; 0 < wipLanes; )
      (pendingLanes = 31 - clz32(wipLanes)),
        (nextLanePriority = 1 << pendingLanes),
        (nextLanes |= root[pendingLanes]),
        (wipLanes &= ~nextLanePriority);
  return nextLanes;
}
function getLanesToRetrySynchronouslyOnError(root) {
  root = root.pendingLanes & -1073741825;
  return 0 !== root ? root : root & 1073741824 ? 1073741824 : 0;
}
function findUpdateLane(lanePriority, wipLanes) {
  switch (lanePriority) {
    case 16:
      return 1;
    case 15:
      return 2;
    case 13:
      return (
        (lanePriority = findLane(3, 27, wipLanes)),
        0 === lanePriority && (lanePriority = 4),
        lanePriority
      );
    case 11:
      return (
        (lanePriority = findLane(6, 27, wipLanes)),
        0 === lanePriority && (lanePriority = 32),
        lanePriority
      );
    case 9:
      return (
        (lanePriority = findLane(9, 27, wipLanes)),
        0 === lanePriority && (lanePriority = 256),
        lanePriority
      );
    case 2:
      return (
        (lanePriority = findLane(28, 30, wipLanes)),
        0 === lanePriority && (lanePriority = 134217728),
        lanePriority
      );
  }
  throw Error(formatProdErrorMessage(358, lanePriority));
}
function findLane(start, end, skipLanes) {
  start = (((1 << (end - start)) - 1) << start) & ~skipLanes;
  return start & -start;
}
function getLowestPriorityLane(lanes) {
  lanes = 31 - clz32(lanes);
  return 0 > lanes ? 0 : 1 << lanes;
}
var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback,
  log = Math.log,
  LN2 = Math.LN2;
function clz32Fallback(lanes) {
  return 0 === lanes ? 32 : (31 - ((log(lanes) / LN2) | 0)) | 0;
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
function scheduleWorkOnParentPath(parent, renderLanes) {
  for (; null !== parent; ) {
    var alternate = parent.alternate;
    if ((parent.childLanes & renderLanes) === renderLanes)
      if (
        null === alternate ||
        (alternate.childLanes & renderLanes) === renderLanes
      )
        break;
      else alternate.childLanes |= renderLanes;
    else
      (parent.childLanes |= renderLanes),
        null !== alternate && (alternate.childLanes |= renderLanes);
    parent = parent.return;
  }
}
function prepareToReadContext(workInProgress, renderLanes) {
  currentlyRenderingFiber = workInProgress;
  lastContextWithAllBitsObserved = lastContextDependency = null;
  workInProgress = workInProgress.dependencies_new;
  null !== workInProgress &&
    null !== workInProgress.firstContext &&
    (0 !== (workInProgress.lanes & renderLanes) && (didReceiveUpdate = !0),
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
      currentlyRenderingFiber.dependencies_new = {
        lanes: 0,
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
function createUpdate(eventTime, lane, suspenseConfig) {
  return {
    eventTime: eventTime,
    lane: lane,
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
          eventTime: queue.eventTime,
          lane: queue.lane,
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
  renderLanes
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
      pendingQueue = firstBaseUpdate.lane;
      var updateEventTime = firstBaseUpdate.eventTime;
      if ((renderLanes & pendingQueue) === pendingQueue) {
        null !== current &&
          (current = current.next = {
            eventTime: updateEventTime,
            lane: 0,
            suspenseConfig: firstBaseUpdate.suspenseConfig,
            tag: firstBaseUpdate.tag,
            payload: firstBaseUpdate.payload,
            callback: firstBaseUpdate.callback,
            next: null
          });
        markRenderEventTimeAndConfig(
          updateEventTime,
          firstBaseUpdate.suspenseConfig
        );
        a: {
          var workInProgress = workInProgress$jscomp$0,
            update = firstBaseUpdate;
          pendingQueue = props;
          updateEventTime = instance;
          switch (update.tag) {
            case 1:
              workInProgress = update.payload;
              if ("function" === typeof workInProgress) {
                currentLastBaseUpdate = workInProgress.call(
                  updateEventTime,
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
                      updateEventTime,
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
      } else
        (updateEventTime = {
          eventTime: updateEventTime,
          lane: pendingQueue,
          suspenseConfig: firstBaseUpdate.suspenseConfig,
          tag: firstBaseUpdate.tag,
          payload: firstBaseUpdate.payload,
          callback: firstBaseUpdate.callback,
          next: null
        }),
          null === current
            ? ((firstPendingUpdate = current = updateEventTime),
              (lastPendingUpdate = currentLastBaseUpdate))
            : (current = current.next = updateEventTime),
          (lastBaseUpdate |= pendingQueue);
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
    workInProgressRootSkippedLanes |= lastBaseUpdate;
    workInProgress$jscomp$0.lanes = lastBaseUpdate;
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
  0 === workInProgress.lanes &&
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
    var eventTime = requestEventTime(),
      suspenseConfig = ReactCurrentBatchConfig.suspense,
      lane = requestUpdateLane(inst, suspenseConfig);
    suspenseConfig = createUpdate(eventTime, lane, suspenseConfig);
    suspenseConfig.payload = payload;
    void 0 !== callback &&
      null !== callback &&
      (suspenseConfig.callback = callback);
    enqueueUpdate(inst, suspenseConfig);
    scheduleUpdateOnFiber(inst, lane, eventTime);
  },
  enqueueReplaceState: function(inst, payload, callback) {
    inst = inst._reactInternals;
    var eventTime = requestEventTime(),
      suspenseConfig = ReactCurrentBatchConfig.suspense,
      lane = requestUpdateLane(inst, suspenseConfig);
    suspenseConfig = createUpdate(eventTime, lane, suspenseConfig);
    suspenseConfig.tag = 1;
    suspenseConfig.payload = payload;
    void 0 !== callback &&
      null !== callback &&
      (suspenseConfig.callback = callback);
    enqueueUpdate(inst, suspenseConfig);
    scheduleUpdateOnFiber(inst, lane, eventTime);
  },
  enqueueForceUpdate: function(inst, callback) {
    inst = inst._reactInternals;
    var eventTime = requestEventTime(),
      suspenseConfig = ReactCurrentBatchConfig.suspense,
      lane = requestUpdateLane(inst, suspenseConfig);
    suspenseConfig = createUpdate(eventTime, lane, suspenseConfig);
    suspenseConfig.tag = 2;
    void 0 !== callback &&
      null !== callback &&
      (suspenseConfig.callback = callback);
    enqueueUpdate(inst, suspenseConfig);
    scheduleUpdateOnFiber(inst, lane, eventTime);
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
function mountClassInstance(workInProgress, ctor, newProps, renderLanes) {
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
  processUpdateQueue(workInProgress, newProps, instance, renderLanes);
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
    processUpdateQueue(workInProgress, newProps, instance, renderLanes),
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
          : newChild
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
  function updateTextNode(returnFiber, current, textContent, lanes) {
    if (null === current || 6 !== current.tag)
      return (
        (current = createFiberFromText(textContent, returnFiber.mode, lanes)),
        (current.return = returnFiber),
        current
      );
    current = useFiber(current, textContent);
    current.return = returnFiber;
    return current;
  }
  function updateElement(returnFiber, current, element, lanes) {
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
      lanes
    );
    existing.ref = coerceRef(returnFiber, current, element);
    existing.return = returnFiber;
    return existing;
  }
  function updatePortal(returnFiber, current, portal, lanes) {
    if (
      null === current ||
      4 !== current.tag ||
      current.stateNode.containerInfo !== portal.containerInfo ||
      current.stateNode.implementation !== portal.implementation
    )
      return (
        (current = createFiberFromPortal(portal, returnFiber.mode, lanes)),
        (current.return = returnFiber),
        current
      );
    current = useFiber(current, portal.children || []);
    current.return = returnFiber;
    return current;
  }
  function updateFragment(returnFiber, current, fragment, lanes, key) {
    if (null === current || 7 !== current.tag)
      return (
        (current = createFiberFromFragment(
          fragment,
          returnFiber.mode,
          lanes,
          key
        )),
        (current.return = returnFiber),
        current
      );
    current = useFiber(current, fragment);
    current.return = returnFiber;
    return current;
  }
  function createChild(returnFiber, newChild, lanes) {
    if ("string" === typeof newChild || "number" === typeof newChild)
      return (
        (newChild = createFiberFromText(
          "" + newChild,
          returnFiber.mode,
          lanes
        )),
        (newChild.return = returnFiber),
        newChild
      );
    if ("object" === typeof newChild && null !== newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return (
            (lanes = createFiberFromTypeAndProps(
              newChild.type,
              newChild.key,
              newChild.props,
              null,
              returnFiber.mode,
              lanes
            )),
            (lanes.ref = coerceRef(returnFiber, null, newChild)),
            (lanes.return = returnFiber),
            lanes
          );
        case REACT_PORTAL_TYPE:
          return (
            (newChild = createFiberFromPortal(
              newChild,
              returnFiber.mode,
              lanes
            )),
            (newChild.return = returnFiber),
            newChild
          );
        case REACT_LAZY_TYPE:
          var init = newChild._init;
          return createChild(returnFiber, init(newChild._payload), lanes);
      }
      if (isArray(newChild) || getIteratorFn(newChild))
        return (
          (newChild = createFiberFromFragment(
            newChild,
            returnFiber.mode,
            lanes,
            null
          )),
          (newChild.return = returnFiber),
          newChild
        );
      throwOnInvalidObjectType(returnFiber, newChild);
    }
    return null;
  }
  function updateSlot(returnFiber, oldFiber, newChild, lanes) {
    var key = null !== oldFiber ? oldFiber.key : null;
    if ("string" === typeof newChild || "number" === typeof newChild)
      return null !== key
        ? null
        : updateTextNode(returnFiber, oldFiber, "" + newChild, lanes);
    if ("object" === typeof newChild && null !== newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return newChild.key === key
            ? newChild.type === REACT_FRAGMENT_TYPE
              ? updateFragment(
                  returnFiber,
                  oldFiber,
                  newChild.props.children,
                  lanes,
                  key
                )
              : updateElement(returnFiber, oldFiber, newChild, lanes)
            : null;
        case REACT_PORTAL_TYPE:
          return newChild.key === key
            ? updatePortal(returnFiber, oldFiber, newChild, lanes)
            : null;
        case REACT_LAZY_TYPE:
          return (
            (key = newChild._init),
            updateSlot(returnFiber, oldFiber, key(newChild._payload), lanes)
          );
      }
      if (isArray(newChild) || getIteratorFn(newChild))
        return null !== key
          ? null
          : updateFragment(returnFiber, oldFiber, newChild, lanes, null);
      throwOnInvalidObjectType(returnFiber, newChild);
    }
    return null;
  }
  function updateFromMap(
    existingChildren,
    returnFiber,
    newIdx,
    newChild,
    lanes
  ) {
    if ("string" === typeof newChild || "number" === typeof newChild)
      return (
        (existingChildren = existingChildren.get(newIdx) || null),
        updateTextNode(returnFiber, existingChildren, "" + newChild, lanes)
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
                  lanes,
                  newChild.key
                )
              : updateElement(returnFiber, existingChildren, newChild, lanes)
          );
        case REACT_PORTAL_TYPE:
          return (
            (existingChildren =
              existingChildren.get(
                null === newChild.key ? newIdx : newChild.key
              ) || null),
            updatePortal(returnFiber, existingChildren, newChild, lanes)
          );
        case REACT_LAZY_TYPE:
          var init = newChild._init;
          return updateFromMap(
            existingChildren,
            returnFiber,
            newIdx,
            init(newChild._payload),
            lanes
          );
      }
      if (isArray(newChild) || getIteratorFn(newChild))
        return (
          (existingChildren = existingChildren.get(newIdx) || null),
          updateFragment(returnFiber, existingChildren, newChild, lanes, null)
        );
      throwOnInvalidObjectType(returnFiber, newChild);
    }
    return null;
  }
  function reconcileChildrenArray(
    returnFiber,
    currentFirstChild,
    newChildren,
    lanes
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
        lanes
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
        (oldFiber = createChild(returnFiber, newChildren[newIdx], lanes)),
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
        lanes
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
    lanes
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
      var newFiber = updateSlot(returnFiber, oldFiber, step.value, lanes);
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
        (step = createChild(returnFiber, step.value, lanes)),
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
      (step = updateFromMap(oldFiber, returnFiber, newIdx, step.value, lanes)),
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
  function reconcileChildFibers(
    returnFiber,
    currentFirstChild,
    newChild,
    lanes
  ) {
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
                  lanes,
                  newChild.key
                )),
                (currentFirstChild.return = returnFiber),
                (returnFiber = currentFirstChild))
              : ((lanes = createFiberFromTypeAndProps(
                  newChild.type,
                  newChild.key,
                  newChild.props,
                  null,
                  returnFiber.mode,
                  lanes
                )),
                (lanes.ref = coerceRef(
                  returnFiber,
                  currentFirstChild,
                  newChild
                )),
                (lanes.return = returnFiber),
                (returnFiber = lanes));
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
              lanes
            );
            currentFirstChild.return = returnFiber;
            returnFiber = currentFirstChild;
          }
          return placeSingleChild(returnFiber);
        case REACT_LAZY_TYPE:
          return (
            (isUnkeyedTopLevelFragment = newChild._init),
            reconcileChildFibers(
              returnFiber,
              currentFirstChild,
              isUnkeyedTopLevelFragment(newChild._payload),
              lanes
            )
          );
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
              lanes
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
        lanes
      );
    if (getIteratorFn(newChild))
      return reconcileChildrenIterator(
        returnFiber,
        currentFirstChild,
        newChild,
        lanes
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
  }
  return reconcileChildFibers;
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
    dependencies = fiber.dependencies_new;
  if (null != listeners) {
    null === dependencies &&
      (dependencies = fiber.dependencies_new = {
        lanes: 0,
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
  fiber = fiber.dependencies_new;
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
var hydrationParentFiber = null,
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
              retryLane: 1073741824
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
var workInProgressSources = [];
function resetWorkInProgressVersions() {
  for (var i = 0; i < workInProgressSources.length; i++)
    workInProgressSources[i]._workInProgressVersionPrimary = null;
  workInProgressSources.length = 0;
}
var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher,
  ReactCurrentBatchConfig$1 = ReactSharedInternals.ReactCurrentBatchConfig,
  renderLanes = 0,
  currentlyRenderingFiber$1 = null,
  currentHook = null,
  workInProgressHook = null,
  didScheduleRenderPhaseUpdate = !1,
  didScheduleRenderPhaseUpdateDuringThisPass = !1;
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
  nextRenderLanes
) {
  renderLanes = nextRenderLanes;
  currentlyRenderingFiber$1 = workInProgress;
  workInProgress.memoizedState = null;
  workInProgress.updateQueue = null;
  workInProgress.lanes = 0;
  ReactCurrentDispatcher$1.current =
    null === current || null === current.memoizedState
      ? HooksDispatcherOnMount
      : HooksDispatcherOnUpdate;
  current = Component(props, secondArg);
  if (didScheduleRenderPhaseUpdateDuringThisPass) {
    nextRenderLanes = 0;
    do {
      didScheduleRenderPhaseUpdateDuringThisPass = !1;
      if (!(25 > nextRenderLanes)) throw Error(formatProdErrorMessage(301));
      nextRenderLanes += 1;
      workInProgressHook = currentHook = null;
      workInProgress.updateQueue = null;
      ReactCurrentDispatcher$1.current = HooksDispatcherOnRerender;
      current = Component(props, secondArg);
    } while (didScheduleRenderPhaseUpdateDuringThisPass);
  }
  ReactCurrentDispatcher$1.current = ContextOnlyDispatcher;
  workInProgress = null !== currentHook && null !== currentHook.next;
  renderLanes = 0;
  workInProgressHook = currentHook = currentlyRenderingFiber$1 = null;
  didScheduleRenderPhaseUpdate = !1;
  if (workInProgress) throw Error(formatProdErrorMessage(300));
  return current;
}
function bailoutHooks(current, workInProgress, lanes) {
  workInProgress.updateQueue = current.updateQueue;
  workInProgress.effectTag &= -517;
  current.lanes &= ~lanes;
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
      var suspenseConfig = update.suspenseConfig,
        updateLane = update.lane,
        updateEventTime = update.eventTime;
      (renderLanes & updateLane) === updateLane
        ? (null !== newBaseQueueLast &&
            (newBaseQueueLast = newBaseQueueLast.next = {
              eventTime: updateEventTime,
              lane: 0,
              suspenseConfig: update.suspenseConfig,
              action: update.action,
              eagerReducer: update.eagerReducer,
              eagerState: update.eagerState,
              next: null
            }),
          markRenderEventTimeAndConfig(updateEventTime, suspenseConfig),
          (current =
            update.eagerReducer === reducer
              ? update.eagerState
              : reducer(current, update.action)))
        : ((suspenseConfig = {
            eventTime: updateEventTime,
            lane: updateLane,
            suspenseConfig: suspenseConfig,
            action: update.action,
            eagerReducer: update.eagerReducer,
            eagerState: update.eagerState,
            next: null
          }),
          null === newBaseQueueLast
            ? ((baseFirst = newBaseQueueLast = suspenseConfig),
              (pendingQueue = current))
            : (newBaseQueueLast = newBaseQueueLast.next = suspenseConfig),
          (currentlyRenderingFiber$1.lanes |= updateLane),
          (workInProgressRootSkippedLanes |= updateLane));
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
    ((root = root.mutableReadLanes), (root = (renderLanes & root) === root))
  )
    (source._workInProgressVersionPrimary = getVersion),
      workInProgressSources.push(source);
  if (root) return getSnapshot(source._source);
  workInProgressSources.push(source);
  throw Error(formatProdErrorMessage(350));
}
function useMutableSource(hook, source, getSnapshot, subscribe) {
  var root = workInProgressRoot;
  if (null === root) throw Error(formatProdErrorMessage(349));
  var getVersion = source._getVersion,
    version = getVersion(source._source),
    dispatcher = ReactCurrentDispatcher$1.current,
    _dispatcher$useState = dispatcher.useState(function() {
      return readFromUnsubcribedMutableSource(root, source, getSnapshot);
    }),
    setSnapshot = _dispatcher$useState[1],
    snapshot = _dispatcher$useState[0];
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
      refs.setSnapshot = setSnapshot;
      var maybeNewVersion = getVersion(source._source);
      if (!objectIs(version, maybeNewVersion)) {
        maybeNewVersion = getSnapshot(source._source);
        objectIs(snapshot, maybeNewVersion) ||
          (setSnapshot(maybeNewVersion),
          (maybeNewVersion = requestUpdateLane(
            fiber,
            ReactCurrentBatchConfig.suspense
          )),
          (root.mutableReadLanes |= maybeNewVersion & root.pendingLanes));
        maybeNewVersion = root.mutableReadLanes;
        root.entangledLanes |= maybeNewVersion;
        for (
          var entanglements = root.entanglements, lanes = maybeNewVersion;
          0 < lanes;

        ) {
          var index$47 = 31 - clz32(lanes),
            lane = 1 << index$47;
          entanglements[index$47] |= maybeNewVersion;
          lanes &= ~lane;
        }
      }
    },
    [getSnapshot, source, subscribe]
  );
  dispatcher.useEffect(
    function() {
      return subscribe(source._source, function() {
        var latestGetSnapshot = refs.getSnapshot,
          latestSetSnapshot = refs.setSnapshot;
        try {
          latestSetSnapshot(latestGetSnapshot(source._source));
          var lane = requestUpdateLane(fiber, ReactCurrentBatchConfig.suspense);
          root.mutableReadLanes |= lane & root.pendingLanes;
        } catch (error) {
          latestSetSnapshot(function() {
            throw error;
          });
        }
      });
    },
    [source, subscribe]
  );
  (objectIs(prevGetSnapshot, getSnapshot) &&
    objectIs(prevSource, source) &&
    objectIs(memoizedState, subscribe)) ||
    ((hook = {
      pending: null,
      dispatch: null,
      lastRenderedReducer: basicStateReducer,
      lastRenderedState: snapshot
    }),
    (hook.dispatch = setSnapshot = dispatchAction.bind(
      null,
      currentlyRenderingFiber$1,
      hook
    )),
    (_dispatcher$useState.queue = hook),
    (_dispatcher$useState.baseQueue = null),
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
  var eventTime = requestEventTime(),
    suspenseConfig = ReactCurrentBatchConfig.suspense,
    lane = requestUpdateLane(fiber, suspenseConfig);
  suspenseConfig = {
    eventTime: eventTime,
    lane: lane,
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
    didScheduleRenderPhaseUpdateDuringThisPass = didScheduleRenderPhaseUpdate = !0;
  else {
    if (
      0 === fiber.lanes &&
      (null === pending || 0 === pending.lanes) &&
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
    scheduleUpdateOnFiber(fiber, lane, eventTime);
  }
}
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
    useOpaqueIdentifier: throwInvalidHookError,
    unstable_isNewReconciler: !0
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
        refs: { getSnapshot: getSnapshot, setSnapshot: null },
        source: source,
        subscribe: subscribe
      };
      return useMutableSource(hook, source, getSnapshot, subscribe);
    },
    useOpaqueIdentifier: function() {
      if (isHydrating) {
        var didUpgrade = !1,
          id = makeOpaqueHydratingObject(function() {
            didUpgrade ||
              ((didUpgrade = !0), setId("r:" + (clientId++).toString(36)));
            throw Error(formatProdErrorMessage(355));
          }),
          setId = mountState(id)[1];
        0 === (currentlyRenderingFiber$1.mode & 2) &&
          ((currentlyRenderingFiber$1.effectTag |= 516),
          pushEffect(
            5,
            function() {
              setId("r:" + (clientId++).toString(36));
            },
            void 0,
            null
          ));
        return id;
      }
      id = "r:" + (clientId++).toString(36);
      mountState(id);
      return id;
    },
    unstable_isNewReconciler: !0
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
    useOpaqueIdentifier: function() {
      return updateReducer(basicStateReducer)[0];
    },
    unstable_isNewReconciler: !0
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
    useOpaqueIdentifier: function() {
      return rerenderReducer(basicStateReducer)[0];
    },
    unstable_isNewReconciler: !0
  },
  now$1 = Scheduler.unstable_now,
  commitTime = 0,
  layoutEffectStartTime = -1,
  profilerStartTime = -1,
  passiveEffectStartTime = -1;
function stopProfilerTimerIfRunningAndRecordDelta(fiber, overrideBaseTime) {
  if (0 <= profilerStartTime) {
    var elapsedTime = now$1() - profilerStartTime;
    fiber.actualDuration += elapsedTime;
    overrideBaseTime && (fiber.selfBaseDuration = elapsedTime);
    profilerStartTime = -1;
  }
}
function recordLayoutEffectDuration(fiber) {
  if (0 <= layoutEffectStartTime) {
    var elapsedTime = now$1() - layoutEffectStartTime;
    layoutEffectStartTime = -1;
    for (fiber = fiber.return; null !== fiber; ) {
      if (12 === fiber.tag) {
        fiber.stateNode.effectDuration += elapsedTime;
        break;
      }
      fiber = fiber.return;
    }
  }
}
function recordPassiveEffectDuration(fiber) {
  if (0 <= passiveEffectStartTime) {
    var elapsedTime = now$1() - passiveEffectStartTime;
    passiveEffectStartTime = -1;
    for (fiber = fiber.return; null !== fiber; ) {
      if (12 === fiber.tag) {
        fiber = fiber.stateNode;
        null !== fiber && (fiber.passiveEffectDuration += elapsedTime);
        break;
      }
      fiber = fiber.return;
    }
  }
}
function transferActualDuration(fiber) {
  for (var child = fiber.child; child; )
    (fiber.actualDuration += child.actualDuration), (child = child.sibling);
}
var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner,
  didReceiveUpdate = !1;
function reconcileChildren(current, workInProgress, nextChildren, renderLanes) {
  workInProgress.child =
    null === current
      ? mountChildFibers(workInProgress, null, nextChildren, renderLanes)
      : reconcileChildFibers(
          workInProgress,
          current.child,
          nextChildren,
          renderLanes
        );
}
function updateForwardRef(
  current,
  workInProgress,
  Component,
  nextProps,
  renderLanes
) {
  Component = Component.render;
  var ref = workInProgress.ref;
  prepareToReadContext(workInProgress, renderLanes);
  nextProps = renderWithHooks(
    current,
    workInProgress,
    Component,
    nextProps,
    ref,
    renderLanes
  );
  if (null !== current && !didReceiveUpdate)
    return (
      bailoutHooks(current, workInProgress, renderLanes),
      bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes)
    );
  workInProgress.effectTag |= 1;
  reconcileChildren(current, workInProgress, nextProps, renderLanes);
  return workInProgress.child;
}
function updateMemoComponent(
  current,
  workInProgress,
  Component,
  nextProps,
  updateLanes,
  renderLanes
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
          updateLanes,
          renderLanes
        )
      );
    current = createFiberFromTypeAndProps(
      Component.type,
      null,
      nextProps,
      null,
      workInProgress.mode,
      renderLanes
    );
    current.ref = workInProgress.ref;
    current.return = workInProgress;
    return (workInProgress.child = current);
  }
  type = current.child;
  if (
    0 === (updateLanes & renderLanes) &&
    ((updateLanes = type.memoizedProps),
    (Component = Component.compare),
    (Component = null !== Component ? Component : shallowEqual),
    Component(updateLanes, nextProps) && current.ref === workInProgress.ref)
  )
    return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
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
  updateLanes,
  renderLanes
) {
  return null !== current &&
    shallowEqual(current.memoizedProps, nextProps) &&
    current.ref === workInProgress.ref &&
    ((didReceiveUpdate = !1), 0 === (renderLanes & updateLanes))
    ? ((workInProgress.lanes = current.lanes),
      bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes))
    : updateFunctionComponent(
        current,
        workInProgress,
        Component,
        nextProps,
        renderLanes
      );
}
function updateOffscreenComponent(current, workInProgress, renderLanes) {
  var nextProps = workInProgress.pendingProps,
    nextChildren = nextProps.children,
    prevState = null !== current ? current.memoizedState : null;
  if (
    "hidden" === nextProps.mode ||
    "unstable-defer-without-hiding" === nextProps.mode
  )
    if (0 === (workInProgress.mode & 4))
      (workInProgress.memoizedState = { baseLanes: 0 }),
        pushRenderLanes(workInProgress, renderLanes);
    else if (0 !== (renderLanes & 1073741824))
      (workInProgress.memoizedState = { baseLanes: 0 }),
        pushRenderLanes(
          workInProgress,
          null !== prevState ? prevState.baseLanes : renderLanes
        );
    else
      return (
        (current =
          null !== prevState ? prevState.baseLanes | renderLanes : renderLanes),
        markSpawnedWork(1073741824),
        (workInProgress.lanes = workInProgress.childLanes = 1073741824),
        (workInProgress.memoizedState = { baseLanes: current }),
        pushRenderLanes(workInProgress, current),
        null
      );
  else
    null !== prevState
      ? ((nextProps = prevState.baseLanes | renderLanes),
        (workInProgress.memoizedState = null))
      : (nextProps = renderLanes),
      pushRenderLanes(workInProgress, nextProps);
  reconcileChildren(current, workInProgress, nextChildren, renderLanes);
  return workInProgress.child;
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
  renderLanes
) {
  prepareToReadContext(workInProgress, renderLanes);
  Component = renderWithHooks(
    current,
    workInProgress,
    Component,
    nextProps,
    void 0,
    renderLanes
  );
  if (null !== current && !didReceiveUpdate)
    return (
      bailoutHooks(current, workInProgress, renderLanes),
      bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes)
    );
  workInProgress.effectTag |= 1;
  reconcileChildren(current, workInProgress, Component, renderLanes);
  return workInProgress.child;
}
function updateBlock(current, workInProgress, block, nextProps, renderLanes) {
  var render = block._render;
  block = block._data;
  prepareToReadContext(workInProgress, renderLanes);
  nextProps = renderWithHooks(
    current,
    workInProgress,
    render,
    nextProps,
    block,
    renderLanes
  );
  if (null !== current && !didReceiveUpdate)
    return (
      bailoutHooks(current, workInProgress, renderLanes),
      bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes)
    );
  workInProgress.effectTag |= 1;
  reconcileChildren(current, workInProgress, nextProps, renderLanes);
  return workInProgress.child;
}
function updateClassComponent(
  current,
  workInProgress,
  Component,
  nextProps,
  renderLanes
) {
  prepareToReadContext(workInProgress, renderLanes);
  if (null === workInProgress.stateNode)
    null !== current &&
      ((current.alternate = null),
      (workInProgress.alternate = null),
      (workInProgress.effectTag |= 2)),
      constructClassInstance(workInProgress, Component, nextProps),
      mountClassInstance(workInProgress, Component, nextProps, renderLanes),
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
    processUpdateQueue(workInProgress, nextProps, instance, renderLanes);
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
  } else {
    instance = workInProgress.stateNode;
    cloneUpdateQueue(current, workInProgress);
    nextContext = workInProgress.memoizedProps;
    contextType =
      workInProgress.type === workInProgress.elementType
        ? nextContext
        : resolveDefaultProps(workInProgress.type, nextContext);
    instance.props = contextType;
    getDerivedStateFromProps = workInProgress.pendingProps;
    var oldContext$jscomp$0 = instance.context;
    oldContext = Component.contextType;
    oldProps = emptyContextObject;
    "object" === typeof oldContext &&
      null !== oldContext &&
      (oldProps = readContext(oldContext));
    oldState = Component.getDerivedStateFromProps;
    (oldContext =
      "function" === typeof oldState ||
      "function" === typeof instance.getSnapshotBeforeUpdate) ||
      ("function" !== typeof instance.UNSAFE_componentWillReceiveProps &&
        "function" !== typeof instance.componentWillReceiveProps) ||
      ((nextContext !== getDerivedStateFromProps ||
        oldContext$jscomp$0 !== oldProps) &&
        callComponentWillReceiveProps(
          workInProgress,
          instance,
          nextProps,
          oldProps
        ));
    hasForceUpdate = !1;
    oldContext$jscomp$0 = workInProgress.memoizedState;
    instance.state = oldContext$jscomp$0;
    processUpdateQueue(workInProgress, nextProps, instance, renderLanes);
    var newState = workInProgress.memoizedState;
    nextContext !== getDerivedStateFromProps ||
    oldContext$jscomp$0 !== newState ||
    hasForceUpdate
      ? ("function" === typeof oldState &&
          (applyDerivedStateFromProps(
            workInProgress,
            Component,
            oldState,
            nextProps
          ),
          (newState = workInProgress.memoizedState)),
        (contextType =
          hasForceUpdate ||
          checkShouldComponentUpdate(
            workInProgress,
            Component,
            contextType,
            nextProps,
            oldContext$jscomp$0,
            newState,
            oldProps
          ))
          ? (oldContext ||
              ("function" !== typeof instance.UNSAFE_componentWillUpdate &&
                "function" !== typeof instance.componentWillUpdate) ||
              ("function" === typeof instance.componentWillUpdate &&
                instance.componentWillUpdate(nextProps, newState, oldProps),
              "function" === typeof instance.UNSAFE_componentWillUpdate &&
                instance.UNSAFE_componentWillUpdate(
                  nextProps,
                  newState,
                  oldProps
                )),
            "function" === typeof instance.componentDidUpdate &&
              (workInProgress.effectTag |= 4),
            "function" === typeof instance.getSnapshotBeforeUpdate &&
              (workInProgress.effectTag |= 256))
          : ("function" !== typeof instance.componentDidUpdate ||
              (nextContext === current.memoizedProps &&
                oldContext$jscomp$0 === current.memoizedState) ||
              (workInProgress.effectTag |= 4),
            "function" !== typeof instance.getSnapshotBeforeUpdate ||
              (nextContext === current.memoizedProps &&
                oldContext$jscomp$0 === current.memoizedState) ||
              (workInProgress.effectTag |= 256),
            (workInProgress.memoizedProps = nextProps),
            (workInProgress.memoizedState = newState)),
        (instance.props = nextProps),
        (instance.state = newState),
        (instance.context = oldProps),
        (nextProps = contextType))
      : ("function" !== typeof instance.componentDidUpdate ||
          (nextContext === current.memoizedProps &&
            oldContext$jscomp$0 === current.memoizedState) ||
          (workInProgress.effectTag |= 4),
        "function" !== typeof instance.getSnapshotBeforeUpdate ||
          (nextContext === current.memoizedProps &&
            oldContext$jscomp$0 === current.memoizedState) ||
          (workInProgress.effectTag |= 256),
        (nextProps = !1));
  }
  return finishClassComponent(
    current,
    workInProgress,
    Component,
    nextProps,
    !1,
    renderLanes
  );
}
function finishClassComponent(
  current,
  workInProgress,
  Component,
  shouldUpdate,
  hasContext,
  renderLanes
) {
  markRef(current, workInProgress);
  hasContext = 0 !== (workInProgress.effectTag & 64);
  if (!shouldUpdate && !hasContext)
    return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
  shouldUpdate = workInProgress.stateNode;
  ReactCurrentOwner$1.current = workInProgress;
  hasContext && "function" !== typeof Component.getDerivedStateFromError
    ? ((Component = null), (profilerStartTime = -1))
    : (Component = shouldUpdate.render());
  workInProgress.effectTag |= 1;
  null !== current && hasContext
    ? ((workInProgress.child = reconcileChildFibers(
        workInProgress,
        current.child,
        null,
        renderLanes
      )),
      (workInProgress.child = reconcileChildFibers(
        workInProgress,
        null,
        Component,
        renderLanes
      )))
    : reconcileChildren(current, workInProgress, Component, renderLanes);
  workInProgress.memoizedState = shouldUpdate.state;
  return workInProgress.child;
}
var SUSPENDED_MARKER = { dehydrated: null, retryLane: 0 };
function updateSuspenseComponent(current, workInProgress, renderLanes) {
  var nextProps = workInProgress.pendingProps,
    suspenseContext = suspenseStackCursor.current,
    showFallback = !1,
    didSuspend = 0 !== (workInProgress.effectTag & 64),
    JSCompiler_temp;
  (JSCompiler_temp = didSuspend) ||
    (JSCompiler_temp =
      null !== current && null === current.memoizedState
        ? !1
        : 0 !== (suspenseContext & 2));
  JSCompiler_temp
    ? ((showFallback = !0), (workInProgress.effectTag &= -65))
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
          ? (workInProgress.lanes = 1)
          : "$!" === current.data
          ? (markSpawnedWork(256), (workInProgress.lanes = 256))
          : ((workInProgress.lanes = 1073741824), markSpawnedWork(1073741824)),
        null
      );
    if (showFallback) {
      current = nextProps.fallback;
      showFallback = workInProgress.mode;
      var progressedPrimaryFragment = workInProgress.child;
      nextProps = { mode: "hidden", children: nextProps.children };
      0 === (showFallback & 2) && null !== progressedPrimaryFragment
        ? ((progressedPrimaryFragment.childLanes = 0),
          (progressedPrimaryFragment.pendingProps = nextProps),
          workInProgress.mode & 8 &&
            ((progressedPrimaryFragment.actualDuration = 0),
            (progressedPrimaryFragment.actualStartTime = -1),
            (progressedPrimaryFragment.selfBaseDuration = 0),
            (progressedPrimaryFragment.treeBaseDuration = 0)))
        : (progressedPrimaryFragment = createFiberFromOffscreen(
            nextProps,
            showFallback,
            0,
            null
          ));
      current = createFiberFromFragment(
        current,
        showFallback,
        renderLanes,
        null
      );
      progressedPrimaryFragment.return = workInProgress;
      current.return = workInProgress;
      progressedPrimaryFragment.sibling = current;
      workInProgress.child = progressedPrimaryFragment;
      workInProgress.child.memoizedState = { baseLanes: renderLanes };
      workInProgress.memoizedState = SUSPENDED_MARKER;
      return current;
    }
    return mountSuspensePrimaryChildren(
      workInProgress,
      nextProps.children,
      renderLanes
    );
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
        showFallback = nextProps.fallback;
        progressedPrimaryFragment = workInProgress.mode;
        nextProps = createFiberFromOffscreen(
          nextProps.children,
          progressedPrimaryFragment,
          0,
          null
        );
        showFallback = createFiberFromFragment(
          showFallback,
          progressedPrimaryFragment,
          renderLanes,
          null
        );
        showFallback.effectTag |= 2;
        nextProps.return = workInProgress;
        showFallback.return = workInProgress;
        nextProps.sibling = showFallback;
        workInProgress.child = nextProps;
        0 !== (workInProgress.mode & 2) &&
          reconcileChildFibers(
            workInProgress,
            current.child,
            null,
            renderLanes
          );
        workInProgress.child.memoizedState = { baseLanes: renderLanes };
        workInProgress.memoizedState = SUSPENDED_MARKER;
        return showFallback;
      }
      if (
        0 !== (executionContext & 64) ||
        0 === (workInProgress.mode & 2) ||
        "$!" === JSCompiler_temp.data
      )
        workInProgress = retrySuspenseComponentWithoutHydrating(
          current,
          workInProgress,
          renderLanes
        );
      else if (
        ((nextProps = 0 !== (renderLanes & current.childLanes)),
        didReceiveUpdate || nextProps)
      ) {
        nextProps = workInProgressRoot;
        if (null !== nextProps) {
          getHighestPriorityLanes(renderLanes);
          switch (return_highestLanePriority) {
            case 16:
            case 15:
              progressedPrimaryFragment = 0;
              break;
            case 14:
            case 13:
              progressedPrimaryFragment = 4;
              break;
            case 12:
            case 11:
              progressedPrimaryFragment = 32;
              break;
            case 10:
            case 9:
              progressedPrimaryFragment = 256;
              break;
            case 8:
            case 7:
              progressedPrimaryFragment = 16384;
              break;
            case 6:
            case 5:
              progressedPrimaryFragment = 1048576;
              break;
            case 4:
              progressedPrimaryFragment = 100663296;
              break;
            case 3:
            case 2:
              progressedPrimaryFragment = 134217728;
              break;
            case 1:
            case 0:
              progressedPrimaryFragment = 0;
              break;
            default:
              throw Error(
                formatProdErrorMessage(360, progressedPrimaryFragment)
              );
          }
          nextProps =
            0 !==
            (progressedPrimaryFragment &
              (nextProps.suspendedLanes | renderLanes))
              ? 0
              : progressedPrimaryFragment;
          0 !== nextProps &&
            nextProps !== suspenseContext.retryLane &&
            ((suspenseContext.retryLane = nextProps),
            scheduleUpdateOnFiber(current, nextProps, -1));
        }
        renderDidSuspendDelayIfPossible();
        workInProgress = retrySuspenseComponentWithoutHydrating(
          current,
          workInProgress,
          renderLanes
        );
      } else
        "$?" === JSCompiler_temp.data
          ? ((workInProgress.effectTag |= 64),
            (workInProgress.child = current.child),
            (workInProgress = retryDehydratedSuspenseBoundary.bind(
              null,
              current
            )),
            (workInProgress = tracing.unstable_wrap(workInProgress)),
            (JSCompiler_temp._reactRetry = workInProgress),
            (workInProgress = null))
          : ((nextHydratableInstance = getNextHydratable(
              JSCompiler_temp.nextSibling
            )),
            popToNextHostParent(workInProgress),
            (isHydrating = !0),
            (workInProgress = mountSuspensePrimaryChildren(
              workInProgress,
              workInProgress.pendingProps.children,
              renderLanes
            )),
            (workInProgress.effectTag |= 1024));
      return workInProgress;
    }
    if (showFallback)
      return (
        (nextProps = updateSuspenseFallbackChildren(
          current,
          workInProgress,
          nextProps.children,
          nextProps.fallback,
          renderLanes
        )),
        (showFallback = workInProgress.child),
        (progressedPrimaryFragment = current.child.memoizedState),
        (showFallback.memoizedState =
          null === progressedPrimaryFragment
            ? { baseLanes: renderLanes }
            : { baseLanes: progressedPrimaryFragment.baseLanes | renderLanes }),
        (showFallback.childLanes = current.childLanes & ~renderLanes),
        (workInProgress.memoizedState = SUSPENDED_MARKER),
        nextProps
      );
    renderLanes = updateSuspensePrimaryChildren(
      current,
      workInProgress,
      nextProps.children,
      renderLanes
    );
    workInProgress.memoizedState = null;
    return renderLanes;
  }
  if (showFallback)
    return (
      (nextProps = updateSuspenseFallbackChildren(
        current,
        workInProgress,
        nextProps.children,
        nextProps.fallback,
        renderLanes
      )),
      (showFallback = workInProgress.child),
      (progressedPrimaryFragment = current.child.memoizedState),
      (showFallback.memoizedState =
        null === progressedPrimaryFragment
          ? { baseLanes: renderLanes }
          : { baseLanes: progressedPrimaryFragment.baseLanes | renderLanes }),
      (showFallback.childLanes = current.childLanes & ~renderLanes),
      (workInProgress.memoizedState = SUSPENDED_MARKER),
      nextProps
    );
  renderLanes = updateSuspensePrimaryChildren(
    current,
    workInProgress,
    nextProps.children,
    renderLanes
  );
  workInProgress.memoizedState = null;
  return renderLanes;
}
function mountSuspensePrimaryChildren(
  workInProgress,
  primaryChildren,
  renderLanes
) {
  primaryChildren = createFiberFromOffscreen(
    { mode: "visible", children: primaryChildren },
    workInProgress.mode,
    renderLanes,
    null
  );
  primaryChildren.return = workInProgress;
  return (workInProgress.child = primaryChildren);
}
function updateSuspensePrimaryChildren(
  current,
  workInProgress,
  primaryChildren,
  renderLanes
) {
  var currentPrimaryChildFragment = current.child;
  current = currentPrimaryChildFragment.sibling;
  primaryChildren = createWorkInProgress(currentPrimaryChildFragment, {
    mode: "visible",
    children: primaryChildren
  });
  0 === (workInProgress.mode & 2) && (primaryChildren.lanes = renderLanes);
  primaryChildren.return = workInProgress;
  primaryChildren.sibling = null;
  null !== current &&
    ((current.nextEffect = null),
    (current.effectTag = 8),
    (workInProgress.firstEffect = workInProgress.lastEffect = current));
  return (workInProgress.child = primaryChildren);
}
function updateSuspenseFallbackChildren(
  current,
  workInProgress,
  primaryChildren,
  fallbackChildren,
  renderLanes
) {
  var mode = workInProgress.mode,
    currentPrimaryChildFragment = current.child;
  current = currentPrimaryChildFragment.sibling;
  var primaryChildProps = { mode: "hidden", children: primaryChildren };
  0 === (mode & 2)
    ? ((primaryChildren = workInProgress.child),
      (primaryChildren.childLanes = 0),
      (primaryChildren.pendingProps = primaryChildProps),
      workInProgress.mode & 8 &&
        ((primaryChildren.actualDuration = 0),
        (primaryChildren.actualStartTime = -1),
        (primaryChildren.selfBaseDuration =
          currentPrimaryChildFragment.selfBaseDuration),
        (primaryChildren.treeBaseDuration =
          currentPrimaryChildFragment.treeBaseDuration)),
      (currentPrimaryChildFragment = primaryChildren.lastEffect),
      null !== currentPrimaryChildFragment
        ? ((workInProgress.firstEffect = primaryChildren.firstEffect),
          (workInProgress.lastEffect = currentPrimaryChildFragment),
          (currentPrimaryChildFragment.nextEffect = null))
        : (workInProgress.firstEffect = workInProgress.lastEffect = null))
    : (primaryChildren = createWorkInProgress(
        currentPrimaryChildFragment,
        primaryChildProps
      ));
  null !== current
    ? (fallbackChildren = createWorkInProgress(current, fallbackChildren))
    : ((fallbackChildren = createFiberFromFragment(
        fallbackChildren,
        mode,
        renderLanes,
        null
      )),
      (fallbackChildren.effectTag |= 2));
  fallbackChildren.return = workInProgress;
  primaryChildren.return = workInProgress;
  primaryChildren.sibling = fallbackChildren;
  workInProgress.child = primaryChildren;
  return fallbackChildren;
}
function retrySuspenseComponentWithoutHydrating(
  current,
  workInProgress,
  renderLanes
) {
  reconcileChildFibers(workInProgress, current.child, null, renderLanes);
  current = mountSuspensePrimaryChildren(
    workInProgress,
    workInProgress.pendingProps.children,
    renderLanes
  );
  current.effectTag |= 2;
  workInProgress.memoizedState = null;
  return current;
}
function scheduleWorkOnFiber(fiber, renderLanes) {
  fiber.lanes |= renderLanes;
  var alternate = fiber.alternate;
  null !== alternate && (alternate.lanes |= renderLanes);
  scheduleWorkOnParentPath(fiber.return, renderLanes);
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
function updateSuspenseListComponent(current, workInProgress, renderLanes) {
  var nextProps = workInProgress.pendingProps,
    revealOrder = nextProps.revealOrder,
    tailMode = nextProps.tail;
  reconcileChildren(current, workInProgress, nextProps.children, renderLanes);
  nextProps = suspenseStackCursor.current;
  if (0 !== (nextProps & 2))
    (nextProps = (nextProps & 1) | 2), (workInProgress.effectTag |= 64);
  else {
    if (null !== current && 0 !== (current.effectTag & 64))
      a: for (current = workInProgress.child; null !== current; ) {
        if (13 === current.tag)
          null !== current.memoizedState &&
            scheduleWorkOnFiber(current, renderLanes);
        else if (19 === current.tag) scheduleWorkOnFiber(current, renderLanes);
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
        renderLanes = workInProgress.child;
        for (revealOrder = null; null !== renderLanes; )
          (current = renderLanes.alternate),
            null !== current &&
              null === findFirstSuspended(current) &&
              (revealOrder = renderLanes),
            (renderLanes = renderLanes.sibling);
        renderLanes = revealOrder;
        null === renderLanes
          ? ((revealOrder = workInProgress.child),
            (workInProgress.child = null))
          : ((revealOrder = renderLanes.sibling), (renderLanes.sibling = null));
        initSuspenseListRenderState(
          workInProgress,
          !1,
          revealOrder,
          renderLanes,
          tailMode,
          workInProgress.lastEffect
        );
        break;
      case "backwards":
        renderLanes = null;
        revealOrder = workInProgress.child;
        for (workInProgress.child = null; null !== revealOrder; ) {
          current = revealOrder.alternate;
          if (null !== current && null === findFirstSuspended(current)) {
            workInProgress.child = revealOrder;
            break;
          }
          current = revealOrder.sibling;
          revealOrder.sibling = renderLanes;
          renderLanes = revealOrder;
          revealOrder = current;
        }
        initSuspenseListRenderState(
          workInProgress,
          !0,
          renderLanes,
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
function bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes) {
  null !== current &&
    (workInProgress.dependencies_new = current.dependencies_new);
  profilerStartTime = -1;
  workInProgressRootSkippedLanes |= workInProgress.lanes;
  if (0 !== (renderLanes & workInProgress.childLanes)) {
    if (null !== current && workInProgress.child !== current.child)
      throw Error(formatProdErrorMessage(153));
    if (null !== workInProgress.child) {
      current = workInProgress.child;
      renderLanes = createWorkInProgress(current, current.pendingProps);
      workInProgress.child = renderLanes;
      for (renderLanes.return = workInProgress; null !== current.sibling; )
        (current = current.sibling),
          (renderLanes = renderLanes.sibling = createWorkInProgress(
            current,
            current.pendingProps
          )),
          (renderLanes.return = workInProgress);
      renderLanes.sibling = null;
    }
    return workInProgress.child;
  }
  return null;
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
function DO_NOT_USE_queryAllNodes(fn) {
  var currentFiber = this[internalInstanceKey] || null;
  if (null === currentFiber) return null;
  currentFiber = currentFiber.child;
  var scopedNodes = [];
  null !== currentFiber &&
    collectScopedNodesFromChildren(currentFiber, fn, scopedNodes);
  return 0 === scopedNodes.length ? null : scopedNodes;
}
function DO_NOT_USE_queryFirstNode(fn) {
  var currentFiber = this[internalInstanceKey] || null;
  if (null === currentFiber) return null;
  currentFiber = currentFiber.child;
  return null !== currentFiber
    ? collectFirstScopedNodeFromChildren(currentFiber, fn)
    : null;
}
function containsNode$1(node) {
  for (node = getClosestInstanceFromNode(node) || null; null !== node; ) {
    if (21 === node.tag && node.stateNode === this) return !0;
    node = node.return;
  }
  return !1;
}
function getChildContextValues(context) {
  var currentFiber = this[internalInstanceKey] || null;
  if (null === currentFiber) return [];
  currentFiber = currentFiber.child;
  var childContextValues = [];
  null !== currentFiber &&
    collectNearestChildContextValues(currentFiber, context, childContextValues);
  return childContextValues;
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
            ? ("string" !== typeof nextProp && "number" !== typeof nextProp) ||
              (current = current || []).push(propKey, "" + nextProp)
            : "DEPRECATED_flareListeners" !== propKey &&
              "suppressContentEditableWarning" !== propKey &&
              "suppressHydrationWarning" !== propKey &&
              (registrationNameModules.hasOwnProperty(propKey)
                ? (null != nextProp &&
                    ensureListeningTo(rootContainerInstance, propKey),
                  current || instance === nextProp || (current = []))
                : "object" === typeof nextProp &&
                  null !== nextProp &&
                  nextProp.$$typeof === REACT_OPAQUE_ID_TYPE
                ? nextProp.toString()
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
  if (!isHydrating)
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
        for (var lastTailNode$111 = null; null !== lastTailNode; )
          null !== lastTailNode.alternate && (lastTailNode$111 = lastTailNode),
            (lastTailNode = lastTailNode.sibling);
        null === lastTailNode$111
          ? hasRenderedATailFallback || null === renderState.tail
            ? (renderState.tail = null)
            : (renderState.tail.sibling = null)
          : (lastTailNode$111.sibling = null);
    }
}
function completeWork(current, workInProgress, renderLanes) {
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
      popHostContainer();
      resetWorkInProgressVersions();
      newProps = workInProgress.stateNode;
      newProps.pendingContext &&
        ((newProps.context = newProps.pendingContext),
        (newProps.pendingContext = null));
      if (null === current || null === current.child)
        popHydrationState(workInProgress)
          ? markUpdate(workInProgress)
          : newProps.hydrate || (workInProgress.effectTag |= 256);
      updateHostContainer(workInProgress);
      return null;
    case 5:
      popHostContext(workInProgress);
      renderLanes = requiredContext(rootInstanceStackCursor.current);
      var type = workInProgress.type;
      if (null !== current && null != workInProgress.stateNode)
        updateHostComponent$1(
          current,
          workInProgress,
          type,
          newProps,
          renderLanes
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
          type[internalPropsKey] = current;
          switch (type$jscomp$0) {
            case "iframe":
            case "object":
            case "embed":
              enableModernEventSystem || legacyTrapBubbledEvent("load", type);
              break;
            case "video":
            case "audio":
              if (!enableModernEventSystem)
                for (var i = 0; i < mediaEventTypes.length; i++)
                  legacyTrapBubbledEvent(mediaEventTypes[i], type);
              break;
            case "source":
              enableModernEventSystem || legacyTrapBubbledEvent("error", type);
              break;
            case "img":
            case "image":
            case "link":
              enableModernEventSystem ||
                (legacyTrapBubbledEvent("error", type),
                legacyTrapBubbledEvent("load", type));
              break;
            case "form":
              enableModernEventSystem ||
                (legacyTrapBubbledEvent("reset", type),
                legacyTrapBubbledEvent("submit", type));
              break;
            case "details":
              enableModernEventSystem || legacyTrapBubbledEvent("toggle", type);
              break;
            case "input":
              initWrapperState(type, current);
              enableModernEventSystem ||
                legacyTrapBubbledEvent("invalid", type);
              ensureListeningTo(renderLanes, "onChange");
              break;
            case "select":
              type._wrapperState = { wasMultiple: !!current.multiple };
              enableModernEventSystem ||
                legacyTrapBubbledEvent("invalid", type);
              ensureListeningTo(renderLanes, "onChange");
              break;
            case "textarea":
              initWrapperState$2(type, current),
                enableModernEventSystem ||
                  legacyTrapBubbledEvent("invalid", type),
                ensureListeningTo(renderLanes, "onChange");
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
                  ensureListeningTo(renderLanes, propKey);
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
              renderLanes
            );
        } else {
          propKey =
            9 === renderLanes.nodeType
              ? renderLanes
              : renderLanes.ownerDocument;
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
          current[internalPropsKey] = newProps;
          appendAllChildren(current, workInProgress, !1, !1);
          workInProgress.stateNode = current;
          propKey = newProps.DEPRECATED_flareListeners;
          null != propKey &&
            updateDeprecatedEventListeners(
              propKey,
              workInProgress,
              renderLanes
            );
          propKey = isCustomComponent(type, newProps);
          switch (type) {
            case "iframe":
            case "object":
            case "embed":
              enableModernEventSystem ||
                legacyTrapBubbledEvent("load", current);
              i = newProps;
              break;
            case "video":
            case "audio":
              if (!enableModernEventSystem)
                for (i = 0; i < mediaEventTypes.length; i++)
                  legacyTrapBubbledEvent(mediaEventTypes[i], current);
              i = newProps;
              break;
            case "source":
              enableModernEventSystem ||
                legacyTrapBubbledEvent("error", current);
              i = newProps;
              break;
            case "img":
            case "image":
            case "link":
              enableModernEventSystem ||
                (legacyTrapBubbledEvent("error", current),
                legacyTrapBubbledEvent("load", current));
              i = newProps;
              break;
            case "form":
              enableModernEventSystem ||
                (legacyTrapBubbledEvent("reset", current),
                legacyTrapBubbledEvent("submit", current));
              i = newProps;
              break;
            case "details":
              enableModernEventSystem ||
                legacyTrapBubbledEvent("toggle", current);
              i = newProps;
              break;
            case "input":
              initWrapperState(current, newProps);
              i = getHostProps(current, newProps);
              enableModernEventSystem ||
                legacyTrapBubbledEvent("invalid", current);
              ensureListeningTo(renderLanes, "onChange");
              break;
            case "option":
              i = getHostProps$1(current, newProps);
              break;
            case "select":
              current._wrapperState = { wasMultiple: !!newProps.multiple };
              i = Object.assign({}, newProps, { value: void 0 });
              enableModernEventSystem ||
                legacyTrapBubbledEvent("invalid", current);
              ensureListeningTo(renderLanes, "onChange");
              break;
            case "textarea":
              initWrapperState$2(current, newProps);
              i = getHostProps$3(current, newProps);
              enableModernEventSystem ||
                legacyTrapBubbledEvent("invalid", current);
              ensureListeningTo(renderLanes, "onChange");
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
                      ensureListeningTo(renderLanes, type$jscomp$0)
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
              renderLanes = newProps.value;
              null != renderLanes
                ? updateOptions(current, !!newProps.multiple, renderLanes, !1)
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
        renderLanes = requiredContext(rootInstanceStackCursor.current);
        requiredContext(contextStackCursor.current);
        popHydrationState(workInProgress)
          ? ((newProps = workInProgress.stateNode),
            (renderLanes = workInProgress.memoizedProps),
            (newProps[internalInstanceKey] = workInProgress),
            newProps.nodeValue !== renderLanes && markUpdate(workInProgress))
          : ((newProps = (9 === renderLanes.nodeType
              ? renderLanes
              : renderLanes.ownerDocument
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
          markSpawnedWork(1073741824);
        } else
          resetHydrationState(),
            0 === (workInProgress.effectTag & 64) &&
              (workInProgress.memoizedState = null),
            (workInProgress.effectTag |= 4);
        return null;
      }
      if (0 !== (workInProgress.effectTag & 64))
        return (
          (workInProgress.lanes = renderLanes),
          0 !== (workInProgress.mode & 8) &&
            transferActualDuration(workInProgress),
          workInProgress
        );
      newProps = null !== newProps;
      renderLanes = !1;
      null === current
        ? void 0 !== workInProgress.memoizedProps.fallback &&
          popHydrationState(workInProgress)
        : (renderLanes = null !== current.memoizedState);
      newProps &&
        !renderLanes &&
        0 !== (workInProgress.mode & 2) &&
        ((null === current &&
          !0 !== workInProgress.memoizedProps.unstable_avoidThisFallback) ||
        0 !== (suspenseStackCursor.current & 1)
          ? 0 === workInProgressRootExitStatus &&
            (workInProgressRootExitStatus = 3)
          : renderDidSuspendDelayIfPossible());
      if (newProps || renderLanes) workInProgress.effectTag |= 4;
      null !== workInProgress.updateQueue &&
        null != workInProgress.memoizedProps.suspenseCallback &&
        (workInProgress.effectTag |= 4);
      return null;
    case 4:
      return (
        popHostContainer(),
        updateHostContainer(workInProgress),
        null === current &&
          enableModernEventSystem &&
          listenToEvent("onMouseEnter", workInProgress.stateNode.containerInfo),
        null
      );
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
                newProps = renderLanes;
                for (renderLanes = workInProgress.child; null !== renderLanes; )
                  (type = renderLanes),
                    (current = newProps),
                    (type.effectTag &= 2),
                    (type.nextEffect = null),
                    (type.firstEffect = null),
                    (type.lastEffect = null),
                    (type$jscomp$0 = type.alternate),
                    null === type$jscomp$0
                      ? ((type.childLanes = 0),
                        (type.lanes = current),
                        (type.child = null),
                        (type.memoizedProps = null),
                        (type.memoizedState = null),
                        (type.updateQueue = null),
                        (type.dependencies_new = null),
                        (type.stateNode = null),
                        (type.selfBaseDuration = 0),
                        (type.treeBaseDuration = 0))
                      : ((type.childLanes = type$jscomp$0.childLanes),
                        (type.lanes = type$jscomp$0.lanes),
                        (type.child = type$jscomp$0.child),
                        (type.memoizedProps = type$jscomp$0.memoizedProps),
                        (type.memoizedState = type$jscomp$0.memoizedState),
                        (type.updateQueue = type$jscomp$0.updateQueue),
                        (type.type = type$jscomp$0.type),
                        (current = type$jscomp$0.dependencies_new),
                        (type.dependencies_new =
                          null === current
                            ? null
                            : {
                                lanes: current.lanes,
                                firstContext: current.firstContext,
                                responders: current.responders
                              }),
                        (type.selfBaseDuration =
                          type$jscomp$0.selfBaseDuration),
                        (type.treeBaseDuration =
                          type$jscomp$0.treeBaseDuration)),
                    (renderLanes = renderLanes.sibling);
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
              (renderLanes = current.updateQueue),
              null !== renderLanes &&
                ((workInProgress.updateQueue = renderLanes),
                (workInProgress.effectTag |= 4)),
              cutOffTailIfNeeded(newProps, !0),
              null === newProps.tail &&
                "hidden" === newProps.tailMode &&
                !type$jscomp$0.alternate &&
                !isHydrating)
            )
              return (
                (workInProgress = workInProgress.lastEffect =
                  newProps.lastEffect),
                null !== workInProgress && (workInProgress.nextEffect = null),
                null
              );
          } else
            2 * now() - newProps.renderingStartTime > newProps.tailExpiration &&
              1073741824 !== renderLanes &&
              ((workInProgress.effectTag |= 64),
              (type = !0),
              cutOffTailIfNeeded(newProps, !1),
              (workInProgress.lanes = renderLanes),
              markSpawnedWork(renderLanes));
        newProps.isBackwards
          ? ((type$jscomp$0.sibling = workInProgress.child),
            (workInProgress.child = type$jscomp$0))
          : ((renderLanes = newProps.last),
            null !== renderLanes
              ? (renderLanes.sibling = type$jscomp$0)
              : (workInProgress.child = type$jscomp$0),
            (newProps.last = type$jscomp$0));
      }
      return null !== newProps.tail
        ? (0 === newProps.tailExpiration &&
            (newProps.tailExpiration = now() + 500),
          (renderLanes = newProps.tail),
          (newProps.rendering = renderLanes),
          (newProps.tail = renderLanes.sibling),
          (newProps.lastEffect = workInProgress.lastEffect),
          (newProps.renderingStartTime = now()),
          (renderLanes.sibling = null),
          (workInProgress = suspenseStackCursor.current),
          push(
            suspenseStackCursor,
            type ? (workInProgress & 1) | 2 : workInProgress & 1
          ),
          renderLanes)
        : null;
    case 21:
      return (
        null === current
          ? ((renderLanes = {
              DO_NOT_USE_queryAllNodes: DO_NOT_USE_queryAllNodes,
              DO_NOT_USE_queryFirstNode: DO_NOT_USE_queryFirstNode,
              containsNode: containsNode$1,
              getChildContextValues: getChildContextValues
            }),
            (workInProgress.stateNode = renderLanes),
            (newProps = newProps.DEPRECATED_flareListeners),
            null != newProps &&
              ((type = requiredContext(rootInstanceStackCursor.current)),
              updateDeprecatedEventListeners(newProps, workInProgress, type)),
            (renderLanes[internalInstanceKey] = workInProgress),
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
    case 23:
    case 24:
      return (
        popRenderLanes(),
        null !== current &&
          (null !== current.memoizedState) !==
            (null !== workInProgress.memoizedState) &&
          "unstable-defer-without-hiding" !== newProps.mode &&
          (workInProgress.effectTag |= 4),
        null
      );
  }
  throw Error(formatProdErrorMessage(156, workInProgress.tag));
}
function unwindWork(workInProgress) {
  switch (workInProgress.tag) {
    case 1:
      var effectTag = workInProgress.effectTag;
      return effectTag & 4096
        ? ((workInProgress.effectTag = (effectTag & -4097) | 64),
          0 !== (workInProgress.mode & 8) &&
            transferActualDuration(workInProgress),
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
          0 !== (workInProgress.mode & 8) &&
            transferActualDuration(workInProgress),
          workInProgress)
        : null;
    case 19:
      return pop(suspenseStackCursor), null;
    case 4:
      return popHostContainer(), null;
    case 10:
      return popProvider(workInProgress), null;
    case 23:
    case 24:
      return popRenderLanes(), null;
    default:
      return null;
  }
}
function createCapturedValue(value, source) {
  try {
    var info = "",
      node = source;
    do (info += describeFiber(node)), (node = node.return);
    while (node);
    var JSCompiler_inline_result = info;
  } catch (x) {
    JSCompiler_inline_result =
      "\nError generating stack: " + x.message + "\n" + x.stack;
  }
  return { value: value, source: source, stack: JSCompiler_inline_result };
}
var ReactFiberErrorDialogWWW = require("ReactFiberErrorDialog");
if ("function" !== typeof ReactFiberErrorDialogWWW.showErrorDialog)
  throw Error(formatProdErrorMessage(320));
function logCapturedError(boundary, errorInfo) {
  try {
    !1 !==
      ReactFiberErrorDialogWWW.showErrorDialog({
        componentStack: null !== errorInfo.stack ? errorInfo.stack : "",
        error: errorInfo.value,
        errorBoundary:
          null !== boundary && 1 === boundary.tag ? boundary.stateNode : null
      }) && console.error(errorInfo.value);
  } catch (e$129) {
    setTimeout(function() {
      throw e$129;
    });
  }
}
var PossiblyWeakMap = "function" === typeof WeakMap ? WeakMap : Map;
function createRootErrorUpdate(fiber, errorInfo, lane) {
  lane = createUpdate(-1, lane, null);
  lane.tag = 3;
  lane.payload = { element: null };
  var error = errorInfo.value;
  lane.callback = function() {
    hasUncaughtError || ((hasUncaughtError = !0), (firstUncaughtError = error));
    logCapturedError(fiber, errorInfo);
  };
  return lane;
}
function createClassErrorUpdate(fiber, errorInfo, lane) {
  lane = createUpdate(-1, lane, null);
  lane.tag = 3;
  var getDerivedStateFromError = fiber.type.getDerivedStateFromError;
  if ("function" === typeof getDerivedStateFromError) {
    var error = errorInfo.value;
    lane.payload = function() {
      logCapturedError(fiber, errorInfo);
      return getDerivedStateFromError(error);
    };
  }
  var inst = fiber.stateNode;
  null !== inst &&
    "function" === typeof inst.componentDidCatch &&
    (lane.callback = function() {
      "function" !== typeof getDerivedStateFromError &&
        (null === legacyErrorBoundariesThatAlreadyFailed
          ? (legacyErrorBoundariesThatAlreadyFailed = new Set([this]))
          : legacyErrorBoundariesThatAlreadyFailed.add(this),
        logCapturedError(fiber, errorInfo));
      var stack = errorInfo.stack;
      this.componentDidCatch(errorInfo.value, {
        componentStack: null !== stack ? stack : ""
      });
    });
  return lane;
}
var PossiblyWeakSet = "function" === typeof WeakSet ? WeakSet : Set;
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
      finishedWork.effectTag & 256 &&
        clearContainer(finishedWork.stateNode.containerInfo);
      return;
    case 5:
    case 6:
    case 4:
    case 17:
      return;
  }
  throw Error(formatProdErrorMessage(163));
}
function commitHookEffectListUnmount(tag, finishedWork) {
  finishedWork = finishedWork.updateQueue;
  finishedWork = null !== finishedWork ? finishedWork.lastEffect : null;
  if (null !== finishedWork) {
    var effect = (finishedWork = finishedWork.next);
    do {
      if ((effect.tag & tag) === tag) {
        var destroy = effect.destroy;
        effect.destroy = void 0;
        void 0 !== destroy && destroy();
      }
      effect = effect.next;
    } while (effect !== finishedWork);
  }
}
function commitHookEffectListMount(tag, finishedWork) {
  finishedWork = finishedWork.updateQueue;
  finishedWork = null !== finishedWork ? finishedWork.lastEffect : null;
  if (null !== finishedWork) {
    var effect = (finishedWork = finishedWork.next);
    do {
      if ((effect.tag & tag) === tag) {
        var create = effect.create;
        effect.destroy = create();
      }
      effect = effect.next;
    } while (effect !== finishedWork);
  }
}
function commitLifeCycles(finishedRoot, current, finishedWork) {
  switch (finishedWork.tag) {
    case 0:
    case 11:
    case 15:
    case 22:
      if (finishedWork.mode & 8)
        try {
          (layoutEffectStartTime = now$1()),
            commitHookEffectListMount(3, finishedWork);
        } finally {
          recordLayoutEffectDuration(finishedWork);
        }
      else commitHookEffectListMount(3, finishedWork);
      finishedRoot = finishedWork.updateQueue;
      finishedRoot = null !== finishedRoot ? finishedRoot.lastEffect : null;
      if (null !== finishedRoot) {
        current = finishedRoot = finishedRoot.next;
        do {
          var _effect = current,
            next = _effect.next;
          _effect = _effect.tag;
          0 !== (_effect & 4) &&
            0 !== (_effect & 1) &&
            (enqueuePendingPassiveHookEffectUnmount(finishedWork, current),
            enqueuePendingPassiveHookEffectMount(finishedWork, current));
          current = next;
        } while (current !== finishedRoot);
      }
      return;
    case 1:
      finishedRoot = finishedWork.stateNode;
      if (finishedWork.effectTag & 4)
        if (null === current)
          if (finishedWork.mode & 8)
            try {
              (layoutEffectStartTime = now$1()),
                finishedRoot.componentDidMount();
            } finally {
              recordLayoutEffectDuration(finishedWork);
            }
          else finishedRoot.componentDidMount();
        else if (
          ((next =
            finishedWork.elementType === finishedWork.type
              ? current.memoizedProps
              : resolveDefaultProps(finishedWork.type, current.memoizedProps)),
          (current = current.memoizedState),
          finishedWork.mode & 8)
        )
          try {
            (layoutEffectStartTime = now$1()),
              finishedRoot.componentDidUpdate(
                next,
                current,
                finishedRoot.__reactInternalSnapshotBeforeUpdate
              );
          } finally {
            recordLayoutEffectDuration(finishedWork);
          }
        else
          finishedRoot.componentDidUpdate(
            next,
            current,
            finishedRoot.__reactInternalSnapshotBeforeUpdate
          );
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
      _effect = finishedWork.memoizedProps;
      next = _effect.onCommit;
      var onRender = _effect.onRender;
      _effect = finishedWork.stateNode.effectDuration;
      var commitTime$140 = commitTime;
      "function" === typeof onRender &&
        onRender(
          finishedWork.memoizedProps.id,
          null === current ? "mount" : "update",
          finishedWork.actualDuration,
          finishedWork.treeBaseDuration,
          finishedWork.actualStartTime,
          commitTime$140,
          finishedRoot.memoizedInteractions
        );
      "function" === typeof next &&
        next(
          finishedWork.memoizedProps.id,
          null === current ? "mount" : "update",
          _effect,
          commitTime$140,
          finishedRoot.memoizedInteractions
        );
      enqueuePendingPassiveProfilerEffect(finishedWork);
      for (finishedWork = finishedWork.return; null !== finishedWork; ) {
        if (12 === finishedWork.tag) {
          finishedWork.stateNode.effectDuration += _effect;
          break;
        }
        finishedWork = finishedWork.return;
      }
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
    case 23:
    case 24:
      return;
  }
  throw Error(formatProdErrorMessage(163));
}
function hideOrUnhideAllChildren(finishedWork, isHidden) {
  for (var node = finishedWork; ; ) {
    if (5 === node.tag) {
      var instance = node.stateNode;
      if (isHidden)
        (instance = instance.style),
          "function" === typeof instance.setProperty
            ? instance.setProperty("display", "none", "important")
            : (instance.display = "none");
      else {
        instance = node.stateNode;
        var styleProp = node.memoizedProps.style;
        styleProp =
          void 0 !== styleProp &&
          null !== styleProp &&
          styleProp.hasOwnProperty("display")
            ? styleProp.display
            : null;
        instance.style.display = dangerousStyleValue("display", styleProp);
      }
    } else if (6 === node.tag)
      node.stateNode.nodeValue = isHidden ? "" : node.memoizedProps;
    else if (
      ((23 !== node.tag && 24 !== node.tag) ||
        null === node.memoizedState ||
        node === finishedWork) &&
      null !== node.child
    ) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === finishedWork) break;
    for (; null === node.sibling; ) {
      if (null === node.return || node.return === finishedWork) return;
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
}
function commitUnmount(finishedRoot, current) {
  if (injectedHook && "function" === typeof injectedHook.onCommitFiberUnmount)
    try {
      injectedHook.onCommitFiberUnmount(rendererID, current);
    } catch (err) {}
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
            else if (current.mode & 8) {
              layoutEffectStartTime = now$1();
              _effect2 = current;
              try {
                destroy();
              } catch (error) {
                captureCommitPhaseError(_effect2, error);
              }
              recordLayoutEffectDuration(current);
            } else {
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
          if (
            ((finishedRoot.props = current.memoizedProps),
            (finishedRoot.state = current.memoizedState),
            current.mode & 8)
          )
            try {
              (layoutEffectStartTime = now$1()),
                finishedRoot.componentWillUnmount();
            } finally {
              recordLayoutEffectDuration(current);
            }
          else finishedRoot.componentWillUnmount();
        } catch (unmountError) {
          captureCommitPhaseError(current, unmountError);
        }
      break;
    case 5:
      unmountDeprecatedResponderListeners(current);
      null !== current.ref &&
        clearEventHandleListenersForTarget(current.stateNode);
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
      unmountDeprecatedResponderListeners(current),
        (finishedRoot = current.stateNode),
        null !== current.ref &&
          clearEventHandleListenersForTarget(finishedRoot),
        safelyDetachRef(current);
  }
}
function detachFiberMutation(fiber) {
  fiber.alternate = null;
  fiber.child = null;
  fiber.dependencies_new = null;
  fiber.firstEffect = null;
  fiber.lastEffect = null;
  fiber.memoizedProps = null;
  fiber.memoizedState = null;
  fiber.pendingProps = null;
  fiber.return = null;
  fiber.stateNode = null;
  fiber.updateQueue = null;
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
      if (finishedWork.mode & 8)
        try {
          (layoutEffectStartTime = now$1()),
            commitHookEffectListUnmount(3, finishedWork);
        } finally {
          recordLayoutEffectDuration(finishedWork);
        }
      else commitHookEffectListUnmount(3, finishedWork);
      return;
    case 1:
      return;
    case 5:
      var instance = finishedWork.stateNode;
      if (null != instance) {
        var newProps = finishedWork.memoizedProps;
        current = null !== current ? current.memoizedProps : newProps;
        var type = finishedWork.type,
          updatePayload = finishedWork.updateQueue;
        finishedWork.updateQueue = null;
        if (null !== updatePayload) {
          instance[internalPropsKey] = newProps;
          "input" === type &&
            "radio" === newProps.type &&
            null != newProps.name &&
            updateChecked(instance, newProps);
          isCustomComponent(type, current);
          for (
            var isCustomComponentTag = isCustomComponent(type, newProps), i = 0;
            i < updatePayload.length;
            i += 2
          ) {
            var propKey = updatePayload[i],
              propValue = updatePayload[i + 1];
            "style" === propKey
              ? setValueForStyles(instance, propValue)
              : "dangerouslySetInnerHTML" === propKey
              ? setInnerHTML(instance, propValue)
              : "children" === propKey
              ? setTextContent(instance, propValue)
              : setValueForProperty(
                  instance,
                  propKey,
                  propValue,
                  isCustomComponentTag
                );
          }
          switch (type) {
            case "input":
              updateWrapper(instance, newProps);
              break;
            case "textarea":
              updateWrapper$1(instance, newProps);
              break;
            case "select":
              (type = instance._wrapperState.wasMultiple),
                (instance._wrapperState.wasMultiple = !!newProps.multiple),
                (updatePayload = newProps.value),
                null != updatePayload
                  ? updateOptions(
                      instance,
                      !!newProps.multiple,
                      updatePayload,
                      !1
                    )
                  : type !== !!newProps.multiple &&
                    (null != newProps.defaultValue
                      ? updateOptions(
                          instance,
                          !!newProps.multiple,
                          newProps.defaultValue,
                          !0
                        )
                      : updateOptions(
                          instance,
                          !!newProps.multiple,
                          newProps.multiple ? [] : "",
                          !1
                        ));
          }
        }
        instance = newProps.DEPRECATED_flareListeners;
        current.DEPRECATED_flareListeners !== instance &&
          updateDeprecatedEventListeners(instance, finishedWork, null);
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
      instance = finishedWork.memoizedState;
      null !== instance &&
        ((globalMostRecentFallbackTime = now()),
        hideOrUnhideAllChildren(finishedWork.child, !0));
      null !== instance &&
        ((instance = finishedWork.memoizedProps.suspenseCallback),
        "function" === typeof instance &&
          ((newProps = finishedWork.updateQueue),
          null !== newProps && instance(new Set(newProps))));
      attachSuspenseRetryListeners(finishedWork);
      return;
    case 19:
      attachSuspenseRetryListeners(finishedWork);
      return;
    case 17:
      return;
    case 21:
      instance = finishedWork.stateNode;
      newProps = finishedWork.memoizedProps;
      type = newProps.DEPRECATED_flareListeners;
      ((null !== current ? current.memoizedProps : newProps)
        .DEPRECATED_flareListeners === type &&
        null !== current) ||
        updateDeprecatedEventListeners(type, finishedWork, null);
      instance[internalInstanceKey] = finishedWork;
      return;
    case 23:
    case 24:
      hideOrUnhideAllChildren(
        finishedWork,
        null !== finishedWork.memoizedState
      );
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
        (!0 !== wakeable.__reactDoNotTraceInteractions &&
          (retry = tracing.unstable_wrap(retry)),
        retryCache.add(wakeable),
        wakeable.then(retry, retry));
    });
  }
}
var ceil = Math.ceil,
  ReactCurrentDispatcher$2 = ReactSharedInternals.ReactCurrentDispatcher,
  ReactCurrentOwner$2 = ReactSharedInternals.ReactCurrentOwner,
  executionContext = 0,
  workInProgressRoot = null,
  workInProgress = null,
  workInProgressRootRenderLanes = 0,
  subtreeRenderLanes = 0,
  subtreeRenderLanesCursor = { current: 0 },
  workInProgressRootExitStatus = 0,
  workInProgressRootFatalError = null,
  workInProgressRootLatestProcessedEventTime = -1,
  workInProgressRootLatestSuspenseTimeout = -1,
  workInProgressRootCanSuspendUsingConfig = null,
  workInProgressRootIncludedLanes = 0,
  workInProgressRootSkippedLanes = 0,
  workInProgressRootUpdatedLanes = 0,
  workInProgressRootPingedLanes = 0,
  mostRecentlyUpdatedRoot = null,
  globalMostRecentFallbackTime = 0,
  nextEffect = null,
  hasUncaughtError = !1,
  firstUncaughtError = null,
  legacyErrorBoundariesThatAlreadyFailed = null,
  rootDoesHavePassiveEffects = !1,
  rootWithPendingPassiveEffects = null,
  pendingPassiveEffectsRenderPriority = 90,
  pendingPassiveEffectsLanes = 0,
  pendingPassiveHookEffectsMount = [],
  pendingPassiveHookEffectsUnmount = [],
  pendingPassiveProfilerEffects = [],
  rootsWithPendingDiscreteUpdates = null,
  nestedUpdateCount = 0,
  rootWithNestedUpdates = null,
  spawnedWorkDuringRender = null,
  currentEventTime = -1,
  currentEventWipLanes = 0,
  currentEventPendingLanes = 0,
  focusedInstanceHandle = null,
  shouldFireAfterActiveInstanceBlur = !1;
function requestEventTime() {
  return 0 !== (executionContext & 48)
    ? now()
    : -1 !== currentEventTime
    ? currentEventTime
    : (currentEventTime = now());
}
function requestUpdateLane(fiber, suspenseConfig) {
  fiber = fiber.mode;
  if (0 === (fiber & 2)) return 1;
  if (0 === (fiber & 4)) return 99 === getCurrentPriorityLevel() ? 1 : 2;
  if (
    !deferRenderPhaseUpdateToNextBatch &&
    0 !== (executionContext & 16) &&
    0 !== workInProgressRootRenderLanes
  )
    return getLowestPriorityLane(workInProgressRootRenderLanes);
  0 === currentEventWipLanes &&
    (currentEventWipLanes = workInProgressRootIncludedLanes);
  if (null !== suspenseConfig) {
    suspenseConfig = suspenseConfig.timeoutMs;
    fiber = void 0 === suspenseConfig || 1e4 > (suspenseConfig | 0) ? 7 : 5;
    0 !== currentEventPendingLanes &&
      (currentEventPendingLanes =
        null !== mostRecentlyUpdatedRoot
          ? mostRecentlyUpdatedRoot.pendingLanes
          : 0);
    suspenseConfig = currentEventWipLanes;
    var pendingLanes = currentEventPendingLanes;
    if (7 === fiber)
      (fiber = findLane(15, 20, suspenseConfig | pendingLanes)),
        0 === fiber &&
          ((fiber = findLane(15, 20, suspenseConfig)),
          0 === fiber && (fiber = 16384)),
        (suspenseConfig = fiber);
    else if (5 === fiber)
      (fiber = findLane(21, 26, suspenseConfig | pendingLanes)),
        0 === fiber &&
          ((fiber = findLane(21, 26, suspenseConfig)),
          0 === fiber && (fiber = 1048576)),
        (suspenseConfig = fiber);
    else throw Error(formatProdErrorMessage(359, fiber));
  } else
    (suspenseConfig = getCurrentPriorityLevel()),
      0 !== (executionContext & 4) && 98 === suspenseConfig
        ? (suspenseConfig = findUpdateLane(13, currentEventWipLanes))
        : ((suspenseConfig = schedulerPriorityToLanePriority(suspenseConfig)),
          (suspenseConfig = findUpdateLane(
            suspenseConfig,
            currentEventWipLanes
          )));
  return suspenseConfig;
}
function scheduleUpdateOnFiber(fiber, lane, eventTime) {
  if (50 < nestedUpdateCount)
    throw ((nestedUpdateCount = 0),
    (rootWithNestedUpdates = null),
    Error(formatProdErrorMessage(185)));
  fiber = markUpdateLaneFromFiberToRoot(fiber, lane);
  if (null === fiber) return null;
  var priorityLevel = getCurrentPriorityLevel();
  1 === lane
    ? 0 !== (executionContext & 8) && 0 === (executionContext & 48)
      ? (schedulePendingInteractions(fiber, lane), performSyncWorkOnRoot(fiber))
      : (ensureRootIsScheduled(fiber, eventTime),
        schedulePendingInteractions(fiber, lane),
        0 === executionContext && flushSyncCallbackQueue())
    : (0 === (executionContext & 4) ||
        (98 !== priorityLevel && 99 !== priorityLevel) ||
        (null === rootsWithPendingDiscreteUpdates
          ? (rootsWithPendingDiscreteUpdates = new Set([fiber]))
          : rootsWithPendingDiscreteUpdates.add(fiber)),
      ensureRootIsScheduled(fiber, eventTime),
      schedulePendingInteractions(fiber, lane));
  mostRecentlyUpdatedRoot = fiber;
}
function markUpdateLaneFromFiberToRoot(fiber, lane) {
  fiber.lanes |= lane;
  var alternate = fiber.alternate;
  null !== alternate && (alternate.lanes |= lane);
  var node = fiber.return,
    root = null;
  if (null === node && 3 === fiber.tag) root = fiber.stateNode;
  else
    for (; null !== node; ) {
      alternate = node.alternate;
      node.childLanes |= lane;
      null !== alternate && (alternate.childLanes |= lane);
      if (null === node.return && 3 === node.tag) {
        root = node.stateNode;
        break;
      }
      node = node.return;
    }
  if (
    null !== root &&
    ((fiber = root),
    (fiber.pendingLanes |= lane),
    (alternate = lane - 1),
    (fiber.suspendedLanes &= alternate),
    (fiber.pingedLanes &= alternate),
    workInProgressRoot === root)
  ) {
    if (deferRenderPhaseUpdateToNextBatch || 0 === (executionContext & 16))
      workInProgressRootUpdatedLanes |= lane;
    4 === workInProgressRootExitStatus &&
      markRootSuspended$1(root, workInProgressRootRenderLanes);
  }
  return root;
}
function ensureRootIsScheduled(root, currentTime) {
  for (
    var existingCallbackNode = root.callbackNode,
      suspendedLanes = root.suspendedLanes,
      pingedLanes = root.pingedLanes,
      expirationTimes = root.expirationTimes,
      lanes = root.pendingLanes;
    0 < lanes;

  ) {
    var index$40 = 31 - clz32(lanes),
      lane = 1 << index$40,
      expirationTime = expirationTimes[index$40];
    if (-1 === expirationTime) {
      if (0 === (lane & suspendedLanes) || 0 !== (lane & pingedLanes)) {
        expirationTime = currentTime;
        getHighestPriorityLanes(lane);
        var priority = return_highestLanePriority;
        expirationTimes[index$40] =
          11 <= priority
            ? expirationTime + 1e3
            : 5 <= priority
            ? expirationTime + 5e3
            : -1;
      }
    } else expirationTime <= currentTime && (root.expiredLanes |= lane);
    lanes &= ~lane;
  }
  currentTime = getNextLanes(
    root,
    root === workInProgressRoot ? workInProgressRootRenderLanes : 0
  );
  suspendedLanes = return_highestLanePriority;
  if (0 === currentTime)
    null !== existingCallbackNode &&
      (existingCallbackNode !== fakeCallbackNode &&
        Scheduler_cancelCallback(existingCallbackNode),
      (root.callbackNode = null),
      (root.callbackPriority_new = 0),
      (root.callbackId = 0));
  else {
    pingedLanes = root.callbackId;
    expirationTimes = root.callbackPriority_new;
    if (0 !== pingedLanes) {
      if (currentTime === pingedLanes && expirationTimes === suspendedLanes)
        return;
      existingCallbackNode !== fakeCallbackNode &&
        Scheduler_cancelCallback(existingCallbackNode);
    }
    16 === suspendedLanes
      ? ((existingCallbackNode = performSyncWorkOnRoot.bind(null, root)),
        null === syncQueue
          ? ((syncQueue = [existingCallbackNode]),
            (immediateQueueCallbackNode = Scheduler_scheduleCallback(
              Scheduler_ImmediatePriority,
              flushSyncCallbackQueueImpl
            )))
          : syncQueue.push(existingCallbackNode),
        (existingCallbackNode = fakeCallbackNode))
      : ((existingCallbackNode = lanePriorityToSchedulerPriority(
          suspendedLanes
        )),
        (existingCallbackNode = scheduleCallback(
          existingCallbackNode,
          performConcurrentWorkOnRoot.bind(null, root)
        )));
    root.callbackId = currentTime;
    root.callbackPriority_new = suspendedLanes;
    root.callbackNode = existingCallbackNode;
  }
}
function performConcurrentWorkOnRoot(root, didTimeout) {
  currentEventTime = -1;
  currentEventPendingLanes = currentEventWipLanes = 0;
  if (0 !== (executionContext & 48)) throw Error(formatProdErrorMessage(327));
  flushPassiveEffects();
  var lanes = getNextLanes(
    root,
    root === workInProgressRoot ? workInProgressRootRenderLanes : 0
  );
  if (0 === lanes) return null;
  if (didTimeout)
    return (
      (root.expiredLanes |= lanes & root.pendingLanes),
      ensureRootIsScheduled(root, now()),
      null
    );
  didTimeout = root.callbackNode;
  var lanes$jscomp$0 = lanes;
  var exitStatus = executionContext;
  executionContext |= 16;
  var prevDispatcher = pushDispatcher();
  if (
    workInProgressRoot !== root ||
    workInProgressRootRenderLanes !== lanes$jscomp$0
  )
    prepareFreshStack(root, lanes$jscomp$0),
      startWorkOnPendingInteractions(root, lanes$jscomp$0);
  lanes$jscomp$0 = pushInteractions(root);
  do
    try {
      workLoopConcurrent();
      break;
    } catch (thrownValue) {
      handleError(root, thrownValue);
    }
  while (1);
  resetContextDependencies();
  tracing.__interactionsRef.current = lanes$jscomp$0;
  ReactCurrentDispatcher$2.current = prevDispatcher;
  executionContext = exitStatus;
  null !== workInProgress
    ? (exitStatus = 0)
    : ((workInProgressRoot = null),
      (workInProgressRootRenderLanes = 0),
      (exitStatus = workInProgressRootExitStatus));
  if (0 !== (workInProgressRootIncludedLanes & workInProgressRootUpdatedLanes))
    prepareFreshStack(root, 0);
  else if (0 !== exitStatus) {
    2 === exitStatus &&
      ((executionContext |= 64),
      root.hydrate && ((root.hydrate = !1), clearContainer(root.containerInfo)),
      (lanes = getLanesToRetrySynchronouslyOnError(root)),
      0 !== lanes && (exitStatus = renderRootSync(root, lanes)));
    if (1 === exitStatus)
      throw ((didTimeout = workInProgressRootFatalError),
      prepareFreshStack(root, 0),
      markRootSuspended$1(root, lanes),
      ensureRootIsScheduled(root, now()),
      didTimeout);
    root.finishedWork = root.current.alternate;
    root.finishedLanes = lanes;
    switch (exitStatus) {
      case 0:
      case 1:
        throw Error(formatProdErrorMessage(345));
      case 2:
        commitRoot(root);
        break;
      case 3:
        markRootSuspended$1(root, lanes);
        if (
          -1 === workInProgressRootLatestProcessedEventTime &&
          ((exitStatus = globalMostRecentFallbackTime + 500 - now()),
          10 < exitStatus)
        ) {
          if (0 !== getNextLanes(root, 0)) break;
          prevDispatcher = root.suspendedLanes;
          if ((prevDispatcher & lanes) !== lanes) {
            requestEventTime();
            root.pingedLanes |= root.suspendedLanes & prevDispatcher;
            break;
          }
          root.timeoutHandle = scheduleTimeout(
            commitRoot.bind(null, root),
            exitStatus
          );
          break;
        }
        commitRoot(root);
        break;
      case 4:
        markRootSuspended$1(root, lanes);
        if (0 !== getNextLanes(root, 0)) break;
        exitStatus = root.suspendedLanes;
        if ((exitStatus & lanes) !== lanes) {
          requestEventTime();
          root.pingedLanes |= root.suspendedLanes & exitStatus;
          break;
        }
        -1 !== workInProgressRootLatestSuspenseTimeout
          ? (lanes = workInProgressRootLatestSuspenseTimeout - now())
          : -1 === workInProgressRootLatestProcessedEventTime
          ? (lanes = 0)
          : ((lanes = workInProgressRootLatestProcessedEventTime),
            (lanes = now() - lanes),
            (lanes =
              (120 > lanes
                ? 120
                : 480 > lanes
                ? 480
                : 1080 > lanes
                ? 1080
                : 1920 > lanes
                ? 1920
                : 3e3 > lanes
                ? 3e3
                : 4320 > lanes
                ? 4320
                : 1960 * ceil(lanes / 1960)) - lanes));
        if (10 < lanes) {
          root.timeoutHandle = scheduleTimeout(
            commitRoot.bind(null, root),
            lanes
          );
          break;
        }
        commitRoot(root);
        break;
      case 5:
        if (
          -1 !== workInProgressRootLatestProcessedEventTime &&
          null !== workInProgressRootCanSuspendUsingConfig &&
          ((lanes$jscomp$0 = workInProgressRootLatestProcessedEventTime),
          (exitStatus =
            workInProgressRootCanSuspendUsingConfig.busyMinDurationMs | 0),
          0 >= exitStatus
            ? (exitStatus = 0)
            : ((prevDispatcher =
                workInProgressRootCanSuspendUsingConfig.busyDelayMs | 0),
              (lanes$jscomp$0 = now() - lanes$jscomp$0),
              (exitStatus =
                lanes$jscomp$0 <= prevDispatcher
                  ? 0
                  : prevDispatcher + exitStatus - lanes$jscomp$0)),
          10 < exitStatus)
        ) {
          markRootSuspended$1(root, lanes);
          root.timeoutHandle = scheduleTimeout(
            commitRoot.bind(null, root),
            exitStatus
          );
          break;
        }
        commitRoot(root);
        break;
      default:
        throw Error(formatProdErrorMessage(329));
    }
  }
  ensureRootIsScheduled(root, now());
  return root.callbackNode === didTimeout
    ? performConcurrentWorkOnRoot.bind(null, root)
    : null;
}
function markRootSuspended$1(root, suspendedLanes) {
  suspendedLanes &= ~workInProgressRootPingedLanes;
  suspendedLanes &= ~workInProgressRootUpdatedLanes;
  root.suspendedLanes |= suspendedLanes;
  root.pingedLanes &= ~suspendedLanes;
  for (root = root.expirationTimes; 0 < suspendedLanes; ) {
    var index$45 = 31 - clz32(suspendedLanes),
      lane = 1 << index$45;
    root[index$45] = -1;
    suspendedLanes &= ~lane;
  }
}
function performSyncWorkOnRoot(root) {
  if (0 !== (executionContext & 48)) throw Error(formatProdErrorMessage(327));
  flushPassiveEffects();
  if (
    root === workInProgressRoot &&
    0 !== (root.expiredLanes & workInProgressRootRenderLanes)
  ) {
    var lanes = workInProgressRootRenderLanes;
    var exitStatus = renderRootSync(root, lanes);
    0 !== (workInProgressRootIncludedLanes & workInProgressRootUpdatedLanes) &&
      ((lanes = getNextLanes(root, lanes)),
      (exitStatus = renderRootSync(root, lanes)));
  } else
    (lanes = getNextLanes(root, 0)), (exitStatus = renderRootSync(root, lanes));
  0 !== root.tag &&
    2 === exitStatus &&
    ((executionContext |= 64),
    root.hydrate && ((root.hydrate = !1), clearContainer(root.containerInfo)),
    (lanes = getLanesToRetrySynchronouslyOnError(root)),
    0 !== lanes && (exitStatus = renderRootSync(root, lanes)));
  if (1 === exitStatus)
    throw ((exitStatus = workInProgressRootFatalError),
    prepareFreshStack(root, 0),
    markRootSuspended$1(root, lanes),
    ensureRootIsScheduled(root, now()),
    exitStatus);
  root.finishedWork = root.current.alternate;
  root.finishedLanes = lanes;
  commitRoot(root);
  ensureRootIsScheduled(root, now());
  return null;
}
function flushPendingDiscreteUpdates() {
  if (null !== rootsWithPendingDiscreteUpdates) {
    var roots = rootsWithPendingDiscreteUpdates;
    rootsWithPendingDiscreteUpdates = null;
    roots.forEach(function(root) {
      root.expiredLanes |= 28 & root.pendingLanes;
      ensureRootIsScheduled(root, now());
    });
  }
  flushSyncCallbackQueue();
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
function flushSync(fn, a) {
  var prevExecutionContext = executionContext;
  if (0 !== (prevExecutionContext & 48)) return fn(a);
  executionContext |= 1;
  try {
    if (fn) return runWithPriority$2(99, fn.bind(null, a));
  } finally {
    (executionContext = prevExecutionContext), flushSyncCallbackQueue();
  }
}
function pushRenderLanes(fiber, lanes) {
  push(subtreeRenderLanesCursor, subtreeRenderLanes);
  subtreeRenderLanes |= lanes;
  workInProgressRootIncludedLanes |= lanes;
}
function popRenderLanes() {
  subtreeRenderLanes = subtreeRenderLanesCursor.current;
  pop(subtreeRenderLanesCursor);
}
function prepareFreshStack(root, lanes) {
  root.finishedWork = null;
  root.finishedLanes = 0;
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
          break;
        case 23:
        case 24:
          popRenderLanes();
      }
      timeoutHandle = timeoutHandle.return;
    }
  workInProgressRoot = root;
  workInProgress = createWorkInProgress(root.current, null);
  workInProgressRootRenderLanes = subtreeRenderLanes = workInProgressRootIncludedLanes = lanes;
  workInProgressRootExitStatus = 0;
  workInProgressRootFatalError = null;
  workInProgressRootLatestSuspenseTimeout = workInProgressRootLatestProcessedEventTime = -1;
  workInProgressRootCanSuspendUsingConfig = null;
  workInProgressRootPingedLanes = workInProgressRootUpdatedLanes = workInProgressRootSkippedLanes = 0;
  spawnedWorkDuringRender = null;
}
function handleError(root$jscomp$0, thrownValue) {
  do {
    var erroredWork = workInProgress;
    try {
      resetContextDependencies();
      ReactCurrentDispatcher$1.current = ContextOnlyDispatcher;
      if (didScheduleRenderPhaseUpdate) {
        for (
          var hook = currentlyRenderingFiber$1.memoizedState;
          null !== hook;

        ) {
          var queue = hook.queue;
          null !== queue && (queue.pending = null);
          hook = hook.next;
        }
        didScheduleRenderPhaseUpdate = !1;
      }
      renderLanes = 0;
      workInProgressHook = currentHook = currentlyRenderingFiber$1 = null;
      didScheduleRenderPhaseUpdateDuringThisPass = !1;
      ReactCurrentOwner$2.current = null;
      if (null === erroredWork || null === erroredWork.return) {
        workInProgressRootExitStatus = 1;
        workInProgressRootFatalError = thrownValue;
        workInProgress = null;
        break;
      }
      erroredWork.mode & 8 &&
        stopProfilerTimerIfRunningAndRecordDelta(erroredWork, !0);
      a: {
        var root = root$jscomp$0,
          returnFiber = erroredWork.return,
          sourceFiber = erroredWork,
          value = thrownValue;
        thrownValue = workInProgressRootRenderLanes;
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
                (sourceFiber.lanes = currentSource.lanes))
              : ((sourceFiber.updateQueue = null),
                (sourceFiber.memoizedState = null));
          }
          var hasInvisibleParentBoundary =
              0 !== (suspenseStackCursor.current & 1),
            workInProgress$130 = returnFiber;
          do {
            var JSCompiler_temp;
            if ((JSCompiler_temp = 13 === workInProgress$130.tag)) {
              var nextState = workInProgress$130.memoizedState;
              if (null !== nextState)
                JSCompiler_temp = null !== nextState.dehydrated ? !0 : !1;
              else {
                var props = workInProgress$130.memoizedProps;
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
              var wakeables = workInProgress$130.updateQueue;
              if (null === wakeables) {
                var updateQueue = new Set();
                updateQueue.add(wakeable);
                workInProgress$130.updateQueue = updateQueue;
              } else wakeables.add(wakeable);
              if (0 === (workInProgress$130.mode & 2)) {
                workInProgress$130.effectTag |= 64;
                sourceFiber.effectTag &= -2981;
                if (1 === sourceFiber.tag)
                  if (null === sourceFiber.alternate) sourceFiber.tag = 17;
                  else {
                    var update = createUpdate(-1, 1, null);
                    update.tag = 2;
                    enqueueUpdate(sourceFiber, update);
                  }
                sourceFiber.lanes |= 1;
                break a;
              }
              value = void 0;
              sourceFiber = thrownValue;
              var pingCache = root.pingCache;
              null === pingCache
                ? ((pingCache = root.pingCache = new PossiblyWeakMap()),
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
              workInProgress$130.effectTag |= 4096;
              workInProgress$130.lanes = thrownValue;
              break a;
            }
            workInProgress$130 = workInProgress$130.return;
          } while (null !== workInProgress$130);
          value = Error(
            (getComponentName(sourceFiber.type) || "A React component") +
              " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display."
          );
        }
        5 !== workInProgressRootExitStatus &&
          (workInProgressRootExitStatus = 2);
        value = createCapturedValue(value, sourceFiber);
        workInProgress$130 = returnFiber;
        do {
          switch (workInProgress$130.tag) {
            case 3:
              root = value;
              workInProgress$130.effectTag |= 4096;
              var lane = getLowestPriorityLane(thrownValue);
              workInProgress$130.lanes |= lane;
              var update$131 = createRootErrorUpdate(
                workInProgress$130,
                root,
                lane
              );
              enqueueCapturedUpdate(workInProgress$130, update$131);
              break a;
            case 1:
              root = value;
              var ctor = workInProgress$130.type,
                instance = workInProgress$130.stateNode;
              if (
                0 === (workInProgress$130.effectTag & 64) &&
                ("function" === typeof ctor.getDerivedStateFromError ||
                  (null !== instance &&
                    "function" === typeof instance.componentDidCatch &&
                    (null === legacyErrorBoundariesThatAlreadyFailed ||
                      !legacyErrorBoundariesThatAlreadyFailed.has(instance))))
              ) {
                workInProgress$130.effectTag |= 4096;
                var lane$133 = getLowestPriorityLane(thrownValue);
                workInProgress$130.lanes |= lane$133;
                var update$134 = createClassErrorUpdate(
                  workInProgress$130,
                  root,
                  lane$133
                );
                enqueueCapturedUpdate(workInProgress$130, update$134);
                break a;
              }
          }
          workInProgress$130 = workInProgress$130.return;
        } while (null !== workInProgress$130);
      }
      completeUnitOfWork(erroredWork);
    } catch (yetAnotherThrownValue) {
      thrownValue = yetAnotherThrownValue;
      workInProgress === erroredWork &&
        null !== erroredWork &&
        (workInProgress = erroredWork = erroredWork.return);
      continue;
    }
    break;
  } while (1);
}
function pushDispatcher() {
  var prevDispatcher = ReactCurrentDispatcher$2.current;
  ReactCurrentDispatcher$2.current = ContextOnlyDispatcher;
  return null === prevDispatcher ? ContextOnlyDispatcher : prevDispatcher;
}
function pushInteractions(root) {
  var prevInteractions = tracing.__interactionsRef.current;
  tracing.__interactionsRef.current = root.memoizedInteractions;
  return prevInteractions;
}
function markRenderEventTimeAndConfig(eventTime, suspenseConfig) {
  workInProgressRootLatestProcessedEventTime < eventTime &&
    (workInProgressRootLatestProcessedEventTime = eventTime);
  null !== suspenseConfig &&
    ((eventTime += suspenseConfig.timeoutMs | 0 || 5e3),
    eventTime > workInProgressRootLatestSuspenseTimeout &&
      ((workInProgressRootLatestSuspenseTimeout = eventTime),
      (workInProgressRootCanSuspendUsingConfig = suspenseConfig)));
}
function renderDidSuspendDelayIfPossible() {
  if (0 === workInProgressRootExitStatus || 3 === workInProgressRootExitStatus)
    workInProgressRootExitStatus = 4;
  null === workInProgressRoot ||
    (0 === (workInProgressRootSkippedLanes & 134217727) &&
      0 === (workInProgressRootUpdatedLanes & 134217727)) ||
    markRootSuspended$1(workInProgressRoot, workInProgressRootRenderLanes);
}
function renderRootSync(root, lanes) {
  var prevExecutionContext = executionContext;
  executionContext |= 16;
  var prevDispatcher = pushDispatcher();
  if (workInProgressRoot !== root || workInProgressRootRenderLanes !== lanes)
    prepareFreshStack(root, lanes), startWorkOnPendingInteractions(root, lanes);
  lanes = pushInteractions(root);
  do
    try {
      workLoopSync();
      break;
    } catch (thrownValue) {
      handleError(root, thrownValue);
    }
  while (1);
  resetContextDependencies();
  tracing.__interactionsRef.current = lanes;
  executionContext = prevExecutionContext;
  ReactCurrentDispatcher$2.current = prevDispatcher;
  if (null !== workInProgress) throw Error(formatProdErrorMessage(261));
  workInProgressRoot = null;
  workInProgressRootRenderLanes = 0;
  return workInProgressRootExitStatus;
}
function workLoopSync() {
  for (; null !== workInProgress; ) performUnitOfWork(workInProgress);
}
function workLoopConcurrent() {
  for (; null !== workInProgress && !Scheduler_shouldYield(); )
    performUnitOfWork(workInProgress);
}
function performUnitOfWork(unitOfWork) {
  var current = unitOfWork.alternate;
  0 !== (unitOfWork.mode & 8)
    ? ((profilerStartTime = now$1()),
      0 > unitOfWork.actualStartTime && (unitOfWork.actualStartTime = now$1()),
      (current = beginWork$1(current, unitOfWork, subtreeRenderLanes)),
      stopProfilerTimerIfRunningAndRecordDelta(unitOfWork, !0))
    : (current = beginWork$1(current, unitOfWork, subtreeRenderLanes));
  unitOfWork.memoizedProps = unitOfWork.pendingProps;
  null === current
    ? completeUnitOfWork(unitOfWork)
    : (workInProgress = current);
  ReactCurrentOwner$2.current = null;
}
function completeUnitOfWork(unitOfWork) {
  var completedWork = unitOfWork;
  do {
    var current = completedWork.alternate;
    unitOfWork = completedWork.return;
    if (0 === (completedWork.effectTag & 2048)) {
      if (0 === (completedWork.mode & 8))
        current = completeWork(current, completedWork, subtreeRenderLanes);
      else {
        var fiber = completedWork;
        profilerStartTime = now$1();
        0 > fiber.actualStartTime && (fiber.actualStartTime = now$1());
        current = completeWork(current, completedWork, subtreeRenderLanes);
        stopProfilerTimerIfRunningAndRecordDelta(completedWork, !1);
      }
      if (null !== current) {
        workInProgress = current;
        return;
      }
      current = completedWork;
      if (
        (24 !== current.tag && 23 !== current.tag) ||
        null === current.memoizedState ||
        0 !== (subtreeRenderLanes & 1073741824) ||
        0 === (current.mode & 4)
      ) {
        fiber = 0;
        if (0 !== (current.mode & 8)) {
          for (
            var actualDuration = current.actualDuration,
              treeBaseDuration = current.selfBaseDuration,
              shouldBubbleActualDurations =
                null === current.alternate ||
                current.child !== current.alternate.child,
              child = current.child;
            null !== child;

          )
            (fiber |= child.lanes | child.childLanes),
              shouldBubbleActualDurations &&
                (actualDuration += child.actualDuration),
              (treeBaseDuration += child.treeBaseDuration),
              (child = child.sibling);
          13 === current.tag &&
            null !== current.memoizedState &&
            ((shouldBubbleActualDurations = current.child),
            null !== shouldBubbleActualDurations &&
              (treeBaseDuration -=
                shouldBubbleActualDurations.treeBaseDuration));
          current.actualDuration = actualDuration;
          current.treeBaseDuration = treeBaseDuration;
        } else
          for (actualDuration = current.child; null !== actualDuration; )
            (fiber |= actualDuration.lanes | actualDuration.childLanes),
              (actualDuration = actualDuration.sibling);
        current.childLanes = fiber;
      }
      null !== unitOfWork &&
        0 === (unitOfWork.effectTag & 2048) &&
        (null === unitOfWork.firstEffect &&
          (unitOfWork.firstEffect = completedWork.firstEffect),
        null !== completedWork.lastEffect &&
          (null !== unitOfWork.lastEffect &&
            (unitOfWork.lastEffect.nextEffect = completedWork.firstEffect),
          (unitOfWork.lastEffect = completedWork.lastEffect)),
        1 < completedWork.effectTag &&
          (null !== unitOfWork.lastEffect
            ? (unitOfWork.lastEffect.nextEffect = completedWork)
            : (unitOfWork.firstEffect = completedWork),
          (unitOfWork.lastEffect = completedWork)));
    } else {
      current = unwindWork(completedWork);
      if (null !== current) {
        current.effectTag &= 2047;
        workInProgress = current;
        return;
      }
      if (0 !== (completedWork.mode & 8)) {
        stopProfilerTimerIfRunningAndRecordDelta(completedWork, !1);
        current = completedWork.actualDuration;
        for (fiber = completedWork.child; null !== fiber; )
          (current += fiber.actualDuration), (fiber = fiber.sibling);
        completedWork.actualDuration = current;
      }
      null !== unitOfWork &&
        ((unitOfWork.firstEffect = unitOfWork.lastEffect = null),
        (unitOfWork.effectTag |= 2048));
    }
    completedWork = completedWork.sibling;
    if (null !== completedWork) {
      workInProgress = completedWork;
      return;
    }
    workInProgress = completedWork = unitOfWork;
  } while (null !== completedWork);
  0 === workInProgressRootExitStatus && (workInProgressRootExitStatus = 5);
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
    lanes = root.finishedLanes;
  if (null === finishedWork) return null;
  root.finishedWork = null;
  root.finishedLanes = 0;
  if (finishedWork === root.current) throw Error(formatProdErrorMessage(177));
  root.callbackNode = null;
  root.callbackId = 0;
  var remainingLanes = finishedWork.lanes | finishedWork.childLanes,
    remainingLanes$jscomp$0 = remainingLanes,
    noLongerPendingLanes = root.pendingLanes & ~remainingLanes$jscomp$0;
  root.pendingLanes = remainingLanes$jscomp$0;
  root.suspendedLanes = 0;
  root.pingedLanes = 0;
  root.expiredLanes &= remainingLanes$jscomp$0;
  root.mutableReadLanes &= remainingLanes$jscomp$0;
  root.entangledLanes &= remainingLanes$jscomp$0;
  for (
    remainingLanes$jscomp$0 = root.expirationTimes;
    0 < noLongerPendingLanes;

  ) {
    var index$46 = 31 - clz32(noLongerPendingLanes),
      lane = 1 << index$46;
    remainingLanes$jscomp$0[index$46] = -1;
    noLongerPendingLanes &= ~lane;
  }
  null !== rootsWithPendingDiscreteUpdates &&
    0 === (remainingLanes & 28) &&
    rootsWithPendingDiscreteUpdates.has(root) &&
    rootsWithPendingDiscreteUpdates.delete(root);
  root === workInProgressRoot &&
    ((workInProgress = workInProgressRoot = null),
    (workInProgressRootRenderLanes = 0));
  1 < finishedWork.effectTag
    ? null !== finishedWork.lastEffect
      ? ((finishedWork.lastEffect.nextEffect = finishedWork),
        (remainingLanes = finishedWork.firstEffect))
      : (remainingLanes = finishedWork)
    : (remainingLanes = finishedWork.firstEffect);
  if (null !== remainingLanes) {
    remainingLanes$jscomp$0 = executionContext;
    executionContext |= 32;
    noLongerPendingLanes = pushInteractions(root);
    ReactCurrentOwner$2.current = null;
    eventsEnabled = _enabled;
    index$46 = getActiveElementDeep();
    if (hasSelectionCapabilities(index$46)) {
      if ("selectionStart" in index$46)
        lane = { start: index$46.selectionStart, end: index$46.selectionEnd };
      else
        a: {
          lane =
            ((lane = index$46.ownerDocument) && lane.defaultView) || window;
          var selection = lane.getSelection && lane.getSelection();
          if (selection && 0 !== selection.rangeCount) {
            lane = selection.anchorNode;
            var anchorOffset = selection.anchorOffset,
              focusNode = selection.focusNode;
            selection = selection.focusOffset;
            try {
              lane.nodeType, focusNode.nodeType;
            } catch (e$36) {
              lane = null;
              break a;
            }
            var length = 0,
              start = -1,
              end = -1,
              indexWithinAnchor = 0,
              indexWithinFocus = 0,
              node = index$46,
              parentNode = null;
            b: for (;;) {
              for (var next; ; ) {
                node !== lane ||
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
                if (node === index$46) break b;
                parentNode === lane &&
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
            lane =
              -1 === start || -1 === end ? null : { start: start, end: end };
          } else lane = null;
        }
      lane = lane || { start: 0, end: 0 };
    } else lane = null;
    selectionInformation = { focusedElem: index$46, selectionRange: lane };
    index$46 = null;
    lane = selectionInformation.focusedElem;
    null !== lane && (index$46 = getClosestInstanceFromNode(lane));
    _enabled = !1;
    focusedInstanceHandle = index$46;
    shouldFireAfterActiveInstanceBlur = !1;
    nextEffect = remainingLanes;
    do
      try {
        commitBeforeMutationEffects();
      } catch (error) {
        if (null === nextEffect) throw Error(formatProdErrorMessage(330));
        captureCommitPhaseError(nextEffect, error);
        nextEffect = nextEffect.nextEffect;
      }
    while (null !== nextEffect);
    focusedInstanceHandle = null;
    commitTime = now$1();
    nextEffect = remainingLanes;
    do
      try {
        for (index$46 = root; null !== nextEffect; ) {
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
              lane = nextEffect;
              unmountHostComponents(index$46, lane);
              var alternate = lane.alternate;
              detachFiberMutation(lane);
              null !== alternate && detachFiberMutation(alternate);
          }
          nextEffect = nextEffect.nextEffect;
        }
      } catch (error$154) {
        if (null === nextEffect) throw Error(formatProdErrorMessage(330));
        captureCommitPhaseError(nextEffect, error$154);
        nextEffect = nextEffect.nextEffect;
      }
    while (null !== nextEffect);
    shouldFireAfterActiveInstanceBlur &&
      ((_enabled = !0),
      (effectTag = selectionInformation.focusedElem),
      (current = createEvent("afterblur")),
      (current.relatedTarget = effectTag),
      document.dispatchEvent(current),
      (_enabled = !1));
    currentRef = selectionInformation;
    current = getActiveElementDeep();
    effectTag = currentRef.focusedElem;
    index$46 = currentRef.selectionRange;
    if (
      current !== effectTag &&
      effectTag &&
      effectTag.ownerDocument &&
      containsNode(effectTag.ownerDocument.documentElement, effectTag)
    ) {
      null !== index$46 &&
        hasSelectionCapabilities(effectTag) &&
        ((current = index$46.start),
        (currentRef = index$46.end),
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
              (lane = effectTag.textContent.length),
              (alternate = Math.min(index$46.start, lane)),
              (index$46 =
                void 0 === index$46.end
                  ? alternate
                  : Math.min(index$46.end, lane)),
              !currentRef.extend &&
                alternate > index$46 &&
                ((lane = index$46), (index$46 = alternate), (alternate = lane)),
              (lane = getNodeForCharacterOffset(effectTag, alternate)),
              (anchorOffset = getNodeForCharacterOffset(effectTag, index$46)),
              lane &&
                anchorOffset &&
                (1 !== currentRef.rangeCount ||
                  currentRef.anchorNode !== lane.node ||
                  currentRef.anchorOffset !== lane.offset ||
                  currentRef.focusNode !== anchorOffset.node ||
                  currentRef.focusOffset !== anchorOffset.offset) &&
                ((current = current.createRange()),
                current.setStart(lane.node, lane.offset),
                currentRef.removeAllRanges(),
                alternate > index$46
                  ? (currentRef.addRange(current),
                    currentRef.extend(anchorOffset.node, anchorOffset.offset))
                  : (current.setEnd(anchorOffset.node, anchorOffset.offset),
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
    selectionInformation = eventsEnabled = null;
    root.current = finishedWork;
    nextEffect = remainingLanes;
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
              21 === nextEffect.tag && (current = instance);
              "function" === typeof ref
                ? ref(current)
                : (ref.current = current);
            }
          }
          nextEffect = nextEffect.nextEffect;
        }
      } catch (error$155) {
        if (null === nextEffect) throw Error(formatProdErrorMessage(330));
        captureCommitPhaseError(nextEffect, error$155);
        nextEffect = nextEffect.nextEffect;
      }
    while (null !== nextEffect);
    nextEffect = null;
    requestPaint();
    tracing.__interactionsRef.current = noLongerPendingLanes;
    executionContext = remainingLanes$jscomp$0;
  } else (root.current = finishedWork), (commitTime = now$1());
  if ((effectTag$jscomp$0 = rootDoesHavePassiveEffects))
    (rootDoesHavePassiveEffects = !1),
      (rootWithPendingPassiveEffects = root),
      (pendingPassiveEffectsLanes = lanes),
      (pendingPassiveEffectsRenderPriority = renderPriorityLevel);
  else
    for (nextEffect = remainingLanes; null !== nextEffect; )
      (ref = nextEffect.nextEffect),
        (nextEffect.nextEffect = null),
        nextEffect.effectTag & 8 && (nextEffect.sibling = null),
        (nextEffect = ref);
  remainingLanes = root.pendingLanes;
  if (0 !== remainingLanes) {
    if (null !== spawnedWorkDuringRender)
      for (
        ref = spawnedWorkDuringRender,
          spawnedWorkDuringRender = null,
          instance = 0;
        instance < ref.length;
        instance++
      )
        scheduleInteractions(root, ref[instance], root.memoizedInteractions);
    schedulePendingInteractions(root, remainingLanes);
  } else legacyErrorBoundariesThatAlreadyFailed = null;
  effectTag$jscomp$0 || finishPendingInteractions(root, lanes);
  1 === remainingLanes
    ? root === rootWithNestedUpdates
      ? nestedUpdateCount++
      : ((nestedUpdateCount = 0), (rootWithNestedUpdates = root))
    : (nestedUpdateCount = 0);
  finishedWork = finishedWork.stateNode;
  if (injectedHook && "function" === typeof injectedHook.onCommitFiberRoot)
    try {
      injectedHook.onCommitFiberRoot(
        rendererID,
        finishedWork,
        renderPriorityLevel,
        64 === (finishedWork.current.effectTag & 64)
      );
    } catch (err) {}
  ensureRootIsScheduled(root, now());
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
    !shouldFireAfterActiveInstanceBlur &&
      null !== focusedInstanceHandle &&
      isFiberHiddenOrDeletedAndContains(nextEffect, focusedInstanceHandle) &&
      ((_enabled = shouldFireAfterActiveInstanceBlur = !0),
      dispatchBeforeDetachedBlur(selectionInformation.focusedElem),
      (_enabled = !1));
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
function enqueuePendingPassiveProfilerEffect(fiber) {
  pendingPassiveProfilerEffects.push(fiber);
  rootDoesHavePassiveEffects ||
    ((rootDoesHavePassiveEffects = !0),
    scheduleCallback(97, function() {
      flushPassiveEffects();
      return null;
    }));
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
  var root = rootWithPendingPassiveEffects,
    lanes = pendingPassiveEffectsLanes;
  rootWithPendingPassiveEffects = null;
  pendingPassiveEffectsLanes = 0;
  if (0 !== (executionContext & 48)) throw Error(formatProdErrorMessage(331));
  var prevExecutionContext = executionContext;
  executionContext |= 32;
  var prevInteractions = pushInteractions(root),
    unmountEffects = pendingPassiveHookEffectsUnmount;
  pendingPassiveHookEffectsUnmount = [];
  for (var i = 0; i < unmountEffects.length; i += 2) {
    var effect$160 = unmountEffects[i],
      fiber = unmountEffects[i + 1],
      destroy = effect$160.destroy;
    effect$160.destroy = void 0;
    if ("function" === typeof destroy)
      try {
        if (fiber.mode & 8)
          try {
            (passiveEffectStartTime = now$1()), destroy();
          } finally {
            recordPassiveEffectDuration(fiber);
          }
        else destroy();
      } catch (error) {
        if (null === fiber) throw Error(formatProdErrorMessage(330));
        captureCommitPhaseError(fiber, error);
      }
  }
  unmountEffects = pendingPassiveHookEffectsMount;
  pendingPassiveHookEffectsMount = [];
  for (i = 0; i < unmountEffects.length; i += 2) {
    effect$160 = unmountEffects[i];
    fiber = unmountEffects[i + 1];
    try {
      var create = effect$160.create;
      if (fiber.mode & 8)
        try {
          (passiveEffectStartTime = now$1()), (effect$160.destroy = create());
        } finally {
          recordPassiveEffectDuration(fiber);
        }
      else effect$160.destroy = create();
    } catch (error$164) {
      if (null === fiber) throw Error(formatProdErrorMessage(330));
      captureCommitPhaseError(fiber, error$164);
    }
  }
  for (create = root.current.firstEffect; null !== create; )
    (unmountEffects = create.nextEffect),
      (create.nextEffect = null),
      create.effectTag & 8 && (create.sibling = null),
      (create = unmountEffects);
  create = pendingPassiveProfilerEffects;
  pendingPassiveProfilerEffects = [];
  for (unmountEffects = 0; unmountEffects < create.length; unmountEffects++)
    if (
      ((effect$160 = create[unmountEffects]), 0 !== (effect$160.effectTag & 4))
    )
      switch (effect$160.tag) {
        case 12:
          i = effect$160.stateNode.passiveEffectDuration;
          destroy = effect$160.memoizedProps;
          fiber = destroy.id;
          destroy = destroy.onPostCommit;
          var commitTime$136 = commitTime;
          "function" === typeof destroy &&
            destroy(
              fiber,
              null === effect$160.alternate ? "mount" : "update",
              i,
              commitTime$136,
              root.memoizedInteractions
            );
          for (effect$160 = effect$160.return; null !== effect$160; ) {
            if (12 === effect$160.tag) {
              effect$160.stateNode.passiveEffectDuration += i;
              break;
            }
            effect$160 = effect$160.return;
          }
      }
  tracing.__interactionsRef.current = prevInteractions;
  finishPendingInteractions(root, lanes);
  executionContext = prevExecutionContext;
  flushSyncCallbackQueue();
  return !0;
}
function captureCommitPhaseErrorOnRoot(rootFiber, sourceFiber, error) {
  sourceFiber = createCapturedValue(error, sourceFiber);
  sourceFiber = createRootErrorUpdate(rootFiber, sourceFiber, 1);
  enqueueUpdate(rootFiber, sourceFiber);
  sourceFiber = requestEventTime();
  rootFiber = markUpdateLaneFromFiberToRoot(rootFiber, 1);
  null !== rootFiber &&
    (ensureRootIsScheduled(rootFiber, sourceFiber),
    schedulePendingInteractions(rootFiber, 1));
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
          sourceFiber = createClassErrorUpdate(fiber, sourceFiber, 1);
          enqueueUpdate(fiber, sourceFiber);
          sourceFiber = requestEventTime();
          fiber = markUpdateLaneFromFiberToRoot(fiber, 1);
          null !== fiber &&
            (ensureRootIsScheduled(fiber, sourceFiber),
            schedulePendingInteractions(fiber, 1));
          break;
        }
      }
      fiber = fiber.return;
    }
}
function pingSuspendedRoot(root, wakeable, pingedLanes) {
  var pingCache = root.pingCache;
  null !== pingCache && pingCache.delete(wakeable);
  wakeable = requestEventTime();
  root.pingedLanes |= root.suspendedLanes & pingedLanes;
  workInProgressRoot === root &&
    (workInProgressRootRenderLanes & pingedLanes) === pingedLanes &&
    (4 === workInProgressRootExitStatus ||
    (3 === workInProgressRootExitStatus &&
      -1 === workInProgressRootLatestProcessedEventTime &&
      500 > now() - globalMostRecentFallbackTime)
      ? prepareFreshStack(root, 0)
      : (workInProgressRootPingedLanes |= pingedLanes));
  ensureRootIsScheduled(root, wakeable);
  schedulePendingInteractions(root, pingedLanes);
}
function retryTimedOutBoundary(boundaryFiber, retryLane) {
  0 === retryLane && (retryLane = requestUpdateLane(boundaryFiber, null));
  var eventTime = requestEventTime();
  boundaryFiber = markUpdateLaneFromFiberToRoot(boundaryFiber, retryLane);
  null !== boundaryFiber &&
    (ensureRootIsScheduled(boundaryFiber, eventTime),
    schedulePendingInteractions(boundaryFiber, retryLane));
}
function retryDehydratedSuspenseBoundary(boundaryFiber) {
  var suspenseState = boundaryFiber.memoizedState,
    retryLane = 0;
  null !== suspenseState && (retryLane = suspenseState.retryLane);
  retryTimedOutBoundary(boundaryFiber, retryLane);
}
function resolveRetryWakeable(boundaryFiber, wakeable) {
  var retryLane = 0;
  switch (boundaryFiber.tag) {
    case 13:
      var retryCache = boundaryFiber.stateNode;
      var suspenseState = boundaryFiber.memoizedState;
      null !== suspenseState && (retryLane = suspenseState.retryLane);
      break;
    case 19:
      retryCache = boundaryFiber.stateNode;
      break;
    default:
      throw Error(formatProdErrorMessage(314));
  }
  null !== retryCache && retryCache.delete(wakeable);
  retryTimedOutBoundary(boundaryFiber, retryLane);
}
var beginWork$1;
beginWork$1 = function(current, workInProgress, renderLanes) {
  var updateLanes = workInProgress.lanes;
  if (null !== current)
    if (current.memoizedProps !== workInProgress.pendingProps)
      didReceiveUpdate = !0;
    else if (0 !== (renderLanes & updateLanes)) didReceiveUpdate = !1;
    else {
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
          break;
        case 4:
          pushHostContainer(
            workInProgress,
            workInProgress.stateNode.containerInfo
          );
          break;
        case 10:
          updateLanes = workInProgress.memoizedProps.value;
          var context = workInProgress.type._context;
          push(valueCursor, context._currentValue);
          context._currentValue = updateLanes;
          break;
        case 12:
          0 !== (renderLanes & workInProgress.childLanes) &&
            (workInProgress.effectTag |= 4);
          updateLanes = workInProgress.stateNode;
          updateLanes.effectDuration = 0;
          updateLanes.passiveEffectDuration = 0;
          break;
        case 13:
          updateLanes = workInProgress.memoizedState;
          if (null !== updateLanes) {
            if (null !== updateLanes.dehydrated)
              return (
                push(suspenseStackCursor, suspenseStackCursor.current & 1),
                (workInProgress.effectTag |= 64),
                null
              );
            if (0 !== (renderLanes & workInProgress.child.childLanes))
              return updateSuspenseComponent(
                current,
                workInProgress,
                renderLanes
              );
            push(suspenseStackCursor, suspenseStackCursor.current & 1);
            workInProgress = bailoutOnAlreadyFinishedWork(
              current,
              workInProgress,
              renderLanes
            );
            return null !== workInProgress ? workInProgress.sibling : null;
          }
          push(suspenseStackCursor, suspenseStackCursor.current & 1);
          break;
        case 19:
          updateLanes = 0 !== (renderLanes & workInProgress.childLanes);
          if (0 !== (current.effectTag & 64)) {
            if (updateLanes)
              return updateSuspenseListComponent(
                current,
                workInProgress,
                renderLanes
              );
            workInProgress.effectTag |= 64;
          }
          context = workInProgress.memoizedState;
          null !== context &&
            ((context.rendering = null),
            (context.tail = null),
            (context.lastEffect = null));
          push(suspenseStackCursor, suspenseStackCursor.current);
          if (updateLanes) break;
          else return null;
        case 23:
        case 24:
          return (
            (workInProgress.lanes = 0),
            updateOffscreenComponent(current, workInProgress, renderLanes)
          );
      }
      return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
    }
  else didReceiveUpdate = !1;
  workInProgress.lanes = 0;
  switch (workInProgress.tag) {
    case 2:
      return (
        (updateLanes = workInProgress.type),
        null !== current &&
          ((current.alternate = null),
          (workInProgress.alternate = null),
          (workInProgress.effectTag |= 2)),
        (current = workInProgress.pendingProps),
        prepareToReadContext(workInProgress, renderLanes),
        (current = renderWithHooks(
          null,
          workInProgress,
          updateLanes,
          current,
          void 0,
          renderLanes
        )),
        (workInProgress.effectTag |= 1),
        (workInProgress.tag = 0),
        reconcileChildren(null, workInProgress, current, renderLanes),
        (workInProgress = workInProgress.child),
        workInProgress
      );
    case 16:
      context = workInProgress.elementType;
      a: {
        null !== current &&
          ((current.alternate = null),
          (workInProgress.alternate = null),
          (workInProgress.effectTag |= 2));
        current = workInProgress.pendingProps;
        var init = context._init;
        context = init(context._payload);
        workInProgress.type = context;
        init = workInProgress.tag = resolveLazyComponentTag(context);
        var resolvedProps = resolveDefaultProps(context, current);
        switch (init) {
          case 0:
            workInProgress = updateFunctionComponent(
              null,
              workInProgress,
              context,
              resolvedProps,
              renderLanes
            );
            break a;
          case 1:
            workInProgress = updateClassComponent(
              null,
              workInProgress,
              context,
              resolvedProps,
              renderLanes
            );
            break a;
          case 11:
            workInProgress = updateForwardRef(
              null,
              workInProgress,
              context,
              resolvedProps,
              renderLanes
            );
            break a;
          case 14:
            workInProgress = updateMemoComponent(
              null,
              workInProgress,
              context,
              resolveDefaultProps(context.type, resolvedProps),
              updateLanes,
              renderLanes
            );
            break a;
          case 22:
            workInProgress = updateBlock(
              null,
              workInProgress,
              context,
              current,
              renderLanes
            );
            break a;
        }
        throw Error(formatProdErrorMessage(306, context, ""));
      }
      return workInProgress;
    case 0:
      return (
        (updateLanes = workInProgress.type),
        (context = workInProgress.pendingProps),
        (context =
          workInProgress.elementType === updateLanes
            ? context
            : resolveDefaultProps(updateLanes, context)),
        updateFunctionComponent(
          current,
          workInProgress,
          updateLanes,
          context,
          renderLanes
        )
      );
    case 1:
      return (
        (updateLanes = workInProgress.type),
        (context = workInProgress.pendingProps),
        (context =
          workInProgress.elementType === updateLanes
            ? context
            : resolveDefaultProps(updateLanes, context)),
        updateClassComponent(
          current,
          workInProgress,
          updateLanes,
          context,
          renderLanes
        )
      );
    case 3:
      pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
      updateLanes = workInProgress.updateQueue;
      if (null === current || null === updateLanes)
        throw Error(formatProdErrorMessage(282));
      updateLanes = workInProgress.pendingProps;
      context = workInProgress.memoizedState;
      context = null !== context ? context.element : null;
      cloneUpdateQueue(current, workInProgress);
      processUpdateQueue(workInProgress, updateLanes, null, renderLanes);
      updateLanes = workInProgress.memoizedState.element;
      if (updateLanes === context)
        resetHydrationState(),
          (workInProgress = bailoutOnAlreadyFinishedWork(
            current,
            workInProgress,
            renderLanes
          ));
      else {
        context = workInProgress.stateNode;
        if ((init = context.hydrate))
          (nextHydratableInstance = getNextHydratable(
            workInProgress.stateNode.containerInfo.firstChild
          )),
            (hydrationParentFiber = workInProgress),
            (init = isHydrating = !0);
        if (init) {
          current = context.mutableSourceEagerHydrationData;
          if (null != current)
            for (context = 0; context < current.length; context += 2)
              (init = current[context]),
                (init._workInProgressVersionPrimary = current[context + 1]),
                workInProgressSources.push(init);
          renderLanes = mountChildFibers(
            workInProgress,
            null,
            updateLanes,
            renderLanes
          );
          for (workInProgress.child = renderLanes; renderLanes; )
            (renderLanes.effectTag = (renderLanes.effectTag & -3) | 1024),
              (renderLanes = renderLanes.sibling);
        } else
          reconcileChildren(current, workInProgress, updateLanes, renderLanes),
            resetHydrationState();
        workInProgress = workInProgress.child;
      }
      return workInProgress;
    case 5:
      return (
        pushHostContext(workInProgress),
        null === current && tryToClaimNextHydratableInstance(workInProgress),
        (updateLanes = workInProgress.type),
        (context = workInProgress.pendingProps),
        (init = null !== current ? current.memoizedProps : null),
        (resolvedProps = context.children),
        shouldSetTextContent(updateLanes, context)
          ? (resolvedProps = null)
          : null !== init &&
            shouldSetTextContent(updateLanes, init) &&
            (workInProgress.effectTag |= 16),
        markRef(current, workInProgress),
        reconcileChildren(current, workInProgress, resolvedProps, renderLanes),
        workInProgress.child
      );
    case 6:
      return (
        null === current && tryToClaimNextHydratableInstance(workInProgress),
        null
      );
    case 13:
      return updateSuspenseComponent(current, workInProgress, renderLanes);
    case 4:
      return (
        pushHostContainer(
          workInProgress,
          workInProgress.stateNode.containerInfo
        ),
        (updateLanes = workInProgress.pendingProps),
        null === current
          ? (workInProgress.child = reconcileChildFibers(
              workInProgress,
              null,
              updateLanes,
              renderLanes
            ))
          : reconcileChildren(
              current,
              workInProgress,
              updateLanes,
              renderLanes
            ),
        workInProgress.child
      );
    case 11:
      return (
        (updateLanes = workInProgress.type),
        (context = workInProgress.pendingProps),
        (context =
          workInProgress.elementType === updateLanes
            ? context
            : resolveDefaultProps(updateLanes, context)),
        updateForwardRef(
          current,
          workInProgress,
          updateLanes,
          context,
          renderLanes
        )
      );
    case 7:
      return (
        reconcileChildren(
          current,
          workInProgress,
          workInProgress.pendingProps,
          renderLanes
        ),
        workInProgress.child
      );
    case 8:
      return (
        reconcileChildren(
          current,
          workInProgress,
          workInProgress.pendingProps.children,
          renderLanes
        ),
        workInProgress.child
      );
    case 12:
      return (
        (workInProgress.effectTag |= 4),
        (updateLanes = workInProgress.stateNode),
        (updateLanes.effectDuration = 0),
        (updateLanes.passiveEffectDuration = 0),
        reconcileChildren(
          current,
          workInProgress,
          workInProgress.pendingProps.children,
          renderLanes
        ),
        workInProgress.child
      );
    case 10:
      a: {
        updateLanes = workInProgress.type._context;
        context = workInProgress.pendingProps;
        resolvedProps = workInProgress.memoizedProps;
        init = context.value;
        var context$jscomp$0 = workInProgress.type._context;
        push(valueCursor, context$jscomp$0._currentValue);
        context$jscomp$0._currentValue = init;
        if (null !== resolvedProps)
          if (
            ((context$jscomp$0 = resolvedProps.value),
            (init = objectIs(context$jscomp$0, init)
              ? 0
              : ("function" === typeof updateLanes._calculateChangedBits
                  ? updateLanes._calculateChangedBits(context$jscomp$0, init)
                  : 1073741823) | 0),
            0 === init)
          ) {
            if (resolvedProps.children === context.children) {
              workInProgress = bailoutOnAlreadyFinishedWork(
                current,
                workInProgress,
                renderLanes
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
              var list = resolvedProps.dependencies_new;
              if (null !== list) {
                context$jscomp$0 = resolvedProps.child;
                for (
                  var dependency = list.firstContext;
                  null !== dependency;

                ) {
                  if (
                    dependency.context === updateLanes &&
                    0 !== (dependency.observedBits & init)
                  ) {
                    1 === resolvedProps.tag &&
                      ((dependency = createUpdate(
                        -1,
                        getLowestPriorityLane(renderLanes),
                        null
                      )),
                      (dependency.tag = 2),
                      enqueueUpdate(resolvedProps, dependency));
                    resolvedProps.lanes |= renderLanes;
                    dependency = resolvedProps.alternate;
                    null !== dependency && (dependency.lanes |= renderLanes);
                    scheduleWorkOnParentPath(resolvedProps.return, renderLanes);
                    list.lanes |= renderLanes;
                    break;
                  }
                  dependency = dependency.next;
                }
              } else if (10 === resolvedProps.tag)
                context$jscomp$0 =
                  resolvedProps.type === workInProgress.type
                    ? null
                    : resolvedProps.child;
              else if (18 === resolvedProps.tag) {
                context$jscomp$0 = resolvedProps.return;
                if (null === context$jscomp$0)
                  throw Error(formatProdErrorMessage(341));
                context$jscomp$0.lanes |= renderLanes;
                list = context$jscomp$0.alternate;
                null !== list && (list.lanes |= renderLanes);
                scheduleWorkOnParentPath(context$jscomp$0, renderLanes);
                context$jscomp$0 = resolvedProps.sibling;
              } else context$jscomp$0 = resolvedProps.child;
              if (null !== context$jscomp$0)
                context$jscomp$0.return = resolvedProps;
              else
                for (
                  context$jscomp$0 = resolvedProps;
                  null !== context$jscomp$0;

                ) {
                  if (context$jscomp$0 === workInProgress) {
                    context$jscomp$0 = null;
                    break;
                  }
                  resolvedProps = context$jscomp$0.sibling;
                  if (null !== resolvedProps) {
                    resolvedProps.return = context$jscomp$0.return;
                    context$jscomp$0 = resolvedProps;
                    break;
                  }
                  context$jscomp$0 = context$jscomp$0.return;
                }
              resolvedProps = context$jscomp$0;
            }
        reconcileChildren(
          current,
          workInProgress,
          context.children,
          renderLanes
        );
        workInProgress = workInProgress.child;
      }
      return workInProgress;
    case 9:
      return (
        (context = workInProgress.type),
        (init = workInProgress.pendingProps),
        (updateLanes = init.children),
        prepareToReadContext(workInProgress, renderLanes),
        (context = readContext(context, init.unstable_observedBits)),
        (updateLanes = updateLanes(context)),
        (workInProgress.effectTag |= 1),
        reconcileChildren(current, workInProgress, updateLanes, renderLanes),
        workInProgress.child
      );
    case 14:
      return (
        (context = workInProgress.type),
        (init = resolveDefaultProps(context, workInProgress.pendingProps)),
        (init = resolveDefaultProps(context.type, init)),
        updateMemoComponent(
          current,
          workInProgress,
          context,
          init,
          updateLanes,
          renderLanes
        )
      );
    case 15:
      return updateSimpleMemoComponent(
        current,
        workInProgress,
        workInProgress.type,
        workInProgress.pendingProps,
        updateLanes,
        renderLanes
      );
    case 17:
      return (
        (updateLanes = workInProgress.type),
        (context = workInProgress.pendingProps),
        (context =
          workInProgress.elementType === updateLanes
            ? context
            : resolveDefaultProps(updateLanes, context)),
        null !== current &&
          ((current.alternate = null),
          (workInProgress.alternate = null),
          (workInProgress.effectTag |= 2)),
        (workInProgress.tag = 1),
        prepareToReadContext(workInProgress, renderLanes),
        constructClassInstance(workInProgress, updateLanes, context),
        mountClassInstance(workInProgress, updateLanes, context, renderLanes),
        finishClassComponent(
          null,
          workInProgress,
          updateLanes,
          !0,
          !1,
          renderLanes
        )
      );
    case 19:
      return updateSuspenseListComponent(current, workInProgress, renderLanes);
    case 21:
      return (
        reconcileChildren(
          current,
          workInProgress,
          workInProgress.pendingProps.children,
          renderLanes
        ),
        workInProgress.child
      );
    case 22:
      return updateBlock(
        current,
        workInProgress,
        workInProgress.type,
        workInProgress.pendingProps,
        renderLanes
      );
    case 23:
      return updateOffscreenComponent(current, workInProgress, renderLanes);
    case 24:
      return updateOffscreenComponent(current, workInProgress, renderLanes);
  }
  throw Error(formatProdErrorMessage(156, workInProgress.tag));
};
function markSpawnedWork(lane) {
  null === spawnedWorkDuringRender
    ? (spawnedWorkDuringRender = [lane])
    : spawnedWorkDuringRender.push(lane);
}
function scheduleInteractions(root, lane, interactions) {
  if (0 < interactions.size) {
    var pendingInteractionMap = root.pendingInteractionMap_new,
      pendingInteractions = pendingInteractionMap.get(lane);
    null != pendingInteractions
      ? interactions.forEach(function(interaction) {
          pendingInteractions.has(interaction) || interaction.__count++;
          pendingInteractions.add(interaction);
        })
      : (pendingInteractionMap.set(lane, new Set(interactions)),
        interactions.forEach(function(interaction) {
          interaction.__count++;
        }));
    pendingInteractionMap = tracing.__subscriberRef.current;
    if (null !== pendingInteractionMap)
      pendingInteractionMap.onWorkScheduled(
        interactions,
        1e3 * lane + root.interactionThreadID
      );
  }
}
function schedulePendingInteractions(root, lane) {
  scheduleInteractions(root, lane, tracing.__interactionsRef.current);
}
function startWorkOnPendingInteractions(root, lanes) {
  var interactions = new Set();
  root.pendingInteractionMap_new.forEach(function(
    scheduledInteractions,
    scheduledLane
  ) {
    0 !== (lanes & scheduledLane) &&
      scheduledInteractions.forEach(function(interaction) {
        return interactions.add(interaction);
      });
  });
  root.memoizedInteractions = interactions;
  if (0 < interactions.size) {
    var subscriber = tracing.__subscriberRef.current;
    if (null !== subscriber) {
      root = 1e3 * lanes + root.interactionThreadID;
      try {
        subscriber.onWorkStarted(interactions, root);
      } catch (error) {
        scheduleCallback(99, function() {
          throw error;
        });
      }
    }
  }
}
function finishPendingInteractions(root, committedLanes) {
  var remainingLanesAfterCommit = root.pendingLanes;
  try {
    var subscriber = tracing.__subscriberRef.current;
    if (null !== subscriber && 0 < root.memoizedInteractions.size)
      subscriber.onWorkStopped(
        root.memoizedInteractions,
        1e3 * committedLanes + root.interactionThreadID
      );
  } catch (error) {
    scheduleCallback(99, function() {
      throw error;
    });
  } finally {
    var pendingInteractionMap = root.pendingInteractionMap_new;
    pendingInteractionMap.forEach(function(scheduledInteractions, lane) {
      0 === (remainingLanesAfterCommit & lane) &&
        (pendingInteractionMap.delete(lane),
        scheduledInteractions.forEach(function(interaction) {
          interaction.__count--;
          if (null !== subscriber && 0 === interaction.__count)
            try {
              subscriber.onInteractionScheduledWorkCompleted(interaction);
            } catch (error$168) {
              scheduleCallback(99, function() {
                throw error$168;
              });
            }
        }));
    });
  }
}
function FiberNode(tag, pendingProps, key, mode) {
  this.tag = tag;
  this.key = key;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = pendingProps;
  this.dependencies_new = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = mode;
  this.effectTag = 0;
  this.lastEffect = this.firstEffect = this.nextEffect = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
  this.actualDuration = 0;
  this.actualStartTime = -1;
  this.treeBaseDuration = this.selfBaseDuration = 0;
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
      (workInProgress.type = current.type),
      (workInProgress.effectTag = 0),
      (workInProgress.nextEffect = null),
      (workInProgress.firstEffect = null),
      (workInProgress.lastEffect = null),
      (workInProgress.actualDuration = 0),
      (workInProgress.actualStartTime = -1));
  workInProgress.childLanes = current.childLanes;
  workInProgress.lanes = current.lanes;
  workInProgress.child = current.child;
  workInProgress.memoizedProps = current.memoizedProps;
  workInProgress.memoizedState = current.memoizedState;
  workInProgress.updateQueue = current.updateQueue;
  pendingProps = current.dependencies_new;
  workInProgress.dependencies_new =
    null === pendingProps
      ? null
      : {
          lanes: pendingProps.lanes,
          firstContext: pendingProps.firstContext,
          responders: pendingProps.responders
        };
  workInProgress.sibling = current.sibling;
  workInProgress.index = current.index;
  workInProgress.ref = current.ref;
  workInProgress.selfBaseDuration = current.selfBaseDuration;
  workInProgress.treeBaseDuration = current.treeBaseDuration;
  return workInProgress;
}
function createFiberFromTypeAndProps(
  type,
  key,
  pendingProps,
  owner,
  mode,
  lanes
) {
  var fiberTag = 2;
  owner = type;
  if ("function" === typeof type) shouldConstruct(type) && (fiberTag = 1);
  else if ("string" === typeof type) fiberTag = 5;
  else
    a: switch (type) {
      case REACT_FRAGMENT_TYPE:
        return createFiberFromFragment(pendingProps.children, mode, lanes, key);
      case REACT_DEBUG_TRACING_MODE_TYPE:
        fiberTag = 8;
        mode |= 16;
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
          (type.lanes = lanes),
          (type.stateNode = { effectDuration: 0, passiveEffectDuration: 0 }),
          type
        );
      case REACT_SUSPENSE_TYPE:
        return (
          (type = createFiber(13, pendingProps, key, mode)),
          (type.type = REACT_SUSPENSE_TYPE),
          (type.elementType = REACT_SUSPENSE_TYPE),
          (type.lanes = lanes),
          type
        );
      case REACT_SUSPENSE_LIST_TYPE:
        return (
          (type = createFiber(19, pendingProps, key, mode)),
          (type.elementType = REACT_SUSPENSE_LIST_TYPE),
          (type.lanes = lanes),
          type
        );
      case REACT_OFFSCREEN_TYPE:
        return createFiberFromOffscreen(pendingProps, mode, lanes, key);
      case REACT_LEGACY_HIDDEN_TYPE:
        return (
          (type = createFiber(24, pendingProps, key, mode)),
          (type.elementType = REACT_LEGACY_HIDDEN_TYPE),
          (type.lanes = lanes),
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
                (key.lanes = lanes),
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
  key.lanes = lanes;
  return key;
}
function createFiberFromFragment(elements, mode, lanes, key) {
  elements = createFiber(7, elements, key, mode);
  elements.lanes = lanes;
  return elements;
}
function createFiberFromOffscreen(pendingProps, mode, lanes, key) {
  pendingProps = createFiber(23, pendingProps, key, mode);
  pendingProps.elementType = REACT_OFFSCREEN_TYPE;
  pendingProps.lanes = lanes;
  return pendingProps;
}
function createFiberFromText(content, mode, lanes) {
  content = createFiber(6, content, null, mode);
  content.lanes = lanes;
  return content;
}
function createFiberFromPortal(portal, mode, lanes) {
  mode = createFiber(
    4,
    null !== portal.children ? portal.children : [],
    portal.key,
    mode
  );
  mode.lanes = lanes;
  mode.stateNode = {
    containerInfo: portal.containerInfo,
    pendingChildren: null,
    implementation: portal.implementation
  };
  return mode;
}
function FiberRootNode(containerInfo, tag, hydrate) {
  this.tag = tag;
  this.containerInfo = containerInfo;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.pendingContext = this.context = null;
  this.hydrate = hydrate;
  this.callbackNode = null;
  this.callbackPriority_new = this.callbackId = 0;
  this.expirationTimes = Array(31).fill(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = Array(31).fill(0);
  this.mutableSourceEagerHydrationData = null;
  this.interactionThreadID = tracing.unstable_getThreadID();
  this.memoizedInteractions = new Set();
  this.pendingInteractionMap_new = new Map();
  this.hydrationCallbacks = null;
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
  var eventTime = requestEventTime(),
    suspenseConfig = ReactCurrentBatchConfig.suspense,
    lane = requestUpdateLane(parentComponent, suspenseConfig);
  null === container.context
    ? (container.context = emptyContextObject)
    : (container.pendingContext = emptyContextObject);
  container = createUpdate(eventTime, lane, suspenseConfig);
  container.payload = { element: element };
  callback = void 0 === callback ? null : callback;
  null !== callback && (container.callback = callback);
  enqueueUpdate(parentComponent, container);
  scheduleUpdateOnFiber(parentComponent, lane, eventTime);
  return lane;
}
function markRetryLaneImpl(fiber, retryLane) {
  fiber = fiber.memoizedState;
  if (null !== fiber && null !== fiber.dehydrated) {
    var a = fiber.retryLane;
    fiber.retryLane = 0 !== a && a < retryLane ? a : retryLane;
  }
}
function markRetryLaneIfNotHydrated(fiber, retryLane) {
  markRetryLaneImpl(fiber, retryLane);
  (fiber = fiber.alternate) && markRetryLaneImpl(fiber, retryLane);
}
function emptyFindFiberByHostInstance() {
  return null;
}
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
    mutableSources =
      (null != options &&
        null != options.hydrationOptions &&
        options.hydrationOptions.mutableSources) ||
      null,
    hydrationCallbacks = (null != options && options.hydrationOptions) || null;
  options = new FiberRootNode(container, tag, hydrate);
  options.hydrationCallbacks = hydrationCallbacks;
  hydrationCallbacks = 2 === tag ? 7 : 1 === tag ? 3 : 0;
  isDevToolsPresent && (hydrationCallbacks |= 8);
  hydrationCallbacks = createFiber(3, null, null, hydrationCallbacks);
  options.current = hydrationCallbacks;
  hydrationCallbacks.stateNode = options;
  initializeUpdateQueue(hydrationCallbacks);
  container[internalContainerInstanceKey] = options.current;
  hydrationCallbacks = container.nodeType;
  hydrate && 0 !== tag
    ? eagerlyTrapReplayableEvents(
        container,
        9 === hydrationCallbacks ? container : container.ownerDocument
      )
    : enableModernEventSystem &&
      11 !== hydrationCallbacks &&
      9 !== hydrationCallbacks &&
      ensureListeningTo(container, "onMouseEnter");
  if (mutableSources)
    for (container = 0; container < mutableSources.length; container++)
      (tag = mutableSources[container]),
        (hydrate = tag._getVersion),
        (hydrate = hydrate(tag._source)),
        null == options.mutableSourceEagerHydrationData
          ? (options.mutableSourceEagerHydrationData = [tag, hydrate])
          : options.mutableSourceEagerHydrationData.push(tag, hydrate);
  return options;
}
function createRoot(container, options) {
  if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
  return new ReactDOMRoot(container, options);
}
function createBlockingRoot(container, options) {
  if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
  return new ReactDOMBlockingRoot(container, 1, options);
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
function registerEventOnNearestTargetContainer(
  targetFiber,
  topLevelType,
  passive,
  priority
) {
  a: {
    for (; null !== targetFiber; ) {
      var tag = targetFiber.tag;
      if (3 === tag || 4 === tag) {
        targetFiber = targetFiber.stateNode.containerInfo;
        break a;
      }
      targetFiber = targetFiber.return;
    }
    targetFiber = null;
  }
  if (null === targetFiber) throw Error(formatProdErrorMessage(366));
  tag = getEventListenerMap(targetFiber);
  listenToTopLevelEvent(topLevelType, targetFiber, tag, 1, passive, priority);
}
attemptSynchronousHydration = function(fiber) {
  switch (fiber.tag) {
    case 3:
      var root$169 = fiber.stateNode;
      if (root$169.hydrate) {
        var lanes = getHighestPriorityLanes(root$169.pendingLanes);
        root$169.expiredLanes |= lanes & root$169.pendingLanes;
        ensureRootIsScheduled(root$169, now());
        0 === (executionContext & 48) && flushSyncCallbackQueue();
      }
      break;
    case 13:
      var eventTime = requestEventTime();
      flushSync(function() {
        return scheduleUpdateOnFiber(fiber, 1, eventTime);
      });
      markRetryLaneIfNotHydrated(fiber, 4);
  }
};
attemptUserBlockingHydration = function(fiber) {
  if (13 === fiber.tag) {
    var eventTime = requestEventTime();
    scheduleUpdateOnFiber(fiber, 4, eventTime);
    markRetryLaneIfNotHydrated(fiber, 4);
  }
};
attemptContinuousHydration = function(fiber) {
  if (13 === fiber.tag) {
    var eventTime = requestEventTime();
    scheduleUpdateOnFiber(fiber, 100663296, eventTime);
    markRetryLaneIfNotHydrated(fiber, 100663296);
  }
};
attemptHydrationAtCurrentPriority = function(fiber) {
  if (13 === fiber.tag) {
    var eventTime = requestEventTime(),
      lane = requestUpdateLane(fiber, null);
    scheduleUpdateOnFiber(fiber, lane, eventTime);
    markRetryLaneIfNotHydrated(fiber, lane);
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
            var otherProps = getFiberCurrentPropsFromNode(otherNode);
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
discreteUpdatesImpl = function(fn, a, b, c, d) {
  var prevExecutionContext = executionContext;
  executionContext |= 4;
  try {
    return runWithPriority$2(98, fn.bind(null, a, b, c, d));
  } finally {
    (executionContext = prevExecutionContext),
      0 === executionContext && flushSyncCallbackQueue();
  }
};
flushDiscreteUpdatesImpl = function() {
  0 === (executionContext & 49) &&
    (flushPendingDiscreteUpdates(), flushPassiveEffects());
};
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
      getInstanceFromNode$1,
      getNodeFromInstance$1,
      getFiberCurrentPropsFromNode,
      injectEventPluginsByName,
      eventNameDispatchConfigs,
      enqueueStateRestore,
      restoreStateIfNeeded,
      dispatchEvent,
      flushPassiveEffects,
      { current: !1 }
    ]
  },
  devToolsConfig$jscomp$inline_1482 = {
    findFiberByHostInstance: getClosestInstanceFromNode,
    bundleType: 0,
    version: "16.13.1",
    rendererPackageName: "react-dom"
  };
var internals$jscomp$inline_1883 = {
  bundleType: devToolsConfig$jscomp$inline_1482.bundleType,
  version: devToolsConfig$jscomp$inline_1482.version,
  rendererPackageName: devToolsConfig$jscomp$inline_1482.rendererPackageName,
  rendererConfig: devToolsConfig$jscomp$inline_1482.rendererConfig,
  overrideHookState: null,
  overrideProps: null,
  setSuspenseHandler: null,
  scheduleUpdate: null,
  currentDispatcherRef: ReactSharedInternals.ReactCurrentDispatcher,
  findHostInstanceByFiber: function(fiber) {
    fiber = findCurrentHostFiber(fiber);
    return null === fiber ? null : fiber.stateNode;
  },
  findFiberByHostInstance:
    devToolsConfig$jscomp$inline_1482.findFiberByHostInstance ||
    emptyFindFiberByHostInstance,
  findHostInstancesForRefresh: null,
  scheduleRefresh: null,
  scheduleRoot: null,
  setRefreshHandler: null,
  getCurrentFiber: null
};
if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
  var hook$jscomp$inline_1884 = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (
    !hook$jscomp$inline_1884.isDisabled &&
    hook$jscomp$inline_1884.supportsFiber
  )
    try {
      (rendererID = hook$jscomp$inline_1884.inject(
        internals$jscomp$inline_1883
      )),
        (injectedHook = hook$jscomp$inline_1884);
    } catch (err) {}
}
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Internals;
exports.createBlockingRoot = createBlockingRoot;
exports.createPortal = function(children, container) {
  var key =
    2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!isValidContainer(container)) throw Error(formatProdErrorMessage(200));
  return createPortal(children, container, null, key);
};
exports.createRoot = createRoot;
exports.flushSync = flushSync;
exports.unstable_batchedUpdates = batchedUpdates$1;
exports.unstable_createBlockingRoot = createBlockingRoot;
exports.unstable_createEventHandle = function(type, options) {
  function destroy(target) {
    var listener = listeners.get(target);
    void 0 !== listener &&
      (listeners.delete(target),
      (target = target[internalEventHandlerListenersKey] || null),
      null !== target && target.delete(listener));
  }
  var capture = !1,
    passive = void 0,
    priority;
  if (null != options) {
    var optionsCapture = options.capture,
      optionsPassive = options.passive;
    options = options.priority;
    "boolean" === typeof optionsCapture && (capture = optionsCapture);
    "boolean" === typeof optionsPassive && (passive = optionsPassive);
    "number" === typeof options && (priority = options);
  }
  void 0 === priority && (priority = getEventPriorityForListenerSystem(type));
  var listeners = new Map();
  return {
    setListener: function(target, callback) {
      if (1 === target.nodeType) {
        var targetFiber = getClosestInstanceFromNode(target);
        if (null === targetFiber) throw Error(formatProdErrorMessage(367));
        registerEventOnNearestTargetContainer(
          targetFiber,
          type,
          passive,
          priority
        );
      } else if ("function" === typeof target.getChildContextValues) {
        targetFiber = target[internalInstanceKey] || null;
        if (null === targetFiber) return;
        registerEventOnNearestTargetContainer(
          targetFiber,
          type,
          passive,
          priority
        );
      } else if ("function" === typeof target.addEventListener)
        (targetFiber = getEventListenerMap(target)),
          listenToTopLevelEvent(
            type,
            target,
            targetFiber,
            5,
            passive,
            priority,
            capture
          );
      else throw Error(formatProdErrorMessage(368));
      targetFiber = listeners.get(target);
      void 0 === targetFiber
        ? null !== callback &&
          ((targetFiber = {
            callback: callback,
            capture: capture,
            destroy: destroy,
            type: type
          }),
          listeners.set(target, targetFiber),
          (callback = target[internalEventHandlerListenersKey] || null),
          null === callback &&
            ((callback = new Set()),
            (target[internalEventHandlerListenersKey] = callback)),
          callback.add(targetFiber),
          void 0 === topLevelEventsToDispatchConfig.get(type) &&
            topLevelEventsToDispatchConfig.set(
              type,
              emptyDispatchConfigForCustomEvents
            ))
        : null !== callback
        ? (targetFiber.callback = callback)
        : destroy(target);
    },
    clear: function() {
      for (
        var eventTargetsArr = Array.from(listeners.keys()), i = 0;
        i < eventTargetsArr.length;
        i++
      )
        destroy(eventTargetsArr[i]);
    }
  };
};
exports.unstable_createRoot = createRoot;
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
exports.unstable_isNewReconciler = !0;
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
