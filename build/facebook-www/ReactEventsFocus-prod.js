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
  isGlobalFocusVisible = !0,
  hasTrackedGlobalFocusVisible = !1,
  globalFocusVisiblePointerType = "",
  isEmulatingMouseEvents = !1,
  isMac =
    "undefined" !== typeof window && null != window.navigator
      ? /^Mac/.test(window.navigator.platform)
      : !1,
  passiveBrowserEventsSupported = !1;
if (
  "undefined" !== typeof window &&
  "undefined" !== typeof window.document &&
  "undefined" !== typeof window.document.createElement
)
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
var focusVisibleEvents =
    "undefined" !== typeof window && null != window.PointerEvent
      ? ["keydown", "keyup", "pointermove", "pointerdown", "pointerup"]
      : "keydown keyup mousedown touchmove touchstart touchend".split(" "),
  targetEventTypes = ["focus", "blur", "beforeblur"].concat(focusVisibleEvents),
  rootEventTypes = ["blur"];
function addWindowEventListener(types, callback, options) {
  types.forEach(function(type) {
    window.addEventListener(type, callback, options);
  });
}
function trackGlobalFocusVisible() {
  hasTrackedGlobalFocusVisible ||
    ((hasTrackedGlobalFocusVisible = !0),
    addWindowEventListener(
      focusVisibleEvents,
      handleGlobalFocusVisibleEvent,
      passiveBrowserEventsSupported ? { capture: !0, passive: !0 } : !0
    ));
}
function handleGlobalFocusVisibleEvent(nativeEvent) {
  switch (nativeEvent.type) {
    case "pointermove":
    case "pointerdown":
    case "pointerup":
      isGlobalFocusVisible = !1;
      globalFocusVisiblePointerType = nativeEvent.pointerType;
      break;
    case "keydown":
    case "keyup":
      var altKey = nativeEvent.altKey,
        ctrlKey = nativeEvent.ctrlKey;
      nativeEvent.metaKey ||
        (!isMac && altKey) ||
        ctrlKey ||
        ((globalFocusVisiblePointerType = "keyboard"),
        (isGlobalFocusVisible = !0));
      break;
    case "touchmove":
    case "touchstart":
    case "touchend":
      isEmulatingMouseEvents = !0;
      isGlobalFocusVisible = !1;
      globalFocusVisiblePointerType = "touch";
      break;
    case "mousedown":
      isEmulatingMouseEvents
        ? (isEmulatingMouseEvents = !1)
        : ((isGlobalFocusVisible = !1),
          (globalFocusVisiblePointerType = "mouse"));
  }
}
function isFunction(obj) {
  return "function" === typeof obj;
}
function createFocusEvent(
  context,
  type,
  target,
  pointerType,
  isTargetAttached
) {
  return {
    isTargetAttached: isTargetAttached,
    target: target,
    type: type,
    pointerType: pointerType,
    timeStamp: context.getTimeStamp(),
    continuePropagation: function() {
      context.continuePropagation();
    }
  };
}
function handleFocusVisibleTargetEvent(event, context, state, callback) {
  event = event.type;
  isGlobalFocusVisible = !1;
  null === state.focusTarget ||
    ("mousedown" !== event &&
      "touchstart" !== event &&
      "pointerdown" !== event) ||
    callback(!1);
}
function handleFocusVisibleTargetEvents(event, context, state, callback) {
  var type = event.type;
  state.pointerType = globalFocusVisiblePointerType;
  switch (type) {
    case "pointermove":
    case "pointerdown":
    case "pointerup":
      handleFocusVisibleTargetEvent(event, context, state, callback);
      break;
    case "keydown":
    case "keyup":
      context = state.focusTarget;
      event = event.nativeEvent;
      state = event.altKey;
      type = event.ctrlKey;
      event.metaKey ||
        (!isMac && state) ||
        type ||
        (null !== context && callback(!0));
      break;
    case "touchmove":
    case "touchstart":
    case "touchend":
      handleFocusVisibleTargetEvent(event, context, state, callback);
      break;
    case "mousedown":
      isEmulatingMouseEvents ||
        handleFocusVisibleTargetEvent(event, context, state, callback);
  }
}
function dispatchFocusEvents(context, props, state) {
  var pointerType = state.pointerType,
    target = state.focusTarget,
    onFocus = props.onFocus;
  isFunction(onFocus) &&
    ((pointerType = createFocusEvent(
      context,
      "focus",
      target,
      pointerType,
      !0
    )),
    context.dispatchEvent(pointerType, onFocus, 0));
  onFocus = props.onFocusChange;
  isFunction(onFocus) && context.dispatchEvent(!0, onFocus, 0);
  state.isFocusVisible && dispatchFocusVisibleChangeEvent(context, props, !0);
}
function dispatchBlurEvents(context, props, state) {
  var pointerType = state.pointerType,
    target = state.focusTarget,
    onBlur = props.onBlur;
  isFunction(onBlur) &&
    ((pointerType = createFocusEvent(context, "blur", target, pointerType, !0)),
    context.dispatchEvent(pointerType, onBlur, 0));
  onBlur = props.onFocusChange;
  isFunction(onBlur) && context.dispatchEvent(!1, onBlur, 0);
  state.isFocusVisible && dispatchFocusVisibleChangeEvent(context, props, !1);
}
function dispatchFocusWithinEvents(context, event, props, state) {
  var pointerType = state.pointerType;
  event = state.focusTarget || event.target;
  props = props.onFocusWithin;
  isFunction(props) &&
    ((pointerType = createFocusEvent(
      context,
      "focuswithin",
      event,
      pointerType,
      !0
    )),
    context.dispatchEvent(pointerType, props, 0));
}
function dispatchBlurWithinEvents(context, event, props, state) {
  var pointerType = state.pointerType;
  event = state.focusTarget || event.target;
  props = props.onBlurWithin;
  state = null === state.detachedTarget;
  isFunction(props) &&
    ((pointerType = createFocusEvent(
      context,
      "blurwithin",
      event,
      pointerType,
      state
    )),
    context.dispatchEvent(pointerType, props, 0));
}
function dispatchFocusVisibleChangeEvent(context, props, value) {
  props = props.onFocusVisibleChange;
  isFunction(props) && context.dispatchEvent(value, props, 0);
}
var FocusResponder = React.DEPRECATED_createResponder("Focus", {
  targetEventTypes: targetEventTypes,
  targetPortalPropagation: !0,
  getInitialState: function() {
    return {
      detachedTarget: null,
      focusTarget: null,
      isFocused: !1,
      isFocusVisible: !1,
      pointerType: "",
      addedRootEvents: !1
    };
  },
  onMount: function() {
    trackGlobalFocusVisible();
  },
  onEvent: function(event, context, props, state) {
    var type = event.type,
      target = event.target;
    if (props.disabled)
      state.isFocused &&
        (dispatchBlurEvents(context, props, state),
        (state.isFocused = !1),
        (state.focusTarget = null));
    else
      switch (type) {
        case "focus":
          state.focusTarget = context.getResponderNode();
          state.isFocused ||
            state.focusTarget !== target ||
            ((state.isFocused = !0),
            (state.isFocusVisible = isGlobalFocusVisible),
            dispatchFocusEvents(context, props, state));
          isEmulatingMouseEvents = !1;
          break;
        case "blur":
          state.isFocused &&
            (dispatchBlurEvents(context, props, state),
            (state.isFocusVisible = isGlobalFocusVisible),
            (state.isFocused = !1));
          null == event.nativeEvent.relatedTarget && (state.pointerType = "");
          isEmulatingMouseEvents = !1;
          break;
        default:
          handleFocusVisibleTargetEvents(event, context, state, function(
            isFocusVisible
          ) {
            state.isFocused &&
              state.isFocusVisible !== isFocusVisible &&
              ((state.isFocusVisible = isFocusVisible),
              dispatchFocusVisibleChangeEvent(context, props, isFocusVisible));
          });
      }
  },
  onUnmount: function(context, props, state) {
    state.isFocused && dispatchBlurEvents(context, props, state);
  }
});
function dispatchFocusWithinChangeEvent(context, props, state, value) {
  var onFocusWithinChange = props.onFocusWithinChange;
  isFunction(onFocusWithinChange) &&
    context.dispatchEvent(value, onFocusWithinChange, 0);
  state.isFocusVisible &&
    dispatchFocusWithinVisibleChangeEvent(context, props, state, value);
}
function dispatchFocusWithinVisibleChangeEvent(context, props, state, value) {
  props = props.onFocusWithinVisibleChange;
  isFunction(props) && context.dispatchEvent(value, props, 0);
}
var FocusWithinResponder = React.DEPRECATED_createResponder("FocusWithin", {
    targetEventTypes: targetEventTypes,
    targetPortalPropagation: !0,
    getInitialState: function() {
      return {
        detachedTarget: null,
        focusTarget: null,
        isFocused: !1,
        isFocusVisible: !1,
        pointerType: ""
      };
    },
    onMount: function() {
      trackGlobalFocusVisible();
    },
    onEvent: function(event, context, props, state) {
      var type = event.type,
        relatedTarget = event.nativeEvent.relatedTarget;
      if (props.disabled)
        state.isFocused &&
          (dispatchFocusWithinChangeEvent(context, props, state, !1),
          (state.isFocused = !1),
          (state.focusTarget = null));
      else
        switch (type) {
          case "focus":
            state.focusTarget = context.getResponderNode();
            state.isFocused ||
              ((state.isFocused = !0),
              (state.isFocusVisible = isGlobalFocusVisible),
              dispatchFocusWithinChangeEvent(context, props, state, !0));
            !state.isFocusVisible &&
              isGlobalFocusVisible &&
              ((state.isFocusVisible = isGlobalFocusVisible),
              dispatchFocusWithinVisibleChangeEvent(context, props, state, !0));
            dispatchFocusWithinEvents(context, event, props, state);
            break;
          case "blur":
            state.isFocused &&
              !context.isTargetWithinResponder(relatedTarget) &&
              (dispatchFocusWithinChangeEvent(context, props, state, !1),
              dispatchBlurWithinEvents(context, event, props, state),
              (state.isFocused = !1));
            break;
          case "beforeblur":
            type = props.onBeforeBlurWithin;
            isFunction(type)
              ? ((relatedTarget = createFocusEvent(
                  context,
                  "beforeblurwithin",
                  event.target,
                  state.pointerType,
                  !0
                )),
                (state.detachedTarget = event.target),
                context.dispatchEvent(relatedTarget, type, 0),
                state.addedRootEvents ||
                  ((state.addedRootEvents = !0),
                  context.addRootEventTypes(rootEventTypes)))
              : context.continuePropagation();
            break;
          default:
            handleFocusVisibleTargetEvents(event, context, state, function(
              isFocusVisible
            ) {
              state.isFocused &&
                state.isFocusVisible !== isFocusVisible &&
                ((state.isFocusVisible = isFocusVisible),
                dispatchFocusWithinVisibleChangeEvent(
                  context,
                  props,
                  state,
                  isFocusVisible
                ));
            });
        }
    },
    onRootEvent: function(event, context, props, state) {
      if ("blur" === event.type) {
        var detachedTarget = state.detachedTarget;
        null !== detachedTarget &&
          detachedTarget === event.target &&
          (dispatchBlurWithinEvents(context, event, props, state),
          (state.detachedTarget = null),
          state.addedRootEvents &&
            ((state.addedRootEvents = !1),
            context.removeRootEventTypes(rootEventTypes)));
      }
    },
    onUnmount: function(context, props, state) {
      state.isFocused &&
        dispatchFocusWithinChangeEvent(context, props, state, !1);
    }
  }),
  Focus = {
    __proto__: null,
    FocusResponder: FocusResponder,
    useFocus: function(props) {
      return React.DEPRECATED_useResponder(FocusResponder, props);
    },
    FocusWithinResponder: FocusWithinResponder,
    useFocusWithin: function(props) {
      return React.DEPRECATED_useResponder(FocusWithinResponder, props);
    }
  };
module.exports = (Focus && Focus["default"]) || Focus;
