import { defineComponent as U, openBlock as W, createBlock as te, resolveDynamicComponent as Ue, mergeProps as me, withCtx as B, renderSlot as P, createTextVNode as be, toDisplayString as ye, createElementBlock as Xe, normalizeClass as F, h as Lt, Fragment as Vt, resolveComponent as re, createVNode as we, normalizeProps as ae, guardReactiveProps as Re, normalizeStyle as It, withKeys as yt, withModifiers as wt, createCommentVNode as ce, createSlots as qt } from "vue";
var R = "top", N = "bottom", M = "right", j = "left", Te = "auto", xe = [R, N, M, j], se = "start", Oe = "end", Ft = "clippingParents", Ot = "viewport", ve = "popper", Wt = "reference", lt = /* @__PURE__ */ xe.reduce(function(e, t) {
  return e.concat([t + "-" + se, t + "-" + Oe]);
}, []), $t = /* @__PURE__ */ [].concat(xe, [Te]).reduce(function(e, t) {
  return e.concat([t, t + "-" + se, t + "-" + Oe]);
}, []), Ht = "beforeRead", Ut = "read", Xt = "afterRead", Yt = "beforeMain", Kt = "main", Gt = "afterMain", Jt = "beforeWrite", Qt = "write", Zt = "afterWrite", Fe = [Ht, Ut, Xt, Yt, Kt, Gt, Jt, Qt, Zt];
function H(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function L(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function oe(e) {
  var t = L(e).Element;
  return e instanceof t || e instanceof Element;
}
function z(e) {
  var t = L(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Ye(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = L(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function _t(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(r) {
    var n = t.styles[r] || {}, o = t.attributes[r] || {}, i = t.elements[r];
    !z(i) || !H(i) || (Object.assign(i.style, n), Object.keys(o).forEach(function(a) {
      var l = o[a];
      l === !1 ? i.removeAttribute(a) : i.setAttribute(a, l === !0 ? "" : l);
    }));
  });
}
function er(e) {
  var t = e.state, r = {
    popper: {
      position: t.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(t.elements.popper.style, r.popper), t.styles = r, t.elements.arrow && Object.assign(t.elements.arrow.style, r.arrow), function() {
    Object.keys(t.elements).forEach(function(n) {
      var o = t.elements[n], i = t.attributes[n] || {}, a = Object.keys(t.styles.hasOwnProperty(n) ? t.styles[n] : r[n]), l = a.reduce(function(s, f) {
        return s[f] = "", s;
      }, {});
      !z(o) || !H(o) || (Object.assign(o.style, l), Object.keys(i).forEach(function(s) {
        o.removeAttribute(s);
      }));
    });
  };
}
const tr = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: _t,
  effect: er,
  requires: ["computeStyles"]
};
function I(e) {
  return e.split("-")[0];
}
var ne = Math.max, je = Math.min, le = Math.round;
function We() {
  var e = navigator.userAgentData;
  return e != null && e.brands ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function xt() {
  return !/^((?!chrome|android).)*safari/i.test(We());
}
function pe(e, t, r) {
  t === void 0 && (t = !1), r === void 0 && (r = !1);
  var n = e.getBoundingClientRect(), o = 1, i = 1;
  t && z(e) && (o = e.offsetWidth > 0 && le(n.width) / e.offsetWidth || 1, i = e.offsetHeight > 0 && le(n.height) / e.offsetHeight || 1);
  var a = oe(e) ? L(e) : window, l = a.visualViewport, s = !xt() && r, f = (n.left + (s && l ? l.offsetLeft : 0)) / o, p = (n.top + (s && l ? l.offsetTop : 0)) / i, h = n.width / o, y = n.height / i;
  return {
    width: h,
    height: y,
    top: p,
    right: f + h,
    bottom: p + y,
    left: f,
    x: f,
    y: p
  };
}
function Ke(e) {
  var t = pe(e), r = e.offsetWidth, n = e.offsetHeight;
  return Math.abs(t.width - r) <= 1 && (r = t.width), Math.abs(t.height - n) <= 1 && (n = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: r,
    height: n
  };
}
function Ct(e, t) {
  var r = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (r && Ye(r)) {
    var n = t;
    do {
      if (n && e.isSameNode(n))
        return !0;
      n = n.parentNode || n.host;
    } while (n);
  }
  return !1;
}
function q(e) {
  return L(e).getComputedStyle(e);
}
function rr(e) {
  return ["table", "td", "th"].indexOf(H(e)) >= 0;
}
function K(e) {
  return ((oe(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function ze(e) {
  return H(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (Ye(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    K(e)
  );
}
function pt(e) {
  return !z(e) || // https://github.com/popperjs/popper-core/issues/837
  q(e).position === "fixed" ? null : e.offsetParent;
}
function nr(e) {
  var t = /firefox/i.test(We()), r = /Trident/i.test(We());
  if (r && z(e)) {
    var n = q(e);
    if (n.position === "fixed")
      return null;
  }
  var o = ze(e);
  for (Ye(o) && (o = o.host); z(o) && ["html", "body"].indexOf(H(o)) < 0; ) {
    var i = q(o);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || t && i.willChange === "filter" || t && i.filter && i.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function Ce(e) {
  for (var t = L(e), r = pt(e); r && rr(r) && q(r).position === "static"; )
    r = pt(r);
  return r && (H(r) === "html" || H(r) === "body" && q(r).position === "static") ? t : r || nr(e) || t;
}
function Ge(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function he(e, t, r) {
  return ne(e, je(t, r));
}
function or(e, t, r) {
  var n = he(e, t, r);
  return n > r ? r : n;
}
function Pt() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Et(e) {
  return Object.assign({}, Pt(), e);
}
function St(e, t) {
  return t.reduce(function(r, n) {
    return r[n] = e, r;
  }, {});
}
var ir = function(t, r) {
  return t = typeof t == "function" ? t(Object.assign({}, r.rects, {
    placement: r.placement
  })) : t, Et(typeof t != "number" ? t : St(t, xe));
};
function ar(e) {
  var t, r = e.state, n = e.name, o = e.options, i = r.elements.arrow, a = r.modifiersData.popperOffsets, l = I(r.placement), s = Ge(l), f = [j, M].indexOf(l) >= 0, p = f ? "height" : "width";
  if (!(!i || !a)) {
    var h = ir(o.padding, r), y = Ke(i), u = s === "y" ? R : j, O = s === "y" ? N : M, g = r.rects.reference[p] + r.rects.reference[s] - a[s] - r.rects.popper[p], v = a[s] - r.rects.reference[s], w = Ce(i), C = w ? s === "y" ? w.clientHeight || 0 : w.clientWidth || 0 : 0, x = g / 2 - v / 2, d = h[u], m = C - y[p] - h[O], c = C / 2 - y[p] / 2 + x, $ = he(d, c, m), E = s;
    r.modifiersData[n] = (t = {}, t[E] = $, t.centerOffset = $ - c, t);
  }
}
function sr(e) {
  var t = e.state, r = e.options, n = r.element, o = n === void 0 ? "[data-popper-arrow]" : n;
  if (o != null && !(typeof o == "string" && (o = t.elements.popper.querySelector(o), !o))) {
    if (process.env.NODE_ENV !== "production" && (z(o) || console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', "To use an SVG arrow, wrap it in an HTMLElement that will be used as", "the arrow."].join(" "))), !Ct(t.elements.popper, o)) {
      process.env.NODE_ENV !== "production" && console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', "element."].join(" "));
      return;
    }
    t.elements.arrow = o;
  }
}
const lr = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: ar,
  effect: sr,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function fe(e) {
  return e.split("-")[1];
}
var pr = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function fr(e) {
  var t = e.x, r = e.y, n = window, o = n.devicePixelRatio || 1;
  return {
    x: le(t * o) / o || 0,
    y: le(r * o) / o || 0
  };
}
function ft(e) {
  var t, r = e.popper, n = e.popperRect, o = e.placement, i = e.variation, a = e.offsets, l = e.position, s = e.gpuAcceleration, f = e.adaptive, p = e.roundOffsets, h = e.isFixed, y = a.x, u = y === void 0 ? 0 : y, O = a.y, g = O === void 0 ? 0 : O, v = typeof p == "function" ? p({
    x: u,
    y: g
  }) : {
    x: u,
    y: g
  };
  u = v.x, g = v.y;
  var w = a.hasOwnProperty("x"), C = a.hasOwnProperty("y"), x = j, d = R, m = window;
  if (f) {
    var c = Ce(r), $ = "clientHeight", E = "clientWidth";
    if (c === L(r) && (c = K(r), q(c).position !== "static" && l === "absolute" && ($ = "scrollHeight", E = "scrollWidth")), c = c, o === R || (o === j || o === M) && i === Oe) {
      d = N;
      var S = h && c === m && m.visualViewport ? m.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        c[$]
      );
      g -= S - n.height, g *= s ? 1 : -1;
    }
    if (o === j || (o === R || o === N) && i === Oe) {
      x = M;
      var k = h && c === m && m.visualViewport ? m.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        c[E]
      );
      u -= k - n.width, u *= s ? 1 : -1;
    }
  }
  var b = Object.assign({
    position: l
  }, f && pr), D = p === !0 ? fr({
    x: u,
    y: g
  }) : {
    x: u,
    y: g
  };
  if (u = D.x, g = D.y, s) {
    var A;
    return Object.assign({}, b, (A = {}, A[d] = C ? "0" : "", A[x] = w ? "0" : "", A.transform = (m.devicePixelRatio || 1) <= 1 ? "translate(" + u + "px, " + g + "px)" : "translate3d(" + u + "px, " + g + "px, 0)", A));
  }
  return Object.assign({}, b, (t = {}, t[d] = C ? g + "px" : "", t[x] = w ? u + "px" : "", t.transform = "", t));
}
function ur(e) {
  var t = e.state, r = e.options, n = r.gpuAcceleration, o = n === void 0 ? !0 : n, i = r.adaptive, a = i === void 0 ? !0 : i, l = r.roundOffsets, s = l === void 0 ? !0 : l;
  if (process.env.NODE_ENV !== "production") {
    var f = q(t.elements.popper).transitionProperty || "";
    a && ["transform", "top", "right", "bottom", "left"].some(function(h) {
      return f.indexOf(h) >= 0;
    }) && console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', `

`, 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", `

`, "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
  }
  var p = {
    placement: I(t.placement),
    variation: fe(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, ft(Object.assign({}, p, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: a,
    roundOffsets: s
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, ft(Object.assign({}, p, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: s
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const dr = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: ur,
  data: {}
};
var De = {
  passive: !0
};
function cr(e) {
  var t = e.state, r = e.instance, n = e.options, o = n.scroll, i = o === void 0 ? !0 : o, a = n.resize, l = a === void 0 ? !0 : a, s = L(t.elements.popper), f = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return i && f.forEach(function(p) {
    p.addEventListener("scroll", r.update, De);
  }), l && s.addEventListener("resize", r.update, De), function() {
    i && f.forEach(function(p) {
      p.removeEventListener("scroll", r.update, De);
    }), l && s.removeEventListener("resize", r.update, De);
  };
}
const vr = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: cr,
  data: {}
};
var hr = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Ae(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return hr[t];
  });
}
var gr = {
  start: "end",
  end: "start"
};
function ut(e) {
  return e.replace(/start|end/g, function(t) {
    return gr[t];
  });
}
function Je(e) {
  var t = L(e), r = t.pageXOffset, n = t.pageYOffset;
  return {
    scrollLeft: r,
    scrollTop: n
  };
}
function Qe(e) {
  return pe(K(e)).left + Je(e).scrollLeft;
}
function mr(e, t) {
  var r = L(e), n = K(e), o = r.visualViewport, i = n.clientWidth, a = n.clientHeight, l = 0, s = 0;
  if (o) {
    i = o.width, a = o.height;
    var f = xt();
    (f || !f && t === "fixed") && (l = o.offsetLeft, s = o.offsetTop);
  }
  return {
    width: i,
    height: a,
    x: l + Qe(e),
    y: s
  };
}
function br(e) {
  var t, r = K(e), n = Je(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, i = ne(r.scrollWidth, r.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), a = ne(r.scrollHeight, r.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -n.scrollLeft + Qe(e), s = -n.scrollTop;
  return q(o || r).direction === "rtl" && (l += ne(r.clientWidth, o ? o.clientWidth : 0) - i), {
    width: i,
    height: a,
    x: l,
    y: s
  };
}
function Ze(e) {
  var t = q(e), r = t.overflow, n = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(r + o + n);
}
function kt(e) {
  return ["html", "body", "#document"].indexOf(H(e)) >= 0 ? e.ownerDocument.body : z(e) && Ze(e) ? e : kt(ze(e));
}
function ge(e, t) {
  var r;
  t === void 0 && (t = []);
  var n = kt(e), o = n === ((r = e.ownerDocument) == null ? void 0 : r.body), i = L(n), a = o ? [i].concat(i.visualViewport || [], Ze(n) ? n : []) : n, l = t.concat(a);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(ge(ze(a)))
  );
}
function He(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function yr(e, t) {
  var r = pe(e, !1, t === "fixed");
  return r.top = r.top + e.clientTop, r.left = r.left + e.clientLeft, r.bottom = r.top + e.clientHeight, r.right = r.left + e.clientWidth, r.width = e.clientWidth, r.height = e.clientHeight, r.x = r.left, r.y = r.top, r;
}
function dt(e, t, r) {
  return t === Ot ? He(mr(e, r)) : oe(t) ? yr(t, r) : He(br(K(e)));
}
function wr(e) {
  var t = ge(ze(e)), r = ["absolute", "fixed"].indexOf(q(e).position) >= 0, n = r && z(e) ? Ce(e) : e;
  return oe(n) ? t.filter(function(o) {
    return oe(o) && Ct(o, n) && H(o) !== "body";
  }) : [];
}
function Or(e, t, r, n) {
  var o = t === "clippingParents" ? wr(e) : [].concat(t), i = [].concat(o, [r]), a = i[0], l = i.reduce(function(s, f) {
    var p = dt(e, f, n);
    return s.top = ne(p.top, s.top), s.right = je(p.right, s.right), s.bottom = je(p.bottom, s.bottom), s.left = ne(p.left, s.left), s;
  }, dt(e, a, n));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function Bt(e) {
  var t = e.reference, r = e.element, n = e.placement, o = n ? I(n) : null, i = n ? fe(n) : null, a = t.x + t.width / 2 - r.width / 2, l = t.y + t.height / 2 - r.height / 2, s;
  switch (o) {
    case R:
      s = {
        x: a,
        y: t.y - r.height
      };
      break;
    case N:
      s = {
        x: a,
        y: t.y + t.height
      };
      break;
    case M:
      s = {
        x: t.x + t.width,
        y: l
      };
      break;
    case j:
      s = {
        x: t.x - r.width,
        y: l
      };
      break;
    default:
      s = {
        x: t.x,
        y: t.y
      };
  }
  var f = o ? Ge(o) : null;
  if (f != null) {
    var p = f === "y" ? "height" : "width";
    switch (i) {
      case se:
        s[f] = s[f] - (t[p] / 2 - r[p] / 2);
        break;
      case Oe:
        s[f] = s[f] + (t[p] / 2 - r[p] / 2);
        break;
    }
  }
  return s;
}
function $e(e, t) {
  t === void 0 && (t = {});
  var r = t, n = r.placement, o = n === void 0 ? e.placement : n, i = r.strategy, a = i === void 0 ? e.strategy : i, l = r.boundary, s = l === void 0 ? Ft : l, f = r.rootBoundary, p = f === void 0 ? Ot : f, h = r.elementContext, y = h === void 0 ? ve : h, u = r.altBoundary, O = u === void 0 ? !1 : u, g = r.padding, v = g === void 0 ? 0 : g, w = Et(typeof v != "number" ? v : St(v, xe)), C = y === ve ? Wt : ve, x = e.rects.popper, d = e.elements[O ? C : y], m = Or(oe(d) ? d : d.contextElement || K(e.elements.popper), s, p, a), c = pe(e.elements.reference), $ = Bt({
    reference: c,
    element: x,
    strategy: "absolute",
    placement: o
  }), E = He(Object.assign({}, x, $)), S = y === ve ? E : c, k = {
    top: m.top - S.top + w.top,
    bottom: S.bottom - m.bottom + w.bottom,
    left: m.left - S.left + w.left,
    right: S.right - m.right + w.right
  }, b = e.modifiersData.offset;
  if (y === ve && b) {
    var D = b[o];
    Object.keys(k).forEach(function(A) {
      var G = [M, N].indexOf(A) >= 0 ? 1 : -1, J = [R, N].indexOf(A) >= 0 ? "y" : "x";
      k[A] += D[J] * G;
    });
  }
  return k;
}
function $r(e, t) {
  t === void 0 && (t = {});
  var r = t, n = r.placement, o = r.boundary, i = r.rootBoundary, a = r.padding, l = r.flipVariations, s = r.allowedAutoPlacements, f = s === void 0 ? $t : s, p = fe(n), h = p ? l ? lt : lt.filter(function(O) {
    return fe(O) === p;
  }) : xe, y = h.filter(function(O) {
    return f.indexOf(O) >= 0;
  });
  y.length === 0 && (y = h, process.env.NODE_ENV !== "production" && console.error(["Popper: The `allowedAutoPlacements` option did not allow any", "placements. Ensure the `placement` option matches the variation", "of the allowed placements.", 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(" ")));
  var u = y.reduce(function(O, g) {
    return O[g] = $e(e, {
      placement: g,
      boundary: o,
      rootBoundary: i,
      padding: a
    })[I(g)], O;
  }, {});
  return Object.keys(u).sort(function(O, g) {
    return u[O] - u[g];
  });
}
function xr(e) {
  if (I(e) === Te)
    return [];
  var t = Ae(e);
  return [ut(e), t, ut(t)];
}
function Cr(e) {
  var t = e.state, r = e.options, n = e.name;
  if (!t.modifiersData[n]._skip) {
    for (var o = r.mainAxis, i = o === void 0 ? !0 : o, a = r.altAxis, l = a === void 0 ? !0 : a, s = r.fallbackPlacements, f = r.padding, p = r.boundary, h = r.rootBoundary, y = r.altBoundary, u = r.flipVariations, O = u === void 0 ? !0 : u, g = r.allowedAutoPlacements, v = t.options.placement, w = I(v), C = w === v, x = s || (C || !O ? [Ae(v)] : xr(v)), d = [v].concat(x).reduce(function(ie, X) {
      return ie.concat(I(X) === Te ? $r(t, {
        placement: X,
        boundary: p,
        rootBoundary: h,
        padding: f,
        flipVariations: O,
        allowedAutoPlacements: g
      }) : X);
    }, []), m = t.rects.reference, c = t.rects.popper, $ = /* @__PURE__ */ new Map(), E = !0, S = d[0], k = 0; k < d.length; k++) {
      var b = d[k], D = I(b), A = fe(b) === se, G = [R, N].indexOf(D) >= 0, J = G ? "width" : "height", T = $e(t, {
        placement: b,
        boundary: p,
        rootBoundary: h,
        altBoundary: y,
        padding: f
      }), V = G ? A ? M : j : A ? N : R;
      m[J] > c[J] && (V = Ae(V));
      var Pe = Ae(V), Q = [];
      if (i && Q.push(T[D] <= 0), l && Q.push(T[V] <= 0, T[Pe] <= 0), Q.every(function(ie) {
        return ie;
      })) {
        S = b, E = !1;
        break;
      }
      $.set(b, Q);
    }
    if (E)
      for (var Ee = O ? 3 : 1, Me = function(X) {
        var de = d.find(function(ke) {
          var Z = $.get(ke);
          if (Z)
            return Z.slice(0, X).every(function(Le) {
              return Le;
            });
        });
        if (de)
          return S = de, "break";
      }, ue = Ee; ue > 0; ue--) {
        var Se = Me(ue);
        if (Se === "break")
          break;
      }
    t.placement !== S && (t.modifiersData[n]._skip = !0, t.placement = S, t.reset = !0);
  }
}
const Pr = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Cr,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function ct(e, t, r) {
  return r === void 0 && (r = {
    x: 0,
    y: 0
  }), {
    top: e.top - t.height - r.y,
    right: e.right - t.width + r.x,
    bottom: e.bottom - t.height + r.y,
    left: e.left - t.width - r.x
  };
}
function vt(e) {
  return [R, M, N, j].some(function(t) {
    return e[t] >= 0;
  });
}
function Er(e) {
  var t = e.state, r = e.name, n = t.rects.reference, o = t.rects.popper, i = t.modifiersData.preventOverflow, a = $e(t, {
    elementContext: "reference"
  }), l = $e(t, {
    altBoundary: !0
  }), s = ct(a, n), f = ct(l, o, i), p = vt(s), h = vt(f);
  t.modifiersData[r] = {
    referenceClippingOffsets: s,
    popperEscapeOffsets: f,
    isReferenceHidden: p,
    hasPopperEscaped: h
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": p,
    "data-popper-escaped": h
  });
}
const Sr = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Er
};
function kr(e, t, r) {
  var n = I(e), o = [j, R].indexOf(n) >= 0 ? -1 : 1, i = typeof r == "function" ? r(Object.assign({}, t, {
    placement: e
  })) : r, a = i[0], l = i[1];
  return a = a || 0, l = (l || 0) * o, [j, M].indexOf(n) >= 0 ? {
    x: l,
    y: a
  } : {
    x: a,
    y: l
  };
}
function Br(e) {
  var t = e.state, r = e.options, n = e.name, o = r.offset, i = o === void 0 ? [0, 0] : o, a = $t.reduce(function(p, h) {
    return p[h] = kr(h, t.rects, i), p;
  }, {}), l = a[t.placement], s = l.x, f = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += s, t.modifiersData.popperOffsets.y += f), t.modifiersData[n] = a;
}
const Dr = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Br
};
function Ar(e) {
  var t = e.state, r = e.name;
  t.modifiersData[r] = Bt({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const Rr = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Ar,
  data: {}
};
function jr(e) {
  return e === "x" ? "y" : "x";
}
function Tr(e) {
  var t = e.state, r = e.options, n = e.name, o = r.mainAxis, i = o === void 0 ? !0 : o, a = r.altAxis, l = a === void 0 ? !1 : a, s = r.boundary, f = r.rootBoundary, p = r.altBoundary, h = r.padding, y = r.tether, u = y === void 0 ? !0 : y, O = r.tetherOffset, g = O === void 0 ? 0 : O, v = $e(t, {
    boundary: s,
    rootBoundary: f,
    padding: h,
    altBoundary: p
  }), w = I(t.placement), C = fe(t.placement), x = !C, d = Ge(w), m = jr(d), c = t.modifiersData.popperOffsets, $ = t.rects.reference, E = t.rects.popper, S = typeof g == "function" ? g(Object.assign({}, t.rects, {
    placement: t.placement
  })) : g, k = typeof S == "number" ? {
    mainAxis: S,
    altAxis: S
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, S), b = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, D = {
    x: 0,
    y: 0
  };
  if (c) {
    if (i) {
      var A, G = d === "y" ? R : j, J = d === "y" ? N : M, T = d === "y" ? "height" : "width", V = c[d], Pe = V + v[G], Q = V - v[J], Ee = u ? -E[T] / 2 : 0, Me = C === se ? $[T] : E[T], ue = C === se ? -E[T] : -$[T], Se = t.elements.arrow, ie = u && Se ? Ke(Se) : {
        width: 0,
        height: 0
      }, X = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Pt(), de = X[G], ke = X[J], Z = he(0, $[T], ie[T]), Le = x ? $[T] / 2 - Ee - Z - de - k.mainAxis : Me - Z - de - k.mainAxis, Rt = x ? -$[T] / 2 + Ee + Z + ke + k.mainAxis : ue + Z + ke + k.mainAxis, Ve = t.elements.arrow && Ce(t.elements.arrow), jt = Ve ? d === "y" ? Ve.clientTop || 0 : Ve.clientLeft || 0 : 0, _e = (A = b == null ? void 0 : b[d]) != null ? A : 0, Tt = V + Le - _e - jt, zt = V + Rt - _e, et = he(u ? je(Pe, Tt) : Pe, V, u ? ne(Q, zt) : Q);
      c[d] = et, D[d] = et - V;
    }
    if (l) {
      var tt, Nt = d === "x" ? R : j, Mt = d === "x" ? N : M, _ = c[m], Be = m === "y" ? "height" : "width", rt = _ + v[Nt], nt = _ - v[Mt], Ie = [R, j].indexOf(w) !== -1, ot = (tt = b == null ? void 0 : b[m]) != null ? tt : 0, it = Ie ? rt : _ - $[Be] - E[Be] - ot + k.altAxis, at = Ie ? _ + $[Be] + E[Be] - ot - k.altAxis : nt, st = u && Ie ? or(it, _, at) : he(u ? it : rt, _, u ? at : nt);
      c[m] = st, D[m] = st - _;
    }
    t.modifiersData[n] = D;
  }
}
const zr = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Tr,
  requiresIfExists: ["offset"]
};
function Nr(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function Mr(e) {
  return e === L(e) || !z(e) ? Je(e) : Nr(e);
}
function Lr(e) {
  var t = e.getBoundingClientRect(), r = le(t.width) / e.offsetWidth || 1, n = le(t.height) / e.offsetHeight || 1;
  return r !== 1 || n !== 1;
}
function Vr(e, t, r) {
  r === void 0 && (r = !1);
  var n = z(t), o = z(t) && Lr(t), i = K(t), a = pe(e, o, r), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, s = {
    x: 0,
    y: 0
  };
  return (n || !n && !r) && ((H(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Ze(i)) && (l = Mr(t)), z(t) ? (s = pe(t, !0), s.x += t.clientLeft, s.y += t.clientTop) : i && (s.x = Qe(i))), {
    x: a.left + l.scrollLeft - s.x,
    y: a.top + l.scrollTop - s.y,
    width: a.width,
    height: a.height
  };
}
function Ir(e) {
  var t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set(), n = [];
  e.forEach(function(i) {
    t.set(i.name, i);
  });
  function o(i) {
    r.add(i.name);
    var a = [].concat(i.requires || [], i.requiresIfExists || []);
    a.forEach(function(l) {
      if (!r.has(l)) {
        var s = t.get(l);
        s && o(s);
      }
    }), n.push(i);
  }
  return e.forEach(function(i) {
    r.has(i.name) || o(i);
  }), n;
}
function qr(e) {
  var t = Ir(e);
  return Fe.reduce(function(r, n) {
    return r.concat(t.filter(function(o) {
      return o.phase === n;
    }));
  }, []);
}
function Fr(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(r) {
      Promise.resolve().then(function() {
        t = void 0, r(e());
      });
    })), t;
  };
}
function Y(e) {
  for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
    r[n - 1] = arguments[n];
  return [].concat(r).reduce(function(o, i) {
    return o.replace(/%s/, i);
  }, e);
}
var ee = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s', Wr = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available', ht = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
function Hr(e) {
  e.forEach(function(t) {
    [].concat(Object.keys(t), ht).filter(function(r, n, o) {
      return o.indexOf(r) === n;
    }).forEach(function(r) {
      switch (r) {
        case "name":
          typeof t.name != "string" && console.error(Y(ee, String(t.name), '"name"', '"string"', '"' + String(t.name) + '"'));
          break;
        case "enabled":
          typeof t.enabled != "boolean" && console.error(Y(ee, t.name, '"enabled"', '"boolean"', '"' + String(t.enabled) + '"'));
          break;
        case "phase":
          Fe.indexOf(t.phase) < 0 && console.error(Y(ee, t.name, '"phase"', "either " + Fe.join(", "), '"' + String(t.phase) + '"'));
          break;
        case "fn":
          typeof t.fn != "function" && console.error(Y(ee, t.name, '"fn"', '"function"', '"' + String(t.fn) + '"'));
          break;
        case "effect":
          t.effect != null && typeof t.effect != "function" && console.error(Y(ee, t.name, '"effect"', '"function"', '"' + String(t.fn) + '"'));
          break;
        case "requires":
          t.requires != null && !Array.isArray(t.requires) && console.error(Y(ee, t.name, '"requires"', '"array"', '"' + String(t.requires) + '"'));
          break;
        case "requiresIfExists":
          Array.isArray(t.requiresIfExists) || console.error(Y(ee, t.name, '"requiresIfExists"', '"array"', '"' + String(t.requiresIfExists) + '"'));
          break;
        case "options":
        case "data":
          break;
        default:
          console.error('PopperJS: an invalid property has been provided to the "' + t.name + '" modifier, valid properties are ' + ht.map(function(n) {
            return '"' + n + '"';
          }).join(", ") + '; but "' + r + '" was provided.');
      }
      t.requires && t.requires.forEach(function(n) {
        e.find(function(o) {
          return o.name === n;
        }) == null && console.error(Y(Wr, String(t.name), n, n));
      });
    });
  });
}
function Ur(e, t) {
  var r = /* @__PURE__ */ new Set();
  return e.filter(function(n) {
    var o = t(n);
    if (!r.has(o))
      return r.add(o), !0;
  });
}
function Xr(e) {
  var t = e.reduce(function(r, n) {
    var o = r[n.name];
    return r[n.name] = o ? Object.assign({}, o, n, {
      options: Object.assign({}, o.options, n.options),
      data: Object.assign({}, o.data, n.data)
    }) : n, r;
  }, {});
  return Object.keys(t).map(function(r) {
    return t[r];
  });
}
var gt = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.", Yr = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.", mt = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function bt() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return !t.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function Kr(e) {
  e === void 0 && (e = {});
  var t = e, r = t.defaultModifiers, n = r === void 0 ? [] : r, o = t.defaultOptions, i = o === void 0 ? mt : o;
  return function(l, s, f) {
    f === void 0 && (f = i);
    var p = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, mt, i),
      modifiersData: {},
      elements: {
        reference: l,
        popper: s
      },
      attributes: {},
      styles: {}
    }, h = [], y = !1, u = {
      state: p,
      setOptions: function(w) {
        var C = typeof w == "function" ? w(p.options) : w;
        g(), p.options = Object.assign({}, i, p.options, C), p.scrollParents = {
          reference: oe(l) ? ge(l) : l.contextElement ? ge(l.contextElement) : [],
          popper: ge(s)
        };
        var x = qr(Xr([].concat(n, p.options.modifiers)));
        if (p.orderedModifiers = x.filter(function(b) {
          return b.enabled;
        }), process.env.NODE_ENV !== "production") {
          var d = Ur([].concat(x, p.options.modifiers), function(b) {
            var D = b.name;
            return D;
          });
          if (Hr(d), I(p.options.placement) === Te) {
            var m = p.orderedModifiers.find(function(b) {
              var D = b.name;
              return D === "flip";
            });
            m || console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
          }
          var c = q(s), $ = c.marginTop, E = c.marginRight, S = c.marginBottom, k = c.marginLeft;
          [$, E, S, k].some(function(b) {
            return parseFloat(b);
          }) && console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
        }
        return O(), u.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!y) {
          var w = p.elements, C = w.reference, x = w.popper;
          if (!bt(C, x)) {
            process.env.NODE_ENV !== "production" && console.error(gt);
            return;
          }
          p.rects = {
            reference: Vr(C, Ce(x), p.options.strategy === "fixed"),
            popper: Ke(x)
          }, p.reset = !1, p.placement = p.options.placement, p.orderedModifiers.forEach(function(b) {
            return p.modifiersData[b.name] = Object.assign({}, b.data);
          });
          for (var d = 0, m = 0; m < p.orderedModifiers.length; m++) {
            if (process.env.NODE_ENV !== "production" && (d += 1, d > 100)) {
              console.error(Yr);
              break;
            }
            if (p.reset === !0) {
              p.reset = !1, m = -1;
              continue;
            }
            var c = p.orderedModifiers[m], $ = c.fn, E = c.options, S = E === void 0 ? {} : E, k = c.name;
            typeof $ == "function" && (p = $({
              state: p,
              options: S,
              name: k,
              instance: u
            }) || p);
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Fr(function() {
        return new Promise(function(v) {
          u.forceUpdate(), v(p);
        });
      }),
      destroy: function() {
        g(), y = !0;
      }
    };
    if (!bt(l, s))
      return process.env.NODE_ENV !== "production" && console.error(gt), u;
    u.setOptions(f).then(function(v) {
      !y && f.onFirstUpdate && f.onFirstUpdate(v);
    });
    function O() {
      p.orderedModifiers.forEach(function(v) {
        var w = v.name, C = v.options, x = C === void 0 ? {} : C, d = v.effect;
        if (typeof d == "function") {
          var m = d({
            state: p,
            name: w,
            instance: u,
            options: x
          }), c = function() {
          };
          h.push(m || c);
        }
      });
    }
    function g() {
      h.forEach(function(v) {
        return v();
      }), h = [];
    }
    return u;
  };
}
var Gr = [vr, Rr, dr, tr, Dr, Pr, zr, lr, Sr], Jr = /* @__PURE__ */ Kr({
  defaultModifiers: Gr
});
const Qr = {
  props: {
    componentPrefix: String,
    size: String,
    sizePrefix: String
  },
  computed: {
    sizeableClassPrefix() {
      return this.sizePrefix || this.componentPrefix;
    },
    hasSizeablePrefix() {
      return this.size === void 0 ? !1 : !!this.size.match(new RegExp(`^${this.sizeableClassPrefix}`));
    },
    sizeableClass() {
      return this.size ? !this.sizeableClassPrefix || this.hasSizeablePrefix ? this.size : `${this.sizeableClassPrefix}-${this.size}` : "";
    }
  }
}, Zr = {
  props: {
    componentPrefix: String,
    variant: String,
    variantPrefix: String
  },
  computed: {
    variantClassPrefix() {
      return this.variantPrefix || this.componentPrefix;
    },
    hasVariantPrefix() {
      return this.variant === void 0 ? !1 : !!this.variant.match(new RegExp(`^${this.variantClassPrefix}`));
    },
    variantClass() {
      return this.variant ? !this.variantClassPrefix || this.hasVariantPrefix ? this.variant : `${this.variantClassPrefix}-${this.variant}` : "";
    }
  }
}, _r = U({
  mixins: [Qr, Zr],
  props: {
    active: Boolean,
    block: Boolean,
    componentPrefix: {
      type: String,
      default: "btn"
    },
    disabled: Boolean,
    label: String,
    outline: Boolean,
    tag: String,
    variant: {
      type: String,
      default: "primary"
    }
  },
  computed: {
    classes() {
      return ["btn", this.variantClass, this.sizeableClass, this.active && "active", this.block && "btn-block", this.disabled && "disabled"];
    },
    component() {
      return this.tag ? this.tag : this.$attrs.href ? "a" : "button";
    },
    variantClassPrefix() {
      return (this.variantPrefix || this.componentPrefix) + (this.outline ? "-outline" : "");
    }
  }
}), en = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [n, o] of t)
    r[n] = o;
  return r;
};
function tn(e, t, r, n, o, i) {
  return W(), te(Ue(e.component), me(e.$attrs, {
    disabled: e.disabled,
    class: e.classes,
    role: "button"
  }), {
    default: B(() => [P(e.$slots, "default", {}, () => [be(ye(e.label), 1)])]),
    _: 3
  }, 16, ["disabled", "class"]);
}
const rn = /* @__PURE__ */ en(_r, [["render", tn]]), nn = U({
  props: {
    componentPrefix: String,
    size: String,
    sizePrefix: String
  },
  computed: {
    sizeableClassPrefix() {
      return this.sizePrefix || this.componentPrefix;
    },
    hasSizeablePrefix() {
      return this.size === void 0 ? !1 : !!this.size.match(new RegExp(`^${this.sizeableClassPrefix}`));
    },
    sizeableClass() {
      return this.size ? !this.sizeableClassPrefix || this.hasSizeablePrefix ? this.size : `${this.sizeableClassPrefix}-${this.size}` : "";
    }
  }
}), on = U({
  name: "BtnGroup",
  mixins: [nn],
  props: {
    /**
     * The size prefix.
     *
     * @param {String}
     */
    sizePrefix: {
      type: String,
      default() {
        return "btn-group";
      }
    },
    /**
     * Denote the button group as toggle buttons
     *
     * @type {Boolean}
     */
    toggle: Boolean,
    /**
     * Display the buttons vertically
     *
     * @type {Boolean}
     */
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
}), an = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [n, o] of t)
    r[n] = o;
  return r;
}, sn = ["data-toggle"];
function ln(e, t, r, n, o, i) {
  return W(), Xe("div", {
    class: F(e.classes),
    "data-toggle": e.toggle ? "buttons" : !1,
    role: "group"
  }, [P(e.$slots, "default")], 10, sn);
}
const pn = /* @__PURE__ */ an(on, [["render", ln]]);
U({
  name: "BtnGroupToggle"
});
function qe(e, t) {
  e.props.class = `${e.props.class || ""} ${t}`.trim();
}
function Dt(e) {
  for (const t of e) {
    t.type === Vt && Dt(t.children), t.props = Object.assign({
      class: void 0
    }, t.props), t.attrs = Object.assign({}, t.attrs), t.attrs.on || (t.attrs.on = {});
    const r = t.props.class && t.props.class.match(/dropdown-item/), n = t.props.class && t.props.class.match(/dropdown-divider/);
    typeof t.type == "string" && t.type.match(/^h\d$/) ? qe(t, "dropdown-header") : t.type === "hr" && !n ? (t.type = "div", qe(t, "dropdown-divider")) : !r && !n && qe(t, "dropdown-item");
  }
  return e;
}
const fn = (e, t) => Lt("div", {}, Dt(t.slots.default())), un = U({
  name: "DropdownMenu",
  components: {
    DropdownMenuItems: fn
  },
  props: {
    /**
     * Display the dropdown menu aligned left or right
     *
     * @property String
     */
    align: {
      type: String,
      default: "left",
      validate(e) {
        return ["left", "right"].indexOf(e.toLowerCase()) !== -1;
      }
    },
    /**
     * The default visibility of the dropdown menu.
     *
     * @property Object
     */
    show: Boolean
  }
}), dn = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [n, o] of t)
    r[n] = o;
  return r;
}, cn = ["aria-labelledby"];
function vn(e, t, r, n, o, i) {
  const a = re("dropdown-menu-items");
  return W(), Xe("div", {
    class: F(["dropdown-menu", {
      "dropdown-menu-left": e.align === "left",
      "dropdown-menu-right": e.align === "right",
      show: e.show
    }]),
    "aria-labelledby": e.$attrs.id
  }, [we(a, null, {
    default: B(() => [P(e.$slots, "default")]),
    _: 3
  })], 10, cn);
}
const hn = /* @__PURE__ */ dn(un, [["render", vn]]), gn = U({
  props: {
    expanded: {
      type: Boolean,
      default: !1
    },
    id: {
      type: String,
      default: void 0
    },
    href: {
      type: String,
      default: void 0
    },
    to: {
      type: [String, Object],
      default: void 0
    }
  },
  computed: {
    is() {
      return this.to ? "router-link" : this.href ? "a" : "button";
    }
  }
}), Ne = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [n, o] of t)
    r[n] = o;
  return r;
};
function mn(e, t, r, n, o, i) {
  return W(), te(Ue(e.is), me({ id: e.id }, e.to ? { to: e.to } : { href: e.href }, {
    "aria-haspopup": "true",
    "aria-expanded": e.expanded,
    type: e.is === "button" ? "button" : void 0
  }), {
    default: B(() => [
      P(e.$slots, "default")
    ]),
    _: 3
  }, 16, ["id", "aria-expanded", "type"]);
}
const bn = /* @__PURE__ */ Ne(gn, [["render", mn]]), At = {
  components: {
    BtnDropdownAction: bn,
    BtnGroup: pn,
    DropdownMenu: hn
  },
  extends: rn,
  emits: [
    "click-toggle",
    "show",
    "hide",
    "toggle"
  ],
  props: {
    /**
     * Display the dropdown menu aligned left or right
     *
     * @property String
     */
    align: {
      type: String,
      default: "left",
      validate(e) {
        return ["left", "right"].indexOf(e.toLowerCase()) !== -1;
      }
    },
    /**
     * Should animate the dropdown opening.
     *
     * @property {Boolean}
     */
    animated: {
      type: Boolean,
      default: !0
    },
    /**
     * Additional button classes.
     * 
     * @property {Object|String}
     */
    buttonClass: [Object, String],
    /**
     * Show the caret.
     *
     * @property {Boolean}
     */
    caret: {
      type: Boolean,
      default: !0
    },
    /**
     * Should display the toggle button as a circle.
     *
     * @property Boolean
     */
    // circle: {
    //     type: Boolean,
    //     default: false
    // },
    /**
     * Display as a dropup instead of a dropdown.
     *
     * @property Boolean
     */
    dropup: {
      type: Boolean,
      default: !1
    },
    /**
     * Display as a dropright instead of a dropdown.
     *
     * @property Boolean
     */
    dropright: {
      type: Boolean,
      default: !1
    },
    /**
     * Display as a dropleft instead of a dropdown.
     *
     * @property Boolean
     */
    dropleft: {
      type: Boolean,
      default: !1
    },
    /**
     * The action height.
     *
     * @property {String}
     */
    height: String,
    /**
     * The href action.
     *
     * @property {String}
     */
    href: String,
    /**
     * Is the dropdown a nav item?
     *
     * @property {Boolean}
     */
    nav: Boolean,
    /**
     * The toggle button's label. If not defined as an attribute,
     * you can override with the component's slot (inner html).
     *
     * @property {String}
     */
    label: String,
    offset: {
      type: Number,
      default: 5
    },
    /**
     * Should rotate the toggle button when opened.
     *
     * @property {Boolean}
     */
    rotate: {
      type: Boolean,
      default: !1
    },
    /**
     * Display the dropdown button with a split toggle button.
     *
     * @property {Boolean}
     */
    split: {
      type: Boolean,
      default: !1
    },
    /**
     * The "to" path, used for vue-router.
     *
     * @property {String|Object}
     */
    to: [String, Object],
    /**
     * The button type attribute.
     *
     * @property {String}
     */
    type: {
      type: String,
      default: "button"
    },
    /**
     * The action width.
     *
     * @property {String}
     */
    width: String
  },
  data() {
    return {
      popper: null,
      triggerAnimation: !1,
      expanded: !1
    };
  },
  computed: {
    scope() {
      return {
        // Pass the computed props.
        placement: this.placement,
        variantClassPrefix: this.variantClassPrefix,
        sizeableClassPrefix: this.sizeableClassPrefix,
        classes: this.classes,
        actionClasses: this.actionClasses,
        toggleStyle: this.toggleStyle,
        toggleClasses: this.toggleClasses,
        // Pass the methods                
        focus: this.focus,
        queryFocusable: this.queryFocusable,
        isFocusable: this.isFocusable,
        toggle: this.toggle,
        show: this.show,
        hide: this.hide,
        onBlur: this.onBlur,
        onClickItem: this.onClickItem,
        onClickToggle: this.onClickToggle,
        expanded: this.expanded
      };
    },
    placement() {
      return this.dropup ? "top" : this.dropleft ? "left" : this.dropright ? "right" : "bottom";
    },
    variantClassPrefix() {
      return "btn" + (this.outline ? "-outline" : "");
    },
    sizeableClassPrefix() {
      return "btn";
    },
    classes() {
      return {
        dropdown: this.dropup && this.dropright && this.dropleft,
        dropup: this.dropup,
        dropright: this.dropright,
        dropleft: this.dropleft,
        "icon-only": !this.nav && !this.split && !!this.$slots.icon && !this.$slots.label,
        "hide-caret": !this.caret,
        expanded: this.expanded,
        "rotate-90": !this.nav && this.split && this.rotate && this.expanded
      };
    },
    actionClasses() {
      return Object.assign({
        btn: !this.nav,
        [this.variantClass]: !this.nav && !!this.variant,
        [this.sizeableClass]: !!this.size
      }, typeof this.buttonClass == "object" ? this.buttonClass : {
        [this.buttonClass]: !!this.buttonClass
      });
    },
    toggleStyle() {
      return {
        width: this.width,
        height: this.height
      };
    },
    toggleClasses() {
      return Object.assign({
        active: this.active,
        btn: !this.nav,
        "btn-block": !!this.block,
        "nav-link": !!this.nav,
        "rotate-90": !this.split && this.rotate && this.expanded,
        "dropdown-toggle": !0,
        "dropdown-toggle-split": !this.nav && this.split,
        [this.variantClass]: !this.nav && !!this.variant,
        [this.sizeableClass]: !!this.size
      }, typeof this.buttonClass == "object" ? this.buttonClass : {
        [this.buttonClass]: !!this.buttonClass
      });
    }
  },
  beforeUnmount() {
    this.popper && this.popper.destroy();
  },
  methods: {
    /**
     * Focus on the the dropdown toggle button
     *
     * @return void
     */
    focus() {
      this.$el.querySelector(".dropdown-toggle").focus();
    },
    /**
     * Focus on the the dropdown toggle button
     *
     * @return void
     */
    queryFocusable() {
      return this.$el.querySelector(".dropdown-menu").querySelectorAll('label, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    },
    /**
     * Method to check if the given element is focusable.
     *
     * @return void
     */
    isFocusable(e) {
      const t = this.queryFocusable();
      for (const r in t)
        if (e === t[r])
          return !0;
      return !1;
    },
    /**
     * Toggle the dropdown menu
     *
     * @return void
     */
    toggle() {
      this.expanded ? this.hide() : this.show();
    },
    /**
     * Show the dropdown menu
     *
     * @return void
     */
    show() {
      this.expanded = !0;
      const e = this.$refs.split && this.$refs.split.$el || this.$el;
      !this.nav && !this.popper ? this.popper = Jr(e, this.$refs.menu.$el, {
        placement: `${this.placement}-${this.align === "left" ? "start" : "end"}`,
        onFirstUpdate: () => {
          this.triggerAnimation = this.animated;
        },
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, this.nav ? 1 : this.offset]
              // offset: ['.125rem', !this.nav ? 4 : 1],
            }
          }
        ]
      }) : this.popper && this.popper.update();
    },
    /**
     * Hide the dropdown menu
     *
     * @return void
     */
    hide() {
      this.expanded = !1;
    },
    /**
     * A callback function for the `blur-item` event.
     *
     * @return void
     */
    onBlur(e) {
      (!this.$refs.menu.$el.contains(e.relatedTarget) || !this.$el.contains(e.relatedTarget)) && this.hide();
    },
    onClickDocument(e) {
      this.$el.contains(e.target) || this.hide();
    },
    /**
     * A callback function for the `click-item` event.
     *
     * @return void
     */
    onClickItem(e) {
      this.isFocusable(e.target) || this.hide();
    },
    /**
     * A callback function for the `click-toggle` event.
     *
     * @return void
     */
    onClickToggle(e) {
      e.target.dispatchEvent(new Event("focus", e)), this.$emit("click-toggle", e), e.defaultPrevented || this.toggle();
    },
    onKeydown(e) {
      e.target.parentElement.lastElementChild === e.target && this.hide();
    }
  },
  watch: {
    expanded(e) {
      this.$nextTick(() => {
        this.$emit(e ? "show" : "hide"), this.$emit("toggle", e);
      }), setTimeout(() => {
        e ? document.addEventListener("click", this.onClickDocument) : document.removeEventListener("click", this.onClickDocument);
      });
    }
  }
}, yn = U({
  mixins: [
    At
  ]
});
function wn(e, t, r, n, o, i) {
  const a = re("btn-dropdown-action"), l = re("dropdown-menu"), s = re("btn-group");
  return W(), te(s, {
    class: F(e.classes)
  }, {
    default: B(() => [
      P(e.$slots, "button", ae(Re(e.scope)), () => [
        we(a, {
          id: e.$attrs.id,
          ref: "button",
          expanded: e.expanded,
          href: e.href,
          to: e.to,
          style: It(e.toggleStyle),
          class: F(e.toggleClasses),
          onBlur: e.onBlur,
          onClick: e.onClickToggle
        }, {
          default: B(() => [
            P(e.$slots, "icon"),
            P(e.$slots, "label", {}, () => [
              be(ye(e.label), 1)
            ])
          ]),
          _: 3
        }, 8, ["id", "expanded", "href", "to", "style", "class", "onBlur", "onClick"])
      ]),
      we(l, {
        id: e.$attrs.id,
        ref: "menu",
        align: e.align,
        show: e.expanded,
        class: F({ animated: e.triggerAnimation }),
        onBlur: e.onBlur,
        onClick: e.onClickItem,
        onKeydown: yt(e.onKeydown, ["tab"]),
        onMousedown: t[0] || (t[0] = wt(() => {
        }, ["prevent"]))
      }, {
        default: B(() => [
          P(e.$slots, "default")
        ]),
        _: 3
      }, 8, ["id", "align", "show", "class", "onBlur", "onClick", "onKeydown"])
    ]),
    _: 3
  }, 8, ["class"]);
}
const On = /* @__PURE__ */ Ne(yn, [["render", wn]]), $n = U({
  mixins: [
    At
  ],
  emits: [
    "click"
  ]
}), xn = ["id", "aria-expanded"];
function Cn(e, t, r, n, o, i) {
  const a = re("btn-dropdown-action"), l = re("dropdown-menu"), s = re("btn-group");
  return W(), te(s, {
    class: F([e.classes, "btn-dropdown-split"])
  }, {
    default: B(() => [
      e.dropleft ? ce("", !0) : P(e.$slots, "button", ae(me({ key: 0 }, e.scope)), () => [
        e.dropleft ? ce("", !0) : (W(), te(a, {
          key: 0,
          id: e.$attrs.id,
          ref: "button",
          expanded: e.expanded,
          href: e.href,
          to: e.to,
          class: F(e.actionClasses),
          onClick: t[0] || (t[0] = (f) => e.$emit("click", f))
        }, {
          default: B(() => [
            P(e.$slots, "icon"),
            P(e.$slots, "label", {}, () => [
              be(ye(e.label), 1)
            ])
          ]),
          _: 3
        }, 8, ["id", "expanded", "href", "to", "class"]))
      ]),
      we(s, { ref: "split" }, {
        default: B(() => [
          P(e.$slots, "split", ae(Re(e.scope)), () => [
            e.split ? (W(), Xe("button", {
              key: 0,
              id: e.$attrs.id,
              type: "button",
              "aria-haspopup": "true",
              "aria-expanded": e.expanded,
              class: F(e.toggleClasses),
              onBlur: t[1] || (t[1] = (...f) => e.onBlur && e.onBlur(...f)),
              onClick: t[2] || (t[2] = (...f) => e.onClickToggle && e.onClickToggle(...f))
            }, null, 42, xn)) : ce("", !0)
          ]),
          we(l, {
            id: e.$attrs.id,
            ref: "menu",
            align: e.align,
            show: e.expanded,
            class: F({ animated: e.triggerAnimation }),
            onBlur: e.onBlur,
            onClick: e.onClickItem,
            onKeydown: yt(e.onKeydown, ["tab"]),
            onMousedown: t[3] || (t[3] = wt(() => {
            }, ["prevent"]))
          }, {
            default: B(() => [
              P(e.$slots, "default")
            ]),
            _: 3
          }, 8, ["id", "align", "show", "class", "onBlur", "onClick", "onKeydown"])
        ]),
        _: 3
      }, 512),
      e.dropleft ? P(e.$slots, "button", ae(me({ key: 1 }, e.scope)), () => [
        e.dropleft ? (W(), te(a, {
          key: 0,
          id: e.$attrs.id,
          ref: "button",
          expanded: e.expanded,
          href: e.href,
          to: e.to,
          class: F(e.actionClasses),
          onClick: t[4] || (t[4] = (f) => e.$emit("click", f))
        }, {
          default: B(() => [
            P(e.$slots, "icon"),
            P(e.$slots, "label", {}, () => [
              be(ye(e.label), 1)
            ])
          ]),
          _: 3
        }, 8, ["id", "expanded", "href", "to", "class"])) : ce("", !0)
      ]) : ce("", !0)
    ]),
    _: 3
  }, 8, ["class"]);
}
const Pn = /* @__PURE__ */ Ne($n, [["render", Cn]]), En = U({
  name: "BtnDropdown",
  components: {
    BtnDropdownSplit: Pn,
    BtnDropdownSingle: On
  },
  inheritAttrs: !1,
  emits: [
    "click",
    "click-toggle",
    "dropdown",
    "show",
    "hide",
    "toggle"
  ]
});
function Sn(e, t, r, n, o, i) {
  return W(), te(Ue(e.$attrs.split === void 0 || e.$attrs.nav ? "btn-dropdown-single" : "btn-dropdown-split"), me({ class: "btn-dropdown" }, e.$attrs, {
    onClick: t[0] || (t[0] = (...a) => e.$emit("click", ...a)),
    onClickToggle: t[1] || (t[1] = (...a) => e.$emit("click-toggle", ...a)),
    onDropdown: t[2] || (t[2] = (...a) => e.$emit("dropdown", ...a)),
    onShow: t[3] || (t[3] = (...a) => e.$emit("show", ...a)),
    onHide: t[4] || (t[4] = (...a) => e.$emit("hide", ...a)),
    onToggle: t[5] || (t[5] = (...a) => e.$emit("toggle", ...a))
  }), qt({
    icon: B(() => [
      P(e.$slots, "icon")
    ]),
    button: B((a) => [
      P(e.$slots, "button", ae(Re(a)))
    ]),
    split: B((a) => [
      P(e.$slots, "split", ae(Re(a)))
    ]),
    default: B(() => [
      P(e.$slots, "default")
    ]),
    _: 2
  }, [
    e.$attrs.label || e.$slots.label ? {
      name: "label",
      fn: B(() => [
        P(e.$slots, "label", {}, () => [
          be(ye(e.$attrs.label), 1)
        ])
      ]),
      key: "0"
    } : void 0
  ]), 1040);
}
const Bn = /* @__PURE__ */ Ne(En, [["render", Sn]]);
export {
  Bn as BtnDropdown
};