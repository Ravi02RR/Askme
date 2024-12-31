import { r as a, b, a as y, j as e, d as j } from "./index-BAq6SJ8K.js"; import { L as v, I as w, _ as x } from "./index-CcEPP8xf.js"; import { U as N } from "./user-DaR3moQL.js"; import { A as k } from "./arrow-right-C3gV017b.js"; const F = () => { const [r, g] = a.useState(""), [n, h] = a.useState(""), [o, l] = a.useState(!1), f = b(), c = a.useContext(y); if (!c) throw new Error("AuthContext not found"); const { setIsAuthenticated: i, setUsername: d } = c, p = async s => { var u, m; s.preventDefault(), l(!0); try { const t = await j.post("http://task.devguy.live/api/v1/auth/signin", { username: r, password: n }, { withCredentials: !0 }); console.log(t), i(!0), d(t.data.user.username), x.success(t.data.message || "Welcome back!"), f("/dashboard") } catch (t) { x.error(((m = (u = t.response) == null ? void 0 : u.data) == null ? void 0 : m.message) || "An unexpected error occurred."), i(!1), d(null) } finally { l(!1) } }; return e.jsxs("div", { className: "min-h-screen bg-white flex items-center justify-center p-4", children: [e.jsxs("div", { className: "max-w-md w-full space-y-8", children: [e.jsxs("div", { className: "text-center", children: [e.jsx("h2", { className: "text-3xl font-bold text-gray-900", children: "Welcome Back" }), e.jsx("p", { className: "mt-2 text-sm text-gray-600", children: "Sign in to your account to continue" })] }), e.jsxs("form", { onSubmit: p, className: "mt-8 space-y-6", children: [e.jsxs("div", { className: "space-y-4", children: [e.jsxs("div", { children: [e.jsx("label", { htmlFor: "username", className: "block text-sm font-medium text-gray-700", children: "Username" }), e.jsxs("div", { className: "mt-1 relative", children: [e.jsx(N, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" }), e.jsx("input", { type: "text", id: "username", value: r, onChange: s => g(s.target.value), className: "block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all text-gray-900 bg-gray-50", required: !0 })] })] }), e.jsxs("div", { children: [e.jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700", children: "Password" }), e.jsxs("div", { className: "mt-1 relative", children: [e.jsx(v, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" }), e.jsx("input", { type: "password", id: "password", value: n, onChange: s => h(s.target.value), className: "block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all text-gray-900 bg-gray-50", required: !0 })] })] })] }), e.jsx("div", { className: "flex items-center justify-end", children: e.jsx("a", { href: "/forgot-password", className: "text-sm text-black hover:underline", children: "Forgot password?" }) }), e.jsx("button", { type: "submit", disabled: o, className: "w-full flex justify-center items-center gap-2 py-2.5 px-4 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed", children: o ? "Signing in..." : e.jsxs(e.Fragment, { children: ["Sign In", e.jsx(k, { className: "h-4 w-4" })] }) }), e.jsx("div", { className: "text-center", children: e.jsxs("p", { className: "text-sm text-gray-600", children: ["Don't have an account?", " ", e.jsx("a", { href: "/sign-up", className: "font-medium text-black hover:underline", children: "Sign up" })] }) })] })] }), e.jsx(w, { position: "top-center", toastOptions: { duration: 3e3, style: { background: "#333", color: "#fff" } } })] }) }; export { F as default };
