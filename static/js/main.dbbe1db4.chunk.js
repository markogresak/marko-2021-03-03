(this["webpackJsonpmarko-2021-03-03"]=this["webpackJsonpmarko-2021-03-03"]||[]).push([[0],{31:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var r=t(0),c=t.n(r),o=t(23),i=t.n(o),a=(t(29),t(30),t(31),t(2)),s=t(3),u="book_ui_1",d="PI_XBTUSD",b=function(e){return"object"===typeof e&&"number"===typeof e.numLevels&&"string"===typeof e.feed&&e.feed.endsWith("_snapshot")&&"string"===typeof e.product_id&&Array.isArray(e.asks)&&Array.isArray(e.bids)},j=function(e){return"object"===typeof e&&"string"===typeof e.product_id&&Array.isArray(e.asks)&&Array.isArray(e.bids)};function l(e){var n,t=e.onData,r=e.onError,c=e.productIds,o=new WebSocket("wss://www.cryptofacilities.com/ws/v1");return o.addEventListener("open",(function(){n=!1;var e=JSON.stringify(L(c));o.send(e)})),o.addEventListener("error",(function(e){r(e),o.close()})),o.addEventListener("message",(function(e){var r=function(e){try{return JSON.parse(e.data)}catch(n){M(o,n)}}(e);r&&(function(e){return"object"===typeof e&&"subscribed"===e.event}(r)&&((n=I(r,c))||M(o,new Error("OrderBook handshake failed"))),n&&(b(r)||j(r))&&t(r))})),function(){o.close()}}var f,O,p,v,g,x,h,m,y,w,k,S,E,L=function(e){return{event:"subscribe",feed:u,product_ids:e}},M=function(e,n){var t=document.createEvent("CustomEvent");t.initCustomEvent("error",!1,!1,n),e.dispatchEvent(t)},I=function(e,n){var t=e.feed===u,r=e.product_ids.every((function(e){return n.includes(e)}));return t&&r},A=t(8),F=t(5),_=t(39),T=t(40),C=t(24),z=t.n(C),B=function(e,n){var t=z()(e,n,(function(e){return Object(F.a)(e,1)[0]}));return e.splice(t,0,n),e},D=function(e,n){return e.splice(n,1),e},H=function(e,n){var t=Object(F.a)(n,2),r=t[0],c=t[1],o=e.findIndex((function(e){return Object(F.a)(e,1)[0]===r})),i=-1===o,a=c>0;if(i&&!a)return e;var s=Object(A.a)(e);return i?B(s,n):a?(s[o]=n,s):D(s,o)},J=function(e){var n=Object(r.useState)(!0),t=Object(F.a)(n,2),c=t[0],o=t[1],i=Object(r.useRef)([]),a=Object(r.useRef)([]),s=Object(r.useState)(),u=Object(F.a)(s,2),d=u[0],f=u[1],O=Object(_.a)();return Object(T.a)(O),Object(r.useEffect)((function(){return l({onData:function(e){b(e)&&(o(!1),i.current=e.asks,a.current=e.bids),j(e)&&(i.current=e.asks.reduce((function(e,n){return H(e,n)}),i.current),a.current=e.bids.reduce((function(e,n){return H(e,n)}),a.current))},onError:f,productIds:[e]})}),[e]),{asks:i.current,bids:Object(A.a)(a.current).reverse(),error:d,isLoading:c}},P=t(16),X=Object(P.a)({},d,"XBT/USD"),N=function(e){return X[e]},R=t(21),U=t.p+"static/media/loader.50179ff6.svg",W=t(1),q=function(e){return Object(W.jsx)("img",Object(R.a)(Object(R.a)({},e),{},{src:U,alt:"Loading..."}))},G=s.a.div(f||(f=Object(a.a)(["\n  display: flex;\n  flex-direction: column;\n  font-family: var(--font-mono);\n  font-size: var(--card-font-size);\n  background: var(--card-bg);\n  color: var(--card-color);\n  padding: 16px 0;\n"]))),K=s.a.div(O||(O=Object(a.a)(["\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-auto-rows: 20px;\n  column-gap: var(--grid-column-gap);\n  row-gap: 4px;\n  text-align: right;\n"]))),Q=function(e,n){if(!n)return 0;var t=Object(F.a)(n,1)[0],r=e.findIndex((function(e){return e[0]===t}));return-1===r?0:e.slice(0,r+1).reduce((function(e,n){return e+Object(F.a)(n,2)[1]}),0)},V=t(13),Y=s.a.div(p||(p=Object(a.a)(["\n  padding: 4px 8px;\n  min-width: 90px;\n"]))),Z=Object(s.a)(Y)(v||(v=Object(a.a)(["\n  position: relative;\n\n  &:hover {\n    font-weight: bold;\n  }\n\n  &:nth-of-type(3n + 1) {\n    --row-full-width: calc(300% + var(--grid-column-gap) * 2);\n    color: var(--text-color);\n\n    ","\n\n    &:before {\n      content: '';\n      position: absolute;\n      left: 0;\n      top: 0;\n      height: 100%;\n      width: var(--row-full-width);\n      background: var(--row-background);\n      transform-origin: 0;\n      transform: scaleX(var(--percent));\n    }\n  }\n"])),(function(e){return e.isHovered&&$})),$=Object(V.a)(g||(g=Object(a.a)(["\n  &:after {\n    content: '';\n    position: absolute;\n    left: 0;\n    top: 0;\n    height: 100%;\n    width: var(--row-full-width);\n    background: rgba(255, 255, 255, 0.1);\n  }\n"]))),ee=Z,ne=function(e){var n=e.isHovered,t=e.onMouseOut,r=e.onMouseOver,c=e.price,o=e.size,i=e.total,a=e.totalSum;return Object(W.jsxs)(W.Fragment,{children:[Object(W.jsx)(ee,{isHovered:n,onMouseOut:t,onMouseOver:r,style:{"--percent":(i-o)/a},children:c.toLocaleString()}),Object(W.jsx)(ee,{onMouseOut:t,onMouseOver:r,children:o.toLocaleString()}),Object(W.jsx)(ee,{onMouseOut:t,onMouseOver:r,children:i.toLocaleString()})]})},te=function(e){var n=e.orders,t=e.reversedTotal,c=void 0!==t&&t,o=Object(r.useState)(-1),i=Object(F.a)(o,2),a=i[0],s=i[1],u=c?Object(A.a)(n).reverse():n,d=Q(n,n[n.length-1]);return Object(W.jsx)(W.Fragment,{children:n.map((function(e,n){var t=Object(F.a)(e,2),r=t[0],c=t[1];return Object(W.jsx)(ne,{isHovered:a===n,onMouseOut:function(){return s(-1)},onMouseOver:function(){return s(n)},price:r,size:c,total:Q(u,[r,c]),totalSum:d},r)}))})},re=s.a.span(x||(x=Object(a.a)(["\n  color: var(--card-title-color);\n  text-transform: uppercase;\n  border-bottom: 1px dotted;\n"]))),ce=function(){return Object(W.jsxs)(W.Fragment,{children:[Object(W.jsx)(Y,{children:Object(W.jsx)(re,{children:"Price"})}),Object(W.jsx)(Y,{children:Object(W.jsx)(re,{children:"Size"})}),Object(W.jsx)(Y,{children:Object(W.jsx)(re,{children:"Total"})})]})},oe=s.a.h2(h||(h=Object(a.a)(["\n  text-align: center;\n  margin: 0 0 16px;\n  padding: 0 16px;\n"]))),ie=Object(s.a)(K)(m||(m=Object(a.a)(["\n  --grid-column-gap: 8px;\n"]))),ae=Object(s.a)(ie)(y||(y=Object(a.a)(["\n  margin-bottom: 16px;\n  --text-color: var(--asks-color);\n  --row-background: var(--asks-bg);\n"]))),se=Object(s.a)(ie)(w||(w=Object(a.a)(["\n  --text-color: var(--bids-color);\n  --row-background: var(--bids-bg);\n"]))),ue=s.a.div(k||(k=Object(a.a)(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"]))),de=Object(s.a)(q)(S||(S=Object(a.a)(["\n  width: 50px;\n  height: 50px;\n"]))),be=function(e){var n=e.ordersCount,t=void 0===n?10:n,c=e.productId,o=J(c),i=o.asks,a=o.bids,s=o.error,u=o.isLoading;return Object(r.useEffect)((function(){s&&console.error(s)}),[s]),Object(W.jsxs)(G,{children:[Object(W.jsxs)(oe,{children:["Orderbook (",N(c),")"]}),u&&Object(W.jsx)(ue,{children:Object(W.jsx)(de,{})}),!u&&Object(W.jsxs)(W.Fragment,{children:[Object(W.jsxs)(ae,{children:[Object(W.jsx)(ce,{}),Object(W.jsx)(te,{orders:i.slice(0,t),reversedTotal:!0})]}),Object(W.jsx)(se,{children:Object(W.jsx)(te,{orders:a.slice(-t)})})]})]})},je=s.a.div(E||(E=Object(a.a)(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 16px 0;\n"]))),le=function(){return Object(W.jsx)(je,{children:Object(W.jsx)(be,{productId:d})})},fe=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,41)).then((function(n){var t=n.getCLS,r=n.getFID,c=n.getFCP,o=n.getLCP,i=n.getTTFB;t(e),r(e),c(e),o(e),i(e)}))};i.a.render(Object(W.jsx)(c.a.StrictMode,{children:Object(W.jsx)(le,{})}),document.getElementById("root")),fe()}},[[37,1,2]]]);
//# sourceMappingURL=main.dbbe1db4.chunk.js.map