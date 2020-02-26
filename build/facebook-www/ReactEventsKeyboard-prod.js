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
"undefined" !== typeof window &&
  null != window.navigator &&
  /^Mac/.test(window.navigator.platform);
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
  };
function getEventKey(nativeEvent) {
  var nativeKey = nativeEvent.key;
  return nativeKey &&
    ((nativeKey = normalizeKey[nativeKey] || nativeKey),
    "Unidentified" !== nativeKey)
    ? nativeKey
    : translateToKey[nativeEvent.keyCode] || "Unidentified";
}
function createKeyboardEvent(event, context, type) {
  var nativeEvent = event.nativeEvent,
    keyboardEvent = {
      altKey: nativeEvent.altKey,
      ctrlKey: nativeEvent.ctrlKey,
      defaultPrevented: !0 === nativeEvent.defaultPrevented,
      metaKey: nativeEvent.metaKey,
      pointerType: "keyboard",
      shiftKey: nativeEvent.shiftKey,
      target: event.target,
      timeStamp: context.getTimeStamp(),
      type: type,
      continuePropagation: function() {
        context.continuePropagation();
      },
      preventDefault: function() {
        keyboardEvent.defaultPrevented = !0;
        nativeEvent.preventDefault();
      }
    };
  "keyboard:click" !== type &&
    ((event = getEventKey(nativeEvent)),
    (keyboardEvent = context.objectAssign(
      { isComposing: nativeEvent.isComposing, key: event },
      keyboardEvent
    )));
  return keyboardEvent;
}
var KeyboardResponder = React.DEPRECATED_createResponder("Keyboard", {
    targetEventTypes: ["click_active", "keydown_active", "keyup"],
    targetPortalPropagation: !0,
    getInitialState: function() {
      return { isActive: !1 };
    },
    onEvent: function(event, context, props, state) {
      var type = event.type;
      if (!props.disabled)
        if ("keydown" === type)
          (state.isActive = !0),
            (props = props.onKeyDown),
            null != props &&
              ((event = createKeyboardEvent(
                event,
                context,
                "keyboard:keydown"
              )),
              context.dispatchEvent(event, props, 0));
        else {
          var JSCompiler_temp;
          if ((JSCompiler_temp = "click" === type))
            (JSCompiler_temp = event.nativeEvent),
              (JSCompiler_temp =
                0 === JSCompiler_temp.mozInputSource &&
                JSCompiler_temp.isTrusted
                  ? !0
                  : 0 === JSCompiler_temp.detail &&
                    !JSCompiler_temp.pointerType);
          JSCompiler_temp
            ? ((props = props.onClick),
              null != props &&
                ((event = createKeyboardEvent(
                  event,
                  context,
                  "keyboard:click"
                )),
                context.dispatchEvent(event, props, 0)))
            : "keyup" === type &&
              ((state.isActive = !1),
              (props = props.onKeyUp),
              null != props &&
                ((event = createKeyboardEvent(
                  event,
                  context,
                  "keyboard:keyup"
                )),
                context.dispatchEvent(event, props, 0)));
        }
    }
  }),
  Keyboard = {
    __proto__: null,
    KeyboardResponder: KeyboardResponder,
    useKeyboard: function(props) {
      return React.DEPRECATED_useResponder(KeyboardResponder, props);
    }
  };
module.exports = (Keyboard && Keyboard["default"]) || Keyboard;
