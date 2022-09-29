import { openBlock as W, createBlock as ee, resolveDynamicComponent as He, mergeProps as ge, withCtx as B, renderSlot as P, createTextVNode as be, toDisplayString as ye, createElementBlock as Xe, normalizeClass as F, h as Nt, resolveComponent as te, createVNode as we, normalizeProps as ie, createCommentVNode as de, guardReactiveProps as Re, normalizeStyle as Mt, createSlots as Lt } from "vue";
var R = "top", I = "bottom", N = "right", j = "left", ze = "auto", $e = [R, I, N, j], ae = "start", xe = "end", Vt = "clippingParents", wt = "viewport", ve = "popper", qt = "reference", st = /* @__PURE__ */ $e.reduce(function(e, t) {
  return e.concat([t + "-" + ae, t + "-" + xe]);
}, []), xt = /* @__PURE__ */ [].concat($e, [ze]).reduce(function(e, t) {
  return e.concat([t, t + "-" + ae, t + "-" + xe]);
}, []), Ft = "beforeRead", Wt = "read", Ht = "afterRead", Xt = "beforeMain", Yt = "main", Ut = "afterMain", Gt = "beforeWrite", Jt = "write", Kt = "afterWrite", qe = [Ft, Wt, Ht, Xt, Yt, Ut, Gt, Jt, Kt];
function H(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function M(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function ne(e) {
  var t = M(e).Element;
  return e instanceof t || e instanceof Element;
}
function T(e) {
  var t = M(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Ye(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = M(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function Qt(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(r) {
    var n = t.styles[r] || {}, o = t.attributes[r] || {}, i = t.elements[r];
    !T(i) || !H(i) || (Object.assign(i.style, n), Object.keys(o).forEach(function(a) {
      var l = o[a];
      l === !1 ? i.removeAttribute(a) : i.setAttribute(a, l === !0 ? "" : l);
    }));
  });
}
function Zt(e) {
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
      !T(o) || !H(o) || (Object.assign(o.style, l), Object.keys(i).forEach(function(s) {
        o.removeAttribute(s);
      }));
    });
  };
}
const _t = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Qt,
  effect: Zt,
  requires: ["computeStyles"]
};
function V(e) {
  return e.split("-")[0];
}
var re = Math.max, je = Math.min, se = Math.round;
function Fe() {
  var e = navigator.userAgentData;
  return e != null && e.brands ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function Ot() {
  return !/^((?!chrome|android).)*safari/i.test(Fe());
}
function le(e, t, r) {
  t === void 0 && (t = !1), r === void 0 && (r = !1);
  var n = e.getBoundingClientRect(), o = 1, i = 1;
  t && T(e) && (o = e.offsetWidth > 0 && se(n.width) / e.offsetWidth || 1, i = e.offsetHeight > 0 && se(n.height) / e.offsetHeight || 1);
  var a = ne(e) ? M(e) : window, l = a.visualViewport, s = !Ot() && r, f = (n.left + (s && l ? l.offsetLeft : 0)) / o, p = (n.top + (s && l ? l.offsetTop : 0)) / i, h = n.width / o, y = n.height / i;
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
function Ue(e) {
  var t = le(e), r = e.offsetWidth, n = e.offsetHeight;
  return Math.abs(t.width - r) <= 1 && (r = t.width), Math.abs(t.height - n) <= 1 && (n = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: r,
    height: n
  };
}
function $t(e, t) {
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
  return M(e).getComputedStyle(e);
}
function er(e) {
  return ["table", "td", "th"].indexOf(H(e)) >= 0;
}
function U(e) {
  return ((ne(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function Te(e) {
  return H(e) === "html" ? e : e.assignedSlot || e.parentNode || (Ye(e) ? e.host : null) || U(e);
}
function lt(e) {
  return !T(e) || q(e).position === "fixed" ? null : e.offsetParent;
}
function tr(e) {
  var t = /firefox/i.test(Fe()), r = /Trident/i.test(Fe());
  if (r && T(e)) {
    var n = q(e);
    if (n.position === "fixed")
      return null;
  }
  var o = Te(e);
  for (Ye(o) && (o = o.host); T(o) && ["html", "body"].indexOf(H(o)) < 0; ) {
    var i = q(o);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || t && i.willChange === "filter" || t && i.filter && i.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function Ce(e) {
  for (var t = M(e), r = lt(e); r && er(r) && q(r).position === "static"; )
    r = lt(r);
  return r && (H(r) === "html" || H(r) === "body" && q(r).position === "static") ? t : r || tr(e) || t;
}
function Ge(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function he(e, t, r) {
  return re(e, je(t, r));
}
function rr(e, t, r) {
  var n = he(e, t, r);
  return n > r ? r : n;
}
function Ct() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Pt(e) {
  return Object.assign({}, Ct(), e);
}
function Et(e, t) {
  return t.reduce(function(r, n) {
    return r[n] = e, r;
  }, {});
}
var nr = function(t, r) {
  return t = typeof t == "function" ? t(Object.assign({}, r.rects, {
    placement: r.placement
  })) : t, Pt(typeof t != "number" ? t : Et(t, $e));
};
function or(e) {
  var t, r = e.state, n = e.name, o = e.options, i = r.elements.arrow, a = r.modifiersData.popperOffsets, l = V(r.placement), s = Ge(l), f = [j, N].indexOf(l) >= 0, p = f ? "height" : "width";
  if (!(!i || !a)) {
    var h = nr(o.padding, r), y = Ue(i), u = s === "y" ? R : j, x = s === "y" ? I : N, m = r.rects.reference[p] + r.rects.reference[s] - a[s] - r.rects.popper[p], v = a[s] - r.rects.reference[s], w = Ce(i), C = w ? s === "y" ? w.clientHeight || 0 : w.clientWidth || 0 : 0, $ = m / 2 - v / 2, c = h[u], g = C - y[p] - h[x], d = C / 2 - y[p] / 2 + $, O = he(c, d, g), E = s;
    r.modifiersData[n] = (t = {}, t[E] = O, t.centerOffset = O - d, t);
  }
}
function ir(e) {
  var t = e.state, r = e.options, n = r.element, o = n === void 0 ? "[data-popper-arrow]" : n;
  if (o != null && !(typeof o == "string" && (o = t.elements.popper.querySelector(o), !o))) {
    if (process.env.NODE_ENV !== "production" && (T(o) || console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', "To use an SVG arrow, wrap it in an HTMLElement that will be used as", "the arrow."].join(" "))), !$t(t.elements.popper, o)) {
      process.env.NODE_ENV !== "production" && console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', "element."].join(" "));
      return;
    }
    t.elements.arrow = o;
  }
}
const ar = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: or,
  effect: ir,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function pe(e) {
  return e.split("-")[1];
}
var sr = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function lr(e) {
  var t = e.x, r = e.y, n = window, o = n.devicePixelRatio || 1;
  return {
    x: se(t * o) / o || 0,
    y: se(r * o) / o || 0
  };
}
function pt(e) {
  var t, r = e.popper, n = e.popperRect, o = e.placement, i = e.variation, a = e.offsets, l = e.position, s = e.gpuAcceleration, f = e.adaptive, p = e.roundOffsets, h = e.isFixed, y = a.x, u = y === void 0 ? 0 : y, x = a.y, m = x === void 0 ? 0 : x, v = typeof p == "function" ? p({
    x: u,
    y: m
  }) : {
    x: u,
    y: m
  };
  u = v.x, m = v.y;
  var w = a.hasOwnProperty("x"), C = a.hasOwnProperty("y"), $ = j, c = R, g = window;
  if (f) {
    var d = Ce(r), O = "clientHeight", E = "clientWidth";
    if (d === M(r) && (d = U(r), q(d).position !== "static" && l === "absolute" && (O = "scrollHeight", E = "scrollWidth")), d = d, o === R || (o === j || o === N) && i === xe) {
      c = I;
      var S = h && d === g && g.visualViewport ? g.visualViewport.height : d[O];
      m -= S - n.height, m *= s ? 1 : -1;
    }
    if (o === j || (o === R || o === I) && i === xe) {
      $ = N;
      var k = h && d === g && g.visualViewport ? g.visualViewport.width : d[E];
      u -= k - n.width, u *= s ? 1 : -1;
    }
  }
  var b = Object.assign({
    position: l
  }, f && sr), D = p === !0 ? lr({
    x: u,
    y: m
  }) : {
    x: u,
    y: m
  };
  if (u = D.x, m = D.y, s) {
    var A;
    return Object.assign({}, b, (A = {}, A[c] = C ? "0" : "", A[$] = w ? "0" : "", A.transform = (g.devicePixelRatio || 1) <= 1 ? "translate(" + u + "px, " + m + "px)" : "translate3d(" + u + "px, " + m + "px, 0)", A));
  }
  return Object.assign({}, b, (t = {}, t[c] = C ? m + "px" : "", t[$] = w ? u + "px" : "", t.transform = "", t));
}
function pr(e) {
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
    placement: V(t.placement),
    variation: pe(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, pt(Object.assign({}, p, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: a,
    roundOffsets: s
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, pt(Object.assign({}, p, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: s
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const fr = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: pr,
  data: {}
};
var De = {
  passive: !0
};
function ur(e) {
  var t = e.state, r = e.instance, n = e.options, o = n.scroll, i = o === void 0 ? !0 : o, a = n.resize, l = a === void 0 ? !0 : a, s = M(t.elements.popper), f = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return i && f.forEach(function(p) {
    p.addEventListener("scroll", r.update, De);
  }), l && s.addEventListener("resize", r.update, De), function() {
    i && f.forEach(function(p) {
      p.removeEventListener("scroll", r.update, De);
    }), l && s.removeEventListener("resize", r.update, De);
  };
}
const cr = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: ur,
  data: {}
};
var dr = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Ae(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return dr[t];
  });
}
var vr = {
  start: "end",
  end: "start"
};
function ft(e) {
  return e.replace(/start|end/g, function(t) {
    return vr[t];
  });
}
function Je(e) {
  var t = M(e), r = t.pageXOffset, n = t.pageYOffset;
  return {
    scrollLeft: r,
    scrollTop: n
  };
}
function Ke(e) {
  return le(U(e)).left + Je(e).scrollLeft;
}
function hr(e, t) {
  var r = M(e), n = U(e), o = r.visualViewport, i = n.clientWidth, a = n.clientHeight, l = 0, s = 0;
  if (o) {
    i = o.width, a = o.height;
    var f = Ot();
    (f || !f && t === "fixed") && (l = o.offsetLeft, s = o.offsetTop);
  }
  return {
    width: i,
    height: a,
    x: l + Ke(e),
    y: s
  };
}
function mr(e) {
  var t, r = U(e), n = Je(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, i = re(r.scrollWidth, r.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), a = re(r.scrollHeight, r.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -n.scrollLeft + Ke(e), s = -n.scrollTop;
  return q(o || r).direction === "rtl" && (l += re(r.clientWidth, o ? o.clientWidth : 0) - i), {
    width: i,
    height: a,
    x: l,
    y: s
  };
}
function Qe(e) {
  var t = q(e), r = t.overflow, n = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(r + o + n);
}
function St(e) {
  return ["html", "body", "#document"].indexOf(H(e)) >= 0 ? e.ownerDocument.body : T(e) && Qe(e) ? e : St(Te(e));
}
function me(e, t) {
  var r;
  t === void 0 && (t = []);
  var n = St(e), o = n === ((r = e.ownerDocument) == null ? void 0 : r.body), i = M(n), a = o ? [i].concat(i.visualViewport || [], Qe(n) ? n : []) : n, l = t.concat(a);
  return o ? l : l.concat(me(Te(a)));
}
function We(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function gr(e, t) {
  var r = le(e, !1, t === "fixed");
  return r.top = r.top + e.clientTop, r.left = r.left + e.clientLeft, r.bottom = r.top + e.clientHeight, r.right = r.left + e.clientWidth, r.width = e.clientWidth, r.height = e.clientHeight, r.x = r.left, r.y = r.top, r;
}
function ut(e, t, r) {
  return t === wt ? We(hr(e, r)) : ne(t) ? gr(t, r) : We(mr(U(e)));
}
function br(e) {
  var t = me(Te(e)), r = ["absolute", "fixed"].indexOf(q(e).position) >= 0, n = r && T(e) ? Ce(e) : e;
  return ne(n) ? t.filter(function(o) {
    return ne(o) && $t(o, n) && H(o) !== "body";
  }) : [];
}
function yr(e, t, r, n) {
  var o = t === "clippingParents" ? br(e) : [].concat(t), i = [].concat(o, [r]), a = i[0], l = i.reduce(function(s, f) {
    var p = ut(e, f, n);
    return s.top = re(p.top, s.top), s.right = je(p.right, s.right), s.bottom = je(p.bottom, s.bottom), s.left = re(p.left, s.left), s;
  }, ut(e, a, n));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function kt(e) {
  var t = e.reference, r = e.element, n = e.placement, o = n ? V(n) : null, i = n ? pe(n) : null, a = t.x + t.width / 2 - r.width / 2, l = t.y + t.height / 2 - r.height / 2, s;
  switch (o) {
    case R:
      s = {
        x: a,
        y: t.y - r.height
      };
      break;
    case I:
      s = {
        x: a,
        y: t.y + t.height
      };
      break;
    case N:
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
      case ae:
        s[f] = s[f] - (t[p] / 2 - r[p] / 2);
        break;
      case xe:
        s[f] = s[f] + (t[p] / 2 - r[p] / 2);
        break;
    }
  }
  return s;
}
function Oe(e, t) {
  t === void 0 && (t = {});
  var r = t, n = r.placement, o = n === void 0 ? e.placement : n, i = r.strategy, a = i === void 0 ? e.strategy : i, l = r.boundary, s = l === void 0 ? Vt : l, f = r.rootBoundary, p = f === void 0 ? wt : f, h = r.elementContext, y = h === void 0 ? ve : h, u = r.altBoundary, x = u === void 0 ? !1 : u, m = r.padding, v = m === void 0 ? 0 : m, w = Pt(typeof v != "number" ? v : Et(v, $e)), C = y === ve ? qt : ve, $ = e.rects.popper, c = e.elements[x ? C : y], g = yr(ne(c) ? c : c.contextElement || U(e.elements.popper), s, p, a), d = le(e.elements.reference), O = kt({
    reference: d,
    element: $,
    strategy: "absolute",
    placement: o
  }), E = We(Object.assign({}, $, O)), S = y === ve ? E : d, k = {
    top: g.top - S.top + w.top,
    bottom: S.bottom - g.bottom + w.bottom,
    left: g.left - S.left + w.left,
    right: S.right - g.right + w.right
  }, b = e.modifiersData.offset;
  if (y === ve && b) {
    var D = b[o];
    Object.keys(k).forEach(function(A) {
      var G = [N, I].indexOf(A) >= 0 ? 1 : -1, J = [R, I].indexOf(A) >= 0 ? "y" : "x";
      k[A] += D[J] * G;
    });
  }
  return k;
}
function wr(e, t) {
  t === void 0 && (t = {});
  var r = t, n = r.placement, o = r.boundary, i = r.rootBoundary, a = r.padding, l = r.flipVariations, s = r.allowedAutoPlacements, f = s === void 0 ? xt : s, p = pe(n), h = p ? l ? st : st.filter(function(x) {
    return pe(x) === p;
  }) : $e, y = h.filter(function(x) {
    return f.indexOf(x) >= 0;
  });
  y.length === 0 && (y = h, process.env.NODE_ENV !== "production" && console.error(["Popper: The `allowedAutoPlacements` option did not allow any", "placements. Ensure the `placement` option matches the variation", "of the allowed placements.", 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(" ")));
  var u = y.reduce(function(x, m) {
    return x[m] = Oe(e, {
      placement: m,
      boundary: o,
      rootBoundary: i,
      padding: a
    })[V(m)], x;
  }, {});
  return Object.keys(u).sort(function(x, m) {
    return u[x] - u[m];
  });
}
function xr(e) {
  if (V(e) === ze)
    return [];
  var t = Ae(e);
  return [ft(e), t, ft(t)];
}
function Or(e) {
  var t = e.state, r = e.options, n = e.name;
  if (!t.modifiersData[n]._skip) {
    for (var o = r.mainAxis, i = o === void 0 ? !0 : o, a = r.altAxis, l = a === void 0 ? !0 : a, s = r.fallbackPlacements, f = r.padding, p = r.boundary, h = r.rootBoundary, y = r.altBoundary, u = r.flipVariations, x = u === void 0 ? !0 : u, m = r.allowedAutoPlacements, v = t.options.placement, w = V(v), C = w === v, $ = s || (C || !x ? [Ae(v)] : xr(v)), c = [v].concat($).reduce(function(oe, X) {
      return oe.concat(V(X) === ze ? wr(t, {
        placement: X,
        boundary: p,
        rootBoundary: h,
        padding: f,
        flipVariations: x,
        allowedAutoPlacements: m
      }) : X);
    }, []), g = t.rects.reference, d = t.rects.popper, O = /* @__PURE__ */ new Map(), E = !0, S = c[0], k = 0; k < c.length; k++) {
      var b = c[k], D = V(b), A = pe(b) === ae, G = [R, I].indexOf(D) >= 0, J = G ? "width" : "height", z = Oe(t, {
        placement: b,
        boundary: p,
        rootBoundary: h,
        altBoundary: y,
        padding: f
      }), L = G ? A ? N : j : A ? I : R;
      g[J] > d[J] && (L = Ae(L));
      var Pe = Ae(L), K = [];
      if (i && K.push(z[D] <= 0), l && K.push(z[L] <= 0, z[Pe] <= 0), K.every(function(oe) {
        return oe;
      })) {
        S = b, E = !1;
        break;
      }
      O.set(b, K);
    }
    if (E)
      for (var Ee = x ? 3 : 1, Ie = function(X) {
        var ce = c.find(function(ke) {
          var Q = O.get(ke);
          if (Q)
            return Q.slice(0, X).every(function(Ne) {
              return Ne;
            });
        });
        if (ce)
          return S = ce, "break";
      }, ue = Ee; ue > 0; ue--) {
        var Se = Ie(ue);
        if (Se === "break")
          break;
      }
    t.placement !== S && (t.modifiersData[n]._skip = !0, t.placement = S, t.reset = !0);
  }
}
const $r = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Or,
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
function dt(e) {
  return [R, N, I, j].some(function(t) {
    return e[t] >= 0;
  });
}
function Cr(e) {
  var t = e.state, r = e.name, n = t.rects.reference, o = t.rects.popper, i = t.modifiersData.preventOverflow, a = Oe(t, {
    elementContext: "reference"
  }), l = Oe(t, {
    altBoundary: !0
  }), s = ct(a, n), f = ct(l, o, i), p = dt(s), h = dt(f);
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
const Pr = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Cr
};
function Er(e, t, r) {
  var n = V(e), o = [j, R].indexOf(n) >= 0 ? -1 : 1, i = typeof r == "function" ? r(Object.assign({}, t, {
    placement: e
  })) : r, a = i[0], l = i[1];
  return a = a || 0, l = (l || 0) * o, [j, N].indexOf(n) >= 0 ? {
    x: l,
    y: a
  } : {
    x: a,
    y: l
  };
}
function Sr(e) {
  var t = e.state, r = e.options, n = e.name, o = r.offset, i = o === void 0 ? [0, 0] : o, a = xt.reduce(function(p, h) {
    return p[h] = Er(h, t.rects, i), p;
  }, {}), l = a[t.placement], s = l.x, f = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += s, t.modifiersData.popperOffsets.y += f), t.modifiersData[n] = a;
}
const kr = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Sr
};
function Br(e) {
  var t = e.state, r = e.name;
  t.modifiersData[r] = kt({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const Dr = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Br,
  data: {}
};
function Ar(e) {
  return e === "x" ? "y" : "x";
}
function Rr(e) {
  var t = e.state, r = e.options, n = e.name, o = r.mainAxis, i = o === void 0 ? !0 : o, a = r.altAxis, l = a === void 0 ? !1 : a, s = r.boundary, f = r.rootBoundary, p = r.altBoundary, h = r.padding, y = r.tether, u = y === void 0 ? !0 : y, x = r.tetherOffset, m = x === void 0 ? 0 : x, v = Oe(t, {
    boundary: s,
    rootBoundary: f,
    padding: h,
    altBoundary: p
  }), w = V(t.placement), C = pe(t.placement), $ = !C, c = Ge(w), g = Ar(c), d = t.modifiersData.popperOffsets, O = t.rects.reference, E = t.rects.popper, S = typeof m == "function" ? m(Object.assign({}, t.rects, {
    placement: t.placement
  })) : m, k = typeof S == "number" ? {
    mainAxis: S,
    altAxis: S
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, S), b = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, D = {
    x: 0,
    y: 0
  };
  if (!!d) {
    if (i) {
      var A, G = c === "y" ? R : j, J = c === "y" ? I : N, z = c === "y" ? "height" : "width", L = d[c], Pe = L + v[G], K = L - v[J], Ee = u ? -E[z] / 2 : 0, Ie = C === ae ? O[z] : E[z], ue = C === ae ? -E[z] : -O[z], Se = t.elements.arrow, oe = u && Se ? Ue(Se) : {
        width: 0,
        height: 0
      }, X = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Ct(), ce = X[G], ke = X[J], Q = he(0, O[z], oe[z]), Ne = $ ? O[z] / 2 - Ee - Q - ce - k.mainAxis : Ie - Q - ce - k.mainAxis, At = $ ? -O[z] / 2 + Ee + Q + ke + k.mainAxis : ue + Q + ke + k.mainAxis, Me = t.elements.arrow && Ce(t.elements.arrow), Rt = Me ? c === "y" ? Me.clientTop || 0 : Me.clientLeft || 0 : 0, Ze = (A = b == null ? void 0 : b[c]) != null ? A : 0, jt = L + Ne - Ze - Rt, zt = L + At - Ze, _e = he(u ? je(Pe, jt) : Pe, L, u ? re(K, zt) : K);
      d[c] = _e, D[c] = _e - L;
    }
    if (l) {
      var et, Tt = c === "x" ? R : j, It = c === "x" ? I : N, Z = d[g], Be = g === "y" ? "height" : "width", tt = Z + v[Tt], rt = Z - v[It], Le = [R, j].indexOf(w) !== -1, nt = (et = b == null ? void 0 : b[g]) != null ? et : 0, ot = Le ? tt : Z - O[Be] - E[Be] - nt + k.altAxis, it = Le ? Z + O[Be] + E[Be] - nt - k.altAxis : rt, at = u && Le ? rr(ot, Z, it) : he(u ? ot : tt, Z, u ? it : rt);
      d[g] = at, D[g] = at - Z;
    }
    t.modifiersData[n] = D;
  }
}
const jr = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Rr,
  requiresIfExists: ["offset"]
};
function zr(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function Tr(e) {
  return e === M(e) || !T(e) ? Je(e) : zr(e);
}
function Ir(e) {
  var t = e.getBoundingClientRect(), r = se(t.width) / e.offsetWidth || 1, n = se(t.height) / e.offsetHeight || 1;
  return r !== 1 || n !== 1;
}
function Nr(e, t, r) {
  r === void 0 && (r = !1);
  var n = T(t), o = T(t) && Ir(t), i = U(t), a = le(e, o, r), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, s = {
    x: 0,
    y: 0
  };
  return (n || !n && !r) && ((H(t) !== "body" || Qe(i)) && (l = Tr(t)), T(t) ? (s = le(t, !0), s.x += t.clientLeft, s.y += t.clientTop) : i && (s.x = Ke(i))), {
    x: a.left + l.scrollLeft - s.x,
    y: a.top + l.scrollTop - s.y,
    width: a.width,
    height: a.height
  };
}
function Mr(e) {
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
function Lr(e) {
  var t = Mr(e);
  return qe.reduce(function(r, n) {
    return r.concat(t.filter(function(o) {
      return o.phase === n;
    }));
  }, []);
}
function Vr(e) {
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
var _ = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s', qr = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available', vt = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
function Fr(e) {
  e.forEach(function(t) {
    [].concat(Object.keys(t), vt).filter(function(r, n, o) {
      return o.indexOf(r) === n;
    }).forEach(function(r) {
      switch (r) {
        case "name":
          typeof t.name != "string" && console.error(Y(_, String(t.name), '"name"', '"string"', '"' + String(t.name) + '"'));
          break;
        case "enabled":
          typeof t.enabled != "boolean" && console.error(Y(_, t.name, '"enabled"', '"boolean"', '"' + String(t.enabled) + '"'));
          break;
        case "phase":
          qe.indexOf(t.phase) < 0 && console.error(Y(_, t.name, '"phase"', "either " + qe.join(", "), '"' + String(t.phase) + '"'));
          break;
        case "fn":
          typeof t.fn != "function" && console.error(Y(_, t.name, '"fn"', '"function"', '"' + String(t.fn) + '"'));
          break;
        case "effect":
          t.effect != null && typeof t.effect != "function" && console.error(Y(_, t.name, '"effect"', '"function"', '"' + String(t.fn) + '"'));
          break;
        case "requires":
          t.requires != null && !Array.isArray(t.requires) && console.error(Y(_, t.name, '"requires"', '"array"', '"' + String(t.requires) + '"'));
          break;
        case "requiresIfExists":
          Array.isArray(t.requiresIfExists) || console.error(Y(_, t.name, '"requiresIfExists"', '"array"', '"' + String(t.requiresIfExists) + '"'));
          break;
        case "options":
        case "data":
          break;
        default:
          console.error('PopperJS: an invalid property has been provided to the "' + t.name + '" modifier, valid properties are ' + vt.map(function(n) {
            return '"' + n + '"';
          }).join(", ") + '; but "' + r + '" was provided.');
      }
      t.requires && t.requires.forEach(function(n) {
        e.find(function(o) {
          return o.name === n;
        }) == null && console.error(Y(qr, String(t.name), n, n));
      });
    });
  });
}
function Wr(e, t) {
  var r = /* @__PURE__ */ new Set();
  return e.filter(function(n) {
    var o = t(n);
    if (!r.has(o))
      return r.add(o), !0;
  });
}
function Hr(e) {
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
var ht = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.", Xr = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.", mt = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function gt() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return !t.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function Yr(e) {
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
        m(), p.options = Object.assign({}, i, p.options, C), p.scrollParents = {
          reference: ne(l) ? me(l) : l.contextElement ? me(l.contextElement) : [],
          popper: me(s)
        };
        var $ = Lr(Hr([].concat(n, p.options.modifiers)));
        if (p.orderedModifiers = $.filter(function(b) {
          return b.enabled;
        }), process.env.NODE_ENV !== "production") {
          var c = Wr([].concat($, p.options.modifiers), function(b) {
            var D = b.name;
            return D;
          });
          if (Fr(c), V(p.options.placement) === ze) {
            var g = p.orderedModifiers.find(function(b) {
              var D = b.name;
              return D === "flip";
            });
            g || console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
          }
          var d = q(s), O = d.marginTop, E = d.marginRight, S = d.marginBottom, k = d.marginLeft;
          [O, E, S, k].some(function(b) {
            return parseFloat(b);
          }) && console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
        }
        return x(), u.update();
      },
      forceUpdate: function() {
        if (!y) {
          var w = p.elements, C = w.reference, $ = w.popper;
          if (!gt(C, $)) {
            process.env.NODE_ENV !== "production" && console.error(ht);
            return;
          }
          p.rects = {
            reference: Nr(C, Ce($), p.options.strategy === "fixed"),
            popper: Ue($)
          }, p.reset = !1, p.placement = p.options.placement, p.orderedModifiers.forEach(function(b) {
            return p.modifiersData[b.name] = Object.assign({}, b.data);
          });
          for (var c = 0, g = 0; g < p.orderedModifiers.length; g++) {
            if (process.env.NODE_ENV !== "production" && (c += 1, c > 100)) {
              console.error(Xr);
              break;
            }
            if (p.reset === !0) {
              p.reset = !1, g = -1;
              continue;
            }
            var d = p.orderedModifiers[g], O = d.fn, E = d.options, S = E === void 0 ? {} : E, k = d.name;
            typeof O == "function" && (p = O({
              state: p,
              options: S,
              name: k,
              instance: u
            }) || p);
          }
        }
      },
      update: Vr(function() {
        return new Promise(function(v) {
          u.forceUpdate(), v(p);
        });
      }),
      destroy: function() {
        m(), y = !0;
      }
    };
    if (!gt(l, s))
      return process.env.NODE_ENV !== "production" && console.error(ht), u;
    u.setOptions(f).then(function(v) {
      !y && f.onFirstUpdate && f.onFirstUpdate(v);
    });
    function x() {
      p.orderedModifiers.forEach(function(v) {
        var w = v.name, C = v.options, $ = C === void 0 ? {} : C, c = v.effect;
        if (typeof c == "function") {
          var g = c({
            state: p,
            name: w,
            instance: u,
            options: $
          }), d = function() {
          };
          h.push(g || d);
        }
      });
    }
    function m() {
      h.forEach(function(v) {
        return v();
      }), h = [];
    }
    return u;
  };
}
var Ur = [cr, Dr, fr, _t, kr, $r, jr, ar, Pr], Gr = /* @__PURE__ */ Yr({
  defaultModifiers: Ur
});
const Jr = {
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
      return this.size && !!this.size.match(
        new RegExp(`^${this.sizeableClassPrefix}`)
      );
    },
    sizeableClass() {
      return this.size ? !this.sizeableClassPrefix || this.hasSizeablePrefix ? this.size : `${this.sizeableClassPrefix}-${this.size}` : "";
    }
  }
}, Kr = {
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
      return this.variant && !!this.variant.match(
        new RegExp(`^${this.variantClassPrefix}`)
      );
    },
    variantClass() {
      return this.variant ? !this.variantClassPrefix || this.hasVariantPrefix ? this.variant : `${this.variantClassPrefix}-${this.variant}` : "";
    }
  }
}, Qr = {
  name: "Btn",
  mixins: [
    Jr,
    Kr
  ],
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
      return [
        "btn",
        this.variantClass,
        this.sizeableClass,
        this.active && "active",
        this.block && "btn-block",
        this.disabled && "disabled"
      ];
    },
    component() {
      return this.tag ? this.tag : this.$attrs.href ? "a" : "button";
    },
    variantClassPrefix() {
      return (this.variantPrefix || this.componentPrefix) + (this.outline ? "-outline" : "");
    }
  }
}, fe = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [n, o] of t)
    r[n] = o;
  return r;
};
function Zr(e, t, r, n, o, i) {
  return W(), ee(He(i.component), ge(e.$attrs, {
    disabled: r.disabled,
    class: i.classes,
    role: "button"
  }), {
    default: B(() => [
      P(e.$slots, "default", {}, () => [
        be(ye(r.label), 1)
      ])
    ]),
    _: 3
  }, 16, ["disabled", "class"]);
}
const _r = /* @__PURE__ */ fe(Qr, [["render", Zr]]), en = {
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
      return this.size && !!this.size.match(new RegExp(`^${this.sizeableClassPrefix}`));
    },
    sizeableClass() {
      return this.size ? !this.sizeableClassPrefix || this.hasSizeablePrefix ? this.size : `${this.sizeableClassPrefix}-${this.size}` : "";
    }
  }
}, tn = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [n, o] of t)
    r[n] = o;
  return r;
}, rn = {
  name: "BtnGroup",
  mixins: [en],
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
}, nn = ["data-toggle"];
function on(e, t, r, n, o, i) {
  return W(), Xe("div", {
    class: F(i.classes),
    "data-toggle": r.toggle ? "buttons" : !1,
    role: "group"
  }, [P(e.$slots, "default")], 10, nn);
}
const an = /* @__PURE__ */ tn(rn, [["render", on]]);
function Ve(e, t) {
  e.props.class = `${e.props.class || ""} ${t}`.trim();
}
function bt(e, t) {
  return (r) => {
    typeof t == "function" && t(r), r.cancelBubble || e(r);
  };
}
function yt(e, t) {
  return e.attrs.on[t] || e.type && e.type.listeners && e.componentOptions.listeners[t];
}
function sn(e) {
  return e && e.type && (e.type === "fragment" || typeof e.type == "symbol");
}
function Bt(e) {
  for (const t of e) {
    if (sn(t))
      return Bt(t.children);
    t.props = Object.assign({ class: void 0 }, t.props), t.attrs = Object.assign({}, t.attrs), t.attrs.on || (t.attrs.on = {});
    const r = t.props.class && t.props.class.match(/dropdown-item/), n = t.props.class && t.props.class.match(/dropdown-divider/);
    t.attrs.on.click = bt((o) => {
      context.parent.$emit("click-item", o, t);
    }, yt(t, "click")), t.attrs.on.blur = bt((o) => {
      context.parent.$emit("blur-item", o, t);
    }, yt(t, "blur")), typeof t.type == "string" && t.type.match(/^h\d$/) ? Ve(t, "dropdown-header") : t.type === "hr" && !n ? (t.type = "div", Ve(t, "dropdown-divider")) : !r && !n && Ve(t, "dropdown-item");
  }
  return e;
}
const ln = (e, t) => Nt("div", {}, Bt(t.slots.default())), pn = ln, fn = {
  name: "DropdownMenu",
  components: {
    DropdownMenuItems: pn
  },
  props: {
    align: {
      type: String,
      default: "left",
      validate(e) {
        return ["left", "right"].indexOf(e.toLowerCase()) !== -1;
      }
    },
    show: Boolean
  }
}, un = ["aria-labelledby"];
function cn(e, t, r, n, o, i) {
  const a = te("dropdown-menu-items");
  return W(), Xe("div", {
    class: F(["dropdown-menu", {
      "dropdown-menu-left": r.align === "left",
      "dropdown-menu-right": r.align === "right",
      show: r.show
    }]),
    "aria-labelledby": e.$attrs.id
  }, [
    we(a, null, {
      default: B(() => [
        P(e.$slots, "default", {
          onClick: t[0] || (t[0] = (...l) => e.onItemClick && e.onItemClick(...l))
        })
      ]),
      _: 3
    })
  ], 10, un);
}
const dn = /* @__PURE__ */ fe(fn, [["render", cn]]), vn = {
  props: {
    expanded: {
      type: Boolean,
      default: !1
    },
    id: String,
    href: String,
    to: [String, Object]
  },
  computed: {
    is() {
      return this.to ? "router-link" : this.href ? "a" : "button";
    }
  }
};
function hn(e, t, r, n, o, i) {
  return W(), ee(He(i.is), ge({ id: r.id }, r.to ? { to: r.to } : { href: r.href }, {
    "aria-haspopup": "true",
    "aria-expanded": r.expanded,
    type: i.is === "button" ? "button" : void 0
  }), {
    default: B(() => [
      P(e.$slots, "default")
    ]),
    _: 3
  }, 16, ["id", "aria-expanded", "type"]);
}
const mn = /* @__PURE__ */ fe(vn, [["render", hn]]), Dt = {
  components: {
    BtnDropdownAction: mn,
    BtnGroup: an,
    DropdownMenu: dn
  },
  extends: _r,
  props: {
    align: {
      type: String,
      default: "left",
      validate(e) {
        return ["left", "right"].indexOf(e.toLowerCase()) !== -1;
      }
    },
    animated: {
      type: Boolean,
      default: !0
    },
    buttonClass: [Object, String],
    caret: {
      type: Boolean,
      default: !0
    },
    dropup: {
      type: Boolean,
      default: !1
    },
    dropright: {
      type: Boolean,
      default: !1
    },
    dropleft: {
      type: Boolean,
      default: !1
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
      default: !1
    },
    split: {
      type: Boolean,
      default: !1
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
      triggerAnimation: !1,
      expanded: !1
    };
  },
  computed: {
    scope() {
      return {
        placement: this.placement,
        variantClassPrefix: this.variantClassPrefix,
        sizeableClassPrefix: this.sizeableClassPrefix,
        classes: this.classes,
        actionClasses: this.actionClasses,
        toggleStyle: this.toggleStyle,
        toggleClasses: this.toggleClasses,
        focus: this.focus,
        queryFocusable: this.queryFocusable,
        isFocusable: this.isFocusable,
        toggle: this.toggle,
        show: this.show,
        hide: this.hide,
        onBlur: this.onBlur,
        onClickItem: this.onClickItem,
        onClickToggle: this.onClickToggle
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
  beforeDestroy() {
    this.popper && this.popper.destroy();
  },
  methods: {
    focus() {
      this.$el.querySelector(".dropdown-toggle").focus();
    },
    queryFocusable() {
      return this.$el.querySelector(".dropdown-menu").querySelectorAll('label, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    },
    isFocusable(e) {
      const t = this.queryFocusable();
      for (let r in t)
        if (e === t[r])
          return !0;
      return !1;
    },
    toggle(e) {
      this.expanded ? this.hide() : this.show();
    },
    show() {
      this.expanded = !0;
      const e = this.$refs.split && this.$refs.split.$el || this.$el;
      !this.nav && !this.popper ? this.popper = Gr(e, this.$refs.menu.$el, {
        placement: `${this.placement}-${this.align === "left" ? "start" : "end"}`,
        onFirstUpdate: () => {
          this.triggerAnimation = this.animated;
        },
        modifiers: [{
          name: "offset",
          options: {
            offset: [0, this.nav ? 1 : this.offset]
          }
        }]
      }) : this.popper && this.popper.update();
    },
    hide() {
      this.expanded = !1;
    },
    onBlur(e) {
      this.$el.contains(e.relatedTarget) || this.hide();
    },
    onClickItem(e) {
      this.isFocusable(e.target) || this.hide();
    },
    onClickToggle(e) {
      e.target.focus(), this.$emit("click-toggle", e), e.defaultPrevented || this.toggle();
    }
  },
  watch: {
    expanded(e) {
      this.$nextTick(() => {
        this.$emit(e ? "show" : "hide"), this.$emit("toggle", e);
      });
    }
  }
}, gn = {
  mixins: [
    Dt
  ]
}, bn = ["id", "aria-expanded"];
function yn(e, t, r, n, o, i) {
  const a = te("btn-dropdown-action"), l = te("dropdown-menu"), s = te("btn-group");
  return W(), ee(s, {
    class: F([e.classes, "btn-dropdown-split"]),
    onClick: e.onClick
  }, {
    default: B(() => [
      e.dropleft ? de("", !0) : P(e.$slots, "button", ie(ge({ key: 0 }, e.scope)), () => [
        e.dropleft ? de("", !0) : (W(), ee(a, {
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
          P(e.$slots, "split", ie(Re(e.scope)), () => [
            e.split ? (W(), Xe("button", {
              key: 0,
              id: e.$attrs.id,
              type: "button",
              "aria-haspopup": "true",
              "aria-expanded": e.expanded,
              class: F(e.toggleClasses),
              onBlur: t[1] || (t[1] = (...f) => e.onBlur && e.onBlur(...f)),
              onClick: t[2] || (t[2] = (...f) => e.onClickToggle && e.onClickToggle(...f))
            }, null, 42, bn)) : de("", !0)
          ]),
          we(l, {
            id: e.$attrs.id,
            ref: "menu",
            align: e.align,
            show: e.expanded,
            class: F({ animated: e.triggerAnimation }),
            onClickItem: e.onClickItem,
            onBlurItem: e.onBlur
          }, {
            default: B(() => [
              P(e.$slots, "default")
            ]),
            _: 3
          }, 8, ["id", "align", "show", "class", "onClickItem", "onBlurItem"])
        ]),
        _: 3
      }, 512),
      e.dropleft ? P(e.$slots, "button", ie(ge({ key: 1 }, e.scope)), () => [
        e.dropleft ? (W(), ee(a, {
          key: 0,
          id: e.$attrs.id,
          ref: "button",
          expanded: e.expanded,
          href: e.href,
          to: e.to,
          class: F(e.actionClasses),
          onClick: t[3] || (t[3] = (f) => e.$emit("click", f))
        }, {
          default: B(() => [
            P(e.$slots, "icon"),
            P(e.$slots, "label", {}, () => [
              be(ye(e.label), 1)
            ])
          ]),
          _: 3
        }, 8, ["id", "expanded", "href", "to", "class"])) : de("", !0)
      ]) : de("", !0)
    ]),
    _: 3
  }, 8, ["class", "onClick"]);
}
const wn = /* @__PURE__ */ fe(gn, [["render", yn]]), xn = {
  mixins: [
    Dt
  ]
};
function On(e, t, r, n, o, i) {
  const a = te("btn-dropdown-action"), l = te("dropdown-menu"), s = te("btn-group");
  return W(), ee(s, {
    class: F(e.classes)
  }, {
    default: B(() => [
      P(e.$slots, "button", ie(Re(e.scope)), () => [
        we(a, {
          id: e.$attrs.id,
          ref: "button",
          expanded: e.expanded,
          href: e.href,
          to: e.to,
          style: Mt(e.toggleStyle),
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
        onBlurItem: e.onBlur,
        onClickItem: e.onClickItem
      }, {
        default: B(() => [
          P(e.$slots, "default")
        ]),
        _: 3
      }, 8, ["id", "align", "show", "class", "onBlurItem", "onClickItem"])
    ]),
    _: 3
  }, 8, ["class"]);
}
const $n = /* @__PURE__ */ fe(xn, [["render", On]]);
const Cn = {
  name: "BtnDropdown",
  components: {
    BtnDropdownSplit: wn,
    BtnDropdownSingle: $n
  },
  inheritAttrs: !1
};
function Pn(e, t, r, n, o, i) {
  return W(), ee(He(e.$attrs.split === void 0 || !!e.$attrs.nav ? "btn-dropdown-single" : "btn-dropdown-split"), ge({ class: "btn-dropdown" }, e.$attrs, {
    onClick: t[0] || (t[0] = (...a) => this.$emit("click", ...a)),
    onClickToggle: t[1] || (t[1] = (...a) => this.$emit("click-toggle", ...a)),
    onDropdown: t[2] || (t[2] = (...a) => this.$emit("dropdown", ...a)),
    onShow: t[3] || (t[3] = (...a) => this.$emit("show", ...a)),
    onHide: t[4] || (t[4] = (...a) => this.$emit("hide", ...a)),
    onToggle: t[5] || (t[5] = (...a) => this.$emit("toggle", ...a))
  }), Lt({
    icon: B(() => [
      P(e.$slots, "icon")
    ]),
    button: B((a) => [
      P(e.$slots, "button", ie(Re(a)))
    ]),
    split: B((a) => [
      P(e.$slots, "split", ie(Re(a)))
    ]),
    default: B(() => [
      P(e.$slots, "default")
    ]),
    _: 2
  }, [
    e.$attrs.label || this.$slots.label ? {
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
const Sn = /* @__PURE__ */ fe(Cn, [["render", Pn]]);
export {
  Sn as BtnDropdown
};
