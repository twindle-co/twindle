import{SvelteComponent as m,append as d,assign as u,attr as v,detach as w,exclude_internal_props as o,get_spread_update as c,init as x,insert as z,noop as _,safe_not_equal as B,set_svg_attributes as r,svg_element as f}from"../../../web_modules/svelte/internal.js";function b(a){let e,l,i,n,s=[{xmlns:"http://www.w3.org/2000/svg"},{style:i="width: "+a[0]/16+"rem; height: auto;"},{viewBox:n="0 0 24 24"},a[2]],h={};for(let t=0;t<s.length;t+=1)h=u(h,s[t]);return{c(){e=f("svg"),l=f("path"),v(l,"d",a[1]),r(e,h)},m(t,g){z(t,e,g),d(e,l)},p(t,[g]){g&2&&v(l,"d",t[1]),r(e,h=c(s,[{xmlns:"http://www.w3.org/2000/svg"},g&1&&i!==(i="width: "+t[0]/16+"rem; height: auto;")&&{style:i},{viewBox:n},g&4&&t[2]]))},i:_,o:_,d(t){t&&w(e)}}}function p(a,e,l){let{size:i=24}=e,{path:n}=e;return a.$$set=s=>{l(2,e=u(u({},e),o(s))),"size"in s&&l(0,i=s.size),"path"in s&&l(1,n=s.path)},e=o(e),[i,n,e]}class j extends m{constructor(e){super();x(this,e,p,b,B,{size:0,path:1})}}export default j;
