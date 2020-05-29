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
var enableSchedulerDebugging = require("SchedulerFeatureFlags")
    .enableSchedulerDebugging,
  currentTime = 0,
  scheduledCallback = null,
  scheduledTimeout = null,
  timeoutTime = -1,
  yieldedValues = null,
  expectedNumberOfYields = -1,
  didStop = !1,
  isFlushing = !1,
  needsPaint = !1,
  shouldYieldForPaint = !1;
function shouldYieldToHost() {
  return (-1 !== expectedNumberOfYields &&
    null !== yieldedValues &&
    yieldedValues.length >= expectedNumberOfYields) ||
    (shouldYieldForPaint && needsPaint)
    ? (didStop = !0)
    : !1;
}
function unstable_flushAllWithoutAsserting() {
  if (isFlushing) throw Error("Already flushing work.");
  if (null !== scheduledCallback) {
    var cb = scheduledCallback;
    isFlushing = !0;
    try {
      var hasMoreWork = !0;
      do hasMoreWork = cb(!0, currentTime);
      while (hasMoreWork);
      hasMoreWork || (scheduledCallback = null);
      return !0;
    } finally {
      isFlushing = !1;
    }
  } else return !1;
}
function push(heap, node) {
  var index = heap.length;
  heap.push(node);
  a: for (;;) {
    var parentIndex = (index - 1) >>> 1,
      parent = heap[parentIndex];
    if (void 0 !== parent && 0 < compare(parent, node))
      (heap[parentIndex] = node), (heap[index] = parent), (index = parentIndex);
    else break a;
  }
}
function peek(heap) {
  heap = heap[0];
  return void 0 === heap ? null : heap;
}
function pop(heap) {
  var first = heap[0];
  if (void 0 !== first) {
    var last = heap.pop();
    if (last !== first) {
      heap[0] = last;
      a: for (var index = 0, length = heap.length; index < length; ) {
        var leftIndex = 2 * (index + 1) - 1,
          left = heap[leftIndex],
          rightIndex = leftIndex + 1,
          right = heap[rightIndex];
        if (void 0 !== left && 0 > compare(left, last))
          void 0 !== right && 0 > compare(right, left)
            ? ((heap[index] = right),
              (heap[rightIndex] = last),
              (index = rightIndex))
            : ((heap[index] = left),
              (heap[leftIndex] = last),
              (index = leftIndex));
        else if (void 0 !== right && 0 > compare(right, last))
          (heap[index] = right),
            (heap[rightIndex] = last),
            (index = rightIndex);
        else break a;
      }
    }
    return first;
  }
  return null;
}
function compare(a, b) {
  var diff = a.sortIndex - b.sortIndex;
  return 0 !== diff ? diff : a.id - b.id;
}
var taskQueue = [],
  timerQueue = [],
  taskIdCounter = 1,
  isSchedulerPaused = !1,
  currentTask = null,
  currentPriorityLevel = 3,
  isPerformingWork = !1,
  isHostCallbackScheduled = !1,
  isHostTimeoutScheduled = !1;
function advanceTimers(currentTime) {
  for (var timer = peek(timerQueue); null !== timer; ) {
    if (null === timer.callback) pop(timerQueue);
    else if (timer.startTime <= currentTime)
      pop(timerQueue),
        (timer.sortIndex = timer.expirationTime),
        push(taskQueue, timer);
    else break;
    timer = peek(timerQueue);
  }
}
function handleTimeout(currentTime$jscomp$0) {
  isHostTimeoutScheduled = !1;
  advanceTimers(currentTime$jscomp$0);
  if (!isHostCallbackScheduled)
    if (null !== peek(taskQueue))
      (isHostCallbackScheduled = !0), (scheduledCallback = flushWork);
    else {
      var firstTimer = peek(timerQueue);
      null !== firstTimer &&
        ((currentTime$jscomp$0 = firstTimer.startTime - currentTime$jscomp$0),
        (scheduledTimeout = handleTimeout),
        (timeoutTime = currentTime + currentTime$jscomp$0));
    }
}
function flushWork(hasTimeRemaining, initialTime) {
  isHostCallbackScheduled = !1;
  isHostTimeoutScheduled &&
    ((isHostTimeoutScheduled = !1),
    (scheduledTimeout = null),
    (timeoutTime = -1));
  isPerformingWork = !0;
  var previousPriorityLevel = currentPriorityLevel;
  try {
    advanceTimers(initialTime);
    for (
      currentTask = peek(taskQueue);
      !(
        null === currentTask ||
        (enableSchedulerDebugging && isSchedulerPaused) ||
        (currentTask.expirationTime > initialTime &&
          (!hasTimeRemaining || shouldYieldToHost()))
      );

    ) {
      var callback = currentTask.callback;
      if (null !== callback) {
        currentTask.callback = null;
        currentPriorityLevel = currentTask.priorityLevel;
        var continuationCallback = callback(
          currentTask.expirationTime <= initialTime
        );
        initialTime = currentTime;
        "function" === typeof continuationCallback
          ? (currentTask.callback = continuationCallback)
          : currentTask === peek(taskQueue) && pop(taskQueue);
        advanceTimers(initialTime);
      } else pop(taskQueue);
      currentTask = peek(taskQueue);
    }
    if (null !== currentTask) var JSCompiler_inline_result = !0;
    else {
      var firstTimer = peek(timerQueue);
      if (null !== firstTimer) {
        var ms = firstTimer.startTime - initialTime;
        scheduledTimeout = handleTimeout;
        timeoutTime = currentTime + ms;
      }
      JSCompiler_inline_result = !1;
    }
    return JSCompiler_inline_result;
  } finally {
    (currentTask = null),
      (currentPriorityLevel = previousPriorityLevel),
      (isPerformingWork = !1);
  }
}
function timeoutForPriorityLevel(priorityLevel) {
  switch (priorityLevel) {
    case 1:
      return -1;
    case 2:
      return 250;
    case 5:
      return 1073741823;
    case 4:
      return 1e4;
    default:
      return 5e3;
  }
}
exports.unstable_IdlePriority = 5;
exports.unstable_ImmediatePriority = 1;
exports.unstable_LowPriority = 4;
exports.unstable_NormalPriority = 3;
exports.unstable_Profiling = null;
exports.unstable_UserBlockingPriority = 2;
exports.unstable_advanceTime = function(ms) {
  "disabledLog" !== console.log.name &&
    ((currentTime += ms),
    null !== scheduledTimeout &&
      timeoutTime <= currentTime &&
      (scheduledTimeout(currentTime),
      (timeoutTime = -1),
      (scheduledTimeout = null)));
};
exports.unstable_cancelCallback = function(task) {
  task.callback = null;
};
exports.unstable_clearYields = function() {
  if (null === yieldedValues) return [];
  var values = yieldedValues;
  yieldedValues = null;
  return values;
};
exports.unstable_continueExecution = function() {
  isSchedulerPaused = !1;
  isHostCallbackScheduled ||
    isPerformingWork ||
    ((isHostCallbackScheduled = !0), (scheduledCallback = flushWork));
};
exports.unstable_flushAll = function() {
  if (null !== yieldedValues)
    throw Error(
      "Log is not empty. Assert on the log of yielded values before flushing additional work."
    );
  unstable_flushAllWithoutAsserting();
  if (null !== yieldedValues)
    throw Error(
      "While flushing work, something yielded a value. Use an assertion helper to assert on the log of yielded values, e.g. expect(Scheduler).toFlushAndYield([...])"
    );
};
exports.unstable_flushAllWithoutAsserting = unstable_flushAllWithoutAsserting;
exports.unstable_flushExpired = function() {
  if (isFlushing) throw Error("Already flushing work.");
  if (null !== scheduledCallback) {
    isFlushing = !0;
    try {
      scheduledCallback(!1, currentTime) || (scheduledCallback = null);
    } finally {
      isFlushing = !1;
    }
  }
};
exports.unstable_flushNumberOfYields = function(count) {
  if (isFlushing) throw Error("Already flushing work.");
  if (null !== scheduledCallback) {
    var cb = scheduledCallback;
    expectedNumberOfYields = count;
    isFlushing = !0;
    try {
      count = !0;
      do count = cb(!0, currentTime);
      while (count && !didStop);
      count || (scheduledCallback = null);
    } finally {
      (expectedNumberOfYields = -1), (isFlushing = didStop = !1);
    }
  }
};
exports.unstable_flushUntilNextPaint = function() {
  if (isFlushing) throw Error("Already flushing work.");
  if (null !== scheduledCallback) {
    var cb = scheduledCallback;
    shouldYieldForPaint = !0;
    needsPaint = !1;
    isFlushing = !0;
    try {
      var hasMoreWork = !0;
      do hasMoreWork = cb(!0, currentTime);
      while (hasMoreWork && !didStop);
      hasMoreWork || (scheduledCallback = null);
    } finally {
      isFlushing = didStop = shouldYieldForPaint = !1;
    }
  }
};
exports.unstable_forceFrameRate = function() {};
exports.unstable_getCurrentPriorityLevel = function() {
  return currentPriorityLevel;
};
exports.unstable_getFirstCallbackNode = function() {
  return peek(taskQueue);
};
exports.unstable_next = function(eventHandler) {
  switch (currentPriorityLevel) {
    case 1:
    case 2:
    case 3:
      var priorityLevel = 3;
      break;
    default:
      priorityLevel = currentPriorityLevel;
  }
  var previousPriorityLevel = currentPriorityLevel;
  currentPriorityLevel = priorityLevel;
  try {
    return eventHandler();
  } finally {
    currentPriorityLevel = previousPriorityLevel;
  }
};
exports.unstable_now = function() {
  return currentTime;
};
exports.unstable_pauseExecution = function() {
  isSchedulerPaused = !0;
};
exports.unstable_requestPaint = function() {
  needsPaint = !0;
};
exports.unstable_runWithPriority = function(priorityLevel, eventHandler) {
  switch (priorityLevel) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      break;
    default:
      priorityLevel = 3;
  }
  var previousPriorityLevel = currentPriorityLevel;
  currentPriorityLevel = priorityLevel;
  try {
    return eventHandler();
  } finally {
    currentPriorityLevel = previousPriorityLevel;
  }
};
exports.unstable_scheduleCallback = function(priorityLevel, callback, options) {
  var currentTime$jscomp$0 = currentTime;
  if ("object" === typeof options && null !== options) {
    var startTime = options.delay;
    startTime =
      "number" === typeof startTime && 0 < startTime
        ? currentTime$jscomp$0 + startTime
        : currentTime$jscomp$0;
    options =
      "number" === typeof options.timeout
        ? options.timeout
        : timeoutForPriorityLevel(priorityLevel);
  } else
    (options = timeoutForPriorityLevel(priorityLevel)),
      (startTime = currentTime$jscomp$0);
  options = startTime + options;
  priorityLevel = {
    id: taskIdCounter++,
    callback: callback,
    priorityLevel: priorityLevel,
    startTime: startTime,
    expirationTime: options,
    sortIndex: -1
  };
  startTime > currentTime$jscomp$0
    ? ((priorityLevel.sortIndex = startTime),
      push(timerQueue, priorityLevel),
      null === peek(taskQueue) &&
        priorityLevel === peek(timerQueue) &&
        (isHostTimeoutScheduled
          ? ((scheduledTimeout = null), (timeoutTime = -1))
          : (isHostTimeoutScheduled = !0),
        (scheduledTimeout = handleTimeout),
        (timeoutTime = currentTime + (startTime - currentTime$jscomp$0))))
    : ((priorityLevel.sortIndex = options),
      push(taskQueue, priorityLevel),
      isHostCallbackScheduled ||
        isPerformingWork ||
        ((isHostCallbackScheduled = !0), (scheduledCallback = flushWork)));
  return priorityLevel;
};
exports.unstable_shouldYield = function() {
  var currentTime$jscomp$0 = currentTime;
  advanceTimers(currentTime$jscomp$0);
  var firstTask = peek(taskQueue);
  return (
    (firstTask !== currentTask &&
      null !== currentTask &&
      null !== firstTask &&
      null !== firstTask.callback &&
      firstTask.startTime <= currentTime$jscomp$0 &&
      firstTask.expirationTime < currentTask.expirationTime) ||
    shouldYieldToHost()
  );
};
exports.unstable_wrapCallback = function(callback) {
  var parentPriorityLevel = currentPriorityLevel;
  return function() {
    var previousPriorityLevel = currentPriorityLevel;
    currentPriorityLevel = parentPriorityLevel;
    try {
      return callback.apply(this, arguments);
    } finally {
      currentPriorityLevel = previousPriorityLevel;
    }
  };
};
exports.unstable_yieldValue = function(value) {
  "disabledLog" !== console.log.name &&
    (null === yieldedValues
      ? (yieldedValues = [value])
      : yieldedValues.push(value));
};
