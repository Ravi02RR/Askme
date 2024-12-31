import{c as y,r as i,j as e,d as p}from"./index-rN12sQw1.js";import{B as f,M as j}from"./index-BwWK1EPG.js";import{m as t,A as v}from"./index-8OWefOCw.js";import{S as w}from"./search-Dpq2a03S.js";import{U as g}from"./user-UWBQZ4sj.js";/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=y("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]),d=({content:a,type:s})=>e.jsxs(t.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},className:`flex gap-3 ${s==="user"?"justify-end":"justify-start"}`,children:[s==="assistant"&&e.jsx(t.div,{whileHover:{scale:1.1},children:e.jsx(f,{className:"w-6 h-6 mt-1"})}),e.jsx(t.div,{whileHover:{scale:1.01},className:`max-w-[80%] rounded-xl p-4 ${s==="user"?"bg-gradient-to-r from-gray-900 to-black text-white":"bg-white border border-gray-100 shadow-lg"}`,children:s==="user"?e.jsx("div",{className:"text-white",children:a}):e.jsx(j,{source:a,style:{background:"transparent",fontSize:"14px",lineHeight:"1.8",color:"black"}})}),s==="user"&&e.jsx(t.div,{whileHover:{scale:1.1},children:e.jsx(g,{className:"w-6 h-6 mt-1"})})]}),b=({message:a})=>{const[s,n]=i.useState(!1);return e.jsxs(t.div,{initial:{opacity:0},animate:{opacity:1},whileHover:{scale:1.01},className:"border rounded-xl bg-white shadow-sm hover:shadow-xl transition-all duration-300",children:[e.jsxs(t.button,{onClick:()=>n(!s),className:"w-full p-5 flex items-center justify-between text-left hover:bg-gray-50 rounded-xl transition-colors",children:[e.jsxs("div",{className:"space-y-1",children:[e.jsx("div",{className:"font-medium line-clamp-1",children:a.question}),e.jsx("div",{className:"text-sm text-gray-500",children:new Date(a.createdAt).toLocaleString()})]}),e.jsx(t.div,{animate:{rotate:s?180:0},transition:{duration:.3},children:e.jsx(N,{className:"w-5 h-5"})})]}),e.jsx(v,{children:s&&e.jsx(t.div,{initial:{height:0,opacity:0},animate:{height:"auto",opacity:1},exit:{height:0,opacity:0},transition:{duration:.3},className:"overflow-hidden",children:e.jsx("div",{className:"p-5 border-t bg-gray-50",children:e.jsxs("div",{className:"space-y-6",children:[e.jsx(d,{type:"user",content:a.question}),e.jsx(d,{type:"assistant",content:a.ans})]})})})})]})},E=()=>{const[a,s]=i.useState([]),[n,h]=i.useState(!0),[c,m]=i.useState(""),[l,x]=i.useState(null);i.useEffect(()=>{(async()=>{try{const o=await p.get("https://task.devguy.live/api/v1/history",{withCredentials:!0});s(o.data.historydata.reverse())}catch(o){console.error("Error fetching history:",o),x("Failed to load chat history. Please try again later.")}finally{h(!1)}})()},[]);const u=a.filter(r=>r.question.toLowerCase().includes(c.toLowerCase()));return n?e.jsx("div",{className:"flex items-center justify-center h-screen",children:e.jsx(t.div,{animate:{rotate:360,scale:[1,1.2,1]},transition:{duration:1.5,repeat:1/0,ease:"easeInOut"},className:"rounded-full h-10 w-10 border-3 border-b-black"})}):l?e.jsx("div",{className:"flex items-center justify-center h-screen",children:e.jsx("div",{className:"text-red-500",children:l})}):e.jsx(t.div,{initial:{opacity:0},animate:{opacity:1},className:"max-w-4xl mx-auto py-12 px-4 mt-10 min-h-screen",children:e.jsxs("div",{className:"space-y-8",children:[e.jsx("div",{className:"space-y-4",children:e.jsxs("div",{className:"relative",children:[e.jsx(w,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"}),e.jsx("input",{type:"text",placeholder:"Search conversations...",value:c,onChange:r=>m(r.target.value),className:"w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"})]})}),e.jsx("div",{className:"space-y-4",children:u.map(r=>e.jsx(b,{message:r},r._id))})]})})};export{E as default};
