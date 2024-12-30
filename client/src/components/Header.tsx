import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut, User, Home, MessageSquare, Info } from "lucide-react";
import { authContext } from "../context/AuthProvider";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const auth = useContext(authContext);

  const navItems = [
    { name: "Home", path: "/", icon: <Home className="h-5 w-5" /> },
    { name: "Health", path: "/health", icon: <Home /> },
    { name: "Ask", path: "/ask", icon: <MessageSquare className="h-5 w-5" /> },
    { name: "History", path: "/history", icon: <Info className="h-5 w-5" /> },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <header className="hidden md:block fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <nav className="max-w-6xl mx-auto px-4 h-16">
          <div className="flex items-center justify-between h-full">
            <Link to="/" className="text-xl font-bold">
              AskMe
            </Link>

            <div className="flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative ${
                    location.pathname === item.path
                      ? "text-black"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 top-full h-0.5 w-full bg-black"
                    />
                  )}
                  {item.name}
                </Link>
              ))}

              {auth?.isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 text-gray-600 hover:text-black"
                  >
                    <User className="h-5 w-5" />
                    {auth.username}
                  </Link>
                  <button
                    onClick={auth.logout}
                    className="flex items-center gap-2 text-gray-600 hover:text-black"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Link
                    to="/sign-in"
                    className="text-gray-600 hover:text-black"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/sign-up"
                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      <div className="md:hidden fixed bottom-6 left-4 right-4 z-50">
        <motion.nav
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="bg-white rounded-full shadow-lg border border-gray-100 p-4"
        >
          <div className="flex items-center justify-around">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`p-2 rounded-full ${
                  location.pathname === item.path
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.icon}
              </Link>
            ))}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </motion.nav>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="md:hidden fixed top-0 right-0 bottom-0 w-3/4 bg-white z-50 shadow-xl"
            >
              <div className="p-4">
                <button
                  onClick={toggleMenu}
                  className="p-2 rounded-full hover:bg-gray-100 absolute right-4"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="mt-16 space-y-6">
                  {auth?.isAuthenticated ? (
                    <div className="border-b border-gray-100 pb-6">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 text-lg font-medium"
                        onClick={toggleMenu}
                      >
                        <User className="h-5 w-5" />
                        {auth.username}
                      </Link>
                    </div>
                  ) : (
                    <div className="border-b border-gray-100 pb-6 space-y-4">
                      <Link
                        to="/sign-in"
                        className="block w-full px-4 py-2 text-center rounded-lg border border-gray-200"
                        onClick={toggleMenu}
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/sign-up"
                        className="block w-full px-4 py-2 text-center rounded-lg bg-black text-white"
                        onClick={toggleMenu}
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}

                  {auth?.isAuthenticated && (
                    <button
                      onClick={() => {
                        auth.logout();
                        toggleMenu();
                      }}
                      className="flex items-center gap-3 text-red-600"
                    >
                      <LogOut className="h-5 w-5" />
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
