import { r as a, b as p, j as e, d as f } from "./index-Dn69LxbG.js"; import { L as h, I as y, _ as d } from "./index-C_2wkXmm.js"; import { U as b } from "./user-C0u3AR1q.js"; import { A as j } from "./arrow-right-5ecG7nhM.js"; const S = () => { const [r, u] = a.useState(""), [l, m] = a.useState(""), [n, o] = a.useState(!1), x = p(), g = async s => { var c, i; s.preventDefault(), o(!0); try { const t = await f.post("https://askme-8puo.onrender.com/api/v1/auth/signup", { username: r, password: l }); d.success(t.data.message || "Signup successful!"), x("/sign-in") } catch (t) { d.error(((i = (c = t.response) == null ? void 0 : c.data) == null ? void 0 : i.message) || "An unexpected error occurred.") } finally { o(!1) } }; return e.jsxs("div", { className: "min-h-screen bg-white flex items-center justify-center p-4", children: [e.jsxs("div", { className: "max-w-md w-full space-y-8", children: [e.jsxs("div", { className: "text-center", children: [e.jsx("h2", { className: "text-3xl font-bold text-gray-900", children: "Create Account" }), e.jsx("p", { className: "mt-2 text-sm text-gray-600", children: "Start your journey with us today" })] }), e.jsxs("form", { onSubmit: g, className: "mt-8 space-y-6", children: [e.jsxs("div", { className: "space-y-4", children: [e.jsxs("div", { children: [e.jsx("label", { htmlFor: "username", className: "block text-sm font-medium text-gray-700", children: "Username" }), e.jsxs("div", { className: "mt-1 relative", children: [e.jsx(b, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" }), e.jsx("input", { type: "text", id: "username", value: r, onChange: s => u(s.target.value), className: "block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all text-gray-900 bg-gray-50", required: !0 })] })] }), e.jsxs("div", { children: [e.jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700", children: "Password" }), e.jsxs("div", { className: "mt-1 relative", children: [e.jsx(h, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" }), e.jsx("input", { type: "password", id: "password", value: l, onChange: s => m(s.target.value), className: "block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all text-gray-900 bg-gray-50", required: !0 })] })] })] }), e.jsx("button", { type: "submit", disabled: n, className: "w-full flex justify-center items-center gap-2 py-2.5 px-4 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed", children: n ? "Creating Account..." : e.jsxs(e.Fragment, { children: ["Sign Up", e.jsx(j, { className: "h-4 w-4" })] }) }), e.jsx("div", { className: "text-center", children: e.jsxs("p", { className: "text-sm text-gray-600", children: ["Already have an account?", " ", e.jsx("a", { href: "/login", className: "font-medium text-black hover:underline", children: "Sign in" })] }) })] })] }), e.jsx(y, { position: "top-center", toastOptions: { duration: 3e3, style: { background: "#333", color: "#fff" } } })] }) }; export { S as default };
