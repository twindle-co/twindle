import"./App.css.proxy.js";import{SvelteComponent as i,attr as f,create_component as a,destroy_component as l,detach as $,element as _,init as d,insert as g,mount_component as m,noop as w,safe_not_equal as h,transition_in as p,transition_out as c}from"../web_modules/svelte/internal.js";import{Router as j,Route as v}from"../web_modules/svelte-routing.js";import x from"./pages/Feed.js";function b(s){let e,t;return e=new v({props:{path:"/",component:x}}),{c(){a(e.$$.fragment)},m(r,n){m(e,r,n),t=!0},p:w,i(r){if(t)return;p(e.$$.fragment,r),t=!0},o(r){c(e.$$.fragment,r),t=!1},d(r){l(e,r)}}}function y(s){let e,t,r;return t=new j({props:{$$slots:{default:[b]},$$scope:{ctx:s}}}),{c(){e=_("main"),a(t.$$.fragment),f(e,"class","svelte-1r74ywk")},m(n,o){g(n,e,o),m(t,e,null),r=!0},p(n,[o]){const u={};o&1&&(u.$$scope={dirty:o,ctx:n}),t.$set(u)},i(n){if(r)return;p(t.$$.fragment,n),r=!0},o(n){c(t.$$.fragment,n),r=!1},d(n){n&&$(e),l(t)}}}class A extends i{constructor(e){super();d(this,e,null,y,h,{})}}export default A;
