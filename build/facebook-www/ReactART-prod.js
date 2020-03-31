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
var React = require("react"),
  Transform = require("art/core/transform"),
  Mode$1 = require("art/modes/current"),
  Scheduler = require("scheduler"),
  tracing = require("scheduler/tracing"),
  FastNoSideEffects = require("art/modes/fast-noSideEffects");
function _extends() {
  _extends =
    Object.assign ||
    function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i],
          key;
        for (key in source)
          Object.prototype.hasOwnProperty.call(source, key) &&
            (target[key] = source[key]);
      }
      return target;
    };
  return _extends.apply(this, arguments);
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
function _assertThisInitialized(self) {
  if (void 0 === self)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return self;
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
var ReactSharedInternals =
    React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  hasSymbol = "function" === typeof Symbol && Symbol.for,
  REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103,
  REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106,
  REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107,
  REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108,
  REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114,
  REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109,
  REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110,
  REACT_CONCURRENT_MODE_TYPE = hasSymbol
    ? Symbol.for("react.concurrent_mode")
    : 60111,
  REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112,
  REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113,
  REACT_SUSPENSE_LIST_TYPE = hasSymbol
    ? Symbol.for("react.suspense_list")
    : 60120,
  REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115,
  REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116,
  REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121;
hasSymbol && Symbol.for("react.fundamental");
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118,
  REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119,
  MAYBE_ITERATOR_SYMBOL = "function" === typeof Symbol && Symbol.iterator;
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
var disableSchedulerTimeoutBasedOnReactExpirationTime = require("ReactFeatureFlags")
  .disableSchedulerTimeoutBasedOnReactExpirationTime;
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
      for (var didFindChild = !1, _child = parentA.child; _child; ) {
        if (_child === a) {
          didFindChild = !0;
          a = parentA;
          b = parentB;
          break;
        }
        if (_child === b) {
          didFindChild = !0;
          b = parentA;
          a = parentB;
          break;
        }
        _child = _child.sibling;
      }
      if (!didFindChild) {
        for (_child = parentB.child; _child; ) {
          if (_child === a) {
            didFindChild = !0;
            a = parentB;
            b = parentA;
            break;
          }
          if (_child === b) {
            didFindChild = !0;
            b = parentB;
            a = parentA;
            break;
          }
          _child = _child.sibling;
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
var TYPES = {
    CLIPPING_RECTANGLE: "ClippingRectangle",
    GROUP: "Group",
    SHAPE: "Shape",
    TEXT: "Text"
  },
  EVENT_TYPES = {
    onClick: "click",
    onMouseMove: "mousemove",
    onMouseOver: "mouseover",
    onMouseOut: "mouseout",
    onMouseUp: "mouseup",
    onMouseDown: "mousedown"
  };
function childrenAsString(children) {
  return children
    ? "string" === typeof children
      ? children
      : children.length
      ? children.join("")
      : ""
    : "";
}
function shim() {
  throw Error(formatProdErrorMessage(305));
}
var pooledTransform = new Transform(),
  NO_CONTEXT = {},
  UPDATE_SIGNAL = {};
function createEventHandler(instance) {
  return function(event) {
    var listener = instance._listeners[event.type];
    listener &&
      ("function" === typeof listener
        ? listener.call(instance, event)
        : listener.handleEvent && listener.handleEvent(event));
  };
}
function destroyEventListeners(instance) {
  if (instance._subscriptions)
    for (var type in instance._subscriptions) instance._subscriptions[type]();
  instance._subscriptions = null;
  instance._listeners = null;
}
function applyClippingRectangleProps(instance, props) {
  applyNodeProps(
    instance,
    props,
    2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}
  );
  instance.width = props.width;
  instance.height = props.height;
}
function applyGroupProps(instance, props) {
  applyNodeProps(
    instance,
    props,
    2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}
  );
  instance.width = props.width;
  instance.height = props.height;
}
function applyNodeProps(instance, props) {
  var prevProps =
    2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
  var scaleX =
    null != props.scaleX ? props.scaleX : null != props.scale ? props.scale : 1;
  var scaleY =
    null != props.scaleY ? props.scaleY : null != props.scale ? props.scale : 1;
  pooledTransform
    .transformTo(1, 0, 0, 1, 0, 0)
    .move(props.x || 0, props.y || 0)
    .rotate(props.rotation || 0, props.originX, props.originY)
    .scale(scaleX, scaleY, props.originX, props.originY);
  null != props.transform && pooledTransform.transform(props.transform);
  (instance.xx === pooledTransform.xx &&
    instance.yx === pooledTransform.yx &&
    instance.xy === pooledTransform.xy &&
    instance.yy === pooledTransform.yy &&
    instance.x === pooledTransform.x &&
    instance.y === pooledTransform.y) ||
    instance.transformTo(pooledTransform);
  (props.cursor === prevProps.cursor && props.title === prevProps.title) ||
    instance.indicate(props.cursor, props.title);
  instance.blend &&
    props.opacity !== prevProps.opacity &&
    instance.blend(null == props.opacity ? 1 : props.opacity);
  props.visible !== prevProps.visible &&
    (null == props.visible || props.visible
      ? instance.show()
      : instance.hide());
  for (var type in EVENT_TYPES)
    (prevProps = instance),
      (scaleX = EVENT_TYPES[type]),
      (scaleY = props[type]),
      prevProps._listeners ||
        ((prevProps._listeners = {}), (prevProps._subscriptions = {})),
      (prevProps._listeners[scaleX] = scaleY)
        ? prevProps._subscriptions[scaleX] ||
          (prevProps._subscriptions[scaleX] = prevProps.subscribe(
            scaleX,
            createEventHandler(prevProps),
            prevProps
          ))
        : prevProps._subscriptions[scaleX] &&
          (prevProps._subscriptions[scaleX](),
          delete prevProps._subscriptions[scaleX]);
}
function applyRenderableNodeProps(instance, props) {
  var prevProps =
    2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
  applyNodeProps(instance, props, prevProps);
  prevProps.fill !== props.fill &&
    (props.fill && props.fill.applyFill
      ? props.fill.applyFill(instance)
      : instance.fill(props.fill));
  (prevProps.stroke === props.stroke &&
    prevProps.strokeWidth === props.strokeWidth &&
    prevProps.strokeCap === props.strokeCap &&
    prevProps.strokeJoin === props.strokeJoin &&
    prevProps.strokeDash === props.strokeDash) ||
    instance.stroke(
      props.stroke,
      props.strokeWidth,
      props.strokeCap,
      props.strokeJoin,
      props.strokeDash
    );
}
function applyShapeProps(instance, props) {
  var prevProps =
    2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
  applyRenderableNodeProps(instance, props, prevProps);
  var path = props.d || childrenAsString(props.children),
    prevDelta = instance._prevDelta;
  if (
    path !== instance._prevPath ||
    path.delta !== prevDelta ||
    prevProps.height !== props.height ||
    prevProps.width !== props.width
  )
    instance.draw(path, props.width, props.height),
      (instance._prevDelta = path.delta),
      (instance._prevPath = path);
}
function applyTextProps(instance, props) {
  var prevProps =
    2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
  applyRenderableNodeProps(instance, props, prevProps);
  var string = props.children,
    JSCompiler_temp;
  if (!(JSCompiler_temp = instance._currentString !== string)) {
    JSCompiler_temp = props.font;
    var newFont = prevProps.font;
    JSCompiler_temp =
      JSCompiler_temp === newFont
        ? !0
        : "string" === typeof newFont || "string" === typeof JSCompiler_temp
        ? !1
        : newFont.fontSize === JSCompiler_temp.fontSize &&
          newFont.fontStyle === JSCompiler_temp.fontStyle &&
          newFont.fontVariant === JSCompiler_temp.fontVariant &&
          newFont.fontWeight === JSCompiler_temp.fontWeight &&
          newFont.fontFamily === JSCompiler_temp.fontFamily;
    JSCompiler_temp = !JSCompiler_temp;
  }
  if (
    JSCompiler_temp ||
    props.alignment !== prevProps.alignment ||
    props.path !== prevProps.path
  )
    instance.draw(string, props.font, props.alignment, props.path),
      (instance._currentString = string);
}
var scheduleTimeout = setTimeout,
  cancelTimeout = clearTimeout;
function shouldSetTextContent(type, props) {
  return (
    "string" === typeof props.children || "number" === typeof props.children
  );
}
function DEPRECATED_unmountResponderInstance() {
  throw Error("Not yet implemented.");
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
function runWithPriority(reactPriorityLevel, fn) {
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
      runWithPriority(99, function() {
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
function is(x, y) {
  return (x === y && (0 !== x || 1 / x === 1 / y)) || (x !== x && y !== y);
}
var objectIs = "function" === typeof Object.is ? Object.is : is,
  hasOwnProperty = Object.prototype.hasOwnProperty;
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
      !hasOwnProperty.call(objB, keysA[keysB]) ||
      !objectIs(objA[keysA[keysB]], objB[keysA[keysB]])
    )
      return !1;
  return !0;
}
var BEFORE_SLASH_RE = /^(.*)[\\\/]/;
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
  providerFiber.type._context._currentValue2 = currentValue;
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
  return context._currentValue2;
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
        effect = callback;
        callback = instance;
        if ("function" !== typeof effect)
          throw Error(formatProdErrorMessage(191, effect));
        effect.call(callback);
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
  NO_CONTEXT$1 = {},
  contextStackCursor = { current: NO_CONTEXT$1 },
  contextFiberStackCursor = { current: NO_CONTEXT$1 },
  rootInstanceStackCursor = { current: NO_CONTEXT$1 };
function requiredContext(c) {
  if (c === NO_CONTEXT$1) throw Error(formatProdErrorMessage(174));
  return c;
}
function pushHostContainer(fiber, nextRootInstance) {
  push(rootInstanceStackCursor, nextRootInstance);
  push(contextFiberStackCursor, fiber);
  push(contextStackCursor, NO_CONTEXT$1);
  pop(contextStackCursor);
  push(contextStackCursor, NO_CONTEXT);
}
function popHostContainer() {
  pop(contextStackCursor);
  pop(contextFiberStackCursor);
  pop(rootInstanceStackCursor);
}
function pushHostContext(fiber) {
  requiredContext(rootInstanceStackCursor.current);
  requiredContext(contextStackCursor.current) !== NO_CONTEXT &&
    (push(contextFiberStackCursor, fiber),
    push(contextStackCursor, NO_CONTEXT));
}
function popHostContext(fiber) {
  contextFiberStackCursor.current === fiber &&
    (pop(contextStackCursor), pop(contextFiberStackCursor));
}
var SubtreeSuspenseContextMask = 1,
  InvisibleParentSuspenseContext = 1,
  ForceSuspenseFallback = 2,
  suspenseStackCursor = { current: 0 };
function findFirstSuspended(row) {
  for (var node = row; null !== node; ) {
    if (13 === node.tag) {
      var state = node.memoizedState;
      if (null !== state && (null === state.dehydrated || shim() || shim()))
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
var isArray$1 = Array.isArray;
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
  if (!visistedResponders.has(responder)) {
    visistedResponders.add(responder);
    visistedResponders = respondersMap.get(responder);
    if (void 0 === visistedResponders) {
      responder = responder.getInitialState;
      null !== responder && responder(listener);
      if (!rootContainerInstance)
        for (; null !== fiber; ) {
          rootContainerInstance = fiber.tag;
          if (5 === rootContainerInstance) break;
          else if (3 === rootContainerInstance) break;
          fiber = fiber.return;
        }
      throw Error("Not yet implemented.");
    }
    visistedResponders.props = listener;
    visistedResponders.fiber = fiber;
  }
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
          (listeners.get(respondersMap),
          DEPRECATED_unmountResponderInstance(),
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
      var i = 0;
      for (
        respondersMap = Array.from(respondersMap.values()).length;
        i < respondersMap;
        i++
      )
        DEPRECATED_unmountResponderInstance();
      fiber.responders = null;
    }
  }
}
var NoEffect$1 = 0,
  HasEffect = 1,
  Layout = 2,
  Passive$1 = 4,
  workInProgressSecondarySources = [];
function resetWorkInProgressVersions() {
  for (var _i = 0; _i < workInProgressSecondarySources.length; _i++)
    workInProgressSecondarySources[_i]._workInProgressVersionSecondary = null;
  workInProgressSecondarySources.length = 0;
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
  var currentRenderVersion = source._workInProgressVersionSecondary;
  if (null !== currentRenderVersion) root = currentRenderVersion === getVersion;
  else if (
    ((root = root.mutableSourcePendingUpdateTime),
    (root = 0 === root ? !0 : 0 === root || root >= renderExpirationTime))
  )
    (source._workInProgressVersionSecondary = getVersion),
      workInProgressSecondarySources.push(source);
  if (root) return getSnapshot(source._source);
  workInProgressSecondarySources.push(source);
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
    HasEffect | hookEffectTag,
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
  hook.memoizedState = pushEffect(
    HasEffect | hookEffectTag,
    create,
    destroy,
    deps
  );
}
function mountEffect(create, deps) {
  return mountEffectImpl(516, Passive$1, create, deps);
}
function updateEffect(create, deps) {
  return updateEffectImpl(516, Passive$1, create, deps);
}
function updateLayoutEffect(create, deps) {
  return updateEffectImpl(4, Layout, create, deps);
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
    Layout,
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
  runWithPriority(98 > priorityLevel ? 98 : priorityLevel, function() {
    setPending(!0);
  });
  runWithPriority(97 < priorityLevel ? 97 : priorityLevel, function() {
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
        Layout,
        imperativeHandleEffect.bind(null, create, ref),
        deps
      );
    },
    useLayoutEffect: function(create, deps) {
      return mountEffectImpl(4, Layout, create, deps);
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
  ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner,
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
      JSCompiler_temp = 0 !== (suspenseContext & ForceSuspenseFallback);
    }
  JSCompiler_temp
    ? ((nextDidTimeout = !0), (workInProgress.effectTag &= -65))
    : (null !== current && null === current.memoizedState) ||
      void 0 === nextProps.fallback ||
      !0 === nextProps.unstable_avoidThisFallback ||
      (suspenseContext |= InvisibleParentSuspenseContext);
  suspenseContext &= SubtreeSuspenseContextMask;
  push(suspenseStackCursor, suspenseContext);
  if (null === current) {
    if (
      void 0 !== nextProps.fallback &&
      ((current = workInProgress.memoizedState),
      null !== current && null !== current.dehydrated)
    )
      return (
        0 === (workInProgress.mode & 2)
          ? (workInProgress.expirationTime = 1073741823)
          : shim()
          ? ((renderExpirationTime =
              1073741821 -
              25 *
                ((((1073741821 - requestCurrentTimeForUpdate() + 500) / 25) |
                  0) +
                  1)),
            markSpawnedWork(renderExpirationTime),
            (workInProgress.expirationTime = renderExpirationTime))
          : ((workInProgress.expirationTime = 1), markSpawnedWork(1)),
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
      else if (shim())
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
      else if (shim())
        (workInProgress.effectTag |= 64),
          (workInProgress.child = current.child),
          shim(
            JSCompiler_temp,
            retryDehydratedSuspenseBoundary.bind(null, current)
          ),
          (workInProgress = null);
      else {
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
  if (0 !== (nextProps & ForceSuspenseFallback))
    (nextProps =
      (nextProps & SubtreeSuspenseContextMask) | ForceSuspenseFallback),
      (workInProgress.effectTag |= 64);
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
    nextProps &= SubtreeSuspenseContextMask;
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
      var scopedNode = startingChild;
      var fn = fn$jscomp$0;
      if (5 === scopedNode.tag) {
        var type = scopedNode.type,
          memoizedProps = scopedNode.memoizedProps,
          instance = scopedNode.stateNode;
        if (null !== instance && !0 === fn(type, memoizedProps, instance)) {
          scopedNode = instance;
          break a;
        }
      }
      type = scopedNode.child;
      isFiberSuspenseAndTimedOut(scopedNode) &&
        (type = scopedNode.child.sibling.child);
      scopedNode =
        null !== type ? collectFirstScopedNodeFromChildren(type, fn) : null;
    }
    if (null !== scopedNode) return scopedNode;
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
    containsNode: function() {
      throw Error("Not yet implemented.");
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
var appendAllChildren,
  updateHostContainer,
  updateHostComponent$1,
  updateHostText$1;
appendAllChildren = function(parent, workInProgress) {
  for (var node = workInProgress.child; null !== node; ) {
    if (5 === node.tag || 6 === node.tag) {
      var parentInstance = parent,
        child = node.stateNode;
      if ("string" === typeof child) throw Error(formatProdErrorMessage(216));
      child.inject(parentInstance);
    } else if (4 !== node.tag && null !== node.child) {
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
updateHostComponent$1 = function(current, workInProgress, type, newProps) {
  current.memoizedProps !== newProps &&
    (requiredContext(contextStackCursor.current),
    (workInProgress.updateQueue = UPDATE_SIGNAL)) &&
    (workInProgress.effectTag |= 4);
};
updateHostText$1 = function(current, workInProgress, oldText, newText) {
  oldText !== newText && (workInProgress.effectTag |= 4);
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
      for (var _lastTailNode = null; null !== lastTailNode; )
        null !== lastTailNode.alternate && (_lastTailNode = lastTailNode),
          (lastTailNode = lastTailNode.sibling);
      null === _lastTailNode
        ? hasRenderedATailFallback || null === renderState.tail
          ? (renderState.tail = null)
          : (renderState.tail.sibling = null)
        : (_lastTailNode.sibling = null);
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
        (current = workInProgress.stateNode),
        current.pendingContext &&
          ((current.context = current.pendingContext),
          (current.pendingContext = null)),
        updateHostContainer(workInProgress),
        null
      );
    case 5:
      popHostContext(workInProgress);
      var rootContainerInstance = requiredContext(
        rootInstanceStackCursor.current
      );
      renderExpirationTime = workInProgress.type;
      if (null !== current && null != workInProgress.stateNode)
        updateHostComponent$1(
          current,
          workInProgress,
          renderExpirationTime,
          newProps,
          rootContainerInstance
        ),
          current.memoizedProps.DEPRECATED_flareListeners !==
            newProps.DEPRECATED_flareListeners &&
            (workInProgress.effectTag |= 4),
          current.ref !== workInProgress.ref &&
            (workInProgress.effectTag |= 128);
      else {
        if (!newProps) {
          if (null === workInProgress.stateNode)
            throw Error(formatProdErrorMessage(166));
          return null;
        }
        requiredContext(contextStackCursor.current);
        switch (renderExpirationTime) {
          case TYPES.CLIPPING_RECTANGLE:
            var instance = Mode$1.ClippingRectangle();
            instance._applyProps = applyClippingRectangleProps;
            break;
          case TYPES.GROUP:
            instance = Mode$1.Group();
            instance._applyProps = applyGroupProps;
            break;
          case TYPES.SHAPE:
            instance = Mode$1.Shape();
            instance._applyProps = applyShapeProps;
            break;
          case TYPES.TEXT:
            (instance = Mode$1.Text(
              newProps.children,
              newProps.font,
              newProps.alignment,
              newProps.path
            )),
              (instance._applyProps = applyTextProps);
        }
        if (!instance)
          throw Error(formatProdErrorMessage(217, renderExpirationTime));
        instance._applyProps(instance, newProps);
        current = instance;
        appendAllChildren(current, workInProgress, !1, !1);
        workInProgress.stateNode = current;
        current = newProps.DEPRECATED_flareListeners;
        null != current &&
          updateDeprecatedEventListeners(
            current,
            workInProgress,
            rootContainerInstance
          );
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
        requiredContext(rootInstanceStackCursor.current);
        requiredContext(contextStackCursor.current);
        workInProgress.stateNode = newProps;
      }
      return null;
    case 13:
      pop(suspenseStackCursor);
      newProps = workInProgress.memoizedState;
      if (null !== newProps && null !== newProps.dehydrated) {
        if (null === current) {
          throw Error(formatProdErrorMessage(318));
          throw Error(formatProdErrorMessage(344));
        }
        0 === (workInProgress.effectTag & 64) &&
          (workInProgress.memoizedState = null);
        workInProgress.effectTag |= 4;
        return null;
      }
      if (0 !== (workInProgress.effectTag & 64))
        return (
          (workInProgress.expirationTime = renderExpirationTime), workInProgress
        );
      newProps = null !== newProps;
      rootContainerInstance = !1;
      null !== current &&
        ((renderExpirationTime = current.memoizedState),
        (rootContainerInstance = null !== renderExpirationTime),
        newProps ||
          null === renderExpirationTime ||
          ((renderExpirationTime = current.child.sibling),
          null !== renderExpirationTime &&
            ((instance = workInProgress.firstEffect),
            null !== instance
              ? ((workInProgress.firstEffect = renderExpirationTime),
                (renderExpirationTime.nextEffect = instance))
              : ((workInProgress.firstEffect = workInProgress.lastEffect = renderExpirationTime),
                (renderExpirationTime.nextEffect = null)),
            (renderExpirationTime.effectTag = 8))));
      newProps &&
        !rootContainerInstance &&
        0 !== (workInProgress.mode & 2) &&
        ((null === current &&
          !0 !== workInProgress.memoizedProps.unstable_avoidThisFallback) ||
        0 !== (suspenseStackCursor.current & InvisibleParentSuspenseContext)
          ? workInProgressRootExitStatus === RootIncomplete &&
            (workInProgressRootExitStatus = RootSuspended)
          : renderDidSuspendDelayIfPossible());
      if (newProps || rootContainerInstance) workInProgress.effectTag |= 4;
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
      rootContainerInstance = 0 !== (workInProgress.effectTag & 64);
      instance = newProps.rendering;
      if (null === instance)
        if (rootContainerInstance) cutOffTailIfNeeded(newProps, !1);
        else {
          if (
            workInProgressRootExitStatus !== RootIncomplete ||
            (null !== current && 0 !== (current.effectTag & 64))
          )
            for (current = workInProgress.child; null !== current; ) {
              instance = findFirstSuspended(current);
              if (null !== instance) {
                workInProgress.effectTag |= 64;
                cutOffTailIfNeeded(newProps, !1);
                current = instance.updateQueue;
                null !== current &&
                  ((workInProgress.updateQueue = current),
                  (workInProgress.effectTag |= 4));
                null === newProps.lastEffect &&
                  (workInProgress.firstEffect = null);
                workInProgress.lastEffect = newProps.lastEffect;
                current = renderExpirationTime;
                for (newProps = workInProgress.child; null !== newProps; )
                  (rootContainerInstance = newProps),
                    (renderExpirationTime = current),
                    (rootContainerInstance.effectTag &= 2),
                    (rootContainerInstance.nextEffect = null),
                    (rootContainerInstance.firstEffect = null),
                    (rootContainerInstance.lastEffect = null),
                    (instance = rootContainerInstance.alternate),
                    null === instance
                      ? ((rootContainerInstance.childExpirationTime = 0),
                        (rootContainerInstance.expirationTime = renderExpirationTime),
                        (rootContainerInstance.child = null),
                        (rootContainerInstance.memoizedProps = null),
                        (rootContainerInstance.memoizedState = null),
                        (rootContainerInstance.updateQueue = null),
                        (rootContainerInstance.dependencies = null))
                      : ((rootContainerInstance.childExpirationTime =
                          instance.childExpirationTime),
                        (rootContainerInstance.expirationTime =
                          instance.expirationTime),
                        (rootContainerInstance.child = instance.child),
                        (rootContainerInstance.memoizedProps =
                          instance.memoizedProps),
                        (rootContainerInstance.memoizedState =
                          instance.memoizedState),
                        (rootContainerInstance.updateQueue =
                          instance.updateQueue),
                        (renderExpirationTime = instance.dependencies),
                        (rootContainerInstance.dependencies =
                          null === renderExpirationTime
                            ? null
                            : {
                                expirationTime:
                                  renderExpirationTime.expirationTime,
                                firstContext: renderExpirationTime.firstContext,
                                responders: renderExpirationTime.responders
                              })),
                    (newProps = newProps.sibling);
                push(
                  suspenseStackCursor,
                  (suspenseStackCursor.current & SubtreeSuspenseContextMask) |
                    ForceSuspenseFallback
                );
                return workInProgress.child;
              }
              current = current.sibling;
            }
        }
      else {
        if (!rootContainerInstance)
          if (((current = findFirstSuspended(instance)), null !== current)) {
            if (
              ((workInProgress.effectTag |= 64),
              (rootContainerInstance = !0),
              (current = current.updateQueue),
              null !== current &&
                ((workInProgress.updateQueue = current),
                (workInProgress.effectTag |= 4)),
              cutOffTailIfNeeded(newProps, !0),
              null === newProps.tail &&
                "hidden" === newProps.tailMode &&
                !instance.alternate)
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
              (rootContainerInstance = !0),
              cutOffTailIfNeeded(newProps, !1),
              (current = renderExpirationTime - 1),
              (workInProgress.expirationTime = workInProgress.childExpirationTime = current),
              markSpawnedWork(current));
        newProps.isBackwards
          ? ((instance.sibling = workInProgress.child),
            (workInProgress.child = instance))
          : ((current = newProps.last),
            null !== current
              ? (current.sibling = instance)
              : (workInProgress.child = instance),
            (newProps.last = instance));
      }
      return null !== newProps.tail
        ? (0 === newProps.tailExpiration &&
            (newProps.tailExpiration = now() + 500),
          (current = newProps.tail),
          (newProps.rendering = current),
          (newProps.tail = current.sibling),
          (newProps.lastEffect = workInProgress.lastEffect),
          (newProps.renderingStartTime = now()),
          (current.sibling = null),
          (workInProgress = suspenseStackCursor.current),
          (workInProgress = rootContainerInstance
            ? (workInProgress & SubtreeSuspenseContextMask) |
              ForceSuspenseFallback
            : workInProgress & SubtreeSuspenseContextMask),
          push(suspenseStackCursor, workInProgress),
          current)
        : null;
    case 21:
      if (null === current)
        (current = workInProgress.type),
          (rootContainerInstance = { fiber: workInProgress, methods: null }),
          (workInProgress.stateNode = rootContainerInstance),
          (rootContainerInstance.methods = createScopeMethods(
            current,
            rootContainerInstance
          )),
          (current = newProps.DEPRECATED_flareListeners),
          null != current &&
            ((newProps = requiredContext(rootInstanceStackCursor.current)),
            updateDeprecatedEventListeners(current, workInProgress, newProps)),
          null !== workInProgress.ref &&
            ((workInProgress.effectTag |= 128),
            (workInProgress.effectTag |= 4));
      else {
        if (
          current.memoizedProps.DEPRECATED_flareListeners !==
            newProps.DEPRECATED_flareListeners ||
          null !== workInProgress.ref
        )
          workInProgress.effectTag |= 4;
        current.ref !== workInProgress.ref && (workInProgress.effectTag |= 128);
      }
      return null;
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
      if (
        null !== effectTag &&
        null !== effectTag.dehydrated &&
        null === workInProgress.alternate
      )
        throw Error(formatProdErrorMessage(340));
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
if ("function" !== typeof require("ReactFbErrorUtils").invokeGuardedCallback)
  throw Error(formatProdErrorMessage(255));
var ReactFiberErrorDialogWWW = require("ReactFiberErrorDialog");
if ("function" !== typeof ReactFiberErrorDialogWWW.showErrorDialog)
  throw Error(formatProdErrorMessage(320));
function logCapturedError(capturedError) {
  !1 !== ReactFiberErrorDialogWWW.showErrorDialog(capturedError) &&
    console.error(capturedError.error);
}
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
    logCapturedError(errorInfo);
  } catch (e) {
    setTimeout(function() {
      throw e;
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
      current = Layout | HasEffect;
      finishedRoot = finishedWork.updateQueue;
      finishedRoot = null !== finishedRoot ? finishedRoot.lastEffect : null;
      if (null !== finishedRoot) {
        var effect = (finishedRoot = finishedRoot.next);
        do {
          if ((effect.tag & current) === current) {
            var create = effect.create;
            effect.destroy = create();
          }
          effect = effect.next;
        } while (effect !== finishedRoot);
      }
      current = finishedWork.updateQueue;
      current = null !== current ? current.lastEffect : null;
      if (null !== current) {
        finishedRoot = current = current.next;
        do
          (create = finishedRoot),
            (effect = create.next),
            (create = create.tag),
            (create & Passive$1) !== NoEffect$1 &&
              (create & HasEffect) !== NoEffect$1 &&
              (enqueuePendingPassiveHookEffectUnmount(
                finishedWork,
                finishedRoot
              ),
              enqueuePendingPassiveHookEffectMount(finishedWork, finishedRoot)),
            (finishedRoot = effect);
        while (finishedRoot !== current);
      }
      return;
    case 1:
      finishedRoot = finishedWork.stateNode;
      finishedWork.effectTag & 4 &&
        (null === current
          ? finishedRoot.componentDidMount()
          : ((effect =
              finishedWork.elementType === finishedWork.type
                ? current.memoizedProps
                : resolveDefaultProps(
                    finishedWork.type,
                    current.memoizedProps
                  )),
            finishedRoot.componentDidUpdate(
              effect,
              current.memoizedState,
              finishedRoot.__reactInternalSnapshotBeforeUpdate
            )));
      current = finishedWork.updateQueue;
      null !== current &&
        commitUpdateQueue(finishedWork, current, finishedRoot);
      return;
    case 3:
      current = finishedWork.updateQueue;
      if (null !== current) {
        finishedRoot = null;
        if (null !== finishedWork.child)
          switch (finishedWork.child.tag) {
            case 5:
              finishedRoot = finishedWork.child.stateNode;
              break;
            case 1:
              finishedRoot = finishedWork.child.stateNode;
          }
        commitUpdateQueue(finishedWork, current, finishedRoot);
      }
      return;
    case 5:
      return;
    case 6:
      return;
    case 4:
      return;
    case 12:
      return;
    case 13:
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
            if ((_effect2 & Passive$1) !== NoEffect$1)
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
      if (isHostParent(parent)) {
        var parentFiber = parent;
        break a;
      }
      parent = parent.return;
    }
    throw Error(formatProdErrorMessage(160));
  }
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
  parentFiber.effectTag & 16 && (parentFiber.effectTag &= -17);
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
    if (((node = isHost ? node.stateNode : node.stateNode.instance), before)) {
      if (node === before) throw Error(formatProdErrorMessage(218));
      node.injectBefore(before);
    } else node.parentNode === parent && node.eject(), node.inject(parent);
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
    if (((node = isHost ? node.stateNode : node.stateNode.instance), before)) {
      if (node === before) throw Error(formatProdErrorMessage(218));
      node.injectBefore(before);
    } else node.parentNode === parent && node.eject(), node.inject(parent);
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
      (finishedRoot = node.stateNode),
        destroyEventListeners(finishedRoot),
        finishedRoot.eject();
    } else if (18 === node.tag)
      (finishedRoot = finishedRoot$jscomp$0.hydrationCallbacks),
        null !== finishedRoot &&
          (finishedRoot = finishedRoot.onDeleted) &&
          finishedRoot(node.stateNode),
        shim(currentParent, node.stateNode);
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
      current = Layout | HasEffect;
      finishedWork = finishedWork.updateQueue;
      finishedWork = null !== finishedWork ? finishedWork.lastEffect : null;
      if (null !== finishedWork) {
        var effect = (finishedWork = finishedWork.next);
        do {
          if ((effect.tag & current) === current) {
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
        var updatePayload = finishedWork.updateQueue;
        finishedWork.updateQueue = null;
        null !== updatePayload && effect._applyProps(effect, destroy, current);
        effect = destroy.DEPRECATED_flareListeners;
        current.DEPRECATED_flareListeners !== effect &&
          updateDeprecatedEventListeners(effect, finishedWork, null);
      }
      return;
    case 6:
      if (null === finishedWork.stateNode)
        throw Error(formatProdErrorMessage(162));
      return;
    case 3:
      return;
    case 12:
      return;
    case 13:
      current = finishedWork.memoizedState;
      effect = finishedWork;
      null === current
        ? (destroy = !1)
        : ((destroy = !0),
          (effect = finishedWork.child),
          (globalMostRecentFallbackTime = now()));
      if (null !== effect)
        a: for (updatePayload = effect; ; ) {
          if (5 === updatePayload.tag) {
            var instance = updatePayload.stateNode;
            destroy
              ? instance.hide()
              : ((instance = updatePayload.memoizedProps),
                (null == instance.visible || instance.visible) &&
                  updatePayload.stateNode.show());
          } else if (6 !== updatePayload.tag)
            if (
              13 === updatePayload.tag &&
              null !== updatePayload.memoizedState &&
              null === updatePayload.memoizedState.dehydrated
            ) {
              instance = updatePayload.child.sibling;
              instance.return = updatePayload;
              updatePayload = instance;
              continue;
            } else if (null !== updatePayload.child) {
              updatePayload.child.return = updatePayload;
              updatePayload = updatePayload.child;
              continue;
            }
          if (updatePayload === effect) break;
          for (; null === updatePayload.sibling; ) {
            if (
              null === updatePayload.return ||
              updatePayload.return === effect
            )
              break a;
            updatePayload = updatePayload.return;
          }
          updatePayload.sibling.return = updatePayload.return;
          updatePayload = updatePayload.sibling;
        }
      null !== current &&
        ((current = finishedWork.memoizedProps.suspenseCallback),
        "function" === typeof current &&
          ((effect = finishedWork.updateQueue),
          null !== effect && current(new Set(effect))));
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
        (!0 !== wakeable.__reactDoNotTraceInteractions &&
          (retry = tracing.unstable_wrap(retry)),
        retryCache.add(wakeable),
        wakeable.then(retry, retry));
    });
  }
}
var PossiblyWeakMap = "function" === typeof WeakMap ? WeakMap : Map;
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
  NoContext = 0,
  DiscreteEventContext = 4,
  LegacyUnbatchedContext = 8,
  RenderContext = 16,
  CommitContext = 32,
  RootIncomplete = 0,
  RootFatalErrored = 1,
  RootErrored = 2,
  RootSuspended = 3,
  RootSuspendedWithDelay = 4,
  RootCompleted = 5,
  executionContext = NoContext,
  workInProgressRoot = null,
  workInProgress = null,
  renderExpirationTime$1 = 0,
  workInProgressRootExitStatus = RootIncomplete,
  workInProgressRootFatalError = null,
  workInProgressRootLatestProcessedExpirationTime = 1073741823,
  workInProgressRootLatestSuspenseTimeout = 1073741823,
  workInProgressRootCanSuspendUsingConfig = null,
  workInProgressRootNextUnprocessedUpdateTime = 0,
  workInProgressRootHasPendingPing = !1,
  globalMostRecentFallbackTime = 0,
  FALLBACK_THROTTLE_MS = 500,
  nextEffect = null,
  hasUncaughtError = !1,
  firstUncaughtError = null,
  legacyErrorBoundariesThatAlreadyFailed = null,
  rootDoesHavePassiveEffects = !1,
  rootWithPendingPassiveEffects = null,
  pendingPassiveEffectsRenderPriority = 90,
  pendingPassiveEffectsExpirationTime = 0,
  pendingPassiveHookEffectsMount = [],
  pendingPassiveHookEffectsUnmount = [],
  rootsWithPendingDiscreteUpdates = null,
  NESTED_UPDATE_LIMIT = 50,
  nestedUpdateCount = 0,
  rootWithNestedUpdates = null,
  spawnedWorkDuringRender = null,
  currentEventTime = 0;
function requestCurrentTimeForUpdate() {
  return (executionContext & (RenderContext | CommitContext)) !== NoContext
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
  if ((executionContext & RenderContext) !== NoContext)
    return renderExpirationTime$1;
  if (null !== suspenseConfig)
    currentTime =
      1073741821 -
      25 *
        ((((1073741821 -
          currentTime +
          (suspenseConfig.timeoutMs | 0 || 5e3) / 10) /
          25) |
          0) +
          1);
  else
    switch (priorityLevel) {
      case 99:
        currentTime = 1073741823;
        break;
      case 98:
        currentTime =
          1073741821 - 10 * ((((1073741821 - currentTime + 15) / 10) | 0) + 1);
        break;
      case 97:
      case 96:
        currentTime =
          1073741821 - 25 * ((((1073741821 - currentTime + 500) / 25) | 0) + 1);
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
  if (nestedUpdateCount > NESTED_UPDATE_LIMIT)
    throw ((nestedUpdateCount = 0),
    (rootWithNestedUpdates = null),
    Error(formatProdErrorMessage(185)));
  fiber = markUpdateTimeFromFiberToRoot(fiber, expirationTime);
  if (null !== fiber) {
    var priorityLevel = getCurrentPriorityLevel();
    1073741823 === expirationTime
      ? (executionContext & LegacyUnbatchedContext) !== NoContext &&
        (executionContext & (RenderContext | CommitContext)) === NoContext
        ? (schedulePendingInteractions(fiber, expirationTime),
          performSyncWorkOnRoot(fiber))
        : (ensureRootIsScheduled(fiber),
          schedulePendingInteractions(fiber, expirationTime),
          executionContext === NoContext && flushSyncCallbackQueue())
      : (ensureRootIsScheduled(fiber),
        schedulePendingInteractions(fiber, expirationTime));
    (executionContext & DiscreteEventContext) === NoContext ||
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
      workInProgressRootExitStatus === RootSuspendedWithDelay &&
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
      var priorityLevel = requestCurrentTimeForUpdate();
      1073741823 === expirationTime
        ? (priorityLevel = 99)
        : 1 === expirationTime || 2 === expirationTime
        ? (priorityLevel = 95)
        : ((priorityLevel =
            10 * (1073741821 - expirationTime) -
            10 * (1073741821 - priorityLevel)),
          (priorityLevel =
            0 >= priorityLevel
              ? 99
              : 250 >= priorityLevel
              ? 98
              : 5250 >= priorityLevel
              ? 97
              : 95));
      if (null !== existingCallbackNode) {
        var existingCallbackPriority = root.callbackPriority;
        if (
          root.callbackExpirationTime === expirationTime &&
          existingCallbackPriority >= priorityLevel
        )
          return;
        existingCallbackNode !== fakeCallbackNode &&
          Scheduler_cancelCallback(existingCallbackNode);
      }
      root.callbackExpirationTime = expirationTime;
      root.callbackPriority = priorityLevel;
      expirationTime =
        1073741823 === expirationTime
          ? scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root))
          : disableSchedulerTimeoutBasedOnReactExpirationTime
          ? scheduleCallback(
              priorityLevel,
              performConcurrentWorkOnRoot.bind(null, root)
            )
          : scheduleCallback(
              priorityLevel,
              performConcurrentWorkOnRoot.bind(null, root),
              { timeout: 10 * (1073741821 - expirationTime) - now() }
            );
      root.callbackNode = expirationTime;
    }
  }
}
function performConcurrentWorkOnRoot(root, didTimeout) {
  currentEventTime = 0;
  if (didTimeout) {
    didTimeout = requestCurrentTimeForUpdate();
    var lastExpiredTime = root.lastExpiredTime;
    if (0 === lastExpiredTime || lastExpiredTime > didTimeout)
      root.lastExpiredTime = didTimeout;
    ensureRootIsScheduled(root);
    return null;
  }
  lastExpiredTime = getNextRootExpirationTimeToWorkOn(root);
  if (0 === lastExpiredTime) return null;
  didTimeout = root.callbackNode;
  if ((executionContext & (RenderContext | CommitContext)) !== NoContext)
    throw Error(formatProdErrorMessage(327));
  flushPassiveEffects();
  var expirationTime = lastExpiredTime,
    prevExecutionContext = executionContext;
  executionContext |= RenderContext;
  var exitStatus = pushDispatcher();
  if (root !== workInProgressRoot || expirationTime !== renderExpirationTime$1)
    prepareFreshStack(root, expirationTime),
      startWorkOnPendingInteractions(root, expirationTime);
  expirationTime = pushInteractions(root);
  do
    try {
      workLoopConcurrent();
      break;
    } catch (thrownValue) {
      handleError(root, thrownValue);
    }
  while (1);
  resetContextDependencies();
  tracing.__interactionsRef.current = expirationTime;
  ReactCurrentDispatcher$1.current = exitStatus;
  executionContext = prevExecutionContext;
  null !== workInProgress
    ? (exitStatus = RootIncomplete)
    : ((workInProgressRoot = null),
      (exitStatus = workInProgressRootExitStatus));
  if (exitStatus !== RootIncomplete) {
    exitStatus === RootErrored &&
      ((lastExpiredTime = 2 < lastExpiredTime ? 2 : lastExpiredTime),
      (exitStatus = renderRootSync(root, lastExpiredTime)));
    if (exitStatus === RootFatalErrored)
      throw ((didTimeout = workInProgressRootFatalError),
      prepareFreshStack(root, lastExpiredTime),
      markRootSuspendedAtTime(root, lastExpiredTime),
      ensureRootIsScheduled(root),
      didTimeout);
    prevExecutionContext = root.finishedWork = root.current.alternate;
    root.finishedExpirationTime = lastExpiredTime;
    switch (exitStatus) {
      case RootIncomplete:
      case RootFatalErrored:
        throw Error(formatProdErrorMessage(345));
      case RootErrored:
        commitRoot(root);
        break;
      case RootSuspended:
        markRootSuspendedAtTime(root, lastExpiredTime);
        exitStatus = root.lastSuspendedTime;
        lastExpiredTime === exitStatus &&
          (root.nextKnownPendingLevel = getRemainingExpirationTime(
            prevExecutionContext
          ));
        if (
          1073741823 === workInProgressRootLatestProcessedExpirationTime &&
          ((prevExecutionContext =
            globalMostRecentFallbackTime + FALLBACK_THROTTLE_MS - now()),
          10 < prevExecutionContext)
        ) {
          if (
            workInProgressRootHasPendingPing &&
            ((expirationTime = root.lastPingedTime),
            0 === expirationTime || expirationTime >= lastExpiredTime)
          ) {
            root.lastPingedTime = lastExpiredTime;
            prepareFreshStack(root, lastExpiredTime);
            break;
          }
          expirationTime = getNextRootExpirationTimeToWorkOn(root);
          if (0 !== expirationTime && expirationTime !== lastExpiredTime) break;
          if (0 !== exitStatus && exitStatus !== lastExpiredTime) {
            root.lastPingedTime = exitStatus;
            break;
          }
          root.timeoutHandle = scheduleTimeout(
            commitRoot.bind(null, root),
            prevExecutionContext
          );
          break;
        }
        commitRoot(root);
        break;
      case RootSuspendedWithDelay:
        markRootSuspendedAtTime(root, lastExpiredTime);
        exitStatus = root.lastSuspendedTime;
        lastExpiredTime === exitStatus &&
          (root.nextKnownPendingLevel = getRemainingExpirationTime(
            prevExecutionContext
          ));
        if (
          workInProgressRootHasPendingPing &&
          ((prevExecutionContext = root.lastPingedTime),
          0 === prevExecutionContext || prevExecutionContext >= lastExpiredTime)
        ) {
          root.lastPingedTime = lastExpiredTime;
          prepareFreshStack(root, lastExpiredTime);
          break;
        }
        prevExecutionContext = getNextRootExpirationTimeToWorkOn(root);
        if (
          0 !== prevExecutionContext &&
          prevExecutionContext !== lastExpiredTime
        )
          break;
        if (0 !== exitStatus && exitStatus !== lastExpiredTime) {
          root.lastPingedTime = exitStatus;
          break;
        }
        1073741823 !== workInProgressRootLatestSuspenseTimeout
          ? (prevExecutionContext =
              10 * (1073741821 - workInProgressRootLatestSuspenseTimeout) -
              now())
          : 1073741823 === workInProgressRootLatestProcessedExpirationTime
          ? (prevExecutionContext = 0)
          : ((prevExecutionContext =
              10 *
                (1073741821 - workInProgressRootLatestProcessedExpirationTime) -
              5e3),
            (exitStatus = now()),
            (lastExpiredTime =
              10 * (1073741821 - lastExpiredTime) - exitStatus),
            (prevExecutionContext = exitStatus - prevExecutionContext),
            0 > prevExecutionContext && (prevExecutionContext = 0),
            (prevExecutionContext =
              (120 > prevExecutionContext
                ? 120
                : 480 > prevExecutionContext
                ? 480
                : 1080 > prevExecutionContext
                ? 1080
                : 1920 > prevExecutionContext
                ? 1920
                : 3e3 > prevExecutionContext
                ? 3e3
                : 4320 > prevExecutionContext
                ? 4320
                : 1960 * ceil(prevExecutionContext / 1960)) -
              prevExecutionContext),
            lastExpiredTime < prevExecutionContext &&
              (prevExecutionContext = lastExpiredTime));
        if (10 < prevExecutionContext) {
          root.timeoutHandle = scheduleTimeout(
            commitRoot.bind(null, root),
            prevExecutionContext
          );
          break;
        }
        commitRoot(root);
        break;
      case RootCompleted:
        if (
          1073741823 !== workInProgressRootLatestProcessedExpirationTime &&
          null !== workInProgressRootCanSuspendUsingConfig
        ) {
          expirationTime = workInProgressRootLatestProcessedExpirationTime;
          var suspenseConfig = workInProgressRootCanSuspendUsingConfig;
          prevExecutionContext = suspenseConfig.busyMinDurationMs | 0;
          0 >= prevExecutionContext
            ? (prevExecutionContext = 0)
            : ((exitStatus = suspenseConfig.busyDelayMs | 0),
              (expirationTime =
                now() -
                (10 * (1073741821 - expirationTime) -
                  (suspenseConfig.timeoutMs | 0 || 5e3))),
              (prevExecutionContext =
                expirationTime <= exitStatus
                  ? 0
                  : exitStatus + prevExecutionContext - expirationTime));
          if (10 < prevExecutionContext) {
            markRootSuspendedAtTime(root, lastExpiredTime);
            root.timeoutHandle = scheduleTimeout(
              commitRoot.bind(null, root),
              prevExecutionContext
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
  if ((executionContext & (RenderContext | CommitContext)) !== NoContext)
    throw Error(formatProdErrorMessage(327));
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
    exitStatus === RootErrored &&
    ((lastExpiredTime = 2 < lastExpiredTime ? 2 : lastExpiredTime),
    (exitStatus = renderRootSync(root, lastExpiredTime)));
  if (exitStatus === RootFatalErrored)
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
  workInProgressRootExitStatus = RootIncomplete;
  workInProgressRootFatalError = null;
  workInProgressRootLatestSuspenseTimeout = workInProgressRootLatestProcessedExpirationTime = 1073741823;
  workInProgressRootCanSuspendUsingConfig = null;
  workInProgressRootNextUnprocessedUpdateTime = 0;
  workInProgressRootHasPendingPing = !1;
  spawnedWorkDuringRender = null;
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
          (workInProgressRootExitStatus = RootFatalErrored),
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
              0 !==
              (suspenseStackCursor.current & InvisibleParentSuspenseContext),
            _workInProgress = returnFiber;
          do {
            var JSCompiler_temp;
            if ((JSCompiler_temp = 13 === _workInProgress.tag)) {
              var nextState = _workInProgress.memoizedState;
              if (null !== nextState)
                JSCompiler_temp = null !== nextState.dehydrated ? !0 : !1;
              else {
                var props = _workInProgress.memoizedProps;
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
              var wakeables = _workInProgress.updateQueue;
              if (null === wakeables) {
                var updateQueue = new Set();
                updateQueue.add(wakeable);
                _workInProgress.updateQueue = updateQueue;
              } else wakeables.add(wakeable);
              if (0 === (_workInProgress.mode & 2)) {
                _workInProgress.effectTag |= 64;
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
              _workInProgress.effectTag |= 4096;
              _workInProgress.expirationTime = thrownValue;
              break a;
            }
            _workInProgress = _workInProgress.return;
          } while (null !== _workInProgress);
          value = Error(
            (getComponentName(sourceFiber.type) || "A React component") +
              " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display." +
              getStackByFiberInDevAndProd(sourceFiber)
          );
        }
        workInProgressRootExitStatus !== RootCompleted &&
          (workInProgressRootExitStatus = RootErrored);
        value = createCapturedValue(value, sourceFiber);
        _workInProgress = returnFiber;
        do {
          switch (_workInProgress.tag) {
            case 3:
              wakeable = value;
              _workInProgress.effectTag |= 4096;
              _workInProgress.expirationTime = thrownValue;
              var _update = createRootErrorUpdate(
                _workInProgress,
                wakeable,
                thrownValue
              );
              enqueueCapturedUpdate(_workInProgress, _update);
              break a;
            case 1:
              wakeable = value;
              var ctor = _workInProgress.type,
                instance = _workInProgress.stateNode;
              if (
                0 === (_workInProgress.effectTag & 64) &&
                ("function" === typeof ctor.getDerivedStateFromError ||
                  (null !== instance &&
                    "function" === typeof instance.componentDidCatch &&
                    (null === legacyErrorBoundariesThatAlreadyFailed ||
                      !legacyErrorBoundariesThatAlreadyFailed.has(instance))))
              ) {
                _workInProgress.effectTag |= 4096;
                _workInProgress.expirationTime = thrownValue;
                var _update2 = createClassErrorUpdate(
                  _workInProgress,
                  wakeable,
                  thrownValue
                );
                enqueueCapturedUpdate(_workInProgress, _update2);
                break a;
              }
          }
          _workInProgress = _workInProgress.return;
        } while (null !== _workInProgress);
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
function pushInteractions(root) {
  var prevInteractions = tracing.__interactionsRef.current;
  tracing.__interactionsRef.current = root.memoizedInteractions;
  return prevInteractions;
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
  if (
    workInProgressRootExitStatus === RootIncomplete ||
    workInProgressRootExitStatus === RootSuspended
  )
    workInProgressRootExitStatus = RootSuspendedWithDelay;
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
  executionContext |= RenderContext;
  var prevDispatcher = pushDispatcher();
  if (root !== workInProgressRoot || expirationTime !== renderExpirationTime$1)
    prepareFreshStack(root, expirationTime),
      startWorkOnPendingInteractions(root, expirationTime);
  expirationTime = pushInteractions(root);
  do
    try {
      workLoopSync();
      break;
    } catch (thrownValue) {
      handleError(root, thrownValue);
    }
  while (1);
  resetContextDependencies();
  tracing.__interactionsRef.current = expirationTime;
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
          var newChildExpirationTime = 0, _child = workInProgress.child;
          null !== _child;

        ) {
          var _childUpdateExpirationTime = _child.expirationTime,
            _childChildExpirationTime = _child.childExpirationTime;
          _childUpdateExpirationTime > newChildExpirationTime &&
            (newChildExpirationTime = _childUpdateExpirationTime);
          _childChildExpirationTime > newChildExpirationTime &&
            (newChildExpirationTime = _childChildExpirationTime);
          _child = _child.sibling;
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
  workInProgressRootExitStatus === RootIncomplete &&
    (workInProgressRootExitStatus = RootCompleted);
  return null;
}
function getRemainingExpirationTime(fiber) {
  var updateExpirationTime = fiber.expirationTime;
  fiber = fiber.childExpirationTime;
  return updateExpirationTime > fiber ? updateExpirationTime : fiber;
}
function commitRoot(root) {
  var renderPriorityLevel = getCurrentPriorityLevel();
  runWithPriority(99, commitRootImpl.bind(null, root, renderPriorityLevel));
  return null;
}
function commitRootImpl(root$jscomp$0, renderPriorityLevel) {
  do flushPassiveEffects();
  while (null !== rootWithPendingPassiveEffects);
  if ((executionContext & (RenderContext | CommitContext)) !== NoContext)
    throw Error(formatProdErrorMessage(327));
  var finishedWork = root$jscomp$0.finishedWork,
    expirationTime = root$jscomp$0.finishedExpirationTime;
  if (null === finishedWork) return null;
  root$jscomp$0.finishedWork = null;
  root$jscomp$0.finishedExpirationTime = 0;
  if (finishedWork === root$jscomp$0.current)
    throw Error(formatProdErrorMessage(177));
  root$jscomp$0.callbackNode = null;
  root$jscomp$0.callbackExpirationTime = 0;
  root$jscomp$0.callbackPriority = 90;
  root$jscomp$0.nextKnownPendingLevel = 0;
  var remainingExpirationTimeBeforeCommit = getRemainingExpirationTime(
    finishedWork
  );
  root$jscomp$0.firstPendingTime = remainingExpirationTimeBeforeCommit;
  remainingExpirationTimeBeforeCommit < root$jscomp$0.lastPendingTime &&
    (root$jscomp$0.lastPendingTime = remainingExpirationTimeBeforeCommit);
  expirationTime <= root$jscomp$0.lastSuspendedTime
    ? (root$jscomp$0.firstSuspendedTime = root$jscomp$0.lastSuspendedTime = root$jscomp$0.nextKnownPendingLevel = 0)
    : expirationTime <= root$jscomp$0.firstSuspendedTime &&
      (root$jscomp$0.firstSuspendedTime = expirationTime - 1);
  expirationTime <= root$jscomp$0.lastPingedTime &&
    (root$jscomp$0.lastPingedTime = 0);
  expirationTime <= root$jscomp$0.lastExpiredTime &&
    (root$jscomp$0.lastExpiredTime = 0);
  root$jscomp$0.mutableSourcePendingUpdateTime <= expirationTime &&
    (root$jscomp$0.mutableSourcePendingUpdateTime = 0);
  root$jscomp$0 === workInProgressRoot &&
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
    executionContext |= CommitContext;
    var prevInteractions = pushInteractions(root$jscomp$0);
    ReactCurrentOwner$2.current = null;
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
        for (var root = root$jscomp$0; null !== nextEffect; ) {
          var effectTag = nextEffect.effectTag;
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
              var current$jscomp$0 = nextEffect;
              unmountHostComponents(root, current$jscomp$0);
              detachFiber(current$jscomp$0);
          }
          nextEffect = nextEffect.nextEffect;
        }
      } catch (error) {
        if (null === nextEffect) throw Error(formatProdErrorMessage(330));
        captureCommitPhaseError(nextEffect, error);
        nextEffect = nextEffect.nextEffect;
      }
    while (null !== nextEffect);
    root$jscomp$0.current = finishedWork;
    nextEffect = remainingExpirationTimeBeforeCommit;
    do
      try {
        for (effectTag = root$jscomp$0; null !== nextEffect; ) {
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
      } catch (error) {
        if (null === nextEffect) throw Error(formatProdErrorMessage(330));
        captureCommitPhaseError(nextEffect, error);
        nextEffect = nextEffect.nextEffect;
      }
    while (null !== nextEffect);
    nextEffect = null;
    requestPaint();
    tracing.__interactionsRef.current = prevInteractions;
    executionContext = prevExecutionContext;
  } else root$jscomp$0.current = finishedWork;
  if ((effectTag$jscomp$0 = rootDoesHavePassiveEffects))
    (rootDoesHavePassiveEffects = !1),
      (rootWithPendingPassiveEffects = root$jscomp$0),
      (pendingPassiveEffectsExpirationTime = expirationTime),
      (pendingPassiveEffectsRenderPriority = renderPriorityLevel);
  else
    for (
      nextEffect = remainingExpirationTimeBeforeCommit;
      null !== nextEffect;

    )
      (renderPriorityLevel = nextEffect.nextEffect),
        (nextEffect.nextEffect = null),
        (nextEffect = renderPriorityLevel);
  renderPriorityLevel = root$jscomp$0.firstPendingTime;
  if (0 !== renderPriorityLevel) {
    if (null !== spawnedWorkDuringRender)
      for (
        remainingExpirationTimeBeforeCommit = spawnedWorkDuringRender,
          spawnedWorkDuringRender = null,
          ref = 0;
        ref < remainingExpirationTimeBeforeCommit.length;
        ref++
      )
        scheduleInteractions(
          root$jscomp$0,
          remainingExpirationTimeBeforeCommit[ref],
          root$jscomp$0.memoizedInteractions
        );
    schedulePendingInteractions(root$jscomp$0, renderPriorityLevel);
  } else legacyErrorBoundariesThatAlreadyFailed = null;
  effectTag$jscomp$0 ||
    finishPendingInteractions(root$jscomp$0, expirationTime);
  1073741823 === renderPriorityLevel
    ? root$jscomp$0 === rootWithNestedUpdates
      ? nestedUpdateCount++
      : ((nestedUpdateCount = 0), (rootWithNestedUpdates = root$jscomp$0))
    : (nestedUpdateCount = 0);
  "function" === typeof onCommitFiberRoot &&
    onCommitFiberRoot(finishedWork.stateNode, expirationTime);
  ensureRootIsScheduled(root$jscomp$0);
  if (hasUncaughtError)
    throw ((hasUncaughtError = !1),
    (root$jscomp$0 = firstUncaughtError),
    (firstUncaughtError = null),
    root$jscomp$0);
  if ((executionContext & LegacyUnbatchedContext) !== NoContext) return null;
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
    return runWithPriority(priorityLevel, flushPassiveEffectsImpl);
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
  var root = rootWithPendingPassiveEffects,
    expirationTime = pendingPassiveEffectsExpirationTime;
  rootWithPendingPassiveEffects = null;
  pendingPassiveEffectsExpirationTime = 0;
  if ((executionContext & (RenderContext | CommitContext)) !== NoContext)
    throw Error(formatProdErrorMessage(331));
  var prevExecutionContext = executionContext;
  executionContext |= CommitContext;
  var prevInteractions = pushInteractions(root),
    unmountEffects = pendingPassiveHookEffectsUnmount;
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
    } catch (error) {
      if (null === fiber) throw Error(formatProdErrorMessage(330));
      captureCommitPhaseError(fiber, error);
    }
  }
  tracing.__interactionsRef.current = prevInteractions;
  finishPendingInteractions(root, expirationTime);
  executionContext = prevExecutionContext;
  flushSyncCallbackQueue();
  return !0;
}
function captureCommitPhaseErrorOnRoot(rootFiber, sourceFiber, error) {
  sourceFiber = createCapturedValue(error, sourceFiber);
  sourceFiber = createRootErrorUpdate(rootFiber, sourceFiber, 1073741823);
  enqueueUpdate(rootFiber, sourceFiber);
  rootFiber = markUpdateTimeFromFiberToRoot(rootFiber, 1073741823);
  null !== rootFiber &&
    (ensureRootIsScheduled(rootFiber),
    schedulePendingInteractions(rootFiber, 1073741823));
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
          null !== fiber &&
            (ensureRootIsScheduled(fiber),
            schedulePendingInteractions(fiber, 1073741823));
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
    ? workInProgressRootExitStatus === RootSuspendedWithDelay ||
      (workInProgressRootExitStatus === RootSuspended &&
        1073741823 === workInProgressRootLatestProcessedExpirationTime &&
        now() - globalMostRecentFallbackTime < FALLBACK_THROTTLE_MS)
      ? prepareFreshStack(root, renderExpirationTime$1)
      : (workInProgressRootHasPendingPing = !0)
    : isRootSuspendedAtTime(root, suspendedTime) &&
      ((wakeable = root.lastPingedTime),
      (0 !== wakeable && wakeable < suspendedTime) ||
        ((root.lastPingedTime = suspendedTime),
        ensureRootIsScheduled(root),
        schedulePendingInteractions(root, suspendedTime)));
}
function retryTimedOutBoundary(boundaryFiber, retryTime) {
  0 === retryTime &&
    ((retryTime = requestCurrentTimeForUpdate()),
    (retryTime = computeExpirationForFiber(retryTime, boundaryFiber, null)));
  boundaryFiber = markUpdateTimeFromFiberToRoot(boundaryFiber, retryTime);
  null !== boundaryFiber &&
    (ensureRootIsScheduled(boundaryFiber),
    schedulePendingInteractions(boundaryFiber, retryTime));
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
  if (null !== current)
    if (current.memoizedProps !== workInProgress.pendingProps)
      didReceiveUpdate = !0;
    else {
      if (updateExpirationTime < renderExpirationTime) {
        didReceiveUpdate = !1;
        switch (workInProgress.tag) {
          case 3:
            pushHostContainer(
              workInProgress,
              workInProgress.stateNode.containerInfo
            );
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
            updateExpirationTime = workInProgress.memoizedProps.value;
            var context = workInProgress.type._context;
            push(valueCursor, context._currentValue2);
            context._currentValue2 = updateExpirationTime;
            break;
          case 13:
            updateExpirationTime = workInProgress.memoizedState;
            if (null !== updateExpirationTime) {
              if (null !== updateExpirationTime.dehydrated) {
                push(
                  suspenseStackCursor,
                  suspenseStackCursor.current & SubtreeSuspenseContextMask
                );
                workInProgress.effectTag |= 64;
                break;
              }
              updateExpirationTime = workInProgress.child;
              context = updateExpirationTime.childExpirationTime;
              if (0 !== context && context >= renderExpirationTime)
                return updateSuspenseComponent(
                  current,
                  workInProgress,
                  renderExpirationTime
                );
              for (
                updateExpirationTime = updateExpirationTime.child;
                null !== updateExpirationTime;

              ) {
                context = updateExpirationTime.expirationTime;
                var childChildExpirationTime =
                  updateExpirationTime.childExpirationTime;
                if (
                  (0 !== context && context >= renderExpirationTime) ||
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
              push(
                suspenseStackCursor,
                suspenseStackCursor.current & SubtreeSuspenseContextMask
              );
              workInProgress = bailoutOnAlreadyFinishedWork(
                current,
                workInProgress,
                renderExpirationTime
              );
              return null !== workInProgress ? workInProgress.sibling : null;
            }
            push(
              suspenseStackCursor,
              suspenseStackCursor.current & SubtreeSuspenseContextMask
            );
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
            context = workInProgress.memoizedState;
            null !== context &&
              ((context.rendering = null),
              (context.tail = null),
              (context.lastEffect = null));
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
  else didReceiveUpdate = !1;
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
        (current = renderWithHooks(
          null,
          workInProgress,
          updateExpirationTime,
          current,
          void 0,
          renderExpirationTime
        )),
        (workInProgress.effectTag |= 1),
        (workInProgress.tag = 0),
        reconcileChildren(null, workInProgress, current, renderExpirationTime),
        (workInProgress = workInProgress.child),
        workInProgress
      );
    case 16:
      a: {
        context = workInProgress.elementType;
        null !== current &&
          ((current.alternate = null),
          (workInProgress.alternate = null),
          (workInProgress.effectTag |= 2));
        current = workInProgress.pendingProps;
        childChildExpirationTime = context._init;
        context = childChildExpirationTime(context._payload);
        workInProgress.type = context;
        childChildExpirationTime = workInProgress.tag = resolveLazyComponentTag(
          context
        );
        var resolvedProps = resolveDefaultProps(context, current);
        switch (childChildExpirationTime) {
          case 0:
            workInProgress = updateFunctionComponent(
              null,
              workInProgress,
              context,
              resolvedProps,
              renderExpirationTime
            );
            break a;
          case 1:
            workInProgress = updateClassComponent(
              null,
              workInProgress,
              context,
              resolvedProps,
              renderExpirationTime
            );
            break a;
          case 11:
            workInProgress = updateForwardRef(
              null,
              workInProgress,
              context,
              resolvedProps,
              renderExpirationTime
            );
            break a;
          case 14:
            workInProgress = updateMemoComponent(
              null,
              workInProgress,
              context,
              resolveDefaultProps(context.type, resolvedProps),
              updateExpirationTime,
              renderExpirationTime
            );
            break a;
          case 22:
            workInProgress = updateBlock(
              null,
              workInProgress,
              context,
              current,
              renderExpirationTime
            );
            break a;
        }
        throw Error(formatProdErrorMessage(306, context, ""));
      }
      return workInProgress;
    case 0:
      return (
        (updateExpirationTime = workInProgress.type),
        (context = workInProgress.pendingProps),
        (context =
          workInProgress.elementType === updateExpirationTime
            ? context
            : resolveDefaultProps(updateExpirationTime, context)),
        updateFunctionComponent(
          current,
          workInProgress,
          updateExpirationTime,
          context,
          renderExpirationTime
        )
      );
    case 1:
      return (
        (updateExpirationTime = workInProgress.type),
        (context = workInProgress.pendingProps),
        (context =
          workInProgress.elementType === updateExpirationTime
            ? context
            : resolveDefaultProps(updateExpirationTime, context)),
        updateClassComponent(
          current,
          workInProgress,
          updateExpirationTime,
          context,
          renderExpirationTime
        )
      );
    case 3:
      pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
      updateExpirationTime = workInProgress.updateQueue;
      if (null === current || null === updateExpirationTime)
        throw Error(formatProdErrorMessage(282));
      updateExpirationTime = workInProgress.pendingProps;
      context = workInProgress.memoizedState;
      context = null !== context ? context.element : null;
      cloneUpdateQueue(current, workInProgress);
      processUpdateQueue(
        workInProgress,
        updateExpirationTime,
        null,
        renderExpirationTime
      );
      updateExpirationTime = workInProgress.memoizedState.element;
      updateExpirationTime === context
        ? (workInProgress = bailoutOnAlreadyFinishedWork(
            current,
            workInProgress,
            renderExpirationTime
          ))
        : (reconcileChildren(
            current,
            workInProgress,
            updateExpirationTime,
            renderExpirationTime
          ),
          (workInProgress = workInProgress.child));
      return workInProgress;
    case 5:
      return (
        pushHostContext(workInProgress),
        (updateExpirationTime = workInProgress.type),
        (context = workInProgress.pendingProps),
        (childChildExpirationTime =
          null !== current ? current.memoizedProps : null),
        (resolvedProps = context.children),
        shouldSetTextContent(updateExpirationTime, context)
          ? (resolvedProps = null)
          : null !== childChildExpirationTime &&
            shouldSetTextContent(
              updateExpirationTime,
              childChildExpirationTime
            ) &&
            (workInProgress.effectTag |= 16),
        markRef(current, workInProgress),
        reconcileChildren(
          current,
          workInProgress,
          resolvedProps,
          renderExpirationTime
        ),
        (workInProgress = workInProgress.child),
        workInProgress
      );
    case 6:
      return null;
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
        (context = workInProgress.pendingProps),
        (context =
          workInProgress.elementType === updateExpirationTime
            ? context
            : resolveDefaultProps(updateExpirationTime, context)),
        updateForwardRef(
          current,
          workInProgress,
          updateExpirationTime,
          context,
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
        context = workInProgress.pendingProps;
        resolvedProps = workInProgress.memoizedProps;
        childChildExpirationTime = context.value;
        var context$jscomp$0 = workInProgress.type._context;
        push(valueCursor, context$jscomp$0._currentValue2);
        context$jscomp$0._currentValue2 = childChildExpirationTime;
        if (null !== resolvedProps)
          if (
            ((context$jscomp$0 = resolvedProps.value),
            (childChildExpirationTime = objectIs(
              context$jscomp$0,
              childChildExpirationTime
            )
              ? 0
              : ("function" ===
                typeof updateExpirationTime._calculateChangedBits
                  ? updateExpirationTime._calculateChangedBits(
                      context$jscomp$0,
                      childChildExpirationTime
                    )
                  : 1073741823) | 0),
            0 === childChildExpirationTime)
          ) {
            if (resolvedProps.children === context.children) {
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
                context$jscomp$0 = resolvedProps.child;
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
                context$jscomp$0 =
                  resolvedProps.type === workInProgress.type
                    ? null
                    : resolvedProps.child;
              else if (18 === resolvedProps.tag) {
                context$jscomp$0 = resolvedProps.return;
                if (null === context$jscomp$0)
                  throw Error(formatProdErrorMessage(341));
                context$jscomp$0.expirationTime < renderExpirationTime &&
                  (context$jscomp$0.expirationTime = renderExpirationTime);
                list = context$jscomp$0.alternate;
                null !== list &&
                  list.expirationTime < renderExpirationTime &&
                  (list.expirationTime = renderExpirationTime);
                scheduleWorkOnParentPath(
                  context$jscomp$0,
                  renderExpirationTime
                );
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
          renderExpirationTime
        );
        workInProgress = workInProgress.child;
      }
      return workInProgress;
    case 9:
      return (
        (context = workInProgress.type),
        (childChildExpirationTime = workInProgress.pendingProps),
        (updateExpirationTime = childChildExpirationTime.children),
        prepareToReadContext(workInProgress, renderExpirationTime),
        (context = readContext(
          context,
          childChildExpirationTime.unstable_observedBits
        )),
        (updateExpirationTime = updateExpirationTime(context)),
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
        (context = workInProgress.type),
        (childChildExpirationTime = resolveDefaultProps(
          context,
          workInProgress.pendingProps
        )),
        (childChildExpirationTime = resolveDefaultProps(
          context.type,
          childChildExpirationTime
        )),
        updateMemoComponent(
          current,
          workInProgress,
          context,
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
        (context = workInProgress.pendingProps),
        (context =
          workInProgress.elementType === updateExpirationTime
            ? context
            : resolveDefaultProps(updateExpirationTime, context)),
        null !== current &&
          ((current.alternate = null),
          (workInProgress.alternate = null),
          (workInProgress.effectTag |= 2)),
        (workInProgress.tag = 1),
        prepareToReadContext(workInProgress, renderExpirationTime),
        constructClassInstance(workInProgress, updateExpirationTime, context),
        mountClassInstance(
          workInProgress,
          updateExpirationTime,
          context,
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
function markSpawnedWork(expirationTime) {
  null === spawnedWorkDuringRender
    ? (spawnedWorkDuringRender = [expirationTime])
    : spawnedWorkDuringRender.push(expirationTime);
}
function scheduleInteractions(root, expirationTime, interactions) {
  if (0 < interactions.size) {
    var pendingInteractionMap = root.pendingInteractionMap,
      pendingInteractions = pendingInteractionMap.get(expirationTime);
    null != pendingInteractions
      ? interactions.forEach(function(interaction) {
          pendingInteractions.has(interaction) || interaction.__count++;
          pendingInteractions.add(interaction);
        })
      : (pendingInteractionMap.set(expirationTime, new Set(interactions)),
        interactions.forEach(function(interaction) {
          interaction.__count++;
        }));
    pendingInteractionMap = tracing.__subscriberRef.current;
    if (null !== pendingInteractionMap)
      pendingInteractionMap.onWorkScheduled(
        interactions,
        1e3 * expirationTime + root.interactionThreadID
      );
  }
}
function schedulePendingInteractions(root, expirationTime) {
  scheduleInteractions(root, expirationTime, tracing.__interactionsRef.current);
}
function startWorkOnPendingInteractions(root, expirationTime) {
  var interactions = new Set();
  root.pendingInteractionMap.forEach(function(
    scheduledInteractions,
    scheduledExpirationTime
  ) {
    scheduledExpirationTime >= expirationTime &&
      scheduledInteractions.forEach(function(interaction) {
        return interactions.add(interaction);
      });
  });
  root.memoizedInteractions = interactions;
  if (0 < interactions.size) {
    var subscriber = tracing.__subscriberRef.current;
    if (null !== subscriber) {
      root = 1e3 * expirationTime + root.interactionThreadID;
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
function finishPendingInteractions(root, committedExpirationTime) {
  var earliestRemainingTimeAfterCommit = root.firstPendingTime;
  try {
    var subscriber = tracing.__subscriberRef.current;
    if (null !== subscriber && 0 < root.memoizedInteractions.size)
      subscriber.onWorkStopped(
        root.memoizedInteractions,
        1e3 * committedExpirationTime + root.interactionThreadID
      );
  } catch (error) {
    scheduleCallback(99, function() {
      throw error;
    });
  } finally {
    var pendingInteractionMap = root.pendingInteractionMap;
    pendingInteractionMap.forEach(function(
      scheduledInteractions,
      scheduledExpirationTime
    ) {
      scheduledExpirationTime > earliestRemainingTimeAfterCommit &&
        (pendingInteractionMap.delete(scheduledExpirationTime),
        scheduledInteractions.forEach(function(interaction) {
          interaction.__count--;
          if (null !== subscriber && 0 === interaction.__count)
            try {
              subscriber.onInteractionScheduledWorkCompleted(interaction);
            } catch (error) {
              scheduleCallback(99, function() {
                throw error;
              });
            }
        }));
    });
  }
}
var onCommitFiberRoot = null,
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
  this.interactionThreadID = tracing.unstable_getThreadID();
  this.memoizedInteractions = new Set();
  this.pendingInteractionMap = new Map();
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
Mode$1.setCurrent(FastNoSideEffects);
var slice = Array.prototype.slice,
  LinearGradient = (function() {
    function LinearGradient(stops, x1, y1, x2, y2) {
      this._args = slice.call(arguments);
    }
    LinearGradient.prototype.applyFill = function(node) {
      node.fillLinear.apply(node, this._args);
    };
    return LinearGradient;
  })(),
  RadialGradient = (function() {
    function RadialGradient(stops, fx, fy, rx, ry, cx, cy) {
      this._args = slice.call(arguments);
    }
    RadialGradient.prototype.applyFill = function(node) {
      node.fillRadial.apply(node, this._args);
    };
    return RadialGradient;
  })(),
  Pattern = (function() {
    function Pattern(url, width, height, left, top) {
      this._args = slice.call(arguments);
    }
    Pattern.prototype.applyFill = function(node) {
      node.fillImage.apply(node, this._args);
    };
    return Pattern;
  })(),
  Surface = (function(_React$Component) {
    function Surface() {
      return _React$Component.apply(this, arguments) || this;
    }
    _inheritsLoose(Surface, _React$Component);
    var _proto4 = Surface.prototype;
    _proto4.componentDidMount = function() {
      var _this$props = this.props;
      this._surface = Mode$1.Surface(
        +_this$props.width,
        +_this$props.height,
        this._tagRef
      );
      _this$props = new FiberRootNode(this._surface, 0, !1);
      _this$props.hydrationCallbacks = null;
      var uninitializedFiber = createFiber(3, null, null, 0);
      _this$props.current = uninitializedFiber;
      uninitializedFiber.stateNode = _this$props;
      initializeUpdateQueue(uninitializedFiber);
      this._mountNode = _this$props;
      updateContainer(this.props.children, this._mountNode, this);
    };
    _proto4.componentDidUpdate = function(prevProps) {
      var props = this.props;
      (props.height === prevProps.height && props.width === prevProps.width) ||
        this._surface.resize(+props.width, +props.height);
      updateContainer(this.props.children, this._mountNode, this);
      this._surface.render && this._surface.render();
    };
    _proto4.componentWillUnmount = function() {
      updateContainer(null, this._mountNode, this);
    };
    _proto4.render = function() {
      var _this = this,
        props = this.props;
      return React.createElement(Mode$1.Surface.tagName, {
        ref: function(ref) {
          return (_this._tagRef = ref);
        },
        accessKey: props.accessKey,
        className: props.className,
        draggable: props.draggable,
        role: props.role,
        style: props.style,
        tabIndex: props.tabIndex,
        title: props.title
      });
    };
    return Surface;
  })(React.Component),
  Text = (function(_React$Component2) {
    function Text(props) {
      var _this2 = _React$Component2.call(this, props) || this;
      ["height", "width", "x", "y"].forEach(function(key) {
        Object.defineProperty(_assertThisInitialized(_this2), key, {
          get: function() {
            return this._text ? this._text[key] : void 0;
          }
        });
      });
      return _this2;
    }
    _inheritsLoose(Text, _React$Component2);
    Text.prototype.render = function() {
      var _this3 = this;
      return React.createElement(
        TYPES.TEXT,
        _extends({}, this.props, {
          ref: function(t) {
            return (_this3._text = t);
          }
        }),
        childrenAsString(this.props.children)
      );
    };
    return Text;
  })(React.Component);
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
  findFiberByHostInstance: function() {
    return null;
  },
  bundleType: 0,
  version: "16.13.1",
  rendererPackageName: "react-art"
});
var ClippingRectangle = TYPES.CLIPPING_RECTANGLE,
  Group = TYPES.GROUP,
  Shape = TYPES.SHAPE,
  Path = Mode$1.Path;
exports.Transform = Transform;
exports.ClippingRectangle = ClippingRectangle;
exports.Group = Group;
exports.LinearGradient = LinearGradient;
exports.Path = Path;
exports.Pattern = Pattern;
exports.RadialGradient = RadialGradient;
exports.Shape = Shape;
exports.Surface = Surface;
exports.Text = Text;
