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

'use strict';

if (__DEV__) {
  (function() {
"use strict";

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === "function" && Symbol.for;
var REACT_SERVER_BLOCK_TYPE = hasSymbol
  ? Symbol.for("react.server.block")
  : 0xeada;

function serverBlock(moduleReference, loadData) {
  var blockComponent = [REACT_SERVER_BLOCK_TYPE, moduleReference, loadData]; // $FlowFixMe: Upstream BlockComponent to Flow as a valid Node.

  return blockComponent;
}
function serverBlockNoData(moduleReference) {
  var blockComponent = [REACT_SERVER_BLOCK_TYPE, moduleReference]; // $FlowFixMe: Upstream BlockComponent to Flow as a valid Node.

  return blockComponent;
}

exports.serverBlock = serverBlock;
exports.serverBlockNoData = serverBlockNoData;

  })();
}
