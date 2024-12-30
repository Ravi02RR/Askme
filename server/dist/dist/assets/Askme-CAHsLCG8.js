import{c as y,r,j as e,d as b}from"./index-lzxUoyeI.js";import{B as h,M as v}from"./index-B1Q7wjkp.js";import{A as w,m as d}from"./index-yxinE5pf.js";import{U as N}from"./user-3DDfI6uK.js";/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=y("Send",[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=y("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]),I=()=>e.jsx("div",{className:"flex space-x-1",children:[1,2,3].map(t=>e.jsx(d.div,{initial:{opacity:.2},animate:{opacity:1},exit:{opacity:.2},transition:{duration:.5,repeat:1/0,repeatType:"reverse"},className:"w-2 h-2 bg-black rounded-full"},t))}),M=()=>e.jsxs(d.div,{className:"flex items-center space-x-2 p-4",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:[e.jsx(h,{className:"w-6 h-6"}),e.jsx(I,{})]}),C=({content:t,role:o})=>o==="user"?e.jsx("div",{className:"text-white",children:t}):e.jsx(v,{source:t,style:{background:"white",color:"black",fontSize:"19px",lineHeight:"1.6"},components:{code:({children:a})=>e.jsx("code",{className:"bg-gray-100 px-1 py-0.5 rounded text-sm",children:a}),pre:({children:a})=>e.jsx("pre",{className:"bg-gray-50 p-4 rounded-lg my-4 overflow-x-auto",children:a})}}),A=()=>{const[t,o]=r.useState(()=>{const s=localStorage.getItem("chatHistory");return s?JSON.parse(s):[]}),[a,u]=r.useState(""),[p,x]=r.useState(!1),m=r.useRef(null),f=()=>{var s;(s=m.current)==null||s.scrollIntoView({behavior:"smooth"})},i=r.useRef();r.useEffect(()=>{i.current&&i.current.focus()},[]),r.useEffect(()=>{f(),localStorage.setItem("chatHistory",JSON.stringify(t))},[t]);const g=async s=>{if(s.preventDefault(),!a.trim())return;const c={role:"user",content:a};o(n=>[...n,c]),u(""),x(!0);try{const n=await b.post("https://askme-8puo.onrender.com/api/v1/ask",{question:a},{withCredentials:!0});o(l=>[...l,{role:"assistant",content:n.data.answer}])}catch(n){console.error("Error:",n),o(l=>[...l,{role:"assistant",content:"Sorry, I encountered an error. Please try again."}])}finally{x(!1)}},j=()=>{o([]),localStorage.removeItem("chatHistory")};return e.jsxs("div",{className:"flex flex-col h-screen bg-white mt-20",children:[e.jsxs("div",{className:"flex-1 overflow-y-auto p-4 space-y-4",children:[e.jsxs(w,{children:[t.map((s,c)=>e.jsxs(d.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},className:`flex items-start gap-3 ${s.role==="user"?"justify-end":"justify-start"}`,children:[s.role==="assistant"&&e.jsx(h,{className:"w-6 h-6 mt-1"}),e.jsx("div",{className:`max-w-[80%] rounded-lg p-3 ${s.role==="user"?"bg-black text-white":"bg-white border border-gray-200 shadow-sm"}`,children:e.jsx(C,{content:s.content,role:s.role})}),s.role==="user"&&e.jsx(N,{className:"w-6 h-6 mt-1"})]},c)),p&&e.jsx(M,{})]}),e.jsx("div",{ref:m})]}),e.jsx("form",{onSubmit:g,className:"p-4 border-t",children:e.jsxs("div",{className:"flex gap-2",children:[e.jsx("input",{type:"text",value:a,onChange:s=>u(s.target.value),className:"flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black",placeholder:"Type your message...",ref:i}),e.jsxs("button",{onClick:j,type:"button",className:"flex items-center gap-2 px-4 py-2 text-gray-600 transition-colors rounded-lg hover:bg-gray-100",children:[e.jsx(S,{className:"w-4 h-4"}),"Clear"]}),e.jsx("button",{type:"submit",disabled:p,className:"px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",children:e.jsx(k,{className:"w-5 h-5"})})]})})]})};export{A as default};
