window.MutationObserver=window.MutationObserver||window.WebKitMutationObserver||function(e){function t(e){this.g=[],this.k=e}function n(e){(function n(){var r=e.takeRecords();r.length&&e.k(r,e),e.f=setTimeout(n,t._period)})()}function r(t){var n={type:null,target:null,addedNodes:[],removedNodes:[],previousSibling:null,nextSibling:null,attributeName:null,attributeNamespace:null,oldValue:null},r;for(r in t)n[r]!==e&&t[r]!==e&&(n[r]=t[r]);return n}function i(e,t){var n=u(e,t);return function(r){var i=r.length,a;t.a&&n.a&&s(r,e,n.a,t.d);if(t.b||t.e)a=o(r,e,n,t);if(a||r.length!==i)n=u(e,t)}}function s(t,n,i,s){for(var o={},u=n.attributes,a,f,l=u.length;l--;)a=u[l],f=a.name,s&&s[f]===e||(a.value!==i[f]&&t.push(r({type:"attributes",target:n,attributeName:f,oldValue:i[f],attributeNamespace:a.namespaceURI})),o[f]=!0);for(f in i)o[f]||t.push(r({target:n,type:"attributes",attributeName:f,oldValue:i[f]}))}function o(t,n,i,o){function u(e,n,i,u,a){var l=e.length-1;a=-~((l-a)/2);for(var c,h,p;p=e.pop();)c=i[p.h],h=u[p.i],o.b&&a&&Math.abs(p.h-p.i)>=l&&(t.push(r({type:"childList",target:n,addedNodes:[c],removedNodes:[c],nextSibling:c.nextSibling,previousSibling:c.previousSibling})),a--),o.a&&h.a&&s(t,c,h.a,o.d),o.c&&3===c.nodeType&&c.nodeValue!==h.c&&t.push(r({type:"characterData",target:c})),o.e&&f(c,h)}function f(n,i){for(var h=n.childNodes,p=i.b,v=h.length,m=p?p.length:0,y,b,w,S,x,T=0,N=0,C=0;N<v||C<m;)S=h[N],x=(w=p[C])&&w.j,S===x?(o.a&&w.a&&s(t,S,w.a,o.d),o.c&&w.c!==e&&S.nodeValue!==w.c&&t.push(r({type:"characterData",target:S})),b&&u(b,n,h,p,T),o.e&&(S.childNodes.length||w.b&&w.b.length)&&f(S,w),N++,C++):(l=!0,y||(y={},b=[]),S&&(y[w=a(S)]||(y[w]=!0,-1===(w=c(p,S,C,"j"))?o.b&&(t.push(r({type:"childList",target:n,addedNodes:[S],nextSibling:S.nextSibling,previousSibling:S.previousSibling})),T++):b.push({h:N,i:w})),N++),x&&x!==h[N]&&(y[w=a(x)]||(y[w]=!0,-1===(w=c(h,x,N))?o.b&&(t.push(r({type:"childList",target:i.j,removedNodes:[x],nextSibling:p[C+1],previousSibling:p[C-1]})),T--):b.push({h:w,i:C})),C++));b&&u(b,n,h,p,T)}var l;return f(n,i),l}function u(e,t){var n=!0;return function r(e){var i={j:e};return!t.c||3!==e.nodeType&&8!==e.nodeType?(t.a&&n&&1===e.nodeType&&(i.a=l(e.attributes,function(e,n){if(!t.d||t.d[n.name])e[n.name]=n.value;return e})),n&&(t.b||t.c||t.a&&t.e)&&(i.b=f(e.childNodes,r)),n=t.e):i.c=e.nodeValue,i}(e)}function a(e){try{return e.id||(e.mo_id=e.mo_id||h++)}catch(t){try{return e.nodeValue}catch(n){return h++}}}function f(e,t){for(var n=[],r=0;r<e.length;r++)n[r]=t(e[r],r,e);return n}function l(e,t){for(var n={},r=0;r<e.length;r++)n=t(n,e[r],r,e);return n}function c(e,t,n,r){for(;n<e.length;n++)if((r?e[n][r]:e[n])===t)return n;return-1}t._period=30,t.prototype={observe:function(e,t){for(var r={a:!!(t.attributes||t.attributeFilter||t.attributeOldValue),b:!!t.childList,e:!!t.subtree,c:!!t.characterData||!!t.characterDataOldValue},s=this.g,o=0;o<s.length;o++)s[o].m===e&&s.splice(o,1);t.attributeFilter&&(r.d=l(t.attributeFilter,function(e,t){return e[t]=!0,e})),s.push({m:e,l:i(e,r)}),this.f||n(this)},takeRecords:function(){for(var e=[],t=this.g,n=0;n<t.length;n++)t[n].l(e);return e},disconnect:function(){this.g=[],clearTimeout(this.f),this.f=null}};var h=1;return t}(void 0);