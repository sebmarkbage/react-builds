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
  hasPointerEvents =
    "undefined" !== typeof window && void 0 !== window.PointerEvent,
  isMac =
    "undefined" !== typeof window && null != window.navigator
      ? /^Mac/.test(window.navigator.platform)
      : !1,
  DEFAULT_PRESS_RETENTION_OFFSET = { bottom: 20, top: 20, left: 20, right: 20 },
  rootEventTypes = hasPointerEvents
    ? "pointerup_active pointermove pointercancel click keyup scroll blur".split(
        " "
      )
    : "click keyup scroll mousemove touchmove touchcancel dragstart mouseup_active touchend blur".split(
        " "
      );
function isFunction(obj) {
  return "function" === typeof obj;
}
function createPressEvent(
  context,
  type,
  target,
  pointerType,
  event,
  touchEvent,
  defaultPrevented,
  state
) {
  context = context.getTimeStamp();
  var clientX = null,
    clientY = null,
    pageX = null,
    pageY = null,
    screenX = null,
    screenY = null,
    altKey = !1,
    ctrlKey = !1,
    metaKey = !1,
    shiftKey = !1,
    nativeEvent;
  event &&
    ((event = nativeEvent = event.nativeEvent),
    (altKey = event.altKey),
    (ctrlKey = event.ctrlKey),
    (metaKey = event.metaKey),
    (shiftKey = event.shiftKey),
    (touchEvent = touchEvent || nativeEvent)) &&
    ((clientX = touchEvent.clientX),
    (clientY = touchEvent.clientY),
    (pageX = touchEvent.pageX),
    (pageY = touchEvent.pageY),
    (screenX = touchEvent.screenX),
    (screenY = touchEvent.screenY));
  var pressEvent = {
    altKey: altKey,
    buttons: state.buttons,
    clientX: clientX,
    clientY: clientY,
    ctrlKey: ctrlKey,
    defaultPrevented: defaultPrevented,
    metaKey: metaKey,
    pageX: pageX,
    pageY: pageY,
    pointerType: pointerType,
    screenX: screenX,
    screenY: screenY,
    shiftKey: shiftKey,
    target: target,
    timeStamp: context,
    type: type,
    x: clientX,
    y: clientY,
    preventDefault: function() {
      state.shouldPreventClick = !0;
      nativeEvent &&
        ((pressEvent.defaultPrevented = !0), nativeEvent.preventDefault());
    },
    stopPropagation: function() {}
  };
  return pressEvent;
}
function dispatchEvent(event, listener, context, state, name, eventPriority) {
  event = createPressEvent(
    context,
    name,
    state.pressTarget,
    state.pointerType,
    event,
    state.touchEvent,
    (null != event && !0 === event.nativeEvent.defaultPrevented) ||
      ("press" === name && state.shouldPreventClick),
    state
  );
  context.dispatchEvent(event, listener, eventPriority);
}
function dispatchPressStartEvents(event, context, props, state) {
  state.isPressed = !0;
  if (!state.isActivePressStart) {
    state.isActivePressStart = !0;
    var nativeEvent = event.nativeEvent,
      _ref = state.touchEvent || nativeEvent;
    nativeEvent = _ref.clientX;
    var y = _ref.clientY;
    _ref = state.isActivePressed;
    state.isActivePressed = !0;
    void 0 !== nativeEvent &&
      void 0 !== y &&
      (state.activationPosition = { x: nativeEvent, y: y });
    nativeEvent = props.onPressStart;
    isFunction(nativeEvent) &&
      dispatchEvent(event, nativeEvent, context, state, "pressstart", 0);
    _ref ||
      ((event = props.onPressChange),
      isFunction(event) &&
        context.dispatchEvent(state.isActivePressed, event, 0));
  }
}
function dispatchPressEndEvents(event, context, props, state) {
  state.isActivePressStart = !1;
  state.isPressed = !1;
  if (state.isActivePressed) {
    state.isActivePressed = !1;
    var onPressEnd = props.onPressEnd;
    isFunction(onPressEnd) &&
      dispatchEvent(event, onPressEnd, context, state, "pressend", 0);
    event = props.onPressChange;
    isFunction(event) && context.dispatchEvent(state.isActivePressed, event, 0);
  }
  state.responderRegionOnDeactivation = null;
}
function dispatchCancel(event, context, props, state) {
  state.touchEvent = null;
  state.isPressed &&
    ((state.ignoreEmulatedMouseEvents = !1),
    dispatchPressEndEvents(event, context, props, state));
  removeRootEventTypes(context, state);
}
function isValidKeyboardEvent(nativeEvent) {
  var key = nativeEvent.key,
    target = nativeEvent.target;
  nativeEvent = target.tagName;
  target = target.isContentEditable;
  return (
    ("Enter" === key || " " === key || "Spacebar" === key) &&
    "INPUT" !== nativeEvent &&
    "TEXTAREA" !== nativeEvent &&
    !0 !== target
  );
}
function calculateResponderRegion(context, target, props) {
  context = context.objectAssign(
    {},
    DEFAULT_PRESS_RETENTION_OFFSET,
    props.pressRetentionOffset
  );
  var _target$getBoundingCl = target.getBoundingClientRect();
  target = _target$getBoundingCl.left;
  props = _target$getBoundingCl.right;
  var bottom = _target$getBoundingCl.bottom;
  _target$getBoundingCl = _target$getBoundingCl.top;
  context &&
    (null != context.bottom && (bottom += context.bottom),
    null != context.left && (target -= context.left),
    null != context.right && (props += context.right),
    null != context.top && (_target$getBoundingCl -= context.top));
  return {
    bottom: bottom,
    top: _target$getBoundingCl,
    left: target,
    right: props
  };
}
function removeRootEventTypes(context, state) {
  state.addedRootEvents &&
    ((state.addedRootEvents = !1),
    context.removeRootEventTypes(rootEventTypes));
}
function getTouchById(nativeEvent, pointerId) {
  nativeEvent = nativeEvent.changedTouches;
  for (var i = 0; i < nativeEvent.length; i++) {
    var touch = nativeEvent[i];
    if (touch.identifier === pointerId) return touch;
  }
  return null;
}
function updateIsPressWithinResponderRegion(
  nativeEventOrTouchEvent,
  context,
  props,
  state
) {
  null == state.responderRegionOnDeactivation &&
    (state.responderRegionOnDeactivation = calculateResponderRegion(
      context,
      state.pressTarget,
      props
    ));
  context = state.responderRegionOnActivation;
  props = state.responderRegionOnDeactivation;
  if (null != context) {
    var left = context.left;
    var top = context.top;
    var right = context.right;
    var bottom = context.bottom;
    null != props &&
      ((left = Math.min(left, props.left)),
      (top = Math.min(top, props.top)),
      (right = Math.max(right, props.right)),
      (bottom = Math.max(bottom, props.bottom)));
  }
  context = nativeEventOrTouchEvent.clientX;
  nativeEventOrTouchEvent = nativeEventOrTouchEvent.clientY;
  state.isPressWithinResponderRegion =
    null != left &&
    null != right &&
    null != top &&
    null != bottom &&
    null !== context &&
    null !== nativeEventOrTouchEvent &&
    context >= left &&
    context <= right &&
    nativeEventOrTouchEvent >= top &&
    nativeEventOrTouchEvent <= bottom;
}
var PressResponder = React.DEPRECATED_createResponder("Press", {
  targetEventTypes: hasPointerEvents
    ? ["keydown_active", "pointerdown_active", "click_active"]
    : ["keydown_active", "touchstart", "mousedown_active", "click_active"],
  getInitialState: function() {
    return {
      activationPosition: null,
      addedRootEvents: !1,
      buttons: 0,
      isActivePressed: !1,
      isActivePressStart: !1,
      isPressed: !1,
      isPressWithinResponderRegion: !0,
      pointerType: "",
      pressTarget: null,
      responderRegionOnActivation: null,
      responderRegionOnDeactivation: null,
      ignoreEmulatedMouseEvents: !1,
      activePointerId: null,
      shouldPreventClick: !1,
      touchEvent: null
    };
  },
  onEvent: function(event, context, props, state) {
    var pointerType = event.pointerType,
      type = event.type;
    if (props.disabled)
      removeRootEventTypes(context, state),
        dispatchPressEndEvents(event, context, props, state),
        (state.ignoreEmulatedMouseEvents = !1);
    else {
      var nativeEvent = event.nativeEvent,
        isPressed = state.isPressed;
      switch (type) {
        case "pointerdown":
        case "keydown":
        case "mousedown":
        case "touchstart":
          if (isPressed)
            isValidKeyboardEvent(nativeEvent) &&
              " " === nativeEvent.key &&
              nativeEvent.preventDefault();
          else {
            var isTouchEvent = "touchstart" === type,
              isPointerEvent = "pointerdown" === type,
              isKeyboardEvent = "keyboard" === pointerType;
            isPressed = "mouse" === pointerType;
            if ("mousedown" !== type || !state.ignoreEmulatedMouseEvents) {
              state.shouldPreventClick = !1;
              if (isTouchEvent) state.ignoreEmulatedMouseEvents = !0;
              else if (isKeyboardEvent)
                if (isValidKeyboardEvent(nativeEvent)) {
                  type = nativeEvent.altKey;
                  isKeyboardEvent = nativeEvent.ctrlKey;
                  var metaKey = nativeEvent.metaKey,
                    shiftKey = nativeEvent.shiftKey;
                  !1 === props.preventDefault ||
                    shiftKey ||
                    metaKey ||
                    isKeyboardEvent ||
                    type ||
                    (nativeEvent.preventDefault(),
                    (state.shouldPreventClick = !0));
                } else break;
              state.pointerType = pointerType;
              pointerType = state.pressTarget = context.getResponderNode();
              if (isPointerEvent) state.activePointerId = nativeEvent.pointerId;
              else if (isTouchEvent) {
                isTouchEvent = nativeEvent.targetTouches;
                isTouchEvent = 0 < isTouchEvent.length ? isTouchEvent[0] : null;
                if (null === isTouchEvent) break;
                state.touchEvent = isTouchEvent;
                state.activePointerId = isTouchEvent.identifier;
              }
              2 === nativeEvent.buttons ||
                4 < nativeEvent.buttons ||
                (isMac && isPressed && nativeEvent.ctrlKey) ||
                (null !== pointerType &&
                  9 !== pointerType.nodeType &&
                  (state.responderRegionOnActivation = calculateResponderRegion(
                    context,
                    pointerType,
                    props
                  )),
                (state.responderRegionOnDeactivation = null),
                (state.isPressWithinResponderRegion = !0),
                (state.buttons = nativeEvent.buttons),
                1 === nativeEvent.button && (state.buttons = 4),
                dispatchPressStartEvents(event, context, props, state),
                state.addedRootEvents ||
                  ((state.addedRootEvents = !0),
                  context.addRootEventTypes(rootEventTypes)));
            }
          }
          break;
        case "click":
          state.shouldPreventClick && nativeEvent.preventDefault();
          isPressed = props.onPress;
          if ((pointerType = isFunction(isPressed)))
            pointerType =
              0 === nativeEvent.mozInputSource && nativeEvent.isTrusted
                ? !0
                : 0 === nativeEvent.detail &&
                  0 === nativeEvent.screenX &&
                  0 === nativeEvent.screenY &&
                  0 === nativeEvent.clientX &&
                  0 === nativeEvent.clientY;
          pointerType &&
            ((state.pointerType = "keyboard"),
            (state.pressTarget = context.getResponderNode()),
            !1 !== props.preventDefault && nativeEvent.preventDefault(),
            dispatchEvent(event, isPressed, context, state, "press", 0));
      }
    }
  },
  onRootEvent: function(event, context, props, state) {
    var pointerType = event.pointerType,
      type = event.type,
      target = event.target,
      nativeEvent = event.nativeEvent,
      isPressed = state.isPressed,
      activePointerId = state.activePointerId,
      previousPointerType = state.pointerType;
    switch (type) {
      case "pointermove":
      case "mousemove":
      case "touchmove":
        if (previousPointerType !== pointerType) break;
        if ("pointermove" === type && activePointerId !== nativeEvent.pointerId)
          break;
        else if ("touchmove" === type) {
          var touchEvent = getTouchById(nativeEvent, activePointerId);
          if (null === touchEvent) break;
          state.touchEvent = touchEvent;
        }
        var pressTarget = state.pressTarget;
        null !== pressTarget &&
          null !== pressTarget &&
          9 !== pressTarget.nodeType &&
          ("mouse" === pointerType &&
          context.isTargetWithinNode(target, pressTarget)
            ? (state.isPressWithinResponderRegion = !0)
            : updateIsPressWithinResponderRegion(
                touchEvent || nativeEvent,
                context,
                props,
                state
              ));
        state.isPressWithinResponderRegion
          ? isPressed
            ? ((props = props.onPressMove),
              isFunction(props) &&
                dispatchEvent(event, props, context, state, "pressmove", 1))
            : dispatchPressStartEvents(event, context, props, state)
          : dispatchPressEndEvents(event, context, props, state);
        break;
      case "pointerup":
      case "keyup":
      case "mouseup":
      case "touchend":
        if (isPressed) {
          if (
            ((isPressed = state.buttons),
            (touchEvent = !1),
            "pointerup" !== type || activePointerId === nativeEvent.pointerId)
          ) {
            if ("touchend" === type) {
              pressTarget = getTouchById(nativeEvent, activePointerId);
              if (null === pressTarget) break;
              target = state.touchEvent = pressTarget;
              target = context
                .getActiveDocument()
                .elementFromPoint(target.clientX, target.clientY);
            } else if ("keyup" === type) {
              if (!isValidKeyboardEvent(nativeEvent)) break;
              touchEvent = !0;
              removeRootEventTypes(context, state);
            } else 4 === isPressed && removeRootEventTypes(context, state);
            if (
              null !== target &&
              context.isTargetWithinResponder(target) &&
              context.isTargetWithinHostComponent(target, "a")
            ) {
              type = nativeEvent.altKey;
              activePointerId = nativeEvent.ctrlKey;
              previousPointerType = nativeEvent.metaKey;
              var shiftKey = nativeEvent.shiftKey;
              !1 === props.preventDefault ||
                shiftKey ||
                previousPointerType ||
                activePointerId ||
                type ||
                (state.shouldPreventClick = !0);
            }
            type = state.pressTarget;
            dispatchPressEndEvents(event, context, props, state);
            activePointerId = props.onPress;
            null !== type &&
              isFunction(activePointerId) &&
              (touchEvent ||
                null === type ||
                null === target ||
                null === type ||
                9 === type.nodeType ||
                ("mouse" === pointerType &&
                context.isTargetWithinNode(target, type)
                  ? (state.isPressWithinResponderRegion = !0)
                  : updateIsPressWithinResponderRegion(
                      pressTarget || nativeEvent,
                      context,
                      props,
                      state
                    )),
              state.isPressWithinResponderRegion &&
                4 !== isPressed &&
                dispatchEvent(
                  event,
                  activePointerId,
                  context,
                  state,
                  "press",
                  0
                ));
            state.touchEvent = null;
          }
        } else "mouseup" === type && (state.ignoreEmulatedMouseEvents = !1);
        break;
      case "click":
        "keyboard" !== previousPointerType &&
          removeRootEventTypes(context, state);
        break;
      case "scroll":
        if ("mouse" === previousPointerType) break;
        pointerType = state.pressTarget;
        nativeEvent = nativeEvent.target;
        target = context.getActiveDocument();
        null === pointerType ||
          (nativeEvent !== target &&
            !context.isTargetWithinNode(pointerType, nativeEvent)) ||
          dispatchCancel(event, context, props, state);
        break;
      case "pointercancel":
      case "touchcancel":
      case "dragstart":
        dispatchCancel(event, context, props, state);
        break;
      case "blur":
        isPressed &&
          target === state.pressTarget &&
          dispatchCancel(event, context, props, state);
    }
  },
  onUnmount: function(context, props, state) {
    state.isPressed &&
      (removeRootEventTypes(context, state),
      dispatchPressEndEvents(null, context, props, state));
  }
});
exports.PressResponder = PressResponder;
exports.usePress = function(props) {
  return React.DEPRECATED_useResponder(PressResponder, props);
};
