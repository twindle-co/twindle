import"./Feed.css.proxy.js";import{SvelteComponent as a,attr as i,create_component as m,destroy_component as c,detach as l,element as p,init as u,insert as f,mount_component as _,noop as d,safe_not_equal as g,transition_in as v,transition_out as $}from"../../web_modules/svelte/internal.js";import h from"../components/Avatar.js";function j(r){let t,n,o;return n=new h({props:{src:"https://pbs.twimg.com/profile_images/759557613445001216/6M2E1l4q_normal.jpg"}}),{c(){t=p("section"),m(n.$$.fragment),i(t,"class","container svelte-high9o")},m(e,s){f(e,t,s),_(n,t,null),o=!0},p:d,i(e){if(o)return;v(n.$$.fragment,e),o=!0},o(e){$(n.$$.fragment,e),o=!1},d(e){e&&l(t),c(n)}}}class x extends a{constructor(t){super();u(this,t,null,j,g,{})}}export default x;