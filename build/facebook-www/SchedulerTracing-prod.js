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
require("ReactFeatureFlags");
var threadIDCounter = 0;
exports.__interactionsRef = null;
exports.__subscriberRef = null;
exports.unstable_clear = function(callback) {
  return callback();
};
exports.unstable_getCurrent = function() {
  return null;
};
exports.unstable_getThreadID = function() {
  return ++threadIDCounter;
};
exports.unstable_subscribe = function() {};
exports.unstable_trace = function(name, timestamp, callback) {
  return callback();
};
exports.unstable_unsubscribe = function() {};
exports.unstable_wrap = function(callback) {
  return callback;
};
