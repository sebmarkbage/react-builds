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
  ContextMenuResponder = React.DEPRECATED_createResponder("ContextMenu", {
    targetEventTypes:
      "undefined" !== typeof window && null != window.PointerEvent
        ? ["contextmenu_active", "pointerdown"]
        : ["contextmenu_active", "touchstart", "mousedown"],
    getInitialState: function() {
      return { pointerType: "" };
    },
    onEvent: function(event, context, props, state) {
      var nativeEvent = event.nativeEvent,
        pointerType = event.pointerType;
      props.disabled ||
        ("contextmenu" === event.type
          ? ((pointerType = props.onContextMenu),
            !1 === props.preventDefault ||
              nativeEvent.defaultPrevented ||
              nativeEvent.preventDefault(),
            "function" === typeof pointerType &&
              ((nativeEvent = event.nativeEvent),
              (event = event.target),
              (pointerType = context.getTimeStamp()),
              context.dispatchEvent(
                {
                  altKey: nativeEvent.altKey,
                  buttons:
                    null != nativeEvent.buttons ? nativeEvent.buttons : 0,
                  ctrlKey: nativeEvent.ctrlKey,
                  metaKey: nativeEvent.metaKey,
                  pageX: nativeEvent.pageX,
                  pageY: nativeEvent.pageY,
                  pointerType: state.pointerType,
                  shiftKey: nativeEvent.shiftKey,
                  target: event,
                  timeStamp: pointerType,
                  type: "contextmenu",
                  x: nativeEvent.clientX,
                  y: nativeEvent.clientY
                },
                props.onContextMenu,
                0
              )),
            (state.pointerType = ""))
          : (state.pointerType = pointerType));
    }
  }),
  ContextMenu = {
    __proto__: null,
    ContextMenuResponder: ContextMenuResponder,
    useContextMenu: function(props) {
      return React.DEPRECATED_useResponder(ContextMenuResponder, props);
    }
  };
module.exports = (ContextMenu && ContextMenu["default"]) || ContextMenu;
