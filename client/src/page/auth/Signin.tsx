import React, { useState, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { User, Lock, ArrowRight } from "lucide-react";
import { authContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const auth = useContext(authContext);
  if (!auth) {
    throw new Error("AuthContext not found");
  }

  const { setIsAuthenticated, setUsername: setContextUsername } = auth;

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://askme-8puo.onrender.com/api/v1/auth/signin",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response);
      setIsAuthenticated(true);

      setContextUsername(response.data.user.username);
      toast.success(response.data.message || "Welcome back!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        //@ts-expect-error error
        error.response?.data?.message || "An unexpected error occurred."
      );
      setIsAuthenticated(false);
      setContextUsername(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account to continue
          </p>
        </div>

        <form onSubmit={handleSignin} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1 relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all text-gray-900 bg-gray-50"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all text-gray-900 bg-gray-50"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <a
              href="/forgot-password"
              className="text-sm text-black hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 py-2.5 px-4 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              "Signing in..."
            ) : (
              <>
                Sign In
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="/sign-up"
                className="font-medium text-black hover:underline"
              >
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </div>
  );
};

export default Signin;
