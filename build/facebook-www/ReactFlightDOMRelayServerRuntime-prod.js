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
var REACT_SERVER_BLOCK_TYPE =
  "function" === typeof Symbol && Symbol.for
    ? Symbol.for("react.server.block")
    : 60122;
exports.serverBlock = function(moduleReference, loadData) {
  return [REACT_SERVER_BLOCK_TYPE, moduleReference, loadData];
};
exports.serverBlockNoData = function(moduleReference) {
  return [REACT_SERVER_BLOCK_TYPE, moduleReference];
};
