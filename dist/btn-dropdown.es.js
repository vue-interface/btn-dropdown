var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}
function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect$2(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style = styleProperties.reduce(function(style2, property) {
        style2[property] = "";
        return style2;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles$1 = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect: effect$2,
  requires: ["computeStyles"]
};
function getBasePlacement(placement) {
  return placement.split("-")[0];
}
var max = Math.max;
var min = Math.min;
var round = Math.round;
function getBoundingClientRect(element, includeScale) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  var rect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (isHTMLElement(element) && includeScale) {
    var offsetHeight = element.offsetHeight;
    var offsetWidth = element.offsetWidth;
    if (offsetWidth > 0) {
      scaleX = round(rect.width) / offsetWidth || 1;
    }
    if (offsetHeight > 0) {
      scaleY = round(rect.height) / offsetHeight || 1;
    }
  }
  return {
    width: rect.width / scaleX,
    height: rect.height / scaleY,
    top: rect.top / scaleY,
    right: rect.right / scaleX,
    bottom: rect.bottom / scaleY,
    left: rect.left / scaleX,
    x: rect.left / scaleX,
    y: rect.top / scaleY
  };
}
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width,
    height
  };
}
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}
function getDocumentElement(element) {
  return ((isElement(element) ? element.ownerDocument : element.document) || window.document).documentElement;
}
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element);
}
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || getComputedStyle(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1;
  var isIE = navigator.userAgent.indexOf("Trident") !== -1;
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle(currentNode);
    if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}
function within(min$1, value, max$1) {
  return max(min$1, min(value, max$1));
}
function withinMaxClamp(min2, value, max2) {
  var v = within(min2, value, max2);
  return v > max2 ? max2 : v;
}
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}
function expandToHashMap(value, keys) {
  return keys.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}
var toPaddingObject = function toPaddingObject2(padding, state) {
  padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state, name = _ref.name, options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min2 = paddingObject[minProp];
  var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min2, center, max2);
  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
}
function effect$1(_ref2) {
  var state = _ref2.state, options = _ref2.options;
  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (!contains(state.elements.popper, arrowElement)) {
    return;
  }
  state.elements.arrow = arrowElement;
}
var arrow$1 = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow,
  effect: effect$1,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function getVariation(placement) {
  return placement.split("-")[1];
}
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref) {
  var x = _ref.x, y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle(offsetParent).position !== "static" && position === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && win.visualViewport ? win.visualViewport.height : offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && win.visualViewport ? win.visualViewport.width : offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref4.x;
  y = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state, options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration,
    isFixed: state.options.strategy === "fixed"
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
var computeStyles$1 = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};
var passive = {
  passive: true
};
function effect(_ref) {
  var state = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
var eventListeners = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect,
  data: {}
};
var hash$1 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash$1[matched];
  });
}
var hash = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash[matched];
  });
}
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}
function getViewportRect(element) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x + getWindowScrollBarX(element),
    y
  };
}
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;
  if (getComputedStyle(body || html).direction === "rtl") {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
function getScrollParent(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
}
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}
function getInnerBoundingClientRect(element) {
  var rect = getBoundingClientRect(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
    }
  }
  return offsets;
}
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply;
    });
  }
  return overflowOffsets;
}
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements$1.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements$1;
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a, b) {
    return overflows[a] - overflows[b];
  });
}
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = /* @__PURE__ */ new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i = 0; i < placements2.length; i++) {
    var placement = placements2[i];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break")
        break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
var flip$1 = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function(side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state, name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
var hide$1 = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide
};
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }
  state.modifiersData[name] = data;
}
var offset$1 = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};
function popperOffsets(_ref) {
  var state = _ref.state, name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
var popperOffsets$1 = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function preventOverflow(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary,
    rootBoundary,
    padding,
    altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min$1 = offset2 + overflow[mainSide];
    var max$1 = offset2 - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset2 + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset2, tether ? max(max$1, tetherMax) : max$1);
    popperOffsets2[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset2;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === "x" ? top : left;
    var _altSide = mainAxis === "x" ? bottom : right;
    var _offset = popperOffsets2[altAxis];
    var _len = altAxis === "y" ? "height" : "width";
    var _min = _offset + overflow[_mainSide];
    var _max = _offset - overflow[_altSide];
    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
    popperOffsets2[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state.modifiersData[name] = data;
}
var preventOverflow$1 = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"]
};
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
function order(modifiers) {
  var map = /* @__PURE__ */ new Map();
  var visited = /* @__PURE__ */ new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}
function debounce(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper2(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options2);
        state.scrollParents = {
          reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m) {
          return m.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name,
              instance
            }) || state;
          }
        }
      },
      update: debounce(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      return instance;
    }
    instance.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref3) {
        var name = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {} : _ref3$options, effect2 = _ref3.effect;
        if (typeof effect2 === "function") {
          var cleanupFn = effect2({
            state,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}
var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
var createPopper = /* @__PURE__ */ popperGenerator({
  defaultModifiers
});
var Sizeable$1 = {
  props: {
    size: String,
    sizePrefix: {
      type: String,
      default() {
        return this.$options.name && this.$options.name.toLowerCase();
      }
    }
  },
  computed: {
    sizeableClassPrefix() {
      return this.sizePrefix;
    },
    sizeableClass() {
      if (!this.size || !this.sizeableClassPrefix) {
        return "";
      }
      return `${this.sizeableClassPrefix}-${this.size}`;
    }
  }
};
var Variant = {
  props: {
    variant: String,
    variantPrefix: {
      type: String,
      default() {
        return this.$options.name && this.$options.name.toLowerCase();
      }
    }
  },
  computed: {
    variantClassPrefix() {
      return this.variantPrefix;
    },
    variantClass() {
      if (!this.variant || !this.variantClassPrefix) {
        return "";
      }
      return `${this.variantClassPrefix}-${this.variant}`;
    }
  }
};
var render$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.to ? _c("router-link", {
    class: _vm.classes,
    attrs: {
      "to": _vm.to,
      "disabled": _vm.disabled,
      "role": "button"
    },
    on: {
      "click": _vm.onClick
    }
  }, [_vm._t("default")], 2) : _vm.href ? _c("a", {
    class: _vm.classes,
    attrs: {
      "href": _vm.href,
      "disabled": _vm.disabled,
      "role": "button"
    },
    on: {
      "click": _vm.onClick
    }
  }, [_vm._t("default")], 2) : _vm.label ? _c("label", {
    class: _vm.classes,
    attrs: {
      "disabled": _vm.disabled,
      "role": "button"
    },
    on: {
      "click": _vm.onClick
    }
  }, [_vm._t("default")], 2) : _c("button", {
    class: _vm.classes,
    attrs: {
      "type": _vm.type,
      "disabled": _vm.disabled
    },
    on: {
      "click": _vm.onClick
    }
  }, [_vm._t("default")], 2);
};
var staticRenderFns$5 = [];
function normalizeComponent$2(scriptExports, render2, staticRenderFns2, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
  var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
  if (render2) {
    options.render = render2;
    options.staticRenderFns = staticRenderFns2;
    options._compiled = true;
  }
  if (functionalTemplate) {
    options.functional = true;
  }
  if (scopeId) {
    options._scopeId = "data-v-" + scopeId;
  }
  var hook;
  if (moduleIdentifier) {
    hook = function(context) {
      context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
      if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
        context = __VUE_SSR_CONTEXT__;
      }
      if (injectStyles) {
        injectStyles.call(this, context);
      }
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    };
    options._ssrRegister = hook;
  } else if (injectStyles) {
    hook = shadowMode ? function() {
      injectStyles.call(this, (options.functional ? this.parent : this).$root.$options.shadowRoot);
    } : injectStyles;
  }
  if (hook) {
    if (options.functional) {
      options._injectStyles = hook;
      var originalRender = options.render;
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }
  return {
    exports: scriptExports,
    options
  };
}
const __vue2_script$6 = {
  name: "Btn",
  mixins: [Sizeable$1, Variant],
  props: {
    active: Boolean,
    block: Boolean,
    disabled: Boolean,
    href: String,
    label: Boolean,
    outline: Boolean,
    to: [Object, String],
    type: String
  },
  computed: {
    variantClassPrefix() {
      return this.variantPrefix + (this.outline ? "-outline" : "");
    },
    classes() {
      return ["btn", this.variantClass, this.sizeableClass, this.block ? "btn-block" : "", this.active ? "active" : ""];
    }
  },
  methods: {
    onClick(event) {
      if (!this.disabled) {
        this.$emit("click", event);
      } else {
        event.preventDefault();
      }
    }
  }
};
const __cssModules$6 = {};
var __component__$6 = /* @__PURE__ */ normalizeComponent$2(__vue2_script$6, render$5, staticRenderFns$5, false, __vue2_injectStyles$6, null, null, null);
function __vue2_injectStyles$6(context) {
  for (let o in __cssModules$6) {
    this[o] = __cssModules$6[o];
  }
}
var Btn = /* @__PURE__ */ function() {
  return __component__$6.exports;
}();
var Sizeable = {
  props: {
    size: String,
    sizePrefix: {
      type: String,
      default() {
        return this.$options.name && this.$options.name.toLowerCase();
      }
    }
  },
  computed: {
    sizeableClassPrefix() {
      return this.sizePrefix;
    },
    sizeableClass() {
      if (!this.size || !this.sizeableClassPrefix) {
        return "";
      }
      return `${this.sizeableClassPrefix}-${this.size}`;
    }
  }
};
var render$2$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    class: _vm.classes,
    attrs: {
      "data-toggle": _vm.toggle ? "buttons" : false,
      "role": "group"
    }
  }, [_vm._t("default")], 2);
};
var staticRenderFns$2$1 = [];
function normalizeComponent$1(scriptExports, render2, staticRenderFns2, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
  var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
  if (render2) {
    options.render = render2;
    options.staticRenderFns = staticRenderFns2;
    options._compiled = true;
  }
  if (functionalTemplate) {
    options.functional = true;
  }
  if (scopeId) {
    options._scopeId = "data-v-" + scopeId;
  }
  var hook;
  if (moduleIdentifier) {
    hook = function(context) {
      context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
      if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
        context = __VUE_SSR_CONTEXT__;
      }
      if (injectStyles) {
        injectStyles.call(this, context);
      }
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    };
    options._ssrRegister = hook;
  } else if (injectStyles) {
    hook = shadowMode ? function() {
      injectStyles.call(this, (options.functional ? this.parent : this).$root.$options.shadowRoot);
    } : injectStyles;
  }
  if (hook) {
    if (options.functional) {
      options._injectStyles = hook;
      var originalRender = options.render;
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }
  return {
    exports: scriptExports,
    options
  };
}
const __vue2_script$2$1 = {
  name: "BtnGroup",
  mixins: [Sizeable],
  props: {
    sizePrefix: {
      type: String,
      default() {
        return "btn-group";
      }
    },
    toggle: Boolean,
    vertical: Boolean
  },
  computed: {
    classes() {
      return {
        "btn-group": !this.vertical,
        "btn-group-toggle": this.toggle,
        "btn-group-vertical": this.vertical,
        [this.sizeableClass]: !!this.size
      };
    }
  }
};
const __cssModules$2$1 = {};
var __component__$2$1 = /* @__PURE__ */ normalizeComponent$1(__vue2_script$2$1, render$2$1, staticRenderFns$2$1, false, __vue2_injectStyles$2$1, null, null, null);
function __vue2_injectStyles$2$1(context) {
  for (let o in __cssModules$2$1) {
    this[o] = __cssModules$2$1[o];
  }
}
var BtnGroup = /* @__PURE__ */ function() {
  return __component__$2$1.exports;
}();
function normalizeComponent(scriptExports, render2, staticRenderFns2, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
  var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
  if (render2) {
    options.render = render2;
    options.staticRenderFns = staticRenderFns2;
    options._compiled = true;
  }
  if (functionalTemplate) {
    options.functional = true;
  }
  if (scopeId) {
    options._scopeId = "data-v-" + scopeId;
  }
  var hook;
  if (moduleIdentifier) {
    hook = function(context) {
      context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
      if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
        context = __VUE_SSR_CONTEXT__;
      }
      if (injectStyles) {
        injectStyles.call(this, context);
      }
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    };
    options._ssrRegister = hook;
  } else if (injectStyles) {
    hook = shadowMode ? function() {
      injectStyles.call(this, (options.functional ? this.parent : this).$root.$options.shadowRoot);
    } : injectStyles;
  }
  if (hook) {
    if (options.functional) {
      options._injectStyles = hook;
      var originalRender = options.render;
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }
  return {
    exports: scriptExports,
    options
  };
}
function appendClass(vnode, str) {
  vnode.data.staticClass = `${vnode.data.staticClass || ""} ${str}`.trim();
}
function wrap(wrapper, fn2) {
  return (e) => {
    if (typeof fn2 === "function") {
      fn2(e);
    }
    if (!e.cancelBubble) {
      wrapper(e);
    }
  };
}
function listener(vnode, key) {
  return vnode.data.on[key] || vnode.componentOptions && vnode.componentOptions.listeners && vnode.componentOptions.listeners[key];
}
const __vue2_script$5 = {
  functional: true,
  render(h, context) {
    context.children.filter((vnode) => !!vnode.tag).forEach((vnode, i) => {
      vnode.data = Object.assign({ staticClass: void 0 }, vnode.data);
      if (!vnode.data.on) {
        vnode.data.on = {};
      }
      const isDropdownItem = vnode.data.staticClass && vnode.data.staticClass.match(/dropdown-item/);
      const isDropdownDivider = vnode.data.staticClass && vnode.data.staticClass.match(/dropdown-divider/);
      vnode.data.on.click = wrap((e) => {
        context.parent.$emit("click-item", e, vnode);
      }, listener(vnode, "click"));
      vnode.data.on.blur = wrap((e) => {
        context.parent.$emit("blur-item", e, vnode);
      }, listener(vnode, "blur"));
      if (vnode.tag.match(/^h\d$/)) {
        appendClass(vnode, "dropdown-header");
      } else if (vnode.tag === "hr" && !isDropdownDivider) {
        vnode.tag = "div";
        appendClass(vnode, "dropdown-divider");
      } else if (!isDropdownItem && !isDropdownDivider) {
        appendClass(vnode, "dropdown-item");
      }
    });
    return context.children;
  }
};
let __vue2_render, __vue2_staticRenderFns;
const __cssModules$5 = {};
var __component__$5 = /* @__PURE__ */ normalizeComponent(__vue2_script$5, __vue2_render, __vue2_staticRenderFns, false, __vue2_injectStyles$5, null, null, null);
function __vue2_injectStyles$5(context) {
  for (let o in __cssModules$5) {
    this[o] = __cssModules$5[o];
  }
}
var DropdownMenuItems = /* @__PURE__ */ function() {
  return __component__$5.exports;
}();
var render$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "dropdown-menu", class: {
    "dropdown-menu-left": _vm.align === "left",
    "dropdown-menu-right": _vm.align === "right",
    "show": _vm.show
  }, attrs: { "aria-labelledby": _vm.$attrs.id } }, [_c("dropdown-menu-items", [_vm._t("default")], 2)], 1);
};
var staticRenderFns$4 = [];
const __vue2_script$4 = {
  name: "DropdownMenu",
  components: {
    DropdownMenuItems
  },
  props: {
    align: {
      type: String,
      default: "left",
      validate(value) {
        return ["left", "right"].indexOf(value.toLowerCase()) !== -1;
      }
    },
    show: Boolean
  }
};
const __cssModules$4 = {};
var __component__$4 = /* @__PURE__ */ normalizeComponent(__vue2_script$4, render$4, staticRenderFns$4, false, __vue2_injectStyles$4, null, null, null);
function __vue2_injectStyles$4(context) {
  for (let o in __cssModules$4) {
    this[o] = __cssModules$4[o];
  }
}
var DropdownMenu = /* @__PURE__ */ function() {
  return __component__$4.exports;
}();
var render$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(_vm.is, _vm._b({ tag: "component", attrs: { "id": _vm.id, "aria-haspopup": "true", "aria-expanded": _vm.expanded, "type": _vm.is === "button" ? "button" : void 0 } }, "component", _vm.to ? { to: _vm.to } : { href: _vm.href }, false), [_vm._t("default")], 2);
};
var staticRenderFns$3 = [];
const __vue2_script$3 = {
  props: {
    expanded: {
      type: Boolean,
      default: false
    },
    id: String,
    href: String,
    to: [String, Object]
  },
  computed: {
    is() {
      if (this.to) {
        return "router-link";
      }
      if (this.href) {
        return "a";
      }
      return "button";
    }
  }
};
const __cssModules$3 = {};
var __component__$3 = /* @__PURE__ */ normalizeComponent(__vue2_script$3, render$3, staticRenderFns$3, false, __vue2_injectStyles$3, null, null, null);
function __vue2_injectStyles$3(context) {
  for (let o in __cssModules$3) {
    this[o] = __cssModules$3[o];
  }
}
var BtnDropdownAction = /* @__PURE__ */ function() {
  return __component__$3.exports;
}();
var DropdownHandler = {
  components: {
    BtnDropdownAction,
    BtnGroup,
    DropdownMenu
  },
  extends: Btn,
  props: {
    align: {
      type: String,
      default: "left",
      validate(value) {
        return ["left", "right"].indexOf(value.toLowerCase()) !== -1;
      }
    },
    animated: {
      type: Boolean,
      default: true
    },
    caret: {
      type: Boolean,
      default: true
    },
    dropup: {
      type: Boolean,
      default: false
    },
    dropright: {
      type: Boolean,
      default: false
    },
    dropleft: {
      type: Boolean,
      default: false
    },
    height: String,
    href: String,
    nav: Boolean,
    label: String,
    offset: {
      type: Number,
      default: 5
    },
    rotate: {
      type: Boolean,
      default: false
    },
    split: {
      type: Boolean,
      default: false
    },
    to: [String, Object],
    type: {
      type: String,
      default: "button"
    },
    width: String
  },
  data() {
    return {
      popper: null,
      triggerAnimation: false,
      expanded: false
    };
  },
  computed: {
    placement() {
      if (this.dropup) {
        return "top";
      }
      if (this.dropleft) {
        return "left";
      }
      if (this.dropright) {
        return "right";
      }
      return "bottom";
    },
    variantClassPrefix() {
      return "btn" + (this.outline ? "-outline" : "");
    },
    sizeableClassPrefix() {
      return "btn";
    },
    classes() {
      return {
        "dropdown": this.dropup && this.dropright && this.dropleft,
        "dropup": this.dropup,
        "dropright": this.dropright,
        "dropleft": this.dropleft,
        "icon-only": !this.nav && !this.split && !!this.$slots.icon && !this.$slots.label,
        "hide-caret": !this.caret,
        "expanded": this.expanded,
        "rotate-90": !this.nav && this.split && this.rotate && this.expanded
      };
    },
    actionClasses() {
      return [!this.nav && "btn", !this.nav && this.size && this.sizeableClass, !this.nav && this.variant && this.variantClass].filter((value) => !!value).join(" ");
    },
    toggleStyle() {
      return {
        width: this.width,
        height: this.height
      };
    },
    toggleClasses() {
      return [
        this.nav && "nav-link",
        !this.nav && "btn",
        !this.nav && this.variantClass,
        this.sizeableClass,
        this.active ? "active" : "",
        this.block ? "btn-block" : "",
        !this.split && this.rotate && this.expanded ? "rotate-90" : "",
        !this.nav && this.split ? "dropdown-toggle-split" : "",
        "dropdown-toggle"
      ].filter((value) => !!value).join(" ");
    }
  },
  beforeDestroy() {
    this.popper && this.popper.destroy();
  },
  mounted() {
  },
  methods: {
    focus() {
      this.$el.querySelector(".dropdown-toggle").focus();
    },
    queryFocusable() {
      return this.$el.querySelector(".dropdown-menu").querySelectorAll('label, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    },
    isFocusable(element) {
      const nodes = this.queryFocusable();
      for (let i in nodes) {
        if (element === nodes[i]) {
          return true;
        }
      }
      return false;
    },
    toggle(e) {
      !this.expanded ? this.show() : this.hide();
    },
    show() {
      this.expanded = true;
      const target = this.$refs.split && this.$refs.split.$el || this.$el;
      if (!this.nav && !this.popper) {
        this.popper = createPopper(target, this.$refs.menu.$el, {
          placement: `${this.placement}-${this.align === "left" ? "start" : "end"}`,
          onFirstUpdate: () => {
            this.triggerAnimation = this.animated;
          },
          modifiers: [{
            name: "offset",
            options: {
              offset: [0, !this.nav ? this.offset : 1]
            }
          }]
        });
      } else if (this.popper) {
        this.popper.update();
      }
    },
    hide() {
      this.expanded = false;
    },
    onBlur(e) {
      if (!this.$el.contains(e.relatedTarget)) {
        this.hide();
      }
    },
    onClickItem(e) {
      if (!this.isFocusable(e.target)) {
        this.hide();
      }
    },
    onClickToggle(e) {
      this.$emit("click-toggle", e);
      if (!e.defaultPrevented) {
        this.toggle();
      }
    }
  },
  watch: {
    expanded(value) {
      this.$nextTick(() => {
        this.$emit(value ? "show" : "hide");
        this.$emit("toggle", value);
      });
    }
  }
};
var render$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("btn-group", { staticClass: "btn-dropdown-split", class: _vm.classes, on: { "click": _vm.onClick } }, [!_vm.dropleft ? _vm._t("button", function() {
    return [!_vm.dropleft ? _c("btn-dropdown-action", { ref: "button", class: _vm.actionClasses, attrs: { "id": _vm.$attrs.id, "expanded": _vm.expanded, "href": _vm.href, "to": _vm.to }, nativeOn: { "click": function($event) {
      return function(e) {
        return _vm.$emit("click", e);
      }.apply(null, arguments);
    } } }, [_vm._t("icon"), _vm._t("label", function() {
      return [_vm._v(" " + _vm._s(_vm.label) + " ")];
    })], 2) : _vm._e()];
  }, null, this) : _vm._e(), _c("btn-group", { ref: "split" }, [_vm._t("split", function() {
    return [_vm.split ? _c("button", { class: _vm.toggleClasses, attrs: { "id": _vm.$attrs.id, "type": "button", "aria-haspopup": "true", "aria-expanded": _vm.expanded }, on: { "blur": _vm.onBlur, "click": _vm.onClickToggle } }) : _vm._e()];
  }, null, this), _c("dropdown-menu", { ref: "menu", class: { animated: _vm.triggerAnimation }, attrs: { "id": _vm.$attrs.id, "align": _vm.align, "show": _vm.expanded }, on: { "click-item": _vm.onClickItem, "blur-item": _vm.onBlur } }, [_vm._t("default")], 2)], 2), _vm.dropleft ? _vm._t("button", function() {
    return [_vm.dropleft ? _c("btn-dropdown-action", { ref: "button", class: _vm.actionClasses, attrs: { "id": _vm.$attrs.id, "expanded": _vm.expanded, "href": _vm.href, "to": _vm.to }, nativeOn: { "click": function($event) {
      return function(e) {
        return _vm.$emit("click", e);
      }.apply(null, arguments);
    } } }, [_vm._t("icon"), _vm._t("label", function() {
      return [_vm._v(" " + _vm._s(_vm.label) + " ")];
    })], 2) : _vm._e()];
  }, null, this) : _vm._e()], 2);
};
var staticRenderFns$2 = [];
const __vue2_script$2 = {
  mixins: [
    DropdownHandler
  ]
};
const __cssModules$2 = {};
var __component__$2 = /* @__PURE__ */ normalizeComponent(__vue2_script$2, render$2, staticRenderFns$2, false, __vue2_injectStyles$2, null, null, null);
function __vue2_injectStyles$2(context) {
  for (let o in __cssModules$2) {
    this[o] = __cssModules$2[o];
  }
}
var BtnDropdownSplit = /* @__PURE__ */ function() {
  return __component__$2.exports;
}();
var render$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("btn-group", { class: _vm.classes }, [_vm._t("button", function() {
    return [_c("btn-dropdown-action", { ref: "button", class: _vm.toggleClasses, style: _vm.toggleStyle, attrs: { "id": _vm.$attrs.id, "expanded": _vm.expanded, "href": _vm.href, "to": _vm.to }, nativeOn: { "blur": function($event) {
      return _vm.onBlur.apply(null, arguments);
    }, "click": function($event) {
      return _vm.onClickToggle.apply(null, arguments);
    } } }, [_vm._t("icon"), _vm._t("label", function() {
      return [_vm._v(" " + _vm._s(_vm.label) + " ")];
    })], 2)];
  }, null, this), _c("dropdown-menu", { ref: "menu", class: { animated: _vm.triggerAnimation }, attrs: { "id": _vm.$attrs.id, "align": _vm.align, "show": _vm.expanded }, on: { "blur-item": _vm.onBlur, "click-item": _vm.onClickItem } }, [_vm._t("default")], 2)], 2);
};
var staticRenderFns$1 = [];
const __vue2_script$1 = {
  mixins: [
    DropdownHandler
  ]
};
const __cssModules$1 = {};
var __component__$1 = /* @__PURE__ */ normalizeComponent(__vue2_script$1, render$1, staticRenderFns$1, false, __vue2_injectStyles$1, null, null, null);
function __vue2_injectStyles$1(context) {
  for (let o in __cssModules$1) {
    this[o] = __cssModules$1[o];
  }
}
var BtnDropdownSingle = /* @__PURE__ */ function() {
  return __component__$1.exports;
}();
var render = function() {
  var this$1$1 = this;
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(_vm.$attrs.split === void 0 || !!_vm.$attrs.nav ? "btn-dropdown-single" : "btn-dropdown-split", _vm._b({ tag: "component", staticClass: "btn-dropdown", on: { "click": function() {
    var ref;
    var args = [], len = arguments.length;
    while (len--)
      args[len] = arguments[len];
    return (ref = this$1$1).$emit.apply(ref, ["click"].concat(args));
  }, "click-toggle": function() {
    var ref;
    var args = [], len = arguments.length;
    while (len--)
      args[len] = arguments[len];
    return (ref = this$1$1).$emit.apply(ref, ["click-toggle"].concat(args));
  }, "dropdown": function() {
    var ref;
    var args = [], len = arguments.length;
    while (len--)
      args[len] = arguments[len];
    return (ref = this$1$1).$emit.apply(ref, ["dropdown"].concat(args));
  }, "show": function() {
    var ref;
    var args = [], len = arguments.length;
    while (len--)
      args[len] = arguments[len];
    return (ref = this$1$1).$emit.apply(ref, ["show"].concat(args));
  }, "hide": function() {
    var ref;
    var args = [], len = arguments.length;
    while (len--)
      args[len] = arguments[len];
    return (ref = this$1$1).$emit.apply(ref, ["hide"].concat(args));
  }, "toggle": function() {
    var ref;
    var args = [], len = arguments.length;
    while (len--)
      args[len] = arguments[len];
    return (ref = this$1$1).$emit.apply(ref, ["toggle"].concat(args));
  } }, scopedSlots: _vm._u([{ key: "icon", fn: function() {
    return [_vm._t("icon")];
  }, proxy: true }, _vm.$attrs.label || this.$slots.label ? { key: "label", fn: function() {
    return [_vm._t("label", function() {
      return [_vm._v(" " + _vm._s(_vm.$attrs.label) + " ")];
    })];
  }, proxy: true } : null, { key: "button", fn: function(slot) {
    return [_vm._t("button", null, null, slot)];
  } }, { key: "split", fn: function(slot) {
    return [_vm._t("split", null, null, slot)];
  } }], null, true) }, "component", _vm.$attrs, false), [_vm._t("default")], 2);
};
var staticRenderFns = [];
var BtnDropdown_vue_vue_type_style_index_0_lang = "";
const __vue2_script = {
  name: "BtnDropdown",
  components: {
    BtnDropdownSplit,
    BtnDropdownSingle
  },
  inheritAttrs: false
};
const __cssModules = {};
var __component__ = /* @__PURE__ */ normalizeComponent(__vue2_script, render, staticRenderFns, false, __vue2_injectStyles, null, null, null);
function __vue2_injectStyles(context) {
  for (let o in __cssModules) {
    this[o] = __cssModules[o];
  }
}
var BtnDropdown = /* @__PURE__ */ function() {
  return __component__.exports;
}();
export { BtnDropdown };
