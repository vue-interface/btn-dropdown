(function(G,i){typeof exports=="object"&&typeof module<"u"?i(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],i):(G=typeof globalThis<"u"?globalThis:G||self,i(G.BtnDropdown={},G.Vue))})(this,function(G,i){"use strict";var A="top",j="bottom",N="right",z="left",he="auto",ie=[A,j,N,z],ee="start",ae="end",vt="clippingParents",Le="viewport",se="popper",gt="reference",Ie=ie.reduce(function(e,t){return e.concat([t+"-"+ee,t+"-"+ae])},[]),qe=[].concat(ie,[he]).reduce(function(e,t){return e.concat([t,t+"-"+ee,t+"-"+ae])},[]),bt="beforeRead",yt="read",wt="afterRead",Ct="beforeMain",xt="main",Ot="afterMain",$t="beforeWrite",St="write",Pt="afterWrite",Se=[bt,yt,wt,Ct,xt,Ot,$t,St,Pt];function q(e){return e?(e.nodeName||"").toLowerCase():null}function V(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function U(e){var t=V(e).Element;return e instanceof t||e instanceof Element}function R(e){var t=V(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function Pe(e){if(typeof ShadowRoot>"u")return!1;var t=V(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Bt(e){var t=e.state;Object.keys(t.elements).forEach(function(r){var n=t.styles[r]||{},o=t.attributes[r]||{},a=t.elements[r];!R(a)||!q(a)||(Object.assign(a.style,n),Object.keys(o).forEach(function(s){var p=o[s];p===!1?a.removeAttribute(s):a.setAttribute(s,p===!0?"":p)}))})}function kt(e){var t=e.state,r={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,r.popper),t.styles=r,t.elements.arrow&&Object.assign(t.elements.arrow.style,r.arrow),function(){Object.keys(t.elements).forEach(function(n){var o=t.elements[n],a=t.attributes[n]||{},s=Object.keys(t.styles.hasOwnProperty(n)?t.styles[n]:r[n]),p=s.reduce(function(l,d){return l[d]="",l},{});!R(o)||!q(o)||(Object.assign(o.style,p),Object.keys(a).forEach(function(l){o.removeAttribute(l)}))})}}const Et={name:"applyStyles",enabled:!0,phase:"write",fn:Bt,effect:kt,requires:["computeStyles"]};function M(e){return e.split("-")[0]}var X=Math.max,me=Math.min,te=Math.round;function Be(){var e=navigator.userAgentData;return e!=null&&e.brands?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function Fe(){return!/^((?!chrome|android).)*safari/i.test(Be())}function re(e,t,r){t===void 0&&(t=!1),r===void 0&&(r=!1);var n=e.getBoundingClientRect(),o=1,a=1;t&&R(e)&&(o=e.offsetWidth>0&&te(n.width)/e.offsetWidth||1,a=e.offsetHeight>0&&te(n.height)/e.offsetHeight||1);var s=U(e)?V(e):window,p=s.visualViewport,l=!Fe()&&r,d=(n.left+(l&&p?p.offsetLeft:0))/o,f=(n.top+(l&&p?p.offsetTop:0))/a,v=n.width/o,w=n.height/a;return{width:v,height:w,top:f,right:d+v,bottom:f+w,left:d,x:d,y:f}}function ke(e){var t=re(e),r=e.offsetWidth,n=e.offsetHeight;return Math.abs(t.width-r)<=1&&(r=t.width),Math.abs(t.height-n)<=1&&(n=t.height),{x:e.offsetLeft,y:e.offsetTop,width:r,height:n}}function We(e,t){var r=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(r&&Pe(r)){var n=t;do{if(n&&e.isSameNode(n))return!0;n=n.parentNode||n.host}while(n)}return!1}function L(e){return V(e).getComputedStyle(e)}function Dt(e){return["table","td","th"].indexOf(q(e))>=0}function F(e){return((U(e)?e.ownerDocument:e.document)||window.document).documentElement}function ve(e){return q(e)==="html"?e:e.assignedSlot||e.parentNode||(Pe(e)?e.host:null)||F(e)}function He(e){return!R(e)||L(e).position==="fixed"?null:e.offsetParent}function At(e){var t=/firefox/i.test(Be()),r=/Trident/i.test(Be());if(r&&R(e)){var n=L(e);if(n.position==="fixed")return null}var o=ve(e);for(Pe(o)&&(o=o.host);R(o)&&["html","body"].indexOf(q(o))<0;){var a=L(o);if(a.transform!=="none"||a.perspective!=="none"||a.contain==="paint"||["transform","perspective"].indexOf(a.willChange)!==-1||t&&a.willChange==="filter"||t&&a.filter&&a.filter!=="none")return o;o=o.parentNode}return null}function le(e){for(var t=V(e),r=He(e);r&&Dt(r)&&L(r).position==="static";)r=He(r);return r&&(q(r)==="html"||q(r)==="body"&&L(r).position==="static")?t:r||At(e)||t}function Ee(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function pe(e,t,r){return X(e,me(t,r))}function zt(e,t,r){var n=pe(e,t,r);return n>r?r:n}function Ge(){return{top:0,right:0,bottom:0,left:0}}function Ue(e){return Object.assign({},Ge(),e)}function Xe(e,t){return t.reduce(function(r,n){return r[n]=e,r},{})}var Rt=function(t,r){return t=typeof t=="function"?t(Object.assign({},r.rects,{placement:r.placement})):t,Ue(typeof t!="number"?t:Xe(t,ie))};function Tt(e){var t,r=e.state,n=e.name,o=e.options,a=r.elements.arrow,s=r.modifiersData.popperOffsets,p=M(r.placement),l=Ee(p),d=[z,N].indexOf(p)>=0,f=d?"height":"width";if(!(!a||!s)){var v=Rt(o.padding,r),w=ke(a),c=l==="y"?A:z,x=l==="y"?j:N,g=r.rects.reference[f]+r.rects.reference[l]-s[l]-r.rects.popper[f],m=s[l]-r.rects.reference[l],C=le(a),S=C?l==="y"?C.clientHeight||0:C.clientWidth||0:0,$=g/2-m/2,u=v[c],b=S-w[f]-v[x],h=S/2-w[f]/2+$,O=pe(u,h,b),P=l;r.modifiersData[n]=(t={},t[P]=O,t.centerOffset=O-h,t)}}function jt(e){var t=e.state,r=e.options,n=r.element,o=n===void 0?"[data-popper-arrow]":n;if(o!=null&&!(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o))){if(process.env.NODE_ENV!=="production"&&(R(o)||console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).',"To use an SVG arrow, wrap it in an HTMLElement that will be used as","the arrow."].join(" "))),!We(t.elements.popper,o)){process.env.NODE_ENV!=="production"&&console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper',"element."].join(" "));return}t.elements.arrow=o}}const Nt={name:"arrow",enabled:!0,phase:"main",fn:Tt,effect:jt,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function ne(e){return e.split("-")[1]}var Vt={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Mt(e){var t=e.x,r=e.y,n=window,o=n.devicePixelRatio||1;return{x:te(t*o)/o||0,y:te(r*o)/o||0}}function Ye(e){var t,r=e.popper,n=e.popperRect,o=e.placement,a=e.variation,s=e.offsets,p=e.position,l=e.gpuAcceleration,d=e.adaptive,f=e.roundOffsets,v=e.isFixed,w=s.x,c=w===void 0?0:w,x=s.y,g=x===void 0?0:x,m=typeof f=="function"?f({x:c,y:g}):{x:c,y:g};c=m.x,g=m.y;var C=s.hasOwnProperty("x"),S=s.hasOwnProperty("y"),$=z,u=A,b=window;if(d){var h=le(r),O="clientHeight",P="clientWidth";if(h===V(r)&&(h=F(r),L(h).position!=="static"&&p==="absolute"&&(O="scrollHeight",P="scrollWidth")),h=h,o===A||(o===z||o===N)&&a===ae){u=j;var B=v&&h===b&&b.visualViewport?b.visualViewport.height:h[O];g-=B-n.height,g*=l?1:-1}if(o===z||(o===A||o===j)&&a===ae){$=N;var k=v&&h===b&&b.visualViewport?b.visualViewport.width:h[P];c-=k-n.width,c*=l?1:-1}}var y=Object.assign({position:p},d&&Vt),E=f===!0?Mt({x:c,y:g}):{x:c,y:g};if(c=E.x,g=E.y,l){var D;return Object.assign({},y,(D={},D[u]=S?"0":"",D[$]=C?"0":"",D.transform=(b.devicePixelRatio||1)<=1?"translate("+c+"px, "+g+"px)":"translate3d("+c+"px, "+g+"px, 0)",D))}return Object.assign({},y,(t={},t[u]=S?g+"px":"",t[$]=C?c+"px":"",t.transform="",t))}function Lt(e){var t=e.state,r=e.options,n=r.gpuAcceleration,o=n===void 0?!0:n,a=r.adaptive,s=a===void 0?!0:a,p=r.roundOffsets,l=p===void 0?!0:p;if(process.env.NODE_ENV!=="production"){var d=L(t.elements.popper).transitionProperty||"";s&&["transform","top","right","bottom","left"].some(function(v){return d.indexOf(v)>=0})&&console.warn(["Popper: Detected CSS transitions on at least one of the following",'CSS properties: "transform", "top", "right", "bottom", "left".',`

`,'Disable the "computeStyles" modifier\'s `adaptive` option to allow',"for smooth transitions, or remove these properties from the CSS","transition declaration on the popper element if only transitioning","opacity or background-color for example.",`

`,"We recommend using the popper element as a wrapper around an inner","element that can have any CSS property transitioned for animations."].join(" "))}var f={placement:M(t.placement),variation:ne(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,Ye(Object.assign({},f,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:s,roundOffsets:l})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,Ye(Object.assign({},f,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:l})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const It={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:Lt,data:{}};var ge={passive:!0};function qt(e){var t=e.state,r=e.instance,n=e.options,o=n.scroll,a=o===void 0?!0:o,s=n.resize,p=s===void 0?!0:s,l=V(t.elements.popper),d=[].concat(t.scrollParents.reference,t.scrollParents.popper);return a&&d.forEach(function(f){f.addEventListener("scroll",r.update,ge)}),p&&l.addEventListener("resize",r.update,ge),function(){a&&d.forEach(function(f){f.removeEventListener("scroll",r.update,ge)}),p&&l.removeEventListener("resize",r.update,ge)}}const Ft={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:qt,data:{}};var Wt={left:"right",right:"left",bottom:"top",top:"bottom"};function be(e){return e.replace(/left|right|bottom|top/g,function(t){return Wt[t]})}var Ht={start:"end",end:"start"};function Ke(e){return e.replace(/start|end/g,function(t){return Ht[t]})}function De(e){var t=V(e),r=t.pageXOffset,n=t.pageYOffset;return{scrollLeft:r,scrollTop:n}}function Ae(e){return re(F(e)).left+De(e).scrollLeft}function Gt(e,t){var r=V(e),n=F(e),o=r.visualViewport,a=n.clientWidth,s=n.clientHeight,p=0,l=0;if(o){a=o.width,s=o.height;var d=Fe();(d||!d&&t==="fixed")&&(p=o.offsetLeft,l=o.offsetTop)}return{width:a,height:s,x:p+Ae(e),y:l}}function Ut(e){var t,r=F(e),n=De(e),o=(t=e.ownerDocument)==null?void 0:t.body,a=X(r.scrollWidth,r.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=X(r.scrollHeight,r.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),p=-n.scrollLeft+Ae(e),l=-n.scrollTop;return L(o||r).direction==="rtl"&&(p+=X(r.clientWidth,o?o.clientWidth:0)-a),{width:a,height:s,x:p,y:l}}function ze(e){var t=L(e),r=t.overflow,n=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(r+o+n)}function Je(e){return["html","body","#document"].indexOf(q(e))>=0?e.ownerDocument.body:R(e)&&ze(e)?e:Je(ve(e))}function fe(e,t){var r;t===void 0&&(t=[]);var n=Je(e),o=n===((r=e.ownerDocument)==null?void 0:r.body),a=V(n),s=o?[a].concat(a.visualViewport||[],ze(n)?n:[]):n,p=t.concat(s);return o?p:p.concat(fe(ve(s)))}function Re(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function Xt(e,t){var r=re(e,!1,t==="fixed");return r.top=r.top+e.clientTop,r.left=r.left+e.clientLeft,r.bottom=r.top+e.clientHeight,r.right=r.left+e.clientWidth,r.width=e.clientWidth,r.height=e.clientHeight,r.x=r.left,r.y=r.top,r}function Qe(e,t,r){return t===Le?Re(Gt(e,r)):U(t)?Xt(t,r):Re(Ut(F(e)))}function Yt(e){var t=fe(ve(e)),r=["absolute","fixed"].indexOf(L(e).position)>=0,n=r&&R(e)?le(e):e;return U(n)?t.filter(function(o){return U(o)&&We(o,n)&&q(o)!=="body"}):[]}function Kt(e,t,r,n){var o=t==="clippingParents"?Yt(e):[].concat(t),a=[].concat(o,[r]),s=a[0],p=a.reduce(function(l,d){var f=Qe(e,d,n);return l.top=X(f.top,l.top),l.right=me(f.right,l.right),l.bottom=me(f.bottom,l.bottom),l.left=X(f.left,l.left),l},Qe(e,s,n));return p.width=p.right-p.left,p.height=p.bottom-p.top,p.x=p.left,p.y=p.top,p}function Ze(e){var t=e.reference,r=e.element,n=e.placement,o=n?M(n):null,a=n?ne(n):null,s=t.x+t.width/2-r.width/2,p=t.y+t.height/2-r.height/2,l;switch(o){case A:l={x:s,y:t.y-r.height};break;case j:l={x:s,y:t.y+t.height};break;case N:l={x:t.x+t.width,y:p};break;case z:l={x:t.x-r.width,y:p};break;default:l={x:t.x,y:t.y}}var d=o?Ee(o):null;if(d!=null){var f=d==="y"?"height":"width";switch(a){case ee:l[d]=l[d]-(t[f]/2-r[f]/2);break;case ae:l[d]=l[d]+(t[f]/2-r[f]/2);break}}return l}function de(e,t){t===void 0&&(t={});var r=t,n=r.placement,o=n===void 0?e.placement:n,a=r.strategy,s=a===void 0?e.strategy:a,p=r.boundary,l=p===void 0?vt:p,d=r.rootBoundary,f=d===void 0?Le:d,v=r.elementContext,w=v===void 0?se:v,c=r.altBoundary,x=c===void 0?!1:c,g=r.padding,m=g===void 0?0:g,C=Ue(typeof m!="number"?m:Xe(m,ie)),S=w===se?gt:se,$=e.rects.popper,u=e.elements[x?S:w],b=Kt(U(u)?u:u.contextElement||F(e.elements.popper),l,f,s),h=re(e.elements.reference),O=Ze({reference:h,element:$,strategy:"absolute",placement:o}),P=Re(Object.assign({},$,O)),B=w===se?P:h,k={top:b.top-B.top+C.top,bottom:B.bottom-b.bottom+C.bottom,left:b.left-B.left+C.left,right:B.right-b.right+C.right},y=e.modifiersData.offset;if(w===se&&y){var E=y[o];Object.keys(k).forEach(function(D){var K=[N,j].indexOf(D)>=0?1:-1,J=[A,j].indexOf(D)>=0?"y":"x";k[D]+=E[J]*K})}return k}function Jt(e,t){t===void 0&&(t={});var r=t,n=r.placement,o=r.boundary,a=r.rootBoundary,s=r.padding,p=r.flipVariations,l=r.allowedAutoPlacements,d=l===void 0?qe:l,f=ne(n),v=f?p?Ie:Ie.filter(function(x){return ne(x)===f}):ie,w=v.filter(function(x){return d.indexOf(x)>=0});w.length===0&&(w=v,process.env.NODE_ENV!=="production"&&console.error(["Popper: The `allowedAutoPlacements` option did not allow any","placements. Ensure the `placement` option matches the variation","of the allowed placements.",'For example, "auto" cannot be used to allow "bottom-start".','Use "auto-start" instead.'].join(" ")));var c=w.reduce(function(x,g){return x[g]=de(e,{placement:g,boundary:o,rootBoundary:a,padding:s})[M(g)],x},{});return Object.keys(c).sort(function(x,g){return c[x]-c[g]})}function Qt(e){if(M(e)===he)return[];var t=be(e);return[Ke(e),t,Ke(t)]}function Zt(e){var t=e.state,r=e.options,n=e.name;if(!t.modifiersData[n]._skip){for(var o=r.mainAxis,a=o===void 0?!0:o,s=r.altAxis,p=s===void 0?!0:s,l=r.fallbackPlacements,d=r.padding,f=r.boundary,v=r.rootBoundary,w=r.altBoundary,c=r.flipVariations,x=c===void 0?!0:c,g=r.allowedAutoPlacements,m=t.options.placement,C=M(m),S=C===m,$=l||(S||!x?[be(m)]:Qt(m)),u=[m].concat($).reduce(function(oe,H){return oe.concat(M(H)===he?Jt(t,{placement:H,boundary:f,rootBoundary:v,padding:d,flipVariations:x,allowedAutoPlacements:g}):H)},[]),b=t.rects.reference,h=t.rects.popper,O=new Map,P=!0,B=u[0],k=0;k<u.length;k++){var y=u[k],E=M(y),D=ne(y)===ee,K=[A,j].indexOf(E)>=0,J=K?"width":"height",T=de(t,{placement:y,boundary:f,rootBoundary:v,altBoundary:w,padding:d}),I=K?D?N:z:D?j:A;b[J]>h[J]&&(I=be(I));var we=be(I),Q=[];if(a&&Q.push(T[E]<=0),p&&Q.push(T[I]<=0,T[we]<=0),Q.every(function(oe){return oe})){B=y,P=!1;break}O.set(y,Q)}if(P)for(var Ce=x?3:1,je=function(H){var ue=u.find(function(Oe){var Z=O.get(Oe);if(Z)return Z.slice(0,H).every(function(Ne){return Ne})});if(ue)return B=ue,"break"},ce=Ce;ce>0;ce--){var xe=je(ce);if(xe==="break")break}t.placement!==B&&(t.modifiersData[n]._skip=!0,t.placement=B,t.reset=!0)}}const _t={name:"flip",enabled:!0,phase:"main",fn:Zt,requiresIfExists:["offset"],data:{_skip:!1}};function _e(e,t,r){return r===void 0&&(r={x:0,y:0}),{top:e.top-t.height-r.y,right:e.right-t.width+r.x,bottom:e.bottom-t.height+r.y,left:e.left-t.width-r.x}}function et(e){return[A,N,j,z].some(function(t){return e[t]>=0})}function er(e){var t=e.state,r=e.name,n=t.rects.reference,o=t.rects.popper,a=t.modifiersData.preventOverflow,s=de(t,{elementContext:"reference"}),p=de(t,{altBoundary:!0}),l=_e(s,n),d=_e(p,o,a),f=et(l),v=et(d);t.modifiersData[r]={referenceClippingOffsets:l,popperEscapeOffsets:d,isReferenceHidden:f,hasPopperEscaped:v},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":f,"data-popper-escaped":v})}const tr={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:er};function rr(e,t,r){var n=M(e),o=[z,A].indexOf(n)>=0?-1:1,a=typeof r=="function"?r(Object.assign({},t,{placement:e})):r,s=a[0],p=a[1];return s=s||0,p=(p||0)*o,[z,N].indexOf(n)>=0?{x:p,y:s}:{x:s,y:p}}function nr(e){var t=e.state,r=e.options,n=e.name,o=r.offset,a=o===void 0?[0,0]:o,s=qe.reduce(function(f,v){return f[v]=rr(v,t.rects,a),f},{}),p=s[t.placement],l=p.x,d=p.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=l,t.modifiersData.popperOffsets.y+=d),t.modifiersData[n]=s}const or={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:nr};function ir(e){var t=e.state,r=e.name;t.modifiersData[r]=Ze({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const ar={name:"popperOffsets",enabled:!0,phase:"read",fn:ir,data:{}};function sr(e){return e==="x"?"y":"x"}function lr(e){var t=e.state,r=e.options,n=e.name,o=r.mainAxis,a=o===void 0?!0:o,s=r.altAxis,p=s===void 0?!1:s,l=r.boundary,d=r.rootBoundary,f=r.altBoundary,v=r.padding,w=r.tether,c=w===void 0?!0:w,x=r.tetherOffset,g=x===void 0?0:x,m=de(t,{boundary:l,rootBoundary:d,padding:v,altBoundary:f}),C=M(t.placement),S=ne(t.placement),$=!S,u=Ee(C),b=sr(u),h=t.modifiersData.popperOffsets,O=t.rects.reference,P=t.rects.popper,B=typeof g=="function"?g(Object.assign({},t.rects,{placement:t.placement})):g,k=typeof B=="number"?{mainAxis:B,altAxis:B}:Object.assign({mainAxis:0,altAxis:0},B),y=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,E={x:0,y:0};if(h){if(a){var D,K=u==="y"?A:z,J=u==="y"?j:N,T=u==="y"?"height":"width",I=h[u],we=I+m[K],Q=I-m[J],Ce=c?-P[T]/2:0,je=S===ee?O[T]:P[T],ce=S===ee?-P[T]:-O[T],xe=t.elements.arrow,oe=c&&xe?ke(xe):{width:0,height:0},H=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Ge(),ue=H[K],Oe=H[J],Z=pe(0,O[T],oe[T]),Ne=$?O[T]/2-Ce-Z-ue-k.mainAxis:je-Z-ue-k.mainAxis,rn=$?-O[T]/2+Ce+Z+Oe+k.mainAxis:ce+Z+Oe+k.mainAxis,Ve=t.elements.arrow&&le(t.elements.arrow),nn=Ve?u==="y"?Ve.clientTop||0:Ve.clientLeft||0:0,st=(D=y==null?void 0:y[u])!=null?D:0,on=I+Ne-st-nn,an=I+rn-st,lt=pe(c?me(we,on):we,I,c?X(Q,an):Q);h[u]=lt,E[u]=lt-I}if(p){var pt,sn=u==="x"?A:z,ln=u==="x"?j:N,_=h[b],$e=b==="y"?"height":"width",ft=_+m[sn],dt=_-m[ln],Me=[A,z].indexOf(C)!==-1,ct=(pt=y==null?void 0:y[b])!=null?pt:0,ut=Me?ft:_-O[$e]-P[$e]-ct+k.altAxis,ht=Me?_+O[$e]+P[$e]-ct-k.altAxis:dt,mt=c&&Me?zt(ut,_,ht):pe(c?ut:ft,_,c?ht:dt);h[b]=mt,E[b]=mt-_}t.modifiersData[n]=E}}const pr={name:"preventOverflow",enabled:!0,phase:"main",fn:lr,requiresIfExists:["offset"]};function fr(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function dr(e){return e===V(e)||!R(e)?De(e):fr(e)}function cr(e){var t=e.getBoundingClientRect(),r=te(t.width)/e.offsetWidth||1,n=te(t.height)/e.offsetHeight||1;return r!==1||n!==1}function ur(e,t,r){r===void 0&&(r=!1);var n=R(t),o=R(t)&&cr(t),a=F(t),s=re(e,o,r),p={scrollLeft:0,scrollTop:0},l={x:0,y:0};return(n||!n&&!r)&&((q(t)!=="body"||ze(a))&&(p=dr(t)),R(t)?(l=re(t,!0),l.x+=t.clientLeft,l.y+=t.clientTop):a&&(l.x=Ae(a))),{x:s.left+p.scrollLeft-l.x,y:s.top+p.scrollTop-l.y,width:s.width,height:s.height}}function hr(e){var t=new Map,r=new Set,n=[];e.forEach(function(a){t.set(a.name,a)});function o(a){r.add(a.name);var s=[].concat(a.requires||[],a.requiresIfExists||[]);s.forEach(function(p){if(!r.has(p)){var l=t.get(p);l&&o(l)}}),n.push(a)}return e.forEach(function(a){r.has(a.name)||o(a)}),n}function mr(e){var t=hr(e);return Se.reduce(function(r,n){return r.concat(t.filter(function(o){return o.phase===n}))},[])}function vr(e){var t;return function(){return t||(t=new Promise(function(r){Promise.resolve().then(function(){t=void 0,r(e())})})),t}}function W(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];return[].concat(r).reduce(function(o,a){return o.replace(/%s/,a)},e)}var Y='Popper: modifier "%s" provided an invalid %s property, expected %s but got %s',gr='Popper: modifier "%s" requires "%s", but "%s" modifier is not available',tt=["name","enabled","phase","fn","effect","requires","options"];function br(e){e.forEach(function(t){[].concat(Object.keys(t),tt).filter(function(r,n,o){return o.indexOf(r)===n}).forEach(function(r){switch(r){case"name":typeof t.name!="string"&&console.error(W(Y,String(t.name),'"name"','"string"','"'+String(t.name)+'"'));break;case"enabled":typeof t.enabled!="boolean"&&console.error(W(Y,t.name,'"enabled"','"boolean"','"'+String(t.enabled)+'"'));break;case"phase":Se.indexOf(t.phase)<0&&console.error(W(Y,t.name,'"phase"',"either "+Se.join(", "),'"'+String(t.phase)+'"'));break;case"fn":typeof t.fn!="function"&&console.error(W(Y,t.name,'"fn"','"function"','"'+String(t.fn)+'"'));break;case"effect":t.effect!=null&&typeof t.effect!="function"&&console.error(W(Y,t.name,'"effect"','"function"','"'+String(t.fn)+'"'));break;case"requires":t.requires!=null&&!Array.isArray(t.requires)&&console.error(W(Y,t.name,'"requires"','"array"','"'+String(t.requires)+'"'));break;case"requiresIfExists":Array.isArray(t.requiresIfExists)||console.error(W(Y,t.name,'"requiresIfExists"','"array"','"'+String(t.requiresIfExists)+'"'));break;case"options":case"data":break;default:console.error('PopperJS: an invalid property has been provided to the "'+t.name+'" modifier, valid properties are '+tt.map(function(n){return'"'+n+'"'}).join(", ")+'; but "'+r+'" was provided.')}t.requires&&t.requires.forEach(function(n){e.find(function(o){return o.name===n})==null&&console.error(W(gr,String(t.name),n,n))})})})}function yr(e,t){var r=new Set;return e.filter(function(n){var o=t(n);if(!r.has(o))return r.add(o),!0})}function wr(e){var t=e.reduce(function(r,n){var o=r[n.name];return r[n.name]=o?Object.assign({},o,n,{options:Object.assign({},o.options,n.options),data:Object.assign({},o.data,n.data)}):n,r},{});return Object.keys(t).map(function(r){return t[r]})}var rt="Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.",Cr="Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.",nt={placement:"bottom",modifiers:[],strategy:"absolute"};function ot(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return!t.some(function(n){return!(n&&typeof n.getBoundingClientRect=="function")})}function xr(e){e===void 0&&(e={});var t=e,r=t.defaultModifiers,n=r===void 0?[]:r,o=t.defaultOptions,a=o===void 0?nt:o;return function(p,l,d){d===void 0&&(d=a);var f={placement:"bottom",orderedModifiers:[],options:Object.assign({},nt,a),modifiersData:{},elements:{reference:p,popper:l},attributes:{},styles:{}},v=[],w=!1,c={state:f,setOptions:function(C){var S=typeof C=="function"?C(f.options):C;g(),f.options=Object.assign({},a,f.options,S),f.scrollParents={reference:U(p)?fe(p):p.contextElement?fe(p.contextElement):[],popper:fe(l)};var $=mr(wr([].concat(n,f.options.modifiers)));if(f.orderedModifiers=$.filter(function(y){return y.enabled}),process.env.NODE_ENV!=="production"){var u=yr([].concat($,f.options.modifiers),function(y){var E=y.name;return E});if(br(u),M(f.options.placement)===he){var b=f.orderedModifiers.find(function(y){var E=y.name;return E==="flip"});b||console.error(['Popper: "auto" placements require the "flip" modifier be',"present and enabled to work."].join(" "))}var h=L(l),O=h.marginTop,P=h.marginRight,B=h.marginBottom,k=h.marginLeft;[O,P,B,k].some(function(y){return parseFloat(y)})&&console.warn(['Popper: CSS "margin" styles cannot be used to apply padding',"between the popper and its reference element or boundary.","To replicate margin, use the `offset` modifier, as well as","the `padding` option in the `preventOverflow` and `flip`","modifiers."].join(" "))}return x(),c.update()},forceUpdate:function(){if(!w){var C=f.elements,S=C.reference,$=C.popper;if(!ot(S,$)){process.env.NODE_ENV!=="production"&&console.error(rt);return}f.rects={reference:ur(S,le($),f.options.strategy==="fixed"),popper:ke($)},f.reset=!1,f.placement=f.options.placement,f.orderedModifiers.forEach(function(y){return f.modifiersData[y.name]=Object.assign({},y.data)});for(var u=0,b=0;b<f.orderedModifiers.length;b++){if(process.env.NODE_ENV!=="production"&&(u+=1,u>100)){console.error(Cr);break}if(f.reset===!0){f.reset=!1,b=-1;continue}var h=f.orderedModifiers[b],O=h.fn,P=h.options,B=P===void 0?{}:P,k=h.name;typeof O=="function"&&(f=O({state:f,options:B,name:k,instance:c})||f)}}},update:vr(function(){return new Promise(function(m){c.forceUpdate(),m(f)})}),destroy:function(){g(),w=!0}};if(!ot(p,l))return process.env.NODE_ENV!=="production"&&console.error(rt),c;c.setOptions(d).then(function(m){!w&&d.onFirstUpdate&&d.onFirstUpdate(m)});function x(){f.orderedModifiers.forEach(function(m){var C=m.name,S=m.options,$=S===void 0?{}:S,u=m.effect;if(typeof u=="function"){var b=u({state:f,name:C,instance:c,options:$}),h=function(){};v.push(b||h)}})}function g(){v.forEach(function(m){return m()}),v=[]}return c}}var Or=[Ft,ar,It,Et,or,_t,pr,Nt,tr],$r=xr({defaultModifiers:Or});const Sr=i.defineComponent({props:{componentPrefix:String,size:String,sizePrefix:String},computed:{sizeableClassPrefix(){return this.sizePrefix||this.componentPrefix},hasSizeablePrefix(){return this.size===void 0?!1:!!this.size.match(new RegExp(`^${this.sizeableClassPrefix}`))},sizeableClass(){return this.size?!this.sizeableClassPrefix||this.hasSizeablePrefix?this.size:`${this.sizeableClassPrefix}-${this.size}`:""}}}),Pr={props:{componentPrefix:String,variant:String,variantPrefix:String},computed:{variantClassPrefix(){return this.variantPrefix||this.componentPrefix},hasVariantPrefix(){return this.variant===void 0?!1:!!this.variant.match(new RegExp(`^${this.variantClassPrefix}`))},variantClass(){return this.variant?!this.variantClassPrefix||this.hasVariantPrefix?this.variant:`${this.variantClassPrefix}-${this.variant}`:""}}},Br=i.defineComponent({mixins:[Sr,Pr],props:{active:Boolean,block:Boolean,componentPrefix:{type:String,default:"btn"},disabled:Boolean,label:String,outline:Boolean,tag:String,variant:{type:String,default:"primary"}},computed:{classes(){return["btn",this.variantClass,this.sizeableClass,this.active&&"active",this.block&&"btn-block",this.disabled&&"disabled"]},component(){return this.tag?this.tag:this.$attrs.href?"a":"button"},variantClassPrefix(){return(this.variantPrefix||this.componentPrefix)+(this.outline?"-outline":"")}}}),kr=(e,t)=>{const r=e.__vccOpts||e;for(const[n,o]of t)r[n]=o;return r};function Er(e,t,r,n,o,a){return i.openBlock(),i.createBlock(i.resolveDynamicComponent(e.component),i.mergeProps(e.$attrs,{disabled:e.disabled,class:e.classes,role:"button"}),{default:i.withCtx(()=>[i.renderSlot(e.$slots,"default",{},()=>[i.createTextVNode(i.toDisplayString(e.label),1)])]),_:3},16,["disabled","class"])}const Dr=kr(Br,[["render",Er]]),Ar=i.defineComponent({props:{componentPrefix:String,size:String,sizePrefix:String},computed:{sizeableClassPrefix(){return this.sizePrefix||this.componentPrefix},hasSizeablePrefix(){return this.size===void 0?!1:!!this.size.match(new RegExp(`^${this.sizeableClassPrefix}`))},sizeableClass(){return this.size?!this.sizeableClassPrefix||this.hasSizeablePrefix?this.size:`${this.sizeableClassPrefix}-${this.size}`:""}}}),zr=i.defineComponent({name:"BtnGroup",mixins:[Ar],props:{sizePrefix:{type:String,default(){return"btn-group"}},toggle:Boolean,vertical:Boolean},computed:{classes(){return{"btn-group":!this.vertical,"btn-group-toggle":this.toggle,"btn-group-vertical":this.vertical,[this.sizeableClass]:!!this.size}}}}),Rr=(e,t)=>{const r=e.__vccOpts||e;for(const[n,o]of t)r[n]=o;return r},Tr=["data-toggle"];function jr(e,t,r,n,o,a){return i.openBlock(),i.createElementBlock("div",{class:i.normalizeClass(e.classes),"data-toggle":e.toggle?"buttons":!1,role:"group"},[i.renderSlot(e.$slots,"default")],10,Tr)}const Nr=Rr(zr,[["render",jr]]);i.defineComponent({name:"BtnGroupToggle"});function Te(e,t){e.props.class=`${e.props.class||""} ${t}`.trim()}function it(e){for(const t of e){t.type===i.Fragment&&it(t.children),t.props=Object.assign({class:void 0},t.props),t.attrs=Object.assign({},t.attrs),t.attrs.on||(t.attrs.on={});const r=t.props.class&&t.props.class.match(/dropdown-item/),n=t.props.class&&t.props.class.match(/dropdown-divider/);typeof t.type=="string"&&t.type.match(/^h\d$/)?Te(t,"dropdown-header"):t.type==="hr"&&!n?(t.type="div",Te(t,"dropdown-divider")):!r&&!n&&Te(t,"dropdown-item")}return e}const Vr=(e,t)=>i.h("div",{},it(t.slots.default())),Mr=i.defineComponent({name:"DropdownMenu",components:{DropdownMenuItems:Vr},props:{align:{type:String,default:"left",validate(e){return["left","right"].indexOf(e.toLowerCase())!==-1}},show:Boolean}}),Lr=(e,t)=>{const r=e.__vccOpts||e;for(const[n,o]of t)r[n]=o;return r},Ir=["aria-labelledby"];function qr(e,t,r,n,o,a){const s=i.resolveComponent("DropdownMenuItems");return i.openBlock(),i.createElementBlock("div",{class:i.normalizeClass(["dropdown-menu",{"dropdown-menu-left":e.align==="left","dropdown-menu-right":e.align==="right",show:e.show}]),"aria-labelledby":e.$attrs.id},[i.createVNode(s,null,{default:i.withCtx(()=>[i.renderSlot(e.$slots,"default")]),_:3})],10,Ir)}const Fr=Lr(Mr,[["render",qr]]),Wr=i.defineComponent({props:{expanded:{type:Boolean,default:!1},id:{type:String,default:void 0},href:{type:String,default:void 0},to:{type:[String,Object],default:void 0}},computed:{is(){return this.to?"router-link":this.href?"a":"button"}}}),ye=(e,t)=>{const r=e.__vccOpts||e;for(const[n,o]of t)r[n]=o;return r};function Hr(e,t,r,n,o,a){return i.openBlock(),i.createBlock(i.resolveDynamicComponent(e.is),i.mergeProps({id:e.id},e.to?{to:e.to}:{href:e.href},{"aria-haspopup":"true","aria-expanded":e.expanded,type:e.is==="button"?"button":void 0}),{default:i.withCtx(()=>[i.renderSlot(e.$slots,"default")]),_:3},16,["id","aria-expanded","type"])}const Gr=ye(Wr,[["render",Hr]]),at=i.defineComponent({components:{BtnDropdownAction:Gr,BtnGroup:Nr,DropdownMenu:Fr},extends:Dr,props:{align:{type:String,default:"left",validate(e){return["left","right"].indexOf(e.toLowerCase())!==-1}},animated:{type:Boolean,default:!0},buttonClass:[Object,String],caret:{type:Boolean,default:!0},dropup:{type:Boolean,default:!1},dropright:{type:Boolean,default:!1},dropleft:{type:Boolean,default:!1},height:String,href:String,nav:Boolean,label:String,offset:{type:Number,default:5},rotate:{type:Boolean,default:!1},split:{type:Boolean,default:!1},to:[String,Object],type:{type:String,default:"button"},width:String},emits:["click-toggle","show","hide","toggle"],data(){return{popper:null,triggerAnimation:!1,expanded:!1}},computed:{scope(){return{placement:this.placement,variantClassPrefix:this.variantClassPrefix,sizeableClassPrefix:this.sizeableClassPrefix,classes:this.classes,actionClasses:this.actionClasses,toggleStyle:this.toggleStyle,toggleClasses:this.toggleClasses,focus:this.focus,queryFocusable:this.queryFocusable,isFocusable:this.isFocusable,toggle:this.toggle,show:this.show,hide:this.hide,onBlur:this.onBlur,onClickItem:this.onClickItem,onClickToggle:this.onClickToggle,expanded:this.expanded}},placement(){return this.dropup?"top":this.dropleft?"left":this.dropright?"right":"bottom"},variantClassPrefix(){return"btn"+(this.outline?"-outline":"")},sizeableClassPrefix(){return"btn"},classes(){return{dropdown:this.dropup&&this.dropright&&this.dropleft,dropup:this.dropup,dropright:this.dropright,dropleft:this.dropleft,"icon-only":!this.nav&&!this.split&&!!this.$slots.icon&&!this.$slots.label,"hide-caret":!this.caret,expanded:this.expanded,"rotate-90":!this.nav&&this.split&&this.rotate&&this.expanded}},actionClasses(){return Object.assign({btn:!this.nav,[this.variantClass]:!this.nav&&!!this.variant,[this.sizeableClass]:!!this.size},typeof this.buttonClass=="object"?this.buttonClass:{[this.buttonClass]:!!this.buttonClass})},toggleStyle(){return{width:this.width,height:this.height}},toggleClasses(){return Object.assign({active:this.active,btn:!this.nav,"btn-block":!!this.block,"nav-link":!!this.nav,"rotate-90":!this.split&&this.rotate&&this.expanded,"dropdown-toggle":!0,"dropdown-toggle-split":!this.nav&&this.split,[this.variantClass]:!this.nav&&!!this.variant,[this.sizeableClass]:!!this.size},typeof this.buttonClass=="object"?this.buttonClass:{[this.buttonClass]:!!this.buttonClass})}},watch:{expanded(e){this.$nextTick(()=>{this.$emit(e?"show":"hide"),this.$emit("toggle",e)}),setTimeout(()=>{e?document.addEventListener("click",this.onClickDocument):document.removeEventListener("click",this.onClickDocument)})}},beforeUnmount(){this.popper&&this.popper.destroy()},methods:{focus(){var e;(e=this.$el)==null||e.querySelector(".dropdown-toggle").focus()},queryFocusable(){var e;return(e=this.$el)==null?void 0:e.querySelector(".dropdown-menu").querySelectorAll('label, input, select, textarea, [tabindex]:not([tabindex="-1"])')},isFocusable(e){const t=this.queryFocusable();for(const r in t)if(e===t[r])return!0;return!1},toggle(){this.expanded?this.hide():this.show()},show(){var t,r;this.expanded=!0;const e=this.$refs.split&&((t=this.$refs.split)==null?void 0:t.$el)||this.$el;!this.nav&&!this.popper?this.popper=$r(e,(r=this.$refs.menu)==null?void 0:r.$el,{placement:`${this.placement}-${this.align==="left"?"start":"end"}`,onFirstUpdate:()=>{this.triggerAnimation=this.animated},modifiers:[{name:"offset",options:{offset:[0,this.nav?1:this.offset]}}]}):this.popper&&this.popper.update()},hide(){this.expanded=!1},onBlur(e){var t;(this.$refs.menu&&!((t=this.$refs.menu)!=null&&t.$el.contains(e.relatedTarget))||!(this!=null&&this.$el.contains(e.relatedTarget)))&&this.hide()},onClickDocument(e){this!=null&&this.$el.contains(e.target)||this.hide()},onClickItem(e){this.isFocusable(e.target)||this.hide()},onClickToggle(e){e.target.dispatchEvent(new Event("focus",e)),this.$emit("click-toggle",e),e.defaultPrevented||this.toggle()},onKeydown(e){e.target.parentElement.lastElementChild===e.target&&this.hide()}}}),Ur=i.defineComponent({mixins:[at]});function Xr(e,t,r,n,o,a){const s=i.resolveComponent("BtnDropdownAction"),p=i.resolveComponent("DropdownMenu"),l=i.resolveComponent("BtnGroup");return i.openBlock(),i.createBlock(l,{class:i.normalizeClass(e.classes)},{default:i.withCtx(()=>[i.renderSlot(e.$slots,"button",i.normalizeProps(i.guardReactiveProps(e.scope)),()=>[i.createVNode(s,{id:e.$attrs.id,ref:"button",expanded:e.expanded,href:e.href,to:e.to,style:i.normalizeStyle(e.toggleStyle),class:i.normalizeClass(e.toggleClasses),onBlur:e.onBlur,onClick:e.onClickToggle},{default:i.withCtx(()=>[i.renderSlot(e.$slots,"icon"),i.renderSlot(e.$slots,"label",{},()=>[i.createTextVNode(i.toDisplayString(e.label),1)])]),_:3},8,["id","expanded","href","to","style","class","onBlur","onClick"])]),i.createVNode(p,{id:e.$attrs.id,ref:"menu",align:e.align,show:e.expanded,class:i.normalizeClass({animated:e.triggerAnimation}),onBlur:e.onBlur,onClick:e.onClickItem,onKeydown:i.withKeys(e.onKeydown,["tab"]),onMousedown:t[0]||(t[0]=i.withModifiers(()=>{},["prevent"]))},{default:i.withCtx(()=>[i.renderSlot(e.$slots,"default")]),_:3},8,["id","align","show","class","onBlur","onClick","onKeydown"])]),_:3},8,["class"])}const Yr=ye(Ur,[["render",Xr]]),Kr=i.defineComponent({mixins:[at],emits:["click"]}),Jr=["id","aria-expanded"];function Qr(e,t,r,n,o,a){const s=i.resolveComponent("BtnDropdownAction"),p=i.resolveComponent("DropdownMenu"),l=i.resolveComponent("BtnGroup");return i.openBlock(),i.createBlock(l,{class:i.normalizeClass([e.classes,"btn-dropdown-split"])},{default:i.withCtx(()=>[e.dropleft?i.createCommentVNode("",!0):i.renderSlot(e.$slots,"button",i.normalizeProps(i.mergeProps({key:0},e.scope)),()=>[e.dropleft?i.createCommentVNode("",!0):(i.openBlock(),i.createBlock(s,{key:0,id:e.$attrs.id,ref:"button",expanded:e.expanded,href:e.href,to:e.to,class:i.normalizeClass(e.actionClasses),onClick:t[0]||(t[0]=d=>e.$emit("click",d))},{default:i.withCtx(()=>[i.renderSlot(e.$slots,"icon"),i.renderSlot(e.$slots,"label",{},()=>[i.createTextVNode(i.toDisplayString(e.label),1)])]),_:3},8,["id","expanded","href","to","class"]))]),i.createVNode(l,{ref:"split"},{default:i.withCtx(()=>[i.renderSlot(e.$slots,"split",i.normalizeProps(i.guardReactiveProps(e.scope)),()=>[e.split?(i.openBlock(),i.createElementBlock("button",{key:0,id:e.$attrs.id,type:"button","aria-haspopup":"true","aria-expanded":e.expanded,class:i.normalizeClass(e.toggleClasses),onBlur:t[1]||(t[1]=(...d)=>e.onBlur&&e.onBlur(...d)),onClick:t[2]||(t[2]=(...d)=>e.onClickToggle&&e.onClickToggle(...d))},null,42,Jr)):i.createCommentVNode("",!0)]),i.createVNode(p,{id:e.$attrs.id,ref:"menu",align:e.align,show:e.expanded,class:i.normalizeClass({animated:e.triggerAnimation}),onBlur:e.onBlur,onClick:e.onClickItem,onKeydown:i.withKeys(e.onKeydown,["tab"]),onMousedown:t[3]||(t[3]=i.withModifiers(()=>{},["prevent"]))},{default:i.withCtx(()=>[i.renderSlot(e.$slots,"default")]),_:3},8,["id","align","show","class","onBlur","onClick","onKeydown"])]),_:3},512),e.dropleft?i.renderSlot(e.$slots,"button",i.normalizeProps(i.mergeProps({key:1},e.scope)),()=>[e.dropleft?(i.openBlock(),i.createBlock(s,{key:0,id:e.$attrs.id,ref:"button",expanded:e.expanded,href:e.href,to:e.to,class:i.normalizeClass(e.actionClasses),onClick:t[4]||(t[4]=d=>e.$emit("click",d))},{default:i.withCtx(()=>[i.renderSlot(e.$slots,"icon"),i.renderSlot(e.$slots,"label",{},()=>[i.createTextVNode(i.toDisplayString(e.label),1)])]),_:3},8,["id","expanded","href","to","class"])):i.createCommentVNode("",!0)]):i.createCommentVNode("",!0)]),_:3},8,["class"])}const Zr=ye(Kr,[["render",Qr]]),_r=i.defineComponent({name:"BtnDropdown",components:{BtnDropdownSplit:Zr,BtnDropdownSingle:Yr},inheritAttrs:!1,emits:["click","click-toggle","dropdown","show","hide","toggle"]}),pn="";function en(e,t,r,n,o,a){return i.openBlock(),i.createBlock(i.resolveDynamicComponent(e.$attrs.split===void 0||e.$attrs.nav?"btn-dropdown-single":"btn-dropdown-split"),i.mergeProps({class:"btn-dropdown"},e.$attrs,{onClick:t[0]||(t[0]=(...s)=>e.$emit("click",...s)),onClickToggle:t[1]||(t[1]=(...s)=>e.$emit("click-toggle",...s)),onDropdown:t[2]||(t[2]=(...s)=>e.$emit("dropdown",...s)),onShow:t[3]||(t[3]=(...s)=>e.$emit("show",...s)),onHide:t[4]||(t[4]=(...s)=>e.$emit("hide",...s)),onToggle:t[5]||(t[5]=(...s)=>e.$emit("toggle",...s))}),i.createSlots({icon:i.withCtx(()=>[i.renderSlot(e.$slots,"icon")]),button:i.withCtx(s=>[i.renderSlot(e.$slots,"button",i.normalizeProps(i.guardReactiveProps(s)))]),split:i.withCtx(s=>[i.renderSlot(e.$slots,"split",i.normalizeProps(i.guardReactiveProps(s)))]),default:i.withCtx(()=>[i.renderSlot(e.$slots,"default")]),_:2},[e.$attrs.label||e.$slots.label?{name:"label",fn:i.withCtx(()=>[i.renderSlot(e.$slots,"label",{},()=>[i.createTextVNode(i.toDisplayString(e.$attrs.label),1)])]),key:"0"}:void 0]),1040)}const tn=ye(_r,[["render",en]]);G.BtnDropdown=tn,Object.defineProperty(G,Symbol.toStringTag,{value:"Module"})});
