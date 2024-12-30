import{c as a,r as c,j as e,d as g}from"./index-Dn69LxbG.js";/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=a("Activity",[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=a("ChartNoAxesColumnIncreasing",[["line",{x1:"12",x2:"12",y1:"20",y2:"10",key:"1vz5eb"}],["line",{x1:"18",x2:"18",y1:"20",y2:"4",key:"cun8e5"}],["line",{x1:"6",x2:"6",y1:"20",y2:"16",key:"hq0ia6"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=a("CircleCheckBig",[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o=a("CircleX",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=a("Database",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=a("Server",[["rect",{width:"20",height:"8",x:"2",y:"2",rx:"2",ry:"2",key:"ngkwjq"}],["rect",{width:"20",height:"8",x:"2",y:"14",rx:"2",ry:"2",key:"iecqi9"}],["line",{x1:"6",x2:"6.01",y1:"6",y2:"6",key:"16zg32"}],["line",{x1:"6",x2:"6.01",y1:"18",y2:"18",key:"nzw8ys"}]]),k=()=>{const[s,h]=c.useState(null),[y,d]=c.useState(!0),[n,m]=c.useState(null),x=async()=>{d(!0);try{const r=await g.get("http://localhost:3000/api/v1/health");h(r.data),m(null)}catch(r){console.log(r.message),m("Failed to fetch health status")}finally{d(!1)}};c.useEffect(()=>{x();const r=setInterval(x,3e4);return()=>clearInterval(r)},[]);const i=r=>{const l=["Bytes","KB","MB","GB"];if(r===0)return"0 Byte";const t=parseInt(Math.floor(Math.log(r)/Math.log(1024)).toString());return Math.round(r/Math.pow(1024,t)*100)/100+" "+l[t]},p=r=>{const l=Math.floor(r/86400),t=Math.floor(r%(3600*24)/3600),j=Math.floor(r%3600/60);return`${l}d ${t}h ${j}m`};return y?e.jsx("div",{className:"min-h-screen bg-gray-50 p-4",children:e.jsx("div",{className:"max-w-6xl mx-auto",children:e.jsx("div",{className:"animate-pulse flex items-center justify-center h-64",children:e.jsx(u,{className:"h-8 w-8 text-gray-400 animate-spin"})})})}):n?e.jsx("div",{className:"min-h-screen bg-gray-50 p-4",children:e.jsx("div",{className:"max-w-6xl mx-auto",children:e.jsx("div",{className:"bg-red-50 p-4 rounded-lg border border-red-100",children:e.jsxs("p",{className:"text-red-600 flex items-center gap-2",children:[e.jsx(o,{className:"h-5 w-5"}),n]})})})}):e.jsx("div",{className:"min-h-screen bg-gray-50 p-4 mt-14 ",children:e.jsxs("div",{className:"max-w-6xl mx-auto space-y-6",children:[e.jsx("div",{className:"bg-white rounded-xl shadow-sm border border-gray-100 p-6",children:e.jsxs("div",{className:"flex items-center gap-3",children:[(s==null?void 0:s.status)==="healthy"?e.jsx(v,{className:"h-6 w-6 text-green-500"}):e.jsx(o,{className:"h-6 w-6 text-red-500"}),e.jsxs("div",{children:[e.jsxs("h2",{className:"text-xl font-semibold",children:["System is ",s==null?void 0:s.status]}),e.jsxs("p",{className:"text-gray-500",children:["Last updated:"," ",new Date((s==null?void 0:s.timestamp)||"").toLocaleString()]})]})]})}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"bg-white rounded-xl shadow-sm border border-gray-100 p-6",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[e.jsx(b,{className:"h-5 w-5 text-gray-400"}),e.jsx("h3",{className:"font-semibold",children:"Server"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-500",children:"Status"}),e.jsx("p",{className:"font-medium",children:s==null?void 0:s.services.server})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-500",children:"Uptime"}),e.jsx("p",{className:"font-medium",children:p((s==null?void 0:s.uptime)||0)})]})]})]}),e.jsxs("div",{className:"bg-white rounded-xl shadow-sm border border-gray-100 p-6",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[e.jsx(f,{className:"h-5 w-5 text-gray-400"}),e.jsx("h3",{className:"font-semibold",children:"Database"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-500",children:"Status"}),e.jsx("p",{className:"font-medium",children:s==null?void 0:s.services.database.status})]}),(s==null?void 0:s.services.database.metrics)&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-500",children:"Collections"}),e.jsx("p",{className:"font-medium",children:s.services.database.metrics.collections})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-500",children:"Indexes"}),e.jsx("p",{className:"font-medium",children:s.services.database.metrics.indexes})]})]})]})]}),e.jsxs("div",{className:"bg-white rounded-xl shadow-sm border border-gray-100 p-6",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[e.jsx(N,{className:"h-5 w-5 text-gray-400"}),e.jsx("h3",{className:"font-semibold",children:"Memory Usage"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-500",children:"Heap Total"}),e.jsx("p",{className:"font-medium",children:i((s==null?void 0:s.memory.heapTotal)||0)})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-500",children:"Heap Used"}),e.jsx("p",{className:"font-medium",children:i((s==null?void 0:s.memory.heapUsed)||0)})]}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-500",children:"RSS"}),e.jsx("p",{className:"font-medium",children:i((s==null?void 0:s.memory.rss)||0)})]})]})]})]})]})})};export{k as default};
