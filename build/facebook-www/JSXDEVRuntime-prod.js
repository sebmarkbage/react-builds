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
require("react");
var REACT_FRAGMENT_TYPE =
  "function" === typeof Symbol && Symbol.for
    ? Symbol.for("react.fragment")
    : 60107;
require("ReactFeatureFlags");
exports.Fragment = REACT_FRAGMENT_TYPE;
exports.jsxDEV = void 0;
